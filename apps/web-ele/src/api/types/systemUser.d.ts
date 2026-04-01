/**
 *  类型定义 [SystemUserCreateRequest]
 *  @来源 认证与账号/管理员账号
 *  @更新时间 2026-04-01 15:24:49
 */
export type SystemUserCreateRequest = UserRegisterDto

export type SystemUserCreateResponse = boolean

/**
 *  类型定义 [SystemUserProfileUpdateRequest]
 *  @来源 认证与账号/管理员账号
 *  @更新时间 2026-04-01 15:24:49
 */
export type SystemUserProfileUpdateRequest = UpdateUserDto

export type SystemUserProfileUpdateResponse = boolean

export type SystemUserProfileResponse = BaseAdminUserDto

/**
 *  类型定义 [SystemUserDetailRequest]
 *  @来源 认证与账号/管理员账号
 *  @更新时间 2026-04-01 15:24:49
 */
export type SystemUserDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type SystemUserDetailResponse = BaseAdminUserDto

/**
 *  类型定义 [SystemUserPageRequest]
 *  @来源 认证与账号/管理员账号
 *  @更新时间 2026-04-01 15:24:49
 */
export type SystemUserPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 是否启用 */
  isEnabled?: boolean

  /* 手机号 */
  mobile?: null | string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 角色 0普通管理员 1超级管理员（0=NORMAL_ADMIN，1=SUPER_ADMIN） */
  role?: number

  /* 开始时间 */
  startDate?: null | string

  /* 用户名 */
  username?: string
}

export type SystemUserPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: BaseAdminUserDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [SystemUserPasswordChangeRequest]
 *  @来源 认证与账号/管理员账号
 *  @更新时间 2026-04-01 15:24:49
 */
export type SystemUserPasswordChangeRequest = ChangePasswordDto

export type SystemUserPasswordChangeResponse = boolean

/**
 *  类型定义 [SystemUserPasswordResetRequest]
 *  @来源 认证与账号/管理员账号
 *  @更新时间 2026-04-01 15:24:49
 */
export type SystemUserPasswordResetRequest = IdDto

export type SystemUserPasswordResetResponse = boolean

/**
 *  类型定义 [SystemUserUnlockRequest]
 *  @来源 认证与账号/管理员账号
 *  @更新时间 2026-04-01 15:24:49
 */
export type SystemUserUnlockRequest = IdDto

export type SystemUserUnlockResponse = boolean

/**
 *  类型定义 [UserRegisterDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-01 15:24:49
 */
export type UserRegisterDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 头像 */
  avatar?: null | string
  /* 确认密码 */
  confirmPassword: string
  /* 手机号 */
  mobile?: null | string
  /* 密码 */
  password: string
  /* 角色 0普通管理员 1超级管理员（0=NORMAL_ADMIN，1=SUPER_ADMIN） */
  role: 0 | 1

  /* 用户名 */
  username: string
}

/**
 *  类型定义 [UpdateUserDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-01 15:24:49
 */
export type UpdateUserDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 头像 */
  avatar?: null | string
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 手机号 */
  mobile?: null | string
  /* 角色 0普通管理员 1超级管理员（0=NORMAL_ADMIN，1=SUPER_ADMIN） */
  role: 0 | 1

  /* 用户名 */
  username: string
}

/**
 *  类型定义 [BaseAdminUserDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-01 15:24:49
 */
export type BaseAdminUserDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 头像 */
  avatar?: null | string
  /* 创建时间 */
  createdAt: string
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 最后登录时间 */
  lastLoginAt?: null | string
  /* 最后登录IP */
  lastLoginIp?: null | string
  /* 手机号 */
  mobile?: null | string
  /* 密码 */
  password: string
  /* 角色 0普通管理员 1超级管理员（0=NORMAL_ADMIN，1=SUPER_ADMIN） */
  role: 0 | 1
  /* 更新时间 */
  updatedAt: string

  /* 用户名 */
  username: string
}

/**
 *  类型定义 [ChangePasswordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-01 15:24:49
 */
export type ChangePasswordDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 确认新密码 */
  confirmPassword: string
  /* 新密码 */
  newPassword: string

  /* 旧密码 */
  oldPassword: string
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-01 15:24:49
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}