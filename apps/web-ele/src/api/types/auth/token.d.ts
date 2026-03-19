/**
 *  类型定义 [TokenRefreshRequest]
 *  @来源 认证与账号/管理员认证
 *  @更新时间 2026-03-19 23:58:08
 */
export type TokenRefreshRequest = RefreshTokenDto

export type TokenRefreshResponse = TokenDto

/**
 *  类型定义 [RefreshTokenDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type RefreshTokenDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 刷新令牌 */
  refreshToken: string
}

/**
 *  类型定义 [TokenDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 23:58:08
 */
export type TokenDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 账号令牌 */
  accessToken: string

  /* 刷新令牌 */
  refreshToken: string
}