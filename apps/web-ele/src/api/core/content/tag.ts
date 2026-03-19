import type {
  TagCreateRequest,
  TagCreateResponse,
  TagDeleteRequest,
  TagDeleteResponse,
  TagDetailRequest,
  TagDetailResponse,
  TagPageRequest,
  TagPageResponse,
  TagSwapSortOrderRequest,
  TagSwapSortOrderResponse,
  TagUpdateRequest,
  TagUpdateResponse,
  TagUpdateStatusRequest,
  TagUpdateStatusResponse,
} from '../../types/content/tag.d';

import { requestClient } from '#/api/request';

/**
 * 创建标签
 */
export async function tagCreateApi(
  params: TagCreateRequest,
): Promise<TagCreateResponse> {
  return requestClient.post<TagCreateResponse>(
    '/api/admin/content/tag/create',
    params,
  );
}

/**
 * 分页查询标签列表
 */
export async function tagPageApi(
  params?: TagPageRequest,
): Promise<TagPageResponse> {
  return requestClient.get<TagPageResponse>('/api/admin/content/tag/page', {
    params,
  });
}

/**
 * 获取标签详情
 */
export async function tagDetailApi(
  params: TagDetailRequest,
): Promise<TagDetailResponse> {
  return requestClient.get<TagDetailResponse>('/api/admin/content/tag/detail', {
    params,
  });
}

/**
 * 更新标签信息
 */
export async function tagUpdateApi(
  params: TagUpdateRequest,
): Promise<TagUpdateResponse> {
  return requestClient.post<TagUpdateResponse>(
    '/api/admin/content/tag/update',
    params,
  );
}

/**
 * 更新标签状态
 */
export async function tagUpdateStatusApi(
  params: TagUpdateStatusRequest,
): Promise<TagUpdateStatusResponse> {
  return requestClient.post<TagUpdateStatusResponse>(
    '/api/admin/content/tag/update-status',
    params,
  );
}

/**
 * 删除标签
 */
export async function tagDeleteApi(
  params: TagDeleteRequest,
): Promise<TagDeleteResponse> {
  return requestClient.post<TagDeleteResponse>(
    '/api/admin/content/tag/delete',
    params,
  );
}

/**
 * 标签交换排序
 */
export async function tagSwapSortOrderApi(
  params: TagSwapSortOrderRequest,
): Promise<TagSwapSortOrderResponse> {
  return requestClient.post<TagSwapSortOrderResponse>(
    '/api/admin/content/tag/swap-sort-order',
    params,
  );
}
