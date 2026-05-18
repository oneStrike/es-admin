import type { TagProps } from 'element-plus';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  ContentImportItemDto,
  WorkflowAttemptDto,
  WorkflowItemPageRequest,
  WorkflowJobDto,
  WorkflowPageRequest,
} from '#/api/types/workflow';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';
import { formatUTC } from '#/utils/dayjs';

type WorkflowStatus = WorkflowJobDto['status'];
type WorkflowItemStatus = ContentImportItemDto['status'];
type WorkflowAttemptStatus = WorkflowAttemptDto['status'];
type WorkflowTagType = TagProps['type'];
type WorkflowSort = {
  field: string;
  order: string;
};

type StatusOption<T extends number> = {
  label: string;
  type: WorkflowTagType;
  value: T;
};

export const WORKFLOW_MANAGER_ROUTE_NAME = 'WorkflowManager';

export const workflowStatusOptions = [
  { label: '草稿', type: 'primary', value: 1 },
  { label: '待处理', type: 'info', value: 2 },
  { label: '处理中', type: 'warning', value: 3 },
  { label: '成功', type: 'success', value: 4 },
  { label: '部分失败', type: 'warning', value: 5 },
  { label: '失败', type: 'danger', value: 6 },
  { label: '已取消', type: 'info', value: 7 },
  { label: '已过期', type: 'warning', value: 8 },
] as const satisfies readonly StatusOption<WorkflowStatus>[];

export const workflowItemStatusOptions = [
  { label: '待处理', type: 'info', value: 1 },
  { label: '处理中', type: 'warning', value: 2 },
  { label: '成功', type: 'success', value: 3 },
  { label: '失败', type: 'danger', value: 4 },
  { label: '重试中', type: 'warning', value: 5 },
  { label: '已跳过', type: 'info', value: 6 },
] as const satisfies readonly StatusOption<WorkflowItemStatus>[];

export const workflowAttemptStatusOptions = [
  { label: '待处理', type: 'info', value: 1 },
  { label: '处理中', type: 'warning', value: 2 },
  { label: '成功', type: 'success', value: 3 },
  { label: '部分失败', type: 'warning', value: 4 },
  { label: '失败', type: 'danger', value: 5 },
  { label: '已取消', type: 'info', value: 6 },
] as const satisfies readonly StatusOption<WorkflowAttemptStatus>[];

export const workflowActiveStatuses = new Set<WorkflowStatus>([1, 2, 3]);
export const workflowRetryableStatuses = new Set<WorkflowStatus>([5, 6]);
export const failedWorkflowItemStatus: WorkflowItemStatus = 4;
export const retryingWorkflowItemStatus: WorkflowItemStatus = 5;

const workflowListSchema: EsFormSchema = [
  { component: 'Input', fieldName: 'displayName', label: '任务' },
  { component: 'Input', fieldName: 'jobId', label: '任务ID' },
  { component: 'Input', fieldName: 'workflowType', label: '工作流类型' },
  {
    component: 'Select',
    componentProps: {
      options: workflowStatusOptions,
    },
    fieldName: 'status',
    label: '任务状态',
  },
  { component: 'InputNumber', fieldName: 'progressPercent', label: '进度' },
  { component: 'InputNumber', fieldName: 'operatorUserId', label: '操作者' },
];

const workflowItemListSchema: EsFormSchema = [
  { component: 'Input', fieldName: 'title', label: '章节' },
  {
    component: 'Select',
    componentProps: {
      options: workflowItemStatusOptions,
    },
    fieldName: 'status',
    label: '状态',
  },
  {
    component: 'InputNumber',
    fieldName: 'imageSuccessCount',
    label: '图片成功数',
  },
  { component: 'InputNumber', fieldName: 'imageTotal', label: '图片总数' },
  { component: 'Input', fieldName: 'nextRetryAt', label: '自动重试' },
  { component: 'Input', fieldName: 'lastErrorMessage', label: '问题' },
];

export const workflowSearchSchema = formSchemaTransform.toSearchSchema(
  workflowListSchema,
  {
    jobId: {
      show: true,
      componentProps: {
        placeholder: '工作流任务 ID',
      },
    },
    workflowType: {
      show: true,
      componentProps: {
        placeholder: '工作流类型',
      },
    },
    status: {
      show: true,
      componentProps: {
        placeholder: '状态',
      },
    },
    dateRange: {
      component: 'DatePicker',
      componentProps: {
        endPlaceholder: '结束时间',
        format: 'YYYY-MM-DD HH:mm:ss',
        startPlaceholder: '开始时间',
        type: 'datetimerange',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
      },
      fieldName: 'dateRange',
      label: '创建时间',
      show: true,
    },
  },
);

export const workflowColumns =
  formSchemaTransform.toTableColumns<WorkflowJobDto>(workflowListSchema, {
    displayName: {
      minWidth: 260,
      slots: { default: 'displayName' },
    },
    jobId: {
      hide: true,
    },
    workflowType: {
      minWidth: 150,
      slots: { default: 'workflowType' },
    },
    status: {
      width: 120,
    },
    progressPercent: {
      minWidth: 220,
      slots: { default: 'progress' },
    },
    operatorUserId: {
      slots: { default: 'operator' },
      width: 130,
    },
    updatedAt: {
      sort: 90,
      width: 180,
    },
    actions: {
      show: true,
      width: 280,
    },
  });

const workflowItemSelectionColumn: NonNullable<
  VxeGridProps<ContentImportItemDto>['columns']
>[number] = {
  align: 'center',
  fixed: 'left',
  type: 'checkbox',
  width: 48,
};

export const workflowItemColumns: NonNullable<
  VxeGridProps<ContentImportItemDto>['columns']
> = [
  workflowItemSelectionColumn,
  ...formSchemaTransform.toTableColumns<ContentImportItemDto>(
    workflowItemListSchema,
    {
      title: {
        minWidth: 220,
        showOverflow: 'tooltip',
      },
      status: {
        width: 110,
      },
      imageSuccessCount: {
        slots: { default: 'imageProgress' },
        title: '图片',
        width: 120,
      },
      imageTotal: {
        hide: true,
      },
      nextRetryAt: {
        formatter: ({ row }) => formatWorkflowItemRetrySummary(row),
        minWidth: 260,
        showOverflow: 'tooltip',
        slots: { default: 'nextRetryAt' },
      },
      lastErrorMessage: {
        formatter: ({ cellValue }) => formatWorkflowItemErrorMessage(cellValue),
        minWidth: 260,
        showOverflow: 'tooltip',
      },
    },
  ),
];

export interface BuildWorkflowPageRequestOptions {
  currentPage: number;
  filters?: Record<string, unknown>;
  pageSize: number;
  sorts?: WorkflowSort[];
}

export interface BuildWorkflowItemPageRequestOptions {
  currentPage: number;
  jobId: string;
  pageSize: number;
  status?: number;
}

function getTrimmedString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function getDateRange(filters: Record<string, unknown>) {
  return Array.isArray(filters.dateRange) ? filters.dateRange : [];
}

function formatSorts(sorts: WorkflowSort[]) {
  return sorts.length > 0
    ? JSON.stringify(sorts.map((item) => ({ [item.field]: item.order })))
    : undefined;
}

function formatStatusOption<T extends number>(
  options: readonly StatusOption<T>[],
  status?: null | number,
) {
  return (
    options.find((item) => item.value === status) ?? {
      label: status === undefined || status === null ? '-' : `状态 ${status}`,
      type: 'info' as const,
      value: status ?? 0,
    }
  );
}

export function buildWorkflowManagerRoute(jobId: string) {
  return {
    name: WORKFLOW_MANAGER_ROUTE_NAME,
    query: { jobId: jobId.trim() },
  };
}

export function buildWorkflowPageRequest({
  currentPage,
  filters = {},
  pageSize,
  sorts = [],
}: BuildWorkflowPageRequestOptions): WorkflowPageRequest {
  const request: WorkflowPageRequest = {
    pageIndex: currentPage,
    pageSize,
  };
  const dateRange = getDateRange(filters);
  const jobId = getTrimmedString(filters.jobId);
  const workflowType = getTrimmedString(filters.workflowType);
  const orderBy = formatSorts(sorts);

  if (jobId) {
    request.jobId = jobId;
  }
  if (workflowType) {
    request.workflowType = workflowType;
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
  if (orderBy) {
    request.orderBy = orderBy;
  }

  return request;
}

export function buildWorkflowItemPageRequest({
  currentPage,
  jobId,
  pageSize,
  status,
}: BuildWorkflowItemPageRequestOptions): WorkflowItemPageRequest {
  const request: WorkflowItemPageRequest = {
    jobId: jobId.trim(),
    pageIndex: currentPage,
    pageSize,
  };
  if (typeof status === 'number') {
    request.status = status;
  }
  return request;
}

export function canCancelWorkflow(task: WorkflowJobDto) {
  return workflowActiveStatuses.has(task.status);
}

export function canExpireWorkflow(task: WorkflowJobDto) {
  return workflowRetryableStatuses.has(task.status);
}

export function canManualRetryItem(item: Pick<ContentImportItemDto, 'status'>) {
  return item.status === failedWorkflowItemStatus;
}

export function canRetryWorkflowItems(
  task: null | Pick<WorkflowJobDto, 'jobId'>,
  items: Array<Pick<ContentImportItemDto, 'status'>>,
) {
  return (
    Boolean(task?.jobId) &&
    items.length > 0 &&
    items.every((item) => canManualRetryItem(item))
  );
}

export function getWorkflowItemCheckboxDisabledReason(
  item: Pick<ContentImportItemDto, 'status'>,
) {
  if (item.status === retryingWorkflowItemStatus) {
    return '等待自动重试，终态失败后才可手动重试';
  }
  if (!canManualRetryItem(item)) {
    return '仅终态失败章节可手动重试';
  }
  return '';
}

function formatRetryCount(
  item: Pick<ContentImportItemDto, 'autoRetryCount' | 'maxAutoRetries'>,
) {
  const count =
    typeof item.autoRetryCount === 'number' ? item.autoRetryCount : 0;
  if (count <= 0) {
    return '';
  }
  const max =
    typeof item.maxAutoRetries === 'number' ? item.maxAutoRetries : undefined;
  return max === undefined ? `${count}` : `${count}/${max}`;
}

export function formatWorkflowItemRetrySummary(
  item: Pick<
    ContentImportItemDto,
    | 'autoRetryCount'
    | 'lastRetryCode'
    | 'lastRetryReason'
    | 'maxAutoRetries'
    | 'nextRetryAt'
    | 'status'
  >,
) {
  const parts: string[] = [];

  if (item.status === retryingWorkflowItemStatus) {
    parts.push('等待自动重试');
  }

  if (item.nextRetryAt) {
    parts.push(`预计 ${formatUTC(item.nextRetryAt)}`);
  }

  const retryCount = formatRetryCount(item);
  if (retryCount) {
    parts.push(`自动重试 ${retryCount}`);
  }

  const reason = item.lastRetryReason?.trim();
  if (reason) {
    parts.push(reason);
  }

  const code = item.lastRetryCode?.trim();
  if (code) {
    parts.push(`错误码 ${code}`);
  }

  return parts.length > 0 ? parts.join('，') : '-';
}

export function formatWorkflowItemErrorMessage(message: unknown) {
  if (typeof message !== 'string') {
    return '-';
  }

  const text = message.trim();
  if (!text) {
    return '-';
  }

  if (/Request was throttled/i.test(text)) {
    return '请求太频繁，稍后会自动继续';
  }

  return text;
}

export function formatWorkflowStatus(status?: null | number) {
  return formatStatusOption(workflowStatusOptions, status);
}

export function formatWorkflowItemStatus(status?: null | number) {
  return formatStatusOption(workflowItemStatusOptions, status);
}

export function formatWorkflowAttemptStatus(status?: null | number) {
  return formatStatusOption(workflowAttemptStatusOptions, status);
}

export function formatWorkflowType(type: string) {
  if (type === 'content-import.third-party-import') return '三方导入';
  if (type === 'content-import.third-party-sync') return '三方同步';
  if (type === 'content-import.archive-import') return '压缩包导入';
  return type;
}

export function formatWorkflowOperator(job: WorkflowJobDto) {
  return job.operatorType === 1 && job.operatorUserId
    ? `管理员 #${job.operatorUserId}`
    : '系统';
}
