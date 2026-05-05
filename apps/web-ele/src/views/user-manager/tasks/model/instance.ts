import type { TaskInstanceViewDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

import {
  formatInstanceStepSummary,
  getOptionLabel,
  taskInstanceStatusOptions,
  taskRewardSettlementStatusOptions,
  taskSceneTypeOptions,
  taskVisibleStatusOptions,
} from './options';

type TaskInstanceSchemaField = EsFormSchema[number];

const taskInstanceFieldCatalog = {
  status: {
    component: 'Select',
    fieldName: 'status',
    label: '实例状态',
  },
  taskId: {
    component: 'InputNumber',
    fieldName: 'taskId',
    label: '任务头 ID',
  },
  userId: {
    component: 'InputNumber',
    fieldName: 'userId',
    label: '用户 ID',
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

export const taskInstanceSearchFormSchema: EsFormSchema = [
  createTaskInstanceField('taskId', {
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '任务头 ID',
    },
  }),
  createTaskInstanceField('userId', {
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '用户 ID',
    },
  }),
  {
    component: 'Select',
    fieldName: 'sceneType',
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
    component: 'DatePicker',
    fieldName: 'dateRange',
    componentProps: {
      clearable: true,
      endPlaceholder: '结束时间',
      startPlaceholder: '开始时间',
      type: 'datetimerange',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];

const taskInstanceTableSchema: EsFormSchema = [
  { component: 'InputNumber', fieldName: 'id', label: '实例 ID' },
  createTaskInstanceField('taskId'),
  createTaskInstanceField('userId'),
  createTaskInstanceField('status'),
  { component: 'Select', fieldName: 'visibleStatus', label: '可见状态' },
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

export const taskInstanceColumns =
  formSchemaTransform.toTableColumns<TaskInstanceViewDto>(
    taskInstanceTableSchema,
    {
      id: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 90,
      },
      taskId: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 100,
      },
      userId: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 100,
      },
      status: {
        cellRender: {
          name: 'CellTag',
          props: {
            mapOptions: taskInstanceStatusOptions,
          },
        },
        minWidth: 120,
      },
      visibleStatus: {
        cellRender: {
          name: 'CellTag',
          props: {
            mapOptions: taskVisibleStatusOptions,
          },
        },
        minWidth: 140,
      },
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
      createdAt: {
        cellRender: { name: 'CellDate' },
        minWidth: 170,
      },
      updatedAt: {
        cellRender: { name: 'CellDate' },
        minWidth: 170,
      },
    },
  );
