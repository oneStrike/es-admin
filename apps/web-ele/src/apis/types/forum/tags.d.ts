/**
 *  类型定义 [TagsListRequest]
 *  @来源 论坛模块/标签管理
 *  @更新时间 2026-01-27 15:37:13
 */
export type TagsListRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean | null;

  /* 标签名称 */
  name?: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码 */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;
};

export type TagsListResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: CreateForumTagDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [TagsDetailRequest]
 *  @来源 论坛模块/标签管理
 *  @更新时间 2026-01-27 15:37:13
 */
export type TagsDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type TagsDetailResponse = CreateForumTagDto;

/**
 *  类型定义 [TagsPopularRequest]
 *  @来源 论坛模块/标签管理
 *  @更新时间 2026-01-27 15:37:13
 */
export type TagsPopularRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  limit: number;
};

export type TagsPopularResponse = CreateForumTagDto;

export type TagsSystemResponse = CreateForumTagDto;

export type TagsUserResponse = CreateForumTagDto;

/**
 *  类型定义 [TagsTopicTagsRequest]
 *  @来源 论坛模块/标签管理
 *  @更新时间 2026-01-27 15:37:13
 */
export type TagsTopicTagsRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  topicId: number;
};

export type TagsTopicTagsResponse = CreateForumTagDto;

/**
 *  类型定义 [TagsAddRequest]
 *  @来源 论坛模块/标签管理
 *  @更新时间 2026-01-27 15:37:13
 */
export type TagsAddRequest = CreateForumTagDto;

export type TagsAddResponse = CreateForumTagDto;

/**
 *  类型定义 [TagsUpdateRequest]
 *  @来源 论坛模块/标签管理
 *  @更新时间 2026-01-27 15:37:13
 */
export type TagsUpdateRequest = UpdateForumTagDto;

export type TagsUpdateResponse = UpdateForumTagDto;

/**
 *  类型定义 [TagsRemoveRequest]
 *  @来源 论坛模块/标签管理
 *  @更新时间 2026-01-27 15:37:13
 */
export type TagsRemoveRequest = IdDto;

export type TagsRemoveResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 响应状态码 */
  code?: number;

  /* 响应消息 */
  message?: string;
};

/**
 *  类型定义 [TagsAssignRequest]
 *  @来源 论坛模块/标签管理
 *  @更新时间 2026-01-27 15:37:13
 */
export type TagsAssignRequest = AssignForumTagToTopicDto;

export type TagsAssignResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 响应状态码 */
  code?: number;

  /* 响应消息 */
  message?: string;
};

/**
 *  类型定义 [TagsRemoveTagRequest]
 *  @来源 论坛模块/标签管理
 *  @更新时间 2026-01-27 15:37:13
 */
export type TagsRemoveTagRequest = RemoveForumTagFromTopicDto;

export type TagsRemoveTagResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 响应状态码 */
  code?: number;

  /* 响应消息 */
  message?: string;
};

/**
 *  类型定义 [CreateForumTagDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-27 15:37:13
 */
export type CreateForumTagDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 标签描述 */
  description?: null | string;
  /* 标签图标URL */
  icon?: null | string;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 标签名称 */
  name: string;

  /* 排序权重 */
  sortOrder?: null | number;
};

/**
 *  类型定义 [UpdateForumTagDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-27 15:37:13
 */
export type UpdateForumTagDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 标签描述 */
  description?: null | string;
  /* 标签图标URL */
  icon?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 标签名称 */
  name: string;

  /* 排序权重 */
  sortOrder?: null | number;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-27 15:37:13
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [AssignForumTagToTopicDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-27 15:37:13
 */
export type AssignForumTagToTopicDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 标签ID */
  tagId: number;

  /* 主题ID */
  topicId: number;
};

/**
 *  类型定义 [RemoveForumTagFromTopicDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-27 15:37:13
 */
export type RemoveForumTagFromTopicDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 标签ID */
  tagId: number;

  /* 主题ID */
  topicId: number;
};
