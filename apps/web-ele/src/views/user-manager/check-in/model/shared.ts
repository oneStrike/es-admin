import type {
  BaseCheckInPatternRewardRuleDto,
  CheckInReconciliationPageItemDto,
  CheckInStreakRuleDetailResponseDto,
  GrowthRewardItemDto,
} from '#/api/types';

import {
  cloneRewardItems as cloneSharedRewardItems,
  defaultRewardAssetOptions,
  formatRewardSummary as formatSharedRewardSummary,
} from '../../shared/reward-config/reward-config';

export type CheckInReconciliationRow = CheckInReconciliationPageItemDto;
export type CheckInRewardItemDto = {
  [property: string]: any;
  amount: number;
  assetKey?: string;
  assetType: 1 | 2 | 3 | 4 | 5;
  iconUrl?: string;
};

export const checkInMakeupPeriodTypeOptions = [
  { color: 'warning' as const, label: '按自然周', value: 1 },
  { color: 'success' as const, label: '按自然月', value: 2 },
];

export const checkInRewardAssetOptions = defaultRewardAssetOptions;

export const checkInPatternTypeOptions = [
  { label: '按周固定星期', value: 1 },
  { label: '按月固定日期', value: 2 },
  { label: '按月最后一天', value: 3 },
];

export const checkInStreakConfigStatusOptions = [
  { color: 'warning' as const, label: '草稿', value: 0 },
  { color: 'primary' as const, label: '已排期', value: 1 },
  { color: 'success' as const, label: '生效中', value: 2 },
  { color: 'info' as const, label: '已过期', value: 3 },
  { color: 'danger' as const, label: '已终止', value: 4 },
];

export const checkInStreakPublishStrategyOptions = [
  { label: '立即生效', value: 1 },
  { label: '次日生效', value: 2 },
  { label: '指定时间生效', value: 3 },
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

export const checkInRewardSourceTagOptions = [
  { color: 'info' as const, label: '默认', value: 1 },
  { color: 'success' as const, label: '日期', value: 2 },
  { color: 'warning' as const, label: '周期', value: 3 },
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

export function cloneRewardItems(
  rewardItems?: Array<CheckInRewardItemDto | GrowthRewardItemDto> | null,
) {
  const normalizedRewardItems = (rewardItems || []).map((item) => ({
    ...item,
    assetKey: item.assetKey ?? '',
  }));

  return cloneSharedRewardItems(
    normalizedRewardItems,
  ) as CheckInRewardItemDto[];
}

export function hasRewardItems(
  rewardItems?: Array<CheckInRewardItemDto | GrowthRewardItemDto> | null,
) {
  return (rewardItems || []).length > 0;
}

export function formatRewardSummary(
  rewardItems?: Array<CheckInRewardItemDto | GrowthRewardItemDto> | null,
) {
  const normalizedRewardItems = (rewardItems || []).map((item) => ({
    ...item,
    assetKey: item.assetKey ?? '',
  }));

  return formatSharedRewardSummary(
    normalizedRewardItems,
    checkInRewardAssetOptions,
  );
}

export function buildBaseRewardItems(
  points?: null | number,
  experience?: null | number,
) {
  const rewardItems: CheckInRewardItemDto[] = [];

  if (typeof points === 'number' && points > 0) {
    rewardItems.push({
      amount: Number(points),
      assetKey: '',
      assetType: 1,
    });
  }

  if (typeof experience === 'number' && experience > 0) {
    rewardItems.push({
      amount: Number(experience),
      assetKey: '',
      assetType: 2,
    });
  }

  return rewardItems;
}

export function parseBaseRewardItems(
  rewardItems?: CheckInRewardItemDto[] | null,
) {
  const rewardValue = {
    experience: undefined as number | undefined,
    points: undefined as number | undefined,
  };

  for (const item of rewardItems || []) {
    if (item.assetType === 1) {
      rewardValue.points = Number(item.amount);
    }
    if (item.assetType === 2) {
      rewardValue.experience = Number(item.amount);
    }
  }

  return rewardValue;
}

export function formatLedgerIds(ids?: null | number[]) {
  return ids && ids.length > 0 ? ids.join(', ') : '-';
}

export function getStreakConfigStatusMeta(status?: null | number) {
  return (
    checkInStreakConfigStatusOptions.find((item) => item.value === status) || {
      color: 'info' as const,
      label: '未知状态',
    }
  );
}

export function getStreakPublishStrategyLabel(strategy?: null | number) {
  return (
    checkInStreakPublishStrategyOptions.find((item) => item.value === strategy)
      ?.label || '未知策略'
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

export function getRewardSourceTagMeta(sourceType?: null | number) {
  return (
    checkInRewardSourceTagOptions.find((item) => item.value === sourceType) || {
      color: 'info' as const,
      label: '未知',
    }
  );
}

export function sortStreakRules<
  T extends Pick<CheckInStreakRuleDetailResponseDto, 'ruleCode' | 'streakDays'>,
>(rules: T[]) {
  return rules.toSorted((left, right) => {
    const streakDiff = left.streakDays - right.streakDays;
    return streakDiff === 0
      ? left.ruleCode.localeCompare(right.ruleCode)
      : streakDiff;
  });
}

export function sortPatternRules<
  T extends Pick<
    BaseCheckInPatternRewardRuleDto,
    'monthDay' | 'patternType' | 'weekday'
  >,
>(rules: T[]) {
  return rules.toSorted((left, right) => {
    if (left.patternType !== right.patternType) {
      return left.patternType - right.patternType;
    }
    if (left.patternType === 1) {
      return Number(left.weekday ?? 0) - Number(right.weekday ?? 0);
    }
    return Number(left.monthDay ?? 0) - Number(right.monthDay ?? 0);
  });
}
