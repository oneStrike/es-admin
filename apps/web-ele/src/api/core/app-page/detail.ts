import type {
  DetailCodeRequest,
  DetailCodeResponse,
} from '../../types/app-page/detail.d';

import { requestClient } from '#/api/request';

/**
 * 根据页面编码查询页面配置详情
 */
export async function detailCodeApi(
  params: DetailCodeRequest,
): Promise<DetailCodeResponse> {
  return requestClient.get<DetailCodeResponse>(
    '/api/admin/app-page/detail/code',
    { params },
  );
}
