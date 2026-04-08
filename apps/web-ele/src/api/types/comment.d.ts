/**
 *  类型定义 [CommentPageRequest]
 *  @来源 内容治理/评论处理
 *  @更新时间 2026-04-08 20:46:16
 */
export type CommentPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 实际回复的根评论 ID */
  actualReplyToId?: null | number

  /* 审核状态 */
  auditStatus?: number

  /* 结束时间 */
  endDate?: null | string

  /* 主键id */
  id?: number

  /* 是否隐藏 */
  isHidden?: boolean

  /* 关键词搜索（评论内容） */
  keyword?: null | string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 回复的评论 ID */
  replyToId?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 目标 ID */
  targetId?: number

  /* 目标类型 */
  targetType?: number

  /* 评论用户 ID */
  userId?: number
}

export type CommentPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: AdminCommentPageItemDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [CommentDetailRequest]
 *  @来源 内容治理/评论处理
 *  @更新时间 2026-04-08 20:46:16
 */
export type CommentDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type CommentDetailResponse = AdminCommentDetailDto

/**
 *  类型定义 [CommentUpdateAuditStatusRequest]
 *  @来源 内容治理/评论处理
 *  @更新时间 2026-04-08 20:46:16
 */
export type CommentUpdateAuditStatusRequest = UpdateAdminCommentAuditStatusDto

export type CommentUpdateAuditStatusResponse = boolean

/**
 *  类型定义 [CommentUpdateHiddenRequest]
 *  @来源 内容治理/评论处理
 *  @更新时间 2026-04-08 20:46:16
 */
export type CommentUpdateHiddenRequest = UpdateAdminCommentHiddenDto

export type CommentUpdateHiddenResponse = boolean

/**
 *  类型定义 [AdminCommentPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 20:46:16
 */
export type AdminCommentPageItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 实际回复的根评论 ID */
  actualReplyToId?: null | number
  /* 审核时间 */
  auditAt?: null | string
  /* 审核人 ID */
  auditById?: null | number
  /* 审核原因 */
  auditReason?: null | string
  /* 审核角色（0=版主, 1=管理员） */
  auditRole?: null | number
  /* 审核状态 */
  auditStatus: 0 | 1 | 2
  /* 评论正文解析 token（EmojiParser 输出） */
  bodyTokens?: null | string
  /* 评论内容 */
  content: string
  /* 创建时间 */
  createdAt: string
  /* 楼层号 */
  floor?: null | number
  /* 主键id */
  id: number
  /* 是否隐藏 */
  isHidden: boolean
  /* 点赞数 */
  likeCount: number
  /* 回复的评论 ID */
  replyToId?: null | number
  /* 敏感词命中记录 */
  sensitiveWordHits?: any[] | null
  /* 目标 ID */
  targetId: number
  /* 目标类型 */
  targetType: 1 | 2 | 3 | 4 | 5
  /* 更新时间 */
  updatedAt: string
  /* 评论作者信息 */
  user?: AdminCommentUserDto

  /* 评论用户 ID */
  userId: number
}

/**
 *  类型定义 [AdminCommentUserDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 20:46:16
 */
export type AdminCommentUserDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 头像URL */
  avatarUrl?: null | string
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 昵称 */
  nickname: string

  /* 用户状态 */
  status: 1 | 2 | 3 | 4 | 5
}

/**
 *  类型定义 [AdminCommentDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 20:46:16
 */
export type AdminCommentDetailDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 实际回复的根评论 ID */
  actualReplyToId?: null | number
  /* 审核时间 */
  auditAt?: null | string
  /* 审核人 ID */
  auditById?: null | number
  /* 审核原因 */
  auditReason?: null | string
  /* 审核角色（0=版主, 1=管理员） */
  auditRole?: null | number
  /* 审核状态 */
  auditStatus: 0 | 1 | 2
  /* 评论正文解析 token（EmojiParser 输出） */
  bodyTokens?: null | string
  /* 评论内容 */
  content: string
  /* 创建时间 */
  createdAt: string
  /* 楼层号 */
  floor?: null | number
  /* 主键id */
  id: number
  /* 是否隐藏 */
  isHidden: boolean
  /* 点赞数 */
  likeCount: number
  /* 被回复评论简要信息 */
  replyTo?: AdminCommentReplyTargetDto
  /* 回复的评论 ID */
  replyToId?: null | number
  /* 敏感词命中记录 */
  sensitiveWordHits?: any[] | null
  /* 目标 ID */
  targetId: number
  /* 目标类型 */
  targetType: 1 | 2 | 3 | 4 | 5
  /* 更新时间 */
  updatedAt: string
  /* 评论作者信息 */
  user?: AdminCommentUserDto

  /* 评论用户 ID */
  userId: number
}

/**
 *  类型定义 [AdminCommentReplyTargetDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 20:46:16
 */
export type AdminCommentReplyTargetDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 实际回复的根评论 ID */
  actualReplyToId?: null | number
  /* 审核状态 */
  auditStatus: 0 | 1 | 2
  /* 评论内容 */
  content: string
  /* 创建时间 */
  createdAt: string
  /* 主键id */
  id: number
  /* 是否隐藏 */
  isHidden: boolean
  /* 回复的评论 ID */
  replyToId?: null | number
  /* 被回复评论的作者信息 */
  user?: AdminCommentUserDto

  /* 评论用户 ID */
  userId: number
}

/**
 *  类型定义 [UpdateAdminCommentAuditStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 20:46:16
 */
export type UpdateAdminCommentAuditStatusDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 审核原因 */
  auditReason?: null | string
  /* 审核状态 */
  auditStatus: 0 | 1 | 2

  /* 主键id */
  id: number
}

/**
 *  类型定义 [UpdateAdminCommentHiddenDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 20:46:16
 */
export type UpdateAdminCommentHiddenDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 是否隐藏 */
  isHidden: boolean
}