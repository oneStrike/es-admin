/**
 *  类型定义 [MembershipPlanPageRequest]
 *  @来源 会员管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type MembershipPlanPageRequest = {
  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean | null;

  /* 套餐名称 */
  name?: null | string;

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
  /* 列表数据 */
  list?: MembershipPlanItemDto[] | null;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 每页条数 */
  pageSize?: null | number;

  /* 总条数 */
  total?: null | number;
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
  /* 权益类型（1=纯展示；2=券发放） */
  benefitType?: null | number;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean | null;

  /* 权益名称 */
  name?: null | string;

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
  /* 列表数据 */
  list?: MembershipBenefitDefinitionOutputDto[] | null;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 每页条数 */
  pageSize?: null | number;

  /* 总条数 */
  total?: null | number;
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
  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean | null;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 页面业务键，由服务端生成 */
  pageKey?: null | string;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 页面标题 */
  title?: null | string;
};

export type MembershipPageConfigPageResponse = {
  /* 列表数据 */
  list?: MembershipPageConfigItemDto[] | null;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 每页条数 */
  pageSize?: null | number;

  /* 总条数 */
  total?: null | number;
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
  /* 套餐关联权益列表 */
  benefits: MembershipPlanBenefitItemDto[];
  /* 开通赠送积分数量 */
  bonusPointAmount: number;
  /* 创建时间 */
  createdAt: string;
  /* 订阅页营销标签 */
  displayTag: string;
  /* 有效天数 */
  durationDays: number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 套餐名称 */
  name: string;
  /* 划线原价，单位为分 */
  originalPriceAmount: number;
  /* 套餐业务键，由服务端生成 */
  planKey: string;
  /* 套餐售价，单位为分 */
  priceAmount: number;
  /* 排序值 */
  sortOrder: number;
  /* 套餐层级（1=VIP；2=超级 VIP） */
  tier: number;
  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [MembershipPlanBenefitItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type MembershipPlanBenefitItemDto = {
  /* 权益定义 */
  benefit: MembershipBenefitDefinitionOutputDto;
  /* 会员权益定义 ID */
  benefitId: number;
  /* 权益配置值：纯展示权益为空或展示元数据；券发放权益必须配置 couponDefinitionId/grantCount，可选 validDays 覆盖赠券有效期 */
  benefitValue?: null | Record<string, any>;
  /* 创建时间 */
  createdAt: string;
  /* 发放策略（1=仅展示；2=开通时自动发放） */
  grantPolicy: number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* VIP 套餐 ID */
  planId: number;
  /* 排序值 */
  sortOrder: number;
  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [MembershipBenefitDefinitionOutputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type MembershipBenefitDefinitionOutputDto = {
  /* 权益类型（1=纯展示；2=券发放） */
  benefitType: number;
  /* 权益业务键，由服务端生成 */
  code: string;
  /* 创建时间 */
  createdAt: string;
  /* 权益说明 */
  description: string;
  /* 权益图标资源键或 URL */
  icon: string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 权益名称 */
  name: string;
  /* 排序值 */
  sortOrder: number;
  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CreateMembershipPlanDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateMembershipPlanDto = {
  /* 套餐关联权益列表 */
  benefits?: MembershipPlanBenefitInputDto[] | null;
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
  /* 会员权益定义 ID */
  benefitId: number;
  /* 权益配置值：纯展示权益为空或展示元数据；券发放权益必须配置 couponDefinitionId/grantCount，可选 validDays 覆盖赠券有效期 */
  benefitValue?: null | Record<string, any>;
  /* 发放策略（1=仅展示；2=开通时自动发放） */
  grantPolicy: number;
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
  /* 套餐关联权益列表 */
  benefits?: MembershipPlanBenefitInputDto[] | null;
  /* 开通赠送积分数量 */
  bonusPointAmount?: null | number;
  /* 订阅页营销标签 */
  displayTag?: null | string;
  /* 有效天数 */
  durationDays?: null | number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 套餐名称 */
  name?: null | string;
  /* 划线原价，单位为分 */
  originalPriceAmount?: null | number;
  /* 套餐售价，单位为分 */
  priceAmount?: null | number;
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
  /* 权益类型（1=纯展示；2=券发放） */
  benefitType: number;
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
  /* 权益类型（1=纯展示；2=券发放） */
  benefitType?: null | number;
  /* 权益说明 */
  description?: null | string;
  /* 权益图标资源键或 URL */
  icon?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 权益名称 */
  name?: null | string;
  /* 排序值 */
  sortOrder?: null | number;
};

/**
 *  类型定义 [MembershipPageConfigItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type MembershipPageConfigItemDto = {
  /* 关联协议列表 */
  agreements: AgreementListItemDto[];
  /* 确认开通协议提示文案 */
  checkoutAgreementText: string;
  /* 创建时间 */
  createdAt: string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 会员说明条目 */
  memberNoticeItems?: null | string[];
  /* 页面业务键，由服务端生成 */
  pageKey: string;
  /* 绑定套餐列表 */
  plans: MembershipPlanOutputDto[];
  /* 排序值 */
  sortOrder: number;
  /* 支付按钮文案模板 */
  submitButtonTemplate: string;
  /* 页面标题 */
  title: string;
  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [AgreementListItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AgreementListItemDto = {
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
 *  类型定义 [MembershipPlanOutputDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type MembershipPlanOutputDto = {
  /* 开通赠送积分数量 */
  bonusPointAmount: number;
  /* 创建时间 */
  createdAt: string;
  /* 订阅页营销标签 */
  displayTag: string;
  /* 有效天数 */
  durationDays: number;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 套餐名称 */
  name: string;
  /* 划线原价，单位为分 */
  originalPriceAmount: number;
  /* 套餐业务键，由服务端生成 */
  planKey: string;
  /* 套餐售价，单位为分 */
  priceAmount: number;
  /* 排序值 */
  sortOrder: number;
  /* 套餐层级（1=VIP；2=超级 VIP） */
  tier: number;
  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CreateMembershipPageConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateMembershipPageConfigDto = {
  /* 关联协议 ID 列表，按输入顺序展示 */
  agreementIds?: null | number[];
  /* 确认开通协议提示文案 */
  checkoutAgreementText?: null | string;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 会员说明条目 */
  memberNoticeItems?: null | string[];
  /* 绑定套餐 ID 列表，按输入顺序展示 */
  planIds?: null | number[];
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
  /* 关联协议 ID 列表，按输入顺序展示 */
  agreementIds?: null | number[];
  /* 确认开通协议提示文案 */
  checkoutAgreementText?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 会员说明条目 */
  memberNoticeItems?: null | string[];
  /* 绑定套餐 ID 列表，按输入顺序展示 */
  planIds?: null | number[];
  /* 排序值 */
  sortOrder?: null | number;
  /* 支付按钮文案模板 */
  submitButtonTemplate?: null | string;
  /* 页面标题 */
  title?: null | string;
};

/**
 *  类型定义 [BaseMembershipBenefitDefinitionDto]
 *  @来源 legacy compatibility alias
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseMembershipBenefitDefinitionDto =
  MembershipBenefitDefinitionOutputDto;
