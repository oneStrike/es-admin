import type { CheckInReconciliationPageItemDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

import {
  checkInRecordTypeOptions,
  checkInRewardResultOptions,
  checkInRewardStatusOptions,
} from './shared';

type CheckInReconciliationSchemaField = EsFormSchema[number];

const checkInReconciliationFieldCatalog = {
  recordId: {
    component: 'InputNumber',
    fieldName: 'recordId',
    label: '签到记录ID',
  },
  recordSettlementStatus: {
    component: 'Select',
    fieldName: 'recordSettlementStatus',
    label: '基础奖励状态',
  },
  userId: {
    component: 'InputNumber',
    fieldName: 'userId',
    label: '用户ID',
  },
} satisfies Record<string, CheckInReconciliationSchemaField>;

function createCheckInReconciliationField(
  field: keyof typeof checkInReconciliationFieldCatalog,
  overrides: Partial<CheckInReconciliationSchemaField> = {},
): CheckInReconciliationSchemaField {
  const base = checkInReconciliationFieldCatalog[
    field
  ] as CheckInReconciliationSchemaField;
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

const reconciliationListSchema: EsFormSchema = [
  createCheckInReconciliationField('userId', {
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '用户ID',
    },
  }),
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
  createCheckInReconciliationField('recordId', {
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '签到记录ID',
    },
  }),
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
  createCheckInReconciliationField('recordSettlementStatus', {
    componentProps: {
      clearable: true,
      options: checkInRewardStatusOptions,
      placeholder: '基础奖励状态',
    },
  }),
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
  {
    component: 'Input',
    componentProps: {
      placeholder: '签到信息',
    },
    fieldName: 'signDate',
    label: '签到信息',
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
];

export const reconciliationSearchFormSchema =
  formSchemaTransform.toSearchSchema(reconciliationListSchema, {
    userId: { show: true },
    ruleId: { show: true },
    recordId: { show: true },
    grantId: { show: true },
    recordSettlementStatus: { show: true },
    grantSettlementStatus: { show: true },
  });

export const reconciliationColumns =
  formSchemaTransform.toTableColumns<CheckInReconciliationPageItemDto>(
    reconciliationListSchema,
    {
      grantId: { hide: true },
      grantSettlementStatus: { hide: true },
      ruleId: { hide: true },
      recordId: {
        fixed: 'left',
        minWidth: 110,
        sort: -0.5,
      },
      signDate: {
        fixed: 'left',
        minWidth: 180,
        showOverflow: false,
        sort: 0.5,
        slots: { default: 'signInfo' },
        title: '签到信息',
      },
      userId: {
        sort: 1,
      },
      resolvedRewardSourceType: {
        minWidth: 140,
        showOverflow: false,
        sort: 2,
        slots: { default: 'resolvedRewardSourceType' },
        title: '解析来源',
      },
      recordSettlementStatus: {
        minWidth: 160,
        showOverflow: false,
        sort: 3,
        slots: { default: 'baseRewardStatus' },
        title: '基础奖励',
      },
      resolvedRewardItems: {
        minWidth: 220,
        showOverflow: false,
        sort: 4,
        slots: { default: 'resolvedRewardConfig' },
        title: '奖励快照',
      },
      grants: {
        minWidth: 360,
        showOverflow: false,
        sort: 5,
        slots: { default: 'grants' },
        title: '连续奖励',
      },
      createdAt: {
        show: true,
        width: 160,
      },
      actions: {
        show: true,
        slots: { default: 'reconciliationActions' },
        width: 140,
      },
    },
  );

export {
  checkInRecordTypeOptions,
  checkInRewardResultOptions,
  checkInRewardStatusOptions,
};
