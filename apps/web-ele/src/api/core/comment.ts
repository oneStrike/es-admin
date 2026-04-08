import type {
  CommentDetailRequest,
  CommentDetailResponse,
  CommentPageRequest,
  CommentPageResponse,
  CommentUpdateAuditStatusRequest,
  CommentUpdateAuditStatusResponse,
  CommentUpdateHiddenRequest,
  CommentUpdateHiddenResponse
} from '../types/comment.d'

import { requestClient } from '#/api/request'


  /**
   * 分页查询评论记录
   */
  export async function commentPageApi(params?: CommentPageRequest): Promise<CommentPageResponse> {
    return requestClient.get<CommentPageResponse>('/api/admin/comment/page', { params });
  }


  /**
   * 获取评论详情
   */
  export async function commentDetailApi(params: CommentDetailRequest): Promise<CommentDetailResponse> {
    return requestClient.get<CommentDetailResponse>('/api/admin/comment/detail', { params });
  }


  /**
   * 更新评论审核状态
   */
  export async function commentUpdateAuditStatusApi(params: CommentUpdateAuditStatusRequest): Promise<CommentUpdateAuditStatusResponse> {
    return requestClient.post<CommentUpdateAuditStatusResponse>('/api/admin/comment/update-audit-status', params);
  }


  /**
   * 更新评论隐藏状态
   */
  export async function commentUpdateHiddenApi(params: CommentUpdateHiddenRequest): Promise<CommentUpdateHiddenResponse> {
    return requestClient.post<CommentUpdateHiddenResponse>('/api/admin/comment/update-hidden', params);
  }
