import type {
  ComicContentAddRequest,
  ComicContentAddResponse,
  ComicContentClearRequest,
  ComicContentClearResponse,
  ComicContentDeleteRequest,
  ComicContentDeleteResponse,
  ComicContentListRequest,
  ComicContentListResponse,
  ComicContentMoveRequest,
  ComicContentMoveResponse,
  ComicContentUpdateRequest,
  ComicContentUpdateResponse,
} from '../../types/work/comicContent.d';

import { requestClient } from '#/api/request';

/**
 * 获取漫画章节内容
 */
export async function comicContentListApi(
  params: ComicContentListRequest,
): Promise<ComicContentListResponse> {
  return requestClient.get<ComicContentListResponse>(
    '/api/admin/work/content/comic-content/list',
    { params },
  );
}

/**
 * 上传漫画章节图片
 */
export async function comicContentAddApi(
  params: ComicContentAddRequest,
): Promise<ComicContentAddResponse> {
  return requestClient.post<ComicContentAddResponse>(
    '/api/admin/work/content/comic-content/add',
    params,
  );
}

/**
 * 更新漫画章节图片
 */
export async function comicContentUpdateApi(
  params: ComicContentUpdateRequest,
): Promise<ComicContentUpdateResponse> {
  return requestClient.post<ComicContentUpdateResponse>(
    '/api/admin/work/content/comic-content/update',
    params,
  );
}

/**
 * 删除漫画章节图片
 */
export async function comicContentDeleteApi(
  params: ComicContentDeleteRequest,
): Promise<ComicContentDeleteResponse> {
  return requestClient.post<ComicContentDeleteResponse>(
    '/api/admin/work/content/comic-content/delete',
    params,
  );
}

/**
 * 移动漫画章节图片
 */
export async function comicContentMoveApi(
  params: ComicContentMoveRequest,
): Promise<ComicContentMoveResponse> {
  return requestClient.post<ComicContentMoveResponse>(
    '/api/admin/work/content/comic-content/move',
    params,
  );
}

/**
 * 清空漫画章节所有图片
 */
export async function comicContentClearApi(
  params: ComicContentClearRequest,
): Promise<ComicContentClearResponse> {
  return requestClient.post<ComicContentClearResponse>(
    '/api/admin/work/content/comic-content/clear',
    params,
  );
}
