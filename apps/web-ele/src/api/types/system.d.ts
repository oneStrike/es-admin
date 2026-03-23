export type SystemConfigResponse = BaseSystemConfigDto

/**
 *  类型定义 [SystemUpdateRequest]
 *  @来源 系统管理/系统配置
 *  @更新时间 2026-03-23 16:50:34
 */
export type SystemUpdateRequest = SystemConfigBodyDto

export type SystemUpdateResponse = boolean

/**
 *  类型定义 [BaseSystemConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type BaseSystemConfigDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 阿里云配置 */
  aliyunConfig?: AliyunConfigDto
  /* 内容审核策略 */
  contentReviewPolicy?: ContentReviewPolicyDto
  /* 创建时间 */
  createdAt: string
  /* 主键id */
  id: number
  /* 维护配置 */
  maintenanceConfig?: MaintenanceConfigDto
  /* 站点配置 */
  siteConfig?: SiteConfigDto
  /* 更新时间 */
  updatedAt: string
  /* 最后修改人ID */
  updatedById?: null | number

  /* 上传配置 */
  uploadConfig?: UploadConfigDto
}

/**
 *  类型定义 [AliyunConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type AliyunConfigDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* AccessKey ID（敏感字段，前端输入明文或 RSA 加密值） */
  accessKeyId?: null | string
  /* AccessKey Secret（敏感字段，前端输入明文或 RSA 加密值） */
  accessKeySecret?: null | string

  /* 短信服务配置 */
  sms?: AliyunSmsConfigDto
}

/**
 *  类型定义 [AliyunSmsConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type AliyunSmsConfigDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 短信服务端点 */
  endpoint?: null | string
  /* 短信签名名称 */
  signName?: null | string
  /* 验证码过期时间（秒） */
  verifyCodeExpire?: null | number

  /* 验证码长度 */
  verifyCodeLength?: null | number
}

/**
 *  类型定义 [SiteConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type SiteConfigDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 联系邮箱 */
  contactEmail?: null | string
  /* ICP备案号 */
  icpNumber?: null | string
  /* 站点描述 */
  siteDescription?: null | string
  /* 站点图标 URL */
  siteFavicon?: null | string
  /* 站点关键词（SEO用） */
  siteKeywords?: null | string
  /* 站点Logo URL */
  siteLogo?: null | string

  /* 站点名称 */
  siteName?: null | string
}

/**
 *  类型定义 [MaintenanceConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type MaintenanceConfigDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 是否启用维护模式 */
  enableMaintenanceMode?: boolean | null

  /* 维护模式提示信息 */
  maintenanceMessage?: null | string
}

/**
 *  类型定义 [ContentReviewPolicyDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type ContentReviewPolicyDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 一般敏感词处理策略 */
  generalAction?: ContentReviewActionDto
  /* 轻微敏感词处理策略 */
  lightAction?: ContentReviewActionDto
  /* 是否记录敏感词命中明细 */
  recordHits?: boolean | null

  /* 严重敏感词处理策略 */
  severeAction?: ContentReviewActionDto
}

/**
 *  类型定义 [ContentReviewActionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type ContentReviewActionDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 审核状态：0=待审核，1=已通过，2=已拒绝（0=PENDING，1=APPROVED，2=REJECTED） */
  auditStatus?: null | number

  /* 是否隐藏 */
  isHidden?: boolean | null
}

/**
 *  类型定义 [UploadConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type UploadConfigDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 上传提供方：local=本地存储，qiniu=七牛云存储，superbed=Superbed图床（local=LOCAL，qiniu=QINIU，superbed=SUPERBED） */
  provider?: null | string
  /* 七牛上传配置 */
  qiniu?: QiniuUploadConfigDto
  /* Superbed 上传配置 */
  superbed?: SuperbedUploadConfigDto

  /* 当 provider 为 superbed 时，非图片文件是否自动回落本地 */
  superbedNonImageFallbackToLocal?: boolean | null
}

/**
 *  类型定义 [QiniuUploadConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type QiniuUploadConfigDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 七牛 AccessKey（敏感字段，前端输入明文或 RSA 加密值） */
  accessKey?: null | string
  /* 七牛存储空间 bucket */
  bucket?: null | string
  /* 七牛公开访问域名 */
  domain?: null | string
  /* 七牛对象前缀 */
  pathPrefix?: null | string
  /* 七牛区域 ID，留空时自动查询 */
  region?: null | string
  /* 七牛 SecretKey（敏感字段，前端输入明文或 RSA 加密值） */
  secretKey?: null | string
  /* 上传凭证有效期（秒） */
  tokenExpires?: null | number

  /* 是否使用 HTTPS */
  useHttps?: boolean | null
}

/**
 *  类型定义 [SuperbedUploadConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type SuperbedUploadConfigDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* Superbed 相册分类，多个使用英文逗号分隔 */
  categories?: null | string
  /* 是否开启压缩 */
  compress?: boolean | null
  /* Superbed token（敏感字段，前端输入明文或 RSA 加密值） */
  token?: null | string
  /* 是否开启水印 */
  watermark?: boolean | null

  /* 是否强制转 webp */
  webp?: boolean | null
}

/**
 *  类型定义 [SystemConfigBodyDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-23 16:50:34
 */
export type SystemConfigBodyDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 阿里云配置 */
  aliyunConfig?: AliyunConfigDto
  /* 内容审核策略 */
  contentReviewPolicy?: ContentReviewPolicyDto
  /* 主键id */
  id: number
  /* 维护配置 */
  maintenanceConfig?: MaintenanceConfigDto
  /* 站点配置 */
  siteConfig?: SiteConfigDto
  /* 最后修改人ID */
  updatedById?: null | number

  /* 上传配置 */
  uploadConfig?: UploadConfigDto
}