import { requestClient } from '#/api/request'
import type {
  TaskCreateRequest,
  TaskCreateResponse,
  TaskUpdateRequest,
  TaskUpdateResponse,
  TaskUpdateStatusRequest,
  TaskUpdateStatusResponse,
  TaskDeleteRequest,
  TaskDeleteResponse,
  TaskPageRequest,
  TaskPageResponse,
  TaskDetailRequest,
  TaskDetailResponse,
  TaskAssignmentPageRequest,
  TaskAssignmentPageResponse
} from '../types/task.d'


  /**
   * 创建任务
   */
  export async function taskCreateApi(params: TaskCreateRequest): Promise<TaskCreateResponse> {
    return requestClient.post<TaskCreateResponse>('/api/admin/task/create', params);
  }


  /**
   * 更新任务
   */
  export async function taskUpdateApi(params: TaskUpdateRequest): Promise<TaskUpdateResponse> {
    return requestClient.post<TaskUpdateResponse>('/api/admin/task/update', params);
  }


  /**
   * 更新任务状态
   */
  export async function taskUpdateStatusApi(params: TaskUpdateStatusRequest): Promise<TaskUpdateStatusResponse> {
    return requestClient.post<TaskUpdateStatusResponse>('/api/admin/task/update-status', params);
  }


  /**
   * 删除任务
   */
  export async function taskDeleteApi(params: TaskDeleteRequest): Promise<TaskDeleteResponse> {
    return requestClient.post<TaskDeleteResponse>('/api/admin/task/delete', params);
  }


  /**
   * 分页查询任务
   */
  export async function taskPageApi(params?: TaskPageRequest): Promise<TaskPageResponse> {
    return requestClient.get<TaskPageResponse>('/api/admin/task/page', { params });
  }


  /**
   * 查询任务详情
   */
  export async function taskDetailApi(params: TaskDetailRequest): Promise<TaskDetailResponse> {
    return requestClient.get<TaskDetailResponse>('/api/admin/task/detail', { params });
  }


  /**
   * 分页查询任务领取记录
   */
  export async function taskAssignmentPageApi(params?: TaskAssignmentPageRequest): Promise<TaskAssignmentPageResponse> {
    return requestClient.get<TaskAssignmentPageResponse>('/api/admin/task/assignment/page', { params });
  }
