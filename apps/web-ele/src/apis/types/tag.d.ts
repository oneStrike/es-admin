/**
 *  类型定义 [TagCreateRequest]
 *  @来源 标签管理模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type TagCreateRequest = CreateTagDto

export type TagCreateResponse = IdDto

/**
 *  类型定义 [TagPageRequest]
 *  @来源 标签管理模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type TagPageRequest = {
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

  /* 标签名称 */
  name?: string

  /* 是否启用 */
  isEnabled?: boolean

  /** 任意合法数值 */
  [property: string]: any
}

export type TagPageResponse = {
  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: BaseTagDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [TagDetailRequest]
 *  @来源 标签管理模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type TagDetailRequest = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

export type TagDetailResponse = BaseTagDto

/**
 *  类型定义 [TagUpdateRequest]
 *  @来源 标签管理模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type TagUpdateRequest = UpdateTagDto

export type TagUpdateResponse = IdDto

/**
 *  类型定义 [TagOrderRequest]
 *  @来源 标签管理模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type TagOrderRequest = DragReorderDto

export type TagOrderResponse = DragReorderDto

/**
 *  类型定义 [TagUpdateStatusRequest]
 *  @来源 标签管理模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type TagUpdateStatusRequest = UpdateStatusDto

export type TagUpdateStatusResponse = IdDto

/**
 *  类型定义 [TagDeleteRequest]
 *  @来源 标签管理模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type TagDeleteRequest = IdDto

export type TagDeleteResponse = IdDto

/**
 *  类型定义 [CreateTagDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type CreateTagDto = {
  /* 标签名称 */
  name: string
  /* 标签图标URL */
  icon?: string
  /* 辅助人气值 */
  popularityWeight?: number
  /* 排序值 */
  order?: number
  /* 是否启用 */
  isEnabled?: boolean
  /* 标签描述 */
  description?: string

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
 *  类型定义 [BaseTagDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type BaseTagDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 标签名称 */
  name: string
  /* 标签图标URL */
  icon?: string
  /* 人气值 */
  popularity?: number
  /* 辅助人气值 */
  popularityWeight?: number
  /* 排序值 */
  order?: number
  /* 是否启用 */
  isEnabled?: boolean
  /* 标签描述 */
  description?: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateTagDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type UpdateTagDto = {
  /* 标签名称 */
  name: string
  /* 标签图标URL */
  icon?: string
  /* 辅助人气值 */
  popularityWeight?: number
  /* 排序值 */
  order?: number
  /* 是否启用 */
  isEnabled?: boolean
  /* 标签描述 */
  description?: string
  /* 主键id */
  id: number

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