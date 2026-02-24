import type {
  ReportHandleRequest,
  ReportHandleResponse,
  ReportPageRequest,
  ReportPageResponse,
} from '../../types/work/report.d';

import { requestClient } from '#/api/request';

/**
 * 分页查询章节评论举报
 */
export async function reportPageApi(
  params?: ReportPageRequest,
): Promise<ReportPageResponse> {
  return requestClient.get<ReportPageResponse>(
    '/api/admin/work/comic-chapter-comment/report/page',
    { params },
  );
}

/**
 * 处理章节评论举报
 */
export async function reportHandleApi(
  params: ReportHandleRequest,
): Promise<ReportHandleResponse> {
  return requestClient.post<ReportHandleResponse>(
    '/api/admin/work/comic-chapter-comment/report/handle',
    params,
  );
}
