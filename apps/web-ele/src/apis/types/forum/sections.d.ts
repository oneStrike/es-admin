/**
 *  类型定义 [SectionsPageRequest]
 *  @来源 论坛模块/板块管理
 *  @更新时间 2026-01-13 00:08:17
 */
export type SectionsPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 板块分组ID（为空表示未分组） */
  groupId?: null | number;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 板块名称 */
  name?: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码 */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 审核策略 */
  topicReviewPolicy?: number;
};

export type SectionsPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseForumSectionDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [SectionsDetailRequest]
 *  @来源 论坛模块/板块管理
 *  @更新时间 2026-01-13 00:08:17
 */
export type SectionsDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type SectionsDetailResponse = BaseForumSectionDto;

export type SectionsTreeResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 响应状态码 */
  code?: number;

  /* 响应消息 */
  message?: string;
};

/**
 *  类型定义 [SectionsUpdateRequest]
 *  @来源 论坛模块/板块管理
 *  @更新时间 2026-01-13 00:08:17
 */
export type SectionsUpdateRequest = UpdateForumSectionDto;

export type SectionsUpdateResponse = BaseForumSectionDto;

/**
 *  类型定义 [SectionsUpdateEnabledRequest]
 *  @来源 论坛模块/板块管理
 *  @更新时间 2026-01-13 00:08:17
 */
export type SectionsUpdateEnabledRequest = UpdateEnabledStatusDto;

export type SectionsUpdateEnabledResponse = BaseForumSectionDto;

/**
 *  类型定义 [SectionsCreateRequest]
 *  @来源 论坛模块/板块管理
 *  @更新时间 2026-01-13 00:08:17
 */
export type SectionsCreateRequest = CreateForumSectionDto;

export type SectionsCreateResponse = BaseForumSectionDto;

/**
 *  类型定义 [SectionsDeleteRequest]
 *  @来源 论坛模块/板块管理
 *  @更新时间 2026-01-13 00:08:17
 */
export type SectionsDeleteRequest = IdDto;

export type SectionsDeleteResponse = BaseForumSectionDto;

/**
 *  类型定义 [SectionsSwapSortOrderRequest]
 *  @来源 论坛模块/板块管理
 *  @更新时间 2026-01-13 00:08:17
 */
export type SectionsSwapSortOrderRequest = DragReorderDto;

export type SectionsSwapSortOrderResponse = BaseForumSectionDto;

/**
 *  类型定义 [BaseForumSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-13 00:08:17
 */
export type BaseForumSectionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 创建时间 */
  createdAt: string;
  /* 板块描述 */
  description: string;
  /* 板块分组ID（为空表示未分组） */
  groupId?: null | number;
  /* 板块图标 */
  icon?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 板块名称 */
  name: string;
  /* 排序权重 */
  sortOrder: number;
  /* 审核策略 */
  topicReviewPolicy: 0 | 1 | 2;
  /* 更新时间 */
  updatedAt: string;

  /* 用户等级规则ID（为空表示所有用户） */
  userLevelRuleId: number;
};

/**
 *  类型定义 [UpdateForumSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-13 00:08:17
 */
export type UpdateForumSectionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 板块描述 */
  description: string;
  /* 板块分组ID（为空表示未分组） */
  groupId?: null | number;
  /* 板块图标 */
  icon?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 板块名称 */
  name: string;
  /* 排序权重 */
  sortOrder: number;
  /* 审核策略 */
  topicReviewPolicy: 0 | 1 | 2;

  /* 用户等级规则ID（为空表示所有用户） */
  userLevelRuleId: number;
};

/**
 *  类型定义 [UpdateEnabledStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-13 00:08:17
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
 *  类型定义 [CreateForumSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-13 00:08:17
 */
export type CreateForumSectionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 板块描述 */
  description: string;
  /* 板块分组ID（为空表示未分组） */
  groupId?: null | number;
  /* 板块图标 */
  icon?: null | string;
  /* 是否启用 */
  isEnabled: boolean;
  /* 板块名称 */
  name: string;
  /* 排序权重 */
  sortOrder: number;
  /* 审核策略 */
  topicReviewPolicy: 0 | 1 | 2;

  /* 用户等级规则ID（为空表示所有用户） */
  userLevelRuleId: number;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-13 00:08:17
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [DragReorderDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-13 00:08:17
 */
export type DragReorderDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 当前拖拽元素的id */
  dragId: number;

  /* 拖拽的目标位置id */
  targetId: number;
};
