import type { BackgroundTaskDto } from '#/api/types/backgroundTask';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

import { backgroundTaskStatusOptions } from './status';

const backgroundTaskOperatorOptions = [
  { label: '后台管理员', value: 1 },
  { label: '系统', value: 2 },
] as const;

export {
  canCancelBackgroundTask,
  canRetryBackgroundTask,
  formatDiagnosticJson,
  getDiagnosticMessage,
  hasActiveBackgroundTasks,
  isActiveBackgroundTaskStatus,
  isTerminalBackgroundTaskStatus,
  resolveBackgroundTaskProgress,
} from './progress';
export {
  backgroundTaskStatusOptions,
  formatBackgroundTaskStatus,
} from './status';
export {
  backgroundTaskTypeOptions,
  formatBackgroundTaskType,
} from './task-type';

export function formatBackgroundTaskOperator(task: BackgroundTaskDto) {
  const operator = backgroundTaskOperatorOptions.find(
    (item) => item.value === task.operatorType,
  );
  if (task.operatorType === 1) {
    return task.operatorUserId
      ? `${operator?.label ?? '后台管理员'} #${task.operatorUserId}`
      : `${operator?.label ?? '后台管理员'} #未知`;
  }
  return operator?.label ?? String(task.operatorType);
}

const backgroundTaskListSchema: EsFormSchema = [
  { component: 'Input', fieldName: 'taskId', label: '任务ID' },
  { component: 'Input', fieldName: 'taskType', label: '任务类型' },
  { component: 'Input', fieldName: 'operatorType', label: '操作者' },
  {
    component: 'Select',
    componentProps: {
      options: backgroundTaskStatusOptions,
    },
    fieldName: 'status',
    label: '任务状态',
  },
  { component: 'Input', fieldName: 'progress', label: '进度' },
  { component: 'InputNumber', fieldName: 'retryCount', label: '重试次数' },
  { component: 'InputNumber', fieldName: 'maxRetries', label: '最大重试' },
  { component: 'Input', fieldName: 'claimedBy', label: '处理 Worker' },
  { component: 'DatePicker', fieldName: 'startedAt', label: '开始时间' },
  { component: 'DatePicker', fieldName: 'finishedAt', label: '完成时间' },
];

export const backgroundTaskSearchSchema = formSchemaTransform.toSearchSchema(
  backgroundTaskListSchema,
  {
    taskId: {
      show: true,
      componentProps: {
        placeholder: '任务ID',
      },
    },
    taskType: {
      show: true,
      componentProps: {
        placeholder: '任务类型',
      },
    },
    status: {
      show: true,
      componentProps: {
        placeholder: '任务状态',
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
