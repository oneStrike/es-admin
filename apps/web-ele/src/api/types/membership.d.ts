/**
 *  类型定义 [MembershipPlanPageRequest]
 *  @来源 会员管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MembershipPlanPageRequest = {
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

export type MembershipPlanPageResponse = {
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
 *  类型定义 [MembershipPlanCreateRequest]
 *  @来源 会员管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MembershipPlanCreateRequest = CreateMembershipPlanDto;

export type MembershipPlanCreateResponse = boolean;

/**
 *  类型定义 [MembershipPlanUpdateRequest]
 *  @来源 会员管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MembershipPlanUpdateRequest = UpdateMembershipPlanDto;

export type MembershipPlanUpdateResponse = boolean;

/**
 *  类型定义 [MembershipPlanUpdateStatusRequest]
 *  @来源 会员管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MembershipPlanUpdateStatusRequest = UpdateEnabledStatusDto;

export type MembershipPlanUpdateStatusResponse = boolean;

/**
 *  类型定义 [MembershipBenefitPageRequest]
 *  @来源 会员管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MembershipBenefitPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 权益类型（1=纯展示；2=券发放） */
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

export type MembershipBenefitPageResponse = {
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
 *  类型定义 [MembershipBenefitCreateRequest]
 *  @来源 会员管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MembershipBenefitCreateRequest =
  CreateMembershipBenefitDefinitionDto;

export type MembershipBenefitCreateResponse = boolean;

/**
 *  类型定义 [MembershipBenefitUpdateRequest]
 *  @来源 会员管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MembershipBenefitUpdateRequest =
  UpdateMembershipBenefitDefinitionDto;

export type MembershipBenefitUpdateResponse = boolean;

/**
 *  类型定义 [MembershipBenefitUpdateStatusRequest]
 *  @来源 会员管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MembershipBenefitUpdateStatusRequest = UpdateEnabledStatusDto;

export type MembershipBenefitUpdateStatusResponse = boolean;

/**
 *  类型定义 [MembershipPageConfigPageRequest]
 *  @来源 会员管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MembershipPageConfigPageRequest = {
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

export type MembershipPageConfigPageResponse = {
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
 *  类型定义 [MembershipPageConfigCreateRequest]
 *  @来源 会员管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MembershipPageConfigCreateRequest = CreateMembershipPageConfigDto;

export type MembershipPageConfigCreateResponse = boolean;

/**
 *  类型定义 [MembershipPageConfigUpdateRequest]
 *  @来源 会员管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MembershipPageConfigUpdateRequest = UpdateMembershipPageConfigDto;

export type MembershipPageConfigUpdateResponse = boolean;

/**
 *  类型定义 [MembershipPageConfigUpdateStatusRequest]
 *  @来源 会员管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MembershipPageConfigUpdateStatusRequest = UpdateEnabledStatusDto;

export type MembershipPageConfigUpdateStatusResponse = boolean;

/**
 *  类型定义 [MembershipPlanItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type MembershipPlanItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
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
  tier?: 1 | 2 | null;

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
  /* 权益配置值：纯展示权益为空或展示元数据；券发放权益必须配置 couponDefinitionId/grantCount，可选 validDays 覆盖赠券有效期 */
  benefitValue?: null | Record<string, any>;
  /* 创建时间 */
  createdAt: string;
  /* 发放策略（1=仅展示；2=开通时自动发放） */
  grantPolicy: 1 | 2;
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
  /* 权益类型（1=纯展示；2=券发放） */
  benefitType: 1 | 2;
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
  tier?: 1 | 2 | null;
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
  /* 权益配置值：纯展示权益为空或展示元数据；券发放权益必须配置 couponDefinitionId/grantCount，可选 validDays 覆盖赠券有效期 */
  benefitValue?: null | Record<string, any>;
  /* 发放策略（1=仅展示；2=开通时自动发放） */
  grantPolicy: 1 | 2;
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
  tier?: 1 | 2 | null;
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
  /* 权益类型（1=纯展示；2=券发放） */
  benefitType: 1 | 2;
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
  /* 权益类型（1=纯展示；2=券发放） */
  benefitType?: 1 | 2;
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
  /* 绑定套餐列表 */
  plans?: BaseMembershipPlanDto[];
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
 *  类型定义 [BaseMembershipPlanDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseMembershipPlanDto = {
  /** 任意合法数值 */
  [property: string]: any;
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
  tier?: 1 | 2 | null;

  /* 更新时间 */
  updatedAt: string;
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
  /* 确认开通协议提示文案 */
  checkoutAgreementText?: null | string;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 会员说明条目 */
  memberNoticeItems?: string[];
  /* 绑定套餐 ID 列表，按输入顺序展示 */
  planIds?: number[];
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
  /* 确认开通协议提示文案 */
  checkoutAgreementText?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 会员说明条目 */
  memberNoticeItems?: string[];
  /* 绑定套餐 ID 列表，按输入顺序展示 */
  planIds?: number[];
  /* 排序值 */
  sortOrder?: null | number;
  /* 支付按钮文案模板 */
  submitButtonTemplate?: null | string;

  /* 页面标题 */
  title?: string;
};
