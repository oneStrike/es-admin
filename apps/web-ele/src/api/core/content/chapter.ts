import type {
  ChapterListRequest,
  ChapterListResponse
} from '../../types/content/chapter.d'

import { requestClient } from '#/api/request'


  /**
   * 获取第三方平台漫画章节列表
   */
  export async function chapterListApi(params: ChapterListRequest): Promise<ChapterListResponse> {
    return requestClient.get<ChapterListResponse>('/api/admin/content/comic/third-party/chapter/list', { params });
  }
