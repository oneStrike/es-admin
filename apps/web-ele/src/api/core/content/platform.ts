import type {
  PlatformListResponse
} from '../../types/content/platform.d'

import { requestClient } from '#/api/request'


  /**
   * 获取第三方漫画平台列表
   */
  export async function platformListApi(): Promise<PlatformListResponse> {
    return requestClient.get<PlatformListResponse>('/api/admin/content/comic/third-party/platform/list');
  }
