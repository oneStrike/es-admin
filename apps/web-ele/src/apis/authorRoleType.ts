import type {
  AuthorRoleTypeChangeStatusRequest,
  AuthorRoleTypeChangeStatusResponse,
  AuthorRoleTypeCreateRequest,
  AuthorRoleTypeCreateResponse,
  AuthorRoleTypeDeleteRequest,
  AuthorRoleTypeDeleteResponse,
  AuthorRoleTypeListRequest,
  AuthorRoleTypeListResponse,
  AuthorRoleTypeUpdateRequest,
  AuthorRoleTypeUpdateResponse,
} from './types/authorRoleType.d';

import { requestClient } from '#/utils/request';

/**
 * 获取角色类型列表
 */
export async function authorRoleTypeListApi(
  params?: AuthorRoleTypeListRequest,
): Promise<AuthorRoleTypeListResponse> {
  return requestClient.get<AuthorRoleTypeListResponse>(
    '/api/admin/work/author-role-type/list',
    { params },
  );
}

/**
 * 创建角色类型
 */
export async function authorRoleTypeCreateApi(
  params: AuthorRoleTypeCreateRequest,
): Promise<AuthorRoleTypeCreateResponse> {
  return requestClient.post<AuthorRoleTypeCreateResponse>(
    '/api/admin/work/author-role-type/create',
    params,
  );
}

/**
 * 删除角色类型
 */
export async function authorRoleTypeDeleteApi(
  params: AuthorRoleTypeDeleteRequest,
): Promise<AuthorRoleTypeDeleteResponse> {
  return requestClient.post<AuthorRoleTypeDeleteResponse>(
    '/api/admin/work/author-role-type/delete',
    params,
  );
}

/**
 * 更新角色类型
 */
export async function authorRoleTypeUpdateApi(
  params: AuthorRoleTypeUpdateRequest,
): Promise<AuthorRoleTypeUpdateResponse> {
  return requestClient.post<AuthorRoleTypeUpdateResponse>(
    '/api/admin/work/author-role-type/update',
    params,
  );
}

/**
 * 调整角色类型状态
 */
export async function authorRoleTypeChangeStatusApi(
  params: AuthorRoleTypeChangeStatusRequest,
): Promise<AuthorRoleTypeChangeStatusResponse> {
  return requestClient.post<AuthorRoleTypeChangeStatusResponse>(
    '/api/admin/work/author-role-type/change-status',
    params,
  );
}
