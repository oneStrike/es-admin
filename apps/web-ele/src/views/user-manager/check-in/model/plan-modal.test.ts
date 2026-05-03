import type { CheckInStreakRuleDetail } from './streak-config';

import type {
  AdminCheckInCalendarDayDto,
  CheckInConfigDetailResponse,
} from '#/api/types';

import { describe, expect, it } from 'vitest';

import { dayjs } from '#/utils';

import {
  buildCalendarDetailRequest,
  buildCalendarUserDetailRequest,
  buildDefaultSignedUserQueryDate,
  buildSignedUserGridPageRequest,
  buildSignedUserPageRequest,
  buildStreakDetailRequest,
  buildStreakHistoryDetailRequest,
  isMonthSignedUserQueryDateVisible,
  isPositiveIntegerUserId,
  isSignedUserQueryDateVisible,
  resolveCalendarDay,
} from './calendar-runtime';
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
  removeRewardRuleByScope,
  upsertDateRule,
  upsertPatternRule,
  validateConfigForm,
} from './config';
import { buildBaseRewardItems, parseBaseRewardItems } from './shared';
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
      {
        amount: 10,
        assetKey: '',
        assetType: 1,
        iconUrl: 'https://cdn.example.com/check-in/base-points.png',
      },
      { amount: 5, assetKey: '', assetType: 2 },
    ],
    createdAt: '2026-04-19T00:00:00.000Z',
    dateRewardRules: [
      {
        rewardDate: '2026-04-21',
        rewardItems: [{ amount: 66, assetKey: '', assetType: 1 }],
        rewardOverviewIconUrl:
          'https://cdn.example.com/check-in/date-overview.png',
      },
    ],
    isEnabled: true,
    id: 1,
    makeupIconUrl: 'https://cdn.example.com/check-in/makeup.png',
    makeupPeriodType: 1,
    patternRewardRules: [
      {
        patternType: 1,
        rewardItems: [{ amount: 22, assetKey: '', assetType: 1 }],
        rewardOverviewIconUrl:
          'https://cdn.example.com/check-in/weekday-overview.png',
        weekday: 1,
      },
    ],
    periodicAllowance: 2,
    rewardOverviewIconUrl: 'https://cdn.example.com/check-in/base-overview.png',
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
    effectiveTo: undefined,
    id: 8,
    isCurrent: true,
    publishStrategy: 1,
    repeatable: false,
    rewardItems: [
      {
        amount: 10,
        assetKey: '',
        assetType: 1,
        iconUrl: 'https://cdn.example.com/check-in/streak.png',
      },
    ],
    rewardOverviewIconUrl:
      'https://cdn.example.com/check-in/streak-overview.png',
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
      {
        amount: 10,
        assetKey: '',
        assetType: 1,
        iconUrl: 'https://cdn.example.com/check-in/base-points.png',
      },
      { amount: 5, assetKey: '', assetType: 2 },
    ]);
    expect(state.makeupIconUrl).toBe(
      'https://cdn.example.com/check-in/makeup.png',
    );
    expect(state.rewardOverviewIconUrl).toBe(
      'https://cdn.example.com/check-in/base-overview.png',
    );
    expect(state.dateRules[0]).toMatchObject({
      rewardDate: '2026-04-21',
      rewardItems: [{ amount: 66, assetKey: '', assetType: 1 }],
      rewardOverviewIconUrl:
        'https://cdn.example.com/check-in/date-overview.png',
    });
    expect(state.patternRules[0]).toMatchObject({
      patternType: 1,
      rewardItems: [{ amount: 22, assetKey: '', assetType: 1 }],
      rewardOverviewIconUrl:
        'https://cdn.example.com/check-in/weekday-overview.png',
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
          rewardOverviewIconUrl:
            'https://cdn.example.com/check-in/date-overview.png',
        },
      ],
      makeupIconUrl: 'https://cdn.example.com/check-in/makeup.png',
      makeupPeriodType: 1,
      patternRules: [
        {
          localId: 'pattern-1',
          patternType: 1,
          rewardItems: [{ amount: 22, assetKey: '', assetType: 1 }],
          rewardOverviewIconUrl:
            'https://cdn.example.com/check-in/weekday-overview.png',
          weekday: 1,
        },
      ],
      periodicAllowance: 2,
      rewardOverviewIconUrl:
        'https://cdn.example.com/check-in/base-overview.png',
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
          rewardOverviewIconUrl:
            'https://cdn.example.com/check-in/date-overview.png',
        },
      ],
      isEnabled: true,
      makeupIconUrl: 'https://cdn.example.com/check-in/makeup.png',
      makeupPeriodType: 1,
      patternRewardRules: [
        {
          monthDay: undefined,
          patternType: 1,
          rewardItems: [{ amount: 22, assetKey: '', assetType: 1 }],
          rewardOverviewIconUrl:
            'https://cdn.example.com/check-in/weekday-overview.png',
          weekday: 1,
        },
      ],
      periodicAllowance: 2,
      rewardOverviewIconUrl:
        'https://cdn.example.com/check-in/base-overview.png',
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
      rewardOverviewIconUrl:
        'https://cdn.example.com/check-in/weekday-overview.png',
      rewardSourceType: 3,
      rewardSummary: '积分 22',
    });
    expect(days[1]).toMatchObject({
      rewardOverviewIconUrl:
        'https://cdn.example.com/check-in/date-overview.png',
      rewardSourceType: 2,
      rewardSummary: '积分 66',
    });
  });

  it('falls back to fixed base rewards without carrying the old overview icon', () => {
    const days = buildConfigPreviewDays({
      cursor: '2026-04-20',
      state: mapConfigDetailToForm(
        createConfigDetail({
          dateRewardRules: [],
          patternRewardRules: [],
        }),
      ),
    });

    expect(days[0]).toMatchObject({
      rewardOverviewIconUrl:
        'https://cdn.example.com/check-in/base-overview.png',
      rewardSourceType: 1,
      rewardSummary: '积分 10 / 经验 5',
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
      makeupIconUrl: undefined,
      makeupPeriodType: 1,
      patternRules: [],
      periodicAllowance: 1,
      rewardOverviewIconUrl: undefined,
    });

    expect(error).toContain('具体日期奖励重复');
  });

  it('rejects weekday pattern rules under monthly mode', () => {
    const error = validateConfigForm({
      baseRewardItems: [{ amount: 10, assetKey: '', assetType: 1 }],
      dateRules: [],
      makeupIconUrl: undefined,
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
      rewardOverviewIconUrl: undefined,
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
      rewardOverviewIconUrl: 'https://cdn.example.com/check-in/date-22.png',
      state,
    });
    expect(getDateRuleByDate(state, '2026-04-22')).toMatchObject({
      rewardOverviewIconUrl: 'https://cdn.example.com/check-in/date-22.png',
    });

    upsertPatternRule({
      monthDay: 15,
      patternType: 2,
      rewardItems: [{ amount: 99, assetKey: '', assetType: 1 }],
      rewardOverviewIconUrl: 'https://cdn.example.com/check-in/month-15.png',
      state,
    });
    expect(getPatternRuleByMonthDay(state, 15)).toMatchObject({
      rewardOverviewIconUrl: 'https://cdn.example.com/check-in/month-15.png',
    });

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

  it('removes previous monthly pattern rule without affecting explicit date overrides', () => {
    const state = mapConfigDetailToForm(
      createConfigDetail({
        dateRewardRules: [
          {
            rewardDate: '2026-05-15',
            rewardItems: [{ amount: 77, assetKey: '', assetType: 1 }],
          },
        ],
        makeupPeriodType: 2,
        patternRewardRules: [
          {
            monthDay: 15,
            patternType: 2,
            rewardItems: [{ amount: 22, assetKey: '', assetType: 1 }],
          },
        ],
      }),
    );

    removeRewardRuleByScope({
      scope: 'monthDay',
      state,
      targetMonthDay: 15,
    });

    expect(getPatternRuleByMonthDay(state, 15)).toBeFalsy();
    expect(getDateRuleByDate(state, '2026-05-15')).toMatchObject({
      rewardItems: [{ amount: 77, assetKey: '', assetType: 1 }],
    });
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

  it('builds and parses fixed base rewards for inline editing', () => {
    expect(buildBaseRewardItems(12, 8)).toEqual([
      { amount: 12, assetKey: '', assetType: 1 },
      { amount: 8, assetKey: '', assetType: 2 },
    ]);

    expect(
      parseBaseRewardItems([
        { amount: 12, assetKey: '', assetType: 1 },
        { amount: 8, assetKey: '', assetType: 2 },
        { amount: 99, assetKey: 'ignored', assetType: 3 },
      ]),
    ).toEqual({
      experience: 8,
      points: 12,
    });
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
    expect(state.rewardOverviewIconUrl).toBe(
      'https://cdn.example.com/check-in/streak-overview.png',
    );
    expect(state.rewardItems).toEqual([
      {
        amount: 10,
        assetKey: '',
        assetType: 1,
        iconUrl: 'https://cdn.example.com/check-in/streak.png',
      },
    ]);
    expect(state.repeatable).toBe(false);
  });

  it('builds publish payload for a single streak-day record', () => {
    const payload = buildStreakPublishPayload(
      mapStreakDetailToForm(createStreakDetail()),
    );

    expect(payload).toEqual({
      publishStrategy: 1,
      repeatable: false,
      rewardItems: [
        {
          amount: 10,
          assetKey: '',
          assetType: 1,
          iconUrl: 'https://cdn.example.com/check-in/streak.png',
        },
      ],
      rewardOverviewIconUrl:
        'https://cdn.example.com/check-in/streak-overview.png',
      streakDays: 3,
    });
  });

  it('requires explicit effective time when using scheduled publish', () => {
    const error = validateStreakForm({
      effectiveFrom: undefined,
      publishStrategy: 3,
      repeatable: false,
      rewardItems: [{ amount: 10, assetKey: '', assetType: 1 }],
      sourceVersion: 1,
      streakDays: 3,
    });

    expect(error).toContain('指定生效时间');
  });

  it('rejects empty reward payloads', () => {
    const error = validateStreakForm({
      effectiveFrom: undefined,
      publishStrategy: 1,
      repeatable: false,
      rewardItems: [],
      sourceVersion: 1,
      streakDays: 3,
    });

    expect(error).toContain('连续奖励项不能为空');
  });
});

describe('check-in calendar runtime model', () => {
  const days: AdminCheckInCalendarDayDto[] = [
    {
      dayIndex: 1,
      isFuture: false,
      isToday: false,
      makeupSignCount: 0,
      normalSignCount: 3,
      signDate: '2026-05-04',
      signedCount: 3,
      streakRewardTriggerCount: 0,
    },
    {
      dayIndex: 2,
      isFuture: false,
      isToday: true,
      makeupSignCount: 1,
      normalSignCount: 5,
      signDate: '2026-05-05',
      signedCount: 6,
      streakRewardTriggerCount: 2,
    },
  ];

  it('builds default signed-user query date from today', () => {
    expect(buildDefaultSignedUserQueryDate(dayjs('2026-05-04'))).toBe(
      '2026-05-04',
    );
  });

  it('resolves the selected calendar day by exact target date', () => {
    expect(resolveCalendarDay(days, '2026-05-04')).toEqual(days[0]);
    expect(resolveCalendarDay(days, '2026-05-01')).toBeUndefined();
    expect(resolveCalendarDay([], '2026-05-01')).toBeUndefined();
  });

  it('shows signed-user query entry for historical dates and today only', () => {
    expect(isSignedUserQueryDateVisible('2026-05-04', '2026-05-05')).toBe(true);
    expect(isSignedUserQueryDateVisible('2026-05-05', '2026-05-05')).toBe(true);
    expect(isSignedUserQueryDateVisible('2026-05-06', '2026-05-05')).toBe(
      false,
    );
  });

  it('shows month signed-user query entry only for current-month non-future days', () => {
    expect(
      isMonthSignedUserQueryDateVisible(
        { date: '2026-05-04', isCurrentMonth: true },
        '2026-05-05',
      ),
    ).toBe(true);
    expect(
      isMonthSignedUserQueryDateVisible(
        { date: '2026-05-05', isCurrentMonth: true },
        '2026-05-05',
      ),
    ).toBe(true);
    expect(
      isMonthSignedUserQueryDateVisible(
        { date: '2026-05-06', isCurrentMonth: true },
        '2026-05-05',
      ),
    ).toBe(false);
    expect(
      isMonthSignedUserQueryDateVisible(
        { date: '2026-04-30', isCurrentMonth: false },
        '2026-05-05',
      ),
    ).toBe(false);
  });

  it('builds calendar runtime request payloads with whitelisted fields', () => {
    expect(buildCalendarDetailRequest('2026-05-04')).toEqual({
      targetDate: '2026-05-04',
    });
    expect(buildSignedUserPageRequest('2026-05-04', 2, 20)).toEqual({
      pageIndex: 2,
      pageSize: 20,
      targetDate: '2026-05-04',
    });
    expect(
      buildSignedUserGridPageRequest('2026-05-04', {
        currentPage: 3,
        pageSize: 30,
      }),
    ).toEqual({
      pageIndex: 3,
      pageSize: 30,
      targetDate: '2026-05-04',
    });
    expect(buildSignedUserGridPageRequest('2026-05-04', {})).toEqual({
      pageIndex: 1,
      pageSize: 15,
      targetDate: '2026-05-04',
    });
    expect(buildCalendarUserDetailRequest('2026-05-04', 88)).toEqual({
      targetDate: '2026-05-04',
      userId: 88,
    });
    expect(buildStreakDetailRequest(9)).toEqual({ id: 9 });
    expect(buildStreakHistoryDetailRequest(10)).toEqual({ id: 10 });
  });

  it('accepts only positive integer user id values', () => {
    expect(isPositiveIntegerUserId(1)).toBe(true);
    expect(isPositiveIntegerUserId('88')).toBe(true);
    expect(isPositiveIntegerUserId(0)).toBe(false);
    expect(isPositiveIntegerUserId(-1)).toBe(false);
    expect(isPositiveIntegerUserId(1.5)).toBe(false);
    expect(isPositiveIntegerUserId('')).toBe(false);
    expect(isPositiveIntegerUserId('abc')).toBe(false);
    expect(isPositiveIntegerUserId(undefined)).toBe(false);
  });
});
