import type {
  ForumHashtagsCreateRequest,
  ForumHashtagsCreateResponse,
  ForumHashtagsDetailRequest,
  ForumHashtagsDetailResponse,
  ForumHashtagsPageRequest,
  ForumHashtagsPageResponse,
  ForumHashtagsUpdateAuditStatusRequest,
  ForumHashtagsUpdateAuditStatusResponse,
  ForumHashtagsUpdateHiddenRequest,
  ForumHashtagsUpdateHiddenResponse,
  ForumHashtagsUpdateRequest,
  ForumHashtagsUpdateResponse,
  ForumModeratorActionLogPageRequest,
  ForumModeratorActionLogPageResponse,
  ForumModeratorApplicationAuditRequest,
  ForumModeratorApplicationAuditResponse,
  ForumModeratorApplicationDeleteRequest,
  ForumModeratorApplicationDeleteResponse,
  ForumModeratorApplicationDetailRequest,
  ForumModeratorApplicationDetailResponse,
  ForumModeratorApplicationPageRequest,
  ForumModeratorApplicationPageResponse,
  ForumModeratorLifecycleLogPageRequest,
  ForumModeratorLifecycleLogPageResponse,
  ForumModeratorsAssignSectionRequest,
  ForumModeratorsAssignSectionResponse,
  ForumModeratorsCreateRequest,
  ForumModeratorsCreateResponse,
  ForumModeratorsDeleteRequest,
  ForumModeratorsDeleteResponse,
  ForumModeratorsDetailRequest,
  ForumModeratorsDetailResponse,
  ForumModeratorsPageRequest,
  ForumModeratorsPageResponse,
  ForumModeratorsUpdateRequest,
  ForumModeratorsUpdateResponse,
  ForumSearchPageRequest,
  ForumSearchPageResponse,
  ForumSectionGroupsCreateRequest,
  ForumSectionGroupsCreateResponse,
  ForumSectionGroupsDeleteRequest,
  ForumSectionGroupsDeleteResponse,
  ForumSectionGroupsDetailRequest,
  ForumSectionGroupsDetailResponse,
  ForumSectionGroupsPageRequest,
  ForumSectionGroupsPageResponse,
  ForumSectionGroupsSwapSortOrderRequest,
  ForumSectionGroupsSwapSortOrderResponse,
  ForumSectionGroupsUpdateEnabledRequest,
  ForumSectionGroupsUpdateEnabledResponse,
  ForumSectionGroupsUpdateRequest,
  ForumSectionGroupsUpdateResponse,
  ForumSectionsCreateRequest,
  ForumSectionsCreateResponse,
  ForumSectionsDeleteRequest,
  ForumSectionsDeleteResponse,
  ForumSectionsDetailRequest,
  ForumSectionsDetailResponse,
  ForumSectionsPageRequest,
  ForumSectionsPageResponse,
  ForumSectionsRebuildCountsAllResponse,
  ForumSectionsRebuildCountsRequest,
  ForumSectionsRebuildCountsResponse,
  ForumSectionsSwapSortOrderRequest,
  ForumSectionsSwapSortOrderResponse,
  ForumSectionsTreeResponse,
  ForumSectionsUpdateEnabledRequest,
  ForumSectionsUpdateEnabledResponse,
  ForumSectionsUpdateRequest,
  ForumSectionsUpdateResponse,
  ForumSensitiveWordCountResponse,
  ForumSensitiveWordCreateRequest,
  ForumSensitiveWordCreateResponse,
  ForumSensitiveWordDeleteRequest,
  ForumSensitiveWordDeleteResponse,
  ForumSensitiveWordDetectHighestLevelRequest,
  ForumSensitiveWordDetectHighestLevelResponse,
  ForumSensitiveWordDetectRequest,
  ForumSensitiveWordDetectResponse,
  ForumSensitiveWordDetectStatusResponse,
  ForumSensitiveWordHitLogPageRequest,
  ForumSensitiveWordHitLogPageResponse,
  ForumSensitiveWordPageRequest,
  ForumSensitiveWordPageResponse,
  ForumSensitiveWordReplaceRequest,
  ForumSensitiveWordReplaceResponse,
  ForumSensitiveWordStatsFullResponse,
  ForumSensitiveWordStatsRequest,
  ForumSensitiveWordStatsResponse,
  ForumSensitiveWordUpdateRequest,
  ForumSensitiveWordUpdateResponse,
  ForumSensitiveWordUpdateStatusRequest,
  ForumSensitiveWordUpdateStatusResponse,
  ForumTopicCreateRequest,
  ForumTopicCreateResponse,
  ForumTopicDeleteRequest,
  ForumTopicDeleteResponse,
  ForumTopicDetailRequest,
  ForumTopicDetailResponse,
  ForumTopicMoveRequest,
  ForumTopicMoveResponse,
  ForumTopicPageRequest,
  ForumTopicPageResponse,
  ForumTopicRestoreRequest,
  ForumTopicRestoreResponse,
  ForumTopicUpdateAuditStatusRequest,
  ForumTopicUpdateAuditStatusResponse,
  ForumTopicUpdateFeaturedRequest,
  ForumTopicUpdateFeaturedResponse,
  ForumTopicUpdateHiddenRequest,
  ForumTopicUpdateHiddenResponse,
  ForumTopicUpdateLockedRequest,
  ForumTopicUpdateLockedResponse,
  ForumTopicUpdatePinnedRequest,
  ForumTopicUpdatePinnedResponse,
  ForumTopicUpdateRequest,
  ForumTopicUpdateResponse,
} from '../types/forum.d';

import { requestClient } from '#/api/request';

/**
 * 查看版主列表
 */
export async function forumModeratorsPageApi(
  params?: ForumModeratorsPageRequest,
): Promise<ForumModeratorsPageResponse> {
  return requestClient.get<ForumModeratorsPageResponse>(
    '/api/admin/forum/moderators/page',
    { params },
  );
}

/**
 * 查看版主详情
 */
export async function forumModeratorsDetailApi(
  params: ForumModeratorsDetailRequest,
): Promise<ForumModeratorsDetailResponse> {
  return requestClient.get<ForumModeratorsDetailResponse>(
    '/api/admin/forum/moderators/detail',
    { params },
  );
}

/**
 * 添加版主
 */
export async function forumModeratorsCreateApi(
  params: ForumModeratorsCreateRequest,
): Promise<ForumModeratorsCreateResponse> {
  return requestClient.post<ForumModeratorsCreateResponse>(
    '/api/admin/forum/moderators/create',
    params,
  );
}

/**
 * 更新版主信息
 */
export async function forumModeratorsUpdateApi(
  params: ForumModeratorsUpdateRequest,
): Promise<ForumModeratorsUpdateResponse> {
  return requestClient.post<ForumModeratorsUpdateResponse>(
    '/api/admin/forum/moderators/update',
    params,
  );
}

/**
 * 移除版主
 */
export async function forumModeratorsDeleteApi(
  params: ForumModeratorsDeleteRequest,
): Promise<ForumModeratorsDeleteResponse> {
  return requestClient.post<ForumModeratorsDeleteResponse>(
    '/api/admin/forum/moderators/delete',
    params,
  );
}

/**
 * 分配版主管理的板块
 */
export async function forumModeratorsAssignSectionApi(
  params: ForumModeratorsAssignSectionRequest,
): Promise<ForumModeratorsAssignSectionResponse> {
  return requestClient.post<ForumModeratorsAssignSectionResponse>(
    '/api/admin/forum/moderators/assign-section',
    params,
  );
}

/**
 * 分页查询版主申请
 */
export async function forumModeratorApplicationPageApi(
  params?: ForumModeratorApplicationPageRequest,
): Promise<ForumModeratorApplicationPageResponse> {
  return requestClient.get<ForumModeratorApplicationPageResponse>(
    '/api/admin/forum/moderator-application/page',
    { params },
  );
}

/**
 * 获取版主申请详情
 */
export async function forumModeratorApplicationDetailApi(
  params: ForumModeratorApplicationDetailRequest,
): Promise<ForumModeratorApplicationDetailResponse> {
  return requestClient.get<ForumModeratorApplicationDetailResponse>(
    '/api/admin/forum/moderator-application/detail',
    { params },
  );
}

/**
 * 审核版主申请
 */
export async function forumModeratorApplicationAuditApi(
  params: ForumModeratorApplicationAuditRequest,
): Promise<ForumModeratorApplicationAuditResponse> {
  return requestClient.post<ForumModeratorApplicationAuditResponse>(
    '/api/admin/forum/moderator-application/audit',
    params,
  );
}

/**
 * 删除版主申请
 */
export async function forumModeratorApplicationDeleteApi(
  params: ForumModeratorApplicationDeleteRequest,
): Promise<ForumModeratorApplicationDeleteResponse> {
  return requestClient.post<ForumModeratorApplicationDeleteResponse>(
    '/api/admin/forum/moderator-application/delete',
    params,
  );
}

/**
 * 分页搜索论坛主题与回复
 */
export async function forumSearchPageApi(
  params: ForumSearchPageRequest,
): Promise<ForumSearchPageResponse> {
  return requestClient.get<ForumSearchPageResponse>(
    '/api/admin/forum/search/page',
    { params },
  );
}

/**
 * 获取敏感词分页列表
 */
export async function forumSensitiveWordPageApi(
  params?: ForumSensitiveWordPageRequest,
): Promise<ForumSensitiveWordPageResponse> {
  return requestClient.get<ForumSensitiveWordPageResponse>(
    '/api/admin/forum/sensitive-word/page',
    { params },
  );
}

/**
 * 创建敏感词
 */
export async function forumSensitiveWordCreateApi(
  params: ForumSensitiveWordCreateRequest,
): Promise<ForumSensitiveWordCreateResponse> {
  return requestClient.post<ForumSensitiveWordCreateResponse>(
    '/api/admin/forum/sensitive-word/create',
    params,
  );
}

/**
 * 更新敏感词
 */
export async function forumSensitiveWordUpdateApi(
  params: ForumSensitiveWordUpdateRequest,
): Promise<ForumSensitiveWordUpdateResponse> {
  return requestClient.post<ForumSensitiveWordUpdateResponse>(
    '/api/admin/forum/sensitive-word/update',
    params,
  );
}

/**
 * 删除敏感词
 */
export async function forumSensitiveWordDeleteApi(
  params: ForumSensitiveWordDeleteRequest,
): Promise<ForumSensitiveWordDeleteResponse> {
  return requestClient.post<ForumSensitiveWordDeleteResponse>(
    '/api/admin/forum/sensitive-word/delete',
    params,
  );
}

/**
 * 更新敏感词状态
 */
export async function forumSensitiveWordUpdateStatusApi(
  params: ForumSensitiveWordUpdateStatusRequest,
): Promise<ForumSensitiveWordUpdateStatusResponse> {
  return requestClient.post<ForumSensitiveWordUpdateStatusResponse>(
    '/api/admin/forum/sensitive-word/update-status',
    params,
  );
}

/**
 * 检测文本中的敏感词
 */
export async function forumSensitiveWordDetectApi(
  params: ForumSensitiveWordDetectRequest,
): Promise<ForumSensitiveWordDetectResponse> {
  return requestClient.post<ForumSensitiveWordDetectResponse>(
    '/api/admin/forum/sensitive-word/detect',
    params,
  );
}

/**
 * 获取统计查询结果
 */
export async function forumSensitiveWordStatsApi(
  params?: ForumSensitiveWordStatsRequest,
): Promise<ForumSensitiveWordStatsResponse> {
  return requestClient.get<ForumSensitiveWordStatsResponse>(
    '/api/admin/forum/sensitive-word/stats',
    { params },
  );
}

/**
 * 获取完整统计数据
 */
export async function forumSensitiveWordStatsFullApi(): Promise<ForumSensitiveWordStatsFullResponse> {
  return requestClient.get<ForumSensitiveWordStatsFullResponse>(
    '/api/admin/forum/sensitive-word/stats/full',
  );
}

/**
 * 获取敏感词命中日志分页列表
 */
export async function forumSensitiveWordHitLogPageApi(
  params?: ForumSensitiveWordHitLogPageRequest,
): Promise<ForumSensitiveWordHitLogPageResponse> {
  return requestClient.get<ForumSensitiveWordHitLogPageResponse>(
    '/api/admin/forum/sensitive-word/hit-log/page',
    { params },
  );
}

/**
 * 替换文本中的敏感词
 */
export async function forumSensitiveWordReplaceApi(
  params: ForumSensitiveWordReplaceRequest,
): Promise<ForumSensitiveWordReplaceResponse> {
  return requestClient.post<ForumSensitiveWordReplaceResponse>(
    '/api/admin/forum/sensitive-word/replace',
    params,
  );
}

/**
 * 获取文本中敏感词的最高等级
 */
export async function forumSensitiveWordDetectHighestLevelApi(
  params: ForumSensitiveWordDetectHighestLevelRequest,
): Promise<ForumSensitiveWordDetectHighestLevelResponse> {
  return requestClient.post<ForumSensitiveWordDetectHighestLevelResponse>(
    '/api/admin/forum/sensitive-word/detect/highest-level',
    params,
  );
}

/**
 * 检查敏感词检测器状态
 */
export async function forumSensitiveWordDetectStatusApi(): Promise<ForumSensitiveWordDetectStatusResponse> {
  return requestClient.get<ForumSensitiveWordDetectStatusResponse>(
    '/api/admin/forum/sensitive-word/detect/status',
  );
}

/**
 * 获取当前加载的敏感词数量
 */
export async function forumSensitiveWordCountApi(): Promise<ForumSensitiveWordCountResponse> {
  return requestClient.get<ForumSensitiveWordCountResponse>(
    '/api/admin/forum/sensitive-word/count',
  );
}

/**
 * 分页查询论坛主题列表
 */
export async function forumTopicPageApi(
  params?: ForumTopicPageRequest,
): Promise<ForumTopicPageResponse> {
  return requestClient.get<ForumTopicPageResponse>(
    '/api/admin/forum/topic/page',
    { params },
  );
}

/**
 * 获取论坛主题详情
 */
export async function forumTopicDetailApi(
  params: ForumTopicDetailRequest,
): Promise<ForumTopicDetailResponse> {
  return requestClient.get<ForumTopicDetailResponse>(
    '/api/admin/forum/topic/detail',
    { params },
  );
}

/**
 * 创建论坛主题
 */
export async function forumTopicCreateApi(
  params: ForumTopicCreateRequest,
): Promise<ForumTopicCreateResponse> {
  return requestClient.post<ForumTopicCreateResponse>(
    '/api/admin/forum/topic/create',
    params,
  );
}

/**
 * 更新论坛主题
 */
export async function forumTopicUpdateApi(
  params: ForumTopicUpdateRequest,
): Promise<ForumTopicUpdateResponse> {
  return requestClient.post<ForumTopicUpdateResponse>(
    '/api/admin/forum/topic/update',
    params,
  );
}

/**
 * 删除论坛主题
 */
export async function forumTopicDeleteApi(
  params: ForumTopicDeleteRequest,
): Promise<ForumTopicDeleteResponse> {
  return requestClient.post<ForumTopicDeleteResponse>(
    '/api/admin/forum/topic/delete',
    params,
  );
}

/**
 * 恢复已删除论坛主题
 */
export async function forumTopicRestoreApi(
  params: ForumTopicRestoreRequest,
): Promise<ForumTopicRestoreResponse> {
  return requestClient.post<ForumTopicRestoreResponse>(
    '/api/admin/forum/topic/restore',
    params,
  );
}

/**
 * 移动论坛主题板块
 */
export async function forumTopicMoveApi(
  params: ForumTopicMoveRequest,
): Promise<ForumTopicMoveResponse> {
  return requestClient.post<ForumTopicMoveResponse>(
    '/api/admin/forum/topic/move',
    params,
  );
}

/**
 * 更新主题置顶状态
 */
export async function forumTopicUpdatePinnedApi(
  params: ForumTopicUpdatePinnedRequest,
): Promise<ForumTopicUpdatePinnedResponse> {
  return requestClient.post<ForumTopicUpdatePinnedResponse>(
    '/api/admin/forum/topic/update-pinned',
    params,
  );
}

/**
 * 更新主题精华状态
 */
export async function forumTopicUpdateFeaturedApi(
  params: ForumTopicUpdateFeaturedRequest,
): Promise<ForumTopicUpdateFeaturedResponse> {
  return requestClient.post<ForumTopicUpdateFeaturedResponse>(
    '/api/admin/forum/topic/update-featured',
    params,
  );
}

/**
 * 更新主题锁定状态
 */
export async function forumTopicUpdateLockedApi(
  params: ForumTopicUpdateLockedRequest,
): Promise<ForumTopicUpdateLockedResponse> {
  return requestClient.post<ForumTopicUpdateLockedResponse>(
    '/api/admin/forum/topic/update-locked',
    params,
  );
}

/**
 * 更新主题隐藏状态
 */
export async function forumTopicUpdateHiddenApi(
  params: ForumTopicUpdateHiddenRequest,
): Promise<ForumTopicUpdateHiddenResponse> {
  return requestClient.post<ForumTopicUpdateHiddenResponse>(
    '/api/admin/forum/topic/update-hidden',
    params,
  );
}

/**
 * 更新主题审核状态
 */
export async function forumTopicUpdateAuditStatusApi(
  params: ForumTopicUpdateAuditStatusRequest,
): Promise<ForumTopicUpdateAuditStatusResponse> {
  return requestClient.post<ForumTopicUpdateAuditStatusResponse>(
    '/api/admin/forum/topic/update-audit-status',
    params,
  );
}

/**
 * 查看板块分页
 */
export async function forumSectionsPageApi(
  params?: ForumSectionsPageRequest,
): Promise<ForumSectionsPageResponse> {
  return requestClient.get<ForumSectionsPageResponse>(
    '/api/admin/forum/sections/page',
    { params },
  );
}

/**
 * 查看板块详情
 */
export async function forumSectionsDetailApi(
  params: ForumSectionsDetailRequest,
): Promise<ForumSectionsDetailResponse> {
  return requestClient.get<ForumSectionsDetailResponse>(
    '/api/admin/forum/sections/detail',
    { params },
  );
}

/**
 * 查看板块树
 */
export async function forumSectionsTreeApi(): Promise<ForumSectionsTreeResponse> {
  return requestClient.get<ForumSectionsTreeResponse>(
    '/api/admin/forum/sections/tree',
  );
}

/**
 * 添加板块
 */
export async function forumSectionsCreateApi(
  params: ForumSectionsCreateRequest,
): Promise<ForumSectionsCreateResponse> {
  return requestClient.post<ForumSectionsCreateResponse>(
    '/api/admin/forum/sections/create',
    params,
  );
}

/**
 * 更新板块
 */
export async function forumSectionsUpdateApi(
  params: ForumSectionsUpdateRequest,
): Promise<ForumSectionsUpdateResponse> {
  return requestClient.post<ForumSectionsUpdateResponse>(
    '/api/admin/forum/sections/update',
    params,
  );
}

/**
 * 删除板块
 */
export async function forumSectionsDeleteApi(
  params: ForumSectionsDeleteRequest,
): Promise<ForumSectionsDeleteResponse> {
  return requestClient.post<ForumSectionsDeleteResponse>(
    '/api/admin/forum/sections/delete',
    params,
  );
}

/**
 * 更新板块启用状态
 */
export async function forumSectionsUpdateEnabledApi(
  params: ForumSectionsUpdateEnabledRequest,
): Promise<ForumSectionsUpdateEnabledResponse> {
  return requestClient.post<ForumSectionsUpdateEnabledResponse>(
    '/api/admin/forum/sections/update-enabled',
    params,
  );
}

/**
 * 重建板块计数
 */
export async function forumSectionsRebuildCountsApi(
  params: ForumSectionsRebuildCountsRequest,
): Promise<ForumSectionsRebuildCountsResponse> {
  return requestClient.post<ForumSectionsRebuildCountsResponse>(
    '/api/admin/forum/sections/rebuild-counts',
    params,
  );
}

/**
 * 全量重建板块计数
 */
export async function forumSectionsRebuildCountsAllApi(): Promise<ForumSectionsRebuildCountsAllResponse> {
  return requestClient.post<ForumSectionsRebuildCountsAllResponse>(
    '/api/admin/forum/sections/rebuild-counts-all',
  );
}

/**
 * 交换板块排序顺序
 */
export async function forumSectionsSwapSortOrderApi(
  params: ForumSectionsSwapSortOrderRequest,
): Promise<ForumSectionsSwapSortOrderResponse> {
  return requestClient.post<ForumSectionsSwapSortOrderResponse>(
    '/api/admin/forum/sections/swap-sort-order',
    params,
  );
}

/**
 * 查看板块组列表
 */
export async function forumSectionGroupsPageApi(
  params?: ForumSectionGroupsPageRequest,
): Promise<ForumSectionGroupsPageResponse> {
  return requestClient.get<ForumSectionGroupsPageResponse>(
    '/api/admin/forum/section-groups/page',
    { params },
  );
}

/**
 * 查看板块组详情
 */
export async function forumSectionGroupsDetailApi(
  params: ForumSectionGroupsDetailRequest,
): Promise<ForumSectionGroupsDetailResponse> {
  return requestClient.get<ForumSectionGroupsDetailResponse>(
    '/api/admin/forum/section-groups/detail',
    { params },
  );
}

/**
 * 添加板块组
 */
export async function forumSectionGroupsCreateApi(
  params: ForumSectionGroupsCreateRequest,
): Promise<ForumSectionGroupsCreateResponse> {
  return requestClient.post<ForumSectionGroupsCreateResponse>(
    '/api/admin/forum/section-groups/create',
    params,
  );
}

/**
 * 更新板块组
 */
export async function forumSectionGroupsUpdateApi(
  params: ForumSectionGroupsUpdateRequest,
): Promise<ForumSectionGroupsUpdateResponse> {
  return requestClient.post<ForumSectionGroupsUpdateResponse>(
    '/api/admin/forum/section-groups/update',
    params,
  );
}

/**
 * 删除板块组
 */
export async function forumSectionGroupsDeleteApi(
  params: ForumSectionGroupsDeleteRequest,
): Promise<ForumSectionGroupsDeleteResponse> {
  return requestClient.post<ForumSectionGroupsDeleteResponse>(
    '/api/admin/forum/section-groups/delete',
    params,
  );
}

/**
 * 更新板块组启用状态
 */
export async function forumSectionGroupsUpdateEnabledApi(
  params: ForumSectionGroupsUpdateEnabledRequest,
): Promise<ForumSectionGroupsUpdateEnabledResponse> {
  return requestClient.post<ForumSectionGroupsUpdateEnabledResponse>(
    '/api/admin/forum/section-groups/update-enabled',
    params,
  );
}

/**
 * 交换板块组排序顺序
 */
export async function forumSectionGroupsSwapSortOrderApi(
  params: ForumSectionGroupsSwapSortOrderRequest,
): Promise<ForumSectionGroupsSwapSortOrderResponse> {
  return requestClient.post<ForumSectionGroupsSwapSortOrderResponse>(
    '/api/admin/forum/section-groups/swap-sort-order',
    params,
  );
}

/**
 * 分页查询论坛话题
 */
export async function forumHashtagsPageApi(
  params?: ForumHashtagsPageRequest,
): Promise<ForumHashtagsPageResponse> {
  return requestClient.get<ForumHashtagsPageResponse>(
    '/api/admin/forum/hashtags/page',
    { params },
  );
}

/**
 * 获取论坛话题详情
 */
export async function forumHashtagsDetailApi(
  params: ForumHashtagsDetailRequest,
): Promise<ForumHashtagsDetailResponse> {
  return requestClient.get<ForumHashtagsDetailResponse>(
    '/api/admin/forum/hashtags/detail',
    { params },
  );
}

/**
 * 创建论坛话题
 */
export async function forumHashtagsCreateApi(
  params: ForumHashtagsCreateRequest,
): Promise<ForumHashtagsCreateResponse> {
  return requestClient.post<ForumHashtagsCreateResponse>(
    '/api/admin/forum/hashtags/create',
    params,
  );
}

/**
 * 更新论坛话题
 */
export async function forumHashtagsUpdateApi(
  params: ForumHashtagsUpdateRequest,
): Promise<ForumHashtagsUpdateResponse> {
  return requestClient.post<ForumHashtagsUpdateResponse>(
    '/api/admin/forum/hashtags/update',
    params,
  );
}

/**
 * 更新论坛话题隐藏状态
 */
export async function forumHashtagsUpdateHiddenApi(
  params: ForumHashtagsUpdateHiddenRequest,
): Promise<ForumHashtagsUpdateHiddenResponse> {
  return requestClient.post<ForumHashtagsUpdateHiddenResponse>(
    '/api/admin/forum/hashtags/update-hidden',
    params,
  );
}

/**
 * 更新论坛话题审核状态
 */
export async function forumHashtagsUpdateAuditStatusApi(
  params: ForumHashtagsUpdateAuditStatusRequest,
): Promise<ForumHashtagsUpdateAuditStatusResponse> {
  return requestClient.post<ForumHashtagsUpdateAuditStatusResponse>(
    '/api/admin/forum/hashtags/update-audit-status',
    params,
  );
}

/**
 * 查看版主操作日志
 */
export async function forumModeratorActionLogPageApi(
  params?: ForumModeratorActionLogPageRequest,
): Promise<ForumModeratorActionLogPageResponse> {
  return requestClient.get<ForumModeratorActionLogPageResponse>(
    '/api/admin/forum/moderator-action-log/page',
    { params },
  );
}

/**
 * 分页查询版主生命周期日志
 */
export async function forumModeratorLifecycleLogPageApi(
  params?: ForumModeratorLifecycleLogPageRequest,
): Promise<ForumModeratorLifecycleLogPageResponse> {
  return requestClient.get<ForumModeratorLifecycleLogPageResponse>(
    '/api/admin/forum/moderator-lifecycle-log/page',
    { params },
  );
}
