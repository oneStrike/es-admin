import type {
  ModeratorAddRequest,
  ModeratorAddResponse,
  ModeratorListRequest,
  ModeratorListResponse,
  ModeratorRemoveRequest,
  ModeratorRemoveResponse,
  ModeratorUpdateRequest,
  ModeratorUpdateResponse,
} from '../types/moderator/moderator.d';

import { requestClient } from '#/utils/request';

/**
 * 添加版主
 */
export async function moderatorAddApi(
  params: ModeratorAddRequest,
): Promise<ModeratorAddResponse> {
  return requestClient.post<ModeratorAddResponse>(
    '/api/forum/moderator/add',
    params,
  );
}

/**
 * 移除版主
 */
export async function moderatorRemoveApi(
  params: ModeratorRemoveRequest,
): Promise<ModeratorRemoveResponse> {
  return requestClient.post<ModeratorRemoveResponse>(
    '/api/forum/moderator/remove',
    params,
  );
}

/**
 * 查看版主列表
 */
export async function moderatorListApi(
  params?: ModeratorListRequest,
): Promise<ModeratorListResponse> {
  return requestClient.get<ModeratorListResponse>('/api/forum/moderator/list', {
    params,
  });
}

/**
 * 更新版主信息
 */
export async function moderatorUpdateApi(
  params: ModeratorUpdateRequest,
): Promise<ModeratorUpdateResponse> {
  return requestClient.post<ModeratorUpdateResponse>(
    '/api/forum/moderator/update',
    params,
  );
}
