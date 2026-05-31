export type CheckInConfigDetailResponse = CheckInConfigDetailResponseDto;

/**
 *  类型定义 [CheckInCalendarDetailRequest]
 *  @来源 签到管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CheckInCalendarDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 目标日期；服务端按该日期推导所属签到周期。 */
  targetDate: string;
};

export type CheckInCalendarDetailResponse =
  AdminCheckInCalendarDetailResponseDto;

/**
 *  类型定义 [CheckInCalendarOverviewRequest]
 *  @来源 签到管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CheckInCalendarOverviewRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 目标日期；服务端按该日期推导所属签到周期。 */
  targetDate: string;
};

export type CheckInCalendarOverviewResponse =
  AdminCheckInCalendarOverviewResponseDto;

/**
 *  类型定义 [CheckInCalendarUserDetailRequest]
 *  @来源 签到管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CheckInCalendarUserDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 目标日期；服务端按该日期推导所属签到周期。 */
  targetDate: string;

  /* 目标用户 ID。 */
  userId: number;
};

export type CheckInCalendarUserDetailResponse =
  AdminUserCheckInCalendarDetailResponseDto;

/**
 *  类型定义 [CheckInCalendarSignedUserPageRequest]
 *  @来源 签到管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CheckInCalendarSignedUserPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 目标日期；在已签用户分页中固定表示精确签到自然日，不再额外接收 signDate 或 periodKey。 */
  targetDate: string;
};

export type CheckInCalendarSignedUserPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: AdminCheckInSignedUserPageItemDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [CheckInConfigUpdateRequest]
 *  @来源 签到管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CheckInConfigUpdateRequest = UpdateCheckInConfigDto;

export type CheckInConfigUpdateResponse = boolean;

/**
 *  类型定义 [CheckInConfigUpdateEnabledRequest]
 *  @来源 签到管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CheckInConfigUpdateEnabledRequest = UpdateCheckInEnabledDto;

export type CheckInConfigUpdateEnabledResponse = boolean;

/**
 *  类型定义 [CheckInStreakPageRequest]
 *  @来源 签到管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CheckInStreakPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 记录状态（0=草稿；1=已排期；2=生效中；3=已过期；4=已终止）。 */
  status?: null | number;

  /* 命中奖励所需的连续签到天数。 */
  streakDays?: number;
};

export type CheckInStreakPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: CheckInStreakRuleDetailResponseDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [CheckInStreakDetailRequest]
 *  @来源 签到管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CheckInStreakDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type CheckInStreakDetailResponse = CheckInStreakRuleDetailResponseDto;

/**
 *  类型定义 [CheckInStreakHistoryPageRequest]
 *  @来源 签到管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CheckInStreakHistoryPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 命中奖励所需的连续签到天数。 */
  streakDays: number;
};

export type CheckInStreakHistoryPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: CheckInStreakRuleDetailResponseDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [CheckInStreakHistoryDetailRequest]
 *  @来源 签到管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CheckInStreakHistoryDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type CheckInStreakHistoryDetailResponse =
  CheckInStreakRuleDetailResponseDto;

/**
 *  类型定义 [CheckInStreakPublishRequest]
 *  @来源 签到管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CheckInStreakPublishRequest = PublishCheckInStreakRuleDto;

export type CheckInStreakPublishResponse = boolean;

/**
 *  类型定义 [CheckInStreakTerminateRequest]
 *  @来源 签到管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CheckInStreakTerminateRequest = IdDto;

export type CheckInStreakTerminateResponse = boolean;

/**
 *  类型定义 [CheckInReconciliationPageRequest]
 *  @来源 签到管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CheckInReconciliationPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 连续奖励 grant ID。 */
  grantId?: null | number;

  /* 连续奖励结算状态（0=待补偿重试；1=已补偿成功；2=终态失败）。 */
  grantSettlementStatus?: null | number;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 签到记录 ID。 */
  recordId?: null | number;

  /* 基础奖励结算状态（0=待补偿重试；1=已补偿成功；2=终态失败）。 */
  recordSettlementStatus?: null | number;

  /* 连续签到规则 ID。 */
  ruleId?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 用户 ID。 */
  userId?: null | number;
};

export type CheckInReconciliationPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: CheckInReconciliationPageItemDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [CheckInReconciliationRepairRequest]
 *  @来源 签到管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CheckInReconciliationRepairRequest = RepairCheckInRewardDto;

export type CheckInReconciliationRepairResponse =
  RepairCheckInRewardResponseDto;

/**
 *  类型定义 [CheckInStreakRepairRequest]
 *  @来源 签到管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CheckInStreakRepairRequest = RepairCheckInStreakDto;

export type CheckInStreakRepairResponse = RepairCheckInStreakResponseDto;

/**
 *  类型定义 [CheckInConfigDetailResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CheckInConfigDetailResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 默认基础奖励项。 */
  baseRewardItems?: CheckInRewardItemDto[];
  /* 创建时间 */
  createdAt: string;
  /* 具体日期奖励规则列表。 */
  dateRewardRules?: CheckInDateRewardRuleFieldsDto[];
  /* 主键id */
  id: number;
  /* 是否启用签到功能。 */
  isEnabled: boolean;
  /* 补签图标 URL。 */
  makeupIconUrl?: null | string;
  /* 补签周期类型（1=按自然周；2=按自然月）。 */
  makeupPeriodType: 1 | 2;
  /* 周期模式奖励规则列表。 */
  patternRewardRules?: BaseCheckInPatternRewardRuleDto[];
  /* 每周期系统发放的补签额度。 */
  periodicAllowance: number;
  /* 基础奖励日历汇总图标 URL。 */
  rewardOverviewIconUrl?: null | string;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CheckInRewardItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CheckInRewardItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 奖励数量；必须为大于 0 的整数 */
  amount: number;
  /* 奖励资产键；积分/经验必须为空字符串，道具/虚拟货币/等级必须提供稳定业务键 */
  assetKey?: null | string;
  /* 奖励资产类型（1=积分；2=经验；3=道具；4=虚拟货币；5=等级） */
  assetType: 1 | 2 | 3 | 4 | 5;

  /* 签到奖励图标 URL。 */
  iconUrl?: null | string;
};

/**
 *  类型定义 [CheckInDateRewardRuleFieldsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CheckInDateRewardRuleFieldsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 奖励生效日期，格式为 YYYY-MM-DD。 */
  rewardDate: string;
  /* 具体日期奖励项列表。 */
  rewardItems: CheckInRewardItemDto[];

  /* 该日期奖励概览图标 URL。 */
  rewardOverviewIconUrl?: null | string;
};

/**
 *  类型定义 [BaseCheckInPatternRewardRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseCheckInPatternRewardRuleDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 按月固定日期时使用，1..31。 */
  monthDay?: null | number;
  /* 周期模式类型（1=按周固定星期几；2=按月固定日期；3=按月最后一天）。 */
  patternType: 1 | 2 | 3;
  /* 周期模式奖励项列表。 */
  rewardItems: CheckInRewardItemDto[];
  /* 该周期奖励概览图标 URL。 */
  rewardOverviewIconUrl?: null | string;

  /* 按周固定星期几时使用，1=周一；7=周日。 */
  weekday?: null | number;
};

/**
 *  类型定义 [AdminCheckInCalendarDetailResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminCheckInCalendarDetailResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 目标周期内按天汇总的后台签到日历。 */
  days: AdminCheckInCalendarDayDto[];
  /* 当前补签周期结束日期。 */
  periodEndDate: string;
  /* 当前补签周期键。 */
  periodKey: string;
  /* 当前补签周期开始日期。 */
  periodStartDate: string;

  /* 补签周期类型（1=按自然周；2=按自然月）。 */
  periodType: number;
};

/**
 *  类型定义 [AdminCheckInCalendarDayDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminCheckInCalendarDayDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 按签到事实冻结奖励快照聚合出的当日基础奖励实际概览。 */
  baseRewardActualOverview?: CheckInRewardItemDto[];
  /* 按签到事实冻结奖励快照聚合出的当日基础奖励概览图标 URL。 */
  baseRewardActualOverviewIconUrl?: null | string;
  /* 当前生效配置对该日期的奖励规则投影视图；这是 current-config projection，不是历史冻结配置快照。 */
  baseRewardConfigProjectionOverview?: CheckInRewardItemDto[];
  /* 当前生效配置对该日期的奖励概览图标 URL。 */
  baseRewardConfigProjectionOverviewIconUrl?: null | string;
  /* 当前周期内展示序号。 */
  dayIndex: number;
  /* 是否为未来日期。 */
  isFuture: boolean;
  /* 是否为今天。 */
  isToday: boolean;
  /* 当日补签用户数（按 distinct userId 统计）。 */
  makeupSignCount: number;
  /* 当日正常签到用户数（按 distinct userId 统计）。 */
  normalSignCount: number;
  /* 自然日。 */
  signDate: string;
  /* 当日已签到用户数（按 distinct userId 统计）。 */
  signedCount: number;

  /* 当日连续奖励触发次数（按 grant 行数统计，不做用户去重）。 */
  streakRewardTriggerCount: number;
};

/**
 *  类型定义 [AdminCheckInCalendarOverviewResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminCheckInCalendarOverviewResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 周期统计截止日期，未来目标周期最多统计到今天。 */
  cutoffDate: string;
  /* 当前补签周期结束日期。 */
  periodEndDate: string;
  /* 当前补签周期键。 */
  periodKey: string;
  /* 当前补签周期开始日期。 */
  periodStartDate: string;
  /* 目标周期截至统计截止日期的概览。 */
  periodToDate: AdminCheckInCalendarOverviewCounterDto;
  /* 补签周期类型（1=按自然周；2=按自然月）。 */
  periodType: number;

  /* 目标日期当天概览。 */
  targetDay: AdminCheckInCalendarOverviewTargetDto;
};

/**
 *  类型定义 [AdminCheckInCalendarOverviewTargetDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminCheckInCalendarOverviewTargetDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 补签用户数（按 distinct userId 统计）。 */
  makeupSignCount: number;
  /* 正常签到用户数（按 distinct userId 统计）。 */
  normalSignCount: number;
  /* 目标自然日。 */
  signDate: string;
  /* 已签到用户数（按 distinct userId 统计）。 */
  signedCount: number;

  /* 连续奖励触发次数（按 grant 行数统计，不做用户去重）。 */
  streakRewardTriggerCount: number;
};

/**
 *  类型定义 [AdminCheckInCalendarOverviewCounterDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminCheckInCalendarOverviewCounterDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 补签用户数（按 distinct userId 统计）。 */
  makeupSignCount: number;
  /* 正常签到用户数（按 distinct userId 统计）。 */
  normalSignCount: number;
  /* 已签到用户数（按 distinct userId 统计）。 */
  signedCount: number;

  /* 连续奖励触发次数（按 grant 行数统计，不做用户去重）。 */
  streakRewardTriggerCount: number;
};

/**
 *  类型定义 [AdminUserCheckInCalendarDetailResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminUserCheckInCalendarDetailResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 周期内日历列表。 */
  days: CheckInCalendarDayDto[];
  /* 当前补签周期结束日期。 */
  periodEndDate: string;
  /* 当前补签周期键。 */
  periodKey: string;
  /* 当前补签周期开始日期。 */
  periodStartDate: string;

  /* 补签周期类型（1=按自然周；2=按自然月）。 */
  periodType: number;
};

/**
 *  类型定义 [CheckInCalendarDayDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CheckInCalendarDayDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 当前周期内展示序号。 */
  dayIndex: number;
  /* 该日触发的连续奖励数量。 */
  grantCount: number;
  /* 是否为未来日期。 */
  isFuture: boolean;
  /* 该日是否已签到。 */
  isSigned: boolean;
  /* 是否为今天。 */
  isToday: boolean;
  /* 该日补签图标 URL；普通签到日或未签到日为空。 */
  makeupIconUrl?: null | string;
  /* 该日基础奖励快照。 */
  rewardItems?: CheckInRewardItemDto[];
  /* 该日基础奖励概览图标 URL。 */
  rewardOverviewIconUrl?: null | string;
  /* 该日基础奖励补偿摘要。 */
  rewardSettlement?: CheckInRewardSettlementSummaryDto | null;

  /* 自然日。 */
  signDate: string;
};

/**
 *  类型定义 [CheckInRewardSettlementSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CheckInRewardSettlementSummaryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;
  /* 最近一次失败原因 */
  lastError?: null | string;
  /* 最近一次重试时间 */
  lastRetryAt?: null | string;
  /* 本次补偿关联到账本记录 ID 列表 */
  ledgerRecordIds: number[];
  /* 已执行的补偿重试次数 */
  retryCount: number;
  /* 最近一次补偿状态落定时间 */
  settledAt?: null | string;
  /* 补偿结果类型（1=本次真实落账；2=命中幂等未重复落账；3=本次处理失败） */
  settlementResultType?: null | number;

  /* 补偿状态（0=待补偿重试；1=已补偿成功；2=终态失败） */
  settlementStatus: 0 | 1 | 2;
};

/**
 *  类型定义 [AdminCheckInSignedUserPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminCheckInSignedUserPageItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 创建时间 */
  createdAt: string;
  /* 该签到日期触发的连续奖励列表。 */
  grants: CheckInGrantItemDto[];
  /* 主键id */
  id: number;
  /* 签到类型（1=正常签到；2=补签）。 */
  recordType: 1 | 2;
  /* 冻结的补签图标 URL；普通签到时为空。 */
  resolvedMakeupIconUrl?: null | string;
  /* 冻结的基础奖励快照。 */
  resolvedRewardItems?: CheckInRewardItemDto[];
  /* 冻结的基础奖励概览图标 URL。 */
  resolvedRewardOverviewIconUrl?: null | string;
  /* 基础奖励命中的规则键。 */
  resolvedRewardRuleKey?: null | string;
  /* 基础奖励解析来源（1=默认基础奖励；2=具体日期奖励；3=周期模式奖励）。 */
  resolvedRewardSourceType?: null | number;
  /* 基础奖励补偿摘要。 */
  rewardSettlement?: CheckInRewardSettlementSummaryDto | null;
  /* 关联的奖励补偿记录 ID。 */
  rewardSettlementId?: null | number;
  /* 签到自然日。 */
  signDate: string;
  /* 更新时间 */
  updatedAt: string;

  /* 已签用户信息。 */
  user?: AdminCheckInSignedUserDto | null;
};

/**
 *  类型定义 [CheckInGrantItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CheckInGrantItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 创建时间 */
  createdAt: string;
  /* 主键id */
  id: number;
  /* 是否允许重复发放。 */
  repeatable: boolean;
  /* 冻结的连续奖励快照。 */
  rewardItems: CheckInRewardItemDto[];
  /* 冻结的连续奖励概览图标 URL。 */
  rewardOverviewIconUrl?: null | string;
  /* 连续奖励补偿摘要。 */
  rewardSettlement?: CheckInRewardSettlementSummaryDto | null;
  /* 关联的奖励补偿记录 ID。 */
  rewardSettlementId?: null | number;
  /* 连续奖励规则编码。 */
  ruleCode: string;
  /* 连续签到规则 ID。 */
  ruleId: number;
  /* 命中的连续签到阈值。 */
  streakDays: number;
  /* 触发本次连续奖励的签到日期。 */
  triggerSignDate: string;
  /* 更新时间 */
  updatedAt: string;

  /* 连续奖励归属用户 ID。 */
  userId: number;
};

/**
 *  类型定义 [AdminCheckInSignedUserDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminCheckInSignedUserDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 头像URL */
  avatarUrl?: null | string;
  /* 主键id */
  id: number;

  /* 昵称 */
  nickname: string;
};

/**
 *  类型定义 [UpdateCheckInConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateCheckInConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 默认基础奖励项。 */
  baseRewardItems?: CheckInRewardItemDto[];
  /* 具体日期奖励规则列表。 */
  dateRewardRules?: CheckInDateRewardRuleFieldsDto[];
  /* 是否启用签到功能。 */
  isEnabled: boolean;
  /* 补签图标 URL。 */
  makeupIconUrl?: null | string;
  /* 补签周期类型（1=按自然周；2=按自然月）。 */
  makeupPeriodType: 1 | 2;
  /* 周期模式奖励规则列表。 */
  patternRewardRules?: BaseCheckInPatternRewardRuleDto[];
  /* 每周期系统发放的补签额度。 */
  periodicAllowance: number;

  /* 基础奖励日历汇总图标 URL。 */
  rewardOverviewIconUrl?: null | string;
};

/**
 *  类型定义 [UpdateCheckInEnabledDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateCheckInEnabledDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 是否启用签到功能。 */
  isEnabled: boolean;
};

/**
 *  类型定义 [CheckInStreakRuleDetailResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CheckInStreakRuleDetailResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 创建时间 */
  createdAt: string;
  /* 生效开始时间。 */
  effectiveFrom: string;
  /* 生效结束时间。 */
  effectiveTo?: null | string;
  /* 主键id */
  id: number;
  /* 是否为当前生效版本。 */
  isCurrent: boolean;
  /* 发布策略（1=立即生效；2=次日生效；3=指定时间生效）。 */
  publishStrategy: 1 | 2 | 3;
  /* 是否允许重复发放。 */
  repeatable?: boolean | null;
  /* 连续奖励奖励项列表。 */
  rewardItems: CheckInRewardItemDto[];
  /* 连续奖励概览图标 URL。 */
  rewardOverviewIconUrl?: null | string;
  /* 连续奖励规则编码。 */
  ruleCode: string;
  /* 记录状态（0=草稿；1=已排期；2=生效中；3=已过期；4=已终止）。 */
  status?: null | number;
  /* 命中奖励所需的连续签到天数。 */
  streakDays: number;
  /* 更新时间 */
  updatedAt: string;

  /* 记录版本号。 */
  version: number;
};

/**
 *  类型定义 [PublishCheckInStreakRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type PublishCheckInStreakRuleDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 指定生效时间；仅当发布策略需要明确时间点时传入。 */
  effectiveFrom?: null | string;
  /* 发布策略（1=立即生效；2=次日生效；3=指定时间生效）。 */
  publishStrategy: 1 | 2 | 3;
  /* 是否允许重复发放。 */
  repeatable?: boolean | null;
  /* 连续奖励奖励项列表。 */
  rewardItems: CheckInRewardItemDto[];
  /* 连续奖励概览图标 URL。 */
  rewardOverviewIconUrl?: null | string;

  /* 命中奖励所需的连续签到天数。 */
  streakDays: number;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [CheckInReconciliationPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CheckInReconciliationPageItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 创建时间 */
  createdAt: string;
  /* 该签到日期触发的连续奖励列表。 */
  grants: CheckInGrantItemDto[];
  /* 签到记录 ID。 */
  recordId: number;
  /* 签到类型（1=正常签到；2=补签）。 */
  recordType: 1 | 2;
  /* 冻结的补签图标 URL；普通签到时为空。 */
  resolvedMakeupIconUrl?: null | string;
  /* 冻结的基础奖励快照。 */
  resolvedRewardItems?: CheckInRewardItemDto[];
  /* 冻结的基础奖励概览图标 URL。 */
  resolvedRewardOverviewIconUrl?: null | string;
  /* 基础奖励命中的规则键。 */
  resolvedRewardRuleKey?: null | string;
  /* 基础奖励解析来源（1=默认基础奖励；2=具体日期奖励；3=周期模式奖励）。 */
  resolvedRewardSourceType?: null | number;
  /* 基础奖励补偿摘要。 */
  rewardSettlement?: CheckInRewardSettlementSummaryDto | null;
  /* 关联的奖励补偿记录 ID。 */
  rewardSettlementId?: null | number;
  /* 签到自然日。 */
  signDate: string;
  /* 更新时间 */
  updatedAt: string;

  /* 用户 ID。 */
  userId: number;
};

/**
 *  类型定义 [RepairCheckInRewardDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type RepairCheckInRewardDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 连续奖励对应的 grant ID。 */
  grantId?: null | number;
  /* 基础奖励对应的签到记录 ID。 */
  recordId?: null | number;

  /* 补偿目标类型（1=基础奖励；2=连续奖励）。 */
  targetType: 1 | 2;
};

/**
 *  类型定义 [RepairCheckInRewardResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type RepairCheckInRewardResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 连续奖励对应的 grant ID。 */
  grantId?: null | number;
  /* 基础奖励对应的签到记录 ID。 */
  recordId?: null | number;
  /* 本次补偿是否成功。 */
  success: boolean;

  /* 补偿目标类型（1=基础奖励；2=连续奖励）。 */
  targetType: 1 | 2;
};

/**
 *  类型定义 [RepairCheckInStreakDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type RepairCheckInStreakDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 需要重算连续签到进度和连续奖励的用户 ID。 */
  userId: number;
};

/**
 *  类型定义 [RepairCheckInStreakResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type RepairCheckInStreakResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 本次补齐创建的连续奖励发放 ID 列表。 */
  createdGrantIds: number[];
  /* 重算后的当前连续签到天数。 */
  currentStreak: number;
  /* 重算后的最近签到日期；无签到记录时为空。 */
  lastSignedDate: null | string;
  /* 本次成功补偿落账的连续奖励发放 ID 列表。 */
  settledGrantIds: number[];
  /* 重算后的当前连续区间开始日期；无连续记录时为空。 */
  streakStartedAt: null | string;

  /* 已重算的用户 ID。 */
  userId: number;
};
