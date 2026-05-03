/**
 *  类型定义 [MessageMonitorDeliveryPageRequest]
 *  @来源 消息中心/监控
 *  @更新时间 2026-05-03 14:46:16
 */
export type MessageMonitorDeliveryPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 通知分类键，表示通知所属业务分类 */
  categoryKey?: null | string;

  /* dispatch ID（正整数字符串） */
  dispatchId?: null | string;

  /* 结束时间 */
  endDate?: null | string;

  /* 领域事件 ID（正整数字符串） */
  eventId?: null | string;

  /* 领域事件键 */
  eventKey?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 通知投影键精确匹配 */
  projectionKey?: null | string;

  /* 接收用户 ID */
  receiverUserId?: null | number;

  /* 开始时间 */
  startDate?: null | string;

  /* 业务投递状态（1=已投递；2=投递失败；3=重试中；4=因偏好关闭而跳过） */
  status?: null | number;
};

export type MessageMonitorDeliveryPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: MessageNotificationDeliveryItemDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [MessageMonitorDeliveryRetryRequest]
 *  @来源 消息中心/监控
 *  @更新时间 2026-05-03 14:46:16
 */
export type MessageMonitorDeliveryRetryRequest =
  RetryMessageNotificationDeliveryDto;

export type MessageMonitorDeliveryRetryResponse = boolean;

/**
 *  类型定义 [MessageMonitorDispatchPageRequest]
 *  @来源 消息中心/监控
 *  @更新时间 2026-05-03 14:46:16
 */
export type MessageMonitorDispatchPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

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

  /* 领域事件 ID（正整数字符串） */
  eventId?: null | string;

  /* 领域事件键 */
  eventKey?: null | string;

  /* 排序字段，json格式 */
  orderBy?: null | string;

  /* 当前页码（从1开始） */
  pageIndex?: null | number;

  /* 单页大小，最大500，默认15 */
  pageSize?: null | number;

  /* 通知投影键精确匹配 */
  projectionKey?: null | string;

  /* 接收用户 ID */
  receiverUserId?: null | number;

  /* 开始时间 */
  startDate?: null | string;
};

export type MessageMonitorDispatchPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: MessageDispatchPageItemDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [MessageMonitorWsSummaryRequest]
 *  @来源 消息中心/监控
 *  @更新时间 2026-05-03 14:46:16
 */
export type MessageMonitorWsSummaryRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 统计窗口（小时） */
  windowHours?: null | number;
};

export type MessageMonitorWsSummaryResponse = MessageWsMonitorSummaryDto;

/**
 *  类型定义 [MessageNotificationTemplatesPageRequest]
 *  @来源 消息中心/通知模板
 *  @更新时间 2026-05-03 14:46:16
 */
export type MessageNotificationTemplatesPageRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 通知分类键，表示模板所属通知业务分类 */
  categoryKey?: string;

  /* 结束时间 */
  endDate?: null | string;

  /* 是否启用 */
  isEnabled?: boolean;

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
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: AdminMessageNotificationTemplateDto[];

  /* 当前页码（从1开始） */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  类型定义 [MessageNotificationTemplatesDetailRequest]
 *  @来源 消息中心/通知模板
 *  @更新时间 2026-05-03 14:46:16
 */
export type MessageNotificationTemplatesDetailRequest = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

export type MessageNotificationTemplatesDetailResponse =
  AdminMessageNotificationTemplateDto;

/**
 *  类型定义 [MessageNotificationTemplatesCreateRequest]
 *  @来源 消息中心/通知模板
 *  @更新时间 2026-05-03 14:46:16
 */
export type MessageNotificationTemplatesCreateRequest =
  CreateNotificationTemplateDto;

export type MessageNotificationTemplatesCreateResponse = boolean;

/**
 *  类型定义 [MessageNotificationTemplatesUpdateRequest]
 *  @来源 消息中心/通知模板
 *  @更新时间 2026-05-03 14:46:16
 */
export type MessageNotificationTemplatesUpdateRequest =
  UpdateNotificationTemplateDto;

export type MessageNotificationTemplatesUpdateResponse = boolean;

/**
 *  类型定义 [MessageNotificationTemplatesUpdateEnabledRequest]
 *  @来源 消息中心/通知模板
 *  @更新时间 2026-05-03 14:46:16
 */
export type MessageNotificationTemplatesUpdateEnabledRequest =
  UpdateNotificationTemplateEnabledDto;

export type MessageNotificationTemplatesUpdateEnabledResponse = boolean;

/**
 *  类型定义 [MessageNotificationTemplatesDeleteRequest]
 *  @来源 消息中心/通知模板
 *  @更新时间 2026-05-03 14:46:16
 */
export type MessageNotificationTemplatesDeleteRequest = IdDto;

export type MessageNotificationTemplatesDeleteResponse = boolean;

/**
 *  类型定义 [MessageNotificationDeliveryItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-03 14:46:16
 */
export type MessageNotificationDeliveryItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 通知分类键 */
  categoryKey?: null | string;
  /* 通知分类中文标签 */
  categoryLabel?: null | string;
  /* 创建时间 */
  createdAt: string;
  /* dispatch ID */
  dispatchId: string;
  /* 关联的领域事件 ID */
  eventId: string;
  /* 领域事件键 */
  eventKey?: null | string;
  /* 最近一次失败原因 */
  failureReason?: null | string;
  /* 模板回退原因 */
  fallbackReason?: null | string;
  /* 投递结果 ID */
  id: number;
  /* 最近一次业务投递尝试时间 */
  lastAttemptAt: string;
  /* 关联的站内通知 ID */
  notificationId?: null | number;
  /* 通知投影键 */
  projectionKey?: null | string;
  /* 接收用户 ID */
  receiverUserId?: null | number;
  /* 业务投递状态（1=已投递；2=投递失败；3=重试中；4=因偏好关闭而跳过） */
  status: 1 | 2 | 3 | 4;
  /* 业务投递结果中文标签 */
  statusLabel: string;
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
 *  @更新时间 2026-05-03 14:46:16
 */
export type RetryMessageNotificationDeliveryDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 通知 dispatch ID */
  dispatchId: string;
};

/**
 *  类型定义 [MessageDispatchPageItemDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-03 14:46:16
 */
export type MessageDispatchPageItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* consumer */
  consumer: string;
  /* 通知投影业务状态（1=已投递；2=投递失败；3=重试中；4=因偏好关闭而跳过） */
  deliveryStatus?: null | number;
  /* dispatch ID */
  dispatchId: string;
  /* 领域事件 dispatch 技术状态（0=待处理；1=处理中；2=成功；3=失败） */
  dispatchStatus: 0 | 1 | 2 | 3;
  /* 领域事件域 */
  domain: string;
  /* 领域事件 ID */
  eventId: string;
  /* 领域事件键 */
  eventKey: string;
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
 *  @更新时间 2026-05-03 14:46:16
 */
export type MessageWsMonitorSummaryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* ack 失败数量 */
  ackErrorCount: number;
  /* ack 成功数量 */
  ackSuccessCount: number;
  /* ack 成功率（0~1） */
  ackSuccessRate: number;
  /* 平均 ack 延迟（毫秒） */
  avgAckLatencyMs: number;
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
 *  类型定义 [AdminMessageNotificationTemplateDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-03 14:46:16
 */
export type AdminMessageNotificationTemplateDto = {
  /** 任意合法数值 */
  [property: string]: any;
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
 *  @更新时间 2026-05-03 14:46:16
 */
export type CreateNotificationTemplateDto = {
  /** 任意合法数值 */
  [property: string]: any;
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
  isEnabled?: boolean;
  /* 备注 */
  remark?: null | string;

  /* 标题模板；支持 {{title}}、{{actor.nickname}}、{{data.object.title}} 等占位符 */
  titleTemplate: string;
};

/**
 *  类型定义 [UpdateNotificationTemplateDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-03 14:46:16
 */
export type UpdateNotificationTemplateDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 通知分类键，表示模板所属通知业务分类 */
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
    | 'user_followed';
  /* 正文模板；支持 {{content}}、{{data.object.title}}、{{data.object.snippet}} 等占位符 */
  contentTemplate?: string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean;
  /* 备注 */
  remark?: null | string;

  /* 标题模板；支持 {{title}}、{{actor.nickname}}、{{data.object.title}} 等占位符 */
  titleTemplate?: string;
};

/**
 *  类型定义 [UpdateNotificationTemplateEnabledDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-03 14:46:16
 */
export type UpdateNotificationTemplateEnabledDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 是否启用 */
  isEnabled: boolean;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-03 14:46:16
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};
