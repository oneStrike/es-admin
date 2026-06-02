import type { TagProps } from 'element-plus';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  WorkflowAttemptDto,
  WorkflowItemDto,
  WorkflowItemPageRequest,
  WorkflowJobDto,
  WorkflowPageRequest,
} from '#/api/types/workflow';
import type { EsFormSchema } from '#/types';

import { formatUTC, formSchemaTransform } from '#/utils';

import { formatWorkflowErrorTitle } from './error-presenter';

type WorkflowStatus = WorkflowJobDto['status'];
type WorkflowItemStatus = WorkflowItemDto['status'];
type WorkflowAttemptStatus = WorkflowAttemptDto['status'];
type WorkflowTagType = TagProps['type'];
type WorkflowSort = {
  field: string;
  order: string;
};
type WorkflowArchiveScope = 'active' | 'all' | 'archived';

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
export const workflowTerminalStatuses = new Set<WorkflowStatus>([
  4, 5, 6, 7, 8,
]);
export const workflowRetryableStatuses = new Set<WorkflowStatus>([5, 6]);
export const failedWorkflowItemStatus: WorkflowItemStatus = 4;
export const retryingWorkflowItemStatus: WorkflowItemStatus = 5;
export const defaultWorkflowArchiveScope: WorkflowArchiveScope = 'active';

export const workflowArchiveScopeOptions = [
  { label: '未归档', value: 'active' },
  { label: '已归档', value: 'archived' },
  { label: '全部', value: 'all' },
] as const;

export const workflowTypeOptions = [
  { label: '三方导入', value: 'content-import.third-party-import' },
  { label: '三方同步', value: 'content-import.third-party-sync' },
  { label: '压缩包导入', value: 'content-import.archive-import' },
  { label: '批量发券', value: 'coupon.admin-grant-batch' },
] as const;

const workflowListSchema: EsFormSchema = [
  { component: 'Input', fieldName: 'displayName', label: '任务' },
  { component: 'Input', fieldName: 'jobId', label: '任务ID' },
  {
    component: 'Select',
    componentProps: {
      options: workflowTypeOptions,
    },
    fieldName: 'workflowType',
    label: '工作流类型',
  },
  {
    component: 'Select',
    componentProps: {
      options: workflowStatusOptions,
    },
    fieldName: 'status',
    label: '任务状态',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: false,
      options: workflowArchiveScopeOptions,
    },
    fieldName: 'archiveScope',
    label: '归档范围',
  },
  { component: 'InputNumber', fieldName: 'progressPercent', label: '进度' },
  { component: 'InputNumber', fieldName: 'operatorUserId', label: '操作者' },
];

const workflowItemListSchema: EsFormSchema = [
  { component: 'Input', fieldName: 'title', label: '条目' },
  { component: 'Input', fieldName: 'subjectLabel', label: '对象' },
  {
    component: 'Select',
    componentProps: {
      options: workflowItemStatusOptions,
    },
    fieldName: 'status',
    label: '状态',
  },
  { component: 'InputNumber', fieldName: 'successCount', label: '成功数' },
  { component: 'InputNumber', fieldName: 'totalCount', label: '总数' },
  { component: 'InputNumber', fieldName: 'failureCount', label: '失败次数' },
  { component: 'Input', fieldName: 'nextRetryAt', label: '自动重试' },
  { component: 'Input', fieldName: 'lastError', label: '问题' },
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
    archiveScope: {
      show: true,
      defaultValue: defaultWorkflowArchiveScope,
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

export const workflowItemSearchSchema = formSchemaTransform.toSearchSchema(
  workflowItemListSchema,
  {
    status: {
      show: true,
      componentProps: {
        class: 'w-[180px]',
        placeholder: '条目状态',
      },
    },
    dateRange: {
      component: 'DatePicker',
      componentProps: {
        class: 'w-[400px]',
        endPlaceholder: '结束时间',
        format: 'YYYY-MM-DD HH:mm:ss',
        startPlaceholder: '开始时间',
        type: 'datetimerange',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
      },
      fieldName: 'dateRange',
      label: '更新时间',
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
      slots: { default: 'status' },
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
  VxeGridProps<WorkflowItemDto>['columns']
>[number] = {
  align: 'center',
  fixed: 'left',
  type: 'checkbox',
  width: 48,
};

export const workflowItemColumns: NonNullable<
  VxeGridProps<WorkflowItemDto>['columns']
> = [
  workflowItemSelectionColumn,
  ...formSchemaTransform.toTableColumns<WorkflowItemDto>(
    workflowItemListSchema,
    {
      title: {
        minWidth: 220,
        showOverflow: 'tooltip',
      },
      subjectLabel: {
        formatter: ({ row }) => formatWorkflowItemSubject(row),
        minWidth: 180,
        showOverflow: 'tooltip',
      },
      status: {
        width: 110,
      },
      successCount: {
        formatter: ({ row }) => formatWorkflowItemCount(row),
        title: '数量',
        width: 140,
      },
      totalCount: {
        hide: true,
      },
      failureCount: {
        width: 110,
      },
      nextRetryAt: {
        formatter: ({ row }) => formatWorkflowItemRetrySummary(row),
        minWidth: 260,
        showOverflow: 'tooltip',
        slots: { default: 'nextRetryAt' },
      },
      lastError: {
        formatter: ({ row }) => formatWorkflowItemProblem(row.lastError),
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
  filters?: Record<string, unknown>;
  jobId: string;
  pageSize: number;
  sorts?: WorkflowSort[];
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

function getWorkflowArchiveScope(value: unknown): WorkflowArchiveScope {
  return workflowArchiveScopeOptions.some((item) => item.value === value)
    ? (value as WorkflowArchiveScope)
    : defaultWorkflowArchiveScope;
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

  request.archiveScope = getWorkflowArchiveScope(filters.archiveScope);
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
  filters = {},
  jobId,
  pageSize,
  sorts = [],
  status,
}: BuildWorkflowItemPageRequestOptions): WorkflowItemPageRequest {
  const request: WorkflowItemPageRequest = {
    jobId: jobId.trim(),
    pageIndex: currentPage,
    pageSize,
  };
  const dateRange = getDateRange(filters);
  const itemStatus =
    typeof filters.status === 'number' ? filters.status : status;
  const orderBy = formatSorts(sorts);

  if (typeof itemStatus === 'number') {
    request.status = itemStatus;
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

export function canCancelWorkflow(
  task: Pick<WorkflowJobDto, 'cancelRequestedAt' | 'status'>,
) {
  return workflowActiveStatuses.has(task.status) && !task.cancelRequestedAt;
}

export function canArchiveWorkflow(
  task: Pick<WorkflowJobDto, 'archivedAt' | 'status'>,
) {
  return workflowTerminalStatuses.has(task.status) && !task.archivedAt;
}

export function canExpireWorkflow(task: WorkflowJobDto) {
  return workflowRetryableStatuses.has(task.status);
}

export function canManualRetryItem(item: Pick<WorkflowItemDto, 'status'>) {
  return item.status === failedWorkflowItemStatus;
}

export function canRetryWorkflowItems(
  task: null | Pick<WorkflowJobDto, 'jobId'>,
  items: Array<Pick<WorkflowItemDto, 'status'>>,
) {
  return (
    Boolean(task?.jobId) &&
    items.length > 0 &&
    items.every((item) => canManualRetryItem(item))
  );
}

export function getWorkflowItemCheckboxDisabledReason(
  item: Pick<WorkflowItemDto, 'nextRetryAt' | 'status'>,
) {
  if (item.status === retryingWorkflowItemStatus) {
    const retryCopy = item.nextRetryAt ? '等待自动重试' : '等待恢复执行';
    return `${retryCopy}，终态失败后才可手动重试`;
  }
  if (!canManualRetryItem(item)) {
    return '仅终态失败条目可手动重试';
  }
  return '';
}

function formatRetryCount(item: Pick<WorkflowItemDto, 'metadata'>) {
  const count = readMetadataNumber(item.metadata, 'autoRetryCount') ?? 0;
  if (count <= 0) {
    return '';
  }
  const max = readMetadataNumber(item.metadata, 'maxAutoRetries');
  return max === undefined ? `${count}` : `${count}/${max}`;
}

export function formatWorkflowItemRetrySummary(
  item: Pick<
    WorkflowItemDto,
    'lastError' | 'metadata' | 'nextRetryAt' | 'status'
  >,
) {
  const parts: string[] = [];

  if (item.status === retryingWorkflowItemStatus) {
    parts.push(item.nextRetryAt ? '等待自动重试' : '等待恢复执行');
  }

  if (item.nextRetryAt) {
    parts.push(`预计 ${formatUTC(item.nextRetryAt)}`);
  }

  const retryCount = formatRetryCount(item);
  if (retryCount) {
    parts.push(`自动重试 ${retryCount}`);
  }

  return parts.length > 0 ? parts.join('，') : '-';
}

export function formatWorkflowItemProblem(error: WorkflowItemDto['lastError']) {
  return formatWorkflowErrorTitle(error);
}

export function formatWorkflowJobProgress(
  job: Pick<
    WorkflowJobDto,
    'progressCode' | 'progressContext' | 'progressDetail' | 'workflowType'
  >,
) {
  if (job.workflowType === 'coupon.admin-grant-batch' && !job.progressCode) {
    return formatCouponGrantProgress(job.progressContext);
  }

  return formatWorkflowErrorTitle(
    {
      code: job.progressCode,
      context: job.progressContext ?? job.progressDetail ?? {},
    },
    '等待进度更新',
  );
}

function readMetadataNumber(
  metadata: null | Record<string, any> | undefined,
  key: string,
) {
  const value = metadata?.[key];
  return typeof value === 'number' && Number.isFinite(value)
    ? value
    : undefined;
}

function formatWorkflowItemSubject(item: WorkflowItemDto) {
  return item.subjectLabel || item.title || item.itemId;
}

function formatWorkflowItemCount(item: WorkflowItemDto) {
  const imageTotal = readMetadataNumber(item.metadata, 'imageTotal');
  if (imageTotal !== undefined) {
    return `${item.successCount}/${item.totalCount} 张`;
  }

  return `${item.successCount}/${item.totalCount}`;
}

function formatCouponGrantProgress(context?: null | Record<string, any>) {
  const completedItemCount =
    readMetadataNumber(context, 'completedItemCount') ?? 0;
  const selectedItemCount =
    readMetadataNumber(context, 'selectedItemCount') ?? 0;
  return `批量发券进度：用户 ${completedItemCount}/${selectedItemCount}`;
}

export function formatWorkflowStatus(status?: null | number) {
  return formatStatusOption(workflowStatusOptions, status);
}

export function formatWorkflowJobStatus(
  job: Pick<WorkflowJobDto, 'cancelRequestedAt' | 'status'>,
) {
  return workflowActiveStatuses.has(job.status) && job.cancelRequestedAt
    ? { label: '取消中', type: 'warning' as const, value: job.status }
    : formatWorkflowStatus(job.status);
}

export function formatWorkflowItemStatus(status?: null | number) {
  return formatStatusOption(workflowItemStatusOptions, status);
}

export function formatWorkflowAttemptStatus(status?: null | number) {
  return formatStatusOption(workflowAttemptStatusOptions, status);
}

export function formatWorkflowType(type: string) {
  return workflowTypeOptions.find((item) => item.value === type)?.label ?? type;
}

export function formatWorkflowOperator(job: WorkflowJobDto) {
  return job.operatorType === 1 && job.operatorUserId
    ? `管理员 #${job.operatorUserId}`
    : '系统';
}
