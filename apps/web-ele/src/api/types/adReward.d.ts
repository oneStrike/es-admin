/**
 *  类型定义 [AdRewardProviderPageRequest]
 *  @来源 广告激励
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdRewardProviderPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 客户端应用键 */
  clientAppKey?: string;

  /* 结束时间 */
  endDate?: string;

  /* 运行环境（1=沙箱；2=正式） */
  environment?: number;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 排序字段，json格式 */
  orderBy?: string;

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 单页大小，最大500，默认15 */
  pageSize?: number;

  /* 广告位 key */
  placementKey?: string;

  /* 客户端平台（1=Android；2=iOS；3=HarmonyOS；4=Web；5=小程序） */
  platform?: number;

  /* 广告 provider（1=穿山甲；2=腾讯优量汇） */
  provider?: number;

  /* 开始时间 */
  startDate?: string;
};

export type AdRewardProviderPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseAdProviderConfigDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [AdRewardProviderCreateRequest]
 *  @来源 广告激励
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdRewardProviderCreateRequest = CreateAdProviderConfigDto;

export type AdRewardProviderCreateResponse = boolean;

/**
 *  类型定义 [AdRewardProviderUpdateRequest]
 *  @来源 广告激励
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdRewardProviderUpdateRequest = UpdateAdProviderConfigDto;

export type AdRewardProviderUpdateResponse = boolean;

/**
 *  类型定义 [AdRewardProviderUpdateStatusRequest]
 *  @来源 广告激励
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdRewardProviderUpdateStatusRequest = UpdateEnabledStatusDto;

export type AdRewardProviderUpdateStatusResponse = boolean;

/**
 *  类型定义 [BaseAdProviderConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseAdProviderConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* provider 应用 ID */
  appId?: null | string;
  /* 广告回调地址 */
  callbackUrl?: null | string;
  /* 客户端应用键 */
  clientAppKey?: null | string;
  /* 配置摘要，不包含明文密钥 */
  configMetadata?: null | Record<string, any>;
  /* 配置版本 */
  configVersion?: null | number;
  /* 创建时间 */
  createdAt: string;
  /* SSV 密钥版本引用 */
  credentialVersionRef: string;
  /* 每日次数上限，0=不限制 */
  dailyLimit?: null | number;
  /* 运行环境（1=沙箱；2=正式） */
  environment: 1 | 2;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 广告位 key */
  placementKey: string;
  /* 客户端平台（1=Android；2=iOS；3=HarmonyOS；4=Web；5=小程序） */
  platform: 1 | 2 | 3 | 4 | 5;
  /* 广告 provider（1=穿山甲；2=腾讯优量汇） */
  provider: 1 | 2;
  /* 排序值 */
  sortOrder?: null | number;
  /* 目标范围（1=低价章节；2=新用户冷启动；3=运营白名单） */
  targetScope: 1 | 2 | 3;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CreateAdProviderConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateAdProviderConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* provider 应用 ID */
  appId?: null | string;
  /* 广告回调地址 */
  callbackUrl?: null | string;
  /* 客户端应用键 */
  clientAppKey?: null | string;
  /* 配置摘要，不包含明文密钥 */
  configMetadata?: null | Record<string, any>;
  /* 配置版本 */
  configVersion?: null | number;
  /* SSV 密钥版本引用 */
  credentialVersionRef: string;
  /* 每日次数上限，0=不限制 */
  dailyLimit?: null | number;
  /* 运行环境（1=沙箱；2=正式） */
  environment: 1 | 2;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 广告位 key */
  placementKey: string;
  /* 客户端平台（1=Android；2=iOS；3=HarmonyOS；4=Web；5=小程序） */
  platform: 1 | 2 | 3 | 4 | 5;
  /* 广告 provider（1=穿山甲；2=腾讯优量汇） */
  provider: 1 | 2;
  /* 排序值 */
  sortOrder?: null | number;

  /* 目标范围（1=低价章节；2=新用户冷启动；3=运营白名单） */
  targetScope: 1 | 2 | 3;
};

/**
 *  类型定义 [UpdateAdProviderConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateAdProviderConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* provider 应用 ID */
  appId?: null | string;
  /* 广告回调地址 */
  callbackUrl?: null | string;
  /* 客户端应用键 */
  clientAppKey?: null | string;
  /* 配置摘要，不包含明文密钥 */
  configMetadata?: null | Record<string, any>;
  /* 配置版本 */
  configVersion?: null | number;
  /* SSV 密钥版本引用 */
  credentialVersionRef?: string;
  /* 每日次数上限，0=不限制 */
  dailyLimit?: null | number;
  /* 运行环境（1=沙箱；2=正式） */
  environment?: 1 | 2;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 广告位 key */
  placementKey?: string;
  /* 客户端平台（1=Android；2=iOS；3=HarmonyOS；4=Web；5=小程序） */
  platform?: 1 | 2 | 3 | 4 | 5;
  /* 广告 provider（1=穿山甲；2=腾讯优量汇） */
  provider?: 1 | 2;
  /* 排序值 */
  sortOrder?: null | number;

  /* 目标范围（1=低价章节；2=新用户冷启动；3=运营白名单） */
  targetScope?: 1 | 2 | 3;
};

/**
 *  类型定义 [UpdateEnabledStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateEnabledStatusDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 状态 true启用 false禁用 */
  isEnabled: boolean;
};
