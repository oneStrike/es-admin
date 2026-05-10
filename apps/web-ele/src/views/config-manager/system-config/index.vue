<script setup lang="ts">
import type {
  SystemConfigFormValues,
  SystemConfigMenuKey,
} from './model/system-config';

import type { BaseSystemConfigDto } from '#/api/types';

import { computed, onMounted, ref, watch } from 'vue';

import { Page } from '@vben/common-ui';

import { ElMenu, ElMenuItem, ElScrollbar } from 'element-plus';
import forge from 'node-forge';

import { useVbenForm } from '#/adapter/form';
import { systemConfigApi, systemUpdateApi } from '#/api/core';
import { useMessage } from '#/hooks/useFeedback';
import { useAuthStore } from '#/store';

import {
  buildSystemConfigFormValues,
  buildSystemConfigUpdatePayload,
} from './model/system-config';
import {
  aliyunFormSchema,
  contentReviewFormSchema,
  forumHashtagFormSchema,
  maintenanceFormSchema,
  siteFormSchema,
  uploadFormSchema,
} from './modules/model/shared';

defineOptions({
  name: 'SystemConfig',
});

const loading = ref(false);
const authStore = useAuthStore();
const activeMenu = ref<SystemConfigMenuKey>('site');

const menuItems: Array<{ key: SystemConfigMenuKey; label: string }> = [
  { key: 'site', label: '站点配置' },
  { key: 'maintenance', label: '维护模式' },
  { key: 'aliyun', label: '阿里云配置' },
  { key: 'contentReview', label: '内容审核' },
  { key: 'forumHashtag', label: '话题配置' },
  { key: 'upload', label: '上传配置' },
];

const currentSchema = computed(() => {
  switch (activeMenu.value) {
    case 'aliyun': {
      return aliyunFormSchema;
    }
    case 'contentReview': {
      return contentReviewFormSchema;
    }
    case 'forumHashtag': {
      return forumHashtagFormSchema;
    }
    case 'maintenance': {
      return maintenanceFormSchema;
    }
    case 'upload': {
      return uploadFormSchema;
    }
    default: {
      return siteFormSchema;
    }
  }
});

const [Form, formApi] = useVbenForm({
  schema: currentSchema.value,
  layout: 'horizontal',
  wrapperClass: 'grid-cols-1 gap-8',
  commonConfig: {
    formItemClass: 'max-w-xl',
  },
  actionPosition: 'left',
  handleSubmit: async (values) => {
    await handleSaveConfig(values);
  },
  handleReset: async () => {
    await loadConfig();
  },
});

const configData = ref<BaseSystemConfigDto | null>(null);

watch(activeMenu, async () => {
  formApi.setState({ schema: currentSchema.value });
  await formApi.resetForm();
  await updateFormValues();
});

async function loadConfig() {
  loading.value = true;
  try {
    const result = await systemConfigApi();
    configData.value = result;
    await updateFormValues();
  } finally {
    loading.value = false;
  }
}

async function updateFormValues() {
  await formApi.setValues(
    buildSystemConfigFormValues(activeMenu.value, configData.value),
  );
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

async function handleSaveConfig(values: SystemConfigFormValues) {
  loading.value = true;
  try {
    const currentConfig = configData.value;
    if (!currentConfig) return;

    const publicKey =
      activeMenu.value === 'aliyun' || activeMenu.value === 'upload'
        ? await authStore.getRsaPublicKey()
        : undefined;
    const submitData = buildSystemConfigUpdatePayload({
      currentConfig,
      encryptSecret: publicKey
        ? (value) => encryptValue(value, publicKey)
        : undefined,
      menuKey: activeMenu.value,
      values,
    });

    await systemUpdateApi(submitData);
    useMessage.success('配置保存成功');
    await loadConfig();
  } finally {
    loading.value = false;
  }
}

function isSystemConfigMenuKey(key: string): key is SystemConfigMenuKey {
  return menuItems.some((item) => item.key === key);
}

async function handleMenuSelect(key: string) {
  if (!isSystemConfigMenuKey(key)) {
    return;
  }

  activeMenu.value = key;
}

onMounted(() => {
  loadConfig();
});
</script>

<template>
  <Page auto-content-height>
    <div class="flex h-full overflow-hidden rounded-lg bg-white shadow">
      <div class="w-48 flex-shrink-0 border-r border-gray-200 bg-gray-50">
        <ElScrollbar>
          <ElMenu
            :default-active="activeMenu"
            class="border-r-0!"
            @select="handleMenuSelect"
          >
            <ElMenuItem
              v-for="item in menuItems"
              :key="item.key"
              :index="item.key"
            >
              <span>{{ item.label }}</span>
            </ElMenuItem>
          </ElMenu>
        </ElScrollbar>
      </div>

      <div class="flex-1 overflow-auto p-6">
        <Form :loading="loading" />
      </div>
    </div>
  </Page>
</template>
