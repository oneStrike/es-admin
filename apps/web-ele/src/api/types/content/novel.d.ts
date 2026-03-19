/**
 *  类型定义 [NovelCreateRequest]
 *  @来源 内容管理/小说管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type NovelCreateRequest = CreateWorkDto

export type NovelCreateResponse = IdDto

/**
 *  类型定义 [NovelPageRequest]
 *  @来源 内容管理/小说管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type NovelPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 年龄分级 */
  ageRating?: null | string

  /* 作者名称 */
  author?: null | string

  /* 结束时间 */
  endDate?: null | string

  /* 是否热门 */
  isHot?: boolean

  /* 是否新作 */
  isNew?: boolean

  /* 是否发布 */
  isPublished?: boolean

  /* 是否推荐 */
  isRecommended?: boolean

  /* 语言代码 */
  language?: string

  /* 作品名称 */
  name?: string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码 */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 出版社 */
  publisher?: null | string

  /* 地区代码 */
  region?: string

  /* 连载状态（0=NOT_STARTED，1=SERIALIZING，2=COMPLETED，3=PAUSED，4=DISCONTINUED） */
  serialStatus?: number

  /* 开始时间 */
  startDate?: null | string

  /* 标签ID列表 */
  tagIds?: any[] | null
}

export type NovelPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseWorkDto[]

  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [NovelDetailRequest]
 *  @来源 内容管理/小说管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type NovelDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type NovelDetailResponse = BaseWorkDto

/**
 *  类型定义 [NovelUpdateRequest]
 *  @来源 内容管理/小说管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type NovelUpdateRequest = UpdateWorkDto

export type NovelUpdateResponse = IdDto

/**
 *  类型定义 [NovelUpdateStatusRequest]
 *  @来源 内容管理/小说管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type NovelUpdateStatusRequest = UpdateWorkStatusDto

export type NovelUpdateStatusResponse = BatchOperationResponseDto

/**
 *  类型定义 [NovelUpdateRecommendedRequest]
 *  @来源 内容管理/小说管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type NovelUpdateRecommendedRequest = UpdateWorkRecommendedDto

export type NovelUpdateRecommendedResponse = BatchOperationResponseDto

/**
 *  类型定义 [NovelUpdateHotRequest]
 *  @来源 内容管理/小说管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type NovelUpdateHotRequest = UpdateWorkHotDto

export type NovelUpdateHotResponse = BatchOperationResponseDto

/**
 *  类型定义 [NovelUpdateNewRequest]
 *  @来源 内容管理/小说管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type NovelUpdateNewRequest = UpdateWorkNewDto

export type NovelUpdateNewResponse = BatchOperationResponseDto

/**
 *  类型定义 [NovelDeleteRequest]
 *  @来源 内容管理/小说管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type NovelDeleteRequest = IdDto

export type NovelDeleteResponse = IdDto

/**
 *  类型定义 [CreateWorkDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type CreateWorkDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 年龄分级 */
  ageRating?: null | string
  /* 作品别名 */
  alias?: null | string
  /* 作者ID列表 */
  authorIds: number[]
  /* 是否允许评论 */
  canComment: boolean
  /* 分类ID列表 */
  categoryIds: number[]
  /* 章节默认价格 */
  chapterPrice: number
  /* 版权信息 */
  copyright?: null | string
  /* 作品封面 */
  cover: string
  /* 作品简介 */
  description: string
  /* 免责声明 */
  disclaimer?: null | string
  /* 是否热门 */
  isHot: boolean
  /* 是否新作 */
  isNew: boolean
  /* 是否发布 */
  isPublished: boolean
  /* 是否推荐 */
  isRecommended: boolean
  /* 语言代码 */
  language: string
  /* 最近更新时间 */
  lastUpdated?: null | string
  /* 作品名称 */
  name: string
  /* 原始来源 */
  originalSource?: null | string
  /* 发布日期 */
  publishAt?: null | string
  /* 出版社 */
  publisher?: null | string
  /* 评分 */
  rating?: null | number
  /* 推荐权重 */
  recommendWeight: number
  /* 地区代码 */
  region: string
  /* 备注 */
  remark?: null | string
  /* 阅读所需会员等级ID */
  requiredViewLevelId?: null | number
  /* 连载状态（0=NOT_STARTED，1=SERIALIZING，2=COMPLETED，3=PAUSED，4=DISCONTINUED） */
  serialStatus: 0 | 1 | 2 | 3 | 4
  /* 标签ID列表 */
  tagIds: number[]
  /* 作品类型（1=COMIC，2=NOVEL） */
  type: 1 | 2

  /* 查看规则（-1=INHERIT，INHERIT=-1，0=ALL，1=LOGGED_IN，2=MEMBER，3=PURCHASE） */
  viewRule: -1 | 0 | 1 | 2 | 3
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

/**
 *  类型定义 [BaseWorkDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type BaseWorkDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 年龄分级 */
  ageRating?: null | string
  /* 作品别名 */
  alias?: null | string
  /* 是否允许评论 */
  canComment: boolean
  /* 章节默认价格 */
  chapterPrice: number
  /* 评论数 */
  commentCount: number
  /* 版权信息 */
  copyright?: null | string
  /* 作品封面 */
  cover: string
  /* 创建时间 */
  createdAt: string
  /* 删除时间 */
  deletedAt?: null | string
  /* 作品简介 */
  description: string
  /* 免责声明 */
  disclaimer?: null | string
  /* 下载数 */
  downloadCount: number
  /* 收藏数 */
  favoriteCount: number
  /* 论坛板块ID */
  forumSectionId?: null | number
  /* 主键id */
  id: number
  /* 是否热门 */
  isHot: boolean
  /* 是否新作 */
  isNew: boolean
  /* 是否发布 */
  isPublished: boolean
  /* 是否推荐 */
  isRecommended: boolean
  /* 语言代码 */
  language: string
  /* 最近更新时间 */
  lastUpdated?: null | string
  /* 点赞数 */
  likeCount: number
  /* 作品名称 */
  name: string
  /* 原始来源 */
  originalSource?: null | string
  /* 热度值 */
  popularity: number
  /* 发布日期 */
  publishAt?: null | string
  /* 出版社 */
  publisher?: null | string
  /* 评分 */
  rating?: null | number
  /* 评分人数 */
  ratingCount: number
  /* 推荐权重 */
  recommendWeight: number
  /* 地区代码 */
  region: string
  /* 备注 */
  remark?: null | string
  /* 阅读所需会员等级ID */
  requiredViewLevelId?: null | number
  /* 连载状态（0=NOT_STARTED，1=SERIALIZING，2=COMPLETED，3=PAUSED，4=DISCONTINUED） */
  serialStatus: 0 | 1 | 2 | 3 | 4
  /* 作品类型（1=COMIC，2=NOVEL） */
  type: 1 | 2
  /* 更新时间 */
  updatedAt: string
  /* 浏览量 */
  viewCount: number

  /* 查看规则（-1=INHERIT，INHERIT=-1，0=ALL，1=LOGGED_IN，2=MEMBER，3=PURCHASE） */
  viewRule: -1 | 0 | 1 | 2 | 3
}

/**
 *  类型定义 [UpdateWorkDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type UpdateWorkDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 年龄分级 */
  ageRating?: null | string
  /* 作品别名 */
  alias?: null | string
  /* 作者ID列表 */
  authorIds?: number[]
  /* 是否允许评论 */
  canComment?: boolean
  /* 分类ID列表 */
  categoryIds?: number[]
  /* 章节默认价格 */
  chapterPrice?: number
  /* 版权信息 */
  copyright?: null | string
  /* 作品封面 */
  cover?: string
  /* 作品简介 */
  description?: string
  /* 免责声明 */
  disclaimer?: null | string
  /* 主键id */
  id: number
  /* 是否热门 */
  isHot?: boolean
  /* 是否新作 */
  isNew?: boolean
  /* 是否发布 */
  isPublished?: boolean
  /* 是否推荐 */
  isRecommended?: boolean
  /* 语言代码 */
  language?: string
  /* 最近更新时间 */
  lastUpdated?: null | string
  /* 作品名称 */
  name?: string
  /* 原始来源 */
  originalSource?: null | string
  /* 发布日期 */
  publishAt?: null | string
  /* 出版社 */
  publisher?: null | string
  /* 评分 */
  rating?: null | number
  /* 推荐权重 */
  recommendWeight?: number
  /* 地区代码 */
  region?: string
  /* 备注 */
  remark?: null | string
  /* 阅读所需会员等级ID */
  requiredViewLevelId?: null | number
  /* 连载状态（0=NOT_STARTED，1=SERIALIZING，2=COMPLETED，3=PAUSED，4=DISCONTINUED） */
  serialStatus?: 0 | 1 | 2 | 3 | 4
  /* 标签ID列表 */
  tagIds?: number[]
  /* 作品类型（1=COMIC，2=NOVEL） */
  type?: 1 | 2

  /* 查看规则（-1=INHERIT，INHERIT=-1，0=ALL，1=LOGGED_IN，2=MEMBER，3=PURCHASE） */
  viewRule?: -1 | 0 | 1 | 2 | 3
}

/**
 *  类型定义 [UpdateWorkStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type UpdateWorkStatusDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 是否发布 */
  isPublished: boolean
}

/**
 *  类型定义 [BatchOperationResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type BatchOperationResponseDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 操作成功的数据量 */
  count: number
}

/**
 *  类型定义 [UpdateWorkRecommendedDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type UpdateWorkRecommendedDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 是否推荐 */
  isRecommended: boolean
}

/**
 *  类型定义 [UpdateWorkHotDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type UpdateWorkHotDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 是否热门 */
  isHot: boolean
}

/**
 *  类型定义 [UpdateWorkNewDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type UpdateWorkNewDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 是否新作 */
  isNew: boolean
}