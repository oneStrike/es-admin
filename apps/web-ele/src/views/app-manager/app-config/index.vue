<script setup lang="ts">
import type { AppConfigUpdateRequest, BaseAppConfigDto } from '#/api/types';

import { Page } from '@vben/common-ui';

import { ElCard } from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { appConfigActiveApi, appConfigUpdateApi } from '#/api/core';
import { useMessage } from '#/hooks/useFeedback';

import {
  buildAppConfigFormValues,
  buildAppConfigUpdatePayload,
  formSchema,
} from './modules/model/shared';

defineOptions({
  name: 'AppConfig',
});

const loading = ref(false);
const currentConfig = ref<BaseAppConfigDto | null>(null);

const [Form, formApi] = useVbenForm({
  schema: formSchema,
  layout: 'horizontal',
  wrapperClass: 'grid-cols-1 md:grid-cols-2 gap-6',
  handleSubmit: async (values) => {
    await handleSaveConfig(buildAppConfigUpdatePayload(values));
  },
  handleReset: async () => {
    await formApi.setValues(buildAppConfigFormValues(currentConfig.value));
  },
});

async function loadConfig() {
  loading.value = true;
  try {
    const result = await appConfigActiveApi();
    currentConfig.value = result;
    await formApi.setValues(buildAppConfigFormValues(result));
  } finally {
    loading.value = false;
  }
}

async function handleSaveConfig(request: AppConfigUpdateRequest) {
  loading.value = true;
  try {
    await appConfigUpdateApi(request);
    useMessage.success('配置保存成功');
    await loadConfig();
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await loadConfig();
});
</script>

<template>
  <Page auto-content-height>
    <ElCard body-class="h-full overflow-auto p-6" class="h-full" shadow="never">
      <Form :loading="loading" />
    </ElCard>
  </Page>
</template>
