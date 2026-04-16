/**
 *  类型定义 [CheckInPlanPageRequest]
 *  @来源 签到管理/签到计划
 *  @更新时间 2026-04-16 21:43:02
 */
export type CheckInPlanPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 签到计划编码。 */
  planCode?: string

  /* 签到计划名称。 */
  planName?: string

  /* 签到计划状态（0=草稿；1=已发布；2=已下线；3=已停用） */
  status?: number
}

export type CheckInPlanPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: CheckInPlanPageItemDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [CheckInPlanDetailRequest]
 *  @来源 签到管理/签到计划
 *  @更新时间 2026-04-16 21:43:02
 */
export type CheckInPlanDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type CheckInPlanDetailResponse = CheckInPlanDetailResponseDto

/**
 *  类型定义 [CheckInPlanCreateRequest]
 *  @来源 签到管理/签到计划
 *  @更新时间 2026-04-16 21:43:02
 */
export type CheckInPlanCreateRequest = CreateCheckInPlanDto

export type CheckInPlanCreateResponse = IdDto

/**
 *  类型定义 [CheckInPlanUpdateRequest]
 *  @来源 签到管理/签到计划
 *  @更新时间 2026-04-16 21:43:02
 */
export type CheckInPlanUpdateRequest = UpdateCheckInPlanDto

export type CheckInPlanUpdateResponse = boolean

/**
 *  类型定义 [CheckInPlanUpdateStatusRequest]
 *  @来源 签到管理/签到计划
 *  @更新时间 2026-04-16 21:43:02
 */
export type CheckInPlanUpdateStatusRequest = UpdateCheckInPlanStatusDto

export type CheckInPlanUpdateStatusResponse = boolean

/**
 *  类型定义 [CheckInReconciliationPageRequest]
 *  @来源 签到管理/签到计划
 *  @更新时间 2026-04-16 21:43:02
 */
export type CheckInReconciliationPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 周期实例 ID。 */
  cycleId?: number

  /* 连续奖励发放事实 ID。 */
  grantId?: number

  /* 连续奖励发放状态（0=待处理；1=已成功；2=已失败） */
  grantStatus?: number

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 签到计划 ID。 */
  planId?: number

  /* 签到记录 ID。 */
  recordId?: number

  /* 基础奖励状态（0=待处理；1=已成功；2=已失败） */
  rewardStatus?: null | number

  /* 用户 ID。 */
  userId?: number
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
 *  @来源 签到管理/签到计划
 *  @更新时间 2026-04-16 21:43:02
 */
export type CheckInReconciliationRepairRequest = RepairCheckInRewardDto

export type CheckInReconciliationRepairResponse = RepairCheckInRewardResponseDto

/**
 *  类型定义 [CheckInPlanPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-16 21:43:02
 */
export type CheckInPlanPageItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 当前活跃周期实例数量。 */
  activeCycleCount: number
  /* 每周期允许补签次数。 */
  allowMakeupCountPerCycle: number
  /* 计划默认基础奖励配置；当天未命中具体日期奖励和周期模式奖励时回退到该配置。 */
  baseRewardConfig?: CheckInRewardConfigDto
  /* 创建时间 */
  createdAt: string
  /* 周期类型（1=按周切周期；2=按月切周期） */
  cycleType: 1 | 2
  /* 计划结束日期（date 语义）；为空表示长期有效。 */
  endDate?: null | string
  /* 主键id */
  id: number
  /* 待补偿奖励数量。 */
  pendingRewardCount: number
  /* 签到计划编码。 */
  planCode: string
  /* 签到计划名称。 */
  planName: string
  /* 当前版本连续奖励规则数量。 */
  ruleCount: number
  /* 计划开始日期（date 语义，同时作为计划生效窗口起点）。 */
  startDate: string
  /* 签到计划状态（0=草稿；1=已发布；2=已下线；3=已停用） */
  status: 0 | 1 | 2 | 3

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [CheckInRewardConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-16 21:43:02
 */
export type CheckInRewardConfigDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 奖励经验值；配置后表示本次签到或连续奖励会发放对应经验。 */
  experience?: null | number

  /* 奖励积分；配置后表示本次签到或连续奖励会发放对应积分。 */
  points?: null | number
}

/**
 *  类型定义 [CheckInPlanDetailResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-16 21:43:02
 */
export type CheckInPlanDetailResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 当前活跃周期实例数量。 */
  activeCycleCount: number
  /* 每周期允许补签次数。 */
  allowMakeupCountPerCycle: number
  /* 计划默认基础奖励配置；当天未命中具体日期奖励和周期模式奖励时回退到该配置。 */
  baseRewardConfig?: CheckInRewardConfigDto
  /* 创建时间 */
  createdAt: string
  /* 周期类型（1=按周切周期；2=按月切周期） */
  cycleType: 1 | 2
  /* 当前版本具体日期奖励规则列表。 */
  dateRewardRules: CheckInDateRewardRuleItemDto[]
  /* 计划结束日期（date 语义）；为空表示长期有效。 */
  endDate?: null | string
  /* 主键id */
  id: number
  /* 当前版本周期模式奖励规则列表。 */
  patternRewardRules: CheckInPatternRewardRuleItemDto[]
  /* 待补偿奖励数量。 */
  pendingRewardCount: number
  /* 签到计划编码。 */
  planCode: string
  /* 签到计划名称。 */
  planName: string
  /* 当前版本连续奖励规则数量。 */
  ruleCount: number
  /* 计划开始日期（date 语义，同时作为计划生效窗口起点）。 */
  startDate: string
  /* 签到计划状态（0=草稿；1=已发布；2=已下线；3=已停用） */
  status: 0 | 1 | 2 | 3
  /* 当前版本连续奖励规则列表。 */
  streakRewardRules: CheckInStreakRewardRuleItemDto[]

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [CheckInDateRewardRuleItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-16 21:43:02
 */
export type CheckInDateRewardRuleItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 该自然日命中的基础奖励配置。 */
  rewardConfig: CheckInRewardConfigDto

  /* 命中的具体自然日。 */
  rewardDate: string
}

/**
 *  类型定义 [CheckInPatternRewardRuleItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-16 21:43:02
 */
export type CheckInPatternRewardRuleItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 每月日期；仅在“每月固定几号”模式下填写，取值范围为 1..31。 */
  monthDay?: null | number
  /* 周期模式类型（1=按周固定星期几；2=按月固定日期；3=按月最后一天） */
  patternType: 1 | 2 | 3
  /* 命中后的基础奖励配置。 */
  rewardConfig: CheckInRewardConfigDto

  /* 星期值；仅在“每周固定星期几”模式下填写（1=周一；2=周二；3=周三；4=周四；5=周五；6=周六；7=周日）。 */
  weekday?: null | number
}

/**
 *  类型定义 [CheckInStreakRewardRuleItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-16 21:43:02
 */
export type CheckInStreakRewardRuleItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 是否允许重复领取；false=同周期同规则最多发放一次；true=命中阈值时可重复发放。 */
  repeatable: boolean
  /* 连续奖励配置。 */
  rewardConfig: CheckInRewardConfigDto
  /* 规则编码。 */
  ruleCode: string
  /* 规则状态（0=已停用；1=已启用） */
  status: 0 | 1

  /* 连续签到阈值天数。 */
  streakDays: number
}

/**
 *  类型定义 [CreateCheckInPlanDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-16 21:43:02
 */
export type CreateCheckInPlanDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 每周期允许补签次数。 */
  allowMakeupCountPerCycle: number
  /* 计划默认基础奖励配置；当天未命中具体日期奖励和周期模式奖励时回退到该配置。 */
  baseRewardConfig?: CheckInRewardConfigDto
  /* 周期类型（1=按周切周期；2=按月切周期） */
  cycleType: 1 | 2
  /* 具体日期奖励规则列表。 */
  dateRewardRules?: CreateCheckInDateRewardRuleDto[]
  /* 计划结束日期（date 语义）；为空表示长期有效。 */
  endDate?: null | string
  /* 周期模式奖励规则列表；月计划同日同时命中“按月最后一天”和“按月固定日期”时，优先按“按月最后一天”解析。 */
  patternRewardRules?: CreateCheckInPatternRewardRuleDto[]
  /* 签到计划编码。 */
  planCode: string
  /* 签到计划名称。 */
  planName: string
  /* 计划开始日期（date 语义，同时作为计划生效窗口起点）。 */
  startDate: string
  /* 签到计划状态（0=草稿；1=已发布；2=已下线；3=已停用） */
  status: 0 | 1 | 2 | 3

  /* 连续签到奖励规则列表。 */
  streakRewardRules?: CreateCheckInStreakRewardRuleDto[]
}

/**
 *  类型定义 [CreateCheckInDateRewardRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-16 21:43:02
 */
export type CreateCheckInDateRewardRuleDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 该自然日命中的基础奖励配置。 */
  rewardConfig: CheckInRewardConfigDto

  /* 命中的具体自然日。 */
  rewardDate: string
}

/**
 *  类型定义 [CreateCheckInPatternRewardRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-16 21:43:02
 */
export type CreateCheckInPatternRewardRuleDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 每月日期；仅在“每月固定几号”模式下填写，取值范围为 1..31。 */
  monthDay?: null | number
  /* 周期模式类型（1=按周固定星期几；2=按月固定日期；3=按月最后一天） */
  patternType: 1 | 2 | 3
  /* 命中后的基础奖励配置。 */
  rewardConfig: CheckInRewardConfigDto

  /* 星期值；仅在“每周固定星期几”模式下填写（1=周一；2=周二；3=周三；4=周四；5=周五；6=周六；7=周日）。 */
  weekday?: null | number
}

/**
 *  类型定义 [CreateCheckInStreakRewardRuleDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-16 21:43:02
 */
export type CreateCheckInStreakRewardRuleDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 是否允许重复领取；false=同周期同规则最多发放一次；true=命中阈值时可重复发放。 */
  repeatable: boolean
  /* 连续奖励配置。 */
  rewardConfig: CheckInRewardConfigDto
  /* 规则编码。 */
  ruleCode: string
  /* 规则状态（0=已停用；1=已启用） */
  status: 0 | 1

  /* 连续签到阈值天数。 */
  streakDays: number
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-16 21:43:02
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

/**
 *  类型定义 [UpdateCheckInPlanDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-16 21:43:02
 */
export type UpdateCheckInPlanDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 每周期允许补签次数。 */
  allowMakeupCountPerCycle?: number
  /* 计划默认基础奖励配置；当天未命中具体日期奖励和周期模式奖励时回退到该配置。 */
  baseRewardConfig?: CheckInRewardConfigDto
  /* 周期类型（1=按周切周期；2=按月切周期） */
  cycleType?: 1 | 2
  /* 具体日期奖励规则列表。 */
  dateRewardRules?: CreateCheckInDateRewardRuleDto[]
  /* 计划结束日期（date 语义）；为空表示长期有效。 */
  endDate?: null | string
  /* 主键id */
  id: number
  /* 周期模式奖励规则列表；月计划同日同时命中“按月最后一天”和“按月固定日期”时，优先按“按月最后一天”解析。 */
  patternRewardRules?: CreateCheckInPatternRewardRuleDto[]
  /* 签到计划编码。 */
  planCode?: string
  /* 签到计划名称。 */
  planName?: string
  /* 计划开始日期（date 语义，同时作为计划生效窗口起点）。 */
  startDate?: string
  /* 签到计划状态（0=草稿；1=已发布；2=已下线；3=已停用） */
  status?: 0 | 1 | 2 | 3

  /* 连续签到奖励规则列表。 */
  streakRewardRules?: CreateCheckInStreakRewardRuleDto[]
}

/**
 *  类型定义 [UpdateCheckInPlanStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-16 21:43:02
 */
export type UpdateCheckInPlanStatusDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 签到计划状态（0=草稿；1=已发布；2=已下线；3=已停用） */
  status: 0 | 1 | 2 | 3
}

/**
 *  类型定义 [CheckInReconciliationItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-16 21:43:02
 */
export type CheckInReconciliationItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 基础奖励账本记录 ID 列表。 */
  baseRewardLedgerIds: number[]
  /* 创建时间 */
  createdAt: string
  /* 周期实例 ID。 */
  cycleId: number
  /* 关联的连续奖励发放列表。 */
  grants: CheckInGrantItemDto[]
  /* 最近一次基础奖励失败原因。 */
  lastRewardError?: null | string
  /* 签到计划 ID。 */
  planId: number
  /* 签到记录 ID。 */
  recordId: number
  /* 签到类型（1=正常签到；2=补签） */
  recordType: 1 | 2
  /* 本次基础奖励解析结果快照；来源可能是具体日期奖励、周期模式奖励或计划默认基础奖励，为空表示该签到事实没有基础奖励。 */
  resolvedRewardConfig?: CheckInRewardConfigDto
  /* 本次基础奖励命中的规则键；命中默认基础奖励时为空。格式为 DATE:YYYY-MM-DD（具体日期）、WEEKDAY:n（按周星期）、MONTH_DAY:n（按月日期）或 MONTH_LAST_DAY（月末规则）。 */
  resolvedRewardRuleKey?: null | string
  /* 基础奖励来源（1=默认基础奖励；2=具体日期奖励；3=周期模式奖励） */
  resolvedRewardSourceType?: null | number
  /* 基础奖励结果类型（1=本次真实落账；2=命中幂等未重复落账；3=本次处理失败） */
  rewardResultType?: null | number
  /* 基础奖励状态（0=待处理；1=已成功；2=已失败） */
  rewardStatus?: null | number
  /* 签到日期（date 语义）。 */
  signDate: string

  /* 用户 ID。 */
  userId: number
}

/**
 *  类型定义 [CheckInGrantItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-16 21:43:02
 */
export type CheckInGrantItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 连续奖励发放结果类型（1=本次真实落账；2=命中幂等未重复落账；3=本次处理失败） */
  grantResultType?: null | number
  /* 连续奖励发放状态（0=待处理；1=已成功；2=已失败） */
  grantStatus: 0 | 1 | 2
  /* 主键id */
  id: number
  /* 最近一次连续奖励失败原因。 */
  lastGrantError?: null | string
  /* 连续奖励账本记录 ID 列表。 */
  ledgerIds: number[]
  /* 连续奖励配置快照。 */
  rewardConfig: CheckInRewardConfigDto
  /* 连续奖励规则编码。 */
  ruleCode: string
  /* 连续签到阈值天数。 */
  streakDays: number

  /* 触发连续奖励的签到日期（date 语义）。 */
  triggerSignDate: string
}

/**
 *  类型定义 [RepairCheckInRewardDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-16 21:43:02
 */
export type RepairCheckInRewardDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 连续奖励发放事实 ID。 */
  grantId?: number
  /* 签到记录 ID。 */
  recordId?: number

  /* 补偿目标类型（1=基础签到奖励；2=连续签到奖励） */
  targetType: 1 | 2
}

/**
 *  类型定义 [RepairCheckInRewardResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-16 21:43:02
 */
export type RepairCheckInRewardResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 连续奖励发放事实 ID。 */
  grantId?: number
  /* 签到记录 ID。 */
  recordId?: number
  /* 是否补偿成功。 */
  success: boolean

  /* 补偿目标类型（1=基础签到奖励；2=连续签到奖励） */
  targetType: 1 | 2
}