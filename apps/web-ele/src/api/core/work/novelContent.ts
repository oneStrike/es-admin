import type {
  NovelContentAddRequest,
  NovelContentAddResponse,
  NovelContentDeleteRequest,
  NovelContentDeleteResponse,
  NovelContentListRequest,
  NovelContentListResponse,
} from '../../types/work/novelContent.d';

import { requestClient } from '#/api/request';

/**
 * 获取小说章节内容
 */
export async function novelContentListApi(
  params: NovelContentListRequest,
): Promise<NovelContentListResponse> {
  return requestClient.get<NovelContentListResponse>(
    '/api/admin/work/content/novel-content/list',
    { params },
  );
}

/**
 * 上传小说章节文本文件
 */
export async function novelContentAddApi(
  params: NovelContentAddRequest,
): Promise<NovelContentAddResponse> {
  return requestClient.post<NovelContentAddResponse>(
    '/api/admin/work/content/novel-content/add',
    params,
  );
}

/**
 * 删除小说章节内容
 */
export async function novelContentDeleteApi(
  params: NovelContentDeleteRequest,
): Promise<NovelContentDeleteResponse> {
  return requestClient.post<NovelContentDeleteResponse>(
    '/api/admin/work/content/novel-content/delete',
    params,
  );
}
