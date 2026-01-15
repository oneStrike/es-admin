import type { EsFormSchema } from '#/types';

import { reviewPolicyOptions } from './constants';

export const formSchema: EsFormSchema = [
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
