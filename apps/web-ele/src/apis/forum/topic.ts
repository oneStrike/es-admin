import type {
  TopicCreateRequest,
  TopicCreateResponse,
  TopicDeleteRequest,
  TopicDeleteResponse,
  TopicDetailRequest,
  TopicDetailResponse,
  TopicIncrementViewCountRequest,
  TopicIncrementViewCountResponse,
  TopicPageRequest,
  TopicPageResponse,
  TopicUpdateAuditStatusRequest,
  TopicUpdateAuditStatusResponse,
  TopicUpdateFeaturedRequest,
  TopicUpdateFeaturedResponse,
  TopicUpdateHiddenRequest,
  TopicUpdateHiddenResponse,
  TopicUpdateLockedRequest,
  TopicUpdateLockedResponse,
  TopicUpdatePinnedRequest,
  TopicUpdatePinnedResponse,
  TopicUpdateRequest,
  TopicUpdateResponse,
} from '../types/forum/topic.d';

import { requestClient } from '#/utils/request';

/**
 * 分页查询论坛主题列表
 */
export async function topicPageApi(
  params?: TopicPageRequest,
): Promise<TopicPageResponse> {
  return requestClient.get<TopicPageResponse>('/api/admin/forum/topic/page', {
    params,
  });
}

/**
 * 获取论坛主题详情
 */
export async function topicDetailApi(
  params: TopicDetailRequest,
): Promise<TopicDetailResponse> {
  return requestClient.get<TopicDetailResponse>(
    '/api/admin/forum/topic/detail',
    { params },
  );
}

/**
 * 创建论坛主题
 */
export async function topicCreateApi(
  params: TopicCreateRequest,
): Promise<TopicCreateResponse> {
  return requestClient.post<TopicCreateResponse>(
    '/api/admin/forum/topic/create',
    params,
  );
}

/**
 * 更新论坛主题
 */
export async function topicUpdateApi(
  params: TopicUpdateRequest,
): Promise<TopicUpdateResponse> {
  return requestClient.post<TopicUpdateResponse>(
    '/api/admin/forum/topic/update',
    params,
  );
}

/**
 * 删除论坛主题
 */
export async function topicDeleteApi(
  params: TopicDeleteRequest,
): Promise<TopicDeleteResponse> {
  return requestClient.post<TopicDeleteResponse>(
    '/api/admin/forum/topic/delete',
    params,
  );
}

/**
 * 更新主题置顶状态
 */
export async function topicUpdatePinnedApi(
  params: TopicUpdatePinnedRequest,
): Promise<TopicUpdatePinnedResponse> {
  return requestClient.post<TopicUpdatePinnedResponse>(
    '/api/admin/forum/topic/update-pinned',
    params,
  );
}

/**
 * 更新主题精华状态
 */
export async function topicUpdateFeaturedApi(
  params: TopicUpdateFeaturedRequest,
): Promise<TopicUpdateFeaturedResponse> {
  return requestClient.post<TopicUpdateFeaturedResponse>(
    '/api/admin/forum/topic/update-featured',
    params,
  );
}

/**
 * 更新主题锁定状态
 */
export async function topicUpdateLockedApi(
  params: TopicUpdateLockedRequest,
): Promise<TopicUpdateLockedResponse> {
  return requestClient.post<TopicUpdateLockedResponse>(
    '/api/admin/forum/topic/update-locked',
    params,
  );
}

/**
 * 更新主题隐藏状态
 */
export async function topicUpdateHiddenApi(
  params: TopicUpdateHiddenRequest,
): Promise<TopicUpdateHiddenResponse> {
  return requestClient.post<TopicUpdateHiddenResponse>(
    '/api/admin/forum/topic/update-hidden',
    params,
  );
}

/**
 * 更新主题审核状态
 */
export async function topicUpdateAuditStatusApi(
  params: TopicUpdateAuditStatusRequest,
): Promise<TopicUpdateAuditStatusResponse> {
  return requestClient.post<TopicUpdateAuditStatusResponse>(
    '/api/admin/forum/topic/update-audit-status',
    params,
  );
}

/**
 * 增加主题浏览次数
 */
export async function topicIncrementViewCountApi(
  params: TopicIncrementViewCountRequest,
): Promise<TopicIncrementViewCountResponse> {
  return requestClient.post<TopicIncrementViewCountResponse>(
    '/api/admin/forum/topic/increment-view-count',
    params,
  );
}
