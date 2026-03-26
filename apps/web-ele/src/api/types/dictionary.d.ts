/**
 *  类型定义 [DictionaryPageRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type DictionaryPageRequest = {
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

  /* 字典名称 */
  name?: string

  /* 字典编码 */
  code?: string

  /* 字典状态：true=启用，false=禁用 */
  isEnabled?: boolean

  /** 任意合法数值 */
  [property: string]: any
}

export type DictionaryPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: BaseDictionaryDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [DictionaryDetailRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type DictionaryDetailRequest = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

export type DictionaryDetailResponse = BaseDictionaryDto

/**
 *  类型定义 [DictionaryCreateRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type DictionaryCreateRequest = CreateDictionaryDto

export type DictionaryCreateResponse = boolean

/**
 *  类型定义 [DictionaryUpdateRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type DictionaryUpdateRequest = UpdateDictionaryDto

export type DictionaryUpdateResponse = boolean

/**
 *  类型定义 [DictionaryDeleteRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type DictionaryDeleteRequest = IdDto

export type DictionaryDeleteResponse = boolean

/**
 *  类型定义 [DictionaryUpdateStatusRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type DictionaryUpdateStatusRequest = UpdateEnabledStatusDto

export type DictionaryUpdateStatusResponse = boolean

/**
 *  类型定义 [DictionaryItemPageRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type DictionaryItemPageRequest = {
  /* 所属字典编码 */
  dictionaryCode: string

  /* 单页大小，最大500，默认15 */
  pageSize?: number | null

  /* 当前页码（从1开始） */
  pageIndex?: number | null

  /* 排序字段，json格式 */
  orderBy?: string | null

  /* 字典名称 */
  name?: string

  /* 字典编码 */
  code?: string

  /* 字典状态：true=启用，false=禁用 */
  isEnabled?: boolean

  /** 任意合法数值 */
  [property: string]: any
}

export type DictionaryItemPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: BaseDictionaryItemDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [DictionaryItemListRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type DictionaryItemListRequest = {
  /* 所属字典编码 */
  dictionaryCode: string

  /** 任意合法数值 */
  [property: string]: any
}

export type DictionaryItemListResponse = BaseDictionaryItemDto

/**
 *  类型定义 [DictionaryItemCreateRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type DictionaryItemCreateRequest = CreateDictionaryItemDto

export type DictionaryItemCreateResponse = boolean

/**
 *  类型定义 [DictionaryItemUpdateRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type DictionaryItemUpdateRequest = UpdateDictionaryItemDto

export type DictionaryItemUpdateResponse = boolean

/**
 *  类型定义 [DictionaryItemUpdateStatusRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type DictionaryItemUpdateStatusRequest = UpdateEnabledStatusDto

export type DictionaryItemUpdateStatusResponse = boolean

/**
 *  类型定义 [DictionaryItemDeleteRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type DictionaryItemDeleteRequest = IdDto

export type DictionaryItemDeleteResponse = boolean

/**
 *  类型定义 [DictionaryItemSwapSortOrderRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-26 22:03:53
 */
export type DictionaryItemSwapSortOrderRequest = DragReorderDto

export type DictionaryItemSwapSortOrderResponse = boolean

/**
 *  类型定义 [BaseDictionaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type BaseDictionaryDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 字典名称 */
  name: string
  /* 字典编码 */
  code: string
  /* 字典封面图片URL */
  cover?: string | null
  /* 字典状态：true=启用，false=禁用 */
  isEnabled: boolean
  /* 字典描述信息 */
  description?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [CreateDictionaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type CreateDictionaryDto = {
  /* 字典名称 */
  name: string
  /* 字典编码 */
  code: string
  /* 字典封面图片URL */
  cover?: string | null
  /* 字典状态：true=启用，false=禁用 */
  isEnabled: boolean
  /* 字典描述信息 */
  description?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateDictionaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type UpdateDictionaryDto = {
  /* 字典名称 */
  name: string
  /* 字典编码 */
  code: string
  /* 字典封面图片URL */
  cover?: string | null
  /* 字典状态：true=启用，false=禁用 */
  isEnabled: boolean
  /* 字典描述信息 */
  description?: string | null
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
 *  类型定义 [BaseDictionaryItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type BaseDictionaryItemDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 所属字典编码 */
  dictionaryCode: string
  /* 字典项名称 */
  name: string
  /* 字典项编码 */
  code: string
  /* 显示排序（数值越小越靠前） */
  sortOrder?: number | null
  /* 字典项图标URL */
  cover?: string | null
  /* 字典项状态：true=启用，false=禁用 */
  isEnabled: boolean
  /* 字典项描述信息 */
  description?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [CreateDictionaryItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type CreateDictionaryItemDto = {
  /* 所属字典编码 */
  dictionaryCode: string
  /* 字典项名称 */
  name: string
  /* 字典项编码 */
  code: string
  /* 显示排序（数值越小越靠前） */
  sortOrder?: number | null
  /* 字典项图标URL */
  cover?: string | null
  /* 字典项状态：true=启用，false=禁用 */
  isEnabled: boolean
  /* 字典项描述信息 */
  description?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateDictionaryItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type UpdateDictionaryItemDto = {
  /* 所属字典编码 */
  dictionaryCode: string
  /* 字典项名称 */
  name: string
  /* 字典项编码 */
  code: string
  /* 显示排序（数值越小越靠前） */
  sortOrder?: number | null
  /* 字典项图标URL */
  cover?: string | null
  /* 字典项状态：true=启用，false=禁用 */
  isEnabled: boolean
  /* 字典项描述信息 */
  description?: string | null
  /* 主键id */
  id: number

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