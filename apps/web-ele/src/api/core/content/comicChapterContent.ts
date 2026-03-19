import type {
  ComicChapterContentClearRequest,
  ComicChapterContentClearResponse,
  ComicChapterContentDeleteRequest,
  ComicChapterContentDeleteResponse,
  ComicChapterContentListRequest,
  ComicChapterContentListResponse,
  ComicChapterContentMoveRequest,
  ComicChapterContentMoveResponse,
  ComicChapterContentUpdateRequest,
  ComicChapterContentUpdateResponse,
  ComicChapterContentUploadRequest,
  ComicChapterContentUploadResponse
} from '../../types/content/comicChapterContent.d'

import { requestClient } from '#/api/request'


  /**
   * 获取章节内容
   */
  export async function comicChapterContentListApi(params: ComicChapterContentListRequest): Promise<ComicChapterContentListResponse> {
    return requestClient.get<ComicChapterContentListResponse>('/api/admin/content/comic-chapter-content/list', { params });
  }


  /**
   * 上传章节内容
   */
  export async function comicChapterContentUploadApi(params: ComicChapterContentUploadRequest): Promise<ComicChapterContentUploadResponse> {
    return requestClient.post<ComicChapterContentUploadResponse>('/api/admin/content/comic-chapter-content/upload', params);
  }


  /**
   * 更新章节内容
   */
  export async function comicChapterContentUpdateApi(params: ComicChapterContentUpdateRequest): Promise<ComicChapterContentUpdateResponse> {
    return requestClient.post<ComicChapterContentUpdateResponse>('/api/admin/content/comic-chapter-content/update', params);
  }


  /**
   * 删除章节内容
   */
  export async function comicChapterContentDeleteApi(params: ComicChapterContentDeleteRequest): Promise<ComicChapterContentDeleteResponse> {
    return requestClient.post<ComicChapterContentDeleteResponse>('/api/admin/content/comic-chapter-content/delete', params);
  }


  /**
   * 移动章节内容
   */
  export async function comicChapterContentMoveApi(params: ComicChapterContentMoveRequest): Promise<ComicChapterContentMoveResponse> {
    return requestClient.post<ComicChapterContentMoveResponse>('/api/admin/content/comic-chapter-content/move', params);
  }


  /**
   * 清空章节内容
   */
  export async function comicChapterContentClearApi(params: ComicChapterContentClearRequest): Promise<ComicChapterContentClearResponse> {
    return requestClient.post<ComicChapterContentClearResponse>('/api/admin/content/comic-chapter-content/clear', params);
  }
