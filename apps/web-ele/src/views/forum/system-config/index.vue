<script lang="ts" setup>
import type { BaseForumConfigDto, ConfigUpdateRequest } from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { configGetApi, configResetApi, configUpdateApi } from '#/api';
import { useConfirm, useMessage } from '#/hooks/useFeedback';

import History from './history-modal.vue';
import { formSchema } from './modules/shared';

// 定义页面组件名称
defineOptions({
  name: 'ForumSystemConfig',
});

// 加载状态
const loading = ref(false);

// 当前配置数据
const currentConfig = ref<BaseForumConfigDto | null>(null);

const [HistoryModal, HistoryModalApi] = useVbenModal({
  title: '配置历史记录',
  connectedComponent: History,
  onClosed() {
    loadConfig();
  },
});

// 创建表单
const [Form, formApi] = useVbenForm({
  schema: formSchema,
  layout: 'horizontal',
  wrapperClass: 'grid-cols-1 md:grid-cols-2 gap-6',
  handleSubmit: async (values) => {
    await handleSaveConfig({
      ...values,
      id: currentConfig.value?.id,
    } as ConfigUpdateRequest);
  },
  handleReset: async () => {
    if (currentConfig.value) {
      await formApi.setValues(currentConfig.value);
    }
  },
});

// 获取当前配置
async function loadConfig() {
  loading.value = true;
  try {
    const result = await configGetApi();
    currentConfig.value = result;
    // 设置表单值
    await formApi.setValues(result);
  } finally {
    loading.value = false;
  }
}

// 保存配置
async function handleSaveConfig(values: ConfigUpdateRequest) {
  loading.value = true;
  try {
    const result = await configUpdateApi(values);
    currentConfig.value = result;
    useMessage.success('配置保存成功');
    loadConfig();
  } finally {
    loading.value = false;
  }
}

// 重置为默认配置
async function handleResetConfig() {
  const confirmed = await useConfirm('reset');

  if (confirmed) {
    loading.value = true;
    try {
      const result = await configResetApi();
      currentConfig.value = result;
      await formApi.setValues(result);
      useMessage.success('配置已重置为默认值');
    } finally {
      loading.value = false;
    }
  }
}

// 页面加载时初始化数据
onMounted(async () => {
  await loadConfig();
});
</script>

<template>
  <Page auto-content-height title="论坛系统配置">
    <template #extra>
      <div class="flex gap-2">
        <el-button type="primary" @click="HistoryModalApi.open()">
          配置历史
        </el-button>
        <el-button
          type="warning"
          @click="handleResetConfig"
          :disabled="loading"
        >
          重置默认
        </el-button>
      </div>
    </template>

    <!-- 配置表单 -->
    <div class="rounded-lg bg-white p-6 shadow">
      <Form :loading="loading" />
    </div>

    <!-- 历史配置弹窗 -->
    <HistoryModal @config-restored="loadConfig" />
  </Page>
</template>

<style scoped>
/* 自定义样式 */
</style>
