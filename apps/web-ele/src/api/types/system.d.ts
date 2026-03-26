export type SystemConfigResponse = BaseSystemConfigDto

/**
 *  类型定义 [SystemUpdateRequest]
 *  @来源 系统管理/系统配置
 *  @更新时间 2026-03-26 22:03:53
 */
export type SystemUpdateRequest = SystemConfigBodyDto

export type SystemUpdateResponse = boolean

/**
 *  类型定义 [BaseSystemConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type BaseSystemConfigDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 最后修改人ID */
  updatedById?: number | null
  /* 阿里云配置 */
  aliyunConfig?: AliyunConfigDto
  /* 站点配置 */
  siteConfig?: SiteConfigDto
  /* 维护配置 */
  maintenanceConfig?: MaintenanceConfigDto
  /* 内容审核策略 */
  contentReviewPolicy?: ContentReviewPolicyDto
  /* 上传配置 */
  uploadConfig?: UploadConfigDto

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AliyunConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type AliyunConfigDto = {
  /* AccessKey ID（敏感字段，前端输入明文或 RSA 加密值） */
  accessKeyId?: string | null
  /* AccessKey Secret（敏感字段，前端输入明文或 RSA 加密值） */
  accessKeySecret?: string | null
  /* 短信服务配置 */
  sms?: AliyunSmsConfigDto

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AliyunSmsConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type AliyunSmsConfigDto = {
  /* 短信服务端点 */
  endpoint?: string | null
  /* 短信签名名称 */
  signName?: string | null
  /* 验证码长度 */
  verifyCodeLength?: number | null
  /* 验证码过期时间（秒） */
  verifyCodeExpire?: number | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [SiteConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type SiteConfigDto = {
  /* 站点名称 */
  siteName?: string | null
  /* 站点描述 */
  siteDescription?: string | null
  /* 站点关键词（SEO用） */
  siteKeywords?: string | null
  /* 站点Logo URL */
  siteLogo?: string | null
  /* 站点图标 URL */
  siteFavicon?: string | null
  /* 联系邮箱 */
  contactEmail?: string | null
  /* ICP备案号 */
  icpNumber?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [MaintenanceConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type MaintenanceConfigDto = {
  /* 是否启用维护模式 */
  enableMaintenanceMode?: boolean | null
  /* 维护模式提示信息 */
  maintenanceMessage?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ContentReviewPolicyDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type ContentReviewPolicyDto = {
  /* 严重敏感词处理策略 */
  severeAction?: ContentReviewActionDto
  /* 一般敏感词处理策略 */
  generalAction?: ContentReviewActionDto
  /* 轻微敏感词处理策略 */
  lightAction?: ContentReviewActionDto
  /* 是否记录敏感词命中明细 */
  recordHits?: boolean | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [ContentReviewActionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type ContentReviewActionDto = {
  /* 审核状态：0=待审核，1=已通过，2=已拒绝（0=PENDING，1=APPROVED，2=REJECTED） */
  auditStatus?: number | null
  /* 是否隐藏 */
  isHidden?: boolean | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UploadConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type UploadConfigDto = {
  /* 上传提供方：local=本地存储，qiniu=七牛云存储，superbed=Superbed图床（local=LOCAL，qiniu=QINIU，superbed=SUPERBED） */
  provider?: string | null
  /* 当 provider 为 superbed 时，非图片文件是否自动回落本地 */
  superbedNonImageFallbackToLocal?: boolean | null
  /* 七牛上传配置 */
  qiniu?: QiniuUploadConfigDto
  /* Superbed 上传配置 */
  superbed?: SuperbedUploadConfigDto

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [QiniuUploadConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type QiniuUploadConfigDto = {
  /* 七牛 AccessKey（敏感字段，前端输入明文或 RSA 加密值） */
  accessKey?: string | null
  /* 七牛 SecretKey（敏感字段，前端输入明文或 RSA 加密值） */
  secretKey?: string | null
  /* 七牛存储空间 bucket */
  bucket?: string | null
  /* 七牛公开访问域名 */
  domain?: string | null
  /* 七牛区域 ID，留空时自动查询 */
  region?: string | null
  /* 七牛对象前缀 */
  pathPrefix?: string | null
  /* 是否使用 HTTPS */
  useHttps?: boolean | null
  /* 上传凭证有效期（秒） */
  tokenExpires?: number | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [SuperbedUploadConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type SuperbedUploadConfigDto = {
  /* Superbed token（敏感字段，前端输入明文或 RSA 加密值） */
  token?: string | null
  /* Superbed 相册分类，多个使用英文逗号分隔 */
  categories?: string | null
  /* 是否开启水印 */
  watermark?: boolean | null
  /* 是否开启压缩 */
  compress?: boolean | null
  /* 是否强制转 webp */
  webp?: boolean | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [SystemConfigBodyDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
 */
export type SystemConfigBodyDto = {
  /* 最后修改人ID */
  updatedById?: number | null
  /* 阿里云配置 */
  aliyunConfig?: AliyunConfigDto
  /* 站点配置 */
  siteConfig?: SiteConfigDto
  /* 维护配置 */
  maintenanceConfig?: MaintenanceConfigDto
  /* 内容审核策略 */
  contentReviewPolicy?: ContentReviewPolicyDto
  /* 上传配置 */
  uploadConfig?: UploadConfigDto
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}