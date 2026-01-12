import type {
  SectionGroupsCreateRequest,
  SectionGroupsCreateResponse,
  SectionGroupsDeleteRequest,
  SectionGroupsDeleteResponse,
  SectionGroupsDetailRequest,
  SectionGroupsDetailResponse,
  SectionGroupsPageRequest,
  SectionGroupsPageResponse,
  SectionGroupsSwapSortOrderRequest,
  SectionGroupsSwapSortOrderResponse,
  SectionGroupsUpdateEnabledRequest,
  SectionGroupsUpdateEnabledResponse,
  SectionGroupsUpdateRequest,
  SectionGroupsUpdateResponse,
} from '../types/forum/sectionGroups.d';

import { requestClient } from '#/utils/request';

/**
 * 查看板块组列表
 */
export async function sectionGroupsPageApi(
  params?: SectionGroupsPageRequest,
): Promise<SectionGroupsPageResponse> {
  return requestClient.get<SectionGroupsPageResponse>(
    '/api/admin/forum/section-groups/page',
    { params },
  );
}

/**
 * 查看板块组详情
 */
export async function sectionGroupsDetailApi(
  params: SectionGroupsDetailRequest,
): Promise<SectionGroupsDetailResponse> {
  return requestClient.get<SectionGroupsDetailResponse>(
    '/api/admin/forum/section-groups/detail',
    { params },
  );
}

/**
 * 添加板块组
 */
export async function sectionGroupsCreateApi(
  params: SectionGroupsCreateRequest,
): Promise<SectionGroupsCreateResponse> {
  return requestClient.post<SectionGroupsCreateResponse>(
    '/api/admin/forum/section-groups/create',
    params,
  );
}

/**
 * 更新板块组
 */
export async function sectionGroupsUpdateApi(
  params: SectionGroupsUpdateRequest,
): Promise<SectionGroupsUpdateResponse> {
  return requestClient.post<SectionGroupsUpdateResponse>(
    '/api/admin/forum/section-groups/update',
    params,
  );
}

/**
 * 删除板块组
 */
export async function sectionGroupsDeleteApi(
  params: SectionGroupsDeleteRequest,
): Promise<SectionGroupsDeleteResponse> {
  return requestClient.post<SectionGroupsDeleteResponse>(
    '/api/admin/forum/section-groups/delete',
    params,
  );
}

/**
 * 更新板块组启用状态
 */
export async function sectionGroupsUpdateEnabledApi(
  params: SectionGroupsUpdateEnabledRequest,
): Promise<SectionGroupsUpdateEnabledResponse> {
  return requestClient.post<SectionGroupsUpdateEnabledResponse>(
    '/api/admin/forum/section-groups/update-enabled',
    params,
  );
}

/**
 * 交换板块组排序顺序
 */
export async function sectionGroupsSwapSortOrderApi(
  params: SectionGroupsSwapSortOrderRequest,
): Promise<SectionGroupsSwapSortOrderResponse> {
  return requestClient.post<SectionGroupsSwapSortOrderResponse>(
    '/api/admin/forum/section-groups/swap-sort-order',
    params,
  );
}
