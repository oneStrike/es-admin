import type {
  BadgesAssignRequest,
  BadgesAssignResponse,
  BadgesCreateRequest,
  BadgesCreateResponse,
  BadgesDeleteRequest,
  BadgesDeleteResponse,
  BadgesDetailRequest,
  BadgesDetailResponse,
  BadgesPageRequest,
  BadgesPageResponse,
  BadgesRevokeRequest,
  BadgesRevokeResponse,
  BadgesStatsResponse,
  BadgesUpdateRequest,
  BadgesUpdateResponse,
  BadgesUpdateStatusRequest,
  BadgesUpdateStatusResponse,
} from '../../types/app-users/badges.d';

import { requestClient } from '#/api/request';

/**
 * 分页查询 APP 用户徽章
 */
export async function badgesPageApi(
  params: BadgesPageRequest,
): Promise<BadgesPageResponse> {
  return requestClient.get<BadgesPageResponse>(
    '/api/admin/app-users/badges/page',
    { params },
  );
}

/**
 * 为 APP 用户分配徽章
 */
export async function badgesAssignApi(
  params: BadgesAssignRequest,
): Promise<BadgesAssignResponse> {
  return requestClient.post<BadgesAssignResponse>(
    '/api/admin/app-users/badges/assign',
    params,
  );
}

/**
 * 撤销 APP 用户徽章
 */
export async function badgesRevokeApi(
  params: BadgesRevokeRequest,
): Promise<BadgesRevokeResponse> {
  return requestClient.post<BadgesRevokeResponse>(
    '/api/admin/app-users/badges/revoke',
    params,
  );
}

/**
 * 获取用户徽章分页
 */
export async function badgesPageApi(
  params?: BadgesPageRequest,
): Promise<BadgesPageResponse> {
  return requestClient.get<BadgesPageResponse>(
    '/api/admin/growth/badges/page',
    { params },
  );
}

/**
 * 获取用户徽章详情
 */
export async function badgesDetailApi(
  params: BadgesDetailRequest,
): Promise<BadgesDetailResponse> {
  return requestClient.get<BadgesDetailResponse>(
    '/api/admin/growth/badges/detail',
    { params },
  );
}

/**
 * 创建用户徽章
 */
export async function badgesCreateApi(
  params: BadgesCreateRequest,
): Promise<BadgesCreateResponse> {
  return requestClient.post<BadgesCreateResponse>(
    '/api/admin/growth/badges/create',
    params,
  );
}

/**
 * 更新用户徽章
 */
export async function badgesUpdateApi(
  params: BadgesUpdateRequest,
): Promise<BadgesUpdateResponse> {
  return requestClient.post<BadgesUpdateResponse>(
    '/api/admin/growth/badges/update',
    params,
  );
}

/**
 * 删除用户徽章
 */
export async function badgesDeleteApi(
  params: BadgesDeleteRequest,
): Promise<BadgesDeleteResponse> {
  return requestClient.post<BadgesDeleteResponse>(
    '/api/admin/growth/badges/delete',
    params,
  );
}

/**
 * 更新用户徽章状态
 */
export async function badgesUpdateStatusApi(
  params: BadgesUpdateStatusRequest,
): Promise<BadgesUpdateStatusResponse> {
  return requestClient.post<BadgesUpdateStatusResponse>(
    '/api/admin/growth/badges/update-status',
    params,
  );
}

/**
 * 为用户分配用户徽章
 */
export async function badgesAssignApi(
  params: BadgesAssignRequest,
): Promise<BadgesAssignResponse> {
  return requestClient.post<BadgesAssignResponse>(
    '/api/admin/growth/badges/assign',
    params,
  );
}

/**
 * 撤销用户徽章
 */
export async function badgesRevokeApi(
  params: BadgesRevokeRequest,
): Promise<BadgesRevokeResponse> {
  return requestClient.post<BadgesRevokeResponse>(
    '/api/admin/growth/badges/revoke',
    params,
  );
}

/**
 * 获取用户徽章统计信息
 */
export async function badgesStatsApi(
  params: BadgesStatsRequest,
): Promise<BadgesStatsResponse> {
  return requestClient.get<BadgesStatsResponse>(
    '/api/admin/growth/badges/stats',
    { params },
  );
}
