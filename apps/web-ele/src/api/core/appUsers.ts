import type {
  AppUsersBadgesAssignRequest,
  AppUsersBadgesAssignResponse,
  AppUsersBadgesPageRequest,
  AppUsersBadgesPageResponse,
  AppUsersBadgesRevokeRequest,
  AppUsersBadgesRevokeResponse,
  AppUsersCreateRequest,
  AppUsersCreateResponse,
  AppUsersDeleteRequest,
  AppUsersDeleteResponse,
  AppUsersDetailRequest,
  AppUsersDetailResponse,
  AppUsersExperienceGrantRequest,
  AppUsersExperienceGrantResponse,
  AppUsersExperienceRecordPageRequest,
  AppUsersExperienceRecordPageResponse,
  AppUsersExperienceStatsRequest,
  AppUsersExperienceStatsResponse,
  AppUsersPageRequest,
  AppUsersPageResponse,
  AppUsersPasswordResetRequest,
  AppUsersPasswordResetResponse,
  AppUsersPointsConsumeRequest,
  AppUsersPointsConsumeResponse,
  AppUsersPointsGrantRequest,
  AppUsersPointsGrantResponse,
  AppUsersPointsRecordPageRequest,
  AppUsersPointsRecordPageResponse,
  AppUsersPointsStatsRequest,
  AppUsersPointsStatsResponse,
  AppUsersProfileUpdateRequest,
  AppUsersProfileUpdateResponse,
  AppUsersRebuildFollowCountAllResponse,
  AppUsersRebuildFollowCountRequest,
  AppUsersRebuildFollowCountResponse,
  AppUsersRestoreRequest,
  AppUsersRestoreResponse,
  AppUsersUpdateEnabledRequest,
  AppUsersUpdateEnabledResponse,
  AppUsersUpdateStatusRequest,
  AppUsersUpdateStatusResponse
} from '../types/appUsers.d'

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
   * 更新 APP 用户资料
   */
  export async function appUsersProfileUpdateApi(params: AppUsersProfileUpdateRequest): Promise<AppUsersProfileUpdateResponse> {
    return requestClient.post<AppUsersProfileUpdateResponse>('/api/admin/app-users/profile/update', params);
  }


  /**
   * 更新 APP 用户启用状态
   */
  export async function appUsersUpdateEnabledApi(params: AppUsersUpdateEnabledRequest): Promise<AppUsersUpdateEnabledResponse> {
    return requestClient.post<AppUsersUpdateEnabledResponse>('/api/admin/app-users/update-enabled', params);
  }


  /**
   * 更新 APP 用户状态
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


  /**
   * 重置 APP 用户密码
   */
  export async function appUsersPasswordResetApi(params: AppUsersPasswordResetRequest): Promise<AppUsersPasswordResetResponse> {
    return requestClient.post<AppUsersPasswordResetResponse>('/api/admin/app-users/password/reset', params);
  }


  /**
   * 获取 APP 用户积分统计
   */
  export async function appUsersPointsStatsApi(params: AppUsersPointsStatsRequest): Promise<AppUsersPointsStatsResponse> {
    return requestClient.get<AppUsersPointsStatsResponse>('/api/admin/app-users/points/stats', { params });
  }


  /**
   * 分页查询 APP 用户积分记录
   */
  export async function appUsersPointsRecordPageApi(params: AppUsersPointsRecordPageRequest): Promise<AppUsersPointsRecordPageResponse> {
    return requestClient.get<AppUsersPointsRecordPageResponse>('/api/admin/app-users/points/record/page', { params });
  }


  /**
   * 手动增加 APP 用户积分
   */
  export async function appUsersPointsGrantApi(params: AppUsersPointsGrantRequest): Promise<AppUsersPointsGrantResponse> {
    return requestClient.post<AppUsersPointsGrantResponse>('/api/admin/app-users/points/grant', params);
  }


  /**
   * 手动扣减 APP 用户积分
   */
  export async function appUsersPointsConsumeApi(params: AppUsersPointsConsumeRequest): Promise<AppUsersPointsConsumeResponse> {
    return requestClient.post<AppUsersPointsConsumeResponse>('/api/admin/app-users/points/consume', params);
  }


  /**
   * 获取 APP 用户经验统计
   */
  export async function appUsersExperienceStatsApi(params: AppUsersExperienceStatsRequest): Promise<AppUsersExperienceStatsResponse> {
    return requestClient.get<AppUsersExperienceStatsResponse>('/api/admin/app-users/experience/stats', { params });
  }


  /**
   * 分页查询 APP 用户经验记录
   */
  export async function appUsersExperienceRecordPageApi(params: AppUsersExperienceRecordPageRequest): Promise<AppUsersExperienceRecordPageResponse> {
    return requestClient.get<AppUsersExperienceRecordPageResponse>('/api/admin/app-users/experience/record/page', { params });
  }


  /**
   * 手动增加 APP 用户经验
   */
  export async function appUsersExperienceGrantApi(params: AppUsersExperienceGrantRequest): Promise<AppUsersExperienceGrantResponse> {
    return requestClient.post<AppUsersExperienceGrantResponse>('/api/admin/app-users/experience/grant', params);
  }


  /**
   * 分页查询 APP 用户徽章
   */
  export async function appUsersBadgesPageApi(params: AppUsersBadgesPageRequest): Promise<AppUsersBadgesPageResponse> {
    return requestClient.get<AppUsersBadgesPageResponse>('/api/admin/app-users/badges/page', { params });
  }


  /**
   * 重建 APP 用户关注计数
   */
  export async function appUsersRebuildFollowCountApi(params: AppUsersRebuildFollowCountRequest): Promise<AppUsersRebuildFollowCountResponse> {
    return requestClient.post<AppUsersRebuildFollowCountResponse>('/api/admin/app-users/rebuild-follow-count', params);
  }


  /**
   * 为 APP 用户分配徽章
   */
  export async function appUsersBadgesAssignApi(params: AppUsersBadgesAssignRequest): Promise<AppUsersBadgesAssignResponse> {
    return requestClient.post<AppUsersBadgesAssignResponse>('/api/admin/app-users/badges/assign', params);
  }


  /**
   * 全量重建 APP 用户关注计数
   */
  export async function appUsersRebuildFollowCountAllApi(): Promise<AppUsersRebuildFollowCountAllResponse> {
    return requestClient.post<AppUsersRebuildFollowCountAllResponse>('/api/admin/app-users/rebuild-follow-count-all');
  }


  /**
   * 撤销 APP 用户徽章
   */
  export async function appUsersBadgesRevokeApi(params: AppUsersBadgesRevokeRequest): Promise<AppUsersBadgesRevokeResponse> {
    return requestClient.post<AppUsersBadgesRevokeResponse>('/api/admin/app-users/badges/revoke', params);
  }
