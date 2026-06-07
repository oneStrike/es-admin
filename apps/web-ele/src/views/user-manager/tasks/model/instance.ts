import type { TaskInstanceViewDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';
import { createAppUserTableSelectProps } from '#/views/user-manager/shared/app-user-select';

import {
  formatInstanceStepSummary,
  getOptionLabel,
  taskInstanceStatusOptions,
  taskRewardSettlementStatusOptions,
  taskSceneTypeOptions,
  taskVisibleStatusOptions,
} from './options';
import { createTaskDefinitionTableSelectProps } from './task-select';

type TaskInstanceSchemaField = EsFormSchema[number];

const taskInstanceFieldCatalog = {
  status: {
    component: 'Select',
    fieldName: 'status',
    label: '实例状态',
  },
  taskId: {
    component: 'TableSelect',
    componentProps: createTaskDefinitionTableSelectProps({
      emitScalar: true,
      multiple: false,
      placeholder: '搜索并选择任务',
      title: '选择任务实例所属任务',
    }),
    fieldName: 'taskId',
    label: '任务',
  },
  userId: {
    component: 'TableSelect',
    componentProps: createAppUserTableSelectProps({
      emitScalar: true,
      multiple: false,
      placeholder: '搜索并选择 APP 用户',
      title: '选择任务实例用户',
    }),
    fieldName: 'userId',
    label: '用户',
  },
} satisfies Record<string, TaskInstanceSchemaField>;

function createTaskInstanceField(
  field: keyof typeof taskInstanceFieldCatalog,
  overrides: Partial<TaskInstanceSchemaField> = {},
): TaskInstanceSchemaField {
  const base = taskInstanceFieldCatalog[field] as TaskInstanceSchemaField;
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

const taskInstanceListSchema: EsFormSchema = [
  { component: 'InputNumber', fieldName: 'id', label: '实例 ID' },
  createTaskInstanceField('taskId', {
    componentProps: createTaskDefinitionTableSelectProps({
      emitScalar: true,
      multiple: false,
      placeholder: '搜索并选择任务',
      title: '选择任务实例所属任务',
    }),
  }),
  createTaskInstanceField('userId', {
    componentProps: createAppUserTableSelectProps({
      emitScalar: true,
      multiple: false,
      placeholder: '搜索并选择 APP 用户',
      title: '选择任务实例用户',
    }),
  }),
  {
    component: 'Select',
    fieldName: 'sceneType',
    label: '任务场景',
    componentProps: {
      clearable: true,
      options: taskSceneTypeOptions,
      placeholder: '任务场景',
    },
  },
  createTaskInstanceField('status', {
    componentProps: {
      clearable: true,
      options: taskInstanceStatusOptions,
      placeholder: '实例状态',
    },
  }),
  {
    component: 'Select',
    componentProps: { options: taskVisibleStatusOptions },
    fieldName: 'visibleStatus',
    label: '可见状态',
  },
  { component: 'Input', fieldName: 'steps', label: '步骤摘要' },
  { component: 'Input', fieldName: 'cycleKey', label: '周期键' },
  {
    component: 'Select',
    fieldName: 'rewardSettlement',
    label: '奖励补偿',
  },
  {
    component: 'InputNumber',
    fieldName: 'rewardSettlementId',
    label: '结算事实 ID',
  },
  { component: 'DatePicker', fieldName: 'claimedAt', label: '领取时间' },
  { component: 'DatePicker', fieldName: 'completedAt', label: '完成时间' },
  { component: 'DatePicker', fieldName: 'expiredAt', label: '过期时间' },
];

export const taskInstanceSearchFormSchema = formSchemaTransform.toSearchSchema(
  taskInstanceListSchema,
  {
    taskId: {
      show: true,
      component: 'TableSelect',
      componentProps: createTaskDefinitionTableSelectProps({
        emitScalar: true,
        multiple: false,
        placeholder: '搜索并选择任务',
        title: '选择任务实例所属任务',
      }),
    },
    userId: {
      show: true,
      component: 'TableSelect',
      componentProps: createAppUserTableSelectProps({
        emitScalar: true,
        multiple: false,
        placeholder: '搜索并选择 APP 用户',
        title: '选择任务实例用户',
      }),
    },
    sceneType: { show: true },
    status: {
      show: true,
      componentProps: {
        clearable: true,
        options: taskInstanceStatusOptions,
        placeholder: '实例状态',
      },
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
  },
);

export const taskInstanceColumns =
  formSchemaTransform.toTableColumns<TaskInstanceViewDto>(
    taskInstanceListSchema,
    {
      id: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 90,
      },
      taskId: {
        formatter: ({ cellValue }) => cellValue ?? '-',
      },
      userId: {
        formatter: ({ cellValue }) => cellValue ?? '-',
      },
      sceneType: { hide: true },
      steps: {
        formatter: ({ cellValue }) => formatInstanceStepSummary(cellValue),
        minWidth: 260,
        showOverflow: 'tooltip',
      },
      cycleKey: {
        minWidth: 140,
      },
      rewardSettlement: {
        formatter: ({ cellValue, row }) =>
          row.rewardApplicable === 0
            ? '无奖励'
            : getOptionLabel(
                taskRewardSettlementStatusOptions,
                cellValue?.settlementStatus,
              ),
        minWidth: 140,
      },
      rewardSettlementId: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 120,
      },
      claimedAt: {
        cellRender: { name: 'CellDate' },
        minWidth: 170,
      },
      completedAt: {
        cellRender: { name: 'CellDate' },
        minWidth: 170,
      },
      expiredAt: {
        cellRender: { name: 'CellDate' },
        minWidth: 170,
      },
    },
  );
