import type {
  CouponDefinitionCreateRequest,
  CouponDefinitionPageResponse,
  CouponDefinitionUpdateRequest,
  CouponGrantCreateRequest,
} from '#/api/types';
import type { DetailCard } from '#/components/es-record-detail';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';
import { getOptionLabel } from '#/utils/options';

import {
  couponSourceTypeOptions,
  couponTargetScopeOptions,
  couponTypeOptions,
  enabledStatusOptions,
} from './options';

export type CouponRow = NonNullable<
  CouponDefinitionPageResponse['list']
>[number] & {
  statusLoading?: boolean;
};

export type CouponFormValues = {
  budgetLimit?: unknown;
  configPayloadText?: unknown;
  couponType?: unknown;
  discountAmount?: unknown;
  discountRateBps?: unknown;
  id?: unknown;
  isEnabled?: unknown;
  name?: unknown;
  targetScope?: unknown;
  usageLimit?: unknown;
  validDays?: unknown;
};

export type CouponGrantFormValues = {
  couponDefinitionId?: unknown;
  sourceId?: unknown;
  sourceType?: unknown;
  userId?: unknown;
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

function formatJsonTextarea(value: unknown) {
  if (value === null || value === undefined || value === '') {
    return '';
  }

  return JSON.stringify(value, null, 2);
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

export function mapCouponToFormRecord(values: CouponRow) {
  return {
    ...values,
    configPayloadText: formatJsonTextarea(values.configPayload),
  };
}

function buildCouponBase(values: CouponFormValues) {
  return {
    budgetLimit: normalizeNullableNumber(values.budgetLimit),
    configPayload: parseJsonObjectText(
      values.configPayloadText,
      '额外配置快照',
    ),
    couponType: requireInteger(values.couponType, '券类型') as
      | 1
      | 2
      | 3
      | 4
      | 5,
    discountAmount: normalizeNullableNumber(values.discountAmount),
    discountRateBps: normalizeNullableNumber(values.discountRateBps),
    isEnabled: normalizeBoolean(values.isEnabled),
    name: requireText(values.name, '券名称'),
    targetScope: requireInteger(values.targetScope, '适用目标范围') as
      | 1
      | 2
      | 3
      | 4,
    usageLimit: normalizeNullableNumber(values.usageLimit),
    validDays: normalizeNullableNumber(values.validDays),
  } satisfies CouponDefinitionCreateRequest;
}

export function buildCouponCreatePayload(values: CouponFormValues) {
  return buildCouponBase(values);
}

export function buildCouponUpdatePayload(values: CouponFormValues) {
  return {
    id: requireInteger(values.id, 'ID'),
    ...buildCouponBase(values),
  } satisfies CouponDefinitionUpdateRequest;
}

export function buildCouponGrantPayload(values: CouponGrantFormValues) {
  return {
    couponDefinitionId: requireInteger(values.couponDefinitionId, '券定义 ID'),
    sourceId: normalizeOptionalNumber(values.sourceId) ?? null,
    sourceType: (normalizeOptionalNumber(values.sourceType) ?? 3) as
      | 1
      | 2
      | 3
      | 4,
    userId: requireInteger(values.userId, '用户 ID'),
  } satisfies CouponGrantCreateRequest;
}

export const couponFormSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '请输入券名称',
    },
    fieldName: 'name',
    label: '券名称',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      options: couponTypeOptions,
      placeholder: '请选择券类型',
    },
    fieldName: 'couponType',
    label: '券类型',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      options: couponTargetScopeOptions,
      placeholder: '请选择适用目标范围',
    },
    fieldName: 'targetScope',
    label: '适用目标范围',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 0,
      placeholder: '请输入折扣金额',
    },
    fieldName: 'discountAmount',
    label: '折扣金额',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 0,
      placeholder: '请输入折扣率基点',
    },
    fieldName: 'discountRateBps',
    label: '折扣率基点',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 0,
      placeholder: '请输入单张券可用次数',
    },
    fieldName: 'usageLimit',
    label: '单张券可用次数',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 0,
      placeholder: '请输入有效天数',
    },
    fieldName: 'validDays',
    label: '有效天数',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 0,
      placeholder: '请输入预算上限',
    },
    fieldName: 'budgetLimit',
    label: '预算上限',
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
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入 JSON 对象，例如 {"maxChapterCount":5}',
      rows: 4,
      type: 'textarea',
    },
    fieldName: 'configPayloadText',
    formItemClass: 'col-span-2',
    label: '额外配置快照',
  },
];

export const couponSearchSchema = formSchemaTransform.toSearchSchema(
  couponFormSchema,
  {
    couponType: { show: true },
    targetScope: { show: true },
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

export const couponColumns = formSchemaTransform.toTableColumns<CouponRow>(
  couponFormSchema,
  {
    actions: {
      minWidth: 230,
      show: true,
    },
    budgetLimit: { title: '预算' },
    configPayloadText: { hide: true },
    isEnabled: {
      minWidth: 110,
      slots: { default: 'isEnabled' },
    },
    name: { fixed: 'left', minWidth: 180, slots: { default: 'detail' } },
    discountRateBps: { title: '折扣率' },
    usageLimit: { title: '次数' },
  },
);

export const couponGrantFormSchema: EsFormSchema = [
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '请输入用户 ID',
    },
    fieldName: 'userId',
    label: '用户 ID',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '请输入券定义 ID',
    },
    fieldName: 'couponDefinitionId',
    label: '券定义 ID',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      options: couponSourceTypeOptions,
      placeholder: '请选择券来源',
    },
    fieldName: 'sourceType',
    label: '券来源',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '请输入来源 ID',
    },
    fieldName: 'sourceId',
    label: '来源 ID',
  },
];

export function getCouponDetailCards(record: CouponRow) {
  return [
    {
      fields: [
        { label: 'ID', type: 'text', value: record.id },
        { label: '券名称', type: 'text', value: record.name },
        {
          label: '券类型',
          tagText: formatOptionText(couponTypeOptions, record.couponType),
          type: 'tag',
          value: record.couponType,
        },
        {
          label: '适用范围',
          tagText: formatOptionText(
            couponTargetScopeOptions,
            record.targetScope,
          ),
          type: 'tag',
          value: record.targetScope,
        },
        {
          label: '折扣金额',
          type: 'text',
          value: record.discountAmount ?? '-',
        },
        {
          label: '折扣率基点',
          type: 'text',
          value: record.discountRateBps ?? '-',
        },
        { label: '可用次数', type: 'text', value: record.usageLimit ?? '-' },
        { label: '有效天数', type: 'text', value: record.validDays ?? '-' },
        { label: '预算上限', type: 'text', value: record.budgetLimit ?? '-' },
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
      title: '券定义',
    },
    ...(record.configPayload
      ? [
          {
            content: `<pre class="whitespace-pre-wrap break-all text-xs">${escapeHtml(
              formatJsonTextarea(record.configPayload),
            )}</pre>`,
            show: true,
            title: '额外配置快照',
            type: 'text',
          } satisfies DetailCard,
        ]
      : []),
  ] satisfies DetailCard[];
}
