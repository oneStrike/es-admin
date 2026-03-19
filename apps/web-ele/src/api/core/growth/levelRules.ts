import type {
  LevelRulesCreateRequest,
  LevelRulesCreateResponse,
  LevelRulesDeleteRequest,
  LevelRulesDeleteResponse,
  LevelRulesDetailRequest,
  LevelRulesDetailResponse,
  LevelRulesPageRequest,
  LevelRulesPageResponse,
  LevelRulesStatsResponse,
  LevelRulesUpdateRequest,
  LevelRulesUpdateResponse
} from '../../types/growth/levelRules.d'

import { requestClient } from '#/api/request'


  /**
   * 获取用户等级规则分页
   */
  export async function levelRulesPageApi(params?: LevelRulesPageRequest): Promise<LevelRulesPageResponse> {
    return requestClient.get<LevelRulesPageResponse>('/api/admin/growth/level-rules/page', { params });
  }


  /**
   * 获取用户等级规则详情
   */
  export async function levelRulesDetailApi(params: LevelRulesDetailRequest): Promise<LevelRulesDetailResponse> {
    return requestClient.get<LevelRulesDetailResponse>('/api/admin/growth/level-rules/detail', { params });
  }


  /**
   * 创建用户等级规则
   */
  export async function levelRulesCreateApi(params: LevelRulesCreateRequest): Promise<LevelRulesCreateResponse> {
    return requestClient.post<LevelRulesCreateResponse>('/api/admin/growth/level-rules/create', params);
  }


  /**
   * 更新用户等级规则
   */
  export async function levelRulesUpdateApi(params: LevelRulesUpdateRequest): Promise<LevelRulesUpdateResponse> {
    return requestClient.post<LevelRulesUpdateResponse>('/api/admin/growth/level-rules/update', params);
  }


  /**
   * 删除用户等级规则
   */
  export async function levelRulesDeleteApi(params: LevelRulesDeleteRequest): Promise<LevelRulesDeleteResponse> {
    return requestClient.post<LevelRulesDeleteResponse>('/api/admin/growth/level-rules/delete', params);
  }


  /**
   * 获取用户等级统计信息
   */
  export async function levelRulesStatsApi(): Promise<LevelRulesStatsResponse> {
    return requestClient.get<LevelRulesStatsResponse>('/api/admin/growth/level-rules/stats');
  }
