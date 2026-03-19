import type {
  SystemUserCreateRequest,
  SystemUserCreateResponse,
  SystemUserDetailRequest,
  SystemUserDetailResponse,
  SystemUserPageRequest,
  SystemUserPageResponse,
  SystemUserProfileResponse,
  SystemUserUnlockRequest,
  SystemUserUnlockResponse,
} from '../../types/system-user/systemUser.d';

import { requestClient } from '#/api/request';

/**
 * 用户注册
 */
export async function systemUserCreateApi(
  params: SystemUserCreateRequest,
): Promise<SystemUserCreateResponse> {
  return requestClient.post<SystemUserCreateResponse>(
    '/api/admin/system-user/create',
    params,
  );
}

/**
 * 获取当前用户信息
 */
export async function systemUserProfileApi(
  params: SystemUserProfileRequest,
): Promise<SystemUserProfileResponse> {
  return requestClient.get<SystemUserProfileResponse>(
    '/api/admin/system-user/profile',
    { params },
  );
}

/**
 * 根据ID获取用户信息
 */
export async function systemUserDetailApi(
  params: SystemUserDetailRequest,
): Promise<SystemUserDetailResponse> {
  return requestClient.get<SystemUserDetailResponse>(
    '/api/admin/system-user/detail',
    { params },
  );
}

/**
 * 获取管理端用户分页列表
 */
export async function systemUserPageApi(
  params?: SystemUserPageRequest,
): Promise<SystemUserPageResponse> {
  return requestClient.get<SystemUserPageResponse>(
    '/api/admin/system-user/page',
    { params },
  );
}

/**
 * 解锁指定用户的锁定状态
 */
export async function systemUserUnlockApi(
  params: SystemUserUnlockRequest,
): Promise<SystemUserUnlockResponse> {
  return requestClient.post<SystemUserUnlockResponse>(
    '/api/admin/system-user/unlock',
    params,
  );
}
