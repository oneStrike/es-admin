import type { GrowthEventOption } from './shared';

import type {
  GrowthRuleAssetSummaryDto,
  GrowthRuleEventPageItemDto,
  GrowthRuleEventsPageRequest,
  GrowthRuleTaskBindingSummaryDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

import {
  assetTypeMap,
  booleanOptions,
  formatBoolean,
  formatGrowthEventLabel,
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

function createRuleEventsListSchema(
  eventOptions: GrowthEventOption[] = [],
): EsFormSchema {
  return [
    {
      component: 'Select',
      componentProps: {
        clearable: true,
        filterable: true,
        options: eventOptions,
        placeholder: '成长事件',
      },
      fieldName: 'type',
      label: '成长事件',
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
}

export function createRuleEventsColumns(
  eventOptions: GrowthEventOption[] = [],
) {
  return (
  formSchemaTransform.toTableColumns<GrowthRuleEventPageItemDto>(
    createRuleEventsListSchema(eventOptions),
    {
      type: { hide: true },
      hasBaseReward: { hide: true },
      hasTask: { hide: true },
      dateRange: { hide: true },
      ruleType: {
        fixed: 'left',
        formatter: ({ cellValue }) =>
          formatGrowthEventLabel(cellValue, eventOptions),
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
  )
  );
}

export function createRuleEventsSearchSchema(
  eventOptions: GrowthEventOption[] = [],
) {
  return formSchemaTransform.toSearchSchema(
    createRuleEventsListSchema(eventOptions),
    {
    type: { show: true },
    hasBaseReward: { show: true },
    hasTask: { show: true },
    isImplemented: { show: true },
    dateRange: { show: true },
    },
  );
}

export const ruleEventsColumns = createRuleEventsColumns();
export const ruleEventsSearchSchema = createRuleEventsSearchSchema();

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
  options: { includeTaskIds?: boolean } = {},
) {
  if (!taskBinding?.exists) return '未关联任务';

  const parts = [
    `关联 ${taskBinding.relatedTaskCount}`,
    `已发布 ${taskBinding.publishedTaskCount}`,
    `启用 ${taskBinding.enabledTaskCount}`,
  ];

  if (options.includeTaskIds && taskBinding.taskIds?.length) {
    parts.push(`任务 ID：${taskBinding.taskIds.join(', ')}`);
  }

  return parts.join(' / ');
}

export { governanceGateOptions, implStatusOptions, ruleDomainOptions };
