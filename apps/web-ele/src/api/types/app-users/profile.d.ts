/**
 *  类型定义 [ProfileUpdateRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-19 23:58:08
 */
export type ProfileUpdateRequest = UpdateAdminAppUserProfileDto

export type ProfileUpdateResponse = boolean

/**
 *  类型定义 [UpdateAdminAppUserProfileDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type UpdateAdminAppUserProfileDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 头像URL */
  avatarUrl?: null | string
  /* 论坛简介 */
  bio?: null | string
  /* 出生日期 */
  birthDate?: null | string
  /* 邮箱 */
  emailAddress?: null | string
  /* 性别（0=未知，1=男，2=女，3=其他，4=保密） */
  genderType?: 0 | 1 | 2 | 3 | 4
  /* 主键id */
  id: number
  /* 昵称 */
  nickname?: string
  /* 手机号 */
  phoneNumber?: null | string

  /* 论坛签名 */
  signature?: null | string
}