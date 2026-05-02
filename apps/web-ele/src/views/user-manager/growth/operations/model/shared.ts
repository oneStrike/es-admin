import { growthTypeMap } from '../../model/constants';

export type TagType = 'danger' | 'info' | 'primary' | 'success' | 'warning';

export const booleanOptions = [
  { label: '是', value: true },
  { label: '否', value: false },
];

export const settlementStatusOptions = [
  { color: 'warning' as const, label: '待补偿', value: 0 },
  { color: 'success' as const, label: '已成功', value: 1 },
  { color: 'danger' as const, label: '终态失败', value: 2 },
];

export const settlementResultOptions = [
  { color: 'success' as const, label: '真实落账', value: 1 },
  { color: 'info' as const, label: '幂等命中', value: 2 },
  { color: 'danger' as const, label: '处理失败', value: 3 },
];

export const settlementTypeOptions = [
  { label: '通用成长事件', value: 1 },
  { label: '任务奖励', value: 2 },
  { label: '签到基础奖励', value: 3 },
  { label: '签到连续奖励', value: 4 },
];

export const ruleDomainOptions = [
  { label: '徽章', value: 'badge' },
  { label: '漫画章节', value: 'comic_chapter' },
  { label: '漫画作品', value: 'comic_work' },
  { label: '评论', value: 'comment' },
  { label: '互动', value: 'engagement' },
  { label: '论坛', value: 'forum' },
  { label: '小说章节', value: 'novel_chapter' },
  { label: '小说作品', value: 'novel_work' },
  { label: '资料', value: 'profile' },
  { label: '举报', value: 'report' },
  { label: '社交', value: 'social' },
  { label: '系统', value: 'system' },
];

export const governanceGateOptions = [
  { label: '无闸门', value: 'none' },
  { label: '主题审核', value: 'topic_approval' },
  { label: '评论审核', value: 'comment_approval' },
  { label: '举报裁决', value: 'report_judgement' },
];

export const implStatusOptions = [
  { color: 'info' as const, label: '已声明', value: 'declared' },
  { color: 'success' as const, label: '已实现', value: 'implemented' },
  { color: 'warning' as const, label: '历史兼容', value: 'legacy_compat' },
];

export const assetTypeMap: Record<number, string> = {
  1: '积分',
  2: '经验',
  3: '道具',
  4: '虚拟货币',
  5: '等级',
};

type OptionValue = boolean | number | string;

export function getOptionLabel(
  options: Array<{ label: string; value: OptionValue }>,
  value?: null | OptionValue,
) {
  if (value === null || value === undefined) return '-';

  return options.find((item) => item.value === value)?.label || String(value);
}

export function getOptionColor(
  options: Array<{ color?: TagType; value: OptionValue }>,
  value?: null | OptionValue,
  fallback: TagType = 'info',
) {
  if (value === null || value === undefined) return fallback;

  return options.find((item) => item.value === value)?.color || fallback;
}

export function getGrowthTypeLabel(value?: null | number) {
  if (value === null || value === undefined) return '-';

  return growthTypeMap[value] || String(value);
}

export function formatBoolean(value?: boolean | null) {
  if (value === true) return '是';
  if (value === false) return '否';

  return '-';
}

export function formatDateTime(value?: null | string) {
  return value || '-';
}

export function formatIdList(value?: null | number[]) {
  if (!value?.length) return '-';

  return value.join(', ');
}

export function formatJsonBlock(value?: null | string | unknown) {
  if (value === null || value === undefined || value === '') return '-';

  if (typeof value === 'string') {
    try {
      return JSON.stringify(JSON.parse(value), null, 2);
    } catch {
      return value;
    }
  }

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export function stripEmptyValues<T extends Record<string, unknown>>(values: T) {
  const result: Record<string, unknown> = {};

  Object.entries(values).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    if (Array.isArray(value) && value.length === 0) return;

    result[key] = value;
  });

  return result;
}
