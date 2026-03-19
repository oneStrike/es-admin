import type {
  PasswordChangeRequest,
  PasswordChangeResponse,
  PasswordResetRequest,
  PasswordResetResponse,
} from '../../types/system-user/password.d';

import { requestClient } from '#/api/request';

/**
 * 修改密码
 */
export async function passwordChangeApi(
  params: PasswordChangeRequest,
): Promise<PasswordChangeResponse> {
  return requestClient.post<PasswordChangeResponse>(
    '/api/admin/system-user/password/change',
    params,
  );
}

/**
 * 重置用户密码为默认密码
 */
export async function passwordResetApi(
  params: PasswordResetRequest,
): Promise<PasswordResetResponse> {
  return requestClient.post<PasswordResetResponse>(
    '/api/admin/system-user/password/reset',
    params,
  );
}
