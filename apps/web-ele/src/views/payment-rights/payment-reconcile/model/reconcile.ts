import type { PaymentReconcilePageResponse } from '#/api/types';
import type { RecordDetailSection } from '#/components/record-detail-modal';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';
import { getOptionLabel } from '#/utils/options';

import { paymentChannelOptions } from '../../../config-manager/payment-config/model/options';
import { paymentOrderStatusOptions } from '../../payment-order/model/options';

export type PaymentReconcileRow = NonNullable<
  PaymentReconcilePageResponse['list']
>[number];

type OptionItem = {
  color?: string;
  label: string;
  value: boolean | number | string;
};

type TagType = 'danger' | 'info' | 'primary' | 'success' | 'warning';

export const paymentReconcileMismatchTypeOptions: OptionItem[] = [
  { label: '本地已支付 provider 未支付', value: 1, color: 'warning' },
  { label: '本地待支付 provider 已支付', value: 2, color: 'danger' },
  { label: '金额不一致', value: 3, color: 'danger' },
  { label: '重复交易号', value: 4, color: 'warning' },
  { label: '验签失败', value: 5, color: 'danger' },
  { label: '退款差异', value: 6, color: 'info' },
];

export const paymentReconcileStatusOptions: OptionItem[] = [
  { label: '待处理', value: 1, color: 'warning' },
  { label: '已确认', value: 2, color: 'primary' },
  { label: '已修复', value: 3, color: 'success' },
  { label: '忽略', value: 4, color: 'info' },
];

export const paymentReconcileRepairAvailabilityOptions: OptionItem[] = [
  { label: '可异常修复', value: true, color: 'warning' },
  { label: '不可修复', value: false, color: 'info' },
];

export const paymentReconcileRefundAvailabilityOptions: OptionItem[] = [
  { label: '后续专项待接入', value: true, color: 'info' },
  { label: '未开放/后续专项', value: false, color: 'info' },
];

function normalizeOptionalNumber(value: unknown) {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }

  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : undefined;
}

function formatCentAmount(value: unknown) {
  const numberValue = normalizeOptionalNumber(value);

  if (numberValue === undefined) {
    return '-';
  }

  return `¥${(numberValue / 100).toFixed(2)}`;
}

function formatJsonTextarea(value: unknown) {
  if (value === null || value === undefined || value === '') {
    return '';
  }

  return JSON.stringify(value, null, 2);
}

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatOptionText(options: OptionItem[], value: unknown) {
  return (
    getOptionLabel(options, value as boolean | number | string) ||
    String(value ?? '-')
  );
}

function resolveTagType(value?: string): TagType {
  return ['danger', 'info', 'primary', 'success', 'warning'].includes(
    value ?? '',
  )
    ? (value as TagType)
    : 'info';
}

function getOptionColor(options: OptionItem[], value: unknown): TagType {
  return resolveTagType(
    options.find((option) => option.value === value)?.color,
  );
}

export function formatPaymentReconcileMismatchType(value: unknown) {
  return formatOptionText(paymentReconcileMismatchTypeOptions, value);
}

export function getPaymentReconcileMismatchTypeColor(value: unknown) {
  return getOptionColor(paymentReconcileMismatchTypeOptions, value);
}

export function formatPaymentReconcileStatus(value: unknown) {
  return formatOptionText(paymentReconcileStatusOptions, value);
}

export function getPaymentReconcileStatusColor(value: unknown) {
  return getOptionColor(paymentReconcileStatusOptions, value);
}

export function formatPaymentReconcileRepairAvailability(value: unknown) {
  return formatOptionText(paymentReconcileRepairAvailabilityOptions, value);
}

export function getPaymentReconcileRepairAvailabilityColor(value: unknown) {
  return getOptionColor(paymentReconcileRepairAvailabilityOptions, value);
}

export function formatPaymentReconcileRefundAvailability(value: unknown) {
  return formatOptionText(paymentReconcileRefundAvailabilityOptions, value);
}

export function getPaymentReconcileRefundAvailabilityColor(value: unknown) {
  return getOptionColor(paymentReconcileRefundAvailabilityOptions, value);
}

const paymentReconcileListSchema: EsFormSchema = [
  { component: 'Input', fieldName: 'orderNo', label: '订单号' },
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
      options: paymentReconcileMismatchTypeOptions,
      placeholder: '请选择差异类型',
    },
    fieldName: 'mismatchType',
    label: '差异类型',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      options: paymentReconcileStatusOptions,
      placeholder: '请选择处理状态',
    },
    fieldName: 'status',
    label: '处理状态',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      options: paymentOrderStatusOptions,
      placeholder: '请选择本地订单状态',
    },
    fieldName: 'localStatus',
    label: '本地订单状态',
  },
  { component: 'InputNumber', fieldName: 'localAmount', label: '本地金额' },
  {
    component: 'InputNumber',
    fieldName: 'providerAmount',
    label: 'provider 金额',
  },
  { component: 'Input', fieldName: 'providerStatus', label: 'provider 状态' },
  { component: 'Input', fieldName: 'currency', label: '币种' },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      options: paymentReconcileRepairAvailabilityOptions,
    },
    fieldName: 'repairPaidAvailable',
    label: '异常修复',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      options: paymentReconcileRefundAvailabilityOptions,
    },
    fieldName: 'refundExecutionAvailable',
    label: '退款执行',
  },
];

export const paymentReconcileSearchSchema = formSchemaTransform.toSearchSchema(
  paymentReconcileListSchema,
  {
    orderNo: { show: true },
    providerTradeNo: { show: true },
    channel: { show: true },
    mismatchType: { show: true },
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

export const paymentReconcileColumns =
  formSchemaTransform.toTableColumns<PaymentReconcileRow>(
    paymentReconcileListSchema,
    {
      actions: {
        minWidth: 120,
        show: true,
      },
      orderNo: {
        fixed: 'left',
        minWidth: 220,
        slots: { default: 'detail' },
      },
      channel: {
        formatter: ({ cellValue }: { cellValue: unknown }) =>
          formatOptionText(paymentChannelOptions, cellValue),
        minWidth: 110,
      },
      currency: { minWidth: 90 },
      localAmount: {
        formatter: ({ cellValue }: { cellValue: unknown }) =>
          formatCentAmount(cellValue),
        minWidth: 120,
      },
      localStatus: {
        formatter: ({ cellValue }: { cellValue: unknown }) =>
          formatOptionText(paymentOrderStatusOptions, cellValue),
        minWidth: 120,
      },
      mismatchType: {
        minWidth: 210,
        slots: { default: 'mismatchType' },
      },
      providerAmount: {
        formatter: ({ cellValue }: { cellValue: unknown }) =>
          formatCentAmount(cellValue),
        minWidth: 130,
      },
      providerStatus: { minWidth: 150 },
      providerTradeNo: { minWidth: 180 },
      refundExecutionAvailable: {
        minWidth: 160,
        slots: { default: 'refundExecutionStatus' },
      },
      repairPaidAvailable: {
        minWidth: 130,
        slots: { default: 'repairAvailability' },
      },
      status: {
        minWidth: 120,
        slots: { default: 'status' },
      },
      createdAt: { show: true },
      updatedAt: { show: true },
    },
  );

export function getPaymentReconcileDetailSections(record: PaymentReconcileRow) {
  return [
    {
      items: [
        { label: '记录 ID', type: 'text', value: record.id },
        { label: '订单号', type: 'text', value: record.orderNo },
        { label: '支付订单 ID', type: 'text', value: record.paymentOrderId },
        {
          label: '支付渠道',
          tagText: formatOptionText(paymentChannelOptions, record.channel),
          tagType: getOptionColor(paymentChannelOptions, record.channel),
          type: 'tag',
          value: record.channel,
        },
        {
          label: '差异类型',
          tagText: formatPaymentReconcileMismatchType(record.mismatchType),
          tagType: getPaymentReconcileMismatchTypeColor(record.mismatchType),
          type: 'tag',
          value: record.mismatchType,
        },
        {
          label: '处理状态',
          tagText: formatPaymentReconcileStatus(record.status),
          tagType: getPaymentReconcileStatusColor(record.status),
          type: 'tag',
          value: record.status,
        },
        {
          label: '本地订单状态',
          tagText: formatOptionText(
            paymentOrderStatusOptions,
            record.localStatus,
          ),
          tagType: getOptionColor(
            paymentOrderStatusOptions,
            record.localStatus,
          ),
          type: 'tag',
          value: record.localStatus,
        },
        {
          label: '本地金额',
          type: 'text',
          value: formatCentAmount(record.localAmount),
        },
        {
          label: 'provider 状态',
          type: 'text',
          value: record.providerStatus,
        },
        {
          label: 'provider 金额',
          type: 'text',
          value: formatCentAmount(record.providerAmount),
        },
        {
          label: '第三方交易号',
          type: 'text',
          value: record.providerTradeNo,
        },
        { label: '币种', type: 'text', value: record.currency },
        {
          label: '异常修复',
          tagText: formatPaymentReconcileRepairAvailability(
            record.repairPaidAvailable,
          ),
          tagType: getPaymentReconcileRepairAvailabilityColor(
            record.repairPaidAvailable,
          ),
          type: 'tag',
          value: record.repairPaidAvailable,
        },
        {
          label: '退款执行',
          tagText: formatPaymentReconcileRefundAvailability(
            record.refundExecutionAvailable,
          ),
          tagType: getPaymentReconcileRefundAvailabilityColor(
            record.refundExecutionAvailable,
          ),
          type: 'tag',
          value: record.refundExecutionAvailable,
        },
        {
          label: '处理备注',
          type: 'text',
          value: record.handledRemark ?? '-',
        },
        { label: '创建时间', type: 'date', value: record.createdAt },
        { label: '更新时间', type: 'date', value: record.updatedAt },
      ],
      show: true,
      title: '支付对账',
    },
    ...(record.evidence
      ? [
          {
            content: `<pre class="whitespace-pre-wrap break-all text-xs">${escapeHtml(
              formatJsonTextarea(record.evidence),
            )}</pre>`,
            show: true,
            title: '对账证据摘要',
            type: 'html',
          } satisfies RecordDetailSection,
        ]
      : []),
  ] satisfies RecordDetailSection[];
}
