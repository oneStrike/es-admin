import type {
  ExperienceRulesCreateRequest,
  ExperienceRulesCreateResponse,
  ExperienceRulesDeleteRequest,
  ExperienceRulesDeleteResponse,
  ExperienceRulesDetailRequest,
  ExperienceRulesDetailResponse,
  ExperienceRulesGrantRequest,
  ExperienceRulesGrantResponse,
  ExperienceRulesPageRequest,
  ExperienceRulesPageResponse,
  ExperienceRulesStatsRequest,
  ExperienceRulesStatsResponse,
  ExperienceRulesUpdateRequest,
  ExperienceRulesUpdateResponse
} from '../../types/growth/experienceRules.d'

import { requestClient } from '#/api/request'


  /**
   * 获取用户经验规则分页
   */
  export async function experienceRulesPageApi(params?: ExperienceRulesPageRequest): Promise<ExperienceRulesPageResponse> {
    return requestClient.get<ExperienceRulesPageResponse>('/api/admin/growth/experience-rules/page', { params });
  }


  /**
   * 获取用户经验规则详情
   */
  export async function experienceRulesDetailApi(params: ExperienceRulesDetailRequest): Promise<ExperienceRulesDetailResponse> {
    return requestClient.get<ExperienceRulesDetailResponse>('/api/admin/growth/experience-rules/detail', { params });
  }


  /**
   * 创建用户经验规则
   */
  export async function experienceRulesCreateApi(params: ExperienceRulesCreateRequest): Promise<ExperienceRulesCreateResponse> {
    return requestClient.post<ExperienceRulesCreateResponse>('/api/admin/growth/experience-rules/create', params);
  }


  /**
   * 更新用户经验规则
   */
  export async function experienceRulesUpdateApi(params: ExperienceRulesUpdateRequest): Promise<ExperienceRulesUpdateResponse> {
    return requestClient.post<ExperienceRulesUpdateResponse>('/api/admin/growth/experience-rules/update', params);
  }


  /**
   * 删除用户经验规则
   */
  export async function experienceRulesDeleteApi(params: ExperienceRulesDeleteRequest): Promise<ExperienceRulesDeleteResponse> {
    return requestClient.post<ExperienceRulesDeleteResponse>('/api/admin/growth/experience-rules/delete', params);
  }


  /**
   * 增加用户经验
   */
  export async function experienceRulesGrantApi(params: ExperienceRulesGrantRequest): Promise<ExperienceRulesGrantResponse> {
    return requestClient.post<ExperienceRulesGrantResponse>('/api/admin/growth/experience-rules/grant', params);
  }


  /**
   * 获取用户经验统计信息
   */
  export async function experienceRulesStatsApi(params: ExperienceRulesStatsRequest): Promise<ExperienceRulesStatsResponse> {
    return requestClient.get<ExperienceRulesStatsResponse>('/api/admin/growth/experience-rules/stats', { params });
  }
