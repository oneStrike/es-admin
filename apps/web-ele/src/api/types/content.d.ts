/**
 *  类型定义 [ContentComicCreateRequest]
 *  @来源 内容管理/漫画管理/基础信息
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicCreateRequest = CreateWorkDto;

export type ContentComicCreateResponse = boolean;

/**
 *  类型定义 [ContentComicPageRequest]
 *  @来源 内容管理/漫画管理/基础信息
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicPageRequest = {
  /* 年龄分级 */
  ageRating?: null | string;

  /* 作者名称 */
  author?: null | string;

  /* 作者ID */
  authorId?: null | number;

  /* 分类ID列表 */
  categoryIds?: null | number[];

  /* 结束时间 */
  endDate?: null | string;

  /* 是否热门 */
  isHot?: boolean | null;

  /* 是否新作 */
  isNew?: boolean | null;

  /* 是否发布 */
  isPublished?: boolean | null;

  /* 是否推荐 */
  isRecommended?: boolean | null;

  /* 语言代码 */
  language?: null | string;

  /* 作品名称 */
  name?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 出版社 */
  publisher?: null | string;

  /* 地区代码 */
  region?: null | string;

  /* 连载状态（0=未开始，1=连载中，2=已完结，3=暂停更新，4=已停更） */
  serialStatus?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 标签ID列表 */
  tagIds?: null | number[];

  /* 作品类型（1=漫画；2=小说） */
  type?: null | number;
};

export type ContentComicPageResponse = {
  /* 列表数据 */
  list?: null | PageWorkDto[];

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 每页条数 */
  pageSize?: null | number;

  /* 总条数 */
  total?: null | number;
};

/**
 *  类型定义 [ContentComicDetailRequest]
 *  @来源 内容管理/漫画管理/基础信息
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicDetailRequest = {
  /* 主键id */
  id: number;
};

export type ContentComicDetailResponse = AdminWorkDetailDto;

/**
 *  类型定义 [ContentComicUpdateRequest]
 *  @来源 内容管理/漫画管理/基础信息
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicUpdateRequest = UpdateWorkDto;

export type ContentComicUpdateResponse = boolean;

/**
 *  类型定义 [ContentComicUpdateStatusRequest]
 *  @来源 内容管理/漫画管理/基础信息
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicUpdateStatusRequest = UpdateWorkStatusDto;

export type ContentComicUpdateStatusResponse = boolean;

/**
 *  类型定义 [ContentComicUpdateRecommendedRequest]
 *  @来源 内容管理/漫画管理/基础信息
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicUpdateRecommendedRequest = UpdateWorkRecommendedDto;

export type ContentComicUpdateRecommendedResponse = boolean;

/**
 *  类型定义 [ContentComicUpdateHotRequest]
 *  @来源 内容管理/漫画管理/基础信息
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicUpdateHotRequest = UpdateWorkHotDto;

export type ContentComicUpdateHotResponse = boolean;

/**
 *  类型定义 [ContentComicUpdateNewRequest]
 *  @来源 内容管理/漫画管理/基础信息
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicUpdateNewRequest = UpdateWorkNewDto;

export type ContentComicUpdateNewResponse = boolean;

/**
 *  类型定义 [ContentComicDeleteRequest]
 *  @来源 内容管理/漫画管理/基础信息
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicDeleteRequest = IdDto;

export type ContentComicDeleteResponse = boolean;

/**
 *  类型定义 [ContentComicChapterCreateRequest]
 *  @来源 内容管理/漫画管理/章节管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicChapterCreateRequest = CreateWorkChapterDto;

export type ContentComicChapterCreateResponse = boolean;

/**
 *  类型定义 [ContentComicChapterPageRequest]
 *  @来源 内容管理/漫画管理/章节管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicChapterPageRequest = {
  /* 是否允许评论 */
  canComment?: boolean | null;

  /* 是否允许下载 */
  canDownload?: boolean | null;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否试读 */
  isPreview?: boolean | null;

  /* 是否发布 */
  isPublished?: boolean | null;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 章节标题 */
  title?: null | string;

  /* 查看规则（-1=继承作品；0=所有人可见；1=登录用户可见；2=VIP可见；3=需购买可见） */
  viewRule?: null | number;

  /* 作品ID */
  workId: number;
};

export type ContentComicChapterPageResponse = {
  /* 列表数据 */
  list?: AdminWorkChapterPageItemDto[] | null;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 每页条数 */
  pageSize?: null | number;

  /* 总条数 */
  total?: null | number;
};

/**
 *  类型定义 [ContentComicChapterDetailRequest]
 *  @来源 内容管理/漫画管理/章节管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicChapterDetailRequest = {
  /* 主键id */
  id: number;
};

export type ContentComicChapterDetailResponse = AdminWorkChapterDetailDto;

/**
 *  类型定义 [ContentComicChapterUpdateRequest]
 *  @来源 内容管理/漫画管理/章节管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicChapterUpdateRequest = UpdateWorkChapterDto;

export type ContentComicChapterUpdateResponse = boolean;

/**
 *  类型定义 [ContentComicChapterDeleteRequest]
 *  @来源 内容管理/漫画管理/章节管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicChapterDeleteRequest = IdDto;

export type ContentComicChapterDeleteResponse = boolean;

/**
 *  类型定义 [ContentComicChapterBatchDeleteRequest]
 *  @来源 内容管理/漫画管理/章节管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicChapterBatchDeleteRequest = IdsDto;

export type ContentComicChapterBatchDeleteResponse = boolean;

/**
 *  类型定义 [ContentComicChapterBatchUpdateStatusRequest]
 *  @来源 内容管理/漫画管理/章节管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicChapterBatchUpdateStatusRequest =
  BatchUpdatePublishedStatusDto;

export type ContentComicChapterBatchUpdateStatusResponse = boolean;

/**
 *  类型定义 [ContentComicChapterSwapSortOrderRequest]
 *  @来源 内容管理/漫画管理/章节管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicChapterSwapSortOrderRequest = DragReorderDto;

export type ContentComicChapterSwapSortOrderResponse = boolean;

/**
 *  类型定义 [ContentComicChapterContentListRequest]
 *  @来源 内容管理/漫画管理/章节内容
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicChapterContentListRequest = {
  /* 主键id */
  id: number;
};

export type ContentComicChapterContentListResponse = string[];

/**
 *  类型定义 [ContentComicChapterContentUploadRequest]
 *  @来源 内容管理/漫画管理/章节内容
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicChapterContentUploadRequest = {
  /* 章节ID */
  chapterId: number;

  /* 作品ID */
  workId: number;
};

export type ContentComicChapterContentUploadResponse = UploadResponseDto;

/**
 *  类型定义 [ContentComicChapterContentUpdateRequest]
 *  @来源 内容管理/漫画管理/章节内容
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicChapterContentUpdateRequest = UpdateComicContentDto;

export type ContentComicChapterContentUpdateResponse = boolean;

/**
 *  类型定义 [ContentComicChapterContentDeleteRequest]
 *  @来源 内容管理/漫画管理/章节内容
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicChapterContentDeleteRequest = DeleteComicContentDto;

export type ContentComicChapterContentDeleteResponse = boolean;

/**
 *  类型定义 [ContentComicChapterContentMoveRequest]
 *  @来源 内容管理/漫画管理/章节内容
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicChapterContentMoveRequest = MoveComicContentDto;

export type ContentComicChapterContentMoveResponse = boolean;

/**
 *  类型定义 [ContentComicChapterContentClearRequest]
 *  @来源 内容管理/漫画管理/章节内容
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicChapterContentClearRequest = IdDto;

export type ContentComicChapterContentClearResponse = boolean;

/**
 *  类型定义 [ContentComicChapterContentArchivePreviewRequest]
 *  @来源 内容管理/漫画管理/章节内容
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicChapterContentArchivePreviewRequest = {
  /* 单章节压缩包对应的章节ID */
  chapterId?: null | number;

  /* 预解析会话工作流任务ID */
  jobId: string;

  /* 作品ID */
  workId: number;
};

export type ContentComicChapterContentArchivePreviewResponse =
  ComicArchiveTaskResponseDto;

/**
 *  类型定义 [ContentComicChapterContentArchiveSessionRequest]
 *  @来源 内容管理/漫画管理/章节内容
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicChapterContentArchiveSessionRequest =
  CreateComicArchiveSessionDto;

export type ContentComicChapterContentArchiveSessionResponse = WorkflowJobIdDto;

/**
 *  类型定义 [ContentComicChapterContentArchiveDiscardRequest]
 *  @来源 内容管理/漫画管理/章节内容
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicChapterContentArchiveDiscardRequest =
  ComicArchiveWorkflowJobIdDto;

export type ContentComicChapterContentArchiveDiscardResponse = WorkflowJobDto;

/**
 *  类型定义 [ContentComicChapterContentArchiveConfirmRequest]
 *  @来源 内容管理/漫画管理/章节内容
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicChapterContentArchiveConfirmRequest =
  ConfirmComicArchiveDto;

export type ContentComicChapterContentArchiveConfirmResponse = WorkflowJobDto;

/**
 *  类型定义 [ContentComicChapterContentArchiveDetailRequest]
 *  @来源 内容管理/漫画管理/章节内容
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicChapterContentArchiveDetailRequest = {
  /* 工作流任务ID */
  jobId: string;
};

export type ContentComicChapterContentArchiveDetailResponse =
  ComicArchiveTaskResponseDto;

export type ContentComicThirdPartyPlatformListResponse = PlatformResponseDto[];

/**
 *  类型定义 [ContentComicThirdPartySearchPageRequest]
 *  @来源 内容管理/漫画管理/三方平台解析
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicThirdPartySearchPageRequest = {
  /* 结束时间 */
  endDate?: null | string;

  /* 搜索关键词 */
  keyword: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 平台代码 */
  platform: string;

  /* 开始时间 */
  startDate?: null | string;
};

export type ContentComicThirdPartySearchPageResponse = {
  /* 列表数据 */
  list?: null | SearchComicItemDto[];

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 每页条数 */
  pageSize?: null | number;

  /* 总条数 */
  total?: null | number;
};

/**
 *  类型定义 [ContentComicThirdPartyDetailRequest]
 *  @来源 内容管理/漫画管理/三方平台解析
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicThirdPartyDetailRequest = {
  /* 漫画ID */
  comicId: string;

  /* 章节分组 */
  group?: null | string;

  /* 平台代码 */
  platform: string;
};

export type ContentComicThirdPartyDetailResponse = ThirdPartyComicDetailDto;

/**
 *  类型定义 [ContentComicThirdPartyChapterListRequest]
 *  @来源 内容管理/漫画管理/三方平台解析
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicThirdPartyChapterListRequest = {
  /* 漫画ID */
  comicId: string;

  /* 章节分组 */
  group?: null | string;

  /* 平台代码 */
  platform: string;
};

export type ContentComicThirdPartyChapterListResponse =
  ThirdPartyComicChapterDto[];

/**
 *  类型定义 [ContentComicThirdPartyChapterContentDetailRequest]
 *  @来源 内容管理/漫画管理/三方平台解析
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicThirdPartyChapterContentDetailRequest = {
  /* 三方章节内容接口版本；CopyManga 第一版使用 chapter，第二版及以上使用 chapterN */
  chapterApiVersion?: null | number;

  /* 章节ID */
  chapterId: string;

  /* 漫画ID */
  comicId: string;

  /* 章节分组 */
  group?: null | string;

  /* 平台代码 */
  platform: string;
};

export type ContentComicThirdPartyChapterContentDetailResponse =
  ThirdPartyComicChapterContentDto;

/**
 *  类型定义 [ContentComicThirdPartyImportPreviewRequest]
 *  @来源 内容管理/漫画管理/三方平台解析
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicThirdPartyImportPreviewRequest = DetailComicRequestDto;

export type ContentComicThirdPartyImportPreviewResponse =
  ThirdPartyComicImportPreviewDto;

/**
 *  类型定义 [ContentComicThirdPartyImportConfirmRequest]
 *  @来源 内容管理/漫画管理/三方平台解析
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicThirdPartyImportConfirmRequest =
  ThirdPartyComicImportRequestDto;

export type ContentComicThirdPartyImportConfirmResponse = WorkflowJobDto;

/**
 *  类型定义 [ContentComicThirdPartySyncLatestRequest]
 *  @来源 内容管理/漫画管理/三方平台解析
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicThirdPartySyncLatestRequest =
  ThirdPartyComicSyncLatestRequestDto;

export type ContentComicThirdPartySyncLatestResponse = WorkflowJobDto;

/**
 *  类型定义 [ContentComicThirdPartyImportItemPageRequest]
 *  @来源 内容管理/漫画管理/三方平台解析
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentComicThirdPartyImportItemPageRequest = {
  /* 结束时间 */
  endDate?: null | string;

  /* 工作流任务ID */
  jobId?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 条目状态（1=待处理；2=处理中；3=成功；4=失败；5=重试中；6=已跳过） */
  status?: null | number;
};

export type ContentComicThirdPartyImportItemPageResponse = {
  /* 列表数据 */
  list?: ContentImportItemDto[] | null;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 每页条数 */
  pageSize?: null | number;

  /* 总条数 */
  total?: null | number;
};

/**
 *  类型定义 [ContentNovelCreateRequest]
 *  @来源 内容管理/小说管理/基础信息
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentNovelCreateRequest = CreateWorkDto;

export type ContentNovelCreateResponse = boolean;

/**
 *  类型定义 [ContentNovelPageRequest]
 *  @来源 内容管理/小说管理/基础信息
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentNovelPageRequest = {
  /* 年龄分级 */
  ageRating?: null | string;

  /* 作者名称 */
  author?: null | string;

  /* 作者ID */
  authorId?: null | number;

  /* 分类ID列表 */
  categoryIds?: null | number[];

  /* 结束时间 */
  endDate?: null | string;

  /* 是否热门 */
  isHot?: boolean | null;

  /* 是否新作 */
  isNew?: boolean | null;

  /* 是否发布 */
  isPublished?: boolean | null;

  /* 是否推荐 */
  isRecommended?: boolean | null;

  /* 语言代码 */
  language?: null | string;

  /* 作品名称 */
  name?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 出版社 */
  publisher?: null | string;

  /* 地区代码 */
  region?: null | string;

  /* 连载状态（0=未开始，1=连载中，2=已完结，3=暂停更新，4=已停更） */
  serialStatus?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 标签ID列表 */
  tagIds?: null | number[];

  /* 作品类型（1=漫画；2=小说） */
  type?: null | number;
};

export type ContentNovelPageResponse = {
  /* 列表数据 */
  list?: null | PageWorkDto[];

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 每页条数 */
  pageSize?: null | number;

  /* 总条数 */
  total?: null | number;
};

/**
 *  类型定义 [ContentNovelDetailRequest]
 *  @来源 内容管理/小说管理/基础信息
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentNovelDetailRequest = {
  /* 主键id */
  id: number;
};

export type ContentNovelDetailResponse = AdminWorkDetailDto;

/**
 *  类型定义 [ContentNovelUpdateRequest]
 *  @来源 内容管理/小说管理/基础信息
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentNovelUpdateRequest = UpdateWorkDto;

export type ContentNovelUpdateResponse = boolean;

/**
 *  类型定义 [ContentNovelUpdateStatusRequest]
 *  @来源 内容管理/小说管理/基础信息
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentNovelUpdateStatusRequest = UpdateWorkStatusDto;

export type ContentNovelUpdateStatusResponse = boolean;

/**
 *  类型定义 [ContentNovelUpdateRecommendedRequest]
 *  @来源 内容管理/小说管理/基础信息
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentNovelUpdateRecommendedRequest = UpdateWorkRecommendedDto;

export type ContentNovelUpdateRecommendedResponse = boolean;

/**
 *  类型定义 [ContentNovelUpdateHotRequest]
 *  @来源 内容管理/小说管理/基础信息
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentNovelUpdateHotRequest = UpdateWorkHotDto;

export type ContentNovelUpdateHotResponse = boolean;

/**
 *  类型定义 [ContentNovelUpdateNewRequest]
 *  @来源 内容管理/小说管理/基础信息
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentNovelUpdateNewRequest = UpdateWorkNewDto;

export type ContentNovelUpdateNewResponse = boolean;

/**
 *  类型定义 [ContentNovelDeleteRequest]
 *  @来源 内容管理/小说管理/基础信息
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentNovelDeleteRequest = IdDto;

export type ContentNovelDeleteResponse = boolean;

/**
 *  类型定义 [ContentNovelChapterCreateRequest]
 *  @来源 内容管理/小说管理/章节管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentNovelChapterCreateRequest = CreateWorkChapterDto;

export type ContentNovelChapterCreateResponse = boolean;

/**
 *  类型定义 [ContentNovelChapterPageRequest]
 *  @来源 内容管理/小说管理/章节管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentNovelChapterPageRequest = {
  /* 是否允许评论 */
  canComment?: boolean | null;

  /* 是否允许下载 */
  canDownload?: boolean | null;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否试读 */
  isPreview?: boolean | null;

  /* 是否发布 */
  isPublished?: boolean | null;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 章节标题 */
  title?: null | string;

  /* 查看规则（-1=继承作品；0=所有人可见；1=登录用户可见；2=VIP可见；3=需购买可见） */
  viewRule?: null | number;

  /* 作品ID */
  workId: number;
};

export type ContentNovelChapterPageResponse = {
  /* 列表数据 */
  list?: AdminWorkChapterPageItemDto[] | null;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 每页条数 */
  pageSize?: null | number;

  /* 总条数 */
  total?: null | number;
};

/**
 *  类型定义 [ContentNovelChapterDetailRequest]
 *  @来源 内容管理/小说管理/章节管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentNovelChapterDetailRequest = {
  /* 主键id */
  id: number;
};

export type ContentNovelChapterDetailResponse = AdminWorkChapterDetailDto;

/**
 *  类型定义 [ContentNovelChapterUpdateRequest]
 *  @来源 内容管理/小说管理/章节管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentNovelChapterUpdateRequest = UpdateWorkChapterDto;

export type ContentNovelChapterUpdateResponse = boolean;

/**
 *  类型定义 [ContentNovelChapterDeleteRequest]
 *  @来源 内容管理/小说管理/章节管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentNovelChapterDeleteRequest = IdDto;

export type ContentNovelChapterDeleteResponse = boolean;

/**
 *  类型定义 [ContentNovelChapterBatchDeleteRequest]
 *  @来源 内容管理/小说管理/章节管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentNovelChapterBatchDeleteRequest = IdsDto;

export type ContentNovelChapterBatchDeleteResponse = boolean;

/**
 *  类型定义 [ContentNovelChapterBatchUpdateStatusRequest]
 *  @来源 内容管理/小说管理/章节管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentNovelChapterBatchUpdateStatusRequest =
  BatchUpdatePublishedStatusDto;

export type ContentNovelChapterBatchUpdateStatusResponse = boolean;

/**
 *  类型定义 [ContentNovelChapterSwapSortOrderRequest]
 *  @来源 内容管理/小说管理/章节管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentNovelChapterSwapSortOrderRequest = DragReorderDto;

export type ContentNovelChapterSwapSortOrderResponse = boolean;

/**
 *  类型定义 [ContentNovelChapterContentDetailRequest]
 *  @来源 内容管理/小说管理/章节内容
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentNovelChapterContentDetailRequest = {
  /* 主键id */
  id: number;
};

export type ContentNovelChapterContentDetailResponse = string;

/**
 *  类型定义 [ContentNovelChapterContentUploadRequest]
 *  @来源 内容管理/小说管理/章节内容
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentNovelChapterContentUploadRequest = {
  /* 章节ID */
  chapterId: number;

  /* 作品ID */
  workId: number;
};

export type ContentNovelChapterContentUploadResponse = UploadResponseDto;

/**
 *  类型定义 [ContentNovelChapterContentDeleteRequest]
 *  @来源 内容管理/小说管理/章节内容
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentNovelChapterContentDeleteRequest = IdDto;

export type ContentNovelChapterContentDeleteResponse = boolean;

/**
 *  类型定义 [ContentAuthorCreateRequest]
 *  @来源 内容管理/作者管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentAuthorCreateRequest = CreateAuthorDto;

export type ContentAuthorCreateResponse = boolean;

/**
 *  类型定义 [ContentAuthorPageRequest]
 *  @来源 内容管理/作者管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentAuthorPageRequest = {
  /* 结束时间 */
  endDate?: null | string;

  /* 性别（0=未知；1=男性；2=女性；3=其他；4=保密） */
  gender?: null | number;

  /* 启用状态 */
  isEnabled?: boolean | null;

  /* 是否为推荐作者（用于前台推荐展示） */
  isRecommended?: boolean | null;

  /* 作者姓名 */
  name?: null | string;

  /* 国籍 */
  nationality?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 作者角色类型筛选 JSON 字符串，例如 [1,2] */
  type?: null | string;
};

export type ContentAuthorPageResponse = {
  /* 列表数据 */
  list?: AuthorPageResponseDto[] | null;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 每页条数 */
  pageSize?: null | number;

  /* 总条数 */
  total?: null | number;
};

/**
 *  类型定义 [ContentAuthorDetailRequest]
 *  @来源 内容管理/作者管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentAuthorDetailRequest = {
  /* 主键id */
  id: number;
};

export type ContentAuthorDetailResponse = AuthorOutputBaseDto;

/**
 *  类型定义 [ContentAuthorUpdateRequest]
 *  @来源 内容管理/作者管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentAuthorUpdateRequest = UpdateAuthorDto;

export type ContentAuthorUpdateResponse = boolean;

/**
 *  类型定义 [ContentAuthorUpdateStatusRequest]
 *  @来源 内容管理/作者管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentAuthorUpdateStatusRequest = UpdateAuthorStatusDto;

export type ContentAuthorUpdateStatusResponse = boolean;

/**
 *  类型定义 [ContentAuthorUpdateRecommendedRequest]
 *  @来源 内容管理/作者管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentAuthorUpdateRecommendedRequest = UpdateAuthorRecommendedDto;

export type ContentAuthorUpdateRecommendedResponse = boolean;

/**
 *  类型定义 [ContentAuthorRebuildFollowCountRequest]
 *  @来源 内容管理/作者管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentAuthorRebuildFollowCountRequest = IdDto;

export type ContentAuthorRebuildFollowCountResponse =
  AuthorFollowCountRepairResultDto;

export type ContentAuthorRebuildFollowCountAllResponse = boolean;

/**
 *  类型定义 [ContentAuthorRebuildWorkCountRequest]
 *  @来源 内容管理/作者管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentAuthorRebuildWorkCountRequest = IdDto;

export type ContentAuthorRebuildWorkCountResponse =
  AuthorWorkCountRepairResultDto;

export type ContentAuthorRebuildWorkCountAllResponse = boolean;

/**
 *  类型定义 [ContentAuthorDeleteRequest]
 *  @来源 内容管理/作者管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentAuthorDeleteRequest = IdDto;

export type ContentAuthorDeleteResponse = boolean;

/**
 *  类型定义 [ContentCategoryCreateRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentCategoryCreateRequest = CreateCategoryDto;

export type ContentCategoryCreateResponse = boolean;

/**
 *  类型定义 [ContentCategoryPageRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentCategoryPageRequest = {
  /* 分类关联的内容类型 JSON 字符串，例如 [1,2] */
  contentType?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean | null;

  /* 分类名称 */
  name?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;
};

export type ContentCategoryPageResponse = {
  /* 列表数据 */
  list?: CategoryOutputDto[] | null;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 每页条数 */
  pageSize?: null | number;

  /* 总条数 */
  total?: null | number;
};

/**
 *  类型定义 [ContentCategoryDetailRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentCategoryDetailRequest = {
  /* 主键id */
  id: number;
};

export type ContentCategoryDetailResponse = CategoryOutputDto;

/**
 *  类型定义 [ContentCategoryUpdateRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentCategoryUpdateRequest = UpdateCategoryDto;

export type ContentCategoryUpdateResponse = boolean;

/**
 *  类型定义 [ContentCategoryUpdateStatusRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentCategoryUpdateStatusRequest = UpdateCategoryStatusDto;

export type ContentCategoryUpdateStatusResponse = boolean;

/**
 *  类型定义 [ContentCategoryDeleteRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentCategoryDeleteRequest = IdDto;

export type ContentCategoryDeleteResponse = boolean;

/**
 *  类型定义 [ContentCategorySwapSortOrderRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentCategorySwapSortOrderRequest = UpdateCategorySortDto;

export type ContentCategorySwapSortOrderResponse = boolean;

/**
 *  类型定义 [ContentTagCreateRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentTagCreateRequest = CreateTagDto;

export type ContentTagCreateResponse = boolean;

/**
 *  类型定义 [ContentTagPageRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentTagPageRequest = {
  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean | null;

  /* 标签名称 */
  name?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;
};

export type ContentTagPageResponse = {
  /* 列表数据 */
  list?: AdminTagDto[] | null;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 每页条数 */
  pageSize?: null | number;

  /* 总条数 */
  total?: null | number;
};

/**
 *  类型定义 [ContentTagDetailRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentTagDetailRequest = {
  /* 主键id */
  id: number;
};

export type ContentTagDetailResponse = AdminTagDto;

/**
 *  类型定义 [ContentTagUpdateRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentTagUpdateRequest = UpdateTagDto;

export type ContentTagUpdateResponse = boolean;

/**
 *  类型定义 [ContentTagUpdateStatusRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentTagUpdateStatusRequest = UpdateEnabledStatusDto;

export type ContentTagUpdateStatusResponse = boolean;

/**
 *  类型定义 [ContentTagDeleteRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentTagDeleteRequest = IdDto;

export type ContentTagDeleteResponse = boolean;

/**
 *  类型定义 [ContentTagSwapSortOrderRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentTagSwapSortOrderRequest = UpdateTagSortDto;

export type ContentTagSwapSortOrderResponse = boolean;

/**
 *  类型定义 [ContentEmojiPackPageRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentEmojiPackPageRequest = {
  /* 表情包编码 */
  code?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* 启用状态 */
  isEnabled?: boolean | null;

  /* 表情包名称 */
  name?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 是否在选择器可见 */
  visibleInPicker?: boolean | null;
};

export type ContentEmojiPackPageResponse = {
  /* 列表数据 */
  list?: EmojiPackOutputDto[] | null;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 每页条数 */
  pageSize?: null | number;

  /* 总条数 */
  total?: null | number;
};

/**
 *  类型定义 [ContentEmojiPackDetailRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentEmojiPackDetailRequest = {
  /* 主键id */
  id: number;
};

export type ContentEmojiPackDetailResponse = EmojiPackOutputDto;

/**
 *  类型定义 [ContentEmojiPackCreateRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentEmojiPackCreateRequest = CreateEmojiPackDto;

export type ContentEmojiPackCreateResponse = boolean;

/**
 *  类型定义 [ContentEmojiPackUpdateRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentEmojiPackUpdateRequest = UpdateEmojiPackDto;

export type ContentEmojiPackUpdateResponse = boolean;

/**
 *  类型定义 [ContentEmojiPackDeleteRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentEmojiPackDeleteRequest = IdDto;

export type ContentEmojiPackDeleteResponse = boolean;

/**
 *  类型定义 [ContentEmojiPackUpdateEnabledRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentEmojiPackUpdateEnabledRequest = UpdateEnabledStatusDto;

export type ContentEmojiPackUpdateEnabledResponse = boolean;

/**
 *  类型定义 [ContentEmojiPackSwapSortOrderRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentEmojiPackSwapSortOrderRequest = DragReorderDto;

export type ContentEmojiPackSwapSortOrderResponse = boolean;

/**
 *  类型定义 [ContentEmojiPackUpdateSceneTypeRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentEmojiPackUpdateSceneTypeRequest =
  UpdateEmojiPackSceneTypeDto;

export type ContentEmojiPackUpdateSceneTypeResponse = boolean;

/**
 *  类型定义 [ContentEmojiAssetPageRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentEmojiAssetPageRequest = {
  /* 分类 */
  category?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* 启用状态 */
  isEnabled?: boolean | null;

  /* 资源类型（1=unicode,2=custom） */
  kind?: null | number;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 表情包ID */
  packId?: null | number;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 短码（custom 必填） */
  shortcode?: null | string;

  /* 开始时间 */
  startDate?: null | string;
};

export type ContentEmojiAssetPageResponse = {
  /* 列表数据 */
  list?: EmojiAssetOutputDto[] | null;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 每页条数 */
  pageSize?: null | number;

  /* 总条数 */
  total?: null | number;
};

/**
 *  类型定义 [ContentEmojiAssetDetailRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentEmojiAssetDetailRequest = {
  /* 主键id */
  id: number;
};

export type ContentEmojiAssetDetailResponse = EmojiAssetOutputDto;

/**
 *  类型定义 [ContentEmojiAssetCreateRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentEmojiAssetCreateRequest = CreateEmojiAssetDto;

export type ContentEmojiAssetCreateResponse = boolean;

/**
 *  类型定义 [ContentEmojiAssetUpdateRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentEmojiAssetUpdateRequest = UpdateEmojiAssetDto;

export type ContentEmojiAssetUpdateResponse = boolean;

/**
 *  类型定义 [ContentEmojiAssetDeleteRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentEmojiAssetDeleteRequest = IdDto;

export type ContentEmojiAssetDeleteResponse = boolean;

/**
 *  类型定义 [ContentEmojiAssetUpdateEnabledRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentEmojiAssetUpdateEnabledRequest = UpdateEnabledStatusDto;

export type ContentEmojiAssetUpdateEnabledResponse = boolean;

/**
 *  类型定义 [ContentEmojiAssetSwapSortOrderRequest]
 *  @来源 内容管理/表情管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentEmojiAssetSwapSortOrderRequest = DragReorderDto;

export type ContentEmojiAssetSwapSortOrderResponse = boolean;

/**
 *  类型定义 [CreateWorkDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateWorkDto = {
  /* 年龄分级 */
  ageRating?: null | string;
  /* 作品别名 */
  alias?: null | string;
  /* 作者ID列表 */
  authorIds: number[];
  /* 是否允许评论 */
  canComment: boolean;
  /* 分类ID列表 */
  categoryIds: number[];
  /* 章节默认价格 */
  chapterPrice: number;
  /* 版权信息 */
  copyright?: null | string;
  /* 作品封面 */
  cover: string;
  /* 作品简介 */
  description: string;
  /* 免责声明 */
  disclaimer?: null | string;
  /* 是否热门 */
  isHot: boolean;
  /* 是否新作 */
  isNew: boolean;
  /* 是否发布 */
  isPublished: boolean;
  /* 是否推荐 */
  isRecommended: boolean;
  /* 语言代码 */
  language: string;
  /* 最近更新时间 */
  lastUpdated?: null | string;
  /* 作品名称 */
  name: string;
  /* 原始来源 */
  originalSource?: null | string;
  /* 发布日期 */
  publishAt?: null | string;
  /* 出版社 */
  publisher?: null | string;
  /* 评分 */
  rating?: null | number;
  /* 推荐权重 */
  recommendWeight: number;
  /* 地区代码 */
  region: string;
  /* 备注 */
  remark?: null | string;
  /* 历史阅读等级ID（目标态不参与阅读权限） */
  requiredViewLevelId?: null | number;
  /* 连载状态（0=未开始，1=连载中，2=已完结，3=暂停更新，4=已停更） */
  serialStatus: number;
  /* 标签ID列表 */
  tagIds: number[];
  /* 作品类型（1=漫画；2=小说） */
  type: number;
  /* 阅读规则（0=所有人可见；1=登录用户可见；2=VIP可见；3=需购买可见） */
  viewRule: number;
};

/**
 *  类型定义 [PageWorkDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type PageWorkDto = {
  /* 年龄分级 */
  ageRating?: null | string;
  /* 作者列表 */
  authors: AuthorInfoDto[];
  /* 分类列表 */
  categories: CategoryInfoDto[];
  /* 作品封面 */
  cover: string;
  /* 创建时间 */
  createdAt: string;
  /* 是否存在三方来源绑定 */
  hasThirdPartySourceBinding: boolean;
  /* 主键id */
  id: number;
  /* 是否热门 */
  isHot: boolean;
  /* 是否新作 */
  isNew: boolean;
  /* 是否发布 */
  isPublished: boolean;
  /* 是否推荐 */
  isRecommended: boolean;
  /* 语言代码 */
  language: string;
  /* 作品名称 */
  name: string;
  /* 热度值 */
  popularity: number;
  /* 发布日期 */
  publishAt?: null | string;
  /* 出版社 */
  publisher?: null | string;
  /* 地区代码 */
  region: string;
  /* 连载状态（0=未开始，1=连载中，2=已完结，3=暂停更新，4=已停更） */
  serialStatus: number;
  /* 标签列表 */
  tags: TagInfoDto[];
  /* 作品类型（1=漫画；2=小说） */
  type: number;
  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [AuthorInfoDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AuthorInfoDto = {
  /* 作者头像 URL */
  avatar?: null | string;
  /* 主键id */
  id: number;
  /* 当前用户是否已关注该作者 */
  isFollowed: boolean;
  /* 作者姓名 */
  name: string;
  /* 作者角色类型（1=漫画家；2=轻小说作者） */
  type?: null | number[];
};

/**
 *  类型定义 [CategoryInfoDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CategoryInfoDto = {
  /* 分类图标 URL */
  icon?: null | string;
  /* 主键id */
  id: number;
  /* 分类名称 */
  name: string;
};

/**
 *  类型定义 [TagInfoDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type TagInfoDto = {
  /* 标签图标 URL */
  icon?: null | string;
  /* 主键id */
  id: number;
  /* 标签名称 */
  name: string;
};

/**
 *  类型定义 [AdminWorkDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminWorkDetailDto = {
  /* 年龄分级 */
  ageRating?: null | string;
  /* 作品别名 */
  alias?: null | string;
  /* 作者列表 */
  authors: AuthorInfoDto[];
  /* 是否允许评论 */
  canComment: boolean;
  /* 分类列表 */
  categories: CategoryInfoDto[];
  /* 章节默认价格 */
  chapterPrice: number;
  /* 章节默认购买价格信息 */
  chapterPurchasePricing: ContentPurchasePricingDto;
  /* 评论数 */
  commentCount: number;
  /* 继续阅读章节 */
  continueChapter: ContinueReadingChapterDto;
  /* 版权信息 */
  copyright?: null | string;
  /* 作品封面 */
  cover: string;
  /* 创建时间 */
  createdAt: string;
  /* 作品简介 */
  description: string;
  /* 免责声明 */
  disclaimer?: null | string;
  /* 下载数 */
  downloadCount: number;
  /* 收藏数 */
  favoriteCount: number;
  /* 是否已收藏 */
  favorited: boolean;
  /* 论坛板块ID */
  forumSectionId?: null | number;
  /* 是否存在三方来源绑定 */
  hasThirdPartySourceBinding: boolean;
  /* 主键id */
  id: number;
  /* 是否热门 */
  isHot: boolean;
  /* 是否新作 */
  isNew: boolean;
  /* 是否发布 */
  isPublished: boolean;
  /* 是否推荐 */
  isRecommended: boolean;
  /* 语言代码 */
  language: string;
  /* 最近阅读时间 */
  lastReadAt?: null | string;
  /* 最近更新时间 */
  lastUpdated?: null | string;
  /* 点赞数 */
  likeCount: number;
  /* 是否已点赞 */
  liked: boolean;
  /* 作品名称 */
  name: string;
  /* 原始来源 */
  originalSource?: null | string;
  /* 热度值 */
  popularity: number;
  /* 发布日期 */
  publishAt?: null | string;
  /* 出版社 */
  publisher?: null | string;
  /* 评分 */
  rating?: null | number;
  /* 推荐权重 */
  recommendWeight: number;
  /* 地区代码 */
  region: string;
  /* 备注 */
  remark?: null | string;
  /* 历史阅读等级ID（目标态不参与阅读权限） */
  requiredViewLevelId?: null | number;
  /* 连载状态（0=未开始，1=连载中，2=已完结，3=暂停更新，4=已停更） */
  serialStatus: number;
  /* 标签列表 */
  tags: TagInfoDto[];
  /* 作品类型（1=漫画；2=小说） */
  type: number;
  /* 更新时间 */
  updatedAt: string;
  /* 浏览量 */
  viewCount: number;
  /* 是否已浏览 */
  viewed: boolean;
  /* 阅读规则（0=所有人可见；1=登录用户可见；2=VIP可见；3=需购买可见） */
  viewRule: number;
};

/**
 *  类型定义 [ContentPurchasePricingDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentPurchasePricingDto = {
  /* 优惠金额 */
  discountAmount: number;
  /* 原价 */
  originalPrice: number;
  /* 实付价 */
  payablePrice: number;
  /* 支付比例（1=原价支付） */
  payableRate: number;
};

/**
 *  类型定义 [ContinueReadingChapterDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContinueReadingChapterDto = {
  /* 主键id */
  id: number;
  /* 排序值 */
  sortOrder: number;
  /* 章节副标题 */
  subtitle?: null | string;
  /* 章节标题 */
  title: string;
};

/**
 *  类型定义 [UpdateWorkDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateWorkDto = {
  /* 年龄分级 */
  ageRating?: null | string;
  /* 作品别名 */
  alias?: null | string;
  /* 作者ID列表 */
  authorIds?: null | number[];
  /* 是否允许评论 */
  canComment?: boolean | null;
  /* 分类ID列表 */
  categoryIds?: null | number[];
  /* 章节默认价格 */
  chapterPrice?: null | number;
  /* 版权信息 */
  copyright?: null | string;
  /* 作品封面 */
  cover?: null | string;
  /* 作品简介 */
  description?: null | string;
  /* 免责声明 */
  disclaimer?: null | string;
  /* 主键id */
  id: number;
  /* 是否热门 */
  isHot?: boolean | null;
  /* 是否新作 */
  isNew?: boolean | null;
  /* 是否发布 */
  isPublished?: boolean | null;
  /* 是否推荐 */
  isRecommended?: boolean | null;
  /* 语言代码 */
  language?: null | string;
  /* 最近更新时间 */
  lastUpdated?: null | string;
  /* 作品名称 */
  name?: null | string;
  /* 原始来源 */
  originalSource?: null | string;
  /* 发布日期 */
  publishAt?: null | string;
  /* 出版社 */
  publisher?: null | string;
  /* 评分 */
  rating?: null | number;
  /* 推荐权重 */
  recommendWeight?: null | number;
  /* 地区代码 */
  region?: null | string;
  /* 备注 */
  remark?: null | string;
  /* 历史阅读等级ID（目标态不参与阅读权限） */
  requiredViewLevelId?: null | number;
  /* 连载状态（0=未开始，1=连载中，2=已完结，3=暂停更新，4=已停更） */
  serialStatus?: null | number;
  /* 标签ID列表 */
  tagIds?: null | number[];
  /* 阅读规则（0=所有人可见；1=登录用户可见；2=VIP可见；3=需购买可见） */
  viewRule?: null | number;
};

/**
 *  类型定义 [UpdateWorkStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateWorkStatusDto = {
  /* 主键id */
  id: number;
  /* 是否发布 */
  isPublished: boolean;
};

/**
 *  类型定义 [UpdateWorkRecommendedDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateWorkRecommendedDto = {
  /* 主键id */
  id: number;
  /* 是否推荐 */
  isRecommended: boolean;
};

/**
 *  类型定义 [UpdateWorkHotDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateWorkHotDto = {
  /* 主键id */
  id: number;
  /* 是否热门 */
  isHot: boolean;
};

/**
 *  类型定义 [UpdateWorkNewDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateWorkNewDto = {
  /* 主键id */
  id: number;
  /* 是否新作 */
  isNew: boolean;
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

/**
 *  类型定义 [CreateWorkChapterDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateWorkChapterDto = {
  /* 是否允许评论 */
  canComment: boolean;
  /* 是否允许下载 */
  canDownload: boolean;
  /* 章节封面 */
  cover?: null | string;
  /* 章节简介 */
  description?: null | string;
  /* 是否试读 */
  isPreview: boolean;
  /* 发布状态 */
  isPublished?: boolean | null;
  /* 章节价格 */
  price: number;
  /* 发布时间 */
  publishAt?: null | string;
  /* 备注 */
  remark?: null | string;
  /* 历史阅读等级ID（目标态不参与阅读权限） */
  requiredViewLevelId?: null | number;
  /* 排序值 */
  sortOrder: number;
  /* 章节副标题 */
  subtitle?: null | string;
  /* 章节标题 */
  title: string;
  /* 查看规则（-1=继承作品；0=所有人可见；1=登录用户可见；2=VIP可见；3=需购买可见） */
  viewRule: number;
  /* 作品ID */
  workId: number;
  /* 作品类型（1=漫画；2=小说） */
  workType: number;
};

/**
 *  类型定义 [AdminWorkChapterPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminWorkChapterPageItemDto = {
  /* 是否允许评论 */
  canComment: boolean;
  /* 是否允许下载 */
  canDownload: boolean;
  /* 章节封面 */
  cover?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 主键id */
  id: number;
  /* 是否试读 */
  isPreview: boolean;
  /* 是否发布 */
  isPublished: boolean;
  /* 章节价格 */
  price: number;
  /* 发布时间 */
  publishAt?: null | string;
  /* 历史阅读等级ID（目标态不参与阅读权限） */
  requiredViewLevelId?: null | number;
  /* 排序值 */
  sortOrder: number;
  /* 章节副标题 */
  subtitle?: null | string;
  /* 章节标题 */
  title: string;
  /* 更新时间 */
  updatedAt: string;
  /* 查看规则（-1=继承作品；0=所有人可见；1=登录用户可见；2=VIP可见；3=需购买可见） */
  viewRule: number;
  /* 作品ID */
  workId: number;
  /* 作品类型（1=漫画；2=小说） */
  workType: number;
};

/**
 *  类型定义 [AdminWorkChapterDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminWorkChapterDetailDto = {
  /* 是否允许评论 */
  canComment: boolean;
  /* 是否允许下载 */
  canDownload: boolean;
  /* 评论数 */
  commentCount: number;
  /* 章节内容（漫画为图片路径数组，小说为文件路径） */
  content?: null | string;
  /* 章节封面 */
  cover?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 章节简介 */
  description?: null | string;
  /* 下载数 */
  downloadCount: number;
  /* 主键id */
  id: number;
  /* 是否试读 */
  isPreview: boolean;
  /* 是否发布 */
  isPublished: boolean;
  /* 点赞数 */
  likeCount: number;
  /* 章节价格 */
  price: number;
  /* 发布时间 */
  publishAt?: null | string;
  /* 购买数 */
  purchaseCount: number;
  /* 备注 */
  remark?: null | string;
  /* 历史阅读等级摘要；为空表示不限制等级 */
  requiredViewLevel: AdminWorkChapterRequiredViewLevelDto;
  /* 历史阅读等级ID（目标态不参与阅读权限） */
  requiredViewLevelId?: null | number;
  /* 排序值 */
  sortOrder: number;
  /* 章节副标题 */
  subtitle?: null | string;
  /* 章节标题 */
  title: string;
  /* 更新时间 */
  updatedAt: string;
  /* 浏览数 */
  viewCount: number;
  /* 查看规则（-1=继承作品；0=所有人可见；1=登录用户可见；2=VIP可见；3=需购买可见） */
  viewRule: number;
  /* 字数 */
  wordCount: number;
  /* 所属作品摘要 */
  work: AdminWorkChapterWorkSummaryDto;
  /* 作品ID */
  workId: number;
  /* 作品类型（1=漫画；2=小说） */
  workType: number;
};

/**
 *  类型定义 [AdminWorkChapterWorkSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminWorkChapterWorkSummaryDto = {
  /* 作品 ID */
  id: number;
  /* 作品名称 */
  name: string;
  /* 作品类型（1=漫画；2=小说） */
  type: number;
};

/**
 *  类型定义 [AdminWorkChapterRequiredViewLevelDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminWorkChapterRequiredViewLevelDto = {
  /* 等级专属颜色 */
  color?: null | string;
  /* 等级规则 ID */
  id: number;
  /* 等级名称 */
  name: string;
};

/**
 *  类型定义 [UpdateWorkChapterDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateWorkChapterDto = {
  /* 是否允许评论 */
  canComment?: boolean | null;
  /* 是否允许下载 */
  canDownload?: boolean | null;
  /* 章节封面 */
  cover?: null | string;
  /* 章节简介 */
  description?: null | string;
  /* 主键id */
  id: number;
  /* 是否试读 */
  isPreview?: boolean | null;
  /* 发布状态 */
  isPublished?: boolean | null;
  /* 章节价格 */
  price?: null | number;
  /* 发布时间 */
  publishAt?: null | string;
  /* 备注 */
  remark?: null | string;
  /* 历史阅读等级ID（目标态不参与阅读权限） */
  requiredViewLevelId?: null | number;
  /* 排序值 */
  sortOrder?: null | number;
  /* 章节副标题 */
  subtitle?: null | string;
  /* 章节标题 */
  title?: null | string;
  /* 查看规则（-1=继承作品；0=所有人可见；1=登录用户可见；2=VIP可见；3=需购买可见） */
  viewRule?: null | number;
};

/**
 *  类型定义 [IdsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type IdsDto = {
  /* 主键id集合 */
  ids: number[];
};

/**
 *  类型定义 [BatchUpdatePublishedStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BatchUpdatePublishedStatusDto = {
  /* 主键id集合 */
  ids: number[];
  /* 发布状态 true发布 false取消发布 */
  isPublished: boolean;
};

/**
 *  类型定义 [DragReorderDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type DragReorderDto = {
  /* 当前拖拽元素的id */
  dragId: number;
  /* 拖拽的目标位置id */
  targetId: number;
};

/**
 *  类型定义 [UploadResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UploadResponseDto = {
  /* 文件分类 */
  fileCategory: string;
  /* 文件名 */
  filename: string;
  /* 文件路径 */
  filePath: string;
  /* 文件大小 */
  fileSize: number;
  /* 文件扩展名 */
  fileType: string;
  /* 图片高度 */
  height?: null | number;
  /* 文件 MIME 类型 */
  mimeType: string;
  /* 原始文件名 */
  originalName: string;
  /* 文件场景 */
  scene: string;
  /* 上传时间 */
  uploadTime: string;
  /* 图片宽度 */
  width?: null | number;
};

/**
 *  类型定义 [UpdateComicContentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateComicContentDto = {
  /* 章节ID */
  chapterId: number;
  /* 内容路径 */
  content: string;
  /* 内容索引 */
  index: number;
};

/**
 *  类型定义 [DeleteComicContentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type DeleteComicContentDto = {
  /* 章节ID */
  chapterId: number;
  /* 内容索引列表 */
  index: number[];
};

/**
 *  类型定义 [MoveComicContentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type MoveComicContentDto = {
  /* 章节ID */
  chapterId: number;
  /* 源索引 */
  fromIndex: number;
  /* 目标索引 */
  toIndex: number;
};

/**
 *  类型定义 [ComicArchiveTaskResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ComicArchiveTaskResponseDto = {
  /* 原始压缩包名称 */
  archiveName?: null | string;
  /* 任务过期时间 */
  expiresAt: string;
  /* 完成处理时间 */
  finishedAt?: null | string;
  /* 被忽略的路径列表 */
  ignoredItems: ComicArchiveIgnoredItemDto[];
  /* 导入工作流任务ID */
  jobId: string;
  /* 最后一次错误事实；admin 负责表达 */
  lastError?: null | WorkflowErrorFactsDto;
  /* 匹配成功的章节列表 */
  matchedItems: ComicArchiveMatchedItemDto[];
  /* 预解析模式（1=单章节压缩包；2=多章节压缩包） */
  mode: number;
  /* 当前进度展示代码；后台根据代码和上下文生成文案 */
  progressCode?: null | string;
  /* 当前进度展示上下文 */
  progressContext?: null | Record<string, any>;
  /* 结构化进度详情快照；用于展示当前运行中的子进度 */
  progressDetail?: null | Record<string, any>;
  /* 是否需要用户确认 */
  requireConfirm: boolean;
  /* 正式导入结果列表 */
  resultItems: ComicArchiveResultItemDto[];
  /* 开始处理时间 */
  startedAt?: null | string;
  /* 任务状态（0=草稿；1=待处理；2=处理中；3=成功；4=部分失败；5=失败；6=已过期；7=已取消） */
  status: number;
  /* 预解析汇总信息 */
  summary: ComicArchiveSummaryDto;
  /* 作品ID */
  workId?: null | number;
};

/**
 *  类型定义 [ComicArchiveMatchedItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ComicArchiveMatchedItemDto = {
  /* 章节ID */
  chapterId: number;
  /* 章节标题 */
  chapterTitle: string;
  /* 章节当前已有图片数量 */
  existingImageCount: number;
  /* 章节当前是否已有内容 */
  hasExistingContent: boolean;
  /* 压缩包内图片数量 */
  imageCount: number;
  /* 导入模式 */
  importMode: string;
  /* 匹配来源路径 */
  path: string;
  /* 匹配结果表达码 */
  statusCode: string;
  /* 匹配结果表达事实 */
  statusContext: Record<string, any>;
  /* 覆盖风险事实；admin 负责表达 */
  warning?: null | WorkflowErrorFactsDto;
};

/**
 *  类型定义 [WorkflowErrorFactsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowErrorFactsDto = {
  /* 错误或状态码，返回归档导入、内容导入、三方导入、数据库写入或工作流运行错误等稳定代码 */
  code:
    | 'ARCHIVE_CHAPTER_IMPORT_FAILED'
    | 'ARCHIVE_IMPORT_CHAPTER_NOT_FOUND'
    | 'ARCHIVE_IMPORT_DEPTH_EXCEEDED'
    | 'ARCHIVE_IMPORT_INVALID_CHAPTER_ID_DIR'
    | 'ARCHIVE_IMPORT_ITEM_IGNORED'
    | 'ARCHIVE_IMPORT_MATCHED'
    | 'ARCHIVE_IMPORT_MISSING_CHAPTER_ID'
    | 'ARCHIVE_IMPORT_NO_IMAGES'
    | 'ARCHIVE_IMPORT_OVERWRITE_WARNING'
    | 'ARCHIVE_IMPORT_PROGRESS_UPDATED'
    | 'ATTEMPT_LEASE_EXPIRED'
    | 'CONTENT_IMPORT_IMAGE_PROGRESS_UPDATED'
    | 'CONTENT_IMPORT_ITEM_FAILED'
    | 'CONTENT_IMPORT_PROGRESS_UPDATED'
    | 'CONTENT_IMPORT_RATE_LIMITED'
    | 'CONTENT_IMPORT_RETRY_EXHAUSTED'
    | 'DATABASE_WRITE_FAILED'
    | 'THIRD_PARTY_CHAPTER_IMPORT_FAILED'
    | 'THIRD_PARTY_IMAGE_IMPORT_FAILED'
    | 'THIRD_PARTY_IMPORT_COMPLETED'
    | 'THIRD_PARTY_RESOURCE_PARSE_FAILED'
    | 'THIRD_PARTY_SYNC_COMPLETED'
    | 'UNKNOWN_WORKFLOW_ERROR'
    | 'UNKNOWN_WORKFLOW_PROGRESS'
    | (string & {});
  /* 可公开给 admin 表达层使用的事实 */
  context: Record<string, any>;
  /* 错误领域 */
  domain: string;
  /* 是否可重试 */
  retryable: boolean;
  /* 严重级别 */
  severity: string;
  /* 错误阶段 */
  stage: string;
};

/**
 *  类型定义 [ComicArchiveIgnoredItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ComicArchiveIgnoredItemDto = {
  /* 忽略项表达码 */
  code: string;
  /* 忽略项表达事实 */
  context: Record<string, any>;
  /* 被忽略的路径 */
  path: string;
  /* 忽略原因码（1001=章节目录名非法；1002=章节不存在；1003=嵌套目录忽略；1004=缺少章节ID；1005=图片文件非法） */
  reason: number;
};

/**
 *  类型定义 [ComicArchiveResultItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ComicArchiveResultItemDto = {
  /* 章节ID */
  chapterId?: null | number;
  /* 章节标题 */
  chapterTitle: string;
  /* 失败事实；admin 负责表达 */
  error?: null | WorkflowErrorFactsDto;
  /* 已导入图片数量 */
  importedImageCount: number;
  /* 执行状态（0=待处理；1=成功；2=失败） */
  status: number;
};

/**
 *  类型定义 [ComicArchiveSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ComicArchiveSummaryDto = {
  /* 忽略项数量 */
  ignoredItemCount: number;
  /* 有效图片总数 */
  imageCount: number;
  /* 可导入章节数 */
  matchedChapterCount: number;
};

/**
 *  类型定义 [CreateComicArchiveSessionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateComicArchiveSessionDto = {
  /* 单章节压缩包对应的章节ID */
  chapterId?: null | number;
  /* 作品ID */
  workId: number;
};

/**
 *  类型定义 [WorkflowJobIdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowJobIdDto = {
  /* 工作流任务ID */
  jobId: string;
};

/**
 *  类型定义 [ComicArchiveWorkflowJobIdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ComicArchiveWorkflowJobIdDto = {
  /* 导入工作流任务ID */
  jobId: string;
};

/**
 *  类型定义 [WorkflowJobDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowJobDto = {
  /* 归档时间；为空表示未归档 */
  archivedAt?: null | string;
  /* 取消请求时间 */
  cancelRequestedAt?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 展示名称 */
  displayName: string;
  /* 草稿过期时间 */
  expiresAt?: null | string;
  /* 失败条目数 */
  failedItemCount: number;
  /* 完成时间 */
  finishedAt?: null | string;
  /* 主键ID */
  id: number;
  /* 工作流任务ID */
  jobId: string;
  /* 操作者类型（1=后台管理员；2=系统） */
  operatorType: number;
  /* 后台管理员操作者ID；系统任务为空 */
  operatorUserId?: null | number;
  /* 当前进度展示代码；后台根据代码和上下文生成文案 */
  progressCode?: null | string;
  /* 当前进度展示上下文 */
  progressContext?: null | Record<string, any>;
  /* 结构化进度详情快照；用于展示当前运行中的子进度 */
  progressDetail?: null | Record<string, any>;
  /* 进度百分比 */
  progressPercent: number;
  /* 选中条目数 */
  selectedItemCount: number;
  /* 跳过条目数 */
  skippedItemCount: number;
  /* 开始处理时间 */
  startedAt?: null | string;
  /* 任务状态（1=草稿；2=待处理；3=处理中；4=成功；5=部分失败；6=失败；7=已取消；8=已过期） */
  status: number;
  /* 成功条目数 */
  successItemCount: number;
  /* 运行时非查询诊断摘要 */
  summary?: null | Record<string, any>;
  /* 更新时间 */
  updatedAt: string;
  /* 工作流类型 */
  workflowType: string;
};

/**
 *  类型定义 [ConfirmComicArchiveDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ConfirmComicArchiveDto = {
  /* 用户确认要导入的章节ID列表 */
  confirmedChapterIds: number[];
  /* 导入工作流任务ID */
  jobId: string;
};

/**
 *  类型定义 [PlatformResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type PlatformResponseDto = {
  /* 平台名称code */
  code: string;
  /* 平台名称 */
  name: string;
};

/**
 *  类型定义 [SearchComicItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type SearchComicItemDto = {
  /* 作者列表 */
  author: string[];
  /* 封面图片URL */
  cover: string;
  /* 第三方漫画ID */
  id: string;
  /* 漫画名称 */
  name: string;
  /* 平台代码 */
  platform: string;
  /* 来源平台 */
  source: string;
};

/**
 *  类型定义 [ThirdPartyComicDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ThirdPartyComicDetailDto = {
  /* 漫画别名 */
  alias?: null | string;
  /* 三方作者名称列表 */
  authors: string[];
  /* 三方简介 */
  brief?: null | string;
  /* 三方封面 URL */
  cover?: null | string;
  /* 三方最后更新时间 */
  datetimeUpdated?: null | string;
  /* 三方章节分组 */
  groups: ThirdPartyComicGroupDto[];
  /* 第三方漫画ID */
  id: string;
  /* 漫画名称 */
  name: string;
  /* 第三方路径标识 */
  pathWord: string;
  /* 三方热度 */
  popular?: null | number;
  /* 三方地区展示值 */
  region?: null | string;
  /* 三方访问标记 */
  sourceFlags: ThirdPartyComicSourceFlagsDto;
  /* 三方状态展示值 */
  status?: null | string;
  /* 三方分类或题材名称列表 */
  taxonomies: string[];
  /* 第三方漫画 UUID */
  uuid?: null | string;
};

/**
 *  类型定义 [ThirdPartyComicGroupDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ThirdPartyComicGroupDto = {
  /* 分组章节数 */
  count: number;
  /* 三方分组名称 */
  name: string;
  /* 三方分组标识 */
  pathWord: string;
};

/**
 *  类型定义 [ThirdPartyComicSourceFlagsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ThirdPartyComicSourceFlagsDto = {
  /* 三方是否锁定 */
  isLock: boolean;
  /* 三方是否需要登录 */
  isLogin: boolean;
  /* 三方是否需要绑定手机 */
  isMobileBind: boolean;
  /* 三方是否需要会员 */
  isVip: boolean;
};

/**
 *  类型定义 [ThirdPartyComicChapterDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ThirdPartyComicChapterDto = {
  /* 三方章节内容接口版本 */
  chapterApiVersion?: null | number;
  /* 三方章节创建时间 */
  datetimeCreated?: null | string;
  /* 三方章节分组 */
  group?: null | string;
  /* 三方章节图片数 */
  imageCount: number;
  /* 三方章节ID */
  providerChapterId: string;
  /* 章节排序 */
  sortOrder: number;
  /* 章节标题 */
  title: string;
};

/**
 *  类型定义 [ThirdPartyComicChapterContentDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ThirdPartyComicChapterContentDto = {
  /* 章节图片列表 */
  images: ThirdPartyComicImageDto[];
  /* 三方章节ID */
  providerChapterId: string;
  /* 章节标题 */
  title: string;
};

/**
 *  类型定义 [ThirdPartyComicImageDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ThirdPartyComicImageDto = {
  /* 三方图片ID */
  providerImageId: string;
  /* 图片排序 */
  sortOrder: number;
  /* 三方图片 URL */
  url: string;
};

/**
 *  类型定义 [DetailComicRequestDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type DetailComicRequestDto = {
  /* 漫画ID */
  comicId: string;
  /* 章节分组 */
  group?: null | string;
  /* 平台代码 */
  platform: string;
};

/**
 *  类型定义 [ThirdPartyComicImportPreviewDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ThirdPartyComicImportPreviewDto = {
  /* 章节列表 */
  chapters: ThirdPartyComicChapterDto[];
  /* 三方漫画ID */
  comicId: string;
  /* 封面导入选项 */
  coverOptions: ThirdPartyComicCoverOptionsDto;
  /* 三方详情 */
  detail: ThirdPartyComicDetailDto;
  /* 章节分组 */
  groups: ThirdPartyComicGroupDto[];
  /* 缺失的本地必填字段 */
  missingLocalFields: string[];
  /* 平台代码 */
  platform: string;
  /* 本地关系候选 */
  relationCandidates: ThirdPartyComicRelationCandidatesDto;
  /* 三方来源快照 */
  sourceSnapshot: ThirdPartyComicSourceSnapshotDto;
  /* 本地作品草稿 */
  workDraft: ThirdPartyComicImportPreviewWorkDraftDto;
};

/**
 *  类型定义 [ThirdPartyComicSourceSnapshotDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ThirdPartyComicSourceSnapshotDto = {
  /* 抓取时间 */
  fetchedAt: string;
  /* 三方漫画ID */
  providerComicId: string;
  /* 三方章节分组路径标识 */
  providerGroupPathWord: string;
  /* 三方路径标识 */
  providerPathWord: string;
  /* 三方 UUID */
  uuid?: null | string;
};

/**
 *  类型定义 [ThirdPartyComicImportPreviewWorkDraftDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ThirdPartyComicImportPreviewWorkDraftDto = {
  /* 作品别名 */
  alias?: null | string;
  /* 作品简介 */
  description: string;
  /* 作品名称 */
  name: string;
  /* 原始来源 */
  originalSource: string;
  /* 管理员备注 */
  remark: string;
  /* 建议地区 */
  suggestedRegion?: null | string;
  /* 建议连载状态 */
  suggestedSerialStatus?: null | number;
};

/**
 *  类型定义 [ThirdPartyComicCoverOptionsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ThirdPartyComicCoverOptionsDto = {
  /* 是否必须本地上传封面 */
  localRequired: boolean;
  /* 三方封面候选 */
  provider: ThirdPartyComicProviderCoverOptionDto;
};

/**
 *  类型定义 [ThirdPartyComicProviderCoverOptionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ThirdPartyComicProviderCoverOptionDto = {
  /* 三方图片ID */
  providerImageId: string;
  /* 三方图片 URL */
  url: string;
};

/**
 *  类型定义 [ThirdPartyComicRelationCandidatesDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ThirdPartyComicRelationCandidatesDto = {
  /* 作者候选 */
  authors: ThirdPartyComicRelationCandidateItemDto[];
  /* 分类候选 */
  categories: ThirdPartyComicRelationCandidateItemDto[];
  /* 标签候选 */
  tags: ThirdPartyComicRelationCandidateItemDto[];
};

/**
 *  类型定义 [ThirdPartyComicRelationCandidateItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ThirdPartyComicRelationCandidateItemDto = {
  /* 本地候选 */
  localCandidates: ThirdPartyComicLocalCandidateDto[];
  /* 三方名称 */
  providerName: string;
};

/**
 *  类型定义 [ThirdPartyComicLocalCandidateDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ThirdPartyComicLocalCandidateDto = {
  /* 本地ID */
  id: number;
  /* 本地名称 */
  name: string;
};

/**
 *  类型定义 [ThirdPartyComicImportRequestDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ThirdPartyComicImportRequestDto = {
  /* 导入章节列表 */
  chapters: ThirdPartyComicImportChapterItemDto[];
  /* 三方漫画ID */
  comicId: string;
  /* 作品封面处理方式 */
  cover?: null | ThirdPartyComicImportCoverDto;
  /* 导入模式（新建本地作品；挂载已有本地作品） */
  mode: 'attachToExisting' | 'createNew';
  /* 平台代码 */
  platform: string;
  /* 三方来源快照 */
  sourceSnapshot: ThirdPartyComicSourceSnapshotDto;
  /* 目标作品ID */
  targetWorkId?: null | number;
  /* 新建作品草稿 */
  workDraft?: null | ThirdPartyComicImportWorkDraftDto;
};

/**
 *  类型定义 [ThirdPartyComicImportCoverDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ThirdPartyComicImportCoverDto = {
  /* 本地上传路径 */
  localPath?: null | string;
  /* 封面处理方式（使用第三方平台图片；使用本地已上传图片；跳过封面处理） */
  mode: 'local' | 'provider' | 'skip';
  /* 三方图片ID */
  providerImageId?: null | string;
};

/**
 *  类型定义 [ThirdPartyComicImportWorkDraftDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ThirdPartyComicImportWorkDraftDto = {
  /* 年龄分级 */
  ageRating?: null | string;
  /* 作品别名 */
  alias?: null | string;
  /* 作者ID列表 */
  authorIds: number[];
  /* 是否允许评论 */
  canComment?: boolean | null;
  /* 分类ID列表 */
  categoryIds: number[];
  /* 章节默认价格 */
  chapterPrice?: null | number;
  /* 作品封面 */
  cover?: null | string;
  /* 作品简介 */
  description: string;
  /* 是否热门 */
  isHot?: boolean | null;
  /* 是否新作 */
  isNew?: boolean | null;
  /* 是否推荐 */
  isRecommended?: boolean | null;
  /* 语言代码 */
  language: string;
  /* 作品名称 */
  name: string;
  /* 原始来源 */
  originalSource?: null | string;
  /* 推荐权重 */
  recommendWeight?: null | number;
  /* 地区代码 */
  region: string;
  /* 管理员备注 */
  remark?: null | string;
  /* 连载状态 */
  serialStatus: number;
  /* 标签ID列表 */
  tagIds: number[];
  /* 阅读规则 */
  viewRule: number;
};

/**
 *  类型定义 [ThirdPartyComicImportChapterItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ThirdPartyComicImportChapterItemDto = {
  /* 章节导入动作（新建章节；更新已有章节） */
  action: 'create' | 'update';
  /* 是否允许评论 */
  canComment?: boolean | null;
  /* 是否允许下载 */
  canDownload?: boolean | null;
  /* 三方章节内容接口版本 */
  chapterApiVersion?: null | number;
  /* 章节封面处理方式 */
  cover?: null | ThirdPartyComicImportCoverDto;
  /* 三方章节创建时间 */
  datetimeCreated?: null | string;
  /* 三方章节分组 */
  group?: null | string;
  /* 是否导入章节图片 */
  importImages: boolean;
  /* 是否试读 */
  isPreview?: boolean | null;
  /* 是否覆盖已有章节内容 */
  overwriteContent?: boolean | null;
  /* 章节价格 */
  price?: null | number;
  /* 三方章节ID */
  providerChapterId: string;
  /* 排序值 */
  sortOrder: number;
  /* 章节副标题 */
  subtitle?: null | string;
  /* 目标章节ID */
  targetChapterId?: null | number;
  /* 章节标题 */
  title: string;
  /* 查看规则 */
  viewRule?: null | number;
};

/**
 *  类型定义 [ThirdPartyComicSyncLatestRequestDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ThirdPartyComicSyncLatestRequestDto = {
  /* 作品ID */
  workId: number;
};

/**
 *  类型定义 [ContentImportItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentImportItemDto = {
  /* 已安排自动重试次数 */
  autoRetryCount: number;
  /* 失败次数 */
  failureCount: number;
  /* 主键ID */
  id: number;
  /* 图片成功数 */
  imageSuccessCount: number;
  /* 图片总数 */
  imageTotal: number;
  /* 内容导入条目ID */
  itemId: string;
  /* 条目类型（1=漫画章节） */
  itemType: number;
  /* 最近错误事实；admin 负责根据 code/context 表达 */
  lastError?: null | WorkflowErrorFactsDto;
  /* 最近自动重试事实；admin 负责根据 code/context 表达 */
  lastRetry?: null | WorkflowErrorFactsDto;
  /* 本地章节ID */
  localChapterId?: null | number;
  /* 最大自动重试次数 */
  maxAutoRetries: number;
  /* 条目元数据 */
  metadata?: null | Record<string, any>;
  /* 自动重试下次可执行时间 */
  nextRetryAt?: null | string;
  /* 三方章节ID */
  providerChapterId?: null | string;
  /* 排序值 */
  sortOrder: number;
  /* 当前阶段（1=预览中；2=读取来源；3=准备元数据；4=读取内容；5=导入图片；6=写入内容；7=清理残留；8=已完成） */
  stage: number;
  /* 条目状态（1=待处理；2=处理中；3=成功；4=失败；5=重试中；6=已跳过） */
  status: number;
  /* 章节标题 */
  title: string;
  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CreateAuthorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateAuthorDto = {
  /* 作者头像 URL */
  avatar?: null | string;
  /* 作者描述 */
  description?: null | string;
  /* 性别（0=未知；1=男性；2=女性；3=其他；4=保密） */
  gender: number;
  /* 作者姓名 */
  name: string;
  /* 国籍 */
  nationality?: null | string;
  /* 管理员备注 */
  remark?: null | string;
  /* 作者角色类型（1=漫画家；2=轻小说作者） */
  type?: null | number[];
};

/**
 *  类型定义 [AuthorPageResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AuthorPageResponseDto = {
  /* 作者头像 URL */
  avatar?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 粉丝数量（冗余字段，用于前台展示） */
  followersCount: number;
  /* 性别（0=未知；1=男性；2=女性；3=其他；4=保密） */
  gender: number;
  /* 主键id */
  id: number;
  /* 启用状态 */
  isEnabled: boolean;
  /* 是否为推荐作者（用于前台推荐展示） */
  isRecommended: boolean;
  /* 作者姓名 */
  name: string;
  /* 国籍 */
  nationality?: null | string;
  /* 作者角色类型（1=漫画家；2=轻小说作者） */
  type?: null | number[];
  /* 更新时间 */
  updatedAt: string;
  /* 作品数量（冗余字段，用于提升查询性能） */
  workCount: number;
};

/**
 *  类型定义 [AuthorOutputBaseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AuthorOutputBaseDto = {
  /* 作者头像 URL */
  avatar?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 作者描述 */
  description?: null | string;
  /* 粉丝数量（冗余字段，用于前台展示） */
  followersCount: number;
  /* 性别（0=未知；1=男性；2=女性；3=其他；4=保密） */
  gender: number;
  /* 主键id */
  id: number;
  /* 启用状态 */
  isEnabled: boolean;
  /* 是否为推荐作者（用于前台推荐展示） */
  isRecommended: boolean;
  /* 作者姓名 */
  name: string;
  /* 国籍 */
  nationality?: null | string;
  /* 管理员备注 */
  remark?: null | string;
  /* 作者角色类型（1=漫画家；2=轻小说作者） */
  type?: null | number[];
  /* 更新时间 */
  updatedAt: string;
  /* 作品数量（冗余字段，用于提升查询性能） */
  workCount: number;
};

/**
 *  类型定义 [UpdateAuthorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateAuthorDto = {
  /* 作者头像 URL */
  avatar?: null | string;
  /* 作者描述 */
  description?: null | string;
  /* 性别（0=未知；1=男性；2=女性；3=其他；4=保密） */
  gender?: null | number;
  /* 主键id */
  id: number;
  /* 作者姓名 */
  name?: null | string;
  /* 国籍 */
  nationality?: null | string;
  /* 管理员备注 */
  remark?: null | string;
  /* 作者角色类型（1=漫画家；2=轻小说作者） */
  type?: null | number[];
};

/**
 *  类型定义 [UpdateAuthorStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateAuthorStatusDto = {
  /* 主键id */
  id: number;
  /* 启用状态 */
  isEnabled: boolean;
};

/**
 *  类型定义 [UpdateAuthorRecommendedDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateAuthorRecommendedDto = {
  /* 主键id */
  id: number;
  /* 是否为推荐作者（用于前台推荐展示） */
  isRecommended: boolean;
};

/**
 *  类型定义 [AuthorFollowCountRepairResultDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AuthorFollowCountRepairResultDto = {
  /* 粉丝数量（冗余字段，用于前台展示） */
  followersCount: number;
  /* 主键id */
  id: number;
};

/**
 *  类型定义 [AuthorWorkCountRepairResultDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AuthorWorkCountRepairResultDto = {
  /* 主键id */
  id: number;
  /* 作品数量（冗余字段，用于提升查询性能） */
  workCount: number;
};

/**
 *  类型定义 [CreateCategoryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateCategoryDto = {
  /* 分类关联的内容类型（1=漫画；2=小说；3=帖子） */
  contentType?: null | number[];
  /* 分类描述 */
  description?: null | string;
  /* 分类图标 URL */
  icon?: null | string;
  /* 是否启用 */
  isEnabled: boolean;
  /* 分类名称 */
  name: string;
  /* 排序值 */
  sortOrder: number;
};

/**
 *  类型定义 [CategoryOutputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CategoryOutputDto = {
  /* 分类关联的内容类型（1=漫画；2=小说；3=帖子） */
  contentType?: null | number[];
  /* 创建时间 */
  createdAt: string;
  /* 分类描述 */
  description?: null | string;
  /* 分类图标 URL */
  icon?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 分类名称 */
  name: string;
  /* 人气值 */
  popularity: number;
  /* 排序值 */
  sortOrder: number;
  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [UpdateCategoryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateCategoryDto = {
  /* 分类关联的内容类型（1=漫画；2=小说；3=帖子） */
  contentType?: null | number[];
  /* 分类描述 */
  description?: null | string;
  /* 分类图标 URL */
  icon?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 分类名称 */
  name?: null | string;
  /* 排序值 */
  sortOrder?: null | number;
};

/**
 *  类型定义 [UpdateCategoryStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateCategoryStatusDto = {
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
};

/**
 *  类型定义 [UpdateCategorySortDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateCategorySortDto = {
  /* 当前拖拽元素的id */
  dragId: number;
  /* 拖拽的目标位置id */
  targetId: number;
};

/**
 *  类型定义 [CreateTagDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateTagDto = {
  /* 标签描述 */
  description?: null | string;
  /* 标签图标 URL */
  icon?: null | string;
  /* 标签名称 */
  name: string;
  /* 排序值（0=默认排序，数值越小越靠前） */
  sortOrder: number;
};

/**
 *  类型定义 [AdminTagDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminTagDto = {
  /* 创建时间 */
  createdAt: string;
  /* 标签描述 */
  description?: null | string;
  /* 标签图标 URL */
  icon?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 标签名称 */
  name: string;
  /* 排序值（0=默认排序，数值越小越靠前） */
  sortOrder: number;
  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [UpdateTagDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateTagDto = {
  /* 标签描述 */
  description?: null | string;
  /* 标签图标 URL */
  icon?: null | string;
  /* 主键id */
  id: number;
  /* 标签名称 */
  name?: null | string;
  /* 排序值（0=默认排序，数值越小越靠前） */
  sortOrder?: null | number;
};

/**
 *  类型定义 [UpdateEnabledStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateEnabledStatusDto = {
  /* 主键id */
  id: number;
  /* 状态 true启用 false禁用 */
  isEnabled: boolean;
};

/**
 *  类型定义 [UpdateTagSortDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateTagSortDto = {
  /* 当前拖拽元素的id */
  dragId: number;
  /* 拖拽的目标位置id */
  targetId: number;
};

/**
 *  类型定义 [EmojiPackOutputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type EmojiPackOutputDto = {
  /* 表情包编码 */
  code: string;
  /* 创建时间 */
  createdAt: string;
  /* 创建人ID */
  createdById?: null | number;
  /* 描述 */
  description?: null | string;
  /* 图标地址 */
  iconUrl?: null | string;
  /* 主键id */
  id: number;
  /* 启用状态 */
  isEnabled: boolean;
  /* 表情包名称 */
  name: string;
  /* 场景类型（1=聊天,2=评论,3=论坛主题） */
  sceneType: number[];
  /* 排序值 */
  sortOrder: number;
  /* 更新时间 */
  updatedAt: string;
  /* 更新人ID */
  updatedById?: null | number;
  /* 是否在选择器可见 */
  visibleInPicker: boolean;
};

/**
 *  类型定义 [CreateEmojiPackDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateEmojiPackDto = {
  /* 表情包编码 */
  code: string;
  /* 描述 */
  description?: null | string;
  /* 图标地址 */
  iconUrl?: null | string;
  /* 启用状态 */
  isEnabled?: boolean | null;
  /* 表情包名称 */
  name: string;
  /* 场景类型（1=聊天,2=评论,3=论坛主题） */
  sceneType: number[];
  /* 排序值 */
  sortOrder?: null | number;
  /* 是否在选择器可见 */
  visibleInPicker?: boolean | null;
};

/**
 *  类型定义 [UpdateEmojiPackDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateEmojiPackDto = {
  /* 表情包编码 */
  code?: null | string;
  /* 描述 */
  description?: null | string;
  /* 图标地址 */
  iconUrl?: null | string;
  /* 主键id */
  id: number;
  /* 启用状态 */
  isEnabled?: boolean | null;
  /* 表情包名称 */
  name?: null | string;
  /* 场景类型（1=聊天,2=评论,3=论坛主题） */
  sceneType?: null | number[];
  /* 排序值 */
  sortOrder?: null | number;
  /* 是否在选择器可见 */
  visibleInPicker?: boolean | null;
};

/**
 *  类型定义 [UpdateEmojiPackSceneTypeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateEmojiPackSceneTypeDto = {
  /* 主键id */
  id: number;
  /* 场景类型（1=聊天,2=评论,3=论坛主题） */
  sceneType: number[];
};

/**
 *  类型定义 [EmojiAssetOutputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type EmojiAssetOutputDto = {
  /* 分类 */
  category?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 创建人ID */
  createdById?: null | number;
  /* 主键id */
  id: number;
  /* 资源地址（custom 必填） */
  imageUrl?: null | string;
  /* 是否动图 */
  isAnimated: boolean;
  /* 启用状态 */
  isEnabled: boolean;
  /* 关键词（多语言） */
  keywords?: null | Record<string, string[]>;
  /* 资源类型（1=unicode,2=custom） */
  kind: number;
  /* 表情包ID */
  packId: number;
  /* 短码（custom 必填） */
  shortcode?: null | string;
  /* 排序值 */
  sortOrder: number;
  /* 静态资源地址 */
  staticUrl?: null | string;
  /* Unicode 序列（unicode 必填） */
  unicodeSequence?: null | string;
  /* 更新时间 */
  updatedAt: string;
  /* 更新人ID */
  updatedById?: null | number;
};

/**
 *  类型定义 [CreateEmojiAssetDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateEmojiAssetDto = {
  /* 分类 */
  category?: null | string;
  /* 资源地址（custom 必填） */
  imageUrl?: null | string;
  /* 是否动图 */
  isAnimated?: boolean | null;
  /* 启用状态 */
  isEnabled?: boolean | null;
  /* 关键词（多语言） */
  keywords?: null | Record<string, string[]>;
  /* 资源类型（1=unicode,2=custom） */
  kind: number;
  /* 表情包ID */
  packId: number;
  /* 短码（custom 必填） */
  shortcode?: null | string;
  /* 排序值 */
  sortOrder?: null | number;
  /* 静态资源地址 */
  staticUrl?: null | string;
  /* Unicode 序列（unicode 必填） */
  unicodeSequence?: null | string;
};

/**
 *  类型定义 [UpdateEmojiAssetDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateEmojiAssetDto = {
  /* 分类 */
  category?: null | string;
  /* 主键id */
  id: number;
  /* 资源地址（custom 必填） */
  imageUrl?: null | string;
  /* 是否动图 */
  isAnimated?: boolean | null;
  /* 启用状态 */
  isEnabled?: boolean | null;
  /* 关键词（多语言） */
  keywords?: null | Record<string, string[]>;
  /* 资源类型（1=unicode,2=custom） */
  kind?: null | number;
  /* 表情包ID */
  packId?: null | number;
  /* 短码（custom 必填） */
  shortcode?: null | string;
  /* 排序值 */
  sortOrder?: null | number;
  /* 静态资源地址 */
  staticUrl?: null | string;
  /* Unicode 序列（unicode 必填） */
  unicodeSequence?: null | string;
};

/**
 *  类型定义 [BaseAuthorDto]
 *  @来源 legacy compatibility alias
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseAuthorDto = AuthorOutputBaseDto;

/**
 *  类型定义 [BaseCategoryDto]
 *  @来源 legacy compatibility alias
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseCategoryDto = CategoryOutputDto;

/**
 *  类型定义 [BaseEmojiAssetDto]
 *  @来源 legacy compatibility alias
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseEmojiAssetDto = EmojiAssetOutputDto;

/**
 *  类型定义 [BaseEmojiPackDto]
 *  @来源 legacy compatibility alias
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseEmojiPackDto = EmojiPackOutputDto;
