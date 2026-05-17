import type {
  WorkflowCancelRequest,
  WorkflowCancelResponse,
  WorkflowDetailRequest,
  WorkflowDetailResponse,
  WorkflowExpireRequest,
  WorkflowExpireResponse,
  WorkflowItemPageRequest,
  WorkflowItemPageResponse,
  WorkflowPageRequest,
  WorkflowPageResponse,
  WorkflowRetryItemsRequest,
  WorkflowRetryItemsResponse,
} from '../types/workflow.d';

import { requestClient } from '#/api/request';

/**
 * 分页查询工作流任务
 */
export async function workflowPageApi(
  params?: WorkflowPageRequest,
): Promise<WorkflowPageResponse> {
  return requestClient.get<WorkflowPageResponse>('/api/admin/workflow/page', {
    params,
  });
}

/**
 * 查询工作流任务详情
 */
export async function workflowDetailApi(
  params: WorkflowDetailRequest,
): Promise<WorkflowDetailResponse> {
  return requestClient.get<WorkflowDetailResponse>(
    '/api/admin/workflow/detail',
    { params },
  );
}

/**
 * 分页查询工作流内容导入条目
 */
export async function workflowItemPageApi(
  params?: WorkflowItemPageRequest,
): Promise<WorkflowItemPageResponse> {
  return requestClient.get<WorkflowItemPageResponse>(
    '/api/admin/workflow/item/page',
    { params },
  );
}

/**
 * 取消工作流任务
 */
export async function workflowCancelApi(
  params: WorkflowCancelRequest,
): Promise<WorkflowCancelResponse> {
  return requestClient.post<WorkflowCancelResponse>(
    '/api/admin/workflow/cancel',
    params,
  );
}

/**
 * 重试工作流失败条目
 */
export async function workflowRetryItemsApi(
  params: WorkflowRetryItemsRequest,
): Promise<WorkflowRetryItemsResponse> {
  return requestClient.post<WorkflowRetryItemsResponse>(
    '/api/admin/workflow/retry-items',
    params,
  );
}

/**
 * 过期清理工作流 retained resource
 */
export async function workflowExpireApi(
  params: WorkflowExpireRequest,
): Promise<WorkflowExpireResponse> {
  return requestClient.post<WorkflowExpireResponse>(
    '/api/admin/workflow/expire',
    params,
  );
}
