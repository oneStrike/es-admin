import type {
  UserDetailRequest,
  UserDetailResponse,
  UserPageRequest,
  UserPageResponse,
} from '../../types/growth/user.d';

import { requestClient } from '#/api/request';

/**
 * 获取用户等级信息详情
 */
export async function userDetailApi(
  params: UserDetailRequest,
): Promise<UserDetailResponse> {
  return requestClient.get<UserDetailResponse>(
    '/api/admin/growth/level-rules/user/detail',
    { params },
  );
}

/**
 * 获取拥有某个用户徽章的用户列表
 */
export async function userPageApi(
  params: UserPageRequest,
): Promise<UserPageResponse> {
  return requestClient.get<UserPageResponse>(
    '/api/admin/growth/badges/user/page',
    { params },
  );
}
