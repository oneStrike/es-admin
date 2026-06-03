import type {
  BaseMembershipBenefitDefinitionDto,
  MembershipPlanBenefitInputDto,
  MembershipPlanCreateRequest,
  MembershipPlanPageResponse,
  MembershipPlanUpdateRequest,
} from '#/api/types';
import type { DetailCard } from '#/components/es-record-detail';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';
import { getOptionLabel } from '#/utils/options';

import {
  enabledStatusOptions,
  grantPolicyOptions,
  vipTierOptions,
} from './options';

export type VipPlanRow = NonNullable<
  MembershipPlanPageResponse['list']
>[number] & {
  statusLoading?: boolean;
};
export type VipPlanBenefitValue = NonNullable<
  MembershipPlanBenefitInputDto['benefitValue']
>;
export type VipPlanBenefitConfigRow = Partial<MembershipPlanBenefitInputDto> & {
  benefit?: BaseMembershipBenefitDefinitionDto;
  benefitId?: number;
  benefitValue?: null | VipPlanBenefitValue;
};
export type VipPlanFormValues = {
  benefitIds?: unknown;
  benefitRows?: unknown;
  benefits?: unknown;
  bonusPointAmount?: unknown;
  displayTag?: unknown;
  durationDays?: unknown;
  id?: unknown;
  isEnabled?: unknown;
  name?: unknown;
  originalPriceAmount?: unknown;
  priceAmount?: unknown;
  sortOrder?: unknown;
  tier?: unknown;
};

const displayBenefitType = 1;
const couponGrantBenefitType = 2;
const displayOnlyGrantPolicy = 1;
const autoGrantOnSubscribePolicy = 2;

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

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
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

function formatMembershipBenefitSummary(value: unknown) {
  if (!Array.isArray(value) || value.length === 0) {
    return '-';
  }

  const summary = value
    .map((item) => {
      if (!item || typeof item !== 'object') {
        return '';
      }

      const record = item as Record<string, unknown>;
      const benefit =
        record.benefit && typeof record.benefit === 'object'
          ? (record.benefit as Record<string, unknown>)
          : record;
      const name = normalizeText(benefit.name);

      return name ?? `#${record.benefitId ?? benefit.id ?? ''}`;
    })
    .filter(Boolean)
    .join('、');

  return summary || '-';
}

function normalizeSelectedBenefitIds(value: unknown): number[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => {
    if (typeof item === 'number') {
      return requireInteger(item, '权益 ID');
    }

    if (item && typeof item === 'object') {
      const record = item as Record<string, unknown>;
      return requireInteger(record.id ?? record.benefitId, '权益 ID');
    }

    return requireInteger(item, '权益 ID');
  });
}

function normalizeBenefitValue(
  value: unknown,
): MembershipPlanBenefitInputDto['benefitValue'] {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  if (typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError('权益配置值必须是 JSON 对象');
  }

  return value as VipPlanBenefitValue;
}

function normalizeCouponBenefitValue(value: VipPlanBenefitValue) {
  return {
    couponDefinitionId: requireInteger(value.couponDefinitionId, '优惠券'),
    grantCount: requireInteger(value.grantCount, '发放数量'),
  };
}

function normalizePlanBenefitRows(value: unknown): VipPlanBenefitConfigRow[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item) => item && typeof item === 'object')
    .map((item) => item as VipPlanBenefitConfigRow);
}

export function mapVipPlanToFormRecord(values: VipPlanRow) {
  const planBenefits = normalizePlanBenefitRows(values.benefits);

  return {
    ...values,
    benefitIds: planBenefits.map((item) =>
      requireInteger(item.benefitId ?? item.benefit?.id, '权益 ID'),
    ),
    benefitRows: planBenefits.map((item, index) => ({
      benefit: item.benefit,
      benefitId: requireInteger(item.benefitId ?? item.benefit?.id, '权益 ID'),
      benefitValue: item.benefitValue ?? null,
      grantPolicy: item.grantPolicy ?? displayOnlyGrantPolicy,
      isEnabled: item.isEnabled ?? true,
      sortOrder: item.sortOrder ?? index,
    })) satisfies VipPlanBenefitConfigRow[],
  };
}

function buildPlanBenefitInputs(values: VipPlanFormValues) {
  const selectedBenefitIds = normalizeSelectedBenefitIds(values.benefitIds);
  const selectedIds = new Set(selectedBenefitIds);
  const configMap = new Map<number, VipPlanBenefitConfigRow>();

  for (const row of normalizePlanBenefitRows(values.benefitRows)) {
    const benefitId = requireInteger(row.benefitId, '权益 ID');
    if (configMap.has(benefitId)) {
      throw new Error('套餐权益配置不能包含重复权益');
    }
    configMap.set(benefitId, row);
  }

  for (const benefitId of configMap.keys()) {
    if (!selectedIds.has(benefitId)) {
      throw new Error('套餐权益配置只能包含已选择的权益');
    }
  }

  return selectedBenefitIds.map((benefitId, index) => {
    const config = configMap.get(benefitId);

    if (!config) {
      return {
        benefitId,
        benefitValue: null,
        grantPolicy: displayOnlyGrantPolicy,
        isEnabled: true,
        sortOrder: index,
      } satisfies MembershipPlanBenefitInputDto;
    }

    const benefit = config.benefit;
    const benefitValue = normalizeBenefitValue(config.benefitValue);
    const benefitType = benefit?.benefitType ?? displayBenefitType;
    const benefitLabel = benefit?.name || `权益 ${benefitId}`;

    if (benefitType === couponGrantBenefitType && !benefitValue) {
      throw new Error(`${benefitLabel} 必须完善权益配置`);
    }
    if (
      benefitType !== displayBenefitType &&
      benefitType !== couponGrantBenefitType
    ) {
      throw new Error(`${benefitLabel} 不支持配置`);
    }

    const normalizedBenefitValue =
      benefitType === couponGrantBenefitType && benefitValue
        ? normalizeCouponBenefitValue(benefitValue)
        : null;
    const grantPolicy =
      benefitType === couponGrantBenefitType
        ? autoGrantOnSubscribePolicy
        : displayOnlyGrantPolicy;

    return {
      benefitId,
      benefitValue: normalizedBenefitValue,
      grantPolicy,
      isEnabled: normalizeBoolean(config.isEnabled) ?? true,
      sortOrder: normalizeNullableNumber(config.sortOrder) ?? index,
    } satisfies MembershipPlanBenefitInputDto;
  });
}

function buildVipPlanBase(values: VipPlanFormValues) {
  return {
    benefits: buildPlanBenefitInputs(values),
    bonusPointAmount: normalizeNullableNumber(values.bonusPointAmount),
    displayTag: normalizeNullableText(values.displayTag),
    durationDays: requireInteger(values.durationDays, '有效天数'),
    isEnabled: normalizeBoolean(values.isEnabled),
    name: requireText(values.name, '套餐名称'),
    originalPriceAmount: normalizeNullableNumber(values.originalPriceAmount),
    priceAmount: requireInteger(values.priceAmount, '套餐售价'),
    sortOrder: normalizeNullableNumber(values.sortOrder),
    tier: requireInteger(values.tier, '套餐层级') as 1 | 2,
  } satisfies MembershipPlanCreateRequest;
}

export function buildVipPlanCreatePayload(values: VipPlanFormValues) {
  return buildVipPlanBase(values);
}

export function buildVipPlanUpdatePayload(values: VipPlanFormValues) {
  return {
    id: requireInteger(values.id, 'ID'),
    ...buildVipPlanBase(values),
  } satisfies MembershipPlanUpdateRequest;
}

export const vipPlanBaseFormSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: { clearable: true, placeholder: '请输入套餐名称' },
    fieldName: 'name',
    label: '套餐名称',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      options: vipTierOptions,
      placeholder: '请选择套餐层级',
    },
    fieldName: 'tier',
    label: '套餐层级',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 0,
      placeholder: '请输入套餐售价（分）',
    },
    fieldName: 'priceAmount',
    label: '套餐售价（分）',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 0,
      placeholder: '请输入划线原价（分）',
    },
    fieldName: 'originalPriceAmount',
    label: '划线原价（分）',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '请输入有效天数',
    },
    fieldName: 'durationDays',
    label: '有效天数',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: { clearable: true, placeholder: '请输入营销标签' },
    fieldName: 'displayTag',
    label: '营销标签',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 0,
      placeholder: '请输入赠送积分',
    },
    fieldName: 'bonusPointAmount',
    label: '赠送积分',
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
];

export const vipPlanSearchSchema = formSchemaTransform.toSearchSchema(
  vipPlanBaseFormSchema,
  {
    name: { show: true },
    tier: { show: true },
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

export const vipPlanColumns = formSchemaTransform.toTableColumns<VipPlanRow>(
  vipPlanBaseFormSchema,
  {
    actions: {
      minWidth: 180,
      show: true,
    },
    benefitSummary: {
      formatter: ({ row }: { row: VipPlanRow }) =>
        formatMembershipBenefitSummary(row.benefits),
      minWidth: 240,
      sort: 5.5,
      title: '关联权益',
    },
    bonusPointAmount: { hide: true },
    isEnabled: {
      minWidth: 110,
      slots: { default: 'isEnabled' },
    },
    name: { fixed: 'left', minWidth: 180, slots: { default: 'detail' } },
    originalPriceAmount: {
      formatter: ({ cellValue }: { cellValue: unknown }) =>
        formatCentAmount(cellValue),
      minWidth: 120,
      title: '原价',
    },
    planKey: { minWidth: 160, sort: 0.5, title: '业务键' },
    priceAmount: {
      formatter: ({ cellValue }: { cellValue: unknown }) =>
        formatCentAmount(cellValue),
      minWidth: 120,
      title: '售价',
    },
  },
);

function formatPlanBenefitValue(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return '';
  }

  const record = value as Record<string, unknown>;
  const couponDefinitionId = record.couponDefinitionId;
  const grantCount = normalizeOptionalNumber(record.grantCount);
  if (couponDefinitionId !== undefined) {
    return `，赠送优惠券 #${couponDefinitionId} x${grantCount ?? 1}`;
  }

  return '';
}

function createPlanBenefitConfigCard(record: VipPlanRow) {
  const benefits = Array.isArray(record.benefits) ? record.benefits : [];
  if (benefits.length === 0) {
    return undefined;
  }

  const content = benefits
    .map((item) => {
      const benefit = item.benefit || {};
      const name = benefit.name || `#${item.benefitId ?? ''}`;
      const grantPolicy = formatOptionText(
        grantPolicyOptions,
        item.grantPolicy,
      );
      const enabledText = item.isEnabled === false ? '禁用' : '启用';
      const valueText = formatPlanBenefitValue(item.benefitValue);

      return `<li>${escapeHtml(name)}：${escapeHtml(grantPolicy)}，${escapeHtml(
        enabledText,
      )}${escapeHtml(valueText)}</li>`;
    })
    .join('');

  return {
    content: `<ul class="list-disc pl-5 text-xs">${content}</ul>`,
    show: true,
    title: '套餐权益配置',
    type: 'text',
  } satisfies DetailCard;
}

export function getVipPlanDetailCards(record: VipPlanRow) {
  const benefitConfigCard = createPlanBenefitConfigCard(record);

  return [
    {
      fields: [
        {
          label: 'ID',
          type: 'text',
          value: record.id,
        },
        {
          label: '套餐名称',
          type: 'text',
          value: record.name,
        },
        {
          label: '套餐业务键',
          type: 'text',
          value: record.planKey,
        },
        {
          label: '套餐层级',
          tagText: formatOptionText(vipTierOptions, record.tier),
          type: 'tag',
          value: record.tier,
        },
        {
          label: '套餐售价',
          type: 'text',
          value: formatCentAmount(record.priceAmount),
        },
        {
          label: '划线原价',
          type: 'text',
          value: formatCentAmount(record.originalPriceAmount),
        },
        {
          label: '有效天数',
          type: 'text',
          value: record.durationDays,
        },
        {
          label: '关联权益',
          type: 'text',
          value: formatMembershipBenefitSummary(record.benefits),
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
      title: 'VIP 套餐',
    },
    ...(benefitConfigCard ? [benefitConfigCard] : []),
  ] satisfies DetailCard[];
}
