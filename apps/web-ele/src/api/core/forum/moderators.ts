import type {
  ModeratorsAssignSectionRequest,
  ModeratorsAssignSectionResponse,
  ModeratorsCreateRequest,
  ModeratorsCreateResponse,
  ModeratorsDeleteRequest,
  ModeratorsDeleteResponse,
  ModeratorsPageRequest,
  ModeratorsPageResponse,
  ModeratorsUpdateRequest,
  ModeratorsUpdateResponse
} from '../../types/forum/moderators.d'

import { requestClient } from '#/api/request'


  /**
   * 查看版主列表
   */
  export async function moderatorsPageApi(params?: ModeratorsPageRequest): Promise<ModeratorsPageResponse> {
    return requestClient.get<ModeratorsPageResponse>('/api/admin/forum/moderators/page', { params });
  }


  /**
   * 添加版主
   */
  export async function moderatorsCreateApi(params: ModeratorsCreateRequest): Promise<ModeratorsCreateResponse> {
    return requestClient.post<ModeratorsCreateResponse>('/api/admin/forum/moderators/create', params);
  }


  /**
   * 更新版主信息
   */
  export async function moderatorsUpdateApi(params: ModeratorsUpdateRequest): Promise<ModeratorsUpdateResponse> {
    return requestClient.post<ModeratorsUpdateResponse>('/api/admin/forum/moderators/update', params);
  }


  /**
   * 移除版主
   */
  export async function moderatorsDeleteApi(params: ModeratorsDeleteRequest): Promise<ModeratorsDeleteResponse> {
    return requestClient.post<ModeratorsDeleteResponse>('/api/admin/forum/moderators/delete', params);
  }


  /**
   * 分配版主管理的板块
   */
  export async function moderatorsAssignSectionApi(params: ModeratorsAssignSectionRequest): Promise<ModeratorsAssignSectionResponse> {
    return requestClient.post<ModeratorsAssignSectionResponse>('/api/admin/forum/moderators/assign-section', params);
  }
