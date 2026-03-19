import type {
  NovelChapterContentDeleteRequest,
  NovelChapterContentDeleteResponse,
  NovelChapterContentDetailRequest,
  NovelChapterContentDetailResponse,
  NovelChapterContentUploadRequest,
  NovelChapterContentUploadResponse
} from '../../types/content/novelChapterContent.d'

import { requestClient } from '#/api/request'


  /**
   * 获取章节内容
   */
  export async function novelChapterContentDetailApi(params: NovelChapterContentDetailRequest): Promise<NovelChapterContentDetailResponse> {
    return requestClient.get<NovelChapterContentDetailResponse>('/api/admin/content/novel-chapter-content/detail', { params });
  }


  /**
   * 上传章节文件
   */
  export async function novelChapterContentUploadApi(params: NovelChapterContentUploadRequest): Promise<NovelChapterContentUploadResponse> {
    return requestClient.post<NovelChapterContentUploadResponse>('/api/admin/content/novel-chapter-content/upload', params);
  }


  /**
   * 删除章节文件
   */
  export async function novelChapterContentDeleteApi(params: NovelChapterContentDeleteRequest): Promise<NovelChapterContentDeleteResponse> {
    return requestClient.post<NovelChapterContentDeleteResponse>('/api/admin/content/novel-chapter-content/delete', params);
  }
