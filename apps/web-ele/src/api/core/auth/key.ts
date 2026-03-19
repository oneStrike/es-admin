import type { KeyPublicResponse } from '../../types/auth/key.d';

import { requestClient } from '#/api/request';

/**
 * 获取Admin专用RSA公钥
 */
export async function keyPublicApi(
  params: KeyPublicRequest,
): Promise<KeyPublicResponse> {
  return requestClient.get<KeyPublicResponse>('/api/admin/auth/key/public', {
    params,
  });
}
