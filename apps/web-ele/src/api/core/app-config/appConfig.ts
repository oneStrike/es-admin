import type {
  AppConfigActiveResponse,
  AppConfigUpdateRequest,
  AppConfigUpdateResponse
} from '../../types/app-config/appConfig.d'

import { requestClient } from '#/api/request'


  /**
   * 获取最新应用配置
   */
  export async function appConfigActiveApi(params: AppConfigActiveRequest): Promise<AppConfigActiveResponse> {
    return requestClient.get<AppConfigActiveResponse>('/api/admin/app-config/active', { params });
  }


  /**
   * 更新应用配置
   */
  export async function appConfigUpdateApi(params: AppConfigUpdateRequest): Promise<AppConfigUpdateResponse> {
    return requestClient.post<AppConfigUpdateResponse>('/api/admin/app-config/update', params);
  }
