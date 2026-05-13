import type { BackgroundTaskDto } from '#/api/types/backgroundTask';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

import { backgroundTaskStatusOptions } from './status';

export {
  backgroundTaskStatusOptions,
  formatBackgroundTaskStatus,
} from './status';

const backgroundTaskListSchema: EsFormSchema = [
  { component: 'Input', fieldName: 'taskId', label: '任务ID' },
  { component: 'Input', fieldName: 'taskType', label: '任务类型' },
  {
    component: 'Select',
    componentProps: {
      options: backgroundTaskStatusOptions,
    },
    fieldName: 'status',
    label: '任务状态',
  },
  { component: 'InputNumber', fieldName: 'retryCount', label: '重试次数' },
  { component: 'InputNumber', fieldName: 'maxRetries', label: '最大重试' },
  { component: 'Input', fieldName: 'claimedBy', label: '处理 Worker' },
  { component: 'DatePicker', fieldName: 'startedAt', label: '开始时间' },
  { component: 'DatePicker', fieldName: 'finishedAt', label: '完成时间' },
];

export const backgroundTaskColumns =
  formSchemaTransform.toTableColumns<BackgroundTaskDto>(
    backgroundTaskListSchema,
    {
      seq: { width: 70 },
      taskId: { minWidth: 240, showOverflow: 'tooltip' },
      taskType: { minWidth: 180, showOverflow: 'tooltip' },
      status: {
        cellRender: {
          name: 'CellTag',
          props: { mapOptions: backgroundTaskStatusOptions },
        },
        width: 120,
      },
      retryCount: { width: 100 },
      maxRetries: { width: 100 },
      claimedBy: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 150,
        showOverflow: 'tooltip',
      },
      startedAt: {
        cellRender: { name: 'CellDate' },
        sortable: true,
        width: 170,
      },
      finishedAt: {
        cellRender: { name: 'CellDate' },
        sortable: true,
        width: 170,
      },
      createdAt: {
        cellRender: { name: 'CellDate' },
        sortable: true,
        width: 170,
      },
      updatedAt: {
        cellRender: { name: 'CellDate' },
        sortable: true,
        width: 170,
      },
      actions: { show: true, width: 180 },
    },
  );

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

export function formatTaskJson(value: unknown) {
  if (value === null || value === undefined) return '-';
  return JSON.stringify(value, null, 2);
}
