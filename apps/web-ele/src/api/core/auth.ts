import type {
  AuthCaptchaResponse,
  AuthKeyPublicResponse,
  AuthLoginRequest,
  AuthLoginResponse,
  AuthLogoutRequest,
  AuthLogoutResponse,
  AuthTokenRefreshRequest,
  AuthTokenRefreshResponse
} from '../types/auth.d'

import { authRequestClient, requestClient } from '#/api/request'


  /**
   * 获取验证码
   */
  export async function authCaptchaApi(): Promise<AuthCaptchaResponse> {
    return requestClient.get<AuthCaptchaResponse>('/api/admin/auth/captcha');
  }


  /**
   * 管理员登录
   */
  export async function authLoginApi(params: AuthLoginRequest): Promise<AuthLoginResponse> {
    return requestClient.post<AuthLoginResponse>('/api/admin/auth/login', params);
  }


  /**
   * 管理员登出
   */
  export async function authLogoutApi(params: AuthLogoutRequest): Promise<AuthLogoutResponse> {
    return authRequestClient.post<AuthLogoutResponse>('/api/admin/auth/logout', params);
  }


  /**
   * 刷新访问令牌
   */
  export async function authTokenRefreshApi(params: AuthTokenRefreshRequest): Promise<AuthTokenRefreshResponse> {
    return authRequestClient.post<AuthTokenRefreshResponse>('/api/admin/auth/token/refresh', params);
  }


  /**
   * 获取Admin专用RSA公钥
   */
  export async function authKeyPublicApi(): Promise<AuthKeyPublicResponse> {
    return requestClient.get<AuthKeyPublicResponse>('/api/admin/auth/key/public');
  }
