import type {
  CheckInPlanDetailResponseDto,
  GrowthRewardItemDto,
} from '#/api/types';

import { describe, expect, it } from 'vitest';

import {
  buildMonthCalendar,
  buildPlanSubmitPayload,
  buildPlanWithRewardPayload,
  buildWeekCalendar,
  CHECK_IN_CYCLE_TYPE,
  CHECK_IN_PATTERN_TYPE,
  createPlanDateDisableHandlers,
  getMonthlyRewardModeOptions,
  getPlanFormDisplayValues,
  getWeeklyRewardModeOptions,
  hasExistingRewardConfig,
  isPlanEndDateDisabled,
  isPlanStartDateDisabled,
  mapPlanDetailToEditorState,
  normalizePlanFormValues,
  resolveMonthlyRewardMode,
  resolveWeeklyRewardMode,
} from './plan-modal';
import {
  clampRewardPreviewMonthCursor,
  clampRewardPreviewWeekCursor,
  createRewardPreviewState,
} from './reward-preview';

function createRewardItems(params: {
  experience?: number;
  points?: number;
} = {}): GrowthRewardItemDto[] {
  const rewardItems: GrowthRewardItemDto[] = [];

  if (params.points) {
    rewardItems.push({
      amount: params.points,
      assetKey: '',
      assetType: 1,
    });
  }

  if (params.experience) {
    rewardItems.push({
      amount: params.experience,
      assetKey: '',
      assetType: 2,
    });
  }

  return rewardItems;
}

function createPlanDetail(
  overrides: Partial<CheckInPlanDetailResponseDto> = {},
): CheckInPlanDetailResponseDto {
  return {
    activeCycleCount: 1,
    allowMakeupCountPerCycle: 0,
    baseRewardItems: createRewardItems(),
    createdAt: '2026-04-10T00:00:00Z',
    cycleType: CHECK_IN_CYCLE_TYPE.WEEKLY,
    dateRewardRules: [],
    id: 1,
    patternRewardRules: [],
    pendingRewardCount: 0,
    planCode: 'check_in_plan',
    planName: '签到计划',
    ruleCount: 0,
    startDate: '2026-05-04',
    status: 1,
    streakRewardRules: [],
    updatedAt: '2026-04-10T01:00:00Z',
    ...overrides,
  };
}

describe('mapPlanDetailToEditorState', () => {
  it('should map latest reward items fields to editor state', () => {
    const detail = createPlanDetail({
      allowMakeupCountPerCycle: 2,
      baseRewardItems: createRewardItems({
        experience: 5,
        points: 10,
      }),
      cycleType: CHECK_IN_CYCLE_TYPE.MONTHLY,
      dateRewardRules: [
        {
          rewardDate: '2026-05-03',
          rewardItems: createRewardItems({ points: 66 }),
        },
      ],
      endDate: '2026-07-31',
      id: 9,
      patternRewardRules: [
        {
          monthDay: 15,
          patternType: CHECK_IN_PATTERN_TYPE.MONTH_DAY,
          rewardItems: createRewardItems({ experience: 8 }),
        },
        {
          patternType: CHECK_IN_PATTERN_TYPE.MONTH_LAST_DAY,
          rewardItems: createRewardItems({ points: 99 }),
        },
      ],
      planCode: 'check_in_2026',
      planName: '2026 签到',
      ruleCount: 2,
      startDate: '2026-05-01',
      streakRewardRules: [
        {
          repeatable: false,
          rewardItems: createRewardItems({ points: 20 }),
          ruleCode: 'STREAK_3',
          status: 1,
          streakDays: 3,
        },
      ],
    });

    const state = mapPlanDetailToEditorState(detail);

    expect(state.plan.id).toBe(9);
    expect(state.plan.planName).toBe('2026 签到');
    expect(state.reward.baseRewardPoints).toBe(10);
    expect(state.reward.baseRewardExperience).toBe(5);
    expect(state.reward.patternRules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: 'MONTH_DAY:15',
          monthDay: 15,
          patternType: CHECK_IN_PATTERN_TYPE.MONTH_DAY,
        }),
        expect.objectContaining({
          key: 'MONTH_LAST_DAY',
          patternType: CHECK_IN_PATTERN_TYPE.MONTH_LAST_DAY,
        }),
      ]),
    );
    expect(state.reward.dateRules).toEqual([
      expect.objectContaining({
        localId: 'date-2026-05-03',
        rewardDate: '2026-05-03',
      }),
    ]);
    expect(state.reward.streakRules).toEqual([
      expect.objectContaining({
        localId: 'streak-STREAK_3',
        ruleCode: 'STREAK_3',
        streakDays: 3,
      }),
    ]);
    expect(state.reward.monthCursor).toBe('2026-05');
    expect(state.rewardConfigExists).toBe(true);
  });
});

describe('buildPlanWithRewardPayload', () => {
  it('should build weekly plan payload with weekday patterns only', () => {
    const payload = buildPlanWithRewardPayload({
      cycleType: CHECK_IN_CYCLE_TYPE.WEEKLY,
      plan: {
        allowMakeupCountPerCycle: 1,
        cycleType: CHECK_IN_CYCLE_TYPE.WEEKLY,
        endDate: '2026-06-30',
        id: 5,
        planCode: 'test_plan',
        planName: '测试计划',
        startDate: '2026-05-01',
        status: 1,
      },
      reward: {
        baseRewardExperience: 5,
        baseRewardPoints: 10,
        dateRules: [
          {
            experience: 1,
            localId: 'date-1',
            points: 2,
            rewardDate: '2026-05-03',
          },
        ],
        monthCursor: '2026-05',
        monthlyRewardMode: 'date',
        patternRules: [
          {
            experience: 0,
            key: 'WEEKDAY:1',
            patternType: CHECK_IN_PATTERN_TYPE.WEEKDAY,
            points: 22,
            weekday: 1,
          },
          {
            key: 'MONTH_DAY:15',
            monthDay: 15,
            patternType: CHECK_IN_PATTERN_TYPE.MONTH_DAY,
            points: 88,
          },
        ],
        streakRules: [
          {
            experience: 9,
            localId: 'streak-1',
            points: 30,
            repeatable: false,
            ruleCode: 'STREAK_3',
            status: 1,
            streakDays: 3,
          },
        ],
        weekCursor: '2026-04-28',
        weeklyRewardMode: 'weekday',
      },
    });

    expect(payload).toEqual({
      allowMakeupCountPerCycle: 1,
      baseRewardItems: createRewardItems({
        experience: 5,
        points: 10,
      }),
      cycleType: CHECK_IN_CYCLE_TYPE.WEEKLY,
      dateRewardRules: [
        {
          rewardDate: '2026-05-03',
          rewardItems: createRewardItems({
            experience: 1,
            points: 2,
          }),
        },
      ],
      endDate: '2026-06-30',
      id: 5,
      patternRewardRules: [
        {
          patternType: CHECK_IN_PATTERN_TYPE.WEEKDAY,
          rewardItems: createRewardItems({ points: 22 }),
          weekday: 1,
        },
      ],
      planCode: 'test_plan',
      planName: '测试计划',
      startDate: '2026-05-01',
      status: 1,
      streakRewardRules: [
        {
          repeatable: false,
          rewardItems: createRewardItems({
            experience: 9,
            points: 30,
          }),
          ruleCode: 'STREAK_3',
          status: 1,
          streakDays: 3,
        },
      ],
    });
  });

  it('should build monthly plan payload with both pattern and date rules', () => {
    const payload = buildPlanWithRewardPayload({
      cycleType: CHECK_IN_CYCLE_TYPE.MONTHLY,
      plan: {
        allowMakeupCountPerCycle: 0,
        cycleType: CHECK_IN_CYCLE_TYPE.MONTHLY,
        id: 7,
        planCode: 'monthly_test',
        planName: '月度测试',
        startDate: '2026-05-01',
        status: 1,
      },
      reward: {
        baseRewardExperience: undefined,
        baseRewardPoints: 12,
        dateRules: [
          {
            localId: 'date-1',
            points: 66,
            rewardDate: '2026-05-03',
          },
        ],
        monthCursor: '2026-05',
        monthlyRewardMode: 'date',
        patternRules: [
          {
            experience: 8,
            key: 'MONTH_DAY:15',
            monthDay: 15,
            patternType: CHECK_IN_PATTERN_TYPE.MONTH_DAY,
          },
          {
            key: 'MONTH_LAST_DAY',
            patternType: CHECK_IN_PATTERN_TYPE.MONTH_LAST_DAY,
            points: 99,
          },
        ],
        streakRules: [],
        weekCursor: '2026-05-05',
        weeklyRewardMode: 'weekday',
      },
    });

    expect(payload).toEqual({
      allowMakeupCountPerCycle: 0,
      baseRewardItems: createRewardItems({ points: 12 }),
      cycleType: CHECK_IN_CYCLE_TYPE.MONTHLY,
      dateRewardRules: [
        {
          rewardDate: '2026-05-03',
          rewardItems: createRewardItems({ points: 66 }),
        },
      ],
      id: 7,
      patternRewardRules: [
        {
          monthDay: 15,
          patternType: CHECK_IN_PATTERN_TYPE.MONTH_DAY,
          rewardItems: createRewardItems({ experience: 8 }),
        },
        {
          patternType: CHECK_IN_PATTERN_TYPE.MONTH_LAST_DAY,
          rewardItems: createRewardItems({ points: 99 }),
        },
      ],
      planCode: 'monthly_test',
      planName: '月度测试',
      startDate: '2026-05-01',
      status: 1,
      streakRewardRules: [],
    });
  });
});

describe('buildMonthCalendar', () => {
  it('should generate actual month cells and disable dates outside the plan window', () => {
    const cells = buildMonthCalendar({
      cycleType: CHECK_IN_CYCLE_TYPE.MONTHLY,
      dateRules: [
        {
          localId: 'date-1',
          points: 66,
          rewardDate: '2026-05-03',
        },
      ],
      endDate: '2026-05-20',
      mode: 'date',
      monthCursor: '2026-05',
      patternRules: [
        {
          key: 'MONTH_DAY:15',
          monthDay: 15,
          patternType: CHECK_IN_PATTERN_TYPE.MONTH_DAY,
          points: 88,
        },
      ],
      startDate: '2026-05-03',
    });

    expect(cells.find((item) => item.date === '2026-05-01')).toEqual(
      expect.objectContaining({
        isDisabled: true,
      }),
    );
    expect(cells.find((item) => item.date === '2026-05-03')).toEqual(
      expect.objectContaining({
        isDisabled: false,
        rewardSummary: '积分 66',
      }),
    );
    expect(cells.find((item) => item.date === '2026-05-21')).toEqual(
      expect.objectContaining({
        isDisabled: true,
      }),
    );
  });

  it('should prefer date reward over monthly pattern and support month-last-day reward', () => {
    const cells = buildMonthCalendar({
      cycleType: CHECK_IN_CYCLE_TYPE.MONTHLY,
      dateRules: [
        {
          localId: 'date-1',
          points: 66,
          rewardDate: '2026-05-03',
        },
      ],
      endDate: '2026-05-31',
      mode: 'date',
      monthCursor: '2026-05',
      patternRules: [
        {
          key: 'MONTH_DAY:3',
          monthDay: 3,
          patternType: CHECK_IN_PATTERN_TYPE.MONTH_DAY,
          points: 33,
        },
        {
          key: 'MONTH_LAST_DAY',
          patternType: CHECK_IN_PATTERN_TYPE.MONTH_LAST_DAY,
          points: 99,
        },
      ],
      startDate: '2026-05-01',
    });

    expect(cells.find((item) => item.date === '2026-05-03')).toEqual(
      expect.objectContaining({
        rewardSummary: '积分 66',
      }),
    );
    expect(cells.find((item) => item.date === '2026-05-31')).toEqual(
      expect.objectContaining({
        patternRuleKey: 'MONTH_LAST_DAY',
        rewardSummary: '积分 99',
      }),
    );
  });

  it('should only render the necessary number of calendar rows for a month', () => {
    const cells = buildMonthCalendar({
      cycleType: CHECK_IN_CYCLE_TYPE.MONTHLY,
      dateRules: [],
      endDate: '2026-05-31',
      mode: 'date',
      monthCursor: '2026-05',
      patternRules: [],
      startDate: '2026-05-01',
    });

    expect(cells).toHaveLength(35);
  });
});

describe('buildWeekCalendar', () => {
  it('should prefer specific date reward over weekday reward', () => {
    const cells = buildWeekCalendar({
      dateRules: [
        {
          localId: 'date-1',
          points: 66,
          rewardDate: '2026-05-05',
        },
      ],
      patternRules: [
        {
          key: 'WEEKDAY:2',
          patternType: CHECK_IN_PATTERN_TYPE.WEEKDAY,
          points: 22,
          weekday: 2,
        },
      ],
      weekCursor: '2026-05-04',
    });

    expect(cells.find((item) => item.date === '2026-05-05')).toEqual(
      expect.objectContaining({
        rewardSummary: '积分 66',
        weekdayRuleKey: 'WEEKDAY:2',
      }),
    );
    expect(cells.find((item) => item.date === '2026-05-06')).toEqual(
      expect.objectContaining({
        rewardSummary: '沿用默认',
      }),
    );
  });
});

describe('hasExistingRewardConfig', () => {
  it('should detect any configured reward bucket', () => {
    expect(
      hasExistingRewardConfig({
        baseRewardItems: createRewardItems({ points: 1 }),
      }),
    ).toBe(true);
    expect(
      hasExistingRewardConfig({
        dateRewardRules: [
          {
            rewardItems: createRewardItems({ points: 2 }),
          },
        ],
      }),
    ).toBe(true);
    expect(
      hasExistingRewardConfig({
        patternRewardRules: [
          {
            rewardItems: createRewardItems({ points: 3 }),
          },
        ],
      }),
    ).toBe(true);
    expect(
      hasExistingRewardConfig({
        streakRewardRules: [
          {
            rewardItems: createRewardItems({ points: 4 }),
          },
        ],
      }),
    ).toBe(true);
    expect(hasExistingRewardConfig({})).toBe(false);
  });
});

describe('plan date constraints', () => {
  it('should only allow monday as weekly start date and first day as monthly start date', () => {
    expect(
      isPlanStartDateDisabled(
        new Date('2026-05-04'),
        CHECK_IN_CYCLE_TYPE.WEEKLY,
      ),
    ).toBe(false);
    expect(
      isPlanStartDateDisabled(
        new Date('2026-05-05'),
        CHECK_IN_CYCLE_TYPE.WEEKLY,
      ),
    ).toBe(true);
    expect(
      isPlanStartDateDisabled(
        new Date('2026-05-01'),
        CHECK_IN_CYCLE_TYPE.MONTHLY,
      ),
    ).toBe(false);
    expect(
      isPlanStartDateDisabled(
        new Date('2026-05-02'),
        CHECK_IN_CYCLE_TYPE.MONTHLY,
      ),
    ).toBe(true);
  });

  it('should only allow sunday or month-end as end date and block dates before start', () => {
    expect(
      isPlanEndDateDisabled(
        new Date('2026-05-10'),
        CHECK_IN_CYCLE_TYPE.WEEKLY,
        '2026-05-04',
      ),
    ).toBe(false);
    expect(
      isPlanEndDateDisabled(
        new Date('2026-05-09'),
        CHECK_IN_CYCLE_TYPE.WEEKLY,
        '2026-05-04',
      ),
    ).toBe(true);
    expect(
      isPlanEndDateDisabled(
        new Date('2026-05-31'),
        CHECK_IN_CYCLE_TYPE.MONTHLY,
        '2026-05-01',
      ),
    ).toBe(false);
    expect(
      isPlanEndDateDisabled(
        new Date('2026-05-30'),
        CHECK_IN_CYCLE_TYPE.MONTHLY,
        '2026-05-01',
      ),
    ).toBe(true);
    expect(
      isPlanEndDateDisabled(
        new Date('2026-04-30'),
        CHECK_IN_CYCLE_TYPE.MONTHLY,
        '2026-05-01',
      ),
    ).toBe(true);
  });

  it('should use the latest cycle type when the same disabledDate handler is reused', () => {
    const state = {
      cycleType: CHECK_IN_CYCLE_TYPE.WEEKLY as 1 | 2,
      startDate: '2026-05-05',
    };
    const handlers = createPlanDateDisableHandlers(() => state);

    expect(handlers.isStartDateDisabled(new Date('2026-05-04'))).toBe(false);
    expect(handlers.isStartDateDisabled(new Date('2026-05-01'))).toBe(true);

    state.cycleType = CHECK_IN_CYCLE_TYPE.MONTHLY;
    state.startDate = '2026-05-01';

    expect(handlers.isStartDateDisabled(new Date('2026-05-01'))).toBe(false);
    expect(handlers.isStartDateDisabled(new Date('2026-05-04'))).toBe(false);
    expect(handlers.isEndDateDisabled(new Date('2026-05-01'))).toBe(false);
    expect(handlers.isEndDateDisabled(new Date('2026-04-01'))).toBe(true);
  });
});

describe('plan form date normalization', () => {
  it('should convert monthly picker values to actual plan boundary dates', () => {
    expect(
      normalizePlanFormValues({
        allowMakeupCountPerCycle: 0,
        cycleType: CHECK_IN_CYCLE_TYPE.MONTHLY,
        endDate: '2026-07',
        planCode: 'A',
        planName: 'B',
        startDate: '2026-05',
        status: 1,
      }),
    ).toEqual(
      expect.objectContaining({
        endDate: '2026-07-31',
        startDate: '2026-05-01',
      }),
    );
  });

  it('should expose monthly dates back to the form as month strings', () => {
    expect(
      getPlanFormDisplayValues({
        allowMakeupCountPerCycle: 0,
        cycleType: CHECK_IN_CYCLE_TYPE.MONTHLY,
        endDate: '2026-07-31',
        planCode: 'A',
        planName: 'B',
        startDate: '2026-05-01',
        status: 1,
      }),
    ).toEqual(
      expect.objectContaining({
        endDate: '2026-07',
        startDate: '2026-05',
      }),
    );
  });
});

describe('monthly reward mode selection', () => {
  it('should only show current-date and month-day options in monthly radio choices', () => {
    expect(getMonthlyRewardModeOptions('2026-05-30')).toEqual([
      { label: '仅当前日期生效', value: 'date' },
      { label: '应用到周期内每个月这一天', value: 'month_day' },
    ]);
    expect(getMonthlyRewardModeOptions('2026-05-31')).toEqual([
      { label: '仅当前日期生效', value: 'date' },
      { label: '应用到周期内每个月这一天', value: 'month_day' },
    ]);
  });

  it('should resolve the current monthly reward mode from existing rules', () => {
    expect(
      resolveMonthlyRewardMode({
        dateRules: [
          {
            localId: 'date-1',
            points: 66,
            rewardDate: '2026-05-31',
          },
        ],
        patternRules: [
          {
            key: 'MONTH_DAY:31',
            monthDay: 31,
            patternType: CHECK_IN_PATTERN_TYPE.MONTH_DAY,
            points: 33,
          },
          {
            key: 'MONTH_LAST_DAY',
            patternType: CHECK_IN_PATTERN_TYPE.MONTH_LAST_DAY,
            points: 99,
          },
        ],
        selectedDate: '2026-05-31',
      }),
    ).toBe('date');

    expect(
      resolveMonthlyRewardMode({
        dateRules: [],
        patternRules: [
          {
            key: 'MONTH_LAST_DAY',
            patternType: CHECK_IN_PATTERN_TYPE.MONTH_LAST_DAY,
            points: 99,
          },
        ],
        selectedDate: '2026-05-31',
      }),
    ).toBe('date');

    expect(
      resolveMonthlyRewardMode({
        dateRules: [],
        patternRules: [
          {
            key: 'MONTH_DAY:15',
            monthDay: 15,
            patternType: CHECK_IN_PATTERN_TYPE.MONTH_DAY,
            points: 88,
          },
        ],
        selectedDate: '2026-05-15',
      }),
    ).toBe('month_day');
  });
});

describe('weekly reward mode selection', () => {
  it('should expose current-date and weekday options for weekly rules', () => {
    expect(getWeeklyRewardModeOptions()).toEqual([
      { label: '仅当前日期生效', value: 'date' },
      { label: '应用到周期内每周这一天', value: 'weekday' },
    ]);
  });

  it('should resolve weekly reward mode from current rules', () => {
    expect(
      resolveWeeklyRewardMode({
        dateRules: [
          {
            localId: 'date-1',
            points: 66,
            rewardDate: '2026-05-05',
          },
        ],
        patternRules: [
          {
            key: 'WEEKDAY:2',
            patternType: CHECK_IN_PATTERN_TYPE.WEEKDAY,
            points: 22,
            weekday: 2,
          },
        ],
        selectedDate: '2026-05-05',
      }),
    ).toBe('date');

    expect(
      resolveWeeklyRewardMode({
        dateRules: [],
        patternRules: [
          {
            key: 'WEEKDAY:2',
            patternType: CHECK_IN_PATTERN_TYPE.WEEKDAY,
            points: 22,
            weekday: 2,
          },
        ],
        selectedDate: '2026-05-05',
      }),
    ).toBe('weekday');
  });
});

describe('reward preview state', () => {
  it('should create readonly preview state from plan detail', () => {
    const detail = createPlanDetail({
      allowMakeupCountPerCycle: 1,
      baseRewardItems: createRewardItems({
        experience: 8,
        points: 18,
      }),
      dateRewardRules: [
        {
          rewardDate: '2026-05-06',
          rewardItems: createRewardItems({ points: 66 }),
        },
      ],
      endDate: '2026-05-24',
      id: 12,
      patternRewardRules: [
        {
          patternType: CHECK_IN_PATTERN_TYPE.WEEKDAY,
          rewardItems: createRewardItems({ experience: 10 }),
          weekday: 3,
        },
      ],
      planCode: 'weekly-preview',
      planName: '签到周计划',
      ruleCount: 2,
      streakRewardRules: [
        {
          repeatable: false,
          rewardItems: createRewardItems({ points: 12 }),
          ruleCode: 'STREAK_7',
          status: 1,
          streakDays: 7,
        },
        {
          repeatable: true,
          rewardItems: createRewardItems({ experience: 6 }),
          ruleCode: 'STREAK_3',
          status: 1,
          streakDays: 3,
        },
      ],
    });

    const previewState = createRewardPreviewState(detail);

    expect(previewState.planName).toBe('签到周计划');
    expect(previewState.baseRewardSummary).toBe('积分 18 / 经验 8');
    expect(previewState.reward.weekCursor).toBe('2026-05-04');
    expect(previewState.reward.monthCursor).toBe('2026-05');
    expect(previewState.streakRules).toEqual([
      expect.objectContaining({
        repeatable: true,
        rewardSummary: '经验 6',
        streakDays: 3,
      }),
      expect.objectContaining({
        repeatable: false,
        rewardSummary: '积分 12',
        streakDays: 7,
      }),
    ]);
  });

  it('should clamp preview week cursor into the plan window', () => {
    expect(
      clampRewardPreviewWeekCursor({
        endDate: '2026-05-24',
        startDate: '2026-05-04',
        weekCursor: '2026-04-20',
      }),
    ).toBe('2026-05-04');

    expect(
      clampRewardPreviewWeekCursor({
        endDate: '2026-05-24',
        startDate: '2026-05-04',
        weekCursor: '2026-05-25',
      }),
    ).toBe('2026-05-18');
  });

  it('should clamp preview month cursor into the plan window', () => {
    expect(
      clampRewardPreviewMonthCursor({
        endDate: '2026-07-31',
        monthCursor: '2026-04',
        startDate: '2026-05-01',
      }),
    ).toBe('2026-05');

    expect(
      clampRewardPreviewMonthCursor({
        endDate: '2026-07-31',
        monthCursor: '2026-09',
        startDate: '2026-05-01',
      }),
    ).toBe('2026-07');
  });
});

describe('buildPlanSubmitPayload', () => {
  it('should build update payload when plan id exists', () => {
    const payload = buildPlanSubmitPayload({
      allowMakeupCountPerCycle: 2,
      cycleType: CHECK_IN_CYCLE_TYPE.WEEKLY,
      endDate: '2026-05-31',
      id: 9,
      planCode: ' weekly_plan ',
      planName: ' 每周签到 ',
      startDate: '2026-05-04',
      status: 1,
    });

    expect(payload).toEqual({
      allowMakeupCountPerCycle: 2,
      cycleType: CHECK_IN_CYCLE_TYPE.WEEKLY,
      endDate: '2026-05-31',
      id: 9,
      planCode: 'weekly_plan',
      planName: '每周签到',
      startDate: '2026-05-04',
      status: 1,
    });
  });

  it('should build create payload when plan id does not exist', () => {
    const payload = buildPlanSubmitPayload({
      allowMakeupCountPerCycle: 0,
      cycleType: CHECK_IN_CYCLE_TYPE.MONTHLY,
      planCode: ' monthly_plan ',
      planName: ' 月度签到 ',
      startDate: '2026-05-01',
      status: 0,
    });

    expect(payload).toEqual({
      allowMakeupCountPerCycle: 0,
      cycleType: CHECK_IN_CYCLE_TYPE.MONTHLY,
      endDate: undefined,
      planCode: 'monthly_plan',
      planName: '月度签到',
      startDate: '2026-05-01',
      status: 0,
    });
  });
});
