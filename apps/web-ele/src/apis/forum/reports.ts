import type {
  ReportsAddRequest,
  ReportsAddResponse,
  ReportsDetailRequest,
  ReportsDetailResponse,
  ReportsHandleRequest,
  ReportsHandleResponse,
  ReportsListRequest,
  ReportsListResponse,
  ReportsRemoveRequest,
  ReportsRemoveResponse,
  ReportsStatisticsResponse,
} from '../types/forum/reports.d';

import { requestClient } from '#/utils/request';

/**
 * 查看举报列表
 */
export async function reportsListApi(
  params?: ReportsListRequest,
): Promise<ReportsListResponse> {
  return requestClient.get<ReportsListResponse>(
    '/api/admin/forum/reports/list',
    { params },
  );
}

/**
 * 查看举报详情
 */
export async function reportsDetailApi(
  params: ReportsDetailRequest,
): Promise<ReportsDetailResponse> {
  return requestClient.get<ReportsDetailResponse>(
    '/api/admin/forum/reports/detail',
    { params },
  );
}

/**
 * 获取举报统计数据
 */
export async function reportsStatisticsApi(): Promise<ReportsStatisticsResponse> {
  return requestClient.get<ReportsStatisticsResponse>(
    '/api/admin/forum/reports/statistics',
  );
}

/**
 * 创建举报
 */
export async function reportsAddApi(
  params: ReportsAddRequest,
): Promise<ReportsAddResponse> {
  return requestClient.post<ReportsAddResponse>(
    '/api/admin/forum/reports/add',
    params,
  );
}

/**
 * 处理举报
 */
export async function reportsHandleApi(
  params: ReportsHandleRequest,
): Promise<ReportsHandleResponse> {
  return requestClient.post<ReportsHandleResponse>(
    '/api/admin/forum/reports/handle',
    params,
  );
}

/**
 * 删除举报记录
 */
export async function reportsRemoveApi(
  params: ReportsRemoveRequest,
): Promise<ReportsRemoveResponse> {
  return requestClient.post<ReportsRemoveResponse>(
    '/api/admin/forum/reports/remove',
    params,
  );
}
