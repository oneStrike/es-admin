export type SystemHealthResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  details?: Record<string, any>;

  error?: null | Record<string, any>;

  info?: null | Record<string, any>;

  status?: string;
};

export type SystemReadyResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  details?: Record<string, any>;

  error?: null | Record<string, any>;

  info?: null | Record<string, any>;

  status?: string;
};

export type SystemConfigDetailResponse = AliyunConfigDto;

export type SystemConfigUpdateResponse = boolean;

/**
 *  类型定义 [AliyunConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-05 22:56:49
 */
export type AliyunConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* AccessKey ID (前端输入明文，后端加密存储) */
  accessKeyId: string;
  /* AccessKey Secret (前端输入明文，后端加密存储) */
  accessKeySecret: string;

  /* 短信配置 */
  sms: AliyunSmsConfigDto;
};

/**
 *  类型定义 [AliyunSmsConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-05 22:56:49
 */
export type AliyunSmsConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 阿里云短信 Endpoint */
  endpoint: string;
  /* 短信签名 */
  signName: string;
  /* 验证码过期时间（秒） */
  verifyCodeExpire: number;
  /* 验证码长度 */
  verifyCodeLength: number;

  /* 验证码模版Code */
  verifyCodeTemplate: string;
};
