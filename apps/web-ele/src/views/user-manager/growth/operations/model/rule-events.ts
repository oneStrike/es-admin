import type {
  GrowthRuleAssetSummaryDto,
  GrowthRuleEventPageItemDto,
  GrowthRuleEventsPageRequest,
  GrowthRuleTaskBindingSummaryDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

import { growthTypeOptions } from '../../model/constants';
import {
  assetTypeMap,
  booleanOptions,
  formatBoolean,
  getGrowthTypeLabel,
  getOptionLabel,
  governanceGateOptions,
  implStatusOptions,
  ruleDomainOptions,
  stripEmptyValues,
} from './shared';

type RuleEventsSearchValues = GrowthRuleEventsPageRequest & {
  dateRange?: string[];
};

type RuleEventsSchemaField = EsFormSchema[number];

const ruleEventsFieldCatalog = {
  isImplemented: {
    component: 'Select',
    fieldName: 'isImplemented',
    label: '是否已实现',
  },
} satisfies Record<string, RuleEventsSchemaField>;

function createRuleEventsField(
  field: keyof typeof ruleEventsFieldCatalog,
  overrides: Partial<RuleEventsSchemaField> = {},
): RuleEventsSchemaField {
  const base = ruleEventsFieldCatalog[field] as RuleEventsSchemaField;
  const componentProps = overrides.componentProps ?? base.componentProps;

  return {
    ...base,
    ...overrides,
    componentProps:
      componentProps &&
      typeof componentProps === 'object' &&
      !Array.isArray(componentProps)
        ? { ...componentProps }
        : componentProps,
  };
}

const ruleEventsListSchema: EsFormSchema = [
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      filterable: true,
      options: growthTypeOptions,
      placeholder: '成长类型',
    },
    fieldName: 'type',
    label: '成长类型',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: booleanOptions,
      placeholder: '是否有基础奖励',
    },
    fieldName: 'hasBaseReward',
    label: '是否有基础奖励',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: booleanOptions,
      placeholder: '是否有关联任务',
    },
    fieldName: 'hasTask',
    label: '是否有关联任务',
  },
  createRuleEventsField('isImplemented', {
    componentProps: {
      clearable: true,
      options: booleanOptions,
      placeholder: '是否已实现',
    },
  }),
  {
    component: 'DatePicker',
    componentProps: {
      clearable: true,
      endPlaceholder: '结束时间',
      startPlaceholder: '开始时间',
      type: 'datetimerange',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'dateRange',
    label: '时间范围',
  },
  { component: 'Select', fieldName: 'ruleType', label: '规则类型' },
  { component: 'Input', fieldName: 'eventName', label: '事件名称' },
  { component: 'Select', fieldName: 'domain', label: '事件域' },
  { component: 'Select', fieldName: 'implStatus', label: '实现状态' },
  { component: 'Select', fieldName: 'governanceGate', label: '治理门禁' },
  { component: 'Input', fieldName: 'rewardPolicy', label: '奖励策略' },
  { component: 'Input', fieldName: 'assetRules', label: '资产规则' },
  { component: 'Input', fieldName: 'taskBinding', label: '任务绑定' },
  {
    component: 'Select',
    fieldName: 'supportsTaskObjective',
    label: '支持任务目标',
  },
];

export const ruleEventsColumns =
  formSchemaTransform.toTableColumns<GrowthRuleEventPageItemDto>(
    ruleEventsListSchema,
    {
      type: { hide: true },
      hasBaseReward: { hide: true },
      hasTask: { hide: true },
      dateRange: { hide: true },
      ruleType: {
        fixed: 'left',
        formatter: ({ cellValue }) => getGrowthTypeLabel(cellValue),
        minWidth: 150,
        showOverflow: 'tooltip',
      },
      eventName: {
        fixed: 'left',
        minWidth: 160,
        showOverflow: 'tooltip',
      },
      domain: {
        formatter: ({ cellValue }) =>
          getOptionLabel(ruleDomainOptions, cellValue),
        minWidth: 120,
      },
      implStatus: {
        minWidth: 120,
        slots: { default: 'implStatus' },
      },
      isImplemented: {
        formatter: ({ cellValue }) => formatBoolean(cellValue),
        title: '接入状态',
        minWidth: 110,
      },
      governanceGate: {
        formatter: ({ cellValue }) =>
          getOptionLabel(governanceGateOptions, cellValue),
        minWidth: 130,
      },
      rewardPolicy: {
        minWidth: 240,
        showOverflow: 'tooltip',
      },
      assetRules: {
        formatter: ({ cellValue }) => formatAssetRules(cellValue),
        minWidth: 260,
        showOverflow: 'tooltip',
      },
      taskBinding: {
        formatter: ({ cellValue }) => formatTaskBinding(cellValue),
        minWidth: 240,
        showOverflow: 'tooltip',
      },
      supportsTaskObjective: {
        formatter: ({ cellValue }) => formatBoolean(cellValue),
        minWidth: 130,
      },
      actions: {
        show: true,
        width: 100,
      },
    },
  );

export const ruleEventsSearchSchema = formSchemaTransform.toSearchSchema(
  ruleEventsListSchema,
  {
    type: { show: true },
    hasBaseReward: { show: true },
    hasTask: { show: true },
    isImplemented: { show: true },
    dateRange: { show: true },
  },
);

export function buildRuleEventsQuery(formValues?: RuleEventsSearchValues) {
  const { dateRange, ...restFormValues } = formValues || {};
  const [startDate, endDate] = Array.isArray(dateRange) ? dateRange : [];

  return stripEmptyValues({
    ...restFormValues,
    endDate,
    startDate,
  }) as GrowthRuleEventsPageRequest;
}

export function formatAssetRules(
  assetRules?: GrowthRuleAssetSummaryDto[] | null,
) {
  const enabledRules = (assetRules || []).filter((item) => item.exists);
  if (enabledRules.length === 0) return '未配置';

  return enabledRules
    .map((item) => {
      const assetLabel =
        assetTypeMap[item.assetType] || `资产 ${item.assetType}`;
      const amount = item.amount ?? '-';
      const status = item.isEnabled === false ? '禁用' : '启用';
      const dailyLimit =
        item.dailyLimit === 0 ? '每日无限' : `每日 ${item.dailyLimit ?? '-'}`;
      const totalLimit =
        item.totalLimit === 0 ? '总量无限' : `总量 ${item.totalLimit ?? '-'}`;

      return `${assetLabel} ${amount} / ${status} / ${dailyLimit} / ${totalLimit}`;
    })
    .join('\n');
}

export function formatTaskBinding(
  taskBinding?: GrowthRuleTaskBindingSummaryDto | null,
) {
  if (!taskBinding?.exists) return '未关联任务';

  const parts = [
    `关联 ${taskBinding.relatedTaskCount}`,
    `已发布 ${taskBinding.publishedTaskCount}`,
    `启用 ${taskBinding.enabledTaskCount}`,
  ];

  if (taskBinding.taskIds?.length) {
    parts.push(`任务 ID：${taskBinding.taskIds.join(', ')}`);
  }

  return parts.join(' / ');
}

export { governanceGateOptions, implStatusOptions, ruleDomainOptions };
