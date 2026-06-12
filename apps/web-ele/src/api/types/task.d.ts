/**
 *  类型定义 [TaskCreateRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskCreateRequest = CreateTaskDefinitionDto;

export type TaskCreateResponse = boolean;

/**
 *  类型定义 [TaskUpdateRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskUpdateRequest = UpdateTaskDefinitionDto;

export type TaskUpdateResponse = boolean;

/**
 *  类型定义 [TaskUpdateStatusRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskUpdateStatusRequest = UpdateTaskDefinitionStatusDto;

export type TaskUpdateStatusResponse = boolean;

/**
 *  类型定义 [TaskDeleteRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskDeleteRequest = IdDto;

export type TaskDeleteResponse = boolean;

export type TaskTemplateOptionsResponse = TaskTemplateOptionsResponseDto;

/**
 *  类型定义 [TaskPageRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskPageRequest = {
  /* 结束时间 */
  endDate?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 任务场景类型（1=新手引导；2=日常；4=活动） */
  sceneType?: 1 | 2 | 4;

  /* 开始时间 */
  startDate?: null | string;

  /* 任务状态（0=草稿；1=生效中；2=已暂停；3=已归档） */
  status?: 0 | 1 | 2 | 3;

  /* 任务标题 */
  title?: string;
};

export type TaskPageResponse = {
  /* 列表数据 */
  list?: AdminTaskDefinitionListItemDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [TaskDetailRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskDetailRequest = {
  /* 主键id */
  id: number;
};

export type TaskDetailResponse = AdminTaskDefinitionDetailDto;

/**
 *  类型定义 [TaskInstancePageRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskInstancePageRequest = {
  /* 结束时间 */
  endDate?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 任务场景类型（1=新手引导；2=日常；4=活动） */
  sceneType?: 1 | 2 | 4;

  /* 开始时间 */
  startDate?: null | string;

  /* 实例状态（0=待开始；1=进行中；2=已完成；3=已过期） */
  status?: 0 | 1 | 2 | 3;

  /* 任务头 ID */
  taskId?: number;

  /* 用户 ID */
  userId?: number;
};

export type TaskInstancePageResponse = {
  /* 列表数据 */
  list?: AdminTaskInstancePageItemDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [TaskInstanceReconciliationPageRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskInstanceReconciliationPageRequest = {
  /* 结束时间 */
  endDate?: null | string;

  /* 任务实例 ID */
  instanceId?: null | number;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 奖励结算事实 ID */
  rewardSettlementId?: null | number;

  /* 补偿状态（0=待补偿重试；1=已补偿成功；2=终态失败） */
  settlementStatus?: 0 | 1 | 2;

  /* 开始时间 */
  startDate?: null | string;

  /* 任务头 ID */
  taskId?: number;

  /* 用户 ID */
  userId?: number;
};

export type TaskInstanceReconciliationPageResponse = {
  /* 列表数据 */
  list?: AdminTaskReconciliationItemDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [TaskInstanceRewardRetryRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskInstanceRewardRetryRequest = IdDto;

export type TaskInstanceRewardRetryResponse = TaskRewardRetryResultDto;

/**
 *  类型定义 [TaskInstanceRewardRetryPendingBatchRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskInstanceRewardRetryPendingBatchRequest =
  RetryTaskRewardBatchDto;

export type TaskInstanceRewardRetryPendingBatchResponse =
  TaskRewardRetryBatchResultDto;

/**
 *  类型定义 [TaskEventFailurePageRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskEventFailurePageRequest = {
  /* 结束时间 */
  endDate?: null | string;

  /* 事件业务幂等键 */
  eventBizKey?: string;

  /* 成长事件编码 */
  eventCode?: number;

  /* 成长事件 key */
  eventKey?: string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 失败事实状态（1=待重试；2=重试中；3=已解决；4=终态失败） */
  status?: 1 | 2 | 3 | 4;

  /* 归属用户 ID */
  userId?: number;
};

export type TaskEventFailurePageResponse = {
  /* 列表数据 */
  list?: BaseTaskEventFailureDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [TaskEventFailureRetryRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskEventFailureRetryRequest = IdDto;

export type TaskEventFailureRetryResponse = TaskEventFailureRetryResultDto;

/**
 *  类型定义 [TaskEventFailureRetryPendingBatchRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskEventFailureRetryPendingBatchRequest =
  RetryTaskEventFailureBatchDto;

export type TaskEventFailureRetryPendingBatchResponse =
  TaskEventFailureRetryBatchResultDto;

/**
 *  类型定义 [CreateTaskDefinitionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateTaskDefinitionDto = {
  /* 领取方式（1=自动领取；2=手动领取） */
  claimMode: 1 | 2;
  /* 完成聚合策略（1=所有步骤完成即完成） */
  completionPolicy: 1;
  /* 任务封面 */
  cover?: null | string;
  /* 任务描述 */
  description?: null | string;
  /* 生效结束时间 */
  endAt?: null | string;
  /* 重复周期类型（0=一次性；1=每日；2=每周；3=每月） */
  repeatType: 0 | 1 | 2 | 3;
  /* 任务完成后统一发放的奖励项列表 */
  rewardItems?: GrowthRewardItemDto[] | null;
  /* 任务场景类型（1=新手引导；2=日常；4=活动） */
  sceneType: 1 | 2 | 4;
  /* 排序值（0=默认排序，数值越小越靠前） */
  sortOrder: number;
  /* 生效开始时间 */
  startAt?: null | string;
  /* 任务状态（0=草稿；1=生效中；2=已暂停；3=已归档） */
  status: 0 | 1 | 2 | 3;
  /* 唯一步骤定义 */
  step: CreateTaskStepDto;
  /* 任务标题 */
  title: string;
};

/**
 *  类型定义 [GrowthRewardItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type GrowthRewardItemDto = {
  /* 奖励数量；必须为大于 0 的整数 */
  amount: number;
  /* 奖励资产键；积分/经验必须为空字符串，道具/虚拟货币/等级必须提供稳定业务键 */
  assetKey?: null | string;
  /* 奖励资产类型（1=积分；2=经验；3=道具；4=虚拟货币；5=等级） */
  assetType: 1 | 2 | 3 | 4 | 5;
};

/**
 *  类型定义 [CreateTaskStepDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateTaskStepDto = {
  /* 去重范围（1=按周期唯一；2=终身唯一） */
  dedupeScope?: 1 | 2 | null;
  /* 步骤描述 */
  description?: null | string;
  /* 步骤过滤条件列表 */
  filters?: null | TaskTemplateFilterValueDto[];
  /* 完成次数 */
  targetValue: number;
  /* 事件模板键 */
  templateKey?: null | string;
  /* 步骤触发方式（1=手动；2=事件驱动） */
  triggerMode: 1 | 2;
};

/**
 *  类型定义 [TaskTemplateFilterValueDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskTemplateFilterValueDto = {
  /* 过滤字段稳定键 */
  key: string;
  /* 字段展示名称 */
  label?: null | string;
  /* 过滤字段值的结构化字符串表示 */
  value: string;
};

/**
 *  类型定义 [UpdateTaskDefinitionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateTaskDefinitionDto = {
  /* 领取方式（1=自动领取；2=手动领取） */
  claimMode?: 1 | 2;
  /* 完成聚合策略（1=所有步骤完成即完成） */
  completionPolicy?: 1;
  /* 任务封面 */
  cover?: null | string;
  /* 任务描述 */
  description?: null | string;
  /* 生效结束时间 */
  endAt?: null | string;
  /* 主键id */
  id: number;
  /* 重复周期类型（0=一次性；1=每日；2=每周；3=每月） */
  repeatType?: 0 | 1 | 2 | 3;
  /* 任务完成后统一发放的奖励项列表 */
  rewardItems?: GrowthRewardItemDto[] | null;
  /* 任务场景类型（1=新手引导；2=日常；4=活动） */
  sceneType?: 1 | 2 | 4;
  /* 排序值（0=默认排序，数值越小越靠前） */
  sortOrder?: number;
  /* 生效开始时间 */
  startAt?: null | string;
  /* 任务状态（0=草稿；1=生效中；2=已暂停；3=已归档） */
  status?: 0 | 1 | 2 | 3;
  /* 唯一步骤定义 */
  step?: CreateTaskStepDto;
  /* 任务标题 */
  title?: string;
};

/**
 *  类型定义 [UpdateTaskDefinitionStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateTaskDefinitionStatusDto = {
  /* 主键id */
  id: number;
  /* 任务状态（0=草稿；1=生效中；2=已暂停；3=已归档） */
  status: 0 | 1 | 2 | 3;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type IdDto = {
  /* 主键id */
  id: number;
};

/**
 *  类型定义 [TaskTemplateOptionsResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskTemplateOptionsResponseDto = {
  /* 模板列表 */
  list: TaskEventTemplateOptionDto[];
};

/**
 *  类型定义 [TaskEventTemplateOptionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskEventTemplateOptionDto = {
  /* 可选过滤字段列表 */
  availableFilterFields: TaskTemplateFilterFieldDto[];
  /* 底层事件实现状态（已声明但未接线；已正式接线；仅保留历史兼容） */
  implStatus: 'declared' | 'implemented' | 'legacy_compat';
  /* 当前是否允许正式创建为生效任务 */
  isSelectable: boolean;
  /* 模板名称 */
  label: string;
  /* 当前模板是否支持按不同对象累计 */
  supportsUniqueCounting: boolean;
  /* 命中的目标实体类型（用户；任务头；任务实例；论坛主题；论坛回复；评论；漫画作品；小说作品；漫画章节；小说章节；签到记录；徽章；用户资料；通用内容；举报；被举报目标；管理端操作） */
  targetEntityType:
    | 'admin_operation'
    | 'badge'
    | 'check_in'
    | 'comic_chapter'
    | 'comic_work'
    | 'comment'
    | 'content'
    | 'forum_reply'
    | 'forum_topic'
    | 'novel_chapter'
    | 'novel_work'
    | 'report'
    | 'reported_target'
    | 'task'
    | 'task_instance'
    | 'user'
    | 'user_profile';
  /* 模板稳定键 */
  templateKey: string;
  /* 需要在后台显式展示的提醒文案 */
  warningHints: string[];
};

/**
 *  类型定义 [TaskTemplateFilterFieldDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskTemplateFilterFieldDto = {
  /* 字段业务说明 */
  description: string;
  /* 过滤字段稳定键 */
  key: string;
  /* 运营侧可见名称 */
  label: string;
  /* 后端匹配操作符 */
  operator?: null | string;
  /* 可选择的受控选项；为空时按 valueType 使用普通输入 */
  options?: TaskTemplateFilterFieldOptionDto[];
  /* 运营填写提示 */
  placeholder?: null | string;
  /* 字段值类型（数值；字符串；布尔值） */
  valueType: 'boolean' | 'number' | 'string';
};

/**
 *  类型定义 [TaskTemplateFilterFieldOptionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskTemplateFilterFieldOptionDto = {
  /* 选项展示名 */
  label: string;
  /* 选项值 */
  value: string;
};

/**
 *  类型定义 [AdminTaskDefinitionListItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminTaskDefinitionListItemDto = {
  /* 活跃实例数量 */
  activeInstanceCount: number;
  /* 领取方式（1=自动领取；2=手动领取） */
  claimMode: 1 | 2;
  /* 任务编码 */
  code: string;
  /* 完成聚合策略（1=所有步骤完成即完成） */
  completionPolicy: 1;
  /* 任务封面 */
  cover: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 任务描述 */
  description: null | string;
  /* 生效结束时间 */
  endAt: null | string;
  /* 主键id */
  id: number;
  /* 待补偿奖励数量 */
  pendingRewardCompensationCount: number;
  /* 重复周期类型（0=一次性；1=每日；2=每周；3=每月） */
  repeatType: 0 | 1 | 2 | 3;
  /* 任务完成后统一发放的奖励项列表 */
  rewardItems: GrowthRewardItemDto[] | null;
  /* 任务场景类型（1=新手引导；2=日常；4=活动） */
  sceneType: 1 | 2 | 4;
  /* 排序值（0=默认排序，数值越小越靠前） */
  sortOrder: number;
  /* 生效开始时间 */
  startAt: null | string;
  /* 任务状态（0=草稿；1=生效中；2=已暂停；3=已归档） */
  status: 0 | 1 | 2 | 3;
  /* 步骤数量 */
  stepCount: number;
  /* 任务标题 */
  title: string;
  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [AdminTaskDefinitionDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminTaskDefinitionDetailDto = {
  /* 活跃实例数量 */
  activeInstanceCount: number;
  /* 领取方式（1=自动领取；2=手动领取） */
  claimMode: 1 | 2;
  /* 任务编码 */
  code: string;
  /* 完成聚合策略（1=所有步骤完成即完成） */
  completionPolicy: 1;
  /* 任务封面 */
  cover: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 任务描述 */
  description: null | string;
  /* 生效结束时间 */
  endAt: null | string;
  /* 主键id */
  id: number;
  /* 待补偿奖励数量 */
  pendingRewardCompensationCount: number;
  /* 重复周期类型（0=一次性；1=每日；2=每周；3=每月） */
  repeatType: 0 | 1 | 2 | 3;
  /* 任务完成后统一发放的奖励项列表 */
  rewardItems: GrowthRewardItemDto[] | null;
  /* 任务场景类型（1=新手引导；2=日常；4=活动） */
  sceneType: 1 | 2 | 4;
  /* 排序值（0=默认排序，数值越小越靠前） */
  sortOrder: number;
  /* 生效开始时间 */
  startAt: null | string;
  /* 任务状态（0=草稿；1=生效中；2=已暂停；3=已归档） */
  status: 0 | 1 | 2 | 3;
  /* 步骤数量 */
  stepCount: number;
  /* 步骤列表 */
  steps: TaskStepSummaryDto[];
  /* 任务标题 */
  title: string;
  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [TaskStepSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskStepSummaryDto = {
  /* 创建时间 */
  createdAt: string;
  /* 去重范围（1=按周期唯一；2=终身唯一） */
  dedupeScope: 1 | 2 | null;
  /* 步骤描述 */
  description: null | string;
  /* 步骤过滤条件列表 */
  filters: null | TaskTemplateFilterValueDto[];
  /* 主键id */
  id: number;
  /* 步骤稳定键 */
  stepKey: string;
  /* 步骤顺序 */
  stepNo: number;
  /* 完成次数 */
  targetValue: number;
  /* 事件模板键 */
  templateKey: null | string;
  /* 步骤标题 */
  title: string;
  /* 步骤触发方式（1=手动；2=事件驱动） */
  triggerMode: 1 | 2;
  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [AdminTaskInstancePageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminTaskInstancePageItemDto = {
  /* 领取时间 */
  claimedAt: null | string;
  /* 完成时间 */
  completedAt: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 周期键 */
  cycleKey: string;
  /* 过期时间 */
  expiredAt: null | string;
  /* 主键id */
  id: number;
  /* 是否需要奖励结算（0=无奖励；1=需要奖励结算） */
  rewardApplicable: number;
  /* 奖励结算摘要 */
  rewardSettlement: TaskRewardSettlementSummaryDto;
  /* 奖励结算事实 ID */
  rewardSettlementId: null | number;
  /* 实例状态（0=待开始；1=进行中；2=已完成；3=已过期） */
  status: 0 | 1 | 2 | 3;
  /* 步骤进度列表 */
  steps: TaskInstanceStepViewDto[];
  /* 任务头详情 */
  task: AdminTaskDefinitionDetailDto;
  /* 任务头 ID */
  taskId: number;
  /* 更新时间 */
  updatedAt: string;
  /* 用户 ID */
  userId: number;
  /* 统一后的用户可见状态（可领取；已领取；进行中；已完成；奖励待补偿；奖励已到账；已过期；当前不可用） */
  visibleStatus:
    | 'claimable'
    | 'claimed'
    | 'completed'
    | 'expired'
    | 'in_progress'
    | 'reward_granted'
    | 'reward_pending'
    | 'unavailable';
};

/**
 *  类型定义 [TaskInstanceStepViewDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskInstanceStepViewDto = {
  /* 步骤完成时间 */
  completedAt: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 当前进度值 */
  currentValue: number;
  /* 主键id */
  id: number;
  /* 步骤状态（0=待开始；1=进行中；2=已完成；3=已过期） */
  status: 0 | 1 | 2 | 3;
  /* 步骤定义 ID */
  stepId: number;
  /* 目标值 */
  targetValue: number;
  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [TaskRewardSettlementSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskRewardSettlementSummaryDto = {
  /* 主键id */
  id: number;
  /* 最近一次失败原因 */
  lastError: null | string;
  /* 最近一次重试时间 */
  lastRetryAt: null | string;
  /* 本次补偿关联到账本记录 ID 列表 */
  ledgerRecordIds: number[];
  /* 已执行的补偿重试次数 */
  retryCount: number;
  /* 最近一次补偿状态落定时间 */
  settledAt: null | string;
  /* 补偿结果类型（1=真实落账；2=命中幂等；3=本次处理失败） */
  settlementResultType: 1 | 2 | 3 | null;
  /* 补偿状态（0=待补偿重试；1=已补偿成功；2=终态失败） */
  settlementStatus: 0 | 1 | 2;
};

/**
 *  类型定义 [AdminTaskReconciliationItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminTaskReconciliationItemDto = {
  /* 领取时间 */
  claimedAt: null | string;
  /* 完成时间 */
  completedAt: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 周期键 */
  cycleKey: string;
  /* 过期时间 */
  expiredAt: null | string;
  /* 主键id */
  id: number;
  /* 最近事件摘要 */
  latestEvent: TaskLatestEventSummaryDto;
  /* 是否需要奖励结算（0=无奖励；1=需要奖励结算） */
  rewardApplicable: number;
  /* 奖励结算摘要 */
  rewardSettlement: TaskRewardSettlementSummaryDto;
  /* 奖励结算事实 ID */
  rewardSettlementId: null | number;
  /* 实例状态（0=待开始；1=进行中；2=已完成；3=已过期） */
  status: 0 | 1 | 2 | 3;
  /* 步骤进度列表 */
  steps: TaskInstanceStepViewDto[];
  /* 任务头详情 */
  task: AdminTaskDefinitionDetailDto;
  /* 任务头 ID */
  taskId: number;
  /* 唯一事实摘要列表 */
  uniqueFacts: TaskUniqueFactSummaryDto[];
  /* 更新时间 */
  updatedAt: string;
  /* 用户 ID */
  userId: number;
  /* 统一后的用户可见状态（可领取；已领取；进行中；已完成；奖励待补偿；奖励已到账；已过期；当前不可用） */
  visibleStatus:
    | 'claimable'
    | 'claimed'
    | 'completed'
    | 'expired'
    | 'in_progress'
    | 'reward_granted'
    | 'reward_pending'
    | 'unavailable';
};

/**
 *  类型定义 [TaskLatestEventSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskLatestEventSummaryDto = {
  /* 最近事件是否被接受计入进度 */
  accepted: boolean;
  /* 最近事件业务键 */
  eventBizKey: null | string;
  /* 最近事件发生时间 */
  occurredAt: null | string;
  /* 最近事件拒绝原因 */
  rejectReason: null | string;
  /* 最近事件目标 ID */
  targetId: null | number;
  /* 最近事件目标类型 */
  targetType: null | string;
};

/**
 *  类型定义 [TaskUniqueFactSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskUniqueFactSummaryDto = {
  /* 去重范围（1=按周期唯一；2=终身唯一） */
  dedupeScope: 1 | 2;
  /* 当前实例对应作用域内已命中的唯一事实数量 */
  factCount: number;
  /* 最近一次命中的唯一维度值 */
  latestDimensionValue: null | string;
  /* 最近一次命中的发生时间 */
  latestOccurredAt: null | string;
  /* 步骤定义 ID */
  stepId: number;
};

/**
 *  类型定义 [TaskRewardRetryResultDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskRewardRetryResultDto = {
  /* 任务实例 ID */
  instanceId: number;
  /* 本次重试处理结果说明 */
  message: string;
  /* 奖励结算事实 ID */
  rewardSettlementId: null | number;
  /* 补偿状态（0=待补偿重试；1=已补偿成功；2=终态失败） */
  settlementStatus: 0 | 1 | 2 | null;
  /* 本次重试后是否已补偿成功 */
  succeeded: boolean;
};

/**
 *  类型定义 [RetryTaskRewardBatchDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type RetryTaskRewardBatchDto = {
  /* 创建结束日期（应用时区 YYYY-MM-DD，后端按次日零点开区间处理） */
  endDate?: null | string;
  /* 指定重试的任务实例 ID 列表；传入后只扫描这些实例 */
  instanceIds?: number[];
  /* 本次最多扫描的待补偿任务实例数，最大 500 */
  limit?: null | number;
  /* 奖励结算事实 ID；来自后台高级诊断筛选条件 */
  rewardSettlementId?: null | number;
  /* 奖励结算状态；来自后台筛选条件（0=待补偿重试；1=已补偿成功；2=终态失败无需再次重试） */
  settlementStatus?: 0 | 1 | 2 | null;
  /* 创建开始日期（应用时区 YYYY-MM-DD） */
  startDate?: null | string;
  /* 任务 ID；来自后台筛选条件 */
  taskId?: null | number;
  /* 用户 ID；来自后台筛选条件 */
  userId?: null | number;
};

/**
 *  类型定义 [TaskRewardRetryBatchResultDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskRewardRetryBatchResultDto = {
  /* 本次补偿后仍未成功的任务实例数 */
  failedCount: number;
  /* 失败摘要列表，最多返回前 20 条 */
  failures: TaskRewardRetryFailureDto[];
  /* 本次扫描到的任务实例数 */
  scannedCount: number;
  /* 本次扫描后判定不可重试并跳过的任务实例数 */
  skippedCount: number;
  /* 本次补偿成功数 */
  succeededCount: number;
};

/**
 *  类型定义 [TaskRewardRetryFailureDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskRewardRetryFailureDto = {
  /* 任务实例 ID */
  instanceId: number;
  /* 失败原因摘要 */
  message: string;
  /* 奖励结算事实 ID */
  rewardSettlementId: null | number;
};

/**
 *  类型定义 [BaseTaskEventFailureDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type BaseTaskEventFailureDto = {
  /* 创建时间 */
  createdAt: string;
  /* 事件业务幂等键 */
  eventBizKey: string;
  /* 成长事件编码 */
  eventCode: number;
  /* 成长事件 key */
  eventKey: string;
  /* 主键id */
  id: number;
  /* 任务事件消费失败幂等键 */
  idempotencyKey: string;
  /* 最近一次失败原因 */
  lastErrorMessage: null | string;
  /* 最近一次重试时间 */
  lastRetryAt: null | string;
  /* 事件发生时间 */
  occurredAt: string;
  /* 重试所需事件快照 JSON */
  requestPayload: Record<string, any>;
  /* 解决时间 */
  resolvedAt: null | string;
  /* 已执行重试次数，默认最多 5 次 */
  retryCount: number;
  /* 失败事实状态（1=待重试；2=重试中；3=已解决；4=终态失败） */
  status: 1 | 2 | 3 | 4;
  /* 事件目标 ID */
  targetId: null | number;
  /* 事件目标类型 */
  targetType: null | string;
  /* 事件模板键 */
  templateKey: null | string;
  /* 终态失败时间 */
  terminalErrorAt: null | string;
  /* 终态失败原因 */
  terminalReason: null | string;
  /* 更新时间 */
  updatedAt: string;
  /* 归属用户 ID */
  userId: number;
};

/**
 *  类型定义 [TaskEventFailureRetryResultDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskEventFailureRetryResultDto = {
  /* 失败事实 ID */
  failureId: number;
  /* 处理结果说明 */
  message: string;
  /* 重试后的累计重试次数 */
  retryCount: number;
  /* 重试后的失败事实状态（1=待重试；2=重试中；3=已解决；4=终态失败） */
  status: 1 | 2 | 3 | 4;
};

/**
 *  类型定义 [RetryTaskEventFailureBatchDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type RetryTaskEventFailureBatchDto = {
  /* 本次最多扫描的待重试失败事实数，最大 500 */
  limit?: null | number;
};

/**
 *  类型定义 [TaskEventFailureRetryBatchResultDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskEventFailureRetryBatchResultDto = {
  /* 本次重试后仍失败的事实数 */
  failedCount: number;
  /* 失败摘要列表，最多返回前 20 条 */
  failures: TaskEventFailureRetryFailureDto[];
  /* 本次扫描到的失败事实数 */
  scannedCount: number;
  /* 本次扫描后跳过的事实数 */
  skippedCount: number;
  /* 本次重试成功数 */
  succeededCount: number;
};

/**
 *  类型定义 [TaskEventFailureRetryFailureDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskEventFailureRetryFailureDto = {
  /* 失败事实 ID */
  failureId: number;
  /* 失败原因摘要 */
  message: string;
};
