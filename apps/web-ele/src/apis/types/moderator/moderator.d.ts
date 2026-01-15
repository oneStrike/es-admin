/**
 *  类型定义 [ModeratorAddRequest]
 *  @来源 论坛管理/版主管理模块
 *  @更新时间 2026-01-15 16:18:29
 */
export type ModeratorAddRequest = CreateModeratorDto;

export type ModeratorAddResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 响应状态码 */
  code?: number;

  /* 响应消息 */
  message?: string;
};

/**
 *  类型定义 [ModeratorRemoveRequest]
 *  @来源 论坛管理/版主管理模块
 *  @更新时间 2026-01-15 16:18:29
 */
export type ModeratorRemoveRequest = IdDto;

export type ModeratorRemoveResponse = IdDto;

/**
 *  类型定义 [ModeratorListRequest]
 *  @来源 论坛管理/版主管理模块
 *  @更新时间 2026-01-15 16:18:29
 */
export type ModeratorListRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 用户名 */
  nickname?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码 */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 板块ID */
  sectionId?: null | number;

  /* 开始时间 */
  startDate?: null | string;
};

export type ModeratorListResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ModeratorUpdateRequest]
 *  @来源 论坛管理/版主管理模块
 *  @更新时间 2026-01-15 16:18:29
 */
export type ModeratorUpdateRequest = UpdateModeratorDto;

export type ModeratorUpdateResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 响应状态码 */
  code?: number;

  /* 响应消息 */
  message?: string;
};

/**
 *  类型定义 [CreateModeratorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-15 16:18:29
 */
export type CreateModeratorDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 是否启用 */
  isEnabled: boolean;
  /* 权限列表 */
  permissions: number[];
  /* 用户id */
  profileId: number;
  /* 备注 */
  remark?: null | string;
  /* 版主角色类型 */
  roleType: 1 | 2 | 3;

  /* 板块ID列表 */
  sectionIds: number[];
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-15 16:18:29
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [UpdateModeratorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-15 16:18:29
 */
export type UpdateModeratorDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 权限列表 */
  permissions: number[];
  /* 用户id */
  profileId: number;
  /* 备注 */
  remark?: null | string;
  /* 版主角色类型 */
  roleType: 1 | 2 | 3;

  /* 板块ID列表 */
  sectionIds: number[];
};
