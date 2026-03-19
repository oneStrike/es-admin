import type {
  PermissionCheckRequest,
  PermissionCheckResponse
} from '../../types/growth/permission.d'

import { requestClient } from '#/api/request'


  /**
   * 检查用户等级权限配置
   */
  export async function permissionCheckApi(params: PermissionCheckRequest): Promise<PermissionCheckResponse> {
    return requestClient.post<PermissionCheckResponse>('/api/admin/growth/level-rules/permission/check', params);
  }
