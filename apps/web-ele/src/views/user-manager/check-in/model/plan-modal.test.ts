import type { CheckInStreakRuleDetail } from './streak-config';

import type { CheckInConfigDetailResponse } from '#/api/types';

import { describe, expect, it } from 'vitest';

import { dayjs } from '#/utils';

import * as checkInConfigModel from './config';
import {
  buildConfigPreviewDays,
  buildConfigUpdatePayload,
  buildMonthlyScopeOptions,
  buildWeeklyScopeOptions,
  getDateRuleByDate,
  getMonthLastDayRule,
  getPatternRuleByMonthDay,
  getPatternRuleByWeekday,
  isEditableRewardDate,
  mapConfigDetailToForm,
  removeDateRule,
  removePatternRule,
  upsertDateRule,
  upsertPatternRule,
  validateConfigForm,
} from './config';
import {
  buildStreakPublishPayload,
  mapStreakDetailToForm,
  validateStreakForm,
} from './streak-config';

function createConfigDetail(
  overrides: Partial<CheckInConfigDetailResponse> = {},
): CheckInConfigDetailResponse {
  return {
    baseRewardItems: [
      { amount: 10, assetKey: '', assetType: 1 },
      { amount: 5, assetKey: '', assetType: 2 },
    ],
    createdAt: '2026-04-19T00:00:00.000Z',
    dateRewardRules: [
      {
        rewardDate: '2026-04-21',
        rewardItems: [{ amount: 66, assetKey: '', assetType: 1 }],
      },
    ],
    isEnabled: true,
    id: 1,
    makeupPeriodType: 1,
    patternRewardRules: [
      {
        patternType: 1,
        rewardItems: [{ amount: 22, assetKey: '', assetType: 1 }],
        weekday: 1,
      },
    ],
    periodicAllowance: 2,
    updatedAt: '2026-04-19T01:00:00.000Z',
    ...overrides,
  };
}

function createStreakDetail(
  overrides: Partial<CheckInStreakRuleDetail> = {},
): CheckInStreakRuleDetail {
  return {
    createdAt: '2026-04-19T00:00:00.000Z',
    effectiveFrom: '2026-04-19T00:00:00.000Z',
    effectiveTo: null,
    id: 8,
    isCurrent: true,
    publishStrategy: 1,
    repeatable: false,
    rewardItems: [{ amount: 10, assetKey: '', assetType: 1 }],
    ruleCode: 'streak-day-3',
    status: 2,
    streakDays: 3,
    updatedAt: '2026-04-19T01:00:00.000Z',
    version: 3,
    ...overrides,
  };
}

describe('check-in config model', () => {
  it('maps config detail to editable form state', () => {
    const state = mapConfigDetailToForm(createConfigDetail());

    expect(state.baseRewardItems).toEqual([
      { amount: 10, assetKey: '', assetType: 1 },
      { amount: 5, assetKey: '', assetType: 2 },
    ]);
    expect(state.dateRules[0]).toMatchObject({
      rewardDate: '2026-04-21',
      rewardItems: [{ amount: 66, assetKey: '', assetType: 1 }],
    });
    expect(state.patternRules[0]).toMatchObject({
      patternType: 1,
      rewardItems: [{ amount: 22, assetKey: '', assetType: 1 }],
      weekday: 1,
    });
  });

  it('builds config update payload with reward item arrays', () => {
    const payload = buildConfigUpdatePayload(true, {
      baseRewardItems: [
        { amount: 10, assetKey: '', assetType: 1 },
        { amount: 5, assetKey: '', assetType: 2 },
      ],
      dateRules: [
        {
          localId: 'date-1',
          rewardDate: '2026-04-21',
          rewardItems: [{ amount: 66, assetKey: '', assetType: 1 }],
        },
      ],
      makeupPeriodType: 1,
      patternRules: [
        {
          localId: 'pattern-1',
          patternType: 1,
          rewardItems: [{ amount: 22, assetKey: '', assetType: 1 }],
          weekday: 1,
        },
      ],
      periodicAllowance: 2,
    });

    expect(payload).toEqual({
      baseRewardItems: [
        { amount: 10, assetKey: '', assetType: 1 },
        { amount: 5, assetKey: '', assetType: 2 },
      ],
      dateRewardRules: [
        {
          rewardDate: '2026-04-21',
          rewardItems: [{ amount: 66, assetKey: '', assetType: 1 }],
        },
      ],
      isEnabled: true,
      makeupPeriodType: 1,
      patternRewardRules: [
        {
          monthDay: undefined,
          patternType: 1,
          rewardItems: [{ amount: 22, assetKey: '', assetType: 1 }],
          weekday: 1,
        },
      ],
      periodicAllowance: 2,
    });
  });

  it('builds weekly preview cells from list rules', () => {
    const days = buildConfigPreviewDays({
      cursor: '2026-04-20',
      state: mapConfigDetailToForm(createConfigDetail()),
    });

    expect(days).toHaveLength(7);
    expect(days[0]).toMatchObject({
      dayLabel: '周一 04-20',
      rewardSummary: '积分 22',
    });
    expect(days[1]).toMatchObject({
      rewardSummary: '积分 66',
    });
  });

  it('marks historical dates as read-only in preview helpers', () => {
    const pastDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    const futureDate = dayjs().add(1, 'day').format('YYYY-MM-DD');

    expect(isEditableRewardDate(pastDate)).toBe(false);
    expect(isEditableRewardDate(futureDate)).toBe(true);

    const weeklyDays = buildConfigPreviewDays({
      cursor: pastDate,
      state: mapConfigDetailToForm(createConfigDetail()),
    });
    expect(weeklyDays.some((item) => item.isEditable === false)).toBe(true);
  });

  it('rejects duplicated date rules', () => {
    const error = validateConfigForm({
      baseRewardItems: [{ amount: 10, assetKey: '', assetType: 1 }],
      dateRules: [
        {
          localId: '1',
          rewardDate: '2026-04-21',
          rewardItems: [{ amount: 1, assetKey: '', assetType: 1 }],
        },
        {
          localId: '2',
          rewardDate: '2026-04-21',
          rewardItems: [{ amount: 2, assetKey: '', assetType: 1 }],
        },
      ],
      makeupPeriodType: 1,
      patternRules: [],
      periodicAllowance: 1,
    });

    expect(error).toContain('具体日期奖励重复');
  });

  it('rejects weekday pattern rules under monthly mode', () => {
    const error = validateConfigForm({
      baseRewardItems: [{ amount: 10, assetKey: '', assetType: 1 }],
      dateRules: [],
      makeupPeriodType: 2,
      patternRules: [
        {
          localId: 'pattern-1',
          patternType: 1,
          rewardItems: [{ amount: 22, assetKey: '', assetType: 1 }],
          weekday: 1,
        },
      ],
      periodicAllowance: 1,
    });

    expect(error).toContain('按自然月模式下不支持按周固定星期奖励规则');
  });

  it('supports rule lookup and upsert/remove helpers for preview-driven editing', () => {
    const state = mapConfigDetailToForm(createConfigDetail());

    expect(getDateRuleByDate(state, '2026-04-21')).toBeTruthy();
    expect(getPatternRuleByWeekday(state, 1)).toBeTruthy();
    expect(getPatternRuleByMonthDay(state, 15)).toBeFalsy();
    expect(getMonthLastDayRule(state)).toBeFalsy();

    upsertDateRule({
      rewardDate: '2026-04-22',
      rewardItems: [{ amount: 88, assetKey: '', assetType: 1 }],
      state,
    });
    expect(getDateRuleByDate(state, '2026-04-22')).toBeTruthy();

    upsertPatternRule({
      monthDay: 15,
      patternType: 2,
      rewardItems: [{ amount: 99, assetKey: '', assetType: 1 }],
      state,
    });
    expect(getPatternRuleByMonthDay(state, 15)).toBeTruthy();

    upsertPatternRule({
      patternType: 3,
      rewardItems: [{ amount: 101, assetKey: '', assetType: 1 }],
      state,
    });
    expect(getMonthLastDayRule(state)).toBeTruthy();

    removeDateRule({
      rewardDate: '2026-04-21',
      state,
    });
    expect(getDateRuleByDate(state, '2026-04-21')).toBeFalsy();

    removePatternRule({
      patternType: 1,
      state,
      weekday: 1,
    });
    expect(getPatternRuleByWeekday(state, 1)).toBeFalsy();
  });

  it('builds weekly and monthly scope options for drawer editing', () => {
    expect(buildWeeklyScopeOptions()).toEqual([
      { label: '仅当前日期生效', value: 'date' },
      { label: '应用到每周这一天', value: 'weekday' },
    ]);

    expect(buildMonthlyScopeOptions('2026-04-21')).toEqual([
      { label: '仅当前日期生效', value: 'date' },
      { label: '应用到每月这一天', value: 'monthDay' },
    ]);

    expect(buildMonthlyScopeOptions('2026-04-30')).toEqual([
      { label: '仅当前日期生效', value: 'date' },
      { label: '应用到每月这一天', value: 'monthDay' },
      { label: '应用到每月最后一天', value: 'monthLastDay' },
    ]);
  });

  it('clears periodic pattern rules when makeup period type changes', () => {
    const state = mapConfigDetailToForm(createConfigDetail());

    (checkInConfigModel as Record<string, any>).applyMakeupPeriodTypeChange(
      state,
      2,
    );

    expect(state.makeupPeriodType).toBe(2);
    expect(state.patternRules).toEqual([]);
  });

  it('groups date reward summaries by month for compact overview rendering', () => {
    const state = mapConfigDetailToForm(
      createConfigDetail({
        dateRewardRules: [
          {
            rewardDate: '2026-04-21',
            rewardItems: [{ amount: 66, assetKey: '', assetType: 1 }],
          },
          {
            rewardDate: '2026-04-30',
            rewardItems: [{ amount: 88, assetKey: '', assetType: 2 }],
          },
          {
            rewardDate: '2026-05-02',
            rewardItems: [{ amount: 99, assetKey: '', assetType: 1 }],
          },
        ],
      }),
    );

    const groups = (
      checkInConfigModel as Record<string, any>
    ).buildDateRuleSummaryGroups(state.dateRules);

    expect(groups).toEqual([
      {
        key: '2026-04',
        label: '2026 年 4 月',
        rules: [
          expect.objectContaining({ rewardDate: '2026-04-21' }),
          expect.objectContaining({ rewardDate: '2026-04-30' }),
        ],
      },
      {
        key: '2026-05',
        label: '2026 年 5 月',
        rules: [expect.objectContaining({ rewardDate: '2026-05-02' })],
      },
    ]);
  });
});

describe('check-in streak config model', () => {
  it('maps current streak config detail to publish form state', () => {
    const state = mapStreakDetailToForm(createStreakDetail());

    expect(state.sourceId).toBe(8);
    expect(state.sourceRuleCode).toBe('streak-day-3');
    expect(state.sourceVersion).toBe(3);
    expect(state.publishStrategy).toBe(1);
    expect(state.effectiveFrom).toBeUndefined();
    expect(state.streakDays).toBe(3);
    expect(state.points).toBe(10);
    expect(state.repeatable).toBe(false);
  });

  it('builds publish payload for a single streak-day record', () => {
    const payload = buildStreakPublishPayload(
      mapStreakDetailToForm(createStreakDetail()),
    );

    expect(payload).toEqual({
      publishStrategy: 1,
      repeatable: false,
      rewardItems: [{ amount: 10, assetKey: '', assetType: 1 }],
      streakDays: 3,
    });
  });

  it('requires explicit effective time when using scheduled publish', () => {
    const error = validateStreakForm({
      effectiveFrom: undefined,
      experience: undefined,
      points: 10,
      publishStrategy: 3,
      repeatable: false,
      sourceVersion: 1,
      streakDays: 3,
    });

    expect(error).toContain('指定生效时间');
  });

  it('rejects empty reward payloads', () => {
    const error = validateStreakForm({
      effectiveFrom: undefined,
      experience: undefined,
      points: undefined,
      publishStrategy: 1,
      repeatable: false,
      sourceVersion: 1,
      streakDays: 3,
    });

    expect(error).toContain('连续奖励项不能为空');
  });
});
