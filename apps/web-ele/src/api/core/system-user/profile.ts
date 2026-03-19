import type {
  ProfileUpdateRequest,
  ProfileUpdateResponse
} from '../../types/system-user/profile.d'

import { requestClient } from '#/api/request'


  /**
   * 更新用户信息
   */
  export async function profileUpdateApi(params: ProfileUpdateRequest): Promise<ProfileUpdateResponse> {
    return requestClient.post<ProfileUpdateResponse>('/api/admin/system-user/profile/update', params);
  }
