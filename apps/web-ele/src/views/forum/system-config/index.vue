<script lang="ts" setup>
import type { BaseForumConfigDto, ConfigUpdateRequest } from '#/apis/types';
import type { EsFormSchema } from '#/types';

import { h, onMounted, ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import {
  configGetApi,
  configResetApi,
  configUpdateApi,
} from '#/apis/forum/config';
import { useConfirm, useMessage } from '#/hooks/useFeedback';

import History from './components/history-modal.vue';

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

// 处理配置恢复成功
function handleConfigRestored(config: BaseForumConfigDto) {
  currentConfig.value = config;
  formApi.setValues(config);
}

// 维护模式选项
const reviewPolicyOptions = [
  { label: '无需审核', value: 0 },
  { label: '触发严重敏感词时审核', value: 1 },
  { label: '触发一般敏感词时审核', value: 2 },
  { label: '触发轻微敏感词时审核', value: 3 },
  { label: '强制人工审核', value: 4 },
];

// 表单配置
const formSchema: EsFormSchema = [
  // 站点基本信息
  {
    component: 'Divider',
    fieldName: 'divider_base',
    hideLabel: true,
    formItemClass: 'col-span-2',
    renderComponentContent: () => {
      return {
        default: () => h('div', { class: 'text-red-400' }, '站点基本信息'),
      };
    },
  },
  {
    component: 'Input',
    fieldName: 'siteName',
    label: '站点名称',
    componentProps: {
      placeholder: '请输入站点名称',
    },
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'siteDescription',
    label: '站点描述',
    componentProps: {
      placeholder: '请输入站点描述',
    },
  },
  {
    component: 'Input',
    fieldName: 'siteKeywords',
    label: '站点关键词',
    componentProps: {
      placeholder: '请输入站点关键词，多个关键词用逗号分隔',
    },
  },
  {
    component: 'Upload',
    fieldName: 'siteLogo',
    label: '站点Logo',
    componentProps: {
      maxCount: 1,
      placeholder: '请输入站点Logo的URL地址',
    },
  },
  {
    component: 'Upload',
    fieldName: 'siteFavicon',
    label: '站点Favicon',
    componentProps: {
      maxCount: 1,
      placeholder: '请输入站点Favicon的URL地址',
    },
  },
  {
    component: 'Input',
    fieldName: 'icpNumber',
    label: '备案号',
    componentProps: {
      placeholder: '请输入站点备案号',
    },
  },
  {
    component: 'Input',
    fieldName: 'contactEmail',
    label: '联系邮箱',
    componentProps: {
      placeholder: '请输入站点联系邮箱',
    },
  },

  // 用户注册与权限
  {
    component: 'Divider',
    fieldName: 'divider_user',
    hideLabel: true,
    formItemClass: 'col-span-2',
    renderComponentContent: () => {
      return {
        default: () => h('div', { class: 'text-red-400' }, '用户注册与权限'),
      };
    },
  },
  {
    component: 'Switch',
    fieldName: 'allowUserRegister',
    label: '允许用户注册',
  },
  {
    component: 'Switch',
    fieldName: 'registerRequireEmailVerify',
    label: '邮箱注册',
    dependencies: {
      triggerFields: ['allowUserRegister'],
      show: (values) => values.allowUserRegister,
    },
  },
  {
    component: 'Switch',
    fieldName: 'registerRequirePhoneVerify',
    label: '手机号注册',
    dependencies: {
      triggerFields: ['allowUserRegister'],
      show: (values) => values.allowUserRegister,
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'defaultPointsForNewUser',
    label: '新用户默认积分',
    componentProps: {
      min: 0,
      max: 10_000,
    },
    dependencies: {
      triggerFields: ['allowUserRegister'],
      show: (values) => values.allowUserRegister,
    },
  },

  // 匿名访问设置
  {
    component: 'Divider',
    fieldName: 'divider_anonymous',
    hideLabel: true,
    formItemClass: 'col-span-2',
    renderComponentContent: () => {
      return {
        default: () => h('div', { class: 'text-red-400' }, '匿名访问设置'),
      };
    },
  },
  {
    component: 'Switch',
    fieldName: 'allowAnonymousView',
    label: '允许匿名浏览',
  },
  {
    component: 'Switch',
    fieldName: 'allowAnonymousPost',
    label: '允许匿名发帖',
    dependencies: {
      triggerFields: ['allowAnonymousView'],
      show: (values) => values.allowAnonymousView,
    },
  },
  {
    component: 'Switch',
    fieldName: 'allowAnonymousReply',
    label: '允许匿名回复',
    dependencies: {
      triggerFields: ['allowAnonymousView'],
      show: (values) => values.allowAnonymousView,
    },
  },

  // 内容限制设置
  {
    component: 'Divider',
    fieldName: 'divider_content',
    hideLabel: true,
    formItemClass: 'col-span-2',
    renderComponentContent: () => {
      return {
        default: () => h('div', { class: 'text-red-400' }, '内容限制设置'),
      };
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'usernameMinLength',
    label: '用户名最小长度',
    componentProps: {
      min: 2,
      max: 20,
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'usernameMaxLength',
    label: '用户名最大长度',
    componentProps: {
      min: 2,
      max: 20,
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'bioMaxLength',
    label: '个人简介最大长度',
    componentProps: {
      min: 0,
      max: 500,
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'signatureMaxLength',
    label: '签名最大长度',
    componentProps: {
      min: 0,
      max: 200,
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'topicTitleMaxLength',
    label: '主题标题最大长度',
    componentProps: {
      min: 5,
      max: 200,
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'topicContentMaxLength',
    label: '主题内容最大长度',
    componentProps: {
      min: 10,
      max: 10_000,
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'replyContentMaxLength',
    label: '回复内容最大长度',
    componentProps: {
      min: 1,
      max: 5000,
    },
  },
  {
    component: 'Select',
    fieldName: 'reviewPolicy',
    label: '审核策略',
    componentProps: {
      placeholder: '请选择审核策略',
      options: reviewPolicyOptions,
    },
    rules: 'selectRequired',
  },

  // 通知设置
  {
    component: 'Divider',
    fieldName: 'divider_notification',
    hideLabel: true,
    formItemClass: 'col-span-2',
    renderComponentContent: () => {
      return {
        default: () => h('div', { class: 'text-red-400' }, '通知设置'),
      };
    },
  },
  {
    component: 'Switch',
    fieldName: 'enableEmailNotification',
    label: '启用邮件通知',
  },
  {
    component: 'Switch',
    fieldName: 'enableInAppNotification',
    label: '启用站内通知',
  },
  {
    component: 'Switch',
    fieldName: 'enableSystemNotification',
    label: '启用系统通知',
    dependencies: {
      triggerFields: ['enableInAppNotification'],
      show: (values) => values.enableInAppNotification,
    },
  },
  {
    component: 'Switch',
    fieldName: 'enableNewTopicNotification',
    label: '启用新主题通知',
    dependencies: {
      triggerFields: ['enableInAppNotification'],
      show: (values) => values.enableInAppNotification,
    },
  },
  {
    component: 'Switch',
    fieldName: 'enableNewReplyNotification',
    label: '启用新回复通知',
    dependencies: {
      triggerFields: ['enableInAppNotification'],
      show: (values) => values.enableInAppNotification,
    },
  },
  {
    component: 'Switch',
    fieldName: 'enableLikeNotification',
    label: '启用点赞通知',
    dependencies: {
      triggerFields: ['enableInAppNotification'],
      show: (values) => values.enableInAppNotification,
    },
  },
  {
    component: 'Switch',
    fieldName: 'enableFavoriteNotification',
    label: '启用收藏通知',
    dependencies: {
      triggerFields: ['enableInAppNotification'],
      show: (values) => values.enableInAppNotification,
    },
  },

  // 维护模式
  {
    component: 'Divider',
    fieldName: 'divider_maintenance',
    hideLabel: true,
    formItemClass: 'col-span-2',
    renderComponentContent: () => {
      return {
        default: () => h('div', { class: 'text-red-400' }, '维护模式'),
      };
    },
  },
  {
    component: 'Switch',
    fieldName: 'enableMaintenanceMode',
    label: '站点维护模式',
  },
  {
    component: 'Input',
    fieldName: 'maintenanceMessage',
    label: '维护提示信息',
    formItemClass: 'col-span-2',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入维护模式下的提示信息',
      rows: 3,
    },
    dependencies: {
      triggerFields: ['enableMaintenanceMode'],
      show: (values) => values.enableMaintenanceMode,
    },
  },
];
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
    <HistoryModal @config-restored="handleConfigRestored" />
  </Page>
</template>

<style scoped>
/* 自定义样式 */
</style>
