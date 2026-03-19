import type {
  NovelChapterCreateRequest,
  NovelChapterCreateResponse,
  NovelChapterDeleteRequest,
  NovelChapterDeleteResponse,
  NovelChapterDetailRequest,
  NovelChapterDetailResponse,
  NovelChapterPageRequest,
  NovelChapterPageResponse,
  NovelChapterSwapSortOrderRequest,
  NovelChapterSwapSortOrderResponse,
  NovelChapterUpdateRequest,
  NovelChapterUpdateResponse,
} from '../../types/content/novelChapter.d';

import { requestClient } from '#/api/request';

/**
 * 创建小说章节
 */
export async function novelChapterCreateApi(
  params: NovelChapterCreateRequest,
): Promise<NovelChapterCreateResponse> {
  return requestClient.post<NovelChapterCreateResponse>(
    '/api/admin/content/novel-chapter/create',
    params,
  );
}

/**
 * 分页查询小说章节列表
 */
export async function novelChapterPageApi(
  params: NovelChapterPageRequest,
): Promise<NovelChapterPageResponse> {
  return requestClient.get<NovelChapterPageResponse>(
    '/api/admin/content/novel-chapter/page',
    { params },
  );
}

/**
 * 获取小说章节详情
 */
export async function novelChapterDetailApi(
  params: NovelChapterDetailRequest,
): Promise<NovelChapterDetailResponse> {
  return requestClient.get<NovelChapterDetailResponse>(
    '/api/admin/content/novel-chapter/detail',
    { params },
  );
}

/**
 * 更新小说章节
 */
export async function novelChapterUpdateApi(
  params: NovelChapterUpdateRequest,
): Promise<NovelChapterUpdateResponse> {
  return requestClient.post<NovelChapterUpdateResponse>(
    '/api/admin/content/novel-chapter/update',
    params,
  );
}

/**
 * 删除小说章节
 */
export async function novelChapterDeleteApi(
  params: NovelChapterDeleteRequest,
): Promise<NovelChapterDeleteResponse> {
  return requestClient.post<NovelChapterDeleteResponse>(
    '/api/admin/content/novel-chapter/delete',
    params,
  );
}

/**
 * 交换章节序号
 */
export async function novelChapterSwapSortOrderApi(
  params: NovelChapterSwapSortOrderRequest,
): Promise<NovelChapterSwapSortOrderResponse> {
  return requestClient.post<NovelChapterSwapSortOrderResponse>(
    '/api/admin/content/novel-chapter/swap-sort-order',
    params,
  );
}
