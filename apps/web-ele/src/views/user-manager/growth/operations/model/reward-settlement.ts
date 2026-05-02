import type {
  GrowthRewardSettlementPageItemDto,
  GrowthRewardSettlementPageRequest,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

import { growthTypeOptions } from '../../model/constants';
import {
  formatIdList,
  getGrowthTypeLabel,
  getOptionLabel,
  settlementResultOptions,
  settlementStatusOptions,
  settlementTypeOptions,
  stripEmptyValues,
} from './shared';

type RewardSettlementSearchValues = GrowthRewardSettlementPageRequest & {
  dateRange?: string[];
};

export const rewardSettlementSearchFormSchema: EsFormSchema = [
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '用户 ID',
    },
    fieldName: 'userId',
    label: '用户 ID',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      filterable: true,
      options: growthTypeOptions,
      placeholder: '事件编码',
    },
    fieldName: 'eventCode',
    label: '事件编码',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: settlementTypeOptions,
      placeholder: '结算类型',
    },
    fieldName: 'settlementType',
    label: '结算类型',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: settlementStatusOptions,
      placeholder: '结算状态',
    },
    fieldName: 'settlementStatus',
    label: '结算状态',
  },
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
];

const rewardSettlementTableSchema: EsFormSchema = [
  { component: 'InputNumber', fieldName: 'id', label: '结算 ID' },
  { component: 'InputNumber', fieldName: 'userId', label: '用户 ID' },
  { component: 'Input', fieldName: 'eventKey', label: '事件 key' },
  { component: 'Select', fieldName: 'eventCode', label: '事件编码' },
  { component: 'Input', fieldName: 'source', label: '来源' },
  { component: 'Select', fieldName: 'settlementType', label: '结算类型' },
  { component: 'Select', fieldName: 'settlementStatus', label: '结算状态' },
  {
    component: 'Select',
    fieldName: 'settlementResultType',
    label: '结算结果',
  },
  { component: 'InputNumber', fieldName: 'retryCount', label: '重试次数' },
  { component: 'Input', fieldName: 'lastError', label: '最后错误' },
];

export const rewardSettlementColumns =
  formSchemaTransform.toTableColumns<GrowthRewardSettlementPageItemDto>(
    rewardSettlementTableSchema,
    {
      id: {
        fixed: 'left',
        minWidth: 100,
      },
      userId: {
        minWidth: 110,
      },
      eventKey: {
        minWidth: 180,
        showOverflow: 'tooltip',
      },
      eventCode: {
        formatter: ({ cellValue }) => getGrowthTypeLabel(cellValue),
        minWidth: 150,
        showOverflow: 'tooltip',
      },
      source: {
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
      retryCount: {
        minWidth: 100,
      },
      lastError: {
        formatter: ({ cellValue }) => cellValue || '-',
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
        width: 150,
      },
    },
  );

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

export const rewardSettlementSearchSchema = formSchemaTransform.toSearchSchema(
  rewardSettlementSearchFormSchema,
  {
    userId: { show: true },
    eventCode: { show: true },
    settlementType: { show: true },
    settlementStatus: { show: true },
    dateRange: { show: true },
  },
);

export { settlementResultOptions, settlementStatusOptions };
