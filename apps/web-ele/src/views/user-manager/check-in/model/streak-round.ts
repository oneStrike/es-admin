import type {
  CheckInStreakRewardRuleItemDto,
  CheckInStreakRoundDetailResponse,
  CheckInStreakRoundUpdateRequest,
} from '#/api/types';

import {
  buildRewardItems,
  hasRewardValue,
  normalizeRewardValue,
  parseRewardItems,
} from './shared';

export type CheckInRoundRuleDraft = {
  experience?: number;
  localId: string;
  points?: number;
  repeatable: boolean;
  ruleCode: string;
  status: 0 | 1;
  streakDays?: number;
};

export type CheckInRoundFormState = {
  rewardRules: CheckInRoundRuleDraft[];
  roundCode: string;
  status: 0 | 1 | 2;
  version: number;
};

export function createDefaultRoundFormState(): CheckInRoundFormState {
  return {
    roundCode: '',
    rewardRules: [],
    status: 1,
    version: 0,
  };
}

export function mapRoundDetailToForm(
  detail: CheckInStreakRoundDetailResponse,
): CheckInRoundFormState {
  return {
    roundCode: detail.roundCode,
    rewardRules: [...(detail.rewardRules || [])]
      .map((rule) => toRoundRuleDraft(rule))
      .sort(compareRoundRuleDraft),
    status: detail.status,
    version: detail.version,
  };
}

export function createDefaultRoundRule(): CheckInRoundRuleDraft {
  return {
    experience: undefined,
    localId: `streak-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    points: undefined,
    repeatable: false,
    ruleCode: '',
    status: 1,
    streakDays: undefined,
  };
}

export function buildRoundUpdatePayload(
  state: CheckInRoundFormState,
): CheckInStreakRoundUpdateRequest {
  return {
    nextRoundStrategy: 1,
    rewardRules: [...state.rewardRules]
      .sort(compareRoundRuleDraft)
      .filter((rule) => hasValidRoundRule(rule))
      .map((rule) => ({
        repeatable: rule.repeatable,
        rewardItems: buildRewardItems(rule.points, rule.experience) || [],
        ruleCode: rule.ruleCode.trim(),
        status: rule.status,
        streakDays: Number(rule.streakDays),
      })),
    roundCode: state.roundCode.trim(),
    status: 1,
  };
}

export function validateRoundForm(state: CheckInRoundFormState) {
  if (!state.roundCode.trim()) {
    return '轮次编码不能为空';
  }

  const duplicateRuleCode = findDuplicateValue(
    state.rewardRules.map((rule) => rule.ruleCode.trim()).filter(Boolean),
  );
  if (duplicateRuleCode) {
    return `连续奖励规则编码重复：${duplicateRuleCode}`;
  }

  const duplicateStreakDays = findDuplicateValue(
    state.rewardRules
      .map((rule) => Number(rule.streakDays || 0))
      .filter((value) => value > 0)
      .map(String),
  );
  if (duplicateStreakDays) {
    return `连续奖励阈值重复：${duplicateStreakDays}`;
  }

  for (const rule of state.rewardRules) {
    if (!hasValidRoundRule(rule)) {
      return '连续奖励规则存在未填写完整或奖励为空的项';
    }
  }

  return null;
}

function toRoundRuleDraft(
  rule: CheckInStreakRewardRuleItemDto,
): CheckInRoundRuleDraft {
  const rewardValue = parseRewardItems(rule.rewardItems);

  return {
    experience: rewardValue.experience,
    localId: `streak-${rule.ruleCode}`,
    points: rewardValue.points,
    repeatable: !!rule.repeatable,
    ruleCode: rule.ruleCode,
    status: (rule.status ?? 1) as 0 | 1,
    streakDays: rule.streakDays,
  };
}

function compareRoundRuleDraft(
  left: CheckInRoundRuleDraft,
  right: CheckInRoundRuleDraft,
) {
  const streakDiff =
    Number(left.streakDays || 0) - Number(right.streakDays || 0);
  return streakDiff === 0
    ? left.ruleCode.localeCompare(right.ruleCode)
    : streakDiff;
}

function hasValidRoundRule(rule: CheckInRoundRuleDraft) {
  return (
    !!rule.ruleCode.trim() &&
    Number(rule.streakDays || 0) > 0 &&
    hasRewardValue({
      experience: normalizeRewardValue(rule.experience),
      points: normalizeRewardValue(rule.points),
    })
  );
}

function findDuplicateValue(values: string[]) {
  const seen = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
  }

  return undefined;
}
