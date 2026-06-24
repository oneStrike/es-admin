import type {
  MessageChatConversationPageRequest,
  MessageChatConversationPageResponse,
  MessageChatMessagePageRequest,
  MessageChatMessagePageResponse,
  MessageMonitorDeliveryPageRequest,
  MessageMonitorDeliveryPageResponse,
  MessageMonitorDeliveryRetryRequest,
  MessageMonitorDeliveryRetryResponse,
  MessageMonitorDispatchPageRequest,
  MessageMonitorDispatchPageResponse,
  MessageMonitorSummaryResponse,
  MessageMonitorWsSummaryRequest,
  MessageMonitorWsSummaryResponse,
  MessageNotificationTemplatesCreateRequest,
  MessageNotificationTemplatesCreateResponse,
  MessageNotificationTemplatesDetailRequest,
  MessageNotificationTemplatesDetailResponse,
  MessageNotificationTemplatesPageRequest,
  MessageNotificationTemplatesPageResponse,
  MessageNotificationTemplatesPreviewRequest,
  MessageNotificationTemplatesPreviewResponse,
  MessageNotificationTemplatesUpdateEnabledRequest,
  MessageNotificationTemplatesUpdateEnabledResponse,
  MessageNotificationTemplatesUpdateRequest,
  MessageNotificationTemplatesUpdateResponse,
} from '../types/message.d';

import { requestClient } from '#/api/request';

/**
 * 分页查询通知投递结果
 */
export async function messageMonitorDeliveryPageApi(
  params?: MessageMonitorDeliveryPageRequest,
): Promise<MessageMonitorDeliveryPageResponse> {
  return requestClient.get<MessageMonitorDeliveryPageResponse>(
    '/api/admin/message/monitor/delivery/page',
    { params },
  );
}

/**
 * 按投递记录重试失败的通知投递
 */
export async function messageMonitorDeliveryRetryApi(
  params: MessageMonitorDeliveryRetryRequest,
): Promise<MessageMonitorDeliveryRetryResponse> {
  return requestClient.post<MessageMonitorDeliveryRetryResponse>(
    '/api/admin/message/monitor/delivery/retry',
    params,
  );
}

/**
 * 获取消息运行摘要
 */
export async function messageMonitorSummaryApi(): Promise<MessageMonitorSummaryResponse> {
  return requestClient.get<MessageMonitorSummaryResponse>(
    '/api/admin/message/monitor/summary',
  );
}

/**
 * 分页查询通知 dispatch 调度结果
 */
export async function messageMonitorDispatchPageApi(
  params?: MessageMonitorDispatchPageRequest,
): Promise<MessageMonitorDispatchPageResponse> {
  return requestClient.get<MessageMonitorDispatchPageResponse>(
    '/api/admin/message/monitor/dispatch/page',
    { params },
  );
}

/**
 * 获取消息 WS 监控摘要
 */
export async function messageMonitorWsSummaryApi(
  params?: MessageMonitorWsSummaryRequest,
): Promise<MessageMonitorWsSummaryResponse> {
  return requestClient.get<MessageMonitorWsSummaryResponse>(
    '/api/admin/message/monitor/ws/summary',
    { params },
  );
}

/**
 * 分页查询聊天会话排查列表
 */
export async function messageChatConversationPageApi(
  params: MessageChatConversationPageRequest,
): Promise<MessageChatConversationPageResponse> {
  return requestClient.get<MessageChatConversationPageResponse>(
    '/api/admin/message/chat/conversation/page',
    { params },
  );
}

/**
 * 分页查询聊天消息排查列表
 */
export async function messageChatMessagePageApi(
  params: MessageChatMessagePageRequest,
): Promise<MessageChatMessagePageResponse> {
  return requestClient.get<MessageChatMessagePageResponse>(
    '/api/admin/message/chat/message/page',
    { params },
  );
}

/**
 * 分页查询通知模板
 */
export async function messageNotificationTemplatesPageApi(
  params?: MessageNotificationTemplatesPageRequest,
): Promise<MessageNotificationTemplatesPageResponse> {
  return requestClient.get<MessageNotificationTemplatesPageResponse>(
    '/api/admin/message/notification-templates/page',
    { params },
  );
}

/**
 * 获取通知模板详情
 */
export async function messageNotificationTemplatesDetailApi(
  params: MessageNotificationTemplatesDetailRequest,
): Promise<MessageNotificationTemplatesDetailResponse> {
  return requestClient.get<MessageNotificationTemplatesDetailResponse>(
    '/api/admin/message/notification-templates/detail',
    { params },
  );
}

/**
 * 创建通知模板
 */
export async function messageNotificationTemplatesCreateApi(
  params: MessageNotificationTemplatesCreateRequest,
): Promise<MessageNotificationTemplatesCreateResponse> {
  return requestClient.post<MessageNotificationTemplatesCreateResponse>(
    '/api/admin/message/notification-templates/create',
    params,
  );
}

/**
 * 更新通知模板
 */
export async function messageNotificationTemplatesUpdateApi(
  params: MessageNotificationTemplatesUpdateRequest,
): Promise<MessageNotificationTemplatesUpdateResponse> {
  return requestClient.post<MessageNotificationTemplatesUpdateResponse>(
    '/api/admin/message/notification-templates/update',
    params,
  );
}

/**
 * 更新通知模板启用状态
 */
export async function messageNotificationTemplatesUpdateEnabledApi(
  params: MessageNotificationTemplatesUpdateEnabledRequest,
): Promise<MessageNotificationTemplatesUpdateEnabledResponse> {
  return requestClient.post<MessageNotificationTemplatesUpdateEnabledResponse>(
    '/api/admin/message/notification-templates/update-enabled',
    params,
  );
}

/**
 * 预览通知模板渲染结果
 */
export async function messageNotificationTemplatesPreviewApi(
  params: MessageNotificationTemplatesPreviewRequest,
): Promise<MessageNotificationTemplatesPreviewResponse> {
  return requestClient.post<MessageNotificationTemplatesPreviewResponse>(
    '/api/admin/message/notification-templates/preview',
    params,
  );
}
