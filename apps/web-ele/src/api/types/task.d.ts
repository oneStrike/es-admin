/**
 *  类型定义 [TaskCreateRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-03-26 22:03:53
 */
export type TaskCreateRequest = CreateTaskDto

export type TaskCreateResponse = boolean

/**
 *  类型定义 [TaskUpdateRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-03-26 22:03:53
 */
export type TaskUpdateRequest = UpdateTaskDto

export type TaskUpdateResponse = boolean

/**
 *  类型定义 [TaskUpdateStatusRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-03-26 22:03:53
 */
export type TaskUpdateStatusRequest = UpdateTaskStatusDto

export type TaskUpdateStatusResponse = boolean

/**
 *  类型定义 [TaskDeleteRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-03-26 22:03:53
 */
export type TaskDeleteRequest = IdDto

export type TaskDeleteResponse = boolean

/**
 *  类型定义 [TaskPageRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-03-26 22:03:53
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

  /* 任务类型（1=NEWBIE，2=DAILY，3=REPEAT，4=ACTIVITY，5=OPERATION） */
  type?: number

  /* 任务状态（0=DRAFT，1=PUBLISHED，2=OFFLINE） */
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
  list?: BaseTaskDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [TaskDetailRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-03-26 22:03:53
 */
export type TaskDetailRequest = {
  
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

export type TaskDetailResponse = BaseTaskDto

/**
 *  类型定义 [TaskAssignmentPageRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-03-26 22:03:53
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

  /* 任务状态（0=PENDING，1=IN_PROGRESS，2=COMPLETED，3=EXPIRED） */
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
  list?: BaseTaskAssignmentDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [CreateTaskDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
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
  /* 任务类型（1=NEWBIE，2=DAILY，3=REPEAT，4=ACTIVITY，5=OPERATION） */
  type: 1 | 2 | 3 | 4 | 5
  /* 任务状态（0=DRAFT，1=PUBLISHED，2=OFFLINE） */
  status: 0 | 1 | 2
  /* 优先级 */
  priority: number
  /* 启用状态 */
  isEnabled: boolean
  /* 领取模式（1=AUTO，2=MANUAL） */
  claimMode: 1 | 2
  /* 完成模式（1=AUTO，2=MANUAL） */
  completeMode: 1 | 2
  /* 完成目标次数 */
  targetCount: number
  /* 奖励配置 */
  rewardConfig?: string | null
  /* 发布开始时间 */
  publishStartAt?: string | null
  /* 发布结束时间 */
  publishEndAt?: string | null
  /* 周期规则 */
  repeatRule?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateTaskDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
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
  /* 任务类型（1=NEWBIE，2=DAILY，3=REPEAT，4=ACTIVITY，5=OPERATION） */
  type?: 1 | 2 | 3 | 4 | 5
  /* 任务状态（0=DRAFT，1=PUBLISHED，2=OFFLINE） */
  status?: 0 | 1 | 2
  /* 优先级 */
  priority?: number
  /* 启用状态 */
  isEnabled?: boolean
  /* 领取模式（1=AUTO，2=MANUAL） */
  claimMode?: 1 | 2
  /* 完成模式（1=AUTO，2=MANUAL） */
  completeMode?: 1 | 2
  /* 完成目标次数 */
  targetCount?: number
  /* 奖励配置 */
  rewardConfig?: string | null
  /* 发布开始时间 */
  publishStartAt?: string | null
  /* 发布结束时间 */
  publishEndAt?: string | null
  /* 周期规则 */
  repeatRule?: string | null
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateTaskStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type UpdateTaskStatusDto = {
  /* 主键id */
  id: number
  /* 任务状态（0=DRAFT，1=PUBLISHED，2=OFFLINE） */
  status?: 0 | 1 | 2
  /* 启用状态 */
  isEnabled?: boolean

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type IdDto = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [BaseTaskDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type BaseTaskDto = {
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
  /* 任务类型（1=NEWBIE，2=DAILY，3=REPEAT，4=ACTIVITY，5=OPERATION） */
  type: 1 | 2 | 3 | 4 | 5
  /* 任务状态（0=DRAFT，1=PUBLISHED，2=OFFLINE） */
  status: 0 | 1 | 2
  /* 优先级 */
  priority: number
  /* 启用状态 */
  isEnabled: boolean
  /* 领取模式（1=AUTO，2=MANUAL） */
  claimMode: 1 | 2
  /* 完成模式（1=AUTO，2=MANUAL） */
  completeMode: 1 | 2
  /* 完成目标次数 */
  targetCount: number
  /* 奖励配置 */
  rewardConfig?: string | null
  /* 发布开始时间 */
  publishStartAt?: string | null
  /* 发布结束时间 */
  publishEndAt?: string | null
  /* 周期规则 */
  repeatRule?: string | null
  /* 创建人ID */
  createdById?: number | null
  /* 更新人ID */
  updatedById?: number | null
  /* 删除时间 */
  deletedAt?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [BaseTaskAssignmentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type BaseTaskAssignmentDto = {
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
  /* 任务状态（0=PENDING，1=IN_PROGRESS，2=COMPLETED，3=EXPIRED） */
  status: 0 | 1 | 2 | 3
  /* 当前进度 */
  progress: number
  /* 目标进度 */
  target: number
  /* 乐观锁版本号 */
  version: number
  /* 领取时间 */
  claimedAt?: string | null
  /* 完成时间 */
  completedAt?: string | null
  /* 过期时间 */
  expiredAt?: string | null
  /* 任务快照 */
  taskSnapshot?: string | null
  /* 上下文 */
  context?: string | null
  /* 删除时间 */
  deletedAt?: string | null

  /** 任意合法数值 */
  [property: string]: any
}