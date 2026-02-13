/**
 *  类型定义 [EventsPageRequest]
 *  @来源 用户成长/事件审计
 *  @更新时间 2026-02-13 00:11:45
 */
export type EventsPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 业务域标识 */
  business?: string;

  /* 设备ID */
  deviceId?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* 事件键 */
  eventKey?: string;

  /* 请求IP */
  ip?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码 */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 处理状态 */
  status?: string;

  /* 目标ID */
  targetId?: null | number;

  /* 用户ID */
  userId?: number;
};

export type EventsPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseUserGrowthEventDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [BaseUserGrowthEventDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-13 00:11:45
 */
export type BaseUserGrowthEventDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 徽章发放记录 */
  badgeAssigned?: null | string;
  /* 业务域标识 */
  business: string;
  /* 事件上下文 */
  context?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 设备ID */
  deviceId?: null | string;
  /* 事件键 */
  eventKey: string;
  /* 经验变更值 */
  experienceDeltaApplied?: null | number;
  /* 主键id */
  id: number;
  /* 请求IP */
  ip?: null | string;
  /* 事件发生时间 */
  occurredAt: string;
  /* 积分变更值 */
  pointsDeltaApplied?: null | number;
  /* 命中规则摘要 */
  ruleRefs?: null | string;
  /* 处理状态 */
  status:
    | 'FAILED'
    | 'IGNORED_DUPLICATE'
    | 'IGNORED_RULE_NOT_FOUND'
    | 'PENDING'
    | 'PROCESSED'
    | 'REJECTED_ANTIFRAUD';
  /* 目标ID */
  targetId?: null | number;
  /* 更新时间 */
  updatedAt: string;

  /* 用户ID */
  userId: number;
};
