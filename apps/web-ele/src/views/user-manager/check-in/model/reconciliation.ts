import type { VxeGridPropTypes } from '#/adapter/vxe-table';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

import {
  checkInRecordTypeOptions,
  checkInRewardResultOptions,
  checkInRewardStatusOptions,
} from './shared';

const reconciliationSearchBaseSchema: EsFormSchema = [
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '用户ID',
    },
    fieldName: 'userId',
    label: '用户ID',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '规则ID',
    },
    fieldName: 'ruleId',
    label: '规则ID',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '签到记录ID',
    },
    fieldName: 'recordId',
    label: '签到记录ID',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '连续奖励ID',
    },
    fieldName: 'grantId',
    label: '连续奖励ID',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: checkInRewardStatusOptions,
      placeholder: '基础奖励状态',
    },
    fieldName: 'recordSettlementStatus',
    label: '基础奖励状态',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: checkInRewardStatusOptions,
      placeholder: '连续奖励状态',
    },
    fieldName: 'grantSettlementStatus',
    label: '连续奖励状态',
  },
];

const reconciliationTableSchema: EsFormSchema = [
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '签到记录ID',
    },
    fieldName: 'recordId',
    label: '签到记录ID',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '签到信息',
    },
    fieldName: 'signDate',
    label: '签到信息',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '用户ID',
    },
    fieldName: 'userId',
    label: '用户ID',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '解析来源',
    },
    fieldName: 'resolvedRewardSourceType',
    label: '解析来源',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '基础奖励',
    },
    fieldName: 'recordSettlementStatus',
    label: '基础奖励',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '奖励快照',
    },
    fieldName: 'resolvedRewardItems',
    label: '奖励快照',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '连续奖励',
    },
    fieldName: 'grants',
    label: '连续奖励',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '操作',
    },
    fieldName: 'actions',
    label: '操作',
  },
];

export const reconciliationSearchFormSchema =
  formSchemaTransform.toSearchSchema(reconciliationSearchBaseSchema, {
    userId: { show: true },
    ruleId: { show: true },
    recordId: { show: true },
    grantId: { show: true },
    recordSettlementStatus: { show: true },
    grantSettlementStatus: { show: true },
  });

export const reconciliationColumns: VxeGridPropTypes.Columns<any> =
  formSchemaTransform.toTableColumns<any>(reconciliationTableSchema, {
    recordId: {
      fixed: 'left',
      minWidth: 110,
    },
    signDate: {
      fixed: 'left',
      minWidth: 180,
      showOverflow: false,
      slots: { default: 'signInfo' },
      title: '签到信息',
    },
    userId: {
      minWidth: 100,
    },
    resolvedRewardSourceType: {
      minWidth: 140,
      showOverflow: false,
      slots: { default: 'resolvedRewardSourceType' },
      title: '解析来源',
    },
    recordSettlementStatus: {
      minWidth: 160,
      showOverflow: false,
      slots: { default: 'baseRewardStatus' },
      title: '基础奖励',
    },
    resolvedRewardItems: {
      minWidth: 220,
      showOverflow: false,
      slots: { default: 'resolvedRewardConfig' },
      title: '奖励快照',
    },
    grants: {
      minWidth: 360,
      showOverflow: false,
      slots: { default: 'grants' },
      title: '连续奖励',
    },
    createdAt: {
      show: true,
      width: 160,
    },
    actions: {
      slots: { default: 'reconciliationActions' },
      sort: 999_999,
      title: '操作',
      width: 140,
    },
  });

export {
  checkInRecordTypeOptions,
  checkInRewardResultOptions,
  checkInRewardStatusOptions,
};
