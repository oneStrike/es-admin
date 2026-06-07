import type {
  PaymentProviderCertificateOptionDto,
  PaymentProviderCreateRequest,
  PaymentProviderCredentialOptionDto,
  PaymentProviderPageResponse,
  PaymentProviderUpdateRequest,
} from '#/api/types';
import type { RecordDetailSection } from '#/components/record-detail-modal';
import type { EsFormSchema } from '#/types';

import {
  paymentCertificateOptionListApi,
  paymentCredentialOptionListApi,
} from '#/api/core';
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
  PaymentProviderPageResponse['list']
>[number] & {
  statusLoading?: boolean;
};

export type PaymentProviderFormValues = {
  allowedReturnDomains?: unknown;
  apiV3KeyCredentialId?: unknown;
  appCertificateId?: unknown;
  appId?: unknown;
  certMode?: unknown;
  channel?: unknown;
  clientAppKey?: unknown;
  configName?: unknown;
  credentialOptionId?: unknown;
  environment?: unknown;
  id?: unknown;
  isEnabled?: unknown;
  mchId?: unknown;
  notifyUrl?: unknown;
  paymentScene?: unknown;
  platform?: unknown;
  platformCertificateId?: unknown;
  privateKeyCredentialId?: unknown;
  publicKeyCredentialId?: unknown;
  returnUrl?: unknown;
  rootCertificateId?: unknown;
  sortOrder?: unknown;
};

type AllowedReturnDomainRow = {
  domain?: unknown;
};

type OptionValue = boolean | number | string;

type PaymentConfigMetadata = {
  certificateOptions?: Record<string, unknown>;
  credentialOptions?: Record<string, unknown>;
};

type StoredSelection = {
  fingerprint?: unknown;
  id?: unknown;
  label?: unknown;
  maskedIdentifier?: unknown;
  maskedSerialNo?: unknown;
  status?: unknown;
  versionLabel?: unknown;
};

const PAYMENT_CREDENTIAL_TYPE = {
  ALIPAY_PUBLIC_KEY: 2,
  APP_PRIVATE_KEY: 1,
  WECHAT_API_V3_KEY: 3,
} as const;

const PAYMENT_CERTIFICATE_TYPE = {
  APP_CERTIFICATE: 1,
  PLATFORM_CERTIFICATE: 2,
  ROOT_CERTIFICATE: 3,
} as const;

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

function normalizeOptionalInteger(value: unknown, label: string) {
  const numberValue = normalizeOptionalNumber(value);

  if (numberValue === undefined) {
    return undefined;
  }

  if (!Number.isInteger(numberValue)) {
    throw new TypeError(`${label}必须是整数`);
  }

  return numberValue;
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

function normalizeBoolean(value: unknown) {
  return typeof value === 'boolean' ? value : null;
}

function formatOptionText(
  options: Array<{ label: string; value: OptionValue }>,
  value: unknown,
) {
  return getOptionLabel(options, value as OptionValue) || String(value ?? '-');
}

function formatAllowedReturnDomainRows(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => ({ domain: normalizeText(item) ?? '' }))
    .filter((item) => !!item.domain);
}

function buildAllowedReturnDomains(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        return undefined;
      }

      return normalizeText((item as AllowedReturnDomainRow).domain);
    })
    .filter((item): item is string => !!item);
}

function readObject(value: unknown) {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function readPaymentConfigMetadata(
  record: Pick<PaymentProviderConfigRow, 'configMetadata'>,
) {
  return readObject(record.configMetadata) as PaymentConfigMetadata;
}

function readStoredSelection(
  record: Pick<PaymentProviderConfigRow, 'configMetadata'>,
  group: 'certificateOptions' | 'credentialOptions',
  field: string,
) {
  const metadata = readPaymentConfigMetadata(record);
  const selections = readObject(metadata[group]);
  const value = selections[field];

  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as StoredSelection)
    : undefined;
}

function readStoredSelectionId(
  record: Pick<PaymentProviderConfigRow, 'configMetadata'>,
  group: 'certificateOptions' | 'credentialOptions',
  field: string,
) {
  const id = readStoredSelection(record, group, field)?.id;
  return typeof id === 'number' && Number.isInteger(id) ? id : undefined;
}

function formatPaymentCredentialOptionLabel(
  item: PaymentProviderCredentialOptionDto,
) {
  return [
    item.label,
    item.versionLabel,
    item.maskedIdentifier,
    item.fingerprint,
  ]
    .filter(Boolean)
    .join(' / ');
}

function formatPaymentCertificateOptionLabel(
  item: PaymentProviderCertificateOptionDto,
) {
  return [item.label, item.versionLabel, item.maskedSerialNo, item.fingerprint]
    .filter(Boolean)
    .join(' / ');
}

function normalizePaymentCredentialOptions(options: unknown) {
  if (!Array.isArray(options)) {
    return [];
  }

  return options.map((item) => {
    const option = item as PaymentProviderCredentialOptionDto;
    return {
      ...option,
      disabled: option.status !== 1,
      label: formatPaymentCredentialOptionLabel(option),
    };
  });
}

function normalizePaymentCertificateOptions(options: unknown) {
  if (!Array.isArray(options)) {
    return [];
  }

  return options.map((item) => {
    const option = item as PaymentProviderCertificateOptionDto;
    return {
      ...option,
      disabled: option.status !== 1,
      label: formatPaymentCertificateOptionLabel(option),
    };
  });
}

function credentialOptionSelectComponentProps(credentialType?: number) {
  return {
    afterFetch: normalizePaymentCredentialOptions,
    api: paymentCredentialOptionListApi,
    class: 'w-full',
    clearable: true,
    disabledField: 'disabled',
    filterable: true,
    params: {
      ...(credentialType === undefined ? {} : { credentialType }),
      status: 1,
    },
    placeholder: '请选择支付凭据',
    valueField: 'value',
  };
}

function certificateOptionSelectComponentProps(certificateType: number) {
  return {
    afterFetch: normalizePaymentCertificateOptions,
    api: paymentCertificateOptionListApi,
    class: 'w-full',
    clearable: true,
    disabledField: 'disabled',
    filterable: true,
    params: {
      certificateType,
      status: 1,
    },
    placeholder: '请选择支付证书',
    valueField: 'value',
  };
}

function buildStoredSelectionText(selection?: StoredSelection) {
  if (!selection) {
    return '-';
  }

  return [
    normalizeText(selection.label),
    normalizeText(selection.versionLabel),
    normalizeText(selection.maskedIdentifier) ??
      normalizeText(selection.maskedSerialNo),
    normalizeText(selection.fingerprint),
  ]
    .filter(Boolean)
    .join(' / ');
}

function buildSelectionDetailItem(label: string, selection?: StoredSelection) {
  return {
    label,
    type: 'text' as const,
    value: buildStoredSelectionText(selection),
  };
}

export function getPaymentProviderCredentialOptionText(
  record: PaymentProviderConfigRow,
) {
  return buildStoredSelectionText(
    readStoredSelection(record, 'credentialOptions', 'credentialOptionId'),
  );
}

export function mapProviderToFormRecord(values: PaymentProviderConfigRow) {
  return {
    ...values,
    allowedReturnDomains: formatAllowedReturnDomainRows(
      values.allowedReturnDomains,
    ),
    apiV3KeyCredentialId: readStoredSelectionId(
      values,
      'credentialOptions',
      'apiV3KeyCredentialId',
    ),
    appCertificateId: readStoredSelectionId(
      values,
      'certificateOptions',
      'appCertificateId',
    ),
    credentialOptionId: readStoredSelectionId(
      values,
      'credentialOptions',
      'credentialOptionId',
    ),
    platformCertificateId: readStoredSelectionId(
      values,
      'certificateOptions',
      'platformCertificateId',
    ),
    privateKeyCredentialId: readStoredSelectionId(
      values,
      'credentialOptions',
      'privateKeyCredentialId',
    ),
    publicKeyCredentialId: readStoredSelectionId(
      values,
      'credentialOptions',
      'publicKeyCredentialId',
    ),
    rootCertificateId: readStoredSelectionId(
      values,
      'certificateOptions',
      'rootCertificateId',
    ),
  };
}

function buildPaymentProviderBase(values: PaymentProviderFormValues) {
  return {
    allowedReturnDomains: buildAllowedReturnDomains(
      values.allowedReturnDomains,
    ),
    apiV3KeyCredentialId: normalizeOptionalInteger(
      values.apiV3KeyCredentialId,
      '微信 APIv3 key 凭据',
    ),
    appCertificateId: normalizeOptionalInteger(
      values.appCertificateId,
      '应用证书',
    ),
    appId: normalizeNullableText(values.appId),
    certMode: normalizeNullableNumber(values.certMode),
    channel: requireInteger(values.channel, '支付渠道') as 1 | 2,
    clientAppKey: normalizeNullableText(values.clientAppKey),
    configName: normalizeNullableText(values.configName),
    credentialOptionId: requireInteger(values.credentialOptionId, '主支付凭据'),
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
    platformCertificateId: normalizeOptionalInteger(
      values.platformCertificateId,
      '平台证书',
    ),
    privateKeyCredentialId: normalizeOptionalInteger(
      values.privateKeyCredentialId,
      '应用私钥凭据',
    ),
    publicKeyCredentialId: normalizeOptionalInteger(
      values.publicKeyCredentialId,
      '支付宝公钥凭据',
    ),
    returnUrl: normalizeNullableText(values.returnUrl),
    rootCertificateId: normalizeOptionalInteger(
      values.rootCertificateId,
      '根证书',
    ),
    sortOrder: normalizeNullableNumber(values.sortOrder),
  } satisfies PaymentProviderCreateRequest;
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
  } satisfies PaymentProviderUpdateRequest;
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
    component: 'ApiSelect',
    componentProps: credentialOptionSelectComponentProps(),
    fieldName: 'credentialOptionId',
    label: '主支付凭据',
    rules: 'required',
  },
  {
    component: 'ApiSelect',
    componentProps: credentialOptionSelectComponentProps(
      PAYMENT_CREDENTIAL_TYPE.APP_PRIVATE_KEY,
    ),
    fieldName: 'privateKeyCredentialId',
    label: '应用私钥凭据',
  },
  {
    component: 'ApiSelect',
    componentProps: credentialOptionSelectComponentProps(
      PAYMENT_CREDENTIAL_TYPE.ALIPAY_PUBLIC_KEY,
    ),
    dependencies: {
      show: (values) => values.channel === 1,
      triggerFields: ['channel'],
    },
    fieldName: 'publicKeyCredentialId',
    label: '支付宝公钥凭据',
  },
  {
    component: 'ApiSelect',
    componentProps: credentialOptionSelectComponentProps(
      PAYMENT_CREDENTIAL_TYPE.WECHAT_API_V3_KEY,
    ),
    dependencies: {
      show: (values) => values.channel === 2,
      triggerFields: ['channel'],
    },
    fieldName: 'apiV3KeyCredentialId',
    label: '微信 APIv3 key 凭据',
  },
  {
    component: 'ApiSelect',
    componentProps: certificateOptionSelectComponentProps(
      PAYMENT_CERTIFICATE_TYPE.APP_CERTIFICATE,
    ),
    fieldName: 'appCertificateId',
    label: '应用证书',
  },
  {
    component: 'ApiSelect',
    componentProps: certificateOptionSelectComponentProps(
      PAYMENT_CERTIFICATE_TYPE.PLATFORM_CERTIFICATE,
    ),
    fieldName: 'platformCertificateId',
    label: '平台证书',
  },
  {
    component: 'ApiSelect',
    componentProps: certificateOptionSelectComponentProps(
      PAYMENT_CERTIFICATE_TYPE.ROOT_CERTIFICATE,
    ),
    fieldName: 'rootCertificateId',
    label: '根证书',
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
    component: 'Input',
    componentProps: { clearable: true, placeholder: '请输入通知回调地址' },
    fieldName: 'notifyUrl',
    label: '通知回调地址',
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
    component: 'VbenFormFieldArray',
    componentProps: {
      addButtonText: '添加返回域名',
      emptyText: '暂无返回域名',
      schema: [
        {
          component: 'Input',
          componentProps: {
            clearable: true,
            placeholder: '请输入 H5 返回域名',
          },
          fieldName: 'domain',
          label: '返回域名',
          rules: 'required',
        },
      ],
    },
    fieldName: 'allowedReturnDomains',
    formItemClass: 'col-span-2',
    label: 'H5 允许返回域名',
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
      allowedReturnDomains: { hide: true },
      apiV3KeyCredentialId: { hide: true },
      appCertificateId: { hide: true },
      appId: { hide: true },
      certMode: { hide: true },
      credentialOptionId: {
        minWidth: 260,
        slots: { default: 'credentialOption' },
        title: '主支付凭据',
      },
      isEnabled: {
        minWidth: 110,
        slots: { default: 'isEnabled' },
      },
      mchId: { hide: true },
      notifyUrl: { hide: true },
      platformCertificateId: { hide: true },
      privateKeyCredentialId: { hide: true },
      publicKeyCredentialId: { hide: true },
      returnUrl: { hide: true },
      rootCertificateId: { hide: true },
      sortOrder: { hide: true },
    },
  );

export function getPaymentProviderDetailSections(
  record: PaymentProviderConfigRow,
) {
  const credentialSelections = {
    apiV3KeyCredentialId: readStoredSelection(
      record,
      'credentialOptions',
      'apiV3KeyCredentialId',
    ),
    credentialOptionId: readStoredSelection(
      record,
      'credentialOptions',
      'credentialOptionId',
    ),
    privateKeyCredentialId: readStoredSelection(
      record,
      'credentialOptions',
      'privateKeyCredentialId',
    ),
    publicKeyCredentialId: readStoredSelection(
      record,
      'credentialOptions',
      'publicKeyCredentialId',
    ),
  };
  const certificateSelections = {
    appCertificateId: readStoredSelection(
      record,
      'certificateOptions',
      'appCertificateId',
    ),
    platformCertificateId: readStoredSelection(
      record,
      'certificateOptions',
      'platformCertificateId',
    ),
    rootCertificateId: readStoredSelection(
      record,
      'certificateOptions',
      'rootCertificateId',
    ),
  };

  return [
    {
      items: [
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
    {
      items: [
        buildSelectionDetailItem(
          '主支付凭据',
          credentialSelections.credentialOptionId,
        ),
        buildSelectionDetailItem(
          '应用私钥凭据',
          credentialSelections.privateKeyCredentialId,
        ),
        buildSelectionDetailItem(
          '支付宝公钥凭据',
          credentialSelections.publicKeyCredentialId,
        ),
        buildSelectionDetailItem(
          '微信 APIv3 key 凭据',
          credentialSelections.apiV3KeyCredentialId,
        ),
      ],
      show: true,
      title: '凭据摘要',
    },
    {
      items: [
        buildSelectionDetailItem(
          '应用证书',
          certificateSelections.appCertificateId,
        ),
        buildSelectionDetailItem(
          '平台证书',
          certificateSelections.platformCertificateId,
        ),
        buildSelectionDetailItem(
          '根证书',
          certificateSelections.rootCertificateId,
        ),
      ],
      show: true,
      title: '证书摘要',
    },
  ] satisfies RecordDetailSection[];
}
