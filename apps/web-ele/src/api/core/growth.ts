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
  GrowthExperienceRecordDetailRequest,
  GrowthExperienceRecordDetailResponse,
  GrowthExperienceRecordPageRequest,
  GrowthExperienceRecordPageResponse,
  GrowthExperienceStatsRequest,
  GrowthExperienceStatsResponse,
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
  GrowthRewardRulesCreateRequest,
  GrowthRewardRulesCreateResponse,
  GrowthRewardRulesDeleteRequest,
  GrowthRewardRulesDeleteResponse,
  GrowthRewardRulesDetailRequest,
  GrowthRewardRulesDetailResponse,
  GrowthRewardRulesPageRequest,
  GrowthRewardRulesPageResponse,
  GrowthRewardRulesUpdateRequest,
  GrowthRewardRulesUpdateResponse,
  GrowthRewardSettlementPageRequest,
  GrowthRewardSettlementPageResponse,
  GrowthRewardSettlementRetryPendingBatchRequest,
  GrowthRewardSettlementRetryPendingBatchResponse,
  GrowthRewardSettlementRetryRequest,
  GrowthRewardSettlementRetryResponse,
  GrowthRuleEventsPageRequest,
  GrowthRuleEventsPageResponse,
} from '../types/growth.d';

import { requestClient } from '#/api/request';

/**
 * 获取用户经验记录分页
 */
export async function growthExperienceRecordPageApi(
  params: GrowthExperienceRecordPageRequest,
): Promise<GrowthExperienceRecordPageResponse> {
  return requestClient.get<GrowthExperienceRecordPageResponse>(
    '/api/admin/growth/experience/record/page',
    { params },
  );
}

/**
 * 获取用户经验记录详情
 */
export async function growthExperienceRecordDetailApi(
  params: GrowthExperienceRecordDetailRequest,
): Promise<GrowthExperienceRecordDetailResponse> {
  return requestClient.get<GrowthExperienceRecordDetailResponse>(
    '/api/admin/growth/experience/record/detail',
    { params },
  );
}

/**
 * 获取用户经验统计信息
 */
export async function growthExperienceStatsApi(
  params: GrowthExperienceStatsRequest,
): Promise<GrowthExperienceStatsResponse> {
  return requestClient.get<GrowthExperienceStatsResponse>(
    '/api/admin/growth/experience/stats',
    { params },
  );
}

/**
 * 获取用户等级规则分页
 */
export async function growthLevelRulesPageApi(
  params?: GrowthLevelRulesPageRequest,
): Promise<GrowthLevelRulesPageResponse> {
  return requestClient.get<GrowthLevelRulesPageResponse>(
    '/api/admin/growth/level-rules/page',
    { params },
  );
}

/**
 * 获取用户等级规则详情
 */
export async function growthLevelRulesDetailApi(
  params: GrowthLevelRulesDetailRequest,
): Promise<GrowthLevelRulesDetailResponse> {
  return requestClient.get<GrowthLevelRulesDetailResponse>(
    '/api/admin/growth/level-rules/detail',
    { params },
  );
}

/**
 * 创建用户等级规则
 */
export async function growthLevelRulesCreateApi(
  params: GrowthLevelRulesCreateRequest,
): Promise<GrowthLevelRulesCreateResponse> {
  return requestClient.post<GrowthLevelRulesCreateResponse>(
    '/api/admin/growth/level-rules/create',
    params,
  );
}

/**
 * 更新用户等级规则
 */
export async function growthLevelRulesUpdateApi(
  params: GrowthLevelRulesUpdateRequest,
): Promise<GrowthLevelRulesUpdateResponse> {
  return requestClient.post<GrowthLevelRulesUpdateResponse>(
    '/api/admin/growth/level-rules/update',
    params,
  );
}

/**
 * 删除用户等级规则
 */
export async function growthLevelRulesDeleteApi(
  params: GrowthLevelRulesDeleteRequest,
): Promise<GrowthLevelRulesDeleteResponse> {
  return requestClient.post<GrowthLevelRulesDeleteResponse>(
    '/api/admin/growth/level-rules/delete',
    params,
  );
}

/**
 * 获取用户等级信息详情
 */
export async function growthLevelRulesUserDetailApi(
  params: GrowthLevelRulesUserDetailRequest,
): Promise<GrowthLevelRulesUserDetailResponse> {
  return requestClient.get<GrowthLevelRulesUserDetailResponse>(
    '/api/admin/growth/level-rules/user/detail',
    { params },
  );
}

/**
 * 检查用户等级权限配置
 */
export async function growthLevelRulesPermissionCheckApi(
  params: GrowthLevelRulesPermissionCheckRequest,
): Promise<GrowthLevelRulesPermissionCheckResponse> {
  return requestClient.post<GrowthLevelRulesPermissionCheckResponse>(
    '/api/admin/growth/level-rules/permission/check',
    params,
  );
}

/**
 * 获取用户等级统计信息
 */
export async function growthLevelRulesStatsApi(): Promise<GrowthLevelRulesStatsResponse> {
  return requestClient.get<GrowthLevelRulesStatsResponse>(
    '/api/admin/growth/level-rules/stats',
  );
}

/**
 * 获取用户徽章分页
 */
export async function growthBadgesPageApi(
  params?: GrowthBadgesPageRequest,
): Promise<GrowthBadgesPageResponse> {
  return requestClient.get<GrowthBadgesPageResponse>(
    '/api/admin/growth/badges/page',
    { params },
  );
}

/**
 * 获取用户徽章详情
 */
export async function growthBadgesDetailApi(
  params: GrowthBadgesDetailRequest,
): Promise<GrowthBadgesDetailResponse> {
  return requestClient.get<GrowthBadgesDetailResponse>(
    '/api/admin/growth/badges/detail',
    { params },
  );
}

/**
 * 创建用户徽章
 */
export async function growthBadgesCreateApi(
  params: GrowthBadgesCreateRequest,
): Promise<GrowthBadgesCreateResponse> {
  return requestClient.post<GrowthBadgesCreateResponse>(
    '/api/admin/growth/badges/create',
    params,
  );
}

/**
 * 更新用户徽章
 */
export async function growthBadgesUpdateApi(
  params: GrowthBadgesUpdateRequest,
): Promise<GrowthBadgesUpdateResponse> {
  return requestClient.post<GrowthBadgesUpdateResponse>(
    '/api/admin/growth/badges/update',
    params,
  );
}

/**
 * 删除用户徽章
 */
export async function growthBadgesDeleteApi(
  params: GrowthBadgesDeleteRequest,
): Promise<GrowthBadgesDeleteResponse> {
  return requestClient.post<GrowthBadgesDeleteResponse>(
    '/api/admin/growth/badges/delete',
    params,
  );
}

/**
 * 更新用户徽章状态
 */
export async function growthBadgesUpdateStatusApi(
  params: GrowthBadgesUpdateStatusRequest,
): Promise<GrowthBadgesUpdateStatusResponse> {
  return requestClient.post<GrowthBadgesUpdateStatusResponse>(
    '/api/admin/growth/badges/update-status',
    params,
  );
}

/**
 * 为用户分配用户徽章
 */
export async function growthBadgesAssignApi(
  params: GrowthBadgesAssignRequest,
): Promise<GrowthBadgesAssignResponse> {
  return requestClient.post<GrowthBadgesAssignResponse>(
    '/api/admin/growth/badges/assign',
    params,
  );
}

/**
 * 撤销用户徽章
 */
export async function growthBadgesRevokeApi(
  params: GrowthBadgesRevokeRequest,
): Promise<GrowthBadgesRevokeResponse> {
  return requestClient.post<GrowthBadgesRevokeResponse>(
    '/api/admin/growth/badges/revoke',
    params,
  );
}

/**
 * 获取拥有某个用户徽章的用户列表
 */
export async function growthBadgesUserPageApi(
  params: GrowthBadgesUserPageRequest,
): Promise<GrowthBadgesUserPageResponse> {
  return requestClient.get<GrowthBadgesUserPageResponse>(
    '/api/admin/growth/badges/user/page',
    { params },
  );
}

/**
 * 获取用户徽章统计信息
 */
export async function growthBadgesStatsApi(): Promise<GrowthBadgesStatsResponse> {
  return requestClient.get<GrowthBadgesStatsResponse>(
    '/api/admin/growth/badges/stats',
  );
}

/**
 * 按事件聚合查看积分规则、经验规则与任务 bonus 关联关系
 */
export async function growthRuleEventsPageApi(
  params?: GrowthRuleEventsPageRequest,
): Promise<GrowthRuleEventsPageResponse> {
  return requestClient.get<GrowthRuleEventsPageResponse>(
    '/api/admin/growth/rule-events/page',
    { params },
  );
}

/**
 * 分页查询通用成长奖励补偿记录
 */
export async function growthRewardSettlementPageApi(
  params?: GrowthRewardSettlementPageRequest,
): Promise<GrowthRewardSettlementPageResponse> {
  return requestClient.get<GrowthRewardSettlementPageResponse>(
    '/api/admin/growth/reward-settlement/page',
    { params },
  );
}

/**
 * 重试单条通用成长奖励补偿
 */
export async function growthRewardSettlementRetryApi(
  params: GrowthRewardSettlementRetryRequest,
): Promise<GrowthRewardSettlementRetryResponse> {
  return requestClient.post<GrowthRewardSettlementRetryResponse>(
    '/api/admin/growth/reward-settlement/retry',
    params,
  );
}

/**
 * 批量重试待补偿的通用成长奖励记录
 */
export async function growthRewardSettlementRetryPendingBatchApi(
  params?: GrowthRewardSettlementRetryPendingBatchRequest,
): Promise<GrowthRewardSettlementRetryPendingBatchResponse> {
  return requestClient.post<GrowthRewardSettlementRetryPendingBatchResponse>(
    '/api/admin/growth/reward-settlement/retry-pending/batch',
    params,
  );
}

/**
 * 分页查询成长奖励规则
 */
export async function growthRewardRulesPageApi(
  params?: GrowthRewardRulesPageRequest,
): Promise<GrowthRewardRulesPageResponse> {
  return requestClient.get<GrowthRewardRulesPageResponse>(
    '/api/admin/growth/reward-rules/page',
    { params },
  );
}

/**
 * 查询成长奖励规则详情
 */
export async function growthRewardRulesDetailApi(
  params: GrowthRewardRulesDetailRequest,
): Promise<GrowthRewardRulesDetailResponse> {
  return requestClient.get<GrowthRewardRulesDetailResponse>(
    '/api/admin/growth/reward-rules/detail',
    { params },
  );
}

/**
 * 创建成长奖励规则
 */
export async function growthRewardRulesCreateApi(
  params: GrowthRewardRulesCreateRequest,
): Promise<GrowthRewardRulesCreateResponse> {
  return requestClient.post<GrowthRewardRulesCreateResponse>(
    '/api/admin/growth/reward-rules/create',
    params,
  );
}

/**
 * 更新成长奖励规则
 */
export async function growthRewardRulesUpdateApi(
  params: GrowthRewardRulesUpdateRequest,
): Promise<GrowthRewardRulesUpdateResponse> {
  return requestClient.post<GrowthRewardRulesUpdateResponse>(
    '/api/admin/growth/reward-rules/update',
    params,
  );
}

/**
 * 删除成长奖励规则
 */
export async function growthRewardRulesDeleteApi(
  params: GrowthRewardRulesDeleteRequest,
): Promise<GrowthRewardRulesDeleteResponse> {
  return requestClient.post<GrowthRewardRulesDeleteResponse>(
    '/api/admin/growth/reward-rules/delete',
    params,
  );
}
