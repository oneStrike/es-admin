/**
 *  类型定义 [TaskCreateRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-18 11:53:53
 */
export type TaskCreateRequest = CreateTaskDto

export type TaskCreateResponse = boolean

/**
 *  类型定义 [TaskUpdateRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-18 11:53:53
 */
export type TaskUpdateRequest = UpdateTaskDto

export type TaskUpdateResponse = boolean

/**
 *  类型定义 [TaskUpdateStatusRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-18 11:53:53
 */
export type TaskUpdateStatusRequest = UpdateTaskStatusDto

export type TaskUpdateStatusResponse = boolean

/**
 *  类型定义 [TaskDeleteRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-18 11:53:53
 */
export type TaskDeleteRequest = IdDto

export type TaskDeleteResponse = boolean

/**
 *  类型定义 [TaskPageRequest]
 *  @来源 任务管理/任务配置
 *  @更新时间 2026-04-18 11:53:53
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

  /* 任务状态（0=草稿；1=已发布；2=已下线） */
  status?: number

  /* 任务标题 */
  title?: string

  /* 任务场景类型（1=新手引导任务；2=日常任务；4=活动任务） */
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
 *  @更新时间 2026-04-18 11:53:53
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
 *  @更新时间 2026-04-18 11:53:53
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

  /* 任务分配状态（0=已领取待开始；1=进行中；2=已完成；3=已过期） */
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
 *  @更新时间 2026-04-18 11:53:53
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

  /* 奖励到账提醒投递状态（1=已投递；2=投递失败；3=重试中；4=因偏好关闭而跳过） */
  notificationStatus?: null | number

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 关联的奖励结算事实 ID */
  rewardSettlementId?: null | number

  /* 补偿状态（0=待补偿重试；1=已补偿成功；2=终态失败） */
  settlementStatus?: null | number

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
 *  类型定义 [CreateTaskDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-18 11:53:53
 */
export type CreateTaskDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 领取模式（1=自动领取；2=手动领取） */
  claimMode: 1 | 2
  /* 任务编码 */
  code: string
  /* 完成模式（1=自动完成；2=手动完成） */
  completeMode: 1 | 2
  /* 封面图 */
  cover?: null | string
  /* 任务说明 */
  description?: null | string
  /* 成长规则类型（1=发表主题；2=发表回复；3=主题被点赞；4=回复被点赞；5=主题被收藏；6=每日签到；7=管理员操作；8=主题被浏览；9=主题举报；10=发表评论；11=评论被点赞；12=评论举报；16=帖子被评论；100=漫画作品浏览；101=漫画作品点赞；102=漫画作品收藏；103=漫画作品举报；104=漫画作品评论；200=小说作品浏览；201=小说作品点赞；202=小说作品收藏；203=小说作品举报；204=小说作品评论；300=漫画章节阅读；301=漫画章节点赞；302=漫画章节购买；303=漫画章节下载；304=漫画章节兑换；305=漫画章节举报；306=漫画章节评论；400=小说章节阅读；401=小说章节点赞；402=小说章节购买；403=小说章节下载；404=小说章节兑换；405=小说章节举报；406=小说章节评论；600=获得徽章；601=资料完善；602=头像上传；700=关注用户；701=被关注；702=分享内容；703=邀请用户；800=举报有效；801=举报无效） 仅“事件累计次数驱动”任务需要填写。 */
  eventCode?: null | number
  /* 启用状态 */
  isEnabled: boolean
  /* 目标附加配置；“事件累计次数驱动”任务可用于表达额外过滤条件 */
  objectiveConfig?: null | string
  /* 任务目标类型（1=手动推进；2=事件累计次数驱动） */
  objectiveType: 1 | 2
  /* 任务排序优先级（0=默认优先级，数值越大越靠前） */
  priority: number
  /* 发布结束时间 */
  publishEndAt?: null | string
  /* 发布开始时间 */
  publishStartAt?: null | string
  /* 周期规则，当前仅识别一次性、每日、每周、每月四种类型；timezone 可选，使用 IANA 时区标识 */
  repeatRule?: null | string
  /* 奖励项列表，当前仅支持积分与经验奖励项 */
  rewardItems?: GrowthRewardItemDto[]
  /* 任务状态（0=草稿；1=已发布；2=已下线） */
  status: 0 | 1 | 2
  /* 完成目标次数，必须为大于 0 的整数 */
  targetCount: number
  /* 任务标题 */
  title: string

  /* 任务场景类型（1=新手引导任务；2=日常任务；4=活动任务） */
  type: 1 | 2 | 4
}

/**
 *  类型定义 [GrowthRewardItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-18 11:53:53
 */
export type GrowthRewardItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 奖励数量；必须为大于 0 的整数 */
  amount: number
  /* 奖励资产键；积分/经验必须为空字符串，道具/虚拟货币/等级必须提供稳定业务键 */
  assetKey?: null | string

  /* 奖励资产类型（1=积分；2=经验；3=道具；4=虚拟货币；5=等级） */
  assetType: 1 | 2 | 3 | 4 | 5
}

/**
 *  类型定义 [UpdateTaskDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-18 11:53:53
 */
export type UpdateTaskDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 领取模式（1=自动领取；2=手动领取） */
  claimMode?: 1 | 2
  /* 任务编码 */
  code?: string
  /* 完成模式（1=自动完成；2=手动完成） */
  completeMode?: 1 | 2
  /* 封面图 */
  cover?: null | string
  /* 任务说明 */
  description?: null | string
  /* 成长规则类型（1=发表主题；2=发表回复；3=主题被点赞；4=回复被点赞；5=主题被收藏；6=每日签到；7=管理员操作；8=主题被浏览；9=主题举报；10=发表评论；11=评论被点赞；12=评论举报；16=帖子被评论；100=漫画作品浏览；101=漫画作品点赞；102=漫画作品收藏；103=漫画作品举报；104=漫画作品评论；200=小说作品浏览；201=小说作品点赞；202=小说作品收藏；203=小说作品举报；204=小说作品评论；300=漫画章节阅读；301=漫画章节点赞；302=漫画章节购买；303=漫画章节下载；304=漫画章节兑换；305=漫画章节举报；306=漫画章节评论；400=小说章节阅读；401=小说章节点赞；402=小说章节购买；403=小说章节下载；404=小说章节兑换；405=小说章节举报；406=小说章节评论；600=获得徽章；601=资料完善；602=头像上传；700=关注用户；701=被关注；702=分享内容；703=邀请用户；800=举报有效；801=举报无效） 仅“事件累计次数驱动”任务需要填写。 */
  eventCode?: null | number
  /* 主键id */
  id: number
  /* 启用状态 */
  isEnabled?: boolean
  /* 目标附加配置；“事件累计次数驱动”任务可用于表达额外过滤条件 */
  objectiveConfig?: null | string
  /* 任务目标类型（1=手动推进；2=事件累计次数驱动） */
  objectiveType?: 1 | 2
  /* 任务排序优先级（0=默认优先级，数值越大越靠前） */
  priority?: number
  /* 发布结束时间 */
  publishEndAt?: null | string
  /* 发布开始时间 */
  publishStartAt?: null | string
  /* 周期规则，当前仅识别一次性、每日、每周、每月四种类型；timezone 可选，使用 IANA 时区标识 */
  repeatRule?: null | string
  /* 奖励项列表，当前仅支持积分与经验奖励项 */
  rewardItems?: GrowthRewardItemDto[]
  /* 任务状态（0=草稿；1=已发布；2=已下线） */
  status?: 0 | 1 | 2
  /* 完成目标次数，必须为大于 0 的整数 */
  targetCount?: number
  /* 任务标题 */
  title?: string

  /* 任务场景类型（1=新手引导任务；2=日常任务；4=活动任务） */
  type?: 1 | 2 | 4
}

/**
 *  类型定义 [UpdateTaskStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-18 11:53:53
 */
export type UpdateTaskStatusDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number
  /* 启用状态 */
  isEnabled?: boolean

  /* 任务状态（0=草稿；1=已发布；2=已下线） */
  status?: 0 | 1 | 2
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-18 11:53:53
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
 *  @更新时间 2026-04-18 11:53:53
 */
export type AdminTaskPageResponseDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 活跃任务实例数（已领取待开始、进行中、已完成三种状态之和） */
  activeAssignmentCount: number
  /* 领取模式（1=自动领取；2=手动领取） */
  claimMode: 1 | 2
  /* 任务编码 */
  code: string
  /* 完成模式（1=自动完成；2=手动完成） */
  completeMode: 1 | 2
  /* 封面图 */
  cover?: null | string
  /* 创建时间 */
  createdAt: string
  /* 任务说明 */
  description?: null | string
  /* 成长规则类型（1=发表主题；2=发表回复；3=主题被点赞；4=回复被点赞；5=主题被收藏；6=每日签到；7=管理员操作；8=主题被浏览；9=主题举报；10=发表评论；11=评论被点赞；12=评论举报；16=帖子被评论；100=漫画作品浏览；101=漫画作品点赞；102=漫画作品收藏；103=漫画作品举报；104=漫画作品评论；200=小说作品浏览；201=小说作品点赞；202=小说作品收藏；203=小说作品举报；204=小说作品评论；300=漫画章节阅读；301=漫画章节点赞；302=漫画章节购买；303=漫画章节下载；304=漫画章节兑换；305=漫画章节举报；306=漫画章节评论；400=小说章节阅读；401=小说章节点赞；402=小说章节购买；403=小说章节下载；404=小说章节兑换；405=小说章节举报；406=小说章节评论；600=获得徽章；601=资料完善；602=头像上传；700=关注用户；701=被关注；702=分享内容；703=邀请用户；800=举报有效；801=举报无效） 仅“事件累计次数驱动”任务需要填写。 */
  eventCode?: null | number
  /* 主键id */
  id: number
  /* 启用状态 */
  isEnabled: boolean
  /* 最近一次任务提醒投递摘要 */
  latestReminder?: AdminTaskReminderSummaryDto
  /* 目标附加配置；“事件累计次数驱动”任务可用于表达额外过滤条件 */
  objectiveConfig?: null | string
  /* 任务目标类型（1=手动推进；2=事件累计次数驱动） */
  objectiveType: 1 | 2
  /* 待补偿奖励数（已完成但奖励未成功） */
  pendingRewardCompensationCount: number
  /* 任务排序优先级（0=默认优先级，数值越大越靠前） */
  priority: number
  /* 发布结束时间 */
  publishEndAt?: null | string
  /* 发布开始时间 */
  publishStartAt?: null | string
  /* 周期规则，当前仅识别一次性、每日、每周、每月四种类型；timezone 可选，使用 IANA 时区标识 */
  repeatRule?: null | string
  /* 奖励项列表，当前仅支持积分与经验奖励项 */
  rewardItems?: GrowthRewardItemDto[]
  /* 任务状态（0=草稿；1=已发布；2=已下线） */
  status: 0 | 1 | 2
  /* 完成目标次数，必须为大于 0 的整数 */
  targetCount: number
  /* 任务标题 */
  title: string
  /* 任务场景类型（1=新手引导任务；2=日常任务；4=活动任务） */
  type: 1 | 2 | 4

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [AdminTaskReminderSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-18 11:53:53
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
  /* 最近一次提醒投递状态（1=已投递；2=投递失败；3=重试中；4=因偏好关闭而跳过） */
  status?: null | number

  /* 最近一次提醒状态更新时间 */
  updatedAt?: null | string
}

/**
 *  类型定义 [AdminTaskAssignmentPageResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-18 11:53:53
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
  /* 当前进度 */
  progress: number
  /* 是否需要奖励结算（0=无奖励任务；1=需要奖励结算） */
  rewardApplicable: number
  /* 奖励结算摘要 */
  rewardSettlement?: TaskRewardSettlementSummaryDto
  /* 关联的奖励结算事实 ID */
  rewardSettlementId?: null | number
  /* 任务分配状态（0=已领取待开始；1=进行中；2=已完成；3=已过期） */
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

  /* 统一后的用户可见状态（可领取；已领取待开始；进行中；已完成；奖励待补偿；奖励已到账；已过期；不可用） */
  visibleStatus: 'claimable' | 'claimed' | 'completed' | 'expired' | 'in_progress' | 'reward_granted' | 'reward_pending' | 'unavailable'
}

/**
 *  类型定义 [AdminTaskAssignmentRelatedTaskDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-18 11:53:53
 */
export type AdminTaskAssignmentRelatedTaskDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 领取模式（1=自动领取；2=手动领取） */
  claimMode: 1 | 2
  /* 任务编码 */
  code: string
  /* 完成模式（1=自动完成；2=手动完成） */
  completeMode: 1 | 2
  /* 封面图 */
  cover?: null | string
  /* 任务说明 */
  description?: null | string
  /* 成长规则类型（1=发表主题；2=发表回复；3=主题被点赞；4=回复被点赞；5=主题被收藏；6=每日签到；7=管理员操作；8=主题被浏览；9=主题举报；10=发表评论；11=评论被点赞；12=评论举报；16=帖子被评论；100=漫画作品浏览；101=漫画作品点赞；102=漫画作品收藏；103=漫画作品举报；104=漫画作品评论；200=小说作品浏览；201=小说作品点赞；202=小说作品收藏；203=小说作品举报；204=小说作品评论；300=漫画章节阅读；301=漫画章节点赞；302=漫画章节购买；303=漫画章节下载；304=漫画章节兑换；305=漫画章节举报；306=漫画章节评论；400=小说章节阅读；401=小说章节点赞；402=小说章节购买；403=小说章节下载；404=小说章节兑换；405=小说章节举报；406=小说章节评论；600=获得徽章；601=资料完善；602=头像上传；700=关注用户；701=被关注；702=分享内容；703=邀请用户；800=举报有效；801=举报无效） 仅“事件累计次数驱动”任务需要填写。 */
  eventCode?: null | number
  /* 主键id */
  id: number
  /* 目标附加配置；“事件累计次数驱动”任务可用于表达额外过滤条件 */
  objectiveConfig?: null | string
  /* 任务目标类型（1=手动推进；2=事件累计次数驱动） */
  objectiveType: 1 | 2
  /* 奖励项列表，当前仅支持积分与经验奖励项 */
  rewardItems?: GrowthRewardItemDto[]
  /* 完成目标次数，必须为大于 0 的整数 */
  targetCount: number
  /* 任务标题 */
  title: string

  /* 任务场景类型（1=新手引导任务；2=日常任务；4=活动任务） */
  type: 1 | 2 | 4
}

/**
 *  类型定义 [TaskRewardSettlementSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-18 11:53:53
 */
export type TaskRewardSettlementSummaryDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number
  /* 最近一次失败原因 */
  lastError?: null | string
  /* 最近一次重试时间 */
  lastRetryAt?: null | string
  /* 本次补偿关联到账本记录 ID 列表 */
  ledgerRecordIds: number[]
  /* 已执行的补偿重试次数 */
  retryCount: number
  /* 最近一次补偿状态落定时间 */
  settledAt?: null | string
  /* 补偿结果类型（1=本次真实落账；2=命中幂等未重复落账；3=本次处理失败） */
  settlementResultType?: null | number

  /* 补偿状态（0=待补偿重试；1=已补偿成功；2=终态失败） */
  settlementStatus: 0 | 1 | 2
}

/**
 *  类型定义 [AdminTaskAssignmentReconciliationPageResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-18 11:53:53
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
  /* 按事件发生时间选出的最近一次命中 assignment 的事件投影键 */
  latestEventBizKey?: null | string
  /* 按事件发生时间选出的最近一次命中 assignment 的事件编码 */
  latestEventCode?: null | number
  /* 按事件发生时间选出的最近一次命中 assignment 的事件发生时间 */
  latestEventOccurredAt?: null | string
  /* 当前进度 */
  progress: number
  /* 是否需要奖励结算（0=无奖励任务；1=需要奖励结算） */
  rewardApplicable: number
  /* 奖励到账提醒摘要 */
  rewardReminder?: AdminTaskRewardReminderDto
  /* 奖励结算摘要 */
  rewardSettlement?: TaskRewardSettlementSummaryDto
  /* 关联的奖励结算事实 ID */
  rewardSettlementId?: null | number
  /* 任务分配状态（0=已领取待开始；1=进行中；2=已完成；3=已过期） */
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

  /* 统一后的用户可见状态（可领取；已领取待开始；进行中；已完成；奖励待补偿；奖励已到账；已过期；不可用） */
  visibleStatus: 'claimable' | 'claimed' | 'completed' | 'expired' | 'in_progress' | 'reward_granted' | 'reward_pending' | 'unavailable'
}

/**
 *  类型定义 [AdminTaskRewardReminderDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-18 11:53:53
 */
export type AdminTaskRewardReminderDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 奖励到账提醒投影键 */
  bizKey?: null | string
  /* 最近一次提醒失败原因 */
  failureReason?: null | string
  /* 最近一次提醒尝试时间 */
  lastAttemptAt?: null | string

  /* 奖励到账提醒投递状态（1=已投递；2=投递失败；3=重试中；4=因偏好关闭而跳过） */
  status?: null | number
}