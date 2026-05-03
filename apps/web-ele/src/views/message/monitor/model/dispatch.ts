import type { MessageDispatchPageItemDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

import {
  deliveryStatusOptions,
  dispatchStatusOptions,
  monitorBusinessLabels,
} from './shared';

const dispatchFormSchema: EsFormSchema = [
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
    component: 'Select',
    componentProps: {
      options: dispatchStatusOptions.map(({ color: _color, ...rest }) => rest),
    },
    fieldName: 'dispatchStatus',
    label: monitorBusinessLabels.dispatchStatus,
  },
  {
    component: 'Select',
    componentProps: {
      options: deliveryStatusOptions.map(({ color: _color, ...rest }) => rest),
    },
    fieldName: 'deliveryStatus',
    label: monitorBusinessLabels.deliveryStatus,
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
    dispatchId: { show: true },
    eventId: { show: true },
    eventKey: { show: true },
    domain: { show: true },
    dispatchStatus: { show: true },
    deliveryStatus: { show: true },
    projectionKey: { show: true },
    receiverUserId: { show: true },
    dateRange: { show: true },
  },
);

export const dispatchColumns =
  formSchemaTransform.toTableColumns<MessageDispatchPageItemDto>(
    dispatchFormSchema,
    {
      consumer: {
        minWidth: 150,
        showOverflow: 'tooltip',
      },
      dateRange: { hide: true },
      deliveryStatus: {
        cellRender: {
          name: 'CellTag',
          props: {
            mapOptions: deliveryStatusOptions,
          },
        },
        minWidth: 140,
      },
      dispatchId: {
        fixed: 'left',
        minWidth: 190,
        showOverflow: 'tooltip',
        sortable: true,
      },
      dispatchStatus: {
        cellRender: {
          name: 'CellTag',
          props: {
            mapOptions: dispatchStatusOptions,
          },
        },
        minWidth: 130,
      },
      domain: {
        minWidth: 130,
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
      lastError: {
        formatter: ({ cellValue }) => cellValue || '-',
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
        minWidth: 120,
        sortable: true,
      },
    },
  );
