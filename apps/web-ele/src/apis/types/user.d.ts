/**
 *  类型定义 [UserRegisterRequest]
 *  @来源 管理端用户模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type UserRegisterRequest = UserRegisterDto

export type UserRegisterResponse = IdDto

/**
 *  类型定义 [UserUpdateInfoRequest]
 *  @来源 管理端用户模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type UserUpdateInfoRequest = UpdateUserDto

export type UserUpdateInfoResponse = BaseUserDto

export type UserInfoResponse = BaseUserDto

/**
 *  类型定义 [UserInfoByIdRequest]
 *  @来源 管理端用户模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type UserInfoByIdRequest = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

export type UserInfoByIdResponse = BaseUserDto

/**
 *  类型定义 [UserPageRequest]
 *  @来源 管理端用户模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type UserPageRequest = {
  /* 用户名 */
  username?: string

  /* 手机号 */
  mobile?: string

  /* 是否启用 */
  isEnabled?: boolean

  /* 角色 0普通管理员 1超级管理员 */
  role?: number

  /* 单页大小，最大500，默认15 */
  pageSize?: number

  /* 当前页码 */
  pageIndex?: number

  /* 排序字段，json格式 */
  orderBy?: string

  /* 开始时间 */
  startDate?: string

  /* 结束时间 */
  endDate?: string

  /** 任意合法数值 */
  [property: string]: any
}

export type UserPageResponse = {
  /* 当前页码 */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: BaseUserDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UserChangePasswordRequest]
 *  @来源 管理端用户模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type UserChangePasswordRequest = ChangePasswordDto

export type UserChangePasswordResponse = IdDto

/**
 *  类型定义 [UserUnlockRequest]
 *  @来源 管理端用户模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type UserUnlockRequest = IdDto

export type UserUnlockResponse = IdDto

/**
 *  类型定义 [UserResetPasswordRequest]
 *  @来源 管理端用户模块
 *  @更新时间 2025-12-08 23:24:09
 */
export type UserResetPasswordRequest = IdDto

export type UserResetPasswordResponse = IdDto

/**
 *  类型定义 [UserRegisterDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type UserRegisterDto = {
  /* 用户名 */
  username: string
  /* 手机号 */
  mobile: string
  /* 头像 */
  avatar?: string
  /* 角色 0普通管理员 1超级管理员 */
  role: 0 | 1
  /* 密码 */
  password: string
  /* 密码 */
  confirmPassword: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type IdDto = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateUserDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type UpdateUserDto = {
  /* 主键id */
  id: number
  /* 用户名 */
  username: string
  /* 手机号 */
  mobile: string
  /* 头像 */
  avatar?: string
  /* 是否启用 */
  isEnabled: boolean
  /* 角色 0普通管理员 1超级管理员 */
  role: 0 | 1

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [BaseUserDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
 */
export type BaseUserDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 用户名 */
  username: string
  /* 手机号 */
  mobile: string
  /* 头像 */
  avatar?: string
  /* 是否启用 */
  isEnabled: boolean
  /* 角色 0普通管理员 1超级管理员 */
  role: 0 | 1
  /* 最后登录时间 */
  lastLoginAt?: string
  /* 最后登录IP */
  lastLoginIp?: string
  /* 是否锁定 */
  isLocked: boolean

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ChangePasswordDto]
 *  @来源 components.schemas
 *  @更新时间 2025-12-08 23:24:09
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