/**
 *  类型定义 [AppPageCreateRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type AppPageCreateRequest = CreateAppPageDto

export type AppPageCreateResponse = boolean

/**
 *  类型定义 [AppPagePageRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type AppPagePageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 页面权限级别（0=GUEST，1=LOGIN，2=MEMBER，3=VIP） */
  accessLevel?: number

  /* 页面编码（唯一标识） */
  code?: string

  /* 启用平台筛选 JSON 字符串 */
  enablePlatform?: null | string

  /* 结束时间 */
  endDate?: null | string

  /* 页面启用状态 */
  isEnabled?: boolean

  /* 页面名称 */
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

export type AppPagePageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: AppPageResponseDto[]

  /* 当前页码（从0开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [AppPageDetailRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type AppPageDetailRequest = {
  
  /** 任意合法数值 */
  [property: string]: any

  id: number
}

export type AppPageDetailResponse = BaseAppPageDto

/**
 *  类型定义 [AppPageDetailCodeRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type AppPageDetailCodeRequest = {
  
  /** 任意合法数值 */
  [property: string]: any

  code: string
}

export type AppPageDetailCodeResponse = BaseAppPageDto

/**
 *  类型定义 [AppPageUpdateRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type AppPageUpdateRequest = UpdateAppPageDto

export type AppPageUpdateResponse = boolean

/**
 *  类型定义 [AppPageDeleteRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-03-23 16:50:34
 */
export type AppPageDeleteRequest = IdsDto

export type AppPageDeleteResponse = boolean

/**
 *  类型定义 [CreateAppPageDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type CreateAppPageDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 页面权限级别（0=GUEST，1=LOGIN，2=MEMBER，3=VIP） */
  accessLevel: 0 | 1 | 2 | 3
  /* 页面编码（唯一标识） */
  code: string
  /* 页面描述信息 */
  description?: null | string
  /* 启用的平台 */
  enablePlatform?: any[] | null
  /* 页面启用状态 */
  isEnabled: boolean
  /* 页面名称 */
  name: string
  /* 页面路径（URL路径） */
  path: string

  /* 页面标题 */
  title: string
}

/**
 *  类型定义 [AppPageResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type AppPageResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 页面权限级别（0=GUEST，1=LOGIN，2=MEMBER，3=VIP） */
  accessLevel: 0 | 1 | 2 | 3
  /* 页面编码（唯一标识） */
  code: string
  /* 创建时间 */
  createdAt: string
  /* 启用的平台 */
  enablePlatform?: any[] | null
  /* 主键id */
  id: number
  /* 页面启用状态 */
  isEnabled: boolean
  /* 页面名称 */
  name: string
  /* 页面路径（URL路径） */
  path: string
  /* 页面标题 */
  title: string

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [BaseAppPageDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type BaseAppPageDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 页面权限级别（0=GUEST，1=LOGIN，2=MEMBER，3=VIP） */
  accessLevel: 0 | 1 | 2 | 3
  /* 页面编码（唯一标识） */
  code: string
  /* 创建时间 */
  createdAt: string
  /* 页面描述信息 */
  description?: null | string
  /* 启用的平台 */
  enablePlatform?: any[] | null
  /* 主键id */
  id: number
  /* 页面启用状态 */
  isEnabled: boolean
  /* 页面名称 */
  name: string
  /* 页面路径（URL路径） */
  path: string
  /* 页面标题 */
  title: string

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [UpdateAppPageDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type UpdateAppPageDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 页面权限级别（0=GUEST，1=LOGIN，2=MEMBER，3=VIP） */
  accessLevel?: 0 | 1 | 2 | 3
  /* 页面编码（唯一标识） */
  code?: string
  /* 页面描述信息 */
  description?: null | string
  /* 启用的平台 */
  enablePlatform?: any[] | null
  /* 主键id */
  id: number
  /* 页面启用状态 */
  isEnabled?: boolean
  /* 页面名称 */
  name?: string
  /* 页面路径（URL路径） */
  path?: string

  /* 页面标题 */
  title?: string
}

/**
 *  类型定义 [IdsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type IdsDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id集合 */
  ids: number[]
}