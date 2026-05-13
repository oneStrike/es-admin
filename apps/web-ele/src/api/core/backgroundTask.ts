import type {
  BackgroundTaskCancelRequest,
  BackgroundTaskCancelResponse,
  BackgroundTaskDetailRequest,
  BackgroundTaskDetailResponse,
  BackgroundTaskPageRequest,
  BackgroundTaskPageResponse,
  BackgroundTaskRetryRequest,
  BackgroundTaskRetryResponse,
} from '../types/backgroundTask.d';

import { requestClient } from '#/api/request';

/**
 * 分页查询后台任务
 */
export async function backgroundTaskPageApi(
  params?: BackgroundTaskPageRequest,
): Promise<BackgroundTaskPageResponse> {
  return requestClient.get<BackgroundTaskPageResponse>(
    '/api/admin/background-task/page',
    { params },
  );
}

/**
 * 查询后台任务详情
 */
export async function backgroundTaskDetailApi(
  params: BackgroundTaskDetailRequest,
): Promise<BackgroundTaskDetailResponse> {
  return requestClient.get<BackgroundTaskDetailResponse>(
    '/api/admin/background-task/detail',
    { params },
  );
}

/**
 * 取消后台任务
 */
export async function backgroundTaskCancelApi(
  params: BackgroundTaskCancelRequest,
): Promise<BackgroundTaskCancelResponse> {
  return requestClient.post<BackgroundTaskCancelResponse>(
    '/api/admin/background-task/cancel',
    params,
  );
}

/**
 * 重试后台任务
 */
export async function backgroundTaskRetryApi(
  params: BackgroundTaskRetryRequest,
): Promise<BackgroundTaskRetryResponse> {
  return requestClient.post<BackgroundTaskRetryResponse>(
    '/api/admin/background-task/retry',
    params,
  );
}
