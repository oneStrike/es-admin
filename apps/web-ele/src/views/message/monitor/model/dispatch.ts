import type { VxeGridPropTypes } from '#/adapter/vxe-table';
import type { MessageDispatchPageItemDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { deliveryStatusOptions, dispatchStatusOptions } from './shared';

export const dispatchSearchFormSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: 'Dispatch ID',
    },
    fieldName: 'dispatchId',
  },
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '事件 ID',
    },
    fieldName: 'eventId',
  },
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '事件 key',
    },
    fieldName: 'eventKey',
  },
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '事件域',
    },
    fieldName: 'domain',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: dispatchStatusOptions.map(({ color: _color, ...rest }) => rest),
      placeholder: '技术状态',
    },
    fieldName: 'dispatchStatus',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: deliveryStatusOptions.map(({ color: _color, ...rest }) => rest),
      placeholder: '投递状态',
    },
    fieldName: 'deliveryStatus',
  },
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '通知投影 key',
    },
    fieldName: 'projectionKey',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      controlsPosition: 'right',
      min: 1,
      placeholder: '接收用户 ID',
    },
    fieldName: 'receiverUserId',
  },
  {
    component: 'DatePicker',
    componentProps: {
      clearable: true,
      endPlaceholder: '结束时间',
      startPlaceholder: '开始时间',
      type: 'daterange',
      valueFormat: 'YYYY-MM-DD',
    },
    fieldName: 'dateRange',
  },
];

export const dispatchColumns: VxeGridPropTypes.Columns<MessageDispatchPageItemDto> =
  [
    {
      field: 'dispatchId',
      fixed: 'left',
      minWidth: 190,
      showOverflow: 'tooltip',
      sortable: true,
      title: 'Dispatch ID',
    },
    {
      field: 'eventId',
      minWidth: 160,
      showOverflow: 'tooltip',
      title: '事件 ID',
    },
    {
      field: 'eventKey',
      minWidth: 180,
      showOverflow: 'tooltip',
      title: '事件 key',
    },
    {
      field: 'domain',
      minWidth: 130,
      showOverflow: 'tooltip',
      title: '事件域',
    },
    {
      field: 'consumer',
      minWidth: 150,
      showOverflow: 'tooltip',
      title: 'Consumer',
    },
    {
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: dispatchStatusOptions,
        },
      },
      field: 'dispatchStatus',
      minWidth: 110,
      title: '技术状态',
    },
    {
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: deliveryStatusOptions,
        },
      },
      field: 'deliveryStatus',
      minWidth: 140,
      title: '投递状态',
    },
    {
      field: 'projectionKey',
      minWidth: 170,
      showOverflow: 'tooltip',
      title: '投影 key',
    },
    {
      field: 'receiverUserId',
      minWidth: 120,
      sortable: true,
      title: '接收用户',
    },
    {
      field: 'retryCount',
      minWidth: 110,
      sortable: true,
      title: '重试次数',
    },
    {
      cellRender: {
        name: 'CellDate',
      },
      field: 'nextRetryAt',
      minWidth: 160,
      title: '下次重试',
    },
    {
      cellRender: {
        name: 'CellDate',
      },
      field: 'processedAt',
      minWidth: 160,
      title: '处理完成',
    },
    {
      field: 'lastError',
      minWidth: 260,
      showOverflow: 'tooltip',
      title: '最后错误',
      formatter: ({ cellValue }) => cellValue || '-',
    },
  ];
