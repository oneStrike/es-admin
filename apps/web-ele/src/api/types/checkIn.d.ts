export type CheckInConfigDetailResponse = CheckInConfigDetailResponseDto;

/**
 *  类型定义 [CheckInConfigUpdateRequest]
 *  @来源 签到管理
 *  @更新时间 2026-04-23 18:08:35
 */
export type CheckInConfigUpdateRequest = UpdateCheckInConfigDto;

export type CheckInConfigUpdateResponse = boolean;

/**
 *  类型定义 [CheckInConfigUpdateEnabledRequest]
 *  @来源 签到管理
 *  @更新时间 2026-04-23 18:08:35
 */
export type CheckInConfigUpdateEnabledRequest = UpdateCheckInEnabledDto;

export type CheckInConfigUpdateEnabledResponse = boolean;

/**
 *  类型定义 [CheckInStreakPageRequest]
 *  @来源 签到管理
 *  @更新时间 2026-04-23 18:08:35
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
 *  @更新时间 2026-04-23 18:08:35
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
 *  @更新时间 2026-04-23 18:08:35
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
 *  @更新时间 2026-04-23 18:08:35
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
 *  @更新时间 2026-04-23 18:08:35
 */
export type CheckInStreakPublishRequest = PublishCheckInStreakRuleDto;

export type CheckInStreakPublishResponse = boolean;

/**
 *  类型定义 [CheckInStreakTerminateRequest]
 *  @来源 签到管理
 *  @更新时间 2026-04-23 18:08:35
 */
export type CheckInStreakTerminateRequest = IdDto;

export type CheckInStreakTerminateResponse = boolean;

/**
 *  类型定义 [CheckInReconciliationPageRequest]
 *  @来源 签到管理
 *  @更新时间 2026-04-23 18:08:35
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
 *  @更新时间 2026-04-23 18:08:35
 */
export type CheckInReconciliationRepairRequest = RepairCheckInRewardDto;

export type CheckInReconciliationRepairResponse =
  RepairCheckInRewardResponseDto;

/**
 *  类型定义 [CheckInConfigDetailResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-23 18:08:35
 */
export type CheckInConfigDetailResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 默认基础奖励项。 */
  baseRewardItems?: GrowthRewardItemDto[];
  /* 创建时间 */
  createdAt: string;
  /* 具体日期奖励规则列表。 */
  dateRewardRules?: CheckInDateRewardRuleFieldsDto[];
  /* 主键id */
  id: number;
  /* 是否启用签到功能。 */
  isEnabled: boolean;
  /* 补签周期类型（1=按自然周；2=按自然月）。 */
  makeupPeriodType: 1 | 2;
  /* 周期模式奖励规则列表。 */
  patternRewardRules?: BaseCheckInPatternRewardRuleDto[];
  /* 每周期系统发放的补签额度。 */
  periodicAllowance: number;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [GrowthRewardItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-23 18:08:35
 */
export type GrowthRewardItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 奖励数量；必须为大于 0 的整数 */
  amount: number;
  /* 奖励资产键；积分/经验必须为空字符串，道具/虚拟货币/等级必须提供稳定业务键 */
  assetKey?: null | string;

  /* 奖励资产类型（1=积分；2=经验；3=道具；4=虚拟货币；5=等级） */
  assetType: 1 | 2 | 3 | 4 | 5;
};

/**
 *  类型定义 [CheckInDateRewardRuleFieldsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-23 18:08:35
 */
export type CheckInDateRewardRuleFieldsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 奖励生效日期，格式为 YYYY-MM-DD。 */
  rewardDate: string;

  /* 具体日期奖励项列表。 */
  rewardItems: GrowthRewardItemDto[];
};

/**
 *  类型定义 [BaseCheckInPatternRewardRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-23 18:08:35
 */
export type BaseCheckInPatternRewardRuleDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 按月固定日期时使用，1..31。 */
  monthDay?: null | number;
  /* 周期模式类型（1=按周固定星期几；2=按月固定日期；3=按月最后一天）。 */
  patternType: 1 | 2 | 3;
  /* 周期模式奖励项列表。 */
  rewardItems: GrowthRewardItemDto[];

  /* 按周固定星期几时使用，1=周一；7=周日。 */
  weekday?: null | number;
};

/**
 *  类型定义 [UpdateCheckInConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-23 18:08:35
 */
export type UpdateCheckInConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 默认基础奖励项。 */
  baseRewardItems?: GrowthRewardItemDto[];
  /* 具体日期奖励规则列表。 */
  dateRewardRules?: CheckInDateRewardRuleFieldsDto[];
  /* 是否启用签到功能。 */
  isEnabled: boolean;
  /* 补签周期类型（1=按自然周；2=按自然月）。 */
  makeupPeriodType: 1 | 2;
  /* 周期模式奖励规则列表。 */
  patternRewardRules?: BaseCheckInPatternRewardRuleDto[];

  /* 每周期系统发放的补签额度。 */
  periodicAllowance: number;
};

/**
 *  类型定义 [UpdateCheckInEnabledDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-23 18:08:35
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
 *  @更新时间 2026-04-23 18:08:35
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
  rewardItems: GrowthRewardItemDto[];
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
 *  @更新时间 2026-04-23 18:08:35
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
  rewardItems: GrowthRewardItemDto[];

  /* 命中奖励所需的连续签到天数。 */
  streakDays: number;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-23 18:08:35
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
 *  @更新时间 2026-04-23 18:08:35
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
  /* 冻结的基础奖励快照。 */
  resolvedRewardItems?: GrowthRewardItemDto[];
  /* 基础奖励命中的规则键。 */
  resolvedRewardRuleKey?: null | string;
  /* 基础奖励解析来源（1=默认基础奖励；2=具体日期奖励；3=周期模式奖励）。 */
  resolvedRewardSourceType?: null | number;
  /* 基础奖励补偿摘要。 */
  rewardSettlement?: CheckInRewardSettlementSummaryDto;
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
 *  类型定义 [CheckInGrantItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-23 18:08:35
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
  rewardItems: GrowthRewardItemDto[];
  /* 连续奖励补偿摘要。 */
  rewardSettlement?: CheckInRewardSettlementSummaryDto;
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
 *  类型定义 [CheckInRewardSettlementSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-23 18:08:35
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
 *  类型定义 [RepairCheckInRewardDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-23 18:08:35
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
 *  @更新时间 2026-04-23 18:08:35
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
