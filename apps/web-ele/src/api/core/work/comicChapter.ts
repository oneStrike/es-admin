import type {
  ComicChapterCreateRequest,
  ComicChapterCreateResponse,
  ComicChapterDeleteRequest,
  ComicChapterDeleteResponse,
  ComicChapterDetailRequest,
  ComicChapterDetailResponse,
  ComicChapterPageRequest,
  ComicChapterPageResponse,
  ComicChapterSwapSortOrderRequest,
  ComicChapterSwapSortOrderResponse,
  ComicChapterUpdateRequest,
  ComicChapterUpdateResponse,
} from '../../types/work/comicChapter.d';

import { requestClient } from '#/api/request';

/**
 * 创建漫画章节
 */
export async function comicChapterCreateApi(
  params: ComicChapterCreateRequest,
): Promise<ComicChapterCreateResponse> {
  return requestClient.post<ComicChapterCreateResponse>(
    '/api/admin/work/comic-chapter/create',
    params,
  );
}

/**
 * 分页查询漫画章节列表
 */
export async function comicChapterPageApi(
  params?: ComicChapterPageRequest,
): Promise<ComicChapterPageResponse> {
  return requestClient.get<ComicChapterPageResponse>(
    '/api/admin/work/comic-chapter/page',
    { params },
  );
}

/**
 * 获取漫画章节详情
 */
export async function comicChapterDetailApi(
  params: ComicChapterDetailRequest,
): Promise<ComicChapterDetailResponse> {
  return requestClient.get<ComicChapterDetailResponse>(
    '/api/admin/work/comic-chapter/detail',
    { params },
  );
}

/**
 * 更新漫画章节
 */
export async function comicChapterUpdateApi(
  params: ComicChapterUpdateRequest,
): Promise<ComicChapterUpdateResponse> {
  return requestClient.post<ComicChapterUpdateResponse>(
    '/api/admin/work/comic-chapter/update',
    params,
  );
}

/**
 * 删除漫画章节
 */
export async function comicChapterDeleteApi(
  params: ComicChapterDeleteRequest,
): Promise<ComicChapterDeleteResponse> {
  return requestClient.post<ComicChapterDeleteResponse>(
    '/api/admin/work/comic-chapter/delete',
    params,
  );
}

/**
 * 交换章节序号
 */
export async function comicChapterSwapSortOrderApi(
  params: ComicChapterSwapSortOrderRequest,
): Promise<ComicChapterSwapSortOrderResponse> {
  return requestClient.post<ComicChapterSwapSortOrderResponse>(
    '/api/admin/work/comic-chapter/swap-sort-order',
    params,
  );
}
