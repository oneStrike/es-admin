import type {
  AssignmentPageRequest,
  AssignmentPageResponse
} from '../../types/task/assignment.d'

import { requestClient } from '#/api/request'


  /**
   * 分页查询任务领取记录
   */
  export async function assignmentPageApi(params?: AssignmentPageRequest): Promise<AssignmentPageResponse> {
    return requestClient.get<AssignmentPageResponse>('/api/admin/task/assignment/page', { params });
  }
