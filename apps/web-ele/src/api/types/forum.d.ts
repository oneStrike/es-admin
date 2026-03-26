/**
 *  类型定义 [ForumModeratorsPageRequest]
 *  @来源 论坛管理/版主管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumModeratorsPageRequest = {
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

  /* 用户id */
  userId?: number

  /* 是否启用 */
  isEnabled?: boolean

  /* 用户名 */
  nickname?: string | null

  /* 板块ID */
  sectionId?: number | null

  /** 任意合法数值 */
  [property: string]: any
}

export type ForumModeratorsPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: ForumModeratorDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ForumModeratorsCreateRequest]
 *  @来源 论坛管理/版主管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumModeratorsCreateRequest = CreateForumModeratorDto

export type ForumModeratorsCreateResponse = boolean

/**
 *  类型定义 [ForumModeratorsUpdateRequest]
 *  @来源 论坛管理/版主管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumModeratorsUpdateRequest = UpdateForumModeratorDto

export type ForumModeratorsUpdateResponse = boolean

/**
 *  类型定义 [ForumModeratorsDeleteRequest]
 *  @来源 论坛管理/版主管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumModeratorsDeleteRequest = IdDto

export type ForumModeratorsDeleteResponse = boolean

/**
 *  类型定义 [ForumModeratorsAssignSectionRequest]
 *  @来源 论坛管理/版主管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumModeratorsAssignSectionRequest = AssignForumModeratorSectionDto

export type ForumModeratorsAssignSectionResponse = boolean

/**
 *  类型定义 [ForumModeratorApplicationPageRequest]
 *  @来源 论坛管理/版主申请
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumModeratorApplicationPageRequest = {
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

  /* 申请人用户ID */
  applicantId?: number

  /* 申请板块ID */
  sectionId?: number

  /* 申请状态（0=PENDING，1=APPROVED，2=REJECTED） */
  status?: number

  /* 申请人昵称 */
  nickname?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

export type ForumModeratorApplicationPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: ForumModeratorApplicationDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ForumModeratorApplicationDetailRequest]
 *  @来源 论坛管理/版主申请
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumModeratorApplicationDetailRequest = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

export type ForumModeratorApplicationDetailResponse = ForumModeratorApplicationDto

/**
 *  类型定义 [ForumModeratorApplicationAuditRequest]
 *  @来源 论坛管理/版主申请
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumModeratorApplicationAuditRequest = AuditForumModeratorApplicationDto

export type ForumModeratorApplicationAuditResponse = boolean

/**
 *  类型定义 [ForumModeratorApplicationDeleteRequest]
 *  @来源 论坛管理/版主申请
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumModeratorApplicationDeleteRequest = IdDto

export type ForumModeratorApplicationDeleteResponse = boolean

/**
 *  类型定义 [ForumSearchPageRequest]
 *  @来源 论坛管理/搜索
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSearchPageRequest = {
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

  /* 搜索关键词 */
  keyword: string

  /* 搜索类型（topic=TOPIC，comment=COMMENT，all=ALL） */
  type?: string | null

  /* 板块ID */
  sectionId?: number | null

  /* 标签ID */
  tagId?: number | null

  /* 排序类型（latest=LATEST，hot=HOT，relevance=RELEVANCE） */
  sort?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

export type ForumSearchPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: ForumSearchResultDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ForumSensitiveWordPageRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSensitiveWordPageRequest = {
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

  /* 敏感词 */
  word?: string

  /* 是否启用 */
  isEnabled?: boolean

  /* 敏感词级别（1=SEVERE，2=GENERAL，3=LIGHT） */
  level?: number

  /* 敏感词类型（1=POLITICS，2=PORN，3=VIOLENCE，4=AD，5=OTHER） */
  type?: number

  /* 匹配模式（1=EXACT，2=FUZZY，3=REGEX） */
  matchMode?: number

  /** 任意合法数值 */
  [property: string]: any
}

export type ForumSensitiveWordPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: BaseSensitiveWordDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ForumSensitiveWordCreateRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSensitiveWordCreateRequest = CreateSensitiveWordDto

export type ForumSensitiveWordCreateResponse = boolean

/**
 *  类型定义 [ForumSensitiveWordUpdateRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSensitiveWordUpdateRequest = UpdateSensitiveWordDto

export type ForumSensitiveWordUpdateResponse = boolean

/**
 *  类型定义 [ForumSensitiveWordDeleteRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSensitiveWordDeleteRequest = IdDto

export type ForumSensitiveWordDeleteResponse = boolean

/**
 *  类型定义 [ForumSensitiveWordUpdateStatusRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSensitiveWordUpdateStatusRequest = UpdateEnabledStatusDto

export type ForumSensitiveWordUpdateStatusResponse = boolean

/**
 *  类型定义 [ForumSensitiveWordDetectRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSensitiveWordDetectRequest = SensitiveWordDetectDto

export type ForumSensitiveWordDetectResponse = SensitiveWordDetectResponseDto

/**
 *  类型定义 [ForumSensitiveWordStatsRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSensitiveWordStatsRequest = {
  /* 统计类型（level=LEVEL，type=TYPE，topHits=TOP_HITS，recentHits=RECENT_HITS） */
  type?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

export type ForumSensitiveWordStatsResponse = SensitiveWordStatisticsResponseDto

export type ForumSensitiveWordStatsFullResponse = SensitiveWordStatisticsDataDto

/**
 *  类型定义 [ForumSensitiveWordReplaceRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSensitiveWordReplaceRequest = SensitiveWordReplaceDto

export type ForumSensitiveWordReplaceResponse = SensitiveWordReplaceResponseDto

/**
 *  类型定义 [ForumSensitiveWordDetectHighestLevelRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSensitiveWordDetectHighestLevelRequest = SensitiveWordDetectDto

export type ForumSensitiveWordDetectHighestLevelResponse = SensitiveWordHighestLevelResponseDto

export type ForumSensitiveWordDetectStatusResponse = SensitiveWordDetectStatusResponseDto

export type ForumSensitiveWordCountResponse = SensitiveWordCountResponseDto

/**
 *  类型定义 [ForumTopicPageRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumTopicPageRequest = {
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

  /* 关联的板块ID */
  sectionId?: number

  /* 用户ID */
  userId?: number

  /* 是否置顶 */
  isPinned?: boolean

  /* 是否精华 */
  isFeatured?: boolean

  /* 是否锁定 */
  isLocked?: boolean

  /* 是否隐藏 */
  isHidden?: boolean

  /* 审核状态（0=待审核, 1=已通过, 2=已拒绝） */
  auditStatus?: number

  /* 关键词搜索（标题或内容） */
  keyword?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

export type ForumTopicPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: BaseForumTopicDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ForumTopicDetailRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumTopicDetailRequest = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

export type ForumTopicDetailResponse = AdminForumTopicDetailDto

/**
 *  类型定义 [ForumTopicCreateRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumTopicCreateRequest = CreateForumTopicDto

export type ForumTopicCreateResponse = boolean

/**
 *  类型定义 [ForumTopicUpdateRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumTopicUpdateRequest = UpdateForumTopicDto

export type ForumTopicUpdateResponse = boolean

/**
 *  类型定义 [ForumTopicDeleteRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumTopicDeleteRequest = IdDto

export type ForumTopicDeleteResponse = boolean

/**
 *  类型定义 [ForumTopicUpdatePinnedRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumTopicUpdatePinnedRequest = UpdateForumTopicPinnedDto

export type ForumTopicUpdatePinnedResponse = boolean

/**
 *  类型定义 [ForumTopicUpdateFeaturedRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumTopicUpdateFeaturedRequest = UpdateForumTopicFeaturedDto

export type ForumTopicUpdateFeaturedResponse = boolean

/**
 *  类型定义 [ForumTopicUpdateLockedRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumTopicUpdateLockedRequest = UpdateForumTopicLockedDto

export type ForumTopicUpdateLockedResponse = boolean

/**
 *  类型定义 [ForumTopicUpdateHiddenRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumTopicUpdateHiddenRequest = UpdateForumTopicHiddenDto

export type ForumTopicUpdateHiddenResponse = boolean

/**
 *  类型定义 [ForumTopicUpdateAuditStatusRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumTopicUpdateAuditStatusRequest = UpdateForumTopicAuditStatusDto

export type ForumTopicUpdateAuditStatusResponse = boolean

/**
 *  类型定义 [ForumSectionsPageRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSectionsPageRequest = {
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

  /* 板块名称 */
  name?: string

  /* 板块分组ID（为空表示未分组） */
  groupId?: number | null

  /* 是否启用 */
  isEnabled?: boolean

  /* 审核策略（0=NONE，1=SEVERE_SENSITIVE_WORD，2=GENERAL_SENSITIVE_WORD，3=MILD_SENSITIVE_WORD，4=MANUAL） */
  topicReviewPolicy?: number

  /** 任意合法数值 */
  [property: string]: any
}

export type ForumSectionsPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: BaseForumSectionDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ForumSectionsDetailRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSectionsDetailRequest = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

export type ForumSectionsDetailResponse = BaseForumSectionDto

export type ForumSectionsTreeResponse = {
  /* 响应状态码 */
  code?: number

  /* 响应消息 */
  message?: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ForumSectionsCreateRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSectionsCreateRequest = CreateForumSectionDto

export type ForumSectionsCreateResponse = boolean

/**
 *  类型定义 [ForumSectionsUpdateRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSectionsUpdateRequest = UpdateForumSectionDto

export type ForumSectionsUpdateResponse = boolean

/**
 *  类型定义 [ForumSectionsDeleteRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSectionsDeleteRequest = IdDto

export type ForumSectionsDeleteResponse = boolean

/**
 *  类型定义 [ForumSectionsUpdateEnabledRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSectionsUpdateEnabledRequest = UpdateEnabledStatusDto

export type ForumSectionsUpdateEnabledResponse = boolean

/**
 *  类型定义 [ForumSectionsRebuildFollowCountRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSectionsRebuildFollowCountRequest = IdDto

export type ForumSectionsRebuildFollowCountResponse = ForumSectionFollowCountRepairResultDto

export type ForumSectionsRebuildFollowCountAllResponse = boolean

/**
 *  类型定义 [ForumSectionsSwapSortOrderRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSectionsSwapSortOrderRequest = DragReorderDto

export type ForumSectionsSwapSortOrderResponse = boolean

/**
 *  类型定义 [ForumSectionGroupsPageRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSectionGroupsPageRequest = {
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

  /* 分组名称 */
  name?: string

  /* 是否启用 */
  isEnabled?: boolean

  /** 任意合法数值 */
  [property: string]: any
}

export type ForumSectionGroupsPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: BaseForumSectionGroupDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ForumSectionGroupsDetailRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSectionGroupsDetailRequest = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

export type ForumSectionGroupsDetailResponse = BaseForumSectionGroupDto

/**
 *  类型定义 [ForumSectionGroupsCreateRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSectionGroupsCreateRequest = CreateForumSectionGroupDto

export type ForumSectionGroupsCreateResponse = boolean

/**
 *  类型定义 [ForumSectionGroupsUpdateRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSectionGroupsUpdateRequest = UpdateForumSectionGroupDto

export type ForumSectionGroupsUpdateResponse = boolean

/**
 *  类型定义 [ForumSectionGroupsDeleteRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSectionGroupsDeleteRequest = IdDto

export type ForumSectionGroupsDeleteResponse = boolean

/**
 *  类型定义 [ForumSectionGroupsUpdateEnabledRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSectionGroupsUpdateEnabledRequest = UpdateEnabledStatusDto

export type ForumSectionGroupsUpdateEnabledResponse = boolean

/**
 *  类型定义 [ForumSectionGroupsSwapSortOrderRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSectionGroupsSwapSortOrderRequest = DragReorderDto

export type ForumSectionGroupsSwapSortOrderResponse = boolean

/**
 *  类型定义 [ForumTagsPageRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumTagsPageRequest = {
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

  /* 标签名称 */
  name?: string

  /* 是否启用 */
  isEnabled?: boolean

  /** 任意合法数值 */
  [property: string]: any
}

export type ForumTagsPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: BaseForumTagDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ForumTagsDetailRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumTagsDetailRequest = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

export type ForumTagsDetailResponse = ForumTagDetailResponseDto

/**
 *  类型定义 [ForumTagsPopularListRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumTagsPopularListRequest = {
  
  limit: number

  /** 任意合法数值 */
  [property: string]: any
}

export type ForumTagsPopularListResponse = BaseForumTagDto[]

export type ForumTagsEnabledListResponse = BaseForumTagDto[]

/**
 *  类型定义 [ForumTagsTopicTagListRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumTagsTopicTagListRequest = {
  
  topicId: number

  /** 任意合法数值 */
  [property: string]: any
}

export type ForumTagsTopicTagListResponse = BaseForumTagDto[]

/**
 *  类型定义 [ForumTagsCreateRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumTagsCreateRequest = CreateForumTagDto

export type ForumTagsCreateResponse = boolean

/**
 *  类型定义 [ForumTagsUpdateRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumTagsUpdateRequest = UpdateForumTagDto

export type ForumTagsUpdateResponse = boolean

/**
 *  类型定义 [ForumTagsDeleteRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumTagsDeleteRequest = IdDto

export type ForumTagsDeleteResponse = boolean

/**
 *  类型定义 [ForumTagsAssignTopicRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumTagsAssignTopicRequest = AssignForumTagToTopicDto

export type ForumTagsAssignTopicResponse = boolean

/**
 *  类型定义 [ForumTagsUnassignTopicRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumTagsUnassignTopicRequest = AssignForumTagToTopicDto

export type ForumTagsUnassignTopicResponse = boolean

/**
 *  类型定义 [ForumModeratorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumModeratorDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 用户id */
  userId: number
  /* 分组ID（分组版主时使用） */
  groupId?: number | null
  /* 版主角色类型（1=SUPER，2=GROUP，3=SECTION） */
  roleType: 1 | 2 | 3
  /* 权限列表 */
  permissions: number[]
  /* 是否启用 */
  isEnabled: boolean
  /* 备注 */
  remark?: string | null
  /* 删除时间 */
  deletedAt?: string | null
  /* 昵称 */
  nickname: string
  /* 头像 */
  avatar?: string | null
  /* 所属分组 */
  group?: ForumModeratorGroupDto
  /* 权限名称列表 */
  permissionNames: string[]
  /* 管理的板块列表 */
  sections: ForumModeratorSectionItemDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ForumModeratorGroupDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumModeratorGroupDto = {
  /* 分组ID */
  id: number
  /* 分组名称 */
  name: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ForumModeratorSectionItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumModeratorSectionItemDto = {
  /* 板块ID */
  id: number
  /* 板块名称 */
  name: string
  /* 是否继承基础权限 */
  inheritFromParent: boolean
  /* 板块自定义权限 */
  customPermissions: number[]
  /* 板块最终生效权限 */
  finalPermissions: number[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [CreateForumModeratorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type CreateForumModeratorDto = {
  /* 用户id */
  userId: number
  /* 分组ID（分组版主时使用） */
  groupId?: number | null
  /* 版主角色类型（1=SUPER，2=GROUP，3=SECTION） */
  roleType: 1 | 2 | 3
  /* 权限列表 */
  permissions?: any[] | null
  /* 是否启用 */
  isEnabled: boolean
  /* 备注 */
  remark?: string | null
  /* 板块ID列表（板块版主时必填） */
  sectionIds?: any[] | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateForumModeratorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type UpdateForumModeratorDto = {
  /* 分组ID（分组版主时使用） */
  groupId?: number | null
  /* 版主角色类型（1=SUPER，2=GROUP，3=SECTION） */
  roleType?: 1 | 2 | 3
  /* 权限列表 */
  permissions?: any[] | null
  /* 是否启用 */
  isEnabled?: boolean
  /* 备注 */
  remark?: string | null
  /* 板块ID列表（板块版主时必填） */
  sectionIds?: any[] | null
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type IdDto = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AssignForumModeratorSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type AssignForumModeratorSectionDto = {
  /* 版主ID */
  moderatorId: number
  /* 板块ID列表 */
  sectionIds: number[]
  /* 板块自定义权限列表，未传则沿用版主基础权限 */
  permissions?: any[] | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ForumModeratorApplicationDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumModeratorApplicationDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 申请人用户ID */
  applicantId: number
  /* 申请板块ID */
  sectionId: number
  /* 审核人ID */
  auditById?: number | null
  /* 申请状态（0=PENDING，1=APPROVED，2=REJECTED） */
  status: 0 | 1 | 2
  /* 申请权限列表 */
  permissions?: any[] | null
  /* 申请理由 */
  reason: string
  /* 审核意见 */
  auditReason?: string | null
  /* 备注 */
  remark?: string | null
  /* 审核时间 */
  auditAt?: string | null
  /* 删除时间 */
  deletedAt?: string | null
  /* 权限名称列表 */
  permissionNames: string[]
  /* 申请人信息 */
  applicant?: ForumModeratorApplicationUserDto
  /* 审核人信息 */
  auditor?: ForumModeratorApplicationUserDto
  /* 板块信息 */
  section?: ForumModeratorApplicationSectionDto

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ForumModeratorApplicationUserDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumModeratorApplicationUserDto = {
  /* 主键id */
  id: number
  /* 昵称 */
  nickname: string
  /* 头像URL */
  avatarUrl?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ForumModeratorApplicationSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumModeratorApplicationSectionDto = {
  /* 主键id */
  id: number
  /* 板块名称 */
  name: string
  /* 板块图标 */
  icon: string
  /* 板块封面 */
  cover: string
  /* 板块描述 */
  description?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AuditForumModeratorApplicationDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type AuditForumModeratorApplicationDto = {
  /* 主键id */
  id: number
  /* 申请状态（0=PENDING，1=APPROVED，2=REJECTED） */
  status: 0 | 1 | 2
  /* 审核意见 */
  auditReason?: string | null
  /* 备注 */
  remark?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ForumSearchResultDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSearchResultDto = {
  /* 结果类型（topic=TOPIC，comment=COMMENT，all=ALL） */
  resultType: 'topic' | 'comment' | 'all'
  /* 主题ID */
  topicId: number
  /* 主题标题 */
  topicTitle: string
  /* 主题内容摘要 */
  topicContentSnippet?: string | null
  /* 板块ID */
  sectionId: number
  /* 板块名称 */
  sectionName: string
  /* 用户ID */
  userId: number
  /* 用户昵称 */
  userNickname: string
  /* 用户头像 */
  userAvatarUrl?: string | null
  /* 评论ID */
  commentId?: number | null
  /* 评论内容摘要 */
  commentContentSnippet?: string | null
  /* 创建时间 */
  createdAt: string
  /* 评论数 */
  commentCount: number
  /* 浏览数 */
  viewCount: number
  /* 点赞数 */
  likeCount: number
  /* 收藏数 */
  favoriteCount: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [BaseSensitiveWordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type BaseSensitiveWordDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 敏感词 */
  word: string
  /* 替换词 */
  replaceWord?: string | null
  /* 是否启用 */
  isEnabled: boolean
  /* 敏感词级别（1=SEVERE，2=GENERAL，3=LIGHT） */
  level: 1 | 2 | 3
  /* 敏感词类型（1=POLITICS，2=PORN，3=VIOLENCE，4=AD，5=OTHER） */
  type: 1 | 2 | 3 | 4 | 5
  /* 匹配模式（1=EXACT，2=FUZZY，3=REGEX） */
  matchMode: 1 | 2 | 3
  /* 版本号（乐观锁） */
  version: number
  /* 备注 */
  remark?: string | null
  /* 创建人ID */
  createdBy?: number | null
  /* 更新人ID */
  updatedBy?: number | null
  /* 命中次数 */
  hitCount: number
  /* 最后命中时间 */
  lastHitAt?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [CreateSensitiveWordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type CreateSensitiveWordDto = {
  /* 敏感词 */
  word: string
  /* 替换词 */
  replaceWord?: string | null
  /* 是否启用 */
  isEnabled: boolean
  /* 敏感词级别（1=SEVERE，2=GENERAL，3=LIGHT） */
  level: 1 | 2 | 3
  /* 敏感词类型（1=POLITICS，2=PORN，3=VIOLENCE，4=AD，5=OTHER） */
  type: 1 | 2 | 3 | 4 | 5
  /* 匹配模式（1=EXACT，2=FUZZY，3=REGEX） */
  matchMode: 1 | 2 | 3
  /* 备注 */
  remark?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateSensitiveWordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type UpdateSensitiveWordDto = {
  /* 敏感词 */
  word: string
  /* 替换词 */
  replaceWord?: string | null
  /* 是否启用 */
  isEnabled: boolean
  /* 敏感词级别（1=SEVERE，2=GENERAL，3=LIGHT） */
  level: 1 | 2 | 3
  /* 敏感词类型（1=POLITICS，2=PORN，3=VIOLENCE，4=AD，5=OTHER） */
  type: 1 | 2 | 3 | 4 | 5
  /* 匹配模式（1=EXACT，2=FUZZY，3=REGEX） */
  matchMode: 1 | 2 | 3
  /* 备注 */
  remark?: string | null
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateEnabledStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type UpdateEnabledStatusDto = {
  /* 主键id */
  id: number
  /* 状态 true启用 false禁用 */
  isEnabled: boolean

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [SensitiveWordDetectDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type SensitiveWordDetectDto = {
  /* 检测内容 */
  content: string
  /* 匹配模式（1=EXACT，2=FUZZY，3=REGEX） */
  matchMode?: number | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [SensitiveWordDetectResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type SensitiveWordDetectResponseDto = {
  /* 命中的敏感词列表 */
  hits: BaseSensitiveWordHitDto[]
  /* 最高敏感等级（1=SEVERE，2=GENERAL，3=LIGHT） */
  highestLevel?: number | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [BaseSensitiveWordHitDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type BaseSensitiveWordHitDto = {
  /* 敏感词内容 */
  word: string
  /* 起始位置 */
  start: number
  /* 结束位置 */
  end: number
  /* 敏感词级别（1=SEVERE，2=GENERAL，3=LIGHT） */
  level: 1 | 2 | 3
  /* 敏感词类型（1=POLITICS，2=PORN，3=VIOLENCE，4=AD，5=OTHER） */
  type: 1 | 2 | 3 | 4 | 5
  /* 替换词 */
  replaceWord?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [SensitiveWordStatisticsResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type SensitiveWordStatisticsResponseDto = {
  /* 统计类型（level=LEVEL，type=TYPE，topHits=TOP_HITS，recentHits=RECENT_HITS） */
  type: 'level' | 'type' | 'topHits' | 'recentHits'
  /* 统计结果 */
  data: Record<string, any>[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [SensitiveWordStatisticsDataDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type SensitiveWordStatisticsDataDto = {
  /* 总词数 */
  totalWords: number
  /* 启用词数 */
  enabledWords: number
  /* 禁用词数 */
  disabledWords: number
  /* 总命中次数 */
  totalHits: number
  /* 今日命中次数 */
  todayHits: number
  /* 最近一周命中次数 */
  lastWeekHits: number
  /* 最近一月命中次数 */
  lastMonthHits: number
  /* 级别统计 */
  levelStatistics: SensitiveWordLevelStatisticsDto[]
  /* 类型统计 */
  typeStatistics: SensitiveWordTypeStatisticsDto[]
  /* 热门命中词 */
  topHitWords: SensitiveWordTopHitStatisticsDto[]
  /* 最近命中词 */
  recentHitWords: SensitiveWordTopHitStatisticsDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [SensitiveWordLevelStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type SensitiveWordLevelStatisticsDto = {
  /* 敏感词级别（1=SEVERE，2=GENERAL，3=LIGHT） */
  level: 1 | 2 | 3
  /* 级别名称 */
  levelName: string
  /* 词数量 */
  count: number
  /* 命中次数 */
  hitCount: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [SensitiveWordTypeStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type SensitiveWordTypeStatisticsDto = {
  /* 敏感词类型（1=POLITICS，2=PORN，3=VIOLENCE，4=AD，5=OTHER） */
  type: 1 | 2 | 3 | 4 | 5
  /* 类型名称 */
  typeName: string
  /* 词数量 */
  count: number
  /* 命中次数 */
  hitCount: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [SensitiveWordTopHitStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type SensitiveWordTopHitStatisticsDto = {
  /* 敏感词 */
  word: string
  /* 命中次数 */
  hitCount: number
  /* 敏感词级别（1=SEVERE，2=GENERAL，3=LIGHT） */
  level: 1 | 2 | 3
  /* 敏感词类型（1=POLITICS，2=PORN，3=VIOLENCE，4=AD，5=OTHER） */
  type: 1 | 2 | 3 | 4 | 5
  /* 最后命中时间 */
  lastHitAt?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [SensitiveWordReplaceDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type SensitiveWordReplaceDto = {
  /* 检测内容 */
  content: string
  /* 匹配模式（1=EXACT，2=FUZZY，3=REGEX） */
  matchMode?: number | null
  /* 替换字符 */
  replaceChar?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [SensitiveWordReplaceResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type SensitiveWordReplaceResponseDto = {
  /* 替换后的文本 */
  replacedText: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [SensitiveWordHighestLevelResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type SensitiveWordHighestLevelResponseDto = {
  /* 敏感词最高等级（1=SEVERE，2=GENERAL，3=LIGHT） */
  highestLevel?: number | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [SensitiveWordDetectStatusResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type SensitiveWordDetectStatusResponseDto = {
  /* 检测器是否就绪 */
  isReady: boolean
  /* 已加载的敏感词数量 */
  wordCount: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [SensitiveWordCountResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type SensitiveWordCountResponseDto = {
  /* 当前加载的敏感词数量 */
  count: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [BaseForumTopicDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type BaseForumTopicDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 主题标题 */
  title: string
  /* 主题内容 */
  content: string
  /* 主题图片列表 */
  images: string[]
  /* 主题视频列表 */
  videos: string[]
  /* 关联的板块ID */
  sectionId: number
  /* 用户ID */
  userId: number
  /* 是否置顶 */
  isPinned: boolean
  /* 是否精华 */
  isFeatured: boolean
  /* 是否锁定 */
  isLocked: boolean
  /* 是否隐藏 */
  isHidden: boolean
  /* 审核角色（0=版主, 1=管理员） */
  auditRole?: number | null
  /* 关联的审核用户ID */
  auditById?: number | null
  /* 审核状态（0=待审核, 1=已通过, 2=已拒绝） */
  auditStatus: 0 | 1 | 2
  /* 审核拒绝原因 */
  auditReason?: string | null
  /* 审核时间 */
  auditAt?: string | null
  /* 浏览次数 */
  viewCount: number
  /* 点赞次数 */
  likeCount: number
  /* 评论次数 */
  commentCount: number
  /* 收藏次数 */
  favoriteCount: number
  /* 乐观锁版本号 */
  version: number
  /* 敏感词命中记录 */
  sensitiveWordHits?: any[] | null
  /* 最后评论时间 */
  lastCommentAt?: string | null
  /* 最后评论用户ID */
  lastCommentUserId?: number | null
  /* 删除时间 */
  deletedAt?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminForumTopicDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type AdminForumTopicDetailDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 主题标题 */
  title: string
  /* 主题内容 */
  content: string
  /* 主题图片列表 */
  images: string[]
  /* 主题视频列表 */
  videos: string[]
  /* 关联的板块ID */
  sectionId: number
  /* 用户ID */
  userId: number
  /* 是否置顶 */
  isPinned: boolean
  /* 是否精华 */
  isFeatured: boolean
  /* 是否锁定 */
  isLocked: boolean
  /* 是否隐藏 */
  isHidden: boolean
  /* 审核状态（0=待审核, 1=已通过, 2=已拒绝） */
  auditStatus: 0 | 1 | 2
  /* 审核拒绝原因 */
  auditReason?: string | null
  /* 审核时间 */
  auditAt?: string | null
  /* 浏览次数 */
  viewCount: number
  /* 点赞次数 */
  likeCount: number
  /* 评论次数 */
  commentCount: number
  /* 收藏次数 */
  favoriteCount: number
  /* 乐观锁版本号 */
  version: number
  /* 敏感词命中记录 */
  sensitiveWordHits?: any[] | null
  /* 最后评论时间 */
  lastCommentAt?: string | null
  /* 最后评论用户ID */
  lastCommentUserId?: number | null
  /* 主题标签关联 */
  topicTags: AdminForumTopicTagRelationDto[]
  /* 所属板块 */
  section: AdminForumTopicSectionDto
  /* 发帖用户 */
  user: AdminForumTopicUserDto

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminForumTopicTagRelationDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type AdminForumTopicTagRelationDto = {
  /* 关联ID */
  id: number
  /* 主题ID */
  topicId: number
  /* 标签ID */
  tagId: number
  /* 创建时间 */
  createdAt: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminForumTopicSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type AdminForumTopicSectionDto = {
  /* 主键id */
  id: number
  /* 板块名称 */
  name: string
  /* 板块图标 */
  icon: string
  /* 板块封面 */
  cover: string
  /* 是否启用 */
  isEnabled: boolean
  /* 审核策略（0=NONE，1=SEVERE_SENSITIVE_WORD，2=GENERAL_SENSITIVE_WORD，3=MILD_SENSITIVE_WORD，4=MANUAL） */
  topicReviewPolicy: 0 | 1 | 2 | 3 | 4
  /* 板块描述 */
  description?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminForumTopicUserDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type AdminForumTopicUserDto = {
  /* 主键id */
  id: number
  /* 等级ID */
  levelId?: number | null
  /* 昵称 */
  nickname: string
  /* 头像URL */
  avatarUrl?: string | null
  /* 个性签名 */
  signature?: string | null
  /* 个人简介 */
  bio?: string | null
  /* 是否启用 */
  isEnabled: boolean
  /* 积分 */
  points: number
  /* 用户状态（1=NORMAL，2=MUTED，3=PERMANENT_MUTED，4=BANNED，5=PERMANENT_BANNED） */
  status: 1 | 2 | 3 | 4 | 5
  /* 封禁原因 */
  banReason?: string | null
  /* 封禁到期时间 */
  banUntil?: string | null
  /* 用户计数 */
  counts?: AdminForumTopicUserCountDto
  /* 论坛等级 */
  level?: AdminForumTopicUserLevelDto

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminForumTopicUserCountDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type AdminForumTopicUserCountDto = {
  /* 发出的评论总数 */
  commentCount: number
  /* 发出的点赞总数 */
  likeCount: number
  /* 发出的收藏总数 */
  favoriteCount: number
  /* 论坛主题数 */
  forumTopicCount: number
  /* 评论收到的点赞总数 */
  commentReceivedLikeCount: number
  /* 论坛主题收到的点赞总数 */
  forumTopicReceivedLikeCount: number
  /* 论坛主题收到的收藏总数 */
  forumTopicReceivedFavoriteCount: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminForumTopicUserLevelDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type AdminForumTopicUserLevelDto = {
  /* 主键id */
  id: number
  /* 等级名称 */
  name: string
  /* 等级图标URL */
  icon?: string | null
  /* 排序值（数值越小越靠前） */
  sortOrder: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [CreateForumTopicDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type CreateForumTopicDto = {
  /* 关联的板块ID */
  sectionId: number
  /* 用户ID */
  userId: number
  /* 主题标题 */
  title: string
  /* 主题内容 */
  content: string
  /* 主题图片列表 */
  images?: any[] | null
  /* 主题视频列表 */
  videos?: any[] | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateForumTopicDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type UpdateForumTopicDto = {
  /* 主键id */
  id: number
  /* 主题标题 */
  title: string
  /* 主题内容 */
  content: string
  /* 主题图片列表 */
  images?: any[] | null
  /* 主题视频列表 */
  videos?: any[] | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateForumTopicPinnedDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type UpdateForumTopicPinnedDto = {
  /* 主键id */
  id: number
  /* 是否置顶 */
  isPinned: boolean

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateForumTopicFeaturedDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type UpdateForumTopicFeaturedDto = {
  /* 主键id */
  id: number
  /* 是否精华 */
  isFeatured: boolean

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateForumTopicLockedDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type UpdateForumTopicLockedDto = {
  /* 主键id */
  id: number
  /* 是否锁定 */
  isLocked: boolean

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateForumTopicHiddenDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type UpdateForumTopicHiddenDto = {
  /* 主键id */
  id: number
  /* 是否隐藏 */
  isHidden: boolean

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateForumTopicAuditStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type UpdateForumTopicAuditStatusDto = {
  /* 主键id */
  id: number
  /* 审核状态（0=待审核, 1=已通过, 2=已拒绝） */
  auditStatus: 0 | 1 | 2
  /* 审核拒绝原因 */
  auditReason?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [BaseForumSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type BaseForumSectionDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 板块名称 */
  name: string
  /* 板块分组ID（为空表示未分组） */
  groupId?: number | null
  /* 用户等级规则ID（为空表示所有用户） */
  userLevelRuleId?: number | null
  /* 最后发表主题ID */
  lastTopicId?: number | null
  /* 板块图标 */
  icon: string
  /* 板块封面 */
  cover: string
  /* 排序权重 */
  sortOrder: number
  /* 是否启用 */
  isEnabled: boolean
  /* 审核策略（0=NONE，1=SEVERE_SENSITIVE_WORD，2=GENERAL_SENSITIVE_WORD，3=MILD_SENSITIVE_WORD，4=MANUAL） */
  topicReviewPolicy: 0 | 1 | 2 | 3 | 4
  /* 板块描述 */
  description?: string | null
  /* 备注信息 */
  remark?: string | null
  /* 主题数 */
  topicCount: number
  /* 评论数 */
  commentCount: number
  /* 关注人数 */
  followersCount: number
  /* 最后发表时间 */
  lastPostAt?: string | null
  /* 删除时间 */
  deletedAt?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [CreateForumSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type CreateForumSectionDto = {
  /* 板块名称 */
  name: string
  /* 板块分组ID（为空表示未分组） */
  groupId?: number | null
  /* 用户等级规则ID（为空表示所有用户） */
  userLevelRuleId?: number | null
  /* 板块图标 */
  icon: string
  /* 板块封面 */
  cover: string
  /* 排序权重 */
  sortOrder: number
  /* 是否启用 */
  isEnabled: boolean
  /* 审核策略（0=NONE，1=SEVERE_SENSITIVE_WORD，2=GENERAL_SENSITIVE_WORD，3=MILD_SENSITIVE_WORD，4=MANUAL） */
  topicReviewPolicy: 0 | 1 | 2 | 3 | 4
  /* 板块描述 */
  description?: string | null
  /* 备注信息 */
  remark?: string | null
  /* 关注人数 */
  followersCount: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateForumSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type UpdateForumSectionDto = {
  /* 板块名称 */
  name: string
  /* 板块分组ID（为空表示未分组） */
  groupId?: number | null
  /* 用户等级规则ID（为空表示所有用户） */
  userLevelRuleId?: number | null
  /* 板块图标 */
  icon: string
  /* 板块封面 */
  cover: string
  /* 排序权重 */
  sortOrder: number
  /* 是否启用 */
  isEnabled: boolean
  /* 审核策略（0=NONE，1=SEVERE_SENSITIVE_WORD，2=GENERAL_SENSITIVE_WORD，3=MILD_SENSITIVE_WORD，4=MANUAL） */
  topicReviewPolicy: 0 | 1 | 2 | 3 | 4
  /* 板块描述 */
  description?: string | null
  /* 备注信息 */
  remark?: string | null
  /* 关注人数 */
  followersCount: number
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ForumSectionFollowCountRepairResultDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumSectionFollowCountRepairResultDto = {
  /* 主键id */
  id: number
  /* 关注人数 */
  followersCount: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [DragReorderDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type DragReorderDto = {
  /* 拖拽的目标位置id */
  targetId: number
  /* 当前拖拽元素的id */
  dragId: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [BaseForumSectionGroupDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type BaseForumSectionGroupDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 分组名称 */
  name: string
  /* 分组描述 */
  description?: string | null
  /* 排序权重 */
  sortOrder: number
  /* 是否启用 */
  isEnabled: boolean
  /* 分组版主数量限制（0表示不限制） */
  maxModerators: number
  /* 删除时间 */
  deletedAt?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [CreateForumSectionGroupDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type CreateForumSectionGroupDto = {
  /* 分组名称 */
  name: string
  /* 分组描述 */
  description?: string | null
  /* 排序权重 */
  sortOrder: number
  /* 是否启用 */
  isEnabled: boolean
  /* 分组版主数量限制（0表示不限制） */
  maxModerators: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateForumSectionGroupDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type UpdateForumSectionGroupDto = {
  /* 分组名称 */
  name?: string
  /* 分组描述 */
  description?: string | null
  /* 排序权重 */
  sortOrder?: number
  /* 是否启用 */
  isEnabled?: boolean
  /* 分组版主数量限制（0表示不限制） */
  maxModerators?: number
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [BaseForumTagDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type BaseForumTagDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 标签名称 */
  name: string
  /* 标签图标URL */
  icon?: string | null
  /* 标签描述 */
  description?: string | null
  /* 是否启用 */
  isEnabled: boolean
  /* 使用次数 */
  useCount: number
  /* 排序权重 */
  sortOrder: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ForumTagDetailResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumTagDetailResponseDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 标签名称 */
  name: string
  /* 标签图标URL */
  icon?: string | null
  /* 标签描述 */
  description?: string | null
  /* 是否启用 */
  isEnabled: boolean
  /* 使用次数 */
  useCount: number
  /* 排序权重 */
  sortOrder: number
  /* 最近使用该标签的主题列表 */
  topics: ForumTagTopicSummaryDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ForumTagTopicSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type ForumTagTopicSummaryDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 主题标题 */
  title: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [CreateForumTagDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type CreateForumTagDto = {
  /* 标签名称 */
  name: string
  /* 标签图标URL */
  icon?: string | null
  /* 标签描述 */
  description?: string | null
  /* 是否启用 */
  isEnabled: boolean
  /* 排序权重 */
  sortOrder: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateForumTagDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type UpdateForumTagDto = {
  /* 标签名称 */
  name: string
  /* 标签图标URL */
  icon?: string | null
  /* 标签描述 */
  description?: string | null
  /* 是否启用 */
  isEnabled: boolean
  /* 排序权重 */
  sortOrder: number
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AssignForumTagToTopicDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type AssignForumTagToTopicDto = {
  /* 主题ID */
  topicId: number
  /* 标签ID */
  tagId: number

  /** 任意合法数值 */
  [property: string]: any
}