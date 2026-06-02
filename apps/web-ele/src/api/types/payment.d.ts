/**
 *  类型定义 [PaymentProviderPageRequest]
 *  @来源 支付管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type PaymentProviderPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 支付渠道（1=支付宝；2=微信） */
  channel?: number;

  /* 客户端应用键，同一部署内区分多应用 */
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

  /* 支付场景（1=App；2=H5；3=小程序） */
  paymentScene?: number;

  /* 客户端平台（1=Android；2=iOS；3=HarmonyOS；4=Web；5=小程序） */
  platform?: number;

  /* 开始时间 */
  startDate?: string;
};

export type PaymentProviderPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BasePaymentProviderConfigDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [PaymentProviderCreateRequest]
 *  @来源 支付管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type PaymentProviderCreateRequest = CreatePaymentProviderConfigDto;

export type PaymentProviderCreateResponse = boolean;

/**
 *  类型定义 [PaymentProviderUpdateRequest]
 *  @来源 支付管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type PaymentProviderUpdateRequest = UpdatePaymentProviderConfigDto;

export type PaymentProviderUpdateResponse = boolean;

/**
 *  类型定义 [PaymentProviderUpdateStatusRequest]
 *  @来源 支付管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type PaymentProviderUpdateStatusRequest = UpdateEnabledStatusDto;

export type PaymentProviderUpdateStatusResponse = boolean;

/**
 *  类型定义 [PaymentOrderPageRequest]
 *  @来源 支付管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type PaymentOrderPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: string;

  /* 排序字段，json格式 */
  orderBy?: string;

  /* 订单业务类型（1=虚拟币充值；2=VIP 订阅） */
  orderType?: number;

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 单页大小，最大500，默认15 */
  pageSize?: number;

  /* 开始时间 */
  startDate?: string;

  /* 订单状态（1=待支付；2=已支付；3=已关闭；4=退款中；5=已退款） */
  status?: number;
};

export type PaymentOrderPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: AdminPaymentOrderPageItemDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [PaymentOrderUpdateStatusRequest]
 *  @来源 支付管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type PaymentOrderUpdateStatusRequest = ConfirmPaymentOrderDto;

export type PaymentOrderUpdateStatusResponse = PaymentOrderResultDto;

/**
 *  类型定义 [BasePaymentProviderConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BasePaymentProviderConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* H5 允许返回域名列表 */
  allowedReturnDomains?: string[];
  /* 微信 APIv3 key 引用 */
  apiV3KeyRef?: null | string;
  /* 应用证书引用 */
  appCertRef?: null | string;
  /* provider 应用 ID */
  appId?: null | string;
  /* 证书模式（1=普通密钥；2=证书模式） */
  certMode?: null | number;
  /* 支付渠道（1=支付宝；2=微信） */
  channel: 1 | 2;
  /* 客户端应用键，同一部署内区分多应用 */
  clientAppKey?: null | string;
  /* 配置摘要，不包含明文密钥 */
  configMetadata?: null | Record<string, any>;
  /* 配置名称，供后台识别 */
  configName?: null | string;
  /* 配置版本 */
  configVersion?: null | number;
  /* 创建时间 */
  createdAt: string;
  /* 密钥版本引用 */
  credentialVersionRef: string;
  /* 运行环境（1=沙箱；2=正式） */
  environment: 1 | 2;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* provider 商户 ID */
  mchId?: null | string;
  /* 通知回调地址 */
  notifyUrl?: null | string;
  /* 支付场景（1=App；2=H5；3=小程序） */
  paymentScene: 1 | 2 | 3;
  /* 客户端平台（1=Android；2=iOS；3=HarmonyOS；4=Web；5=小程序） */
  platform: 1 | 2 | 3 | 4 | 5;
  /* 平台证书引用 */
  platformCertRef?: null | string;
  /* 应用私钥引用 */
  privateKeyRef?: null | string;
  /* 支付宝公钥引用 */
  publicKeyRef?: null | string;
  /* H5 返回地址 */
  returnUrl?: null | string;
  /* 根证书引用 */
  rootCertRef?: null | string;
  /* 排序值 */
  sortOrder?: null | number;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CreatePaymentProviderConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreatePaymentProviderConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* H5 允许返回域名列表 */
  allowedReturnDomains?: string[];
  /* 微信 APIv3 key 引用 */
  apiV3KeyRef?: null | string;
  /* 应用证书引用 */
  appCertRef?: null | string;
  /* provider 应用 ID */
  appId?: null | string;
  /* 证书模式（1=普通密钥；2=证书模式） */
  certMode?: null | number;
  /* 支付渠道（1=支付宝；2=微信） */
  channel: 1 | 2;
  /* 客户端应用键，同一部署内区分多应用 */
  clientAppKey?: null | string;
  /* 配置摘要，不包含明文密钥 */
  configMetadata?: null | Record<string, any>;
  /* 配置名称，供后台识别 */
  configName?: null | string;
  /* 配置版本 */
  configVersion?: null | number;
  /* 密钥版本引用 */
  credentialVersionRef: string;
  /* 运行环境（1=沙箱；2=正式） */
  environment: 1 | 2;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* provider 商户 ID */
  mchId?: null | string;
  /* 通知回调地址 */
  notifyUrl?: null | string;
  /* 支付场景（1=App；2=H5；3=小程序） */
  paymentScene: 1 | 2 | 3;
  /* 客户端平台（1=Android；2=iOS；3=HarmonyOS；4=Web；5=小程序） */
  platform: 1 | 2 | 3 | 4 | 5;
  /* 平台证书引用 */
  platformCertRef?: null | string;
  /* 应用私钥引用 */
  privateKeyRef?: null | string;
  /* 支付宝公钥引用 */
  publicKeyRef?: null | string;
  /* H5 返回地址 */
  returnUrl?: null | string;
  /* 根证书引用 */
  rootCertRef?: null | string;

  /* 排序值 */
  sortOrder?: null | number;
};

/**
 *  类型定义 [UpdatePaymentProviderConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdatePaymentProviderConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* H5 允许返回域名列表 */
  allowedReturnDomains?: string[];
  /* 微信 APIv3 key 引用 */
  apiV3KeyRef?: null | string;
  /* 应用证书引用 */
  appCertRef?: null | string;
  /* provider 应用 ID */
  appId?: null | string;
  /* 证书模式（1=普通密钥；2=证书模式） */
  certMode?: null | number;
  /* 支付渠道（1=支付宝；2=微信） */
  channel?: 1 | 2;
  /* 客户端应用键，同一部署内区分多应用 */
  clientAppKey?: null | string;
  /* 配置摘要，不包含明文密钥 */
  configMetadata?: null | Record<string, any>;
  /* 配置名称，供后台识别 */
  configName?: null | string;
  /* 配置版本 */
  configVersion?: null | number;
  /* 密钥版本引用 */
  credentialVersionRef?: string;
  /* 运行环境（1=沙箱；2=正式） */
  environment?: 1 | 2;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* provider 商户 ID */
  mchId?: null | string;
  /* 通知回调地址 */
  notifyUrl?: null | string;
  /* 支付场景（1=App；2=H5；3=小程序） */
  paymentScene?: 1 | 2 | 3;
  /* 客户端平台（1=Android；2=iOS；3=HarmonyOS；4=Web；5=小程序） */
  platform?: 1 | 2 | 3 | 4 | 5;
  /* 平台证书引用 */
  platformCertRef?: null | string;
  /* 应用私钥引用 */
  privateKeyRef?: null | string;
  /* 支付宝公钥引用 */
  publicKeyRef?: null | string;
  /* H5 返回地址 */
  returnUrl?: null | string;
  /* 根证书引用 */
  rootCertRef?: null | string;

  /* 排序值 */
  sortOrder?: null | number;
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

/**
 *  类型定义 [AdminPaymentOrderPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminPaymentOrderPageItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 支付渠道（1=支付宝；2=微信） */
  channel: 1 | 2;
  /* 客户端应用键 */
  clientAppKey: string;
  /* 关闭时间 */
  closedAt?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 下单时密钥版本引用快照 */
  credentialVersionRef: string;
  /* 运行环境（1=沙箱；2=正式） */
  environment: 1 | 2;
  /* 主键id */
  id: number;
  /* 站内订单号 */
  orderNo: string;
  /* 订单业务类型（1=虚拟币充值；2=VIP 订阅） */
  orderType: 1 | 2;
  /* 实付金额，单位为分 */
  paidAmount: number;
  /* 支付完成时间 */
  paidAt?: null | string;
  /* 应付金额，单位为分 */
  payableAmount: number;
  /* 支付场景（1=App；2=H5；3=小程序） */
  paymentScene: 1 | 2 | 3;
  /* 客户端平台（1=Android；2=iOS；3=HarmonyOS；4=Web；5=小程序） */
  platform: 1 | 2 | 3 | 4 | 5;
  /* 支付 provider 配置 ID */
  providerConfigId: number;
  /* 下单时 provider 配置版本快照 */
  providerConfigVersion: number;
  /* 第三方交易号 */
  providerTradeNo?: null | string;
  /* 退款完成时间 */
  refundedAt?: null | string;
  /* 订单状态（1=待支付；2=已支付；3=已关闭；4=退款中；5=已退款） */
  status: 1 | 2 | 3 | 4 | 5;
  /* 订阅模式（1=一次性） */
  subscriptionMode: 1;
  /* 业务目标 ID，例如充值包 ID 或 VIP 套餐 ID */
  targetId: number;
  /* 更新时间 */
  updatedAt: string;

  /* 用户 ID */
  userId: number;
};

/**
 *  类型定义 [ConfirmPaymentOrderDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type ConfirmPaymentOrderDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 原始通知 payload */
  notifyPayload?: null | Record<string, any>;
  /* 站内订单号 */
  orderNo: string;
  /* 实付金额，单位为分 */
  paidAmount?: null | number;

  /* 第三方交易号 */
  providerTradeNo?: null | string;
};

/**
 *  类型定义 [PaymentOrderResultDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type PaymentOrderResultDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 客户端支付参数 */
  clientPayPayload: Record<string, any>;
  /* 站内订单号 */
  orderNo: string;
  /* 订单业务类型（1=虚拟币充值；2=VIP 订阅） */
  orderType: 1 | 2;
  /* 应付金额，单位为分 */
  payableAmount: number;
  /* 订单状态（1=待支付；2=已支付；3=已关闭；4=退款中；5=已退款） */
  status: 1 | 2 | 3 | 4 | 5;

  /* 订阅模式（1=一次性） */
  subscriptionMode?: 1 | null;
};
