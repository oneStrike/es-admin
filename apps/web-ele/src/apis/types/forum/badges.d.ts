/**
 *  类型定义 [BadgesPageRequest]
 *  @来源 论坛模块/徽章管理
 *  @更新时间 2026-01-17 23:29:28
 */
export type BadgesPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 徽章名称 */
  name?: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码 */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 徽章类型（1=系统徽章, 2=成就徽章, 3=活动徽章） */
  type?: number;
};

export type BadgesPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseForumBadgeDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [BadgesDetailRequest]
 *  @来源 论坛模块/徽章管理
 *  @更新时间 2026-01-17 23:29:28
 */
export type BadgesDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type BadgesDetailResponse = BaseForumBadgeDto;

/**
 *  类型定义 [BadgesCreateRequest]
 *  @来源 论坛模块/徽章管理
 *  @更新时间 2026-01-17 23:29:28
 */
export type BadgesCreateRequest = CreateForumBadgeDto;

export type BadgesCreateResponse = BaseForumBadgeDto;

/**
 *  类型定义 [BadgesUpdateRequest]
 *  @来源 论坛模块/徽章管理
 *  @更新时间 2026-01-17 23:29:28
 */
export type BadgesUpdateRequest = UpdateForumBadgeDto;

export type BadgesUpdateResponse = BaseForumBadgeDto;

/**
 *  类型定义 [BadgesDeleteRequest]
 *  @来源 论坛模块/徽章管理
 *  @更新时间 2026-01-17 23:29:28
 */
export type BadgesDeleteRequest = IdDto;

export type BadgesDeleteResponse = BaseForumBadgeDto;

/**
 *  类型定义 [BadgesUpdateStatusRequest]
 *  @来源 论坛模块/徽章管理
 *  @更新时间 2026-01-17 23:29:28
 */
export type BadgesUpdateStatusRequest = UpdateForumBadgeDto;

export type BadgesUpdateStatusResponse = BaseForumBadgeDto;

/**
 *  类型定义 [BadgesAssignRequest]
 *  @来源 论坛模块/徽章管理
 *  @更新时间 2026-01-17 23:29:28
 */
export type BadgesAssignRequest = ProfileBadgeDto;

export type BadgesAssignResponse = BaseForumBadgeDto;

/**
 *  类型定义 [BadgesRevokeRequest]
 *  @来源 论坛模块/徽章管理
 *  @更新时间 2026-01-17 23:29:28
 */
export type BadgesRevokeRequest = ProfileBadgeDto;

export type BadgesRevokeResponse = BaseForumBadgeDto;

/**
 *  类型定义 [BadgesUsersRequest]
 *  @来源 论坛模块/徽章管理
 *  @更新时间 2026-01-17 23:29:28
 */
export type BadgesUsersRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  badgeId: number;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 徽章名称 */
  name?: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码 */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 徽章类型（1=系统徽章, 2=成就徽章, 3=活动徽章） */
  type?: number;
};

export type BadgesUsersResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseForumBadgeDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

export type BadgesStatisticsResponse = BaseForumBadgeDto;

/**
 *  类型定义 [BaseForumBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-17 23:29:28
 */
export type BaseForumBadgeDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 创建时间 */
  createdAt: string;
  /* 徽章描述 */
  description: string;
  /* 徽章图标URL */
  icon: string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 徽章名称 */
  name: string;
  /* 排序值（数值越小越靠前） */
  sortOrder: number;
  /* 徽章类型（1=系统徽章, 2=成就徽章, 3=活动徽章） */
  type: 1 | 2 | 3;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CreateForumBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-17 23:29:28
 */
export type CreateForumBadgeDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 徽章描述 */
  description: string;
  /* 徽章图标URL */
  icon: string;
  /* 是否启用 */
  isEnabled: boolean;
  /* 徽章名称 */
  name: string;
  /* 排序值（数值越小越靠前） */
  sortOrder: number;

  /* 徽章类型（1=系统徽章, 2=成就徽章, 3=活动徽章） */
  type: 1 | 2 | 3;
};

/**
 *  类型定义 [UpdateForumBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-17 23:29:28
 */
export type UpdateForumBadgeDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 徽章描述 */
  description: string;
  /* 徽章图标URL */
  icon: string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 徽章名称 */
  name: string;
  /* 排序值（数值越小越靠前） */
  sortOrder: number;

  /* 徽章类型（1=系统徽章, 2=成就徽章, 3=活动徽章） */
  type: 1 | 2 | 3;
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
 *  类型定义 [ProfileBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-17 23:29:28
 */
export type ProfileBadgeDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 徽章id */
  badgeId: number;

  /* 用户id */
  profileId: number;
};
