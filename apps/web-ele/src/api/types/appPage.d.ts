/**
 *  类型定义 [AppPageCreateRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-04-08 08:36:51
 */
export type AppPageCreateRequest = CreateAppPageDto

export type AppPageCreateResponse = boolean

/**
 *  类型定义 [AppPagePageRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-04-08 08:36:51
 */
export type AppPagePageRequest = {
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

  /* 页面编码（唯一标识） */
  code?: string

  /* 页面名称 */
  name?: string

  /* 页面权限级别（0=游客；1=登录；2=会员；3=高级会员） */
  accessLevel?: number

  /* 页面启用状态 */
  isEnabled?: boolean

  /* 启用平台筛选 JSON 字符串，例如 [1,2] */
  enablePlatform?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

export type AppPagePageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: BaseAppPageDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AppPageDetailRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-04-08 08:36:51
 */
export type AppPageDetailRequest = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

export type AppPageDetailResponse = BaseAppPageDto

/**
 *  类型定义 [AppPageUpdateRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-04-08 08:36:51
 */
export type AppPageUpdateRequest = UpdateAppPageDto

export type AppPageUpdateResponse = boolean

/**
 *  类型定义 [AppPageDeleteRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-04-08 08:36:51
 */
export type AppPageDeleteRequest = IdsDto

export type AppPageDeleteResponse = boolean

/**
 *  类型定义 [AppPageCodeDetailRequest]
 *  @来源 APP管理/页面管理
 *  @更新时间 2026-04-08 08:36:51
 */
export type AppPageCodeDetailRequest = {
  /* 页面编码（唯一标识） */
  code: string

  /** 任意合法数值 */
  [property: string]: any
}

export type AppPageCodeDetailResponse = BaseAppPageDto

/**
 *  类型定义 [CreateAppPageDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type CreateAppPageDto = {
  /* 页面编码（唯一标识） */
  code: string
  /* 页面路径（URL 路径） */
  path: string
  /* 页面名称 */
  name: string
  /* 页面标题 */
  title: string
  /* 启用的平台（1=H5；2=App；3=小程序） */
  enablePlatform?: any[] | null
  /* 页面权限级别（0=游客；1=登录；2=会员；3=高级会员） */
  accessLevel: 0 | 1 | 2 | 3
  /* 页面启用状态 */
  isEnabled: boolean
  /* 页面描述信息 */
  description?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [BaseAppPageDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type BaseAppPageDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 页面编码（唯一标识） */
  code: string
  /* 页面路径（URL 路径） */
  path: string
  /* 页面名称 */
  name: string
  /* 页面标题 */
  title: string
  /* 启用的平台（1=H5；2=App；3=小程序） */
  enablePlatform?: any[] | null
  /* 页面权限级别（0=游客；1=登录；2=会员；3=高级会员） */
  accessLevel: 0 | 1 | 2 | 3
  /* 页面启用状态 */
  isEnabled: boolean
  /* 页面描述信息 */
  description?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateAppPageDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type UpdateAppPageDto = {
  /* 主键id */
  id: number
  /* 页面编码（唯一标识） */
  code?: string
  /* 页面路径（URL 路径） */
  path?: string
  /* 页面名称 */
  name?: string
  /* 页面标题 */
  title?: string
  /* 启用的平台（1=H5；2=App；3=小程序） */
  enablePlatform?: any[] | null
  /* 页面权限级别（0=游客；1=登录；2=会员；3=高级会员） */
  accessLevel?: 0 | 1 | 2 | 3
  /* 页面启用状态 */
  isEnabled?: boolean
  /* 页面描述信息 */
  description?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [IdsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type IdsDto = {
  /* 主键id集合 */
  ids: number[]

  /** 任意合法数值 */
  [property: string]: any
}