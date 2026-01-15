/**
 *  类型定义 [ReportsListRequest]
 *  @来源 论坛模块/举报管理
 *  @更新时间 2026-01-15 16:18:29
 */
export type ReportsListRequest = {
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

  /* 举报原因 */
  reason?: string;

  /* 举报人用户资料ID */
  reporterId?: number;

  /* 开始时间 */
  startDate?: null | string;

  /* 处理状态 */
  status?: null | string;

  /* 举报类型（topic=主题, reply=回复, user=用户） */
  type?: string;
};

export type ReportsListResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: CreateForumReportDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ReportsDetailRequest]
 *  @来源 论坛模块/举报管理
 *  @更新时间 2026-01-15 16:18:29
 */
export type ReportsDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type ReportsDetailResponse = CreateForumReportDto;

export type ReportsStatisticsResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 响应状态码 */
  code?: number;

  /* 响应消息 */
  message?: string;
};

/**
 *  类型定义 [ReportsAddRequest]
 *  @来源 论坛模块/举报管理
 *  @更新时间 2026-01-15 16:18:29
 */
export type ReportsAddRequest = CreateForumReportDto;

export type ReportsAddResponse = CreateForumReportDto;

/**
 *  类型定义 [ReportsHandleRequest]
 *  @来源 论坛模块/举报管理
 *  @更新时间 2026-01-15 16:18:29
 */
export type ReportsHandleRequest = HandleReportDto;

export type ReportsHandleResponse = HandleReportDto;

/**
 *  类型定义 [ReportsRemoveRequest]
 *  @来源 论坛模块/举报管理
 *  @更新时间 2026-01-15 16:18:29
 */
export type ReportsRemoveRequest = IdDto;

export type ReportsRemoveResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 响应状态码 */
  code?: number;

  /* 响应消息 */
  message?: string;
};

/**
 *  类型定义 [CreateForumReportDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-15 16:18:29
 */
export type CreateForumReportDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 举报详细说明 */
  description?: null | string;
  /* 证据截图URL */
  evidenceUrl?: null | string;
  /* 举报原因 */
  reason:
    | 'copyright'
    | 'harassment'
    | 'inappropriate_content'
    | 'other'
    | 'spam';
  /* 举报人用户资料ID */
  reporterId: number;
  /* 被举报对象ID（主题ID/回复ID/用户ID） */
  targetId: number;

  /* 举报类型（topic=主题, reply=回复, user=用户） */
  type: 'reply' | 'topic' | 'user';
};

/**
 *  类型定义 [HandleReportDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-15 16:18:29
 */
export type HandleReportDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 处理人ID */
  handlerId?: null | number;
  /* 处理结果说明 */
  handlingNote?: null | string;
  /* 主键id */
  id: number;

  /* 处理状态 */
  status?: null | string;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-15 16:18:29
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};
