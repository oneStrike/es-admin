import type {
  MembershipPageConfigCreateRequest,
  MembershipPageConfigPageResponse,
  MembershipPageConfigUpdateRequest,
} from '#/api/types';
import type { DetailCard } from '#/components/es-record-detail';
import type { EsFormSchema } from '#/types';

import { agreementPageApi, membershipPlanPageApi } from '#/api/core';
import { formSchemaTransform } from '#/utils';
import { getOptionLabel } from '#/utils/options';

import { enabledStatusOptions, vipTierOptions } from './options';

export type VipPageConfigRow = NonNullable<
  MembershipPageConfigPageResponse['list']
>[number] & {
  statusLoading?: boolean;
};

export type VipPageConfigFormValues = {
  agreementIds?: unknown;
  checkoutAgreementText?: unknown;
  id?: unknown;
  isEnabled?: unknown;
  memberNoticeItemsText?: unknown;
  planIds?: unknown;
  sortOrder?: unknown;
  submitButtonTemplate?: unknown;
  title?: unknown;
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

function agreementSelectComponentProps() {
  return {
    api: async () =>
      agreementPageApi({
        isPublished: true,
        pageIndex: 1,
        pageSize: 200,
      }),
    class: 'w-full',
    clearable: true,
    collapseTags: true,
    filterable: true,
    labelFn: (item: Record<string, unknown>) =>
      item.version ? `${item.title} (${item.version})` : item.title,
    multiple: true,
    placeholder: '请选择协议',
    resultField: 'list',
    valueField: 'id',
  };
}

function planSelectComponentProps() {
  return {
    api: async () =>
      membershipPlanPageApi({
        isEnabled: true,
        pageIndex: 1,
        pageSize: 200,
      }),
    class: 'w-full',
    clearable: true,
    collapseTags: true,
    filterable: true,
    labelFn: (item: Record<string, unknown>) => {
      const name = normalizeText(item.name) ?? `#${item.id ?? ''}`;
      const tierText = getOptionLabel(vipTierOptions, Number(item.tier));
      const planKey = normalizeText(item.planKey);

      return [
        name,
        tierText ? `/${tierText}` : '',
        planKey ? ` (${planKey})` : '',
      ].join('');
    },
    multiple: true,
    placeholder: '请选择套餐',
    resultField: 'list',
    valueField: 'id',
  };
}

function normalizeAgreementIds(value: unknown): number[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => {
    if (typeof item === 'number') {
      return requireInteger(item, '关联协议 ID');
    }

    if (item && typeof item === 'object') {
      return requireInteger(
        (item as Record<string, unknown>).id,
        '关联协议 ID',
      );
    }

    return requireInteger(item, '关联协议 ID');
  });
}

function normalizePlanIds(value: unknown): number[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => {
    if (typeof item === 'number') {
      return requireInteger(item, '绑定套餐 ID');
    }

    if (item && typeof item === 'object') {
      return requireInteger(
        (item as Record<string, unknown>).id,
        '绑定套餐 ID',
      );
    }

    return requireInteger(item, '绑定套餐 ID');
  });
}

function formatAgreementSummary(value: unknown) {
  if (!Array.isArray(value) || value.length === 0) {
    return '-';
  }

  const summary = value
    .map((item) => {
      if (!item || typeof item !== 'object') {
        return '';
      }

      const record = item as Record<string, unknown>;
      const title = normalizeText(record.title) ?? `#${record.id ?? ''}`;
      const version = normalizeText(record.version);

      return version ? `${title} (${version})` : title;
    })
    .filter(Boolean)
    .join('、');

  return summary || '-';
}

function formatPlanSummary(value: unknown) {
  if (!Array.isArray(value) || value.length === 0) {
    return '-';
  }

  const summary = value
    .map((item) => {
      if (!item || typeof item !== 'object') {
        return '';
      }

      const record = item as Record<string, unknown>;
      const name = normalizeText(record.name) ?? `#${record.id ?? ''}`;
      const tierText = getOptionLabel(vipTierOptions, Number(record.tier));

      return tierText ? `${name}（${tierText}）` : name;
    })
    .filter(Boolean)
    .join('、');

  return summary || '-';
}

export function mapVipPageConfigToFormRecord(values: VipPageConfigRow) {
  return {
    ...values,
    agreementIds: normalizeAgreementIds(values.agreements),
    memberNoticeItemsText: formatStringArrayTextarea(values.memberNoticeItems),
    planIds: normalizePlanIds(values.plans),
  };
}

function buildVipPageConfigBase(values: VipPageConfigFormValues) {
  return {
    agreementIds: normalizeAgreementIds(values.agreementIds),
    checkoutAgreementText: normalizeNullableText(values.checkoutAgreementText),
    isEnabled: normalizeBoolean(values.isEnabled),
    memberNoticeItems: normalizeStringArray(values.memberNoticeItemsText),
    planIds: normalizePlanIds(values.planIds),
    sortOrder: normalizeNullableNumber(values.sortOrder),
    submitButtonTemplate: normalizeNullableText(values.submitButtonTemplate),
    title: requireText(values.title, '页面标题'),
  } satisfies MembershipPageConfigCreateRequest;
}

export function buildVipPageConfigCreatePayload(
  values: VipPageConfigFormValues,
) {
  return buildVipPageConfigBase(values);
}

export function buildVipPageConfigUpdatePayload(
  values: VipPageConfigFormValues,
) {
  return {
    id: requireInteger(values.id, 'ID'),
    ...buildVipPageConfigBase(values),
  } satisfies MembershipPageConfigUpdateRequest;
}

export const vipPageConfigFormSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '请输入页面标题',
    },
    fieldName: 'title',
    label: '页面标题',
    rules: 'required',
  },
  {
    component: 'ApiSelect',
    componentProps: agreementSelectComponentProps,
    fieldName: 'agreementIds',
    label: '关联协议',
    rules: 'arrayRequired',
  },
  {
    component: 'ApiSelect',
    componentProps: planSelectComponentProps,
    fieldName: 'planIds',
    label: '绑定套餐',
    rules: 'arrayRequired',
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
      placeholder: '每行一条会员说明',
      rows: 4,
      type: 'textarea',
    },
    fieldName: 'memberNoticeItemsText',
    formItemClass: 'col-span-2',
    label: '会员说明条目',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入确认开通协议提示文案',
      rows: 4,
      type: 'textarea',
    },
    fieldName: 'checkoutAgreementText',
    formItemClass: 'col-span-2',
    label: '开通协议提示文案',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入支付按钮文案模板',
      rows: 4,
      type: 'textarea',
    },
    fieldName: 'submitButtonTemplate',
    formItemClass: 'col-span-2',
    label: '支付按钮文案模板',
  },
];

export const vipPageConfigSearchSchema = formSchemaTransform.toSearchSchema(
  vipPageConfigFormSchema,
  {
    title: { show: true },
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

export const vipPageConfigColumns =
  formSchemaTransform.toTableColumns<VipPageConfigRow>(
    vipPageConfigFormSchema,
    {
      actions: {
        minWidth: 180,
        show: true,
      },
      agreementSummary: {
        formatter: ({ row }: { row: VipPageConfigRow }) =>
          formatAgreementSummary(row.agreements),
        minWidth: 260,
        sort: 1.5,
        title: '关联协议',
      },
      agreementIds: { hide: true },
      checkoutAgreementText: { hide: true },
      isEnabled: {
        minWidth: 110,
        slots: { default: 'isEnabled' },
      },
      memberNoticeItemsText: { hide: true },
      pageKey: { minWidth: 160, sort: 0.5, title: '页面业务键' },
      planIds: { hide: true },
      planSummary: {
        formatter: ({ row }: { row: VipPageConfigRow }) =>
          formatPlanSummary(row.plans),
        minWidth: 260,
        sort: 1.6,
        title: '绑定套餐',
      },
      submitButtonTemplate: { hide: true },
      title: { fixed: 'left', minWidth: 180, slots: { default: 'detail' } },
    },
  );

export function getVipPageConfigDetailCards(record: VipPageConfigRow) {
  return [
    {
      fields: [
        { label: 'ID', type: 'text', value: record.id },
        { label: '页面标题', type: 'text', value: record.title },
        { label: '页面业务键', type: 'text', value: record.pageKey },
        {
          label: '关联协议',
          type: 'text',
          value: formatAgreementSummary(record.agreements),
        },
        {
          label: '绑定套餐',
          type: 'text',
          value: formatPlanSummary(record.plans),
        },
        {
          label: '支付按钮模板',
          type: 'text',
          value: record.submitButtonTemplate ?? '-',
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
      title: '会员页配置',
    },
    {
      content: `<pre class="whitespace-pre-wrap text-xs">${escapeHtml(
        (record.memberNoticeItems || []).join('\n'),
      )}</pre>`,
      show: Array.isArray(record.memberNoticeItems),
      title: '会员说明条目',
      type: 'text',
    },
  ] satisfies DetailCard[];
}
