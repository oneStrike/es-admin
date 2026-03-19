import type {
  BadgesAssignRequest,
  BadgesAssignResponse,
  BadgesPageRequest,
  BadgesPageResponse,
  BadgesRevokeRequest,
  BadgesRevokeResponse
} from '../../types/app-users/badges.d'

import { requestClient } from '#/api/request'


  /**
   * 分页查询 APP 用户徽章
   */
  export async function badgesPageApi(params: BadgesPageRequest): Promise<BadgesPageResponse> {
    return requestClient.get<BadgesPageResponse>('/api/admin/app-users/badges/page', { params });
  }


  /**
   * 为 APP 用户分配徽章
   */
  export async function badgesAssignApi(params: BadgesAssignRequest): Promise<BadgesAssignResponse> {
    return requestClient.post<BadgesAssignResponse>('/api/admin/app-users/badges/assign', params);
  }


  /**
   * 撤销 APP 用户徽章
   */
  export async function badgesRevokeApi(params: BadgesRevokeRequest): Promise<BadgesRevokeResponse> {
    return requestClient.post<BadgesRevokeResponse>('/api/admin/app-users/badges/revoke', params);
  }
