<script setup lang="ts">
import type { AliyunConfigDto } from '#/api/types';

import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import forge from 'node-forge';

import { useVbenForm } from '#/adapter/form';
import {
  systemConfigDetailApi,
  systemConfigUpdateApi,
} from '#/api/core/health/system';
import { useMessage } from '#/hooks/useFeedback';
import { useAuthStore } from '#/store';

import { formSchema } from './modules/shared';

defineOptions({
  name: 'SystemConfig',
});

const loading = ref(false);
const authStore = useAuthStore();

const [Form, formApi] = useVbenForm({
  schema: formSchema,
  layout: 'horizontal',
  wrapperClass: 'grid-cols-1 md:grid-cols-2 gap-6',
  handleSubmit: async (values) => {
    await handleSaveConfig(values as AliyunConfigDto);
  },
  handleReset: async () => {
    await loadConfig();
  },
});

async function loadConfig() {
  loading.value = true;
  try {
    const result = await systemConfigDetailApi();
    await formApi.setValues(result);
  } finally {
    loading.value = false;
  }
}

function encryptValue(value: string, publicKey: string) {
  const publicKeyPem = forge.pki.publicKeyFromPem(publicKey);
  const encrypted = publicKeyPem.encrypt(value, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: {
      md: forge.md.sha256.create(),
    },
  });
  return forge.util.encode64(encrypted);
}

async function handleSaveConfig(values: AliyunConfigDto) {
  loading.value = true;
  try {
    const publicKey = await authStore.getRsaPublicKey();

    // 加密 accessKeyId
    if (values.accessKeyId) {
      values.accessKeyId = encryptValue(values.accessKeyId, publicKey);
    }

    // 加密 accessKeySecret
    if (values.accessKeySecret) {
      values.accessKeySecret = encryptValue(values.accessKeySecret, publicKey);
    }

    await systemConfigUpdateApi(values);
    useMessage.success('配置保存成功');
    await loadConfig();
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadConfig();
});
</script>

<template>
  <Page auto-content-height title="系统配置">
    <div class="rounded-lg bg-white p-6 shadow">
      <Form :loading="loading" />
    </div>
  </Page>
</template>
