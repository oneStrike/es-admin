/**
 *  类型定义 [TagsPageRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type TagsPageRequest = {
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

  /* 当前页码 */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string
}

export type TagsPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseForumTagDto[]

  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [TagsDetailRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type TagsDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type TagsDetailResponse = ForumTagDetailResponseDto

/**
 *  类型定义 [TagsPopularRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type TagsPopularRequest = {
  
  /** 任意合法数值 */
  [property: string]: any

  limit: number
}

export type TagsPopularResponse = BaseForumTagDto[]

export type TagsEnabledResponse = BaseForumTagDto[]

/**
 *  类型定义 [TagsTopicTagsRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type TagsTopicTagsRequest = {
  
  /** 任意合法数值 */
  [property: string]: any

  topicId: number
}

export type TagsTopicTagsResponse = BaseForumTagDto[]

/**
 *  类型定义 [TagsCreateRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type TagsCreateRequest = CreateForumTagDto

export type TagsCreateResponse = BaseForumTagDto

/**
 *  类型定义 [TagsUpdateRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type TagsUpdateRequest = UpdateForumTagDto

export type TagsUpdateResponse = BaseForumTagDto

/**
 *  类型定义 [TagsDeleteRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type TagsDeleteRequest = IdDto

export type TagsDeleteResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 响应状态码 */
  code?: number

  /* 响应消息 */
  message?: string
}

/**
 *  类型定义 [TagsAssignTopicRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type TagsAssignTopicRequest = AssignForumTagToTopicDto

export type TagsAssignTopicResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 响应状态码 */
  code?: number

  /* 响应消息 */
  message?: string
}

/**
 *  类型定义 [TagsUnassignTopicRequest]
 *  @来源 论坛管理/标签管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type TagsUnassignTopicRequest = RemoveForumTagFromTopicDto

export type TagsUnassignTopicResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 响应状态码 */
  code?: number

  /* 响应消息 */
  message?: string
}

/**
 *  类型定义 [BaseForumTagDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
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
 *  @更新时间 2026-03-19 23:58:08
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
 *  @更新时间 2026-03-19 23:58:08
 */
export type ForumTagTopicSummaryDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主题创建时间 */
  createdAt: string
  /* 主题ID */
  id: number

  /* 主题标题 */
  title: string
}

/**
 *  类型定义 [CreateForumTagDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
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
 *  @更新时间 2026-03-19 23:58:08
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
 *  类型定义 [AssignForumTagToTopicDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
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
 *  @更新时间 2026-03-19 23:58:08
 */
export type RemoveForumTagFromTopicDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 标签ID */
  tagId: number

  /* 主题ID */
  topicId: number
}