import type {
  MonetizationPaymentProviderCreateRequest,
  MonetizationPaymentProviderPageResponse,
  MonetizationPaymentProviderUpdateRequest,
} from '#/api/types';
import type { DetailCard } from '#/components/es-record-detail';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';
import { getOptionLabel } from '#/utils/options';

import {
  certModeOptions,
  enabledStatusOptions,
  environmentOptions,
  paymentChannelOptions,
  paymentSceneOptions,
  platformOptions,
} from './options';

export type PaymentProviderConfigRow = NonNullable<
  MonetizationPaymentProviderPageResponse['list']
>[number] & {
  statusLoading?: boolean;
};

export type PaymentProviderFormValues = {
  agreementNotifyUrl?: unknown;
  allowedReturnDomainsText?: unknown;
  apiV3KeyRef?: unknown;
  appCertRef?: unknown;
  appId?: unknown;
  certMode?: unknown;
  channel?: unknown;
  clientAppKey?: unknown;
  configMetadataText?: unknown;
  configName?: unknown;
  configVersion?: unknown;
  credentialVersionRef?: unknown;
  environment?: unknown;
  id?: unknown;
  isEnabled?: unknown;
  mchId?: unknown;
  notifyUrl?: unknown;
  paymentScene?: unknown;
  platform?: unknown;
  platformCertRef?: unknown;
  privateKeyRef?: unknown;
  publicKeyRef?: unknown;
  returnUrl?: unknown;
  rootCertRef?: unknown;
  sortOrder?: unknown;
  supportsAutoRenew?: unknown;
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

function normalizeStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((item) => normalizeText(item))
      .filter((item): item is string => !!item);
  }

  if (typeof value !== 'string') {
    return [];
  }

  return value
    .split(/\r?\n|,/)
    .map((item) => normalizeText(item))
    .filter((item): item is string => !!item);
}

function formatStringArrayTextarea(value: unknown) {
  return Array.isArray(value) ? value.filter(Boolean).join('\n') : '';
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

export function mapProviderToFormRecord(values: PaymentProviderConfigRow) {
  return {
    ...values,
    allowedReturnDomainsText: formatStringArrayTextarea(
      values.allowedReturnDomains,
    ),
    configMetadataText: formatJsonTextarea(values.configMetadata),
  };
}

function buildPaymentProviderBase(values: PaymentProviderFormValues) {
  return {
    agreementNotifyUrl: normalizeNullableText(values.agreementNotifyUrl),
    allowedReturnDomains: normalizeStringArray(values.allowedReturnDomainsText),
    apiV3KeyRef: normalizeNullableText(values.apiV3KeyRef),
    appCertRef: normalizeNullableText(values.appCertRef),
    appId: normalizeNullableText(values.appId),
    certMode: normalizeNullableNumber(values.certMode),
    channel: requireInteger(values.channel, '支付渠道') as 1 | 2,
    clientAppKey: normalizeNullableText(values.clientAppKey),
    configMetadata: parseJsonObjectText(values.configMetadataText, '配置摘要'),
    configName: normalizeNullableText(values.configName),
    configVersion: normalizeNullableNumber(values.configVersion),
    credentialVersionRef: requireText(
      values.credentialVersionRef,
      '密钥版本引用',
    ),
    environment: requireInteger(values.environment, '运行环境') as 1 | 2,
    isEnabled: normalizeBoolean(values.isEnabled),
    mchId: normalizeNullableText(values.mchId),
    notifyUrl: normalizeNullableText(values.notifyUrl),
    paymentScene: requireInteger(values.paymentScene, '支付场景') as 1 | 2 | 3,
    platform: requireInteger(values.platform, '客户端平台') as
      | 1
      | 2
      | 3
      | 4
      | 5,
    platformCertRef: normalizeNullableText(values.platformCertRef),
    privateKeyRef: normalizeNullableText(values.privateKeyRef),
    publicKeyRef: normalizeNullableText(values.publicKeyRef),
    returnUrl: normalizeNullableText(values.returnUrl),
    rootCertRef: normalizeNullableText(values.rootCertRef),
    sortOrder: normalizeNullableNumber(values.sortOrder),
    supportsAutoRenew: normalizeBoolean(values.supportsAutoRenew),
  } satisfies MonetizationPaymentProviderCreateRequest;
}

export function buildPaymentProviderCreatePayload(
  values: PaymentProviderFormValues,
) {
  return buildPaymentProviderBase(values);
}

export function buildPaymentProviderUpdatePayload(
  values: PaymentProviderFormValues,
) {
  return {
    id: requireInteger(values.id, 'ID'),
    ...buildPaymentProviderBase(values),
  } satisfies MonetizationPaymentProviderUpdateRequest;
}

export const paymentProviderFormSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: { clearable: true, placeholder: '请输入配置名称' },
    fieldName: 'configName',
    label: '配置名称',
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
    rules: 'required',
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
    componentProps: { clearable: true, placeholder: '请输入客户端应用键' },
    fieldName: 'clientAppKey',
    label: '客户端应用键',
  },
  {
    component: 'Input',
    componentProps: { clearable: true, placeholder: '请输入 provider 应用 ID' },
    fieldName: 'appId',
    label: 'provider 应用 ID',
  },
  {
    component: 'Input',
    componentProps: { clearable: true, placeholder: '请输入 provider 商户 ID' },
    fieldName: 'mchId',
    label: 'provider 商户 ID',
  },
  {
    component: 'Input',
    componentProps: { clearable: true, placeholder: '请输入密钥版本引用' },
    fieldName: 'credentialVersionRef',
    label: '密钥版本引用',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '请输入微信 APIv3 key 引用',
    },
    fieldName: 'apiV3KeyRef',
    label: '微信 APIv3 key 引用',
  },
  {
    component: 'Input',
    componentProps: { clearable: true, placeholder: '请输入支付宝公钥引用' },
    fieldName: 'publicKeyRef',
    label: '支付宝公钥引用',
  },
  {
    component: 'Input',
    componentProps: { clearable: true, placeholder: '请输入应用私钥引用' },
    fieldName: 'privateKeyRef',
    label: '应用私钥引用',
  },
  {
    component: 'Input',
    componentProps: { clearable: true, placeholder: '请输入应用证书引用' },
    fieldName: 'appCertRef',
    label: '应用证书引用',
  },
  {
    component: 'Input',
    componentProps: { clearable: true, placeholder: '请输入平台证书引用' },
    fieldName: 'platformCertRef',
    label: '平台证书引用',
  },
  {
    component: 'Input',
    componentProps: { clearable: true, placeholder: '请输入根证书引用' },
    fieldName: 'rootCertRef',
    label: '根证书引用',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      options: certModeOptions,
      placeholder: '请选择证书模式',
    },
    fieldName: 'certMode',
    label: '证书模式',
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
    component: 'Input',
    componentProps: { clearable: true, placeholder: '请输入通知回调地址' },
    fieldName: 'notifyUrl',
    label: '通知回调地址',
  },
  {
    component: 'Input',
    componentProps: { clearable: true, placeholder: '请输入签约通知地址' },
    fieldName: 'agreementNotifyUrl',
    label: '签约通知地址',
  },
  {
    component: 'Input',
    componentProps: { clearable: true, placeholder: '请输入 H5 返回地址' },
    fieldName: 'returnUrl',
    label: 'H5 返回地址',
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
    componentProps: { class: 'w-full', options: enabledStatusOptions },
    defaultValue: true,
    fieldName: 'isEnabled',
    label: '启用状态',
  },
  {
    component: 'RadioGroup',
    componentProps: { class: 'w-full', options: enabledStatusOptions },
    defaultValue: false,
    fieldName: 'supportsAutoRenew',
    label: '支持自动续费',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '每行一个域名，或使用逗号分隔',
      rows: 4,
      type: 'textarea',
    },
    fieldName: 'allowedReturnDomainsText',
    formItemClass: 'col-span-2',
    label: 'H5 允许返回域名',
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

export const paymentProviderSearchSchema = formSchemaTransform.toSearchSchema(
  paymentProviderFormSchema,
  {
    channel: { show: true },
    paymentScene: { show: true },
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

export const paymentProviderColumns =
  formSchemaTransform.toTableColumns<PaymentProviderConfigRow>(
    paymentProviderFormSchema,
    {
      actions: {
        minWidth: 180,
        show: true,
      },
      configName: {
        fixed: 'left',
        minWidth: 180,
        slots: { default: 'detail' },
      },
      agreementNotifyUrl: { hide: true },
      allowedReturnDomainsText: { hide: true },
      apiV3KeyRef: { hide: true },
      appCertRef: { hide: true },
      appId: { hide: true },
      certMode: { hide: true },
      configMetadataText: { hide: true },
      configVersion: { hide: true },
      credentialVersionRef: { minWidth: 180 },
      isEnabled: {
        minWidth: 110,
        slots: { default: 'isEnabled' },
      },
      mchId: { hide: true },
      notifyUrl: { hide: true },
      platformCertRef: { hide: true },
      privateKeyRef: { hide: true },
      publicKeyRef: { hide: true },
      returnUrl: { hide: true },
      rootCertRef: { hide: true },
      sortOrder: { hide: true },
      supportsAutoRenew: { hide: true },
    },
  );

export function getPaymentProviderDetailCards(
  record: PaymentProviderConfigRow,
) {
  return [
    {
      fields: [
        { label: 'ID', type: 'text', value: record.id },
        { label: '配置名称', type: 'text', value: record.configName ?? '-' },
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
          label: '证书模式',
          tagText: formatOptionText(certModeOptions, record.certMode),
          type: 'tag',
          value: record.certMode,
        },
        {
          label: '客户端应用键',
          type: 'text',
          value: record.clientAppKey ?? '-',
        },
        { label: 'provider 应用 ID', type: 'text', value: record.appId ?? '-' },
        { label: 'provider 商户 ID', type: 'text', value: record.mchId ?? '-' },
        {
          label: '密钥版本引用',
          type: 'text',
          value: record.credentialVersionRef,
        },
        {
          label: '微信 APIv3 key 引用',
          type: 'text',
          value: record.apiV3KeyRef ?? '-',
        },
        {
          label: '支付宝公钥引用',
          type: 'text',
          value: record.publicKeyRef ?? '-',
        },
        {
          label: '应用私钥引用',
          type: 'text',
          value: record.privateKeyRef ?? '-',
        },
        {
          label: '平台证书引用',
          type: 'text',
          value: record.platformCertRef ?? '-',
        },
        { label: '根证书引用', type: 'text', value: record.rootCertRef ?? '-' },
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
      title: '支付 provider 配置',
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
