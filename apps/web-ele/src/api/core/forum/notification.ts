import type {
  NotificationCreateRequest,
  NotificationCreateResponse,
  NotificationDeleteRequest,
  NotificationDeleteResponse,
  NotificationDetailRequest,
  NotificationDetailResponse,
  NotificationPageRequest,
  NotificationPageResponse,
} from '../../types/forum/notification.d';

import { requestClient } from '#/api/request';

/**
 * 分页查询论坛通知
 */
export async function notificationPageApi(
  params?: NotificationPageRequest,
): Promise<NotificationPageResponse> {
  return requestClient.get<NotificationPageResponse>(
    '/api/admin/forum/notification/page',
    { params },
  );
}

/**
 * 获取论坛通知详情
 */
export async function notificationDetailApi(
  params: NotificationDetailRequest,
): Promise<NotificationDetailResponse> {
  return requestClient.get<NotificationDetailResponse>(
    '/api/admin/forum/notification/detail',
    { params },
  );
}

/**
 * 创建论坛通知
 */
export async function notificationCreateApi(
  params: NotificationCreateRequest,
): Promise<NotificationCreateResponse> {
  return requestClient.post<NotificationCreateResponse>(
    '/api/admin/forum/notification/create',
    params,
  );
}

/**
 * 删除论坛通知
 */
export async function notificationDeleteApi(
  params: NotificationDeleteRequest,
): Promise<NotificationDeleteResponse> {
  return requestClient.post<NotificationDeleteResponse>(
    '/api/admin/forum/notification/delete',
    params,
  );
}
