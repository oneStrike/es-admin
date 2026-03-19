/**
 *  类型定义 [NovelChapterCreateRequest]
 *  @来源 内容管理/小说章节
 *  @更新时间 2026-03-19 23:58:08
 */
export type NovelChapterCreateRequest = CreateWorkChapterDto

export type NovelChapterCreateResponse = IdDto

/**
 *  类型定义 [NovelChapterPageRequest]
 *  @来源 内容管理/小说章节
 *  @更新时间 2026-03-19 23:58:08
 */
export type NovelChapterPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 是否允许评论 */
  canComment?: boolean

  /* 是否允许下载 */
  canDownload?: boolean

  /* 结束时间 */
  endDate?: null | string

  /* 是否试读 */
  isPreview?: boolean

  /* 是否发布 */
  isPublished?: boolean

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码 */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 章节标题 */
  title?: string

  /* 查看规则（-1=INHERIT，INHERIT=-1，0=ALL，1=LOGGED_IN，2=MEMBER，3=PURCHASE） */
  viewRule?: number

  /* 作品ID */
  workId: number
}

export type NovelChapterPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: IdDto[]

  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [NovelChapterDetailRequest]
 *  @来源 内容管理/小说章节
 *  @更新时间 2026-03-19 23:58:08
 */
export type NovelChapterDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type NovelChapterDetailResponse = IdDto

/**
 *  类型定义 [NovelChapterUpdateRequest]
 *  @来源 内容管理/小说章节
 *  @更新时间 2026-03-19 23:58:08
 */
export type NovelChapterUpdateRequest = UpdateWorkChapterDto

export type NovelChapterUpdateResponse = IdDto

/**
 *  类型定义 [NovelChapterDeleteRequest]
 *  @来源 内容管理/小说章节
 *  @更新时间 2026-03-19 23:58:08
 */
export type NovelChapterDeleteRequest = IdDto

export type NovelChapterDeleteResponse = IdDto

/**
 *  类型定义 [NovelChapterSwapSortOrderRequest]
 *  @来源 内容管理/小说章节
 *  @更新时间 2026-03-19 23:58:08
 */
export type NovelChapterSwapSortOrderRequest = DragReorderDto

export type NovelChapterSwapSortOrderResponse = DragReorderDto

/**
 *  类型定义 [CreateWorkChapterDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type CreateWorkChapterDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 是否允许评论 */
  canComment: boolean
  /* 是否允许下载 */
  canDownload: boolean
  /* 章节内容 */
  content?: null | string
  /* 章节封面 */
  cover?: null | string
  /* 章节简介 */
  description?: null | string
  /* 是否试读 */
  isPreview: boolean
  /* 发布状态 */
  isPublished?: boolean | null
  /* 章节价格 */
  price: number
  /* 发布时间 */
  publishAt?: null | string
  /* 备注 */
  remark?: null | string
  /* 阅读所需会员等级ID */
  requiredViewLevelId?: null | number
  /* 排序值 */
  sortOrder: number
  /* 章节副标题 */
  subtitle?: null | string
  /* 章节标题 */
  title: string
  /* 查看规则（-1=INHERIT，INHERIT=-1，0=ALL，1=LOGGED_IN，2=MEMBER，3=PURCHASE） */
  viewRule: -1 | 0 | 1 | 2 | 3
  /* 作品ID */
  workId: number

  /* 作品类型 */
  workType: number
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
 *  类型定义 [UpdateWorkChapterDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type UpdateWorkChapterDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 是否允许评论 */
  canComment?: boolean
  /* 是否允许下载 */
  canDownload?: boolean
  /* 章节内容 */
  content?: null | string
  /* 章节封面 */
  cover?: null | string
  /* 章节简介 */
  description?: null | string
  /* 主键id */
  id: number
  /* 是否试读 */
  isPreview?: boolean
  /* 发布状态 */
  isPublished?: boolean | null
  /* 章节价格 */
  price?: number
  /* 发布时间 */
  publishAt?: null | string
  /* 备注 */
  remark?: null | string
  /* 阅读所需会员等级ID */
  requiredViewLevelId?: null | number
  /* 排序值 */
  sortOrder?: number
  /* 章节副标题 */
  subtitle?: null | string
  /* 章节标题 */
  title?: string
  /* 查看规则（-1=INHERIT，INHERIT=-1，0=ALL，1=LOGGED_IN，2=MEMBER，3=PURCHASE） */
  viewRule?: -1 | 0 | 1 | 2 | 3
  /* 作品ID */
  workId?: number

  /* 作品类型 */
  workType?: number
}

/**
 *  类型定义 [DragReorderDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type DragReorderDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 当前拖拽元素的id */
  dragId: number

  /* 拖拽的目标位置id */
  targetId: number
}