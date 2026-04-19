export type CheckInConfigDetailResponse = CheckInConfigDetailResponseDto

/**
 *  类型定义 [CheckInConfigUpdateRequest]
 *  @来源 签到管理
 *  @更新时间 2026-04-19 15:54:06
 */
export type CheckInConfigUpdateRequest = UpdateCheckInConfigDto

export type CheckInConfigUpdateResponse = boolean

/**
 *  类型定义 [CheckInConfigUpdateEnabledRequest]
 *  @来源 签到管理
 *  @更新时间 2026-04-19 15:54:06
 */
export type CheckInConfigUpdateEnabledRequest = UpdateCheckInEnabledDto

export type CheckInConfigUpdateEnabledResponse = boolean

export type CheckInStreakRoundDetailResponse = CheckInStreakRoundDetailResponseDto

/**
 *  类型定义 [CheckInStreakRoundUpdateRequest]
 *  @来源 签到管理
 *  @更新时间 2026-04-19 15:54:06
 */
export type CheckInStreakRoundUpdateRequest = UpdateCheckInStreakRoundDto

export type CheckInStreakRoundUpdateResponse = boolean

/**
 *  类型定义 [CheckInReconciliationPageRequest]
 *  @来源 签到管理
 *  @更新时间 2026-04-19 15:54:06
 */
export type CheckInReconciliationPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 连续奖励 grant ID。 */
  grantId?: null | number

  /* 连续奖励结算状态（0=待补偿重试；1=已补偿成功；2=终态失败）。 */
  grantSettlementStatus?: null | number

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 签到记录 ID。 */
  recordId?: null | number

  /* 基础奖励结算状态（0=待补偿重试；1=已补偿成功；2=终态失败）。 */
  recordSettlementStatus?: null | number

  /* 轮次配置 ID。 */
  roundConfigId?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 用户 ID。 */
  userId?: null | number
}

export type CheckInReconciliationPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: CheckInReconciliationItemDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [CheckInReconciliationRepairRequest]
 *  @来源 签到管理
 *  @更新时间 2026-04-19 15:54:06
 */
export type CheckInReconciliationRepairRequest = RepairCheckInRewardDto

export type CheckInReconciliationRepairResponse = RepairCheckInRewardResponseDto

/**
 *  类型定义 [CheckInStreakRoundHistoryPageRequest]
 *  @来源 签到管理
 *  @更新时间 2026-04-19 15:54:06
 */
export type CheckInStreakRoundHistoryPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string
}

export type CheckInStreakRoundHistoryPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: CheckInStreakRoundHistoryPageItemDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [CheckInStreakRoundHistoryDetailRequest]
 *  @来源 签到管理
 *  @更新时间 2026-04-19 15:54:06
 */
export type CheckInStreakRoundHistoryDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type CheckInStreakRoundHistoryDetailResponse = CheckInStreakRoundHistoryDetailResponseDto

/**
 *  类型定义 [CheckInConfigDetailResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-19 15:54:06
 */
export type CheckInConfigDetailResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 默认基础奖励项。 */
  baseRewardItems?: GrowthRewardItemDto[]
  /* 创建时间 */
  createdAt: string
  /* 具体日期奖励规则列表。 */
  dateRewardRules: CheckInDateRewardRuleItemDto[]
  /* 签到功能开关。 */
  enabled: boolean
  /* 主键id */
  id: number
  /* 补签周期类型（1=按自然周；2=按自然月）。 */
  makeupPeriodType: 1 | 2
  /* 周期模式奖励规则列表。 */
  patternRewardRules: CheckInPatternRewardRuleItemDto[]
  /* 每周期系统发放的补签额度。 */
  periodicAllowance: number

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [GrowthRewardItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-19 15:54:06
 */
export type GrowthRewardItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 奖励数量；必须为大于 0 的整数 */
  amount: number
  /* 奖励资产键；积分/经验必须为空字符串，道具/虚拟货币/等级必须提供稳定业务键 */
  assetKey?: null | string

  /* 奖励资产类型（1=积分；2=经验；3=道具；4=虚拟货币；5=等级） */
  assetType: 1 | 2 | 3 | 4 | 5
}

/**
 *  类型定义 [CheckInDateRewardRuleItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-19 15:54:06
 */
export type CheckInDateRewardRuleItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 奖励生效日期，格式为 YYYY-MM-DD。 */
  rewardDate: string

  /* 具体日期奖励项列表。 */
  rewardItems: GrowthRewardItemDto[]
}

/**
 *  类型定义 [CheckInPatternRewardRuleItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-19 15:54:06
 */
export type CheckInPatternRewardRuleItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 按月固定日期时使用，1..31。 */
  monthDay?: null | number
  /* 周期模式类型（1=按周固定星期几；2=按月固定日期；3=按月最后一天）。 */
  patternType: 1 | 2 | 3
  /* 周期模式奖励项列表。 */
  rewardItems: GrowthRewardItemDto[]

  /* 按周固定星期几时使用，1=周一；7=周日。 */
  weekday?: null | number
}

/**
 *  类型定义 [UpdateCheckInConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-19 15:54:06
 */
export type UpdateCheckInConfigDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 默认基础奖励项。 */
  baseRewardItems?: GrowthRewardItemDto[]
  /* 具体日期奖励规则列表。 */
  dateRewardRules?: CreateCheckInDateRewardRuleDto[]
  /* 是否启用签到功能。 */
  enabled: boolean
  /* 补签周期类型（1=按自然周；2=按自然月）。 */
  makeupPeriodType: 1 | 2
  /* 周期模式奖励规则列表。 */
  patternRewardRules?: CreateCheckInPatternRewardRuleDto[]

  /* 每周期系统发放的补签额度。 */
  periodicAllowance: number
}

/**
 *  类型定义 [CreateCheckInDateRewardRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-19 15:54:06
 */
export type CreateCheckInDateRewardRuleDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 奖励生效日期，格式为 YYYY-MM-DD。 */
  rewardDate: string

  /* 具体日期奖励项列表。 */
  rewardItems: GrowthRewardItemDto[]
}

/**
 *  类型定义 [CreateCheckInPatternRewardRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-19 15:54:06
 */
export type CreateCheckInPatternRewardRuleDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 按月固定日期时使用，1..31。 */
  monthDay?: null | number
  /* 周期模式类型（1=按周固定星期几；2=按月固定日期；3=按月最后一天）。 */
  patternType: 1 | 2 | 3
  /* 周期模式奖励项列表。 */
  rewardItems: GrowthRewardItemDto[]

  /* 按周固定星期几时使用，1=周一；7=周日。 */
  weekday?: null | number
}

/**
 *  类型定义 [UpdateCheckInEnabledDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-19 15:54:06
 */
export type UpdateCheckInEnabledDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 签到功能开关。 */
  enabled: boolean
}

/**
 *  类型定义 [CheckInStreakRoundDetailResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-19 15:54:06
 */
export type CheckInStreakRoundDetailResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 创建时间 */
  createdAt: string
  /* 主键id */
  id: number
  /* 显式下一轮配置 ID。 */
  nextRoundConfigId?: null | number
  /* 下一轮切换策略（1=沿用当前轮规则；2=切换到显式下一轮）。 */
  nextRoundStrategy: 1 | 2
  /* 轮次奖励规则列表。 */
  rewardRules: CheckInStreakRewardRuleItemDto[]
  /* 轮次编码。 */
  roundCode: string
  /* 轮次状态（0=草稿；1=启用；2=归档）。 */
  status: 0 | 1 | 2
  /* 更新时间 */
  updatedAt: string

  /* 版本号。 */
  version: number
}

/**
 *  类型定义 [CheckInStreakRewardRuleItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-19 15:54:06
 */
export type CheckInStreakRewardRuleItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 是否允许重复发放。 */
  repeatable?: boolean | null
  /* 连续奖励奖励项列表。 */
  rewardItems: GrowthRewardItemDto[]
  /* 连续奖励规则编码。 */
  ruleCode: string
  /* 规则状态（0=停用；1=启用）。 */
  status?: null | number

  /* 命中奖励所需的连续签到天数。 */
  streakDays: number
}

/**
 *  类型定义 [UpdateCheckInStreakRoundDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-19 15:54:06
 */
export type UpdateCheckInStreakRoundDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 显式下一轮配置 ID（当前启用接口无需传入）。 */
  nextRoundConfigId?: null | number
  /* 下一轮切换策略（1=沿用当前轮规则；2=显式下一轮，当前启用接口由系统托管）。 */
  nextRoundStrategy: 1 | 2
  /* 当前轮次奖励规则列表。 */
  rewardRules: CreateCheckInStreakRewardRuleDto[]
  /* 轮次编码。 */
  roundCode: string

  /* 轮次状态（0=草稿；1=启用；2=归档）。 */
  status: 0 | 1 | 2
}

/**
 *  类型定义 [CreateCheckInStreakRewardRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-19 15:54:06
 */
export type CreateCheckInStreakRewardRuleDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 是否允许重复发放。 */
  repeatable?: boolean | null
  /* 连续奖励奖励项列表。 */
  rewardItems: GrowthRewardItemDto[]
  /* 连续奖励规则编码。 */
  ruleCode: string
  /* 规则状态（0=停用；1=启用）。 */
  status?: null | number

  /* 命中奖励所需的连续签到天数。 */
  streakDays: number
}

/**
 *  类型定义 [CheckInReconciliationItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-19 15:54:06
 */
export type CheckInReconciliationItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 创建时间 */
  createdAt: string
  /* 该签到日期触发的连续奖励列表。 */
  grants: CheckInGrantItemDto[]
  /* 主键id */
  id: number
  /* 签到记录 ID。 */
  recordId: number
  /* 签到类型（1=正常签到；2=补签）。 */
  recordType: 1 | 2
  /* 冻结的基础奖励快照。 */
  resolvedRewardItems?: GrowthRewardItemDto[]
  /* 基础奖励命中的规则键。 */
  resolvedRewardRuleKey?: null | string
  /* 基础奖励解析来源（1=默认基础奖励；2=具体日期奖励；3=周期模式奖励）。 */
  resolvedRewardSourceType?: null | number
  /* 基础奖励补偿摘要。 */
  rewardSettlement?: CheckInRewardSettlementSummaryDto
  /* 关联的奖励补偿记录 ID。 */
  rewardSettlementId?: null | number
  /* 签到自然日。 */
  signDate: string
  /* 更新时间 */
  updatedAt: string

  /* 归属用户 ID。 */
  userId: number
}

/**
 *  类型定义 [CheckInGrantItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-19 15:54:06
 */
export type CheckInGrantItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 创建时间 */
  createdAt: string
  /* 主键id */
  id: number
  /* 是否允许重复发放。 */
  repeatable: boolean
  /* 冻结的连续奖励快照。 */
  rewardItems: GrowthRewardItemDto[]
  /* 连续奖励补偿摘要。 */
  rewardSettlement?: CheckInRewardSettlementSummaryDto
  /* 关联的奖励补偿记录 ID。 */
  rewardSettlementId?: null | number
  /* 轮次配置 ID。 */
  roundConfigId: number
  /* 命中时所在的轮次迭代号。 */
  roundIteration: number
  /* 连续奖励规则编码。 */
  ruleCode: string
  /* 命中的连续签到阈值。 */
  streakDays: number
  /* 触发本次连续奖励的签到日期。 */
  triggerSignDate: string
  /* 更新时间 */
  updatedAt: string

  /* 连续奖励归属用户 ID。 */
  userId: number
}

/**
 *  类型定义 [CheckInRewardSettlementSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-19 15:54:06
 */
export type CheckInRewardSettlementSummaryDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 奖励补偿记录 ID。 */
  id: number
  /* 最近一次失败原因。 */
  lastError?: null | string
  /* 最近一次重试时间。 */
  lastRetryAt?: null | string
  /* 关联到账本记录 ID 列表。 */
  ledgerRecordIds: number[]
  /* 重试次数。 */
  retryCount: number
  /* 最近一次落定时间。 */
  settledAt?: null | string
  /* 补偿结果类型（1=真实落账；2=命中幂等；3=处理失败）。 */
  settlementResultType?: null | number

  /* 补偿状态（0=待补偿重试；1=已补偿成功；2=终态失败）。 */
  settlementStatus: 0 | 1 | 2
}

/**
 *  类型定义 [RepairCheckInRewardDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-19 15:54:06
 */
export type RepairCheckInRewardDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 连续奖励对应的 grant ID。 */
  grantId?: null | number
  /* 基础奖励对应的签到记录 ID。 */
  recordId?: null | number

  /* 补偿目标类型（1=基础奖励；2=连续奖励）。 */
  targetType: 1 | 2
}

/**
 *  类型定义 [RepairCheckInRewardResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-19 15:54:06
 */
export type RepairCheckInRewardResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 连续奖励对应的 grant ID。 */
  grantId?: null | number
  /* 基础奖励对应的签到记录 ID。 */
  recordId?: null | number
  /* 本次补偿是否成功。 */
  success: boolean

  /* 补偿目标类型（1=基础奖励；2=连续奖励）。 */
  targetType: 1 | 2
}

/**
 *  类型定义 [CheckInStreakRoundHistoryPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-19 15:54:06
 */
export type CheckInStreakRoundHistoryPageItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 创建时间 */
  createdAt: string
  /* 主键id */
  id: number
  /* 是否为当前生效轮次。 */
  isCurrent: boolean
  /* 前驱轮次编码。 */
  predecessorRoundCode?: null | string
  /* 前驱轮次 ID。 */
  predecessorRoundId?: null | number
  /* 轮次编码。 */
  roundCode: string
  /* 轮次状态（0=草稿；1=启用；2=归档）。 */
  status: 0 | 1 | 2
  /* 后继轮次编码。 */
  successorRoundCode?: null | string
  /* 后继轮次 ID。 */
  successorRoundId?: null | number
  /* 更新时间 */
  updatedAt: string

  /* 版本号。 */
  version: number
}

/**
 *  类型定义 [CheckInStreakRoundHistoryDetailResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-19 15:54:06
 */
export type CheckInStreakRoundHistoryDetailResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 创建时间 */
  createdAt: string
  /* 主键id */
  id: number
  /* 是否为当前生效轮次。 */
  isCurrent: boolean
  /* 前驱轮次编码。 */
  predecessorRoundCode?: null | string
  /* 前驱轮次 ID。 */
  predecessorRoundId?: null | number
  /* 轮次奖励规则列表。 */
  rewardRules: CheckInStreakRewardRuleItemDto[]
  /* 轮次编码。 */
  roundCode: string
  /* 轮次状态（0=草稿；1=启用；2=归档）。 */
  status: 0 | 1 | 2
  /* 后继轮次编码。 */
  successorRoundCode?: null | string
  /* 后继轮次 ID。 */
  successorRoundId?: null | number
  /* 更新时间 */
  updatedAt: string

  /* 版本号。 */
  version: number
}