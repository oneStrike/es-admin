import type {
  MonetizationCurrencyPackageCreateRequest,
  MonetizationCurrencyPackagePageResponse,
  MonetizationCurrencyPackageUpdateRequest,
} from '#/api/types';
import type { DetailCard } from '#/components/es-record-detail';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';
import { getOptionLabel } from '#/utils/options';

import { enabledStatusOptions } from './options';

export type CurrencyPackageRow = NonNullable<
  MonetizationCurrencyPackagePageResponse['list']
>[number] & {
  statusLoading?: boolean;
};

export type CurrencyPackageFormValues = {
  bonusAmount?: unknown;
  currencyAmount?: unknown;
  id?: unknown;
  isEnabled?: unknown;
  name?: unknown;
  packageKey?: unknown;
  price?: unknown;
  sortOrder?: unknown;
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

function normalizeNullableNumber(value: unknown) {
  return normalizeOptionalNumber(value) ?? null;
}

function requireInteger(value: unknown, label: string) {
  const numberValue = normalizeOptionalNumber(value);

  if (numberValue === undefined) {
    throw new TypeError(`${label}不能为空`);
  }

  if (!Number.isInteger(numberValue)) {
    throw new TypeError(`${label}必须是整数`);
  }

  return numberValue;
}

function requireText(value: unknown, label: string) {
  const text = normalizeText(value);

  if (!text) {
    throw new Error(`${label}不能为空`);
  }

  return text;
}

function normalizeBoolean(value: unknown) {
  return typeof value === 'boolean' ? value : null;
}

function formatCentAmount(value: unknown) {
  const numberValue = normalizeOptionalNumber(value);

  if (numberValue === undefined) {
    return '-';
  }

  return `¥${(numberValue / 100).toFixed(2)}`;
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

function buildCurrencyPackageBase(values: CurrencyPackageFormValues) {
  return {
    bonusAmount: normalizeNullableNumber(values.bonusAmount),
    currencyAmount: requireInteger(values.currencyAmount, '发放虚拟币数量'),
    isEnabled: normalizeBoolean(values.isEnabled),
    name: requireText(values.name, '充值包名称'),
    packageKey: requireText(values.packageKey, '充值包业务键'),
    price: requireInteger(values.price, '支付价格'),
    sortOrder: normalizeNullableNumber(values.sortOrder),
  } satisfies MonetizationCurrencyPackageCreateRequest;
}

export function buildCurrencyPackageCreatePayload(
  values: CurrencyPackageFormValues,
) {
  return buildCurrencyPackageBase(values);
}

export function buildCurrencyPackageUpdatePayload(
  values: CurrencyPackageFormValues,
) {
  return {
    id: requireInteger(values.id, 'ID'),
    ...buildCurrencyPackageBase(values),
  } satisfies MonetizationCurrencyPackageUpdateRequest;
}

export const currencyPackageFormSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '请输入充值包名称',
    },
    fieldName: 'name',
    label: '充值包名称',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '请输入充值包业务键',
    },
    fieldName: 'packageKey',
    label: '充值包业务键',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 0,
      placeholder: '请输入支付价格（分）',
    },
    fieldName: 'price',
    label: '支付价格（分）',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 0,
      placeholder: '请输入发放虚拟币数量',
    },
    fieldName: 'currencyAmount',
    label: '发放虚拟币数量',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 0,
      placeholder: '请输入赠送虚拟币数量',
    },
    fieldName: 'bonusAmount',
    label: '赠送虚拟币数量',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 0,
      placeholder: '请输入排序值',
    },
    fieldName: 'sortOrder',
    label: '排序值',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      class: 'w-full',
      options: enabledStatusOptions,
    },
    defaultValue: true,
    fieldName: 'isEnabled',
    label: '启用状态',
  },
];

export const currencyPackageSearchSchema = formSchemaTransform.toSearchSchema(
  currencyPackageFormSchema,
  {
    name: { show: true },
    isEnabled: {
      show: true,
      component: 'Select',
      componentProps: {
        options: enabledStatusOptions,
        placeholder: '请选择启用状态',
      },
    },
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

export const currencyPackageColumns =
  formSchemaTransform.toTableColumns<CurrencyPackageRow>(
    currencyPackageFormSchema,
    {
      actions: {
        minWidth: 180,
        show: true,
      },
      bonusAmount: { title: '赠送' },
      currencyAmount: { title: '虚拟币' },
      isEnabled: {
        minWidth: 110,
        slots: { default: 'isEnabled' },
      },
      name: { fixed: 'left', minWidth: 180, slots: { default: 'detail' } },
      packageKey: { minWidth: 160, title: '业务键' },
      price: {
        formatter: ({ cellValue }: { cellValue: unknown }) =>
          formatCentAmount(cellValue),
        minWidth: 120,
        title: '价格',
      },
    },
  );

export function getCurrencyPackageDetailCards(record: CurrencyPackageRow) {
  return [
    {
      fields: [
        { label: 'ID', type: 'text', value: record.id },
        { label: '充值包名称', type: 'text', value: record.name },
        { label: '充值包业务键', type: 'text', value: record.packageKey },
        { label: '价格', type: 'text', value: formatCentAmount(record.price) },
        { label: '虚拟币数量', type: 'text', value: record.currencyAmount },
        { label: '赠送数量', type: 'text', value: record.bonusAmount ?? '-' },
        {
          label: '启用状态',
          tagText: formatOptionText(enabledStatusOptions, record.isEnabled),
          type: 'tag',
          value: record.isEnabled,
        },
        { label: '创建时间', type: 'date', value: record.createdAt },
        { label: '更新时间', type: 'date', value: record.updatedAt },
      ],
      show: true,
      title: '虚拟币充值包',
    },
  ] satisfies DetailCard[];
}
