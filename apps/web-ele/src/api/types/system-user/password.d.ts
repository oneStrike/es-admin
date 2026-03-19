/**
 *  类型定义 [PasswordChangeRequest]
 *  @来源 认证与账号/管理员账号
 *  @更新时间 2026-03-19 21:17:36
 */
export type PasswordChangeRequest = ChangePasswordDto

export type PasswordChangeResponse = boolean

/**
 *  类型定义 [PasswordResetRequest]
 *  @来源 认证与账号/管理员账号
 *  @更新时间 2026-03-19 21:17:36
 */
export type PasswordResetRequest = IdDto

export type PasswordResetResponse = boolean

/**
 *  类型定义 [ChangePasswordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
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
 *  @更新时间 2026-03-19 21:17:36
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}