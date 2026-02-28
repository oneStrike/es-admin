import type {
  ChapterCreateRequest,
  ChapterCreateResponse,
  ChapterDeleteRequest,
  ChapterDeleteResponse,
  ChapterDetailRequest,
  ChapterDetailResponse,
  ChapterPageRequest,
  ChapterPageResponse,
  ChapterSwapSortOrderRequest,
  ChapterSwapSortOrderResponse,
  ChapterUpdateRequest,
  ChapterUpdateResponse,
} from '../../types/work/chapter.d';

import { requestClient } from '#/api/request';

/**
 * 创建作品章节
 */
export async function chapterCreateApi(
  params: ChapterCreateRequest,
): Promise<ChapterCreateResponse> {
  return requestClient.post<ChapterCreateResponse>(
    '/api/admin/work/chapter/create',
    params,
  );
}

/**
 * 分页查询作品章节列表
 */
export async function chapterPageApi(
  params: ChapterPageRequest,
): Promise<ChapterPageResponse> {
  return requestClient.get<ChapterPageResponse>(
    '/api/admin/work/chapter/page',
    { params },
  );
}

/**
 * 获取作品章节详情
 */
export async function chapterDetailApi(
  params: ChapterDetailRequest,
): Promise<ChapterDetailResponse> {
  return requestClient.get<ChapterDetailResponse>(
    '/api/admin/work/chapter/detail',
    { params },
  );
}

/**
 * 更新作品章节
 */
export async function chapterUpdateApi(
  params: ChapterUpdateRequest,
): Promise<ChapterUpdateResponse> {
  return requestClient.post<ChapterUpdateResponse>(
    '/api/admin/work/chapter/update',
    params,
  );
}

/**
 * 删除作品章节
 */
export async function chapterDeleteApi(
  params: ChapterDeleteRequest,
): Promise<ChapterDeleteResponse> {
  return requestClient.post<ChapterDeleteResponse>(
    '/api/admin/work/chapter/delete',
    params,
  );
}

/**
 * 交换章节序号
 */
export async function chapterSwapSortOrderApi(
  params: ChapterSwapSortOrderRequest,
): Promise<ChapterSwapSortOrderResponse> {
  return requestClient.post<ChapterSwapSortOrderResponse>(
    '/api/admin/work/chapter/swap-sort-order',
    params,
  );
}
