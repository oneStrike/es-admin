<script setup lang="ts">
/**
 * 应用配置页面组件
 * 用于查看和编辑系统应用配置
 */
import type { AppConfigUpdateRequest, BaseAppConfigDto } from '#/api/types';

import { Page } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import {
  appConfigActiveApi,
  appConfigUpdateApi,
} from '#/api';
import { useMessage } from '#/hooks/useFeedback';

import { formSchema } from './modules/shared';

defineOptions({
  name: 'AppConfig',
});

// 加载状态
const loading = ref(false);

// 当前配置数据
const currentConfig = ref<BaseAppConfigDto | null>(null);

// 表单配置
const [Form, formApi] = useVbenForm({
  schema: formSchema,
  layout: 'horizontal',
  wrapperClass: 'grid-cols-1 md:grid-cols-2 gap-6',
  handleSubmit: async (values) => {
    await handleSaveConfig({
      ...values,
      id: currentConfig.value?.id,
    } as AppConfigUpdateRequest);
  },
  handleReset: async () => {
    if (currentConfig.value) {
      await formApi.setValues(currentConfig.value);
    }
  },
});

/**
 * 加载应用配置
 */
async function loadConfig() {
  loading.value = true;
  try {
    const result = await appConfigActiveApi();
    currentConfig.value = result;
    await formApi.setValues(result);
  } finally {
    loading.value = false;
  }
}

/**
 * 保存应用配置
 * @param values 配置数据
 */
async function handleSaveConfig(values: AppConfigUpdateRequest) {
  loading.value = true;
  try {
    const result = await appConfigUpdateApi(values);
    currentConfig.value = result;
    useMessage.success('配置保存成功');
    await loadConfig();
  } finally {
    loading.value = false;
  }
}

/**
 * 组件挂载时加载配置
 */
onMounted(async () => {
  await loadConfig();
});
</script>

<template>
  <Page auto-content-height title="应用配置">
    <div class="rounded-lg bg-white p-6 shadow">
      <Form :loading="loading" />
    </div>
  </Page>
</template>

<style scoped></style>
