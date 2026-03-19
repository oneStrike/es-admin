/**
 *  类型定义 [TopicPageRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type TopicPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 审核状态（0=待审核, 1=已通过, 2=已拒绝） */
  auditStatus?: number

  /* 结束时间 */
  endDate?: null | string

  /* 是否精华 */
  isFeatured?: boolean

  /* 是否隐藏 */
  isHidden?: boolean

  /* 是否锁定 */
  isLocked?: boolean

  /* 是否置顶 */
  isPinned?: boolean

  /* 关键词搜索（标题或内容） */
  keyword?: null | string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码 */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 关联的板块ID */
  sectionId?: number

  /* 开始时间 */
  startDate?: null | string

  /* 用户ID */
  userId?: number
}

export type TopicPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseForumTopicDto[]

  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [TopicDetailRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type TopicDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type TopicDetailResponse = AdminForumTopicDetailDto

/**
 *  类型定义 [TopicCreateRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type TopicCreateRequest = CreateForumTopicDto

export type TopicCreateResponse = BaseForumTopicDto

/**
 *  类型定义 [TopicUpdateRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type TopicUpdateRequest = UpdateForumTopicDto

export type TopicUpdateResponse = BaseForumTopicDto

/**
 *  类型定义 [TopicDeleteRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type TopicDeleteRequest = IdDto

export type TopicDeleteResponse = BaseForumTopicDto

/**
 *  类型定义 [TopicUpdatePinnedRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type TopicUpdatePinnedRequest = UpdateForumTopicPinnedDto

export type TopicUpdatePinnedResponse = BaseForumTopicDto

/**
 *  类型定义 [TopicUpdateFeaturedRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type TopicUpdateFeaturedRequest = UpdateForumTopicFeaturedDto

export type TopicUpdateFeaturedResponse = BaseForumTopicDto

/**
 *  类型定义 [TopicUpdateLockedRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type TopicUpdateLockedRequest = UpdateForumTopicLockedDto

export type TopicUpdateLockedResponse = BaseForumTopicDto

/**
 *  类型定义 [TopicUpdateHiddenRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type TopicUpdateHiddenRequest = UpdateForumTopicHiddenDto

export type TopicUpdateHiddenResponse = BaseForumTopicDto

/**
 *  类型定义 [TopicUpdateAuditStatusRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type TopicUpdateAuditStatusRequest = UpdateForumTopicAuditStatusDto

export type TopicUpdateAuditStatusResponse = BaseForumTopicDto

/**
 *  类型定义 [TopicIncrementViewCountRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type TopicIncrementViewCountRequest = IdDto

export type TopicIncrementViewCountResponse = BaseForumTopicDto

/**
 *  类型定义 [BaseForumTopicDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type BaseForumTopicDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 审核时间 */
  auditAt?: null | string
  /* 关联的审核用户ID */
  auditById?: null | number
  /* 审核拒绝原因 */
  auditReason?: null | string
  /* 审核角色（0=版主, 1=管理员） */
  auditRole?: null | number
  /* 审核状态（0=待审核, 1=已通过, 2=已拒绝） */
  auditStatus: 0 | 1 | 2
  /* 评论次数 */
  commentCount: number
  /* 主题内容 */
  content: string
  /* 创建时间 */
  createdAt: string
  /* 删除时间 */
  deletedAt?: null | string
  /* 收藏次数 */
  favoriteCount: number
  /* 主键id */
  id: number
  /* 是否精华 */
  isFeatured: boolean
  /* 是否隐藏 */
  isHidden: boolean
  /* 是否锁定 */
  isLocked: boolean
  /* 是否置顶 */
  isPinned: boolean
  /* 最后回复时间 */
  lastReplyAt?: null | string
  /* 最后回复用户ID */
  lastReplyUserId?: null | number
  /* 点赞次数 */
  likeCount: number
  /* 回复次数 */
  replyCount: number
  /* 关联的板块ID */
  sectionId: number
  /* 敏感词命中记录 */
  sensitiveWordHits?: any[] | null
  /* 主题标题 */
  title: string
  /* 更新时间 */
  updatedAt: string
  /* 用户ID */
  userId: number
  /* 乐观锁版本号 */
  version: number

  /* 浏览次数 */
  viewCount: number
}

/**
 *  类型定义 [AdminForumTopicDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type AdminForumTopicDetailDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 审核时间 */
  auditAt?: null | string
  /* 审核拒绝原因 */
  auditReason?: null | string
  /* 审核状态（0=待审核, 1=已通过, 2=已拒绝） */
  auditStatus: 0 | 1 | 2
  /* 评论次数 */
  commentCount: number
  /* 主题内容 */
  content: string
  /* 创建时间 */
  createdAt: string
  /* 收藏次数 */
  favoriteCount: number
  /* 主键id */
  id: number
  /* 是否精华 */
  isFeatured: boolean
  /* 是否隐藏 */
  isHidden: boolean
  /* 是否锁定 */
  isLocked: boolean
  /* 是否置顶 */
  isPinned: boolean
  /* 最后回复时间 */
  lastReplyAt?: null | string
  /* 最后回复用户ID */
  lastReplyUserId?: null | number
  /* 点赞次数 */
  likeCount: number
  /* 回复次数 */
  replyCount: number
  /* 所属板块 */
  section: AdminForumTopicSectionDto
  /* 关联的板块ID */
  sectionId: number
  /* 敏感词命中记录 */
  sensitiveWordHits?: any[] | null
  /* 主题标题 */
  title: string
  /* 主题标签关联 */
  topicTags: AdminForumTopicTagRelationDto[]
  /* 更新时间 */
  updatedAt: string
  /* 发帖用户 */
  user: AdminForumTopicUserDto
  /* 用户ID */
  userId: number
  /* 乐观锁版本号 */
  version: number

  /* 浏览次数 */
  viewCount: number
}

/**
 *  类型定义 [AdminForumTopicTagRelationDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type AdminForumTopicTagRelationDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 创建时间 */
  createdAt: string
  /* 关联ID */
  id: number
  /* 标签ID */
  tagId: number

  /* 主题ID */
  topicId: number
}

/**
 *  类型定义 [AdminForumTopicSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type AdminForumTopicSectionDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 板块描述 */
  description?: null | string
  /* 板块图标 */
  icon?: null | string
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 板块名称 */
  name: string

  /* 审核策略 */
  topicReviewPolicy: 0 | 1 | 2 | 3 | 4
}

/**
 *  类型定义 [AdminForumTopicUserDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type AdminForumTopicUserDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 头像URL */
  avatarUrl?: null | string
  /* 封禁原因 */
  banReason?: null | string
  /* 封禁到期时间 */
  banUntil?: null | string
  /* 论坛画像 */
  forumProfile?: AdminForumTopicProfileDto
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 论坛等级 */
  level?: AdminForumTopicUserLevelDto
  /* 等级ID */
  levelId?: null | number
  /* 昵称 */
  nickname: string
  /* 积分 */
  points: number

  /* 用户状态 */
  status: 1 | 2 | 3 | 4 | 5
}

/**
 *  类型定义 [AdminForumTopicProfileDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type AdminForumTopicProfileDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 个人简介 */
  bio?: null | string
  /* 收藏数 */
  favoriteCount: number
  /* 主键id */
  id: number
  /* 点赞数 */
  likeCount: number
  /* 回复数 */
  replyCount: number
  /* 签名 */
  signature?: null | string
  /* 主题数 */
  topicCount: number

  /* 用户ID */
  userId: number
}

/**
 *  类型定义 [AdminForumTopicUserLevelDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type AdminForumTopicUserLevelDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 等级图标URL */
  icon?: null | string
  /* 主键id */
  id: number
  /* 等级名称 */
  name: string

  /* 排序值（数值越小越靠前） */
  sortOrder: number
}

/**
 *  类型定义 [CreateForumTopicDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type CreateForumTopicDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主题内容 */
  content: string
  /* 关联的板块ID */
  sectionId: number
  /* 主题标题 */
  title: string

  /* 用户ID */
  userId: number
}

/**
 *  类型定义 [UpdateForumTopicDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UpdateForumTopicDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主题内容 */
  content?: string
  /* 主键id */
  id: number

  /* 主题标题 */
  title?: string
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

/**
 *  类型定义 [UpdateForumTopicPinnedDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UpdateForumTopicPinnedDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 是否置顶 */
  isPinned: boolean
}

/**
 *  类型定义 [UpdateForumTopicFeaturedDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UpdateForumTopicFeaturedDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 是否精华 */
  isFeatured: boolean
}

/**
 *  类型定义 [UpdateForumTopicLockedDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UpdateForumTopicLockedDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 是否锁定 */
  isLocked: boolean
}

/**
 *  类型定义 [UpdateForumTopicHiddenDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UpdateForumTopicHiddenDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 是否隐藏 */
  isHidden: boolean
}

/**
 *  类型定义 [UpdateForumTopicAuditStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UpdateForumTopicAuditStatusDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 审核拒绝原因 */
  auditReason?: null | string
  /* 审核状态（0=待审核, 1=已通过, 2=已拒绝） */
  auditStatus: 0 | 1 | 2

  /* 主键id */
  id: number
}