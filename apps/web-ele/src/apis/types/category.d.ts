/**
 *  类型定义 [CategoryCreateRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2025-12-29 16:56:58
 */
export type CategoryCreateRequest = CreateCategoryDto;

export type CategoryCreateResponse = IdDto;

/**
 *  类型定义 [CategoryPageRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2025-12-29 16:56:58
 */
export type CategoryPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 分类关联的内容类型 */
  contentType?: any;

  /* 结束时间 */
  endDate?: any;

  /* 是否启用 */
  isEnabled?: any;

  /* 分类名称 */
  name?: string;

  /* 排序字段，json格式 */
  orderBy?: any;

  /* 当前页码 */
  pageIndex?: any;

  /* 单页大小，最大500，默认15 */
  pageSize?: any;

  /* 开始时间 */
  startDate?: any;
};

export type CategoryPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseCategoryDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [CategoryDetailRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2025-12-29 16:56:58
 */
export type CategoryDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type CategoryDetailResponse = BaseCategoryDto;

/**
 *  类型定义 [CategoryUpdateRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2025-12-29 16:56:58
 */
export type CategoryUpdateRequest = UpdateCategoryDto;

export type CategoryUpdateResponse = IdDto;

/**
 *  类型定义 [CategoryUpdateStatusRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2025-12-29 16:56:58
 */
export type CategoryUpdateStatusRequest = UpdateEnabledStatusDto;

export type CategoryUpdateStatusResponse = IdDto;

/**
 *  类型定义 [CategoryDeleteRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2025-12-29 16:56:58
 */
export type CategoryDeleteRequest = IdDto;

export type CategoryDeleteResponse = IdDto;

/**
 *  类型定义 [CategoryOrderRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2025-12-29 16:56:58
 */
export type CategoryOrderRequest = DragReorderDto;

export type CategoryOrderResponse = DragReorderDto;

/**
 *  类型定义 [CreateCategoryDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-29 16:56:58
 */
export type CreateCategoryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 分类关联的内容类型 */
  contentType: number[];
  /* 分类的描述 （可选） */
  description?: any;
  /* 分类图标URL */
  icon?: any;
  /* 是否启用 */
  isEnabled?: any;
  /* 分类名称 */
  name: string;
  /* 排序值 */
  order?: any;

  /* 辅助人气值 */
  popularityWeight?: any;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-29 16:56:58
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [BaseCategoryDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-29 16:56:58
 */
export type BaseCategoryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 分类关联的内容类型 */
  contentType: number[];
  /* 创建时间 */
  createdAt: string;
  /* 分类的描述 （可选） */
  description?: any;
  /* 分类图标URL */
  icon?: any;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: any;
  /* 分类名称 */
  name: string;
  /* 排序值 */
  order?: any;
  /* 人气值 */
  popularity?: any;
  /* 辅助人气值 */
  popularityWeight?: any;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [UpdateCategoryDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-29 16:56:58
 */
export type UpdateCategoryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 分类关联的内容类型 */
  contentType: number[];
  /* 分类的描述 （可选） */
  description?: any;
  /* 分类图标URL */
  icon?: any;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: any;
  /* 分类名称 */
  name: string;
  /* 排序值 */
  order?: any;

  /* 辅助人气值 */
  popularityWeight?: any;
};

/**
 *  类型定义 [UpdateEnabledStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-29 16:56:58
 */
export type UpdateEnabledStatusDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 状态 true启用 false禁用 */
  isEnabled: boolean;
};

/**
 *  类型定义 [DragReorderDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-29 16:56:58
 */
export type DragReorderDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 当前拖拽元素的id */
  dragId: number;

  /* 拖拽的目标位置id */
  targetId: number;
};
