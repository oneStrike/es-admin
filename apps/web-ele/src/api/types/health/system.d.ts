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

export type SystemConfigDetailResponse = SystemConfigDto;

/**
 *  类型定义 [SystemConfigUpdateRequest]
 *  @来源 系统配置
 *  @更新时间 2026-02-13 00:11:45
 */
export type SystemConfigUpdateRequest = SystemConfigDto;

export type SystemConfigUpdateResponse = boolean;

/**
 *  类型定义 [SystemConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-13 00:11:45
 */
export type SystemConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 阿里云配置 */
  aliyunConfig?: AliyunConfigDto;

  /* 成长防刷配置 */
  growthAntifraudConfig?: GrowthAntifraudConfigDto;
};

/**
 *  类型定义 [AliyunConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-13 00:11:45
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
 *  @更新时间 2026-02-13 00:11:45
 */
export type AliyunSmsConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 短信签名 */
  signName: string;
  /* 验证码过期时间（秒） */
  verifyCodeExpire: number;

  /* 验证码长度 */
  verifyCodeLength: number;
};

/**
 *  类型定义 [GrowthAntifraudConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-13 00:11:45
 */
export type GrowthAntifraudConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 设备维度限制 */
  device?: GrowthAntifraudLimitDto;
  /* 是否启用防刷 */
  enabled?: boolean | null;
  /* 经验高价值阈值 */
  experienceThreshold?: null | number;
  /* 高价值设备维度限制 */
  highValueDevice?: GrowthAntifraudLimitDto;
  /* 高价值 IP 维度限制 */
  highValueIp?: GrowthAntifraudLimitDto;
  /* 高价值用户维度限制 */
  highValueUser?: GrowthAntifraudLimitDto;
  /* IP 维度限制 */
  ip?: GrowthAntifraudLimitDto;
  /* 事件级覆盖规则 */
  overrides?: any[] | null;
  /* 积分高价值阈值 */
  pointsThreshold?: null | number;

  /* 用户维度限制 */
  user?: GrowthAntifraudLimitDto;
};

/**
 *  类型定义 [GrowthAntifraudLimitDto]
 *  @来源 components.schemas
 *  @更新时间 2026-02-13 00:11:45
 */
export type GrowthAntifraudLimitDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 冷却时间（秒） */
  cooldownSeconds?: null | number;
  /* 每日上限 */
  dailyLimit?: null | number;

  /* 总上限 */
  totalLimit?: null | number;
};
