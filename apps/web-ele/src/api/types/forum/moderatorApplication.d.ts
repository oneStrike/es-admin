/**
 *  类型定义 [ModeratorApplicationPageRequest]
 *  @来源 论坛管理/版主申请
 *  @更新时间 2026-03-19 23:58:08
 */
export type ModeratorApplicationPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 申请人用户ID */
  applicantId?: number

  /* 结束时间 */
  endDate?: null | string

  /* 申请人昵称 */
  nickname?: null | string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码 */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 申请板块ID */
  sectionId?: number

  /* 开始时间 */
  startDate?: null | string

  /* 申请状态（0=PENDING，1=APPROVED，2=REJECTED） */
  status?: number
}

export type ModeratorApplicationPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: ForumModeratorApplicationDto[]

  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [ModeratorApplicationDetailRequest]
 *  @来源 论坛管理/版主申请
 *  @更新时间 2026-03-19 23:58:08
 */
export type ModeratorApplicationDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type ModeratorApplicationDetailResponse = ForumModeratorApplicationDto

/**
 *  类型定义 [ModeratorApplicationAuditRequest]
 *  @来源 论坛管理/版主申请
 *  @更新时间 2026-03-19 23:58:08
 */
export type ModeratorApplicationAuditRequest = AuditForumModeratorApplicationDto

export type ModeratorApplicationAuditResponse = ForumModeratorApplicationDto

/**
 *  类型定义 [ModeratorApplicationDeleteRequest]
 *  @来源 论坛管理/版主申请
 *  @更新时间 2026-03-19 23:58:08
 */
export type ModeratorApplicationDeleteRequest = IdDto

export type ModeratorApplicationDeleteResponse = IdDto

/**
 *  类型定义 [ForumModeratorApplicationDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type ForumModeratorApplicationDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 申请人信息 */
  applicant?: ForumModeratorApplicationUserDto
  /* 申请人用户ID */
  applicantId: number
  /* 审核时间 */
  auditAt?: null | string
  /* 审核人ID */
  auditById?: null | number
  /* 审核人信息 */
  auditor?: ForumModeratorApplicationUserDto
  /* 审核意见 */
  auditReason?: null | string
  /* 创建时间 */
  createdAt: string
  /* 删除时间 */
  deletedAt?: null | string
  /* 主键id */
  id: number
  /* 权限名称列表 */
  permissionNames: string[]
  /* 申请权限列表 */
  permissions?: any[] | null
  /* 申请理由 */
  reason: string
  /* 备注 */
  remark?: null | string
  /* 板块信息 */
  section?: ForumModeratorApplicationSectionDto
  /* 申请板块ID */
  sectionId: number
  /* 申请状态（0=PENDING，1=APPROVED，2=REJECTED） */
  status: 0 | 1 | 2

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [ForumModeratorApplicationUserDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type ForumModeratorApplicationUserDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 头像URL */
  avatarUrl?: null | string
  /* 主键id */
  id: number

  /* 昵称 */
  nickname: string
}

/**
 *  类型定义 [ForumModeratorApplicationSectionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type ForumModeratorApplicationSectionDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 板块描述 */
  description?: null | string
  /* 板块图标 */
  icon?: null | string
  /* 主键id */
  id: number

  /* 板块名称 */
  name: string
}

/**
 *  类型定义 [AuditForumModeratorApplicationDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type AuditForumModeratorApplicationDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 审核意见 */
  auditReason?: null | string
  /* 主键id */
  id: number
  /* 备注 */
  remark?: null | string

  /* 申请状态（0=PENDING，1=APPROVED，2=REJECTED） */
  status: 0 | 1 | 2
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}