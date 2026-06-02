/**
 *  类型定义 [CouponDefinitionPageRequest]
 *  @来源 券管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CouponDefinitionPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 券类型（1=阅读券；2=折扣券；3=VIP 试用卡；4=补签卡） */
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
};

export type CouponDefinitionPageResponse = {
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
 *  类型定义 [CouponDefinitionCreateRequest]
 *  @来源 券管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CouponDefinitionCreateRequest = CreateCouponDefinitionDto;

export type CouponDefinitionCreateResponse = boolean;

/**
 *  类型定义 [CouponDefinitionUpdateRequest]
 *  @来源 券管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CouponDefinitionUpdateRequest = UpdateCouponDefinitionDto;

export type CouponDefinitionUpdateResponse = boolean;

/**
 *  类型定义 [CouponDefinitionUpdateStatusRequest]
 *  @来源 券管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CouponDefinitionUpdateStatusRequest = UpdateEnabledStatusDto;

export type CouponDefinitionUpdateStatusResponse = boolean;

/**
 *  类型定义 [CouponGrantCreateRequest]
 *  @来源 券管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CouponGrantCreateRequest = GrantCouponDto;

export type CouponGrantCreateResponse = boolean;

/**
 *  类型定义 [BaseCouponDefinitionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseCouponDefinitionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 补签次数 */
  benefitCount?: null | number;
  /* VIP 试用天数 */
  benefitDays?: null | number;
  /* 券类型（1=阅读券；2=折扣券；3=VIP 试用卡；4=补签卡） */
  couponType: 1 | 2 | 3 | 4;
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
  /* 更新时间 */
  updatedAt: string;
  /* 单张券可用次数 */
  usageLimit?: null | number;

  /* 有效天数，后台创建的券定义必须为正整数 */
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
  /* 补签次数 */
  benefitCount?: null | number;
  /* VIP 试用天数 */
  benefitDays?: null | number;
  /* 券类型（1=阅读券；2=折扣券；3=VIP 试用卡；4=补签卡） */
  couponType: 1 | 2 | 3 | 4;
  /* 折扣金额 */
  discountAmount?: null | number;
  /* 折扣率基点，10000=不打折 */
  discountRateBps?: null | number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 券名称 */
  name: string;
  /* 单张券可用次数 */
  usageLimit?: null | number;

  /* 有效天数，后台创建的券定义必须为正整数 */
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
  /* 补签次数 */
  benefitCount?: null | number;
  /* VIP 试用天数 */
  benefitDays?: null | number;
  /* 券类型（1=阅读券；2=折扣券；3=VIP 试用卡；4=补签卡） */
  couponType?: 1 | 2 | 3 | 4;
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
  /* 单张券可用次数 */
  usageLimit?: null | number;

  /* 有效天数，后台创建的券定义必须为正整数 */
  validDays?: null | number;
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
 *  类型定义 [GrantCouponDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrantCouponDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 券定义 ID */
  couponDefinitionId: number;
  /* 后台发券操作幂等 ID，同一用户内相同操作 ID 重试不会重复发券 */
  operationId: string;
  /* 发放数量 */
  quantity?: null | number;
  /* 来源 ID */
  sourceId?: null | number;
  /* 兼容旧客户端字段；后台发券服务端固定按后台发放记录 */
  sourceType?: 1 | 2 | 3 | 4 | 5 | null;

  /* 用户 ID */
  userId: number;
};
