/**
 *  类型定义 [TagCreateRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2025-12-29 16:56:58
 */
export type TagCreateRequest = CreateTagDto;

export type TagCreateResponse = IdDto;

/**
 *  类型定义 [TagPageRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2025-12-29 16:56:58
 */
export type TagPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: any;

  /* 是否启用 */
  isEnabled?: any;

  /* 标签名称 */
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

export type TagPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseTagDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [TagDetailRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2025-12-29 16:56:58
 */
export type TagDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type TagDetailResponse = BaseTagDto;

/**
 *  类型定义 [TagUpdateRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2025-12-29 16:56:58
 */
export type TagUpdateRequest = UpdateTagDto;

export type TagUpdateResponse = IdDto;

/**
 *  类型定义 [TagUpdateStatusRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2025-12-29 16:56:58
 */
export type TagUpdateStatusRequest = UpdateEnabledStatusDto;

export type TagUpdateStatusResponse = IdDto;

/**
 *  类型定义 [TagDeleteRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2025-12-29 16:56:58
 */
export type TagDeleteRequest = IdDto;

export type TagDeleteResponse = IdDto;

/**
 *  类型定义 [TagOrderRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2025-12-29 16:56:58
 */
export type TagOrderRequest = DragReorderDto;

export type TagOrderResponse = DragReorderDto;

/**
 *  类型定义 [CreateTagDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-29 16:56:58
 */
export type CreateTagDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 标签描述 */
  description?: any;
  /* 标签图标URL */
  icon?: any;
  /* 是否启用 */
  isEnabled?: any;
  /* 标签名称 */
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
 *  类型定义 [BaseTagDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-29 16:56:58
 */
export type BaseTagDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 创建时间 */
  createdAt: string;
  /* 标签描述 */
  description?: any;
  /* 标签图标URL */
  icon?: any;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: any;
  /* 标签名称 */
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
 *  类型定义 [UpdateTagDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-29 16:56:58
 */
export type UpdateTagDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 标签描述 */
  description?: any;
  /* 标签图标URL */
  icon?: any;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: any;
  /* 标签名称 */
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
