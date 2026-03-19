/**
 *  类型定义 [ProfileUpdateRequest]
 *  @来源 认证与账号/管理员账号
 *  @更新时间 2026-03-19 23:58:08
 */
export type ProfileUpdateRequest = UpdateUserDto

export type ProfileUpdateResponse = boolean

/**
 *  类型定义 [UpdateUserDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
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