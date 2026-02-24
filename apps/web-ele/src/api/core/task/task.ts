import type {
  TaskCreateRequest,
  TaskCreateResponse,
  TaskDeleteRequest,
  TaskDeleteResponse,
  TaskDetailRequest,
  TaskDetailResponse,
  TaskPageRequest,
  TaskPageResponse,
  TaskUpdateRequest,
  TaskUpdateResponse,
  TaskUpdateStatusRequest,
  TaskUpdateStatusResponse,
} from '../../types/task/task.d';

import { requestClient } from '#/api/request';

/**
 * 创建任务
 */
export async function taskCreateApi(
  params: TaskCreateRequest,
): Promise<TaskCreateResponse> {
  return requestClient.post<TaskCreateResponse>(
    '/api/admin/task/create',
    params,
  );
}

/**
 * 更新任务
 */
export async function taskUpdateApi(
  params: TaskUpdateRequest,
): Promise<TaskUpdateResponse> {
  return requestClient.post<TaskUpdateResponse>(
    '/api/admin/task/update',
    params,
  );
}

/**
 * 更新任务状态
 */
export async function taskUpdateStatusApi(
  params: TaskUpdateStatusRequest,
): Promise<TaskUpdateStatusResponse> {
  return requestClient.post<TaskUpdateStatusResponse>(
    '/api/admin/task/update-status',
    params,
  );
}

/**
 * 删除任务
 */
export async function taskDeleteApi(
  params: TaskDeleteRequest,
): Promise<TaskDeleteResponse> {
  return requestClient.post<TaskDeleteResponse>(
    '/api/admin/task/delete',
    params,
  );
}

/**
 * 分页查询任务
 */
export async function taskPageApi(
  params?: TaskPageRequest,
): Promise<TaskPageResponse> {
  return requestClient.get<TaskPageResponse>('/api/admin/task/page', {
    params,
  });
}

/**
 * 查询任务详情
 */
export async function taskDetailApi(
  params: TaskDetailRequest,
): Promise<TaskDetailResponse> {
  return requestClient.get<TaskDetailResponse>('/api/admin/task/detail', {
    params,
  });
}
