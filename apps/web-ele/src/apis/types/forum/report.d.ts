/**
 *  类型定义 [ReportCreateRequest]
 *  @来源 论坛管理/举报模块
 *  @更新时间 2026-01-13 00:08:17
 */
export type ReportCreateRequest = CreateForumReportDto;

export type ReportCreateResponse = BaseForumReportDto;

/**
 *  类型定义 [ReportPageRequest]
 *  @来源 论坛管理/举报模块
 *  @更新时间 2026-01-13 00:08:17
 */
export type ReportPageRequest = {
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

export type ReportPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseForumReportDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ReportDetailRequest]
 *  @来源 论坛管理/举报模块
 *  @更新时间 2026-01-13 00:08:17
 */
export type ReportDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type ReportDetailResponse = BaseForumReportDto;

/**
 *  类型定义 [ReportHandleRequest]
 *  @来源 论坛管理/举报模块
 *  @更新时间 2026-01-13 00:08:17
 */
export type ReportHandleRequest = HandleReportDto;

export type ReportHandleResponse = BaseForumReportDto;

/**
 *  类型定义 [ReportUserReportsRequest]
 *  @来源 论坛管理/举报模块
 *  @更新时间 2026-01-13 00:08:17
 */
export type ReportUserReportsRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  profileId: number;
};

export type ReportUserReportsResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseForumReportDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ReportDeleteRequest]
 *  @来源 论坛管理/举报模块
 *  @更新时间 2026-01-13 00:08:17
 */
export type ReportDeleteRequest = IdDto;

export type ReportDeleteResponse = BaseDto;

/**
 *  类型定义 [CreateForumReportDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-13 00:08:17
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
 *  类型定义 [BaseForumReportDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-13 00:08:17
 */
export type BaseForumReportDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 创建时间 */
  createdAt: string;
  /* 举报详细说明 */
  description?: null | string;
  /* 证据截图URL */
  evidenceUrl?: null | string;
  /* 处理人ID */
  handlerId?: null | number;
  /* 处理结果说明 */
  handlingNote?: null | string;
  /* 主键id */
  id: number;
  /* 举报原因 */
  reason:
    | 'copyright'
    | 'harassment'
    | 'inappropriate_content'
    | 'other'
    | 'spam';
  /* 举报人用户资料ID */
  reporterId: number;
  /* 处理状态 */
  status?: null | string;
  /* 被举报对象ID（主题ID/回复ID/用户ID） */
  targetId: number;
  /* 举报类型（topic=主题, reply=回复, user=用户） */
  type: 'reply' | 'topic' | 'user';

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [HandleReportDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-13 00:08:17
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
 *  @更新时间 2026-01-13 00:08:17
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [BaseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-13 00:08:17
 */
export type BaseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 创建时间 */
  createdAt: string;
  /* 主键id */
  id: number;

  /* 更新时间 */
  updatedAt: string;
};
