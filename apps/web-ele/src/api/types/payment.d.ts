/**
 *  类型定义 [PaymentProviderPageRequest]
 *  @来源 支付管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type PaymentProviderPageRequest = {
  /* 支付渠道（1=支付宝；2=微信） */
  channel?: 1 | 2;

  /* 客户端应用键，同一部署内区分多应用 */
  clientAppKey?: string;

  /* 结束时间 */
  endDate?: null | string;

  /* 运行环境（1=沙箱；2=正式） */
  environment?: 1 | 2;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 支付场景（1=App；2=H5；3=小程序） */
  paymentScene?: 1 | 2 | 3;

  /* 客户端平台（1=安卓端；2=苹果端；3=鸿蒙端；4=网页端；5=小程序） */
  platform?: 1 | 2 | 3 | 4 | 5;

  /* 开始时间 */
  startDate?: null | string;
};

export type PaymentProviderPageResponse = {
  /* 列表数据 */
  list?: AdminPaymentProviderConfigPageItemDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [PaymentProviderAccountOptionListRequest]
 *  @来源 支付管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type PaymentProviderAccountOptionListRequest = {
  /* 支付渠道（1=支付宝；2=微信） */
  channel?: 1 | 2;

  /* 客户端应用键，同一部署内区分多应用 */
  clientAppKey?: string;

  /* 结束时间 */
  endDate?: null | string;

  /* 运行环境（1=沙箱；2=正式） */
  environment?: 1 | 2;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 支付场景（1=App；2=H5；3=小程序） */
  paymentScene?: 1 | 2 | 3;

  /* 客户端平台（1=安卓端；2=苹果端；3=鸿蒙端；4=网页端；5=小程序） */
  platform?: 1 | 2 | 3 | 4 | 5;

  /* 开始时间 */
  startDate?: null | string;
};

export type PaymentProviderAccountOptionListResponse =
  PaymentProviderAccountOptionDto[];

/**
 *  类型定义 [PaymentCredentialOptionListRequest]
 *  @来源 支付管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type PaymentCredentialOptionListRequest = {
  /* 支付渠道（1=支付宝；2=微信） */
  channel?: 1 | 2 | null;

  /* 凭据用途（1=应用私钥；2=支付宝公钥；3=微信 APIv3 key；4=商户私钥） */
  credentialType?: null | number;

  /* 凭据状态（1=启用；2=禁用；3=过期） */
  status?: null | number;
};

export type PaymentCredentialOptionListResponse =
  PaymentProviderCredentialOptionDto[];

/**
 *  类型定义 [PaymentCertificateOptionListRequest]
 *  @来源 支付管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type PaymentCertificateOptionListRequest = {
  /* 证书用途（1=应用证书；2=平台证书；3=根证书；4=公钥证书） */
  certificateType?: null | number;

  /* 支付渠道（1=支付宝；2=微信） */
  channel?: 1 | 2 | null;

  /* 证书状态（1=启用；2=禁用；3=过期） */
  status?: null | number;
};

export type PaymentCertificateOptionListResponse =
  PaymentProviderCertificateOptionDto[];

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
  /* 支付渠道（1=支付宝；2=微信） */
  channel?: 1 | 2 | null;

  /* 客户端应用键 */
  clientAppKey?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* 运行环境（1=沙箱；2=正式） */
  environment?: 1 | 2 | null;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 站内订单号 */
  orderNo?: null | string;

  /* 订单业务类型（1=虚拟币充值；2=VIP 订阅） */
  orderType?: 1 | 2;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 支付场景（1=App；2=H5；3=小程序） */
  paymentScene?: 1 | 2 | 3 | null;

  /* 客户端平台（1=安卓端；2=苹果端；3=鸿蒙端；4=网页端；5=小程序） */
  platform?: 1 | 2 | 3 | 4 | 5 | null;

  /* 支付 provider 账号选项值 */
  providerConfigId?: null | number;

  /* 第三方交易号 */
  providerTradeNo?: null | string;

  /* 开始时间 */
  startDate?: null | string;

  /* 订单状态（1=待支付；2=已支付；3=已关闭；4=退款中；5=已退款） */
  status?: 1 | 2 | 3 | 4 | 5;

  /* 用户 ID */
  userId?: null | number;
};

export type PaymentOrderPageResponse = {
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
 *  类型定义 [PaymentReconcilePageRequest]
 *  @来源 支付管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type PaymentReconcilePageRequest = {
  /* 支付渠道（1=支付宝；2=微信） */
  channel?: 1 | 2 | null;

  /* 结束时间 */
  endDate?: null | string;

  /* 差异类型（1=本地已支付 provider 未支付；2=本地待支付 provider 已支付；3=金额不一致；4=重复交易号；5=验签失败；6=退款差异） */
  mismatchType?: null | number;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 站内订单号 */
  orderNo?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 第三方交易号 */
  providerTradeNo?: null | string;

  /* 开始时间 */
  startDate?: null | string;

  /* 对账状态（1=待处理；2=已确认；3=已修复；4=忽略） */
  status?: null | number;
};

export type PaymentReconcilePageResponse = {
  /* 列表数据 */
  list?: AdminPaymentReconciliationPageItemDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [PaymentOrderRepairPaidRequest]
 *  @来源 支付管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type PaymentOrderRepairPaidRequest = RepairPaidPaymentOrderDto;

export type PaymentOrderRepairPaidResponse = PaymentOrderResultDto;

/**
 *  类型定义 [AdminPaymentProviderConfigPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminPaymentProviderConfigPageItemDto = {
  /* H5 允许返回域名列表 */
  allowedReturnDomains: null | string[];
  /* provider 应用 ID */
  appId: string;
  /* 证书模式（1=普通密钥；2=证书模式） */
  certMode: number;
  /* 支付渠道（1=支付宝；2=微信） */
  channel: 1 | 2;
  /* 客户端应用键，同一部署内区分多应用 */
  clientAppKey: string;
  /* 配置摘要，不包含明文密钥 */
  configMetadata: null | Record<string, any>;
  /* 配置名称，供后台识别 */
  configName: string;
  /* 创建时间 */
  createdAt: string;
  /* 运行环境（1=沙箱；2=正式） */
  environment: 1 | 2;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* provider 商户 ID */
  mchId: string;
  /* 通知回调地址 */
  notifyUrl: null | string;
  /* 支付场景（1=App；2=H5；3=小程序） */
  paymentScene: 1 | 2 | 3;
  /* 客户端平台（1=安卓端；2=苹果端；3=鸿蒙端；4=网页端；5=小程序） */
  platform: 1 | 2 | 3 | 4 | 5;
  /* H5 返回地址 */
  returnUrl: null | string;
  /* 排序值 */
  sortOrder: number;
  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [PaymentProviderAccountOptionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type PaymentProviderAccountOptionDto = {
  /* 支付渠道（1=支付宝；2=微信） */
  channel: 1 | 2;
  /* 客户端应用键 */
  clientAppKey: string;
  /* 当前配置版本 */
  configVersion: number;
  /* 运行环境（1=沙箱；2=正式） */
  environment: 1 | 2;
  /* 是否启用 */
  isEnabled: boolean;
  /* 选项展示名 */
  label: string;
  /* provider 应用 ID 后四位掩码 */
  maskedAppId: string;
  /* provider 商户 ID 后四位掩码 */
  maskedMchId: string;
  /* 支付场景（1=App；2=H5；3=小程序） */
  paymentScene: 1 | 2 | 3;
  /* 客户端平台（1=安卓端；2=苹果端；3=鸿蒙端；4=网页端；5=小程序） */
  platform: 1 | 2 | 3 | 4 | 5;
  /* 选项值，支付 provider 配置 ID */
  value: number;
};

/**
 *  类型定义 [PaymentProviderCredentialOptionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type PaymentProviderCredentialOptionDto = {
  /* 支付渠道（1=支付宝；2=微信） */
  channel: 1 | 2;
  /* 凭据用途（1=应用私钥；2=支付宝公钥；3=微信 APIv3 key；4=商户私钥） */
  credentialType: number;
  /* 过期时间 */
  expiredAt: null | string;
  /* 凭据指纹 */
  fingerprint: string;
  /* 选项展示名 */
  label: string;
  /* 掩码标识 */
  maskedIdentifier: string;
  /* 凭据状态（1=启用；2=禁用；3=过期） */
  status: number;
  /* 选项值，凭据记录 ID */
  value: number;
  /* 凭据版本标签 */
  versionLabel: string;
};

/**
 *  类型定义 [PaymentProviderCertificateOptionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type PaymentProviderCertificateOptionDto = {
  /* 证书用途（1=应用证书；2=平台证书；3=根证书；4=公钥证书） */
  certificateType: number;
  /* 支付渠道（1=支付宝；2=微信） */
  channel: 1 | 2;
  /* 过期时间 */
  expiredAt: null | string;
  /* 证书指纹 */
  fingerprint: string;
  /* 选项展示名 */
  label: string;
  /* provider 证书序列号掩码 */
  maskedSerialNo: string;
  /* 证书状态（1=启用；2=禁用；3=过期） */
  status: number;
  /* 选项值，证书记录 ID */
  value: number;
  /* 证书版本标签 */
  versionLabel: string;
};

/**
 *  类型定义 [CreatePaymentProviderConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreatePaymentProviderConfigDto = {
  /* H5 允许返回域名列表 */
  allowedReturnDomains?: null | string[];
  /* 微信 APIv3 key 凭据选项 ID，后台写入时解析为内部引用 */
  apiV3KeyCredentialId?: null | number;
  /* 应用证书选项 ID，后台写入时解析为内部引用 */
  appCertificateId?: null | number;
  /* provider 应用 ID */
  appId?: string;
  /* 证书模式（1=普通密钥；2=证书模式） */
  certMode?: number;
  /* 支付渠道（1=支付宝；2=微信） */
  channel: 1 | 2;
  /* 客户端应用键，同一部署内区分多应用 */
  clientAppKey?: string;
  /* 配置名称，供后台识别 */
  configName?: string;
  /* 主凭据选项 ID，后台写入时解析为内部密钥版本引用 */
  credentialOptionId?: null | number;
  /* 运行环境（1=沙箱；2=正式） */
  environment: 1 | 2;
  /* 是否启用 */
  isEnabled?: boolean;
  /* provider 商户 ID */
  mchId?: string;
  /* 通知回调地址 */
  notifyUrl?: null | string;
  /* 支付场景（1=App；2=H5；3=小程序） */
  paymentScene: 1 | 2 | 3;
  /* 客户端平台（1=安卓端；2=苹果端；3=鸿蒙端；4=网页端；5=小程序） */
  platform: 1 | 2 | 3 | 4 | 5;
  /* 平台证书选项 ID，后台写入时解析为内部引用 */
  platformCertificateId?: null | number;
  /* 应用私钥凭据选项 ID，后台写入时解析为内部引用 */
  privateKeyCredentialId?: null | number;
  /* 支付宝公钥凭据选项 ID，后台写入时解析为内部引用 */
  publicKeyCredentialId?: null | number;
  /* H5 返回地址 */
  returnUrl?: null | string;
  /* 根证书选项 ID，后台写入时解析为内部引用 */
  rootCertificateId?: null | number;
  /* 排序值 */
  sortOrder?: number;
};

/**
 *  类型定义 [UpdatePaymentProviderConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdatePaymentProviderConfigDto = {
  /* H5 允许返回域名列表 */
  allowedReturnDomains?: null | string[];
  /* 微信 APIv3 key 凭据选项 ID，后台写入时解析为内部引用 */
  apiV3KeyCredentialId?: null | number;
  /* 应用证书选项 ID，后台写入时解析为内部引用 */
  appCertificateId?: null | number;
  /* provider 应用 ID */
  appId?: string;
  /* 证书模式（1=普通密钥；2=证书模式） */
  certMode?: number;
  /* 支付渠道（1=支付宝；2=微信） */
  channel?: 1 | 2;
  /* 客户端应用键，同一部署内区分多应用 */
  clientAppKey?: string;
  /* 配置名称，供后台识别 */
  configName?: string;
  /* 主凭据选项 ID，后台写入时解析为内部密钥版本引用 */
  credentialOptionId?: null | number;
  /* 运行环境（1=沙箱；2=正式） */
  environment?: 1 | 2;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean;
  /* provider 商户 ID */
  mchId?: string;
  /* 通知回调地址 */
  notifyUrl?: null | string;
  /* 支付场景（1=App；2=H5；3=小程序） */
  paymentScene?: 1 | 2 | 3;
  /* 客户端平台（1=安卓端；2=苹果端；3=鸿蒙端；4=网页端；5=小程序） */
  platform?: 1 | 2 | 3 | 4 | 5;
  /* 平台证书选项 ID，后台写入时解析为内部引用 */
  platformCertificateId?: null | number;
  /* 应用私钥凭据选项 ID，后台写入时解析为内部引用 */
  privateKeyCredentialId?: null | number;
  /* 支付宝公钥凭据选项 ID，后台写入时解析为内部引用 */
  publicKeyCredentialId?: null | number;
  /* H5 返回地址 */
  returnUrl?: null | string;
  /* 根证书选项 ID，后台写入时解析为内部引用 */
  rootCertificateId?: null | number;
  /* 排序值 */
  sortOrder?: number;
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
 *  类型定义 [AdminPaymentOrderPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminPaymentOrderPageItemDto = {
  /* 支付渠道（1=支付宝；2=微信） */
  channel: 1 | 2;
  /* 客户端应用键 */
  clientAppKey: string;
  /* 关闭时间 */
  closedAt: null | string;
  /* 创建时间 */
  createdAt: string;
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
  paidAt: null | string;
  /* 应付金额，单位为分 */
  payableAmount: number;
  /* 支付场景（1=App；2=H5；3=小程序） */
  paymentScene: 1 | 2 | 3;
  /* 客户端平台（1=安卓端；2=苹果端；3=鸿蒙端；4=网页端；5=小程序） */
  platform: 1 | 2 | 3 | 4 | 5;
  /* 支付 provider 账号展示名 */
  providerAccountLabel: string;
  /* 支付 provider 账号选项值 */
  providerConfigId: number;
  /* 下单时 provider 配置版本展示 */
  providerConfigVersionLabel: string;
  /* 第三方交易号 */
  providerTradeNo: null | string;
  /* 退款完成时间 */
  refundedAt: null | string;
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
 *  类型定义 [AdminPaymentReconciliationPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminPaymentReconciliationPageItemDto = {
  /* 支付渠道（1=支付宝；2=微信） */
  channel: 1 | 2;
  /* 创建时间 */
  createdAt: string;
  /* 币种 */
  currency: string;
  /* 对账证据摘要，敏感字段已脱敏 */
  evidence: null | Record<string, any>;
  /* 处理备注 */
  handledRemark: null | string;
  /* 主键id */
  id: number;
  /* 本地金额，单位为分 */
  localAmount: number;
  /* 本地订单状态（1=待支付；2=已支付；3=已关闭；4=退款中；5=已退款） */
  localStatus: 1 | 2 | 3 | 4 | 5;
  /* 差异类型（1=本地已支付 provider 未支付；2=本地待支付 provider 已支付；3=金额不一致；4=重复交易号；5=验签失败；6=退款差异） */
  mismatchType: number;
  /* 站内订单号 */
  orderNo: string;
  /* 支付订单 ID */
  paymentOrderId: null | number;
  /* provider 金额，单位为分 */
  providerAmount: null | number;
  /* provider 订单状态 */
  providerStatus: string;
  /* 第三方交易号 */
  providerTradeNo: null | string;
  /* 退款执行是否开放；本轮固定为 false */
  refundExecutionAvailable: boolean;
  /* 是否允许通过异常修复置为已支付 */
  repairPaidAvailable: boolean;
  /* 对账状态（1=待处理；2=已确认；3=已修复；4=忽略） */
  status: number;
  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [RepairPaidPaymentOrderDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type RepairPaidPaymentOrderDto = {
  /* 异常修复证据摘要，禁止明文密钥、证书或完整原始回调 */
  evidence: Record<string, any>;
  /* 站内订单号 */
  orderNo: string;
  /* 实付金额，单位为分 */
  paidAmount: number;
  /* 第三方交易号 */
  providerTradeNo: string;
  /* 异常修复原因 */
  reason: string;
  /* 关联对账记录 ID */
  reconciliationRecordId: number;
};

/**
 *  类型定义 [PaymentOrderResultDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type PaymentOrderResultDto = {
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
  subscriptionMode: 1;
};
