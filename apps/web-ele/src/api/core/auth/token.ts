import type {
  TokenRefreshRequest,
  TokenRefreshResponse,
} from '../../types/auth/token.d';

import { requestClient } from '#/api/request';

/**
 * 刷新访问令牌
 */
export async function tokenRefreshApi(
  params: TokenRefreshRequest,
): Promise<TokenRefreshResponse> {
  return requestClient.post<TokenRefreshResponse>(
    '/api/admin/auth/token/refresh',
    params,
  );
}
