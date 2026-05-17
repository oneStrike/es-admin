import type {
  ContentAuthorCreateRequest,
  ContentAuthorCreateResponse,
  ContentAuthorDeleteRequest,
  ContentAuthorDeleteResponse,
  ContentAuthorDetailRequest,
  ContentAuthorDetailResponse,
  ContentAuthorPageRequest,
  ContentAuthorPageResponse,
  ContentAuthorRebuildFollowCountAllResponse,
  ContentAuthorRebuildFollowCountRequest,
  ContentAuthorRebuildFollowCountResponse,
  ContentAuthorRebuildWorkCountAllResponse,
  ContentAuthorRebuildWorkCountRequest,
  ContentAuthorRebuildWorkCountResponse,
  ContentAuthorUpdateRecommendedRequest,
  ContentAuthorUpdateRecommendedResponse,
  ContentAuthorUpdateRequest,
  ContentAuthorUpdateResponse,
  ContentAuthorUpdateStatusRequest,
  ContentAuthorUpdateStatusResponse,
  ContentCategoryCreateRequest,
  ContentCategoryCreateResponse,
  ContentCategoryDeleteRequest,
  ContentCategoryDeleteResponse,
  ContentCategoryDetailRequest,
  ContentCategoryDetailResponse,
  ContentCategoryPageRequest,
  ContentCategoryPageResponse,
  ContentCategorySwapSortOrderRequest,
  ContentCategorySwapSortOrderResponse,
  ContentCategoryUpdateRequest,
  ContentCategoryUpdateResponse,
  ContentCategoryUpdateStatusRequest,
  ContentCategoryUpdateStatusResponse,
  ContentComicChapterBatchDeleteRequest,
  ContentComicChapterBatchDeleteResponse,
  ContentComicChapterContentArchiveConfirmRequest,
  ContentComicChapterContentArchiveConfirmResponse,
  ContentComicChapterContentArchiveDetailRequest,
  ContentComicChapterContentArchiveDetailResponse,
  ContentComicChapterContentArchiveDiscardRequest,
  ContentComicChapterContentArchiveDiscardResponse,
  ContentComicChapterContentArchivePreviewRequest,
  ContentComicChapterContentArchivePreviewResponse,
  ContentComicChapterContentArchiveSessionRequest,
  ContentComicChapterContentArchiveSessionResponse,
  ContentComicChapterContentClearRequest,
  ContentComicChapterContentClearResponse,
  ContentComicChapterContentDeleteRequest,
  ContentComicChapterContentDeleteResponse,
  ContentComicChapterContentListRequest,
  ContentComicChapterContentListResponse,
  ContentComicChapterContentMoveRequest,
  ContentComicChapterContentMoveResponse,
  ContentComicChapterContentUpdateRequest,
  ContentComicChapterContentUpdateResponse,
  ContentComicChapterContentUploadRequest,
  ContentComicChapterContentUploadResponse,
  ContentComicChapterCreateRequest,
  ContentComicChapterCreateResponse,
  ContentComicChapterDeleteRequest,
  ContentComicChapterDeleteResponse,
  ContentComicChapterDetailRequest,
  ContentComicChapterDetailResponse,
  ContentComicChapterPageRequest,
  ContentComicChapterPageResponse,
  ContentComicChapterSwapSortOrderRequest,
  ContentComicChapterSwapSortOrderResponse,
  ContentComicChapterUpdateRequest,
  ContentComicChapterUpdateResponse,
  ContentComicCreateRequest,
  ContentComicCreateResponse,
  ContentComicDeleteRequest,
  ContentComicDeleteResponse,
  ContentComicDetailRequest,
  ContentComicDetailResponse,
  ContentComicPageRequest,
  ContentComicPageResponse,
  ContentComicThirdPartyChapterContentDetailRequest,
  ContentComicThirdPartyChapterContentDetailResponse,
  ContentComicThirdPartyChapterListRequest,
  ContentComicThirdPartyChapterListResponse,
  ContentComicThirdPartyDetailRequest,
  ContentComicThirdPartyDetailResponse,
  ContentComicThirdPartyImportConfirmRequest,
  ContentComicThirdPartyImportConfirmResponse,
  ContentComicThirdPartyImportPreviewRequest,
  ContentComicThirdPartyImportPreviewResponse,
  ContentComicThirdPartyPlatformListResponse,
  ContentComicThirdPartySearchPageRequest,
  ContentComicThirdPartySearchPageResponse,
  ContentComicThirdPartySyncLatestRequest,
  ContentComicThirdPartySyncLatestResponse,
  ContentComicUpdateHotRequest,
  ContentComicUpdateHotResponse,
  ContentComicUpdateNewRequest,
  ContentComicUpdateNewResponse,
  ContentComicUpdateRecommendedRequest,
  ContentComicUpdateRecommendedResponse,
  ContentComicUpdateRequest,
  ContentComicUpdateResponse,
  ContentComicUpdateStatusRequest,
  ContentComicUpdateStatusResponse,
  ContentEmojiAssetCreateRequest,
  ContentEmojiAssetCreateResponse,
  ContentEmojiAssetDeleteRequest,
  ContentEmojiAssetDeleteResponse,
  ContentEmojiAssetDetailRequest,
  ContentEmojiAssetDetailResponse,
  ContentEmojiAssetPageRequest,
  ContentEmojiAssetPageResponse,
  ContentEmojiAssetSwapSortOrderRequest,
  ContentEmojiAssetSwapSortOrderResponse,
  ContentEmojiAssetUpdateEnabledRequest,
  ContentEmojiAssetUpdateEnabledResponse,
  ContentEmojiAssetUpdateRequest,
  ContentEmojiAssetUpdateResponse,
  ContentEmojiPackCreateRequest,
  ContentEmojiPackCreateResponse,
  ContentEmojiPackDeleteRequest,
  ContentEmojiPackDeleteResponse,
  ContentEmojiPackDetailRequest,
  ContentEmojiPackDetailResponse,
  ContentEmojiPackPageRequest,
  ContentEmojiPackPageResponse,
  ContentEmojiPackSwapSortOrderRequest,
  ContentEmojiPackSwapSortOrderResponse,
  ContentEmojiPackUpdateEnabledRequest,
  ContentEmojiPackUpdateEnabledResponse,
  ContentEmojiPackUpdateRequest,
  ContentEmojiPackUpdateResponse,
  ContentEmojiPackUpdateSceneTypeRequest,
  ContentEmojiPackUpdateSceneTypeResponse,
  ContentNovelChapterBatchDeleteRequest,
  ContentNovelChapterBatchDeleteResponse,
  ContentNovelChapterContentDeleteRequest,
  ContentNovelChapterContentDeleteResponse,
  ContentNovelChapterContentDetailRequest,
  ContentNovelChapterContentDetailResponse,
  ContentNovelChapterContentUploadRequest,
  ContentNovelChapterContentUploadResponse,
  ContentNovelChapterCreateRequest,
  ContentNovelChapterCreateResponse,
  ContentNovelChapterDeleteRequest,
  ContentNovelChapterDeleteResponse,
  ContentNovelChapterDetailRequest,
  ContentNovelChapterDetailResponse,
  ContentNovelChapterPageRequest,
  ContentNovelChapterPageResponse,
  ContentNovelChapterSwapSortOrderRequest,
  ContentNovelChapterSwapSortOrderResponse,
  ContentNovelChapterUpdateRequest,
  ContentNovelChapterUpdateResponse,
  ContentNovelCreateRequest,
  ContentNovelCreateResponse,
  ContentNovelDeleteRequest,
  ContentNovelDeleteResponse,
  ContentNovelDetailRequest,
  ContentNovelDetailResponse,
  ContentNovelPageRequest,
  ContentNovelPageResponse,
  ContentNovelUpdateHotRequest,
  ContentNovelUpdateHotResponse,
  ContentNovelUpdateNewRequest,
  ContentNovelUpdateNewResponse,
  ContentNovelUpdateRecommendedRequest,
  ContentNovelUpdateRecommendedResponse,
  ContentNovelUpdateRequest,
  ContentNovelUpdateResponse,
  ContentNovelUpdateStatusRequest,
  ContentNovelUpdateStatusResponse,
  ContentTagCreateRequest,
  ContentTagCreateResponse,
  ContentTagDeleteRequest,
  ContentTagDeleteResponse,
  ContentTagDetailRequest,
  ContentTagDetailResponse,
  ContentTagPageRequest,
  ContentTagPageResponse,
  ContentTagSwapSortOrderRequest,
  ContentTagSwapSortOrderResponse,
  ContentTagUpdateRequest,
  ContentTagUpdateResponse,
  ContentTagUpdateStatusRequest,
  ContentTagUpdateStatusResponse,
} from '../types/content.d';

import { requestClient } from '#/api/request';

/**
 * 创建漫画
 */
export async function contentComicCreateApi(
  params: ContentComicCreateRequest,
): Promise<ContentComicCreateResponse> {
  return requestClient.post<ContentComicCreateResponse>(
    '/api/admin/content/comic/create',
    params,
  );
}

/**
 * 分页查询漫画列表
 */
export async function contentComicPageApi(
  params?: ContentComicPageRequest,
): Promise<ContentComicPageResponse> {
  return requestClient.get<ContentComicPageResponse>(
    '/api/admin/content/comic/page',
    { params },
  );
}

/**
 * 获取漫画详情
 */
export async function contentComicDetailApi(
  params: ContentComicDetailRequest,
): Promise<ContentComicDetailResponse> {
  return requestClient.get<ContentComicDetailResponse>(
    '/api/admin/content/comic/detail',
    { params },
  );
}

/**
 * 更新漫画信息
 */
export async function contentComicUpdateApi(
  params: ContentComicUpdateRequest,
): Promise<ContentComicUpdateResponse> {
  return requestClient.post<ContentComicUpdateResponse>(
    '/api/admin/content/comic/update',
    params,
  );
}

/**
 * 更新漫画发布状态
 */
export async function contentComicUpdateStatusApi(
  params: ContentComicUpdateStatusRequest,
): Promise<ContentComicUpdateStatusResponse> {
  return requestClient.post<ContentComicUpdateStatusResponse>(
    '/api/admin/content/comic/update-status',
    params,
  );
}

/**
 * 更新漫画推荐状态
 */
export async function contentComicUpdateRecommendedApi(
  params: ContentComicUpdateRecommendedRequest,
): Promise<ContentComicUpdateRecommendedResponse> {
  return requestClient.post<ContentComicUpdateRecommendedResponse>(
    '/api/admin/content/comic/update-recommended',
    params,
  );
}

/**
 * 更新漫画热门状态
 */
export async function contentComicUpdateHotApi(
  params: ContentComicUpdateHotRequest,
): Promise<ContentComicUpdateHotResponse> {
  return requestClient.post<ContentComicUpdateHotResponse>(
    '/api/admin/content/comic/update-hot',
    params,
  );
}

/**
 * 更新漫画新作状态
 */
export async function contentComicUpdateNewApi(
  params: ContentComicUpdateNewRequest,
): Promise<ContentComicUpdateNewResponse> {
  return requestClient.post<ContentComicUpdateNewResponse>(
    '/api/admin/content/comic/update-new',
    params,
  );
}

/**
 * 软删除漫画
 */
export async function contentComicDeleteApi(
  params: ContentComicDeleteRequest,
): Promise<ContentComicDeleteResponse> {
  return requestClient.post<ContentComicDeleteResponse>(
    '/api/admin/content/comic/delete',
    params,
  );
}

/**
 * 创建漫画章节
 */
export async function contentComicChapterCreateApi(
  params: ContentComicChapterCreateRequest,
): Promise<ContentComicChapterCreateResponse> {
  return requestClient.post<ContentComicChapterCreateResponse>(
    '/api/admin/content/comic/chapter/create',
    params,
  );
}

/**
 * 分页查询漫画章节列表
 */
export async function contentComicChapterPageApi(
  params: ContentComicChapterPageRequest,
): Promise<ContentComicChapterPageResponse> {
  return requestClient.get<ContentComicChapterPageResponse>(
    '/api/admin/content/comic/chapter/page',
    { params },
  );
}

/**
 * 获取漫画章节详情
 */
export async function contentComicChapterDetailApi(
  params: ContentComicChapterDetailRequest,
): Promise<ContentComicChapterDetailResponse> {
  return requestClient.get<ContentComicChapterDetailResponse>(
    '/api/admin/content/comic/chapter/detail',
    { params },
  );
}

/**
 * 更新漫画章节
 */
export async function contentComicChapterUpdateApi(
  params: ContentComicChapterUpdateRequest,
): Promise<ContentComicChapterUpdateResponse> {
  return requestClient.post<ContentComicChapterUpdateResponse>(
    '/api/admin/content/comic/chapter/update',
    params,
  );
}

/**
 * 删除漫画章节
 */
export async function contentComicChapterDeleteApi(
  params: ContentComicChapterDeleteRequest,
): Promise<ContentComicChapterDeleteResponse> {
  return requestClient.post<ContentComicChapterDeleteResponse>(
    '/api/admin/content/comic/chapter/delete',
    params,
  );
}

/**
 * 批量删除漫画章节
 */
export async function contentComicChapterBatchDeleteApi(
  params: ContentComicChapterBatchDeleteRequest,
): Promise<ContentComicChapterBatchDeleteResponse> {
  return requestClient.post<ContentComicChapterBatchDeleteResponse>(
    '/api/admin/content/comic/chapter/batch-delete',
    params,
  );
}

/**
 * 交换章节序号
 */
export async function contentComicChapterSwapSortOrderApi(
  params: ContentComicChapterSwapSortOrderRequest,
): Promise<ContentComicChapterSwapSortOrderResponse> {
  return requestClient.post<ContentComicChapterSwapSortOrderResponse>(
    '/api/admin/content/comic/chapter/swap-sort-order',
    params,
  );
}

/**
 * 获取章节内容
 */
export async function contentComicChapterContentListApi(
  params: ContentComicChapterContentListRequest,
): Promise<ContentComicChapterContentListResponse> {
  return requestClient.get<ContentComicChapterContentListResponse>(
    '/api/admin/content/comic/chapter-content/list',
    { params },
  );
}

/**
 * 上传章节内容
 */
export async function contentComicChapterContentUploadApi(
  params: ContentComicChapterContentUploadRequest,
): Promise<ContentComicChapterContentUploadResponse> {
  return requestClient.post<ContentComicChapterContentUploadResponse>(
    '/api/admin/content/comic/chapter-content/upload',
    params,
  );
}

/**
 * 更新章节内容
 */
export async function contentComicChapterContentUpdateApi(
  params: ContentComicChapterContentUpdateRequest,
): Promise<ContentComicChapterContentUpdateResponse> {
  return requestClient.post<ContentComicChapterContentUpdateResponse>(
    '/api/admin/content/comic/chapter-content/update',
    params,
  );
}

/**
 * 删除章节内容
 */
export async function contentComicChapterContentDeleteApi(
  params: ContentComicChapterContentDeleteRequest,
): Promise<ContentComicChapterContentDeleteResponse> {
  return requestClient.post<ContentComicChapterContentDeleteResponse>(
    '/api/admin/content/comic/chapter-content/delete',
    params,
  );
}

/**
 * 移动章节内容
 */
export async function contentComicChapterContentMoveApi(
  params: ContentComicChapterContentMoveRequest,
): Promise<ContentComicChapterContentMoveResponse> {
  return requestClient.post<ContentComicChapterContentMoveResponse>(
    '/api/admin/content/comic/chapter-content/move',
    params,
  );
}

/**
 * 清空章节内容
 */
export async function contentComicChapterContentClearApi(
  params: ContentComicChapterContentClearRequest,
): Promise<ContentComicChapterContentClearResponse> {
  return requestClient.post<ContentComicChapterContentClearResponse>(
    '/api/admin/content/comic/chapter-content/clear',
    params,
  );
}

/**
 * 预解析漫画压缩包
 */
export async function contentComicChapterContentArchivePreviewApi(
  params: ContentComicChapterContentArchivePreviewRequest,
): Promise<ContentComicChapterContentArchivePreviewResponse> {
  return requestClient.post<ContentComicChapterContentArchivePreviewResponse>(
    '/api/admin/content/comic/chapter-content/archive/preview',
    params,
  );
}

/**
 * 创建漫画压缩包预解析会话
 */
export async function contentComicChapterContentArchiveSessionApi(
  params: ContentComicChapterContentArchiveSessionRequest,
): Promise<ContentComicChapterContentArchiveSessionResponse> {
  return requestClient.post<ContentComicChapterContentArchiveSessionResponse>(
    '/api/admin/content/comic/chapter-content/archive/session',
    params,
  );
}

/**
 * 丢弃漫画压缩包预解析会话
 */
export async function contentComicChapterContentArchiveDiscardApi(
  params: ContentComicChapterContentArchiveDiscardRequest,
): Promise<ContentComicChapterContentArchiveDiscardResponse> {
  return requestClient.post<ContentComicChapterContentArchiveDiscardResponse>(
    '/api/admin/content/comic/chapter-content/archive/discard',
    params,
  );
}

/**
 * 确认漫画压缩包导入
 */
export async function contentComicChapterContentArchiveConfirmApi(
  params: ContentComicChapterContentArchiveConfirmRequest,
): Promise<ContentComicChapterContentArchiveConfirmResponse> {
  return requestClient.post<ContentComicChapterContentArchiveConfirmResponse>(
    '/api/admin/content/comic/chapter-content/archive/confirm',
    params,
  );
}

/**
 * 查询漫画压缩包导入任务详情
 */
export async function contentComicChapterContentArchiveDetailApi(
  params: ContentComicChapterContentArchiveDetailRequest,
): Promise<ContentComicChapterContentArchiveDetailResponse> {
  return requestClient.get<ContentComicChapterContentArchiveDetailResponse>(
    '/api/admin/content/comic/chapter-content/archive/detail',
    { params },
  );
}

/**
 * 获取第三方漫画平台列表
 */
export async function contentComicThirdPartyPlatformListApi(): Promise<ContentComicThirdPartyPlatformListResponse> {
  return requestClient.get<ContentComicThirdPartyPlatformListResponse>(
    '/api/admin/content/comic/third-party/platform/list',
  );
}

/**
 * 搜索第三方平台漫画
 */
export async function contentComicThirdPartySearchPageApi(
  params: ContentComicThirdPartySearchPageRequest,
): Promise<ContentComicThirdPartySearchPageResponse> {
  return requestClient.get<ContentComicThirdPartySearchPageResponse>(
    '/api/admin/content/comic/third-party/search/page',
    { params },
  );
}

/**
 * 获取第三方平台漫画详情
 */
export async function contentComicThirdPartyDetailApi(
  params: ContentComicThirdPartyDetailRequest,
): Promise<ContentComicThirdPartyDetailResponse> {
  return requestClient.get<ContentComicThirdPartyDetailResponse>(
    '/api/admin/content/comic/third-party/detail',
    { params },
  );
}

/**
 * 获取第三方平台漫画章节列表
 */
export async function contentComicThirdPartyChapterListApi(
  params: ContentComicThirdPartyChapterListRequest,
): Promise<ContentComicThirdPartyChapterListResponse> {
  return requestClient.get<ContentComicThirdPartyChapterListResponse>(
    '/api/admin/content/comic/third-party/chapter/list',
    { params },
  );
}

/**
 * 获取第三方平台漫画章节内容
 */
export async function contentComicThirdPartyChapterContentDetailApi(
  params: ContentComicThirdPartyChapterContentDetailRequest,
): Promise<ContentComicThirdPartyChapterContentDetailResponse> {
  return requestClient.get<ContentComicThirdPartyChapterContentDetailResponse>(
    '/api/admin/content/comic/third-party/chapter-content/detail',
    { params },
  );
}

/**
 * 预览第三方漫画导入
 */
export async function contentComicThirdPartyImportPreviewApi(
  params: ContentComicThirdPartyImportPreviewRequest,
): Promise<ContentComicThirdPartyImportPreviewResponse> {
  return requestClient.post<ContentComicThirdPartyImportPreviewResponse>(
    '/api/admin/content/comic/third-party/import/preview',
    params,
  );
}

/**
 * 确认第三方漫画导入并创建工作流任务
 */
export async function contentComicThirdPartyImportConfirmApi(
  params: ContentComicThirdPartyImportConfirmRequest,
): Promise<ContentComicThirdPartyImportConfirmResponse> {
  return requestClient.post<ContentComicThirdPartyImportConfirmResponse>(
    '/api/admin/content/comic/third-party/import/confirm',
    params,
  );
}

/**
 * 同步第三方漫画最新章节
 */
export async function contentComicThirdPartySyncLatestApi(
  params: ContentComicThirdPartySyncLatestRequest,
): Promise<ContentComicThirdPartySyncLatestResponse> {
  return requestClient.post<ContentComicThirdPartySyncLatestResponse>(
    '/api/admin/content/comic/third-party/sync/latest',
    params,
  );
}

/**
 * 创建小说
 */
export async function contentNovelCreateApi(
  params: ContentNovelCreateRequest,
): Promise<ContentNovelCreateResponse> {
  return requestClient.post<ContentNovelCreateResponse>(
    '/api/admin/content/novel/create',
    params,
  );
}

/**
 * 分页查询小说列表
 */
export async function contentNovelPageApi(
  params?: ContentNovelPageRequest,
): Promise<ContentNovelPageResponse> {
  return requestClient.get<ContentNovelPageResponse>(
    '/api/admin/content/novel/page',
    { params },
  );
}

/**
 * 获取小说详情
 */
export async function contentNovelDetailApi(
  params: ContentNovelDetailRequest,
): Promise<ContentNovelDetailResponse> {
  return requestClient.get<ContentNovelDetailResponse>(
    '/api/admin/content/novel/detail',
    { params },
  );
}

/**
 * 更新小说信息
 */
export async function contentNovelUpdateApi(
  params: ContentNovelUpdateRequest,
): Promise<ContentNovelUpdateResponse> {
  return requestClient.post<ContentNovelUpdateResponse>(
    '/api/admin/content/novel/update',
    params,
  );
}

/**
 * 更新小说发布状态
 */
export async function contentNovelUpdateStatusApi(
  params: ContentNovelUpdateStatusRequest,
): Promise<ContentNovelUpdateStatusResponse> {
  return requestClient.post<ContentNovelUpdateStatusResponse>(
    '/api/admin/content/novel/update-status',
    params,
  );
}

/**
 * 更新小说推荐状态
 */
export async function contentNovelUpdateRecommendedApi(
  params: ContentNovelUpdateRecommendedRequest,
): Promise<ContentNovelUpdateRecommendedResponse> {
  return requestClient.post<ContentNovelUpdateRecommendedResponse>(
    '/api/admin/content/novel/update-recommended',
    params,
  );
}

/**
 * 更新小说热门状态
 */
export async function contentNovelUpdateHotApi(
  params: ContentNovelUpdateHotRequest,
): Promise<ContentNovelUpdateHotResponse> {
  return requestClient.post<ContentNovelUpdateHotResponse>(
    '/api/admin/content/novel/update-hot',
    params,
  );
}

/**
 * 更新小说新作状态
 */
export async function contentNovelUpdateNewApi(
  params: ContentNovelUpdateNewRequest,
): Promise<ContentNovelUpdateNewResponse> {
  return requestClient.post<ContentNovelUpdateNewResponse>(
    '/api/admin/content/novel/update-new',
    params,
  );
}

/**
 * 软删除小说
 */
export async function contentNovelDeleteApi(
  params: ContentNovelDeleteRequest,
): Promise<ContentNovelDeleteResponse> {
  return requestClient.post<ContentNovelDeleteResponse>(
    '/api/admin/content/novel/delete',
    params,
  );
}

/**
 * 创建小说章节
 */
export async function contentNovelChapterCreateApi(
  params: ContentNovelChapterCreateRequest,
): Promise<ContentNovelChapterCreateResponse> {
  return requestClient.post<ContentNovelChapterCreateResponse>(
    '/api/admin/content/novel/chapter/create',
    params,
  );
}

/**
 * 分页查询小说章节列表
 */
export async function contentNovelChapterPageApi(
  params: ContentNovelChapterPageRequest,
): Promise<ContentNovelChapterPageResponse> {
  return requestClient.get<ContentNovelChapterPageResponse>(
    '/api/admin/content/novel/chapter/page',
    { params },
  );
}

/**
 * 获取小说章节详情
 */
export async function contentNovelChapterDetailApi(
  params: ContentNovelChapterDetailRequest,
): Promise<ContentNovelChapterDetailResponse> {
  return requestClient.get<ContentNovelChapterDetailResponse>(
    '/api/admin/content/novel/chapter/detail',
    { params },
  );
}

/**
 * 更新小说章节
 */
export async function contentNovelChapterUpdateApi(
  params: ContentNovelChapterUpdateRequest,
): Promise<ContentNovelChapterUpdateResponse> {
  return requestClient.post<ContentNovelChapterUpdateResponse>(
    '/api/admin/content/novel/chapter/update',
    params,
  );
}

/**
 * 删除小说章节
 */
export async function contentNovelChapterDeleteApi(
  params: ContentNovelChapterDeleteRequest,
): Promise<ContentNovelChapterDeleteResponse> {
  return requestClient.post<ContentNovelChapterDeleteResponse>(
    '/api/admin/content/novel/chapter/delete',
    params,
  );
}

/**
 * 批量删除小说章节
 */
export async function contentNovelChapterBatchDeleteApi(
  params: ContentNovelChapterBatchDeleteRequest,
): Promise<ContentNovelChapterBatchDeleteResponse> {
  return requestClient.post<ContentNovelChapterBatchDeleteResponse>(
    '/api/admin/content/novel/chapter/batch-delete',
    params,
  );
}

/**
 * 交换章节序号
 */
export async function contentNovelChapterSwapSortOrderApi(
  params: ContentNovelChapterSwapSortOrderRequest,
): Promise<ContentNovelChapterSwapSortOrderResponse> {
  return requestClient.post<ContentNovelChapterSwapSortOrderResponse>(
    '/api/admin/content/novel/chapter/swap-sort-order',
    params,
  );
}

/**
 * 获取章节内容
 */
export async function contentNovelChapterContentDetailApi(
  params: ContentNovelChapterContentDetailRequest,
): Promise<ContentNovelChapterContentDetailResponse> {
  return requestClient.get<ContentNovelChapterContentDetailResponse>(
    '/api/admin/content/novel/chapter-content/detail',
    { params },
  );
}

/**
 * 上传章节文件
 */
export async function contentNovelChapterContentUploadApi(
  params: ContentNovelChapterContentUploadRequest,
): Promise<ContentNovelChapterContentUploadResponse> {
  return requestClient.post<ContentNovelChapterContentUploadResponse>(
    '/api/admin/content/novel/chapter-content/upload',
    params,
  );
}

/**
 * 删除章节文件
 */
export async function contentNovelChapterContentDeleteApi(
  params: ContentNovelChapterContentDeleteRequest,
): Promise<ContentNovelChapterContentDeleteResponse> {
  return requestClient.post<ContentNovelChapterContentDeleteResponse>(
    '/api/admin/content/novel/chapter-content/delete',
    params,
  );
}

/**
 * 创建作者
 */
export async function contentAuthorCreateApi(
  params: ContentAuthorCreateRequest,
): Promise<ContentAuthorCreateResponse> {
  return requestClient.post<ContentAuthorCreateResponse>(
    '/api/admin/content/author/create',
    params,
  );
}

/**
 * 分页查询作者列表
 */
export async function contentAuthorPageApi(
  params?: ContentAuthorPageRequest,
): Promise<ContentAuthorPageResponse> {
  return requestClient.get<ContentAuthorPageResponse>(
    '/api/admin/content/author/page',
    { params },
  );
}

/**
 * 获取作者详情
 */
export async function contentAuthorDetailApi(
  params: ContentAuthorDetailRequest,
): Promise<ContentAuthorDetailResponse> {
  return requestClient.get<ContentAuthorDetailResponse>(
    '/api/admin/content/author/detail',
    { params },
  );
}

/**
 * 更新作者信息
 */
export async function contentAuthorUpdateApi(
  params: ContentAuthorUpdateRequest,
): Promise<ContentAuthorUpdateResponse> {
  return requestClient.post<ContentAuthorUpdateResponse>(
    '/api/admin/content/author/update',
    params,
  );
}

/**
 * 更新作者状态
 */
export async function contentAuthorUpdateStatusApi(
  params: ContentAuthorUpdateStatusRequest,
): Promise<ContentAuthorUpdateStatusResponse> {
  return requestClient.post<ContentAuthorUpdateStatusResponse>(
    '/api/admin/content/author/update-status',
    params,
  );
}

/**
 * 更新作者推荐状态
 */
export async function contentAuthorUpdateRecommendedApi(
  params: ContentAuthorUpdateRecommendedRequest,
): Promise<ContentAuthorUpdateRecommendedResponse> {
  return requestClient.post<ContentAuthorUpdateRecommendedResponse>(
    '/api/admin/content/author/update-recommended',
    params,
  );
}

/**
 * 重建作者关注计数
 */
export async function contentAuthorRebuildFollowCountApi(
  params: ContentAuthorRebuildFollowCountRequest,
): Promise<ContentAuthorRebuildFollowCountResponse> {
  return requestClient.post<ContentAuthorRebuildFollowCountResponse>(
    '/api/admin/content/author/rebuild-follow-count',
    params,
  );
}

/**
 * 全量重建作者关注计数
 */
export async function contentAuthorRebuildFollowCountAllApi(): Promise<ContentAuthorRebuildFollowCountAllResponse> {
  return requestClient.post<ContentAuthorRebuildFollowCountAllResponse>(
    '/api/admin/content/author/rebuild-follow-count-all',
  );
}

/**
 * 重建作者作品计数
 */
export async function contentAuthorRebuildWorkCountApi(
  params: ContentAuthorRebuildWorkCountRequest,
): Promise<ContentAuthorRebuildWorkCountResponse> {
  return requestClient.post<ContentAuthorRebuildWorkCountResponse>(
    '/api/admin/content/author/rebuild-work-count',
    params,
  );
}

/**
 * 全量重建作者作品计数
 */
export async function contentAuthorRebuildWorkCountAllApi(): Promise<ContentAuthorRebuildWorkCountAllResponse> {
  return requestClient.post<ContentAuthorRebuildWorkCountAllResponse>(
    '/api/admin/content/author/rebuild-work-count-all',
  );
}

/**
 * 删除作者
 */
export async function contentAuthorDeleteApi(
  params: ContentAuthorDeleteRequest,
): Promise<ContentAuthorDeleteResponse> {
  return requestClient.post<ContentAuthorDeleteResponse>(
    '/api/admin/content/author/delete',
    params,
  );
}

/**
 * 创建分类
 */
export async function contentCategoryCreateApi(
  params: ContentCategoryCreateRequest,
): Promise<ContentCategoryCreateResponse> {
  return requestClient.post<ContentCategoryCreateResponse>(
    '/api/admin/content/category/create',
    params,
  );
}

/**
 * 分页查询分类列表
 */
export async function contentCategoryPageApi(
  params?: ContentCategoryPageRequest,
): Promise<ContentCategoryPageResponse> {
  return requestClient.get<ContentCategoryPageResponse>(
    '/api/admin/content/category/page',
    { params },
  );
}

/**
 * 获取分类详情
 */
export async function contentCategoryDetailApi(
  params: ContentCategoryDetailRequest,
): Promise<ContentCategoryDetailResponse> {
  return requestClient.get<ContentCategoryDetailResponse>(
    '/api/admin/content/category/detail',
    { params },
  );
}

/**
 * 更新分类信息
 */
export async function contentCategoryUpdateApi(
  params: ContentCategoryUpdateRequest,
): Promise<ContentCategoryUpdateResponse> {
  return requestClient.post<ContentCategoryUpdateResponse>(
    '/api/admin/content/category/update',
    params,
  );
}

/**
 * 更新分类状态
 */
export async function contentCategoryUpdateStatusApi(
  params: ContentCategoryUpdateStatusRequest,
): Promise<ContentCategoryUpdateStatusResponse> {
  return requestClient.post<ContentCategoryUpdateStatusResponse>(
    '/api/admin/content/category/update-status',
    params,
  );
}

/**
 * 删除分类
 */
export async function contentCategoryDeleteApi(
  params: ContentCategoryDeleteRequest,
): Promise<ContentCategoryDeleteResponse> {
  return requestClient.post<ContentCategoryDeleteResponse>(
    '/api/admin/content/category/delete',
    params,
  );
}

/**
 * 分类交换排序
 */
export async function contentCategorySwapSortOrderApi(
  params: ContentCategorySwapSortOrderRequest,
): Promise<ContentCategorySwapSortOrderResponse> {
  return requestClient.post<ContentCategorySwapSortOrderResponse>(
    '/api/admin/content/category/swap-sort-order',
    params,
  );
}

/**
 * 创建标签
 */
export async function contentTagCreateApi(
  params: ContentTagCreateRequest,
): Promise<ContentTagCreateResponse> {
  return requestClient.post<ContentTagCreateResponse>(
    '/api/admin/content/tag/create',
    params,
  );
}

/**
 * 分页查询标签列表
 */
export async function contentTagPageApi(
  params?: ContentTagPageRequest,
): Promise<ContentTagPageResponse> {
  return requestClient.get<ContentTagPageResponse>(
    '/api/admin/content/tag/page',
    { params },
  );
}

/**
 * 获取标签详情
 */
export async function contentTagDetailApi(
  params: ContentTagDetailRequest,
): Promise<ContentTagDetailResponse> {
  return requestClient.get<ContentTagDetailResponse>(
    '/api/admin/content/tag/detail',
    { params },
  );
}

/**
 * 更新标签信息
 */
export async function contentTagUpdateApi(
  params: ContentTagUpdateRequest,
): Promise<ContentTagUpdateResponse> {
  return requestClient.post<ContentTagUpdateResponse>(
    '/api/admin/content/tag/update',
    params,
  );
}

/**
 * 更新标签状态
 */
export async function contentTagUpdateStatusApi(
  params: ContentTagUpdateStatusRequest,
): Promise<ContentTagUpdateStatusResponse> {
  return requestClient.post<ContentTagUpdateStatusResponse>(
    '/api/admin/content/tag/update-status',
    params,
  );
}

/**
 * 删除标签
 */
export async function contentTagDeleteApi(
  params: ContentTagDeleteRequest,
): Promise<ContentTagDeleteResponse> {
  return requestClient.post<ContentTagDeleteResponse>(
    '/api/admin/content/tag/delete',
    params,
  );
}

/**
 * 标签交换排序
 */
export async function contentTagSwapSortOrderApi(
  params: ContentTagSwapSortOrderRequest,
): Promise<ContentTagSwapSortOrderResponse> {
  return requestClient.post<ContentTagSwapSortOrderResponse>(
    '/api/admin/content/tag/swap-sort-order',
    params,
  );
}

/**
 * 分页查询表情包
 */
export async function contentEmojiPackPageApi(
  params?: ContentEmojiPackPageRequest,
): Promise<ContentEmojiPackPageResponse> {
  return requestClient.get<ContentEmojiPackPageResponse>(
    '/api/admin/content/emoji-pack/page',
    { params },
  );
}

/**
 * 查询表情包详情
 */
export async function contentEmojiPackDetailApi(
  params: ContentEmojiPackDetailRequest,
): Promise<ContentEmojiPackDetailResponse> {
  return requestClient.get<ContentEmojiPackDetailResponse>(
    '/api/admin/content/emoji-pack/detail',
    { params },
  );
}

/**
 * 创建表情包
 */
export async function contentEmojiPackCreateApi(
  params: ContentEmojiPackCreateRequest,
): Promise<ContentEmojiPackCreateResponse> {
  return requestClient.post<ContentEmojiPackCreateResponse>(
    '/api/admin/content/emoji-pack/create',
    params,
  );
}

/**
 * 更新表情包
 */
export async function contentEmojiPackUpdateApi(
  params: ContentEmojiPackUpdateRequest,
): Promise<ContentEmojiPackUpdateResponse> {
  return requestClient.post<ContentEmojiPackUpdateResponse>(
    '/api/admin/content/emoji-pack/update',
    params,
  );
}

/**
 * 删除表情包
 */
export async function contentEmojiPackDeleteApi(
  params: ContentEmojiPackDeleteRequest,
): Promise<ContentEmojiPackDeleteResponse> {
  return requestClient.post<ContentEmojiPackDeleteResponse>(
    '/api/admin/content/emoji-pack/delete',
    params,
  );
}

/**
 * 更新表情包启用状态
 */
export async function contentEmojiPackUpdateEnabledApi(
  params: ContentEmojiPackUpdateEnabledRequest,
): Promise<ContentEmojiPackUpdateEnabledResponse> {
  return requestClient.post<ContentEmojiPackUpdateEnabledResponse>(
    '/api/admin/content/emoji-pack/update-enabled',
    params,
  );
}

/**
 * 交换表情包排序
 */
export async function contentEmojiPackSwapSortOrderApi(
  params: ContentEmojiPackSwapSortOrderRequest,
): Promise<ContentEmojiPackSwapSortOrderResponse> {
  return requestClient.post<ContentEmojiPackSwapSortOrderResponse>(
    '/api/admin/content/emoji-pack/swap-sort-order',
    params,
  );
}

/**
 * 更新表情包场景类型
 */
export async function contentEmojiPackUpdateSceneTypeApi(
  params: ContentEmojiPackUpdateSceneTypeRequest,
): Promise<ContentEmojiPackUpdateSceneTypeResponse> {
  return requestClient.post<ContentEmojiPackUpdateSceneTypeResponse>(
    '/api/admin/content/emoji-pack/update-scene-type',
    params,
  );
}

/**
 * 分页查询表情资源
 */
export async function contentEmojiAssetPageApi(
  params?: ContentEmojiAssetPageRequest,
): Promise<ContentEmojiAssetPageResponse> {
  return requestClient.get<ContentEmojiAssetPageResponse>(
    '/api/admin/content/emoji-asset/page',
    { params },
  );
}

/**
 * 查询表情资源详情
 */
export async function contentEmojiAssetDetailApi(
  params: ContentEmojiAssetDetailRequest,
): Promise<ContentEmojiAssetDetailResponse> {
  return requestClient.get<ContentEmojiAssetDetailResponse>(
    '/api/admin/content/emoji-asset/detail',
    { params },
  );
}

/**
 * 创建表情资源
 */
export async function contentEmojiAssetCreateApi(
  params: ContentEmojiAssetCreateRequest,
): Promise<ContentEmojiAssetCreateResponse> {
  return requestClient.post<ContentEmojiAssetCreateResponse>(
    '/api/admin/content/emoji-asset/create',
    params,
  );
}

/**
 * 更新表情资源
 */
export async function contentEmojiAssetUpdateApi(
  params: ContentEmojiAssetUpdateRequest,
): Promise<ContentEmojiAssetUpdateResponse> {
  return requestClient.post<ContentEmojiAssetUpdateResponse>(
    '/api/admin/content/emoji-asset/update',
    params,
  );
}

/**
 * 删除表情资源
 */
export async function contentEmojiAssetDeleteApi(
  params: ContentEmojiAssetDeleteRequest,
): Promise<ContentEmojiAssetDeleteResponse> {
  return requestClient.post<ContentEmojiAssetDeleteResponse>(
    '/api/admin/content/emoji-asset/delete',
    params,
  );
}

/**
 * 更新表情资源启用状态
 */
export async function contentEmojiAssetUpdateEnabledApi(
  params: ContentEmojiAssetUpdateEnabledRequest,
): Promise<ContentEmojiAssetUpdateEnabledResponse> {
  return requestClient.post<ContentEmojiAssetUpdateEnabledResponse>(
    '/api/admin/content/emoji-asset/update-enabled',
    params,
  );
}

/**
 * 交换表情资源排序
 */
export async function contentEmojiAssetSwapSortOrderApi(
  params: ContentEmojiAssetSwapSortOrderRequest,
): Promise<ContentEmojiAssetSwapSortOrderResponse> {
  return requestClient.post<ContentEmojiAssetSwapSortOrderResponse>(
    '/api/admin/content/emoji-asset/swap-sort-order',
    params,
  );
}
