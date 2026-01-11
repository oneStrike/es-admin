import type { StatisticsFullResponse } from '../types/forum/statistics.d';

import { requestClient } from '#/utils/request';

/**
 * 获取完整统计数据
 */
export async function statisticsFullApi(): Promise<StatisticsFullResponse> {
  return requestClient.get<StatisticsFullResponse>(
    '/api/admin/forum/sensitive-word/statistics/full',
  );
}
