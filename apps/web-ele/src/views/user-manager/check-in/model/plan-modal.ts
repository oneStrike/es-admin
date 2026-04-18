/**
 * 签到计划编辑器 - 模型层
 *
 * 本文件是签到计划弹窗的核心数据模型，包含：
 * - 类型定义：表单状态、日历单元格、奖励规则草稿等
 * - 表单 Schema：基础信息表单的字段定义与校验规则
 * - 工厂函数：创建默认的表单模型
 * - 日期工具：周期光标格式化、边界日期归一化、日期禁用判断
 * - 奖励工具：奖励摘要格式化、模式解析、规则 CRUD
 * - 日历构建：周视图 / 月视图的格子数据生成
 * - 业务校验：计划和奖励的业务规则错误检测
 * - 数据映射：API 详情 → 编辑器状态、编辑器状态 → 提交载荷
 */

import type { Dayjs } from 'dayjs';

import type {
  CheckInPatternRewardRuleItemDto,
  CheckInPlanCreateRequest,
  CheckInPlanDetailResponseDto,
  CheckInPlanUpdateRequest,
  CreateCheckInDateRewardRuleDto,
  CreateCheckInPatternRewardRuleDto,
  CreateCheckInStreakRewardRuleDto,
  GrowthRewardItemDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { dayjs } from '#/utils';

// ======================== 类型定义 ========================

/** 奖励配置值类型，包含积分和经验两个字段 */
export type CheckInRewardConfigValue = {
  experience?: number;
  points?: number;
};

const CHECK_IN_REWARD_ASSET_TYPE = {
  POINTS: 1,
  EXPERIENCE: 2,
} as const;
/** 签到周期类型：按周(weekly) / 按月(monthly) */
export type CheckInCycleType = CheckInPlanDetailResponseDto['cycleType'];
/** 周期模式规则类型：星期几(WEEKDAY) / 每月几号(MONTH_DAY) / 月末(MONTH_LAST_DAY) */
export type CheckInPatternType = CheckInPatternRewardRuleItemDto['patternType'];
/** 月度奖励模式：仅当前日期(date) / 每月同一天(month_day) / 月末(month_last_day) */
export type CheckInMonthlyRewardMode = 'date' | 'month_day' | 'month_last_day';
/** 周度奖励模式：仅当前日期(date) / 每周同一天(weekday) */
export type CheckInWeeklyRewardMode = 'date' | 'weekday';

/** 第一步「基础信息」表单字段子集，从 API 返回详情中提取关键字段 */
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

/** 完整的计划表单模型，新增时无 id，编辑时携带 id */
export type CheckInPlanFormModel = Partial<
  Pick<CheckInPlanUpdateRequest, 'id'>
> &
  PlanFormFields;

/**
 * 周期模式奖励规则草稿（用于周计划的 WEEKDAY 或月计划的 MONTH_DAY / MONTH_LAST_DAY）
 * - key: 由 createPatternRuleKey 生成的唯一标识，如 "WEEKDAY:1"、"MONTH_DAY:15"
 * - id: 已有规则的数据库主键，新增时为 undefined
 */
export type CheckInPatternRuleDraft = {
  experience?: CheckInRewardConfigValue['experience'];
  id?: number;
  key: string;
  monthDay?: number;
  patternType: CheckInPatternType;
  points?: CheckInRewardConfigValue['points'];
  weekday?: number;
};

/**
 * 具体日期奖励规则草稿
 * - localId: 前端生成的临时唯一标识，格式如 "date-2025-01-15"
 * - rewardDate: 目标日期字符串 (YYYY-MM-DD)
 */
export type CheckInDateRuleDraft = {
  experience?: CheckInRewardConfigValue['experience'];
  id?: number;
  localId: string;
  points?: CheckInRewardConfigValue['points'];
  rewardDate: string;
};

/**
 * 连续签到奖励规则草稿
 * - streakDays: 连续签到天数阈值
 * - repeatable: 是否可重复领取（达到后每次循环都可领 / 仅首次达到时领取一次）
 * - ruleCode: 规则编码，业务标识用
 */
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

/**
 * 第二步「奖励配置」完整表单模型
 * - weekCursor / monthCursor: 日历视图当前浏览的位置（周起始日 / 月）
 * - weeklyRewardMode / monthlyRewardMode: 当前选中日期的奖励生效范围模式
 */
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

/** 编辑器完整状态，合并了计划基础信息和奖励配置 */
export type CheckInPlanEditorState = {
  plan: CheckInPlanFormModel;
  reward: CheckInRewardFormModel;
  /** 标记该计划是否已存在奖励配置（决定保存时调用 create 还是 update 接口） */
  rewardConfigExists: boolean;
};

/** 月视图中每个格子的数据结构 */
export type CheckInMonthCalendarCell = {
  date: string;
  day: number;
  /** 是否属于当前正在查看的月份（非上月/下月的溢出日期） */
  isCurrentMonth: boolean;
  /** 是否不可交互（非当月日期或超出计划时间窗口） */
  isDisabled: boolean;
  /** 是否在计划的有效起止时间范围内 */
  isInPlanWindow: boolean;
  isLastDayOfMonth: boolean;
  /** 若该日期命中了某个周期模式规则，记录其 key */
  patternRuleKey?: string;
  /** 奖励摘要文本，用于在日历格子上展示 */
  rewardSummary: string;
};

/** 周视图中每个格子的数据结构 */
export type CheckInWeekCalendarCell = {
  date: string;
  dayLabel: string;
  isDisabled: boolean;
  rewardSummary: string;
  weekday: number;
  /** 若该星期几命中了 WEEKDAY 周期规则，记录其 key */
  weekdayRuleKey?: string;
};

export const CHECK_IN_CYCLE_TYPE = {
  WEEKLY: 1,
  MONTHLY: 2,
} as const;

export const CHECK_IN_PATTERN_TYPE = {
  WEEKDAY: 1,
  MONTH_DAY: 2,
  MONTH_LAST_DAY: 3,
} as const;

// ======================== 常量 ========================

/** 周视图的星期标签，周一=1 ... 周日=7 */
export const weeklyCalendarLabels = [
  { dayLabel: '周一', value: 1 },
  { dayLabel: '周二', value: 2 },
  { dayLabel: '周三', value: 3 },
  { dayLabel: '周四', value: 4 },
  { dayLabel: '周五', value: 5 },
  { dayLabel: '周六', value: 6 },
  { dayLabel: '周日', value: 7 },
];

// ======================== 表单 Schema ========================

/** 第一步「基础信息」表单字段定义 */
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
        { color: 'warning', label: '按周', value: CHECK_IN_CYCLE_TYPE.WEEKLY },
        { color: 'success', label: '按月', value: CHECK_IN_CYCLE_TYPE.MONTHLY },
      ],
      placeholder: '请选择周期类型',
    },
    defaultValue: CHECK_IN_CYCLE_TYPE.WEEKLY,
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

// ======================== 工厂函数 ========================

/** 创建默认的计划基础信息表单模型（新增场景使用） */
export function createDefaultPlanFormModel(): CheckInPlanFormModel {
  return {
    allowMakeupCountPerCycle: 0,
    cycleType: CHECK_IN_CYCLE_TYPE.WEEKLY,
    planCode: '',
    planName: '',
    startDate: getDefaultPlanStartDate(CHECK_IN_CYCLE_TYPE.WEEKLY),
    status: 0,
  };
}

/** 创建默认的奖励配置表单模型，weekCursor/monthCursor 会根据传入的 startDate 对齐到正确周期 */
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

// ======================== 日期工具函数 ========================

/**
 * 为周期模式规则生成唯一标识 key
 * - WEEKDAY → "WEEKDAY:1" ~ "WEEKDAY:7"
 * - MONTH_DAY → "MONTH_DAY:1" ~ "MONTH_DAY:31"
 * - MONTH_LAST_DAY → "MONTH_LAST_DAY"
 */
export function createPatternRuleKey(rule: {
  monthDay?: null | number;
  patternType: CheckInPatternType;
  weekday?: null | number;
}) {
  switch (rule.patternType) {
    case CHECK_IN_PATTERN_TYPE.MONTH_DAY: {
      return `MONTH_DAY:${rule.monthDay}`;
    }
    case CHECK_IN_PATTERN_TYPE.MONTH_LAST_DAY: {
      return 'MONTH_LAST_DAY';
    }
    default: {
      return `WEEKDAY:${rule.weekday}`;
    }
  }
}

/** 将日期格式化为月份光标 (YYYY-MM)，用于月视图定位 */
export function formatMonthCursor(value: string) {
  return dayjs(value).format('YYYY-MM');
}

/**
 * 将日期归一到所在周的周一作为周光标 (YYYY-MM-DD)
 * 例如：2025-01-15（周三）→ 2025-01-13（周一）
 */
export function formatWeekCursor(value: string) {
  const date = dayjs(value);
  return date
    .subtract(toMondayBasedWeekday(date) - 1, 'day')
    .format('YYYY-MM-DD');
}

/**
 * 根据周期类型获取默认的开始日期
 * - 周计划：对齐到当周周一
 * - 月计划：对齐到当月 1 号
 */
export function getDefaultPlanStartDate(cycleType: CheckInCycleType) {
  const now = dayjs();

  if (cycleType === CHECK_IN_CYCLE_TYPE.WEEKLY) {
    return now
      .subtract(toMondayBasedWeekday(now) - 1, 'day')
      .format('YYYY-MM-DD');
  }

  return now.startOf('month').format('YYYY-MM-DD');
}

/**
 * 将用户选择的日期归一化为符合周期约束的标准边界日期
 * - 周计划 start → 所在周周一，end → 所在周周日
 * - 月计划 start → 所在月 1 号，end → 所在月最后一天
 */
export function normalizePlanBoundaryDate(
  value: string | undefined,
  cycleType: CheckInCycleType,
  boundary: 'end' | 'start',
) {
  if (!value) {
    return undefined;
  }

  const date = dayjs(value);
  if (cycleType === CHECK_IN_CYCLE_TYPE.WEEKLY) {
    const weekdayOffset = toMondayBasedWeekday(date) - 1;
    return boundary === 'start'
      ? date.subtract(weekdayOffset, 'day').format('YYYY-MM-DD')
      : date.add(6 - weekdayOffset, 'day').format('YYYY-MM-DD');
  }

  return boundary === 'start'
    ? date.startOf('month').format('YYYY-MM-DD')
    : date.endOf('month').format('YYYY-MM-DD');
}

/** 对整个计划表单值做归一化处理，确保起止日期符合周期约束 */
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

/**
 * 获取表单显示用的值
 * 月计划模式下，日期选择器使用 month 类型，需要将 YYYY-MM-DD 转为 YYYY-MM 显示
 */
export function getPlanFormDisplayValues(model: CheckInPlanFormModel) {
  if (model.cycleType !== CHECK_IN_CYCLE_TYPE.MONTHLY) {
    return model;
  }

  return {
    ...model,
    endDate: model.endDate ? dayjs(model.endDate).format('YYYY-MM') : undefined,
    startDate: dayjs(model.startDate).format('YYYY-MM'),
  } satisfies CheckInPlanFormModel;
}

// ======================== 奖励相关工具函数 ========================

/**
 * 格式化奖励摘要文本，用于在日历格子上展示
 * 示例：「积分 10 / 经验 20」或「未配置」
 */
export function formatRewardSummary(value: unknown) {
  const rewardConfig = parseRewardConfig(value);
  const items = [
    rewardConfig.points ? `积分 ${rewardConfig.points}` : '',
    rewardConfig.experience ? `经验 ${rewardConfig.experience}` : '',
  ].filter(Boolean);

  return items.length > 0 ? items.join(' / ') : '未配置';
}

/** 获取月度奖励模式的选项列表（目前不含 month_last_day，月末规则有独立入口） */
export function getMonthlyRewardModeOptions(_selectedDate: string) {
  const options: Array<{ label: string; value: CheckInMonthlyRewardMode }> = [
    { label: '仅当前日期生效', value: 'date' },
    { label: '应用到周期内每个月这一天', value: 'month_day' },
  ];

  return options;
}

/** 获取周度奖励模式的选项列表 */
export function getWeeklyRewardModeOptions() {
  return [
    { label: '仅当前日期生效', value: 'date' as const },
    { label: '应用到周期内每周这一天', value: 'weekday' as const },
  ];
}

/**
 * 根据已有规则自动推断月度奖励应使用的模式
 * 优先级：具体日期规则 > 每月同日规则 > 默认(date)
 */
export function resolveMonthlyRewardMode(params: {
  dateRules: CheckInDateRuleDraft[];
  patternRules: CheckInPatternRuleDraft[];
  selectedDate: string;
}): CheckInMonthlyRewardMode {
  const { dateRules, patternRules, selectedDate } = params;

  // 如果该日期已存在具体日期规则，则模式为 date
  if (dateRules.some((item) => item.rewardDate === selectedDate)) {
    return 'date';
  }

  const date = dayjs(selectedDate);

  // 如果该日期的「几号」已存在 MONTH_DAY 规则，则模式为 month_day
  if (
    patternRules.some(
      (item) =>
        item.patternType === CHECK_IN_PATTERN_TYPE.MONTH_DAY &&
        item.monthDay === date.date(),
    )
  ) {
    return 'month_day';
  }

  return 'date';
}

/**
 * 根据已有规则自动推断周度奖励应使用的模式
 * 优先级：具体日期规则 > 每周同日规则 > 默认(date)
 */
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
        item.patternType === CHECK_IN_PATTERN_TYPE.WEEKDAY &&
        item.weekday === toMondayBasedWeekday(date),
    )
  ) {
    return 'weekday';
  }

  return 'date';
}

/** 安全地解析奖励配置对象，非对象类型返回空对象 */
export function parseRewardConfig(value: unknown): CheckInRewardConfigValue {
  if (!value) {
    return {};
  }

  if (Array.isArray(value)) {
    return parseRewardItems(value);
  }

  if (typeof value !== 'object') {
    return {};
  }

  const candidate = value as {
    baseRewardItems?: GrowthRewardItemDto[];
    experience?: number;
    points?: number;
    rewardItems?: GrowthRewardItemDto[];
  };

  if (Array.isArray(candidate.rewardItems)) {
    return parseRewardItems(candidate.rewardItems);
  }

  if (Array.isArray(candidate.baseRewardItems)) {
    return parseRewardItems(candidate.baseRewardItems);
  }

  return {
    experience:
      typeof candidate.experience === 'number' ? candidate.experience : undefined,
    points: typeof candidate.points === 'number' ? candidate.points : undefined,
  };
}

/** 判断奖励配置中是否至少填写了积分或经验的一项（大于 0 视为有效） */
export function hasConfiguredReward(value: {
  experience?: null | number;
  points?: null | number;
}) {
  return Number(value.experience ?? 0) > 0 || Number(value.points ?? 0) > 0;
}

/**
 * 判断一个计划详情是否已经存在任何有效的奖励配置
 * 用于区分新建（需调 create 接口）和编辑（需调 update 接口）场景
 */
export function hasExistingRewardConfig(source: {
  baseRewardItems?: GrowthRewardItemDto[] | null;
  dateRewardRules?: Array<{
    rewardItems?: GrowthRewardItemDto[] | null;
  }> | null;
  patternRewardRules?: Array<{
    rewardItems?: GrowthRewardItemDto[] | null;
  }> | null;
  streakRewardRules?: Array<{
    rewardItems?: GrowthRewardItemDto[] | null;
  }> | null;
}) {
  return (
    hasConfiguredReward(parseRewardConfig(source.baseRewardItems)) ||
    !!source.dateRewardRules?.some((item) =>
      hasConfiguredReward(parseRewardConfig(item.rewardItems)),
    ) ||
    !!source.patternRewardRules?.some((item) =>
      hasConfiguredReward(parseRewardConfig(item.rewardItems)),
    ) ||
    !!source.streakRewardRules?.some((item) =>
      hasConfiguredReward(parseRewardConfig(item.rewardItems)),
    )
  );
}

// ======================== 数据映射 ========================

/**
 * 将服务端返回的计划详情转换为编辑器可用的状态
 * 主要处理：
 * - 日期格式统一转为 YYYY-MM-DD
 * - 奖励配置拆分为三类规则数组并排序
 * - 生成前端所需的 localId / key 等临时标识
 */
export function mapPlanDetailToEditorState(
  detail: CheckInPlanDetailResponseDto,
): CheckInPlanEditorState {
  const baseRewardConfig = parseRewardConfig(detail.baseRewardItems);

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
          const rewardConfig = parseRewardConfig(item.rewardItems);
          return {
            experience: rewardConfig.experience ?? undefined,
            localId: `date-${item.rewardDate}`,
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
          const rewardConfig = parseRewardConfig(item.rewardItems);
          return {
            experience: rewardConfig.experience ?? undefined,
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
          const rewardConfig = parseRewardConfig(item.rewardItems);
          return {
            experience: rewardConfig.experience ?? undefined,
            localId: `streak-${item.ruleCode}`,
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

/**
 * 构建计划基础信息的提交载荷（不含奖励配置）
 * 根据 model.id 是否存在自动区分为更新或创建请求
 */
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

/**
 * 构建带奖励配置的计划提交载荷
 * 将奖励配置字段合并到计划创建/更新 DTO 中，通过计划接口一并提交
 */
export function buildPlanWithRewardPayload(params: {
  cycleType: CheckInCycleType;
  plan: CheckInPlanFormModel;
  planId?: number;
  reward: CheckInRewardFormModel;
}) {
  const { cycleType, planId, plan, reward } = params;
  const baseRewardItems = buildRewardItems(
    reward.baseRewardPoints,
    reward.baseRewardExperience,
  );
  // 具体日期规则：仅保留有效奖励项，按日期升序排列
  const dateRewardRules = reward.dateRules
    .filter((item) =>
      hasConfiguredReward({
        experience: item.experience,
        points: item.points,
      }),
    )
    .toSorted((left, right) => left.rewardDate.localeCompare(right.rewardDate))
    .map((item) => {
      return {
        rewardItems: buildRewardItems(item.points, item.experience) || [],
        rewardDate: item.rewardDate,
      } satisfies CreateCheckInDateRewardRuleDto;
    });
  const patternRewardRules = reward.patternRules
    .filter((item) =>
      hasConfiguredReward({
        experience: item.experience,
        points: item.points,
      }),
    )
    .filter((item) =>
      cycleType === CHECK_IN_CYCLE_TYPE.WEEKLY
        ? item.patternType === CHECK_IN_PATTERN_TYPE.WEEKDAY
        : item.patternType === CHECK_IN_PATTERN_TYPE.MONTH_DAY ||
          item.patternType === CHECK_IN_PATTERN_TYPE.MONTH_LAST_DAY,
    )
    .toSorted(comparePatternRuleDraft)
    .map((item) => {
      return {
        monthDay:
          item.patternType === CHECK_IN_PATTERN_TYPE.MONTH_DAY
            ? item.monthDay
            : undefined,
        patternType: item.patternType,
        rewardItems: buildRewardItems(item.points, item.experience) || [],
        weekday:
          item.patternType === CHECK_IN_PATTERN_TYPE.WEEKDAY
            ? item.weekday
            : undefined,
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
        rewardItems: buildRewardItems(item.points, item.experience) || [],
        ruleCode: item.ruleCode.trim(),
        status: item.status,
        streakDays: Number(item.streakDays),
      } satisfies CreateCheckInStreakRewardRuleDto;
    });

  // 将奖励配置合并到计划载荷中
  const basePayload = buildPlanSubmitPayload(plan);
  const rewardFields = {
    baseRewardItems: baseRewardItems || undefined,
    dateRewardRules,
    patternRewardRules,
    streakRewardRules,
  };

  if (planId || plan.id) {
    return {
      ...basePayload,
      id: (planId || plan.id)!,
      ...rewardFields,
    } satisfies CheckInPlanUpdateRequest;
  }

  return {
    ...basePayload,
    ...rewardFields,
  } satisfies CheckInPlanCreateRequest;
}

// ======================== 日历构建函数 ========================

/**
 * 构建月视图日历格子数据
 * 从当月 1 号所在周的周一开始，填满整个矩形网格（含上月/下月溢出日期）
 * 每个格子会标记：是否当月、是否在计划窗口内、是否禁用、奖励摘要等
 */
export function buildMonthCalendar(params: {
  cycleType: CheckInCycleType;
  dateRules: CheckInDateRuleDraft[];
  endDate?: null | string;
  mode: CheckInMonthlyRewardMode;
  monthCursor: string;
  patternRules: CheckInPatternRuleDraft[];
  startDate: string;
}) {
  const { dateRules, endDate, monthCursor, patternRules, startDate } = params;
  const monthStart = dayjs(`${monthCursor}-01`);
  const monthEnd = monthStart.endOf('month');
  // 网格起始日 = 当月 1 号向前偏移到所在周的周一
  const gridStart = monthStart.subtract(
    toMondayBasedWeekday(monthStart) - 1,
    'day',
  );
  // 总格子数向上取整到 7 的倍数（保证完整的行）
  const totalCells =
    Math.ceil((toMondayBasedWeekday(monthStart) - 1 + monthEnd.date()) / 7) * 7;

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

/**
 * 构建周视图日历格子数据（固定 7 个格子，周一 ~ 周日）
 * 每个格子展示星期标签 + 日期 + 当前生效的奖励摘要
 */
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
    const weekdayRule = findPatternRuleByKey(
      params.patternRules,
      weekdayRuleKey,
    );

    return {
      date,
      dayLabel: `${item.dayLabel} ${current.format('MM-DD')}`,
      isDisabled: false,
      rewardSummary: dateRule
        ? formatRewardSummary(dateRule)
        : (weekdayRule
          ? formatRewardSummary(weekdayRule)
          : '沿用默认'),
      weekday: item.value,
      weekdayRuleKey: weekdayRule?.key,
    } satisfies CheckInWeekCalendarCell;
  });
}

// ======================== 业务校验函数 ========================

/**
 * 校验计划基础信息的业务规则
 * 包括：起止日期顺序、周计划必须周一始/周日止、月计划必须 1 号始/月末止
 * 返回 null 表示校验通过，否则返回错误信息
 */
export function getPlanBusinessRuleError(model: CheckInPlanFormModel) {
  if (
    model.endDate &&
    dayjs(model.endDate).valueOf() < dayjs(model.startDate).valueOf()
  ) {
    return '结束日期不能早于开始日期';
  }

  const startDate = dayjs(model.startDate);
  if (model.cycleType === CHECK_IN_CYCLE_TYPE.WEEKLY) {
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

// ======================== 日期禁用判断 ========================

/** 判断某日期是否应被禁用（开始日期选择器）：周计划只允许选周一，月计划只允许选 1 号 */
export function isPlanStartDateDisabled(
  current: Date,
  cycleType: CheckInCycleType,
) {
  const date = dayjs(current);
  return cycleType === CHECK_IN_CYCLE_TYPE.WEEKLY
    ? toMondayBasedWeekday(date) !== 1
    : date.date() !== 1;
}

/**
 * 判断某日期是否应被禁用（结束日期选择器）
 * 不能早于开始日期；周计划只允许选周日，月计划只允许选月末
 */
export function isPlanEndDateDisabled(
  current: Date,
  cycleType: CheckInCycleType,
  startDate?: string,
) {
  const date = dayjs(current);

  if (startDate && date.valueOf() < dayjs(startDate).startOf('day').valueOf()) {
    return true;
  }

  return cycleType === CHECK_IN_CYCLE_TYPE.WEEKLY
    ? toMondayBasedWeekday(date) !== 7
    : date.date() !== date.daysInMonth();
}

/**
 * 创建日期选择器的禁用回调处理器闭包
 * 内部通过 getState 获取最新的 cycleType 和 startDate，确保动态联动
 */
export function createPlanDateDisableHandlers(
  getState: () => {
    cycleType: CheckInCycleType;
    startDate?: string;
  },
) {
  return {
    isEndDateDisabled(current: Date) {
      const state = getState();
      if (state.cycleType === CHECK_IN_CYCLE_TYPE.MONTHLY) {
        return isPlanEndMonthDisabled(current, state.startDate);
      }
      return isPlanEndDateDisabled(current, state.cycleType, state.startDate);
    },
    isStartDateDisabled(current: Date) {
      const state = getState();
      if (state.cycleType === CHECK_IN_CYCLE_TYPE.MONTHLY) {
        return isPlanStartMonthDisabled(current);
      }
      return isPlanStartDateDisabled(current, state.cycleType);
    },
  };
}

/** 月计划开始月份选择器不禁用任何月份（由 UI 层自行限制） */
export function isPlanStartMonthDisabled(_current: Date) {
  return false;
}

/** 月计划结束月份选择器：不允许选择早于开始月份的月份 */
export function isPlanEndMonthDisabled(current: Date, startDate?: string) {
  if (!startDate) {
    return false;
  }

  return (
    dayjs(current).startOf('month').valueOf() <
    dayjs(startDate).startOf('month').valueOf()
  );
}

/**
 * 校验奖励配置的业务规则
 * 检查项包括：
 * 1. 默认基础奖励至少填写积分或经验其中一项
 * 2. 所有具体日期规则都必须有有效奖励
 * 3. 所有周期模式规则都必须有有效奖励
 * 4. 连续奖励的天数不能为空、不能重复、每条必须有有效奖励
 * 5. 周计划的 WEEKDAY 规则必须绑定了具体星期几
 * 返回 null 表示校验通过
 */
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

  if (plan.cycleType === CHECK_IN_CYCLE_TYPE.WEEKLY) {
    const invalidWeekdayPattern = reward.patternRules.find(
      (item) =>
        item.patternType === CHECK_IN_PATTERN_TYPE.WEEKDAY && !item.weekday,
    );
    if (invalidWeekdayPattern) {
      return '周计划奖励必须绑定具体星期';
    }
  }

  return null;
}

// ======================== 规则 CRUD 操作 ========================

/**
 * 新增或更新具体日期奖励规则（按 rewardDate 去重）
 * 若新的 draft 无有效奖励则视为删除操作
 */
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

/**
 * 新增或更新周期模式奖励规则（按 key 去重）
 * 若新的 draft 无有效奖励则视为删除操作
 */
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

/** 按 key 移除一条周期模式规则 */
export function removePatternRule(
  patternRules: CheckInPatternRuleDraft[],
  key: string,
) {
  return patternRules.filter((item) => item.key !== key);
}

/** 按 rewardDate 移除一条具体日期规则 */
export function removeDateRule(
  dateRules: CheckInDateRuleDraft[],
  rewardDate: string,
) {
  return dateRules.filter((item) => item.rewardDate !== rewardDate);
}

// ======================== 规则转换与查询 ========================

/** 根据星期几创建周计划的 WEEKDAY 模式规则草稿，可从已有规则复制奖励值 */
export function toWeeklyPatternDraft(
  weekday: number,
  source?: CheckInPatternRuleDraft,
) {
  return {
    experience: source?.experience,
    id: source?.id,
    key: createPatternRuleKey({
      patternType: CHECK_IN_PATTERN_TYPE.WEEKDAY,
      weekday,
    }),
    patternType: CHECK_IN_PATTERN_TYPE.WEEKDAY,
    points: source?.points,
    weekday,
  } satisfies CheckInPatternRuleDraft;
}

/** 根据模式类型和参数创建月计划的模式规则草稿（MONTH_DAY 或 MONTH_LAST_DAY） */
export function toMonthlyPatternDraft(params: {
  monthDay?: number;
  patternType: 2 | 3;
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
    monthDay:
      patternType === CHECK_IN_PATTERN_TYPE.MONTH_DAY ? monthDay : undefined,
    patternType,
    points: source?.points,
  } satisfies CheckInPatternRuleDraft;
}

/** 按 key 在周期模式规则列表中查找匹配项 */
export function findPatternRuleByKey(
  patternRules: CheckInPatternRuleDraft[],
  key: string,
) {
  return patternRules.find((item) => item.key === key);
}

// ======================== 内部辅助函数 ========================

/**
 * 构建奖励项数组，当前只桥接积分与经验两类资产。
 */
function buildRewardItems(
  points?: CheckInRewardConfigValue['points'],
  experience?: CheckInRewardConfigValue['experience'],
) {
  const rewardItems: GrowthRewardItemDto[] = [];

  if (points && Number(points) > 0) {
    rewardItems.push({
      amount: Number(points),
      assetKey: '',
      assetType: CHECK_IN_REWARD_ASSET_TYPE.POINTS,
    });
  }
  if (experience && Number(experience) > 0) {
    rewardItems.push({
      amount: Number(experience),
      assetKey: '',
      assetType: CHECK_IN_REWARD_ASSET_TYPE.EXPERIENCE,
    });
  }

  return rewardItems.length > 0 ? rewardItems : null;
}

function parseRewardItems(items: GrowthRewardItemDto[]) {
  const rewardConfig: CheckInRewardConfigValue = {};

  for (const item of items) {
    if (item.assetType === CHECK_IN_REWARD_ASSET_TYPE.POINTS) {
      rewardConfig.points = Number(item.amount);
    }
    if (item.assetType === CHECK_IN_REWARD_ASSET_TYPE.EXPERIENCE) {
      rewardConfig.experience = Number(item.amount);
    }
  }

  return rewardConfig;
}

/** 周期模式规则排序比较器：WEEKDAY 按星期排，MONTH_DAY 按日期排，MONTH_LAST_DAY 排最后 */
function comparePatternRuleDraft(
  left: CheckInPatternRuleDraft,
  right: CheckInPatternRuleDraft,
) {
  return getPatternRuleSortWeight(left) - getPatternRuleSortWeight(right);
}

/** 获取周期模式规则的排序权重值 */
function getPatternRuleSortWeight(rule: CheckInPatternRuleDraft) {
  if (rule.patternType === CHECK_IN_PATTERN_TYPE.WEEKDAY) {
    return Number(rule.weekday ?? 0);
  }
  if (rule.patternType === CHECK_IN_PATTERN_TYPE.MONTH_DAY) {
    return Number(rule.monthDay ?? 0);
  }
  // MONTH_LAST_DAY 固定排在最后
  return 99;
}

/**
 * 根据日期查找匹配的周期模式规则
 * 优先级：月末规则(MONTH_LAST_DAY) > 星期规则(WEEKDAY) / 几号规则(MONTH_DAY)
 * 月末日期会优先匹配 MONTH_LAST_DAY，若没有再尝试匹配 WEEKDAY 或 MONTH_DAY
 */
function getPatternRuleForDate(
  date: Dayjs,
  patternRules: CheckInPatternRuleDraft[],
) {
  const weekday = toMondayBasedWeekday(date);
  const day = date.date();
  const isLastDayOfMonth = day === date.daysInMonth();

  // 月末日期优先匹配 MONTH_LAST_DAY 规则
  if (isLastDayOfMonth) {
    const monthLastDayRule = patternRules.find(
      (item) => item.patternType === CHECK_IN_PATTERN_TYPE.MONTH_LAST_DAY,
    );
    if (monthLastDayRule) {
      return monthLastDayRule;
    }
  }

  return patternRules.find((item) => {
    if (item.patternType === CHECK_IN_PATTERN_TYPE.WEEKDAY) {
      return item.weekday === weekday;
    }
    if (item.patternType === CHECK_IN_PATTERN_TYPE.MONTH_DAY) {
      return item.monthDay === day;
    }
    return false;
  });
}

/**
 * 将 dayjs 的星期数转换为以周一为基础的表示
 * dayjs: 周日=0, 周一=1 ... 周六=6
 * 转换后: 周一=1, 周二=2 ... 周日=7
 */
function toMondayBasedWeekday(value: Dayjs) {
  const weekday = value.day();
  return weekday === 0 ? 7 : weekday;
}
