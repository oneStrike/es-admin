import type {
  AuthCaptchaResponse,
  AuthLoginRequest,
  AuthLoginResponse,
  AuthLogoutRequest,
  AuthLogoutResponse
} from '../../types/auth/auth.d'

import { requestClient } from '#/api/request'


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
    return requestClient.post<AuthLogoutResponse>('/api/admin/auth/logout', params);
  }
