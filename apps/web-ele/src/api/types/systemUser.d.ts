/**
 *  类型定义 [SystemUserCreateRequest]
 *  @来源 认证与账号/管理员账号
 *  @更新时间 2026-04-08 08:36:51
 */
export type SystemUserCreateRequest = UserRegisterDto

export type SystemUserCreateResponse = boolean

/**
 *  类型定义 [SystemUserProfileUpdateRequest]
 *  @来源 认证与账号/管理员账号
 *  @更新时间 2026-04-08 08:36:51
 */
export type SystemUserProfileUpdateRequest = UpdateUserDto

export type SystemUserProfileUpdateResponse = boolean

export type SystemUserProfileResponse = AdminUserResponseDto

/**
 *  类型定义 [SystemUserDetailRequest]
 *  @来源 认证与账号/管理员账号
 *  @更新时间 2026-04-08 08:36:51
 */
export type SystemUserDetailRequest = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

export type SystemUserDetailResponse = AdminUserResponseDto

/**
 *  类型定义 [SystemUserPageRequest]
 *  @来源 认证与账号/管理员账号
 *  @更新时间 2026-04-08 08:36:51
 */
export type SystemUserPageRequest = {
  /* 用户名 */
  username?: string

  /* 手机号 */
  mobile?: string | null

  /* 角色 0普通管理员 1超级管理员 */
  role?: number

  /* 是否启用 */
  isEnabled?: boolean

  /* 开始时间 */
  startDate?: string | null

  /* 结束时间 */
  endDate?: string | null

  /* 单页大小，最大500，默认15 */
  pageSize?: number | null

  /* 当前页码（从1开始） */
  pageIndex?: number | null

  /* 排序字段，json格式 */
  orderBy?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

export type SystemUserPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: AdminUserResponseDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [SystemUserPasswordChangeRequest]
 *  @来源 认证与账号/管理员账号
 *  @更新时间 2026-04-08 08:36:51
 */
export type SystemUserPasswordChangeRequest = ChangePasswordDto

export type SystemUserPasswordChangeResponse = boolean

/**
 *  类型定义 [SystemUserPasswordResetRequest]
 *  @来源 认证与账号/管理员账号
 *  @更新时间 2026-04-08 08:36:51
 */
export type SystemUserPasswordResetRequest = IdDto

export type SystemUserPasswordResetResponse = boolean

/**
 *  类型定义 [SystemUserUnlockRequest]
 *  @来源 认证与账号/管理员账号
 *  @更新时间 2026-04-08 08:36:51
 */
export type SystemUserUnlockRequest = IdDto

export type SystemUserUnlockResponse = boolean

/**
 *  类型定义 [UserRegisterDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type UserRegisterDto = {
  /* 用户名 */
  username: string
  /* 密码 */
  password: string
  /* 手机号 */
  mobile?: string | null
  /* 头像 */
  avatar?: string | null
  /* 角色 0普通管理员 1超级管理员 */
  role: 0 | 1
  /* 确认密码 */
  confirmPassword: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateUserDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type UpdateUserDto = {
  /* 主键id */
  id: number
  /* 用户名 */
  username: string
  /* 手机号 */
  mobile?: string | null
  /* 头像 */
  avatar?: string | null
  /* 角色 0普通管理员 1超级管理员 */
  role: 0 | 1
  /* 是否启用 */
  isEnabled: boolean

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminUserResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type AdminUserResponseDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 用户名 */
  username: string
  /* 手机号 */
  mobile?: string | null
  /* 头像 */
  avatar?: string | null
  /* 角色 0普通管理员 1超级管理员 */
  role: 0 | 1
  /* 是否启用 */
  isEnabled: boolean
  /* 最后登录时间 */
  lastLoginAt?: string | null
  /* 最后登录IP */
  lastLoginIp?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ChangePasswordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type ChangePasswordDto = {
  /* 旧密码 */
  oldPassword: string
  /* 新密码 */
  newPassword: string
  /* 确认新密码 */
  confirmPassword: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type IdDto = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}