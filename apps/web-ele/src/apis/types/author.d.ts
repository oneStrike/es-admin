/**
 *  类型定义 [AuthorCreateRequest]
 *  @来源 作者管理模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type AuthorCreateRequest = CreateAuthorDto

export type AuthorCreateResponse = IdDto

/**
 *  类型定义 [AuthorPageRequest]
 *  @来源 作者管理模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type AuthorPageRequest = {
  /* 单页大小，最大500，默认15 */
  pageSize?: number

  /* 当前页码 */
  pageIndex?: number

  /* 排序字段，json格式 */
  orderBy?: string

  /* 开始时间 */
  startDate?: string

  /* 结束时间 */
  endDate?: string

  /* 作者姓名 */
  name?: string

  /* 启用状态（true: 启用, false: 禁用） */
  isEnabled?: boolean

  /* 国籍 */
  nationality?: string

  /* 性别（0: 未知, 1: 男性, 2: 女性, 3: 其他） */
  gender?: number

  /* 是否为推荐作者（用于前台推荐展示） */
  featured?: boolean

  /* 作者角色类型列表（角色ID数组，筛选包含指定角色的作者,逗号分割） */
  roleTypeIds?: string

  /** 任意合法数值 */
  [property: string]: any
}

export type AuthorPageResponse = {
  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: AuthorPageResponseDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AuthorDetailRequest]
 *  @来源 作者管理模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type AuthorDetailRequest = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

export type AuthorDetailResponse = BaseAuthorDto

/**
 *  类型定义 [AuthorUpdateRequest]
 *  @来源 作者管理模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type AuthorUpdateRequest = UpdateAuthorDto

export type AuthorUpdateResponse = IdDto

/**
 *  类型定义 [AuthorDeleteRequest]
 *  @来源 作者管理模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type AuthorDeleteRequest = IdDto

export type AuthorDeleteResponse = IdDto

/**
 *  类型定义 [AuthorUpdateStatusRequest]
 *  @来源 作者管理模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type AuthorUpdateStatusRequest = UpdateStatusDto

export type AuthorUpdateStatusResponse = BatchOperationResponseDto

/**
 *  类型定义 [AuthorUpdateFeaturedRequest]
 *  @来源 作者管理模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type AuthorUpdateFeaturedRequest = UpdateAuthorFeaturedDto

export type AuthorUpdateFeaturedResponse = BatchOperationResponseDto

/**
 *  类型定义 [CreateAuthorDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type CreateAuthorDto = {
  /* 作者姓名 */
  name: string
  /* 作者头像URL */
  avatar?: string
  /* 作者描述 */
  description?: string
  /* 作者角色类型列表（角色ID数组） */
  roleTypeIds: number[]
  /* 国籍 */
  nationality?: string
  /* 性别（0: 未知, 1: 男性, 2: 女性, 3: 其他） */
  gender: 0 | 1 | 2 | 3
  /* 社交媒体链接（JSON格式存储多个平台链接） */
  socialLinks?: string
  /* 管理员备注 */
  remark?: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type IdDto = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AuthorPageResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type AuthorPageResponseDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 作者姓名 */
  name: string
  /* 作者头像URL */
  avatar?: string
  /* 启用状态（true: 启用, false: 禁用） */
  isEnabled: boolean
  /* 作者角色类型列表（角色ID数组） */
  roleTypeIds: number[]
  /* 国籍 */
  nationality?: string
  /* 性别（0: 未知, 1: 男性, 2: 女性, 3: 其他） */
  gender: 0 | 1 | 2 | 3
  /* 作品数量（冗余字段，用于提升查询性能） */
  worksCount: number
  /* 粉丝数量（冗余字段，用于前台展示） */
  followersCount: number
  /* 是否为推荐作者（用于前台推荐展示） */
  featured: boolean

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [BaseAuthorDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type BaseAuthorDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 作者姓名 */
  name: string
  /* 作者头像URL */
  avatar?: string
  /* 作者描述 */
  description?: string
  /* 启用状态（true: 启用, false: 禁用） */
  isEnabled: boolean
  /* 作者角色类型列表（角色ID数组） */
  roleTypeIds: number[]
  /* 国籍 */
  nationality?: string
  /* 性别（0: 未知, 1: 男性, 2: 女性, 3: 其他） */
  gender: 0 | 1 | 2 | 3
  /* 社交媒体链接（JSON格式存储多个平台链接） */
  socialLinks?: string
  /* 管理员备注 */
  remark?: string
  /* 作品数量（冗余字段，用于提升查询性能） */
  worksCount: number
  /* 粉丝数量（冗余字段，用于前台展示） */
  followersCount: number
  /* 是否为推荐作者（用于前台推荐展示） */
  featured: boolean

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateAuthorDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type UpdateAuthorDto = {
  /* 作者姓名 */
  name: string
  /* 作者头像URL */
  avatar?: string
  /* 作者描述 */
  description?: string
  /* 作者角色类型列表（角色ID数组） */
  roleTypeIds: number[]
  /* 国籍 */
  nationality?: string
  /* 性别（0: 未知, 1: 男性, 2: 女性, 3: 其他） */
  gender: 0 | 1 | 2 | 3
  /* 社交媒体链接（JSON格式存储多个平台链接） */
  socialLinks?: string
  /* 管理员备注 */
  remark?: string
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type UpdateStatusDto = {
  /* 主键id */
  id: number
  /* 状态 true启用 false禁用 */
  isEnabled: boolean

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [BatchOperationResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type BatchOperationResponseDto = {
  /* 操作成功的数据量 */
  count: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateAuthorFeaturedDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type UpdateAuthorFeaturedDto = {
  /* 是否为推荐作者（用于前台推荐展示） */
  featured: boolean
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}