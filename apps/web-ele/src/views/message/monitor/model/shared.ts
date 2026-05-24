import {
  isNotificationCategoryKey,
  notificationCategoryMap,
} from '../../model/notification';

export const monitorBusinessLabels = {
  consumer: '处理通道',
  deliveryId: '送达记录编号',
  deliveryStatus: '通知送达状态',
  dispatchId: '发送任务编号',
  dispatchStatus: '发送任务状态',
  domain: '业务模块',
  eventId: '业务事件编号',
  eventKey: '通知触发场景',
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
  usedTemplate: '使用通知模板',
} as const;

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

export const attentionSummaryQueries = {
  failedDelivery: { pageIndex: 1, pageSize: 1, status: 2 },
  failedDispatch: { dispatchStatus: 3, pageIndex: 1, pageSize: 1 },
  retryingDelivery: { pageIndex: 1, pageSize: 1, status: 3 },
} as const;

export function removeEmptyValues<T extends Record<string, unknown>>(
  values: T,
) {
  return Object.fromEntries(
    Object.entries(values).filter(
      ([, value]) => value !== '' && value !== null && value !== undefined,
    ),
  ) as Partial<T>;
}

export function splitDateRange(formValues?: Record<string, unknown>) {
  const { dateRange, ...restFormValues } = formValues || {};
  const [startDate, endDate] = Array.isArray(dateRange) ? dateRange : [];

  return removeEmptyValues({
    ...restFormValues,
    endDate,
    startDate,
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

export function getPageTotal(response?: null | { total?: number }) {
  return response?.total ?? 0;
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
