export type AppConfigActiveResponse = BaseAppConfigDto

/**
 *  类型定义 [AppConfigUpdateRequest]
 *  @来源 APP管理/应用配置
 *  @更新时间 2026-04-08 08:36:51
 */
export type AppConfigUpdateRequest = UpdateAppConfigDto

export type AppConfigUpdateResponse = boolean

/**
 *  类型定义 [BaseAppConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type BaseAppConfigDto = {
  /* 主键id */
  id: number
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 应用名称 */
  appName: string
  /* 应用描述 */
  appDesc?: string | null
  /* 应用 Logo URL */
  appLogo?: string | null
  /* 引导页图片 URL */
  onboardingImage?: string | null
  /* 主题色 */
  themeColor: string
  /* 第二主题色 */
  secondaryColor?: string | null
  /* 可选的主题色 */
  optionalThemeColors?: string | null
  /* 是否启用维护模式 */
  enableMaintenanceMode: boolean
  /* 维护模式提示信息 */
  maintenanceMessage?: string | null
  /* 配置版本号 */
  version: string
  /* 最后修改人ID */
  updatedById?: number | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateAppConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type UpdateAppConfigDto = {
  /* 应用名称 */
  appName: string
  /* 应用描述 */
  appDesc?: string | null
  /* 应用 Logo URL */
  appLogo?: string | null
  /* 引导页图片 URL */
  onboardingImage?: string | null
  /* 主题色 */
  themeColor: string
  /* 第二主题色 */
  secondaryColor?: string | null
  /* 可选的主题色 */
  optionalThemeColors?: string | null
  /* 是否启用维护模式 */
  enableMaintenanceMode: boolean
  /* 维护模式提示信息 */
  maintenanceMessage?: string | null
  /* 配置版本号 */
  version: string

  /** 任意合法数值 */
  [property: string]: any
}