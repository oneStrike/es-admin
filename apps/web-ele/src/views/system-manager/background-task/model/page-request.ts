import type { BackgroundTaskPageRequest } from '#/api/types/backgroundTask';

export const backgroundTaskSortFieldOptions = [
  { label: '开始时间', value: 'startedAt' },
  { label: '完成时间', value: 'finishedAt' },
  { label: '创建时间', value: 'createdAt' },
  { label: '更新时间', value: 'updatedAt' },
] as const;

export type BackgroundTaskSortField =
  (typeof backgroundTaskSortFieldOptions)[number]['value'];

export type BackgroundTaskSortOrder = 'asc' | 'desc';

export interface BackgroundTaskSort {
  field: BackgroundTaskSortField;
  order: BackgroundTaskSortOrder;
}

export interface BuildBackgroundTaskPageRequestOptions {
  currentPage: number;
  filters?: Record<string, unknown>;
  pageSize: number;
  sorts?: BackgroundTaskSort[];
}

function getTrimmedString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

export function buildBackgroundTaskPageRequest({
  currentPage,
  filters = {},
  pageSize,
  sorts = [],
}: BuildBackgroundTaskPageRequestOptions): BackgroundTaskPageRequest {
  const request: BackgroundTaskPageRequest = {
    pageIndex: currentPage,
    pageSize,
  };
  const taskId = getTrimmedString(filters.taskId);
  const taskType = getTrimmedString(filters.taskType);
  const dateRange = Array.isArray(filters.dateRange) ? filters.dateRange : [];

  if (taskId) {
    request.taskId = taskId;
  }
  if (taskType) {
    request.taskType = taskType;
  }
  if (typeof filters.status === 'number') {
    request.status = filters.status;
  }
  if (typeof dateRange[0] === 'string') {
    request.startDate = dateRange[0];
  }
  if (typeof dateRange[1] === 'string') {
    request.endDate = dateRange[1];
  }
  if (sorts.length > 0) {
    request.orderBy = JSON.stringify(
      sorts.map((item) => ({ [item.field]: item.order })),
    );
  }

  return request;
}
