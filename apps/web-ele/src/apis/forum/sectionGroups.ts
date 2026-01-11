import type {
  SectionGroupsAddRequest,
  SectionGroupsAddResponse,
  SectionGroupsAllEnabledResponse,
  SectionGroupsDetailRequest,
  SectionGroupsDetailResponse,
  SectionGroupsListRequest,
  SectionGroupsListResponse,
  SectionGroupsRemoveRequest,
  SectionGroupsRemoveResponse,
  SectionGroupsUpdateEnabledResponse,
  SectionGroupsUpdateRequest,
  SectionGroupsUpdateResponse,
} from '../types/forum/sectionGroups.d';

import { requestClient } from '#/utils/request';

/**
 * 查看板块组列表
 */
export async function sectionGroupsListApi(
  params?: SectionGroupsListRequest,
): Promise<SectionGroupsListResponse> {
  return requestClient.get<SectionGroupsListResponse>(
    '/api/admin/forum/section-groups/list',
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
 * 获取所有启用的板块组
 */
export async function sectionGroupsAllEnabledApi(): Promise<SectionGroupsAllEnabledResponse> {
  return requestClient.get<SectionGroupsAllEnabledResponse>(
    '/api/admin/forum/section-groups/all-enabled',
  );
}

/**
 * 添加板块组
 */
export async function sectionGroupsAddApi(
  params: SectionGroupsAddRequest,
): Promise<SectionGroupsAddResponse> {
  return requestClient.post<SectionGroupsAddResponse>(
    '/api/admin/forum/section-groups/add',
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
export async function sectionGroupsRemoveApi(
  params: SectionGroupsRemoveRequest,
): Promise<SectionGroupsRemoveResponse> {
  return requestClient.post<SectionGroupsRemoveResponse>(
    '/api/admin/forum/section-groups/remove',
    params,
  );
}

/**
 * 更新板块组启用状态
 */
export async function sectionGroupsUpdateEnabledApi(): Promise<SectionGroupsUpdateEnabledResponse> {
  return requestClient.post<SectionGroupsUpdateEnabledResponse>(
    '/api/admin/forum/section-groups/update-enabled',
  );
}
