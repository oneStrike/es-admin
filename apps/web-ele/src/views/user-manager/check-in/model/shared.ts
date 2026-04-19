import type {
  CheckInPatternRewardRuleItemDto,
  CheckInReconciliationItemDto,
  CheckInStreakRewardRuleItemDto,
  GrowthRewardItemDto,
} from '#/api/types';

export type RewardValue = {
  experience?: number;
  points?: number;
};

export type CheckInReconciliationRow = CheckInReconciliationItemDto;

export const CHECK_IN_REWARD_ASSET_TYPE = {
  EXPERIENCE: 2,
  POINTS: 1,
} as const;

export const checkInMakeupPeriodTypeOptions = [
  { color: 'warning' as const, label: '按自然周', value: 1 },
  { color: 'success' as const, label: '按自然月', value: 2 },
];

export const checkInPatternTypeOptions = [
  { label: '按周固定星期', value: 1 },
  { label: '按月固定日期', value: 2 },
  { label: '按月最后一天', value: 3 },
];

export const checkInRoundStatusOptions = [
  { color: 'success' as const, label: '当前生效', value: 1 },
  { color: 'info' as const, label: '历史归档', value: 2 },
  { color: 'warning' as const, label: '草稿', value: 0 },
];

export const checkInRewardStatusOptions = [
  { color: 'warning' as const, label: '待处理', value: 0 },
  { color: 'success' as const, label: '成功', value: 1 },
  { color: 'danger' as const, label: '失败', value: 2 },
];

export const checkInRewardResultOptions = [
  { color: 'success' as const, label: '已落账', value: 1 },
  { color: 'info' as const, label: '幂等命中', value: 2 },
  { color: 'danger' as const, label: '处理失败', value: 3 },
];

export const checkInRewardSourceOptions = [
  { label: '默认基础奖励', value: 1 },
  { label: '具体日期奖励', value: 2 },
  { label: '周期模式奖励', value: 3 },
];

export const checkInRecordTypeOptions = [
  { label: '正常签到', value: 1 },
  { label: '补签', value: 2 },
];

export const weeklyCalendarLabels = [
  { label: '周一', value: 1 },
  { label: '周二', value: 2 },
  { label: '周三', value: 3 },
  { label: '周四', value: 4 },
  { label: '周五', value: 5 },
  { label: '周六', value: 6 },
  { label: '周日', value: 7 },
];

export function normalizeRewardValue(value?: null | number) {
  return typeof value === 'number' && value > 0 ? Number(value) : undefined;
}

export function buildRewardItems(
  points?: null | number,
  experience?: null | number,
) {
  const rewardItems: GrowthRewardItemDto[] = [];

  if (normalizeRewardValue(points)) {
    rewardItems.push({
      amount: Number(points),
      assetKey: '',
      assetType: CHECK_IN_REWARD_ASSET_TYPE.POINTS,
    });
  }

  if (normalizeRewardValue(experience)) {
    rewardItems.push({
      amount: Number(experience),
      assetKey: '',
      assetType: CHECK_IN_REWARD_ASSET_TYPE.EXPERIENCE,
    });
  }

  return rewardItems.length > 0 ? rewardItems : undefined;
}

export function cloneRewardItems(rewardItems?: GrowthRewardItemDto[] | null) {
  return (rewardItems || []).map((item) => ({
    amount: Number(item.amount),
    assetKey: item.assetKey || '',
    assetType: item.assetType,
  }));
}

export function parseRewardItems(
  rewardItems?: GrowthRewardItemDto[] | null,
): RewardValue {
  const result: RewardValue = {};

  for (const item of rewardItems || []) {
    if (item.assetType === CHECK_IN_REWARD_ASSET_TYPE.POINTS) {
      result.points = Number(item.amount);
    }
    if (item.assetType === CHECK_IN_REWARD_ASSET_TYPE.EXPERIENCE) {
      result.experience = Number(item.amount);
    }
  }

  return result;
}

export function hasRewardValue(value: RewardValue) {
  return Number(value.points ?? 0) > 0 || Number(value.experience ?? 0) > 0;
}

export function hasRewardItems(rewardItems?: GrowthRewardItemDto[] | null) {
  return (rewardItems || []).length > 0;
}

export function formatRewardSummary(
  rewardItems?: GrowthRewardItemDto[] | null | RewardValue,
) {
  const rewardValue = Array.isArray(rewardItems)
    ? parseRewardItems(rewardItems)
    : (rewardItems ?? {});
  const parts = [
    rewardValue.points ? `积分 ${rewardValue.points}` : '',
    rewardValue.experience ? `经验 ${rewardValue.experience}` : '',
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(' / ') : '未配置';
}

export function formatLedgerIds(ids?: null | number[]) {
  return ids && ids.length > 0 ? ids.join(', ') : '-';
}

export function getRoundStatusMeta(status?: null | number) {
  return (
    checkInRoundStatusOptions.find((item) => item.value === status) || {
      color: 'info' as const,
      label: '未知状态',
    }
  );
}

export function getRewardStatusMeta(status?: null | number) {
  return (
    checkInRewardStatusOptions.find((item) => item.value === status) || {
      color: 'info' as const,
      label: '未知状态',
    }
  );
}

export function getRewardResultMeta(resultType?: null | number) {
  return (
    checkInRewardResultOptions.find((item) => item.value === resultType) || {
      color: 'info' as const,
      label: '未知结果',
    }
  );
}

export function getRewardSourceLabel(sourceType?: null | number) {
  return (
    checkInRewardSourceOptions.find((item) => item.value === sourceType)
      ?.label || '未命中'
  );
}

export function sortStreakRules<
  T extends Pick<CheckInStreakRewardRuleItemDto, 'ruleCode' | 'streakDays'>,
>(rules: T[]) {
  return [...rules].sort((left, right) => {
    const streakDiff = left.streakDays - right.streakDays;
    return streakDiff === 0
      ? left.ruleCode.localeCompare(right.ruleCode)
      : streakDiff;
  });
}

export function sortPatternRules<
  T extends Pick<
    CheckInPatternRewardRuleItemDto,
    'monthDay' | 'patternType' | 'weekday'
  >,
>(rules: T[]) {
  return [...rules].sort((left, right) => {
    if (left.patternType !== right.patternType) {
      return left.patternType - right.patternType;
    }
    if (left.patternType === 1) {
      return Number(left.weekday ?? 0) - Number(right.weekday ?? 0);
    }
    return Number(left.monthDay ?? 0) - Number(right.monthDay ?? 0);
  });
}
