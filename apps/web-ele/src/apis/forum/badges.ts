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
} from '../types/forum/badges.d';

import { requestClient } from '#/utils/request';

/**
 * 获取论坛徽章分页
 */
export async function badgesPageApi(
  params?: BadgesPageRequest,
): Promise<BadgesPageResponse> {
  return requestClient.get<BadgesPageResponse>('/api/admin/forum/badges/page', {
    params,
  });
}

/**
 * 获取徽章详情
 */
export async function badgesDetailApi(
  params: BadgesDetailRequest,
): Promise<BadgesDetailResponse> {
  return requestClient.get<BadgesDetailResponse>(
    '/api/admin/forum/badges/detail',
    { params },
  );
}

/**
 * 创建徽章
 */
export async function badgesCreateApi(
  params: BadgesCreateRequest,
): Promise<BadgesCreateResponse> {
  return requestClient.post<BadgesCreateResponse>(
    '/api/admin/forum/badges/create',
    params,
  );
}

/**
 * 更新徽章
 */
export async function badgesUpdateApi(
  params: BadgesUpdateRequest,
): Promise<BadgesUpdateResponse> {
  return requestClient.post<BadgesUpdateResponse>(
    '/api/admin/forum/badges/update',
    params,
  );
}

/**
 * 删除徽章
 */
export async function badgesDeleteApi(
  params: BadgesDeleteRequest,
): Promise<BadgesDeleteResponse> {
  return requestClient.post<BadgesDeleteResponse>(
    '/api/admin/forum/badges/delete',
    params,
  );
}

/**
 * 更新徽章状态
 */
export async function badgesUpdateStatusApi(
  params: BadgesUpdateStatusRequest,
): Promise<BadgesUpdateStatusResponse> {
  return requestClient.post<BadgesUpdateStatusResponse>(
    '/api/admin/forum/badges/update-status',
    params,
  );
}

/**
 * 为用户分配徽章
 */
export async function badgesAssignApi(
  params: BadgesAssignRequest,
): Promise<BadgesAssignResponse> {
  return requestClient.post<BadgesAssignResponse>(
    '/api/admin/forum/badges/assign',
    params,
  );
}

/**
 * 撤销用户的徽章
 */
export async function badgesRevokeApi(
  params: BadgesRevokeRequest,
): Promise<BadgesRevokeResponse> {
  return requestClient.post<BadgesRevokeResponse>(
    '/api/admin/forum/badges/revoke',
    params,
  );
}

/**
 * 获取拥有某个徽章的用户列表
 */
export async function badgesUsersApi(
  params: BadgesUsersRequest,
): Promise<BadgesUsersResponse> {
  return requestClient.get<BadgesUsersResponse>(
    '/api/admin/forum/badges/users',
    { params },
  );
}

/**
 * 获取徽章统计信息
 */
export async function badgesStatisticsApi(): Promise<BadgesStatisticsResponse> {
  return requestClient.get<BadgesStatisticsResponse>(
    '/api/admin/forum/badges/statistics',
  );
}
