/**
 * 支付配置列表、表单和详情共用的启停状态枚举。
 */
export const enabledStatusOptions = [
  { label: '启用', value: true, color: 'success' },
  { label: '禁用', value: false, color: 'danger' },
];

/**
 * 支付 provider 渠道枚举，和后端支付配置契约值保持一致。
 */
export const paymentChannelOptions = [
  { label: '支付宝', value: 1, color: 'primary' },
  { label: '微信', value: 2, color: 'success' },
];

/**
 * 支付 provider 可用支付场景枚举。
 */
export const paymentSceneOptions = [
  { label: 'App', value: 1, color: 'primary' },
  { label: 'H5', value: 2, color: 'success' },
  { label: '小程序', value: 3, color: 'warning' },
];

/**
 * 支付 provider 客户端平台枚举。
 */
export const platformOptions = [
  { label: 'Android', value: 1, color: 'success' },
  { label: 'iOS', value: 2, color: 'primary' },
  { label: 'HarmonyOS', value: 3, color: 'danger' },
  { label: 'Web', value: 4, color: 'warning' },
  { label: '小程序', value: 5, color: 'info' },
];

/**
 * 支付 provider 运行环境枚举。
 */
export const environmentOptions = [
  { label: '沙箱', value: 1, color: 'warning' },
  { label: '正式', value: 2, color: 'success' },
];

/**
 * 支付 provider 凭据模式枚举。
 */
export const certModeOptions = [
  { label: '普通密钥', value: 1, color: 'primary' },
  { label: '证书模式', value: 2, color: 'warning' },
];
