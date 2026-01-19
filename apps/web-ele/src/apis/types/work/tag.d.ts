/**
 *  类型定义 [TagCreateRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2026-01-17 23:29:28
 */
export type TagCreateRequest = CreateTagDto;

export type TagCreateResponse = IdDto;

/**
 *  类型定义 [TagPageRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2026-01-17 23:29:28
 */
export type TagPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean | null;

  /* 标签名称 */
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
 *  @更新时间 2026-01-17 23:29:28
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
 *  @更新时间 2026-01-17 23:29:28
 */
export type TagUpdateRequest = UpdateTagDto;

export type TagUpdateResponse = IdDto;

/**
 *  类型定义 [TagUpdateStatusRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2026-01-17 23:29:28
 */
export type TagUpdateStatusRequest = UpdateEnabledStatusDto;

export type TagUpdateStatusResponse = IdDto;

/**
 *  类型定义 [TagDeleteRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2026-01-17 23:29:28
 */
export type TagDeleteRequest = IdDto;

export type TagDeleteResponse = IdDto;

/**
 *  类型定义 [TagOrderRequest]
 *  @来源 内容管理/标签管理
 *  @更新时间 2026-01-17 23:29:28
 */
export type TagOrderRequest = DragReorderDto;

export type TagOrderResponse = DragReorderDto;

/**
 *  类型定义 [CreateTagDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-17 23:29:28
 */
export type CreateTagDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 标签描述 */
  description?: null | string;
  /* 标签图标URL */
  icon?: null | string;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 标签名称 */
  name: string;
  /* 排序值 */
  order?: null | number;

  /* 辅助人气值 */
  popularityWeight?: null | number;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-17 23:29:28
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
 *  @更新时间 2026-01-17 23:29:28
 */
export type BaseTagDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 创建时间 */
  createdAt: string;
  /* 标签描述 */
  description?: null | string;
  /* 标签图标URL */
  icon?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 标签名称 */
  name: string;
  /* 排序值 */
  order?: null | number;
  /* 人气值 */
  popularity?: null | number;
  /* 辅助人气值 */
  popularityWeight?: null | number;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [UpdateTagDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-17 23:29:28
 */
export type UpdateTagDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 标签描述 */
  description?: null | string;
  /* 标签图标URL */
  icon?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 标签名称 */
  name: string;
  /* 排序值 */
  order?: null | number;

  /* 辅助人气值 */
  popularityWeight?: null | number;
};

/**
 *  类型定义 [UpdateEnabledStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-17 23:29:28
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
 *  @更新时间 2026-01-17 23:29:28
 */
export type DragReorderDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 当前拖拽元素的id */
  dragId: number;

  /* 拖拽的目标位置id */
  targetId: number;
};
