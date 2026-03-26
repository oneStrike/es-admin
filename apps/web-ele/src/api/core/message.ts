import { requestClient } from '#/api/request'
import type {
  MessageMonitorOutboxSummaryRequest,
  MessageMonitorOutboxSummaryResponse,
  MessageMonitorWsSummaryRequest,
  MessageMonitorWsSummaryResponse
} from '../types/message.d'


  /**
   * 获取消息 outbox 监控摘要
   */
  export async function messageMonitorOutboxSummaryApi(params?: MessageMonitorOutboxSummaryRequest): Promise<MessageMonitorOutboxSummaryResponse> {
    return requestClient.get<MessageMonitorOutboxSummaryResponse>('/api/admin/message/monitor/outbox/summary', { params });
  }


  /**
   * 获取消息 WS 监控摘要
   */
  export async function messageMonitorWsSummaryApi(params?: MessageMonitorWsSummaryRequest): Promise<MessageMonitorWsSummaryResponse> {
    return requestClient.get<MessageMonitorWsSummaryResponse>('/api/admin/message/monitor/ws/summary', { params });
  }
