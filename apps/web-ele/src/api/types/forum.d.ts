/**
 *  类型定义 [ForumModeratorsPageRequest]
 *  @来源 论坛管理/版主管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumModeratorsPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 用户昵称关键词 */
  nickname?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 板块ID；用于筛出对该板块具有管理权限的版主。 */
  sectionId?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 用户id */
  userId?: number;
};

export type ForumModeratorsPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: ForumModeratorDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ForumModeratorsDetailRequest]
 *  @来源 论坛管理/版主管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumModeratorsDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type ForumModeratorsDetailResponse = ForumModeratorDto;

/**
 *  类型定义 [ForumModeratorsCreateRequest]
 *  @来源 论坛管理/版主管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumModeratorsCreateRequest = CreateForumModeratorDto;

export type ForumModeratorsCreateResponse = boolean;

/**
 *  类型定义 [ForumModeratorsUpdateRequest]
 *  @来源 论坛管理/版主管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumModeratorsUpdateRequest = UpdateForumModeratorDto;

export type ForumModeratorsUpdateResponse = boolean;

/**
 *  类型定义 [ForumModeratorsDeleteRequest]
 *  @来源 论坛管理/版主管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumModeratorsDeleteRequest = IdDto;

export type ForumModeratorsDeleteResponse = boolean;

/**
 *  类型定义 [ForumModeratorsAssignSectionRequest]
 *  @来源 论坛管理/版主管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumModeratorsAssignSectionRequest =
  AssignForumModeratorSectionDto;

export type ForumModeratorsAssignSectionResponse = boolean;

/**
 *  类型定义 [ForumModeratorApplicationPageRequest]
 *  @来源 论坛管理/版主申请
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumModeratorApplicationPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 申请人用户ID */
  applicantId?: number;

  /* 结束时间 */
  endDate?: null | string;

  /* 申请人昵称关键词 */
  nickname?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 申请板块ID */
  sectionId?: number;

  /* 开始时间 */
  startDate?: null | string;

  /* 申请状态（0=待审核；1=已通过；2=已拒绝） */
  status?: number;
};

export type ForumModeratorApplicationPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: ForumModeratorApplicationDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ForumModeratorApplicationDetailRequest]
 *  @来源 论坛管理/版主申请
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumModeratorApplicationDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type ForumModeratorApplicationDetailResponse =
  ForumModeratorApplicationDto;

/**
 *  类型定义 [ForumModeratorApplicationAuditRequest]
 *  @来源 论坛管理/版主申请
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumModeratorApplicationAuditRequest =
  AuditForumModeratorApplicationDto;

export type ForumModeratorApplicationAuditResponse = boolean;

/**
 *  类型定义 [ForumModeratorApplicationDeleteRequest]
 *  @来源 论坛管理/版主申请
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumModeratorApplicationDeleteRequest = IdDto;

export type ForumModeratorApplicationDeleteResponse = boolean;

/**
 *  类型定义 [ForumSearchPageRequest]
 *  @来源 论坛管理/搜索
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSearchPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 话题ID */
  hashtagId?: null | number;

  /* 搜索关键词 */
  keyword: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 板块ID */
  sectionId?: null | number;

  /* 排序类型（relevance=相关度；latest=最新；hot=最热） */
  sort?: null | string;

  /* 开始时间 */
  startDate?: null | string;

  /* 兼容旧标签ID筛选；与 hashtagId 等价，后续将移除 */
  tagId?: null | number;

  /* 搜索类型（all=全部；topic=主题；comment=评论） */
  type?: null | string;
};

export type ForumSearchPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: ForumSearchResultDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ForumSensitiveWordPageRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSensitiveWordPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 敏感词级别（1=严重；2=一般；3=轻微） */
  level?: number;

  /* 匹配模式（1=精确匹配；2=模糊匹配） */
  matchMode?: number;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 敏感词类型（1=政治；2=色情；3=暴力；4=广告；5=其他） */
  type?: number;

  /* 敏感词 */
  word?: string;
};

export type ForumSensitiveWordPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseSensitiveWordDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ForumSensitiveWordCreateRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSensitiveWordCreateRequest = CreateSensitiveWordDto;

export type ForumSensitiveWordCreateResponse = boolean;

/**
 *  类型定义 [ForumSensitiveWordUpdateRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSensitiveWordUpdateRequest = UpdateSensitiveWordDto;

export type ForumSensitiveWordUpdateResponse = boolean;

/**
 *  类型定义 [ForumSensitiveWordDeleteRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSensitiveWordDeleteRequest = IdDto;

export type ForumSensitiveWordDeleteResponse = boolean;

/**
 *  类型定义 [ForumSensitiveWordUpdateStatusRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSensitiveWordUpdateStatusRequest = UpdateEnabledStatusDto;

export type ForumSensitiveWordUpdateStatusResponse = boolean;

/**
 *  类型定义 [ForumSensitiveWordDetectRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSensitiveWordDetectRequest = SensitiveWordDetectDto;

export type ForumSensitiveWordDetectResponse = SensitiveWordDetectResponseDto;

/**
 *  类型定义 [ForumSensitiveWordStatsRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSensitiveWordStatsRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 统计类型（按级别统计；按类型统计；热门敏感词统计；最近命中统计） */
  type?: null | string;
};

export type ForumSensitiveWordStatsResponse =
  SensitiveWordStatisticsResponseDto;

export type ForumSensitiveWordStatsFullResponse =
  SensitiveWordStatisticsDataDto;

/**
 *  类型定义 [ForumSensitiveWordReplaceRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSensitiveWordReplaceRequest = SensitiveWordReplaceDto;

export type ForumSensitiveWordReplaceResponse = SensitiveWordReplaceResponseDto;

/**
 *  类型定义 [ForumSensitiveWordDetectHighestLevelRequest]
 *  @来源 论坛管理/敏感词管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSensitiveWordDetectHighestLevelRequest =
  SensitiveWordDetectDto;

export type ForumSensitiveWordDetectHighestLevelResponse =
  SensitiveWordHighestLevelResponseDto;

export type ForumSensitiveWordDetectStatusResponse =
  SensitiveWordDetectStatusResponseDto;

export type ForumSensitiveWordCountResponse = SensitiveWordCountResponseDto;

/**
 *  类型定义 [ForumTopicPageRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumTopicPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 审核状态（0=待审核；1=已通过；2=已拒绝） */
  auditStatus?: number;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否精华 */
  isFeatured?: boolean;

  /* 是否隐藏 */
  isHidden?: boolean;

  /* 是否锁定 */
  isLocked?: boolean;

  /* 是否置顶 */
  isPinned?: boolean;

  /* 关键词搜索（标题或内容） */
  keyword?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 关联的板块ID */
  sectionId?: number;

  /* 开始时间 */
  startDate?: null | string;

  /* 用户ID */
  userId?: number;
};

export type ForumTopicPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: AdminForumTopicPageItemDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ForumTopicDetailRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumTopicDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type ForumTopicDetailResponse = AdminForumTopicDetailDto;

/**
 *  类型定义 [ForumTopicCreateRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumTopicCreateRequest = CreateForumTopicDto;

export type ForumTopicCreateResponse = IdDto;

/**
 *  类型定义 [ForumTopicUpdateRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumTopicUpdateRequest = UpdateForumTopicDto;

export type ForumTopicUpdateResponse = boolean;

/**
 *  类型定义 [ForumTopicDeleteRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumTopicDeleteRequest = IdDto;

export type ForumTopicDeleteResponse = boolean;

/**
 *  类型定义 [ForumTopicMoveRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumTopicMoveRequest = MoveForumTopicDto;

export type ForumTopicMoveResponse = boolean;

/**
 *  类型定义 [ForumTopicUpdatePinnedRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumTopicUpdatePinnedRequest = UpdateForumTopicPinnedDto;

export type ForumTopicUpdatePinnedResponse = boolean;

/**
 *  类型定义 [ForumTopicUpdateFeaturedRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumTopicUpdateFeaturedRequest = UpdateForumTopicFeaturedDto;

export type ForumTopicUpdateFeaturedResponse = boolean;

/**
 *  类型定义 [ForumTopicUpdateLockedRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumTopicUpdateLockedRequest = UpdateForumTopicLockedDto;

export type ForumTopicUpdateLockedResponse = boolean;

/**
 *  类型定义 [ForumTopicUpdateHiddenRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumTopicUpdateHiddenRequest = UpdateForumTopicHiddenDto;

export type ForumTopicUpdateHiddenResponse = boolean;

/**
 *  类型定义 [ForumTopicUpdateAuditStatusRequest]
 *  @来源 论坛管理/主题管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumTopicUpdateAuditStatusRequest = UpdateForumTopicAuditStatusDto;

export type ForumTopicUpdateAuditStatusResponse = boolean;

/**
 *  类型定义 [ForumSectionsPageRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSectionsPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 板块分组ID；仅在筛选指定分组时传入 */
  groupId?: null | number;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 是否仅筛选未分组板块；为 true 时忽略 groupId */
  isUngrouped?: boolean | null;

  /* 板块名称 */
  name?: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 审核策略（0=不审核；1=严重敏感词触发审核；2=一般敏感词触发审核；3=轻度敏感词触发审核；4=强制人工审核） */
  topicReviewPolicy?: number;
};

export type ForumSectionsPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseForumSectionDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ForumSectionsDetailRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSectionsDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type ForumSectionsDetailResponse = BaseForumSectionDto;

export type ForumSectionsTreeResponse = ForumSectionTreeNodeDto[];

/**
 *  类型定义 [ForumSectionsCreateRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSectionsCreateRequest = CreateForumSectionDto;

export type ForumSectionsCreateResponse = boolean;

/**
 *  类型定义 [ForumSectionsUpdateRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSectionsUpdateRequest = UpdateForumSectionDto;

export type ForumSectionsUpdateResponse = boolean;

/**
 *  类型定义 [ForumSectionsDeleteRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSectionsDeleteRequest = IdDto;

export type ForumSectionsDeleteResponse = boolean;

/**
 *  类型定义 [ForumSectionsUpdateEnabledRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSectionsUpdateEnabledRequest = UpdateForumSectionEnabledDto;

export type ForumSectionsUpdateEnabledResponse = boolean;

/**
 *  类型定义 [ForumSectionsRebuildFollowCountRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSectionsRebuildFollowCountRequest = IdDto;

export type ForumSectionsRebuildFollowCountResponse =
  ForumSectionFollowCountRepairResultDto;

export type ForumSectionsRebuildFollowCountAllResponse = boolean;

/**
 *  类型定义 [ForumSectionsSwapSortOrderRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSectionsSwapSortOrderRequest = SwapForumSectionSortDto;

export type ForumSectionsSwapSortOrderResponse = boolean;

/**
 *  类型定义 [ForumSectionGroupsPageRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSectionGroupsPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 分组名称 */
  name?: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;
};

export type ForumSectionGroupsPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseForumSectionGroupDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ForumSectionGroupsDetailRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSectionGroupsDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type ForumSectionGroupsDetailResponse = BaseForumSectionGroupDto;

/**
 *  类型定义 [ForumSectionGroupsCreateRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSectionGroupsCreateRequest = CreateForumSectionGroupDto;

export type ForumSectionGroupsCreateResponse = boolean;

/**
 *  类型定义 [ForumSectionGroupsUpdateRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSectionGroupsUpdateRequest = UpdateForumSectionGroupDto;

export type ForumSectionGroupsUpdateResponse = boolean;

/**
 *  类型定义 [ForumSectionGroupsDeleteRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSectionGroupsDeleteRequest = IdDto;

export type ForumSectionGroupsDeleteResponse = boolean;

/**
 *  类型定义 [ForumSectionGroupsUpdateEnabledRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSectionGroupsUpdateEnabledRequest =
  UpdateForumSectionGroupEnabledDto;

export type ForumSectionGroupsUpdateEnabledResponse = boolean;

/**
 *  类型定义 [ForumSectionGroupsSwapSortOrderRequest]
 *  @来源 论坛管理/板块管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSectionGroupsSwapSortOrderRequest =
  SwapForumSectionGroupSortDto;

export type ForumSectionGroupsSwapSortOrderResponse = boolean;

/**
 *  类型定义 [ForumHashtagsPageRequest]
 *  @来源 论坛管理/话题管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumHashtagsPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 审核状态（0=待审核；1=已通过；2=已拒绝） */
  auditStatus?: number;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否隐藏 */
  isHidden?: boolean;

  /* 关键词搜索（displayName 或 slug） */
  keyword?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;
};

export type ForumHashtagsPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseForumHashtagDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ForumHashtagsDetailRequest]
 *  @来源 论坛管理/话题管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumHashtagsDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type ForumHashtagsDetailResponse = BaseForumHashtagDto;

/**
 *  类型定义 [ForumHashtagsCreateRequest]
 *  @来源 论坛管理/话题管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumHashtagsCreateRequest = CreateForumHashtagDto;

export type ForumHashtagsCreateResponse = boolean;

/**
 *  类型定义 [ForumHashtagsUpdateRequest]
 *  @来源 论坛管理/话题管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumHashtagsUpdateRequest = UpdateForumHashtagDto;

export type ForumHashtagsUpdateResponse = boolean;

/**
 *  类型定义 [ForumHashtagsUpdateHiddenRequest]
 *  @来源 论坛管理/话题管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumHashtagsUpdateHiddenRequest = UpdateForumHashtagHiddenDto;

export type ForumHashtagsUpdateHiddenResponse = boolean;

/**
 *  类型定义 [ForumHashtagsUpdateAuditStatusRequest]
 *  @来源 论坛管理/话题管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumHashtagsUpdateAuditStatusRequest =
  UpdateForumHashtagAuditStatusDto;

export type ForumHashtagsUpdateAuditStatusResponse = boolean;

/**
 *  类型定义 [ForumModeratorActionLogPageRequest]
 *  @来源 论坛管理/版主操作日志
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumModeratorActionLogPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 操作类型（1=置顶主题；2=取消置顶主题；3=加精主题；4=取消加精主题；5=锁定主题；6=取消锁定主题；7=删除主题；8=移动主题；9=审核主题；10=删除评论；11=隐藏主题；12=取消隐藏主题；13=审核评论；14=隐藏评论；15=取消隐藏评论） */
  actionType?: number;

  /* 结束时间 */
  endDate?: null | string;

  /* 版主ID */
  moderatorId?: number;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 操作目标ID */
  targetId?: number;

  /* 操作目标类型（1=论坛主题；2=论坛评论） */
  targetType?: number;
};

export type ForumModeratorActionLogPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: ForumModeratorActionLogDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ForumModeratorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumModeratorDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 用户头像 */
  avatar?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 所属分组 */
  group?: ForumModeratorGroupDto;
  /* 分组ID（为空表示非分组版主） */
  groupId?: null | number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 用户昵称 */
  nickname: string;
  /* 权限中文名称列表 */
  permissionNames: string[];
  /* 权限列表（1=置顶；2=加精；3=锁定；4=删除；5=审核；6=移动） */
  permissions: (1 | 2 | 3 | 4 | 5 | 6)[];
  /* 备注 */
  remark?: null | string;
  /* 版主角色类型（1=超级版主；2=分组版主；3=板块版主） */
  roleType: 1 | 2 | 3;
  /* 管理的板块列表 */
  sections: ForumModeratorSectionItemDto[];
  /* 更新时间 */
  updatedAt: string;

  /* 用户id */
  userId: number;
};

/**
 *  类型定义 [ForumModeratorGroupDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumModeratorGroupDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 分组ID */
  id: number;

  /* 分组名称 */
  name: string;
};

/**
 *  类型定义 [ForumModeratorSectionItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumModeratorSectionItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 板块自定义权限（1=置顶；2=加精；3=锁定；4=删除；5=审核；6=移动） */
  customPermissions: (1 | 2 | 3 | 4 | 5 | 6)[];
  /* 板块最终生效权限（1=置顶；2=加精；3=锁定；4=删除；5=审核；6=移动） */
  finalPermissions: (1 | 2 | 3 | 4 | 5 | 6)[];
  /* 板块ID */
  id: number;
  /* 是否继承基础权限 */
  inheritFromParent: boolean;

  /* 板块名称 */
  name: string;
};

/**
 *  类型定义 [CreateForumModeratorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateForumModeratorDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 分组ID（为空表示非分组版主） */
  groupId?: null | number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 版主权限列表（1=置顶；2=加精；3=锁定；4=删除；5=审核；6=移动） */
  permissions?: (1 | 2 | 3 | 4 | 5 | 6)[];
  /* 备注 */
  remark?: null | string;
  /* 版主角色类型（1=超级版主；2=分组版主；3=板块版主） */
  roleType: 1 | 2 | 3;
  /* 板块ID列表；仅板块版主场景使用。 */
  sectionIds?: number[];

  /* 用户id */
  userId: number;
};

/**
 *  类型定义 [UpdateForumModeratorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateForumModeratorDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 分组ID（为空表示非分组版主） */
  groupId?: null | number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean;
  /* 版主权限列表（1=置顶；2=加精；3=锁定；4=删除；5=审核；6=移动） */
  permissions?: (1 | 2 | 3 | 4 | 5 | 6)[];
  /* 备注 */
  remark?: null | string;
  /* 版主角色类型（1=超级版主；2=分组版主；3=板块版主） */
  roleType?: 1 | 2 | 3;

  /* 板块ID列表；仅板块版主场景使用。 */
  sectionIds?: number[];
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [AssignForumModeratorSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AssignForumModeratorSectionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 版主ID */
  moderatorId: number;
  /* 版主权限列表（1=置顶；2=加精；3=锁定；4=删除；5=审核；6=移动） */
  permissions?: (1 | 2 | 3 | 4 | 5 | 6)[];

  /* 板块ID列表；仅板块版主场景使用。 */
  sectionIds: number[];
};

/**
 *  类型定义 [ForumModeratorApplicationDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumModeratorApplicationDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 申请人信息 */
  applicant?: ForumModeratorApplicationUserDto;
  /* 申请人用户ID */
  applicantId: number;
  /* 审核时间 */
  auditAt?: null | string;
  /* 审核人ID */
  auditById?: null | number;
  /* 审核人信息 */
  auditor?: ForumModeratorApplicationUserDto;
  /* 审核意见 */
  auditReason?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 主键id */
  id: number;
  /* 权限名称列表 */
  permissionNames: string[];
  /* 申请权限列表（1=置顶；2=加精；3=锁定；4=删除；5=审核；6=移动） */
  permissions?: (1 | 2 | 3 | 4 | 5 | 6)[];
  /* 申请理由 */
  reason: string;
  /* 备注 */
  remark?: null | string;
  /* 板块信息 */
  section?: ForumModeratorApplicationSectionDto;
  /* 申请板块ID */
  sectionId: number;
  /* 申请状态（0=待审核；1=已通过；2=已拒绝） */
  status: 0 | 1 | 2;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [ForumModeratorApplicationUserDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumModeratorApplicationUserDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 头像URL */
  avatarUrl?: null | string;
  /* 主键id */
  id: number;

  /* 昵称 */
  nickname: string;
};

/**
 *  类型定义 [ForumModeratorApplicationSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumModeratorApplicationSectionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 板块封面 */
  cover: string;
  /* 板块描述 */
  description?: null | string;
  /* 板块图标 */
  icon: string;
  /* 主键id */
  id: number;

  /* 板块名称 */
  name: string;
};

/**
 *  类型定义 [AuditForumModeratorApplicationDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AuditForumModeratorApplicationDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 审核意见 */
  auditReason?: null | string;
  /* 主键id */
  id: number;
  /* 备注 */
  remark?: null | string;

  /* 申请状态（0=待审核；1=已通过；2=已拒绝） */
  status: 0 | 1 | 2;
};

/**
 *  类型定义 [ForumSearchResultDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSearchResultDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 评论内容摘要；仅评论搜索结果返回。 */
  commentContentSnippet?: null | string;
  /* 评论数 */
  commentCount: number;
  /* 评论ID；仅评论搜索结果返回。 */
  commentId?: null | number;
  /* 创建时间 */
  createdAt: string;
  /* 收藏数 */
  favoriteCount: number;
  /* 点赞数 */
  likeCount: number;
  /* 结果类型（topic=主题；comment=评论） */
  resultType: 'all' | 'comment' | 'topic';
  /* 板块ID */
  sectionId: number;
  /* 板块名称 */
  sectionName: string;
  /* 主题内容摘要 */
  topicContentSnippet?: null | string;
  /* 主题ID */
  topicId: number;
  /* 主题标题 */
  topicTitle: string;
  /* 用户头像 */
  userAvatarUrl?: null | string;
  /* 用户ID */
  userId: number;
  /* 用户昵称 */
  userNickname: string;

  /* 浏览数 */
  viewCount: number;
};

/**
 *  类型定义 [BaseSensitiveWordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseSensitiveWordDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 创建时间 */
  createdAt: string;
  /* 创建人ID */
  createdBy?: null | number;
  /* 命中次数 */
  hitCount: number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 最后命中时间 */
  lastHitAt?: null | string;
  /* 敏感词级别（1=严重；2=一般；3=轻微） */
  level: 1 | 2 | 3;
  /* 匹配模式（1=精确匹配；2=模糊匹配） */
  matchMode: 1 | 2;
  /* 备注 */
  remark?: null | string;
  /* 替换词 */
  replaceWord?: null | string;
  /* 敏感词类型（1=政治；2=色情；3=暴力；4=广告；5=其他） */
  type: 1 | 2 | 3 | 4 | 5;
  /* 更新时间 */
  updatedAt: string;
  /* 更新人ID */
  updatedBy?: null | number;

  /* 敏感词 */
  word: string;
};

/**
 *  类型定义 [CreateSensitiveWordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateSensitiveWordDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 是否启用 */
  isEnabled: boolean;
  /* 敏感词级别（1=严重；2=一般；3=轻微） */
  level: 1 | 2 | 3;
  /* 匹配模式（1=精确匹配；2=模糊匹配） */
  matchMode: 1 | 2;
  /* 备注 */
  remark?: null | string;
  /* 替换词 */
  replaceWord?: null | string;
  /* 敏感词类型（1=政治；2=色情；3=暴力；4=广告；5=其他） */
  type: 1 | 2 | 3 | 4 | 5;

  /* 敏感词 */
  word: string;
};

/**
 *  类型定义 [UpdateSensitiveWordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateSensitiveWordDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 敏感词级别（1=严重；2=一般；3=轻微） */
  level: 1 | 2 | 3;
  /* 匹配模式（1=精确匹配；2=模糊匹配） */
  matchMode: 1 | 2;
  /* 备注 */
  remark?: null | string;
  /* 替换词 */
  replaceWord?: null | string;
  /* 敏感词类型（1=政治；2=色情；3=暴力；4=广告；5=其他） */
  type: 1 | 2 | 3 | 4 | 5;

  /* 敏感词 */
  word: string;
};

/**
 *  类型定义 [UpdateEnabledStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateEnabledStatusDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 状态 true启用 false禁用 */
  isEnabled: boolean;
};

/**
 *  类型定义 [SensitiveWordDetectDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type SensitiveWordDetectDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 检测内容 */
  content: string;
};

/**
 *  类型定义 [SensitiveWordDetectResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type SensitiveWordDetectResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 最高敏感等级（1=严重；2=一般；3=轻微） */
  highestLevel?: 1 | 2 | 3 | null;

  /* 命中的敏感词列表 */
  hits: SensitiveWordHitDto[];
};

/**
 *  类型定义 [SensitiveWordHitDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type SensitiveWordHitDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 结束位置 */
  end: number;
  /* 命中字段（title=标题；content=正文） */
  field?: null | string;
  /* 敏感词级别（1=严重；2=一般；3=轻微） */
  level: 1 | 2 | 3;
  /* 替换词 */
  replaceWord?: null | string;
  /* 起始位置 */
  start: number;
  /* 敏感词类型（1=政治；2=色情；3=暴力；4=广告；5=其他） */
  type: 1 | 2 | 3 | 4 | 5;

  /* 敏感词 */
  word: string;
};

/**
 *  类型定义 [SensitiveWordStatisticsResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type SensitiveWordStatisticsResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 统计结果 */
  data: Record<string, any>[];

  /* 统计类型（按级别统计；按类型统计；热门敏感词统计；最近命中统计） */
  type?: 'level' | 'recentHits' | 'topHits' | 'type' | null;
};

/**
 *  类型定义 [SensitiveWordStatisticsDataDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type SensitiveWordStatisticsDataDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 禁用词数 */
  disabledWords: number;
  /* 启用词数 */
  enabledWords: number;
  /* 最近一月命中次数 */
  lastMonthHits: number;
  /* 最近一周命中次数 */
  lastWeekHits: number;
  /* 级别统计 */
  levelStatistics: SensitiveWordLevelStatisticsDto[];
  /* 最近命中词 */
  recentHitWords: SensitiveWordTopHitStatisticsDto[];
  /* 今日命中次数 */
  todayHits: number;
  /* 热门命中词 */
  topHitWords: SensitiveWordTopHitStatisticsDto[];
  /* 总命中次数 */
  totalHits: number;
  /* 总词数 */
  totalWords: number;

  /* 类型统计 */
  typeStatistics: SensitiveWordTypeStatisticsDto[];
};

/**
 *  类型定义 [SensitiveWordLevelStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type SensitiveWordLevelStatisticsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 词数量 */
  count: number;
  /* 命中次数 */
  hitCount: number;
  /* 敏感词级别（1=严重；2=一般；3=轻微） */
  level: 1 | 2 | 3;

  /* 级别名称 */
  levelName: string;
};

/**
 *  类型定义 [SensitiveWordTypeStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type SensitiveWordTypeStatisticsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 词数量 */
  count: number;
  /* 命中次数 */
  hitCount: number;
  /* 敏感词类型（1=政治；2=色情；3=暴力；4=广告；5=其他） */
  type: 1 | 2 | 3 | 4 | 5;

  /* 类型名称 */
  typeName: string;
};

/**
 *  类型定义 [SensitiveWordTopHitStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type SensitiveWordTopHitStatisticsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 命中次数 */
  hitCount: number;
  /* 最后命中时间 */
  lastHitAt?: null | string;
  /* 敏感词级别（1=严重；2=一般；3=轻微） */
  level: 1 | 2 | 3;
  /* 敏感词类型（1=政治；2=色情；3=暴力；4=广告；5=其他） */
  type: 1 | 2 | 3 | 4 | 5;

  /* 敏感词 */
  word: string;
};

/**
 *  类型定义 [SensitiveWordReplaceDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type SensitiveWordReplaceDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 检测内容 */
  content: string;

  /* 替换字符 */
  replaceChar?: null | string;
};

/**
 *  类型定义 [SensitiveWordReplaceResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type SensitiveWordReplaceResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 替换后的文本 */
  replacedText: string;
};

/**
 *  类型定义 [SensitiveWordHighestLevelResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type SensitiveWordHighestLevelResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 最高敏感等级（1=严重；2=一般；3=轻微） */
  highestLevel?: 1 | 2 | 3 | null;
};

/**
 *  类型定义 [SensitiveWordDetectStatusResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type SensitiveWordDetectStatusResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 检测器是否就绪 */
  isReady: boolean;

  /* 已加载的敏感词数量 */
  wordCount: number;
};

/**
 *  类型定义 [SensitiveWordCountResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type SensitiveWordCountResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 当前加载的敏感词数量 */
  count: number;
};

/**
 *  类型定义 [AdminForumTopicPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminForumTopicPageItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 审核时间 */
  auditAt?: null | string;
  /* 审核拒绝原因 */
  auditReason?: null | string;
  /* 审核状态（0=待审核；1=已通过；2=已拒绝） */
  auditStatus: 0 | 1 | 2;
  /* 评论次数 */
  commentCount: number;
  /* 主题列表预览；包含普通文本、@用户、#话题、表情片段 */
  contentPreview: ForumTopicContentPreviewDto;
  /* 创建时间 */
  createdAt: string;
  /* 收藏次数 */
  favoriteCount: number;
  /* 主键id */
  id: number;
  /* 主题图片列表 */
  images: string[];
  /* 是否精华 */
  isFeatured: boolean;
  /* 是否隐藏 */
  isHidden: boolean;
  /* 是否锁定 */
  isLocked: boolean;
  /* 是否置顶 */
  isPinned: boolean;
  /* 最后评论时间 */
  lastCommentAt?: null | string;
  /* 最后评论用户ID */
  lastCommentUserId?: null | number;
  /* 点赞次数 */
  likeCount: number;
  /* 关联的板块ID */
  sectionId: number;
  /* 所属板块摘要 */
  sectionSummary?: AdminForumTopicSectionSummaryDto;
  /* 主题标题 */
  title: string;
  /* 更新时间 */
  updatedAt: string;
  /* 用户ID */
  userId: number;
  /* 发帖用户摘要 */
  userSummary?: AdminForumTopicUserSummaryDto;
  /* 主题视频 JSON 值 */
  videos: string;

  /* 浏览次数 */
  viewCount: number;
};

/**
 *  类型定义 [ForumTopicContentPreviewDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumTopicContentPreviewDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 预览纯文本 */
  plainText: string;

  /* 预览片段 */
  segments: ForumTopicContentPreviewSegmentDto[];
};

/**
 *  类型定义 [ForumTopicContentPreviewSegmentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumTopicContentPreviewSegmentDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 话题展示名；type=hashtag 时返回 */
  displayName?: null | string;
  /* 表情资源 ID；type=emoji 且命中平台资源时返回 */
  emojiAssetId?: null | number;
  /* 话题 ID；type=hashtag 时返回 */
  hashtagId?: null | number;
  /* 表情资源类型（1=Unicode 表情；2=自定义表情）；type=emoji 时返回 */
  kind?: 1 | 2 | null;
  /* 被提及用户昵称；type=mention 时返回 */
  nickname?: null | string;
  /* 自定义表情短码；type=emoji 且 kind=2 时返回 */
  shortcode?: null | string;
  /* 话题 slug；type=hashtag 时返回 */
  slug?: null | string;
  /* 片段展示文本 */
  text: string;
  /* 片段类型：text=普通文本；mention=@用户；hashtag=#话题；emoji=表情 */
  type: 'emoji' | 'hashtag' | 'mention' | 'text';
  /* Unicode 表情序列；type=emoji 且 kind=1 时返回 */
  unicodeSequence?: null | string;

  /* 被提及用户 ID；type=mention 时返回 */
  userId?: null | number;
};

/**
 *  类型定义 [AdminForumTopicUserSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminForumTopicUserSummaryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 头像URL */
  avatarUrl?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 论坛等级名称 */
  levelName?: null | string;
  /* 昵称 */
  nickname: string;

  /* 用户状态（1=正常；2=禁言；3=永久禁言；4=封禁；5=永久封禁） */
  status: 1 | 2 | 3 | 4 | 5;
};

/**
 *  类型定义 [AdminForumTopicSectionSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminForumTopicSectionSummaryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 所属分组名称 */
  groupName?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 板块名称 */
  name: string;

  /* 审核策略（0=不审核；1=严重敏感词触发审核；2=一般敏感词触发审核；3=轻度敏感词触发审核；4=强制人工审核） */
  topicReviewPolicy: 0 | 1 | 2 | 3 | 4;
};

/**
 *  类型定义 [AdminForumTopicDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminForumTopicDetailDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 审核时间 */
  auditAt?: null | string;
  /* 审核人摘要 */
  auditorSummary?: InteractionActorSummaryDto;
  /* 审核拒绝原因 */
  auditReason?: null | string;
  /* 审核状态（0=待审核；1=已通过；2=已拒绝） */
  auditStatus: 0 | 1 | 2;
  /* 评论次数 */
  commentCount: number;
  /* 创建时间 */
  createdAt: string;
  /* 收藏次数 */
  favoriteCount: number;
  /* 主题关联话题 */
  hashtags: ForumHashtagBriefDto[];
  /* 主题正文 HTML；对外唯一正文表示 */
  html: string;
  /* 主键id */
  id: number;
  /* 主题图片列表 */
  images: string[];
  /* 是否精华 */
  isFeatured: boolean;
  /* 是否隐藏 */
  isHidden: boolean;
  /* 是否锁定 */
  isLocked: boolean;
  /* 是否置顶 */
  isPinned: boolean;
  /* 最后评论时间 */
  lastCommentAt?: null | string;
  /* 最后评论用户ID */
  lastCommentUserId?: null | number;
  /* 点赞次数 */
  likeCount: number;
  /* 所属板块 */
  section: AdminForumTopicSectionDto;
  /* 关联的板块ID */
  sectionId: number;
  /* 敏感词命中记录 */
  sensitiveWordHits?: SensitiveWordHitDto[];
  /* 主题标题 */
  title: string;
  /* 更新时间 */
  updatedAt: string;
  /* 发帖用户 */
  user?: AdminForumTopicUserDto;
  /* 用户ID */
  userId: number;
  /* 乐观锁版本号 */
  version: number;
  /* 主题视频 JSON 值 */
  videos: string;

  /* 浏览次数 */
  viewCount: number;
};

/**
 *  类型定义 [ForumHashtagBriefDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumHashtagBriefDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 可见评论引用数 */
  commentRefCount: number;
  /* 运营描述 */
  description?: null | string;
  /* 展示名称 */
  displayName: string;
  /* 关注人数 */
  followerCount: number;
  /* 主键id */
  id: number;
  /* 最近一次被引用时间 */
  lastReferencedAt?: null | string;
  /* 归一化 slug */
  slug: string;

  /* 可见主题引用数 */
  topicRefCount: number;
};

/**
 *  类型定义 [AdminForumTopicSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminForumTopicSectionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 板块封面 */
  cover: string;
  /* 板块描述 */
  description?: null | string;
  /* 板块图标 */
  icon: string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 板块名称 */
  name: string;

  /* 审核策略（0=不审核；1=严重敏感词触发审核；2=一般敏感词触发审核；3=轻度敏感词触发审核；4=强制人工审核） */
  topicReviewPolicy: 0 | 1 | 2 | 3 | 4;
};

/**
 *  类型定义 [AdminForumTopicUserDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminForumTopicUserDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 头像URL */
  avatarUrl?: null | string;
  /* 封禁原因 */
  banReason?: null | string;
  /* 封禁到期时间 */
  banUntil?: null | string;
  /* 个人简介 */
  bio?: null | string;
  /* 用户计数 */
  counts?: AdminForumTopicUserCountDto;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 论坛等级 */
  level?: AdminForumTopicUserLevelDto;
  /* 等级ID */
  levelId?: null | number;
  /* 昵称 */
  nickname: string;
  /* 当前积分 */
  points: number;
  /* 个性签名 */
  signature?: null | string;

  /* 用户状态（1=正常；2=禁言；3=永久禁言；4=封禁；5=永久封禁） */
  status: 1 | 2 | 3 | 4 | 5;
};

/**
 *  类型定义 [AdminForumTopicUserCountDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminForumTopicUserCountDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 发出的评论总数 */
  commentCount: number;
  /* 评论收到的点赞总数 */
  commentReceivedLikeCount: number;
  /* 发出的收藏总数 */
  favoriteCount: number;
  /* 论坛主题数 */
  forumTopicCount: number;
  /* 论坛主题收到的收藏总数 */
  forumTopicReceivedFavoriteCount: number;
  /* 论坛主题收到的点赞总数 */
  forumTopicReceivedLikeCount: number;

  /* 发出的点赞总数 */
  likeCount: number;
};

/**
 *  类型定义 [AdminForumTopicUserLevelDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminForumTopicUserLevelDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 等级图标URL */
  icon?: null | string;
  /* 主键id */
  id: number;
  /* 等级名称 */
  name: string;

  /* 排序值（0=默认排序，数值越小越靠前） */
  sortOrder: number;
};

/**
 *  类型定义 [InteractionActorSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
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
 *  类型定义 [CreateForumTopicDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateForumTopicDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 正文 HTML；唯一写入合同，纯文本编辑器也需输出最小 HTML */
  html: string;
  /* 主题图片列表 */
  images?: string[];
  /* 关联的板块ID */
  sectionId: number;
  /* 主题标题 */
  title?: string;
  /* 用户ID */
  userId: number;

  /* 主题视频 JSON 值 */
  videos?: string;
};

/**
 *  类型定义 [UpdateForumTopicDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateForumTopicDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 正文 HTML；唯一写入合同，纯文本编辑器也需输出最小 HTML */
  html: string;
  /* 主键id */
  id: number;
  /* 主题图片列表 */
  images?: string[];
  /* 主题标题 */
  title?: string;

  /* 主题视频 JSON 值 */
  videos?: string;
};

/**
 *  类型定义 [MoveForumTopicDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type MoveForumTopicDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 关联的板块ID */
  sectionId: number;
};

/**
 *  类型定义 [UpdateForumTopicPinnedDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateForumTopicPinnedDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 是否置顶 */
  isPinned: boolean;
};

/**
 *  类型定义 [UpdateForumTopicFeaturedDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateForumTopicFeaturedDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 是否精华 */
  isFeatured: boolean;
};

/**
 *  类型定义 [UpdateForumTopicLockedDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateForumTopicLockedDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 是否锁定 */
  isLocked: boolean;
};

/**
 *  类型定义 [UpdateForumTopicHiddenDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateForumTopicHiddenDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 是否隐藏 */
  isHidden: boolean;
};

/**
 *  类型定义 [UpdateForumTopicAuditStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateForumTopicAuditStatusDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 审核拒绝原因 */
  auditReason?: null | string;
  /* 审核状态（0=待审核；1=已通过；2=已拒绝） */
  auditStatus: 0 | 1 | 2;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [BaseForumSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseForumSectionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 评论数 */
  commentCount: number;
  /* 板块封面 */
  cover: string;
  /* 创建时间 */
  createdAt: string;
  /* 板块描述 */
  description?: null | string;
  /* 关注人数 */
  followersCount: number;
  /* 板块分组ID（为空表示未分组） */
  groupId?: null | number;
  /* 板块图标 */
  icon: string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 最后发表时间 */
  lastPostAt?: null | string;
  /* 最后发表主题ID */
  lastTopicId?: null | number;
  /* 板块名称 */
  name: string;
  /* 备注信息 */
  remark?: null | string;
  /* 排序权重 */
  sortOrder: number;
  /* 主题数 */
  topicCount: number;
  /* 审核策略（0=不审核；1=严重敏感词触发审核；2=一般敏感词触发审核；3=轻度敏感词触发审核；4=强制人工审核） */
  topicReviewPolicy: 0 | 1 | 2 | 3 | 4;
  /* 更新时间 */
  updatedAt: string;

  /* 用户等级规则ID（为空表示所有用户） */
  userLevelRuleId?: null | number;
};

/**
 *  类型定义 [ForumSectionTreeNodeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSectionTreeNodeDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 分组信息；未分组节点为空 */
  group?: AdminForumSectionTreeGroupDto;
  /* 是否为未分组节点 */
  isUngrouped: boolean;

  /* 该节点下的板块列表 */
  sections: AdminForumSectionTreeSectionDto[];
};

/**
 *  类型定义 [AdminForumSectionTreeGroupDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminForumSectionTreeGroupDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 创建时间 */
  createdAt: string;
  /* 分组描述 */
  description?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 分组版主数量限制（0表示不限制） */
  maxModerators: number;
  /* 分组名称 */
  name: string;
  /* 排序权重 */
  sortOrder: number;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [AdminForumSectionTreeSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminForumSectionTreeSectionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 评论数 */
  commentCount: number;
  /* 板块封面 */
  cover: string;
  /* 创建时间 */
  createdAt: string;
  /* 板块描述 */
  description?: null | string;
  /* 关注人数 */
  followersCount: number;
  /* 板块分组ID（为空表示未分组） */
  groupId?: null | number;
  /* 板块图标 */
  icon: string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 最后发表时间 */
  lastPostAt?: null | string;
  /* 最后发表主题ID */
  lastTopicId?: null | number;
  /* 板块名称 */
  name: string;
  /* 备注信息 */
  remark?: null | string;
  /* 排序权重 */
  sortOrder: number;
  /* 主题数 */
  topicCount: number;
  /* 审核策略（0=不审核；1=严重敏感词触发审核；2=一般敏感词触发审核；3=轻度敏感词触发审核；4=强制人工审核） */
  topicReviewPolicy: 0 | 1 | 2 | 3 | 4;
  /* 更新时间 */
  updatedAt: string;

  /* 用户等级规则ID（为空表示所有用户） */
  userLevelRuleId?: null | number;
};

/**
 *  类型定义 [CreateForumSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateForumSectionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 板块封面 */
  cover: string;
  /* 板块描述 */
  description?: null | string;
  /* 板块分组ID（为空表示未分组） */
  groupId?: null | number;
  /* 板块图标 */
  icon: string;
  /* 是否启用 */
  isEnabled: boolean;
  /* 板块名称 */
  name: string;
  /* 备注信息 */
  remark?: null | string;
  /* 排序权重 */
  sortOrder: number;
  /* 审核策略（0=不审核；1=严重敏感词触发审核；2=一般敏感词触发审核；3=轻度敏感词触发审核；4=强制人工审核） */
  topicReviewPolicy: 0 | 1 | 2 | 3 | 4;

  /* 用户等级规则ID（为空表示所有用户） */
  userLevelRuleId?: null | number;
};

/**
 *  类型定义 [UpdateForumSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateForumSectionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 板块封面 */
  cover?: string;
  /* 板块描述 */
  description?: null | string;
  /* 板块分组ID（为空表示未分组） */
  groupId?: null | number;
  /* 板块图标 */
  icon?: string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean;
  /* 板块名称 */
  name?: string;
  /* 备注信息 */
  remark?: null | string;
  /* 排序权重 */
  sortOrder?: number;
  /* 审核策略（0=不审核；1=严重敏感词触发审核；2=一般敏感词触发审核；3=轻度敏感词触发审核；4=强制人工审核） */
  topicReviewPolicy?: 0 | 1 | 2 | 3 | 4;

  /* 用户等级规则ID（为空表示所有用户） */
  userLevelRuleId?: null | number;
};

/**
 *  类型定义 [UpdateForumSectionEnabledDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateForumSectionEnabledDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 是否启用 */
  isEnabled: boolean;
};

/**
 *  类型定义 [ForumSectionFollowCountRepairResultDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumSectionFollowCountRepairResultDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 关注人数 */
  followersCount: number;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [SwapForumSectionSortDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type SwapForumSectionSortDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 当前拖拽元素的id */
  dragId: number;

  /* 拖拽的目标位置id */
  targetId: number;
};

/**
 *  类型定义 [BaseForumSectionGroupDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseForumSectionGroupDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 创建时间 */
  createdAt: string;
  /* 分组描述 */
  description?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 分组版主数量限制（0表示不限制） */
  maxModerators: number;
  /* 分组名称 */
  name: string;
  /* 排序权重 */
  sortOrder: number;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CreateForumSectionGroupDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateForumSectionGroupDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 分组描述 */
  description?: null | string;
  /* 是否启用 */
  isEnabled: boolean;
  /* 分组版主数量限制（0表示不限制） */
  maxModerators: number;
  /* 分组名称 */
  name: string;

  /* 排序权重 */
  sortOrder: number;
};

/**
 *  类型定义 [UpdateForumSectionGroupDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateForumSectionGroupDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 分组描述 */
  description?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean;
  /* 分组版主数量限制（0表示不限制） */
  maxModerators?: number;
  /* 分组名称 */
  name?: string;

  /* 排序权重 */
  sortOrder?: number;
};

/**
 *  类型定义 [UpdateForumSectionGroupEnabledDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateForumSectionGroupEnabledDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 是否启用 */
  isEnabled: boolean;
};

/**
 *  类型定义 [SwapForumSectionGroupSortDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type SwapForumSectionGroupSortDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 当前拖拽元素的id */
  dragId: number;

  /* 拖拽的目标位置id */
  targetId: number;
};

/**
 *  类型定义 [BaseForumHashtagDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseForumHashtagDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 审核时间 */
  auditAt?: null | string;
  /* 审核人 ID */
  auditById?: null | number;
  /* 审核原因 */
  auditReason?: null | string;
  /* 审核角色（0=版主；1=管理员） */
  auditRole?: 0 | 1 | null;
  /* 审核状态（0=待审核；1=已通过；2=已拒绝） */
  auditStatus: 0 | 1 | 2;
  /* 可见评论引用数 */
  commentRefCount: number;
  /* 创建时间 */
  createdAt: string;
  /* 创建该话题资源的用户 ID */
  createdByUserId?: null | number;
  /* 创建来源（1=管理员创建；2=topic 正文自动创建；3=comment 正文自动创建） */
  createSourceType: 1 | 2 | 3;
  /* 运营描述 */
  description?: null | string;
  /* 展示名称 */
  displayName: string;
  /* 关注人数 */
  followerCount: number;
  /* 主键id */
  id: number;
  /* 是否隐藏 */
  isHidden: boolean;
  /* 最近一次被引用时间 */
  lastReferencedAt?: null | string;
  /* 人工热度加权 */
  manualBoost: number;
  /* 敏感词命中记录 */
  sensitiveWordHits?: SensitiveWordHitDto[];
  /* 归一化 slug */
  slug: string;
  /* 可见主题引用数 */
  topicRefCount: number;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CreateForumHashtagDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateForumHashtagDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 运营描述 */
  description?: null | string;
  /* 展示名称 */
  displayName: string;

  /* 人工热度加权 */
  manualBoost?: number;
};

/**
 *  类型定义 [UpdateForumHashtagDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateForumHashtagDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 运营描述 */
  description?: null | string;
  /* 主键id */
  id: number;

  /* 人工热度加权 */
  manualBoost?: number;
};

/**
 *  类型定义 [UpdateForumHashtagHiddenDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateForumHashtagHiddenDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 是否隐藏 */
  isHidden: boolean;
};

/**
 *  类型定义 [UpdateForumHashtagAuditStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateForumHashtagAuditStatusDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 审核原因 */
  auditReason?: null | string;
  /* 审核状态（0=待审核；1=已通过；2=已拒绝） */
  auditStatus: 0 | 1 | 2;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [ForumModeratorActionLogDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumModeratorActionLogDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 操作描述 */
  actionDescription: string;
  /* 操作类型（1=置顶主题；2=取消置顶主题；3=加精主题；4=取消加精主题；5=锁定主题；6=取消锁定主题；7=删除主题；8=移动主题；9=审核主题；10=删除评论；11=隐藏主题；12=取消隐藏主题；13=审核评论；14=隐藏评论；15=取消隐藏评论） */
  actionType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
  /* 操作后数据快照 */
  afterData?: null | string;
  /* 操作前数据快照 */
  beforeData?: null | string;
  /* 操作时间 */
  createdAt: string;
  /* 主键id */
  id: number;
  /* 版主ID */
  moderatorId: number;
  /* 操作目标ID */
  targetId: number;

  /* 操作目标类型（1=论坛主题；2=论坛评论） */
  targetType: 1 | 2;
};
