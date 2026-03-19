import type {
  ExperienceGrantRequest,
  ExperienceGrantResponse,
  ExperienceStatsRequest,
  ExperienceStatsResponse,
} from '../../types/app-users/experience.d';

import { requestClient } from '#/api/request';

/**
 * 获取 APP 用户经验统计
 */
export async function experienceStatsApi(
  params: ExperienceStatsRequest,
): Promise<ExperienceStatsResponse> {
  return requestClient.get<ExperienceStatsResponse>(
    '/api/admin/app-users/experience/stats',
    { params },
  );
}

/**
 * 手动增加 APP 用户经验
 */
export async function experienceGrantApi(
  params: ExperienceGrantRequest,
): Promise<ExperienceGrantResponse> {
  return requestClient.post<ExperienceGrantResponse>(
    '/api/admin/app-users/experience/grant',
    params,
  );
}
