import type {
  SectionsCreateRequest,
  SectionsCreateResponse,
  SectionsDeleteRequest,
  SectionsDeleteResponse,
  SectionsDetailRequest,
  SectionsDetailResponse,
  SectionsPageRequest,
  SectionsPageResponse,
  SectionsSwapSortOrderRequest,
  SectionsSwapSortOrderResponse,
  SectionsTreeResponse,
  SectionsUpdateEnabledRequest,
  SectionsUpdateEnabledResponse,
  SectionsUpdateRequest,
  SectionsUpdateResponse,
} from '../types/forum/sections.d';

import { requestClient } from '#/utils/request';

/**
 * 查看板块列表
 */
export async function sectionsPageApi(
  params?: SectionsPageRequest,
): Promise<SectionsPageResponse> {
  return requestClient.get<SectionsPageResponse>(
    '/api/admin/forum/sections/page',
    { params },
  );
}

/**
 * 查看板块详情
 */
export async function sectionsDetailApi(
  params: SectionsDetailRequest,
): Promise<SectionsDetailResponse> {
  return requestClient.get<SectionsDetailResponse>(
    '/api/admin/forum/sections/detail',
    { params },
  );
}

/**
 * 查看板块树
 */
export async function sectionsTreeApi(): Promise<SectionsTreeResponse> {
  return requestClient.get<SectionsTreeResponse>(
    '/api/admin/forum/sections/tree',
  );
}

/**
 * 更新板块
 */
export async function sectionsUpdateApi(
  params: SectionsUpdateRequest,
): Promise<SectionsUpdateResponse> {
  return requestClient.post<SectionsUpdateResponse>(
    '/api/admin/forum/sections/update',
    params,
  );
}

/**
 * 更新板块启用状态
 */
export async function sectionsUpdateEnabledApi(
  params: SectionsUpdateEnabledRequest,
): Promise<SectionsUpdateEnabledResponse> {
  return requestClient.post<SectionsUpdateEnabledResponse>(
    '/api/admin/forum/sections/update-enabled',
    params,
  );
}

/**
 * 添加板块
 */
export async function sectionsCreateApi(
  params: SectionsCreateRequest,
): Promise<SectionsCreateResponse> {
  return requestClient.post<SectionsCreateResponse>(
    '/api/admin/forum/sections/create',
    params,
  );
}

/**
 * 删除板块
 */
export async function sectionsDeleteApi(
  params: SectionsDeleteRequest,
): Promise<SectionsDeleteResponse> {
  return requestClient.post<SectionsDeleteResponse>(
    '/api/admin/forum/sections/delete',
    params,
  );
}

/**
 * 交换板块排序顺序
 */
export async function sectionsSwapSortOrderApi(
  params: SectionsSwapSortOrderRequest,
): Promise<SectionsSwapSortOrderResponse> {
  return requestClient.post<SectionsSwapSortOrderResponse>(
    '/api/admin/forum/sections/swap-sort-order',
    params,
  );
}
