import type {
  ThirdPartyDetailRequest,
  ThirdPartySearchRequest,
  ThirdPartySearchResponse
} from '../../types/content/thirdParty.d'

import { requestClient } from '#/api/request'


  /**
   * 搜索第三方平台漫画
   */
  export async function thirdPartySearchApi(params: ThirdPartySearchRequest): Promise<ThirdPartySearchResponse> {
    return requestClient.get<ThirdPartySearchResponse>('/api/admin/content/comic/third-party/search', { params });
  }


  /**
   * 获取第三方平台漫画详情
   */
  export async function thirdPartyDetailApi(params: ThirdPartyDetailRequest): Promise<any> {
    return requestClient.get<any>('/api/admin/content/comic/third-party/detail', { params });
  }
