/**
 *  类型定义 [AuthorRoleTypeListRequest]
 *  @来源 作者角色类型管理模块
 *  @更新时间 2025-12-14 18:11:09
 */
export type AuthorRoleTypeListRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 角色代码 */
  code?: string;

  /* 角色是否启用 */
  isEnabled?: boolean;

  /* 角色名称 */
  name?: string;
};

export type AuthorRoleTypeListResponse = BaseAuthorRoleTypeDto[];

/**
 *  类型定义 [AuthorRoleTypeCreateRequest]
 *  @来源 作者角色类型管理模块
 *  @更新时间 2025-12-14 18:11:09
 */
export type AuthorRoleTypeCreateRequest = RoleTypeCreateRequestDto;

export type AuthorRoleTypeCreateResponse = IdDto;

/**
 *  类型定义 [AuthorRoleTypeDeleteRequest]
 *  @来源 作者角色类型管理模块
 *  @更新时间 2025-12-14 18:11:09
 */
export type AuthorRoleTypeDeleteRequest = IdDto;

export type AuthorRoleTypeDeleteResponse = IdDto;

/**
 *  类型定义 [AuthorRoleTypeUpdateRequest]
 *  @来源 作者角色类型管理模块
 *  @更新时间 2025-12-14 18:11:09
 */
export type AuthorRoleTypeUpdateRequest = RoleTypeUpdateRequestDto;

export type AuthorRoleTypeUpdateResponse = IdDto;

/**
 *  类型定义 [AuthorRoleTypeChangeStatusRequest]
 *  @来源 作者角色类型管理模块
 *  @更新时间 2025-12-14 18:11:09
 */
export type AuthorRoleTypeChangeStatusRequest = UpdateStatusDto;

export type AuthorRoleTypeChangeStatusResponse = IdDto;

/**
 *  类型定义 [BaseAuthorRoleTypeDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-14 18:11:09
 */
export type BaseAuthorRoleTypeDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 角色代码 */
  code: string;
  /* 创建时间 */
  createdAt: string;
  /* 角色描述 */
  description?: string;
  /* 主键id */
  id: number;
  /* 角色是否启用 */
  isEnabled: boolean;
  /* 角色名称 */
  name: string;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [RoleTypeCreateRequestDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-14 18:11:09
 */
export type RoleTypeCreateRequestDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 角色代码 */
  code: string;
  /* 角色描述 */
  description?: string;
  /* 角色是否启用 */
  isEnabled: boolean;

  /* 角色名称 */
  name: string;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-14 18:11:09
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [RoleTypeUpdateRequestDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-14 18:11:09
 */
export type RoleTypeUpdateRequestDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 角色代码 */
  code: string;
  /* 角色描述 */
  description?: string;
  /* 主键id */
  id: number;
  /* 角色是否启用 */
  isEnabled: boolean;

  /* 角色名称 */
  name: string;
};

/**
 *  类型定义 [UpdateStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-14 18:11:09
 */
export type UpdateStatusDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 状态 true启用 false禁用 */
  isEnabled: boolean;
};
