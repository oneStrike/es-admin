/**
 *  类型定义 [CategoryCreateRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type CategoryCreateRequest = CreateCategoryDto

export type CategoryCreateResponse = boolean

/**
 *  类型定义 [CategoryPageRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type CategoryPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 分类关联的内容类型 */
  contentType?: null | string

  /* 结束时间 */
  endDate?: null | string

  /* 是否启用 */
  isEnabled?: boolean

  /* 分类名称 */
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

export type CategoryPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseCategoryDto[]

  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [CategoryDetailRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type CategoryDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type CategoryDetailResponse = BaseCategoryDto

/**
 *  类型定义 [CategoryUpdateRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type CategoryUpdateRequest = UpdateCategoryDto

export type CategoryUpdateResponse = boolean

/**
 *  类型定义 [CategoryUpdateStatusRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type CategoryUpdateStatusRequest = UpdateCategoryStatusDto

export type CategoryUpdateStatusResponse = boolean

/**
 *  类型定义 [CategoryDeleteRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type CategoryDeleteRequest = IdDto

export type CategoryDeleteResponse = boolean

/**
 *  类型定义 [CategorySwapSortOrderRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type CategorySwapSortOrderRequest = UpdateCategorySortDto

export type CategorySwapSortOrderResponse = boolean

/**
 *  类型定义 [CreateCategoryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type CreateCategoryDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 分类关联的内容类型 */
  contentType?: any[] | null
  /* 分类的描述 （可选） */
  description?: null | string
  /* 分类图标URL */
  icon?: null | string
  /* 是否启用 */
  isEnabled: boolean
  /* 分类名称 */
  name: string

  /* 排序值 */
  sortOrder: number
}

/**
 *  类型定义 [BaseCategoryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type BaseCategoryDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 分类关联的内容类型 */
  contentType?: any[] | null
  /* 创建时间 */
  createdAt: string
  /* 分类的描述 （可选） */
  description?: null | string
  /* 分类图标URL */
  icon?: null | string
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 分类名称 */
  name: string
  /* 人气值 */
  popularity: number
  /* 排序值 */
  sortOrder: number

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [UpdateCategoryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type UpdateCategoryDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 分类关联的内容类型 */
  contentType?: any[] | null
  /* 分类的描述 （可选） */
  description?: null | string
  /* 分类图标URL */
  icon?: null | string
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 分类名称 */
  name: string

  /* 排序值 */
  sortOrder: number
}

/**
 *  类型定义 [UpdateCategoryStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type UpdateCategoryStatusDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 是否启用 */
  isEnabled: boolean
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
 *  类型定义 [UpdateCategorySortDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type UpdateCategorySortDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 当前拖拽元素的id */
  dragId: number

  /* 拖拽的目标位置id */
  targetId: number
}