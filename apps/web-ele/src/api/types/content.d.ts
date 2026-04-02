/**
 *  类型定义 [ContentComicCreateRequest]
 *  @来源 内容管理/漫画管理/基础信息
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicCreateRequest = CreateWorkDto

export type ContentComicCreateResponse = boolean

/**
 *  类型定义 [ContentComicPageRequest]
 *  @来源 内容管理/漫画管理/基础信息
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 年龄分级 */
  ageRating?: null | string

  /* 作者名称 */
  author?: null | string

  /* 作者ID */
  authorId?: null | number

  /* 分类ID列表 */
  categoryIds?: any[] | null

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

  /* 当前页码（从1开始） */
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

export type ContentComicPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: PageWorkDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ContentComicDetailRequest]
 *  @来源 内容管理/漫画管理/基础信息
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type ContentComicDetailResponse = BaseWorkDto

/**
 *  类型定义 [ContentComicUpdateRequest]
 *  @来源 内容管理/漫画管理/基础信息
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicUpdateRequest = UpdateWorkDto

export type ContentComicUpdateResponse = boolean

/**
 *  类型定义 [ContentComicUpdateStatusRequest]
 *  @来源 内容管理/漫画管理/基础信息
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicUpdateStatusRequest = UpdateWorkStatusDto

export type ContentComicUpdateStatusResponse = boolean

/**
 *  类型定义 [ContentComicUpdateRecommendedRequest]
 *  @来源 内容管理/漫画管理/基础信息
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicUpdateRecommendedRequest = UpdateWorkRecommendedDto

export type ContentComicUpdateRecommendedResponse = boolean

/**
 *  类型定义 [ContentComicUpdateHotRequest]
 *  @来源 内容管理/漫画管理/基础信息
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicUpdateHotRequest = UpdateWorkHotDto

export type ContentComicUpdateHotResponse = boolean

/**
 *  类型定义 [ContentComicUpdateNewRequest]
 *  @来源 内容管理/漫画管理/基础信息
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicUpdateNewRequest = UpdateWorkNewDto

export type ContentComicUpdateNewResponse = boolean

/**
 *  类型定义 [ContentComicDeleteRequest]
 *  @来源 内容管理/漫画管理/基础信息
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicDeleteRequest = IdDto

export type ContentComicDeleteResponse = boolean

/**
 *  类型定义 [ContentComicChapterCreateRequest]
 *  @来源 内容管理/漫画管理/章节管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicChapterCreateRequest = CreateWorkChapterDto

export type ContentComicChapterCreateResponse = boolean

/**
 *  类型定义 [ContentComicChapterPageRequest]
 *  @来源 内容管理/漫画管理/章节管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicChapterPageRequest = {
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

  /* 当前页码（从1开始） */
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

export type ContentComicChapterPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: IdDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ContentComicChapterDetailRequest]
 *  @来源 内容管理/漫画管理/章节管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicChapterDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type ContentComicChapterDetailResponse = IdDto

/**
 *  类型定义 [ContentComicChapterUpdateRequest]
 *  @来源 内容管理/漫画管理/章节管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicChapterUpdateRequest = UpdateWorkChapterDto

export type ContentComicChapterUpdateResponse = boolean

/**
 *  类型定义 [ContentComicChapterDeleteRequest]
 *  @来源 内容管理/漫画管理/章节管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicChapterDeleteRequest = IdDto

export type ContentComicChapterDeleteResponse = boolean

/**
 *  类型定义 [ContentComicChapterSwapSortOrderRequest]
 *  @来源 内容管理/漫画管理/章节管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicChapterSwapSortOrderRequest = DragReorderDto

export type ContentComicChapterSwapSortOrderResponse = boolean

/**
 *  类型定义 [ContentComicChapterContentListRequest]
 *  @来源 内容管理/漫画管理/章节内容
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicChapterContentListRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type ContentComicChapterContentListResponse = string[]

/**
 *  类型定义 [ContentComicChapterContentUploadRequest]
 *  @来源 内容管理/漫画管理/章节内容
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicChapterContentUploadRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 章节ID */
  chapterId: number

  /* 作品ID */
  workId: number
}

export type ContentComicChapterContentUploadResponse = UploadResponseDto

/**
 *  类型定义 [ContentComicChapterContentUpdateRequest]
 *  @来源 内容管理/漫画管理/章节内容
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicChapterContentUpdateRequest = UpdateComicContentDto

export type ContentComicChapterContentUpdateResponse = boolean

/**
 *  类型定义 [ContentComicChapterContentDeleteRequest]
 *  @来源 内容管理/漫画管理/章节内容
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicChapterContentDeleteRequest = DeleteComicContentDto

export type ContentComicChapterContentDeleteResponse = boolean

/**
 *  类型定义 [ContentComicChapterContentMoveRequest]
 *  @来源 内容管理/漫画管理/章节内容
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicChapterContentMoveRequest = MoveComicContentDto

export type ContentComicChapterContentMoveResponse = boolean

/**
 *  类型定义 [ContentComicChapterContentClearRequest]
 *  @来源 内容管理/漫画管理/章节内容
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicChapterContentClearRequest = IdDto

export type ContentComicChapterContentClearResponse = boolean

/**
 *  类型定义 [ContentComicChapterContentArchivePreviewRequest]
 *  @来源 内容管理/漫画管理/章节内容
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicChapterContentArchivePreviewRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 单章节压缩包对应的章节ID */
  chapterId?: null | number

  /* 作品ID */
  workId: number
}

export type ContentComicChapterContentArchivePreviewResponse = ComicArchiveTaskResponseDto

/**
 *  类型定义 [ContentComicChapterContentArchiveConfirmRequest]
 *  @来源 内容管理/漫画管理/章节内容
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicChapterContentArchiveConfirmRequest = ConfirmComicArchiveDto

export type ContentComicChapterContentArchiveConfirmResponse = boolean

/**
 *  类型定义 [ContentComicChapterContentArchiveDetailRequest]
 *  @来源 内容管理/漫画管理/章节内容
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicChapterContentArchiveDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 导入任务ID */
  taskId: string
}

export type ContentComicChapterContentArchiveDetailResponse = ComicArchiveTaskResponseDto

export type ContentComicThirdPartyPlatformListResponse = PlatformResponseDto[]

/**
 *  类型定义 [ContentComicThirdPartySearchPageRequest]
 *  @来源 内容管理/漫画管理/三方平台解析
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicThirdPartySearchPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 搜索关键词 */
  keyword: string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 平台代码 */
  platform: string

  /* 开始时间 */
  startDate?: null | string
}

export type ContentComicThirdPartySearchPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: SearchComicItemDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ContentComicThirdPartyDetailRequest]
 *  @来源 内容管理/漫画管理/三方平台解析
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicThirdPartyDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 漫画ID */
  comicId: string

  /* 平台代码 */
  platform: string
}

export type ContentComicThirdPartyDetailResponse = undefined

/**
 *  类型定义 [ContentComicThirdPartyChapterListRequest]
 *  @来源 内容管理/漫画管理/三方平台解析
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicThirdPartyChapterListRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 漫画ID */
  comicId: string

  /* 平台代码 */
  platform: string
}

export type ContentComicThirdPartyChapterListResponse = Record<string, any>[]

/**
 *  类型定义 [ContentComicThirdPartyChapterContentDetailRequest]
 *  @来源 内容管理/漫画管理/三方平台解析
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentComicThirdPartyChapterContentDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 章节ID */
  chapterId: string

  /* 漫画ID */
  comicId: string

  /* 平台代码 */
  platform: string
}

export type ContentComicThirdPartyChapterContentDetailResponse = undefined

/**
 *  类型定义 [ContentNovelCreateRequest]
 *  @来源 内容管理/小说管理/基础信息
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentNovelCreateRequest = CreateWorkDto

export type ContentNovelCreateResponse = boolean

/**
 *  类型定义 [ContentNovelPageRequest]
 *  @来源 内容管理/小说管理/基础信息
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentNovelPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 年龄分级 */
  ageRating?: null | string

  /* 作者名称 */
  author?: null | string

  /* 作者ID */
  authorId?: null | number

  /* 分类ID列表 */
  categoryIds?: any[] | null

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

  /* 当前页码（从1开始） */
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

export type ContentNovelPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseWorkDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ContentNovelDetailRequest]
 *  @来源 内容管理/小说管理/基础信息
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentNovelDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type ContentNovelDetailResponse = BaseWorkDto

/**
 *  类型定义 [ContentNovelUpdateRequest]
 *  @来源 内容管理/小说管理/基础信息
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentNovelUpdateRequest = UpdateWorkDto

export type ContentNovelUpdateResponse = boolean

/**
 *  类型定义 [ContentNovelUpdateStatusRequest]
 *  @来源 内容管理/小说管理/基础信息
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentNovelUpdateStatusRequest = UpdateWorkStatusDto

export type ContentNovelUpdateStatusResponse = boolean

/**
 *  类型定义 [ContentNovelUpdateRecommendedRequest]
 *  @来源 内容管理/小说管理/基础信息
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentNovelUpdateRecommendedRequest = UpdateWorkRecommendedDto

export type ContentNovelUpdateRecommendedResponse = boolean

/**
 *  类型定义 [ContentNovelUpdateHotRequest]
 *  @来源 内容管理/小说管理/基础信息
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentNovelUpdateHotRequest = UpdateWorkHotDto

export type ContentNovelUpdateHotResponse = boolean

/**
 *  类型定义 [ContentNovelUpdateNewRequest]
 *  @来源 内容管理/小说管理/基础信息
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentNovelUpdateNewRequest = UpdateWorkNewDto

export type ContentNovelUpdateNewResponse = boolean

/**
 *  类型定义 [ContentNovelDeleteRequest]
 *  @来源 内容管理/小说管理/基础信息
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentNovelDeleteRequest = IdDto

export type ContentNovelDeleteResponse = boolean

/**
 *  类型定义 [ContentNovelChapterCreateRequest]
 *  @来源 内容管理/小说管理/章节管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentNovelChapterCreateRequest = CreateWorkChapterDto

export type ContentNovelChapterCreateResponse = boolean

/**
 *  类型定义 [ContentNovelChapterPageRequest]
 *  @来源 内容管理/小说管理/章节管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentNovelChapterPageRequest = {
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

  /* 当前页码（从1开始） */
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

export type ContentNovelChapterPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: IdDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ContentNovelChapterDetailRequest]
 *  @来源 内容管理/小说管理/章节管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentNovelChapterDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type ContentNovelChapterDetailResponse = IdDto

/**
 *  类型定义 [ContentNovelChapterUpdateRequest]
 *  @来源 内容管理/小说管理/章节管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentNovelChapterUpdateRequest = UpdateWorkChapterDto

export type ContentNovelChapterUpdateResponse = boolean

/**
 *  类型定义 [ContentNovelChapterDeleteRequest]
 *  @来源 内容管理/小说管理/章节管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentNovelChapterDeleteRequest = IdDto

export type ContentNovelChapterDeleteResponse = boolean

/**
 *  类型定义 [ContentNovelChapterSwapSortOrderRequest]
 *  @来源 内容管理/小说管理/章节管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentNovelChapterSwapSortOrderRequest = DragReorderDto

export type ContentNovelChapterSwapSortOrderResponse = boolean

/**
 *  类型定义 [ContentNovelChapterContentDetailRequest]
 *  @来源 内容管理/小说管理/章节内容
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentNovelChapterContentDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type ContentNovelChapterContentDetailResponse = string

/**
 *  类型定义 [ContentNovelChapterContentUploadRequest]
 *  @来源 内容管理/小说管理/章节内容
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentNovelChapterContentUploadRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 章节ID */
  chapterId: number

  /* 作品ID */
  workId: number
}

export type ContentNovelChapterContentUploadResponse = UploadResponseDto

/**
 *  类型定义 [ContentNovelChapterContentDeleteRequest]
 *  @来源 内容管理/小说管理/章节内容
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentNovelChapterContentDeleteRequest = IdDto

export type ContentNovelChapterContentDeleteResponse = boolean

/**
 *  类型定义 [ContentAuthorCreateRequest]
 *  @来源 内容管理/作者管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentAuthorCreateRequest = CreateAuthorDto

export type ContentAuthorCreateResponse = boolean

/**
 *  类型定义 [ContentAuthorPageRequest]
 *  @来源 内容管理/作者管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentAuthorPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 性别（0: 未知, 1: 男性, 2: 女性, 3: 其他）（2=FEMALE，1=MALE，3=OTHER，4=SECRET，0=UNKNOWN） */
  gender?: number

  /* 启用状态（true: 启用, false: 禁用） */
  isEnabled?: boolean

  /* 是否为推荐作者（用于前台推荐展示） */
  isRecommended?: boolean

  /* 作者姓名 */
  name?: string

  /* 国籍 */
  nationality?: null | string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 作者角色类型 */
  type?: null | string
}

export type ContentAuthorPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: AuthorPageResponseDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ContentAuthorDetailRequest]
 *  @来源 内容管理/作者管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentAuthorDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type ContentAuthorDetailResponse = BaseAuthorDto

/**
 *  类型定义 [ContentAuthorUpdateRequest]
 *  @来源 内容管理/作者管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentAuthorUpdateRequest = UpdateAuthorDto

export type ContentAuthorUpdateResponse = boolean

/**
 *  类型定义 [ContentAuthorUpdateStatusRequest]
 *  @来源 内容管理/作者管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentAuthorUpdateStatusRequest = UpdateAuthorStatusDto

export type ContentAuthorUpdateStatusResponse = boolean

/**
 *  类型定义 [ContentAuthorUpdateRecommendedRequest]
 *  @来源 内容管理/作者管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentAuthorUpdateRecommendedRequest = UpdateAuthorRecommendedDto

export type ContentAuthorUpdateRecommendedResponse = boolean

/**
 *  类型定义 [ContentAuthorRebuildFollowCountRequest]
 *  @来源 内容管理/作者管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentAuthorRebuildFollowCountRequest = IdDto

export type ContentAuthorRebuildFollowCountResponse = AuthorFollowCountRepairResultDto

export type ContentAuthorRebuildFollowCountAllResponse = boolean

/**
 *  类型定义 [ContentAuthorRebuildWorkCountRequest]
 *  @来源 内容管理/作者管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentAuthorRebuildWorkCountRequest = IdDto

export type ContentAuthorRebuildWorkCountResponse = AuthorWorkCountRepairResultDto

export type ContentAuthorRebuildWorkCountAllResponse = boolean

/**
 *  类型定义 [ContentAuthorDeleteRequest]
 *  @来源 内容管理/作者管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentAuthorDeleteRequest = IdDto

export type ContentAuthorDeleteResponse = boolean

/**
 *  类型定义 [ContentCategoryCreateRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentCategoryCreateRequest = CreateCategoryDto

export type ContentCategoryCreateResponse = boolean

/**
 *  类型定义 [ContentCategoryPageRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentCategoryPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 分类关联的内容类型 */
  contentType?: null | string

  /* 结束时间 */
  endDate?: null | string

  /* 是否启用 */
  isEnabled?: boolean

  /* 分类名称 */
  name?: string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string
}

export type ContentCategoryPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseCategoryDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ContentCategoryDetailRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentCategoryDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type ContentCategoryDetailResponse = BaseCategoryDto

/**
 *  类型定义 [ContentCategoryUpdateRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentCategoryUpdateRequest = UpdateCategoryDto

export type ContentCategoryUpdateResponse = boolean

/**
 *  类型定义 [ContentCategoryUpdateStatusRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentCategoryUpdateStatusRequest = UpdateCategoryStatusDto

export type ContentCategoryUpdateStatusResponse = boolean

/**
 *  类型定义 [ContentCategoryDeleteRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentCategoryDeleteRequest = IdDto

export type ContentCategoryDeleteResponse = boolean

/**
 *  类型定义 [ContentCategorySwapSortOrderRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentCategorySwapSortOrderRequest = UpdateCategorySortDto

export type ContentCategorySwapSortOrderResponse = boolean

/**
 *  类型定义 [ContentTagCreateRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentTagCreateRequest = CreateTagDto

export type ContentTagCreateResponse = boolean

/**
 *  类型定义 [ContentTagPageRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentTagPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 是否启用 */
  isEnabled?: boolean | null

  /* 标签名称 */
  name?: string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string
}

export type ContentTagPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseTagDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ContentTagDetailRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentTagDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type ContentTagDetailResponse = BaseTagDto

/**
 *  类型定义 [ContentTagUpdateRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentTagUpdateRequest = UpdateTagDto

export type ContentTagUpdateResponse = boolean

/**
 *  类型定义 [ContentTagUpdateStatusRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentTagUpdateStatusRequest = UpdateEnabledStatusDto

export type ContentTagUpdateStatusResponse = boolean

/**
 *  类型定义 [ContentTagDeleteRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentTagDeleteRequest = IdDto

export type ContentTagDeleteResponse = boolean

/**
 *  类型定义 [ContentTagSwapSortOrderRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentTagSwapSortOrderRequest = DragReorderDto

export type ContentTagSwapSortOrderResponse = boolean

/**
 *  类型定义 [ContentEmojiPackPageRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentEmojiPackPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 表情包编码 */
  code?: string

  /* 结束时间 */
  endDate?: null | string

  /* 启用状态 */
  isEnabled?: boolean

  /* 表情包名称 */
  name?: string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 是否在选择器可见 */
  visibleInPicker?: boolean
}

export type ContentEmojiPackPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseEmojiPackDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ContentEmojiPackDetailRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentEmojiPackDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type ContentEmojiPackDetailResponse = BaseEmojiPackDto

/**
 *  类型定义 [ContentEmojiPackCreateRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentEmojiPackCreateRequest = CreateEmojiPackDto

export type ContentEmojiPackCreateResponse = boolean

/**
 *  类型定义 [ContentEmojiPackUpdateRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentEmojiPackUpdateRequest = UpdateEmojiPackDto

export type ContentEmojiPackUpdateResponse = boolean

/**
 *  类型定义 [ContentEmojiPackDeleteRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentEmojiPackDeleteRequest = IdDto

export type ContentEmojiPackDeleteResponse = boolean

/**
 *  类型定义 [ContentEmojiPackUpdateEnabledRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentEmojiPackUpdateEnabledRequest = UpdateEnabledStatusDto

export type ContentEmojiPackUpdateEnabledResponse = boolean

/**
 *  类型定义 [ContentEmojiPackSwapSortOrderRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentEmojiPackSwapSortOrderRequest = DragReorderDto

export type ContentEmojiPackSwapSortOrderResponse = boolean

/**
 *  类型定义 [ContentEmojiPackUpdateSceneTypeRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentEmojiPackUpdateSceneTypeRequest = UpdateEmojiPackSceneTypeDto

export type ContentEmojiPackUpdateSceneTypeResponse = boolean

/**
 *  类型定义 [ContentEmojiAssetPageRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentEmojiAssetPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 分类 */
  category?: null | string

  /* 结束时间 */
  endDate?: null | string

  /* 启用状态 */
  isEnabled?: boolean

  /* 资源类型（1=unicode,2=custom） */
  kind?: number

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 表情包ID */
  packId?: number

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 短码（custom 必填） */
  shortcode?: null | string

  /* 开始时间 */
  startDate?: null | string
}

export type ContentEmojiAssetPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseEmojiAssetDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ContentEmojiAssetDetailRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentEmojiAssetDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type ContentEmojiAssetDetailResponse = BaseEmojiAssetDto

/**
 *  类型定义 [ContentEmojiAssetCreateRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentEmojiAssetCreateRequest = CreateEmojiAssetDto

export type ContentEmojiAssetCreateResponse = boolean

/**
 *  类型定义 [ContentEmojiAssetUpdateRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentEmojiAssetUpdateRequest = UpdateEmojiAssetDto

export type ContentEmojiAssetUpdateResponse = boolean

/**
 *  类型定义 [ContentEmojiAssetDeleteRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentEmojiAssetDeleteRequest = IdDto

export type ContentEmojiAssetDeleteResponse = boolean

/**
 *  类型定义 [ContentEmojiAssetUpdateEnabledRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentEmojiAssetUpdateEnabledRequest = UpdateEnabledStatusDto

export type ContentEmojiAssetUpdateEnabledResponse = boolean

/**
 *  类型定义 [ContentEmojiAssetSwapSortOrderRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-04-02 13:36:25
 */
export type ContentEmojiAssetSwapSortOrderRequest = DragReorderDto

export type ContentEmojiAssetSwapSortOrderResponse = boolean

/**
 *  类型定义 [CreateWorkDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
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
 *  类型定义 [PageWorkDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type PageWorkDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 年龄分级 */
  ageRating?: null | string
  /* 作者列表 */
  authors: AuthorInfoDto[]
  /* 分类列表 */
  categories: CategoryInfoDto[]
  /* 作品封面 */
  cover: string
  /* 创建时间 */
  createdAt: string
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
  /* 作品名称 */
  name: string
  /* 热度值 */
  popularity: number
  /* 发布日期 */
  publishAt?: null | string
  /* 出版社 */
  publisher?: null | string
  /* 地区代码 */
  region: string
  /* 连载状态（0=NOT_STARTED，1=SERIALIZING，2=COMPLETED，3=PAUSED，4=DISCONTINUED） */
  serialStatus: 0 | 1 | 2 | 3 | 4
  /* 标签列表 */
  tags: TagInfoDto[]
  /* 作品类型（1=COMIC，2=NOVEL） */
  type: 1 | 2

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [AuthorInfoDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type AuthorInfoDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 作者头像URL */
  avatar?: null | string
  /* 主键id */
  id: number
  /* 作者姓名 */
  name: string

  /* 作者角色类型，1 => 漫画家 2 => 小说家 */
  type?: any[] | null
}

/**
 *  类型定义 [CategoryInfoDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type CategoryInfoDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 分类图标URL */
  icon?: null | string
  /* 主键id */
  id: number

  /* 分类名称 */
  name: string
}

/**
 *  类型定义 [TagInfoDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type TagInfoDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 标签图标URL */
  icon?: null | string
  /* 主键id */
  id: number

  /* 标签名称 */
  name: string
}

/**
 *  类型定义 [BaseWorkDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
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
 *  @更新时间 2026-04-02 13:36:25
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
 *  @更新时间 2026-04-02 13:36:25
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
 *  类型定义 [UpdateWorkRecommendedDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
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
 *  @更新时间 2026-04-02 13:36:25
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
 *  @更新时间 2026-04-02 13:36:25
 */
export type UpdateWorkNewDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 是否新作 */
  isNew: boolean
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

/**
 *  类型定义 [CreateWorkChapterDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
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
 *  类型定义 [UpdateWorkChapterDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
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
 *  @更新时间 2026-04-02 13:36:25
 */
export type DragReorderDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 当前拖拽元素的id */
  dragId: number

  /* 拖拽的目标位置id */
  targetId: number
}

/**
 *  类型定义 [UploadResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type UploadResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 文件名 */
  filename: string
  /* 文件路径 */
  filePath: string
  /* 文件大小 */
  fileSize: number
  /* 文件扩展名 */
  fileType: string
  /* 文件 MIME 类型 */
  mimeType: string
  /* 原始文件名 */
  originalName: string
  /* 文件场景 */
  scene: string

  /* 上传时间 */
  uploadTime: string
}

/**
 *  类型定义 [UpdateComicContentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type UpdateComicContentDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 章节ID */
  chapterId: number
  /* 内容路径 */
  content: string

  /* 内容索引 */
  index: number
}

/**
 *  类型定义 [DeleteComicContentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type DeleteComicContentDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 章节ID */
  chapterId: number

  /* 内容索引列表 */
  index: number[]
}

/**
 *  类型定义 [MoveComicContentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type MoveComicContentDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 章节ID */
  chapterId: number
  /* 源索引 */
  fromIndex: number

  /* 目标索引 */
  toIndex: number
}

/**
 *  类型定义 [ComicArchiveTaskResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type ComicArchiveTaskResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 任务过期时间 */
  expiresAt: string
  /* 完成处理时间 */
  finishedAt?: null | string
  /* 被忽略的路径列表 */
  ignoredItems: ComicArchiveIgnoredItemDto[]
  /* 最后一次错误信息 */
  lastError?: null | string
  /* 匹配成功的章节列表 */
  matchedItems: ComicArchiveMatchedItemDto[]
  /* 预解析模式 */
  mode: string
  /* 是否需要用户确认 */
  requireConfirm: boolean
  /* 正式导入结果列表 */
  resultItems: ComicArchiveResultItemDto[]
  /* 开始处理时间 */
  startedAt?: null | string
  /* 任务状态 */
  status: string
  /* 预解析汇总信息 */
  summary: ComicArchiveSummaryDto
  /* 导入任务ID */
  taskId: string

  /* 作品ID */
  workId: number
}

/**
 *  类型定义 [ComicArchiveMatchedItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type ComicArchiveMatchedItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 章节ID */
  chapterId: number
  /* 章节标题 */
  chapterTitle: string
  /* 章节当前已有图片数量 */
  existingImageCount: number
  /* 章节当前是否已有内容 */
  hasExistingContent: boolean
  /* 压缩包内图片数量 */
  imageCount: number
  /* 导入模式 */
  importMode: string
  /* 匹配结果说明 */
  message: string
  /* 匹配来源路径 */
  path: string

  /* 覆盖提示信息 */
  warningMessage: string
}

/**
 *  类型定义 [ComicArchiveIgnoredItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type ComicArchiveIgnoredItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 友好提示信息 */
  message: string
  /* 被忽略的路径 */
  path: string

  /* 忽略原因码 */
  reason: number
}

/**
 *  类型定义 [ComicArchiveResultItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type ComicArchiveResultItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 章节ID */
  chapterId: number
  /* 章节标题 */
  chapterTitle: string
  /* 已导入图片数量 */
  importedImageCount: number
  /* 执行结果说明 */
  message: string

  /* 执行状态 */
  status: string
}

/**
 *  类型定义 [ComicArchiveSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type ComicArchiveSummaryDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 忽略项数量 */
  ignoredItemCount: number
  /* 有效图片总数 */
  imageCount: number

  /* 可导入章节数 */
  matchedChapterCount: number
}

/**
 *  类型定义 [ConfirmComicArchiveDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type ConfirmComicArchiveDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 用户确认要导入的章节ID列表 */
  confirmedChapterIds: number[]

  /* 导入任务ID */
  taskId: string
}

/**
 *  类型定义 [PlatformResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type PlatformResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 平台名称code */
  code: string

  /* 平台名称 */
  name: string
}

/**
 *  类型定义 [SearchComicItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type SearchComicItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 作者列表 */
  author: string[]
  /* 封面图片URL */
  cover: string
  /* 主键id */
  id: number
  /* 漫画名称 */
  name: string

  /* 来源平台 */
  source: string
}

/**
 *  类型定义 [CreateAuthorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type CreateAuthorDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 作者头像URL */
  avatar?: null | string
  /* 删除时间 */
  deletedAt?: null | string
  /* 作者描述 */
  description?: null | string
  /* 性别（0: 未知, 1: 男性, 2: 女性, 3: 其他）（2=FEMALE，1=MALE，3=OTHER，4=SECRET，0=UNKNOWN） */
  gender: 0 | 1 | 2 | 3 | 4
  /* 作者姓名 */
  name: string
  /* 国籍 */
  nationality?: null | string
  /* 管理员备注 */
  remark?: null | string

  /* 作者角色类型，1 => 漫画家 2 => 小说家 */
  type?: any[] | null
}

/**
 *  类型定义 [AuthorPageResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type AuthorPageResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 作者头像URL */
  avatar?: null | string
  /* 创建时间 */
  createdAt: string
  /* 删除时间 */
  deletedAt?: null | string
  /* 粉丝数量（冗余字段，用于前台展示） */
  followersCount: number
  /* 性别（0: 未知, 1: 男性, 2: 女性, 3: 其他）（2=FEMALE，1=MALE，3=OTHER，4=SECRET，0=UNKNOWN） */
  gender: 0 | 1 | 2 | 3 | 4
  /* 主键id */
  id: number
  /* 启用状态（true: 启用, false: 禁用） */
  isEnabled: boolean
  /* 是否为推荐作者（用于前台推荐展示） */
  isRecommended: boolean
  /* 作者姓名 */
  name: string
  /* 国籍 */
  nationality?: null | string
  /* 作者角色类型，1 => 漫画家 2 => 小说家 */
  type?: any[] | null
  /* 更新时间 */
  updatedAt: string

  /* 作品数量（冗余字段，用于提升查询性能） */
  workCount: number
}

/**
 *  类型定义 [BaseAuthorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type BaseAuthorDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 作者头像URL */
  avatar?: null | string
  /* 创建时间 */
  createdAt: string
  /* 删除时间 */
  deletedAt?: null | string
  /* 作者描述 */
  description?: null | string
  /* 粉丝数量（冗余字段，用于前台展示） */
  followersCount: number
  /* 性别（0: 未知, 1: 男性, 2: 女性, 3: 其他）（2=FEMALE，1=MALE，3=OTHER，4=SECRET，0=UNKNOWN） */
  gender: 0 | 1 | 2 | 3 | 4
  /* 主键id */
  id: number
  /* 启用状态（true: 启用, false: 禁用） */
  isEnabled: boolean
  /* 是否为推荐作者（用于前台推荐展示） */
  isRecommended: boolean
  /* 作者姓名 */
  name: string
  /* 国籍 */
  nationality?: null | string
  /* 管理员备注 */
  remark?: null | string
  /* 作者角色类型，1 => 漫画家 2 => 小说家 */
  type?: any[] | null
  /* 更新时间 */
  updatedAt: string

  /* 作品数量（冗余字段，用于提升查询性能） */
  workCount: number
}

/**
 *  类型定义 [UpdateAuthorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type UpdateAuthorDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 作者头像URL */
  avatar?: null | string
  /* 删除时间 */
  deletedAt?: null | string
  /* 作者描述 */
  description?: null | string
  /* 性别（0: 未知, 1: 男性, 2: 女性, 3: 其他）（2=FEMALE，1=MALE，3=OTHER，4=SECRET，0=UNKNOWN） */
  gender: 0 | 1 | 2 | 3 | 4
  /* 主键id */
  id: number
  /* 作者姓名 */
  name: string
  /* 国籍 */
  nationality?: null | string
  /* 管理员备注 */
  remark?: null | string

  /* 作者角色类型，1 => 漫画家 2 => 小说家 */
  type?: any[] | null
}

/**
 *  类型定义 [UpdateAuthorStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type UpdateAuthorStatusDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 启用状态（true: 启用, false: 禁用） */
  isEnabled: boolean
}

/**
 *  类型定义 [UpdateAuthorRecommendedDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type UpdateAuthorRecommendedDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 是否为推荐作者（用于前台推荐展示） */
  isRecommended: boolean
}

/**
 *  类型定义 [AuthorFollowCountRepairResultDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type AuthorFollowCountRepairResultDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 粉丝数量（冗余字段，用于前台展示） */
  followersCount: number

  /* 主键id */
  id: number
}

/**
 *  类型定义 [AuthorWorkCountRepairResultDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type AuthorWorkCountRepairResultDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 作品数量（冗余字段，用于提升查询性能） */
  workCount: number
}

/**
 *  类型定义 [CreateCategoryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type CreateCategoryDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 分类关联的内容类型 */
  contentType?: any[] | null
  /* 分类的描述 （可选） */
  description?: null | string
  /* 分类图标URL */
  icon?: null | string
  /* 是否启用 */
  isEnabled: boolean
  /* 分类名称 */
  name: string

  /* 排序值 */
  sortOrder: number
}

/**
 *  类型定义 [BaseCategoryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type BaseCategoryDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 分类关联的内容类型 */
  contentType?: any[] | null
  /* 创建时间 */
  createdAt: string
  /* 分类的描述 （可选） */
  description?: null | string
  /* 分类图标URL */
  icon?: null | string
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 分类名称 */
  name: string
  /* 人气值 */
  popularity: number
  /* 排序值 */
  sortOrder: number

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [UpdateCategoryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type UpdateCategoryDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 分类关联的内容类型 */
  contentType?: any[] | null
  /* 分类的描述 （可选） */
  description?: null | string
  /* 分类图标URL */
  icon?: null | string
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 分类名称 */
  name: string

  /* 排序值 */
  sortOrder: number
}

/**
 *  类型定义 [UpdateCategoryStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type UpdateCategoryStatusDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 是否启用 */
  isEnabled: boolean
}

/**
 *  类型定义 [UpdateCategorySortDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type UpdateCategorySortDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 当前拖拽元素的id */
  dragId: number

  /* 拖拽的目标位置id */
  targetId: number
}

/**
 *  类型定义 [CreateTagDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type CreateTagDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 标签描述 */
  description?: null | string
  /* 标签图标URL */
  icon?: null | string
  /* 标签名称 */
  name: string

  /* 排序值 */
  sortOrder?: null | number
}

/**
 *  类型定义 [BaseTagDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type BaseTagDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 创建时间 */
  createdAt: string
  /* 标签描述 */
  description?: null | string
  /* 标签图标URL */
  icon?: null | string
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled?: boolean | null
  /* 标签名称 */
  name: string
  /* 人气值 */
  popularity?: null | number
  /* 排序值 */
  sortOrder?: null | number

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [UpdateTagDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type UpdateTagDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 标签描述 */
  description?: null | string
  /* 标签图标URL */
  icon?: null | string
  /* 主键id */
  id: number
  /* 标签名称 */
  name: string

  /* 排序值 */
  sortOrder?: null | number
}

/**
 *  类型定义 [UpdateEnabledStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type UpdateEnabledStatusDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 状态 true启用 false禁用 */
  isEnabled: boolean
}

/**
 *  类型定义 [BaseEmojiPackDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type BaseEmojiPackDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 表情包编码 */
  code: string
  /* 创建时间 */
  createdAt: string
  /* 创建人ID */
  createdById?: null | number
  /* 删除时间 */
  deletedAt?: null | string
  /* 描述 */
  description?: null | string
  /* 图标地址 */
  iconUrl?: null | string
  /* 主键id */
  id: number
  /* 启用状态 */
  isEnabled: boolean
  /* 表情包名称 */
  name: string
  /* 场景类型（1=聊天,2=评论,3=论坛主题） */
  sceneType: 1 | 2 | 3[]
  /* 排序值 */
  sortOrder: number
  /* 更新时间 */
  updatedAt: string
  /* 更新人ID */
  updatedById?: null | number

  /* 是否在选择器可见 */
  visibleInPicker: boolean
}

/**
 *  类型定义 [CreateEmojiPackDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type CreateEmojiPackDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 表情包编码 */
  code: string
  /* 描述 */
  description?: null | string
  /* 图标地址 */
  iconUrl?: null | string
  /* 启用状态 */
  isEnabled: boolean
  /* 表情包名称 */
  name: string
  /* 场景类型（1=聊天,2=评论,3=论坛主题） */
  sceneType: 1 | 2 | 3[]
  /* 排序值 */
  sortOrder: number

  /* 是否在选择器可见 */
  visibleInPicker: boolean
}

/**
 *  类型定义 [UpdateEmojiPackDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type UpdateEmojiPackDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 表情包编码 */
  code?: string
  /* 描述 */
  description?: null | string
  /* 图标地址 */
  iconUrl?: null | string
  /* 主键id */
  id: number
  /* 启用状态 */
  isEnabled?: boolean
  /* 表情包名称 */
  name?: string
  /* 场景类型（1=聊天,2=评论,3=论坛主题） */
  sceneType?: 1 | 2 | 3[]
  /* 排序值 */
  sortOrder?: number

  /* 是否在选择器可见 */
  visibleInPicker?: boolean
}

/**
 *  类型定义 [UpdateEmojiPackSceneTypeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type UpdateEmojiPackSceneTypeDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 场景类型（1=聊天,2=评论,3=论坛主题） */
  sceneType: 1 | 2 | 3[]
}

/**
 *  类型定义 [BaseEmojiAssetDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type BaseEmojiAssetDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 分类 */
  category?: null | string
  /* 创建时间 */
  createdAt: string
  /* 创建人ID */
  createdById?: null | number
  /* 删除时间 */
  deletedAt?: null | string
  /* 主键id */
  id: number
  /* 资源地址（custom 必填） */
  imageUrl?: null | string
  /* 是否动图 */
  isAnimated: boolean
  /* 启用状态 */
  isEnabled: boolean
  /* 关键词（多语言） */
  keywords?: null | string
  /* 资源类型（1=unicode,2=custom） */
  kind: 1 | 2
  /* 表情包ID */
  packId: number
  /* 短码（custom 必填） */
  shortcode?: null | string
  /* 排序值 */
  sortOrder: number
  /* 静态资源地址 */
  staticUrl?: null | string
  /* Unicode 序列（unicode 必填） */
  unicodeSequence?: null | string
  /* 更新时间 */
  updatedAt: string

  /* 更新人ID */
  updatedById?: null | number
}

/**
 *  类型定义 [CreateEmojiAssetDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type CreateEmojiAssetDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 分类 */
  category?: null | string
  /* 资源地址（custom 必填） */
  imageUrl?: null | string
  /* 是否动图 */
  isAnimated: boolean
  /* 启用状态 */
  isEnabled: boolean
  /* 关键词（多语言） */
  keywords?: null | string
  /* 资源类型（1=unicode,2=custom） */
  kind: 1 | 2
  /* 表情包ID */
  packId: number
  /* 短码（custom 必填） */
  shortcode?: null | string
  /* 排序值 */
  sortOrder: number
  /* 静态资源地址 */
  staticUrl?: null | string

  /* Unicode 序列（unicode 必填） */
  unicodeSequence?: null | string
}

/**
 *  类型定义 [UpdateEmojiAssetDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 13:36:25
 */
export type UpdateEmojiAssetDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 分类 */
  category?: null | string
  /* 主键id */
  id: number
  /* 资源地址（custom 必填） */
  imageUrl?: null | string
  /* 是否动图 */
  isAnimated?: boolean
  /* 启用状态 */
  isEnabled?: boolean
  /* 关键词（多语言） */
  keywords?: null | string
  /* 资源类型（1=unicode,2=custom） */
  kind?: 1 | 2
  /* 表情包ID */
  packId?: number
  /* 短码（custom 必填） */
  shortcode?: null | string
  /* 排序值 */
  sortOrder?: number
  /* 静态资源地址 */
  staticUrl?: null | string

  /* Unicode 序列（unicode 必填） */
  unicodeSequence?: null | string
}