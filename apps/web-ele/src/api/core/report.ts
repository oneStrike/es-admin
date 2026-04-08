import type {
  ReportDetailRequest,
  ReportDetailResponse,
  ReportHandleRequest,
  ReportHandleResponse,
  ReportPageRequest,
  ReportPageResponse
} from '../types/report.d'

import { requestClient } from '#/api/request'


  /**
   * 分页查询举报记录
   */
  export async function reportPageApi(params?: ReportPageRequest): Promise<ReportPageResponse> {
    return requestClient.get<ReportPageResponse>('/api/admin/report/page', { params });
  }


  /**
   * 获取举报详情
   */
  export async function reportDetailApi(params: ReportDetailRequest): Promise<ReportDetailResponse> {
    return requestClient.get<ReportDetailResponse>('/api/admin/report/detail', { params });
  }


  /**
   * 处理举报
   */
  export async function reportHandleApi(params: ReportHandleRequest): Promise<ReportHandleResponse> {
    return requestClient.post<ReportHandleResponse>('/api/admin/report/handle', params);
  }
