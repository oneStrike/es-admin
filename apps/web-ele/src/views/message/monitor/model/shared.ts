export const dispatchStatusOptions = [
  { label: '待处理', value: 0, color: 'info' as const },
  { label: '处理中', value: 1, color: 'primary' as const },
  { label: '成功', value: 2, color: 'success' as const },
  { label: '失败', value: 3, color: 'danger' as const },
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

export function removeEmptyValues<T extends Record<string, any>>(values: T) {
  return Object.fromEntries(
    Object.entries(values).filter(
      ([, value]) => value !== '' && value !== null && value !== undefined,
    ),
  ) as Partial<T>;
}

export function splitDateRange(formValues?: Record<string, any>) {
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
