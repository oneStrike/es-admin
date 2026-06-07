export const sensitiveWordTypeOptions = [
  {
    label: '政治敏感',
    value: 1,
  },
  {
    label: '色情低俗',
    value: 2,
  },
  {
    label: '暴力恐怖',
    value: 3,
  },
  {
    label: '广告垃圾',
    value: 4,
  },
  {
    label: '其他',
    value: 5,
  },
];

export const sensitiveWordLevelOptions = [
  {
    label: '严重',
    value: 1,
    color: 'danger',
  },
  {
    label: '一般',
    value: 2,
    color: 'warning',
  },
  {
    label: '轻微',
    value: 3,
    color: 'success',
  },
];

export const matchModeOptions = [
  {
    label: '精确匹配',
    value: 1,
  },
  {
    label: '模糊匹配',
    value: 2,
  },
];

export const sensitiveWordHitEntityTypeOptions = [
  {
    label: '帖子',
    value: 1,
    color: 'primary',
  },
  {
    label: '评论',
    value: 2,
    color: 'info',
  },
];

export const sensitiveWordHitOperationTypeOptions = [
  {
    label: '创建',
    value: 1,
    color: 'success',
  },
  {
    label: '更新',
    value: 2,
    color: 'warning',
  },
];

export const sensitiveWordHitEntityStatusOptions = [
  {
    label: '可处置',
    value: 'available',
    color: 'success',
  },
  {
    label: '已删除',
    value: 'deleted',
    color: 'info',
  },
  {
    label: '已隐藏',
    value: 'hidden',
    color: 'warning',
  },
  {
    label: '不可处置',
    value: 'forbidden',
    color: 'danger',
  },
  {
    label: '内容缺失',
    value: 'missing',
    color: 'info',
  },
];

export const sensitiveWordAuditStatusOptions = [
  {
    label: '待审核',
    value: 0,
    color: 'warning',
  },
  {
    label: '已通过',
    value: 1,
    color: 'success',
  },
  {
    label: '已拒绝',
    value: 2,
    color: 'danger',
  },
];

export const sensitiveWordHitEntityStatusMap = Object.fromEntries(
  sensitiveWordHitEntityStatusOptions.map((item) => [item.value, item]),
) as Record<
  (typeof sensitiveWordHitEntityStatusOptions)[number]['value'],
  (typeof sensitiveWordHitEntityStatusOptions)[number]
>;

export const sensitiveWordAuditStatusMap = Object.fromEntries(
  sensitiveWordAuditStatusOptions.map((item) => [item.value, item]),
) as Record<
  (typeof sensitiveWordAuditStatusOptions)[number]['value'],
  (typeof sensitiveWordAuditStatusOptions)[number]
>;

export function formatSensitiveWordOptionLabel(
  options: Array<{ label: string; value: number | string }>,
  value?: null | number | string,
) {
  if (value === null || value === undefined) {
    return '-';
  }

  return options.find((item) => item.value === value)?.label || String(value);
}
