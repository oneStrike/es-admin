import type {
  TaskCreateRequest,
  TaskCreateResponse,
  TaskDeleteRequest,
  TaskDeleteResponse,
  TaskDetailRequest,
  TaskDetailResponse,
  TaskInstancePageRequest,
  TaskInstancePageResponse,
  TaskInstanceReconciliationPageRequest,
  TaskInstanceReconciliationPageResponse,
  TaskPageRequest,
  TaskPageResponse,
  TaskTemplateOptionsResponse,
  TaskUpdateRequest,
  TaskUpdateResponse,
  TaskUpdateStatusRequest,
  TaskUpdateStatusResponse,
} from '../types/task.d';

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
 * 查询 task 可消费事件模板选项
 */
export async function taskTemplateOptionsApi(): Promise<TaskTemplateOptionsResponse> {
  return requestClient.get<TaskTemplateOptionsResponse>(
    '/api/admin/task/template-options',
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

/**
 * 分页查询任务实例记录
 */
export async function taskInstancePageApi(
  params?: TaskInstancePageRequest,
): Promise<TaskInstancePageResponse> {
  return requestClient.get<TaskInstancePageResponse>(
    '/api/admin/task/instance/page',
    { params },
  );
}

/**
 * 分页查询任务奖励与通知对账视图
 */
export async function taskInstanceReconciliationPageApi(
  params?: TaskInstanceReconciliationPageRequest,
): Promise<TaskInstanceReconciliationPageResponse> {
  return requestClient.get<TaskInstanceReconciliationPageResponse>(
    '/api/admin/task/instance/reconciliation/page',
    { params },
  );
}
