import type { CheckInPlanDetailResponseDto } from '#/api/types';

import { dayjs } from '#/utils';

import {
  formatRewardSummary,
  formatWeekCursor,
  mapPlanDetailToEditorState,
} from './plan-modal';
import { getPlanBaseRewardSummary } from './shared';

export type CheckInRewardPreviewState = {
  baseRewardSummary: string;
  cycleType: CheckInPlanDetailResponseDto['cycleType'];
  endDate?: string;
  planName: string;
  reward: ReturnType<typeof mapPlanDetailToEditorState>['reward'];
  startDate: string;
  streakRules: Array<{
    repeatable: boolean;
    rewardSummary: string;
    ruleCode: string;
    status: 0 | 1;
    streakDays: number;
  }>;
};

export function createRewardPreviewState(
  detail: CheckInPlanDetailResponseDto,
): CheckInRewardPreviewState {
  const editorState = mapPlanDetailToEditorState(detail);

  return {
    baseRewardSummary: getPlanBaseRewardSummary(detail),
    cycleType: editorState.plan.cycleType,
    endDate: editorState.plan.endDate || undefined,
    planName: detail.planName,
    reward: editorState.reward,
    startDate: editorState.plan.startDate,
    streakRules: editorState.reward.streakRules.map((item) => ({
      repeatable: item.repeatable,
      rewardSummary: formatRewardSummary(item),
      ruleCode: item.ruleCode,
      status: item.status,
      streakDays: Number(item.streakDays ?? 0),
    })),
  };
}

export function clampRewardPreviewWeekCursor(params: {
  endDate?: null | string;
  startDate: string;
  weekCursor: string;
}) {
  const normalizedCursor = formatWeekCursor(params.weekCursor);
  const minCursor = formatWeekCursor(params.startDate);

  if (
    dayjs(normalizedCursor).startOf('day').valueOf() <
    dayjs(minCursor).startOf('day').valueOf()
  ) {
    return minCursor;
  }

  if (!params.endDate) {
    return normalizedCursor;
  }

  const maxCursor = formatWeekCursor(params.endDate);
  if (
    dayjs(normalizedCursor).startOf('day').valueOf() >
    dayjs(maxCursor).startOf('day').valueOf()
  ) {
    return maxCursor;
  }

  return normalizedCursor;
}

export function clampRewardPreviewMonthCursor(params: {
  endDate?: null | string;
  monthCursor: string;
  startDate: string;
}) {
  const normalizedCursor = dayjs(`${params.monthCursor}-01`).format('YYYY-MM');
  const minCursor = dayjs(params.startDate).startOf('month').format('YYYY-MM');

  if (
    dayjs(`${normalizedCursor}-01`).startOf('month').valueOf() <
    dayjs(`${minCursor}-01`).startOf('month').valueOf()
  ) {
    return minCursor;
  }

  if (!params.endDate) {
    return normalizedCursor;
  }

  const maxCursor = dayjs(params.endDate).startOf('month').format('YYYY-MM');
  if (
    dayjs(`${normalizedCursor}-01`).startOf('month').valueOf() >
    dayjs(`${maxCursor}-01`).startOf('month').valueOf()
  ) {
    return maxCursor;
  }

  return normalizedCursor;
}
