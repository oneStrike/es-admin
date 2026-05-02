import type { AdminTaskReconciliationItemDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

import {
  formatInstanceStepSummary,
  formatLatestEvent,
  formatUniqueFacts,
  taskRewardSettlementStatusOptions,
  taskVisibleStatusOptions,
} from './options';

export const taskReconciliationSearchFormSchema: EsFormSchema = [
  {
    component: 'InputNumber',
    fieldName: 'instanceId',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '任务实例 ID',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'taskId',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '任务头 ID',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'userId',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '用户 ID',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'rewardSettlementId',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '结算事实 ID',
    },
  },
  {
    component: 'Select',
    fieldName: 'settlementStatus',
    componentProps: {
      clearable: true,
      options: taskRewardSettlementStatusOptions,
      placeholder: '补偿状态',
    },
  },
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

const taskReconciliationTableSchema: EsFormSchema = [
  { component: 'InputNumber', fieldName: 'id', label: '实例 ID' },
  { component: 'Input', fieldName: 'task', label: '任务' },
  { component: 'InputNumber', fieldName: 'userId', label: '用户 ID' },
  { component: 'Select', fieldName: 'visibleStatus', label: '可见状态' },
  {
    component: 'InputNumber',
    fieldName: 'rewardSettlementId',
    label: '结算事实 ID',
  },
  { component: 'Select', fieldName: 'settlementStatus', label: '补偿状态' },
  { component: 'Select', fieldName: 'settlementResult', label: '补偿结果' },
  { component: 'Input', fieldName: 'steps', label: '步骤摘要' },
  { component: 'Input', fieldName: 'cycleKey', label: '周期键' },
  { component: 'Input', fieldName: 'uniqueFacts', label: '唯一事实摘要' },
  { component: 'Input', fieldName: 'latestEvent', label: '最近事件' },
  { component: 'DatePicker', fieldName: 'claimedAt', label: '领取时间' },
  { component: 'DatePicker', fieldName: 'completedAt', label: '完成时间' },
  { component: 'DatePicker', fieldName: 'createdAt', label: '创建时间' },
];

export const taskReconciliationColumns =
  formSchemaTransform.toTableColumns<AdminTaskReconciliationItemDto>(
    taskReconciliationTableSchema,
    {
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
        minWidth: 100,
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
      rewardSettlementId: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 120,
      },
      settlementStatus: {
        formatter: undefined,
        minWidth: 140,
        slots: { default: 'settlementStatus' },
      },
      settlementResult: {
        formatter: undefined,
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
      createdAt: {
        cellRender: { name: 'CellDate' },
        minWidth: 170,
      },
    },
  );
