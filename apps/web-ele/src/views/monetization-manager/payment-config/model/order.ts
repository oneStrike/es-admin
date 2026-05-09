import type {
  MonetizationPaymentOrderPageResponse,
  MonetizationPaymentOrderUpdateStatusRequest,
} from '#/api/types';
import type { DetailCard } from '#/components/es-record-detail';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';
import { getOptionLabel } from '#/utils/options';

import {
  paymentOrderStatusOptions,
  paymentOrderTypeOptions,
  subscriptionModeOptions,
} from './options';

export type PaymentOrderRow = NonNullable<
  MonetizationPaymentOrderPageResponse['list']
>[number] & {
  confirmLoading?: boolean;
};

export type PaymentOrderConfirmFormValues = {
  notifyPayloadText?: unknown;
  orderNo?: unknown;
  paidAmount?: unknown;
  providerTradeNo?: unknown;
};

function normalizeText(value: unknown) {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed || undefined;
}

function normalizeNullableText(value: unknown) {
  return normalizeText(value) ?? null;
}

function normalizeOptionalNumber(value: unknown) {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }

  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : undefined;
}

function normalizeNullableNumber(value: unknown) {
  return normalizeOptionalNumber(value) ?? null;
}

function requireText(value: unknown, label: string) {
  const text = normalizeText(value);

  if (!text) {
    throw new Error(`${label}不能为空`);
  }

  return text;
}

function formatCentAmount(value: unknown) {
  const numberValue = normalizeOptionalNumber(value);

  if (numberValue === undefined) {
    return '-';
  }

  return `¥${(numberValue / 100).toFixed(2)}`;
}

export function canConfirmPaymentOrder(row: Pick<PaymentOrderRow, 'status'>) {
  return row.status === 1;
}

export function formatJsonTextarea(value: unknown) {
  if (value === null || value === undefined || value === '') {
    return '';
  }

  return JSON.stringify(value, null, 2);
}

export function mapPaymentOrderToConfirmRecord(
  row: Pick<PaymentOrderRow, 'orderNo' | 'payableAmount'>,
): PaymentOrderConfirmFormValues {
  return {
    notifyPayloadText: '',
    orderNo: row.orderNo,
    paidAmount: row.payableAmount,
  };
}

function parseJsonObjectText(value: unknown, label: string) {
  const text = normalizeText(value);

  if (!text) {
    return null;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error(`${label}必须是合法 JSON 对象`);
  }

  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new TypeError(`${label}必须是合法 JSON 对象`);
  }

  return parsed as Record<string, unknown>;
}

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatOptionText(
  options: Array<{ label: string; value: boolean | number | string }>,
  value: unknown,
) {
  return (
    getOptionLabel(options, value as boolean | number | string) ||
    String(value ?? '-')
  );
}

export function buildPaymentOrderConfirmPayload(
  values: PaymentOrderConfirmFormValues,
) {
  return {
    notifyPayload: parseJsonObjectText(
      values.notifyPayloadText,
      '原始通知 payload',
    ),
    orderNo: requireText(values.orderNo, '站内订单号'),
    paidAmount: normalizeNullableNumber(values.paidAmount),
    providerTradeNo: normalizeNullableText(values.providerTradeNo),
  } satisfies MonetizationPaymentOrderUpdateStatusRequest;
}

const paymentOrderListSchema: EsFormSchema = [
  { component: 'Input', fieldName: 'orderNo', label: '订单号' },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      options: paymentOrderTypeOptions,
      placeholder: '请选择订单业务类型',
    },
    fieldName: 'orderType',
    label: '订单业务类型',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      options: paymentOrderStatusOptions,
      placeholder: '请选择订单状态',
    },
    fieldName: 'status',
    label: '订单状态',
  },
  { component: 'InputNumber', fieldName: 'payableAmount', label: '应付金额' },
  {
    component: 'Select',
    componentProps: { options: subscriptionModeOptions },
    fieldName: 'subscriptionMode',
    label: '订阅模式',
  },
];

export const paymentOrderSearchSchema = formSchemaTransform.toSearchSchema(
  paymentOrderListSchema,
  {
    orderType: { show: true },
    status: { show: true },
    dateRange: {
      component: 'DatePicker',
      componentProps: {
        clearable: true,
        endPlaceholder: '结束时间',
        startPlaceholder: '开始时间',
        type: 'datetimerange',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
      },
      fieldName: 'dateRange',
    },
  },
);

export const paymentOrderColumns =
  formSchemaTransform.toTableColumns<PaymentOrderRow>(paymentOrderListSchema, {
    actions: {
      minWidth: 170,
      show: true,
    },
    orderNo: { fixed: 'left', minWidth: 220, slots: { default: 'detail' } },
    payableAmount: {
      formatter: ({ cellValue }: { cellValue: unknown }) =>
        formatCentAmount(cellValue),
      minWidth: 120,
    },
  });

export const paymentOrderConfirmFormSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '请输入站内订单号',
    },
    fieldName: 'orderNo',
    label: '站内订单号',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 0,
      placeholder: '请输入实付金额（分）',
    },
    fieldName: 'paidAmount',
    label: '实付金额（分）',
  },
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '请输入第三方交易号',
    },
    fieldName: 'providerTradeNo',
    label: '第三方交易号',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入 JSON 对象，留空表示不传',
      rows: 4,
      type: 'textarea',
    },
    fieldName: 'notifyPayloadText',
    formItemClass: 'col-span-2',
    label: '原始通知 payload',
  },
];

export function getPaymentOrderDetailCards(record: PaymentOrderRow) {
  return [
    {
      fields: [
        { label: 'ID', type: 'text', value: record.id },
        { label: '订单号', type: 'text', value: record.orderNo },
        {
          label: '订单类型',
          tagText: formatOptionText(paymentOrderTypeOptions, record.orderType),
          type: 'tag',
          value: record.orderType,
        },
        {
          label: '应付金额',
          type: 'text',
          value: formatCentAmount(record.payableAmount),
        },
        {
          label: '订单状态',
          tagText: formatOptionText(paymentOrderStatusOptions, record.status),
          type: 'tag',
          value: record.status,
        },
        {
          label: '订阅模式',
          tagText: formatOptionText(
            subscriptionModeOptions,
            record.subscriptionMode,
          ),
          type: 'tag',
          value: record.subscriptionMode,
        },
        { label: '创建时间', type: 'date', value: record.createdAt },
        { label: '更新时间', type: 'date', value: record.updatedAt },
      ],
      show: true,
      title: '支付订单',
    },
    ...(record.clientPayPayload
      ? [
          {
            content: `<pre class="whitespace-pre-wrap break-all text-xs">${escapeHtml(
              formatJsonTextarea(record.clientPayPayload),
            )}</pre>`,
            show: true,
            title: '客户端支付参数',
            type: 'text',
          } satisfies DetailCard,
        ]
      : []),
  ] satisfies DetailCard[];
}
