/**
 *  类型定义 [TaskCreateRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-02 21:41:27
 */
export type TaskCreateRequest = CreateTaskDto

export type TaskCreateResponse = boolean

/**
 *  类型定义 [TaskUpdateRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-02 21:41:27
 */
export type TaskUpdateRequest = UpdateTaskDto

export type TaskUpdateResponse = boolean

/**
 *  类型定义 [TaskUpdateStatusRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-02 21:41:27
 */
export type TaskUpdateStatusRequest = UpdateTaskStatusDto

export type TaskUpdateStatusResponse = boolean

/**
 *  类型定义 [TaskDeleteRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-02 21:41:27
 */
export type TaskDeleteRequest = IdDto

export type TaskDeleteResponse = boolean

/**
 *  类型定义 [TaskPageRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-02 21:41:27
 */
export type TaskPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 启用状态 */
  isEnabled?: boolean

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 任务状态（0=DRAFT，1=PUBLISHED，2=OFFLINE） */
  status?: number

  /* 任务标题 */
  title?: string

  /* 任务场景类型（1=ONBOARDING，2=DAILY，4=CAMPAIGN） */
  type?: number
}

export type TaskPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: AdminTaskPageResponseDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [TaskDetailRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-02 21:41:27
 */
export type TaskDetailRequest = {
  
  /** 任意合法数值 */
  [property: string]: any

  id: number
}

export type TaskDetailResponse = AdminTaskPageResponseDto

/**
 *  类型定义 [TaskAssignmentPageRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-02 21:41:27
 */
export type TaskAssignmentPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 任务分配状态，PENDING 表示已领取待开始（0=PENDING，1=IN_PROGRESS，2=COMPLETED，3=EXPIRED） */
  status?: number

  /* 任务ID */
  taskId?: number

  /* 用户ID */
  userId?: number
}

export type TaskAssignmentPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: AdminTaskAssignmentPageResponseDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [TaskAssignmentReconciliationPageRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-02 21:41:27
 */
export type TaskAssignmentReconciliationPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 任务分配 ID */
  assignmentId?: null | number

  /* 结束时间 */
  endDate?: null | string

  /* 事件推进幂等键 */
  eventBizKey?: null | string

  /* 事件编码 */
  eventCode?: null | number

  /* 奖励到账提醒投递状态（DELIVERED=DELIVERED，FAILED=FAILED，RETRYING=RETRYING，SKIPPED_DUPLICATE=SKIPPED_DUPLICATE，SKIPPED_SELF=SKIPPED_SELF，SKIPPED_PREFERENCE=SKIPPED_PREFERENCE） */
  notificationStatus?: null | string

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 奖励结算状态（0=PENDING，1=SUCCESS，2=FAILED） */
  rewardStatus?: number

  /* 开始时间 */
  startDate?: null | string

  /* 任务ID */
  taskId?: number

  /* 用户ID */
  userId?: number
}

export type TaskAssignmentReconciliationPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: AdminTaskAssignmentReconciliationPageResponseDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [TaskAssignmentRetryRewardRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-02 21:41:27
 */
export type TaskAssignmentRetryRewardRequest = RetryTaskAssignmentRewardDto

export type TaskAssignmentRetryRewardResponse = boolean

/**
 *  类型定义 [TaskAssignmentRetryRewardBatchRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-02 21:41:27
 */
export type TaskAssignmentRetryRewardBatchRequest = RetryCompletedTaskRewardsDto

export type TaskAssignmentRetryRewardBatchResponse = RetryCompletedTaskRewardsResponseDto

/**
 *  类型定义 [CreateTaskDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 21:41:27
 */
export type CreateTaskDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 领取模式（1=AUTO，2=MANUAL） */
  claimMode: 1 | 2
  /* 任务编码 */
  code: string
  /* 完成模式（1=AUTO，2=MANUAL） */
  completeMode: 1 | 2
  /* 封面图 */
  cover?: null | string
  /* 任务说明 */
  description?: null | string
  /* 目标事件编码，EVENT_COUNT 任务必填（1=CREATE_TOPIC，2=CREATE_REPLY，3=TOPIC_LIKED，4=REPLY_LIKED，5=TOPIC_FAVORITED，6=DAILY_CHECK_IN，7=ADMIN，8=TOPIC_VIEW，9=TOPIC_REPORT，16=TOPIC_COMMENT，10=CREATE_COMMENT，11=COMMENT_LIKED，12=COMMENT_REPORT，100=COMIC_WORK_VIEW，101=COMIC_WORK_LIKE，102=COMIC_WORK_FAVORITE，103=COMIC_WORK_REPORT，104=COMIC_WORK_COMMENT，200=NOVEL_WORK_VIEW，201=NOVEL_WORK_LIKE，202=NOVEL_WORK_FAVORITE，203=NOVEL_WORK_REPORT，204=NOVEL_WORK_COMMENT，300=COMIC_CHAPTER_READ，301=COMIC_CHAPTER_LIKE，302=COMIC_CHAPTER_PURCHASE，303=COMIC_CHAPTER_DOWNLOAD，304=COMIC_CHAPTER_EXCHANGE，305=COMIC_CHAPTER_REPORT，306=COMIC_CHAPTER_COMMENT，400=NOVEL_CHAPTER_READ，401=NOVEL_CHAPTER_LIKE，402=NOVEL_CHAPTER_PURCHASE，403=NOVEL_CHAPTER_DOWNLOAD，404=NOVEL_CHAPTER_EXCHANGE，405=NOVEL_CHAPTER_REPORT，406=NOVEL_CHAPTER_COMMENT，600=BADGE_EARNED，601=PROFILE_COMPLETE，602=AVATAR_UPLOAD，700=FOLLOW_USER，701=BE_FOLLOWED，702=SHARE_CONTENT，703=INVITE_USER，800=REPORT_VALID，801=REPORT_INVALID） */
  eventCode?: null | number
  /* 启用状态 */
  isEnabled: boolean
  /* 目标附加配置，EVENT_COUNT 任务可用于表达额外过滤条件 */
  objectiveConfig?: null | string
  /* 任务目标类型（1=MANUAL，2=EVENT_COUNT） */
  objectiveType: 1 | 2
  /* 优先级 */
  priority: number
  /* 发布结束时间 */
  publishEndAt?: null | string
  /* 发布开始时间 */
  publishStartAt?: null | string
  /* 周期规则，当前仅识别 type=once/daily/weekly/monthly；timezone 可选，使用 IANA 时区标识 */
  repeatRule?: null | string
  /* 奖励配置，当前仅支持 points / experience，且值必须为正整数 */
  rewardConfig?: null | string
  /* 任务状态（0=DRAFT，1=PUBLISHED，2=OFFLINE） */
  status: 0 | 1 | 2
  /* 完成目标次数，必须为大于 0 的整数 */
  targetCount: number
  /* 任务标题 */
  title: string

  /* 任务场景类型（1=ONBOARDING，2=DAILY，4=CAMPAIGN） */
  type: 1 | 2 | 4
}

/**
 *  类型定义 [UpdateTaskDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 21:41:27
 */
export type UpdateTaskDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 领取模式（1=AUTO，2=MANUAL） */
  claimMode?: 1 | 2
  /* 任务编码 */
  code?: string
  /* 完成模式（1=AUTO，2=MANUAL） */
  completeMode?: 1 | 2
  /* 封面图 */
  cover?: null | string
  /* 任务说明 */
  description?: null | string
  /* 目标事件编码，EVENT_COUNT 任务必填（1=CREATE_TOPIC，2=CREATE_REPLY，3=TOPIC_LIKED，4=REPLY_LIKED，5=TOPIC_FAVORITED，6=DAILY_CHECK_IN，7=ADMIN，8=TOPIC_VIEW，9=TOPIC_REPORT，16=TOPIC_COMMENT，10=CREATE_COMMENT，11=COMMENT_LIKED，12=COMMENT_REPORT，100=COMIC_WORK_VIEW，101=COMIC_WORK_LIKE，102=COMIC_WORK_FAVORITE，103=COMIC_WORK_REPORT，104=COMIC_WORK_COMMENT，200=NOVEL_WORK_VIEW，201=NOVEL_WORK_LIKE，202=NOVEL_WORK_FAVORITE，203=NOVEL_WORK_REPORT，204=NOVEL_WORK_COMMENT，300=COMIC_CHAPTER_READ，301=COMIC_CHAPTER_LIKE，302=COMIC_CHAPTER_PURCHASE，303=COMIC_CHAPTER_DOWNLOAD，304=COMIC_CHAPTER_EXCHANGE，305=COMIC_CHAPTER_REPORT，306=COMIC_CHAPTER_COMMENT，400=NOVEL_CHAPTER_READ，401=NOVEL_CHAPTER_LIKE，402=NOVEL_CHAPTER_PURCHASE，403=NOVEL_CHAPTER_DOWNLOAD，404=NOVEL_CHAPTER_EXCHANGE，405=NOVEL_CHAPTER_REPORT，406=NOVEL_CHAPTER_COMMENT，600=BADGE_EARNED，601=PROFILE_COMPLETE，602=AVATAR_UPLOAD，700=FOLLOW_USER，701=BE_FOLLOWED，702=SHARE_CONTENT，703=INVITE_USER，800=REPORT_VALID，801=REPORT_INVALID） */
  eventCode?: null | number
  /* 主键id */
  id: number
  /* 启用状态 */
  isEnabled?: boolean
  /* 目标附加配置，EVENT_COUNT 任务可用于表达额外过滤条件 */
  objectiveConfig?: null | string
  /* 任务目标类型（1=MANUAL，2=EVENT_COUNT） */
  objectiveType?: 1 | 2
  /* 优先级 */
  priority?: number
  /* 发布结束时间 */
  publishEndAt?: null | string
  /* 发布开始时间 */
  publishStartAt?: null | string
  /* 周期规则，当前仅识别 type=once/daily/weekly/monthly；timezone 可选，使用 IANA 时区标识 */
  repeatRule?: null | string
  /* 奖励配置，当前仅支持 points / experience，且值必须为正整数 */
  rewardConfig?: null | string
  /* 任务状态（0=DRAFT，1=PUBLISHED，2=OFFLINE） */
  status?: 0 | 1 | 2
  /* 完成目标次数，必须为大于 0 的整数 */
  targetCount?: number
  /* 任务标题 */
  title?: string

  /* 任务场景类型（1=ONBOARDING，2=DAILY，4=CAMPAIGN） */
  type?: 1 | 2 | 4
}

/**
 *  类型定义 [UpdateTaskStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 21:41:27
 */
export type UpdateTaskStatusDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number
  /* 启用状态 */
  isEnabled?: boolean

  /* 任务状态（0=DRAFT，1=PUBLISHED，2=OFFLINE） */
  status?: 0 | 1 | 2
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 21:41:27
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

/**
 *  类型定义 [AdminTaskPageResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 21:41:27
 */
export type AdminTaskPageResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 活跃 assignment 数（PENDING/IN_PROGRESS/COMPLETED） */
  activeAssignmentCount: number
  /* 领取模式（1=AUTO，2=MANUAL） */
  claimMode: 1 | 2
  /* 任务编码 */
  code: string
  /* 完成模式（1=AUTO，2=MANUAL） */
  completeMode: 1 | 2
  /* 封面图 */
  cover?: null | string
  /* 创建时间 */
  createdAt: string
  /* 任务说明 */
  description?: null | string
  /* 目标事件编码，EVENT_COUNT 任务必填（1=CREATE_TOPIC，2=CREATE_REPLY，3=TOPIC_LIKED，4=REPLY_LIKED，5=TOPIC_FAVORITED，6=DAILY_CHECK_IN，7=ADMIN，8=TOPIC_VIEW，9=TOPIC_REPORT，16=TOPIC_COMMENT，10=CREATE_COMMENT，11=COMMENT_LIKED，12=COMMENT_REPORT，100=COMIC_WORK_VIEW，101=COMIC_WORK_LIKE，102=COMIC_WORK_FAVORITE，103=COMIC_WORK_REPORT，104=COMIC_WORK_COMMENT，200=NOVEL_WORK_VIEW，201=NOVEL_WORK_LIKE，202=NOVEL_WORK_FAVORITE，203=NOVEL_WORK_REPORT，204=NOVEL_WORK_COMMENT，300=COMIC_CHAPTER_READ，301=COMIC_CHAPTER_LIKE，302=COMIC_CHAPTER_PURCHASE，303=COMIC_CHAPTER_DOWNLOAD，304=COMIC_CHAPTER_EXCHANGE，305=COMIC_CHAPTER_REPORT，306=COMIC_CHAPTER_COMMENT，400=NOVEL_CHAPTER_READ，401=NOVEL_CHAPTER_LIKE，402=NOVEL_CHAPTER_PURCHASE，403=NOVEL_CHAPTER_DOWNLOAD，404=NOVEL_CHAPTER_EXCHANGE，405=NOVEL_CHAPTER_REPORT，406=NOVEL_CHAPTER_COMMENT，600=BADGE_EARNED，601=PROFILE_COMPLETE，602=AVATAR_UPLOAD，700=FOLLOW_USER，701=BE_FOLLOWED，702=SHARE_CONTENT，703=INVITE_USER，800=REPORT_VALID，801=REPORT_INVALID） */
  eventCode?: null | number
  /* 主键id */
  id: number
  /* 启用状态 */
  isEnabled: boolean
  /* 最近一次任务提醒投递摘要 */
  latestReminder?: AdminTaskReminderSummaryDto
  /* 目标附加配置，EVENT_COUNT 任务可用于表达额外过滤条件 */
  objectiveConfig?: null | string
  /* 任务目标类型（1=MANUAL，2=EVENT_COUNT） */
  objectiveType: 1 | 2
  /* 待补偿奖励数（已完成但奖励未成功） */
  pendingRewardCompensationCount: number
  /* 优先级 */
  priority: number
  /* 发布结束时间 */
  publishEndAt?: null | string
  /* 发布开始时间 */
  publishStartAt?: null | string
  /* 周期规则，当前仅识别 type=once/daily/weekly/monthly；timezone 可选，使用 IANA 时区标识 */
  repeatRule?: null | string
  /* 奖励配置，当前仅支持 points / experience，且值必须为正整数 */
  rewardConfig?: null | string
  /* 任务状态（0=DRAFT，1=PUBLISHED，2=OFFLINE） */
  status: 0 | 1 | 2
  /* 完成目标次数，必须为大于 0 的整数 */
  targetCount: number
  /* 任务标题 */
  title: string
  /* 任务场景类型（1=ONBOARDING，2=DAILY，4=CAMPAIGN） */
  type: 1 | 2 | 4

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [AdminTaskReminderSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 21:41:27
 */
export type AdminTaskReminderSummaryDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 最近一次提醒失败原因 */
  failureReason?: null | string
  /* 最近一次提醒尝试时间 */
  lastAttemptAt?: null | string
  /* 最近一次任务提醒子类型 */
  reminderKind?: null | string
  /* 最近一次提醒投递状态（DELIVERED=DELIVERED，FAILED=FAILED，RETRYING=RETRYING，SKIPPED_DUPLICATE=SKIPPED_DUPLICATE，SKIPPED_SELF=SKIPPED_SELF，SKIPPED_PREFERENCE=SKIPPED_PREFERENCE） */
  status?: null | string

  /* 最近一次提醒状态更新时间 */
  updatedAt?: null | string
}

/**
 *  类型定义 [AdminTaskAssignmentPageResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 21:41:27
 */
export type AdminTaskAssignmentPageResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 领取时间 */
  claimedAt?: null | string
  /* 完成时间 */
  completedAt?: null | string
  /* 创建时间 */
  createdAt: string
  /* 周期实例键 */
  cycleKey: string
  /* 过期时间 */
  expiredAt?: null | string
  /* 主键id */
  id: number
  /* 上次奖励失败原因 */
  lastRewardError?: null | string
  /* 当前进度 */
  progress: number
  /* 本次奖励关联到账本记录 ID 列表 */
  rewardLedgerIds: number[]
  /* 奖励结算结果类型（1=APPLIED，2=IDEMPOTENT，3=FAILED） */
  rewardResultType?: null | number
  /* 奖励结算时间 */
  rewardSettledAt?: null | string
  /* 奖励结算状态（0=PENDING，1=SUCCESS，2=FAILED） */
  rewardStatus: 0 | 1 | 2
  /* 任务分配状态，PENDING 表示已领取待开始（0=PENDING，1=IN_PROGRESS，2=COMPLETED，3=EXPIRED） */
  status: 0 | 1 | 2 | 3
  /* 目标进度 */
  target: number
  /* 任务快照摘要 */
  task?: AdminTaskAssignmentRelatedTaskDto
  /* 任务ID */
  taskId: number
  /* 更新时间 */
  updatedAt: string
  /* 用户ID */
  userId: number

  /* 统一后的用户可见状态（claimable=CLAIMABLE，claimed=CLAIMED，in_progress=IN_PROGRESS，completed=COMPLETED，reward_pending=REWARD_PENDING，reward_granted=REWARD_GRANTED，expired=EXPIRED，unavailable=UNAVAILABLE） */
  visibleStatus: 'claimable' | 'claimed' | 'completed' | 'expired' | 'in_progress' | 'reward_granted' | 'reward_pending' | 'unavailable'
}

/**
 *  类型定义 [AdminTaskAssignmentRelatedTaskDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 21:41:27
 */
export type AdminTaskAssignmentRelatedTaskDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 领取模式（1=AUTO，2=MANUAL） */
  claimMode: 1 | 2
  /* 任务编码 */
  code: string
  /* 完成模式（1=AUTO，2=MANUAL） */
  completeMode: 1 | 2
  /* 封面图 */
  cover?: null | string
  /* 任务说明 */
  description?: null | string
  /* 目标事件编码，EVENT_COUNT 任务必填（1=CREATE_TOPIC，2=CREATE_REPLY，3=TOPIC_LIKED，4=REPLY_LIKED，5=TOPIC_FAVORITED，6=DAILY_CHECK_IN，7=ADMIN，8=TOPIC_VIEW，9=TOPIC_REPORT，16=TOPIC_COMMENT，10=CREATE_COMMENT，11=COMMENT_LIKED，12=COMMENT_REPORT，100=COMIC_WORK_VIEW，101=COMIC_WORK_LIKE，102=COMIC_WORK_FAVORITE，103=COMIC_WORK_REPORT，104=COMIC_WORK_COMMENT，200=NOVEL_WORK_VIEW，201=NOVEL_WORK_LIKE，202=NOVEL_WORK_FAVORITE，203=NOVEL_WORK_REPORT，204=NOVEL_WORK_COMMENT，300=COMIC_CHAPTER_READ，301=COMIC_CHAPTER_LIKE，302=COMIC_CHAPTER_PURCHASE，303=COMIC_CHAPTER_DOWNLOAD，304=COMIC_CHAPTER_EXCHANGE，305=COMIC_CHAPTER_REPORT，306=COMIC_CHAPTER_COMMENT，400=NOVEL_CHAPTER_READ，401=NOVEL_CHAPTER_LIKE，402=NOVEL_CHAPTER_PURCHASE，403=NOVEL_CHAPTER_DOWNLOAD，404=NOVEL_CHAPTER_EXCHANGE，405=NOVEL_CHAPTER_REPORT，406=NOVEL_CHAPTER_COMMENT，600=BADGE_EARNED，601=PROFILE_COMPLETE，602=AVATAR_UPLOAD，700=FOLLOW_USER，701=BE_FOLLOWED，702=SHARE_CONTENT，703=INVITE_USER，800=REPORT_VALID，801=REPORT_INVALID） */
  eventCode?: null | number
  /* 主键id */
  id: number
  /* 目标附加配置，EVENT_COUNT 任务可用于表达额外过滤条件 */
  objectiveConfig?: null | string
  /* 任务目标类型（1=MANUAL，2=EVENT_COUNT） */
  objectiveType: 1 | 2
  /* 奖励配置，当前仅支持 points / experience，且值必须为正整数 */
  rewardConfig?: null | string
  /* 完成目标次数，必须为大于 0 的整数 */
  targetCount: number
  /* 任务标题 */
  title: string

  /* 任务场景类型（1=ONBOARDING，2=DAILY，4=CAMPAIGN） */
  type: 1 | 2 | 4
}

/**
 *  类型定义 [AdminTaskAssignmentReconciliationPageResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 21:41:27
 */
export type AdminTaskAssignmentReconciliationPageResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 领取时间 */
  claimedAt?: null | string
  /* 完成时间 */
  completedAt?: null | string
  /* 创建时间 */
  createdAt: string
  /* 周期实例键 */
  cycleKey: string
  /* 过期时间 */
  expiredAt?: null | string
  /* 主键id */
  id: number
  /* 上次奖励失败原因 */
  lastRewardError?: null | string
  /* 最近一次命中 assignment 的事件 bizKey */
  latestEventBizKey?: null | string
  /* 最近一次命中 assignment 的事件编码 */
  latestEventCode?: null | number
  /* 最近一次命中 assignment 的事件发生时间 */
  latestEventOccurredAt?: null | string
  /* 当前进度 */
  progress: number
  /* 本次奖励关联到账本记录 ID 列表 */
  rewardLedgerIds: number[]
  /* 奖励到账提醒摘要 */
  rewardReminder?: AdminTaskRewardReminderDto
  /* 奖励结算结果类型（1=APPLIED，2=IDEMPOTENT，3=FAILED） */
  rewardResultType?: null | number
  /* 奖励结算时间 */
  rewardSettledAt?: null | string
  /* 奖励结算状态（0=PENDING，1=SUCCESS，2=FAILED） */
  rewardStatus: 0 | 1 | 2
  /* 任务分配状态，PENDING 表示已领取待开始（0=PENDING，1=IN_PROGRESS，2=COMPLETED，3=EXPIRED） */
  status: 0 | 1 | 2 | 3
  /* 目标进度 */
  target: number
  /* 任务快照摘要 */
  task?: AdminTaskAssignmentRelatedTaskDto
  /* 任务ID */
  taskId: number
  /* 更新时间 */
  updatedAt: string
  /* 用户ID */
  userId: number

  /* 统一后的用户可见状态（claimable=CLAIMABLE，claimed=CLAIMED，in_progress=IN_PROGRESS，completed=COMPLETED，reward_pending=REWARD_PENDING，reward_granted=REWARD_GRANTED，expired=EXPIRED，unavailable=UNAVAILABLE） */
  visibleStatus: 'claimable' | 'claimed' | 'completed' | 'expired' | 'in_progress' | 'reward_granted' | 'reward_pending' | 'unavailable'
}

/**
 *  类型定义 [AdminTaskRewardReminderDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 21:41:27
 */
export type AdminTaskRewardReminderDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 奖励到账提醒 outbox bizKey */
  bizKey?: null | string
  /* 最近一次提醒失败原因 */
  failureReason?: null | string
  /* 最近一次提醒尝试时间 */
  lastAttemptAt?: null | string

  /* 奖励到账提醒投递状态（DELIVERED=DELIVERED，FAILED=FAILED，RETRYING=RETRYING，SKIPPED_DUPLICATE=SKIPPED_DUPLICATE，SKIPPED_SELF=SKIPPED_SELF，SKIPPED_PREFERENCE=SKIPPED_PREFERENCE） */
  status?: null | string
}

/**
 *  类型定义 [RetryTaskAssignmentRewardDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 21:41:27
 */
export type RetryTaskAssignmentRewardDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

/**
 *  类型定义 [RetryCompletedTaskRewardsDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 21:41:27
 */
export type RetryCompletedTaskRewardsDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 本次最多扫描的 assignment 数量 */
  limit?: null | number
}

/**
 *  类型定义 [RetryCompletedTaskRewardsResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-02 21:41:27
 */
export type RetryCompletedTaskRewardsResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 本次扫描到的待补偿 assignment 数 */
  scannedCount: number

  /* 本次实际触发补偿结算的 assignment 数 */
  triggeredCount: number
}