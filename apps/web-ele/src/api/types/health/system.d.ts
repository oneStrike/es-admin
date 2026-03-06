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
 *  @更新时间 2026-03-07 00:42:13
 */
export type SystemConfigUpdateRequest = SystemConfigDto;

export type SystemConfigUpdateResponse = boolean;

/**
 *  类型定义 [SystemConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-07 00:42:13
 */
export type SystemConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 阿里云配置 */
  aliyunConfig?: AliyunConfigDto;
  /* 内容审核策略配置 */
  contentReviewPolicy?: ContentReviewPolicyDto;
  /* 维护模式配置 */
  maintenanceConfig?: MaintenanceConfigDto;

  /* 站点基础配置 */
  siteConfig?: SiteConfigDto;
};

/**
 *  类型定义 [AliyunConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-07 00:42:13
 */
export type AliyunConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* AccessKey ID（敏感字段，前端输入明文或 RSA 加密值） */
  accessKeyId?: null | string;
  /* AccessKey Secret（敏感字段，前端输入明文或 RSA 加密值） */
  accessKeySecret?: null | string;

  /* 短信服务配置 */
  sms?: AliyunSmsConfigDto;
};

/**
 *  类型定义 [AliyunSmsConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-07 00:42:13
 */
export type AliyunSmsConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 短信服务端点 */
  endpoint?: null | string;
  /* 短信签名名称 */
  signName?: null | string;
  /* 默认短信模板编码 */
  templateCode?: null | string;
  /* 验证码过期时间（秒） */
  verifyCodeExpire?: null | number;

  /* 验证码长度 */
  verifyCodeLength?: null | number;
};

/**
 *  类型定义 [SiteConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-07 00:42:13
 */
export type SiteConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 联系邮箱 */
  contactEmail?: null | string;
  /* ICP备案号 */
  icpNumber?: null | string;
  /* 站点描述 */
  siteDescription?: null | string;
  /* 站点图标 URL */
  siteFavicon?: null | string;
  /* 站点关键词（SEO用） */
  siteKeywords?: null | string;
  /* 站点Logo URL */
  siteLogo?: null | string;

  /* 站点名称 */
  siteName?: null | string;
};

/**
 *  类型定义 [MaintenanceConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-07 00:42:13
 */
export type MaintenanceConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 是否启用维护模式 */
  enableMaintenanceMode?: boolean | null;

  /* 维护模式提示信息 */
  maintenanceMessage?: null | string;
};

/**
 *  类型定义 [ContentReviewPolicyDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-07 00:42:13
 */
export type ContentReviewPolicyDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 一般敏感词处理策略 */
  generalAction?: ContentReviewActionDto;
  /* 轻微敏感词处理策略 */
  lightAction?: ContentReviewActionDto;
  /* 是否记录敏感词命中明细 */
  recordHits?: boolean | null;

  /* 严重敏感词处理策略 */
  severeAction?: ContentReviewActionDto;
};

/**
 *  类型定义 [ContentReviewActionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-07 00:42:13
 */
export type ContentReviewActionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 审核状态：0=待审核，1=已通过，2=已拒绝 */
  auditStatus?: null | number;

  /* 是否隐藏 */
  isHidden?: boolean | null;
};
