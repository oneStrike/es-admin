import type {
  ExperienceAddRequest,
  ExperienceAddResponse,
  ExperienceRecordsDetailRequest,
  ExperienceRecordsDetailResponse,
  ExperienceRecordsPageRequest,
  ExperienceRecordsPageResponse,
  ExperienceRulesCreateRequest,
  ExperienceRulesCreateResponse,
  ExperienceRulesDeleteRequest,
  ExperienceRulesDeleteResponse,
  ExperienceRulesDetailRequest,
  ExperienceRulesDetailResponse,
  ExperienceRulesPageRequest,
  ExperienceRulesPageResponse,
  ExperienceRulesUpdateRequest,
  ExperienceRulesUpdateResponse,
  ExperienceUserStatsRequest,
  ExperienceUserStatsResponse,
} from '../types/forum/experience.d';

import { requestClient } from '#/utils/request';

/**
 * 获取经验规则分页
 */
export async function experienceRulesPageApi(
  params?: ExperienceRulesPageRequest,
): Promise<ExperienceRulesPageResponse> {
  return requestClient.get<ExperienceRulesPageResponse>(
    '/api/admin/forum/experience/rules-page',
    { params },
  );
}

/**
 * 获取经验规则详情
 */
export async function experienceRulesDetailApi(
  params: ExperienceRulesDetailRequest,
): Promise<ExperienceRulesDetailResponse> {
  return requestClient.get<ExperienceRulesDetailResponse>(
    '/api/admin/forum/experience/rules-detail',
    { params },
  );
}

/**
 * 创建经验规则
 */
export async function experienceRulesCreateApi(
  params: ExperienceRulesCreateRequest,
): Promise<ExperienceRulesCreateResponse> {
  return requestClient.post<ExperienceRulesCreateResponse>(
    '/api/admin/forum/experience/rules-create',
    params,
  );
}

/**
 * 更新经验规则
 */
export async function experienceRulesUpdateApi(
  params: ExperienceRulesUpdateRequest,
): Promise<ExperienceRulesUpdateResponse> {
  return requestClient.post<ExperienceRulesUpdateResponse>(
    '/api/admin/forum/experience/rules-update',
    params,
  );
}

/**
 * 删除经验规则
 */
export async function experienceRulesDeleteApi(
  params: ExperienceRulesDeleteRequest,
): Promise<ExperienceRulesDeleteResponse> {
  return requestClient.post<ExperienceRulesDeleteResponse>(
    '/api/admin/forum/experience/rules-delete',
    params,
  );
}

/**
 * 增加经验
 */
export async function experienceAddApi(
  params: ExperienceAddRequest,
): Promise<ExperienceAddResponse> {
  return requestClient.post<ExperienceAddResponse>(
    '/api/admin/forum/experience/add',
    params,
  );
}

/**
 * 获取经验记录分页
 */
export async function experienceRecordsPageApi(
  params: ExperienceRecordsPageRequest,
): Promise<ExperienceRecordsPageResponse> {
  return requestClient.get<ExperienceRecordsPageResponse>(
    '/api/admin/forum/experience/records-page',
    { params },
  );
}

/**
 * 获取经验记录详情
 */
export async function experienceRecordsDetailApi(
  params: ExperienceRecordsDetailRequest,
): Promise<ExperienceRecordsDetailResponse> {
  return requestClient.get<ExperienceRecordsDetailResponse>(
    '/api/admin/forum/experience/records-detail',
    { params },
  );
}

/**
 * 获取用户经验统计
 */
export async function experienceUserStatsApi(
  params: ExperienceUserStatsRequest,
): Promise<ExperienceUserStatsResponse> {
  return requestClient.get<ExperienceUserStatsResponse>(
    '/api/admin/forum/experience/user-stats',
    { params },
  );
}
