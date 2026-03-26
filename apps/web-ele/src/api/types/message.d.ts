/**
 *  类型定义 [MessageMonitorOutboxSummaryRequest]
 *  @来源 消息中心/监控
 *  @更新时间 2026-03-26 22:03:53
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
 *  @更新时间 2026-03-26 22:03:53
 */
export type MessageMonitorWsSummaryRequest = {
  /* 统计窗口（小时） */
  windowHours?: number | null

  /** 任意合法数值 */
  [property: string]: any
}

export type MessageMonitorWsSummaryResponse = MessageWsMonitorSummaryDto

/**
 *  类型定义 [MessageOutboxMonitorSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-26 22:03:53
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
 *  @更新时间 2026-03-26 22:03:53
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