import type {
  MessageMonitorDeliveryPageRequest,
  MessageMonitorDispatchPageRequest,
} from '#/api/types';

import {
  isNotificationCategoryKey,
  notificationCategoryMap,
} from '../../model/notification';

type DateRangeSearchValues = {
  dateRange?: string[];
};

export const monitorBusinessLabels = {
  consumer: '处理通道',
  deliveryId: '送达记录编号',
  deliveryStatus: '通知送达状态',
  dispatchId: '发送任务编号',
  dispatchStatus: '发送任务状态',
  domain: '业务模块',
  eventId: '业务事件编号',
  eventKey: '通知触发场景',
  eventLabel: '通知触发场景',
  failureReason: '送达失败原因',
  fallbackReason: '模板替代原因',
  lastAttemptAt: '最近发送时间',
  lastError: '任务异常原因',
  nextRetryAt: '下次自动重试时间',
  notificationId: '站内信编号',
  processedAt: '任务处理完成时间',
  projectionKey: '通知关联标识',
  receiverUserId: '接收用户',
  retryCount: '已重试次数',
  templateId: '通知模板编号',
} as const;

export const messageEventSceneOptions = [
  { label: '评论回复', value: 'comment.replied' },
  { label: '评论提及', value: 'comment.mentioned' },
  { label: '评论点赞', value: 'comment.liked' },
  { label: '内容点赞', value: 'topic.liked' },
  { label: '内容收藏', value: 'topic.favorited' },
  { label: '内容评论', value: 'topic.commented' },
  { label: '内容提及', value: 'topic.mentioned' },
  { label: '用户关注', value: 'user.followed' },
  { label: '公告发布', value: 'announcement.published' },
  { label: '公告撤回', value: 'announcement.unpublished' },
  { label: '任务自动派单提醒', value: 'task.reminder.auto_assigned' },
  { label: '任务即将到期提醒', value: 'task.reminder.expiring' },
  { label: '任务奖励到账提醒', value: 'task.reminder.reward_granted' },
  { label: '聊天消息', value: 'chat.message.created' },
];

export const dispatchStatusOptions = [
  { label: '等待发送', value: 0, color: 'info' as const },
  { label: '发送处理中', value: 1, color: 'primary' as const },
  { label: '发送任务成功', value: 2, color: 'success' as const },
  { label: '发送任务失败', value: 3, color: 'danger' as const },
];

export const deliveryStatusOptions = [
  { label: '已投递', value: 1, color: 'success' as const },
  { label: '投递失败', value: 2, color: 'danger' as const },
  { label: '重试中', value: 3, color: 'warning' as const },
  { label: '偏好关闭跳过', value: 4, color: 'info' as const },
];

export const booleanOptions = [
  { label: '是', value: true, color: 'success' as const },
  { label: '否', value: false, color: 'info' as const },
];

export const dispatchStatusMap = Object.fromEntries(
  dispatchStatusOptions.map((item) => [item.value, item]),
) as Record<number, (typeof dispatchStatusOptions)[number]>;

export const deliveryStatusMap = Object.fromEntries(
  deliveryStatusOptions.map((item) => [item.value, item]),
) as Record<number, (typeof deliveryStatusOptions)[number]>;

export function removeEmptyValues<T extends Record<string, unknown>>(
  values: T,
) {
  return Object.fromEntries(
    Object.entries(values).filter(
      ([, value]) => value !== '' && value !== null && value !== undefined,
    ),
  ) as Partial<T>;
}

function toOptionalNumber(value: unknown) {
  if (value === '' || value === null || value === undefined) {
    return undefined;
  }

  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : undefined;
}

function toOptionalString(value: unknown) {
  if (value === null || value === undefined) {
    return undefined;
  }

  const stringValue = String(value).trim();
  return stringValue || undefined;
}

function splitDateRange<T extends DateRangeSearchValues>(formValues?: T) {
  const { dateRange, ...restFormValues } = formValues || {};
  const [startDate, endDate] = Array.isArray(dateRange) ? dateRange : [];

  return {
    ...(restFormValues as Omit<T, 'dateRange'>),
    endDate,
    startDate,
  };
}

export function buildDispatchPageQuery(
  formValues?: DateRangeSearchValues &
    Partial<MessageMonitorDispatchPageRequest>,
) {
  const values = splitDateRange(formValues);

  return removeEmptyValues({
    categoryKey: toOptionalString(values.categoryKey),
    deliveryStatus: toOptionalNumber(values.deliveryStatus),
    dispatchId: toOptionalString(values.dispatchId),
    dispatchStatus: toOptionalNumber(values.dispatchStatus),
    domain: toOptionalString(values.domain),
    endDate: toOptionalString(values.endDate),
    eventId: toOptionalString(values.eventId),
    eventKey: toOptionalString(values.eventKey),
    projectionKey: toOptionalString(values.projectionKey),
    receiverUserId: toOptionalNumber(values.receiverUserId),
    startDate: toOptionalString(values.startDate),
  });
}

export function buildDeliveryPageQuery(
  formValues?: DateRangeSearchValues &
    Partial<MessageMonitorDeliveryPageRequest>,
) {
  const values = splitDateRange(formValues);

  return removeEmptyValues({
    categoryKey: toOptionalString(values.categoryKey),
    dispatchId: toOptionalString(values.dispatchId),
    endDate: toOptionalString(values.endDate),
    eventId: toOptionalString(values.eventId),
    eventKey: toOptionalString(values.eventKey),
    projectionKey: toOptionalString(values.projectionKey),
    receiverUserId: toOptionalNumber(values.receiverUserId),
    startDate: toOptionalString(values.startDate),
    status: toOptionalNumber(values.status),
  });
}

export function formatPercent(value?: null | number) {
  if (value === null || value === undefined) {
    return '-';
  }

  return `${(value * 100).toFixed(2)}%`;
}

export function formatMilliseconds(value?: null | number) {
  if (value === null || value === undefined) {
    return '-';
  }

  return `${value.toFixed(0)} ms`;
}

export function formatNullable(value?: null | number | string) {
  return value === null || value === undefined || value === '' ? '-' : value;
}

export function getMonitorNotificationCategoryLabel(options: {
  categoryKey?: null | string;
  categoryLabel?: null | string;
}) {
  if (options.categoryLabel) {
    return options.categoryLabel;
  }
  if (isNotificationCategoryKey(options.categoryKey)) {
    return notificationCategoryMap[options.categoryKey].label;
  }

  return '未识别通知类型';
}
