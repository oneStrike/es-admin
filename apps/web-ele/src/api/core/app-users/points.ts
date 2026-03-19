import type {
  PointsConsumeRequest,
  PointsConsumeResponse,
  PointsGrantRequest,
  PointsGrantResponse,
  PointsStatsRequest,
  PointsStatsResponse,
} from '../../types/app-users/points.d';

import { requestClient } from '#/api/request';

/**
 * 获取 APP 用户积分统计
 */
export async function pointsStatsApi(
  params: PointsStatsRequest,
): Promise<PointsStatsResponse> {
  return requestClient.get<PointsStatsResponse>(
    '/api/admin/app-users/points/stats',
    { params },
  );
}

/**
 * 手动增加 APP 用户积分
 */
export async function pointsGrantApi(
  params: PointsGrantRequest,
): Promise<PointsGrantResponse> {
  return requestClient.post<PointsGrantResponse>(
    '/api/admin/app-users/points/grant',
    params,
  );
}

/**
 * 手动扣减 APP 用户积分
 */
export async function pointsConsumeApi(
  params: PointsConsumeRequest,
): Promise<PointsConsumeResponse> {
  return requestClient.post<PointsConsumeResponse>(
    '/api/admin/app-users/points/consume',
    params,
  );
}
