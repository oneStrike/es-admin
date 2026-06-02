import type {
  WorkflowArchiveRequest,
  WorkflowArchiveResponse,
  WorkflowCancelRequest,
  WorkflowCancelResponse,
  WorkflowDetailRequest,
  WorkflowDetailResponse,
  WorkflowExpireRequest,
  WorkflowExpireResponse,
  WorkflowItemPageRequest,
  WorkflowItemPageResponse,
  WorkflowNotificationListRequest,
  WorkflowNotificationListResponse,
  WorkflowPageRequest,
  WorkflowPageResponse,
  WorkflowRecordPageRequest,
  WorkflowRecordPageResponse,
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
 * 分页查询工作流处理记录
 */
export async function workflowRecordPageApi(
  params: WorkflowRecordPageRequest,
): Promise<WorkflowRecordPageResponse> {
  return requestClient.get<WorkflowRecordPageResponse>(
    '/api/admin/workflow/record/page',
    { params },
  );
}

/**
 * 查询工作流通知列表
 */
export async function workflowNotificationListApi(
  params?: WorkflowNotificationListRequest,
): Promise<WorkflowNotificationListResponse> {
  return requestClient.get<WorkflowNotificationListResponse>(
    '/api/admin/workflow/notification/list',
    { params },
  );
}

/**
 * 分页查询工作流条目
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
 * 归档工作流任务
 */
export async function workflowArchiveApi(
  params: WorkflowArchiveRequest,
): Promise<WorkflowArchiveResponse> {
  return requestClient.post<WorkflowArchiveResponse>(
    '/api/admin/workflow/archive',
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
