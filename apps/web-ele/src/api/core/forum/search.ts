import type {
  SearchPageRequest,
  SearchPageResponse,
} from '../../types/forum/search.d';

import { requestClient } from '#/api/request';

/**
 * 分页搜索论坛主题与回复
 */
export async function searchPageApi(
  params: SearchPageRequest,
): Promise<SearchPageResponse> {
  return requestClient.get<SearchPageResponse>('/api/admin/forum/search/page', {
    params,
  });
}
