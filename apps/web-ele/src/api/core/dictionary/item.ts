import type {
  ItemCreateRequest,
  ItemCreateResponse,
  ItemDeleteRequest,
  ItemDeleteResponse,
  ItemListRequest,
  ItemListResponse,
  ItemPageRequest,
  ItemPageResponse,
  ItemSwapSortOrderRequest,
  ItemSwapSortOrderResponse,
  ItemUpdateRequest,
  ItemUpdateResponse,
  ItemUpdateStatusRequest,
  ItemUpdateStatusResponse,
} from '../../types/dictionary/item.d';

import { requestClient } from '#/api/request';

/**
 * 分页获取字典项
 */
export async function itemPageApi(
  params: ItemPageRequest,
): Promise<ItemPageResponse> {
  return requestClient.get<ItemPageResponse>(
    '/api/admin/dictionary/item/page',
    { params },
  );
}

/**
 * 获取所有字典项
 */
export async function itemListApi(
  params: ItemListRequest,
): Promise<ItemListResponse> {
  return requestClient.get<ItemListResponse>(
    '/api/admin/dictionary/item/list',
    { params },
  );
}

/**
 * 创建字典项
 */
export async function itemCreateApi(
  params: ItemCreateRequest,
): Promise<ItemCreateResponse> {
  return requestClient.post<ItemCreateResponse>(
    '/api/admin/dictionary/item/create',
    params,
  );
}

/**
 * 更新字典项
 */
export async function itemUpdateApi(
  params: ItemUpdateRequest,
): Promise<ItemUpdateResponse> {
  return requestClient.post<ItemUpdateResponse>(
    '/api/admin/dictionary/item/update',
    params,
  );
}

/**
 * 启用禁用字典项
 */
export async function itemUpdateStatusApi(
  params: ItemUpdateStatusRequest,
): Promise<ItemUpdateStatusResponse> {
  return requestClient.post<ItemUpdateStatusResponse>(
    '/api/admin/dictionary/item/update-status',
    params,
  );
}

/**
 * 删除字典项
 */
export async function itemDeleteApi(
  params: ItemDeleteRequest,
): Promise<ItemDeleteResponse> {
  return requestClient.post<ItemDeleteResponse>(
    '/api/admin/dictionary/item/delete',
    params,
  );
}

/**
 * 字典项交换排序
 */
export async function itemSwapSortOrderApi(
  params: ItemSwapSortOrderRequest,
): Promise<ItemSwapSortOrderResponse> {
  return requestClient.post<ItemSwapSortOrderResponse>(
    '/api/admin/dictionary/item/swap-sort-order',
    params,
  );
}
