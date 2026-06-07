import type {
  AdRewardRecordDetailResponse,
  AdRewardRecordPageRequest,
  AdRewardRecordPageResponse,
  AdRewardRecordReconcilePageRequest,
  AdRewardRecordReconcilePageResponse,
  AdRewardRecordRevokeRequest,
} from '#/api/types';
import type { RecordDetailSection } from '#/components/record-detail-modal';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';
import { getOptionLabel } from '#/utils/options';
import {
  normalizeSearchNumber,
  splitSearchDateRange,
} from '#/utils/search-normalize';

import {
  adProviderOptions,
  adRewardReconcileStatusOptions,
  adRewardStatusOptions,
  adRewardTargetTypeOptions,
  adTargetScopeOptions,
  environmentOptions,
  platformOptions,
} from './options';

export type AdRewardRecordRow = NonNullable<
  AdRewardRecordPageResponse['list']
>[number] & {
  revokeLoading?: boolean;
};

export type AdRewardReconcileRow = NonNullable<
  AdRewardRecordReconcilePageResponse['list']
>[number] & {
  revokeLoading?: boolean;
};

export type AdRewardRecordSearchValues = {
  dateRange?: unknown;
  environment?: unknown;
  platform?: unknown;
  provider?: unknown;
  status?: unknown;
  targetScope?: unknown;
  targetType?: unknown;
};

export type AdRewardRecordRevokeFormValues = {
  reason?: unknown;
};

type OptionValue = boolean | number | string;
type OptionItem = { color?: string; label: string; value: OptionValue };

function normalizeText(value: unknown) {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed || undefined;
}

function requireText(value: unknown, label: string) {
  const text = normalizeText(value);

  if (!text) {
    throw new Error(`${label}不能为空`);
  }

  return text;
}

function requireInteger(value: unknown, label: string) {
  const numberValue = Number(value);

  if (!Number.isInteger(numberValue)) {
    throw new TypeError(`${label}必须是整数`);
  }

  return numberValue;
}

function formatOptionText(options: OptionItem[], value: unknown) {
  return getOptionLabel(options, value as OptionValue) || String(value ?? '-');
}

function getOptionColor(options: OptionItem[], value: unknown) {
  return options.find((option) => option.value === value)?.color ?? 'info';
}

function buildAdRewardRecordQuery(formValues: AdRewardRecordSearchValues = {}) {
  const { endDate, startDate } = splitSearchDateRange(formValues.dateRange);

  return {
    endDate,
    environment: normalizeSearchNumber(formValues.environment),
    platform: normalizeSearchNumber(formValues.platform),
    provider: normalizeSearchNumber(formValues.provider),
    startDate,
    status: normalizeSearchNumber(formValues.status),
    targetScope: normalizeSearchNumber(formValues.targetScope),
    targetType: normalizeSearchNumber(formValues.targetType),
  };
}

export function buildAdRewardRecordSearchValues(
  formValues: AdRewardRecordSearchValues = {},
) {
  return buildAdRewardRecordQuery(
    formValues,
  ) satisfies Partial<AdRewardRecordPageRequest>;
}

export function buildAdRewardReconcileSearchValues(
  formValues: AdRewardRecordSearchValues = {},
) {
  return buildAdRewardRecordQuery(
    formValues,
  ) satisfies Partial<AdRewardRecordReconcilePageRequest>;
}

export function buildAdRewardRecordRevokePayload(
  recordId: unknown,
  values: AdRewardRecordRevokeFormValues,
) {
  return {
    id: requireInteger(recordId, '奖励记录 ID'),
    reason: requireText(values.reason, '撤销原因'),
  } satisfies AdRewardRecordRevokeRequest;
}

const adRewardRecordFilterSchema: EsFormSchema = [
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
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      options: adTargetScopeOptions,
      placeholder: '请选择目标范围',
    },
    fieldName: 'targetScope',
    label: '目标范围',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      options: adRewardTargetTypeOptions,
      placeholder: '请选择目标类型',
    },
    fieldName: 'targetType',
    label: '目标类型',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      options: adRewardStatusOptions,
      placeholder: '请选择奖励状态',
    },
    fieldName: 'status',
    label: '奖励状态',
  },
];

const adRewardRecordTableSchema: EsFormSchema = [
  {
    component: 'InputNumber',
    fieldName: 'id',
    label: '记录 ID',
  },
  {
    component: 'InputNumber',
    fieldName: 'userId',
    label: '用户 ID',
  },
  {
    component: 'Input',
    fieldName: 'placementKey',
    label: '广告位 key',
  },
  {
    component: 'Input',
    fieldName: 'providerRewardId',
    label: 'provider 奖励 ID',
  },
  {
    component: 'Select',
    componentProps: {
      options: adTargetScopeOptions,
    },
    fieldName: 'targetScope',
    label: '目标范围',
  },
  {
    component: 'Select',
    componentProps: {
      options: adRewardTargetTypeOptions,
    },
    fieldName: 'targetType',
    label: '目标类型',
  },
  {
    component: 'InputNumber',
    fieldName: 'targetId',
    label: '目标 ID',
  },
  {
    component: 'Select',
    componentProps: {
      options: adRewardStatusOptions,
    },
    fieldName: 'status',
    label: '奖励状态',
  },
  {
    component: 'InputNumber',
    fieldName: 'adProviderConfigVersion',
    label: '配置版本',
  },
  {
    component: 'Input',
    fieldName: 'credentialVersionRef',
    label: '密钥版本引用',
  },
];

const adRewardReconcileTableSchema: EsFormSchema = [
  ...adRewardRecordTableSchema,
  {
    component: 'Select',
    componentProps: {
      options: adRewardReconcileStatusOptions,
    },
    fieldName: 'reconcileStatus',
    label: '对账状态',
  },
  {
    component: 'Input',
    fieldName: 'reconcileMessage',
    label: '对账说明',
  },
  {
    component: 'DatePicker',
    fieldName: 'entitlementExpiresAt',
    label: '权益过期时间',
  },
];

export const adRewardRecordSearchSchema = formSchemaTransform.toSearchSchema(
  adRewardRecordFilterSchema,
  {
    provider: {},
    platform: {},
    environment: {},
    targetScope: {},
    targetType: {},
    status: {},
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

export const adRewardRecordColumns =
  formSchemaTransform.toTableColumns<AdRewardRecordRow>(
    adRewardRecordTableSchema,
    {
      actions: {
        minWidth: 150,
        show: true,
      },
      createdAt: {
        show: true,
        sort: 90,
      },
      credentialVersionRef: { hide: true },
      id: {
        fixed: 'left',
        minWidth: 100,
        slots: { default: 'recordDetail' },
      },
      placementKey: {
        minWidth: 160,
      },
      providerRewardId: {
        minWidth: 220,
      },
      targetId: {
        minWidth: 110,
      },
      updatedAt: {
        hide: true,
      },
      userId: {
        minWidth: 110,
      },
    },
  );

export const adRewardReconcileColumns =
  formSchemaTransform.toTableColumns<AdRewardReconcileRow>(
    adRewardReconcileTableSchema,
    {
      actions: {
        minWidth: 150,
        show: true,
      },
      createdAt: {
        show: true,
        sort: 90,
      },
      credentialVersionRef: { hide: true },
      entitlementExpiresAt: {
        cellRender: {
          name: 'CellDate',
        },
        minWidth: 170,
      },
      id: {
        fixed: 'left',
        minWidth: 100,
        slots: { default: 'reconcileDetail' },
      },
      placementKey: {
        minWidth: 160,
      },
      providerRewardId: {
        minWidth: 220,
      },
      reconcileMessage: {
        minWidth: 260,
      },
      reconcileStatus: {
        minWidth: 150,
      },
      targetId: {
        minWidth: 110,
      },
      updatedAt: {
        hide: true,
      },
      userId: {
        minWidth: 110,
      },
    },
  );

export const adRewardRecordRevokeSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入撤销原因',
      rows: 4,
      type: 'textarea',
    },
    fieldName: 'reason',
    formItemClass: 'col-span-1',
    label: '撤销原因',
    rules: 'required',
  },
];

export function getAdRewardRecordDetailSections(
  record: AdRewardRecordDetailResponse,
) {
  return [
    {
      items: [
        { label: '记录 ID', type: 'text', value: record.id },
        { label: '用户 ID', type: 'text', value: record.userId },
        {
          label: '奖励状态',
          tagText: formatOptionText(adRewardStatusOptions, record.status),
          tagType: getOptionColor(adRewardStatusOptions, record.status),
          type: 'tag',
          value: record.status,
        },
        { label: '广告位 key', type: 'text', value: record.placementKey },
        {
          label: '目标范围',
          tagText: formatOptionText(adTargetScopeOptions, record.targetScope),
          tagType: getOptionColor(adTargetScopeOptions, record.targetScope),
          type: 'tag',
          value: record.targetScope,
        },
        {
          label: '目标类型',
          tagText: formatOptionText(
            adRewardTargetTypeOptions,
            record.targetType,
          ),
          tagType: getOptionColor(adRewardTargetTypeOptions, record.targetType),
          type: 'tag',
          value: record.targetType,
        },
        { label: '目标 ID', type: 'text', value: record.targetId },
        {
          label: '配置版本',
          type: 'text',
          value: record.adProviderConfigVersion,
        },
        { label: '创建时间', type: 'date', value: record.createdAt },
        { label: '更新时间', type: 'date', value: record.updatedAt },
      ],
      show: true,
      title: '广告奖励记录',
    },
  ] satisfies RecordDetailSection[];
}

export function getAdRewardReconcileDetailSections(
  record: AdRewardReconcileRow,
) {
  return [
    {
      items: [
        { label: '记录 ID', type: 'text', value: record.id },
        { label: '用户 ID', type: 'text', value: record.userId },
        {
          label: '对账状态',
          tagText: formatOptionText(
            adRewardReconcileStatusOptions,
            record.reconcileStatus,
          ),
          tagType: getOptionColor(
            adRewardReconcileStatusOptions,
            record.reconcileStatus,
          ),
          type: 'tag',
          value: record.reconcileStatus,
        },
        {
          label: '对账说明',
          type: 'text',
          value: record.reconcileMessage,
        },
        {
          label: '奖励状态',
          tagText: formatOptionText(adRewardStatusOptions, record.status),
          tagType: getOptionColor(adRewardStatusOptions, record.status),
          type: 'tag',
          value: record.status,
        },
        { label: '广告位 key', type: 'text', value: record.placementKey },
        {
          label: '目标范围',
          tagText: formatOptionText(adTargetScopeOptions, record.targetScope),
          tagType: getOptionColor(adTargetScopeOptions, record.targetScope),
          type: 'tag',
          value: record.targetScope,
        },
        {
          label: '目标类型',
          tagText: formatOptionText(
            adRewardTargetTypeOptions,
            record.targetType,
          ),
          tagType: getOptionColor(adRewardTargetTypeOptions, record.targetType),
          type: 'tag',
          value: record.targetType,
        },
        { label: '目标 ID', type: 'text', value: record.targetId },
        {
          label: '配置版本',
          type: 'text',
          value: record.adProviderConfigVersion,
        },
        {
          label: '权益过期时间',
          type: 'date',
          value: record.entitlementExpiresAt,
        },
        { label: '创建时间', type: 'date', value: record.createdAt },
        { label: '更新时间', type: 'date', value: record.updatedAt },
      ],
      show: true,
      title: '广告奖励对账',
    },
  ] satisfies RecordDetailSection[];
}
