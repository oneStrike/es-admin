import type { MessageDispatchPageItemDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

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

const dispatchTableSchema: EsFormSchema = [
  { component: 'Input', fieldName: 'dispatchId', label: 'Dispatch ID' },
  { component: 'Input', fieldName: 'eventId', label: '事件 ID' },
  { component: 'Input', fieldName: 'eventKey', label: '事件 key' },
  { component: 'Input', fieldName: 'domain', label: '事件域' },
  { component: 'Input', fieldName: 'consumer', label: 'Consumer' },
  { component: 'Select', fieldName: 'dispatchStatus', label: '技术状态' },
  { component: 'Select', fieldName: 'deliveryStatus', label: '投递状态' },
  { component: 'Input', fieldName: 'projectionKey', label: '投影 key' },
  { component: 'InputNumber', fieldName: 'receiverUserId', label: '接收用户' },
  { component: 'InputNumber', fieldName: 'retryCount', label: '重试次数' },
  { component: 'DatePicker', fieldName: 'nextRetryAt', label: '下次重试' },
  { component: 'DatePicker', fieldName: 'processedAt', label: '处理完成' },
  { component: 'Input', fieldName: 'lastError', label: '最后错误' },
];

export const dispatchColumns =
  formSchemaTransform.toTableColumns<MessageDispatchPageItemDto>(
    dispatchTableSchema,
    {
      dispatchId: {
        fixed: 'left',
        minWidth: 190,
        showOverflow: 'tooltip',
        sortable: true,
      },
      eventId: {
        minWidth: 160,
        showOverflow: 'tooltip',
      },
      eventKey: {
        minWidth: 180,
        showOverflow: 'tooltip',
      },
      domain: {
        minWidth: 130,
        showOverflow: 'tooltip',
      },
      consumer: {
        minWidth: 150,
        showOverflow: 'tooltip',
      },
      dispatchStatus: {
        cellRender: {
          name: 'CellTag',
          props: {
            mapOptions: dispatchStatusOptions,
          },
        },
        minWidth: 110,
      },
      deliveryStatus: {
        cellRender: {
          name: 'CellTag',
          props: {
            mapOptions: deliveryStatusOptions,
          },
        },
        minWidth: 140,
      },
      projectionKey: {
        minWidth: 170,
        showOverflow: 'tooltip',
      },
      receiverUserId: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 120,
        sortable: true,
      },
      retryCount: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 110,
        sortable: true,
      },
      nextRetryAt: {
        cellRender: {
          name: 'CellDate',
        },
        minWidth: 160,
      },
      processedAt: {
        cellRender: {
          name: 'CellDate',
        },
        minWidth: 160,
      },
      lastError: {
        formatter: ({ cellValue }) => cellValue || '-',
        minWidth: 260,
        showOverflow: 'tooltip',
      },
    },
  );
