import type {
  AuthCaptchaResponse,
  AuthKeyPublicResponse,
  AuthLoginRequest,
  AuthLoginResponse,
} from '#/api/types';

import { authRequestClient } from '#/api/request';

/**
 * 登录前认证接口需要绕过 401->refresh 流程。
 * 这里复用 no-refresh client，但仍沿用现有请求头注入行为。
 */
export async function authCaptchaNoRefreshApi(): Promise<AuthCaptchaResponse> {
  return authRequestClient.get<AuthCaptchaResponse>('/api/admin/auth/captcha');
}

export async function authLoginNoRefreshApi(
  params: AuthLoginRequest,
): Promise<AuthLoginResponse> {
  return authRequestClient.post<AuthLoginResponse>(
    '/api/admin/auth/login',
    params,
  );
}

export async function authKeyPublicNoRefreshApi(): Promise<AuthKeyPublicResponse> {
  return authRequestClient.get<AuthKeyPublicResponse>(
    '/api/admin/auth/key/public',
  );
}
