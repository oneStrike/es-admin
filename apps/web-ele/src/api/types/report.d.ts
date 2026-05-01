/**
 *  类型定义 [ReportPageRequest]
 *  @来源 内容治理/举报处理
 *  @更新时间 2026-05-02 02:19:03
 */
export type ReportPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 处理人 ID */
  handlerId?: null | number;

  /* 主键id */
  id?: number;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 举报原因类型（1=垃圾信息；2=不当内容；3=骚扰；4=版权侵权；99=其他） */
  reasonType?: number;

  /* 举报人 ID */
  reporterId?: number;

  /* 业务场景根对象 ID */
  sceneId?: number;

  /* 业务场景类型（1=漫画作品；2=小说作品；3=论坛主题；10=漫画章节；11=小说章节；12=用户主页） */
  sceneType?: number;

  /* 开始时间 */
  startDate?: null | string;

  /* 举报状态（1=待处理；2=处理中；3=已解决；4=已驳回） */
  status?: number;

  /* 举报目标 ID */
  targetId?: number;

  /* 举报目标类型（1=漫画；2=小说；3=漫画章节；4=小说章节；5=论坛主题；6=评论；7=用户） */
  targetType?: number;
};

export type ReportPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: AdminReportPageItemDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ReportDetailRequest]
 *  @来源 内容治理/举报处理
 *  @更新时间 2026-05-02 02:19:03
 */
export type ReportDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type ReportDetailResponse = AdminReportDetailDto;

/**
 *  类型定义 [ReportHandleRequest]
 *  @来源 内容治理/举报处理
 *  @更新时间 2026-05-02 02:19:03
 */
export type ReportHandleRequest = HandleAdminReportDto;

export type ReportHandleResponse = boolean;

/**
 *  类型定义 [AdminReportPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-02 02:19:03
 */
export type AdminReportPageItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 评论层级（1=根评论；2=回复评论） */
  commentLevel?: null | number;
  /* 创建时间 */
  createdAt: string;
  /* 详细说明 */
  description?: null | string;
  /* 证据图片URL */
  evidenceUrl?: null | string;
  /* 处理时间 */
  handledAt?: null | string;
  /* 处理人 ID */
  handlerId?: null | number;
  /* 处理人展示摘要 */
  handlerSummary?: InteractionActorSummaryDto;
  /* 处理备注 */
  handlingNote?: null | string;
  /* 主键id */
  id: number;
  /* 举报原因类型（1=垃圾信息；2=不当内容；3=骚扰；4=版权侵权；99=其他） */
  reasonType: 1 | 2 | 3 | 4 | 99;
  /* 举报人 ID */
  reporterId: number;
  /* 举报人展示摘要 */
  reporterSummary?: InteractionAppUserSummaryDto;
  /* 业务场景根对象 ID */
  sceneId: number;
  /* 举报业务场景展示摘要 */
  sceneSummary?: InteractionSceneSummaryDto;
  /* 业务场景类型（1=漫画作品；2=小说作品；3=论坛主题；10=漫画章节；11=小说章节；12=用户主页） */
  sceneType: 1 | 2 | 3 | 10 | 11 | 12;
  /* 举报状态（1=待处理；2=处理中；3=已解决；4=已驳回） */
  status: 1 | 2 | 3 | 4;
  /* 举报目标 ID */
  targetId: number;
  /* 举报目标展示摘要 */
  targetSummary?: InteractionReportTargetSummaryDto;
  /* 举报目标类型（1=漫画；2=小说；3=漫画章节；4=小说章节；5=论坛主题；6=评论；7=用户） */
  targetType: 1 | 2 | 3 | 4 | 5 | 6 | 7;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [InteractionAppUserSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-02 02:19:03
 */
export type InteractionAppUserSummaryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 头像URL */
  avatarUrl?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 昵称 */
  nickname: string;

  /* 用户状态（1=正常；2=禁言；3=永久禁言；4=封禁；5=永久封禁） */
  status: 1 | 2 | 3 | 4 | 5;
};

/**
 *  类型定义 [InteractionActorSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-02 02:19:03
 */
export type InteractionActorSummaryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 头像 */
  avatar?: null | string;
  /* 主键id */
  id: number;
  /* 昵称；管理员默认使用用户名兜底 */
  nickname?: null | string;
  /* 角色名称 */
  roleName?: null | string;

  /* 用户名 */
  username: string;
};

/**
 *  类型定义 [InteractionReportTargetSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-02 02:19:03
 */
export type InteractionReportTargetSummaryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 目标审核状态（0=待审核；1=已通过；2=已拒绝） */
  auditStatus?: null | number;
  /* 作者头像 URL */
  authorAvatarUrl?: null | string;
  /* 作者昵称 */
  authorNickname?: null | string;
  /* 举报评论内容摘要 */
  contentExcerpt?: null | string;
  /* 目标删除时间 */
  deletedAt?: null | string;
  /* 目标用户是否启用 */
  isEnabled?: boolean | null;
  /* 目标是否隐藏 */
  isHidden?: boolean | null;
  /* 举报目标名称 */
  name?: null | string;
  /* 目标用户状态（1=正常；2=禁言；3=永久禁言；4=封禁；5=永久封禁） */
  status?: null | number;
  /* 举报目标 ID */
  targetId: number;
  /* 举报目标类型（1=漫画作品；2=小说作品；3=漫画章节；4=小说章节；5=论坛主题；6=评论；7=用户） */
  targetType: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /* 举报目标类型名称 */
  targetTypeName: string;
  /* 举报目标标题 */
  title?: null | string;

  /* 章节所属作品名称 */
  workName?: null | string;
};

/**
 *  类型定义 [InteractionSceneSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-02 02:19:03
 */
export type InteractionSceneSummaryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 业务场景名称 */
  name?: null | string;
  /* 业务场景所属上级名称 */
  parentName?: null | string;
  /* 业务场景 ID */
  sceneId: number;
  /* 业务场景类型（1=漫画作品；2=小说作品；3=论坛主题；10=漫画章节；11=小说章节；12=用户主页） */
  sceneType: 1 | 2 | 3 | 10 | 11 | 12;
  /* 业务场景类型名称 */
  sceneTypeName: string;

  /* 业务场景标题 */
  title?: null | string;
};

/**
 *  类型定义 [AdminReportDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-02 02:19:03
 */
export type AdminReportDetailDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 评论层级（1=根评论；2=回复评论） */
  commentLevel?: null | number;
  /* 被举报评论展示摘要；仅举报目标为评论时返回 */
  commentSummary?: InteractionReportCommentSummaryDto;
  /* 创建时间 */
  createdAt: string;
  /* 详细说明 */
  description?: null | string;
  /* 证据图片URL */
  evidenceUrl?: null | string;
  /* 处理时间 */
  handledAt?: null | string;
  /* 处理人 ID */
  handlerId?: null | number;
  /* 处理人展示摘要 */
  handlerSummary?: InteractionActorSummaryDto;
  /* 处理备注 */
  handlingNote?: null | string;
  /* 主键id */
  id: number;
  /* 举报原因类型（1=垃圾信息；2=不当内容；3=骚扰；4=版权侵权；99=其他） */
  reasonType: 1 | 2 | 3 | 4 | 99;
  /* 举报人 ID */
  reporterId: number;
  /* 举报人展示摘要 */
  reporterSummary?: InteractionAppUserSummaryDto;
  /* 业务场景根对象 ID */
  sceneId: number;
  /* 举报业务场景展示摘要 */
  sceneSummary?: InteractionSceneSummaryDto;
  /* 业务场景类型（1=漫画作品；2=小说作品；3=论坛主题；10=漫画章节；11=小说章节；12=用户主页） */
  sceneType: 1 | 2 | 3 | 10 | 11 | 12;
  /* 举报状态（1=待处理；2=处理中；3=已解决；4=已驳回） */
  status: 1 | 2 | 3 | 4;
  /* 举报目标 ID */
  targetId: number;
  /* 举报目标展示摘要 */
  targetSummary?: InteractionReportTargetSummaryDto;
  /* 举报目标类型（1=漫画；2=小说；3=漫画章节；4=小说章节；5=论坛主题；6=评论；7=用户） */
  targetType: 1 | 2 | 3 | 4 | 5 | 6 | 7;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [InteractionReportCommentSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-02 02:19:03
 */
export type InteractionReportCommentSummaryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 评论审核状态（0=待审核；1=已通过；2=已拒绝） */
  auditStatus: 0 | 1 | 2;
  /* 评论 ID */
  commentId: number;
  /* 评论层级（1=根评论；2=回复评论） */
  commentLevel: 1 | 2;
  /* 评论内容摘要 */
  contentExcerpt?: null | string;
  /* 评论是否隐藏 */
  isHidden: boolean;
  /* 评论用户头像 URL */
  userAvatarUrl?: null | string;
  /* 评论用户是否启用 */
  userIsEnabled?: boolean | null;
  /* 评论用户昵称 */
  userNickname?: null | string;

  /* 评论用户状态（1=正常；2=禁言；3=永久禁言；4=封禁；5=永久封禁） */
  userStatus?: null | number;
};

/**
 *  类型定义 [HandleAdminReportDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-02 02:19:03
 */
export type HandleAdminReportDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 处理备注 */
  handlingNote?: null | string;
  /* 主键id */
  id: number;

  /* 裁决结果（3=已解决；4=已驳回） */
  status: 3 | 4;
};
