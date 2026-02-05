/**
 *  类型定义 [ModeratorsListRequest]
 *  @来源 论坛模块/版主管理
 *  @更新时间 2026-02-05 22:56:49
 */
export type ModeratorsListRequest = {
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

  /* 用户id */
  userId?: number;
};

export type ModeratorsListResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: ForumModeratorDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ModeratorsAddRequest]
 *  @来源 论坛模块/版主管理
 *  @更新时间 2026-02-05 22:56:49
 */
export type ModeratorsAddRequest = CreateForumModeratorDto;

export type ModeratorsAddResponse = ForumModeratorDto;

/**
 *  类型定义 [ModeratorsUpdateRequest]
 *  @来源 论坛模块/版主管理
 *  @更新时间 2026-02-05 22:56:49
 */
export type ModeratorsUpdateRequest = UpdateForumModeratorDto;

export type ModeratorsUpdateResponse = ForumModeratorDto;

/**
 *  类型定义 [ModeratorsRemoveRequest]
 *  @来源 论坛模块/版主管理
 *  @更新时间 2026-02-05 22:56:49
 */
export type ModeratorsRemoveRequest = IdDto;

export type ModeratorsRemoveResponse = ForumModeratorDto;

/**
 *  类型定义 [ModeratorsSectionAssignRequest]
 *  @来源 论坛模块/版主管理
 *  @更新时间 2026-02-05 22:56:49
 */
export type ModeratorsSectionAssignRequest = AssignForumModeratorSectionDto;

export type ModeratorsSectionAssignResponse = ForumModeratorDto;

/**
 *  类型定义 [ForumModeratorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-05 22:56:49
 */
export type ForumModeratorDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 头像 */
  avatar?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 昵称 */
  nickname: string;
  /* 权限名称列表 */
  permissionNames: string[];
  /* 权限列表 */
  permissions: number[];
  /* 备注 */
  remark?: null | string;
  /* 版主角色类型 */
  roleType: 1 | 2 | 3;
  /* 管理的板块列表 */
  sections: Record<string, any>[];
  /* 更新时间 */
  updatedAt: string;

  /* 用户ID */
  userId: number;
};

/**
 *  类型定义 [CreateForumModeratorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-05 22:56:49
 */
export type CreateForumModeratorDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 是否启用 */
  isEnabled: boolean;
  /* 权限列表 */
  permissions: number[];
  /* 备注 */
  remark?: null | string;
  /* 版主角色类型 */
  roleType: 1 | 2 | 3;
  /* 板块ID列表 */
  sectionIds: number[];

  /* 用户id */
  userId: number;
};

/**
 *  类型定义 [UpdateForumModeratorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-05 22:56:49
 */
export type UpdateForumModeratorDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 权限列表 */
  permissions: number[];
  /* 备注 */
  remark?: null | string;
  /* 版主角色类型 */
  roleType: 1 | 2 | 3;
  /* 板块ID列表 */
  sectionIds: number[];

  /* 用户id */
  userId: number;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-05 22:56:49
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [AssignForumModeratorSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-05 22:56:49
 */
export type AssignForumModeratorSectionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 版主ID */
  moderatorId: number;
  /* 权限列表 */
  permissions: number[];

  /* 板块ID列表 */
  sectionIds: number[];
};
