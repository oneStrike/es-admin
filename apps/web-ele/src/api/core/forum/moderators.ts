import type {
  ModeratorsAddRequest,
  ModeratorsAddResponse,
  ModeratorsListRequest,
  ModeratorsListResponse,
  ModeratorsRemoveRequest,
  ModeratorsRemoveResponse,
  ModeratorsSectionAssignRequest,
  ModeratorsSectionAssignResponse,
  ModeratorsUpdateRequest,
  ModeratorsUpdateResponse,
} from '../../types/forum/moderators.d';

import { requestClient } from '#/api/request';

/**
 * 查看版主列表
 */
export async function moderatorsListApi(
  params?: ModeratorsListRequest,
): Promise<ModeratorsListResponse> {
  return requestClient.get<ModeratorsListResponse>(
    '/api/admin/forum/moderators/list',
    { params },
  );
}

/**
 * 添加版主
 */
export async function moderatorsAddApi(
  params: ModeratorsAddRequest,
): Promise<ModeratorsAddResponse> {
  return requestClient.post<ModeratorsAddResponse>(
    '/api/admin/forum/moderators/add',
    params,
  );
}

/**
 * 更新版主信息
 */
export async function moderatorsUpdateApi(
  params: ModeratorsUpdateRequest,
): Promise<ModeratorsUpdateResponse> {
  return requestClient.post<ModeratorsUpdateResponse>(
    '/api/admin/forum/moderators/update',
    params,
  );
}

/**
 * 移除版主
 */
export async function moderatorsRemoveApi(
  params: ModeratorsRemoveRequest,
): Promise<ModeratorsRemoveResponse> {
  return requestClient.post<ModeratorsRemoveResponse>(
    '/api/admin/forum/moderators/remove',
    params,
  );
}

/**
 * 分配版主管理的板块
 */
export async function moderatorsSectionAssignApi(
  params: ModeratorsSectionAssignRequest,
): Promise<ModeratorsSectionAssignResponse> {
  return requestClient.post<ModeratorsSectionAssignResponse>(
    '/api/admin/forum/moderators/section-assign',
    params,
  );
}
