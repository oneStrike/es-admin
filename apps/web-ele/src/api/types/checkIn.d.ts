/**
 *  类型定义 [CheckInPlanPageRequest]
 *  @来源 签到管理/签到计划
 *  @更新时间 2026-04-08 08:36:51
 */
export type CheckInPlanPageRequest = {
  /* 单页大小，最大500，默认15 */
  pageSize?: number | null

  /* 当前页码（从1开始） */
  pageIndex?: number | null

  /* 排序字段，json格式 */
  orderBy?: string | null

  /* 签到计划编码。 */
  planCode?: string

  /* 签到计划名称。 */
  planName?: string

  /* 签到计划状态（0=草稿，仅后台编辑；1=已发布，满足时间窗口时可对用户生效；2=已下线，不再对外开放；3=已停用，表示人工禁用）。 */
  status?: number

  /** 任意合法数值 */
  [property: string]: any
}

export type CheckInPlanPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: CheckInPlanPageItemDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [CheckInPlanDetailRequest]
 *  @来源 签到管理/签到计划
 *  @更新时间 2026-04-08 08:36:51
 */
export type CheckInPlanDetailRequest = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

export type CheckInPlanDetailResponse = CheckInPlanDetailResponseDto

/**
 *  类型定义 [CheckInPlanCreateRequest]
 *  @来源 签到管理/签到计划
 *  @更新时间 2026-04-08 08:36:51
 */
export type CheckInPlanCreateRequest = CreateCheckInPlanDto

export type CheckInPlanCreateResponse = boolean

/**
 *  类型定义 [CheckInPlanUpdateRequest]
 *  @来源 签到管理/签到计划
 *  @更新时间 2026-04-08 08:36:51
 */
export type CheckInPlanUpdateRequest = UpdateCheckInPlanDto

export type CheckInPlanUpdateResponse = boolean

/**
 *  类型定义 [CheckInPlanUpdateStatusRequest]
 *  @来源 签到管理/签到计划
 *  @更新时间 2026-04-08 08:36:51
 */
export type CheckInPlanUpdateStatusRequest = UpdateCheckInPlanStatusDto

export type CheckInPlanUpdateStatusResponse = boolean

/**
 *  类型定义 [CheckInReconciliationPageRequest]
 *  @来源 签到管理/签到计划
 *  @更新时间 2026-04-08 08:36:51
 */
export type CheckInReconciliationPageRequest = {
  /* 单页大小，最大500，默认15 */
  pageSize?: number | null

  /* 当前页码（从1开始） */
  pageIndex?: number | null

  /* 排序字段，json格式 */
  orderBy?: string | null

  /* 用户 ID。 */
  userId?: number

  /* 签到计划 ID。 */
  planId?: number

  /* 周期实例 ID。 */
  cycleId?: number

  /* 基础奖励状态（0=待处理，表示已创建事实但尚未结算；1=已成功；2=已失败）。 */
  rewardStatus?: number | null

  /* 连续奖励发放状态（0=待处理，表示发放事实已创建但尚未结算；1=已成功；2=已失败）。 */
  grantStatus?: number

  /* 签到记录 ID。 */
  recordId?: number

  /* 连续奖励发放事实 ID。 */
  grantId?: number

  /** 任意合法数值 */
  [property: string]: any
}

export type CheckInReconciliationPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: CheckInReconciliationItemDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [CheckInReconciliationRepairRequest]
 *  @来源 签到管理/签到计划
 *  @更新时间 2026-04-08 08:36:51
 */
export type CheckInReconciliationRepairRequest = RepairCheckInRewardDto

export type CheckInReconciliationRepairResponse = RepairCheckInRewardResponseDto

/**
 *  类型定义 [CheckInPlanPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type CheckInPlanPageItemDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 签到计划编码。 */
  planCode: string
  /* 签到计划名称。 */
  planName: string
  /* 签到计划状态（0=草稿，仅后台编辑；1=已发布，满足时间窗口时可对用户生效；2=已下线，不再对外开放；3=已停用，表示人工禁用）。 */
  status: 0 | 1 | 2 | 3
  /* 周期类型（weekly=按周切分签到周期；monthly=按月切分签到周期）。 */
  cycleType: 'weekly' | 'monthly'
  /* 计划开始日期（date 语义，同时作为周期切片起点）。 */
  startDate: string
  /* 每周期允许补签次数。 */
  allowMakeupCountPerCycle: number
  /* 基础签到奖励配置；为空表示该计划没有基础奖励。 */
  baseRewardConfig?: CheckInRewardConfigDto
  /* 计划版本号；影响周期快照冻结与规则版本切换。 */
  version: number
  /* 计划结束日期（date 语义）；为空表示长期有效。 */
  endDate?: string | null
  /* 当前版本连续奖励规则数量。 */
  ruleCount: number
  /* 当前活跃周期实例数量。 */
  activeCycleCount: number
  /* 待补偿奖励数量。 */
  pendingRewardCount: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [CheckInRewardConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type CheckInRewardConfigDto = {
  /* 奖励积分；配置后表示本次签到或连续奖励会发放对应积分。 */
  points?: number | null
  /* 奖励经验值；配置后表示本次签到或连续奖励会发放对应经验。 */
  experience?: number | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [CheckInPlanDetailResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type CheckInPlanDetailResponseDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 签到计划编码。 */
  planCode: string
  /* 签到计划名称。 */
  planName: string
  /* 签到计划状态（0=草稿，仅后台编辑；1=已发布，满足时间窗口时可对用户生效；2=已下线，不再对外开放；3=已停用，表示人工禁用）。 */
  status: 0 | 1 | 2 | 3
  /* 周期类型（weekly=按周切分签到周期；monthly=按月切分签到周期）。 */
  cycleType: 'weekly' | 'monthly'
  /* 计划开始日期（date 语义，同时作为周期切片起点）。 */
  startDate: string
  /* 每周期允许补签次数。 */
  allowMakeupCountPerCycle: number
  /* 基础签到奖励配置；为空表示该计划没有基础奖励。 */
  baseRewardConfig?: CheckInRewardConfigDto
  /* 计划版本号；影响周期快照冻结与规则版本切换。 */
  version: number
  /* 计划结束日期（date 语义）；为空表示长期有效。 */
  endDate?: string | null
  /* 当前版本连续奖励规则数量。 */
  ruleCount: number
  /* 当前活跃周期实例数量。 */
  activeCycleCount: number
  /* 待补偿奖励数量。 */
  pendingRewardCount: number
  /* 当前版本连续奖励规则列表。 */
  streakRewardRules: CheckInStreakRewardRuleItemDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [CheckInStreakRewardRuleItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type CheckInStreakRewardRuleItemDto = {
  /* 主键id */
  id: number
  /* 规则编码。 */
  ruleCode: string
  /* 连续签到阈值天数。 */
  streakDays: number
  /* 连续奖励配置。 */
  rewardConfig: CheckInRewardConfigDto
  /* 是否允许重复领取；false=同周期同规则最多发放一次；true=命中阈值时可重复发放。 */
  repeatable: boolean
  /* 规则状态（0=已停用；1=已启用）。 */
  status: 0 | 1

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [CreateCheckInPlanDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type CreateCheckInPlanDto = {
  /* 签到计划编码。 */
  planCode: string
  /* 签到计划名称。 */
  planName: string
  /* 签到计划状态（0=草稿，仅后台编辑；1=已发布，满足时间窗口时可对用户生效；2=已下线，不再对外开放；3=已停用，表示人工禁用）。 */
  status: 0 | 1 | 2 | 3
  /* 周期类型（weekly=按周切分签到周期；monthly=按月切分签到周期）。 */
  cycleType: 'weekly' | 'monthly'
  /* 计划开始日期（date 语义，同时作为周期切片起点）。 */
  startDate: string
  /* 每周期允许补签次数。 */
  allowMakeupCountPerCycle: number
  /* 基础签到奖励配置；为空表示该计划没有基础奖励。 */
  baseRewardConfig?: CheckInRewardConfigDto
  /* 计划结束日期（date 语义）；为空表示长期有效。 */
  endDate?: string | null
  /* 连续签到奖励规则列表。 */
  streakRewardRules?: any[] | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateCheckInPlanDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type UpdateCheckInPlanDto = {
  /* 签到计划编码。 */
  planCode?: string
  /* 签到计划名称。 */
  planName?: string
  /* 签到计划状态（0=草稿，仅后台编辑；1=已发布，满足时间窗口时可对用户生效；2=已下线，不再对外开放；3=已停用，表示人工禁用）。 */
  status?: 0 | 1 | 2 | 3
  /* 周期类型（weekly=按周切分签到周期；monthly=按月切分签到周期）。 */
  cycleType?: 'weekly' | 'monthly'
  /* 计划开始日期（date 语义，同时作为周期切片起点）。 */
  startDate?: string
  /* 每周期允许补签次数。 */
  allowMakeupCountPerCycle?: number
  /* 基础签到奖励配置；为空表示该计划没有基础奖励。 */
  baseRewardConfig?: CheckInRewardConfigDto
  /* 计划结束日期（date 语义）；为空表示长期有效。 */
  endDate?: string | null
  /* 连续签到奖励规则列表。 */
  streakRewardRules?: any[] | null
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateCheckInPlanStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type UpdateCheckInPlanStatusDto = {
  /* 主键id */
  id: number
  /* 签到计划状态（0=草稿，仅后台编辑；1=已发布，满足时间窗口时可对用户生效；2=已下线，不再对外开放；3=已停用，表示人工禁用）。 */
  status?: 0 | 1 | 2 | 3

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [CheckInReconciliationItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type CheckInReconciliationItemDto = {
  /* 创建时间 */
  createdAt: string
  /* 用户 ID。 */
  userId: number
  /* 签到计划 ID。 */
  planId: number
  /* 周期实例 ID。 */
  cycleId: number
  /* 签到日期（date 语义）。 */
  signDate: string
  /* 签到类型（1=正常签到；2=补签）。 */
  recordType: 1 | 2
  /* 基础奖励状态（0=待处理，表示已创建事实但尚未结算；1=已成功；2=已失败）。 */
  rewardStatus?: number | null
  /* 基础奖励结果类型（1=本次真实落账；2=命中幂等未重复落账；3=本次处理失败）。 */
  rewardResultType?: number | null
  /* 基础奖励账本记录 ID 列表。 */
  baseRewardLedgerIds: number[]
  /* 最近一次基础奖励失败原因。 */
  lastRewardError?: string | null
  /* 签到记录 ID。 */
  recordId: number
  /* 关联的连续奖励发放列表。 */
  grants: CheckInGrantItemDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [CheckInGrantItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type CheckInGrantItemDto = {
  /* 主键id */
  id: number
  /* 连续奖励规则 ID。 */
  ruleId: number
  /* 触发连续奖励的签到日期（date 语义）。 */
  triggerSignDate: string
  /* 连续奖励发放状态（0=待处理，表示发放事实已创建但尚未结算；1=已成功；2=已失败）。 */
  grantStatus: 0 | 1 | 2
  /* 连续奖励发放结果类型（1=本次真实落账；2=命中幂等未重复落账；3=本次处理失败）。 */
  grantResultType?: number | null
  /* 连续奖励账本记录 ID 列表。 */
  ledgerIds: number[]
  /* 最近一次连续奖励失败原因。 */
  lastGrantError?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [RepairCheckInRewardDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type RepairCheckInRewardDto = {
  /* 补偿目标类型（1=基础签到奖励；2=连续签到奖励）。 */
  targetType: 1 | 2
  /* 签到记录 ID。 */
  recordId?: number
  /* 连续奖励发放事实 ID。 */
  grantId?: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [RepairCheckInRewardResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type RepairCheckInRewardResponseDto = {
  /* 补偿目标类型（1=基础签到奖励；2=连续签到奖励）。 */
  targetType: 1 | 2
  /* 签到记录 ID。 */
  recordId?: number
  /* 连续奖励发放事实 ID。 */
  grantId?: number
  /* 是否补偿成功。 */
  success: boolean

  /** 任意合法数值 */
  [property: string]: any
}