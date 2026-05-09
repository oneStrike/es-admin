export const enabledStatusOptions = [
  { label: '启用', value: true, color: 'success' },
  { label: '禁用', value: false, color: 'danger' },
];

export const paymentChannelOptions = [
  { label: '支付宝', value: 1, color: 'primary' },
  { label: '微信', value: 2, color: 'success' },
];

export const paymentSceneOptions = [
  { label: 'App', value: 1, color: 'primary' },
  { label: 'H5', value: 2, color: 'success' },
  { label: '小程序', value: 3, color: 'warning' },
];

export const platformOptions = [
  { label: 'Android', value: 1, color: 'success' },
  { label: 'iOS', value: 2, color: 'primary' },
  { label: 'HarmonyOS', value: 3, color: 'danger' },
  { label: 'Web', value: 4, color: 'warning' },
  { label: '小程序', value: 5, color: 'info' },
];

export const environmentOptions = [
  { label: '沙箱', value: 1, color: 'warning' },
  { label: '正式', value: 2, color: 'success' },
];

export const certModeOptions = [
  { label: '普通密钥', value: 1, color: 'primary' },
  { label: '证书模式', value: 2, color: 'warning' },
];

export const paymentOrderTypeOptions = [
  { label: '虚拟币充值', value: 1, color: 'primary' },
  { label: 'VIP 订阅', value: 2, color: 'warning' },
];

export const paymentOrderStatusOptions = [
  { label: '待支付', value: 1, color: 'warning' },
  { label: '已支付', value: 2, color: 'success' },
  { label: '已关闭', value: 3, color: 'info' },
  { label: '退款中', value: 4, color: 'primary' },
  { label: '已退款', value: 5, color: 'danger' },
];

export const subscriptionModeOptions = [
  { label: '一次性', value: 1, color: 'primary' },
  { label: '自动续费签约首单', value: 2, color: 'warning' },
  { label: '自动续费代扣订单', value: 3, color: 'success' },
];
