import { requestClient } from '#/utils/request'
import type {
  NoticeCreateRequest,
  NoticeCreateResponse,
  NoticePageRequest,
  NoticePageResponse,
  NoticeDetailRequest,
  NoticeDetailResponse,
  NoticeUpdateRequest,
  NoticeUpdateResponse,
  NoticeUpdateStatusRequest,
  NoticeUpdateStatusResponse,
  NoticeDeleteRequest,
  NoticeDeleteResponse,
  CreateNoticeDto,
  IdDto,
  NoticePageResponseDto,
  BaseNoticeDto,
  UpdateNoticeDto,
  UpdateNoticeStatusDto,
  BatchOperationResponseDto
} from './types/notice.d'


  /**
   * 创建通知消息
   */
  export async function noticeCreateApi(params: NoticeCreateRequest): Promise<NoticeCreateResponse> {
    return requestClient.post<NoticeCreateResponse>('/api/admin/notice/create', params);
  }


  /**
   * 分页查询通知列表
   */
  export async function noticePageApi(params?: NoticePageRequest): Promise<NoticePageResponse> {
    return requestClient.get<NoticePageResponse>('/api/admin/notice/page', { params });
  }


  /**
   * 根据ID查询通知详情
   */
  export async function noticeDetailApi(params: NoticeDetailRequest): Promise<NoticeDetailResponse> {
    return requestClient.get<NoticeDetailResponse>('/api/admin/notice/detail', { params });
  }


  /**
   * 更新通知消息
   */
  export async function noticeUpdateApi(params: NoticeUpdateRequest): Promise<NoticeUpdateResponse> {
    return requestClient.post<NoticeUpdateResponse>('/api/admin/notice/update', params);
  }


  /**
   * 更新通知状态
   */
  export async function noticeUpdateStatusApi(params: NoticeUpdateStatusRequest): Promise<NoticeUpdateStatusResponse> {
    return requestClient.post<NoticeUpdateStatusResponse>('/api/admin/notice/update-status', params);
  }


  /**
   * 删除通知
   */
  export async function noticeDeleteApi(params: NoticeDeleteRequest): Promise<NoticeDeleteResponse> {
    return requestClient.post<NoticeDeleteResponse>('/api/admin/notice/delete', params);
  }
