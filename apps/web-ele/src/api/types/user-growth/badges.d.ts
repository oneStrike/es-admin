/**
 *  类型定义 [BadgesPageRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-01 13:50:05
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
 *  @更新时间 2026-03-01 13:50:05
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
 *  @更新时间 2026-03-01 13:50:05
 */
export type BadgesCreateRequest = CreateUserBadgeDto;

export type BadgesCreateResponse = BaseUserBadgeDto;

/**
 *  类型定义 [BadgesUpdateRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type BadgesUpdateRequest = UpdateUserBadgeDto;

export type BadgesUpdateResponse = BaseUserBadgeDto;

/**
 *  类型定义 [BadgesDeleteRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type BadgesDeleteRequest = IdDto;

export type BadgesDeleteResponse = BaseUserBadgeDto;

/**
 *  类型定义 [BadgesUpdateStatusRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type BadgesUpdateStatusRequest = UpdateUserBadgeDto;

export type BadgesUpdateStatusResponse = BaseUserBadgeDto;

/**
 *  类型定义 [BadgesAssignRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type BadgesAssignRequest = AssignUserBadgeDto;

export type BadgesAssignResponse = BaseUserBadgeDto;

/**
 *  类型定义 [BadgesRevokeRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type BadgesRevokeRequest = AssignUserBadgeDto;

export type BadgesRevokeResponse = BaseUserBadgeDto;

/**
 *  类型定义 [BadgesUsersRequest]
 *  @来源 用户成长/徽章管理
 *  @更新时间 2026-03-01 13:50:05
 */
export type BadgesUsersRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  badgeId: number;

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

export type BadgesUsersResponse = {
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

export type BadgesStatisticsResponse = BaseUserBadgeDto;

/**
 *  类型定义 [BaseUserBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
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
 *  类型定义 [CreateUserBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
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
 *  @更新时间 2026-03-01 13:50:05
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
 *  @更新时间 2026-03-01 13:50:05
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [AssignUserBadgeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-01 13:50:05
 */
export type AssignUserBadgeDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 徽章id */
  badgeId: number;

  /* 用户id */
  userId: number;
};
