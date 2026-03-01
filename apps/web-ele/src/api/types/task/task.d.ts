/**
 *  类型定义 [TaskCreateRequest]
 *  @来源 任务管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type TaskCreateRequest = CreateTaskDto;

export type TaskCreateResponse = IdDto;

/**
 *  类型定义 [TaskUpdateRequest]
 *  @来源 任务管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type TaskUpdateRequest = UpdateTaskDto;

export type TaskUpdateResponse = IdDto;

/**
 *  类型定义 [TaskUpdateStatusRequest]
 *  @来源 任务管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type TaskUpdateStatusRequest = UpdateTaskStatusDto;

export type TaskUpdateStatusResponse = IdDto;

/**
 *  类型定义 [TaskDeleteRequest]
 *  @来源 任务管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type TaskDeleteRequest = IdDto;

export type TaskDeleteResponse = IdDto;

/**
 *  类型定义 [TaskPageRequest]
 *  @来源 任务管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type TaskPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 启用状态 */
  isEnabled?: boolean;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码 */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 任务状态 */
  status?: number;

  /* 任务标题 */
  title?: string;

  /* 任务类型 */
  type?: number;
};

export type TaskPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseTaskDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [TaskDetailRequest]
 *  @来源 任务管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type TaskDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  id: number;
};

export type TaskDetailResponse = BaseTaskDto;

/**
 *  类型定义 [CreateTaskDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
 */
export type CreateTaskDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 领取模式 */
  claimMode: 1 | 2;
  /* 任务编码 */
  code: string;
  /* 完成模式 */
  completeMode: 1 | 2;
  /* 封面图 */
  cover?: null | string;
  /* 任务说明 */
  description?: null | string;
  /* 启用状态 */
  isEnabled: boolean;
  /* 优先级 */
  priority: number;
  /* 发布结束时间 */
  publishEndAt?: null | string;
  /* 发布开始时间 */
  publishStartAt?: null | string;
  /* 周期规则 */
  repeatRule?: null | string;
  /* 奖励配置 */
  rewardConfig?: null | string;
  /* 任务状态 */
  status: 0 | 1 | 2;
  /* 完成目标次数 */
  targetCount: number;
  /* 任务标题 */
  title: string;

  /* 任务类型 */
  type: 1 | 2 | 3 | 4 | 5;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [UpdateTaskDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
 */
export type UpdateTaskDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 领取模式 */
  claimMode?: 1 | 2;
  /* 任务编码 */
  code?: string;
  /* 完成模式 */
  completeMode?: 1 | 2;
  /* 封面图 */
  cover?: null | string;
  /* 任务说明 */
  description?: null | string;
  /* 主键id */
  id: number;
  /* 启用状态 */
  isEnabled?: boolean;
  /* 优先级 */
  priority?: number;
  /* 发布结束时间 */
  publishEndAt?: null | string;
  /* 发布开始时间 */
  publishStartAt?: null | string;
  /* 周期规则 */
  repeatRule?: null | string;
  /* 奖励配置 */
  rewardConfig?: null | string;
  /* 任务状态 */
  status?: 0 | 1 | 2;
  /* 完成目标次数 */
  targetCount?: number;
  /* 任务标题 */
  title?: string;

  /* 任务类型 */
  type?: 1 | 2 | 3 | 4 | 5;
};

/**
 *  类型定义 [UpdateTaskStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
 */
export type UpdateTaskStatusDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;
  /* 启用状态 */
  isEnabled?: boolean;

  /* 任务状态 */
  status?: 0 | 1 | 2;
};

/**
 *  类型定义 [BaseTaskDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
 */
export type BaseTaskDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 领取模式 */
  claimMode: 1 | 2;
  /* 任务编码 */
  code: string;
  /* 完成模式 */
  completeMode: 1 | 2;
  /* 封面图 */
  cover?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 创建人ID */
  createdById?: null | number;
  /* 任务说明 */
  description?: null | string;
  /* 主键id */
  id: number;
  /* 启用状态 */
  isEnabled: boolean;
  /* 优先级 */
  priority: number;
  /* 发布结束时间 */
  publishEndAt?: null | string;
  /* 发布开始时间 */
  publishStartAt?: null | string;
  /* 周期规则 */
  repeatRule?: null | string;
  /* 奖励配置 */
  rewardConfig?: null | string;
  /* 任务状态 */
  status: 0 | 1 | 2;
  /* 完成目标次数 */
  targetCount: number;
  /* 任务标题 */
  title: string;
  /* 任务类型 */
  type: 1 | 2 | 3 | 4 | 5;
  /* 更新时间 */
  updatedAt: string;

  /* 更新人ID */
  updatedById?: null | number;
};
