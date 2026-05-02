export type AppConfigActiveResponse = BaseAppConfigDto;

/**
 *  类型定义 [AppConfigUpdateRequest]
 *  @来源 APP管理/应用配置
 *  @更新时间 2026-05-02 22:38:19
 */
export type AppConfigUpdateRequest = UpdateAppConfigDto;

export type AppConfigUpdateResponse = boolean;

/**
 *  类型定义 [BaseAppConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-02 22:38:19
 */
export type BaseAppConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 应用描述 */
  appDesc?: null | string;
  /* 应用 Logo URL */
  appLogo?: null | string;
  /* 应用名称 */
  appName: string;
  /* 创建时间 */
  createdAt: string;
  /* 是否启用维护模式 */
  enableMaintenanceMode: boolean;
  /* 主键id */
  id: number;
  /* 维护模式提示信息 */
  maintenanceMessage?: null | string;
  /* 引导页图片 URL */
  onboardingImage?: null | string;
  /* 可选的主题色 */
  optionalThemeColors?: null | string;
  /* 第二主题色 */
  secondaryColor?: null | string;
  /* 主题色 */
  themeColor: string;
  /* 更新时间 */
  updatedAt: string;
  /* 最后修改人ID */
  updatedById?: null | number;

  /* 配置版本号 */
  version: string;
};

/**
 *  类型定义 [UpdateAppConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-02 22:38:19
 */
export type UpdateAppConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 应用描述 */
  appDesc?: null | string;
  /* 应用 Logo URL */
  appLogo?: null | string;
  /* 应用名称 */
  appName: string;
  /* 是否启用维护模式 */
  enableMaintenanceMode: boolean;
  /* 维护模式提示信息 */
  maintenanceMessage?: null | string;
  /* 引导页图片 URL */
  onboardingImage?: null | string;
  /* 可选的主题色 */
  optionalThemeColors?: null | string;
  /* 第二主题色 */
  secondaryColor?: null | string;
  /* 主题色 */
  themeColor: string;

  /* 配置版本号 */
  version: string;
};
