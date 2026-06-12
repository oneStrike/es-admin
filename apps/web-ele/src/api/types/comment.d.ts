/**
 *  类型定义 [CommentPageRequest]
 *  @来源 内容治理/评论处理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CommentPageRequest = {
  /* 实际回复的根评论 ID */
  actualReplyToId?: null | number;

  /* 审核状态（0=待审核；1=已通过；2=已拒绝） */
  auditStatus?: 0 | 1 | 2;

  /* 创建日期结束（应用时区自然日，YYYY-MM-DD） */
  endDate?: null | string;

  /* 主键id */
  id?: number;

  /* 是否隐藏 */
  isHidden?: boolean;

  /* 关键词搜索（评论内容） */
  keyword?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 回复的评论 ID */
  replyToId?: null | number;

  /* 创建日期开始（应用时区自然日，YYYY-MM-DD） */
  startDate?: null | string;

  /* 目标 ID */
  targetId?: number;

  /* 目标类型（1=漫画作品；2=小说作品；3=漫画章节；4=小说章节；5=论坛主题） */
  targetType?: 1 | 2 | 3 | 4 | 5;

  /* 评论用户 ID */
  userId?: number;
};

export type CommentPageResponse = {
  /* 列表数据 */
  list?: AdminCommentPageItemDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [CommentDetailRequest]
 *  @来源 内容治理/评论处理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CommentDetailRequest = {
  /* 主键id */
  id: number;
};

export type CommentDetailResponse = AdminCommentDetailDto;

/**
 *  类型定义 [CommentUpdateAuditStatusRequest]
 *  @来源 内容治理/评论处理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CommentUpdateAuditStatusRequest = UpdateCommentAuditStatusDto;

export type CommentUpdateAuditStatusResponse = boolean;

/**
 *  类型定义 [CommentUpdateHiddenRequest]
 *  @来源 内容治理/评论处理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CommentUpdateHiddenRequest = UpdateCommentHiddenDto;

export type CommentUpdateHiddenResponse = boolean;

/**
 *  类型定义 [CommentDeleteRequest]
 *  @来源 内容治理/评论处理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CommentDeleteRequest = IdDto;

export type CommentDeleteResponse = boolean;

/**
 *  类型定义 [AdminCommentPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminCommentPageItemDto = {
  /* 实际回复的根评论 ID */
  actualReplyToId: null | number;
  /* 审核时间 */
  auditAt: null | string;
  /* 审核人 ID */
  auditById: null | number;
  /* 审核原因 */
  auditReason: null | string;
  /* 审核角色（0=版主；1=管理员） */
  auditRole: 0 | 1 | null;
  /* 审核状态（0=待审核；1=已通过；2=已拒绝） */
  auditStatus: 0 | 1 | 2;
  /* 创建时间 */
  createdAt: string;
  /* 楼层号 */
  floor: null | number;
  /* 评论正文 HTML；对外唯一正文表示 */
  html: string;
  /* 主键id */
  id: number;
  /* 是否隐藏 */
  isHidden: boolean;
  /* 点赞数 */
  likeCount: number;
  /* 回复的评论 ID */
  replyToId: null | number;
  /* 被回复评论展示摘要 */
  replyToSummary: InteractionReplyCommentSummaryDto;
  /* 敏感词命中记录 */
  sensitiveWordHits: null | SensitiveWordHitDto[];
  /* 目标 ID */
  targetId: number;
  /* 评论目标展示摘要 */
  targetSummary: InteractionCommentTargetSummaryDto;
  /* 目标类型（1=漫画作品；2=小说作品；3=漫画章节；4=小说章节；5=论坛主题） */
  targetType: 1 | 2 | 3 | 4 | 5;
  /* 更新时间 */
  updatedAt: string;
  /* 评论作者信息 */
  user: AdminCommentUserDto;
  /* 评论用户 ID */
  userId: number;
};

/**
 *  类型定义 [SensitiveWordHitDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type SensitiveWordHitDto = {
  /* 结束位置 */
  end: number;
  /* 命中字段（标题；正文） */
  field: string;
  /* 敏感词级别（1=严重；2=一般；3=轻微） */
  level: 1 | 2 | 3;
  /* 替换词 */
  replaceWord: null | string;
  /* 起始位置 */
  start: number;
  /* 敏感词类型（1=政治；2=色情；3=暴力；4=广告；5=其他） */
  type: 1 | 2 | 3 | 4 | 5;
  /* 敏感词 */
  word: string;
};

/**
 *  类型定义 [AdminCommentUserDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminCommentUserDto = {
  /* 头像URL */
  avatarUrl: null | string;
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
 *  类型定义 [InteractionCommentTargetSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type InteractionCommentTargetSummaryDto = {
  /* 目标审核状态（0=待审核；1=已通过；2=已拒绝） */
  auditStatus: 0 | 1 | 2 | null;
  /* 目标删除时间 */
  deletedAt: null | string;
  /* 目标是否隐藏 */
  isHidden: boolean | null;
  /* 目标名称 */
  name: null | string;
  /* 论坛主题所属板块名称 */
  sectionName: null | string;
  /* 评论目标 ID */
  targetId: number;
  /* 评论目标类型（1=漫画作品；2=小说作品；3=漫画章节；4=小说章节；5=论坛主题） */
  targetType: 1 | 2 | 3 | 4 | 5;
  /* 评论目标类型名称 */
  targetTypeName: string;
  /* 目标标题 */
  title: null | string;
  /* 章节所属作品名称 */
  workName: null | string;
};

/**
 *  类型定义 [InteractionReplyCommentSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type InteractionReplyCommentSummaryDto = {
  /* 被回复评论审核状态（0=待审核；1=已通过；2=已拒绝） */
  auditStatus: 0 | 1 | 2;
  /* 被回复评论 ID */
  commentId: number;
  /* 被回复评论内容摘要 */
  contentExcerpt: null | string;
  /* 被回复评论是否隐藏 */
  isHidden: boolean;
  /* 被回复评论用户头像 URL */
  userAvatarUrl: null | string;
  /* 被回复评论用户是否启用 */
  userIsEnabled: boolean | null;
  /* 被回复评论用户昵称 */
  userNickname: null | string;
  /* 被回复评论用户状态（1=正常；2=禁言；3=永久禁言；4=封禁；5=永久封禁） */
  userStatus: 1 | 2 | 3 | 4 | 5 | null;
};

/**
 *  类型定义 [AdminCommentDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminCommentDetailDto = {
  /* 实际回复的根评论 ID */
  actualReplyToId: null | number;
  /* 审核时间 */
  auditAt: null | string;
  /* 审核人 ID */
  auditById: null | number;
  /* 审核人展示摘要 */
  auditorSummary: InteractionActorSummaryDto;
  /* 审核原因 */
  auditReason: null | string;
  /* 审核角色（0=版主；1=管理员） */
  auditRole: 0 | 1 | null;
  /* 审核状态（0=待审核；1=已通过；2=已拒绝） */
  auditStatus: 0 | 1 | 2;
  /* 创建时间 */
  createdAt: string;
  /* 删除时间 */
  deletedAt: null | string;
  /* 楼层号 */
  floor: null | number;
  /* 评论正文 HTML；对外唯一正文表示 */
  html: string;
  /* 主键id */
  id: number;
  /* 是否隐藏 */
  isHidden: boolean;
  /* 点赞数 */
  likeCount: number;
  /* 被回复评论简要信息 */
  replyTo: AdminCommentReplyTargetDto;
  /* 回复的评论 ID */
  replyToId: null | number;
  /* 敏感词命中记录 */
  sensitiveWordHits: null | SensitiveWordHitDto[];
  /* 目标 ID */
  targetId: number;
  /* 评论目标展示摘要 */
  targetSummary: InteractionCommentTargetSummaryDto;
  /* 目标类型（1=漫画作品；2=小说作品；3=漫画章节；4=小说章节；5=论坛主题） */
  targetType: 1 | 2 | 3 | 4 | 5;
  /* 更新时间 */
  updatedAt: string;
  /* 评论作者信息 */
  user: AdminCommentUserDto;
  /* 评论用户 ID */
  userId: number;
};

/**
 *  类型定义 [InteractionActorSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type InteractionActorSummaryDto = {
  /* 头像 */
  avatar: null | string;
  /* 主键id */
  id: number;
  /* 昵称；管理员默认使用用户名兜底 */
  nickname: null | string;
  /* 角色名称 */
  roleName: null | string;
  /* 用户名 */
  username: string;
};

/**
 *  类型定义 [AdminCommentReplyTargetDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminCommentReplyTargetDto = {
  /* 实际回复的根评论 ID */
  actualReplyToId: null | number;
  /* 审核状态（0=待审核；1=已通过；2=已拒绝） */
  auditStatus: 0 | 1 | 2;
  /* 创建时间 */
  createdAt: string;
  /* 删除时间 */
  deletedAt: null | string;
  /* 评论正文 HTML；对外唯一正文表示 */
  html: string;
  /* 主键id */
  id: number;
  /* 是否隐藏 */
  isHidden: boolean;
  /* 回复的评论 ID */
  replyToId: null | number;
  /* 被回复评论的作者信息 */
  user: AdminCommentUserDto;
  /* 评论用户 ID */
  userId: number;
};

/**
 *  类型定义 [UpdateCommentAuditStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateCommentAuditStatusDto = {
  /* 审核原因 */
  auditReason?: null | string;
  /* 审核状态（0=待审核；1=已通过；2=已拒绝） */
  auditStatus: 0 | 1 | 2;
  /* 主键id */
  id: number;
};

/**
 *  类型定义 [UpdateCommentHiddenDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateCommentHiddenDto = {
  /* 主键id */
  id: number;
  /* 是否隐藏 */
  isHidden: boolean;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type IdDto = {
  /* 主键id */
  id: number;
};
