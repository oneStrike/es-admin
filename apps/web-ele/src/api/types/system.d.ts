export type SystemConfigResponse = SystemConfigDetailDto;

/**
 *  类型定义 [SystemUpdateRequest]
 *  @来源 系统管理/系统配置
 *  @更新时间 2026-05-09 22:20:06
 */
export type SystemUpdateRequest = UpdateSystemConfigDto;

export type SystemUpdateResponse = boolean;

export type SystemIp2regionStatusResponse = Ip2regionRuntimeStatusDto;

export type SystemIp2regionUploadResponse = Ip2regionRuntimeStatusDto;

/**
 *  类型定义 [SystemConfigDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type SystemConfigDetailDto = {
  /* 阿里云配置 */
  aliyunConfig: AliyunConfigOutputDto;
  /* 内容审核策略 */
  contentReviewPolicy: ContentReviewPolicyOutputDto;
  /* 创建时间 */
  createdAt: string;
  /* 主键id */
  id: number;
  /* 维护配置 */
  maintenanceConfig: MaintenanceConfigOutputDto;
  /* 运营配置 */
  operationConfig: OperationConfigOutputDto;
  /* 安全配置 */
  securityConfig: SecurityConfigOutputDto;
  /* 站点配置 */
  siteConfig: SiteConfigOutputDto;
  /* 三方资源解析配置 */
  thirdPartyResourceParseConfig: ThirdPartyResourceParseConfigOutputDto;
  /* 更新时间 */
  updatedAt: string;
  /* 最后修改人 ID */
  updatedById: null | number;
  /* 上传配置 */
  uploadConfig: UploadConfigOutputDto;
  /* 钱包虚拟币展示配置 */
  walletCurrencyDisplayConfig: WalletCurrencyDisplayConfigOutputDto;
};

/**
 *  类型定义 [AliyunConfigOutputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AliyunConfigOutputDto = {
  /* AccessKey ID（敏感字段，管理端读取时脱敏） */
  accessKeyId: string;
  /* AccessKey Secret（敏感字段，管理端读取时脱敏） */
  accessKeySecret: string;
  /* 短信服务配置 */
  sms: AliyunSmsConfigOutputDto;
};

/**
 *  类型定义 [AliyunSmsConfigOutputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AliyunSmsConfigOutputDto = {
  /* 短信服务端点 */
  endpoint: string;
  /* 短信签名名称 */
  signName: string;
  /* 验证码过期时间（秒） */
  verifyCodeExpire: number;
  /* 验证码长度 */
  verifyCodeLength: number;
};

/**
 *  类型定义 [SiteConfigOutputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type SiteConfigOutputDto = {
  /* 联系邮箱 */
  contactEmail: string;
  /* ICP备案号 */
  icpNumber: string;
  /* 站点描述 */
  siteDescription: string;
  /* 站点图标 URL */
  siteFavicon: string;
  /* 站点关键词（SEO用） */
  siteKeywords: string;
  /* 站点Logo URL */
  siteLogo: string;
  /* 站点名称 */
  siteName: string;
};

/**
 *  类型定义 [OperationConfigOutputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type OperationConfigOutputDto = {
  /* forum 话题配置 */
  forumHashtagConfig: ForumHashtagConfigOutputDto;
};

/**
 *  类型定义 [ForumHashtagConfigOutputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumHashtagConfigOutputDto = {
  /* 话题创建模式（1=仅引用已存在且可用话题；2=正文中允许自动创建话题） */
  creationMode: number;
};

/**
 *  类型定义 [SecurityConfigOutputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type SecurityConfigOutputDto = {
  /* 远程图片导入安全配置 */
  remoteImageImport: RemoteImageImportSecurityConfigOutputDto;
};

/**
 *  类型定义 [RemoteImageImportSecurityConfigOutputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type RemoteImageImportSecurityConfigOutputDto = {
  /* 是否启用远程图片 DNS 不安全地址防护 */
  enableAddressGuard: boolean;
};

/**
 *  类型定义 [ThirdPartyResourceParseConfigOutputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ThirdPartyResourceParseConfigOutputDto = {
  /* CopyManga API 请求最小间隔（毫秒） */
  apiIntervalMs: number;
  /* 是否启用三方资源解析节流 */
  enabled: boolean;
  /* CopyManga host discovery 缓存 TTL（秒） */
  hostCacheTtlSeconds: number;
  /* 三方远程图片下载最小间隔（毫秒） */
  imageIntervalMs: number;
  /* 每个资源解析通道允许排队的最大请求数 */
  maxQueueSize: number;
};

/**
 *  类型定义 [WalletCurrencyDisplayConfigOutputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WalletCurrencyDisplayConfigOutputDto = {
  /* 虚拟币稳定资产键 */
  assetKey: string;
  /* 虚拟币图标 URL */
  currencyIconUrl: string;
  /* 虚拟币展示名称 */
  currencyName: string;
  /* 虚拟币单位名称 */
  currencyUnitName: string;
};

/**
 *  类型定义 [MaintenanceConfigOutputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type MaintenanceConfigOutputDto = {
  /* 是否启用维护模式 */
  enableMaintenanceMode: boolean;
  /* 维护模式提示信息 */
  maintenanceMessage: string;
};

/**
 *  类型定义 [ContentReviewPolicyOutputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentReviewPolicyOutputDto = {
  /* 一般敏感词处理策略 */
  generalAction: ContentReviewActionOutputDto;
  /* 轻微敏感词处理策略 */
  lightAction: ContentReviewActionOutputDto;
  /* 是否记录敏感词命中明细 */
  recordHits: boolean;
  /* 严重敏感词处理策略 */
  severeAction: ContentReviewActionOutputDto;
};

/**
 *  类型定义 [ContentReviewActionOutputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentReviewActionOutputDto = {
  /* 审核状态（0=待审核；1=已通过；2=已拒绝） */
  auditStatus: 0 | 1 | 2;
  /* 是否隐藏 */
  isHidden: boolean;
};

/**
 *  类型定义 [UploadConfigOutputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UploadConfigOutputDto = {
  /* 上传提供方（本地存储；七牛云存储；Superbed 图床） */
  provider: 'local' | 'qiniu' | 'superbed';
  /* 七牛上传配置 */
  qiniu: QiniuUploadConfigOutputDto;
  /* Superbed 上传配置 */
  superbed: SuperbedUploadConfigOutputDto;
  /* 当 provider 为 superbed 时，非图片文件是否自动回落本地 */
  superbedNonImageFallbackToLocal: boolean;
};

/**
 *  类型定义 [QiniuUploadConfigOutputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type QiniuUploadConfigOutputDto = {
  /* 七牛 AccessKey（敏感字段，管理端读取时脱敏） */
  accessKey: string;
  /* 七牛存储空间 bucket */
  bucket: string;
  /* 七牛公开访问域名 */
  domain: string;
  /* 七牛对象前缀 */
  pathPrefix: string;
  /* 七牛区域 ID，留空时自动查询 */
  region: string;
  /* 七牛 SecretKey（敏感字段，管理端读取时脱敏） */
  secretKey: string;
  /* 上传凭证有效期（秒） */
  tokenExpires: number;
  /* 是否使用 HTTPS */
  useHttps: boolean;
};

/**
 *  类型定义 [SuperbedUploadConfigOutputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type SuperbedUploadConfigOutputDto = {
  /* Superbed 相册分类，多个使用英文逗号分隔 */
  categories: string;
  /* 是否开启压缩 */
  compress: boolean | null;
  /* Superbed token（敏感字段，管理端读取时脱敏） */
  token: string;
  /* 是否开启水印 */
  watermark: boolean | null;
  /* 是否强制转 webp */
  webp: boolean | null;
};

/**
 *  类型定义 [UpdateSystemConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateSystemConfigDto = {
  /* 阿里云配置 */
  aliyunConfig?: AliyunConfigDto;
  /* 内容审核策略 */
  contentReviewPolicy?: ContentReviewPolicyDto;
  /* 主键id */
  id: number;
  /* 维护配置 */
  maintenanceConfig?: MaintenanceConfigDto;
  /* 运营配置 */
  operationConfig?: OperationConfigDto;
  /* 安全配置 */
  securityConfig?: SecurityConfigDto;
  /* 站点配置 */
  siteConfig?: SiteConfigDto;
  /* 三方资源解析配置 */
  thirdPartyResourceParseConfig?: ThirdPartyResourceParseConfigDto;
  /* 上传配置 */
  uploadConfig?: UploadConfigDto;
  /* 钱包虚拟币展示配置 */
  walletCurrencyDisplayConfig?: WalletCurrencyDisplayConfigDto;
};

/**
 *  类型定义 [AliyunConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AliyunConfigDto = {
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
 *  @更新时间 2026-05-09 22:20:06
 */
export type AliyunSmsConfigDto = {
  /* 短信服务端点 */
  endpoint?: null | string;
  /* 短信签名名称 */
  signName?: null | string;
  /* 验证码过期时间（秒） */
  verifyCodeExpire?: null | number;
  /* 验证码长度 */
  verifyCodeLength?: null | number;
};

/**
 *  类型定义 [SiteConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type SiteConfigDto = {
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
 *  类型定义 [OperationConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type OperationConfigDto = {
  /* forum 话题配置 */
  forumHashtagConfig?: ForumHashtagConfigDto;
};

/**
 *  类型定义 [ForumHashtagConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ForumHashtagConfigDto = {
  /* 话题创建模式（1=仅引用已存在且可用话题；2=正文中允许自动创建话题） */
  creationMode?: null | number;
};

/**
 *  类型定义 [SecurityConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type SecurityConfigDto = {
  /* 远程图片导入安全配置 */
  remoteImageImport?: RemoteImageImportSecurityConfigDto;
};

/**
 *  类型定义 [RemoteImageImportSecurityConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type RemoteImageImportSecurityConfigDto = {
  /* 是否启用远程图片 DNS 不安全地址防护 */
  enableAddressGuard?: boolean | null;
};

/**
 *  类型定义 [ThirdPartyResourceParseConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ThirdPartyResourceParseConfigDto = {
  /* CopyManga API 请求最小间隔（毫秒） */
  apiIntervalMs?: null | number;
  /* 是否启用三方资源解析节流 */
  enabled?: boolean | null;
  /* CopyManga host discovery 缓存 TTL（秒） */
  hostCacheTtlSeconds?: null | number;
  /* 三方远程图片下载最小间隔（毫秒） */
  imageIntervalMs?: null | number;
  /* 每个资源解析通道允许排队的最大请求数 */
  maxQueueSize?: null | number;
};

/**
 *  类型定义 [WalletCurrencyDisplayConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WalletCurrencyDisplayConfigDto = {
  /* 虚拟币稳定资产键 */
  assetKey?: null | string;
  /* 虚拟币图标 URL */
  currencyIconUrl?: null | string;
  /* 虚拟币展示名称 */
  currencyName?: null | string;
  /* 虚拟币单位名称 */
  currencyUnitName?: null | string;
};

/**
 *  类型定义 [MaintenanceConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type MaintenanceConfigDto = {
  /* 是否启用维护模式 */
  enableMaintenanceMode?: boolean | null;
  /* 维护模式提示信息 */
  maintenanceMessage?: null | string;
};

/**
 *  类型定义 [ContentReviewPolicyDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentReviewPolicyDto = {
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
 *  @更新时间 2026-05-09 22:20:06
 */
export type ContentReviewActionDto = {
  /* 审核状态（0=待审核；1=已通过；2=已拒绝） */
  auditStatus?: 0 | 1 | 2 | null;
  /* 是否隐藏 */
  isHidden?: boolean | null;
};

/**
 *  类型定义 [UploadConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UploadConfigDto = {
  /* 上传提供方（本地存储；七牛云存储；Superbed 图床） */
  provider?: 'local' | 'qiniu' | 'superbed' | null;
  /* 七牛上传配置 */
  qiniu?: QiniuUploadConfigDto;
  /* Superbed 上传配置 */
  superbed?: SuperbedUploadConfigDto;
  /* 当 provider 为 superbed 时，非图片文件是否自动回落本地 */
  superbedNonImageFallbackToLocal?: boolean | null;
};

/**
 *  类型定义 [QiniuUploadConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type QiniuUploadConfigDto = {
  /* 七牛 AccessKey（敏感字段，前端输入明文或 RSA 加密值） */
  accessKey?: null | string;
  /* 七牛存储空间 bucket */
  bucket?: null | string;
  /* 七牛公开访问域名 */
  domain?: null | string;
  /* 七牛对象前缀 */
  pathPrefix?: null | string;
  /* 七牛区域 ID，留空时自动查询 */
  region?: null | string;
  /* 七牛 SecretKey（敏感字段，前端输入明文或 RSA 加密值） */
  secretKey?: null | string;
  /* 上传凭证有效期（秒） */
  tokenExpires?: null | number;
  /* 是否使用 HTTPS */
  useHttps?: boolean | null;
};

/**
 *  类型定义 [SuperbedUploadConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type SuperbedUploadConfigDto = {
  /* Superbed 相册分类，多个使用英文逗号分隔 */
  categories?: null | string;
  /* 是否开启压缩 */
  compress?: boolean | null;
  /* Superbed token（敏感字段，前端输入明文或 RSA 加密值） */
  token?: null | string;
  /* 是否开启水印 */
  watermark?: boolean | null;
  /* 是否强制转 webp */
  webp?: boolean | null;
};

/**
 *  类型定义 [Ip2regionRuntimeStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type Ip2regionRuntimeStatusDto = {
  /* 当前生效时间 */
  activatedAt: null | string;
  /* 当前生效文件名 */
  fileName: null | string;
  /* 当前生效文件绝对路径 */
  filePath: null | string;
  /* 当前生效文件大小（字节） */
  fileSize: null | number;
  /* 当前进程是否已加载可用属地库 */
  ready: boolean;
  /* 当前是否正在执行热切换 */
  reloading: boolean;
  /* 生效库来源（托管 active 目录；环境变量显式路径；仓库默认路径；无可用属地库） */
  source: 'configured-path' | 'default-path' | 'managed-active' | 'unavailable';
  /* ip2region 专用存储根目录 */
  storageDir: string;
};
