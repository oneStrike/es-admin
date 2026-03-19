/**
 *  类型定义 [ModeratorsPageRequest]
 *  @来源 论坛管理/版主管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type ModeratorsPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 是否启用 */
  isEnabled?: boolean

  /* 用户名 */
  nickname?: null | string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码 */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 板块ID */
  sectionId?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 用户id */
  userId?: number
}

export type ModeratorsPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: ForumModeratorDto[]

  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ModeratorsCreateRequest]
 *  @来源 论坛管理/版主管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type ModeratorsCreateRequest = CreateForumModeratorDto

export type ModeratorsCreateResponse = ForumModeratorDto

/**
 *  类型定义 [ModeratorsUpdateRequest]
 *  @来源 论坛管理/版主管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type ModeratorsUpdateRequest = UpdateForumModeratorDto

export type ModeratorsUpdateResponse = ForumModeratorDto

/**
 *  类型定义 [ModeratorsDeleteRequest]
 *  @来源 论坛管理/版主管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type ModeratorsDeleteRequest = IdDto

export type ModeratorsDeleteResponse = IdDto

/**
 *  类型定义 [ModeratorsAssignSectionRequest]
 *  @来源 论坛管理/版主管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type ModeratorsAssignSectionRequest = AssignForumModeratorSectionDto

export type ModeratorsAssignSectionResponse = ForumModeratorDto

/**
 *  类型定义 [ForumModeratorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type ForumModeratorDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 头像 */
  avatar?: null | string
  /* 创建时间 */
  createdAt: string
  /* 删除时间 */
  deletedAt?: null | string
  /* 所属分组 */
  group?: ForumModeratorGroupDto
  /* 分组ID（分组版主时使用） */
  groupId?: null | number
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 昵称 */
  nickname: string
  /* 权限名称列表 */
  permissionNames: string[]
  /* 权限列表 */
  permissions: number[]
  /* 备注 */
  remark?: null | string
  /* 版主角色类型 */
  roleType: 1 | 2 | 3
  /* 管理的板块列表 */
  sections: ForumModeratorSectionItemDto[]
  /* 更新时间 */
  updatedAt: string

  /* 用户id */
  userId: number
}

/**
 *  类型定义 [ForumModeratorGroupDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type ForumModeratorGroupDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 分组ID */
  id: number

  /* 分组名称 */
  name: string
}

/**
 *  类型定义 [ForumModeratorSectionItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type ForumModeratorSectionItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 板块自定义权限 */
  customPermissions: number[]
  /* 板块最终生效权限 */
  finalPermissions: number[]
  /* 板块ID */
  id: number
  /* 是否继承基础权限 */
  inheritFromParent: boolean

  /* 板块名称 */
  name: string
}

/**
 *  类型定义 [CreateForumModeratorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type CreateForumModeratorDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 分组ID（分组版主时使用） */
  groupId?: null | number
  /* 是否启用 */
  isEnabled: boolean
  /* 权限列表 */
  permissions?: any[] | null
  /* 备注 */
  remark?: null | string
  /* 版主角色类型 */
  roleType: 1 | 2 | 3
  /* 板块ID列表（板块版主时必填） */
  sectionIds?: any[] | null

  /* 用户id */
  userId: number
}

/**
 *  类型定义 [UpdateForumModeratorDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UpdateForumModeratorDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 分组ID（分组版主时使用） */
  groupId?: null | number
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled?: boolean
  /* 权限列表 */
  permissions?: any[] | null
  /* 备注 */
  remark?: null | string
  /* 版主角色类型 */
  roleType?: 1 | 2 | 3

  /* 板块ID列表（板块版主时必填） */
  sectionIds?: any[] | null
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

/**
 *  类型定义 [AssignForumModeratorSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type AssignForumModeratorSectionDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 版主ID */
  moderatorId: number
  /* 板块自定义权限列表，未传则沿用版主基础权限 */
  permissions?: any[] | null

  /* 板块ID列表 */
  sectionIds: number[]
}