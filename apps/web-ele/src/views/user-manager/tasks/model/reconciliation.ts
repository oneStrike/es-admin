import type { AdminTaskReconciliationItemDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';
import { createAppUserTableSelectProps } from '#/views/user-manager/shared/app-user-select';

import {
  formatInstanceStepSummary,
  formatLatestEvent,
  formatUniqueFacts,
  taskRewardSettlementStatusOptions,
  taskVisibleStatusOptions,
} from './options';
import { createTaskDefinitionTableSelectProps } from './task-select';

type TaskReconciliationSchemaField = EsFormSchema[number];

const taskReconciliationFieldCatalog = {
  rewardSettlementId: {
    component: 'InputNumber',
    fieldName: 'rewardSettlementId',
    label: '结算事实 ID',
  },
  settlementStatus: {
    component: 'Select',
    fieldName: 'settlementStatus',
    label: '补偿状态',
  },
  userId: {
    component: 'TableSelect',
    componentProps: createAppUserTableSelectProps({
      emitScalar: true,
      multiple: false,
      placeholder: '搜索并选择 APP 用户',
      title: '选择对账用户',
    }),
    fieldName: 'userId',
    label: '用户',
  },
} satisfies Record<string, TaskReconciliationSchemaField>;

function createTaskReconciliationField(
  field: keyof typeof taskReconciliationFieldCatalog,
  overrides: Partial<TaskReconciliationSchemaField> = {},
): TaskReconciliationSchemaField {
  const base = taskReconciliationFieldCatalog[
    field
  ] as TaskReconciliationSchemaField;
  const componentProps = overrides.componentProps ?? base.componentProps;

  return {
    ...base,
    ...overrides,
    componentProps:
      componentProps &&
      typeof componentProps === 'object' &&
      !Array.isArray(componentProps)
        ? { ...componentProps }
        : componentProps,
  };
}

const taskReconciliationListSchema: EsFormSchema = [
  {
    component: 'InputNumber',
    fieldName: 'instanceId',
    label: '任务实例 ID',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '任务实例 ID',
    },
  },
  {
    component: 'TableSelect',
    fieldName: 'taskId',
    label: '任务',
    componentProps: createTaskDefinitionTableSelectProps({
      emitScalar: true,
      multiple: false,
      placeholder: '搜索并选择任务',
      title: '选择对账任务',
    }),
  },
  createTaskReconciliationField('userId', {
    componentProps: createAppUserTableSelectProps({
      emitScalar: true,
      multiple: false,
      placeholder: '搜索并选择 APP 用户',
      title: '选择对账用户',
    }),
  }),
  createTaskReconciliationField('rewardSettlementId', {
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '结算事实 ID',
    },
  }),
  createTaskReconciliationField('settlementStatus', {
    componentProps: {
      clearable: true,
      options: taskRewardSettlementStatusOptions,
      placeholder: '补偿状态',
    },
  }),
  { component: 'InputNumber', fieldName: 'id', label: '实例 ID' },
  { component: 'Input', fieldName: 'task', label: '任务' },
  {
    component: 'Select',
    componentProps: { options: taskVisibleStatusOptions },
    fieldName: 'visibleStatus',
    label: '可见状态',
  },
  { component: 'Select', fieldName: 'settlementResult', label: '补偿结果' },
  { component: 'Input', fieldName: 'steps', label: '步骤摘要' },
  { component: 'Input', fieldName: 'cycleKey', label: '周期键' },
  { component: 'Input', fieldName: 'uniqueFacts', label: '唯一事实摘要' },
  { component: 'Input', fieldName: 'latestEvent', label: '最近事件' },
  { component: 'DatePicker', fieldName: 'claimedAt', label: '领取时间' },
  { component: 'DatePicker', fieldName: 'completedAt', label: '完成时间' },
];

export const taskReconciliationSearchFormSchema =
  formSchemaTransform.toSearchSchema(taskReconciliationListSchema, {
    userId: {
      show: true,
      component: 'TableSelect',
      componentProps: createAppUserTableSelectProps({
        emitScalar: true,
        multiple: false,
        placeholder: '搜索并选择 APP 用户',
        title: '选择对账用户',
      }),
    },
    rewardSettlementId: {
      show: false,
      componentProps: {
        class: '!w-full',
        min: 1,
        placeholder: '高级诊断：结算事实 ID',
      },
    },
    settlementStatus: {
      show: true,
      componentProps: {
        clearable: true,
        options: taskRewardSettlementStatusOptions,
        placeholder: '补偿状态',
      },
    },
    instanceId: {
      show: false,
      componentProps: {
        class: '!w-full',
        min: 1,
        placeholder: '高级诊断：任务实例 ID',
      },
    },
    taskId: {
      show: true,
      component: 'TableSelect',
      componentProps: createTaskDefinitionTableSelectProps({
        emitScalar: true,
        multiple: false,
        placeholder: '搜索并选择任务',
        title: '选择对账任务',
      }),
    },
    dateRange: {
      component: 'DatePicker',
      componentProps: {
        clearable: true,
        endPlaceholder: '结束日期',
        startPlaceholder: '开始日期',
        type: 'daterange',
        valueFormat: 'YYYY-MM-DD',
      },
      fieldName: 'dateRange',
    },
  });

export const taskReconciliationColumns =
  formSchemaTransform.toTableColumns<AdminTaskReconciliationItemDto>(
    taskReconciliationListSchema,
    {
      instanceId: { hide: true },
      taskId: { hide: true },
      id: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 90,
      },
      task: {
        formatter: ({ cellValue }) =>
          cellValue?.title || `任务 ${cellValue?.id || '-'}`,
        minWidth: 220,
        showOverflow: 'tooltip',
      },
      userId: {
        formatter: ({ cellValue }) => cellValue ?? '-',
      },
      rewardSettlementId: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 120,
      },
      settlementStatus: {
        minWidth: 140,
        slots: { default: 'settlementStatus' },
      },
      settlementResult: {
        minWidth: 140,
        slots: { default: 'settlementResult' },
      },
      steps: {
        formatter: ({ cellValue }) => formatInstanceStepSummary(cellValue),
        minWidth: 220,
        showOverflow: 'tooltip',
      },
      cycleKey: {
        minWidth: 140,
      },
      uniqueFacts: {
        formatter: ({ cellValue }) => formatUniqueFacts(cellValue),
        minWidth: 220,
        showOverflow: 'tooltip',
      },
      latestEvent: {
        formatter: ({ cellValue }) => formatLatestEvent(cellValue),
        minWidth: 260,
        showOverflow: 'tooltip',
      },
      claimedAt: {
        cellRender: { name: 'CellDate' },
        minWidth: 170,
      },
      completedAt: {
        cellRender: { name: 'CellDate' },
        minWidth: 170,
      },
      actions: {
        show: true,
        minWidth: 130,
      },
    },
  );
