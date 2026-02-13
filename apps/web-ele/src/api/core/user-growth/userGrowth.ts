import type {
  UserGrowthOverviewRequest,
  UserGrowthOverviewResponse,
} from '../../types/user-growth/userGrowth.d';

import { requestClient } from '#/api/request';

/**
 * 获取用户成长概览
 */
export async function userGrowthOverviewApi(
  params: UserGrowthOverviewRequest,
): Promise<UserGrowthOverviewResponse> {
  return requestClient.get<UserGrowthOverviewResponse>(
    '/api/admin/user-growth/overview',
    { params },
  );
}
