import type { ChapterContentDetailRequest } from '../../types/content/chapterContent.d';

import { requestClient } from '#/api/request';

/**
 * 获取第三方平台漫画章节内容
 */
export async function chapterContentDetailApi(
  params: ChapterContentDetailRequest,
): Promise<ChapterContentDetailResponse> {
  return requestClient.get<ChapterContentDetailResponse>(
    '/api/admin/content/comic/third-party/chapter-content/detail',
    { params },
  );
}
