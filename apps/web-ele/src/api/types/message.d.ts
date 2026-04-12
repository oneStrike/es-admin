/**
 *  类型定义 [MessageMonitorDeliveryPageRequest]
 *  @来源 消息中心/监控
 *  @更新时间 2026-04-12 23:24:14
 */
export type MessageMonitorDeliveryPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 任务分配 ID */
  assignmentId?: null | number

  /* 业务幂等键模糊匹配 */
  bizKey?: null | string

  /* 结束时间 */
  endDate?: null | string

  /* 通知类型（1=评论回复,2=评论点赞,3=内容收藏,4=用户关注,5=系统公告,6=聊天消息,7=任务提醒,8=主题点赞,9=主题收藏,10=主题评论,11=评论提及,12=主题提及） */
  notificationType?: null | number

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* outbox 事件 ID */
  outboxId?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 接收用户 ID */
  receiverUserId?: null | number

  /* 任务提醒子类型（如 task_available / task_expiring_soon / task_reward_granted） */
  reminderKind?: null | string

  /* 开始时间 */
  startDate?: null | string

  /* 业务投递结果（DELIVERED / FAILED / RETRYING / SKIPPED_DUPLICATE / SKIPPED_SELF / SKIPPED_PREFERENCE） */
  status?: null | string

  /* 任务 ID */
  taskId?: null | number
}

export type MessageMonitorDeliveryPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: MessageNotificationDeliveryItemDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [MessageMonitorDeliveryRetryRequest]
 *  @来源 消息中心/监控
 *  @更新时间 2026-04-12 23:24:14
 */
export type MessageMonitorDeliveryRetryRequest = RetryMessageNotificationDeliveryDto

export type MessageMonitorDeliveryRetryResponse = boolean

/**
 *  类型定义 [MessageMonitorOutboxSummaryRequest]
 *  @来源 消息中心/监控
 *  @更新时间 2026-04-12 23:24:14
 */
export type MessageMonitorOutboxSummaryRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 错误分布返回条数 */
  topErrorsLimit?: null | number

  /* 统计窗口（小时） */
  windowHours?: null | number
}

export type MessageMonitorOutboxSummaryResponse = MessageOutboxMonitorSummaryDto

/**
 *  类型定义 [MessageMonitorWsSummaryRequest]
 *  @来源 消息中心/监控
 *  @更新时间 2026-04-12 23:24:14
 */
export type MessageMonitorWsSummaryRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 统计窗口（小时） */
  windowHours?: null | number
}

export type MessageMonitorWsSummaryResponse = MessageWsMonitorSummaryDto

/**
 *  类型定义 [MessageNotificationTemplatesPageRequest]
 *  @来源 消息中心/通知模板
 *  @更新时间 2026-04-12 23:24:14
 */
export type MessageNotificationTemplatesPageRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 结束时间 */
  endDate?: null | string

  /* 是否启用 */
  isEnabled?: boolean

  /* 通知类型 */
  notificationType?: number

  /* 排序字段，json格式 */
  orderBy?: null | string

  /* 当前页码（从1开始） */
  pageIndex?: null | number

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number

  /* 开始时间 */
  startDate?: null | string

  /* 模板唯一键 */
  templateKey?: string
}

export type MessageNotificationTemplatesPageResponse = {
  /** 任意合法数值 */
  [property: string]: any

  /* 列表数据 */
  list?: AdminMessageNotificationTemplateDto[]

  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number
}

/**
 *  类型定义 [MessageNotificationTemplatesDetailRequest]
 *  @来源 消息中心/通知模板
 *  @更新时间 2026-04-12 23:24:14
 */
export type MessageNotificationTemplatesDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}

export type MessageNotificationTemplatesDetailResponse = AdminMessageNotificationTemplateDto

/**
 *  类型定义 [MessageNotificationTemplatesCreateRequest]
 *  @来源 消息中心/通知模板
 *  @更新时间 2026-04-12 23:24:14
 */
export type MessageNotificationTemplatesCreateRequest = CreateNotificationTemplateDto

export type MessageNotificationTemplatesCreateResponse = boolean

/**
 *  类型定义 [MessageNotificationTemplatesUpdateRequest]
 *  @来源 消息中心/通知模板
 *  @更新时间 2026-04-12 23:24:14
 */
export type MessageNotificationTemplatesUpdateRequest = UpdateNotificationTemplateDto

export type MessageNotificationTemplatesUpdateResponse = boolean

/**
 *  类型定义 [MessageNotificationTemplatesUpdateEnabledRequest]
 *  @来源 消息中心/通知模板
 *  @更新时间 2026-04-12 23:24:14
 */
export type MessageNotificationTemplatesUpdateEnabledRequest = UpdateNotificationTemplateEnabledDto

export type MessageNotificationTemplatesUpdateEnabledResponse = boolean

/**
 *  类型定义 [MessageNotificationTemplatesDeleteRequest]
 *  @来源 消息中心/通知模板
 *  @更新时间 2026-04-12 23:24:14
 */
export type MessageNotificationTemplatesDeleteRequest = IdDto

export type MessageNotificationTemplatesDeleteResponse = boolean

/**
 *  类型定义 [MessageNotificationDeliveryItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-12 23:24:14
 */
export type MessageNotificationDeliveryItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 任务分配 ID */
  assignmentId?: null | number
  /* 业务幂等键 */
  bizKey: string
  /* 创建时间 */
  createdAt: string
  /* 最近一次失败原因 */
  failureReason?: null | string
  /* 投递结果 ID */
  id: number
  /* 最近一次业务投递尝试时间 */
  lastAttemptAt: string
  /* 关联的站内通知 ID */
  notificationId?: null | number
  /* 通知类型 */
  notificationType?: null | number
  /* 通知类型中文标签 */
  notificationTypeLabel?: null | string
  /* 关联的 outbox 事件 ID */
  outboxId: string
  /* 任务通知 payload 版本 */
  payloadVersion?: null | number
  /* 接收用户 ID */
  receiverUserId?: null | number
  /* 任务提醒子类型 */
  reminderKind?: null | string
  /* 当前重试次数 */
  retryCount: number
  /* 任务场景类型 */
  sceneType?: null | number
  /* 业务投递结果 */
  status: string
  /* 业务投递结果中文标签 */
  statusLabel: string
  /* 任务编码 */
  taskCode?: null | string
  /* 任务 ID */
  taskId?: null | number

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [RetryMessageNotificationDeliveryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-12 23:24:14
 */
export type RetryMessageNotificationDeliveryDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 通知 outbox 业务幂等键 */
  bizKey: string
}

/**
 *  类型定义 [MessageOutboxMonitorSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-12 23:24:14
 */
export type MessageOutboxMonitorSummaryDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 窗口内平均每分钟处理量 */
  averageProcessedPerMinute: number
  /* 当前平均重试次数 */
  avgRetryCount: number
  /* 延迟重试中的待处理数量 */
  delayedPendingCount: number
  /* 按域+状态的分布 */
  domainStatus?: MessageOutboxDomainStatusItemDto[]
  /* 失败数量 */
  failedCount: number
  /* 失败但无错误文本的数量 */
  failedWithoutErrorCount: number
  /* 当前最大重试次数 */
  maxRetryCount: number
  /* 最老待处理消息滞留秒数 */
  oldestPendingAgeSeconds?: null | number
  /* 最老待处理消息创建时间 */
  oldestPendingCreatedAt?: null | string
  /* 待处理数量 */
  pendingCount: number
  /* 窗口内失败处理数量 */
  processedFailedCountInWindow: number
  /* 窗口内成功处理数量 */
  processedSuccessCountInWindow: number
  /* 窗口内总处理数量 */
  processedTotalCountInWindow: number
  /* 处理中数量 */
  processingCount: number
  /* 可立即消费数量（nextRetryAt 为空或已到期） */
  readyToConsumeCount: number
  /* 已发生重试的待处理数量 */
  retryingPendingCount: number
  /* 快照时间 */
  snapshotAt: string
  /* 失败错误分布 TopN */
  topErrors?: MessageOutboxErrorItemDto[]
  /* 统计窗口（小时） */
  windowHours: number

  /* 统计窗口起始时间 */
  windowStartAt: string
}

/**
 *  类型定义 [MessageOutboxDomainStatusItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-12 23:24:14
 */
export type MessageOutboxDomainStatusItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 数量 */
  count: number
  /* 事件域（1=通知,2=聊天） */
  domain: number

  /* 状态（1=待处理,2=处理中,3=成功,4=失败） */
  status: number
}

/**
 *  类型定义 [MessageOutboxErrorItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-12 23:24:14
 */
export type MessageOutboxErrorItemDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 出现次数 */
  count: number

  /* 错误信息 */
  message: string
}

/**
 *  类型定义 [MessageWsMonitorSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-12 23:24:14
 */
export type MessageWsMonitorSummaryDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* ack 失败数量 */
  ackErrorCount: number
  /* ack 成功数量 */
  ackSuccessCount: number
  /* ack 成功率（0~1） */
  ackSuccessRate: number
  /* 平均 ack 延迟（毫秒） */
  avgAckLatencyMs: number
  /* 连接/重连次数 */
  reconnectCount: number
  /* WS 请求总数 */
  requestCount: number
  /* 补偿成功次数 */
  resyncSuccessCount: number
  /* 补偿成功率（0~1） */
  resyncSuccessRate: number
  /* 补偿触发次数 */
  resyncTriggerCount: number
  /* 快照时间 */
  snapshotAt: string
  /* 统计窗口（小时） */
  windowHours: number

  /* 统计窗口起始时间 */
  windowStartAt: string
}

/**
 *  类型定义 [AdminMessageNotificationTemplateDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-12 23:24:14
 */
export type AdminMessageNotificationTemplateDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 正文模板 */
  contentTemplate: string
  /* 创建时间 */
  createdAt: string
  /* 模板 ID */
  id: number
  /* 是否启用 */
  isEnabled: boolean
  /* 通知类型 */
  notificationType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  /* 通知类型中文标签 */
  notificationTypeLabel: string
  /* 备注 */
  remark?: null | string
  /* 模板唯一键 */
  templateKey: string
  /* 标题模板 */
  titleTemplate: string

  /* 更新时间 */
  updatedAt: string
}

/**
 *  类型定义 [CreateNotificationTemplateDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-12 23:24:14
 */
export type CreateNotificationTemplateDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 正文模板 */
  contentTemplate: string
  /* 是否启用 */
  isEnabled?: boolean
  /* 通知类型 */
  notificationType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  /* 备注 */
  remark?: null | string

  /* 标题模板 */
  titleTemplate: string
}

/**
 *  类型定义 [UpdateNotificationTemplateDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-12 23:24:14
 */
export type UpdateNotificationTemplateDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 正文模板 */
  contentTemplate?: string
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled?: boolean
  /* 通知类型 */
  notificationType?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  /* 备注 */
  remark?: null | string

  /* 标题模板 */
  titleTemplate?: string
}

/**
 *  类型定义 [UpdateNotificationTemplateEnabledDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-12 23:24:14
 */
export type UpdateNotificationTemplateEnabledDto = {
  /** 任意合法数值 */
  [property: string]: any
  /* 主键id */
  id: number

  /* 是否启用 */
  isEnabled: boolean
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-12 23:24:14
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any

  /* 主键id */
  id: number
}