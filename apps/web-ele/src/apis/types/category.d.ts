/**
 *  类型定义 [CategoryCreateRequest]
 *  @来源 分类管理模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type CategoryCreateRequest = CreateCategoryDto

export type CategoryCreateResponse = IdDto

/**
 *  类型定义 [CategoryPageRequest]
 *  @来源 分类管理模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type CategoryPageRequest = {
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

  /* 分类名称 */
  name?: string

  /* 是否启用 */
  isEnabled?: boolean

  /* 作品媒介代码数组 JSON 字符串 */
  contentType?: string

  /** 任意合法数值 */
  [property: string]: any
}

export type CategoryPageResponse = {
  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: BaseCategoryDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [CategoryDetailRequest]
 *  @来源 分类管理模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type CategoryDetailRequest = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

export type CategoryDetailResponse = BaseCategoryDto

/**
 *  类型定义 [CategoryUpdateRequest]
 *  @来源 分类管理模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type CategoryUpdateRequest = UpdateCategoryDto

export type CategoryUpdateResponse = IdDto

/**
 *  类型定义 [CategoryBatchUpdateStatusRequest]
 *  @来源 分类管理模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type CategoryBatchUpdateStatusRequest = BatchEnabledDto

export type CategoryBatchUpdateStatusResponse = BatchOperationResponseDto

/**
 *  类型定义 [CategoryBatchDeleteRequest]
 *  @来源 分类管理模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type CategoryBatchDeleteRequest = IdsDto

export type CategoryBatchDeleteResponse = BatchOperationResponseDto

/**
 *  类型定义 [CategoryOrderRequest]
 *  @来源 分类管理模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type CategoryOrderRequest = DragReorderDto

export type CategoryOrderResponse = DragReorderDto

/**
 *  类型定义 [CreateCategoryDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type CreateCategoryDto = {
  /* 分类名称 */
  name: string
  /* 分类图标URL */
  icon?: string
  /* 辅助人气值 */
  popularityWeight?: number
  /* 排序值 */
  order?: number
  /* 是否启用 */
  isEnabled?: boolean
  /* 作品媒介代码数组（必填） */
  contentType: string[]

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
 *  类型定义 [BaseCategoryDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type BaseCategoryDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 分类名称 */
  name: string
  /* 分类图标URL */
  icon?: string
  /* 人气值 */
  popularity?: number
  /* 辅助人气值 */
  popularityWeight?: number
  /* 排序值 */
  order?: number
  /* 是否启用 */
  isEnabled?: boolean
  /* 分类包含的内容类型项数组 */
  categoryContentTypes: CategoryContentTypeItemDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [CategoryContentTypeItemDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type CategoryContentTypeItemDto = {
  /* 分类ID */
  categoryId: number
  /* 内容类型ID */
  contentTypeId: number
  /* 内容类型对象 */
  contentType: BaseContentTypeDto

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [BaseContentTypeDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type BaseContentTypeDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 类型编码（唯一，如：COMIC/NOVEL/ILLUSTRATION/ALBUM） */
  code: string
  /* 显示名称 */
  name: string
  /* 是否启用 */
  isEnabled?: boolean
  /* 分类描述 */
  description?: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateCategoryDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type UpdateCategoryDto = {
  /* 分类名称 */
  name: string
  /* 分类图标URL */
  icon?: string
  /* 辅助人气值 */
  popularityWeight?: number
  /* 排序值 */
  order?: number
  /* 是否启用 */
  isEnabled?: boolean
  /* 作品媒介代码数组（必填） */
  contentType: string[]
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [BatchEnabledDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type BatchEnabledDto = {
  /* 主键id集合 */
  ids: number[]
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
 *  类型定义 [IdsDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type IdsDto = {
  /* 主键id集合 */
  ids: number[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [DragReorderDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type DragReorderDto = {
  /* 拖拽的目标位置id */
  targetId: number
  /* 当前拖拽元素的id */
  dragId: number

  /** 任意合法数值 */
  [property: string]: any
}