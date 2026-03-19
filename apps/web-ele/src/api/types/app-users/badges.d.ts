/**
 *  类型定义 [BadgesPageRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type BadgesPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 业务域标识 */
  business?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* 事件键 */
  eventKey?: null | string;

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

  /* 应用端用户ID */
  userId: number;
};

export type BadgesPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: AdminAppUserBadgeItemDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [BadgesAssignRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type BadgesAssignRequest = AssignAdminAppUserBadgeDto;

export type BadgesAssignResponse = boolean;

/**
 *  类型定义 [BadgesRevokeRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type BadgesRevokeRequest = AssignAdminAppUserBadgeDto;

export type BadgesRevokeResponse = boolean;

/**
 *  类型定义 [BadgesPageRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type BadgesPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 业务域标识 */
  business?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* 事件键 */
  eventKey?: null | string;

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
  list?: BaseUserBadgeDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [BadgesDetailRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type BadgesDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type BadgesDetailResponse = BaseUserBadgeDto;

/**
 *  类型定义 [BadgesCreateRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type BadgesCreateRequest = CreateUserBadgeDto;

export type BadgesCreateResponse = boolean;

/**
 *  类型定义 [BadgesUpdateRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type BadgesUpdateRequest = UpdateUserBadgeDto;

export type BadgesUpdateResponse = boolean;

/**
 *  类型定义 [BadgesDeleteRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type BadgesDeleteRequest = IdDto;

export type BadgesDeleteResponse = boolean;

/**
 *  类型定义 [BadgesUpdateStatusRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type BadgesUpdateStatusRequest = UpdateUserBadgeStatusDto;

export type BadgesUpdateStatusResponse = boolean;

/**
 *  类型定义 [BadgesAssignRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type BadgesAssignRequest = AssignUserBadgeDto;

export type BadgesAssignResponse = boolean;

/**
 *  类型定义 [BadgesRevokeRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type BadgesRevokeRequest = AssignUserBadgeDto;

export type BadgesRevokeResponse = boolean;

export type BadgesStatsResponse = UserBadgeStatisticsDto;

/**
 *  类型定义 [AdminAppUserBadgeItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type AdminAppUserBadgeItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 徽章信息 */
  badge: BaseUserBadgeDto;
  /* 创建时间 */
  createdAt: string;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [BaseUserBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type BaseUserBadgeDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 业务域标识 */
  business?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 徽章描述 */
  description: string;
  /* 事件键 */
  eventKey?: null | string;
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
 *  类型定义 [AssignAdminAppUserBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type AssignAdminAppUserBadgeDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 徽章ID */
  badgeId: number;

  /* 应用端用户ID */
  userId: number;
};

/**
 *  类型定义 [CreateUserBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type CreateUserBadgeDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 业务域标识 */
  business?: null | string;
  /* 徽章描述 */
  description: string;
  /* 事件键 */
  eventKey?: null | string;
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
 *  类型定义 [UpdateUserBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UpdateUserBadgeDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 业务域标识 */
  business?: null | string;
  /* 徽章描述 */
  description: string;
  /* 事件键 */
  eventKey?: null | string;
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
 *  @更新时间 2026-03-19 21:17:36
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [UpdateUserBadgeStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UpdateUserBadgeStatusDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 是否启用 */
  isEnabled: boolean;
};

/**
 *  类型定义 [AssignUserBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type AssignUserBadgeDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 徽章id */
  badgeId: number;

  /* 用户id */
  userId: number;
};

/**
 *  类型定义 [UserBadgeStatisticsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UserBadgeStatisticsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 停用数 */
  disabledCount: number;
  /* 启用数 */
  enabledCount: number;
  /* 热门徽章 */
  topBadges: UserBadgeTopBadgeItemDto[];
  /* 总分配次数 */
  totalAssignments: number;
  /* 总徽章数 */
  totalBadges: number;

  /* 类型分布 */
  typeDistribution: UserBadgeTypeDistributionItemDto[];
};

/**
 *  类型定义 [UserBadgeTypeDistributionItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UserBadgeTypeDistributionItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 数量 */
  count: number;

  /* 徽章类型 */
  type: number;
};

/**
 *  类型定义 [UserBadgeTopBadgeItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UserBadgeTopBadgeItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 徽章信息 */
  badge?: BaseUserBadgeDto;

  /* 分配次数 */
  count: number;
};
