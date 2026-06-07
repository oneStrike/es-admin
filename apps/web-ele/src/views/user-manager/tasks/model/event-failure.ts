import type { TaskEventFailurePageItemDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';
import { createAppUserTableSelectProps } from '#/views/user-manager/shared/app-user-select';

import { getOptionLabel } from './options';

export const taskEventFailureStatusOptions = [
  { color: 'warning' as const, label: '待重试', value: 1 },
  { color: 'primary' as const, label: '重试中', value: 2 },
  { color: 'success' as const, label: '已解决', value: 3 },
  { color: 'danger' as const, label: '终态失败', value: 4 },
];

const taskEventFailureListSchema: EsFormSchema = [
  { component: 'Input', fieldName: 'eventKey', label: '事件名称' },
  { component: 'Input', fieldName: 'eventBizKey', label: '事件幂等键' },
  { component: 'InputNumber', fieldName: 'eventCode', label: '事件编码' },
  {
    component: 'TableSelect',
    componentProps: createAppUserTableSelectProps({
      emitScalar: true,
      multiple: false,
      placeholder: '搜索并选择 APP 用户',
      title: '选择失败事件用户',
    }),
    fieldName: 'userId',
    label: '用户',
  },
  {
    component: 'Select',
    componentProps: { options: taskEventFailureStatusOptions },
    fieldName: 'status',
    label: '状态',
  },
  { component: 'Input', fieldName: 'templateKey', label: '事件模板' },
  { component: 'Input', fieldName: 'targetType', label: '目标类型' },
  { component: 'InputNumber', fieldName: 'targetId', label: '目标 ID' },
  { component: 'InputNumber', fieldName: 'retryCount', label: '重试次数' },
  { component: 'Input', fieldName: 'lastErrorMessage', label: '失败原因' },
  { component: 'DatePicker', fieldName: 'occurredAt', label: '发生时间' },
  { component: 'DatePicker', fieldName: 'lastRetryAt', label: '最近重试' },
];

export const taskEventFailureSearchFormSchema =
  formSchemaTransform.toSearchSchema(taskEventFailureListSchema, {
    eventKey: {
      show: true,
      componentProps: {
        clearable: true,
        placeholder: '事件名称',
      },
    },
    eventBizKey: {
      show: false,
      componentProps: {
        clearable: true,
        placeholder: '高级诊断：事件幂等键',
      },
    },
    userId: {
      show: true,
      component: 'TableSelect',
      componentProps: createAppUserTableSelectProps({
        emitScalar: true,
        multiple: false,
        placeholder: '搜索并选择 APP 用户',
        title: '选择失败事件用户',
      }),
    },
    status: {
      show: true,
      componentProps: {
        clearable: true,
        options: taskEventFailureStatusOptions,
        placeholder: '状态',
      },
    },
    eventCode: {
      show: false,
      componentProps: {
        class: '!w-full',
        min: 1,
        placeholder: '高级诊断：事件编码',
      },
    },
  });

export const taskEventFailureColumns =
  formSchemaTransform.toTableColumns<TaskEventFailurePageItemDto>(
    taskEventFailureListSchema,
    {
      eventKey: {
        minWidth: 160,
        showOverflow: 'tooltip',
      },
      eventBizKey: {
        minWidth: 220,
        showOverflow: 'tooltip',
      },
      eventCode: {
        hide: true,
      },
      userId: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 100,
      },
      status: {
        formatter: ({ cellValue }) =>
          getOptionLabel(taskEventFailureStatusOptions, cellValue),
        minWidth: 110,
      },
      templateKey: {
        minWidth: 150,
        showOverflow: 'tooltip',
      },
      targetType: {
        minWidth: 120,
      },
      targetId: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 100,
      },
      retryCount: {
        minWidth: 100,
      },
      lastErrorMessage: {
        minWidth: 260,
        showOverflow: 'tooltip',
      },
      occurredAt: {
        cellRender: { name: 'CellDate' },
        minWidth: 170,
      },
      lastRetryAt: {
        cellRender: { name: 'CellDate' },
        minWidth: 170,
      },
      actions: {
        show: true,
        minWidth: 120,
      },
    },
  );

export function isRetryableTaskEventFailure(row: TaskEventFailurePageItemDto) {
  return row.status === 1 && row.retryCount < 5;
}
