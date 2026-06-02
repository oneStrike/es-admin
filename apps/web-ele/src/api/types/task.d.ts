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
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 任务场景类型（1=新手引导；2=日常；4=活动） */
  sceneType?: number;

  /* 开始时间 */
  startDate?: null | string;

  /* 任务状态（0=草稿；1=生效中；2=已暂停；3=已归档） */
  status?: number;

  /* 任务标题 */
  title?: string;
};

export type TaskPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

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
  /** 任意合法数值 */
  [property: string]: any;

  id: number;
};

export type TaskDetailResponse = AdminTaskDefinitionDetailDto;

/**
 *  类型定义 [TaskInstancePageRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskInstancePageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 结束时间 */
  endDate?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 任务场景类型（1=新手引导；2=日常；4=活动） */
  sceneType?: number;

  /* 开始时间 */
  startDate?: null | string;

  /* 实例状态（0=待开始；1=进行中；2=已完成；3=已过期） */
  status?: number;

  /* 任务头 ID */
  taskId?: number;

  /* 用户 ID */
  userId?: number;
};

export type TaskInstancePageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: TaskInstanceViewDto[];

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
  /** 任意合法数值 */
  [property: string]: any;

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
  settlementStatus?: number;

  /* 开始时间 */
  startDate?: null | string;

  /* 任务头 ID */
  taskId?: number;

  /* 用户 ID */
  userId?: number;
};

export type TaskInstanceReconciliationPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

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
 *  类型定义 [CreateTaskDefinitionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateTaskDefinitionDto = {
  /** 任意合法数值 */
  [property: string]: any;
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
  rewardItems?: GrowthRewardItemDto[];
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
  /** 任意合法数值 */
  [property: string]: any;
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
  /** 任意合法数值 */
  [property: string]: any;
  /* 去重范围（1=按周期唯一；2=终身唯一） */
  dedupeScope?: 1 | 2 | null;
  /* 步骤描述 */
  description?: null | string;
  /* 步骤过滤条件列表 */
  filters?: TaskTemplateFilterValueDto[];
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
  /** 任意合法数值 */
  [property: string]: any;
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
  /** 任意合法数值 */
  [property: string]: any;
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
  rewardItems?: GrowthRewardItemDto[];
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
  /** 任意合法数值 */
  [property: string]: any;
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
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [TaskTemplateOptionsResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskTemplateOptionsResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 模板列表 */
  list: TaskEventTemplateOptionDto[];
};

/**
 *  类型定义 [TaskEventTemplateOptionDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskEventTemplateOptionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 可选过滤字段列表 */
  availableFilterFields: TaskTemplateFilterFieldDto[];
  /* 底层事件实现状态（declared=已声明但未接线；implemented=已正式接线；legacy_compat=仅保留历史兼容） */
  implStatus: 'declared' | 'implemented' | 'legacy_compat';
  /* 当前是否允许正式创建为生效任务 */
  isSelectable: boolean;
  /* 模板名称 */
  label: string;
  /* 当前模板是否支持按不同对象累计 */
  supportsUniqueCounting: boolean;
  /* 命中的目标实体类型（如 comic_work=漫画作品；novel_work=小说作品；content=内容；user=用户） */
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
  /** 任意合法数值 */
  [property: string]: any;
  /* 字段业务说明 */
  description: string;
  /* 过滤字段稳定键 */
  key: string;
  /* 运营侧可见名称 */
  label: string;

  /* 字段值类型（number=数值；string=字符串；boolean=布尔值） */
  valueType: 'boolean' | 'number' | 'string';
};

/**
 *  类型定义 [AdminTaskDefinitionListItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminTaskDefinitionListItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 活跃实例数量 */
  activeInstanceCount: number;
  /* 领取方式（1=自动领取；2=手动领取） */
  claimMode: 1 | 2;
  /* 任务编码 */
  code: string;
  /* 完成聚合策略（1=所有步骤完成即完成） */
  completionPolicy: 1;
  /* 任务封面 */
  cover?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 任务描述 */
  description?: null | string;
  /* 生效结束时间 */
  endAt?: null | string;
  /* 主键id */
  id: number;
  /* 待补偿奖励数量 */
  pendingRewardCompensationCount: number;
  /* 重复周期类型（0=一次性；1=每日；2=每周；3=每月） */
  repeatType: 0 | 1 | 2 | 3;
  /* 任务完成后统一发放的奖励项列表 */
  rewardItems?: GrowthRewardItemDto[];
  /* 任务场景类型（1=新手引导；2=日常；4=活动） */
  sceneType: 1 | 2 | 4;
  /* 排序值（0=默认排序，数值越小越靠前） */
  sortOrder: number;
  /* 生效开始时间 */
  startAt?: null | string;
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
  /** 任意合法数值 */
  [property: string]: any;
  /* 活跃实例数量 */
  activeInstanceCount: number;
  /* 领取方式（1=自动领取；2=手动领取） */
  claimMode: 1 | 2;
  /* 任务编码 */
  code: string;
  /* 完成聚合策略（1=所有步骤完成即完成） */
  completionPolicy: 1;
  /* 任务封面 */
  cover?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 任务描述 */
  description?: null | string;
  /* 生效结束时间 */
  endAt?: null | string;
  /* 主键id */
  id: number;
  /* 待补偿奖励数量 */
  pendingRewardCompensationCount: number;
  /* 重复周期类型（0=一次性；1=每日；2=每周；3=每月） */
  repeatType: 0 | 1 | 2 | 3;
  /* 任务完成后统一发放的奖励项列表 */
  rewardItems?: GrowthRewardItemDto[];
  /* 任务场景类型（1=新手引导；2=日常；4=活动） */
  sceneType: 1 | 2 | 4;
  /* 排序值（0=默认排序，数值越小越靠前） */
  sortOrder: number;
  /* 生效开始时间 */
  startAt?: null | string;
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
  /** 任意合法数值 */
  [property: string]: any;
  /* 创建时间 */
  createdAt: string;
  /* 去重范围（1=按周期唯一；2=终身唯一） */
  dedupeScope?: 1 | 2 | null;
  /* 步骤描述 */
  description?: null | string;
  /* 步骤过滤条件列表 */
  filters?: TaskTemplateFilterValueDto[];
  /* 主键id */
  id: number;
  /* 步骤稳定键 */
  stepKey: string;
  /* 步骤顺序 */
  stepNo: number;
  /* 完成次数 */
  targetValue: number;
  /* 事件模板键 */
  templateKey?: null | string;
  /* 步骤标题 */
  title: string;
  /* 步骤触发方式（1=手动；2=事件驱动） */
  triggerMode: 1 | 2;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [TaskInstanceViewDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskInstanceViewDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 领取时间 */
  claimedAt?: null | string;
  /* 完成时间 */
  completedAt?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 周期键 */
  cycleKey: string;
  /* 过期时间 */
  expiredAt?: null | string;
  /* 主键id */
  id: number;
  /* 是否需要奖励结算（0=无奖励；1=需要奖励结算） */
  rewardApplicable: number;
  /* 奖励结算摘要 */
  rewardSettlement?: TaskRewardSettlementSummaryDto;
  /* 奖励结算事实 ID */
  rewardSettlementId?: null | number;
  /* 实例状态（0=待开始；1=进行中；2=已完成；3=已过期） */
  status: 0 | 1 | 2 | 3;
  /* 步骤进度列表 */
  steps: TaskInstanceStepViewDto[];
  /* 任务头 ID */
  taskId: number;
  /* 更新时间 */
  updatedAt: string;
  /* 用户 ID */
  userId: number;

  /* 统一后的用户可见状态（claimable=可领取；claimed=已领取；in_progress=进行中；completed=已完成；reward_pending=奖励待补偿；reward_granted=奖励已到账；expired=已过期；unavailable=当前不可用） */
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
  /** 任意合法数值 */
  [property: string]: any;
  /* 步骤完成时间 */
  completedAt?: null | string;
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
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;
  /* 最近一次失败原因 */
  lastError?: null | string;
  /* 最近一次重试时间 */
  lastRetryAt?: null | string;
  /* 本次补偿关联到账本记录 ID 列表 */
  ledgerRecordIds: number[];
  /* 已执行的补偿重试次数 */
  retryCount: number;
  /* 最近一次补偿状态落定时间 */
  settledAt?: null | string;
  /* 补偿结果类型（1=真实落账；2=命中幂等；3=本次处理失败） */
  settlementResultType?: 1 | 2 | 3 | null;

  /* 补偿状态（0=待补偿重试；1=已补偿成功；2=终态失败） */
  settlementStatus: 0 | 1 | 2;
};

/**
 *  类型定义 [AdminTaskReconciliationItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminTaskReconciliationItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 领取时间 */
  claimedAt?: null | string;
  /* 完成时间 */
  completedAt?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* 周期键 */
  cycleKey: string;
  /* 过期时间 */
  expiredAt?: null | string;
  /* 主键id */
  id: number;
  /* 最近事件摘要 */
  latestEvent?: TaskLatestEventSummaryDto;
  /* 是否需要奖励结算（0=无奖励；1=需要奖励结算） */
  rewardApplicable: number;
  /* 奖励结算摘要 */
  rewardSettlement?: TaskRewardSettlementSummaryDto;
  /* 奖励结算事实 ID */
  rewardSettlementId?: null | number;
  /* 实例状态（0=待开始；1=进行中；2=已完成；3=已过期） */
  status: 0 | 1 | 2 | 3;
  /* 步骤进度列表 */
  steps: TaskInstanceStepViewDto[];
  /* 任务头详情 */
  task?: AdminTaskDefinitionDetailDto;
  /* 任务头 ID */
  taskId: number;
  /* 唯一事实摘要列表 */
  uniqueFacts?: TaskUniqueFactSummaryDto[];
  /* 更新时间 */
  updatedAt: string;
  /* 用户 ID */
  userId: number;

  /* 统一后的用户可见状态（claimable=可领取；claimed=已领取；in_progress=进行中；completed=已完成；reward_pending=奖励待补偿；reward_granted=奖励已到账；expired=已过期；unavailable=当前不可用） */
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
  /** 任意合法数值 */
  [property: string]: any;
  /* 最近事件是否被接受计入进度 */
  accepted: boolean;
  /* 最近事件业务键 */
  eventBizKey?: null | string;
  /* 最近事件发生时间 */
  occurredAt?: null | string;
  /* 最近事件拒绝原因 */
  rejectReason?: null | string;
  /* 最近事件目标 ID */
  targetId?: null | number;

  /* 最近事件目标类型 */
  targetType?: null | string;
};

/**
 *  类型定义 [TaskUniqueFactSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type TaskUniqueFactSummaryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 去重范围（1=按周期唯一；2=终身唯一） */
  dedupeScope: 1 | 2;
  /* 当前实例对应作用域内已命中的唯一事实数量 */
  factCount: number;
  /* 最近一次命中的唯一维度值 */
  latestDimensionValue?: null | string;
  /* 最近一次命中的发生时间 */
  latestOccurredAt?: null | string;

  /* 步骤定义 ID */
  stepId: number;
};
