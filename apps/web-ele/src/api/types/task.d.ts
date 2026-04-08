/**
 *  类型定义 [TaskCreateRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-08 08:36:51
 */
export type TaskCreateRequest = CreateTaskDto

export type TaskCreateResponse = boolean

/**
 *  类型定义 [TaskUpdateRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-08 08:36:51
 */
export type TaskUpdateRequest = UpdateTaskDto

export type TaskUpdateResponse = boolean

/**
 *  类型定义 [TaskUpdateStatusRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-08 08:36:51
 */
export type TaskUpdateStatusRequest = UpdateTaskStatusDto

export type TaskUpdateStatusResponse = boolean

/**
 *  类型定义 [TaskDeleteRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-08 08:36:51
 */
export type TaskDeleteRequest = IdDto

export type TaskDeleteResponse = boolean

/**
 *  类型定义 [TaskPageRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-08 08:36:51
 */
export type TaskPageRequest = {
  /* 开始时间 */
  startDate?: string | null

  /* 结束时间 */
  endDate?: string | null

  /* 单页大小，最大500，默认15 */
  pageSize?: number | null

  /* 当前页码（从1开始） */
  pageIndex?: number | null

  /* 排序字段，json格式 */
  orderBy?: string | null

  /* 任务标题 */
  title?: string

  /* 任务场景类型 */
  type?: number

  /* 任务状态 */
  status?: number

  /* 启用状态 */
  isEnabled?: boolean

  /** 任意合法数值 */
  [property: string]: any
}

export type TaskPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: AdminTaskPageResponseDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [TaskDetailRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-08 08:36:51
 */
export type TaskDetailRequest = {
  
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

export type TaskDetailResponse = AdminTaskPageResponseDto

/**
 *  类型定义 [TaskAssignmentPageRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-08 08:36:51
 */
export type TaskAssignmentPageRequest = {
  /* 开始时间 */
  startDate?: string | null

  /* 结束时间 */
  endDate?: string | null

  /* 单页大小，最大500，默认15 */
  pageSize?: number | null

  /* 当前页码（从1开始） */
  pageIndex?: number | null

  /* 排序字段，json格式 */
  orderBy?: string | null

  /* 任务ID */
  taskId?: number

  /* 用户ID */
  userId?: number

  /* 任务分配状态，PENDING 表示已领取待开始 */
  status?: number

  /** 任意合法数值 */
  [property: string]: any
}

export type TaskAssignmentPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: AdminTaskAssignmentPageResponseDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [TaskAssignmentReconciliationPageRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-08 08:36:51
 */
export type TaskAssignmentReconciliationPageRequest = {
  /* 开始时间 */
  startDate?: string | null

  /* 结束时间 */
  endDate?: string | null

  /* 单页大小，最大500，默认15 */
  pageSize?: number | null

  /* 当前页码（从1开始） */
  pageIndex?: number | null

  /* 排序字段，json格式 */
  orderBy?: string | null

  /* 任务ID */
  taskId?: number

  /* 用户ID */
  userId?: number

  /* 奖励结算状态 */
  rewardStatus?: number

  /* 任务分配 ID */
  assignmentId?: number | null

  /* 事件编码 */
  eventCode?: number | null

  /* 事件推进幂等键 */
  eventBizKey?: string | null

  /* 奖励到账提醒投递状态 */
  notificationStatus?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

export type TaskAssignmentReconciliationPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: AdminTaskAssignmentReconciliationPageResponseDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [TaskAssignmentRetryRewardRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-08 08:36:51
 */
export type TaskAssignmentRetryRewardRequest = IdDto

export type TaskAssignmentRetryRewardResponse = boolean

/**
 *  类型定义 [TaskAssignmentRetryRewardBatchRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-08 08:36:51
 */
export type TaskAssignmentRetryRewardBatchRequest = RetryCompletedTaskRewardsDto

export type TaskAssignmentRetryRewardBatchResponse = RetryCompletedTaskRewardsResponseDto

/**
 *  类型定义 [CreateTaskDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type CreateTaskDto = {
  /* 任务编码 */
  code: string
  /* 任务标题 */
  title: string
  /* 任务说明 */
  description?: string | null
  /* 封面图 */
  cover?: string | null
  /* 任务场景类型 */
  type: 1 | 2 | 4
  /* 任务状态 */
  status: 0 | 1 | 2
  /* 优先级 */
  priority: number
  /* 启用状态 */
  isEnabled: boolean
  /* 领取模式 */
  claimMode: 1 | 2
  /* 完成模式 */
  completeMode: 1 | 2
  /* 任务目标类型 */
  objectiveType: 1 | 2
  /* 目标事件编码，EVENT_COUNT 任务必填 */
  eventCode?: number | null
  /* 完成目标次数，必须为大于 0 的整数 */
  targetCount: number
  /* 奖励配置，当前仅支持 points / experience，且值必须为正整数 */
  rewardConfig?: string | null
  /* 目标附加配置，EVENT_COUNT 任务可用于表达额外过滤条件 */
  objectiveConfig?: string | null
  /* 发布开始时间 */
  publishStartAt?: string | null
  /* 发布结束时间 */
  publishEndAt?: string | null
  /* 周期规则，当前仅识别 type=once/daily/weekly/monthly；timezone 可选，使用 IANA 时区标识 */
  repeatRule?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateTaskDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type UpdateTaskDto = {
  /* 任务编码 */
  code?: string
  /* 任务标题 */
  title?: string
  /* 任务说明 */
  description?: string | null
  /* 封面图 */
  cover?: string | null
  /* 任务场景类型 */
  type?: 1 | 2 | 4
  /* 任务状态 */
  status?: 0 | 1 | 2
  /* 优先级 */
  priority?: number
  /* 启用状态 */
  isEnabled?: boolean
  /* 领取模式 */
  claimMode?: 1 | 2
  /* 完成模式 */
  completeMode?: 1 | 2
  /* 任务目标类型 */
  objectiveType?: 1 | 2
  /* 目标事件编码，EVENT_COUNT 任务必填 */
  eventCode?: number | null
  /* 完成目标次数，必须为大于 0 的整数 */
  targetCount?: number
  /* 奖励配置，当前仅支持 points / experience，且值必须为正整数 */
  rewardConfig?: string | null
  /* 目标附加配置，EVENT_COUNT 任务可用于表达额外过滤条件 */
  objectiveConfig?: string | null
  /* 发布开始时间 */
  publishStartAt?: string | null
  /* 发布结束时间 */
  publishEndAt?: string | null
  /* 周期规则，当前仅识别 type=once/daily/weekly/monthly；timezone 可选，使用 IANA 时区标识 */
  repeatRule?: string | null
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateTaskStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type UpdateTaskStatusDto = {
  /* 主键id */
  id: number
  /* 任务状态 */
  status?: 0 | 1 | 2
  /* 启用状态 */
  isEnabled?: boolean

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type IdDto = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminTaskPageResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type AdminTaskPageResponseDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 任务编码 */
  code: string
  /* 任务标题 */
  title: string
  /* 任务说明 */
  description?: string | null
  /* 封面图 */
  cover?: string | null
  /* 任务场景类型 */
  type: 1 | 2 | 4
  /* 任务状态 */
  status: 0 | 1 | 2
  /* 优先级 */
  priority: number
  /* 启用状态 */
  isEnabled: boolean
  /* 领取模式 */
  claimMode: 1 | 2
  /* 完成模式 */
  completeMode: 1 | 2
  /* 任务目标类型 */
  objectiveType: 1 | 2
  /* 目标事件编码，EVENT_COUNT 任务必填 */
  eventCode?: number | null
  /* 完成目标次数，必须为大于 0 的整数 */
  targetCount: number
  /* 奖励配置，当前仅支持 points / experience，且值必须为正整数 */
  rewardConfig?: string | null
  /* 目标附加配置，EVENT_COUNT 任务可用于表达额外过滤条件 */
  objectiveConfig?: string | null
  /* 发布开始时间 */
  publishStartAt?: string | null
  /* 发布结束时间 */
  publishEndAt?: string | null
  /* 周期规则，当前仅识别 type=once/daily/weekly/monthly；timezone 可选，使用 IANA 时区标识 */
  repeatRule?: string | null
  /* 活跃 assignment 数（PENDING/IN_PROGRESS/COMPLETED） */
  activeAssignmentCount: number
  /* 待补偿奖励数（已完成但奖励未成功） */
  pendingRewardCompensationCount: number
  /* 最近一次任务提醒投递摘要 */
  latestReminder?: AdminTaskReminderSummaryDto

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminTaskReminderSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type AdminTaskReminderSummaryDto = {
  /* 最近一次任务提醒子类型 */
  reminderKind?: string | null
  /* 最近一次提醒投递状态 */
  status?: string | null
  /* 最近一次提醒失败原因 */
  failureReason?: string | null
  /* 最近一次提醒尝试时间 */
  lastAttemptAt?: string | null
  /* 最近一次提醒状态更新时间 */
  updatedAt?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminTaskAssignmentPageResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type AdminTaskAssignmentPageResponseDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 任务ID */
  taskId: number
  /* 用户ID */
  userId: number
  /* 周期实例键 */
  cycleKey: string
  /* 任务分配状态，PENDING 表示已领取待开始 */
  status: 0 | 1 | 2 | 3
  /* 奖励结算状态 */
  rewardStatus: 0 | 1 | 2
  /* 奖励结算结果类型 */
  rewardResultType?: number | null
  /* 当前进度 */
  progress: number
  /* 目标进度 */
  target: number
  /* 领取时间 */
  claimedAt?: string | null
  /* 完成时间 */
  completedAt?: string | null
  /* 过期时间 */
  expiredAt?: string | null
  /* 奖励结算时间 */
  rewardSettledAt?: string | null
  /* 本次奖励关联到账本记录 ID 列表 */
  rewardLedgerIds: number[]
  /* 上次奖励失败原因 */
  lastRewardError?: string | null
  /* 统一后的用户可见状态 */
  visibleStatus: 'claimable' | 'claimed' | 'in_progress' | 'completed' | 'reward_pending' | 'reward_granted' | 'expired' | 'unavailable'
  /* 任务快照摘要 */
  task?: AdminTaskAssignmentRelatedTaskDto

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminTaskAssignmentRelatedTaskDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type AdminTaskAssignmentRelatedTaskDto = {
  /* 主键id */
  id: number
  /* 任务编码 */
  code: string
  /* 任务标题 */
  title: string
  /* 任务说明 */
  description?: string | null
  /* 封面图 */
  cover?: string | null
  /* 任务场景类型 */
  type: 1 | 2 | 4
  /* 领取模式 */
  claimMode: 1 | 2
  /* 完成模式 */
  completeMode: 1 | 2
  /* 任务目标类型 */
  objectiveType: 1 | 2
  /* 目标事件编码，EVENT_COUNT 任务必填 */
  eventCode?: number | null
  /* 完成目标次数，必须为大于 0 的整数 */
  targetCount: number
  /* 奖励配置，当前仅支持 points / experience，且值必须为正整数 */
  rewardConfig?: string | null
  /* 目标附加配置，EVENT_COUNT 任务可用于表达额外过滤条件 */
  objectiveConfig?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminTaskAssignmentReconciliationPageResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type AdminTaskAssignmentReconciliationPageResponseDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 任务ID */
  taskId: number
  /* 用户ID */
  userId: number
  /* 周期实例键 */
  cycleKey: string
  /* 任务分配状态，PENDING 表示已领取待开始 */
  status: 0 | 1 | 2 | 3
  /* 奖励结算状态 */
  rewardStatus: 0 | 1 | 2
  /* 奖励结算结果类型 */
  rewardResultType?: number | null
  /* 当前进度 */
  progress: number
  /* 目标进度 */
  target: number
  /* 领取时间 */
  claimedAt?: string | null
  /* 完成时间 */
  completedAt?: string | null
  /* 过期时间 */
  expiredAt?: string | null
  /* 奖励结算时间 */
  rewardSettledAt?: string | null
  /* 本次奖励关联到账本记录 ID 列表 */
  rewardLedgerIds: number[]
  /* 上次奖励失败原因 */
  lastRewardError?: string | null
  /* 统一后的用户可见状态 */
  visibleStatus: 'claimable' | 'claimed' | 'in_progress' | 'completed' | 'reward_pending' | 'reward_granted' | 'expired' | 'unavailable'
  /* 最近一次命中 assignment 的事件编码 */
  latestEventCode?: number | null
  /* 最近一次命中 assignment 的事件 bizKey */
  latestEventBizKey?: string | null
  /* 最近一次命中 assignment 的事件发生时间 */
  latestEventOccurredAt?: string | null
  /* 奖励到账提醒摘要 */
  rewardReminder?: AdminTaskRewardReminderDto
  /* 任务快照摘要 */
  task?: AdminTaskAssignmentRelatedTaskDto

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminTaskRewardReminderDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type AdminTaskRewardReminderDto = {
  /* 奖励到账提醒 outbox bizKey */
  bizKey?: string | null
  /* 奖励到账提醒投递状态 */
  status?: string | null
  /* 最近一次提醒失败原因 */
  failureReason?: string | null
  /* 最近一次提醒尝试时间 */
  lastAttemptAt?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [RetryCompletedTaskRewardsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type RetryCompletedTaskRewardsDto = {
  /* 本次最多扫描的 assignment 数量 */
  limit?: number | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [RetryCompletedTaskRewardsResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type RetryCompletedTaskRewardsResponseDto = {
  /* 本次扫描到的待补偿 assignment 数 */
  scannedCount: number
  /* 本次实际触发补偿结算的 assignment 数 */
  triggeredCount: number

  /** 任意合法数值 */
  [property: string]: any
}