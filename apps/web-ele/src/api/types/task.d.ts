/**
 *  类型定义 [TaskCreateRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-03-25 23:30:38
 */
export type TaskCreateRequest = CreateTaskDto

export type TaskCreateResponse = boolean

/**
 *  类型定义 [TaskUpdateRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-03-25 23:30:38
 */
export type TaskUpdateRequest = UpdateTaskDto

export type TaskUpdateResponse = boolean

/**
 *  类型定义 [TaskUpdateStatusRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-03-25 23:30:38
 */
export type TaskUpdateStatusRequest = UpdateTaskStatusDto

export type TaskUpdateStatusResponse = boolean

/**
 *  类型定义 [TaskDeleteRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-03-25 23:30:38
 */
export type TaskDeleteRequest = IdDto

export type TaskDeleteResponse = boolean

/**
 *  类型定义 [TaskPageRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-03-25 23:30:38
 */
export type TaskPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 启用状态 */
  isEnabled?: boolean

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从0开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 任务状态（0=DRAFT，1=PUBLISHED，2=OFFLINE） */
  status?: number

  /* 任务标题 */
  title?: string

  /* 任务类型（1=NEWBIE，2=DAILY，3=REPEAT，4=ACTIVITY，5=OPERATION） */
  type?: number
}

export type TaskPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseTaskDto[]

  /* 当前页码（从0开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [TaskDetailRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-03-25 23:30:38
 */
export type TaskDetailRequest = {
  
  /** 任意合法数值 */
  [property: string]: any

  id: number
}

export type TaskDetailResponse = BaseTaskDto

/**
 *  类型定义 [TaskAssignmentPageRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-03-25 23:30:38
 */
export type TaskAssignmentPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从0开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 任务状态（0=PENDING，1=IN_PROGRESS，2=COMPLETED，3=EXPIRED） */
  status?: number

  /* 任务ID */
  taskId?: number

  /* 用户ID */
  userId?: number
}

export type TaskAssignmentPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseTaskAssignmentDto[]

  /* 当前页码（从0开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [CreateTaskDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-25 23:30:38
 */
export type CreateTaskDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 领取模式（1=AUTO，2=MANUAL） */
  claimMode: 1 | 2
  /* 任务编码 */
  code: string
  /* 完成模式（1=AUTO，2=MANUAL） */
  completeMode: 1 | 2
  /* 封面图 */
  cover?: null | string
  /* 任务说明 */
  description?: null | string
  /* 启用状态 */
  isEnabled: boolean
  /* 优先级 */
  priority: number
  /* 发布结束时间 */
  publishEndAt?: null | string
  /* 发布开始时间 */
  publishStartAt?: null | string
  /* 周期规则 */
  repeatRule?: null | string
  /* 奖励配置 */
  rewardConfig?: null | string
  /* 任务状态（0=DRAFT，1=PUBLISHED，2=OFFLINE） */
  status: 0 | 1 | 2
  /* 完成目标次数 */
  targetCount: number
  /* 任务标题 */
  title: string

  /* 任务类型（1=NEWBIE，2=DAILY，3=REPEAT，4=ACTIVITY，5=OPERATION） */
  type: 1 | 2 | 3 | 4 | 5
}

/**
 *  类型定义 [UpdateTaskDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-25 23:30:38
 */
export type UpdateTaskDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 领取模式（1=AUTO，2=MANUAL） */
  claimMode?: 1 | 2
  /* 任务编码 */
  code?: string
  /* 完成模式（1=AUTO，2=MANUAL） */
  completeMode?: 1 | 2
  /* 封面图 */
  cover?: null | string
  /* 任务说明 */
  description?: null | string
  /* 主键id */
  id: number
  /* 启用状态 */
  isEnabled?: boolean
  /* 优先级 */
  priority?: number
  /* 发布结束时间 */
  publishEndAt?: null | string
  /* 发布开始时间 */
  publishStartAt?: null | string
  /* 周期规则 */
  repeatRule?: null | string
  /* 奖励配置 */
  rewardConfig?: null | string
  /* 任务状态（0=DRAFT，1=PUBLISHED，2=OFFLINE） */
  status?: 0 | 1 | 2
  /* 完成目标次数 */
  targetCount?: number
  /* 任务标题 */
  title?: string

  /* 任务类型（1=NEWBIE，2=DAILY，3=REPEAT，4=ACTIVITY，5=OPERATION） */
  type?: 1 | 2 | 3 | 4 | 5
}

/**
 *  类型定义 [UpdateTaskStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-25 23:30:38
 */
export type UpdateTaskStatusDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number
  /* 启用状态 */
  isEnabled?: boolean

  /* 任务状态（0=DRAFT，1=PUBLISHED，2=OFFLINE） */
  status?: 0 | 1 | 2
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-25 23:30:38
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

/**
 *  类型定义 [BaseTaskDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-25 23:30:38
 */
export type BaseTaskDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 领取模式（1=AUTO，2=MANUAL） */
  claimMode: 1 | 2
  /* 任务编码 */
  code: string
  /* 完成模式（1=AUTO，2=MANUAL） */
  completeMode: 1 | 2
  /* 封面图 */
  cover?: null | string
  /* 创建时间 */
  createdAt: string
  /* 创建人ID */
  createdById?: null | number
  /* 删除时间 */
  deletedAt?: null | string
  /* 任务说明 */
  description?: null | string
  /* 主键id */
  id: number
  /* 启用状态 */
  isEnabled: boolean
  /* 优先级 */
  priority: number
  /* 发布结束时间 */
  publishEndAt?: null | string
  /* 发布开始时间 */
  publishStartAt?: null | string
  /* 周期规则 */
  repeatRule?: null | string
  /* 奖励配置 */
  rewardConfig?: null | string
  /* 任务状态（0=DRAFT，1=PUBLISHED，2=OFFLINE） */
  status: 0 | 1 | 2
  /* 完成目标次数 */
  targetCount: number
  /* 任务标题 */
  title: string
  /* 任务类型（1=NEWBIE，2=DAILY，3=REPEAT，4=ACTIVITY，5=OPERATION） */
  type: 1 | 2 | 3 | 4 | 5
  /* 更新时间 */
  updatedAt: string

  /* 更新人ID */
  updatedById?: null | number
}

/**
 *  类型定义 [BaseTaskAssignmentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-25 23:30:38
 */
export type BaseTaskAssignmentDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 领取时间 */
  claimedAt?: null | string
  /* 完成时间 */
  completedAt?: null | string
  /* 上下文 */
  context?: null | string
  /* 创建时间 */
  createdAt: string
  /* 周期实例键 */
  cycleKey: string
  /* 删除时间 */
  deletedAt?: null | string
  /* 过期时间 */
  expiredAt?: null | string
  /* 主键id */
  id: number
  /* 当前进度 */
  progress: number
  /* 任务状态（0=PENDING，1=IN_PROGRESS，2=COMPLETED，3=EXPIRED） */
  status: 0 | 1 | 2 | 3
  /* 目标进度 */
  target: number
  /* 任务ID */
  taskId: number
  /* 任务快照 */
  taskSnapshot?: null | string
  /* 更新时间 */
  updatedAt: string
  /* 用户ID */
  userId: number

  /* 乐观锁版本号 */
  version: number
}