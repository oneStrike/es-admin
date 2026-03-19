import type {
  ModeratorApplicationAuditRequest,
  ModeratorApplicationAuditResponse,
  ModeratorApplicationDeleteRequest,
  ModeratorApplicationDeleteResponse,
  ModeratorApplicationDetailRequest,
  ModeratorApplicationDetailResponse,
  ModeratorApplicationPageRequest,
  ModeratorApplicationPageResponse
} from '../../types/forum/moderatorApplication.d'

import { requestClient } from '#/api/request'


  /**
   * 分页查询版主申请
   */
  export async function moderatorApplicationPageApi(params?: ModeratorApplicationPageRequest): Promise<ModeratorApplicationPageResponse> {
    return requestClient.get<ModeratorApplicationPageResponse>('/api/admin/forum/moderator-application/page', { params });
  }


  /**
   * 获取版主申请详情
   */
  export async function moderatorApplicationDetailApi(params: ModeratorApplicationDetailRequest): Promise<ModeratorApplicationDetailResponse> {
    return requestClient.get<ModeratorApplicationDetailResponse>('/api/admin/forum/moderator-application/detail', { params });
  }


  /**
   * 审核版主申请
   */
  export async function moderatorApplicationAuditApi(params: ModeratorApplicationAuditRequest): Promise<ModeratorApplicationAuditResponse> {
    return requestClient.post<ModeratorApplicationAuditResponse>('/api/admin/forum/moderator-application/audit', params);
  }


  /**
   * 删除版主申请
   */
  export async function moderatorApplicationDeleteApi(params: ModeratorApplicationDeleteRequest): Promise<ModeratorApplicationDeleteResponse> {
    return requestClient.post<ModeratorApplicationDeleteResponse>('/api/admin/forum/moderator-application/delete', params);
  }
