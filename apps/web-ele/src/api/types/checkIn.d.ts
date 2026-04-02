/**
 *  类型定义 [CheckInPlanPageRequest]
 *  @来源 签到管理/签到计划
 *  @更新时间 2026-04-02 21:41:27
 */
export type CheckInPlanPageRequest = {
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

  /* 签到计划编码 */
  planCode?: string

  /* 签到计划名称 */
  planName?: string

  /* 开始时间 */
  startDate?: null | string

  /* 签到计划状态（草稿、发布、停用、下线）（0=DRAFT，1=PUBLISHED，2=OFFLINE，3=DISABLED） */
  status?: number
}

export type CheckInPlanPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: AdminCheckInPlanPageResponseDto[]

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
 *  @更新时间 2026-04-02 21:41:27
 */
export type CheckInPlanDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type CheckInPlanDetailResponse = AdminCheckInPlanDetailResponseDto

/**
 *  类型定义 [CheckInPlanCreateRequest]
 *  @来源 签到管理/签到计划
 *  @更新时间 2026-04-02 21:41:27
 */
export type CheckInPlanCreateRequest = CreateCheckInPlanDto

export type CheckInPlanCreateResponse = boolean

/**
 *  类型定义 [CheckInPlanUpdateRequest]
 *  @来源 签到管理/签到计划
 *  @更新时间 2026-04-02 21:41:27
 */
export type CheckInPlanUpdateRequest = UpdateCheckInPlanDto

export type CheckInPlanUpdateResponse = boolean

/**
 *  类型定义 [CheckInPlanUpdateStatusRequest]
 *  @来源 签到管理/签到计划
 *  @更新时间 2026-04-02 21:41:27
 */
export type CheckInPlanUpdateStatusRequest = UpdateCheckInPlanStatusDto

export type CheckInPlanUpdateStatusResponse = boolean

/**
 *  类型定义 [CheckInReconciliationPageRequest]
 *  @来源 签到管理/签到计划
 *  @更新时间 2026-04-02 21:41:27
 */
export type CheckInReconciliationPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 周期实例ID */
  cycleId?: number

  /* 结束时间 */
  endDate?: null | string

  /* 连续奖励发放事实ID */
  grantId?: null | number

  /* 连续奖励发放状态（0=PENDING，1=SUCCESS，2=FAILED） */
  grantStatus?: number

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 签到计划ID */
  planId?: number

  /* 签到记录ID */
  recordId?: null | number

  /* 基础奖励状态（0=PENDING，1=SUCCESS，2=FAILED） */
  rewardStatus?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 用户ID */
  userId?: number
}

export type CheckInReconciliationPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: AdminCheckInReconciliationPageResponseDto[]

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
 *  @更新时间 2026-04-02 21:41:27
 */
export type CheckInReconciliationRepairRequest = RepairCheckInRewardDto

export type CheckInReconciliationRepairResponse = RepairCheckInRewardResponseDto

/**
 *  类型定义 [AdminCheckInPlanPageResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 21:41:27
 */
export type AdminCheckInPlanPageResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 当前活跃周期实例数量 */
  activeCycleCount: number
  /* 每周期允许补签次数 */
  allowMakeupCountPerCycle: number
  /* 基础签到奖励配置，未配置时为 null */
  baseRewardConfig?: CheckInRewardConfigDto
  /* 创建时间 */
  createdAt: string
  /* 周期类型（daily=DAILY，weekly=WEEKLY，monthly=MONTHLY） */
  cycleType: 'daily' | 'monthly' | 'weekly'
  /* 计划结束日期（date 语义，未配置时长期有效） */
  endDate?: null | string
  /* 主键id */
  id: number
  /* 待补偿奖励数量 */
  pendingRewardCount: number
  /* 签到计划编码 */
  planCode: string
  /* 签到计划名称 */
  planName: string
  /* 当前版本连续奖励规则数量 */
  ruleCount: number
  /* 计划开始日期（date 语义，同时作为周期切片起点） */
  startDate: string
  /* 签到计划状态（草稿、发布、停用、下线）（0=DRAFT，1=PUBLISHED，2=OFFLINE，3=DISABLED） */
  status: 0 | 1 | 2 | 3
  /* 更新时间 */
  updatedAt: string

  /* 计划版本号 */
  version: number
}

/**
 *  类型定义 [CheckInRewardConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 21:41:27
 */
export type CheckInRewardConfigDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 奖励经验值 */
  experience?: null | number

  /* 奖励积分 */
  points?: null | number
}

/**
 *  类型定义 [AdminCheckInPlanDetailResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 21:41:27
 */
export type AdminCheckInPlanDetailResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 当前活跃周期实例数量 */
  activeCycleCount: number
  /* 每周期允许补签次数 */
  allowMakeupCountPerCycle: number
  /* 基础签到奖励配置，未配置时为 null */
  baseRewardConfig?: CheckInRewardConfigDto
  /* 创建时间 */
  createdAt: string
  /* 周期类型（daily=DAILY，weekly=WEEKLY，monthly=MONTHLY） */
  cycleType: 'daily' | 'monthly' | 'weekly'
  /* 计划结束日期（date 语义，未配置时长期有效） */
  endDate?: null | string
  /* 主键id */
  id: number
  /* 待补偿奖励数量 */
  pendingRewardCount: number
  /* 签到计划编码 */
  planCode: string
  /* 签到计划名称 */
  planName: string
  /* 当前版本连续奖励规则数量 */
  ruleCount: number
  /* 计划开始日期（date 语义，同时作为周期切片起点） */
  startDate: string
  /* 签到计划状态（草稿、发布、停用、下线）（0=DRAFT，1=PUBLISHED，2=OFFLINE，3=DISABLED） */
  status: 0 | 1 | 2 | 3
  /* 当前版本连续奖励规则列表 */
  streakRewardRules: AdminCheckInStreakRewardRuleItemDto[]
  /* 更新时间 */
  updatedAt: string

  /* 计划版本号 */
  version: number
}

/**
 *  类型定义 [AdminCheckInStreakRewardRuleItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 21:41:27
 */
export type AdminCheckInStreakRewardRuleItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 创建时间 */
  createdAt: string
  /* 主键id */
  id: number
  /* 签到计划ID */
  planId: number
  /* 归属计划版本号 */
  planVersion: number
  /* 是否允许重复领取 */
  repeatable: boolean
  /* 连续奖励配置 */
  rewardConfig: CheckInRewardConfigDto
  /* 规则编码 */
  ruleCode: string
  /* 规则状态（0=DISABLED，1=ENABLED） */
  status: 0 | 1
  /* 连续签到阈值天数 */
  streakDays: number

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [CreateCheckInPlanDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 21:41:27
 */
export type CreateCheckInPlanDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 每周期允许补签次数 */
  allowMakeupCountPerCycle: number
  /* 基础签到奖励配置，未配置时为 null */
  baseRewardConfig?: CheckInRewardConfigDto
  /* 周期类型（daily=DAILY，weekly=WEEKLY，monthly=MONTHLY） */
  cycleType: 'daily' | 'monthly' | 'weekly'
  /* 计划结束日期（date 语义，未配置时长期有效） */
  endDate?: null | string
  /* 签到计划编码 */
  planCode: string
  /* 签到计划名称 */
  planName: string
  /* 计划开始日期（date 语义，同时作为周期切片起点） */
  startDate: string
  /* 签到计划状态（草稿、发布、停用、下线）（0=DRAFT，1=PUBLISHED，2=OFFLINE，3=DISABLED） */
  status: 0 | 1 | 2 | 3

  /* 连续签到奖励规则列表 */
  streakRewardRules?: any[] | null
}

/**
 *  类型定义 [UpdateCheckInPlanDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 21:41:27
 */
export type UpdateCheckInPlanDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 每周期允许补签次数 */
  allowMakeupCountPerCycle?: number
  /* 基础签到奖励配置，未配置时为 null */
  baseRewardConfig?: CheckInRewardConfigDto
  /* 周期类型（daily=DAILY，weekly=WEEKLY，monthly=MONTHLY） */
  cycleType?: 'daily' | 'monthly' | 'weekly'
  /* 计划结束日期（date 语义，未配置时长期有效） */
  endDate?: null | string
  /* 主键id */
  id: number
  /* 签到计划编码 */
  planCode?: string
  /* 签到计划名称 */
  planName?: string
  /* 计划开始日期（date 语义，同时作为周期切片起点） */
  startDate?: string
  /* 签到计划状态（草稿、发布、停用、下线）（0=DRAFT，1=PUBLISHED，2=OFFLINE，3=DISABLED） */
  status?: 0 | 1 | 2 | 3

  /* 连续签到奖励规则列表 */
  streakRewardRules?: any[] | null
}

/**
 *  类型定义 [UpdateCheckInPlanStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 21:41:27
 */
export type UpdateCheckInPlanStatusDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 签到计划状态（草稿、发布、停用、下线）（0=DRAFT，1=PUBLISHED，2=OFFLINE，3=DISABLED） */
  status?: 0 | 1 | 2 | 3
}

/**
 *  类型定义 [AdminCheckInReconciliationPageResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 21:41:27
 */
export type AdminCheckInReconciliationPageResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 基础奖励账本记录 ID 列表 */
  baseRewardLedgerIds: number[]
  /* 创建时间 */
  createdAt: string
  /* 周期实例ID */
  cycleId: number
  /* 关联的连续奖励发放列表 */
  grants: AdminCheckInGrantItemDto[]
  /* 最近一次基础奖励失败原因 */
  lastRewardError?: null | string
  /* 签到计划ID */
  planId: number
  /* 签到记录ID */
  recordId: number
  /* 签到类型（1=NORMAL，2=MAKEUP） */
  recordType: 1 | 2
  /* 基础奖励结果类型（1=APPLIED，2=IDEMPOTENT，3=FAILED） */
  rewardResultType?: null | number
  /* 基础奖励状态（0=PENDING，1=SUCCESS，2=FAILED） */
  rewardStatus?: null | number
  /* 签到日期（date 语义） */
  signDate: string

  /* 用户ID */
  userId: number
}

/**
 *  类型定义 [AdminCheckInGrantItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 21:41:27
 */
export type AdminCheckInGrantItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 连续奖励发放结果类型（1=APPLIED，2=IDEMPOTENT，3=FAILED） */
  grantResultType?: null | number
  /* 连续奖励发放状态（0=PENDING，1=SUCCESS，2=FAILED） */
  grantStatus: 0 | 1 | 2
  /* 主键id */
  id: number
  /* 最近一次连续奖励失败原因 */
  lastGrantError?: null | string
  /* 连续奖励账本记录 ID 列表 */
  ledgerIds: number[]
  /* 连续奖励规则ID */
  ruleId: number

  /* 触发连续奖励的签到日期（date 语义） */
  triggerSignDate: string
}

/**
 *  类型定义 [RepairCheckInRewardDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 21:41:27
 */
export type RepairCheckInRewardDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 连续奖励发放事实ID */
  grantId?: null | number
  /* 签到记录ID */
  recordId?: null | number

  /* 补偿目标类型（1=RECORD_REWARD，2=STREAK_GRANT） */
  targetType: 1 | 2
}

/**
 *  类型定义 [RepairCheckInRewardResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 21:41:27
 */
export type RepairCheckInRewardResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 连续奖励发放事实ID */
  grantId?: null | number
  /* 签到记录ID */
  recordId?: null | number
  /* 是否补偿成功 */
  success: boolean

  /* 补偿目标类型（1=RECORD_REWARD，2=STREAK_GRANT） */
  targetType: 1 | 2
}