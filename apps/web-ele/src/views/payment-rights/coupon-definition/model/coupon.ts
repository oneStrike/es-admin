import type {
  CouponDefinitionCreateRequest,
  CouponDefinitionPageResponse,
  CouponDefinitionUpdateRequest,
  CouponGrantWorkflowCreateRequest,
} from '#/api/types';
import type { DetailCard, DetailField } from '#/components/es-record-detail';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';
import { getOptionLabel } from '#/utils/options';
import { createAppUserTableSelectProps } from '#/views/user-manager/shared/app-user-select';

import { couponTypeOptions, enabledStatusOptions } from './options';

type CouponDefinitionFormFields = Pick<
  CouponDefinitionCreateRequest,
  | 'benefitCount'
  | 'benefitDays'
  | 'couponType'
  | 'discountAmount'
  | 'discountRateBps'
  | 'isEnabled'
  | 'name'
  | 'usageLimit'
  | 'validDays'
>;

type CouponTypeValue = CouponDefinitionCreateRequest['couponType'];
type CouponDiscountMode = 'amount' | 'percent';
export type CouponGrantPayload = CouponGrantWorkflowCreateRequest;

export type CouponRow = NonNullable<
  CouponDefinitionPageResponse['list']
>[number] & {
  statusLoading?: boolean;
};

export type CouponFormValues = Partial<CouponDefinitionFormFields> &
  Pick<Partial<CouponDefinitionUpdateRequest>, 'id'> & {
    discountMode?: unknown;
    discountPercent?: unknown;
  };

export type CouponGrantFormValues = Pick<
  Partial<CouponGrantWorkflowCreateRequest>,
  'quantity' | 'remark' | 'userIds'
> & {
  couponAbility?: unknown;
  couponName?: unknown;
  grantSummary?: unknown;
};

const couponTypeValues = [1, 2, 3, 4] satisfies CouponTypeValue[];

const couponDiscountModeOptions = [
  { label: '立减金额', value: 'amount' },
  { label: '按比例折扣', value: 'percent' },
];

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

function normalizeBoolean(value: unknown) {
  return typeof value === 'boolean' ? value : null;
}

function requireText(value: unknown, label: string) {
  const text = normalizeText(value);

  if (!text) {
    throw new Error(`${label}不能为空`);
  }

  return text;
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

function requirePositiveInteger(value: unknown, label: string) {
  const numberValue = requireInteger(value, label);

  if (numberValue < 1) {
    throw new RangeError(`${label}必须大于 0`);
  }

  return numberValue;
}

function requirePositiveIntegerArray(value: unknown, label: string) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new TypeError(`${label}不能为空`);
  }

  const dedupedValues = [
    ...new Set(value.map((item) => requireInteger(item, label))),
  ];

  if (dedupedValues.some((item) => item < 1)) {
    throw new RangeError(`${label}必须是正整数`);
  }

  return dedupedValues;
}

function requireCouponType(value: unknown) {
  const couponType = requireInteger(value, '券类型');

  if (!couponTypeValues.includes(couponType as CouponTypeValue)) {
    throw new RangeError('券类型不支持');
  }

  return couponType as CouponTypeValue;
}

function requireDiscountMode(value: unknown) {
  if (value === 'amount' || value === 'percent') {
    return value satisfies CouponDiscountMode;
  }

  throw new Error('折扣方式不能为空');
}

function requireDiscountPercent(value: unknown) {
  const percent = normalizeOptionalNumber(value);

  if (percent === undefined) {
    throw new TypeError('折扣比例不能为空');
  }

  if (percent < 0 || percent >= 100) {
    throw new RangeError('折扣比例必须小于 100');
  }

  return percent;
}

export function createCouponGrantOperationId() {
  const randomUUID = globalThis.crypto?.randomUUID;

  if (typeof randomUUID === 'function') {
    return randomUUID.call(globalThis.crypto);
  }

  return `coupon-grant-${Date.now()}-${Math.random().toString(36).slice(2)}`;
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

function formatPlainNumber(value: number) {
  return Number.isInteger(value)
    ? String(value)
    : value.toFixed(2).replace(/\.?0+$/, '');
}

function formatDiscountRate(value: unknown) {
  const rateBps = normalizeOptionalNumber(value);

  if (rateBps === undefined || rateBps >= 10_000) {
    return undefined;
  }

  if (rateBps <= 0) {
    return '免费';
  }

  return `${formatPlainNumber(rateBps / 1000)} 折`;
}

function formatAmount(value: unknown) {
  const amount = normalizeOptionalNumber(value);
  return amount === undefined ? '-' : formatPlainNumber(amount);
}

function formatValidity(value: unknown) {
  const days = normalizeOptionalNumber(value);

  if (days === undefined) {
    return '-';
  }

  return days === 0 ? '历史实例控制' : `${days} 天`;
}

function getDiscountMode(record: Pick<CouponRow, 'discountAmount'>) {
  return (record.discountAmount ?? 0) > 0 ? 'amount' : 'percent';
}

export function formatCouponAbility(
  record: Pick<
    CouponRow,
    | 'benefitCount'
    | 'benefitDays'
    | 'couponType'
    | 'discountAmount'
    | 'discountRateBps'
    | 'usageLimit'
  >,
) {
  if (record.couponType === 1) {
    return `可阅读 ${record.usageLimit ?? 1} 章`;
  }

  if (record.couponType === 2) {
    const discountTexts = [
      formatDiscountRate(record.discountRateBps),
      (record.discountAmount ?? 0) > 0
        ? `立减 ${formatAmount(record.discountAmount)}`
        : undefined,
    ].filter(Boolean);

    return discountTexts.length > 0 ? discountTexts.join(' + ') : '折扣未配置';
  }

  if (record.couponType === 3) {
    return `VIP 试用 ${record.benefitDays ?? 1} 天`;
  }

  if (record.couponType === 4) {
    return `补签 ${record.benefitCount ?? 1} 次`;
  }

  return '-';
}

export function mapCouponToFormRecord(values: CouponRow) {
  return {
    ...values,
    discountMode: getDiscountMode(values),
    discountPercent:
      (values.discountRateBps ?? 10_000) < 10_000
        ? (values.discountRateBps ?? 10_000) / 100
        : 90,
  };
}

function buildCouponBase(values: CouponFormValues) {
  const couponType = requireCouponType(values.couponType);
  const validDays = requirePositiveInteger(
    values.validDays ?? 7,
    '领取后有效天数',
  );
  const base = {
    couponType,
    isEnabled: normalizeBoolean(values.isEnabled),
    name: requireText(values.name, '券名称'),
    validDays,
  };

  if (couponType === 1) {
    return {
      ...base,
      usageLimit: requirePositiveInteger(values.usageLimit, '可阅读章节数'),
    } satisfies CouponDefinitionCreateRequest;
  }

  if (couponType === 2) {
    const discountMode = requireDiscountMode(values.discountMode);

    if (discountMode === 'amount') {
      return {
        ...base,
        discountAmount: requirePositiveInteger(
          values.discountAmount,
          '立减金额',
        ),
        discountRateBps: 10_000,
      } satisfies CouponDefinitionCreateRequest;
    }

    return {
      ...base,
      discountAmount: 0,
      discountRateBps: Math.round(
        requireDiscountPercent(values.discountPercent) * 100,
      ),
    } satisfies CouponDefinitionCreateRequest;
  }

  if (couponType === 3) {
    return {
      ...base,
      benefitDays: requirePositiveInteger(values.benefitDays, 'VIP 试用天数'),
    } satisfies CouponDefinitionCreateRequest;
  }

  return {
    ...base,
    benefitCount: requirePositiveInteger(values.benefitCount, '补签次数'),
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

export function buildCouponGrantPayload(
  values: CouponGrantFormValues,
  couponDefinitionId: unknown,
  operationId: unknown,
) {
  return {
    couponDefinitionId: requireInteger(couponDefinitionId, '券定义 ID'),
    operationId: requireText(operationId, '发券操作 ID'),
    quantity: requirePositiveInteger(values.quantity ?? 1, '发放数量'),
    remark: normalizeText(values.remark),
    userIds: requirePositiveIntegerArray(values.userIds, 'APP 用户'),
  } satisfies CouponGrantPayload;
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
    component: 'RadioGroup',
    componentProps: {
      class: 'w-full',
      options: couponTypeOptions,
    },
    defaultValue: 1,
    fieldName: 'couponType',
    label: '券类型',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '请输入可阅读章节数',
    },
    defaultValue: 1,
    dependencies: {
      show: ({ couponType }) => Number(couponType) === 1,
      triggerFields: ['couponType'],
    },
    fieldName: 'usageLimit',
    label: '可阅读章节数',
    rules: 'required',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      class: 'w-full',
      options: couponDiscountModeOptions,
    },
    defaultValue: 'amount',
    dependencies: {
      show: ({ couponType }) => Number(couponType) === 2,
      triggerFields: ['couponType'],
    },
    fieldName: 'discountMode',
    label: '折扣方式',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '请输入立减金额',
    },
    dependencies: {
      show: ({ couponType, discountMode }) =>
        Number(couponType) === 2 && discountMode === 'amount',
      triggerFields: ['couponType', 'discountMode'],
    },
    fieldName: 'discountAmount',
    label: '立减金额',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      max: 99.99,
      min: 0,
      placeholder: '请输入折后售价比例',
      precision: 2,
      step: 5,
    },
    defaultValue: 90,
    dependencies: {
      show: ({ couponType, discountMode }) =>
        Number(couponType) === 2 && discountMode === 'percent',
      triggerFields: ['couponType', 'discountMode'],
    },
    fieldName: 'discountPercent',
    label: '折后售价比例（%）',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '请输入 VIP 试用天数',
    },
    defaultValue: 7,
    dependencies: {
      show: ({ couponType }) => Number(couponType) === 3,
      triggerFields: ['couponType'],
    },
    fieldName: 'benefitDays',
    label: 'VIP 试用天数',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '请输入补签次数',
    },
    defaultValue: 1,
    dependencies: {
      show: ({ couponType }) => Number(couponType) === 4,
      triggerFields: ['couponType'],
    },
    fieldName: 'benefitCount',
    label: '补签次数',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '请输入领取后有效天数',
    },
    defaultValue: 7,
    fieldName: 'validDays',
    label: '领取后有效天数',
    rules: 'required',
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

export const couponSearchSchema = formSchemaTransform.toSearchSchema(
  couponFormSchema,
  {
    couponType: { show: true },
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
    abilitySummary: {
      field: 'abilitySummary',
      formatter: ({ row }) => formatCouponAbility(row),
      minWidth: 180,
      sort: 3,
      title: '券能力',
    },
    benefitCount: { hide: true },
    benefitDays: { hide: true },
    discountAmount: { hide: true },
    discountMode: { hide: true },
    discountPercent: { hide: true },
    isEnabled: {
      minWidth: 110,
      slots: { default: 'isEnabled' },
    },
    name: { fixed: 'left', minWidth: 180, slots: { default: 'detail' } },
    usageLimit: { hide: true },
    validDays: {
      formatter: ({ cellValue }) => formatValidity(cellValue),
      minWidth: 150,
      title: '有效期',
    },
  },
);

export const couponGrantFormSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      disabled: true,
    },
    fieldName: 'couponName',
    label: '券名称',
  },
  {
    component: 'Input',
    componentProps: {
      disabled: true,
    },
    fieldName: 'couponAbility',
    label: '券能力',
  },
  {
    component: 'TableSelect',
    componentProps: () =>
      createAppUserTableSelectProps({
        enabledOnly: true,
        multiple: true,
        placeholder: '请选择发券用户',
        title: '选择发券用户',
      }),
    fieldName: 'userIds',
    formItemClass: 'col-span-2',
    label: '发券用户',
    rules: 'arrayRequired',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '请输入发放数量',
    },
    defaultValue: 1,
    fieldName: 'quantity',
    label: '发放数量',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      disabled: true,
    },
    dependencies: {
      triggerFields: ['quantity', 'userIds'],
      trigger(values, _actions, controller) {
        const userCount = Array.isArray(values.userIds)
          ? new Set(values.userIds).size
          : 0;
        const quantity = normalizeOptionalNumber(values.quantity) ?? 1;
        void controller.setFieldValue(
          'grantSummary',
          userCount > 0
            ? `${userCount} 个用户，每人 ${quantity} 张，合计 ${userCount * quantity} 张`
            : '请选择发券用户',
        );
      },
    },
    fieldName: 'grantSummary',
    label: '发放摘要',
  },
  {
    component: 'Input',
    componentProps: {
      maxlength: 500,
      placeholder: '请输入后台备注，便于后续审计和排障',
      rows: 3,
      showWordLimit: true,
      type: 'textarea',
    },
    fieldName: 'remark',
    formItemClass: 'col-span-2',
    label: '备注',
  },
];

function getCouponAbilityFields(record: CouponRow): DetailField[] {
  if (record.couponType === 1) {
    return [
      {
        label: '可阅读章节数',
        type: 'text',
        value: `${record.usageLimit ?? 1} 章`,
      },
    ];
  }

  if (record.couponType === 2) {
    return [
      ...((record.discountRateBps ?? 10_000) < 10_000
        ? [
            {
              label: '折扣比例',
              type: 'text',
              value: formatDiscountRate(record.discountRateBps),
            } satisfies DetailField,
          ]
        : []),
      ...((record.discountAmount ?? 0) > 0
        ? [
            {
              label: '立减金额',
              type: 'text',
              value: formatAmount(record.discountAmount),
            } satisfies DetailField,
          ]
        : []),
    ];
  }

  if (record.couponType === 3) {
    return [
      {
        label: 'VIP 试用天数',
        type: 'text',
        value: `${record.benefitDays ?? 1} 天`,
      },
    ];
  }

  return [
    {
      label: '补签次数',
      type: 'text',
      value: `${record.benefitCount ?? 1} 次`,
    },
  ];
}

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
          label: '券能力',
          type: 'text',
          value: formatCouponAbility(record),
        },
        ...getCouponAbilityFields(record),
        {
          label: '有效期',
          type: 'text',
          value: formatValidity(record.validDays),
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
      title: '券定义',
    },
  ] satisfies DetailCard[];
}
