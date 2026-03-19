import type {
  DictionaryCreateRequest,
  DictionaryCreateResponse,
  DictionaryDeleteRequest,
  DictionaryDeleteResponse,
  DictionaryDetailRequest,
  DictionaryDetailResponse,
  DictionaryPageRequest,
  DictionaryPageResponse,
  DictionaryUpdateRequest,
  DictionaryUpdateResponse,
  DictionaryUpdateStatusRequest,
  DictionaryUpdateStatusResponse
} from '../../types/dictionary/dictionary.d'

import { requestClient } from '#/api/request'


  /**
   * 分页查询字典
   */
  export async function dictionaryPageApi(params?: DictionaryPageRequest): Promise<DictionaryPageResponse> {
    return requestClient.get<DictionaryPageResponse>('/api/admin/dictionary/page', { params });
  }


  /**
   * 获取字典详情
   */
  export async function dictionaryDetailApi(params: DictionaryDetailRequest): Promise<DictionaryDetailResponse> {
    return requestClient.get<DictionaryDetailResponse>('/api/admin/dictionary/detail', { params });
  }


  /**
   * 创建字典
   */
  export async function dictionaryCreateApi(params: DictionaryCreateRequest): Promise<DictionaryCreateResponse> {
    return requestClient.post<DictionaryCreateResponse>('/api/admin/dictionary/create', params);
  }


  /**
   * 更新字典
   */
  export async function dictionaryUpdateApi(params: DictionaryUpdateRequest): Promise<DictionaryUpdateResponse> {
    return requestClient.post<DictionaryUpdateResponse>('/api/admin/dictionary/update', params);
  }


  /**
   * 删除字典
   */
  export async function dictionaryDeleteApi(params: DictionaryDeleteRequest): Promise<DictionaryDeleteResponse> {
    return requestClient.post<DictionaryDeleteResponse>('/api/admin/dictionary/delete', params);
  }


  /**
   * 更新字典状态
   */
  export async function dictionaryUpdateStatusApi(params: DictionaryUpdateStatusRequest): Promise<DictionaryUpdateStatusResponse> {
    return requestClient.post<DictionaryUpdateStatusResponse>('/api/admin/dictionary/update-status', params);
  }
