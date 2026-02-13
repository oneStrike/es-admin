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
  BadgesStatisticsResponse,
  BadgesUpdateRequest,
  BadgesUpdateResponse,
  BadgesUpdateStatusRequest,
  BadgesUpdateStatusResponse,
  BadgesUsersRequest,
  BadgesUsersResponse,
} from '../../types/user-growth/badges.d';

import { requestClient } from '#/api/request';

/**
 * 获取用户徽章分页
 */
export async function badgesPageApi(
  params?: BadgesPageRequest,
): Promise<BadgesPageResponse> {
  return requestClient.get<BadgesPageResponse>(
    '/api/admin/user-growth/badges/page',
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
    '/api/admin/user-growth/badges/detail',
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
    '/api/admin/user-growth/badges/create',
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
    '/api/admin/user-growth/badges/update',
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
    '/api/admin/user-growth/badges/delete',
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
    '/api/admin/user-growth/badges/update-status',
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
    '/api/admin/user-growth/badges/assign',
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
    '/api/admin/user-growth/badges/revoke',
    params,
  );
}

/**
 * 获取拥有某个用户徽章的用户列表
 */
export async function badgesUsersApi(
  params: BadgesUsersRequest,
): Promise<BadgesUsersResponse> {
  return requestClient.get<BadgesUsersResponse>(
    '/api/admin/user-growth/badges/users',
    { params },
  );
}

/**
 * 获取用户徽章统计信息
 */
export async function badgesStatisticsApi(): Promise<BadgesStatisticsResponse> {
  return requestClient.get<BadgesStatisticsResponse>(
    '/api/admin/user-growth/badges/statistics',
  );
}
