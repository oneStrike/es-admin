import type {
  CheckInStreakDetailResponse,
  GrowthRewardItemDto,
} from '#/api/types';

import {
  buildRewardItems,
  hasRewardValue,
  normalizeRewardValue,
  parseRewardItems,
} from './shared';

export type CheckInStreakRuleDetail = CheckInStreakDetailResponse;

export type CheckInStreakPublishPayload = {
  effectiveFrom?: string;
  publishStrategy: 1 | 2 | 3;
  repeatable?: boolean;
  rewardItems: GrowthRewardItemDto[];
  streakDays: number;
};

export type CheckInStreakFormState = {
  effectiveFrom?: string;
  experience?: number;
  points?: number;
  publishStrategy: 1 | 2 | 3;
  repeatable: boolean;
  sourceId?: number;
  sourceRuleCode?: string;
  sourceVersion: number;
  streakDays?: number;
};

export function createDefaultStreakFormState(): CheckInStreakFormState {
  return {
    effectiveFrom: undefined,
    experience: undefined,
    points: undefined,
    publishStrategy: 1,
    repeatable: false,
    sourceId: undefined,
    sourceRuleCode: undefined,
    sourceVersion: 0,
    streakDays: undefined,
  };
}

export function mapStreakDetailToForm(
  detail: CheckInStreakRuleDetail,
): CheckInStreakFormState {
  const rewardValue = parseRewardItems(detail.rewardItems);

  return {
    effectiveFrom: undefined,
    experience: rewardValue.experience,
    points: rewardValue.points,
    publishStrategy: 1,
    repeatable: !!detail.repeatable,
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
    rewardItems: buildRewardItems(state.points, state.experience) || [],
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

  if (
    !hasRewardValue({
      experience: normalizeRewardValue(state.experience),
      points: normalizeRewardValue(state.points),
    })
  ) {
    return '连续奖励项不能为空';
  }

  return null;
}
