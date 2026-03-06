import type { EsFormSchema } from '#/types';

// ========== 站点基础配置 ==========
export const siteFormSchema: EsFormSchema = [
  {
    component: 'Divider',
    fieldName: 'divider_site',
    hideLabel: true,
    formItemClass: 'w-full',
    renderComponentContent: () => {
      return {
        default: () => h('div', { class: 'text-lg font-bold' }, '站点基础信息'),
      };
    },
  },
  {
    component: 'Input',
    fieldName: 'siteName',
    label: '站点名称',
    componentProps: {
      placeholder: '请输入站点名称',
      maxlength: 50,
      showWordLimit: true,
    },
  },
  {
    component: 'Input',
    fieldName: 'siteDescription',
    label: '站点描述',
    componentProps: {
      placeholder: '请输入站点描述',
      maxlength: 200,
      showWordLimit: true,
    },
  },
  {
    component: 'Input',
    fieldName: 'siteKeywords',
    label: '站点关键词',
    componentProps: {
      placeholder: '请输入站点关键词（SEO用）',
      maxlength: 100,
      showWordLimit: true,
    },
  },
  {
    component: 'Upload',
    fieldName: 'siteLogo',
    label: '站点Logo',
    componentProps: {
      placeholder: '请上传站点Logo',
      accept: 'image/*',
      scene: 'site',
    },
  },
  {
    component: 'Upload',
    fieldName: 'siteFavicon',
    label: '站点图标',
    componentProps: {
      placeholder: '请上传站点图标',
      accept: 'image/*',
      scene: 'site',
    },
  },
  {
    component: 'Input',
    fieldName: 'contactEmail',
    label: '联系邮箱',
    rules: 'email',
    componentProps: {
      placeholder: '请输入联系邮箱',
      maxlength: 100,
      showWordLimit: true,
    },
  },
  {
    component: 'Input',
    fieldName: 'icpNumber',
    label: 'ICP备案号',
    componentProps: {
      placeholder: '请输入ICP备案号',
      maxlength: 50,
      showWordLimit: true,
    },
  },
];

// ========== 维护模式配置 ==========
export const maintenanceFormSchema: EsFormSchema = [
  {
    component: 'Divider',
    fieldName: 'divider_maintenance',
    hideLabel: true,
    formItemClass: 'w-full',
    renderComponentContent: () => {
      return {
        default: () => h('div', { class: 'text-lg font-bold' }, '维护模式设置'),
      };
    },
  },
  {
    component: 'RadioGroup',
    fieldName: 'enableMaintenanceMode',
    label: '启用维护模式',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
  },
  {
    component: 'Input',
    fieldName: 'maintenanceMessage',
    label: '维护提示信息',
    componentProps: {
      type: 'textarea',
      rows: 3,
      placeholder: '请输入维护模式提示信息',
      maxlength: 500,
      showWordLimit: true,
    },
  },
];

// ========== 阿里云配置 ==========
export const aliyunFormSchema: EsFormSchema = [
  {
    component: 'Divider',
    fieldName: 'divider_aliyun',
    hideLabel: true,
    formItemClass: 'w-full',
    renderComponentContent: () => {
      return {
        default: () => h('div', { class: 'text-lg font-bold' }, '阿里云密钥'),
      };
    },
  },
  {
    component: 'Input',
    fieldName: 'accessKeyId',
    label: 'AccessKey ID',
    componentProps: {
      placeholder: '请输入 AccessKey ID',
      maxlength: 100,
    },
  },
  {
    component: 'Input',
    fieldName: 'accessKeySecret',
    label: 'AccessKey Secret',
    componentProps: {
      placeholder: '请输入 AccessKey Secret',
      maxlength: 100,
    },
  },
  {
    component: 'Divider',
    fieldName: 'divider_sms',
    hideLabel: true,
    formItemClass: 'w-full',
    renderComponentContent: () => {
      return {
        default: () => h('div', { class: 'text-lg font-bold' }, '短信服务配置'),
      };
    },
  },
  {
    component: 'Input',
    fieldName: 'smsEndpoint',
    label: '短信 Endpoint',
    componentProps: {
      placeholder: '请输入短信 Endpoint',
      maxlength: 200,
      showWordLimit: true,
    },
  },
  {
    component: 'Select',
    fieldName: 'smsSignName',
    label: '短信签名',
    componentProps: {
      placeholder: '请选择短信签名',
      options: [
        { label: '速通互联验证码', value: '速通互联验证码' },
        { label: '云渚科技验证平台', value: '云渚科技验证平台' },
        { label: '云渚科技验证服务', value: '云渚科技验证服务' },
        { label: '速通互联验证平台', value: '速通互联验证平台' },
        { label: '速通互联验证服务', value: '速通互联验证服务' },
      ],
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'smsVerifyCodeLength',
    label: '验证码长度',
    componentProps: {
      placeholder: '请输入验证码长度',
      min: 4,
      max: 8,
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'smsVerifyCodeExpire',
    label: '验证码过期时间(秒)',
    componentProps: {
      placeholder: '请输入验证码过期时间',
      min: 60,
      max: 3600,
    },
  },
];

// ========== 内容审核策略配置 ==========
export const contentReviewFormSchema: EsFormSchema = [
  {
    component: 'Divider',
    fieldName: 'divider_review_base',
    hideLabel: true,
    formItemClass: 'w-full',
    renderComponentContent: () => {
      return {
        default: () => h('div', { class: 'text-lg font-bold' }, '审核策略设置'),
      };
    },
  },
  {
    component: 'RadioGroup',
    fieldName: 'recordHits',
    label: '记录敏感词命中明细',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
  },
  {
    component: 'Divider',
    fieldName: 'divider_review_light',
    hideLabel: true,
    formItemClass: 'w-full',
    renderComponentContent: () => {
      return {
        default: () =>
          h(
            'div',
            { class: 'text-base font-medium text-gray-600' },
            '轻微敏感词处理策略',
          ),
      };
    },
  },
  {
    component: 'RadioGroup',
    fieldName: 'lightActionIsHidden',
    label: '是否隐藏',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
  },
  {
    component: 'Select',
    fieldName: 'lightActionAuditStatus',
    label: '审核状态',
    componentProps: {
      placeholder: '请选择审核状态',
      options: [
        { label: '待审核', value: 0 },
        { label: '已通过', value: 1 },
        { label: '已拒绝', value: 2 },
      ],
    },
  },
  {
    component: 'Divider',
    fieldName: 'divider_review_general',
    hideLabel: true,
    formItemClass: 'w-full',
    renderComponentContent: () => {
      return {
        default: () =>
          h(
            'div',
            { class: 'text-base font-medium text-gray-600' },
            '一般敏感词处理策略',
          ),
      };
    },
  },
  {
    component: 'RadioGroup',
    fieldName: 'generalActionIsHidden',
    label: '是否隐藏',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
  },
  {
    component: 'Select',
    fieldName: 'generalActionAuditStatus',
    label: '审核状态',
    componentProps: {
      placeholder: '请选择审核状态',
      options: [
        { label: '待审核', value: 0 },
        { label: '已通过', value: 1 },
        { label: '已拒绝', value: 2 },
      ],
    },
  },
  {
    component: 'Divider',
    fieldName: 'divider_review_severe',
    hideLabel: true,
    formItemClass: 'w-full',
    renderComponentContent: () => {
      return {
        default: () =>
          h(
            'div',
            { class: 'text-base font-medium text-gray-600' },
            '严重敏感词处理策略',
          ),
      };
    },
  },
  {
    component: 'RadioGroup',
    fieldName: 'severeActionIsHidden',
    label: '是否隐藏',
    defaultValue: true,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
  },
  {
    component: 'Select',
    fieldName: 'severeActionAuditStatus',
    label: '审核状态',
    componentProps: {
      placeholder: '请选择审核状态',
      options: [
        { label: '待审核', value: 0 },
        { label: '已通过', value: 1 },
        { label: '已拒绝', value: 2 },
      ],
    },
  },
];
