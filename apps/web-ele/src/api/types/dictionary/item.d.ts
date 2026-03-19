/**
 *  类型定义 [ItemPageRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type ItemPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 字典编码 */
  code?: string

  /* 所属字典编码 */
  dictionaryCode: string

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
}

export type ItemPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseDictionaryItemDto[]

  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ItemListRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type ItemListRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 所属字典编码 */
  dictionaryCode: string
}

export type ItemListResponse = BaseDictionaryItemDto

/**
 *  类型定义 [ItemCreateRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type ItemCreateRequest = CreateDictionaryItemDto

export type ItemCreateResponse = boolean

/**
 *  类型定义 [ItemUpdateRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type ItemUpdateRequest = UpdateDictionaryItemDto

export type ItemUpdateResponse = boolean

/**
 *  类型定义 [ItemUpdateStatusRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type ItemUpdateStatusRequest = UpdateEnabledStatusDto

export type ItemUpdateStatusResponse = BatchOperationResponseDto

/**
 *  类型定义 [ItemDeleteRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type ItemDeleteRequest = IdDto

export type ItemDeleteResponse = boolean

/**
 *  类型定义 [ItemSwapSortOrderRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type ItemSwapSortOrderRequest = DragReorderDto

export type ItemSwapSortOrderResponse = boolean

/**
 *  类型定义 [BaseDictionaryItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type BaseDictionaryItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 字典项编码 */
  code: string
  /* 字典项图标URL */
  cover?: null | string
  /* 创建时间 */
  createdAt: string
  /* 软删除时间 */
  deletedAt?: null | string
  /* 字典项描述信息 */
  description?: null | string
  /* 所属字典编码 */
  dictionaryCode: string
  /* 主键id */
  id: number
  /* 字典项状态：true=启用，false=禁用 */
  isEnabled: boolean
  /* 字典项名称 */
  name: string
  /* 显示排序（数值越小越靠前） */
  sortOrder?: null | number

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [CreateDictionaryItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type CreateDictionaryItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 字典项编码 */
  code: string
  /* 字典项图标URL */
  cover?: null | string
  /* 软删除时间 */
  deletedAt?: null | string
  /* 字典项描述信息 */
  description?: null | string
  /* 所属字典编码 */
  dictionaryCode: string
  /* 字典项状态：true=启用，false=禁用 */
  isEnabled: boolean
  /* 字典项名称 */
  name: string

  /* 显示排序（数值越小越靠前） */
  sortOrder?: null | number
}

/**
 *  类型定义 [UpdateDictionaryItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type UpdateDictionaryItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 字典项编码 */
  code: string
  /* 字典项图标URL */
  cover?: null | string
  /* 软删除时间 */
  deletedAt?: null | string
  /* 字典项描述信息 */
  description?: null | string
  /* 所属字典编码 */
  dictionaryCode: string
  /* 主键id */
  id: number
  /* 字典项状态：true=启用，false=禁用 */
  isEnabled: boolean
  /* 字典项名称 */
  name: string

  /* 显示排序（数值越小越靠前） */
  sortOrder?: null | number
}

/**
 *  类型定义 [UpdateEnabledStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type UpdateEnabledStatusDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 状态 true启用 false禁用 */
  isEnabled: boolean
}

/**
 *  类型定义 [BatchOperationResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type BatchOperationResponseDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 操作成功的数据量 */
  count: number
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
 *  类型定义 [DragReorderDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type DragReorderDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 当前拖拽元素的id */
  dragId: number

  /* 拖拽的目标位置id */
  targetId: number
}