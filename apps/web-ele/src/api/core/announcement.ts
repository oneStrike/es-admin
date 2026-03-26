import { requestClient } from '#/api/request'
import type {
  AnnouncementCreateRequest,
  AnnouncementCreateResponse,
  AnnouncementPageRequest,
  AnnouncementPageResponse,
  AnnouncementDetailRequest,
  AnnouncementDetailResponse,
  AnnouncementUpdateRequest,
  AnnouncementUpdateResponse,
  AnnouncementUpdateStatusRequest,
  AnnouncementUpdateStatusResponse,
  AnnouncementDeleteRequest,
  AnnouncementDeleteResponse
} from '../types/announcement.d'


  /**
   * 创建公告
   */
  export async function announcementCreateApi(params: AnnouncementCreateRequest): Promise<AnnouncementCreateResponse> {
    return requestClient.post<AnnouncementCreateResponse>('/api/admin/announcement/create', params);
  }


  /**
   * 分页查询公告列表
   */
  export async function announcementPageApi(params?: AnnouncementPageRequest): Promise<AnnouncementPageResponse> {
    return requestClient.get<AnnouncementPageResponse>('/api/admin/announcement/page', { params });
  }


  /**
   * 公告详情
   */
  export async function announcementDetailApi(params: AnnouncementDetailRequest): Promise<AnnouncementDetailResponse> {
    return requestClient.get<AnnouncementDetailResponse>('/api/admin/announcement/detail', { params });
  }


  /**
   * 更新公告
   */
  export async function announcementUpdateApi(params: AnnouncementUpdateRequest): Promise<AnnouncementUpdateResponse> {
    return requestClient.post<AnnouncementUpdateResponse>('/api/admin/announcement/update', params);
  }


  /**
   * 更新公告状态
   */
  export async function announcementUpdateStatusApi(params: AnnouncementUpdateStatusRequest): Promise<AnnouncementUpdateStatusResponse> {
    return requestClient.post<AnnouncementUpdateStatusResponse>('/api/admin/announcement/update-status', params);
  }


  /**
   * 下线公告
   */
  export async function announcementDeleteApi(params: AnnouncementDeleteRequest): Promise<AnnouncementDeleteResponse> {
    return requestClient.post<AnnouncementDeleteResponse>('/api/admin/announcement/delete', params);
  }
