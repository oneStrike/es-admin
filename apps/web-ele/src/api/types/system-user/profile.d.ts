/**
 *  类型定义 [ProfileUpdateRequest]
 *  @来源 认证与账号/管理员账号
 *  @更新时间 2026-03-19 21:17:36
 */
export type ProfileUpdateRequest = UpdateUserDto

export type ProfileUpdateResponse = boolean

/**
 *  类型定义 [ProfileUpdateRequest]
 *  @来源 APP管理/用户管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type ProfileUpdateRequest = UpdateAdminAppUserProfileDto

export type ProfileUpdateResponse = boolean

/**
 *  类型定义 [UpdateUserDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
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
  /* 角色 0普通管理员 1超级管理员 */
  role: 0 | 1

  /* 用户名 */
  username: string
}

/**
 *  类型定义 [UpdateAdminAppUserProfileDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
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