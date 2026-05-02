export type AuthCaptchaResponse = CaptchaDto;

/**
 *  类型定义 [AuthLoginRequest]
 *  @来源 认证与账号/管理员认证
 *  @更新时间 2026-05-02 16:37:14
 */
export type AuthLoginRequest = UserLoginDto;

export type AuthLoginResponse = LoginResponseDto;

/**
 *  类型定义 [AuthLogoutRequest]
 *  @来源 认证与账号/管理员认证
 *  @更新时间 2026-05-02 16:37:14
 */
export type AuthLogoutRequest = TokenDto;

export type AuthLogoutResponse = boolean;

/**
 *  类型定义 [AuthTokenRefreshRequest]
 *  @来源 认证与账号/管理员认证
 *  @更新时间 2026-05-02 16:37:14
 */
export type AuthTokenRefreshRequest = RefreshTokenDto;

export type AuthTokenRefreshResponse = TokenDto;

export type AuthKeyPublicResponse = RsaPublicKeyDto;

/**
 *  类型定义 [CaptchaDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-02 16:37:14
 */
export type CaptchaDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 验证码,base64格式 */
  captcha: string;

  /* 验证码ID */
  captchaId: string;
};

/**
 *  类型定义 [UserLoginDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-02 16:37:14
 */
export type UserLoginDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 验证码,base64格式 */
  captcha: string;
  /* 验证码ID */
  captchaId: string;
  /* 密码 */
  password: string;

  /* 用户名 */
  username: string;
};

/**
 *  类型定义 [LoginResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-02 16:37:14
 */
export type LoginResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 令牌信息 */
  tokens: TokenDto;

  /* 用户信息 */
  user: AdminUserResponseDto;
};

/**
 *  类型定义 [TokenDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-02 16:37:14
 */
export type TokenDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 账号令牌 */
  accessToken: string;

  /* 刷新令牌 */
  refreshToken: string;
};

/**
 *  类型定义 [AdminUserResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-02 16:37:14
 */
export type AdminUserResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 头像 */
  avatar?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 最后登录时间 */
  lastLoginAt?: null | string;
  /* 最后登录IP */
  lastLoginIp?: null | string;
  /* 手机号 */
  mobile?: null | string;
  /* 角色（0=普通管理员；1=超级管理员） */
  role: 0 | 1;
  /* 更新时间 */
  updatedAt: string;

  /* 用户名 */
  username: string;
};

/**
 *  类型定义 [RefreshTokenDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-02 16:37:14
 */
export type RefreshTokenDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 刷新令牌 */
  refreshToken: string;
};

/**
 *  类型定义 [RsaPublicKeyDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-02 16:37:14
 */
export type RsaPublicKeyDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* RSA公钥 */
  publicKey: string;
};
