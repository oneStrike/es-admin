import type {
  WsSummaryRequest,
  WsSummaryResponse
} from '../../types/message/ws.d'

import { requestClient } from '#/api/request'


  /**
   * 获取消息 WS 监控摘要
   */
  export async function wsSummaryApi(params?: WsSummaryRequest): Promise<WsSummaryResponse> {
    return requestClient.get<WsSummaryResponse>('/api/admin/message/monitor/ws/summary', { params });
  }
