import type {
  WorkDeleteRequest,
  WorkDeleteResponse,
  WorkDetailRequest,
  WorkDetailResponse,
  WorkPageRequest,
  WorkPageResponse,
  WorkUpdateHotRequest,
  WorkUpdateHotResponse,
  WorkUpdateNewRequest,
  WorkUpdateNewResponse,
  WorkUpdateRecommendedRequest,
  WorkUpdateRecommendedResponse,
  WorkUpdateRequest,
  WorkUpdateResponse,
  WorkUpdateStatusRequest,
  WorkUpdateStatusResponse,
} from '../../types/work/work.d';

import { requestClient } from '#/api/request';

/**
 * 获取作品分页
 */
export async function workPageApi(
  params: WorkPageRequest,
): Promise<WorkPageResponse> {
  return requestClient.get<WorkPageResponse>('/api/admin/work/page', {
    params,
  });
}

/**
 * 获取作品详情
 */
export async function workDetailApi(
  params: WorkDetailRequest,
): Promise<WorkDetailResponse> {
  return requestClient.get<WorkDetailResponse>('/api/admin/work/detail', {
    params,
  });
}

/**
 * 更新作品信息
 */
export async function workUpdateApi(
  params: WorkUpdateRequest,
): Promise<WorkUpdateResponse> {
  return requestClient.post<WorkUpdateResponse>(
    '/api/admin/work/update',
    params,
  );
}

/**
 * 更新作品发布状态
 */
export async function workUpdateStatusApi(
  params: WorkUpdateStatusRequest,
): Promise<WorkUpdateStatusResponse> {
  return requestClient.post<WorkUpdateStatusResponse>(
    '/api/admin/work/update-status',
    params,
  );
}

/**
 * 更新作品推荐状态
 */
export async function workUpdateRecommendedApi(
  params: WorkUpdateRecommendedRequest,
): Promise<WorkUpdateRecommendedResponse> {
  return requestClient.post<WorkUpdateRecommendedResponse>(
    '/api/admin/work/update-recommended',
    params,
  );
}

/**
 * 更新作品热门状态
 */
export async function workUpdateHotApi(
  params: WorkUpdateHotRequest,
): Promise<WorkUpdateHotResponse> {
  return requestClient.post<WorkUpdateHotResponse>(
    '/api/admin/work/update-hot',
    params,
  );
}

/**
 * 更新作品新作状态
 */
export async function workUpdateNewApi(
  params: WorkUpdateNewRequest,
): Promise<WorkUpdateNewResponse> {
  return requestClient.post<WorkUpdateNewResponse>(
    '/api/admin/work/update-new',
    params,
  );
}

/**
 * 软删除作品
 */
export async function workDeleteApi(
  params: WorkDeleteRequest,
): Promise<WorkDeleteResponse> {
  return requestClient.post<WorkDeleteResponse>(
    '/api/admin/work/delete',
    params,
  );
}
