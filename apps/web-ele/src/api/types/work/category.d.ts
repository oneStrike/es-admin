/**
 *  类型定义 [CategoryCreateRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type CategoryCreateRequest = CreateCategoryDto;

export type CategoryCreateResponse = IdDto;

/**
 *  类型定义 [CategoryPageRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type CategoryPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 分类关联的内容类型 */
  contentType?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean | null;

  /* 分类名称 */
  name?: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码 */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;
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
 *  @更新时间 2026-03-01 13:50:05
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
 *  @更新时间 2026-03-01 13:50:05
 */
export type CategoryUpdateRequest = UpdateCategoryDto;

export type CategoryUpdateResponse = IdDto;

/**
 *  类型定义 [CategoryUpdateStatusRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type CategoryUpdateStatusRequest = UpdateEnabledStatusDto;

export type CategoryUpdateStatusResponse = IdDto;

/**
 *  类型定义 [CategoryDeleteRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type CategoryDeleteRequest = IdDto;

export type CategoryDeleteResponse = IdDto;

/**
 *  类型定义 [CategoryOrderRequest]
 *  @来源 内容管理/分类管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type CategoryOrderRequest = DragReorderDto;

export type CategoryOrderResponse = DragReorderDto;

/**
 *  类型定义 [CreateCategoryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
 */
export type CreateCategoryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 分类关联的内容类型 */
  contentType: number[];
  /* 分类的描述 （可选） */
  description?: null | string;
  /* 分类图标URL */
  icon?: null | string;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 分类名称 */
  name: string;

  /* 排序值 */
  order?: null | number;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
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
 *  @更新时间 2026-03-01 13:50:05
 */
export type BaseCategoryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 分类关联的内容类型 */
  contentType: number[];
  /* 创建时间 */
  createdAt: string;
  /* 分类的描述 （可选） */
  description?: null | string;
  /* 分类图标URL */
  icon?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 分类名称 */
  name: string;
  /* 排序值 */
  order?: null | number;
  /* 人气值 */
  popularity?: null | number;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [UpdateCategoryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
 */
export type UpdateCategoryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 分类关联的内容类型 */
  contentType: number[];
  /* 分类的描述 （可选） */
  description?: null | string;
  /* 分类图标URL */
  icon?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 分类名称 */
  name: string;

  /* 排序值 */
  order?: null | number;
};

/**
 *  类型定义 [UpdateEnabledStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
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
 *  @更新时间 2026-03-01 13:50:05
 */
export type DragReorderDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 当前拖拽元素的id */
  dragId: number;

  /* 拖拽的目标位置id */
  targetId: number;
};
