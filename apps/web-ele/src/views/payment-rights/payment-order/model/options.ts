/**
 * 支付订单类型枚举，供订单筛选、列表展示和详情共用。
 */
export const paymentOrderTypeOptions = [
  { label: '虚拟币充值', value: 1, color: 'primary' },
  { label: 'VIP 订阅', value: 2, color: 'warning' },
];

/**
 * 支付订单状态枚举，后台手动结算只允许待支付订单进入确认流。
 */
export const paymentOrderStatusOptions = [
  { label: '待支付', value: 1, color: 'warning' },
  { label: '已支付', value: 2, color: 'success' },
  { label: '已关闭', value: 3, color: 'info' },
  { label: '退款中', value: 4, color: 'primary' },
  { label: '已退款', value: 5, color: 'danger' },
];

/**
 * 支付订单订阅模式枚举，用于冻结 VIP 订阅订单上下文。
 */
export const subscriptionModeOptions = [
  { label: '一次性', value: 1, color: 'primary' },
  { label: '自动续费签约首单', value: 2, color: 'warning' },
  { label: '自动续费代扣订单', value: 3, color: 'success' },
];
