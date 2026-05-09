import type {
  MonetizationVipBenefitCreateRequest,
  MonetizationVipBenefitPageResponse,
  MonetizationVipBenefitUpdateRequest,
} from '#/api/types';
import type { DetailCard } from '#/components/es-record-detail';
import type { EsFormSchema } from '#/types';

import { UploadSceneEnum } from '#/enum/api';
import { formSchemaTransform } from '#/utils';
import { getOptionLabel } from '#/utils/options';

import { benefitTypeOptions, enabledStatusOptions } from './options';

export type VipBenefitRow = NonNullable<
  MonetizationVipBenefitPageResponse['list']
>[number] & {
  statusLoading?: boolean;
};

export type VipBenefitFormValues = {
  benefitType?: unknown;
  description?: unknown;
  icon?: unknown;
  id?: unknown;
  isEnabled?: unknown;
  name?: unknown;
  sortOrder?: unknown;
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

function formatOptionText(
  options: Array<{ label: string; value: boolean | number | string }>,
  value: unknown,
) {
  return (
    getOptionLabel(options, value as boolean | number | string) ||
    String(value ?? '-')
  );
}

function buildVipBenefitBase(values: VipBenefitFormValues) {
  return {
    benefitType: requireInteger(values.benefitType, '权益类型') as
      | 1
      | 2
      | 3
      | 4
      | 5
      | 6,
    description: normalizeNullableText(values.description),
    icon: normalizeNullableText(values.icon),
    isEnabled: normalizeBoolean(values.isEnabled),
    name: requireText(values.name, '权益名称'),
    sortOrder: normalizeNullableNumber(values.sortOrder),
  } satisfies MonetizationVipBenefitCreateRequest;
}

export function buildVipBenefitCreatePayload(values: VipBenefitFormValues) {
  return buildVipBenefitBase(values);
}

export function buildVipBenefitUpdatePayload(values: VipBenefitFormValues) {
  return {
    id: requireInteger(values.id, 'ID'),
    ...buildVipBenefitBase(values),
  } satisfies MonetizationVipBenefitUpdateRequest;
}

export const vipBenefitFormSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '请输入权益名称',
    },
    fieldName: 'name',
    label: '权益名称',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      options: benefitTypeOptions,
      placeholder: '请选择权益类型',
    },
    fieldName: 'benefitType',
    label: '权益类型',
    rules: 'required',
  },
  {
    component: 'Upload',
    componentProps: {
      accept: 'image/*',
      maxCount: 1,
      placeholder: '请上传权益图标',
      returnDataType: 'url',
      scene: UploadSceneEnum.SHARED,
    },
    fieldName: 'icon',
    label: '权益图标资源键或 URL',
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
      placeholder: '请输入权益说明',
      rows: 4,
      type: 'textarea',
    },
    fieldName: 'description',
    formItemClass: 'col-span-2',
    label: '权益说明',
  },
];

export const vipBenefitSearchSchema = formSchemaTransform.toSearchSchema(
  vipBenefitFormSchema,
  {
    name: { show: true },
    benefitType: { show: true },
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

export const vipBenefitColumns =
  formSchemaTransform.toTableColumns<VipBenefitRow>(vipBenefitFormSchema, {
    actions: {
      minWidth: 180,
      show: true,
    },
    code: { minWidth: 160, sort: 0.5, title: '业务键' },
    description: { hide: true },
    icon: { title: '图标' },
    isEnabled: {
      minWidth: 110,
      slots: { default: 'isEnabled' },
    },
    name: { fixed: 'left', minWidth: 180, slots: { default: 'detail' } },
  });

export function getVipBenefitDetailCards(record: VipBenefitRow) {
  return [
    {
      fields: [
        { label: 'ID', type: 'text', value: record.id },
        { label: '权益名称', type: 'text', value: record.name },
        { label: '权益业务键', type: 'text', value: record.code },
        {
          label: '权益类型',
          tagText: formatOptionText(benefitTypeOptions, record.benefitType),
          type: 'tag',
          value: record.benefitType,
        },
        { label: '图标', type: 'text', value: record.icon ?? '-' },
        { label: '说明', type: 'text', value: record.description ?? '-' },
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
      title: '会员权益定义',
    },
  ] satisfies DetailCard[];
}
