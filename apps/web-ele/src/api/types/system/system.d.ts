export type SystemConfigResponse = BaseSystemConfigDto

/**
 *  类型定义 [SystemUpdateRequest]
 *  @来源 系统管理/系统配置
 *  @更新时间 2026-03-19 21:17:36
 */
export type SystemUpdateRequest = SystemConfigBodyDto

export type SystemUpdateResponse = boolean

/**
 *  类型定义 [BaseSystemConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type BaseSystemConfigDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 阿里云配置（jsonb） */
  aliyunConfig?: null | string
  /* 内容审核策略（jsonb） */
  contentReviewPolicy?: null | string
  /* 创建时间 */
  createdAt: string
  /* 主键id */
  id: number
  /* 维护配置（jsonb） */
  maintenanceConfig?: null | string
  /* 站点配置（jsonb） */
  siteConfig?: null | string
  /* 更新时间 */
  updatedAt: string
  /* 最后修改人ID */
  updatedById?: null | number

  /* 上传配置（jsonb） */
  uploadConfig?: null | string
}

/**
 *  类型定义 [SystemConfigBodyDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
 */
export type SystemConfigBodyDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 阿里云配置（jsonb） */
  aliyunConfig?: null | string
  /* 内容审核策略（jsonb） */
  contentReviewPolicy?: null | string
  /* 主键id */
  id: number
  /* 维护配置（jsonb） */
  maintenanceConfig?: null | string
  /* 站点配置（jsonb） */
  siteConfig?: null | string
  /* 最后修改人ID */
  updatedById?: null | number

  /* 上传配置（jsonb） */
  uploadConfig?: null | string
}