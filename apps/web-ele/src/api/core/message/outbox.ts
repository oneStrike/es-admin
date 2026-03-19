import type {
  OutboxSummaryRequest,
  OutboxSummaryResponse
} from '../../types/message/outbox.d'

import { requestClient } from '#/api/request'


  /**
   * 获取消息 outbox 监控摘要
   */
  export async function outboxSummaryApi(params?: OutboxSummaryRequest): Promise<OutboxSummaryResponse> {
    return requestClient.get<OutboxSummaryResponse>('/api/admin/message/monitor/outbox/summary', { params });
  }
