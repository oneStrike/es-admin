import type {
  MemberLevelChangeStatusRequest,
  MemberLevelChangeStatusResponse,
  MemberLevelCreateRequest,
  MemberLevelCreateResponse,
  MemberLevelDeleteRequest,
  MemberLevelDeleteResponse,
  MemberLevelDetailRequest,
  MemberLevelDetailResponse,
  MemberLevelListResponse,
  MemberLevelUpdateRequest,
  MemberLevelUpdateResponse,
} from './types/memberLevel.d';

import { requestClient } from '#/utils/request';

/**
 * 获取会员等级列表
 */
export async function memberLevelListApi(): Promise<MemberLevelListResponse> {
  return requestClient.get<MemberLevelListResponse>(
    '/api/admin/member-level/list',
  );
}

/**
 * 获取会员等级详情
 */
export async function memberLevelDetailApi(
  params: MemberLevelDetailRequest,
): Promise<MemberLevelDetailResponse> {
  return requestClient.get<MemberLevelDetailResponse>(
    '/api/admin/member-level/detail',
    { params },
  );
}

/**
 * 创建会员等级
 */
export async function memberLevelCreateApi(
  params: MemberLevelCreateRequest,
): Promise<MemberLevelCreateResponse> {
  return requestClient.post<MemberLevelCreateResponse>(
    '/api/admin/member-level/create',
    params,
  );
}

/**
 * 更新会员等级
 */
export async function memberLevelUpdateApi(
  params: MemberLevelUpdateRequest,
): Promise<MemberLevelUpdateResponse> {
  return requestClient.post<MemberLevelUpdateResponse>(
    '/api/admin/member-level/update',
    params,
  );
}

/**
 * 删除会员等级
 */
export async function memberLevelDeleteApi(
  params: MemberLevelDeleteRequest,
): Promise<MemberLevelDeleteResponse> {
  return requestClient.post<MemberLevelDeleteResponse>(
    '/api/admin/member-level/delete',
    params,
  );
}

/**
 * 更新会员等级状态
 */
export async function memberLevelChangeStatusApi(
  params: MemberLevelChangeStatusRequest,
): Promise<MemberLevelChangeStatusResponse> {
  return requestClient.post<MemberLevelChangeStatusResponse>(
    '/api/admin/member-level/change-status',
    params,
  );
}
