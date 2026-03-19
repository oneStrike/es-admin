/**
 *  类型定义 [PermissionCheckRequest]
 *  @来源 用户成长/等级规则管理
 *  @更新时间 2026-03-19 21:17:36
 */
export type PermissionCheckRequest = CheckUserLevelPermissionDto

export type PermissionCheckResponse = UserLevelPermissionResultDto

/**
 *  类型定义 [CheckUserLevelPermissionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type CheckUserLevelPermissionDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 权限类型 */
  permissionType: 'dailyFavoriteLimit' | 'dailyLikeLimit' | 'dailyReplyCommentLimit' | 'dailyTopicLimit' | 'postInterval'

  /* 用户ID */
  userId: number
}

/**
 *  类型定义 [UserLevelPermissionResultDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type UserLevelPermissionResultDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 当前等级名称 */
  currentLevel: string
  /* 是否有权限 */
  hasPermission: boolean
  /* 限制数量 */
  limit?: null | number
  /* 剩余数量 */
  remaining?: null | number

  /* 已使用数量 */
  used?: null | number
}