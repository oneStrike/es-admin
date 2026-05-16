/**
 *  类型定义 [BackgroundTaskPageRequest]
 *  @来源 系统管理/后台任务
 *  @更新时间 2026-05-09 22:20:06
 */
export type BackgroundTaskPageRequest = {
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

  /* 任务状态（1=待处理；2=处理中；3=最终写入中；4=成功；5=失败；6=已取消；7=回滚失败） */
  status?: number;

  /* 后台任务ID */
  taskId?: string;

  /* 后台任务类型 */
  taskType?: string;
};

export type BackgroundTaskPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BackgroundTaskDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [BackgroundTaskMyPageRequest]
 *  @来源 系统管理/后台任务
 *  @更新时间 2026-05-09 22:20:06
 */
export type BackgroundTaskMyPageRequest = {
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

  /* 任务状态（1=待处理；2=处理中；3=最终写入中；4=成功；5=失败；6=已取消；7=回滚失败） */
  status?: number;

  /* 后台任务ID */
  taskId?: string;

  /* 后台任务类型 */
  taskType?: string;
};

export type BackgroundTaskMyPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BackgroundTaskNotificationDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [BackgroundTaskDetailRequest]
 *  @来源 系统管理/后台任务
 *  @更新时间 2026-05-09 22:20:06
 */
export type BackgroundTaskDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 后台任务ID */
  taskId: string;
};

export type BackgroundTaskDetailResponse = BackgroundTaskDto;

/**
 *  类型定义 [BackgroundTaskCancelRequest]
 *  @来源 系统管理/后台任务
 *  @更新时间 2026-05-09 22:20:06
 */
export type BackgroundTaskCancelRequest = BackgroundTaskIdDto;

export type BackgroundTaskCancelResponse = BackgroundTaskDto;

/**
 *  类型定义 [BackgroundTaskRetryRequest]
 *  @来源 系统管理/后台任务
 *  @更新时间 2026-05-09 22:20:06
 */
export type BackgroundTaskRetryRequest = BackgroundTaskIdDto;

export type BackgroundTaskRetryResponse = BackgroundTaskDto;

/**
 *  类型定义 [BackgroundTaskDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BackgroundTaskDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 取消请求时间 */
  cancelRequestedAt?: null | string;
  /* 当前处理 worker */
  claimedBy?: null | string;
  /* claim 过期时间 */
  claimExpiresAt?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 后台任务去重键 */
  dedupeKey?: null | string;
  /* 任务错误信息 */
  error?: null | Record<string, any>;
  /* 进入最终写入时间 */
  finalizingAt?: null | string;
  /* 完成时间 */
  finishedAt?: null | string;
  /* 主键id */
  id: number;
  /* 最大允许重试次数 */
  maxRetries: number;
  /* 操作者类型（1=后台管理员；2=系统） */
  operatorType: 1 | 2;
  /* 后台管理员操作者ID；系统任务为空 */
  operatorUserId?: null | number;
  /* 任务负载 */
  payload: Record<string, any>;
  /* 任务进度 */
  progress: Record<string, any>;
  /* 任务残留诊断 */
  residue?: null | Record<string, any>;
  /* 任务成功结果 */
  result?: null | Record<string, any>;
  /* 已重试次数 */
  retryCount: number;
  /* 回滚失败诊断 */
  rollbackError?: null | Record<string, any>;
  /* 后台任务执行串行键 */
  serialKey?: null | string;
  /* 开始处理时间 */
  startedAt?: null | string;
  /* 任务状态（1=待处理；2=处理中；3=最终写入中；4=成功；5=失败；6=已取消；7=回滚失败） */
  status: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /* 后台任务ID */
  taskId: string;
  /* 后台任务类型 */
  taskType: string;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [BackgroundTaskNotificationDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BackgroundTaskNotificationDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 任务进度 */
  progress: BackgroundTaskNotificationProgressDto;
  /* 任务状态（1=待处理；2=处理中；3=最终写入中；4=成功；5=失败；6=已取消；7=回滚失败） */
  status: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /* 后台任务ID */
  taskId: string;
  /* 后台任务类型 */
  taskType: string;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [BackgroundTaskNotificationProgressDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BackgroundTaskNotificationProgressDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 任务进度文案 */
  message?: string;

  /* 任务进度百分比 */
  percent?: number;
};

/**
 *  类型定义 [BackgroundTaskIdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BackgroundTaskIdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 后台任务ID */
  taskId: string;
};
