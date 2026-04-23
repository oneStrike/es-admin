import type { VxeGridPropTypes } from '#/adapter/vxe-table';
import type { AdminTaskReconciliationItemDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

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

export const taskReconciliationColumns: VxeGridPropTypes.Columns<AdminTaskReconciliationItemDto> =
  [
    { field: 'id', minWidth: 90, title: '实例 ID' },
    {
      field: 'task',
      minWidth: 220,
      showOverflow: 'tooltip',
      title: '任务',
      formatter: ({ cellValue }) =>
        cellValue?.title || `任务 ${cellValue?.id || '-'}`,
    },
    { field: 'userId', minWidth: 100, title: '用户 ID' },
    {
      field: 'visibleStatus',
      minWidth: 140,
      title: '可见状态',
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: taskVisibleStatusOptions,
        },
      },
    },
    { field: 'rewardSettlementId', minWidth: 120, title: '结算事实 ID' },
    {
      field: 'rewardSettlement',
      minWidth: 140,
      title: '补偿状态',
      slots: { default: 'settlementStatus' },
    },
    {
      field: 'rewardSettlement',
      minWidth: 140,
      title: '补偿结果',
      slots: { default: 'settlementResult' },
    },
    {
      field: 'steps',
      minWidth: 220,
      showOverflow: 'tooltip',
      title: '步骤摘要',
      formatter: ({ cellValue }) => formatInstanceStepSummary(cellValue),
    },
    { field: 'cycleKey', minWidth: 140, title: '周期键' },
    {
      field: 'uniqueFacts',
      minWidth: 220,
      showOverflow: 'tooltip',
      title: '唯一事实摘要',
      formatter: ({ cellValue }) => formatUniqueFacts(cellValue),
    },
    {
      field: 'latestEvent',
      minWidth: 260,
      showOverflow: 'tooltip',
      title: '最近事件',
      formatter: ({ cellValue }) => formatLatestEvent(cellValue),
    },
    {
      field: 'claimedAt',
      minWidth: 170,
      title: '领取时间',
      cellRender: { name: 'CellDate' },
    },
    {
      field: 'completedAt',
      minWidth: 170,
      title: '完成时间',
      cellRender: { name: 'CellDate' },
    },
    {
      field: 'createdAt',
      minWidth: 170,
      title: '创建时间',
      cellRender: { name: 'CellDate' },
    },
  ];
