import type {
  ComicChapterCommentAuditRequest,
  ComicChapterCommentAuditResponse,
  ComicChapterCommentDeleteRequest,
  ComicChapterCommentDeleteResponse,
  ComicChapterCommentDetailRequest,
  ComicChapterCommentDetailResponse,
  ComicChapterCommentHideRequest,
  ComicChapterCommentHideResponse,
  ComicChapterCommentPageRequest,
  ComicChapterCommentPageResponse,
  ComicChapterCommentRecalcCountRequest,
  ComicChapterCommentRecalcCountResponse,
  ComicChapterCommentReportRequest,
  ComicChapterCommentReportResponse,
  ComicChapterCommentUpdateAuditRequest,
  ComicChapterCommentUpdateAuditResponse,
  ComicChapterCommentUpdateHiddenRequest,
  ComicChapterCommentUpdateHiddenResponse,
} from '../../types/work/comicChapterComment.d';

import { requestClient } from '#/api/request';

/**
 * 分页查询章节评论
 */
export async function comicChapterCommentPageApi(
  params?: ComicChapterCommentPageRequest,
): Promise<ComicChapterCommentPageResponse> {
  return requestClient.get<ComicChapterCommentPageResponse>(
    '/api/admin/work/comic-chapter-comment/page',
    { params },
  );
}

/**
 * 获取章节评论详情
 */
export async function comicChapterCommentDetailApi(
  params: ComicChapterCommentDetailRequest,
): Promise<ComicChapterCommentDetailResponse> {
  return requestClient.get<ComicChapterCommentDetailResponse>(
    '/api/admin/work/comic-chapter-comment/detail',
    { params },
  );
}

/**
 * 更新章节评论审核状态
 */
export async function comicChapterCommentUpdateAuditApi(
  params: ComicChapterCommentUpdateAuditRequest,
): Promise<ComicChapterCommentUpdateAuditResponse> {
  return requestClient.post<ComicChapterCommentUpdateAuditResponse>(
    '/api/admin/work/comic-chapter-comment/update-audit',
    params,
  );
}

/**
 * 审核章节评论
 */
export async function comicChapterCommentAuditApi(
  params: ComicChapterCommentAuditRequest,
): Promise<ComicChapterCommentAuditResponse> {
  return requestClient.post<ComicChapterCommentAuditResponse>(
    '/api/admin/work/comic-chapter-comment/audit',
    params,
  );
}

/**
 * 更新章节评论隐藏状态
 */
export async function comicChapterCommentUpdateHiddenApi(
  params: ComicChapterCommentUpdateHiddenRequest,
): Promise<ComicChapterCommentUpdateHiddenResponse> {
  return requestClient.post<ComicChapterCommentUpdateHiddenResponse>(
    '/api/admin/work/comic-chapter-comment/update-hidden',
    params,
  );
}

/**
 * 隐藏章节评论
 */
export async function comicChapterCommentHideApi(
  params: ComicChapterCommentHideRequest,
): Promise<ComicChapterCommentHideResponse> {
  return requestClient.post<ComicChapterCommentHideResponse>(
    '/api/admin/work/comic-chapter-comment/hide',
    params,
  );
}

/**
 * 删除章节评论
 */
export async function comicChapterCommentDeleteApi(
  params: ComicChapterCommentDeleteRequest,
): Promise<ComicChapterCommentDeleteResponse> {
  return requestClient.post<ComicChapterCommentDeleteResponse>(
    '/api/admin/work/comic-chapter-comment/delete',
    params,
  );
}

/**
 * 重算章节评论数
 */
export async function comicChapterCommentRecalcCountApi(
  params: ComicChapterCommentRecalcCountRequest,
): Promise<ComicChapterCommentRecalcCountResponse> {
  return requestClient.post<ComicChapterCommentRecalcCountResponse>(
    '/api/admin/work/comic-chapter-comment/recalc-count',
    params,
  );
}

/**
 * 处理章节评论举报
 */
export async function comicChapterCommentReportApi(
  params: ComicChapterCommentReportRequest,
): Promise<ComicChapterCommentReportResponse> {
  return requestClient.post<ComicChapterCommentReportResponse>(
    '/api/admin/work/comic-chapter-comment/report',
    params,
  );
}
