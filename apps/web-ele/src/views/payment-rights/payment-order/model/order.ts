import type {
  PaymentOrderPageResponse,
  PaymentOrderRepairPaidRequest,
  PaymentProviderAccountOptionDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { paymentProviderAccountOptionListApi } from '#/api/core';
import { formSchemaTransform } from '#/utils';
import { getOptionLabel } from '#/utils/options';

import {
  environmentOptions,
  paymentChannelOptions,
  paymentSceneOptions,
  platformOptions,
} from '../../../config-manager/payment-config/model/options';
import { createAppUserTableSelectProps } from '../../../user-manager/shared/app-user-select';
import {
  paymentOrderStatusOptions,
  paymentOrderTypeOptions,
  subscriptionModeOptions,
} from './options';

export type PaymentOrderRow = NonNullable<
  PaymentOrderPageResponse['list']
>[number] & {
  confirmLoading?: boolean;
};

export type PaymentOrderRepairFormValues = {
  evidenceText?: unknown;
  orderNo?: unknown;
  paidAmount?: unknown;
  providerTradeNo?: unknown;
  reason?: unknown;
  reconciliationRecordId?: unknown;
};

function normalizeText(value: unknown) {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed || undefined;
}

function normalizeOptionalNumber(value: unknown) {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }

  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : undefined;
}

function requireText(value: unknown, label: string) {
  const text = normalizeText(value);

  if (!text) {
    throw new Error(`${label}不能为空`);
  }

  return text;
}

function requireNumber(value: unknown, label: string) {
  const numberValue = normalizeOptionalNumber(value);

  if (numberValue === undefined) {
    throw new Error(`${label}不能为空`);
  }

  return numberValue;
}

function formatCentAmount(value: unknown) {
  const numberValue = normalizeOptionalNumber(value);

  if (numberValue === undefined) {
    return '-';
  }

  return `¥${(numberValue / 100).toFixed(2)}`;
}

export function formatJsonTextarea(value: unknown) {
  if (value === null || value === undefined || value === '') {
    return '';
  }

  return JSON.stringify(value, null, 2);
}

export function mapPaymentOrderToRepairRecord(
  row: Pick<
    PaymentOrderRepairFormValues,
    'orderNo' | 'paidAmount' | 'providerTradeNo' | 'reconciliationRecordId'
  >,
): PaymentOrderRepairFormValues {
  return {
    evidenceText: formatJsonTextarea({
      providerTradeNo: row.providerTradeNo,
      reconciliationRecordId: row.reconciliationRecordId,
      source: 'payment_reconciliation',
    }),
    orderNo: row.orderNo,
    paidAmount: row.paidAmount,
    providerTradeNo: row.providerTradeNo,
    reconciliationRecordId: row.reconciliationRecordId,
  };
}

function parseRequiredJsonObjectText(value: unknown, label: string) {
  const text = normalizeText(value);

  if (!text) {
    throw new Error(`${label}不能为空`);
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

function formatOptionText(
  options: Array<{ label: string; value: boolean | number | string }>,
  value: unknown,
) {
  return (
    getOptionLabel(options, value as boolean | number | string) ||
    String(value ?? '-')
  );
}

function formatProviderAccountOptionLabel(
  item: PaymentProviderAccountOptionDto,
) {
  return [
    item.label,
    formatOptionText(paymentChannelOptions, item.channel),
    formatOptionText(paymentSceneOptions, item.paymentScene),
    formatOptionText(platformOptions, item.platform),
    formatOptionText(environmentOptions, item.environment),
  ]
    .filter(Boolean)
    .join(' / ');
}

function normalizeProviderAccountOptions(options: unknown) {
  if (!Array.isArray(options)) {
    return [];
  }

  return options.map((item) => {
    const option = item as PaymentProviderAccountOptionDto;
    return {
      ...option,
      disabled: option.isEnabled !== true,
      label: formatProviderAccountOptionLabel(option),
    };
  });
}

function providerAccountSelectComponentProps() {
  return {
    afterFetch: normalizeProviderAccountOptions,
    api: paymentProviderAccountOptionListApi,
    class: 'w-full',
    clearable: true,
    disabledField: 'disabled',
    filterable: true,
    params: { isEnabled: true },
    placeholder: '请选择支付 provider 账号',
    valueField: 'value',
  };
}

export function buildPaymentOrderRepairPayload(
  values: PaymentOrderRepairFormValues,
) {
  return {
    evidence: parseRequiredJsonObjectText(values.evidenceText, '修复证据'),
    orderNo: requireText(values.orderNo, '站内订单号'),
    paidAmount: requireNumber(values.paidAmount, '实付金额'),
    providerTradeNo: requireText(values.providerTradeNo, '第三方交易号'),
    reason: requireText(values.reason, '修复原因'),
    reconciliationRecordId: requireNumber(
      values.reconciliationRecordId,
      '关联对账记录 ID',
    ),
  } satisfies PaymentOrderRepairPaidRequest;
}

const paymentOrderListSchema: EsFormSchema = [
  { component: 'Input', fieldName: 'orderNo', label: '订单号' },
  {
    component: 'TableSelect',
    componentProps: () =>
      createAppUserTableSelectProps({
        multiple: false,
        placeholder: '请选择用户',
        title: '选择用户',
      }),
    fieldName: 'userId',
    label: '用户',
  },
  {
    component: 'Input',
    componentProps: { clearable: true, placeholder: '请输入第三方交易号' },
    fieldName: 'providerTradeNo',
    label: '第三方交易号',
  },
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
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      options: paymentChannelOptions,
      placeholder: '请选择支付渠道',
    },
    fieldName: 'channel',
    label: '支付渠道',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      options: paymentSceneOptions,
      placeholder: '请选择支付场景',
    },
    fieldName: 'paymentScene',
    label: '支付场景',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      options: platformOptions,
      placeholder: '请选择客户端平台',
    },
    fieldName: 'platform',
    label: '客户端平台',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      options: environmentOptions,
      placeholder: '请选择运行环境',
    },
    fieldName: 'environment',
    label: '运行环境',
  },
  {
    component: 'Input',
    componentProps: { clearable: true, placeholder: '请输入客户端应用键' },
    fieldName: 'clientAppKey',
    label: '客户端应用键',
  },
  {
    component: 'ApiSelect',
    componentProps: providerAccountSelectComponentProps,
    fieldName: 'providerConfigId',
    label: 'provider 账号',
  },
  {
    component: 'Input',
    fieldName: 'providerAccountLabel',
    label: 'provider 账号',
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
    orderNo: { show: true },
    userId: { show: true },
    providerTradeNo: { show: true },
    orderType: { show: true },
    status: { show: true },
    channel: { show: true },
    paymentScene: { show: true },
    platform: { show: true },
    environment: { show: true },
    clientAppKey: { show: true },
    providerConfigId: { show: true },
    providerAccountLabel: { show: false },
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
    payableAmount: { show: false },
    subscriptionMode: { show: false },
  },
);

export const paymentOrderColumns =
  formSchemaTransform.toTableColumns<PaymentOrderRow>(paymentOrderListSchema, {
    actions: {
      minWidth: 170,
      show: true,
    },
    orderNo: { fixed: 'left', minWidth: 220, slots: { default: 'detail' } },
    clientAppKey: { hide: true },
    environment: {
      formatter: ({ cellValue }: { cellValue: unknown }) =>
        formatOptionText(environmentOptions, cellValue),
      minWidth: 110,
    },
    channel: {
      formatter: ({ cellValue }: { cellValue: unknown }) =>
        formatOptionText(paymentChannelOptions, cellValue),
      minWidth: 110,
    },
    paymentScene: {
      formatter: ({ cellValue }: { cellValue: unknown }) =>
        formatOptionText(paymentSceneOptions, cellValue),
      minWidth: 110,
    },
    platform: {
      formatter: ({ cellValue }: { cellValue: unknown }) =>
        formatOptionText(platformOptions, cellValue),
      minWidth: 120,
    },
    payableAmount: {
      formatter: ({ cellValue }: { cellValue: unknown }) =>
        formatCentAmount(cellValue),
      minWidth: 120,
    },
    providerAccountLabel: {
      minWidth: 220,
      show: true,
      title: 'provider 账号',
    },
    providerConfigId: { hide: true },
    providerTradeNo: { minWidth: 180 },
    userId: { minWidth: 110, title: '用户' },
  });

export const paymentOrderRepairFormSchema: EsFormSchema = [
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
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '请输入第三方交易号',
    },
    fieldName: 'providerTradeNo',
    label: '第三方交易号',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '请输入异常修复原因',
      rows: 3,
      type: 'textarea',
    },
    fieldName: 'reason',
    formItemClass: 'col-span-2',
    label: '修复原因',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入 JSON 对象，禁止明文密钥、证书或完整原始回调',
      rows: 5,
      type: 'textarea',
    },
    fieldName: 'evidenceText',
    formItemClass: 'col-span-2',
    label: '修复证据',
    rules: 'required',
  },
];

export function getPaymentOrderDetailSections(record: PaymentOrderRow) {
  return [
    {
      items: [
        { label: 'ID', type: 'text', value: record.id },
        { label: '订单号', type: 'text', value: record.orderNo },
        { label: '用户', type: 'text', value: record.userId },
        {
          label: '订单类型',
          tagText: formatOptionText(paymentOrderTypeOptions, record.orderType),
          type: 'tag',
          value: record.orderType,
        },
        {
          label: '支付渠道',
          tagText: formatOptionText(paymentChannelOptions, record.channel),
          type: 'tag',
          value: record.channel,
        },
        {
          label: '支付场景',
          tagText: formatOptionText(paymentSceneOptions, record.paymentScene),
          type: 'tag',
          value: record.paymentScene,
        },
        {
          label: '客户端平台',
          tagText: formatOptionText(platformOptions, record.platform),
          type: 'tag',
          value: record.platform,
        },
        {
          label: '运行环境',
          tagText: formatOptionText(environmentOptions, record.environment),
          type: 'tag',
          value: record.environment,
        },
        {
          label: '客户端应用键',
          type: 'text',
          value: record.clientAppKey ?? '-',
        },
        {
          label: 'provider 账号',
          type: 'text',
          value: record.providerAccountLabel ?? '-',
        },
        {
          label: '第三方交易号',
          type: 'text',
          value: record.providerTradeNo ?? '-',
        },
        {
          label: '应付金额',
          type: 'text',
          value: formatCentAmount(record.payableAmount),
        },
        {
          label: '实付金额',
          type: 'text',
          value: formatCentAmount(record.paidAmount),
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
  ];
}
