import type {
  GrowthBadgesAssignRequest,
  GrowthBadgesAssignResponse,
  GrowthBadgesCreateRequest,
  GrowthBadgesCreateResponse,
  GrowthBadgesDeleteRequest,
  GrowthBadgesDeleteResponse,
  GrowthBadgesDetailRequest,
  GrowthBadgesDetailResponse,
  GrowthBadgesPageRequest,
  GrowthBadgesPageResponse,
  GrowthBadgesRevokeRequest,
  GrowthBadgesRevokeResponse,
  GrowthBadgesStatsResponse,
  GrowthBadgesUpdateRequest,
  GrowthBadgesUpdateResponse,
  GrowthBadgesUpdateStatusRequest,
  GrowthBadgesUpdateStatusResponse,
  GrowthBadgesUserPageRequest,
  GrowthBadgesUserPageResponse,
  GrowthExperienceRulesCreateRequest,
  GrowthExperienceRulesCreateResponse,
  GrowthExperienceRulesDeleteRequest,
  GrowthExperienceRulesDeleteResponse,
  GrowthExperienceRulesDetailRequest,
  GrowthExperienceRulesDetailResponse,
  GrowthExperienceRulesGrantRequest,
  GrowthExperienceRulesGrantResponse,
  GrowthExperienceRulesPageRequest,
  GrowthExperienceRulesPageResponse,
  GrowthExperienceRulesRecordDetailRequest,
  GrowthExperienceRulesRecordDetailResponse,
  GrowthExperienceRulesRecordPageRequest,
  GrowthExperienceRulesRecordPageResponse,
  GrowthExperienceRulesStatsRequest,
  GrowthExperienceRulesStatsResponse,
  GrowthExperienceRulesUpdateRequest,
  GrowthExperienceRulesUpdateResponse,
  GrowthLevelRulesCreateRequest,
  GrowthLevelRulesCreateResponse,
  GrowthLevelRulesDeleteRequest,
  GrowthLevelRulesDeleteResponse,
  GrowthLevelRulesDetailRequest,
  GrowthLevelRulesDetailResponse,
  GrowthLevelRulesPageRequest,
  GrowthLevelRulesPageResponse,
  GrowthLevelRulesPermissionCheckRequest,
  GrowthLevelRulesPermissionCheckResponse,
  GrowthLevelRulesStatsResponse,
  GrowthLevelRulesUpdateRequest,
  GrowthLevelRulesUpdateResponse,
  GrowthLevelRulesUserDetailRequest,
  GrowthLevelRulesUserDetailResponse,
  GrowthPointsRulesCreateRequest,
  GrowthPointsRulesCreateResponse,
  GrowthPointsRulesDetailRequest,
  GrowthPointsRulesDetailResponse,
  GrowthPointsRulesPageRequest,
  GrowthPointsRulesPageResponse,
  GrowthPointsRulesUpdateRequest,
  GrowthPointsRulesUpdateResponse
} from '../types/growth.d'

import { requestClient } from '#/api/request'


  /**
   * 获取积分规则分页
   */
  export async function growthPointsRulesPageApi(params?: GrowthPointsRulesPageRequest): Promise<GrowthPointsRulesPageResponse> {
    return requestClient.get<GrowthPointsRulesPageResponse>('/api/admin/growth/points-rules/page', { params });
  }


  /**
   * 获取积分规则详情
   */
  export async function growthPointsRulesDetailApi(params: GrowthPointsRulesDetailRequest): Promise<GrowthPointsRulesDetailResponse> {
    return requestClient.get<GrowthPointsRulesDetailResponse>('/api/admin/growth/points-rules/detail', { params });
  }


  /**
   * 创建积分规则
   */
  export async function growthPointsRulesCreateApi(params: GrowthPointsRulesCreateRequest): Promise<GrowthPointsRulesCreateResponse> {
    return requestClient.post<GrowthPointsRulesCreateResponse>('/api/admin/growth/points-rules/create', params);
  }


  /**
   * 更新积分规则
   */
  export async function growthPointsRulesUpdateApi(params: GrowthPointsRulesUpdateRequest): Promise<GrowthPointsRulesUpdateResponse> {
    return requestClient.post<GrowthPointsRulesUpdateResponse>('/api/admin/growth/points-rules/update', params);
  }


  /**
   * 获取用户经验规则分页
   */
  export async function growthExperienceRulesPageApi(params?: GrowthExperienceRulesPageRequest): Promise<GrowthExperienceRulesPageResponse> {
    return requestClient.get<GrowthExperienceRulesPageResponse>('/api/admin/growth/experience-rules/page', { params });
  }


  /**
   * 获取用户经验规则详情
   */
  export async function growthExperienceRulesDetailApi(params: GrowthExperienceRulesDetailRequest): Promise<GrowthExperienceRulesDetailResponse> {
    return requestClient.get<GrowthExperienceRulesDetailResponse>('/api/admin/growth/experience-rules/detail', { params });
  }


  /**
   * 创建用户经验规则
   */
  export async function growthExperienceRulesCreateApi(params: GrowthExperienceRulesCreateRequest): Promise<GrowthExperienceRulesCreateResponse> {
    return requestClient.post<GrowthExperienceRulesCreateResponse>('/api/admin/growth/experience-rules/create', params);
  }


  /**
   * 更新用户经验规则
   */
  export async function growthExperienceRulesUpdateApi(params: GrowthExperienceRulesUpdateRequest): Promise<GrowthExperienceRulesUpdateResponse> {
    return requestClient.post<GrowthExperienceRulesUpdateResponse>('/api/admin/growth/experience-rules/update', params);
  }


  /**
   * 删除用户经验规则
   */
  export async function growthExperienceRulesDeleteApi(params: GrowthExperienceRulesDeleteRequest): Promise<GrowthExperienceRulesDeleteResponse> {
    return requestClient.post<GrowthExperienceRulesDeleteResponse>('/api/admin/growth/experience-rules/delete', params);
  }


  /**
   * 增加用户经验
   */
  export async function growthExperienceRulesGrantApi(params: GrowthExperienceRulesGrantRequest): Promise<GrowthExperienceRulesGrantResponse> {
    return requestClient.post<GrowthExperienceRulesGrantResponse>('/api/admin/growth/experience-rules/grant', params);
  }


  /**
   * 获取用户经验记录分页
   */
  export async function growthExperienceRulesRecordPageApi(params: GrowthExperienceRulesRecordPageRequest): Promise<GrowthExperienceRulesRecordPageResponse> {
    return requestClient.get<GrowthExperienceRulesRecordPageResponse>('/api/admin/growth/experience-rules/record/page', { params });
  }


  /**
   * 获取用户经验记录详情
   */
  export async function growthExperienceRulesRecordDetailApi(params: GrowthExperienceRulesRecordDetailRequest): Promise<GrowthExperienceRulesRecordDetailResponse> {
    return requestClient.get<GrowthExperienceRulesRecordDetailResponse>('/api/admin/growth/experience-rules/record/detail', { params });
  }


  /**
   * 获取用户经验统计信息
   */
  export async function growthExperienceRulesStatsApi(params: GrowthExperienceRulesStatsRequest): Promise<GrowthExperienceRulesStatsResponse> {
    return requestClient.get<GrowthExperienceRulesStatsResponse>('/api/admin/growth/experience-rules/stats', { params });
  }


  /**
   * 获取用户等级规则分页
   */
  export async function growthLevelRulesPageApi(params?: GrowthLevelRulesPageRequest): Promise<GrowthLevelRulesPageResponse> {
    return requestClient.get<GrowthLevelRulesPageResponse>('/api/admin/growth/level-rules/page', { params });
  }


  /**
   * 获取用户等级规则详情
   */
  export async function growthLevelRulesDetailApi(params: GrowthLevelRulesDetailRequest): Promise<GrowthLevelRulesDetailResponse> {
    return requestClient.get<GrowthLevelRulesDetailResponse>('/api/admin/growth/level-rules/detail', { params });
  }


  /**
   * 创建用户等级规则
   */
  export async function growthLevelRulesCreateApi(params: GrowthLevelRulesCreateRequest): Promise<GrowthLevelRulesCreateResponse> {
    return requestClient.post<GrowthLevelRulesCreateResponse>('/api/admin/growth/level-rules/create', params);
  }


  /**
   * 更新用户等级规则
   */
  export async function growthLevelRulesUpdateApi(params: GrowthLevelRulesUpdateRequest): Promise<GrowthLevelRulesUpdateResponse> {
    return requestClient.post<GrowthLevelRulesUpdateResponse>('/api/admin/growth/level-rules/update', params);
  }


  /**
   * 删除用户等级规则
   */
  export async function growthLevelRulesDeleteApi(params: GrowthLevelRulesDeleteRequest): Promise<GrowthLevelRulesDeleteResponse> {
    return requestClient.post<GrowthLevelRulesDeleteResponse>('/api/admin/growth/level-rules/delete', params);
  }


  /**
   * 获取用户等级信息详情
   */
  export async function growthLevelRulesUserDetailApi(params: GrowthLevelRulesUserDetailRequest): Promise<GrowthLevelRulesUserDetailResponse> {
    return requestClient.get<GrowthLevelRulesUserDetailResponse>('/api/admin/growth/level-rules/user/detail', { params });
  }


  /**
   * 检查用户等级权限配置
   */
  export async function growthLevelRulesPermissionCheckApi(params: GrowthLevelRulesPermissionCheckRequest): Promise<GrowthLevelRulesPermissionCheckResponse> {
    return requestClient.post<GrowthLevelRulesPermissionCheckResponse>('/api/admin/growth/level-rules/permission/check', params);
  }


  /**
   * 获取用户等级统计信息
   */
  export async function growthLevelRulesStatsApi(): Promise<GrowthLevelRulesStatsResponse> {
    return requestClient.get<GrowthLevelRulesStatsResponse>('/api/admin/growth/level-rules/stats');
  }


  /**
   * 获取用户徽章分页
   */
  export async function growthBadgesPageApi(params?: GrowthBadgesPageRequest): Promise<GrowthBadgesPageResponse> {
    return requestClient.get<GrowthBadgesPageResponse>('/api/admin/growth/badges/page', { params });
  }


  /**
   * 获取用户徽章详情
   */
  export async function growthBadgesDetailApi(params: GrowthBadgesDetailRequest): Promise<GrowthBadgesDetailResponse> {
    return requestClient.get<GrowthBadgesDetailResponse>('/api/admin/growth/badges/detail', { params });
  }


  /**
   * 创建用户徽章
   */
  export async function growthBadgesCreateApi(params: GrowthBadgesCreateRequest): Promise<GrowthBadgesCreateResponse> {
    return requestClient.post<GrowthBadgesCreateResponse>('/api/admin/growth/badges/create', params);
  }


  /**
   * 更新用户徽章
   */
  export async function growthBadgesUpdateApi(params: GrowthBadgesUpdateRequest): Promise<GrowthBadgesUpdateResponse> {
    return requestClient.post<GrowthBadgesUpdateResponse>('/api/admin/growth/badges/update', params);
  }


  /**
   * 删除用户徽章
   */
  export async function growthBadgesDeleteApi(params: GrowthBadgesDeleteRequest): Promise<GrowthBadgesDeleteResponse> {
    return requestClient.post<GrowthBadgesDeleteResponse>('/api/admin/growth/badges/delete', params);
  }


  /**
   * 更新用户徽章状态
   */
  export async function growthBadgesUpdateStatusApi(params: GrowthBadgesUpdateStatusRequest): Promise<GrowthBadgesUpdateStatusResponse> {
    return requestClient.post<GrowthBadgesUpdateStatusResponse>('/api/admin/growth/badges/update-status', params);
  }


  /**
   * 为用户分配用户徽章
   */
  export async function growthBadgesAssignApi(params: GrowthBadgesAssignRequest): Promise<GrowthBadgesAssignResponse> {
    return requestClient.post<GrowthBadgesAssignResponse>('/api/admin/growth/badges/assign', params);
  }


  /**
   * 撤销用户徽章
   */
  export async function growthBadgesRevokeApi(params: GrowthBadgesRevokeRequest): Promise<GrowthBadgesRevokeResponse> {
    return requestClient.post<GrowthBadgesRevokeResponse>('/api/admin/growth/badges/revoke', params);
  }


  /**
   * 获取拥有某个用户徽章的用户列表
   */
  export async function growthBadgesUserPageApi(params: GrowthBadgesUserPageRequest): Promise<GrowthBadgesUserPageResponse> {
    return requestClient.get<GrowthBadgesUserPageResponse>('/api/admin/growth/badges/user/page', { params });
  }


  /**
   * 获取用户徽章统计信息
   */
  export async function growthBadgesStatsApi(): Promise<GrowthBadgesStatsResponse> {
    return requestClient.get<GrowthBadgesStatsResponse>('/api/admin/growth/badges/stats');
  }
