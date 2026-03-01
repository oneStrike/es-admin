/**
 *  类型定义 [ReportPageRequest]
 *  @来源 内容管理/漫画章节评论模块
 *  @更新时间 2026-03-01 22:12:30
 */
export type ReportPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 评论ID */
  commentId?: number;

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

  /* 举报人ID */
  reporterId?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 处理状态 */
  status?: null | string;
};

export type ReportPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: IdDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ReportHandleRequest]
 *  @来源 内容管理/漫画章节评论模块
 *  @更新时间 2026-03-01 22:12:30
 */
export type ReportHandleRequest = HandleWorkCommentReportDto;

export type ReportHandleResponse = IdDto;

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 22:12:30
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [HandleWorkCommentReportDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 22:12:30
 */
export type HandleWorkCommentReportDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 处理备注 */
  handlingNote?: null | string;
  /* 主键id */
  id: number;

  /* 处理状态 */
  status?: null | string;
};
