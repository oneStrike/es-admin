import type { MessageNotificationDeliveryItemDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

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

const deliveryTableSchema: EsFormSchema = [
  { component: 'InputNumber', fieldName: 'id', label: '投递 ID' },
  { component: 'Input', fieldName: 'dispatchId', label: 'Dispatch ID' },
  { component: 'Input', fieldName: 'eventId', label: '事件 ID' },
  { component: 'Input', fieldName: 'eventKey', label: '事件 key' },
  { component: 'Select', fieldName: 'categoryLabel', label: '通知分类' },
  { component: 'Select', fieldName: 'status', label: '投递状态' },
  { component: 'Select', fieldName: 'usedTemplate', label: '命中模板' },
  { component: 'InputNumber', fieldName: 'templateId', label: '模板 ID' },
  { component: 'InputNumber', fieldName: 'notificationId', label: '通知 ID' },
  { component: 'Input', fieldName: 'projectionKey', label: '投影 key' },
  { component: 'InputNumber', fieldName: 'receiverUserId', label: '接收用户' },
  { component: 'DatePicker', fieldName: 'lastAttemptAt', label: '最近尝试' },
  { component: 'Input', fieldName: 'failureReason', label: '失败原因' },
  { component: 'Input', fieldName: 'fallbackReason', label: '回退原因' },
  { component: 'DatePicker', fieldName: 'createdAt', label: '创建时间' },
  { component: 'DatePicker', fieldName: 'updatedAt', label: '更新时间' },
];

export const deliveryColumns =
  formSchemaTransform.toTableColumns<MessageNotificationDeliveryItemDto>(
    deliveryTableSchema,
    {
      id: {
        fixed: 'left',
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 100,
        sortable: true,
      },
      dispatchId: {
        minWidth: 190,
        showOverflow: 'tooltip',
      },
      eventId: {
        minWidth: 160,
        showOverflow: 'tooltip',
      },
      eventKey: {
        minWidth: 180,
        showOverflow: 'tooltip',
      },
      categoryLabel: {
        formatter: undefined,
        minWidth: 160,
        slots: { default: 'category' },
      },
      status: {
        formatter: undefined,
        minWidth: 130,
        slots: { default: 'deliveryStatus' },
      },
      usedTemplate: {
        formatter: undefined,
        minWidth: 130,
        slots: { default: 'usedTemplate' },
      },
      templateId: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 110,
      },
      notificationId: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 120,
      },
      projectionKey: {
        formatter: ({ cellValue }) => cellValue || '-',
        minWidth: 170,
        showOverflow: 'tooltip',
      },
      receiverUserId: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 120,
        sortable: true,
      },
      lastAttemptAt: {
        cellRender: {
          name: 'CellDate',
        },
        minWidth: 160,
        sortable: true,
      },
      failureReason: {
        formatter: ({ cellValue }) => cellValue || '-',
        minWidth: 240,
        showOverflow: 'tooltip',
      },
      fallbackReason: {
        formatter: ({ cellValue }) => cellValue || '-',
        minWidth: 220,
        showOverflow: 'tooltip',
      },
      createdAt: {
        cellRender: {
          name: 'CellDate',
        },
        minWidth: 160,
        sortable: true,
      },
      updatedAt: {
        cellRender: {
          name: 'CellDate',
        },
        minWidth: 160,
        sortable: true,
      },
      actions: {
        show: true,
        fixed: 'right',
        slots: { default: 'actions' },
        width: 100,
      },
    },
  );
