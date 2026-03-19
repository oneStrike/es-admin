/**
 *  类型定义 [PasswordResetRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type PasswordResetRequest = ResetAdminAppUserPasswordDto

export type PasswordResetResponse = boolean

/**
 *  类型定义 [ResetAdminAppUserPasswordDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type ResetAdminAppUserPasswordDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 前端 RSA 加密后的新密码 */
  password: string
}