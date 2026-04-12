import type {
  AppUpdateCreateRequest,
  AppUpdateCreateResponse,
  AppUpdateDetailRequest,
  AppUpdateDetailResponse,
  AppUpdatePageRequest,
  AppUpdatePageResponse,
  AppUpdateUpdateRequest,
  AppUpdateUpdateResponse,
  AppUpdateUpdateStatusRequest,
  AppUpdateUpdateStatusResponse
} from '../types/appUpdate.d'

import { requestClient } from '#/api/request'


  /**
   * 分页查询更新版本列表
   */
  export async function appUpdatePageApi(params?: AppUpdatePageRequest): Promise<AppUpdatePageResponse> {
    return requestClient.get<AppUpdatePageResponse>('/api/admin/app-update/page', { params });
  }


  /**
   * 获取更新版本详情
   */
  export async function appUpdateDetailApi(params: AppUpdateDetailRequest): Promise<AppUpdateDetailResponse> {
    return requestClient.get<AppUpdateDetailResponse>('/api/admin/app-update/detail', { params });
  }


  /**
   * 创建更新版本草稿
   */
  export async function appUpdateCreateApi(params: AppUpdateCreateRequest): Promise<AppUpdateCreateResponse> {
    return requestClient.post<AppUpdateCreateResponse>('/api/admin/app-update/create', params);
  }


  /**
   * 更新更新版本草稿
   */
  export async function appUpdateUpdateApi(params: AppUpdateUpdateRequest): Promise<AppUpdateUpdateResponse> {
    return requestClient.post<AppUpdateUpdateResponse>('/api/admin/app-update/update', params);
  }


  /**
   * 更新更新版本发布状态
   */
  export async function appUpdateUpdateStatusApi(params: AppUpdateUpdateStatusRequest): Promise<AppUpdateUpdateStatusResponse> {
    return requestClient.post<AppUpdateUpdateStatusResponse>('/api/admin/app-update/update-status', params);
  }
