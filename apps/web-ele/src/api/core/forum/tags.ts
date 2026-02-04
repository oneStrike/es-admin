import type {
  TagsAddRequest,
  TagsAddResponse,
  TagsAssignRequest,
  TagsAssignResponse,
  TagsDetailRequest,
  TagsDetailResponse,
  TagsListRequest,
  TagsListResponse,
  TagsPopularRequest,
  TagsPopularResponse,
  TagsRemoveRequest,
  TagsRemoveResponse,
  TagsRemoveTagRequest,
  TagsRemoveTagResponse,
  TagsSystemResponse,
  TagsTopicTagsRequest,
  TagsTopicTagsResponse,
  TagsUpdateRequest,
  TagsUpdateResponse,
  TagsUserResponse,
} from '../../types/forum/tags.d';

import { requestClient } from '#/api/request';

/**
 * 查看标签列表
 */
export async function tagsListApi(
  params?: TagsListRequest,
): Promise<TagsListResponse> {
  return requestClient.get<TagsListResponse>('/api/admin/forum/tags/list', {
    params,
  });
}

/**
 * 查看标签详情
 */
export async function tagsDetailApi(
  params: TagsDetailRequest,
): Promise<TagsDetailResponse> {
  return requestClient.get<TagsDetailResponse>('/api/admin/forum/tags/detail', {
    params,
  });
}

/**
 * 获取热门标签
 */
export async function tagsPopularApi(
  params: TagsPopularRequest,
): Promise<TagsPopularResponse> {
  return requestClient.get<TagsPopularResponse>(
    '/api/admin/forum/tags/popular',
    { params },
  );
}

/**
 * 获取系统标签
 */
export async function tagsSystemApi(): Promise<TagsSystemResponse> {
  return requestClient.get<TagsSystemResponse>('/api/admin/forum/tags/system');
}

/**
 * 获取用户标签
 */
export async function tagsUserApi(): Promise<TagsUserResponse> {
  return requestClient.get<TagsUserResponse>('/api/admin/forum/tags/user');
}

/**
 * 获取主题的所有标签
 */
export async function tagsTopicTagsApi(
  params: TagsTopicTagsRequest,
): Promise<TagsTopicTagsResponse> {
  return requestClient.get<TagsTopicTagsResponse>(
    '/api/admin/forum/tags/topic-tags',
    { params },
  );
}

/**
 * 添加标签
 */
export async function tagsAddApi(
  params: TagsAddRequest,
): Promise<TagsAddResponse> {
  return requestClient.post<TagsAddResponse>(
    '/api/admin/forum/tags/add',
    params,
  );
}

/**
 * 更新标签
 */
export async function tagsUpdateApi(
  params: TagsUpdateRequest,
): Promise<TagsUpdateResponse> {
  return requestClient.post<TagsUpdateResponse>(
    '/api/admin/forum/tags/update',
    params,
  );
}

/**
 * 删除标签
 */
export async function tagsRemoveApi(
  params: TagsRemoveRequest,
): Promise<TagsRemoveResponse> {
  return requestClient.post<TagsRemoveResponse>(
    '/api/admin/forum/tags/remove',
    params,
  );
}

/**
 * 为主题分配标签
 */
export async function tagsAssignApi(
  params: TagsAssignRequest,
): Promise<TagsAssignResponse> {
  return requestClient.post<TagsAssignResponse>(
    '/api/admin/forum/tags/assign',
    params,
  );
}

/**
 * 从主题移除标签
 */
export async function tagsRemoveTagApi(
  params: TagsRemoveTagRequest,
): Promise<TagsRemoveTagResponse> {
  return requestClient.post<TagsRemoveTagResponse>(
    '/api/admin/forum/tags/remove-tag',
    params,
  );
}
