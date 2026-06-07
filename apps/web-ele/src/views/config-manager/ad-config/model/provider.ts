import type {
  AdRewardCredentialOptionDto,
  AdRewardProviderCreateRequest,
  AdRewardProviderPageResponse,
  AdRewardProviderUpdateRequest,
} from '#/api/types';
import type { RecordDetailSection } from '#/components/record-detail-modal';
import type { EsFormSchema } from '#/types';

import { adRewardCredentialOptionListApi } from '#/api/core';
import { formSchemaTransform } from '#/utils';
import { getOptionLabel } from '#/utils/options';

import {
  adProviderOptions,
  adTargetScopeOptions,
  enabledAdTargetScopeOptions,
  enabledStatusOptions,
  environmentOptions,
  platformOptions,
} from './options';

export type AdProviderRow = NonNullable<
  AdRewardProviderPageResponse['list']
>[number] & {
  statusLoading?: boolean;
};

export type AdProviderFormValues = {
  appId?: unknown;
  callbackUrl?: unknown;
  clientAppKey?: unknown;
  credentialOptionRef?: unknown;
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

type OptionValue = boolean | number | string;

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

function readObject(value: unknown) {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function formatOptionText(
  options: Array<{ label: string; value: OptionValue }>,
  value: unknown,
) {
  return getOptionLabel(options, value as OptionValue) || String(value ?? '-');
}

function formatCredentialOptionLabel(item: Record<string, unknown>) {
  const label = normalizeText(item.label) ?? normalizeText(item.value) ?? '-';
  const fingerprint = normalizeText(item.fingerprint);
  const disabledReason = normalizeText(item.disabledReason);

  return [label, fingerprint, disabledReason].filter(Boolean).join(' / ');
}

function normalizeCredentialOptions(options: unknown) {
  if (!Array.isArray(options)) {
    return [];
  }

  return options.map((item) => {
    const option = item as AdRewardCredentialOptionDto;
    return {
      ...option,
      disabled: option.status !== 'available',
      label: formatCredentialOptionLabel(option),
    };
  });
}

function credentialOptionSelectComponentProps() {
  return {
    afterFetch: normalizeCredentialOptions,
    api: adRewardCredentialOptionListApi,
    class: 'w-full',
    clearable: true,
    disabledField: 'disabled',
    filterable: true,
    placeholder: '请选择 SSV 密钥选项',
    valueField: 'value',
  };
}

function readCredentialMetadata(record: Pick<AdProviderRow, 'configMetadata'>) {
  return readObject(record.configMetadata);
}

function readCredentialOptionRef(
  record: Pick<AdProviderRow, 'configMetadata'>,
) {
  return normalizeText(readCredentialMetadata(record).credentialOptionRef);
}

function readCredentialFingerprint(
  record: Pick<AdProviderRow, 'configMetadata'>,
) {
  return normalizeText(readCredentialMetadata(record).keyFingerprint);
}

export function getAdProviderCredentialOptionText(record: AdProviderRow) {
  return (
    readCredentialOptionRef(record) ||
    normalizeText(record.credentialVersionRef) ||
    '-'
  );
}

export function mapAdProviderToFormRecord(values: AdProviderRow) {
  return {
    ...values,
    credentialOptionRef:
      readCredentialOptionRef(values) ||
      normalizeText(values.credentialVersionRef),
  };
}

function buildAdProviderBase(values: AdProviderFormValues) {
  return {
    appId: normalizeNullableText(values.appId),
    callbackUrl: normalizeNullableText(values.callbackUrl),
    clientAppKey: normalizeNullableText(values.clientAppKey),
    credentialOptionRef: requireText(
      values.credentialOptionRef,
      'SSV 密钥选项',
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
  } satisfies AdRewardProviderCreateRequest;
}

export function buildAdProviderCreatePayload(values: AdProviderFormValues) {
  return buildAdProviderBase(values);
}

export function buildAdProviderUpdatePayload(values: AdProviderFormValues) {
  return {
    id: requireInteger(values.id, 'ID'),
    ...buildAdProviderBase(values),
  } satisfies AdRewardProviderUpdateRequest;
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
      options: enabledAdTargetScopeOptions,
      placeholder: '请选择目标范围',
    },
    defaultValue: 1,
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
    component: 'ApiSelect',
    componentProps: credentialOptionSelectComponentProps,
    fieldName: 'credentialOptionRef',
    label: 'SSV 密钥选项',
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
];

export const adProviderSearchSchema = formSchemaTransform.toSearchSchema(
  adProviderFormSchema,
  {
    provider: { show: true },
    targetScope: { show: true },
    platform: { show: true },
    environment: { show: true },
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
    configVersion: { minWidth: 110, show: true, title: '配置版本' },
    credentialOptionRef: {
      minWidth: 220,
      slots: { default: 'credentialOption' },
      title: 'SSV 密钥选项',
    },
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

export function getAdProviderDetailSections(record: AdProviderRow) {
  const credentialOptionRef = readCredentialOptionRef(record);
  const keyFingerprint = readCredentialFingerprint(record);

  return [
    {
      items: [
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
          label: '配置版本',
          type: 'text',
          value: record.configVersion ?? '-',
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
    {
      items: [
        {
          label: 'SSV 密钥选项',
          type: 'text',
          value: credentialOptionRef ?? '-',
        },
        {
          label: '密钥版本引用',
          type: 'text',
          value: record.credentialVersionRef,
        },
        {
          label: '密钥指纹',
          type: 'text',
          value: keyFingerprint ?? '-',
        },
      ],
      show: true,
      title: 'SSV 密钥摘要',
    },
  ] satisfies RecordDetailSection[];
}
