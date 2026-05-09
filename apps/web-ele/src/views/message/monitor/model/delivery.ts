import type { MessageNotificationDeliveryItemDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

import { notificationCategoryOptions } from '../../model/notification';
import {
  booleanOptions,
  deliveryStatusOptions,
  monitorBusinessLabels,
} from './shared';

const deliveryFormSchema: EsFormSchema = [
  {
    component: 'InputNumber',
    fieldName: 'id',
    label: monitorBusinessLabels.deliveryId,
  },
  {
    component: 'Input',
    fieldName: 'dispatchId',
    label: monitorBusinessLabels.dispatchId,
  },
  {
    component: 'Input',
    fieldName: 'eventId',
    label: monitorBusinessLabels.eventId,
  },
  {
    component: 'Input',
    fieldName: 'eventKey',
    label: monitorBusinessLabels.eventKey,
  },
  {
    component: 'Select',
    componentProps: {
      options: notificationCategoryOptions,
    },
    fieldName: 'categoryKey',
    label: '通知类型',
  },
  {
    component: 'Select',
    componentProps: {
      options: deliveryStatusOptions,
    },
    fieldName: 'status',
    label: monitorBusinessLabels.deliveryStatus,
  },
  {
    component: 'Select',
    componentProps: {
      options: booleanOptions,
    },
    fieldName: 'usedTemplate',
    label: monitorBusinessLabels.usedTemplate,
  },
  {
    component: 'InputNumber',
    fieldName: 'templateId',
    label: monitorBusinessLabels.templateId,
  },
  {
    component: 'InputNumber',
    fieldName: 'notificationId',
    label: monitorBusinessLabels.notificationId,
  },
  {
    component: 'Input',
    fieldName: 'projectionKey',
    label: monitorBusinessLabels.projectionKey,
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      controlsPosition: 'right',
      min: 1,
    },
    fieldName: 'receiverUserId',
    label: monitorBusinessLabels.receiverUserId,
  },
  {
    component: 'DatePicker',
    fieldName: 'lastAttemptAt',
    label: monitorBusinessLabels.lastAttemptAt,
  },
  {
    component: 'Input',
    fieldName: 'failureReason',
    label: monitorBusinessLabels.failureReason,
  },
  {
    component: 'Input',
    fieldName: 'fallbackReason',
    label: monitorBusinessLabels.fallbackReason,
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
    label: '创建时间',
  },
];

export const deliverySearchFormSchema = formSchemaTransform.toSearchSchema(
  deliveryFormSchema,
  {
    dispatchId: { show: true },
    eventId: { show: true },
    eventKey: { show: true },
    categoryKey: { show: true },
    status: { show: true },
    projectionKey: { show: true },
    receiverUserId: { show: true },
    dateRange: { show: true },
  },
);

export const deliveryColumns =
  formSchemaTransform.toTableColumns<MessageNotificationDeliveryItemDto>(
    deliveryFormSchema,
    {
      actions: {
        show: true,
        width: 100,
      },
      categoryKey: {
        formatter: undefined,
        minWidth: 160,
        slots: { default: 'category' },
      },
      createdAt: {
        cellRender: {
          name: 'CellDate',
        },
        minWidth: 160,
        sortable: true,
      },
      dateRange: { hide: true },
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
      failureReason: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 240,
        showOverflow: 'tooltip',
      },
      fallbackReason: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 220,
        showOverflow: 'tooltip',
      },
      id: {
        fixed: 'left',
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
      notificationId: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 120,
      },
      projectionKey: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 170,
        showOverflow: 'tooltip',
      },
      receiverUserId: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 120,
        sortable: true,
      },
      status: {
        formatter: undefined,
        minWidth: 130,
        slots: { default: 'deliveryStatus' },
      },
      templateId: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 120,
      },
      updatedAt: {
        cellRender: {
          name: 'CellDate',
        },
        minWidth: 160,
        sortable: true,
      },
      usedTemplate: {
        formatter: undefined,
        minWidth: 130,
        slots: { default: 'usedTemplate' },
      },
    },
  );
