/**
 *  类型定义 [WsSummaryRequest]
 *  @来源 消息中心/监控
 *  @更新时间 2026-03-19 21:17:36
 */
export type WsSummaryRequest = {
  /** 任意合法数值 */
  [property: string]: any

  /* 统计窗口（小时） */
  windowHours?: null | number
}

export type WsSummaryResponse = MessageWsMonitorSummaryDto

/**
 *  类型定义 [MessageWsMonitorSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-03-19 21:17:36
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