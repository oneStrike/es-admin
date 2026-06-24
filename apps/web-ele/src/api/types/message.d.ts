/**
 *  类型定义 [MessageMonitorDeliveryPageRequest]
 *  @来源 消息中心/监控
 *  @更新时间 2026-05-09 22:20:06
 */
export type MessageMonitorDeliveryPageRequest = {
  /* 通知分类键，表示通知所属业务分类 */
  categoryKey?: null | string;

  /* dispatch ID（正整数字符串） */
  dispatchId?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* 关联的领域事件 ID（正整数字符串） */
  eventId?: null | string;

  /* 领域事件键 */
  eventKey?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 通知投影键 */
  projectionKey?: null | string;

  /* 接收用户 ID */
  receiverUserId?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 业务投递状态（1=已投递；2=投递失败；3=重试中；4=因偏好关闭而跳过） */
  status?: null | number;
};

export type MessageMonitorDeliveryPageResponse = {
  /* 列表数据 */
  list?: MessageNotificationDeliveryItemDto[] | null;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 每页条数 */
  pageSize?: null | number;

  /* 总条数 */
  total?: null | number;
};

/**
 *  类型定义 [MessageMonitorDeliveryRetryRequest]
 *  @来源 消息中心/监控
 *  @更新时间 2026-05-09 22:20:06
 */
export type MessageMonitorDeliveryRetryRequest =
  RetryMessageNotificationDeliveryDto;

export type MessageMonitorDeliveryRetryResponse = boolean;

export type MessageMonitorSummaryResponse = MessageMonitorSummaryDto;

/**
 *  类型定义 [MessageMonitorDispatchPageRequest]
 *  @来源 消息中心/监控
 *  @更新时间 2026-05-09 22:20:06
 */
export type MessageMonitorDispatchPageRequest = {
  /* 通知分类键，表示通知所属业务分类 */
  categoryKey?: null | string;

  /* 通知投影业务状态（1=已投递；2=投递失败；3=重试中；4=因偏好关闭而跳过） */
  deliveryStatus?: null | number;

  /* dispatch ID（正整数字符串） */
  dispatchId?: null | string;

  /* 领域事件 dispatch 技术状态（0=待处理；1=处理中；2=成功；3=失败） */
  dispatchStatus?: null | number;

  /* 事件域 */
  domain?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* 关联的领域事件 ID（正整数字符串） */
  eventId?: null | string;

  /* 领域事件键 */
  eventKey?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 通知投影键 */
  projectionKey?: null | string;

  /* 接收用户 ID */
  receiverUserId?: null | number;

  /* 开始时间 */
  startDate?: null | string;
};

export type MessageMonitorDispatchPageResponse = {
  /* 列表数据 */
  list?: MessageDispatchPageItemDto[] | null;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 每页条数 */
  pageSize?: null | number;

  /* 总条数 */
  total?: null | number;
};

/**
 *  类型定义 [MessageMonitorWsSummaryRequest]
 *  @来源 消息中心/监控
 *  @更新时间 2026-05-09 22:20:06
 */
export type MessageMonitorWsSummaryRequest = {
  /* 统计窗口（小时） */
  windowHours?: null | number;
};

export type MessageMonitorWsSummaryResponse = MessageWsMonitorSummaryDto;

/**
 *  类型定义 [MessageChatConversationPageRequest]
 *  @来源 消息中心/监控
 *  @更新时间 2026-05-09 22:20:06
 */
export type MessageChatConversationPageRequest = {
  /* 会话 ID */
  conversationId?: null | number;

  /* 结束时间 */
  endDate?: null | string;

  /* 列表状态筛选；开启时只看已隐藏，关闭时只看可见 */
  hiddenOnly?: boolean | null;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 对方用户 ID */
  peerUserId?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 是否只看未读会话 */
  unreadOnly?: boolean | null;

  /* 用户 ID，聊天排查必须先按用户定位 */
  userId: number;
};

export type MessageChatConversationPageResponse = {
  /* 列表数据 */
  list?: AdminChatConversationPageItemDto[] | null;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 每页条数 */
  pageSize?: null | number;

  /* 总条数 */
  total?: null | number;
};

/**
 *  类型定义 [MessageChatMessagePageRequest]
 *  @来源 消息中心/监控
 *  @更新时间 2026-05-09 22:20:06
 */
export type MessageChatMessagePageRequest = {
  /* 会话 ID */
  conversationId: number;

  /* 结束时间 */
  endDate?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 发送用户 ID */
  senderUserId?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 排查用户 ID，用于校验该用户仍在会话中 */
  userId: number;
};

export type MessageChatMessagePageResponse = {
  /* 列表数据 */
  list?: AdminChatMessagePageItemDto[] | null;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 每页条数 */
  pageSize?: null | number;

  /* 总条数 */
  total?: null | number;
};

/**
 *  类型定义 [MessageNotificationTemplatesPageRequest]
 *  @来源 消息中心/通知模板
 *  @更新时间 2026-05-09 22:20:06
 */
export type MessageNotificationTemplatesPageRequest = {
  /* 通知分类键，表示模板所属通知业务分类 */
  categoryKey?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean | null;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 开始时间 */
  startDate?: null | string;
};

export type MessageNotificationTemplatesPageResponse = {
  /* 列表数据 */
  list?: AdminMessageNotificationTemplateDto[] | null;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 每页条数 */
  pageSize?: null | number;

  /* 总条数 */
  total?: null | number;
};

/**
 *  类型定义 [MessageNotificationTemplatesDetailRequest]
 *  @来源 消息中心/通知模板
 *  @更新时间 2026-05-09 22:20:06
 */
export type MessageNotificationTemplatesDetailRequest = {
  /* 主键id */
  id: number;
};

export type MessageNotificationTemplatesDetailResponse =
  AdminMessageNotificationTemplateDto;

/**
 *  类型定义 [MessageNotificationTemplatesCreateRequest]
 *  @来源 消息中心/通知模板
 *  @更新时间 2026-05-09 22:20:06
 */
export type MessageNotificationTemplatesCreateRequest =
  CreateNotificationTemplateDto;

export type MessageNotificationTemplatesCreateResponse = boolean;

/**
 *  类型定义 [MessageNotificationTemplatesUpdateRequest]
 *  @来源 消息中心/通知模板
 *  @更新时间 2026-05-09 22:20:06
 */
export type MessageNotificationTemplatesUpdateRequest =
  UpdateNotificationTemplateDto;

export type MessageNotificationTemplatesUpdateResponse = boolean;

/**
 *  类型定义 [MessageNotificationTemplatesUpdateEnabledRequest]
 *  @来源 消息中心/通知模板
 *  @更新时间 2026-05-09 22:20:06
 */
export type MessageNotificationTemplatesUpdateEnabledRequest =
  UpdateNotificationTemplateEnabledDto;

export type MessageNotificationTemplatesUpdateEnabledResponse = boolean;

/**
 *  类型定义 [MessageNotificationTemplatesPreviewRequest]
 *  @来源 消息中心/通知模板
 *  @更新时间 2026-05-09 22:20:06
 */
export type MessageNotificationTemplatesPreviewRequest =
  PreviewNotificationTemplateDto;

export type MessageNotificationTemplatesPreviewResponse =
  PreviewNotificationTemplateResponseDto;

/**
 *  类型定义 [MessageNotificationDeliveryItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type MessageNotificationDeliveryItemDto = {
  /* 通知分类键，表示通知所属业务分类 */
  categoryKey?:
    | 'comment_like'
    | 'comment_mention'
    | 'comment_reply'
    | 'system_announcement'
    | 'task_reminder'
    | 'topic_commented'
    | 'topic_favorited'
    | 'topic_like'
    | 'topic_mentioned'
    | 'user_followed'
    | null;
  /* 通知分类中文标签 */
  categoryLabel?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* dispatch ID（正整数字符串） */
  dispatchId: string;
  /* 关联的领域事件 ID（正整数字符串） */
  eventId: string;
  /* 领域事件键 */
  eventKey: string;
  /* 业务场景中文标签 */
  eventLabel: string;
  /* 最近一次失败原因 */
  failureReason?: null | string;
  /* 模板回退原因 */
  fallbackReason?: null | string;
  /* 投递结果 ID */
  id: number;
  /* 任务实例 ID */
  instanceId?: null | number;
  /* 最近一次业务投递尝试时间 */
  lastAttemptAt: string;
  /* 关联的站内通知 ID */
  notificationId?: null | number;
  /* 通知投影键 */
  projectionKey?: null | string;
  /* 接收用户 ID */
  receiverUserId?: null | number;
  /* 任务提醒子类型 */
  reminderKind?: null | string;
  /* 业务投递状态（1=已投递；2=投递失败；3=重试中；4=因偏好关闭而跳过） */
  status: number;
  /* 业务投递结果中文标签 */
  statusLabel: string;
  /* 任务 ID */
  taskId?: null | number;
  /* 命中的模板 ID */
  templateId?: null | number;
  /* 更新时间 */
  updatedAt: string;
  /* 是否命中启用模板 */
  usedTemplate: boolean;
};

/**
 *  类型定义 [RetryMessageNotificationDeliveryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type RetryMessageNotificationDeliveryDto = {
  /* 通知投递记录 ID（正整数字符串） */
  deliveryId: string;
  /* 重试原因 */
  reason: string;
};

/**
 *  类型定义 [MessageMonitorSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type MessageMonitorSummaryDto = {
  /* 失败投递数量 */
  failedDeliveryCount: number;
  /* 失败发送任务数量 */
  failedDispatchCount: number;
  /* 重试中投递数量 */
  retryingDeliveryCount: number;
  /* 重试中发送任务数量 */
  retryingDispatchCount: number;
  /* 快照时间 */
  snapshotAt: string;
};

/**
 *  类型定义 [MessageDispatchPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type MessageDispatchPageItemDto = {
  /* 领域事件消费者标识 */
  consumer: string;
  /* 通知投影业务状态（1=已投递；2=投递失败；3=重试中；4=因偏好关闭而跳过） */
  deliveryStatus?: null | number;
  /* dispatch ID（正整数字符串） */
  dispatchId: string;
  /* 领域事件 dispatch 技术状态（0=待处理；1=处理中；2=成功；3=失败） */
  dispatchStatus: number;
  /* 事件域 */
  domain: string;
  /* 关联的领域事件 ID（正整数字符串） */
  eventId: string;
  /* 领域事件键 */
  eventKey: string;
  /* 业务场景中文标签 */
  eventLabel: string;
  /* 最后一次技术失败原因 */
  lastError?: null | string;
  /* 下次重试时间 */
  nextRetryAt?: null | string;
  /* 处理完成时间 */
  processedAt?: null | string;
  /* 通知投影键 */
  projectionKey?: null | string;
  /* 接收用户 ID */
  receiverUserId?: null | number;
  /* 重试次数 */
  retryCount: number;
};

/**
 *  类型定义 [MessageWsMonitorSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type MessageWsMonitorSummaryDto = {
  /* ack 失败数量 */
  ackErrorCount: number;
  /* ack 成功数量 */
  ackSuccessCount: number;
  /* ack 成功率（0~1） */
  ackSuccessRate: number;
  /* 平均 ack 延迟（毫秒） */
  avgAckLatencyMs: number;
  /* 跨实例实时推送发布失败次数 */
  fanoutPublishErrorCount: number;
  /* 跨实例实时推送因载荷过大被跳过次数 */
  fanoutSkippedCount: number;
  /* 实时推送部署约束说明 */
  realtimeDeploymentConstraint?: null | string;
  /* 实时推送是否存在多实例部署约束风险 */
  realtimeDeploymentRisk: boolean;
  /* 连接/重连次数 */
  reconnectCount: number;
  /* WS 请求总数 */
  requestCount: number;
  /* 补偿成功次数 */
  resyncSuccessCount: number;
  /* 补偿成功率（0~1） */
  resyncSuccessRate: number;
  /* 补偿触发次数 */
  resyncTriggerCount: number;
  /* 快照时间 */
  snapshotAt: string;
  /* 统计窗口（小时） */
  windowHours: number;
  /* 统计窗口起始时间 */
  windowStartAt: string;
};

/**
 *  类型定义 [AdminChatConversationPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminChatConversationPageItemDto = {
  /* 会话 ID */
  conversationId: number;
  /* 当前用户隐藏会话时间 */
  hiddenAt?: null | string;
  /* 当前用户是否已从列表隐藏该会话 */
  isHiddenForUser: boolean;
  /* 当前用户是否置顶 */
  isPinned: boolean;
  /* 最后消息时间 */
  lastMessageAt?: null | string;
  /* 最后消息 ID */
  lastMessageId?: null | string;
  /* 最后消息摘要（脱敏/限长） */
  lastMessagePreview?: null | string;
  /* 当前用户最后已读时间 */
  lastReadAt?: null | string;
  /* 当前用户最后已读消息 ID */
  lastReadMessageId?: null | string;
  /* 最后发送用户 ID */
  lastSenderId?: null | number;
  /* 对方用户摘要 */
  peerUser: AdminChatUserSummaryDto;
  /* 当前用户未读数 */
  unreadCount: number;
  /* 当前排查用户摘要 */
  user: AdminChatUserSummaryDto;
};

/**
 *  类型定义 [AdminChatUserSummaryDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminChatUserSummaryDto = {
  /* 用户头像 */
  avatarUrl?: null | string;
  /* 用户昵称 */
  nickname?: null | string;
  /* 用户 ID */
  userId: number;
};

/**
 *  类型定义 [AdminChatMessagePageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminChatMessagePageItemDto = {
  /* 消息摘要（脱敏/限长） */
  contentPreview: string;
  /* 会话 ID */
  conversationId: number;
  /* 发送时间 */
  createdAt: string;
  /* 是否有正文 token */
  hasBodyTokens: boolean;
  /* 是否有扩展载荷 */
  hasPayload: boolean;
  /* 消息 ID */
  messageId: string;
  /* 会话内递增序号 */
  messageSeq: string;
  /* 消息类型（1=文本；2=图片；3=语音；4=视频；99=系统消息） */
  messageType: number;
  /* 发送用户 ID */
  senderId: number;
  /* 消息状态（1=正常；2=已撤回；3=已删除） */
  status: number;
};

/**
 *  类型定义 [AdminMessageNotificationTemplateDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type AdminMessageNotificationTemplateDto = {
  /* 通知分类键，表示模板所属通知业务分类 */
  categoryKey:
    | 'comment_like'
    | 'comment_mention'
    | 'comment_reply'
    | 'system_announcement'
    | 'task_reminder'
    | 'topic_commented'
    | 'topic_favorited'
    | 'topic_like'
    | 'topic_mentioned'
    | 'user_followed';
  /* 通知分类中文标签 */
  categoryLabel: string;
  /* 正文模板；支持 {{content}}、{{data.object.title}}、{{data.object.snippet}} 等占位符 */
  contentTemplate: string;
  /* 创建时间 */
  createdAt: string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
  /* 备注 */
  remark?: null | string;
  /* 标题模板；支持 {{title}}、{{actor.nickname}}、{{data.object.title}} 等占位符 */
  titleTemplate: string;
  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CreateNotificationTemplateDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type CreateNotificationTemplateDto = {
  /* 通知分类键，表示模板所属通知业务分类 */
  categoryKey:
    | 'comment_like'
    | 'comment_mention'
    | 'comment_reply'
    | 'system_announcement'
    | 'task_reminder'
    | 'topic_commented'
    | 'topic_favorited'
    | 'topic_like'
    | 'topic_mentioned'
    | 'user_followed';
  /* 正文模板；支持 {{content}}、{{data.object.title}}、{{data.object.snippet}} 等占位符 */
  contentTemplate: string;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 备注 */
  remark?: null | string;
  /* 标题模板；支持 {{title}}、{{actor.nickname}}、{{data.object.title}} 等占位符 */
  titleTemplate: string;
};

/**
 *  类型定义 [UpdateNotificationTemplateDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateNotificationTemplateDto = {
  /* 正文模板；支持 {{content}}、{{data.object.title}}、{{data.object.snippet}} 等占位符 */
  contentTemplate?: null | string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 备注 */
  remark?: null | string;
  /* 标题模板；支持 {{title}}、{{actor.nickname}}、{{data.object.title}} 等占位符 */
  titleTemplate?: null | string;
};

/**
 *  类型定义 [UpdateNotificationTemplateEnabledDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UpdateNotificationTemplateEnabledDto = {
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled: boolean;
};

/**
 *  类型定义 [PreviewNotificationTemplateDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type PreviewNotificationTemplateDto = {
  /* 通知分类键，表示模板所属通知业务分类 */
  categoryKey:
    | 'comment_like'
    | 'comment_mention'
    | 'comment_reply'
    | 'system_announcement'
    | 'task_reminder'
    | 'topic_commented'
    | 'topic_favorited'
    | 'topic_like'
    | 'topic_mentioned'
    | 'user_followed';
  /* 正文模板；支持 {{content}}、{{data.object.title}}、{{data.object.snippet}} 等占位符 */
  contentTemplate: string;
  /* 是否启用 */
  isEnabled?: boolean | null;
  /* 标题模板；支持 {{title}}、{{actor.nickname}}、{{data.object.title}} 等占位符 */
  titleTemplate: string;
};

/**
 *  类型定义 [PreviewNotificationTemplateResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type PreviewNotificationTemplateResponseDto = {
  /* 通知分类中文标签 */
  categoryLabel: string;
  /* 渲染后的正文 */
  content: string;
  /* 回退原因 */
  fallbackReason?: null | string;
  /* 渲染后的标题 */
  title: string;
  /* 是否使用模板渲染成功 */
  usedTemplate: boolean;
};
