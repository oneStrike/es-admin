import type { MessageNotificationDeliveryItemDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';
import { createAppUserTableSelectProps } from '#/views/user-manager/shared/app-user-select';

import { notificationCategoryOptions } from '../../model/notification';
import {
  deliveryStatusOptions,
  messageEventSceneOptions,
  monitorBusinessLabels,
} from './shared';

const receiverUserSelectProps = createAppUserTableSelectProps({
  emitScalar: true,
  multiple: false,
  placeholder: '搜索并选择接收用户',
  title: '选择通知接收用户',
});

const deliveryFormSchema: EsFormSchema = [
  {
    component: 'InputNumber',
    fieldName: 'id',
    label: monitorBusinessLabels.deliveryId,
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      filterable: true,
      options: notificationCategoryOptions,
      placeholder: '通知类型',
    },
    fieldName: 'categoryKey',
    label: '通知类型',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      filterable: true,
      options: messageEventSceneOptions,
      placeholder: '通知触发场景',
    },
    fieldName: 'eventKey',
    label: monitorBusinessLabels.eventKey,
  },
  {
    component: 'Input',
    fieldName: 'eventLabel',
    label: monitorBusinessLabels.eventLabel,
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: deliveryStatusOptions,
      placeholder: '通知送达状态',
    },
    fieldName: 'status',
    label: monitorBusinessLabels.deliveryStatus,
  },
  {
    component: 'TableSelect',
    componentProps: receiverUserSelectProps,
    fieldName: 'receiverUserId',
    label: monitorBusinessLabels.receiverUserId,
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
    fieldName: 'projectionKey',
    label: monitorBusinessLabels.projectionKey,
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
    categoryKey: { show: true },
    eventKey: { show: true },
    status: { show: true },
    receiverUserId: {
      show: true,
      component: 'TableSelect',
      componentProps: receiverUserSelectProps,
    },
    dateRange: { show: true },
    dispatchId: {
      show: false,
      componentProps: {
        placeholder: '高级诊断：发送任务编号',
      },
    },
    eventId: {
      show: false,
      componentProps: {
        placeholder: '高级诊断：业务事件编号',
      },
    },
    projectionKey: {
      show: false,
      componentProps: {
        placeholder: '高级诊断：通知关联标识',
      },
    },
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
        minWidth: 160,
        slots: { default: 'category' },
        sort: 0,
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
        hide: true,
        minWidth: 190,
        showOverflow: 'tooltip',
      },
      eventId: {
        hide: true,
        minWidth: 160,
        showOverflow: 'tooltip',
      },
      eventKey: {
        hide: true,
        minWidth: 180,
        showOverflow: 'tooltip',
      },
      eventLabel: {
        minWidth: 170,
        showOverflow: 'tooltip',
        sort: 1,
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
        hide: true,
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
        hide: true,
        minWidth: 120,
      },
      projectionKey: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        hide: true,
        minWidth: 170,
        showOverflow: 'tooltip',
      },
      receiverUserId: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 120,
      },
      status: {
        minWidth: 130,
        slots: { default: 'deliveryStatus' },
      },
      templateId: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        hide: true,
        minWidth: 120,
      },
      updatedAt: {
        cellRender: {
          name: 'CellDate',
        },
        minWidth: 160,
        sortable: true,
      },
    },
  );
