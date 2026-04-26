import type {
  CheckInRewardItemDto,
  CheckInStreakDetailResponse,
} from '#/api/types';

import {
  cloneRewardItems,
  hasRewardItems,
} from './shared';

export type CheckInStreakRuleDetail = CheckInStreakDetailResponse;

export type CheckInStreakPublishPayload = {
  effectiveFrom?: string;
  publishStrategy: 1 | 2 | 3;
  repeatable?: boolean;
  rewardItems: CheckInRewardItemDto[];
  streakDays: number;
};

export type CheckInStreakFormState = {
  effectiveFrom?: string;
  publishStrategy: 1 | 2 | 3;
  repeatable: boolean;
  rewardItems: CheckInRewardItemDto[];
  sourceId?: number;
  sourceRuleCode?: string;
  sourceVersion: number;
  streakDays?: number;
};

export function createDefaultStreakFormState(): CheckInStreakFormState {
  return {
    effectiveFrom: undefined,
    publishStrategy: 1,
    repeatable: false,
    rewardItems: [],
    sourceId: undefined,
    sourceRuleCode: undefined,
    sourceVersion: 0,
    streakDays: undefined,
  };
}

export function mapStreakDetailToForm(
  detail: CheckInStreakRuleDetail,
): CheckInStreakFormState {
  return {
    effectiveFrom: undefined,
    publishStrategy: 1,
    repeatable: !!detail.repeatable,
    rewardItems: cloneRewardItems(detail.rewardItems),
    sourceId: detail.id,
    sourceRuleCode: detail.ruleCode,
    sourceVersion: detail.version,
    streakDays: detail.streakDays,
  };
}

export function buildStreakPublishPayload(
  state: CheckInStreakFormState,
): CheckInStreakPublishPayload {
  return {
    ...(state.publishStrategy === 3 && state.effectiveFrom?.trim()
      ? { effectiveFrom: state.effectiveFrom.trim() }
      : {}),
    publishStrategy: state.publishStrategy,
    repeatable: state.repeatable,
    rewardItems: cloneRewardItems(state.rewardItems),
    streakDays: Number(state.streakDays),
  };
}

export function validateStreakForm(state: CheckInStreakFormState) {
  if (!Number.isInteger(state.streakDays) || Number(state.streakDays) <= 0) {
    return '连续奖励阈值必须为正整数';
  }

  if (state.publishStrategy === 3) {
    if (!state.effectiveFrom?.trim()) {
      return '指定生效时间不能为空';
    }

    const effectiveFrom = new Date(state.effectiveFrom);
    if (Number.isNaN(effectiveFrom.getTime())) {
      return '指定生效时间非法';
    }

    if (effectiveFrom <= new Date()) {
      return '指定生效时间必须晚于当前时间';
    }
  }

  if (!hasRewardItems(state.rewardItems)) {
    return '连续奖励项不能为空';
  }

  return null;
}
