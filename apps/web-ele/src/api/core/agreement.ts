import type {
  AgreementCreateRequest,
  AgreementCreateResponse,
  AgreementDetailRequest,
  AgreementDetailResponse,
  AgreementPageRequest,
  AgreementPageResponse,
  AgreementUpdateRequest,
  AgreementUpdateResponse,
  AgreementUpdateStatusRequest,
  AgreementUpdateStatusResponse
} from '../types/agreement.d'

import { requestClient } from '#/api/request'


  /**
   * 创建协议
   */
  export async function agreementCreateApi(params: AgreementCreateRequest): Promise<AgreementCreateResponse> {
    return requestClient.post<AgreementCreateResponse>('/api/admin/agreement/create', params);
  }


  /**
   * 更新协议
   */
  export async function agreementUpdateApi(params: AgreementUpdateRequest): Promise<AgreementUpdateResponse> {
    return requestClient.post<AgreementUpdateResponse>('/api/admin/agreement/update', params);
  }


  /**
   * 更新协议发布状态
   */
  export async function agreementUpdateStatusApi(params: AgreementUpdateStatusRequest): Promise<AgreementUpdateStatusResponse> {
    return requestClient.post<AgreementUpdateStatusResponse>('/api/admin/agreement/update-status', params);
  }


  /**
   * 查询协议分页
   */
  export async function agreementPageApi(params?: AgreementPageRequest): Promise<AgreementPageResponse> {
    return requestClient.get<AgreementPageResponse>('/api/admin/agreement/page', { params });
  }


  /**
   * 获取协议详情
   */
  export async function agreementDetailApi(params: AgreementDetailRequest): Promise<AgreementDetailResponse> {
    return requestClient.get<AgreementDetailResponse>('/api/admin/agreement/detail', { params });
  }
