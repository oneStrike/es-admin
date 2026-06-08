import type { MessageDispatchPageItemDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';
import { createAppUserTableSelectProps } from '#/views/user-manager/shared/app-user-select';

import { notificationCategoryOptions } from '../../model/notification';
import {
  deliveryStatusOptions,
  dispatchStatusOptions,
  messageEventSceneOptions,
  monitorBusinessLabels,
} from './shared';

const receiverUserSelectProps = createAppUserTableSelectProps({
  emitScalar: true,
  multiple: false,
  placeholder: '搜索并选择接收用户',
  title: '选择消息接收用户',
});

const dispatchFormSchema: EsFormSchema = [
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
      options: dispatchStatusOptions,
      placeholder: '发送任务状态',
    },
    fieldName: 'dispatchStatus',
    label: monitorBusinessLabels.dispatchStatus,
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: deliveryStatusOptions,
      placeholder: '通知送达状态',
    },
    fieldName: 'deliveryStatus',
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
    fieldName: 'domain',
    label: monitorBusinessLabels.domain,
  },
  {
    component: 'Input',
    fieldName: 'consumer',
    label: monitorBusinessLabels.consumer,
  },
  {
    component: 'Input',
    fieldName: 'projectionKey',
    label: monitorBusinessLabels.projectionKey,
  },
  {
    component: 'InputNumber',
    fieldName: 'retryCount',
    label: monitorBusinessLabels.retryCount,
  },
  {
    component: 'DatePicker',
    fieldName: 'nextRetryAt',
    label: monitorBusinessLabels.nextRetryAt,
  },
  {
    component: 'DatePicker',
    fieldName: 'processedAt',
    label: monitorBusinessLabels.processedAt,
  },
  {
    component: 'Input',
    fieldName: 'lastError',
    label: monitorBusinessLabels.lastError,
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

export const dispatchSearchFormSchema = formSchemaTransform.toSearchSchema(
  dispatchFormSchema,
  {
    categoryKey: { show: true },
    eventKey: { show: true },
    dispatchStatus: { show: true },
    deliveryStatus: { show: true },
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
    domain: {
      show: false,
      componentProps: {
        placeholder: '高级诊断：业务模块',
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

export const dispatchColumns =
  formSchemaTransform.toTableColumns<MessageDispatchPageItemDto>(
    dispatchFormSchema,
    {
      categoryKey: {
        hide: true,
        minWidth: 160,
        sort: 0,
      },
      consumer: {
        hide: true,
        minWidth: 150,
        showOverflow: 'tooltip',
      },
      dateRange: { hide: true },
      dispatchId: {
        hide: true,
        minWidth: 190,
        showOverflow: 'tooltip',
        sortable: true,
      },
      domain: {
        hide: true,
        minWidth: 130,
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
      lastError: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 260,
        showOverflow: 'tooltip',
      },
      nextRetryAt: {
        cellRender: {
          name: 'CellDate',
        },
        minWidth: 170,
      },
      processedAt: {
        cellRender: {
          name: 'CellDate',
        },
        minWidth: 170,
      },
      projectionKey: {
        hide: true,
        minWidth: 170,
        showOverflow: 'tooltip',
      },
      receiverUserId: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 120,
      },
      retryCount: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 120,
      },
    },
  );
