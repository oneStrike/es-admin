import type {
  ExperienceRulesAddRequest,
  ExperienceRulesAddResponse,
  ExperienceRulesRecordsDetailRequest,
  ExperienceRulesRecordsDetailResponse,
  ExperienceRulesRecordsPageRequest,
  ExperienceRulesRecordsPageResponse,
  ExperienceRulesRulesCreateRequest,
  ExperienceRulesRulesCreateResponse,
  ExperienceRulesRulesDeleteRequest,
  ExperienceRulesRulesDeleteResponse,
  ExperienceRulesRulesDetailRequest,
  ExperienceRulesRulesDetailResponse,
  ExperienceRulesRulesPageRequest,
  ExperienceRulesRulesPageResponse,
  ExperienceRulesRulesUpdateRequest,
  ExperienceRulesRulesUpdateResponse,
  ExperienceRulesUserStatsRequest,
  ExperienceRulesUserStatsResponse,
} from '../../types/user-growth/experienceRules.d';

import { requestClient } from '#/api/request';

/**
 * 获取用户经验规则分页
 */
export async function experienceRulesRulesPageApi(
  params?: ExperienceRulesRulesPageRequest,
): Promise<ExperienceRulesRulesPageResponse> {
  return requestClient.get<ExperienceRulesRulesPageResponse>(
    '/api/admin/user-growth/experience-rules/rules-page',
    { params },
  );
}

/**
 * 获取用户经验规则详情
 */
export async function experienceRulesRulesDetailApi(
  params: ExperienceRulesRulesDetailRequest,
): Promise<ExperienceRulesRulesDetailResponse> {
  return requestClient.get<ExperienceRulesRulesDetailResponse>(
    '/api/admin/user-growth/experience-rules/rules-detail',
    { params },
  );
}

/**
 * 创建用户经验规则
 */
export async function experienceRulesRulesCreateApi(
  params: ExperienceRulesRulesCreateRequest,
): Promise<ExperienceRulesRulesCreateResponse> {
  return requestClient.post<ExperienceRulesRulesCreateResponse>(
    '/api/admin/user-growth/experience-rules/rules-create',
    params,
  );
}

/**
 * 更新用户经验规则
 */
export async function experienceRulesRulesUpdateApi(
  params: ExperienceRulesRulesUpdateRequest,
): Promise<ExperienceRulesRulesUpdateResponse> {
  return requestClient.post<ExperienceRulesRulesUpdateResponse>(
    '/api/admin/user-growth/experience-rules/rules-update',
    params,
  );
}

/**
 * 删除用户经验规则
 */
export async function experienceRulesRulesDeleteApi(
  params: ExperienceRulesRulesDeleteRequest,
): Promise<ExperienceRulesRulesDeleteResponse> {
  return requestClient.post<ExperienceRulesRulesDeleteResponse>(
    '/api/admin/user-growth/experience-rules/rules-delete',
    params,
  );
}

/**
 * 增加用户经验
 */
export async function experienceRulesAddApi(
  params: ExperienceRulesAddRequest,
): Promise<ExperienceRulesAddResponse> {
  return requestClient.post<ExperienceRulesAddResponse>(
    '/api/admin/user-growth/experience-rules/add',
    params,
  );
}

/**
 * 获取用户经验记录分页
 */
export async function experienceRulesRecordsPageApi(
  params: ExperienceRulesRecordsPageRequest,
): Promise<ExperienceRulesRecordsPageResponse> {
  return requestClient.get<ExperienceRulesRecordsPageResponse>(
    '/api/admin/user-growth/experience-rules/records-page',
    { params },
  );
}

/**
 * 获取用户经验记录详情
 */
export async function experienceRulesRecordsDetailApi(
  params: ExperienceRulesRecordsDetailRequest,
): Promise<ExperienceRulesRecordsDetailResponse> {
  return requestClient.get<ExperienceRulesRecordsDetailResponse>(
    '/api/admin/user-growth/experience-rules/records-detail',
    { params },
  );
}

/**
 * 获取用户经验统计信息
 */
export async function experienceRulesUserStatsApi(
  params: ExperienceRulesUserStatsRequest,
): Promise<ExperienceRulesUserStatsResponse> {
  return requestClient.get<ExperienceRulesUserStatsResponse>(
    '/api/admin/user-growth/experience-rules/user-stats',
    { params },
  );
}
