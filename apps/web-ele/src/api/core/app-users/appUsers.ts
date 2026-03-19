import type {
  AppUsersCreateRequest,
  AppUsersCreateResponse,
  AppUsersDeleteRequest,
  AppUsersDeleteResponse,
  AppUsersDetailRequest,
  AppUsersDetailResponse,
  AppUsersPageRequest,
  AppUsersPageResponse,
  AppUsersRestoreRequest,
  AppUsersRestoreResponse,
  AppUsersUpdateEnabledRequest,
  AppUsersUpdateEnabledResponse,
  AppUsersUpdateStatusRequest,
  AppUsersUpdateStatusResponse
} from '../../types/app-users/appUsers.d'

import { requestClient } from '#/api/request'


  /**
   * 分页查询 APP 用户列表
   */
  export async function appUsersPageApi(params?: AppUsersPageRequest): Promise<AppUsersPageResponse> {
    return requestClient.get<AppUsersPageResponse>('/api/admin/app-users/page', { params });
  }


  /**
   * 获取 APP 用户详情
   */
  export async function appUsersDetailApi(params: AppUsersDetailRequest): Promise<AppUsersDetailResponse> {
    return requestClient.get<AppUsersDetailResponse>('/api/admin/app-users/detail', { params });
  }


  /**
   * 新建 APP 用户
   */
  export async function appUsersCreateApi(params: AppUsersCreateRequest): Promise<AppUsersCreateResponse> {
    return requestClient.post<AppUsersCreateResponse>('/api/admin/app-users/create', params);
  }


  /**
   * 更新 APP 用户启用状态
   */
  export async function appUsersUpdateEnabledApi(params: AppUsersUpdateEnabledRequest): Promise<AppUsersUpdateEnabledResponse> {
    return requestClient.post<AppUsersUpdateEnabledResponse>('/api/admin/app-users/update-enabled', params);
  }


  /**
   * 更新 APP 用户社区状态
   */
  export async function appUsersUpdateStatusApi(params: AppUsersUpdateStatusRequest): Promise<AppUsersUpdateStatusResponse> {
    return requestClient.post<AppUsersUpdateStatusResponse>('/api/admin/app-users/update-status', params);
  }


  /**
   * 删除 APP 用户
   */
  export async function appUsersDeleteApi(params: AppUsersDeleteRequest): Promise<AppUsersDeleteResponse> {
    return requestClient.post<AppUsersDeleteResponse>('/api/admin/app-users/delete', params);
  }


  /**
   * 恢复 APP 用户
   */
  export async function appUsersRestoreApi(params: AppUsersRestoreRequest): Promise<AppUsersRestoreResponse> {
    return requestClient.post<AppUsersRestoreResponse>('/api/admin/app-users/restore', params);
  }
