import type { StatsFullResponse } from '../../types/forum/stats.d';

import { requestClient } from '#/api/request';

/**
 * 获取完整统计数据
 */
export async function statsFullApi(
  params: StatsFullRequest,
): Promise<StatsFullResponse> {
  return requestClient.get<StatsFullResponse>(
    '/api/admin/forum/sensitive-word/stats/full',
    { params },
  );
}
