import type {
  TagsAssignTopicRequest,
  TagsAssignTopicResponse,
  TagsCreateRequest,
  TagsCreateResponse,
  TagsDeleteRequest,
  TagsDeleteResponse,
  TagsDetailRequest,
  TagsDetailResponse,
  TagsEnabledResponse,
  TagsPageRequest,
  TagsPageResponse,
  TagsPopularRequest,
  TagsPopularResponse,
  TagsTopicTagsRequest,
  TagsTopicTagsResponse,
  TagsUnassignTopicRequest,
  TagsUnassignTopicResponse,
  TagsUpdateRequest,
  TagsUpdateResponse
} from '../../types/forum/tags.d'

import { requestClient } from '#/api/request'


  /**
   * 查看标签列表
   */
  export async function tagsPageApi(params?: TagsPageRequest): Promise<TagsPageResponse> {
    return requestClient.get<TagsPageResponse>('/api/admin/forum/tags/page', { params });
  }


  /**
   * 查看标签详情
   */
  export async function tagsDetailApi(params: TagsDetailRequest): Promise<TagsDetailResponse> {
    return requestClient.get<TagsDetailResponse>('/api/admin/forum/tags/detail', { params });
  }


  /**
   * 获取热门标签
   */
  export async function tagsPopularApi(params: TagsPopularRequest): Promise<TagsPopularResponse> {
    return requestClient.get<TagsPopularResponse>('/api/admin/forum/tags/popular', { params });
  }


  /**
   * 获取启用标签
   */
  export async function tagsEnabledApi(): Promise<TagsEnabledResponse> {
    return requestClient.get<TagsEnabledResponse>('/api/admin/forum/tags/enabled');
  }


  /**
   * 获取主题的所有标签
   */
  export async function tagsTopicTagsApi(params: TagsTopicTagsRequest): Promise<TagsTopicTagsResponse> {
    return requestClient.get<TagsTopicTagsResponse>('/api/admin/forum/tags/topic-tags', { params });
  }


  /**
   * 添加标签
   */
  export async function tagsCreateApi(params: TagsCreateRequest): Promise<TagsCreateResponse> {
    return requestClient.post<TagsCreateResponse>('/api/admin/forum/tags/create', params);
  }


  /**
   * 更新标签
   */
  export async function tagsUpdateApi(params: TagsUpdateRequest): Promise<TagsUpdateResponse> {
    return requestClient.post<TagsUpdateResponse>('/api/admin/forum/tags/update', params);
  }


  /**
   * 删除标签
   */
  export async function tagsDeleteApi(params: TagsDeleteRequest): Promise<TagsDeleteResponse> {
    return requestClient.post<TagsDeleteResponse>('/api/admin/forum/tags/delete', params);
  }


  /**
   * 为主题分配标签
   */
  export async function tagsAssignTopicApi(params: TagsAssignTopicRequest): Promise<TagsAssignTopicResponse> {
    return requestClient.post<TagsAssignTopicResponse>('/api/admin/forum/tags/assign-topic', params);
  }


  /**
   * 从主题移除标签
   */
  export async function tagsUnassignTopicApi(params: TagsUnassignTopicRequest): Promise<TagsUnassignTopicResponse> {
    return requestClient.post<TagsUnassignTopicResponse>('/api/admin/forum/tags/unassign-topic', params);
  }
