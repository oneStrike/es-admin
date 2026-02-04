import type {
  AppPageBatchDeleteRequest,
  AppPageBatchDeleteResponse,
  AppPageCreateRequest,
  AppPageCreateResponse,
  AppPageDetailByCodeRequest,
  AppPageDetailByCodeResponse,
  AppPageDetailByIdRequest,
  AppPageDetailByIdResponse,
  AppPagePageRequest,
  AppPagePageResponse,
  AppPageUpdateRequest,
  AppPageUpdateResponse,
} from '../../types/app-page/appPage.d';

import { requestClient } from '#/api/request';

/**
 * 创建页面配置
 */
export async function appPageCreateApi(
  params: AppPageCreateRequest,
): Promise<AppPageCreateResponse> {
  return requestClient.post<AppPageCreateResponse>(
    '/api/admin/app-page/create',
    params,
  );
}

/**
 * 分页查询页面配置列表
 */
export async function appPagePageApi(
  params?: AppPagePageRequest,
): Promise<AppPagePageResponse> {
  return requestClient.get<AppPagePageResponse>('/api/admin/app-page/page', {
    params,
  });
}

/**
 * 根据ID查询页面配置详情
 */
export async function appPageDetailByIdApi(
  params: AppPageDetailByIdRequest,
): Promise<AppPageDetailByIdResponse> {
  return requestClient.get<AppPageDetailByIdResponse>(
    '/api/admin/app-page/detail-by-id',
    { params },
  );
}

/**
 * 根据页面编码查询页面配置详情
 */
export async function appPageDetailByCodeApi(
  params: AppPageDetailByCodeRequest,
): Promise<AppPageDetailByCodeResponse> {
  return requestClient.get<AppPageDetailByCodeResponse>(
    '/api/admin/app-page/detail-by-code',
    { params },
  );
}

/**
 * 更新页面配置
 */
export async function appPageUpdateApi(
  params: AppPageUpdateRequest,
): Promise<AppPageUpdateResponse> {
  return requestClient.post<AppPageUpdateResponse>(
    '/api/admin/app-page/update',
    params,
  );
}

/**
 * 批量删除页面配置
 */
export async function appPageBatchDeleteApi(
  params: AppPageBatchDeleteRequest,
): Promise<AppPageBatchDeleteResponse> {
  return requestClient.post<AppPageBatchDeleteResponse>(
    '/api/admin/app-page/batch-delete',
    params,
  );
}
