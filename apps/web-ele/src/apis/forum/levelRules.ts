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
} from '../types/forum/levelRules.d';

import { requestClient } from '#/utils/request';

/**
 * 获取等级规则分页
 */
export async function levelRulesPageApi(
  params?: LevelRulesPageRequest,
): Promise<LevelRulesPageResponse> {
  return requestClient.get<LevelRulesPageResponse>(
    '/api/admin/forum/level-rules/page',
    { params },
  );
}

/**
 * 获取等级规则详情
 */
export async function levelRulesDetailApi(
  params: LevelRulesDetailRequest,
): Promise<LevelRulesDetailResponse> {
  return requestClient.get<LevelRulesDetailResponse>(
    '/api/admin/forum/level-rules/detail',
    { params },
  );
}

/**
 * 创建等级规则
 */
export async function levelRulesCreateApi(
  params: LevelRulesCreateRequest,
): Promise<LevelRulesCreateResponse> {
  return requestClient.post<LevelRulesCreateResponse>(
    '/api/admin/forum/level-rules/create',
    params,
  );
}

/**
 * 更新等级规则
 */
export async function levelRulesUpdateApi(
  params: LevelRulesUpdateRequest,
): Promise<LevelRulesUpdateResponse> {
  return requestClient.post<LevelRulesUpdateResponse>(
    '/api/admin/forum/level-rules/update',
    params,
  );
}

/**
 * 删除等级规则
 */
export async function levelRulesDeleteApi(
  params: LevelRulesDeleteRequest,
): Promise<LevelRulesDeleteResponse> {
  return requestClient.post<LevelRulesDeleteResponse>(
    '/api/admin/forum/level-rules/delete',
    params,
  );
}

/**
 * 获取用户等级信息
 */
export async function levelRulesUserLevelInfoApi(
  params: LevelRulesUserLevelInfoRequest,
): Promise<LevelRulesUserLevelInfoResponse> {
  return requestClient.get<LevelRulesUserLevelInfoResponse>(
    '/api/admin/forum/level-rules/user-level-info',
    { params },
  );
}

/**
 * 检查用户等级权限
 */
export async function levelRulesCheckPermissionApi(
  params: LevelRulesCheckPermissionRequest,
): Promise<LevelRulesCheckPermissionResponse> {
  return requestClient.post<LevelRulesCheckPermissionResponse>(
    '/api/admin/forum/level-rules/check-permission',
    params,
  );
}

/**
 * 获取等级统计信息
 */
export async function levelRulesStatisticsApi(): Promise<LevelRulesStatisticsResponse> {
  return requestClient.get<LevelRulesStatisticsResponse>(
    '/api/admin/forum/level-rules/statistics',
  );
}
