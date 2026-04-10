import type { Dayjs } from 'dayjs';

import type {
  CheckInPatternRewardRuleItemDto,
  CheckInPlanCreateRequest,
  CheckInPlanDetailResponseDto,
  CheckInPlanUpdateRequest,
  CheckInRewardConfigDto,
  CreateCheckInDateRewardRuleDto,
  CreateCheckInPatternRewardRuleDto,
  CreateCheckInPlanRewardConfigDto,
  CreateCheckInStreakRewardRuleDto,
  UpdateCheckInPlanRewardConfigDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { dayjs } from '#/utils';

export type CheckInRewardConfigValue = CheckInRewardConfigDto;
export type CheckInCycleType = CheckInPlanDetailResponseDto['cycleType'];
export type CheckInPatternType = CheckInPatternRewardRuleItemDto['patternType'];
export type CheckInMonthlyRewardMode = 'date' | 'month_day' | 'month_last_day';
export type CheckInWeeklyRewardMode = 'date' | 'weekday';

type PlanFormFields = Pick<
  CheckInPlanDetailResponseDto,
  | 'allowMakeupCountPerCycle'
  | 'cycleType'
  | 'endDate'
  | 'planCode'
  | 'planName'
  | 'startDate'
  | 'status'
>;

export type CheckInPlanFormModel = Partial<
  Pick<CheckInPlanUpdateRequest, 'id'>
> &
  PlanFormFields;

export type CheckInPatternRuleDraft = {
  experience?: CheckInRewardConfigValue['experience'];
  id?: number;
  key: string;
  monthDay?: number;
  patternType: CheckInPatternType;
  points?: CheckInRewardConfigValue['points'];
  weekday?: number;
};

export type CheckInDateRuleDraft = {
  experience?: CheckInRewardConfigValue['experience'];
  id?: number;
  localId: string;
  points?: CheckInRewardConfigValue['points'];
  rewardDate: string;
};

export type CheckInStreakRuleDraft = {
  experience?: CheckInRewardConfigValue['experience'];
  id?: number;
  localId: string;
  points?: CheckInRewardConfigValue['points'];
  repeatable: boolean;
  ruleCode: string;
  status: 0 | 1;
  streakDays?: number;
};

export type CheckInRewardFormModel = {
  baseRewardExperience?: CheckInRewardConfigValue['experience'];
  baseRewardPoints?: CheckInRewardConfigValue['points'];
  dateRules: CheckInDateRuleDraft[];
  monthCursor: string;
  monthlyRewardMode: CheckInMonthlyRewardMode;
  patternRules: CheckInPatternRuleDraft[];
  streakRules: CheckInStreakRuleDraft[];
  weekCursor: string;
  weeklyRewardMode: CheckInWeeklyRewardMode;
};

export type CheckInPlanEditorState = {
  plan: CheckInPlanFormModel;
  reward: CheckInRewardFormModel;
  rewardConfigExists: boolean;
};

export type CheckInMonthCalendarCell = {
  date: string;
  day: number;
  isCurrentMonth: boolean;
  isDisabled: boolean;
  isInPlanWindow: boolean;
  isLastDayOfMonth: boolean;
  patternRuleKey?: string;
  rewardSummary: string;
};

export type CheckInWeekCalendarCell = {
  date: string;
  dayLabel: string;
  isDisabled: boolean;
  rewardSummary: string;
  weekday: number;
  weekdayRuleKey?: string;
};

export const weeklyCalendarLabels = [
  { dayLabel: '周一', value: 1 },
  { dayLabel: '周二', value: 2 },
  { dayLabel: '周三', value: 3 },
  { dayLabel: '周四', value: 4 },
  { dayLabel: '周五', value: 5 },
  { dayLabel: '周六', value: 6 },
  { dayLabel: '周日', value: 7 },
];

export const planFormSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      maxlength: 200,
      placeholder: '请输入签到计划名称',
      showWordLimit: true,
    },
    fieldName: 'planName',
    label: '计划名称',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      maxlength: 50,
      placeholder: '请输入签到计划编码',
      showWordLimit: true,
    },
    fieldName: 'planCode',
    label: '计划编码',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      options: [
        { color: 'info', label: '草稿', value: 0 },
        { color: 'success', label: '已发布', value: 1 },
        { color: 'danger', label: '已下线', value: 2 },
        { color: 'warning', label: '已停用', value: 3 },
      ],
      placeholder: '请选择计划状态',
    },
    defaultValue: 0,
    fieldName: 'status',
    label: '计划状态',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      options: [
        { color: 'warning', label: '按周', value: 'weekly' },
        { color: 'success', label: '按月', value: 'monthly' },
      ],
      placeholder: '请选择周期类型',
    },
    defaultValue: 'weekly',
    fieldName: 'cycleType',
    label: '周期类型',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 0,
      placeholder: '请输入每周期补签次数',
    },
    defaultValue: 0,
    fieldName: 'allowMakeupCountPerCycle',
    label: '每周期补签次数',
    rules: 'required',
  },
  {
    component: 'DatePicker',
    componentProps: {
      class: '!w-full',
      placeholder: '请选择开始日期',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
    },
    defaultValue: dayjs().format('YYYY-MM-DD'),
    fieldName: 'startDate',
    label: '开始日期',
    rules: 'required',
  },
  {
    component: 'DatePicker',
    componentProps: {
      class: '!w-full',
      placeholder: '请选择结束日期',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
    },
    fieldName: 'endDate',
    help: '不填写表示长期有效；周计划需选周日，月计划需选月末。',
    label: '结束日期',
  },
];

export function createDefaultPlanFormModel(): CheckInPlanFormModel {
  return {
    allowMakeupCountPerCycle: 0,
    cycleType: 'weekly',
    planCode: '',
    planName: '',
    startDate: getDefaultPlanStartDate('weekly'),
    status: 0,
  };
}

export function createDefaultRewardFormModel(
  startDate?: string,
): CheckInRewardFormModel {
  return {
    baseRewardExperience: undefined,
    baseRewardPoints: undefined,
    dateRules: [],
    weekCursor: formatWeekCursor(startDate || dayjs().format('YYYY-MM-DD')),
    monthCursor: formatMonthCursor(startDate || dayjs().format('YYYY-MM-DD')),
    monthlyRewardMode: 'date',
    weeklyRewardMode: 'weekday',
    patternRules: [],
    streakRules: [],
  };
}

export function createPatternRuleKey(rule: {
  monthDay?: null | number;
  patternType: CheckInPatternType;
  weekday?: null | number;
}) {
  switch (rule.patternType) {
    case 'MONTH_DAY': {
      return `MONTH_DAY:${rule.monthDay}`;
    }
    case 'MONTH_LAST_DAY': {
      return 'MONTH_LAST_DAY';
    }
    default: {
      return `WEEKDAY:${rule.weekday}`;
    }
  }
}

export function formatMonthCursor(value: string) {
  return dayjs(value).format('YYYY-MM');
}

export function formatWeekCursor(value: string) {
  const date = dayjs(value);
  return date
    .subtract(toMondayBasedWeekday(date) - 1, 'day')
    .format('YYYY-MM-DD');
}

export function getDefaultPlanStartDate(cycleType: CheckInCycleType) {
  const now = dayjs();

  if (cycleType === 'weekly') {
    return now.subtract(toMondayBasedWeekday(now) - 1, 'day').format('YYYY-MM-DD');
  }

  return now.startOf('month').format('YYYY-MM-DD');
}

export function normalizePlanBoundaryDate(
  value: string | undefined,
  cycleType: CheckInCycleType,
  boundary: 'end' | 'start',
) {
  if (!value) {
    return undefined;
  }

  const date = dayjs(value);
  if (cycleType === 'weekly') {
    const weekdayOffset = toMondayBasedWeekday(date) - 1;
    return boundary === 'start'
      ? date.subtract(weekdayOffset, 'day').format('YYYY-MM-DD')
      : date.add(6 - weekdayOffset, 'day').format('YYYY-MM-DD');
  }

  return boundary === 'start'
    ? date.startOf('month').format('YYYY-MM-DD')
    : date.endOf('month').format('YYYY-MM-DD');
}

export function normalizePlanFormValues(model: CheckInPlanFormModel) {
  return {
    ...model,
    endDate: normalizePlanBoundaryDate(
      model.endDate || undefined,
      model.cycleType,
      'end',
    ),
    startDate:
      normalizePlanBoundaryDate(model.startDate, model.cycleType, 'start') ||
      getDefaultPlanStartDate(model.cycleType),
  } satisfies CheckInPlanFormModel;
}

export function getPlanFormDisplayValues(model: CheckInPlanFormModel) {
  if (model.cycleType !== 'monthly') {
    return model;
  }

  return {
    ...model,
    endDate: model.endDate ? dayjs(model.endDate).format('YYYY-MM') : undefined,
    startDate: dayjs(model.startDate).format('YYYY-MM'),
  } satisfies CheckInPlanFormModel;
}

export function formatRewardSummary(value: unknown) {
  const rewardConfig = parseRewardConfig(value);
  const items = [
    rewardConfig.points ? `积分 ${rewardConfig.points}` : '',
    rewardConfig.experience ? `经验 ${rewardConfig.experience}` : '',
  ].filter(Boolean);

  return items.length > 0 ? items.join(' / ') : '未配置';
}

export function getMonthlyRewardModeOptions(_selectedDate: string) {
  const options: Array<{ label: string; value: CheckInMonthlyRewardMode }> = [
    { label: '仅当前日期生效', value: 'date' },
    { label: '应用到周期内每个月这一天', value: 'month_day' },
  ];

  return options;
}

export function getWeeklyRewardModeOptions() {
  return [
    { label: '仅当前日期生效', value: 'date' as const },
    { label: '应用到周期内每周这一天', value: 'weekday' as const },
  ];
}

export function resolveMonthlyRewardMode(params: {
  dateRules: CheckInDateRuleDraft[];
  patternRules: CheckInPatternRuleDraft[];
  selectedDate: string;
}): CheckInMonthlyRewardMode {
  const { dateRules, patternRules, selectedDate } = params;

  if (dateRules.some((item) => item.rewardDate === selectedDate)) {
    return 'date';
  }

  const date = dayjs(selectedDate);

  if (
    patternRules.some(
      (item) =>
        item.patternType === 'MONTH_DAY' && item.monthDay === date.date(),
    )
  ) {
    return 'month_day';
  }

  return 'date';
}

export function resolveWeeklyRewardMode(params: {
  dateRules: CheckInDateRuleDraft[];
  patternRules: CheckInPatternRuleDraft[];
  selectedDate: string;
}): CheckInWeeklyRewardMode {
  const { dateRules, patternRules, selectedDate } = params;

  if (dateRules.some((item) => item.rewardDate === selectedDate)) {
    return 'date';
  }

  const date = dayjs(selectedDate);
  if (
    patternRules.some(
      (item) =>
        item.patternType === 'WEEKDAY' &&
        item.weekday === toMondayBasedWeekday(date),
    )
  ) {
    return 'weekday';
  }

  return 'date';
}

export function parseRewardConfig(value: unknown): CheckInRewardConfigValue {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }
  return value as CheckInRewardConfigValue;
}

export function hasConfiguredReward(value: {
  experience?: null | number;
  points?: null | number;
}) {
  return Number(value.experience ?? 0) > 0 || Number(value.points ?? 0) > 0;
}

export function hasExistingRewardConfig(source: {
  baseRewardConfig?: CheckInRewardConfigValue | null;
  dateRewardRules?: Array<{
    rewardConfig?: CheckInRewardConfigValue | null;
  }> | null;
  patternRewardRules?: Array<{
    rewardConfig?: CheckInRewardConfigValue | null;
  }> | null;
  streakRewardRules?: Array<{
    rewardConfig?: CheckInRewardConfigValue | null;
  }> | null;
}) {
  return (
    hasConfiguredReward(parseRewardConfig(source.baseRewardConfig)) ||
    !!source.dateRewardRules?.some((item) =>
      hasConfiguredReward(parseRewardConfig(item.rewardConfig)),
    ) ||
    !!source.patternRewardRules?.some((item) =>
      hasConfiguredReward(parseRewardConfig(item.rewardConfig)),
    ) ||
    !!source.streakRewardRules?.some((item) =>
      hasConfiguredReward(parseRewardConfig(item.rewardConfig)),
    )
  );
}

export function mapPlanDetailToEditorState(
  detail: CheckInPlanDetailResponseDto,
): CheckInPlanEditorState {
  const baseRewardConfig = parseRewardConfig(detail.baseRewardConfig);

  return {
    plan: {
      allowMakeupCountPerCycle: detail.allowMakeupCountPerCycle,
      cycleType: detail.cycleType,
      endDate: detail.endDate
        ? dayjs(detail.endDate).format('YYYY-MM-DD')
        : undefined,
      id: detail.id,
      planCode: detail.planCode,
      planName: detail.planName,
      startDate: dayjs(detail.startDate).format('YYYY-MM-DD'),
      status: detail.status,
    },
    reward: {
      baseRewardExperience: baseRewardConfig.experience ?? undefined,
      baseRewardPoints: baseRewardConfig.points ?? undefined,
      dateRules: detail.dateRewardRules
        .map((item) => {
          const rewardConfig = parseRewardConfig(item.rewardConfig);
          return {
            experience: rewardConfig.experience ?? undefined,
            id: item.id,
            localId: `date-${item.id}`,
            points: rewardConfig.points ?? undefined,
            rewardDate: item.rewardDate,
          } satisfies CheckInDateRuleDraft;
        })
        .toSorted((left, right) =>
          left.rewardDate.localeCompare(right.rewardDate),
        ),
      monthCursor: formatMonthCursor(detail.startDate),
      weekCursor: formatWeekCursor(detail.startDate),
      monthlyRewardMode: 'date',
      weeklyRewardMode: 'weekday',
      patternRules: detail.patternRewardRules
        .map((item) => {
          const rewardConfig = parseRewardConfig(item.rewardConfig);
          return {
            experience: rewardConfig.experience ?? undefined,
            id: item.id,
            key: createPatternRuleKey(item),
            monthDay: item.monthDay ?? undefined,
            patternType: item.patternType,
            points: rewardConfig.points ?? undefined,
            weekday: item.weekday ?? undefined,
          } satisfies CheckInPatternRuleDraft;
        })
        .toSorted(comparePatternRuleDraft),
      streakRules: detail.streakRewardRules
        .map((item) => {
          const rewardConfig = parseRewardConfig(item.rewardConfig);
          return {
            experience: rewardConfig.experience ?? undefined,
            id: item.id,
            localId: `streak-${item.id}`,
            points: rewardConfig.points ?? undefined,
            repeatable: item.repeatable,
            ruleCode: item.ruleCode,
            status: item.status,
            streakDays: item.streakDays,
          } satisfies CheckInStreakRuleDraft;
        })
        .toSorted(
          (left, right) =>
            Number(left.streakDays ?? 0) - Number(right.streakDays ?? 0),
        ),
    },
    rewardConfigExists: hasExistingRewardConfig(detail),
  };
}

export function buildPlanSubmitPayload(model: CheckInPlanFormModel) {
  const payload = {
    allowMakeupCountPerCycle: Number(model.allowMakeupCountPerCycle ?? 0),
    cycleType: model.cycleType,
    endDate: model.endDate || undefined,
    planCode: model.planCode.trim(),
    planName: model.planName.trim(),
    startDate: model.startDate,
    status: model.status,
  } satisfies Record<string, unknown>;

  if (model.id) {
    return {
      ...payload,
      id: model.id,
    } satisfies CheckInPlanUpdateRequest;
  }

  return payload satisfies CheckInPlanCreateRequest;
}

export function buildRewardPayload(params: {
  cycleType: CheckInCycleType;
  planId: number;
  reward: CheckInRewardFormModel;
}) {
  const { cycleType, planId, reward } = params;
  const baseRewardConfig = buildRewardConfig(
    reward.baseRewardPoints,
    reward.baseRewardExperience,
  );
  const dateRewardRules =
    cycleType === 'weekly' || cycleType === 'monthly'
      ? reward.dateRules
          .filter((item) =>
            hasConfiguredReward({
              experience: item.experience,
              points: item.points,
            }),
          )
          .toSorted((left, right) =>
            left.rewardDate.localeCompare(right.rewardDate),
          )
          .map((item) => {
            return {
              rewardConfig: buildRewardConfig(item.points, item.experience)!,
              rewardDate: item.rewardDate,
            } satisfies CreateCheckInDateRewardRuleDto;
          })
      : [];
  const patternRewardRules = reward.patternRules
    .filter((item) =>
      hasConfiguredReward({
        experience: item.experience,
        points: item.points,
      }),
    )
    .filter((item) =>
      cycleType === 'weekly'
        ? item.patternType === 'WEEKDAY'
        : item.patternType === 'MONTH_DAY' ||
          item.patternType === 'MONTH_LAST_DAY',
    )
    .toSorted(comparePatternRuleDraft)
    .map((item) => {
      return {
        monthDay: item.patternType === 'MONTH_DAY' ? item.monthDay : undefined,
        patternType: item.patternType,
        rewardConfig: buildRewardConfig(item.points, item.experience)!,
        weekday: item.patternType === 'WEEKDAY' ? item.weekday : undefined,
      } satisfies CreateCheckInPatternRewardRuleDto;
    });
  const streakRewardRules = reward.streakRules
    .filter((item) => Number(item.streakDays ?? 0) > 0)
    .filter((item) =>
      hasConfiguredReward({
        experience: item.experience,
        points: item.points,
      }),
    )
    .toSorted(
      (left, right) =>
        Number(left.streakDays ?? 0) - Number(right.streakDays ?? 0),
    )
    .map((item) => {
      return {
        repeatable: item.repeatable,
        rewardConfig: buildRewardConfig(item.points, item.experience)!,
        ruleCode: item.ruleCode.trim(),
        status: item.status,
        streakDays: Number(item.streakDays),
      } satisfies CreateCheckInStreakRewardRuleDto;
    });

  return {
    baseRewardConfig: baseRewardConfig || undefined,
    dateRewardRules,
    id: planId,
    patternRewardRules,
    streakRewardRules,
  } satisfies CreateCheckInPlanRewardConfigDto &
    UpdateCheckInPlanRewardConfigDto;
}

export function buildMonthCalendar(params: {
  cycleType: CheckInCycleType;
  dateRules: CheckInDateRuleDraft[];
  endDate?: null | string;
  mode: CheckInMonthlyRewardMode;
  monthCursor: string;
  patternRules: CheckInPatternRuleDraft[];
  startDate: string;
}) {
  const { dateRules, endDate, monthCursor, patternRules, startDate } =
    params;
  const monthStart = dayjs(`${monthCursor}-01`);
  const monthEnd = monthStart.endOf('month');
  const gridStart = monthStart.subtract(
    toMondayBasedWeekday(monthStart) - 1,
    'day',
  );
  const totalCells =
    Math.ceil(
      ((toMondayBasedWeekday(monthStart) - 1) + monthEnd.date()) / 7,
    ) * 7;

  return Array.from({ length: totalCells }, (_, index) => {
    const current = gridStart.add(index, 'day');
    const date = current.format('YYYY-MM-DD');
    const isCurrentMonth = current.month() === monthStart.month();
    const isInPlanWindow =
      current.valueOf() >= dayjs(startDate).startOf('day').valueOf() &&
      (!endDate || current.valueOf() <= dayjs(endDate).endOf('day').valueOf());
    const isDisabled = !isCurrentMonth || !isInPlanWindow;
    const patternRule = getPatternRuleForDate(current, patternRules);
    const dateRule = dateRules.find((item) => item.rewardDate === date);
    let rewardSummary = '沿用默认';
    if (dateRule) {
      rewardSummary = formatRewardSummary({
        experience: dateRule.experience,
        points: dateRule.points,
      });
    } else if (patternRule) {
      rewardSummary = formatRewardSummary({
        experience: patternRule.experience,
        points: patternRule.points,
      });
    }

    return {
      date,
      day: current.date(),
      isCurrentMonth,
      isDisabled,
      isInPlanWindow,
      isLastDayOfMonth: current.date() === monthEnd.date(),
      patternRuleKey: patternRule?.key,
      rewardSummary,
    } satisfies CheckInMonthCalendarCell;
  });
}

export function buildWeekCalendar(params: {
  dateRules: CheckInDateRuleDraft[];
  patternRules: CheckInPatternRuleDraft[];
  weekCursor: string;
}) {
  const weekStart = dayjs(formatWeekCursor(params.weekCursor));

  return weeklyCalendarLabels.map((item, index) => {
    const current = weekStart.add(index, 'day');
    const date = current.format('YYYY-MM-DD');
    const weekdayRuleKey = `WEEKDAY:${item.value}`;
    const dateRule = params.dateRules.find((rule) => rule.rewardDate === date);
    const weekdayRule = findPatternRuleByKey(params.patternRules, weekdayRuleKey);

    return {
      date,
      dayLabel: `${item.dayLabel} ${current.format('MM-DD')}`,
      isDisabled: false,
      rewardSummary: dateRule
        ? formatRewardSummary(dateRule)
        : (weekdayRule ? formatRewardSummary(weekdayRule) : '沿用默认'),
      weekday: item.value,
      weekdayRuleKey: weekdayRule?.key,
    } satisfies CheckInWeekCalendarCell;
  });
}

export function getPlanBusinessRuleError(model: CheckInPlanFormModel) {
  if (
    model.endDate &&
    dayjs(model.endDate).valueOf() < dayjs(model.startDate).valueOf()
  ) {
    return '结束日期不能早于开始日期';
  }

  const startDate = dayjs(model.startDate);
  if (model.cycleType === 'weekly') {
    if (toMondayBasedWeekday(startDate) !== 1) {
      return '周计划开始日期必须选择周一';
    }

    if (model.endDate && toMondayBasedWeekday(dayjs(model.endDate)) !== 7) {
      return '周计划结束日期必须选择周日';
    }
    return null;
  }

  if (startDate.date() !== 1) {
    return '月计划开始日期必须选择每月 1 号';
  }

  if (model.endDate) {
    const endDate = dayjs(model.endDate);
    if (endDate.date() !== endDate.daysInMonth()) {
      return '月计划结束日期必须选择月末';
    }
  }

  return null;
}

export function isPlanStartDateDisabled(
  current: Date,
  cycleType: CheckInCycleType,
) {
  const date = dayjs(current);
  return cycleType === 'weekly'
    ? toMondayBasedWeekday(date) !== 1
    : date.date() !== 1;
}

export function isPlanEndDateDisabled(
  current: Date,
  cycleType: CheckInCycleType,
  startDate?: string,
) {
  const date = dayjs(current);

  if (startDate && date.valueOf() < dayjs(startDate).startOf('day').valueOf()) {
    return true;
  }

  return cycleType === 'weekly'
    ? toMondayBasedWeekday(date) !== 7
    : date.date() !== date.daysInMonth();
}

export function createPlanDateDisableHandlers(
  getState: () => {
    cycleType: CheckInCycleType;
    startDate?: string;
  },
) {
  return {
    isEndDateDisabled(current: Date) {
      const state = getState();
      if (state.cycleType === 'monthly') {
        return isPlanEndMonthDisabled(current, state.startDate);
      }
      return isPlanEndDateDisabled(
        current,
        state.cycleType,
        state.startDate,
      );
    },
    isStartDateDisabled(current: Date) {
      const state = getState();
      if (state.cycleType === 'monthly') {
        return isPlanStartMonthDisabled(current);
      }
      return isPlanStartDateDisabled(current, state.cycleType);
    },
  };
}

export function isPlanStartMonthDisabled(_current: Date) {
  return false;
}

export function isPlanEndMonthDisabled(current: Date, startDate?: string) {
  if (!startDate) {
    return false;
  }

  return (
    dayjs(current).startOf('month').valueOf() <
    dayjs(startDate).startOf('month').valueOf()
  );
}

export function getRewardBusinessRuleError(
  plan: CheckInPlanFormModel,
  reward: CheckInRewardFormModel,
) {
  if (
    !hasConfiguredReward({
      experience: reward.baseRewardExperience,
      points: reward.baseRewardPoints,
    })
  ) {
    return '默认基础奖励积分或经验至少填写一项';
  }

  const invalidDateRule = reward.dateRules.find(
    (item) =>
      !hasConfiguredReward({
        experience: item.experience,
        points: item.points,
      }),
  );
  if (invalidDateRule) {
    return `具体日期奖励 ${invalidDateRule.rewardDate} 至少填写一项奖励`;
  }

  const invalidPatternRule = reward.patternRules.find(
    (item) =>
      !hasConfiguredReward({
        experience: item.experience,
        points: item.points,
      }),
  );
  if (invalidPatternRule) {
    return '周期模式奖励至少填写一项奖励';
  }

  const streakDaysSet = new Set<number>();
  for (const item of reward.streakRules) {
    const streakDays = Number(item.streakDays ?? 0);
    if (!streakDays) {
      return '连续奖励的连续天数不能为空';
    }
    if (
      !hasConfiguredReward({
        experience: item.experience,
        points: item.points,
      })
    ) {
      return `连续签到 ${streakDays} 天的奖励至少填写一项`;
    }
    if (streakDaysSet.has(streakDays)) {
      return '连续奖励的连续天数不能重复';
    }
    streakDaysSet.add(streakDays);
  }

  if (plan.cycleType === 'weekly') {
    const invalidWeekdayPattern = reward.patternRules.find(
      (item) => item.patternType === 'WEEKDAY' && !item.weekday,
    );
    if (invalidWeekdayPattern) {
      return '周计划奖励必须绑定具体星期';
    }
  }

  return null;
}

export function upsertDateRule(
  dateRules: CheckInDateRuleDraft[],
  draft: CheckInDateRuleDraft,
) {
  const nextRules = dateRules.filter(
    (item) => item.rewardDate !== draft.rewardDate,
  );
  if (
    hasConfiguredReward({
      experience: draft.experience,
      points: draft.points,
    })
  ) {
    nextRules.push(draft);
  }

  return nextRules.toSorted((left, right) =>
    left.rewardDate.localeCompare(right.rewardDate),
  );
}

export function upsertPatternRule(
  patternRules: CheckInPatternRuleDraft[],
  draft: CheckInPatternRuleDraft,
) {
  const nextRules = patternRules.filter((item) => item.key !== draft.key);
  if (
    hasConfiguredReward({
      experience: draft.experience,
      points: draft.points,
    })
  ) {
    nextRules.push(draft);
  }
  return nextRules.toSorted(comparePatternRuleDraft);
}

export function removePatternRule(
  patternRules: CheckInPatternRuleDraft[],
  key: string,
) {
  return patternRules.filter((item) => item.key !== key);
}

export function removeDateRule(
  dateRules: CheckInDateRuleDraft[],
  rewardDate: string,
) {
  return dateRules.filter((item) => item.rewardDate !== rewardDate);
}

export function toWeeklyPatternDraft(
  weekday: number,
  source?: CheckInPatternRuleDraft,
) {
  return {
    experience: source?.experience,
    id: source?.id,
    key: createPatternRuleKey({
      patternType: 'WEEKDAY',
      weekday,
    }),
    patternType: 'WEEKDAY' as const,
    points: source?.points,
    weekday,
  } satisfies CheckInPatternRuleDraft;
}

export function toMonthlyPatternDraft(params: {
  monthDay?: number;
  patternType: 'MONTH_DAY' | 'MONTH_LAST_DAY';
  source?: CheckInPatternRuleDraft;
}) {
  const { monthDay, patternType, source } = params;

  return {
    experience: source?.experience,
    id: source?.id,
    key: createPatternRuleKey({
      monthDay,
      patternType,
    }),
    monthDay: patternType === 'MONTH_DAY' ? monthDay : undefined,
    patternType,
    points: source?.points,
  } satisfies CheckInPatternRuleDraft;
}

export function findPatternRuleByKey(
  patternRules: CheckInPatternRuleDraft[],
  key: string,
) {
  return patternRules.find((item) => item.key === key);
}

function buildRewardConfig(
  points?: CheckInRewardConfigValue['points'],
  experience?: CheckInRewardConfigValue['experience'],
) {
  const rewardConfig: CheckInRewardConfigValue = {};

  if (points && Number(points) > 0) {
    rewardConfig.points = Number(points);
  }
  if (experience && Number(experience) > 0) {
    rewardConfig.experience = Number(experience);
  }

  return Object.keys(rewardConfig).length > 0 ? rewardConfig : null;
}

function comparePatternRuleDraft(
  left: CheckInPatternRuleDraft,
  right: CheckInPatternRuleDraft,
) {
  return getPatternRuleSortWeight(left) - getPatternRuleSortWeight(right);
}

function getPatternRuleSortWeight(rule: CheckInPatternRuleDraft) {
  if (rule.patternType === 'WEEKDAY') {
    return Number(rule.weekday ?? 0);
  }
  if (rule.patternType === 'MONTH_DAY') {
    return Number(rule.monthDay ?? 0);
  }
  return 99;
}

function getPatternRuleForDate(
  date: Dayjs,
  patternRules: CheckInPatternRuleDraft[],
) {
  const weekday = toMondayBasedWeekday(date);
  const day = date.date();
  const isLastDayOfMonth = day === date.daysInMonth();

  if (isLastDayOfMonth) {
    const monthLastDayRule = patternRules.find(
      (item) => item.patternType === 'MONTH_LAST_DAY',
    );
    if (monthLastDayRule) {
      return monthLastDayRule;
    }
  }

  return patternRules.find((item) => {
    if (item.patternType === 'WEEKDAY') {
      return item.weekday === weekday;
    }
    if (item.patternType === 'MONTH_DAY') {
      return item.monthDay === day;
    }
    return false;
  });
}

function toMondayBasedWeekday(value: Dayjs) {
  const weekday = value.day();
  return weekday === 0 ? 7 : weekday;
}
