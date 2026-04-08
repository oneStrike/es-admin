/**
 *  类型定义 [MessageMonitorDeliveryPageRequest]
 *  @来源 消息中心/监控
 *  @更新时间 2026-04-08 08:36:51
 */
export type MessageMonitorDeliveryPageRequest = {
  /* 开始时间 */
  startDate?: string | null

  /* 结束时间 */
  endDate?: string | null

  /* 单页大小，最大500，默认15 */
  pageSize?: number | null

  /* 当前页码（从1开始） */
  pageIndex?: number | null

  /* 排序字段，json格式 */
  orderBy?: string | null

  /* 业务投递结果（DELIVERED / FAILED / RETRYING / SKIPPED_DUPLICATE / SKIPPED_SELF / SKIPPED_PREFERENCE） */
  status?: string | null

  /* 通知类型（1=评论回复,2=评论点赞,3=内容收藏,4=用户关注,5=系统公告,6=聊天消息,7=任务提醒,8=主题点赞,9=主题收藏,10=主题评论） */
  notificationType?: number | null

  /* 接收用户 ID */
  receiverUserId?: number | null

  /* 业务幂等键模糊匹配 */
  bizKey?: string | null

  /* outbox 事件 ID */
  outboxId?: string | null

  /* 任务提醒子类型（如 task_available / task_expiring_soon / task_reward_granted） */
  reminderKind?: string | null

  /* 任务 ID */
  taskId?: number | null

  /* 任务分配 ID */
  assignmentId?: number | null

  /** 任意合法数值 */
  [property: string]: any
}

export type MessageMonitorDeliveryPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: MessageNotificationDeliveryItemDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [MessageMonitorDeliveryRetryRequest]
 *  @来源 消息中心/监控
 *  @更新时间 2026-04-08 08:36:51
 */
export type MessageMonitorDeliveryRetryRequest = RetryMessageNotificationDeliveryDto

export type MessageMonitorDeliveryRetryResponse = boolean

/**
 *  类型定义 [MessageMonitorOutboxSummaryRequest]
 *  @来源 消息中心/监控
 *  @更新时间 2026-04-08 08:36:51
 */
export type MessageMonitorOutboxSummaryRequest = {
  /* 统计窗口（小时） */
  windowHours?: number | null

  /* 错误分布返回条数 */
  topErrorsLimit?: number | null

  /** 任意合法数值 */
  [property: string]: any
}

export type MessageMonitorOutboxSummaryResponse = MessageOutboxMonitorSummaryDto

/**
 *  类型定义 [MessageMonitorWsSummaryRequest]
 *  @来源 消息中心/监控
 *  @更新时间 2026-04-08 08:36:51
 */
export type MessageMonitorWsSummaryRequest = {
  /* 统计窗口（小时） */
  windowHours?: number | null

  /** 任意合法数值 */
  [property: string]: any
}

export type MessageMonitorWsSummaryResponse = MessageWsMonitorSummaryDto

/**
 *  类型定义 [MessageNotificationTemplatesPageRequest]
 *  @来源 消息中心/通知模板
 *  @更新时间 2026-04-08 08:36:51
 */
export type MessageNotificationTemplatesPageRequest = {
  /* 开始时间 */
  startDate?: string | null

  /* 结束时间 */
  endDate?: string | null

  /* 单页大小，最大500，默认15 */
  pageSize?: number | null

  /* 当前页码（从1开始） */
  pageIndex?: number | null

  /* 排序字段，json格式 */
  orderBy?: string | null

  /* 通知类型 */
  notificationType?: number

  /* 模板唯一键 */
  templateKey?: string

  /* 是否启用 */
  isEnabled?: boolean

  /** 任意合法数值 */
  [property: string]: any
}

export type MessageNotificationTemplatesPageResponse = {
  /* 当前页码（从1开始） */
  pageIndex?: number

  /* 每页条数 */
  pageSize?: number

  /* 总条数 */
  total?: number

  /* 列表数据 */
  list?: AdminMessageNotificationTemplateDto[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [MessageNotificationTemplatesDetailRequest]
 *  @来源 消息中心/通知模板
 *  @更新时间 2026-04-08 08:36:51
 */
export type MessageNotificationTemplatesDetailRequest = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

export type MessageNotificationTemplatesDetailResponse = AdminMessageNotificationTemplateDto

/**
 *  类型定义 [MessageNotificationTemplatesCreateRequest]
 *  @来源 消息中心/通知模板
 *  @更新时间 2026-04-08 08:36:51
 */
export type MessageNotificationTemplatesCreateRequest = CreateNotificationTemplateDto

export type MessageNotificationTemplatesCreateResponse = boolean

/**
 *  类型定义 [MessageNotificationTemplatesUpdateRequest]
 *  @来源 消息中心/通知模板
 *  @更新时间 2026-04-08 08:36:51
 */
export type MessageNotificationTemplatesUpdateRequest = UpdateNotificationTemplateDto

export type MessageNotificationTemplatesUpdateResponse = boolean

/**
 *  类型定义 [MessageNotificationTemplatesUpdateEnabledRequest]
 *  @来源 消息中心/通知模板
 *  @更新时间 2026-04-08 08:36:51
 */
export type MessageNotificationTemplatesUpdateEnabledRequest = UpdateNotificationTemplateEnabledDto

export type MessageNotificationTemplatesUpdateEnabledResponse = boolean

/**
 *  类型定义 [MessageNotificationTemplatesDeleteRequest]
 *  @来源 消息中心/通知模板
 *  @更新时间 2026-04-08 08:36:51
 */
export type MessageNotificationTemplatesDeleteRequest = IdDto

export type MessageNotificationTemplatesDeleteResponse = boolean

/**
 *  类型定义 [MessageNotificationDeliveryItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type MessageNotificationDeliveryItemDto = {
  /* 投递结果 ID */
  id: number
  /* 关联的 outbox 事件 ID */
  outboxId: string
  /* 业务幂等键 */
  bizKey: string
  /* 通知类型 */
  notificationType?: number | null
  /* 通知类型中文标签 */
  notificationTypeLabel?: string | null
  /* 接收用户 ID */
  receiverUserId?: number | null
  /* 关联的站内通知 ID */
  notificationId?: number | null
  /* 业务投递结果 */
  status: string
  /* 业务投递结果中文标签 */
  statusLabel: string
  /* 当前重试次数 */
  retryCount: number
  /* 最近一次失败原因 */
  failureReason?: string | null
  /* 任务提醒子类型 */
  reminderKind?: string | null
  /* 任务 ID */
  taskId?: number | null
  /* 任务分配 ID */
  assignmentId?: number | null
  /* 任务编码 */
  taskCode?: string | null
  /* 任务场景类型 */
  sceneType?: number | null
  /* 任务通知 payload 版本 */
  payloadVersion?: number | null
  /* 最近一次业务投递尝试时间 */
  lastAttemptAt: string
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [RetryMessageNotificationDeliveryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type RetryMessageNotificationDeliveryDto = {
  /* 通知 outbox 业务幂等键 */
  bizKey: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [MessageOutboxMonitorSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type MessageOutboxMonitorSummaryDto = {
  /* 快照时间 */
  snapshotAt: string
  /* 统计窗口起始时间 */
  windowStartAt: string
  /* 统计窗口（小时） */
  windowHours: number
  /* 待处理数量 */
  pendingCount: number
  /* 处理中数量 */
  processingCount: number
  /* 失败数量 */
  failedCount: number
  /* 可立即消费数量（nextRetryAt 为空或已到期） */
  readyToConsumeCount: number
  /* 延迟重试中的待处理数量 */
  delayedPendingCount: number
  /* 已发生重试的待处理数量 */
  retryingPendingCount: number
  /* 最老待处理消息创建时间 */
  oldestPendingCreatedAt?: string | null
  /* 最老待处理消息滞留秒数 */
  oldestPendingAgeSeconds?: number | null
  /* 窗口内成功处理数量 */
  processedSuccessCountInWindow: number
  /* 窗口内失败处理数量 */
  processedFailedCountInWindow: number
  /* 窗口内总处理数量 */
  processedTotalCountInWindow: number
  /* 窗口内平均每分钟处理量 */
  averageProcessedPerMinute: number
  /* 当前最大重试次数 */
  maxRetryCount: number
  /* 当前平均重试次数 */
  avgRetryCount: number
  /* 失败但无错误文本的数量 */
  failedWithoutErrorCount: number
  /* 按域+状态的分布 */
  domainStatus?: any[] | null
  /* 失败错误分布 TopN */
  topErrors?: any[] | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [MessageWsMonitorSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type MessageWsMonitorSummaryDto = {
  /* 快照时间 */
  snapshotAt: string
  /* 统计窗口起始时间 */
  windowStartAt: string
  /* 统计窗口（小时） */
  windowHours: number
  /* WS 请求总数 */
  requestCount: number
  /* ack 成功数量 */
  ackSuccessCount: number
  /* ack 失败数量 */
  ackErrorCount: number
  /* ack 成功率（0~1） */
  ackSuccessRate: number
  /* 平均 ack 延迟（毫秒） */
  avgAckLatencyMs: number
  /* 连接/重连次数 */
  reconnectCount: number
  /* 补偿触发次数 */
  resyncTriggerCount: number
  /* 补偿成功次数 */
  resyncSuccessCount: number
  /* 补偿成功率（0~1） */
  resyncSuccessRate: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [AdminMessageNotificationTemplateDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type AdminMessageNotificationTemplateDto = {
  /* 模板 ID */
  id: number
  /* 通知类型 */
  notificationType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  /* 模板唯一键 */
  templateKey: string
  /* 标题模板 */
  titleTemplate: string
  /* 正文模板 */
  contentTemplate: string
  /* 是否启用 */
  isEnabled: boolean
  /* 备注 */
  remark?: string | null
  /* 创建时间 */
  createdAt: string
  /* 更新时间 */
  updatedAt: string
  /* 通知类型中文标签 */
  notificationTypeLabel: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [CreateNotificationTemplateDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type CreateNotificationTemplateDto = {
  /* 通知类型 */
  notificationType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  /* 标题模板 */
  titleTemplate: string
  /* 正文模板 */
  contentTemplate: string
  /* 是否启用 */
  isEnabled?: boolean
  /* 备注 */
  remark?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateNotificationTemplateDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type UpdateNotificationTemplateDto = {
  /* 主键id */
  id: number
  /* 通知类型 */
  notificationType?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  /* 标题模板 */
  titleTemplate?: string
  /* 正文模板 */
  contentTemplate?: string
  /* 是否启用 */
  isEnabled?: boolean
  /* 备注 */
  remark?: string | null

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [UpdateNotificationTemplateEnabledDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type UpdateNotificationTemplateEnabledDto = {
  /* 主键id */
  id: number
  /* 是否启用 */
  isEnabled: boolean

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-04-08 08:36:51
 */
export type IdDto = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}