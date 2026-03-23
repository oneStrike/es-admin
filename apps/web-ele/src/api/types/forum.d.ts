/**
 *  类型定义 [ForumModeratorsPageRequest]
 *  @来源 论坛管理/版主管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumModeratorsPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 是否启用 */
  isEnabled?: boolean

  /* 用户名 */
  nickname?: null | string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从0开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 板块ID */
  sectionId?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 用户id */
  userId?: number
}

export type ForumModeratorsPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: ForumModeratorDto[]

  /* 当前页码（从0开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ForumModeratorsCreateRequest]
 *  @来源 论坛管理/版主管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumModeratorsCreateRequest = CreateForumModeratorDto

export type ForumModeratorsCreateResponse = boolean

/**
 *  类型定义 [ForumModeratorsUpdateRequest]
 *  @来源 论坛管理/版主管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumModeratorsUpdateRequest = UpdateForumModeratorDto

export type ForumModeratorsUpdateResponse = boolean

/**
 *  类型定义 [ForumModeratorsDeleteRequest]
 *  @来源 论坛管理/版主管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumModeratorsDeleteRequest = IdDto

export type ForumModeratorsDeleteResponse = boolean

/**
 *  类型定义 [ForumModeratorsAssignSectionRequest]
 *  @来源 论坛管理/版主管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumModeratorsAssignSectionRequest = AssignForumModeratorSectionDto

export type ForumModeratorsAssignSectionResponse = boolean

/**
 *  类型定义 [ForumModeratorApplicationPageRequest]
 *  @来源 论坛管理/版主申请
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumModeratorApplicationPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 申请人用户ID */
  applicantId?: number

  /* 结束时间 */
  endDate?: null | string

  /* 申请人昵称 */
  nickname?: null | string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从0开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 申请板块ID */
  sectionId?: number

  /* 开始时间 */
  startDate?: null | string

  /* 申请状态（0=PENDING，1=APPROVED，2=REJECTED） */
  status?: number
}

export type ForumModeratorApplicationPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: ForumModeratorApplicationDto[]

  /* 当前页码（从0开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ForumModeratorApplicationDetailRequest]
 *  @来源 论坛管理/版主申请
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumModeratorApplicationDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type ForumModeratorApplicationDetailResponse = ForumModeratorApplicationDto

/**
 *  类型定义 [ForumModeratorApplicationAuditRequest]
 *  @来源 论坛管理/版主申请
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumModeratorApplicationAuditRequest = AuditForumModeratorApplicationDto

export type ForumModeratorApplicationAuditResponse = boolean

/**
 *  类型定义 [ForumModeratorApplicationDeleteRequest]
 *  @来源 论坛管理/版主申请
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumModeratorApplicationDeleteRequest = IdDto

export type ForumModeratorApplicationDeleteResponse = boolean

/**
 *  类型定义 [ForumSearchPageRequest]
 *  @来源 论坛管理/搜索
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSearchPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 搜索关键词 */
  keyword: string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从0开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 板块ID */
  sectionId?: null | number

  /* 排序类型（latest=LATEST，hot=HOT，relevance=RELEVANCE） */
  sort?: null | string

  /* 开始时间 */
  startDate?: null | string

  /* 标签ID */
  tagId?: null | number

  /* 搜索类型（topic=TOPIC，reply=REPLY，all=ALL） */
  type?: null | string
}

export type ForumSearchPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: ForumSearchResultDto[]

  /* 当前页码（从0开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ForumSensitiveWordPageRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSensitiveWordPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 是否启用 */
  isEnabled?: boolean

  /* 敏感词级别（1=SEVERE，2=GENERAL，3=LIGHT） */
  level?: number

  /* 匹配模式（1=EXACT，2=FUZZY，3=REGEX） */
  matchMode?: number

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从0开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 敏感词类型（1=POLITICS，2=PORN，3=VIOLENCE，4=AD，5=OTHER） */
  type?: number

  /* 敏感词 */
  word?: string
}

export type ForumSensitiveWordPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseSensitiveWordDto[]

  /* 当前页码（从0开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ForumSensitiveWordCreateRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSensitiveWordCreateRequest = CreateSensitiveWordDto

export type ForumSensitiveWordCreateResponse = boolean

/**
 *  类型定义 [ForumSensitiveWordUpdateRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSensitiveWordUpdateRequest = UpdateSensitiveWordDto

export type ForumSensitiveWordUpdateResponse = boolean

/**
 *  类型定义 [ForumSensitiveWordDeleteRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSensitiveWordDeleteRequest = IdDto

export type ForumSensitiveWordDeleteResponse = boolean

/**
 *  类型定义 [ForumSensitiveWordUpdateStatusRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSensitiveWordUpdateStatusRequest = UpdateEnabledStatusDto

export type ForumSensitiveWordUpdateStatusResponse = boolean

/**
 *  类型定义 [ForumSensitiveWordDetectRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSensitiveWordDetectRequest = SensitiveWordDetectDto

export type ForumSensitiveWordDetectResponse = SensitiveWordDetectResponseDto

/**
 *  类型定义 [ForumSensitiveWordStatsRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSensitiveWordStatsRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 统计类型（level=LEVEL，type=TYPE，topHits=TOP_HITS，recentHits=RECENT_HITS） */
  type?: null | string
}

export type ForumSensitiveWordStatsResponse = SensitiveWordStatisticsResponseDto

export type ForumSensitiveWordStatsFullResponse = SensitiveWordStatisticsDataDto

/**
 *  类型定义 [ForumSensitiveWordReplaceRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSensitiveWordReplaceRequest = SensitiveWordReplaceDto

export type ForumSensitiveWordReplaceResponse = SensitiveWordReplaceResponseDto

/**
 *  类型定义 [ForumSensitiveWordDetectHighestLevelRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSensitiveWordDetectHighestLevelRequest = SensitiveWordDetectDto

export type ForumSensitiveWordDetectHighestLevelResponse = SensitiveWordHighestLevelResponseDto

export type ForumSensitiveWordDetectStatusResponse = SensitiveWordDetectStatusResponseDto

export type ForumSensitiveWordCountResponse = SensitiveWordCountResponseDto

/**
 *  类型定义 [ForumTopicPageRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumTopicPageRequest = {
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

  /* 当前页码（从0开始） */
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

export type ForumTopicPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseForumTopicDto[]

  /* 当前页码（从0开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ForumTopicDetailRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumTopicDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type ForumTopicDetailResponse = AdminForumTopicDetailDto

/**
 *  类型定义 [ForumTopicCreateRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumTopicCreateRequest = CreateForumTopicDto

export type ForumTopicCreateResponse = boolean

/**
 *  类型定义 [ForumTopicUpdateRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumTopicUpdateRequest = UpdateForumTopicDto

export type ForumTopicUpdateResponse = boolean

/**
 *  类型定义 [ForumTopicDeleteRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumTopicDeleteRequest = IdDto

export type ForumTopicDeleteResponse = boolean

/**
 *  类型定义 [ForumTopicUpdatePinnedRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumTopicUpdatePinnedRequest = UpdateForumTopicPinnedDto

export type ForumTopicUpdatePinnedResponse = boolean

/**
 *  类型定义 [ForumTopicUpdateFeaturedRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumTopicUpdateFeaturedRequest = UpdateForumTopicFeaturedDto

export type ForumTopicUpdateFeaturedResponse = boolean

/**
 *  类型定义 [ForumTopicUpdateLockedRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumTopicUpdateLockedRequest = UpdateForumTopicLockedDto

export type ForumTopicUpdateLockedResponse = boolean

/**
 *  类型定义 [ForumTopicUpdateHiddenRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumTopicUpdateHiddenRequest = UpdateForumTopicHiddenDto

export type ForumTopicUpdateHiddenResponse = boolean

/**
 *  类型定义 [ForumTopicUpdateAuditStatusRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumTopicUpdateAuditStatusRequest = UpdateForumTopicAuditStatusDto

export type ForumTopicUpdateAuditStatusResponse = boolean

/**
 *  类型定义 [ForumTopicIncrementViewCountRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumTopicIncrementViewCountRequest = IdDto

export type ForumTopicIncrementViewCountResponse = boolean

/**
 *  类型定义 [ForumSectionsPageRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSectionsPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 板块分组ID（为空表示未分组） */
  groupId?: null | number

  /* 是否启用 */
  isEnabled?: boolean

  /* 板块名称 */
  name?: string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从0开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 审核策略（0=NONE，1=SEVERE_SENSITIVE_WORD，2=GENERAL_SENSITIVE_WORD，3=MILD_SENSITIVE_WORD，4=MANUAL） */
  topicReviewPolicy?: number
}

export type ForumSectionsPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseForumSectionDto[]

  /* 当前页码（从0开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ForumSectionsDetailRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSectionsDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type ForumSectionsDetailResponse = BaseForumSectionDto

export type ForumSectionsTreeResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 响应状态码 */
  code?: number

  /* 响应消息 */
  message?: string
}

/**
 *  类型定义 [ForumSectionsCreateRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSectionsCreateRequest = CreateForumSectionDto

export type ForumSectionsCreateResponse = boolean

/**
 *  类型定义 [ForumSectionsUpdateRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSectionsUpdateRequest = UpdateForumSectionDto

export type ForumSectionsUpdateResponse = boolean

/**
 *  类型定义 [ForumSectionsDeleteRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSectionsDeleteRequest = IdDto

export type ForumSectionsDeleteResponse = boolean

/**
 *  类型定义 [ForumSectionsUpdateEnabledRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSectionsUpdateEnabledRequest = UpdateEnabledStatusDto

export type ForumSectionsUpdateEnabledResponse = boolean

/**
 *  类型定义 [ForumSectionsSwapSortOrderRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSectionsSwapSortOrderRequest = DragReorderDto

export type ForumSectionsSwapSortOrderResponse = boolean

/**
 *  类型定义 [ForumSectionGroupsPageRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSectionGroupsPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 是否启用 */
  isEnabled?: boolean

  /* 分组名称 */
  name?: string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从0开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string
}

export type ForumSectionGroupsPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseForumSectionGroupDto[]

  /* 当前页码（从0开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ForumSectionGroupsDetailRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSectionGroupsDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type ForumSectionGroupsDetailResponse = BaseForumSectionGroupDto

/**
 *  类型定义 [ForumSectionGroupsCreateRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSectionGroupsCreateRequest = CreateForumSectionGroupDto

export type ForumSectionGroupsCreateResponse = boolean

/**
 *  类型定义 [ForumSectionGroupsUpdateRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSectionGroupsUpdateRequest = UpdateForumSectionGroupDto

export type ForumSectionGroupsUpdateResponse = boolean

/**
 *  类型定义 [ForumSectionGroupsDeleteRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSectionGroupsDeleteRequest = IdDto

export type ForumSectionGroupsDeleteResponse = boolean

/**
 *  类型定义 [ForumSectionGroupsUpdateEnabledRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSectionGroupsUpdateEnabledRequest = UpdateEnabledStatusDto

export type ForumSectionGroupsUpdateEnabledResponse = boolean

/**
 *  类型定义 [ForumSectionGroupsSwapSortOrderRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSectionGroupsSwapSortOrderRequest = DragReorderDto

export type ForumSectionGroupsSwapSortOrderResponse = boolean

/**
 *  类型定义 [ForumTagsPageRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumTagsPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 是否启用 */
  isEnabled?: boolean

  /* 标签名称 */
  name?: string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从0开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string
}

export type ForumTagsPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseForumTagDto[]

  /* 当前页码（从0开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ForumTagsDetailRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumTagsDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type ForumTagsDetailResponse = ForumTagDetailResponseDto

/**
 *  类型定义 [ForumTagsPopularListRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumTagsPopularListRequest = {
  
  /** 任意合法数值 */
  [property: string]: any

  limit: number
}

export type ForumTagsPopularListResponse = BaseForumTagDto[]

export type ForumTagsEnabledListResponse = BaseForumTagDto[]

/**
 *  类型定义 [ForumTagsTopicTagListRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumTagsTopicTagListRequest = {
  
  /** 任意合法数值 */
  [property: string]: any

  topicId: number
}

export type ForumTagsTopicTagListResponse = BaseForumTagDto[]

/**
 *  类型定义 [ForumTagsCreateRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumTagsCreateRequest = CreateForumTagDto

export type ForumTagsCreateResponse = boolean

/**
 *  类型定义 [ForumTagsUpdateRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumTagsUpdateRequest = UpdateForumTagDto

export type ForumTagsUpdateResponse = boolean

/**
 *  类型定义 [ForumTagsDeleteRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumTagsDeleteRequest = IdDto

export type ForumTagsDeleteResponse = boolean

/**
 *  类型定义 [ForumTagsAssignTopicRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumTagsAssignTopicRequest = AssignForumTagToTopicDto

export type ForumTagsAssignTopicResponse = boolean

/**
 *  类型定义 [ForumTagsUnassignTopicRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumTagsUnassignTopicRequest = RemoveForumTagFromTopicDto

export type ForumTagsUnassignTopicResponse = boolean

/**
 *  类型定义 [ForumModeratorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumModeratorDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 头像 */
  avatar?: null | string
  /* 创建时间 */
  createdAt: string
  /* 删除时间 */
  deletedAt?: null | string
  /* 所属分组 */
  group?: ForumModeratorGroupDto
  /* 分组ID（分组版主时使用） */
  groupId?: null | number
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 昵称 */
  nickname: string
  /* 权限名称列表 */
  permissionNames: string[]
  /* 权限列表 */
  permissions: number[]
  /* 备注 */
  remark?: null | string
  /* 版主角色类型（1=SUPER，2=GROUP，3=SECTION） */
  roleType: 1 | 2 | 3
  /* 管理的板块列表 */
  sections: ForumModeratorSectionItemDto[]
  /* 更新时间 */
  updatedAt: string

  /* 用户id */
  userId: number
}

/**
 *  类型定义 [ForumModeratorGroupDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumModeratorGroupDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 分组ID */
  id: number

  /* 分组名称 */
  name: string
}

/**
 *  类型定义 [ForumModeratorSectionItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumModeratorSectionItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 板块自定义权限 */
  customPermissions: number[]
  /* 板块最终生效权限 */
  finalPermissions: number[]
  /* 板块ID */
  id: number
  /* 是否继承基础权限 */
  inheritFromParent: boolean

  /* 板块名称 */
  name: string
}

/**
 *  类型定义 [CreateForumModeratorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type CreateForumModeratorDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 分组ID（分组版主时使用） */
  groupId?: null | number
  /* 是否启用 */
  isEnabled: boolean
  /* 权限列表 */
  permissions?: any[] | null
  /* 备注 */
  remark?: null | string
  /* 版主角色类型（1=SUPER，2=GROUP，3=SECTION） */
  roleType: 1 | 2 | 3
  /* 板块ID列表（板块版主时必填） */
  sectionIds?: any[] | null

  /* 用户id */
  userId: number
}

/**
 *  类型定义 [UpdateForumModeratorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type UpdateForumModeratorDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 分组ID（分组版主时使用） */
  groupId?: null | number
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled?: boolean
  /* 权限列表 */
  permissions?: any[] | null
  /* 备注 */
  remark?: null | string
  /* 版主角色类型（1=SUPER，2=GROUP，3=SECTION） */
  roleType?: 1 | 2 | 3

  /* 板块ID列表（板块版主时必填） */
  sectionIds?: any[] | null
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

/**
 *  类型定义 [AssignForumModeratorSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type AssignForumModeratorSectionDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 版主ID */
  moderatorId: number
  /* 板块自定义权限列表，未传则沿用版主基础权限 */
  permissions?: any[] | null

  /* 板块ID列表 */
  sectionIds: number[]
}

/**
 *  类型定义 [ForumModeratorApplicationDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumModeratorApplicationDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 申请人信息 */
  applicant?: ForumModeratorApplicationUserDto
  /* 申请人用户ID */
  applicantId: number
  /* 审核时间 */
  auditAt?: null | string
  /* 审核人ID */
  auditById?: null | number
  /* 审核人信息 */
  auditor?: ForumModeratorApplicationUserDto
  /* 审核意见 */
  auditReason?: null | string
  /* 创建时间 */
  createdAt: string
  /* 删除时间 */
  deletedAt?: null | string
  /* 主键id */
  id: number
  /* 权限名称列表 */
  permissionNames: string[]
  /* 申请权限列表 */
  permissions?: any[] | null
  /* 申请理由 */
  reason: string
  /* 备注 */
  remark?: null | string
  /* 板块信息 */
  section?: ForumModeratorApplicationSectionDto
  /* 申请板块ID */
  sectionId: number
  /* 申请状态（0=PENDING，1=APPROVED，2=REJECTED） */
  status: 0 | 1 | 2

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [ForumModeratorApplicationUserDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumModeratorApplicationUserDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 头像URL */
  avatarUrl?: null | string
  /* 主键id */
  id: number

  /* 昵称 */
  nickname: string
}

/**
 *  类型定义 [ForumModeratorApplicationSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumModeratorApplicationSectionDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 板块描述 */
  description?: null | string
  /* 板块图标 */
  icon?: null | string
  /* 主键id */
  id: number

  /* 板块名称 */
  name: string
}

/**
 *  类型定义 [AuditForumModeratorApplicationDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type AuditForumModeratorApplicationDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 审核意见 */
  auditReason?: null | string
  /* 主键id */
  id: number
  /* 备注 */
  remark?: null | string

  /* 申请状态（0=PENDING，1=APPROVED，2=REJECTED） */
  status: 0 | 1 | 2
}

/**
 *  类型定义 [ForumSearchResultDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumSearchResultDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 创建时间 */
  createdAt: string
  /* 收藏数 */
  favoriteCount: number
  /* 点赞数 */
  likeCount: number
  /* 回复内容摘要 */
  replyContentSnippet?: null | string
  /* 回复数 */
  replyCount: number
  /* 回复ID */
  replyId?: null | number
  /* 结果类型（topic=TOPIC，reply=REPLY，all=ALL） */
  resultType: 'all' | 'reply' | 'topic'
  /* 板块ID */
  sectionId: number
  /* 板块名称 */
  sectionName: string
  /* 主题内容摘要 */
  topicContentSnippet?: null | string
  /* 主题ID */
  topicId: number
  /* 主题标题 */
  topicTitle: string
  /* 用户头像 */
  userAvatarUrl?: null | string
  /* 用户ID */
  userId: number
  /* 用户昵称 */
  userNickname: string

  /* 浏览数 */
  viewCount: number
}

/**
 *  类型定义 [BaseSensitiveWordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type BaseSensitiveWordDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 创建时间 */
  createdAt: string
  /* 创建人ID */
  createdBy?: null | number
  /* 命中次数 */
  hitCount: number
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 最后命中时间 */
  lastHitAt?: null | string
  /* 敏感词级别（1=SEVERE，2=GENERAL，3=LIGHT） */
  level: 1 | 2 | 3
  /* 匹配模式（1=EXACT，2=FUZZY，3=REGEX） */
  matchMode: 1 | 2 | 3
  /* 备注 */
  remark?: null | string
  /* 替换词 */
  replaceWord?: null | string
  /* 敏感词类型（1=POLITICS，2=PORN，3=VIOLENCE，4=AD，5=OTHER） */
  type: 1 | 2 | 3 | 4 | 5
  /* 更新时间 */
  updatedAt: string
  /* 更新人ID */
  updatedBy?: null | number
  /* 版本号（乐观锁） */
  version: number

  /* 敏感词 */
  word: string
}

/**
 *  类型定义 [CreateSensitiveWordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type CreateSensitiveWordDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 是否启用 */
  isEnabled: boolean
  /* 敏感词级别（1=SEVERE，2=GENERAL，3=LIGHT） */
  level: 1 | 2 | 3
  /* 匹配模式（1=EXACT，2=FUZZY，3=REGEX） */
  matchMode: 1 | 2 | 3
  /* 备注 */
  remark?: null | string
  /* 替换词 */
  replaceWord?: null | string
  /* 敏感词类型（1=POLITICS，2=PORN，3=VIOLENCE，4=AD，5=OTHER） */
  type: 1 | 2 | 3 | 4 | 5

  /* 敏感词 */
  word: string
}

/**
 *  类型定义 [UpdateSensitiveWordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type UpdateSensitiveWordDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 敏感词级别（1=SEVERE，2=GENERAL，3=LIGHT） */
  level: 1 | 2 | 3
  /* 匹配模式（1=EXACT，2=FUZZY，3=REGEX） */
  matchMode: 1 | 2 | 3
  /* 备注 */
  remark?: null | string
  /* 替换词 */
  replaceWord?: null | string
  /* 敏感词类型（1=POLITICS，2=PORN，3=VIOLENCE，4=AD，5=OTHER） */
  type: 1 | 2 | 3 | 4 | 5

  /* 敏感词 */
  word: string
}

/**
 *  类型定义 [UpdateEnabledStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
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
 *  类型定义 [SensitiveWordDetectDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type SensitiveWordDetectDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 检测内容 */
  content: string

  /* 匹配模式（1=EXACT，2=FUZZY，3=REGEX） */
  matchMode?: null | number
}

/**
 *  类型定义 [SensitiveWordDetectResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type SensitiveWordDetectResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 最高敏感等级（1=SEVERE，2=GENERAL，3=LIGHT） */
  highestLevel?: null | number

  /* 命中的敏感词列表 */
  hits: MatchedWordDto[]
}

/**
 *  类型定义 [MatchedWordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type MatchedWordDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 结束位置 */
  end: number
  /* 敏感词级别（1=SEVERE，2=GENERAL，3=LIGHT） */
  level: 1 | 2 | 3
  /* 替换词 */
  replaceWord?: null | string
  /* 起始位置 */
  start: number
  /* 敏感词类型（1=POLITICS，2=PORN，3=VIOLENCE，4=AD，5=OTHER） */
  type: 1 | 2 | 3 | 4 | 5

  /* 敏感词内容 */
  word: string
}

/**
 *  类型定义 [SensitiveWordStatisticsResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type SensitiveWordStatisticsResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 统计结果 */
  data: Record<string, any>[]

  /* 统计类型（level=LEVEL，type=TYPE，topHits=TOP_HITS，recentHits=RECENT_HITS） */
  type: 'level' | 'recentHits' | 'topHits' | 'type'
}

/**
 *  类型定义 [SensitiveWordStatisticsDataDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type SensitiveWordStatisticsDataDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 禁用词数 */
  disabledWords: number
  /* 启用词数 */
  enabledWords: number
  /* 最近一月命中次数 */
  lastMonthHits: number
  /* 最近一周命中次数 */
  lastWeekHits: number
  /* 级别统计 */
  levelStatistics: SensitiveWordLevelStatisticsDto[]
  /* 最近命中词 */
  recentHitWords: SensitiveWordRecentHitStatisticsDto[]
  /* 今日命中次数 */
  todayHits: number
  /* 热门命中词 */
  topHitWords: SensitiveWordTopHitStatisticsDto[]
  /* 总命中次数 */
  totalHits: number
  /* 总词数 */
  totalWords: number

  /* 类型统计 */
  typeStatistics: SensitiveWordTypeStatisticsDto[]
}

/**
 *  类型定义 [SensitiveWordLevelStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type SensitiveWordLevelStatisticsDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 词数量 */
  count: number
  /* 命中次数 */
  hitCount: number
  /* 敏感词级别（1=SEVERE，2=GENERAL，3=LIGHT） */
  level: 1 | 2 | 3

  /* 级别名称 */
  levelName: string
}

/**
 *  类型定义 [SensitiveWordTypeStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type SensitiveWordTypeStatisticsDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 词数量 */
  count: number
  /* 命中次数 */
  hitCount: number
  /* 敏感词类型（1=POLITICS，2=PORN，3=VIOLENCE，4=AD，5=OTHER） */
  type: 1 | 2 | 3 | 4 | 5

  /* 类型名称 */
  typeName: string
}

/**
 *  类型定义 [SensitiveWordTopHitStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type SensitiveWordTopHitStatisticsDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 命中次数 */
  hitCount: number
  /* 最后命中时间 */
  lastHitAt?: null | string
  /* 敏感词级别（1=SEVERE，2=GENERAL，3=LIGHT） */
  level: 1 | 2 | 3
  /* 敏感词类型（1=POLITICS，2=PORN，3=VIOLENCE，4=AD，5=OTHER） */
  type: 1 | 2 | 3 | 4 | 5

  /* 敏感词 */
  word: string
}

/**
 *  类型定义 [SensitiveWordRecentHitStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type SensitiveWordRecentHitStatisticsDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 命中次数 */
  hitCount: number
  /* 最后命中时间 */
  lastHitAt?: null | string
  /* 敏感词级别（1=SEVERE，2=GENERAL，3=LIGHT） */
  level: 1 | 2 | 3
  /* 敏感词类型（1=POLITICS，2=PORN，3=VIOLENCE，4=AD，5=OTHER） */
  type: 1 | 2 | 3 | 4 | 5

  /* 敏感词 */
  word: string
}

/**
 *  类型定义 [SensitiveWordReplaceDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type SensitiveWordReplaceDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 检测内容 */
  content: string
  /* 匹配模式（1=EXACT，2=FUZZY，3=REGEX） */
  matchMode?: null | number

  /* 替换字符 */
  replaceChar?: null | string
}

/**
 *  类型定义 [SensitiveWordReplaceResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type SensitiveWordReplaceResponseDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 替换后的文本 */
  replacedText: string
}

/**
 *  类型定义 [SensitiveWordHighestLevelResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type SensitiveWordHighestLevelResponseDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 敏感词最高等级（1=SEVERE，2=GENERAL，3=LIGHT） */
  highestLevel?: null | number
}

/**
 *  类型定义 [SensitiveWordDetectStatusResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type SensitiveWordDetectStatusResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 检测器是否就绪 */
  isReady: boolean

  /* 已加载的敏感词数量 */
  wordCount: number
}

/**
 *  类型定义 [SensitiveWordCountResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type SensitiveWordCountResponseDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 当前加载的敏感词数量 */
  count: number
}

/**
 *  类型定义 [BaseForumTopicDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
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
 *  @更新时间 2026-03-23 16:50:34
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
 *  @更新时间 2026-03-23 16:50:34
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
 *  @更新时间 2026-03-23 16:50:34
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

  /* 审核策略（0=NONE，1=SEVERE_SENSITIVE_WORD，2=GENERAL_SENSITIVE_WORD，3=MILD_SENSITIVE_WORD，4=MANUAL） */
  topicReviewPolicy: 0 | 1 | 2 | 3 | 4
}

/**
 *  类型定义 [AdminForumTopicUserDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
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
  /* 个人简介 */
  bio?: null | string
  /* 用户计数 */
  counts?: AdminForumTopicUserCountDto
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
  /* 个性签名 */
  signature?: null | string

  /* 用户状态（1=NORMAL，2=MUTED，3=PERMANENT_MUTED，4=BANNED，5=PERMANENT_BANNED） */
  status: 1 | 2 | 3 | 4 | 5
}

/**
 *  类型定义 [AdminForumTopicUserCountDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type AdminForumTopicUserCountDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 发出的评论总数 */
  commentCount: number
  /* 评论收到的点赞总数 */
  commentReceivedLikeCount: number
  /* 发出的收藏总数 */
  favoriteCount: number
  /* 论坛主题数 */
  forumTopicCount: number
  /* 论坛主题收到的收藏总数 */
  forumTopicReceivedFavoriteCount: number
  /* 论坛主题收到的点赞总数 */
  forumTopicReceivedLikeCount: number

  /* 发出的点赞总数 */
  likeCount: number
}

/**
 *  类型定义 [AdminForumTopicUserLevelDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
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
 *  @更新时间 2026-03-23 16:50:34
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
 *  @更新时间 2026-03-23 16:50:34
 */
export type UpdateForumTopicDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主题内容 */
  content: string
  /* 主键id */
  id: number

  /* 主题标题 */
  title: string
}

/**
 *  类型定义 [UpdateForumTopicPinnedDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
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
 *  @更新时间 2026-03-23 16:50:34
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
 *  @更新时间 2026-03-23 16:50:34
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
 *  @更新时间 2026-03-23 16:50:34
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
 *  @更新时间 2026-03-23 16:50:34
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

/**
 *  类型定义 [BaseForumSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type BaseForumSectionDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 创建时间 */
  createdAt: string
  /* 删除时间 */
  deletedAt?: null | string
  /* 板块描述 */
  description?: null | string
  /* 板块分组ID（为空表示未分组） */
  groupId?: null | number
  /* 板块图标 */
  icon?: null | string
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 最后发表时间 */
  lastPostAt?: null | string
  /* 最后发表主题ID */
  lastTopicId?: null | number
  /* 板块名称 */
  name: string
  /* 备注信息 */
  remark?: null | string
  /* 回复数 */
  replyCount: number
  /* 排序权重 */
  sortOrder: number
  /* 主题数 */
  topicCount: number
  /* 审核策略（0=NONE，1=SEVERE_SENSITIVE_WORD，2=GENERAL_SENSITIVE_WORD，3=MILD_SENSITIVE_WORD，4=MANUAL） */
  topicReviewPolicy: 0 | 1 | 2 | 3 | 4
  /* 更新时间 */
  updatedAt: string

  /* 用户等级规则ID（为空表示所有用户） */
  userLevelRuleId?: null | number
}

/**
 *  类型定义 [CreateForumSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type CreateForumSectionDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 板块描述 */
  description?: null | string
  /* 板块分组ID（为空表示未分组） */
  groupId?: null | number
  /* 板块图标 */
  icon?: null | string
  /* 是否启用 */
  isEnabled: boolean
  /* 板块名称 */
  name: string
  /* 备注信息 */
  remark?: null | string
  /* 排序权重 */
  sortOrder: number
  /* 审核策略（0=NONE，1=SEVERE_SENSITIVE_WORD，2=GENERAL_SENSITIVE_WORD，3=MILD_SENSITIVE_WORD，4=MANUAL） */
  topicReviewPolicy: 0 | 1 | 2 | 3 | 4

  /* 用户等级规则ID（为空表示所有用户） */
  userLevelRuleId?: null | number
}

/**
 *  类型定义 [UpdateForumSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type UpdateForumSectionDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 板块描述 */
  description?: null | string
  /* 板块分组ID（为空表示未分组） */
  groupId?: null | number
  /* 板块图标 */
  icon?: null | string
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 板块名称 */
  name: string
  /* 备注信息 */
  remark?: null | string
  /* 排序权重 */
  sortOrder: number
  /* 审核策略（0=NONE，1=SEVERE_SENSITIVE_WORD，2=GENERAL_SENSITIVE_WORD，3=MILD_SENSITIVE_WORD，4=MANUAL） */
  topicReviewPolicy: 0 | 1 | 2 | 3 | 4

  /* 用户等级规则ID（为空表示所有用户） */
  userLevelRuleId?: null | number
}

/**
 *  类型定义 [DragReorderDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
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
 *  类型定义 [BaseForumSectionGroupDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type BaseForumSectionGroupDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 创建时间 */
  createdAt: string
  /* 删除时间 */
  deletedAt?: null | string
  /* 分组描述 */
  description?: null | string
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 分组版主数量限制（0表示不限制） */
  maxModerators: number
  /* 分组名称 */
  name: string
  /* 排序权重 */
  sortOrder: number

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [CreateForumSectionGroupDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type CreateForumSectionGroupDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 分组描述 */
  description?: null | string
  /* 是否启用 */
  isEnabled: boolean
  /* 分组版主数量限制（0表示不限制） */
  maxModerators: number
  /* 分组名称 */
  name: string

  /* 排序权重 */
  sortOrder: number
}

/**
 *  类型定义 [UpdateForumSectionGroupDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type UpdateForumSectionGroupDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 分组描述 */
  description?: null | string
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled?: boolean
  /* 分组版主数量限制（0表示不限制） */
  maxModerators?: number
  /* 分组名称 */
  name?: string

  /* 排序权重 */
  sortOrder?: number
}

/**
 *  类型定义 [BaseForumTagDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type BaseForumTagDto = {
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
  isEnabled: boolean
  /* 标签名称 */
  name: string
  /* 排序权重 */
  sortOrder: number
  /* 更新时间 */
  updatedAt: string

  /* 使用次数 */
  useCount: number
}

/**
 *  类型定义 [ForumTagDetailResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumTagDetailResponseDto = {
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
  isEnabled: boolean
  /* 标签名称 */
  name: string
  /* 排序权重 */
  sortOrder: number
  /* 最近使用该标签的主题列表 */
  topics: ForumTagTopicSummaryDto[]
  /* 更新时间 */
  updatedAt: string

  /* 使用次数 */
  useCount: number
}

/**
 *  类型定义 [ForumTagTopicSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type ForumTagTopicSummaryDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 创建时间 */
  createdAt: string
  /* 主键id */
  id: number

  /* 主题标题 */
  title: string
}

/**
 *  类型定义 [CreateForumTagDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type CreateForumTagDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 标签描述 */
  description?: null | string
  /* 标签图标URL */
  icon?: null | string
  /* 是否启用 */
  isEnabled: boolean
  /* 标签名称 */
  name: string

  /* 排序权重 */
  sortOrder: number
}

/**
 *  类型定义 [UpdateForumTagDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type UpdateForumTagDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 标签描述 */
  description?: null | string
  /* 标签图标URL */
  icon?: null | string
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 标签名称 */
  name: string

  /* 排序权重 */
  sortOrder: number
}

/**
 *  类型定义 [AssignForumTagToTopicDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type AssignForumTagToTopicDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 标签ID */
  tagId: number

  /* 主题ID */
  topicId: number
}

/**
 *  类型定义 [RemoveForumTagFromTopicDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type RemoveForumTagFromTopicDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 标签ID */
  tagId: number

  /* 主题ID */
  topicId: number
}