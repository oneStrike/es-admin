import type {
  SystemConfigResponse,
  SystemUpdateRequest,
  SystemUpdateResponse
} from '../types/system.d'

import { requestClient } from '#/api/request'


  /**
   * 获取系统配置
   */
  export async function systemConfigApi(): Promise<SystemConfigResponse> {
    return requestClient.get<SystemConfigResponse>('/api/admin/system/config');
  }


  /**
   * 更新系统配置
   */
  export async function systemUpdateApi(params: SystemUpdateRequest): Promise<SystemUpdateResponse> {
    return requestClient.post<SystemUpdateResponse>('/api/admin/system/update', params);
  }
