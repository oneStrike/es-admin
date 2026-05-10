/**
 *  类型定义 [CouponDefinitionPageRequest]
 *  @来源 券管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CouponDefinitionPageRequest = {
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
  /* 来源 ID */
  sourceId?: null | number;
  /* 券来源（1=任务发放；2=积分兑换；3=后台发放；4=购买补偿） */
  sourceType: 1 | 2 | 3 | 4;

  /* 用户 ID */
  userId: number;
};
