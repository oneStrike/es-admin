/**
 *  类型定义 [ModeratorsListRequest]
 *  @来源 论坛模块/版主管理
 *  @更新时间 2026-01-14 23:00:50
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
};

export type ModeratorsListResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: ModeratorDto[];

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
 *  @更新时间 2026-01-14 23:00:50
 */
export type ModeratorsAddRequest = CreateModeratorDto;

export type ModeratorsAddResponse = ModeratorDto;

/**
 *  类型定义 [ModeratorsUpdateRequest]
 *  @来源 论坛模块/版主管理
 *  @更新时间 2026-01-14 23:00:50
 */
export type ModeratorsUpdateRequest = UpdateModeratorDto;

export type ModeratorsUpdateResponse = ModeratorDto;

/**
 *  类型定义 [ModeratorsRemoveRequest]
 *  @来源 论坛模块/版主管理
 *  @更新时间 2026-01-14 23:00:50
 */
export type ModeratorsRemoveRequest = IdDto;

export type ModeratorsRemoveResponse = ModeratorDto;

/**
 *  类型定义 [ModeratorsSectionAssignRequest]
 *  @来源 论坛模块/版主管理
 *  @更新时间 2026-01-14 23:00:50
 */
export type ModeratorsSectionAssignRequest = AssignModeratorSectionDto;

export type ModeratorsSectionAssignResponse = ModeratorDto;

/**
 *  类型定义 [ModeratorsActionLogPageRequest]
 *  @来源 论坛模块/版主管理
 *  @更新时间 2026-01-14 23:00:50
 */
export type ModeratorsActionLogPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 操作类型（1=置顶主题, 2=取消置顶, 3=加精主题, 4=取消加精, 5=锁定主题, 6=解锁主题, 7=删除主题, 8=移动主题, 9=审核主题, 10=删除回复） */
  actionType?: null | number;

  /* 结束时间 */
  endDate?: null | string;

  /* 版主ID */
  moderatorId?: number;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码 */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 目标类型（1=主题, 2=回复） */
  targetType?: null | number;
};

export type ModeratorsActionLogPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: ModeratorDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [ModeratorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-14 23:00:50
 */
export type ModeratorDto = {
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
  /* 用户id */
  profileId: number;
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
 *  类型定义 [CreateModeratorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-14 23:00:50
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
 *  类型定义 [UpdateModeratorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-14 23:00:50
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

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-14 23:00:50
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [AssignModeratorSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-01-14 23:00:50
 */
export type AssignModeratorSectionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 版主ID */
  moderatorId: number;
  /* 权限列表 */
  permissions: number[];

  /* 板块ID列表 */
  sectionIds: number[];
};
