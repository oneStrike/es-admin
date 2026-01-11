import type {
  SectionsAddRequest,
  SectionsAddResponse,
  SectionsDetailRequest,
  SectionsDetailResponse,
  SectionsListRequest,
  SectionsListResponse,
  SectionsRemoveRequest,
  SectionsRemoveResponse,
  SectionsTreeResponse,
  SectionsUpdateEnabledResponse,
  SectionsUpdateRequest,
  SectionsUpdateResponse,
} from '../types/forum/sections.d';

import { requestClient } from '#/utils/request';

/**
 * 查看板块列表
 */
export async function sectionsListApi(
  params?: SectionsListRequest,
): Promise<SectionsListResponse> {
  return requestClient.get<SectionsListResponse>(
    '/api/admin/forum/sections/list',
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
 * 添加板块
 */
export async function sectionsAddApi(
  params: SectionsAddRequest,
): Promise<SectionsAddResponse> {
  return requestClient.post<SectionsAddResponse>(
    '/api/admin/forum/sections/add',
    params,
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
 * 删除板块
 */
export async function sectionsRemoveApi(
  params: SectionsRemoveRequest,
): Promise<SectionsRemoveResponse> {
  return requestClient.post<SectionsRemoveResponse>(
    '/api/admin/forum/sections/remove',
    params,
  );
}

/**
 * 更新板块启用状态
 */
export async function sectionsUpdateEnabledApi(): Promise<SectionsUpdateEnabledResponse> {
  return requestClient.post<SectionsUpdateEnabledResponse>(
    '/api/admin/forum/sections/update-enabled',
  );
}
