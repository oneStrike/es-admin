import type {
  SystemUserCreateRequest,
  SystemUserCreateResponse,
  SystemUserDetailRequest,
  SystemUserDetailResponse,
  SystemUserPageRequest,
  SystemUserPageResponse,
  SystemUserPasswordChangeRequest,
  SystemUserPasswordChangeResponse,
  SystemUserPasswordResetRequest,
  SystemUserPasswordResetResponse,
  SystemUserProfileResponse,
  SystemUserProfileUpdateRequest,
  SystemUserProfileUpdateResponse,
  SystemUserUnlockRequest,
  SystemUserUnlockResponse
} from '../types/systemUser.d'

import { requestClient } from '#/api/request'


  /**
   * 用户注册
   */
  export async function systemUserCreateApi(params: SystemUserCreateRequest): Promise<SystemUserCreateResponse> {
    return requestClient.post<SystemUserCreateResponse>('/api/admin/system-user/create', params);
  }


  /**
   * 更新用户信息
   */
  export async function systemUserProfileUpdateApi(params: SystemUserProfileUpdateRequest): Promise<SystemUserProfileUpdateResponse> {
    return requestClient.post<SystemUserProfileUpdateResponse>('/api/admin/system-user/profile/update', params);
  }


  /**
   * 获取当前用户信息
   */
  export async function systemUserProfileApi(): Promise<SystemUserProfileResponse> {
    return requestClient.get<SystemUserProfileResponse>('/api/admin/system-user/profile');
  }


  /**
   * 根据ID获取用户信息
   */
  export async function systemUserDetailApi(params: SystemUserDetailRequest): Promise<SystemUserDetailResponse> {
    return requestClient.get<SystemUserDetailResponse>('/api/admin/system-user/detail', { params });
  }


  /**
   * 获取管理端用户分页列表
   */
  export async function systemUserPageApi(params?: SystemUserPageRequest): Promise<SystemUserPageResponse> {
    return requestClient.get<SystemUserPageResponse>('/api/admin/system-user/page', { params });
  }


  /**
   * 修改密码
   */
  export async function systemUserPasswordChangeApi(params: SystemUserPasswordChangeRequest): Promise<SystemUserPasswordChangeResponse> {
    return requestClient.post<SystemUserPasswordChangeResponse>('/api/admin/system-user/password/change', params);
  }


  /**
   * 重置用户密码为默认密码
   */
  export async function systemUserPasswordResetApi(params: SystemUserPasswordResetRequest): Promise<SystemUserPasswordResetResponse> {
    return requestClient.post<SystemUserPasswordResetResponse>('/api/admin/system-user/password/reset', params);
  }


  /**
   * 解锁指定用户的锁定状态
   */
  export async function systemUserUnlockApi(params: SystemUserUnlockRequest): Promise<SystemUserUnlockResponse> {
    return requestClient.post<SystemUserUnlockResponse>('/api/admin/system-user/unlock', params);
  }
