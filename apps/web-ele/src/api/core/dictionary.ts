import type {
  DictionaryCreateRequest,
  DictionaryCreateResponse,
  DictionaryDeleteRequest,
  DictionaryDeleteResponse,
  DictionaryDetailRequest,
  DictionaryDetailResponse,
  DictionaryItemCreateRequest,
  DictionaryItemCreateResponse,
  DictionaryItemDeleteRequest,
  DictionaryItemDeleteResponse,
  DictionaryItemListRequest,
  DictionaryItemListResponse,
  DictionaryItemPageRequest,
  DictionaryItemPageResponse,
  DictionaryItemSwapSortOrderRequest,
  DictionaryItemSwapSortOrderResponse,
  DictionaryItemUpdateRequest,
  DictionaryItemUpdateResponse,
  DictionaryItemUpdateStatusRequest,
  DictionaryItemUpdateStatusResponse,
  DictionaryPageRequest,
  DictionaryPageResponse,
  DictionaryUpdateRequest,
  DictionaryUpdateResponse,
  DictionaryUpdateStatusRequest,
  DictionaryUpdateStatusResponse,
} from '../types/dictionary.d';

import { requestClient } from '#/api/request';

/**
 * 分页查询字典
 */
export async function dictionaryPageApi(
  params?: DictionaryPageRequest,
): Promise<DictionaryPageResponse> {
  return requestClient.get<DictionaryPageResponse>(
    '/api/admin/dictionary/page',
    { params },
  );
}

/**
 * 获取字典详情
 */
export async function dictionaryDetailApi(
  params: DictionaryDetailRequest,
): Promise<DictionaryDetailResponse> {
  return requestClient.get<DictionaryDetailResponse>(
    '/api/admin/dictionary/detail',
    { params },
  );
}

/**
 * 创建字典
 */
export async function dictionaryCreateApi(
  params: DictionaryCreateRequest,
): Promise<DictionaryCreateResponse> {
  return requestClient.post<DictionaryCreateResponse>(
    '/api/admin/dictionary/create',
    params,
  );
}

/**
 * 更新字典
 */
export async function dictionaryUpdateApi(
  params: DictionaryUpdateRequest,
): Promise<DictionaryUpdateResponse> {
  return requestClient.post<DictionaryUpdateResponse>(
    '/api/admin/dictionary/update',
    params,
  );
}

/**
 * 删除字典
 */
export async function dictionaryDeleteApi(
  params: DictionaryDeleteRequest,
): Promise<DictionaryDeleteResponse> {
  return requestClient.post<DictionaryDeleteResponse>(
    '/api/admin/dictionary/delete',
    params,
  );
}

/**
 * 更新字典状态
 */
export async function dictionaryUpdateStatusApi(
  params: DictionaryUpdateStatusRequest,
): Promise<DictionaryUpdateStatusResponse> {
  return requestClient.post<DictionaryUpdateStatusResponse>(
    '/api/admin/dictionary/update-status',
    params,
  );
}

/**
 * 分页获取字典项
 */
export async function dictionaryItemPageApi(
  params: DictionaryItemPageRequest,
): Promise<DictionaryItemPageResponse> {
  return requestClient.get<DictionaryItemPageResponse>(
    '/api/admin/dictionary/item/page',
    { params },
  );
}

/**
 * 获取所有字典项
 */
export async function dictionaryItemListApi(
  params: DictionaryItemListRequest,
): Promise<DictionaryItemListResponse> {
  return requestClient.get<DictionaryItemListResponse>(
    '/api/admin/dictionary/item/list',
    { params },
  );
}

/**
 * 创建字典项
 */
export async function dictionaryItemCreateApi(
  params: DictionaryItemCreateRequest,
): Promise<DictionaryItemCreateResponse> {
  return requestClient.post<DictionaryItemCreateResponse>(
    '/api/admin/dictionary/item/create',
    params,
  );
}

/**
 * 更新字典项
 */
export async function dictionaryItemUpdateApi(
  params: DictionaryItemUpdateRequest,
): Promise<DictionaryItemUpdateResponse> {
  return requestClient.post<DictionaryItemUpdateResponse>(
    '/api/admin/dictionary/item/update',
    params,
  );
}

/**
 * 启用禁用字典项
 */
export async function dictionaryItemUpdateStatusApi(
  params: DictionaryItemUpdateStatusRequest,
): Promise<DictionaryItemUpdateStatusResponse> {
  return requestClient.post<DictionaryItemUpdateStatusResponse>(
    '/api/admin/dictionary/item/update-status',
    params,
  );
}

/**
 * 删除字典项
 */
export async function dictionaryItemDeleteApi(
  params: DictionaryItemDeleteRequest,
): Promise<DictionaryItemDeleteResponse> {
  return requestClient.post<DictionaryItemDeleteResponse>(
    '/api/admin/dictionary/item/delete',
    params,
  );
}

/**
 * 字典项交换排序
 */
export async function dictionaryItemSwapSortOrderApi(
  params: DictionaryItemSwapSortOrderRequest,
): Promise<DictionaryItemSwapSortOrderResponse> {
  return requestClient.post<DictionaryItemSwapSortOrderResponse>(
    '/api/admin/dictionary/item/swap-sort-order',
    params,
  );
}
