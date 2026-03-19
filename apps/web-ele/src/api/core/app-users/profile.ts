import type {
  ProfileUpdateRequest,
  ProfileUpdateResponse
} from '../../types/app-users/profile.d'

import { requestClient } from '#/api/request'


  /**
   * 更新 APP 用户资料
   */
  export async function profileUpdateApi(params: ProfileUpdateRequest): Promise<ProfileUpdateResponse> {
    return requestClient.post<ProfileUpdateResponse>('/api/admin/app-users/profile/update', params);
  }
