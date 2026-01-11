/**
 *  类型定义 [SectionsListRequest]
 *  @来源 论坛模块/板块管理
 *  @更新时间 2026-01-11 21:58:01
 */
export type SectionsListRequest = {
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

export type SectionsListResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: CreateForumSectionDto[];

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
 *  @更新时间 2026-01-11 21:58:01
 */
export type SectionsDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type SectionsDetailResponse = CreateForumSectionDto;

export type SectionsTreeResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 响应状态码 */
  code?: number;

  /* 响应消息 */
  message?: string;
};

/**
 *  类型定义 [SectionsAddRequest]
 *  @来源 论坛模块/板块管理
 *  @更新时间 2026-01-11 21:58:01
 */
export type SectionsAddRequest = CreateForumSectionDto;

export type SectionsAddResponse = CreateForumSectionDto;

/**
 *  类型定义 [SectionsUpdateRequest]
 *  @来源 论坛模块/板块管理
 *  @更新时间 2026-01-11 21:58:01
 */
export type SectionsUpdateRequest = UpdateForumSectionDto;

export type SectionsUpdateResponse = UpdateForumSectionDto;

/**
 *  类型定义 [SectionsRemoveRequest]
 *  @来源 论坛模块/板块管理
 *  @更新时间 2026-01-11 21:58:01
 */
export type SectionsRemoveRequest = IdDto;

export type SectionsRemoveResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 响应状态码 */
  code?: number;

  /* 响应消息 */
  message?: string;
};

export type SectionsUpdateEnabledResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 响应状态码 */
  code?: number;

  /* 响应消息 */
  message?: string;
};

/**
 *  类型定义 [CreateForumSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-11 21:58:01
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
 *  类型定义 [UpdateForumSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-11 21:58:01
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
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-11 21:58:01
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};
