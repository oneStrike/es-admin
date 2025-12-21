import type {
  CategoryCreateRequest,
  CategoryCreateResponse,
  CategoryDeleteRequest,
  CategoryDeleteResponse,
  CategoryDetailRequest,
  CategoryDetailResponse,
  CategoryOrderRequest,
  CategoryOrderResponse,
  CategoryPageRequest,
  CategoryPageResponse,
  CategoryUpdateRequest,
  CategoryUpdateResponse,
  CategoryUpdateStatusRequest,
  CategoryUpdateStatusResponse,
} from './types/category.d';

import { requestClient } from '#/utils/request';

/**
 * 创建分类
 */
export async function categoryCreateApi(
  params: CategoryCreateRequest,
): Promise<CategoryCreateResponse> {
  return requestClient.post<CategoryCreateResponse>(
    '/api/admin/work/category/create',
    params,
  );
}

/**
 * 分页查询分类列表
 */
export async function categoryPageApi(
  params?: CategoryPageRequest,
): Promise<CategoryPageResponse> {
  return requestClient.get<CategoryPageResponse>(
    '/api/admin/work/category/page',
    { params },
  );
}

/**
 * 获取分类详情
 */
export async function categoryDetailApi(
  params: CategoryDetailRequest,
): Promise<CategoryDetailResponse> {
  return requestClient.get<CategoryDetailResponse>(
    '/api/admin/work/category/detail',
    { params },
  );
}

/**
 * 更新分类信息
 */
export async function categoryUpdateApi(
  params: CategoryUpdateRequest,
): Promise<CategoryUpdateResponse> {
  return requestClient.post<CategoryUpdateResponse>(
    '/api/admin/work/category/update',
    params,
  );
}

/**
 * 更新分类状态
 */
export async function categoryUpdateStatusApi(
  params: CategoryUpdateStatusRequest,
): Promise<CategoryUpdateStatusResponse> {
  return requestClient.post<CategoryUpdateStatusResponse>(
    '/api/admin/work/category/update-status',
    params,
  );
}

/**
 * 删除分类
 */
export async function categoryDeleteApi(
  params: CategoryDeleteRequest,
): Promise<CategoryDeleteResponse> {
  return requestClient.post<CategoryDeleteResponse>(
    '/api/admin/work/category/delete',
    params,
  );
}

/**
 * 分类拖拽排序
 */
export async function categoryOrderApi(
  params: CategoryOrderRequest,
): Promise<CategoryOrderResponse> {
  return requestClient.post<CategoryOrderResponse>(
    '/api/admin/work/category/order',
    params,
  );
}
