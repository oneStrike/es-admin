import type {
  ChapterContentAddResponse,
  ChapterContentClearRequest,
  ChapterContentClearResponse,
  ChapterContentDeleteResponse,
  ChapterContentListRequest,
  ChapterContentListResponse,
  ChapterContentMoveResponse,
  ChapterContentUpdateResponse,
} from '../../types/work/chapterContent.d';

import { requestClient } from '#/api/request';

/**
 * 获取章节内容
 */
export async function chapterContentListApi(
  params: ChapterContentListRequest,
): Promise<ChapterContentListResponse> {
  return requestClient.get<ChapterContentListResponse>(
    '/api/admin/work/chapter-content/list',
    { params },
  );
}

/**
 * 添加章节内容
 */
export async function chapterContentAddApi(): Promise<ChapterContentAddResponse> {
  return requestClient.post<ChapterContentAddResponse>(
    '/api/admin/work/chapter-content/add',
  );
}

/**
 * 更新章节内容
 */
export async function chapterContentUpdateApi(): Promise<ChapterContentUpdateResponse> {
  return requestClient.post<ChapterContentUpdateResponse>(
    '/api/admin/work/chapter-content/update',
  );
}

/**
 * 删除章节内容
 */
export async function chapterContentDeleteApi(): Promise<ChapterContentDeleteResponse> {
  return requestClient.post<ChapterContentDeleteResponse>(
    '/api/admin/work/chapter-content/delete',
  );
}

/**
 * 移动章节内容
 */
export async function chapterContentMoveApi(): Promise<ChapterContentMoveResponse> {
  return requestClient.post<ChapterContentMoveResponse>(
    '/api/admin/work/chapter-content/move',
  );
}

/**
 * 清空章节内容
 */
export async function chapterContentClearApi(
  params: ChapterContentClearRequest,
): Promise<ChapterContentClearResponse> {
  return requestClient.post<ChapterContentClearResponse>(
    '/api/admin/work/chapter-content/clear',
    params,
  );
}
