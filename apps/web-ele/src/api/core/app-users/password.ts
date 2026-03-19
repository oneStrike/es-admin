import type {
  PasswordResetRequest,
  PasswordResetResponse
} from '../../types/app-users/password.d'

import { requestClient } from '#/api/request'


  /**
   * 重置 APP 用户密码
   */
  export async function passwordResetApi(params: PasswordResetRequest): Promise<PasswordResetResponse> {
    return requestClient.post<PasswordResetResponse>('/api/admin/app-users/password/reset', params);
  }
