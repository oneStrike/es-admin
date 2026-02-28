/**
 *  类型定义 [ComicChapterCommentPageRequest]
 *  @来源 内容管理/漫画章节评论模块
 *  @更新时间 2026-03-01 01:57:48
 */
export type ComicChapterCommentPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 审核状态 */
  auditStatus?: number;

  /* 章节ID（为空表示作品评论） */
  chapterId?: null | number;

  /* 评论内容 */
  content?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* 楼层号 */
  floor?: null | number;

  /* 是否隐藏 */
  isHidden?: boolean;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码 */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 排序字段 */
  sortBy?: null | string;

  /* 排序顺序 */
  sortOrder?: null | string;

  /* 开始时间 */
  startDate?: null | string;

  /* 评论用户ID */
  userId?: number;

  /* 作品ID */
  workId?: number;

  /* 作品类型（1=漫画, 2=小说） */
  workType?: number;
};

export type ComicChapterCommentPageResponse = {
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
 *  类型定义 [ComicChapterCommentDetailRequest]
 *  @来源 内容管理/漫画章节评论模块
 *  @更新时间 2026-03-01 01:57:48
 */
export type ComicChapterCommentDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type ComicChapterCommentDetailResponse = IdDto;

/**
 *  类型定义 [ComicChapterCommentUpdateAuditRequest]
 *  @来源 内容管理/漫画章节评论模块
 *  @更新时间 2026-03-01 01:57:48
 */
export type ComicChapterCommentUpdateAuditRequest = UpdateWorkCommentAuditDto;

export type ComicChapterCommentUpdateAuditResponse = IdDto;

/**
 *  类型定义 [ComicChapterCommentAuditRequest]
 *  @来源 内容管理/漫画章节评论模块
 *  @更新时间 2026-03-01 01:57:48
 */
export type ComicChapterCommentAuditRequest = UpdateWorkCommentAuditDto;

export type ComicChapterCommentAuditResponse = IdDto;

/**
 *  类型定义 [ComicChapterCommentUpdateHiddenRequest]
 *  @来源 内容管理/漫画章节评论模块
 *  @更新时间 2026-03-01 01:57:48
 */
export type ComicChapterCommentUpdateHiddenRequest = UpdateWorkCommentHiddenDto;

export type ComicChapterCommentUpdateHiddenResponse = IdDto;

/**
 *  类型定义 [ComicChapterCommentHideRequest]
 *  @来源 内容管理/漫画章节评论模块
 *  @更新时间 2026-03-01 01:57:48
 */
export type ComicChapterCommentHideRequest = UpdateWorkCommentHiddenDto;

export type ComicChapterCommentHideResponse = IdDto;

/**
 *  类型定义 [ComicChapterCommentDeleteRequest]
 *  @来源 内容管理/漫画章节评论模块
 *  @更新时间 2026-03-01 01:57:48
 */
export type ComicChapterCommentDeleteRequest = IdDto;

export type ComicChapterCommentDeleteResponse = IdDto;

/**
 *  类型定义 [ComicChapterCommentRecalcCountRequest]
 *  @来源 内容管理/漫画章节评论模块
 *  @更新时间 2026-03-01 01:57:48
 */
export type ComicChapterCommentRecalcCountRequest = IdDto;

export type ComicChapterCommentRecalcCountResponse = IdDto;

/**
 *  类型定义 [ComicChapterCommentReportRequest]
 *  @来源 内容管理/漫画章节评论模块
 *  @更新时间 2026-03-01 01:57:48
 */
export type ComicChapterCommentReportRequest = HandleWorkCommentReportDto;

export type ComicChapterCommentReportResponse = IdDto;

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 01:57:48
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [UpdateWorkCommentAuditDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 01:57:48
 */
export type UpdateWorkCommentAuditDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 审核原因 */
  auditReason?: null | string;
  /* 审核状态 */
  auditStatus: 0 | 1 | 2;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [UpdateWorkCommentHiddenDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 01:57:48
 */
export type UpdateWorkCommentHiddenDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 是否隐藏 */
  isHidden: boolean;
};

/**
 *  类型定义 [HandleWorkCommentReportDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 01:57:48
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
