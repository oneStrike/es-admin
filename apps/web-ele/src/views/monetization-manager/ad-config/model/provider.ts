import type {
  MonetizationAdProviderCreateRequest,
  MonetizationAdProviderPageResponse,
  MonetizationAdProviderUpdateRequest,
} from '#/api/types';
import type { DetailCard } from '#/components/es-record-detail';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';
import { getOptionLabel } from '#/utils/options';

import {
  adProviderOptions,
  adTargetScopeOptions,
  enabledStatusOptions,
  environmentOptions,
  platformOptions,
} from './options';

export type AdProviderRow = NonNullable<
  MonetizationAdProviderPageResponse['list']
>[number] & {
  statusLoading?: boolean;
};

export type AdProviderFormValues = {
  appId?: unknown;
  callbackUrl?: unknown;
  clientAppKey?: unknown;
  configMetadataText?: unknown;
  configVersion?: unknown;
  credentialVersionRef?: unknown;
  dailyLimit?: unknown;
  environment?: unknown;
  id?: unknown;
  isEnabled?: unknown;
  placementKey?: unknown;
  platform?: unknown;
  provider?: unknown;
  sortOrder?: unknown;
  targetScope?: unknown;
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

export function mapAdProviderToFormRecord(values: AdProviderRow) {
  return {
    ...values,
    configMetadataText: formatJsonTextarea(values.configMetadata),
  };
}

function buildAdProviderBase(values: AdProviderFormValues) {
  return {
    appId: normalizeNullableText(values.appId),
    callbackUrl: normalizeNullableText(values.callbackUrl),
    clientAppKey: normalizeNullableText(values.clientAppKey),
    configMetadata: parseJsonObjectText(values.configMetadataText, '配置摘要'),
    configVersion: normalizeNullableNumber(values.configVersion),
    credentialVersionRef: requireText(
      values.credentialVersionRef,
      'SSV 密钥版本引用',
    ),
    dailyLimit: normalizeNullableNumber(values.dailyLimit),
    environment: requireInteger(values.environment, '运行环境') as 1 | 2,
    isEnabled: normalizeBoolean(values.isEnabled),
    placementKey: requireText(values.placementKey, '广告位 key'),
    platform: requireInteger(values.platform, '客户端平台') as
      | 1
      | 2
      | 3
      | 4
      | 5,
    provider: requireInteger(values.provider, '广告 provider') as 1 | 2,
    sortOrder: normalizeNullableNumber(values.sortOrder),
    targetScope: requireInteger(values.targetScope, '目标范围') as 1 | 2 | 3,
  } satisfies MonetizationAdProviderCreateRequest;
}

export function buildAdProviderCreatePayload(values: AdProviderFormValues) {
  return buildAdProviderBase(values);
}

export function buildAdProviderUpdatePayload(values: AdProviderFormValues) {
  return {
    id: requireInteger(values.id, 'ID'),
    ...buildAdProviderBase(values),
  } satisfies MonetizationAdProviderUpdateRequest;
}

export const adProviderFormSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '请输入广告位 key',
    },
    fieldName: 'placementKey',
    label: '广告位 key',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      options: adProviderOptions,
      placeholder: '请选择广告 provider',
    },
    fieldName: 'provider',
    label: '广告 provider',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      options: adTargetScopeOptions,
      placeholder: '请选择目标范围',
    },
    fieldName: 'targetScope',
    label: '目标范围',
    rules: 'required',
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
    rules: 'required',
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
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '请输入客户端应用键',
    },
    fieldName: 'clientAppKey',
    label: '客户端应用键',
  },
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '请输入 provider 应用 ID',
    },
    fieldName: 'appId',
    label: 'provider 应用 ID',
  },
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '请输入 SSV 密钥版本引用',
    },
    fieldName: 'credentialVersionRef',
    label: 'SSV 密钥版本引用',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '请输入广告回调地址',
    },
    fieldName: 'callbackUrl',
    label: '广告回调地址',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 0,
      placeholder: '请输入配置版本',
    },
    fieldName: 'configVersion',
    label: '配置版本',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 0,
      placeholder: '请输入每日次数上限',
    },
    fieldName: 'dailyLimit',
    label: '每日次数上限',
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
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入 JSON 对象，禁止填写明文密钥',
      rows: 4,
      type: 'textarea',
    },
    fieldName: 'configMetadataText',
    formItemClass: 'col-span-2',
    label: '配置摘要',
  },
];

export const adProviderSearchSchema = formSchemaTransform.toSearchSchema(
  adProviderFormSchema,
  {
    placementKey: { show: true },
    provider: { show: true },
    targetScope: { show: true },
    platform: { show: true },
    environment: { show: true },
    clientAppKey: { show: true },
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

export const adProviderColumns =
  formSchemaTransform.toTableColumns<AdProviderRow>(adProviderFormSchema, {
    actions: {
      minWidth: 180,
      show: true,
    },
    appId: { hide: true },
    callbackUrl: { hide: true },
    configMetadataText: { hide: true },
    configVersion: { hide: true },
    credentialVersionRef: { minWidth: 180, title: '密钥版本引用' },
    dailyLimit: { title: '每日上限' },
    isEnabled: {
      minWidth: 110,
      slots: { default: 'isEnabled' },
    },
    placementKey: {
      fixed: 'left',
      minWidth: 180,
      slots: { default: 'detail' },
    },
    sortOrder: { hide: true },
  });

export function getAdProviderDetailCards(record: AdProviderRow) {
  return [
    {
      fields: [
        { label: 'ID', type: 'text', value: record.id },
        { label: '广告位 key', type: 'text', value: record.placementKey },
        {
          label: '广告 provider',
          tagText: formatOptionText(adProviderOptions, record.provider),
          type: 'tag',
          value: record.provider,
        },
        {
          label: '目标范围',
          tagText: formatOptionText(adTargetScopeOptions, record.targetScope),
          type: 'tag',
          value: record.targetScope,
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
        { label: 'provider 应用 ID', type: 'text', value: record.appId ?? '-' },
        {
          label: 'SSV 密钥版本引用',
          type: 'text',
          value: record.credentialVersionRef,
        },
        {
          label: '每日次数上限',
          type: 'text',
          value: record.dailyLimit ?? '-',
        },
        {
          label: '广告回调地址',
          type: 'text',
          value: record.callbackUrl ?? '-',
        },
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
      title: '广告 provider 配置',
    },
    ...(record.configMetadata
      ? [
          {
            content: `<pre class="whitespace-pre-wrap break-all text-xs">${escapeHtml(
              formatJsonTextarea(record.configMetadata),
            )}</pre>`,
            show: true,
            title: '配置摘要',
            type: 'text',
          } satisfies DetailCard,
        ]
      : []),
  ] satisfies DetailCard[];
}
