/**
 *  类型定义 [AssignmentPageRequest]
 *  @来源 任务管理
 *  @更新时间 2026-03-02 23:55:35
 */
export type AssignmentPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

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

  /* 任务ID */
  taskId?: number;

  /* 用户ID */
  userId?: number;
};

export type AssignmentPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseTaskAssignmentDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [BaseTaskAssignmentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-02 23:55:35
 */
export type BaseTaskAssignmentDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 领取时间 */
  claimedAt?: null | string;
  /* 完成时间 */
  completedAt?: null | string;
  /* 上下文 */
  context?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 周期实例键 */
  cycleKey: string;
  /* 过期时间 */
  expiredAt?: null | string;
  /* 主键id */
  id: number;
  /* 当前进度 */
  progress: number;
  /* 任务状态 */
  status: 0 | 1 | 2 | 3;
  /* 目标进度 */
  target: number;
  /* 任务ID */
  taskId: number;
  /* 任务快照 */
  taskSnapshot?: null | string;
  /* 更新时间 */
  updatedAt: string;

  /* 用户ID */
  userId: number;
};
