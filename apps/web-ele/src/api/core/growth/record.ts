import type {
  RecordDetailRequest,
  RecordDetailResponse,
  RecordPageRequest,
  RecordPageResponse
} from '../../types/growth/record.d'

import { requestClient } from '#/api/request'


  /**
   * 获取用户经验记录分页
   */
  export async function recordPageApi(params: RecordPageRequest): Promise<RecordPageResponse> {
    return requestClient.get<RecordPageResponse>('/api/admin/growth/experience-rules/record/page', { params });
  }


  /**
   * 获取用户经验记录详情
   */
  export async function recordDetailApi(params: RecordDetailRequest): Promise<RecordDetailResponse> {
    return requestClient.get<RecordDetailResponse>('/api/admin/growth/experience-rules/record/detail', { params });
  }
