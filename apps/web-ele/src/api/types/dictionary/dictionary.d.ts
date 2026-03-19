/**
 *  类型定义 [DictionaryPageRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type DictionaryPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 字典编码 */
  code?: string

  /* 结束时间 */
  endDate?: null | string

  /* 字典状态：true=启用，false=禁用 */
  isEnabled?: boolean

  /* 字典名称 */
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

export type DictionaryPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseDictionaryDto[]

  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [DictionaryDetailRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type DictionaryDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type DictionaryDetailResponse = BaseDictionaryDto

/**
 *  类型定义 [DictionaryCreateRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type DictionaryCreateRequest = CreateDictionaryDto

export type DictionaryCreateResponse = boolean

/**
 *  类型定义 [DictionaryUpdateRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type DictionaryUpdateRequest = UpdateDictionaryDto

export type DictionaryUpdateResponse = boolean

/**
 *  类型定义 [DictionaryDeleteRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type DictionaryDeleteRequest = IdDto

export type DictionaryDeleteResponse = boolean

/**
 *  类型定义 [DictionaryUpdateStatusRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type DictionaryUpdateStatusRequest = UpdateEnabledStatusDto

export type DictionaryUpdateStatusResponse = boolean

/**
 *  类型定义 [BaseDictionaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type BaseDictionaryDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 字典编码 */
  code: string
  /* 字典封面图片URL */
  cover?: null | string
  /* 创建时间 */
  createdAt: string
  /* 软删除时间 */
  deletedAt?: null | string
  /* 字典描述信息 */
  description?: null | string
  /* 主键id */
  id: number
  /* 字典状态：true=启用，false=禁用 */
  isEnabled: boolean
  /* 字典名称 */
  name: string

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [CreateDictionaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type CreateDictionaryDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 字典编码 */
  code: string
  /* 字典封面图片URL */
  cover?: null | string
  /* 软删除时间 */
  deletedAt?: null | string
  /* 字典描述信息 */
  description?: null | string
  /* 字典状态：true=启用，false=禁用 */
  isEnabled: boolean

  /* 字典名称 */
  name: string
}

/**
 *  类型定义 [UpdateDictionaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UpdateDictionaryDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 字典编码 */
  code: string
  /* 字典封面图片URL */
  cover?: null | string
  /* 软删除时间 */
  deletedAt?: null | string
  /* 字典描述信息 */
  description?: null | string
  /* 主键id */
  id: number
  /* 字典状态：true=启用，false=禁用 */
  isEnabled: boolean

  /* 字典名称 */
  name: string
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

/**
 *  类型定义 [UpdateEnabledStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UpdateEnabledStatusDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 状态 true启用 false禁用 */
  isEnabled: boolean
}