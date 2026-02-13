import type {
  LevelRulesCheckPermissionRequest,
  LevelRulesCheckPermissionResponse,
  LevelRulesCreateRequest,
  LevelRulesCreateResponse,
  LevelRulesDeleteRequest,
  LevelRulesDeleteResponse,
  LevelRulesDetailRequest,
  LevelRulesDetailResponse,
  LevelRulesPageRequest,
  LevelRulesPageResponse,
  LevelRulesStatisticsResponse,
  LevelRulesUpdateRequest,
  LevelRulesUpdateResponse,
  LevelRulesUserLevelInfoRequest,
  LevelRulesUserLevelInfoResponse,
} from '../../types/user-growth/levelRules.d';

import { requestClient } from '#/api/request';

/**
 * 获取用户等级规则分页
 */
export async function levelRulesPageApi(
  params?: LevelRulesPageRequest,
): Promise<LevelRulesPageResponse> {
  return requestClient.get<LevelRulesPageResponse>(
    '/api/admin/user-growth/level-rules/page',
    { params },
  );
}

/**
 * 获取用户等级规则详情
 */
export async function levelRulesDetailApi(
  params: LevelRulesDetailRequest,
): Promise<LevelRulesDetailResponse> {
  return requestClient.get<LevelRulesDetailResponse>(
    '/api/admin/user-growth/level-rules/detail',
    { params },
  );
}

/**
 * 创建用户等级规则
 */
export async function levelRulesCreateApi(
  params: LevelRulesCreateRequest,
): Promise<LevelRulesCreateResponse> {
  return requestClient.post<LevelRulesCreateResponse>(
    '/api/admin/user-growth/level-rules/create',
    params,
  );
}

/**
 * 更新用户等级规则
 */
export async function levelRulesUpdateApi(
  params: LevelRulesUpdateRequest,
): Promise<LevelRulesUpdateResponse> {
  return requestClient.post<LevelRulesUpdateResponse>(
    '/api/admin/user-growth/level-rules/update',
    params,
  );
}

/**
 * 删除用户等级规则
 */
export async function levelRulesDeleteApi(
  params: LevelRulesDeleteRequest,
): Promise<LevelRulesDeleteResponse> {
  return requestClient.post<LevelRulesDeleteResponse>(
    '/api/admin/user-growth/level-rules/delete',
    params,
  );
}

/**
 * 获取用户等级信息详情
 */
export async function levelRulesUserLevelInfoApi(
  params: LevelRulesUserLevelInfoRequest,
): Promise<LevelRulesUserLevelInfoResponse> {
  return requestClient.get<LevelRulesUserLevelInfoResponse>(
    '/api/admin/user-growth/level-rules/user-level-info',
    { params },
  );
}

/**
 * 检查用户等级权限配置
 */
export async function levelRulesCheckPermissionApi(
  params: LevelRulesCheckPermissionRequest,
): Promise<LevelRulesCheckPermissionResponse> {
  return requestClient.post<LevelRulesCheckPermissionResponse>(
    '/api/admin/user-growth/level-rules/check-permission',
    params,
  );
}

/**
 * 获取用户等级统计信息
 */
export async function levelRulesStatisticsApi(): Promise<LevelRulesStatisticsResponse> {
  return requestClient.get<LevelRulesStatisticsResponse>(
    '/api/admin/user-growth/level-rules/statistics',
  );
}
