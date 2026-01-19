/**
 *  类型定义 [SectionGroupsPageRequest]
 *  @来源 论坛模块/板块组管理
 *  @更新时间 2026-01-17 23:29:28
 */
export type SectionGroupsPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 分组名称 */
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

export type SectionGroupsPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseForumSectionGroupDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [SectionGroupsDetailRequest]
 *  @来源 论坛模块/板块组管理
 *  @更新时间 2026-01-17 23:29:28
 */
export type SectionGroupsDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type SectionGroupsDetailResponse = BaseForumSectionGroupDto;

/**
 *  类型定义 [SectionGroupsCreateRequest]
 *  @来源 论坛模块/板块组管理
 *  @更新时间 2026-01-17 23:29:28
 */
export type SectionGroupsCreateRequest = CreateForumSectionGroupDto;

export type SectionGroupsCreateResponse = BaseForumSectionGroupDto;

/**
 *  类型定义 [SectionGroupsUpdateRequest]
 *  @来源 论坛模块/板块组管理
 *  @更新时间 2026-01-17 23:29:28
 */
export type SectionGroupsUpdateRequest = UpdateForumSectionGroupDto;

export type SectionGroupsUpdateResponse = BaseForumSectionGroupDto;

/**
 *  类型定义 [SectionGroupsDeleteRequest]
 *  @来源 论坛模块/板块组管理
 *  @更新时间 2026-01-17 23:29:28
 */
export type SectionGroupsDeleteRequest = IdDto;

export type SectionGroupsDeleteResponse = BaseForumSectionGroupDto;

/**
 *  类型定义 [SectionGroupsUpdateEnabledRequest]
 *  @来源 论坛模块/板块组管理
 *  @更新时间 2026-01-17 23:29:28
 */
export type SectionGroupsUpdateEnabledRequest = UpdateEnabledStatusDto;

export type SectionGroupsUpdateEnabledResponse = BaseForumSectionGroupDto;

/**
 *  类型定义 [SectionGroupsSwapSortOrderRequest]
 *  @来源 论坛模块/板块组管理
 *  @更新时间 2026-01-17 23:29:28
 */
export type SectionGroupsSwapSortOrderRequest = DragReorderDto;

export type SectionGroupsSwapSortOrderResponse = BaseForumSectionGroupDto;

/**
 *  类型定义 [BaseForumSectionGroupDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-17 23:29:28
 */
export type BaseForumSectionGroupDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 创建时间 */
  createdAt: string;
  /* 分组描述 */
  description?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 分组名称 */
  name: string;
  /* 排序权重 */
  sortOrder: number;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CreateForumSectionGroupDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-17 23:29:28
 */
export type CreateForumSectionGroupDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 分组描述 */
  description?: null | string;
  /* 是否启用 */
  isEnabled: boolean;
  /* 分组名称 */
  name: string;

  /* 排序权重 */
  sortOrder: number;
};

/**
 *  类型定义 [UpdateForumSectionGroupDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-17 23:29:28
 */
export type UpdateForumSectionGroupDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 分组描述 */
  description?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean;
  /* 分组名称 */
  name?: string;

  /* 排序权重 */
  sortOrder?: number;
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
