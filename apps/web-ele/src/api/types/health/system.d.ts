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

export type SystemConfigResponse = SystemConfigDto;

/**
 *  类型定义 [SystemConfigUpdateRequest]
 *  @来源 系统配置
 *  @更新时间 2026-03-02 23:55:35
 */
export type SystemConfigUpdateRequest = SystemConfigDto;

export type SystemConfigUpdateResponse = boolean;

/**
 *  类型定义 [SystemConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-02 23:55:35
 */
export type SystemConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 阿里云配置 */
  aliyunConfig?: AliyunConfigDto;
  /* 评论频率限制配置 */
  commentRateLimitConfig?: CommentRateLimitConfigDto;
  /* 内容审核策略配置 */
  contentReviewPolicy?: ContentReviewPolicyDto;
  /* 成长防刷配置 */
  growthAntifraudConfig?: GrowthAntifraudConfigDto;
  /* 维护模式配置 */
  maintenanceConfig?: MaintenanceConfigDto;
  /* 通知策略配置 */
  notifyConfig?: NotifyConfigDto;
  /* 注册策略配置 */
  registerConfig?: RegisterConfigDto;

  /* 站点基础配置 */
  siteConfig?: SiteConfigDto;
};

/**
 *  类型定义 [AliyunConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-02 23:55:35
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
 *  @更新时间 2026-03-02 23:55:35
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
 *  @更新时间 2026-03-02 23:55:35
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
 *  @更新时间 2026-03-02 23:55:35
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

/**
 *  类型定义 [ContentReviewPolicyDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-02 23:55:35
 */
export type ContentReviewPolicyDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 一般敏感词处理策略 */
  generalAction: ContentReviewActionDto;
  /* 轻微敏感词处理策略 */
  lightAction: ContentReviewActionDto;
  /* 是否记录命中明细 */
  recordHits?: boolean | null;

  /* 严重敏感词处理策略 */
  severeAction: ContentReviewActionDto;
};

/**
 *  类型定义 [ContentReviewActionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-02 23:55:35
 */
export type ContentReviewActionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 审核状态 */
  auditStatus: 0 | 1 | 2;

  /* 是否隐藏 */
  isHidden?: boolean | null;
};

/**
 *  类型定义 [CommentRateLimitConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-02 23:55:35
 */
export type CommentRateLimitConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 冷却时间（秒） */
  cooldownSeconds?: null | number;
  /* 是否启用评论限流 */
  enabled?: boolean | null;
  /* 每日评论上限 */
  perDay?: null | number;
  /* 每小时评论上限 */
  perHour?: null | number;

  /* 每分钟评论上限 */
  perMinute?: null | number;
};

/**
 *  类型定义 [SiteConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-02 23:55:35
 */
export type SiteConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 联系邮箱 */
  contactEmail?: null | string;
  /* 备案号 */
  icpNumber?: null | string;
  /* 站点描述 */
  siteDescription?: null | string;
  /* 站点图标 */
  siteFavicon?: null | string;
  /* 站点关键词 */
  siteKeywords?: null | string;
  /* 站点Logo */
  siteLogo?: null | string;

  /* 站点名称 */
  siteName?: null | string;
};

/**
 *  类型定义 [MaintenanceConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-02 23:55:35
 */
export type MaintenanceConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 是否启用维护模式 */
  enableMaintenanceMode?: boolean | null;

  /* 维护提示信息 */
  maintenanceMessage?: null | string;
};

/**
 *  类型定义 [RegisterConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-02 23:55:35
 */
export type RegisterConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 注册邮箱验证 */
  registerEmailVerify?: boolean | null;
  /* 是否允许注册 */
  registerEnable?: boolean | null;

  /* 注册手机验证 */
  registerPhoneVerify?: boolean | null;
};

/**
 *  类型定义 [NotifyConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-02 23:55:35
 */
export type NotifyConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 邮件通知总开关 */
  notifyEmail?: boolean | null;
  /* 站内通知总开关 */
  notifyInApp?: boolean | null;

  /* 系统通知总开关 */
  notifySystem?: boolean | null;
};
