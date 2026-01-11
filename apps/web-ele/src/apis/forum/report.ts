import type {
  ReportCreateRequest,
  ReportCreateResponse,
  ReportDeleteRequest,
  ReportDeleteResponse,
  ReportDetailRequest,
  ReportDetailResponse,
  ReportHandleRequest,
  ReportHandleResponse,
  ReportPageRequest,
  ReportPageResponse,
  ReportUserReportsRequest,
  ReportUserReportsResponse,
} from '../types/forum/report.d';

import { requestClient } from '#/utils/request';

/**
 * 创建举报
 */
export async function reportCreateApi(
  params: ReportCreateRequest,
): Promise<ReportCreateResponse> {
  return requestClient.post<ReportCreateResponse>(
    '/api/admin/forum/report/create',
    params,
  );
}

/**
 * 分页查询举报记录
 */
export async function reportPageApi(
  params?: ReportPageRequest,
): Promise<ReportPageResponse> {
  return requestClient.get<ReportPageResponse>('/api/admin/forum/report/page', {
    params,
  });
}

/**
 * 获取举报详情
 */
export async function reportDetailApi(
  params: ReportDetailRequest,
): Promise<ReportDetailResponse> {
  return requestClient.get<ReportDetailResponse>(
    '/api/admin/forum/report/detail',
    { params },
  );
}

/**
 * 处理举报
 */
export async function reportHandleApi(
  params: ReportHandleRequest,
): Promise<ReportHandleResponse> {
  return requestClient.post<ReportHandleResponse>(
    '/api/admin/forum/report/handle',
    params,
  );
}

/**
 * 获取举报统计
 */
export async function reportStatisticsApi(): Promise<ReportStatisticsResponse> {
  return requestClient.get<ReportStatisticsResponse>(
    '/api/admin/forum/report/statistics',
  );
}

/**
 * 获取用户举报记录
 */
export async function reportUserReportsApi(
  params: ReportUserReportsRequest,
): Promise<ReportUserReportsResponse> {
  return requestClient.get<ReportUserReportsResponse>(
    '/api/admin/forum/report/user-reports',
    { params },
  );
}

/**
 * 删除举报记录
 */
export async function reportDeleteApi(
  params: ReportDeleteRequest,
): Promise<ReportDeleteResponse> {
  return requestClient.post<ReportDeleteResponse>(
    '/api/admin/forum/report/delete',
    params,
  );
}
