/**
 *  类型定义 [DictionaryPageRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-05-03 14:46:16
 */
export type DictionaryPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 字典编码 */
  code?: string;

  /* 结束时间 */
  endDate?: null | string;

  /* 字典状态（true=启用；false=禁用） */
  isEnabled?: boolean;

  /* 字典名称 */
  name?: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;
};

export type DictionaryPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseDictionaryDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [DictionaryDetailRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-05-03 14:46:16
 */
export type DictionaryDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type DictionaryDetailResponse = BaseDictionaryDto;

/**
 *  类型定义 [DictionaryCreateRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-05-03 14:46:16
 */
export type DictionaryCreateRequest = CreateDictionaryDto;

export type DictionaryCreateResponse = boolean;

/**
 *  类型定义 [DictionaryUpdateRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-05-03 14:46:16
 */
export type DictionaryUpdateRequest = UpdateDictionaryDto;

export type DictionaryUpdateResponse = boolean;

/**
 *  类型定义 [DictionaryDeleteRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-05-03 14:46:16
 */
export type DictionaryDeleteRequest = IdDto;

export type DictionaryDeleteResponse = boolean;

/**
 *  类型定义 [DictionaryUpdateStatusRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-05-03 14:46:16
 */
export type DictionaryUpdateStatusRequest = UpdateEnabledStatusDto;

export type DictionaryUpdateStatusResponse = boolean;

/**
 *  类型定义 [DictionaryItemPageRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-05-03 14:46:16
 */
export type DictionaryItemPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 字典编码 */
  code?: string;

  /* 所属字典编码 */
  dictionaryCode: string;

  /* 字典状态（true=启用；false=禁用） */
  isEnabled?: boolean;

  /* 字典名称 */
  name?: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;
};

export type DictionaryItemPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseDictionaryItemDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [DictionaryItemListRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-05-03 14:46:16
 */
export type DictionaryItemListRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 所属字典编码 */
  dictionaryCode: string;
};

export type DictionaryItemListResponse = BaseDictionaryItemDto;

/**
 *  类型定义 [DictionaryItemCreateRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-05-03 14:46:16
 */
export type DictionaryItemCreateRequest = CreateDictionaryItemDto;

export type DictionaryItemCreateResponse = boolean;

/**
 *  类型定义 [DictionaryItemUpdateRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-05-03 14:46:16
 */
export type DictionaryItemUpdateRequest = UpdateDictionaryItemDto;

export type DictionaryItemUpdateResponse = boolean;

/**
 *  类型定义 [DictionaryItemUpdateStatusRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-05-03 14:46:16
 */
export type DictionaryItemUpdateStatusRequest = UpdateEnabledStatusDto;

export type DictionaryItemUpdateStatusResponse = boolean;

/**
 *  类型定义 [DictionaryItemDeleteRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-05-03 14:46:16
 */
export type DictionaryItemDeleteRequest = IdDto;

export type DictionaryItemDeleteResponse = boolean;

/**
 *  类型定义 [DictionaryItemSwapSortOrderRequest]
 *  @来源 系统管理/字典管理
 *  @更新时间 2026-05-03 14:46:16
 */
export type DictionaryItemSwapSortOrderRequest = DragReorderDto;

export type DictionaryItemSwapSortOrderResponse = boolean;

/**
 *  类型定义 [BaseDictionaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-03 14:46:16
 */
export type BaseDictionaryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 字典编码 */
  code: string;
  /* 字典封面图片 URL */
  cover?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 字典描述信息 */
  description?: null | string;
  /* 主键id */
  id: number;
  /* 字典状态（true=启用；false=禁用） */
  isEnabled: boolean;
  /* 字典名称 */
  name: string;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CreateDictionaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-03 14:46:16
 */
export type CreateDictionaryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 字典编码 */
  code: string;
  /* 字典封面图片 URL */
  cover?: null | string;
  /* 字典描述信息 */
  description?: null | string;
  /* 字典状态（true=启用；false=禁用） */
  isEnabled: boolean;

  /* 字典名称 */
  name: string;
};

/**
 *  类型定义 [UpdateDictionaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-03 14:46:16
 */
export type UpdateDictionaryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 字典编码 */
  code?: string;
  /* 字典封面图片 URL */
  cover?: null | string;
  /* 字典描述信息 */
  description?: null | string;
  /* 主键id */
  id: number;
  /* 字典状态（true=启用；false=禁用） */
  isEnabled?: boolean;

  /* 字典名称 */
  name?: string;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-03 14:46:16
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [UpdateEnabledStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-03 14:46:16
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
 *  类型定义 [BaseDictionaryItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-03 14:46:16
 */
export type BaseDictionaryItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 字典项编码 */
  code: string;
  /* 字典项图标 URL */
  cover?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 字典项描述信息 */
  description?: null | string;
  /* 所属字典编码 */
  dictionaryCode: string;
  /* 主键id */
  id: number;
  /* 字典项状态（true=启用；false=禁用） */
  isEnabled: boolean;
  /* 字典项名称 */
  name: string;
  /* 显示排序（数值越小越靠前） */
  sortOrder?: null | number;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CreateDictionaryItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-03 14:46:16
 */
export type CreateDictionaryItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 字典项编码 */
  code: string;
  /* 字典项图标 URL */
  cover?: null | string;
  /* 字典项描述信息 */
  description?: null | string;
  /* 所属字典编码 */
  dictionaryCode: string;
  /* 字典项状态（true=启用；false=禁用） */
  isEnabled: boolean;
  /* 字典项名称 */
  name: string;

  /* 显示排序（数值越小越靠前） */
  sortOrder?: null | number;
};

/**
 *  类型定义 [UpdateDictionaryItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-03 14:46:16
 */
export type UpdateDictionaryItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 字典项编码 */
  code?: string;
  /* 字典项图标 URL */
  cover?: null | string;
  /* 字典项描述信息 */
  description?: null | string;
  /* 所属字典编码 */
  dictionaryCode?: string;
  /* 主键id */
  id: number;
  /* 字典项状态（true=启用；false=禁用） */
  isEnabled?: boolean;
  /* 字典项名称 */
  name?: string;

  /* 显示排序（数值越小越靠前） */
  sortOrder?: null | number;
};

/**
 *  类型定义 [DragReorderDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-03 14:46:16
 */
export type DragReorderDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 当前拖拽元素的id */
  dragId: number;

  /* 拖拽的目标位置id */
  targetId: number;
};
