/**
 *  类型定义 [CommentPageRequest]
 *  @来源 内容治理/评论处理
 *  @更新时间 2026-04-08 08:36:51
 */
export type CommentPageRequest = {
  /* 开始时间 */
  startDate?: string | null

  /* 结束时间 */
  endDate?: string | null

  /* 单页大小，最大500，默认15 */
  pageSize?: number | null

  /* 当前页码（从1开始） */
  pageIndex?: number | null

  /* 排序字段，json格式 */
  orderBy?: string | null

  /* 主键id */
  id?: number

  /* 目标类型 */
  targetType?: number

  /* 目标 ID */
  targetId?: number

  /* 评论用户 ID */
  userId?: number

  /* 回复的评论 ID */
  replyToId?: number | null

  /* 实际回复的根评论 ID */
  actualReplyToId?: number | null

  /* 是否隐藏 */
  isHidden?: boolean

  /* 审核状态 */
  auditStatus?: number

  /* 关键词搜索（评论内容） */
  keyword?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

export type CommentPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: AdminCommentPageItemDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [CommentDetailRequest]
 *  @来源 内容治理/评论处理
 *  @更新时间 2026-04-08 08:36:51
 */
export type CommentDetailRequest = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

export type CommentDetailResponse = AdminCommentDetailDto

/**
 *  类型定义 [CommentUpdateAuditStatusRequest]
 *  @来源 内容治理/评论处理
 *  @更新时间 2026-04-08 08:36:51
 */
export type CommentUpdateAuditStatusRequest = UpdateAdminCommentAuditStatusDto

export type CommentUpdateAuditStatusResponse = boolean

/**
 *  类型定义 [CommentUpdateHiddenRequest]
 *  @来源 内容治理/评论处理
 *  @更新时间 2026-04-08 08:36:51
 */
export type CommentUpdateHiddenRequest = UpdateAdminCommentHiddenDto

export type CommentUpdateHiddenResponse = boolean

/**
 *  类型定义 [AdminCommentPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type AdminCommentPageItemDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 目标类型 */
  targetType: 1 | 2 | 3 | 4 | 5
  /* 目标 ID */
  targetId: number
  /* 评论用户 ID */
  userId: number
  /* 评论内容 */
  content: string
  /* 评论正文解析 token（EmojiParser 输出） */
  bodyTokens?: string | null
  /* 楼层号 */
  floor?: number | null
  /* 回复的评论 ID */
  replyToId?: number | null
  /* 实际回复的根评论 ID */
  actualReplyToId?: number | null
  /* 是否隐藏 */
  isHidden: boolean
  /* 审核状态 */
  auditStatus: 0 | 1 | 2
  /* 审核人 ID */
  auditById?: number | null
  /* 审核角色（0=版主, 1=管理员） */
  auditRole?: number | null
  /* 审核原因 */
  auditReason?: string | null
  /* 审核时间 */
  auditAt?: string | null
  /* 点赞数 */
  likeCount: number
  /* 敏感词命中记录 */
  sensitiveWordHits?: any[] | null
  /* 评论作者信息 */
  user?: AdminCommentUserDto

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminCommentUserDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type AdminCommentUserDto = {
  /* 主键id */
  id: number
  /* 昵称 */
  nickname: string
  /* 头像URL */
  avatarUrl?: string | null
  /* 是否启用 */
  isEnabled: boolean
  /* 用户状态 */
  status: 1 | 2 | 3 | 4 | 5

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminCommentDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type AdminCommentDetailDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 目标类型 */
  targetType: 1 | 2 | 3 | 4 | 5
  /* 目标 ID */
  targetId: number
  /* 评论用户 ID */
  userId: number
  /* 评论内容 */
  content: string
  /* 评论正文解析 token（EmojiParser 输出） */
  bodyTokens?: string | null
  /* 楼层号 */
  floor?: number | null
  /* 回复的评论 ID */
  replyToId?: number | null
  /* 实际回复的根评论 ID */
  actualReplyToId?: number | null
  /* 是否隐藏 */
  isHidden: boolean
  /* 审核状态 */
  auditStatus: 0 | 1 | 2
  /* 审核人 ID */
  auditById?: number | null
  /* 审核角色（0=版主, 1=管理员） */
  auditRole?: number | null
  /* 审核原因 */
  auditReason?: string | null
  /* 审核时间 */
  auditAt?: string | null
  /* 点赞数 */
  likeCount: number
  /* 敏感词命中记录 */
  sensitiveWordHits?: any[] | null
  /* 评论作者信息 */
  user?: AdminCommentUserDto
  /* 被回复评论简要信息 */
  replyTo?: AdminCommentReplyTargetDto

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminCommentReplyTargetDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type AdminCommentReplyTargetDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 评论用户 ID */
  userId: number
  /* 评论内容 */
  content: string
  /* 回复的评论 ID */
  replyToId?: number | null
  /* 实际回复的根评论 ID */
  actualReplyToId?: number | null
  /* 是否隐藏 */
  isHidden: boolean
  /* 审核状态 */
  auditStatus: 0 | 1 | 2
  /* 被回复评论的作者信息 */
  user?: AdminCommentUserDto

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateAdminCommentAuditStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type UpdateAdminCommentAuditStatusDto = {
  /* 主键id */
  id: number
  /* 审核状态 */
  auditStatus: 0 | 1 | 2
  /* 审核原因 */
  auditReason?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateAdminCommentHiddenDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type UpdateAdminCommentHiddenDto = {
  /* 主键id */
  id: number
  /* 是否隐藏 */
  isHidden: boolean

  /** 任意合法数值 */
  [property: string]: any
}