import type {
  CheckInConfigDetailResponse,
  CheckInRewardItemDto,
  CheckInConfigUpdateRequest,
} from '#/api/types';

import { dayjs } from '#/utils';

import {
  cloneRewardItems,
  formatRewardSummary,
  hasRewardItems,
  sortPatternRules,
  weeklyCalendarLabels,
} from './shared';

export type CheckInConfigDateRuleDraft = {
  localId: string;
  rewardDate: string;
  rewardItems: CheckInRewardItemDto[];
  rewardOverviewIconUrl?: string;
};

export type CheckInConfigPatternRuleDraft = {
  localId: string;
  monthDay?: number;
  patternType: 1 | 2 | 3;
  rewardItems: CheckInRewardItemDto[];
  rewardOverviewIconUrl?: string;
  weekday?: number;
};

export type CheckInConfigFormState = {
  baseRewardItems: CheckInRewardItemDto[];
  dateRules: CheckInConfigDateRuleDraft[];
  makeupIconUrl?: string;
  makeupPeriodType: 1 | 2;
  patternRules: CheckInConfigPatternRuleDraft[];
  periodicAllowance: number;
  rewardOverviewIconUrl?: string;
};

export type CheckInConfigDateRuleSummaryGroup = {
  key: string;
  label: string;
  rules: CheckInConfigDateRuleDraft[];
};

export type CheckInConfigPreviewDay = {
  date: string;
  dayLabel: string;
  isCurrentMonth?: boolean;
  isEditable: boolean;
  isLastDayOfMonth?: boolean;
  monthDay?: number;
  rewardOverviewIconUrl?: string;
  rewardSummary: string;
  weekday?: number;
};

export type CheckInConfigEditorKind =
  | 'base'
  | 'date'
  | 'monthDay'
  | 'monthLastDay'
  | 'weekday';

export function createDefaultConfigFormState(): CheckInConfigFormState {
  return {
    baseRewardItems: [],
    dateRules: [],
    makeupIconUrl: undefined,
    makeupPeriodType: 1,
    patternRules: [],
    periodicAllowance: 0,
    rewardOverviewIconUrl: undefined,
  };
}

export function mapConfigDetailToForm(
  detail: CheckInConfigDetailResponse,
): CheckInConfigFormState {
  return {
    baseRewardItems: cloneRewardItems(detail.baseRewardItems),
    dateRules: (detail.dateRewardRules || [])
      .map((rule) => ({
        localId: `date-${rule.rewardDate}`,
        rewardDate: rule.rewardDate,
        rewardItems: cloneRewardItems(rule.rewardItems),
        rewardOverviewIconUrl: rule.rewardOverviewIconUrl,
      }))
      .toSorted((left, right) =>
        left.rewardDate.localeCompare(right.rewardDate),
      ),
    makeupIconUrl: detail.makeupIconUrl,
    makeupPeriodType: detail.makeupPeriodType,
    patternRules: sortPatternRules(
      (detail.patternRewardRules || []).map((rule, index) => ({
        localId: `pattern-${index + 1}-${rule.patternType}`,
        monthDay: rule.monthDay ?? undefined,
        patternType: rule.patternType,
        rewardItems: cloneRewardItems(rule.rewardItems),
        rewardOverviewIconUrl: rule.rewardOverviewIconUrl,
        weekday: rule.weekday ?? undefined,
      })),
    ),
    periodicAllowance: detail.periodicAllowance,
    rewardOverviewIconUrl: detail.rewardOverviewIconUrl,
  };
}

export function buildConfigUpdatePayload(
  isEnabled: boolean,
  state: CheckInConfigFormState,
): CheckInConfigUpdateRequest {
  const compatiblePatternRules = state.patternRules.filter((rule) =>
    state.makeupPeriodType === 1
      ? rule.patternType === 1
      : rule.patternType === 2 || rule.patternType === 3,
  );

  return {
    baseRewardItems: cloneRewardItems(state.baseRewardItems),
    dateRewardRules: state.dateRules
      .filter((rule) => !!rule.rewardDate && hasRewardItems(rule.rewardItems))
      .toSorted((left, right) =>
        left.rewardDate.localeCompare(right.rewardDate),
      )
      .map((rule) => ({
        rewardDate: rule.rewardDate,
        rewardItems: cloneRewardItems(rule.rewardItems),
        rewardOverviewIconUrl: rule.rewardOverviewIconUrl,
      })),
    isEnabled,
    makeupIconUrl: state.makeupIconUrl,
    makeupPeriodType: state.makeupPeriodType,
    patternRewardRules: sortPatternRules(compatiblePatternRules)
      .filter((rule) => hasValidPatternRule(rule))
      .map((rule) => ({
        monthDay: rule.patternType === 2 ? rule.monthDay : undefined,
        patternType: rule.patternType,
        rewardItems: cloneRewardItems(rule.rewardItems),
        rewardOverviewIconUrl: rule.rewardOverviewIconUrl,
        weekday: rule.patternType === 1 ? rule.weekday : undefined,
      })),
    periodicAllowance: Number(state.periodicAllowance || 0),
    rewardOverviewIconUrl: state.rewardOverviewIconUrl,
  };
}

export function validateConfigForm(state: CheckInConfigFormState) {
  if (
    !Number.isInteger(state.periodicAllowance) ||
    state.periodicAllowance < 0
  ) {
    return '每周期系统发放的补签额度必须为非负整数';
  }

  const duplicateDate = findDuplicateValue(
    state.dateRules
      .filter((rule) => !!rule.rewardDate)
      .map((rule) => rule.rewardDate.trim()),
  );
  if (duplicateDate) {
    return `具体日期奖励重复：${duplicateDate}`;
  }

  for (const rule of state.dateRules) {
    if (!rule.rewardDate) {
      return '具体日期奖励必须填写日期';
    }
    if (!hasRewardItems(rule.rewardItems)) {
      return `具体日期奖励 ${rule.rewardDate} 至少填写一项奖励`;
    }
  }

  const duplicatePatternKey = findDuplicateValue(
    state.patternRules
      .filter((rule) => hasPatternIdentity(rule))
      .map((rule) => getPatternIdentity(rule)),
  );
  if (duplicatePatternKey) {
    return `周期模式奖励重复：${duplicatePatternLabel(duplicatePatternKey)}`;
  }

  for (const rule of state.patternRules) {
    if (state.makeupPeriodType === 1 && rule.patternType !== 1) {
      return '按自然周模式下仅支持按周固定星期奖励规则';
    }
    if (state.makeupPeriodType === 2 && rule.patternType === 1) {
      return '按自然月模式下不支持按周固定星期奖励规则';
    }
    if (!hasValidPatternRule(rule)) {
      return '存在未填写完整的周期模式奖励规则';
    }
  }

  return null;
}

export function createDefaultDateRule(): CheckInConfigDateRuleDraft {
  return {
    localId: `date-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    rewardDate: '',
    rewardItems: [],
  };
}

export function createDefaultPatternRule(
  makeupPeriodType: 1 | 2,
): CheckInConfigPatternRuleDraft {
  return {
    localId: `pattern-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    monthDay: makeupPeriodType === 2 ? 1 : undefined,
    patternType: makeupPeriodType === 1 ? 1 : 2,
    rewardItems: [],
    weekday: makeupPeriodType === 1 ? 1 : undefined,
  };
}

export function applyMakeupPeriodTypeChange(
  state: CheckInConfigFormState,
  nextType: 1 | 2,
) {
  if (state.makeupPeriodType === nextType) {
    return false;
  }

  state.makeupPeriodType = nextType;
  state.patternRules = [];
  return true;
}

export function buildDateRuleSummaryGroups(
  dateRules: CheckInConfigDateRuleDraft[],
): CheckInConfigDateRuleSummaryGroup[] {
  const groupedRules = new Map<string, CheckInConfigDateRuleDraft[]>();

  for (const rule of dateRules.toSorted((left, right) =>
    left.rewardDate.localeCompare(right.rewardDate),
  )) {
    if (!rule.rewardDate) {
      continue;
    }

    const monthKey = rule.rewardDate.slice(0, 7);
    const rules = groupedRules.get(monthKey);
    if (rules) {
      rules.push(rule);
      continue;
    }

    groupedRules.set(monthKey, [rule]);
  }

  return [...groupedRules.entries()].map(([key, rules]) => ({
    key,
    label: dayjs(`${key}-01`).format('YYYY 年 M 月'),
    rules,
  }));
}

export function buildConfigPreviewDays(params: {
  cursor: string;
  state: CheckInConfigFormState;
}) {
  return params.state.makeupPeriodType === 1
    ? buildWeekPreview(params.cursor, params.state)
    : buildMonthPreview(params.cursor, params.state);
}

export function buildWeeklyScopeOptions() {
  return [
    { label: '仅当前日期生效', value: 'date' as const },
    { label: '应用到每周这一天', value: 'weekday' as const },
  ];
}

export function buildMonthlyScopeOptions(
  targetDate: string,
): Array<{ label: string; value: 'date' | 'monthDay' | 'monthLastDay' }> {
  const target = dayjs(targetDate);
  const options: Array<{
    label: string;
    value: 'date' | 'monthDay' | 'monthLastDay';
  }> = [
    { label: '仅当前日期生效', value: 'date' as const },
    { label: '应用到每月这一天', value: 'monthDay' as const },
  ];

  if (target.date() === target.daysInMonth()) {
    options.push({
      label: '应用到每月最后一天',
      value: 'monthLastDay' as const,
    });
  }

  return options;
}

export function getDateRuleByDate(
  state: CheckInConfigFormState,
  rewardDate: string,
) {
  return state.dateRules.find((rule) => rule.rewardDate === rewardDate);
}

export function getPatternRuleByWeekday(
  state: CheckInConfigFormState,
  weekday: number,
) {
  return state.patternRules.find(
    (rule) => rule.patternType === 1 && rule.weekday === weekday,
  );
}

export function getPatternRuleByMonthDay(
  state: CheckInConfigFormState,
  monthDay: number,
) {
  return state.patternRules.find(
    (rule) => rule.patternType === 2 && rule.monthDay === monthDay,
  );
}

export function getMonthLastDayRule(state: CheckInConfigFormState) {
  return state.patternRules.find((rule) => rule.patternType === 3);
}

export function upsertDateRule(params: {
  rewardDate: string;
  rewardItems: CheckInRewardItemDto[];
  rewardOverviewIconUrl?: string;
  state: CheckInConfigFormState;
}) {
  params.state.dateRules = params.state.dateRules.filter(
    (rule) => rule.rewardDate !== params.rewardDate,
  );

  if (!hasRewardItems(params.rewardItems)) {
    return;
  }

  params.state.dateRules.push({
    localId: `date-${params.rewardDate}`,
    rewardDate: params.rewardDate,
    rewardItems: cloneRewardItems(params.rewardItems),
    rewardOverviewIconUrl: params.rewardOverviewIconUrl,
  });
  params.state.dateRules = params.state.dateRules.toSorted((left, right) =>
    left.rewardDate.localeCompare(right.rewardDate),
  );
}

export function removeDateRule(params: {
  rewardDate: string;
  state: CheckInConfigFormState;
}) {
  params.state.dateRules = params.state.dateRules.filter(
    (rule) => rule.rewardDate !== params.rewardDate,
  );
}

export function upsertPatternRule(params: {
  monthDay?: number;
  patternType: 1 | 2 | 3;
  rewardItems: CheckInRewardItemDto[];
  rewardOverviewIconUrl?: string;
  state: CheckInConfigFormState;
  weekday?: number;
}) {
  const identity = getPatternIdentity(params);
  params.state.patternRules = params.state.patternRules.filter(
    (rule) => getPatternIdentity(rule) !== identity,
  );

  if (!hasRewardItems(params.rewardItems)) {
    return;
  }

  params.state.patternRules.push({
    localId: `pattern-${identity}`,
    monthDay: params.patternType === 2 ? params.monthDay : undefined,
    patternType: params.patternType,
    rewardItems: cloneRewardItems(params.rewardItems),
    rewardOverviewIconUrl: params.rewardOverviewIconUrl,
    weekday: params.patternType === 1 ? params.weekday : undefined,
  });
  params.state.patternRules = sortPatternRules(params.state.patternRules);
}

export function removePatternRule(params: {
  monthDay?: number;
  patternType: 1 | 2 | 3;
  state: CheckInConfigFormState;
  weekday?: number;
}) {
  const identity = getPatternIdentity(params);
  params.state.patternRules = params.state.patternRules.filter(
    (rule) => getPatternIdentity(rule) !== identity,
  );
}

export function buildWeekPreview(
  cursor: string,
  state: CheckInConfigFormState,
): CheckInConfigPreviewDay[] {
  const weekStart = dayjs(cursor).startOf('day');
  const today = dayjs().startOf('day');
  const baseRewardSummary = formatRewardSummary(state.baseRewardItems);

  return weeklyCalendarLabels.map((item, index) => {
    const current = weekStart.add(index, 'day');
  const rewardSummary =
      resolveRewardPreviewForDate(current.format('YYYY-MM-DD'), state) ?? {
        rewardOverviewIconUrl: state.rewardOverviewIconUrl,
        rewardSummary: baseRewardSummary,
      };

    return {
      date: current.format('YYYY-MM-DD'),
      dayLabel: `${item.label} ${current.format('MM-DD')}`,
      isEditable: current.valueOf() >= today.valueOf(),
      rewardOverviewIconUrl: rewardSummary.rewardOverviewIconUrl,
      rewardSummary: rewardSummary.rewardSummary,
      weekday: item.value,
    };
  });
}

export function buildMonthPreview(
  monthCursor: string,
  state: CheckInConfigFormState,
): CheckInConfigPreviewDay[] {
  const monthStart = dayjs(`${monthCursor}-01`).startOf('month');
  const monthEnd = monthStart.endOf('month');
  const today = dayjs().startOf('day');
  const mondayOffset = toMondayBasedWeekday(monthStart) - 1;
  const gridStart = monthStart.subtract(mondayOffset, 'day');
  const totalCells = Math.ceil((mondayOffset + monthEnd.date()) / 7) * 7;
  const baseRewardSummary = formatRewardSummary(state.baseRewardItems);

  return Array.from({ length: totalCells }, (_, index) => {
    const current = gridStart.add(index, 'day');
  const rewardSummary =
      resolveRewardPreviewForDate(current.format('YYYY-MM-DD'), state) ?? {
        rewardOverviewIconUrl: state.rewardOverviewIconUrl,
        rewardSummary: baseRewardSummary,
      };

    return {
      date: current.format('YYYY-MM-DD'),
      dayLabel: String(current.date()),
      isEditable:
        current.month() === monthStart.month() &&
        current.valueOf() >= today.valueOf(),
      isCurrentMonth: current.month() === monthStart.month(),
      isLastDayOfMonth: current.date() === current.daysInMonth(),
      monthDay: current.date(),
      rewardOverviewIconUrl: rewardSummary.rewardOverviewIconUrl,
      rewardSummary: rewardSummary.rewardSummary,
    };
  });
}

export function isEditableRewardDate(date: string) {
  return (
    dayjs(date).startOf('day').valueOf() >= dayjs().startOf('day').valueOf()
  );
}

function resolveRewardPreviewForDate(
  date: string,
  state: CheckInConfigFormState,
) {
  const dateRule = getDateRuleByDate(state, date);
  if (dateRule) {
    return {
      rewardOverviewIconUrl: dateRule.rewardOverviewIconUrl,
      rewardSummary: formatRewardSummary(dateRule.rewardItems),
    };
  }

  const targetDate = dayjs(date);
  const matchedPattern = state.patternRules.find((rule) => {
    if (state.makeupPeriodType === 1 && rule.patternType !== 1) {
      return false;
    }
    if (state.makeupPeriodType === 2 && rule.patternType === 1) {
      return false;
    }
    if (rule.patternType === 1) {
      return rule.weekday === toMondayBasedWeekday(targetDate);
    }
    if (rule.patternType === 2) {
      return rule.monthDay === targetDate.date();
    }
    return targetDate.date() === targetDate.daysInMonth();
  });

  if (!matchedPattern) {
    return null;
  }

  return {
    rewardOverviewIconUrl: matchedPattern.rewardOverviewIconUrl,
    rewardSummary: formatRewardSummary(matchedPattern.rewardItems),
  };
}

function hasPatternIdentity(
  rule: Pick<
    CheckInConfigPatternRuleDraft,
    'monthDay' | 'patternType' | 'weekday'
  >,
) {
  if (rule.patternType === 1) {
    return Number(rule.weekday) > 0;
  }
  if (rule.patternType === 2) {
    return Number(rule.monthDay) > 0;
  }
  return rule.patternType === 3;
}

function getPatternIdentity(
  rule: Pick<
    CheckInConfigPatternRuleDraft,
    'monthDay' | 'patternType' | 'weekday'
  >,
) {
  if (rule.patternType === 1) {
    return `weekday:${rule.weekday}`;
  }
  if (rule.patternType === 2) {
    return `monthDay:${rule.monthDay}`;
  }
  return 'monthLastDay';
}

function hasValidPatternRule(rule: CheckInConfigPatternRuleDraft) {
  if (!hasRewardItems(rule.rewardItems)) {
    return false;
  }

  if (rule.patternType === 1) {
    return Number(rule.weekday) >= 1 && Number(rule.weekday) <= 7;
  }
  if (rule.patternType === 2) {
    return Number(rule.monthDay) >= 1 && Number(rule.monthDay) <= 31;
  }
  return rule.patternType === 3;
}

function duplicatePatternLabel(identity: string) {
  if (identity.startsWith('weekday:')) {
    return `星期 ${identity.replace('weekday:', '')}`;
  }
  if (identity.startsWith('monthDay:')) {
    return `每月 ${identity.replace('monthDay:', '')} 号`;
  }
  return '按月最后一天';
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

function toMondayBasedWeekday(value: ReturnType<typeof dayjs>) {
  const weekday = value.day();
  return weekday === 0 ? 7 : weekday;
}
