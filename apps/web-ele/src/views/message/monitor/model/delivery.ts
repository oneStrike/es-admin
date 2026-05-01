import type { VxeGridPropTypes } from '#/adapter/vxe-table';
import type { MessageNotificationDeliveryItemDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { notificationCategoryOptions } from '../../model/notification';
import { deliveryStatusOptions } from './shared';

export const deliverySearchFormSchema: EsFormSchema = [
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
    component: 'Select',
    componentProps: {
      clearable: true,
      filterable: true,
      options: notificationCategoryOptions,
      placeholder: '通知分类',
    },
    fieldName: 'categoryKey',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: deliveryStatusOptions.map(({ color: _color, ...rest }) => rest),
      placeholder: '投递状态',
    },
    fieldName: 'status',
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

export const deliveryColumns: VxeGridPropTypes.Columns<MessageNotificationDeliveryItemDto> =
  [
    {
      field: 'id',
      fixed: 'left',
      minWidth: 100,
      sortable: true,
      title: '投递 ID',
    },
    {
      field: 'dispatchId',
      minWidth: 190,
      showOverflow: 'tooltip',
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
      field: 'categoryLabel',
      minWidth: 160,
      slots: { default: 'category' },
      title: '通知分类',
    },
    {
      field: 'status',
      minWidth: 130,
      slots: { default: 'deliveryStatus' },
      title: '投递状态',
    },
    {
      field: 'usedTemplate',
      minWidth: 130,
      slots: { default: 'usedTemplate' },
      title: '命中模板',
    },
    {
      field: 'templateId',
      formatter: ({ cellValue }) => cellValue ?? '-',
      minWidth: 110,
      title: '模板 ID',
    },
    {
      field: 'notificationId',
      formatter: ({ cellValue }) => cellValue ?? '-',
      minWidth: 120,
      title: '通知 ID',
    },
    {
      field: 'projectionKey',
      formatter: ({ cellValue }) => cellValue || '-',
      minWidth: 170,
      showOverflow: 'tooltip',
      title: '投影 key',
    },
    {
      field: 'receiverUserId',
      formatter: ({ cellValue }) => cellValue ?? '-',
      minWidth: 120,
      sortable: true,
      title: '接收用户',
    },
    {
      cellRender: {
        name: 'CellDate',
      },
      field: 'lastAttemptAt',
      minWidth: 160,
      sortable: true,
      title: '最近尝试',
    },
    {
      field: 'failureReason',
      formatter: ({ cellValue }) => cellValue || '-',
      minWidth: 240,
      showOverflow: 'tooltip',
      title: '失败原因',
    },
    {
      field: 'fallbackReason',
      formatter: ({ cellValue }) => cellValue || '-',
      minWidth: 220,
      showOverflow: 'tooltip',
      title: '回退原因',
    },
    {
      cellRender: {
        name: 'CellDate',
      },
      field: 'createdAt',
      minWidth: 160,
      sortable: true,
      title: '创建时间',
    },
    {
      cellRender: {
        name: 'CellDate',
      },
      field: 'updatedAt',
      minWidth: 160,
      sortable: true,
      title: '更新时间',
    },
    {
      field: 'actions',
      fixed: 'right',
      slots: { default: 'actions' },
      title: '操作',
      width: 100,
    },
  ];
