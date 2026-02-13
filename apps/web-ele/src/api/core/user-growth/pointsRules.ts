import type {
  PointsRulesAddPointsRequest,
  PointsRulesAddPointsResponse,
  PointsRulesConsumePointsRequest,
  PointsRulesConsumePointsResponse,
  PointsRulesRecordsDetailRequest,
  PointsRulesRecordsDetailResponse,
  PointsRulesRecordsPageRequest,
  PointsRulesRecordsPageResponse,
  PointsRulesRulesCreateRequest,
  PointsRulesRulesCreateResponse,
  PointsRulesRulesDetailRequest,
  PointsRulesRulesDetailResponse,
  PointsRulesRulesPageRequest,
  PointsRulesRulesPageResponse,
  PointsRulesRulesUpdateRequest,
  PointsRulesRulesUpdateResponse,
  PointsRulesSyncComicResponse,
  PointsRulesUserStatsRequest,
  PointsRulesUserStatsResponse,
} from '../../types/user-growth/pointsRules.d';

import { requestClient } from '#/api/request';

/**
 * 获取用户积分规则分页
 */
export async function pointsRulesRulesPageApi(
  params?: PointsRulesRulesPageRequest,
): Promise<PointsRulesRulesPageResponse> {
  return requestClient.get<PointsRulesRulesPageResponse>(
    '/api/admin/user-growth/points-rules/rules-page',
    { params },
  );
}

/**
 * 获取用户积分规则详情
 */
export async function pointsRulesRulesDetailApi(
  params: PointsRulesRulesDetailRequest,
): Promise<PointsRulesRulesDetailResponse> {
  return requestClient.get<PointsRulesRulesDetailResponse>(
    '/api/admin/user-growth/points-rules/rules-detail',
    { params },
  );
}

/**
 * 创建用户积分规则
 */
export async function pointsRulesRulesCreateApi(
  params: PointsRulesRulesCreateRequest,
): Promise<PointsRulesRulesCreateResponse> {
  return requestClient.post<PointsRulesRulesCreateResponse>(
    '/api/admin/user-growth/points-rules/rules-create',
    params,
  );
}

/**
 * 更新用户积分规则
 */
export async function pointsRulesRulesUpdateApi(
  params: PointsRulesRulesUpdateRequest,
): Promise<PointsRulesRulesUpdateResponse> {
  return requestClient.post<PointsRulesRulesUpdateResponse>(
    '/api/admin/user-growth/points-rules/rules-update',
    params,
  );
}

/**
 * 增加用户积分
 */
export async function pointsRulesAddPointsApi(
  params: PointsRulesAddPointsRequest,
): Promise<PointsRulesAddPointsResponse> {
  return requestClient.post<PointsRulesAddPointsResponse>(
    '/api/admin/user-growth/points-rules/add-points',
    params,
  );
}

/**
 * 扣减用户积分
 */
export async function pointsRulesConsumePointsApi(
  params: PointsRulesConsumePointsRequest,
): Promise<PointsRulesConsumePointsResponse> {
  return requestClient.post<PointsRulesConsumePointsResponse>(
    '/api/admin/user-growth/points-rules/consume-points',
    params,
  );
}

/**
 * 获取用户积分记录分页
 */
export async function pointsRulesRecordsPageApi(
  params: PointsRulesRecordsPageRequest,
): Promise<PointsRulesRecordsPageResponse> {
  return requestClient.get<PointsRulesRecordsPageResponse>(
    '/api/admin/user-growth/points-rules/records-page',
    { params },
  );
}

/**
 * 获取用户积分记录详情
 */
export async function pointsRulesRecordsDetailApi(
  params: PointsRulesRecordsDetailRequest,
): Promise<PointsRulesRecordsDetailResponse> {
  return requestClient.get<PointsRulesRecordsDetailResponse>(
    '/api/admin/user-growth/points-rules/records-detail',
    { params },
  );
}

/**
 * 获取用户积分统计信息
 */
export async function pointsRulesUserStatsApi(
  params: PointsRulesUserStatsRequest,
): Promise<PointsRulesUserStatsResponse> {
  return requestClient.get<PointsRulesUserStatsResponse>(
    '/api/admin/user-growth/points-rules/user-stats',
    { params },
  );
}

/**
 * 同步漫画域用户积分变动
 */
export async function pointsRulesSyncComicApi(): Promise<PointsRulesSyncComicResponse> {
  return requestClient.post<PointsRulesSyncComicResponse>(
    '/api/admin/user-growth/points-rules/sync-comic',
  );
}
