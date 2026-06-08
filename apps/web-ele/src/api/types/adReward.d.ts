/**
 *  类型定义 [AdRewardProviderPageRequest]
 *  @来源 广告激励
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdRewardProviderPageRequest = {
  /* provider 应用 ID */
  appId?: string;

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

  /* 目标范围（1=低价章节；2=新用户冷启动；3=运营白名单） */
  targetScope?: number;
};

export type AdRewardProviderPageResponse = {
  /* 列表数据 */
  list?: BaseAdProviderConfigDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

export type AdRewardCredentialOptionListResponse =
  AdRewardCredentialOptionDto[];

/**
 *  类型定义 [AdRewardRecordPageRequest]
 *  @来源 广告激励
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdRewardRecordPageRequest = {
  /* 广告 provider 配置 ID */
  adProviderConfigId?: number;

  /* 结束时间 */
  endDate?: string;

  /* 运行环境（1=沙箱；2=正式） */
  environment?: number;

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

  /* provider 奖励唯一 ID */
  providerRewardId?: string;

  /* 开始时间 */
  startDate?: string;

  /* 广告状态（1=奖励成功；2=奖励失败；3=已撤销） */
  status?: number;

  /* 目标 ID */
  targetId?: number;

  /* 目标范围（1=低价章节；2=新用户冷启动；3=运营白名单） */
  targetScope?: number;

  /* 目标类型（1=漫画章节；2=小说章节） */
  targetType?: number;

  /* 用户 ID */
  userId?: number;
};

export type AdRewardRecordPageResponse = {
  /* 列表数据 */
  list?: AdminAdRewardRecordPageItemDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [AdRewardRecordDetailRequest]
 *  @来源 广告激励
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdRewardRecordDetailRequest = {
  id: number;
};

export type AdRewardRecordDetailResponse = AdminAdRewardRecordDetailDto;

/**
 *  类型定义 [AdRewardRecordReconcilePageRequest]
 *  @来源 广告激励
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdRewardRecordReconcilePageRequest = {
  /* 广告 provider 配置 ID */
  adProviderConfigId?: number;

  /* 结束时间 */
  endDate?: string;

  /* 运行环境（1=沙箱；2=正式） */
  environment?: number;

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

  /* provider 奖励唯一 ID */
  providerRewardId?: string;

  /* 开始时间 */
  startDate?: string;

  /* 广告状态（1=奖励成功；2=奖励失败；3=已撤销） */
  status?: number;

  /* 目标 ID */
  targetId?: number;

  /* 目标范围（1=低价章节；2=新用户冷启动；3=运营白名单） */
  targetScope?: number;

  /* 目标类型（1=漫画章节；2=小说章节） */
  targetType?: number;

  /* 用户 ID */
  userId?: number;
};

export type AdRewardRecordReconcilePageResponse = {
  /* 列表数据 */
  list?: AdminAdRewardReconcileItemDto[];

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
 *  类型定义 [AdRewardRecordRevokeRequest]
 *  @来源 广告激励
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdRewardRecordRevokeRequest = AdRewardRevokeDto;

export type AdRewardRecordRevokeResponse = boolean;

/**
 *  类型定义 [BaseAdProviderConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseAdProviderConfigDto = {
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
 *  类型定义 [AdRewardCredentialOptionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdRewardCredentialOptionDto = {
  /* SSV 密钥版本引用 */
  credentialVersionRef: string;
  /* 不可选原因 */
  disabledReason?: null | string;
  /* 运行环境（1=沙箱；2=正式） */
  environment: 1 | 2;
  /* 密钥指纹 */
  fingerprint: string;
  /* 选项展示名 */
  label: string;
  /* 广告 provider（1=穿山甲；2=腾讯优量汇） */
  provider: 1 | 2;
  /* 选项状态 */
  status: string;
  /* 选项值 */
  value: string;
};

/**
 *  类型定义 [AdminAdRewardRecordPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminAdRewardRecordPageItemDto = {
  /* 广告 provider 配置 ID */
  adProviderConfigId: number;
  /* 广告 provider 配置版本快照 */
  adProviderConfigVersion: number;
  /* 创建时间 */
  createdAt: string;
  /* SSV 密钥版本引用快照 */
  credentialVersionRef: string;
  /* 主键id */
  id: number;
  /* 广告位 key */
  placementKey: string;
  /* provider 奖励唯一 ID */
  providerRewardId: string;
  /* 广告状态（1=奖励成功；2=奖励失败；3=已撤销） */
  status: 1 | 2 | 3;
  /* 目标 ID */
  targetId: number;
  /* 目标范围（1=低价章节；2=新用户冷启动；3=运营白名单） */
  targetScope: 1 | 2 | 3;
  /* 目标类型（1=漫画章节；2=小说章节） */
  targetType: 1 | 2 | 3 | 4;
  /* 更新时间 */
  updatedAt: string;
  /* 用户 ID */
  userId: number;
};

/**
 *  类型定义 [AdminAdRewardRecordDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminAdRewardRecordDetailDto = {
  /* 广告 provider 配置版本快照 */
  adProviderConfigVersion: number;
  /* 客户端上下文摘要（敏感字段已过滤） */
  clientContext?: null | Record<string, any>;
  /* 创建时间 */
  createdAt: string;
  /* 主键id */
  id: number;
  /* 广告位 key */
  placementKey: string;
  /* 广告状态（1=奖励成功；2=奖励失败；3=已撤销） */
  status: 1 | 2 | 3;
  /* 目标 ID */
  targetId: number;
  /* 目标范围（1=低价章节；2=新用户冷启动；3=运营白名单） */
  targetScope: 1 | 2 | 3;
  /* 目标类型（1=漫画章节；2=小说章节） */
  targetType: 1 | 2 | 3 | 4;
  /* 更新时间 */
  updatedAt: string;
  /* 用户 ID */
  userId: number;
  /* 服务端验证摘要 payload（不含 provider 原始回调） */
  verifyPayload?: null | Record<string, any>;
};

/**
 *  类型定义 [AdminAdRewardReconcileItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminAdRewardReconcileItemDto = {
  /* 广告 provider 配置 ID */
  adProviderConfigId: number;
  /* 广告 provider 配置版本快照 */
  adProviderConfigVersion: number;
  /* 创建时间 */
  createdAt: string;
  /* SSV 密钥版本引用快照 */
  credentialVersionRef: string;
  /* 权益过期时间 */
  entitlementExpiresAt?: null | string;
  /* 主键id */
  id: number;
  /* 广告位 key */
  placementKey: string;
  /* provider 奖励唯一 ID */
  providerRewardId: string;
  /* 对账说明 */
  reconcileMessage: string;
  /* 对账状态 */
  reconcileStatus: string;
  /* 广告状态（1=奖励成功；2=奖励失败；3=已撤销） */
  status: 1 | 2 | 3;
  /* 目标 ID */
  targetId: number;
  /* 目标范围（1=低价章节；2=新用户冷启动；3=运营白名单） */
  targetScope: 1 | 2 | 3;
  /* 目标类型（1=漫画章节；2=小说章节） */
  targetType: 1 | 2 | 3 | 4;
  /* 更新时间 */
  updatedAt: string;
  /* 用户 ID */
  userId: number;
};

/**
 *  类型定义 [CreateAdProviderConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateAdProviderConfigDto = {
  /* provider 应用 ID */
  appId?: null | string;
  /* 广告回调地址 */
  callbackUrl?: null | string;
  /* 客户端应用键 */
  clientAppKey?: null | string;
  /* SSV 密钥选项引用，由服务端映射为密钥版本和安全摘要 */
  credentialOptionRef: string;
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
  /* provider 应用 ID */
  appId?: null | string;
  /* 广告回调地址 */
  callbackUrl?: null | string;
  /* 客户端应用键 */
  clientAppKey?: null | string;
  /* SSV 密钥选项引用，由服务端映射为密钥版本和安全摘要 */
  credentialOptionRef?: string;
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
  /* 主键id */
  id: number;
  /* 状态 true启用 false禁用 */
  isEnabled: boolean;
};

/**
 *  类型定义 [AdRewardRevokeDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdRewardRevokeDto = {
  /* 主键id */
  id: number;
  /* 撤销原因 */
  reason?: null | string;
};
