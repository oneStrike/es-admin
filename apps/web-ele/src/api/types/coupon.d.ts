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
 *  类型定义 [CouponGrantWorkflowCreateRequest]
 *  @来源 券管理
 *  @更新时间 2026-05-09 22:20:06
 */
export type CouponGrantWorkflowCreateRequest = CreateCouponGrantWorkflowDto;

export type CouponGrantWorkflowCreateResponse = WorkflowJobDto;

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
 *  类型定义 [CreateCouponGrantWorkflowDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateCouponGrantWorkflowDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 券定义 ID */
  couponDefinitionId: number;
  /* 后台批量发券操作幂等 ID */
  operationId: string;
  /* 每个用户发放数量 */
  quantity?: null | number;
  /* 后台备注 */
  remark?: null | string;

  /* APP 用户 ID 列表 */
  userIds: number[];
};

/**
 *  类型定义 [WorkflowJobDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type WorkflowJobDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 归档时间；为空表示未归档 */
  archivedAt?: null | string;
  /* 取消请求时间 */
  cancelRequestedAt?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 展示名称 */
  displayName: string;
  /* 草稿过期时间 */
  expiresAt?: null | string;
  /* 失败条目数 */
  failedItemCount: number;
  /* 完成时间 */
  finishedAt?: null | string;
  /* 主键ID */
  id: number;
  /* 工作流任务ID */
  jobId: string;
  /* 操作者类型（1=后台管理员；2=系统） */
  operatorType: 1 | 2;
  /* 后台管理员操作者ID；系统任务为空 */
  operatorUserId?: null | number;
  /* 当前进度展示代码；后台根据代码和上下文生成文案 */
  progressCode?: null | string;
  /* 当前进度展示上下文 */
  progressContext?: null | Record<string, any>;
  /* 结构化进度详情快照；用于展示当前运行中的子进度 */
  progressDetail?: null | Record<string, any>;
  /* 进度百分比 */
  progressPercent: number;
  /* 选中条目数 */
  selectedItemCount: number;
  /* 跳过条目数 */
  skippedItemCount: number;
  /* 开始处理时间 */
  startedAt?: null | string;
  /* 任务状态（1=草稿；2=待处理；3=处理中；4=成功；5=部分失败；6=失败；7=已取消；8=已过期） */
  status: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  /* 成功条目数 */
  successItemCount: number;
  /* 运行时非查询诊断摘要 */
  summary?: null | Record<string, any>;
  /* 更新时间 */
  updatedAt: string;

  /* 工作流类型 */
  workflowType: string;
};
