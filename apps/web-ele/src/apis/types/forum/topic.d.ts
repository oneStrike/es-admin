/**
 *  类型定义 [TopicPageRequest]
 *  @来源 论坛模块/主题管理模块
 *  @更新时间 2026-01-13 00:08:17
 */
export type TopicPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 审核状态（0=待审核, 1=已通过, 2=已拒绝） */
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

  /* 当前页码 */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 论坛用户资料ID */
  profileId?: number;

  /* 关联的板块ID */
  sectionId?: number;

  /* 开始时间 */
  startDate?: null | string;
};

export type TopicPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseForumTopicDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [TopicDetailRequest]
 *  @来源 论坛模块/主题管理模块
 *  @更新时间 2026-01-13 00:08:17
 */
export type TopicDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type TopicDetailResponse = BaseForumTopicDto;

/**
 *  类型定义 [TopicCreateRequest]
 *  @来源 论坛模块/主题管理模块
 *  @更新时间 2026-01-13 00:08:17
 */
export type TopicCreateRequest = CreateForumTopicDto;

export type TopicCreateResponse = BaseForumTopicDto;

/**
 *  类型定义 [TopicUpdateRequest]
 *  @来源 论坛模块/主题管理模块
 *  @更新时间 2026-01-13 00:08:17
 */
export type TopicUpdateRequest = UpdateForumTopicDto;

export type TopicUpdateResponse = BaseForumTopicDto;

/**
 *  类型定义 [TopicDeleteRequest]
 *  @来源 论坛模块/主题管理模块
 *  @更新时间 2026-01-13 00:08:17
 */
export type TopicDeleteRequest = IdDto;

export type TopicDeleteResponse = BaseForumTopicDto;

/**
 *  类型定义 [TopicUpdatePinnedRequest]
 *  @来源 论坛模块/主题管理模块
 *  @更新时间 2026-01-13 00:08:17
 */
export type TopicUpdatePinnedRequest = UpdateTopicPinnedDto;

export type TopicUpdatePinnedResponse = BaseForumTopicDto;

/**
 *  类型定义 [TopicUpdateFeaturedRequest]
 *  @来源 论坛模块/主题管理模块
 *  @更新时间 2026-01-13 00:08:17
 */
export type TopicUpdateFeaturedRequest = UpdateTopicFeaturedDto;

export type TopicUpdateFeaturedResponse = BaseForumTopicDto;

/**
 *  类型定义 [TopicUpdateLockedRequest]
 *  @来源 论坛模块/主题管理模块
 *  @更新时间 2026-01-13 00:08:17
 */
export type TopicUpdateLockedRequest = UpdateTopicLockedDto;

export type TopicUpdateLockedResponse = BaseForumTopicDto;

/**
 *  类型定义 [TopicUpdateHiddenRequest]
 *  @来源 论坛模块/主题管理模块
 *  @更新时间 2026-01-13 00:08:17
 */
export type TopicUpdateHiddenRequest = UpdateTopicHiddenDto;

export type TopicUpdateHiddenResponse = BaseForumTopicDto;

/**
 *  类型定义 [TopicUpdateAuditStatusRequest]
 *  @来源 论坛模块/主题管理模块
 *  @更新时间 2026-01-13 00:08:17
 */
export type TopicUpdateAuditStatusRequest = UpdateTopicAuditStatusDto;

export type TopicUpdateAuditStatusResponse = BaseForumTopicDto;

/**
 *  类型定义 [TopicIncrementViewCountRequest]
 *  @来源 论坛模块/主题管理模块
 *  @更新时间 2026-01-13 00:08:17
 */
export type TopicIncrementViewCountRequest = IdDto;

export type TopicIncrementViewCountResponse = BaseForumTopicDto;

/**
 *  类型定义 [BaseForumTopicDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-13 00:08:17
 */
export type BaseForumTopicDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 关联的审核用户ID */
  auditById?: null | number;
  /* 审核拒绝原因 */
  auditReason?: null | string;
  /* 审核角色（0=版主, 1=管理员） */
  auditRole?: null | number;
  /* 审核状态（0=待审核, 1=已通过, 2=已拒绝） */
  auditStatus: 0 | 1 | 2;
  /* 主题内容 */
  content: string;
  /* 创建时间 */
  createdAt: string;
  /* 收藏次数 */
  favoriteCount: number;
  /* 主键id */
  id: number;
  /* 是否精华 */
  isFeatured: boolean;
  /* 是否隐藏 */
  isHidden: boolean;
  /* 是否锁定 */
  isLocked: boolean;
  /* 是否置顶 */
  isPinned: boolean;
  /* 最后回复时间 */
  lastReplyAt?: null | string;
  /* 最后回复用户ID */
  lastReplyProfileId?: null | number;
  /* 点赞次数 */
  likeCount: number;
  /* 论坛用户资料ID */
  profileId: number;
  /* 回复次数 */
  replyCount: number;
  /* 关联的板块ID */
  sectionId: number;
  /* 主题标题 */
  title: string;
  /* 更新时间 */
  updatedAt: string;

  /* 浏览次数 */
  viewCount: number;
};

/**
 *  类型定义 [CreateForumTopicDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-13 00:08:17
 */
export type CreateForumTopicDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主题内容 */
  content: string;
  /* 论坛用户资料ID */
  profileId: number;
  /* 关联的板块ID */
  sectionId: number;

  /* 主题标题 */
  title: string;
};

/**
 *  类型定义 [UpdateForumTopicDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-13 00:08:17
 */
export type UpdateForumTopicDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主题内容 */
  content: string;
  /* 主键id */
  id: number;
  /* 论坛用户资料ID */
  profileId: number;
  /* 关联的板块ID */
  sectionId: number;

  /* 主题标题 */
  title: string;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-13 00:08:17
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [UpdateTopicPinnedDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-13 00:08:17
 */
export type UpdateTopicPinnedDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 是否置顶 */
  isPinned: boolean;
};

/**
 *  类型定义 [UpdateTopicFeaturedDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-13 00:08:17
 */
export type UpdateTopicFeaturedDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 是否精华 */
  isFeatured: boolean;
};

/**
 *  类型定义 [UpdateTopicLockedDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-13 00:08:17
 */
export type UpdateTopicLockedDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 是否锁定 */
  isLocked: boolean;
};

/**
 *  类型定义 [UpdateTopicHiddenDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-13 00:08:17
 */
export type UpdateTopicHiddenDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 是否隐藏 */
  isHidden: boolean;
};

/**
 *  类型定义 [UpdateTopicAuditStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-13 00:08:17
 */
export type UpdateTopicAuditStatusDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 审核拒绝原因 */
  auditReason?: null | string;
  /* 审核状态（0=待审核, 1=已通过, 2=已拒绝） */
  auditStatus: 0 | 1 | 2;

  /* 主键id */
  id: number;
};
