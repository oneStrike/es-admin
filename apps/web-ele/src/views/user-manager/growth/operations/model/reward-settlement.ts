import type { GrowthEventOption } from './shared';

import type {
  GrowthRewardSettlementPageItemDto,
  GrowthRewardSettlementPageRequest,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';
import { createAppUserTableSelectProps } from '#/views/user-manager/shared/app-user-select';

import {
  formatGrowthEventLabel,
  formatIdList,
  getOptionLabel,
  settlementResultOptions,
  settlementStatusOptions,
  settlementTypeOptions,
  stripEmptyValues,
} from './shared';

type RewardSettlementSearchValues = GrowthRewardSettlementPageRequest & {
  dateRange?: string[];
};

type RewardSettlementSchemaField = EsFormSchema[number];

const rewardSettlementFieldCatalog = {
  eventCode: {
    component: 'Select',
    fieldName: 'eventCode',
    label: '事件编码',
  },
  settlementStatus: {
    component: 'Select',
    fieldName: 'settlementStatus',
    label: '结算状态',
  },
  settlementType: {
    component: 'Select',
    fieldName: 'settlementType',
    label: '结算类型',
  },
  userId: {
    component: 'TableSelect',
    componentProps: createAppUserTableSelectProps({
      emitScalar: true,
      multiple: false,
      placeholder: '搜索并选择 APP 用户',
      title: '选择结算用户',
    }),
    fieldName: 'userId',
    label: '用户',
  },
} satisfies Record<string, RewardSettlementSchemaField>;

function createRewardSettlementField(
  field: keyof typeof rewardSettlementFieldCatalog,
  overrides: Partial<RewardSettlementSchemaField> = {},
): RewardSettlementSchemaField {
  const base = rewardSettlementFieldCatalog[
    field
  ] as RewardSettlementSchemaField;
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

function createRewardSettlementListSchema(
  eventOptions: GrowthEventOption[] = [],
): EsFormSchema {
  return [
    createRewardSettlementField('userId', {
      componentProps: createAppUserTableSelectProps({
        emitScalar: true,
        multiple: false,
        placeholder: '搜索并选择 APP 用户',
        title: '选择结算用户',
      }),
    }),
    createRewardSettlementField('eventCode', {
      componentProps: {
        clearable: true,
        filterable: true,
        options: eventOptions,
        placeholder: '成长事件',
      },
    }),
    createRewardSettlementField('settlementType', {
      componentProps: {
        clearable: true,
        options: settlementTypeOptions,
        placeholder: '结算类型',
      },
    }),
    createRewardSettlementField('settlementStatus', {
      componentProps: {
        clearable: true,
        options: settlementStatusOptions,
        placeholder: '结算状态',
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
    { component: 'InputNumber', fieldName: 'id', label: '结算 ID' },
    { component: 'Input', fieldName: 'eventKey', label: '事件 key' },
    { component: 'Input', fieldName: 'source', label: '来源' },
    {
      component: 'Select',
      fieldName: 'settlementResultType',
      label: '结算结果',
    },
    { component: 'InputNumber', fieldName: 'retryCount', label: '重试次数' },
    { component: 'Input', fieldName: 'lastError', label: '最后错误' },
  ];
}

export function createRewardSettlementColumns(
  eventOptions: GrowthEventOption[] = [],
) {
  return (
  formSchemaTransform.toTableColumns<GrowthRewardSettlementPageItemDto>(
    createRewardSettlementListSchema(eventOptions),
    {
      dateRange: { hide: true },
      id: {
        fixed: 'left',
      },
      userId: {
        minWidth: 110,
      },
      eventKey: {
        hide: true,
        minWidth: 180,
        showOverflow: 'tooltip',
      },
      eventCode: {
        formatter: ({ cellValue }) =>
          formatGrowthEventLabel(cellValue, eventOptions),
        minWidth: 150,
        showOverflow: 'tooltip',
      },
      source: {
        hide: true,
        minWidth: 150,
        showOverflow: 'tooltip',
      },
      settlementType: {
        formatter: ({ cellValue }) =>
          getOptionLabel(settlementTypeOptions, cellValue),
        minWidth: 140,
      },
      settlementStatus: {
        minWidth: 130,
        slots: { default: 'settlementStatus' },
      },
      settlementResultType: {
        minWidth: 130,
        slots: { default: 'settlementResultType' },
      },
      lastError: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 220,
        showOverflow: 'tooltip',
      },
      createdAt: {
        show: true,
        width: 170,
      },
      updatedAt: {
        show: true,
        width: 170,
      },
      actions: {
        show: true,
      },
    },
  )
  );
}

export function buildRewardSettlementQuery(
  formValues?: RewardSettlementSearchValues,
) {
  const { dateRange, ...restFormValues } = formValues || {};
  const [startDate, endDate] = Array.isArray(dateRange) ? dateRange : [];

  return stripEmptyValues({
    ...restFormValues,
    endDate,
    startDate,
  }) as GrowthRewardSettlementPageRequest;
}

export function formatSettlementLedgerIds(
  row: GrowthRewardSettlementPageItemDto,
) {
  return formatIdList(row.ledgerRecordIds);
}

export function createRewardSettlementSearchSchema(
  eventOptions: GrowthEventOption[] = [],
) {
  return formSchemaTransform.toSearchSchema(
    createRewardSettlementListSchema(eventOptions),
    {
    userId: {
      show: true,
      component: 'TableSelect',
      componentProps: createAppUserTableSelectProps({
        emitScalar: true,
        multiple: false,
        placeholder: '搜索并选择 APP 用户',
        title: '选择结算用户',
      }),
    },
    eventCode: { show: true },
    settlementType: { show: true },
    settlementStatus: { show: true },
    dateRange: { show: true },
    id: {
      show: false,
      componentProps: {
        class: '!w-full',
        min: 1,
        placeholder: '高级诊断：结算 ID',
      },
    },
    eventKey: {
      show: false,
      componentProps: {
        clearable: true,
        placeholder: '高级诊断：事件 key',
      },
    },
    },
  );
}

export const rewardSettlementColumns = createRewardSettlementColumns();

export const rewardSettlementSearchSchema =
  createRewardSettlementSearchSchema();

export { settlementResultOptions, settlementStatusOptions };
