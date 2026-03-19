import type {
  PointsRulesCreateRequest,
  PointsRulesCreateResponse,
  PointsRulesDetailRequest,
  PointsRulesDetailResponse,
  PointsRulesPageRequest,
  PointsRulesPageResponse,
  PointsRulesUpdateRequest,
  PointsRulesUpdateResponse
} from '../../types/growth/pointsRules.d'

import { requestClient } from '#/api/request'


  /**
   * 获取积分规则分页
   */
  export async function pointsRulesPageApi(params?: PointsRulesPageRequest): Promise<PointsRulesPageResponse> {
    return requestClient.get<PointsRulesPageResponse>('/api/admin/growth/points-rules/page', { params });
  }


  /**
   * 获取积分规则详情
   */
  export async function pointsRulesDetailApi(params: PointsRulesDetailRequest): Promise<PointsRulesDetailResponse> {
    return requestClient.get<PointsRulesDetailResponse>('/api/admin/growth/points-rules/detail', { params });
  }


  /**
   * 创建积分规则
   */
  export async function pointsRulesCreateApi(params: PointsRulesCreateRequest): Promise<PointsRulesCreateResponse> {
    return requestClient.post<PointsRulesCreateResponse>('/api/admin/growth/points-rules/create', params);
  }


  /**
   * 更新积分规则
   */
  export async function pointsRulesUpdateApi(params: PointsRulesUpdateRequest): Promise<PointsRulesUpdateResponse> {
    return requestClient.post<PointsRulesUpdateResponse>('/api/admin/growth/points-rules/update', params);
  }
