import type { VxeGridPropTypes } from '#/adapter/vxe-table';
import type { TaskInstanceViewDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import {
  formatInstanceStepSummary,
  getOptionLabel,
  taskInstanceStatusOptions,
  taskRewardSettlementStatusOptions,
  taskSceneTypeOptions,
  taskVisibleStatusOptions,
} from './options';

export const taskInstanceSearchFormSchema: EsFormSchema = [
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
    component: 'Select',
    fieldName: 'sceneType',
    componentProps: {
      clearable: true,
      options: taskSceneTypeOptions,
      placeholder: '任务场景',
    },
  },
  {
    component: 'Select',
    fieldName: 'status',
    componentProps: {
      clearable: true,
      options: taskInstanceStatusOptions,
      placeholder: '实例状态',
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

export const taskInstanceColumns: VxeGridPropTypes.Columns<TaskInstanceViewDto> =
  [
    { field: 'id', minWidth: 90, title: '实例 ID' },
    { field: 'taskId', minWidth: 100, title: '任务头 ID' },
    { field: 'userId', minWidth: 100, title: '用户 ID' },
    {
      field: 'status',
      minWidth: 120,
      title: '实例状态',
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: taskInstanceStatusOptions,
        },
      },
    },
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
    {
      field: 'steps',
      minWidth: 260,
      showOverflow: 'tooltip',
      title: '步骤摘要',
      formatter: ({ cellValue }) => formatInstanceStepSummary(cellValue),
    },
    { field: 'cycleKey', minWidth: 140, title: '周期键' },
    {
      field: 'rewardSettlement',
      minWidth: 140,
      title: '奖励补偿',
      formatter: ({ cellValue, row }) =>
        row.rewardApplicable === 0
          ? '无奖励'
          : getOptionLabel(
              taskRewardSettlementStatusOptions,
              cellValue?.settlementStatus,
            ),
    },
    { field: 'rewardSettlementId', minWidth: 120, title: '结算事实 ID' },
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
      field: 'expiredAt',
      minWidth: 170,
      title: '过期时间',
      cellRender: { name: 'CellDate' },
    },
    {
      field: 'createdAt',
      minWidth: 170,
      title: '创建时间',
      cellRender: { name: 'CellDate' },
    },
    {
      field: 'updatedAt',
      minWidth: 170,
      title: '更新时间',
      cellRender: { name: 'CellDate' },
    },
  ];
