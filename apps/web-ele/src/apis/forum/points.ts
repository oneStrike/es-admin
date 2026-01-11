import type {
  PointsAddPointsRequest,
  PointsAddPointsResponse,
  PointsConsumePointsRequest,
  PointsConsumePointsResponse,
  PointsRecordsDetailRequest,
  PointsRecordsDetailResponse,
  PointsRecordsPageRequest,
  PointsRecordsPageResponse,
  PointsRulesCreateRequest,
  PointsRulesCreateResponse,
  PointsRulesDetailRequest,
  PointsRulesDetailResponse,
  PointsRulesPageRequest,
  PointsRulesPageResponse,
  PointsRulesUpdateRequest,
  PointsRulesUpdateResponse,
  PointsSyncComicResponse,
  PointsUserStatsRequest,
  PointsUserStatsResponse,
} from '../types/forum/points.d';

import { requestClient } from '#/utils/request';

/**
 * 获取积分规则分页
 */
export async function pointsRulesPageApi(
  params?: PointsRulesPageRequest,
): Promise<PointsRulesPageResponse> {
  return requestClient.get<PointsRulesPageResponse>(
    '/api/admin/forum/points/rules-page',
    { params },
  );
}

/**
 * 获取积分规则详情
 */
export async function pointsRulesDetailApi(
  params: PointsRulesDetailRequest,
): Promise<PointsRulesDetailResponse> {
  return requestClient.get<PointsRulesDetailResponse>(
    '/api/admin/forum/points/rules-detail',
    { params },
  );
}

/**
 * 创建积分规则
 */
export async function pointsRulesCreateApi(
  params: PointsRulesCreateRequest,
): Promise<PointsRulesCreateResponse> {
  return requestClient.post<PointsRulesCreateResponse>(
    '/api/admin/forum/points/rules-create',
    params,
  );
}

/**
 * 更新积分规则
 */
export async function pointsRulesUpdateApi(
  params: PointsRulesUpdateRequest,
): Promise<PointsRulesUpdateResponse> {
  return requestClient.post<PointsRulesUpdateResponse>(
    '/api/admin/forum/points/rules-update',
    params,
  );
}

/**
 * 增加积分
 */
export async function pointsAddPointsApi(
  params: PointsAddPointsRequest,
): Promise<PointsAddPointsResponse> {
  return requestClient.post<PointsAddPointsResponse>(
    '/api/admin/forum/points/add-points',
    params,
  );
}

/**
 * 消费积分
 */
export async function pointsConsumePointsApi(
  params: PointsConsumePointsRequest,
): Promise<PointsConsumePointsResponse> {
  return requestClient.post<PointsConsumePointsResponse>(
    '/api/admin/forum/points/consume-points',
    params,
  );
}

/**
 * 获取积分记录分页
 */
export async function pointsRecordsPageApi(
  params: PointsRecordsPageRequest,
): Promise<PointsRecordsPageResponse> {
  return requestClient.get<PointsRecordsPageResponse>(
    '/api/admin/forum/points/records-page',
    { params },
  );
}

/**
 * 获取积分记录详情
 */
export async function pointsRecordsDetailApi(
  params: PointsRecordsDetailRequest,
): Promise<PointsRecordsDetailResponse> {
  return requestClient.get<PointsRecordsDetailResponse>(
    '/api/admin/forum/points/records-detail',
    { params },
  );
}

/**
 * 获取用户积分统计
 */
export async function pointsUserStatsApi(
  params: PointsUserStatsRequest,
): Promise<PointsUserStatsResponse> {
  return requestClient.get<PointsUserStatsResponse>(
    '/api/admin/forum/points/user-stats',
    { params },
  );
}

/**
 * 与漫画系统互通
 */
export async function pointsSyncComicApi(): Promise<PointsSyncComicResponse> {
  return requestClient.post<PointsSyncComicResponse>(
    '/api/admin/forum/points/sync-comic',
  );
}
