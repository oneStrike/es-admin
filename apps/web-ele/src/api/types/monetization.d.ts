/**
 *  类型定义 [MonetizationVipPlanPageRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationVipPlanPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean | null;

  /* 套餐名称 */
  name?: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 套餐层级（1=VIP；2=超级 VIP） */
  tier?: null | number;
};

export type MonetizationVipPlanPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: MembershipPlanItemDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [MonetizationVipPlanCreateRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationVipPlanCreateRequest = CreateMembershipPlanDto;

export type MonetizationVipPlanCreateResponse = boolean;

/**
 *  类型定义 [MonetizationVipPlanUpdateRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationVipPlanUpdateRequest = UpdateMembershipPlanDto;

export type MonetizationVipPlanUpdateResponse = boolean;

/**
 *  类型定义 [MonetizationVipPlanUpdateStatusRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationVipPlanUpdateStatusRequest = UpdateEnabledStatusDto;

export type MonetizationVipPlanUpdateStatusResponse = boolean;

/**
 *  类型定义 [MonetizationVipBenefitPageRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationVipBenefitPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 权益类型（1=纯展示；2=券发放；3=道具/装扮发放；4=订阅权益；5=无广告策略；6=内容优先看策略） */
  benefitType?: number;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean | null;

  /* 权益名称 */
  name?: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;
};

export type MonetizationVipBenefitPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseMembershipBenefitDefinitionDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [MonetizationVipBenefitCreateRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationVipBenefitCreateRequest =
  CreateMembershipBenefitDefinitionDto;

export type MonetizationVipBenefitCreateResponse = boolean;

/**
 *  类型定义 [MonetizationVipBenefitUpdateRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationVipBenefitUpdateRequest =
  UpdateMembershipBenefitDefinitionDto;

export type MonetizationVipBenefitUpdateResponse = boolean;

/**
 *  类型定义 [MonetizationVipBenefitUpdateStatusRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationVipBenefitUpdateStatusRequest = UpdateEnabledStatusDto;

export type MonetizationVipBenefitUpdateStatusResponse = boolean;

/**
 *  类型定义 [MonetizationVipPageConfigPageRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationVipPageConfigPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean | null;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 页面业务键，由服务端生成 */
  pageKey?: string;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 页面标题 */
  title?: string;
};

export type MonetizationVipPageConfigPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: MembershipPageConfigItemDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [MonetizationVipPageConfigCreateRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationVipPageConfigCreateRequest =
  CreateMembershipPageConfigDto;

export type MonetizationVipPageConfigCreateResponse = boolean;

/**
 *  类型定义 [MonetizationVipPageConfigUpdateRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationVipPageConfigUpdateRequest =
  UpdateMembershipPageConfigDto;

export type MonetizationVipPageConfigUpdateResponse = boolean;

/**
 *  类型定义 [MonetizationVipPageConfigUpdateStatusRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationVipPageConfigUpdateStatusRequest =
  UpdateEnabledStatusDto;

export type MonetizationVipPageConfigUpdateStatusResponse = boolean;

/**
 *  类型定义 [MonetizationVipAutoRenewAgreementPageRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationVipAutoRenewAgreementPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 支付渠道（1=支付宝；2=微信） */
  channel?: number;

  /* 结束时间 */
  endDate?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 支付场景（1=App；2=H5；3=小程序） */
  paymentScene?: number;

  /* VIP 套餐 ID */
  planId?: number;

  /* 开始时间 */
  startDate?: null | string;

  /* 协议状态（1=有效；2=已取消；3=已过期；4=签约失败） */
  status?: number;

  /* 用户 ID */
  userId?: number;
};

export type MonetizationVipAutoRenewAgreementPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseMembershipAutoRenewAgreementDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [MonetizationVipAutoRenewAgreementCancellationCreateRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationVipAutoRenewAgreementCancellationCreateRequest = IdDto;

export type MonetizationVipAutoRenewAgreementCancellationCreateResponse =
  boolean;

/**
 *  类型定义 [MonetizationCurrencyPackagePageRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationCurrencyPackagePageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean | null;

  /* 充值包名称 */
  name?: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;
};

export type MonetizationCurrencyPackagePageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseCurrencyPackageDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [MonetizationCurrencyPackageCreateRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationCurrencyPackageCreateRequest = CreateCurrencyPackageDto;

export type MonetizationCurrencyPackageCreateResponse = boolean;

/**
 *  类型定义 [MonetizationCurrencyPackageUpdateRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationCurrencyPackageUpdateRequest = UpdateCurrencyPackageDto;

export type MonetizationCurrencyPackageUpdateResponse = boolean;

/**
 *  类型定义 [MonetizationCurrencyPackageUpdateStatusRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationCurrencyPackageUpdateStatusRequest =
  UpdateEnabledStatusDto;

export type MonetizationCurrencyPackageUpdateStatusResponse = boolean;

/**
 *  类型定义 [MonetizationCouponPageRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationCouponPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 券类型（1=阅读券；2=折扣券；3=VIP 试用卡；4=免广告卡；5=补签卡） */
  couponType?: number;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean | null;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 适用目标范围（1=章节；2=VIP；3=广告；4=签到） */
  targetScope?: number;
};

export type MonetizationCouponPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseCouponDefinitionDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [MonetizationCouponCreateRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationCouponCreateRequest = CreateCouponDefinitionDto;

export type MonetizationCouponCreateResponse = boolean;

/**
 *  类型定义 [MonetizationCouponUpdateRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationCouponUpdateRequest = UpdateCouponDefinitionDto;

export type MonetizationCouponUpdateResponse = boolean;

/**
 *  类型定义 [MonetizationCouponUpdateStatusRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationCouponUpdateStatusRequest = UpdateEnabledStatusDto;

export type MonetizationCouponUpdateStatusResponse = boolean;

/**
 *  类型定义 [MonetizationCouponGrantCreateRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationCouponGrantCreateRequest = GrantCouponDto;

export type MonetizationCouponGrantCreateResponse = boolean;

/**
 *  类型定义 [MonetizationPaymentProviderPageRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationPaymentProviderPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 支付渠道（1=支付宝；2=微信） */
  channel?: number;

  /* 客户端应用键，同一部署内区分多应用 */
  clientAppKey?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* 运行环境（1=沙箱；2=正式） */
  environment?: number;

  /* 是否启用 */
  isEnabled?: boolean | null;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 支付场景（1=App；2=H5；3=小程序） */
  paymentScene?: number;

  /* 客户端平台（1=Android；2=iOS；3=HarmonyOS；4=Web；5=小程序） */
  platform?: number;

  /* 开始时间 */
  startDate?: null | string;
};

export type MonetizationPaymentProviderPageResponse = {
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
 *  类型定义 [MonetizationPaymentProviderCreateRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationPaymentProviderCreateRequest =
  CreatePaymentProviderConfigDto;

export type MonetizationPaymentProviderCreateResponse = boolean;

/**
 *  类型定义 [MonetizationPaymentProviderUpdateRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationPaymentProviderUpdateRequest =
  UpdatePaymentProviderConfigDto;

export type MonetizationPaymentProviderUpdateResponse = boolean;

/**
 *  类型定义 [MonetizationPaymentProviderUpdateStatusRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationPaymentProviderUpdateStatusRequest =
  UpdateEnabledStatusDto;

export type MonetizationPaymentProviderUpdateStatusResponse = boolean;

/**
 *  类型定义 [MonetizationPaymentOrderPageRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationPaymentOrderPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 订单业务类型（1=虚拟币充值；2=VIP 订阅） */
  orderType?: number;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 订单状态（1=待支付；2=已支付；3=已关闭；4=退款中；5=已退款） */
  status?: number;
};

export type MonetizationPaymentOrderPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: PaymentOrderResultDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [MonetizationPaymentOrderUpdateStatusRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationPaymentOrderUpdateStatusRequest =
  ConfirmPaymentOrderDto;

export type MonetizationPaymentOrderUpdateStatusResponse =
  PaymentOrderResultDto;

/**
 *  类型定义 [MonetizationAdProviderPageRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationAdProviderPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 客户端应用键 */
  clientAppKey?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* 运行环境（1=沙箱；2=正式） */
  environment?: number;

  /* 是否启用 */
  isEnabled?: boolean | null;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 广告位 key */
  placementKey?: string;

  /* 客户端平台（1=Android；2=iOS；3=HarmonyOS；4=Web；5=小程序） */
  platform?: number;

  /* 广告 provider（1=穿山甲；2=腾讯优量汇） */
  provider?: number;

  /* 开始时间 */
  startDate?: null | string;
};

export type MonetizationAdProviderPageResponse = {
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
 *  类型定义 [MonetizationAdProviderCreateRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationAdProviderCreateRequest = CreateAdProviderConfigDto;

export type MonetizationAdProviderCreateResponse = boolean;

/**
 *  类型定义 [MonetizationAdProviderUpdateRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationAdProviderUpdateRequest = UpdateAdProviderConfigDto;

export type MonetizationAdProviderUpdateResponse = boolean;

/**
 *  类型定义 [MonetizationAdProviderUpdateStatusRequest]
 *  @来源 变现管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MonetizationAdProviderUpdateStatusRequest = UpdateEnabledStatusDto;

export type MonetizationAdProviderUpdateStatusResponse = boolean;

/**
 *  类型定义 [MembershipPlanItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type MembershipPlanItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 是否支持自动续费签约 */
  autoRenewEnabled?: boolean | null;
  /* 套餐关联权益列表 */
  benefits?: MembershipPlanBenefitItemDto[];
  /* 开通赠送积分数量 */
  bonusPointAmount?: null | number;
  /* 创建时间 */
  createdAt: string;
  /* 订阅页营销标签 */
  displayTag?: null | string;
  /* 有效天数 */
  durationDays: number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 套餐名称 */
  name: string;
  /* 划线原价，单位为分 */
  originalPriceAmount?: null | number;
  /* 套餐业务键，由服务端生成 */
  planKey: string;
  /* 套餐售价，单位为分 */
  priceAmount: number;
  /* 排序值 */
  sortOrder?: null | number;
  /* 套餐层级（1=VIP；2=超级 VIP） */
  tier?: null | number;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [MembershipPlanBenefitItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type MembershipPlanBenefitItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 权益定义 */
  benefit: BaseMembershipBenefitDefinitionDto;
  /* 会员权益定义 ID */
  benefitId: number;
  /* 权益配置值，按权益类型使用闭集结构：券发放 couponDefinitionId/grantCount/validDays，道具 assetType/assetKey/grantCount/validDays，无广告 adScope/durationPolicy，优先看 contentScope/advanceHours */
  benefitValue?: null | Record<string, any>;
  /* 创建时间 */
  createdAt: string;
  /* 发放策略（1=仅展示；2=开通时自动发放；3=每日可领取；4=订阅期内持续生效；5=手动领取一次） */
  grantPolicy: 1 | 2 | 3 | 4 | 5;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* VIP 套餐 ID */
  planId: number;
  /* 排序值 */
  sortOrder?: null | number;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [BaseMembershipBenefitDefinitionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseMembershipBenefitDefinitionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 权益类型（1=纯展示；2=券发放；3=道具/装扮发放；4=订阅权益；5=无广告策略；6=内容优先看策略） */
  benefitType: 1 | 2 | 3 | 4 | 5 | 6;
  /* 权益业务键，由服务端生成 */
  code: string;
  /* 创建时间 */
  createdAt: string;
  /* 权益说明 */
  description?: null | string;
  /* 权益图标资源键或 URL */
  icon?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 权益名称 */
  name: string;
  /* 排序值 */
  sortOrder?: null | number;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CreateMembershipPlanDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateMembershipPlanDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 是否支持自动续费签约 */
  autoRenewEnabled?: boolean | null;
  /* 套餐关联权益列表 */
  benefits?: MembershipPlanBenefitInputDto[];
  /* 开通赠送积分数量 */
  bonusPointAmount?: null | number;
  /* 订阅页营销标签 */
  displayTag?: null | string;
  /* 有效天数 */
  durationDays: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 套餐名称 */
  name: string;
  /* 划线原价，单位为分 */
  originalPriceAmount?: null | number;
  /* 套餐售价，单位为分 */
  priceAmount: number;
  /* 排序值 */
  sortOrder?: null | number;

  /* 套餐层级（1=VIP；2=超级 VIP） */
  tier?: null | number;
};

/**
 *  类型定义 [MembershipPlanBenefitInputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type MembershipPlanBenefitInputDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 会员权益定义 ID */
  benefitId: number;
  /* 权益配置值，按权益类型使用闭集结构：券发放 couponDefinitionId/grantCount/validDays，道具 assetType/assetKey/grantCount/validDays，无广告 adScope/durationPolicy，优先看 contentScope/advanceHours */
  benefitValue?: null | Record<string, any>;
  /* 发放策略（1=仅展示；2=开通时自动发放；3=每日可领取；4=订阅期内持续生效；5=手动领取一次） */
  grantPolicy: 1 | 2 | 3 | 4 | 5;
  /* 是否启用 */
  isEnabled?: boolean | null;

  /* 排序值 */
  sortOrder?: null | number;
};

/**
 *  类型定义 [UpdateMembershipPlanDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateMembershipPlanDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 是否支持自动续费签约 */
  autoRenewEnabled?: boolean | null;
  /* 套餐关联权益列表 */
  benefits?: MembershipPlanBenefitInputDto[];
  /* 开通赠送积分数量 */
  bonusPointAmount?: null | number;
  /* 订阅页营销标签 */
  displayTag?: null | string;
  /* 有效天数 */
  durationDays?: number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 套餐名称 */
  name?: string;
  /* 划线原价，单位为分 */
  originalPriceAmount?: null | number;
  /* 套餐售价，单位为分 */
  priceAmount?: number;
  /* 排序值 */
  sortOrder?: null | number;

  /* 套餐层级（1=VIP；2=超级 VIP） */
  tier?: null | number;
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
 *  类型定义 [CreateMembershipBenefitDefinitionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateMembershipBenefitDefinitionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 权益类型（1=纯展示；2=券发放；3=道具/装扮发放；4=订阅权益；5=无广告策略；6=内容优先看策略） */
  benefitType: 1 | 2 | 3 | 4 | 5 | 6;
  /* 权益说明 */
  description?: null | string;
  /* 权益图标资源键或 URL */
  icon?: null | string;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 权益名称 */
  name: string;

  /* 排序值 */
  sortOrder?: null | number;
};

/**
 *  类型定义 [UpdateMembershipBenefitDefinitionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateMembershipBenefitDefinitionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 权益类型（1=纯展示；2=券发放；3=道具/装扮发放；4=订阅权益；5=无广告策略；6=内容优先看策略） */
  benefitType?: 1 | 2 | 3 | 4 | 5 | 6;
  /* 权益说明 */
  description?: null | string;
  /* 权益图标资源键或 URL */
  icon?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 权益名称 */
  name?: string;

  /* 排序值 */
  sortOrder?: null | number;
};

/**
 *  类型定义 [MembershipPageConfigItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type MembershipPageConfigItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 关联协议列表 */
  agreements?: MembershipPageAgreementItemDto[];
  /* 自动续费提示 */
  autoRenewNotice?: null | string;
  /* 确认开通协议提示文案 */
  checkoutAgreementText?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 会员说明条目 */
  memberNoticeItems?: string[];
  /* 页面业务键，由服务端生成 */
  pageKey: string;
  /* 排序值 */
  sortOrder?: null | number;
  /* 支付按钮文案模板 */
  submitButtonTemplate?: null | string;
  /* 页面标题 */
  title: string;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [MembershipPageAgreementItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type MembershipPageAgreementItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 创建时间 */
  createdAt: string;
  /* 主键id */
  id: number;
  /* 是否强制重新同意 */
  isForce: boolean;
  /* 是否已发布 */
  isPublished: boolean;
  /* 发布时间 */
  publishedAt?: null | string;
  /* 是否展示在登录注册页 */
  showInAuth: boolean;
  /* 协议标题 */
  title: string;
  /* 更新时间 */
  updatedAt: string;

  /* 版本号 */
  version: string;
};

/**
 *  类型定义 [CreateMembershipPageConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateMembershipPageConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 关联协议 ID 列表，按输入顺序展示 */
  agreementIds?: number[];
  /* 自动续费提示 */
  autoRenewNotice?: null | string;
  /* 确认开通协议提示文案 */
  checkoutAgreementText?: null | string;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 会员说明条目 */
  memberNoticeItems?: string[];
  /* 排序值 */
  sortOrder?: null | number;
  /* 支付按钮文案模板 */
  submitButtonTemplate?: null | string;

  /* 页面标题 */
  title: string;
};

/**
 *  类型定义 [UpdateMembershipPageConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateMembershipPageConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 关联协议 ID 列表，按输入顺序展示 */
  agreementIds?: number[];
  /* 自动续费提示 */
  autoRenewNotice?: null | string;
  /* 确认开通协议提示文案 */
  checkoutAgreementText?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 会员说明条目 */
  memberNoticeItems?: string[];
  /* 排序值 */
  sortOrder?: null | number;
  /* 支付按钮文案模板 */
  submitButtonTemplate?: null | string;

  /* 页面标题 */
  title?: string;
};

/**
 *  类型定义 [BaseMembershipAutoRenewAgreementDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseMembershipAutoRenewAgreementDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 第三方签约协议号 */
  agreementNo: string;
  /* 取消时间 */
  cancelledAt?: null | string;
  /* 支付渠道（1=支付宝；2=微信） */
  channel: 1 | 2;
  /* 客户端应用键 */
  clientAppKey: string;
  /* 创建时间 */
  createdAt: string;
  /* 密钥版本引用快照 */
  credentialVersionRef: string;
  /* 运行环境（1=沙箱；2=正式） */
  environment: 1 | 2;
  /* 主键id */
  id: number;
  /* 下次预计续扣时间 */
  nextRenewAt?: null | string;
  /* 支付场景（1=App；2=H5；3=小程序） */
  paymentScene: 1 | 2 | 3;
  /* VIP 套餐 ID */
  planId: number;
  /* 客户端平台（1=Android；2=iOS；3=HarmonyOS；4=Web；5=小程序） */
  platform: 1 | 2 | 3 | 4 | 5;
  /* 支付 provider 配置 ID */
  providerConfigId: number;
  /* provider 配置版本快照 */
  providerConfigVersion: number;
  /* 签约成功时间 */
  signedAt?: null | string;
  /* 协议状态（1=有效；2=已取消；3=已过期；4=签约失败） */
  status: 1 | 2 | 3 | 4;
  /* 更新时间 */
  updatedAt: string;

  /* 用户 ID */
  userId: number;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [BaseCurrencyPackageDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseCurrencyPackageDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 赠送虚拟币数量 */
  bonusAmount?: null | number;
  /* 创建时间 */
  createdAt: string;
  /* 发放虚拟币数量 */
  currencyAmount: number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 充值包名称 */
  name: string;
  /* 充值包业务键 */
  packageKey: string;
  /* 支付价格，单位为分 */
  price: number;
  /* 排序值 */
  sortOrder?: null | number;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CreateCurrencyPackageDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateCurrencyPackageDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 赠送虚拟币数量 */
  bonusAmount?: null | number;
  /* 发放虚拟币数量 */
  currencyAmount: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 充值包名称 */
  name: string;
  /* 充值包业务键 */
  packageKey: string;
  /* 支付价格，单位为分 */
  price: number;

  /* 排序值 */
  sortOrder?: null | number;
};

/**
 *  类型定义 [UpdateCurrencyPackageDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateCurrencyPackageDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 赠送虚拟币数量 */
  bonusAmount?: null | number;
  /* 发放虚拟币数量 */
  currencyAmount?: number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 充值包名称 */
  name?: string;
  /* 充值包业务键 */
  packageKey?: string;
  /* 支付价格，单位为分 */
  price?: number;

  /* 排序值 */
  sortOrder?: null | number;
};

/**
 *  类型定义 [BaseCouponDefinitionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseCouponDefinitionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 预算上限，0=不限制 */
  budgetLimit?: null | number;
  /* 额外配置快照 */
  configPayload?: null | Record<string, any>;
  /* 券类型（1=阅读券；2=折扣券；3=VIP 试用卡；4=免广告卡；5=补签卡） */
  couponType: 1 | 2 | 3 | 4 | 5;
  /* 创建时间 */
  createdAt: string;
  /* 折扣金额 */
  discountAmount?: null | number;
  /* 折扣率基点，10000=不打折 */
  discountRateBps?: null | number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 券名称 */
  name: string;
  /* 适用目标范围（1=章节；2=VIP；3=广告；4=签到） */
  targetScope: 1 | 2 | 3 | 4;
  /* 更新时间 */
  updatedAt: string;
  /* 单张券可用次数 */
  usageLimit?: null | number;

  /* 有效天数，0=按实例过期时间控制 */
  validDays?: null | number;
};

/**
 *  类型定义 [CreateCouponDefinitionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateCouponDefinitionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 预算上限，0=不限制 */
  budgetLimit?: null | number;
  /* 额外配置快照 */
  configPayload?: null | Record<string, any>;
  /* 券类型（1=阅读券；2=折扣券；3=VIP 试用卡；4=免广告卡；5=补签卡） */
  couponType: 1 | 2 | 3 | 4 | 5;
  /* 折扣金额 */
  discountAmount?: null | number;
  /* 折扣率基点，10000=不打折 */
  discountRateBps?: null | number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 券名称 */
  name: string;
  /* 适用目标范围（1=章节；2=VIP；3=广告；4=签到） */
  targetScope: 1 | 2 | 3 | 4;
  /* 单张券可用次数 */
  usageLimit?: null | number;

  /* 有效天数，0=按实例过期时间控制 */
  validDays?: null | number;
};

/**
 *  类型定义 [UpdateCouponDefinitionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateCouponDefinitionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 预算上限，0=不限制 */
  budgetLimit?: null | number;
  /* 额外配置快照 */
  configPayload?: null | Record<string, any>;
  /* 券类型（1=阅读券；2=折扣券；3=VIP 试用卡；4=免广告卡；5=补签卡） */
  couponType?: 1 | 2 | 3 | 4 | 5;
  /* 折扣金额 */
  discountAmount?: null | number;
  /* 折扣率基点，10000=不打折 */
  discountRateBps?: null | number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 券名称 */
  name?: string;
  /* 适用目标范围（1=章节；2=VIP；3=广告；4=签到） */
  targetScope?: 1 | 2 | 3 | 4;
  /* 单张券可用次数 */
  usageLimit?: null | number;

  /* 有效天数，0=按实例过期时间控制 */
  validDays?: null | number;
};

/**
 *  类型定义 [GrantCouponDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrantCouponDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 券定义 ID */
  couponDefinitionId: number;
  /* 来源 ID */
  sourceId?: null | number;
  /* 券来源（1=任务发放；2=积分兑换；3=后台发放；4=购买补偿） */
  sourceType: 1 | 2 | 3 | 4;

  /* 用户 ID */
  userId: number;
};

/**
 *  类型定义 [BasePaymentProviderConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BasePaymentProviderConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 自动续费签约通知地址 */
  agreementNotifyUrl?: null | string;
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
  /* 是否支持自动续费签约 */
  supportsAutoRenew?: boolean | null;

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
  /* 自动续费签约通知地址 */
  agreementNotifyUrl?: null | string;
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

  /* 是否支持自动续费签约 */
  supportsAutoRenew?: boolean | null;
};

/**
 *  类型定义 [UpdatePaymentProviderConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdatePaymentProviderConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 自动续费签约通知地址 */
  agreementNotifyUrl?: null | string;
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

  /* 是否支持自动续费签约 */
  supportsAutoRenew?: boolean | null;
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
  /* 创建时间 */
  createdAt: string;
  /* 主键id */
  id: number;
  /* 站内订单号 */
  orderNo: string;
  /* 订单业务类型（1=虚拟币充值；2=VIP 订阅） */
  orderType: 1 | 2;
  /* 应付金额，单位为分 */
  payableAmount: number;
  /* 订单状态（1=待支付；2=已支付；3=已关闭；4=退款中；5=已退款） */
  status: 1 | 2 | 3 | 4 | 5;
  /* 订阅模式（1=一次性；2=自动续费签约首单；3=自动续费代扣订单） */
  subscriptionMode?: null | number;

  /* 更新时间 */
  updatedAt: string;
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
