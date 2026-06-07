export const enabledStatusOptions = [
  { label: '启用', value: true, color: 'success' },
  { label: '禁用', value: false, color: 'danger' },
];

export const adProviderOptions = [
  { label: '穿山甲', value: 1, color: 'primary' },
  { label: '腾讯优量汇', value: 2, color: 'success' },
];

export const adTargetScopeOptions = [
  { label: '低价章节', value: 1, color: 'primary' },
  { label: '新用户冷启动', value: 2, color: 'success' },
  { label: '运营白名单', value: 3, color: 'warning' },
];

export const enabledAdTargetScopeOptions = adTargetScopeOptions.filter(
  (option) => option.value === 1,
);

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

export const adRewardStatusOptions = [
  { label: '奖励成功', value: 1, color: 'success' },
  { label: '奖励失败', value: 2, color: 'danger' },
  { label: '已撤销', value: 3, color: 'warning' },
];

export const adRewardTargetTypeOptions = [
  { label: '漫画章节', value: 1, color: 'primary' },
  { label: '小说章节', value: 2, color: 'success' },
];

export const adRewardReconcileStatusOptions = [
  { label: '已对齐', value: 'entitlement_active', color: 'success' },
  { label: '缺少权益', value: 'entitlement_missing', color: 'danger' },
  { label: '权益非有效', value: 'entitlement_inactive', color: 'warning' },
  { label: '权益已过期', value: 'entitlement_expired', color: 'warning' },
  { label: '奖励已撤销', value: 'reward_revoked', color: 'info' },
  {
    label: '撤销后权益仍有效',
    value: 'revoked_reward_active_entitlement',
    color: 'danger',
  },
  {
    label: '撤销后权益已过期',
    value: 'revoked_reward_expired_entitlement',
    color: 'warning',
  },
  { label: '奖励失败', value: 'reward_failed', color: 'danger' },
  {
    label: '失败后权益仍有效',
    value: 'failed_reward_active_entitlement',
    color: 'danger',
  },
];
