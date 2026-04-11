import type { VxeGridPropTypes } from '#/adapter/vxe-table';
import type {
  CheckInGrantItemDto,
  CheckInPatternRewardRuleItemDto,
  CheckInPlanDetailResponseDto,
  CheckInPlanPageItemDto,
  CheckInReconciliationItemDto,
  CheckInRewardConfigDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

import {
  formatRewardSummary,
  hasConfiguredReward,
  parseRewardConfig,
} from './plan-modal';

export { formatRewardSummary } from './plan-modal';

export type CheckInRewardConfigValue = CheckInRewardConfigDto;
export type CheckInPlanRow = CheckInPlanPageItemDto & {
  enableLoading?: boolean;
  publishLoading?: boolean;
  statusLoading?: boolean;
};
export type CheckInReconciliationRow = CheckInReconciliationItemDto;

export const checkInPlanStatusOptions = [
  { color: 'info' as const, label: '草稿', value: 0 },
  { color: 'success' as const, label: '已发布', value: 1 },
  { color: 'danger' as const, label: '已下线', value: 2 },
  { color: 'warning' as const, label: '已停用', value: 3 },
];

export const checkInCycleTypeOptions = [
  { color: 'warning' as const, label: '按周', value: 'weekly' },
  { color: 'success' as const, label: '按月', value: 'monthly' },
];

export const checkInRewardStatusOptions = [
  { color: 'warning' as const, label: '待处理', value: 0 },
  { color: 'success' as const, label: '成功', value: 1 },
  { color: 'danger' as const, label: '失败', value: 2 },
];

export const checkInRewardResultOptions = [
  { color: 'success' as const, label: '已落账', value: 1 },
  { color: 'info' as const, label: '幂等命中', value: 2 },
  { color: 'danger' as const, label: '处理失败', value: 3 },
];

export const checkInRewardSourceOptions = [
  { color: 'info' as const, label: '默认基础奖励', value: 'BASE_REWARD' },
  { color: 'success' as const, label: '具体日期奖励', value: 'DATE_RULE' },
  { color: 'warning' as const, label: '周期模式奖励', value: 'PATTERN_RULE' },
];

export const checkInPatternTypeOptions = [
  { color: 'success' as const, label: '按周几', value: 'WEEKDAY' },
  { color: 'warning' as const, label: '按每月几号', value: 'MONTH_DAY' },
  { color: 'info' as const, label: '按月末', value: 'MONTH_LAST_DAY' },
];

export const checkInRecordTypeOptions = [
  { color: 'success' as const, label: '正常签到', value: 1 },
  { color: 'warning' as const, label: '补签', value: 2 },
];

const planTableSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '计划编码',
    },
    fieldName: 'planCode',
    label: '计划编码',
  },
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '计划名称',
    },
    fieldName: 'planName',
    label: '计划名称',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: checkInPlanStatusOptions,
      placeholder: '计划状态',
    },
    fieldName: 'status',
    label: '计划状态',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: checkInCycleTypeOptions,
      placeholder: '周期类型',
    },
    fieldName: 'cycleType',
    label: '周期类型',
  },
  {
    component: 'DatePicker',
    componentProps: {
      placeholder: '开始日期',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
    },
    fieldName: 'startDate',
    label: '开始日期',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 0,
      placeholder: '每周期补签次数',
    },
    fieldName: 'allowMakeupCountPerCycle',
    label: '每周期补签次数',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '基础奖励',
    },
    fieldName: 'baseRewardConfig',
    label: '基础奖励',
  },
];

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
      placeholder: '计划ID',
    },
    fieldName: 'planId',
    label: '计划ID',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '周期ID',
    },
    fieldName: 'cycleId',
    label: '周期ID',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '记录ID',
    },
    fieldName: 'recordId',
    label: '记录ID',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '发放事实ID',
    },
    fieldName: 'grantId',
    label: '发放事实ID',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: checkInRewardStatusOptions,
      placeholder: '基础奖励状态',
    },
    fieldName: 'rewardStatus',
    label: '基础奖励状态',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: checkInRewardStatusOptions,
      placeholder: '连续奖励状态',
    },
    fieldName: 'grantStatus',
    label: '连续奖励状态',
  },
];

const reconciliationTableFormSchema: EsFormSchema = [
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
    component: 'DatePicker',
    componentProps: {
      placeholder: '签到日期',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
    },
    fieldName: 'signDate',
    label: '签到日期',
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
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '计划ID',
    },
    fieldName: 'planId',
    label: '计划ID',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '周期ID',
    },
    fieldName: 'cycleId',
    label: '周期ID',
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
    component: 'Select',
    componentProps: {
      options: checkInRewardStatusOptions,
      placeholder: '基础奖励',
    },
    fieldName: 'rewardStatus',
    label: '基础奖励',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '奖励快照',
    },
    fieldName: 'resolvedRewardConfig',
    label: '奖励快照',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '基础账本',
    },
    fieldName: 'baseRewardLedgerIds',
    label: '基础账本',
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
      placeholder: '基础奖励错误',
    },
    fieldName: 'lastRewardError',
    label: '基础奖励错误',
  },
];

export const planSearchFormSchema = formSchemaTransform.toSearchSchema(
  planTableSchema,
  {
    planCode: {
      show: true,
    },
    planName: {
      show: true,
    },
    status: {
      show: true,
    },
  },
);

export const reconciliationSearchFormSchema =
  formSchemaTransform.toSearchSchema(reconciliationSearchBaseSchema, {
    userId: {
      show: true,
    },
    planId: {
      show: true,
    },
    cycleId: {
      show: true,
    },
    recordId: {
      show: true,
    },
    grantId: {
      show: true,
    },
    rewardStatus: {
      show: true,
    },
    grantStatus: {
      show: true,
    },
  });

export const planColumns: VxeGridPropTypes.Columns<CheckInPlanRow> =
  formSchemaTransform.toTableColumns<CheckInPlanRow>(planTableSchema, {
    planName: {
      fixed: 'left',
      minWidth: 240,
      showOverflow: 'tooltip',
      slots: { default: 'planName' },
      sort: 1,
      title: '签到计划',
    },
    planCode: {
      fixed: 'left',
      minWidth: 140,
      sort: 2,
      title: '编码',
    },
    status: {
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: checkInPlanStatusOptions,
        },
      },
      minWidth: 120,
      title: '状态',
    },
    cycleType: {
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: checkInCycleTypeOptions,
        },
      },
      minWidth: 110,
      title: '周期',
    },
    startDate: {
      minWidth: 130,
      title: '开始日期',
    },
    allowMakeupCountPerCycle: {
      formatter: ({ cellValue }: { cellValue?: null | number }) =>
        cellValue ?? '-',
      minWidth: 110,
      title: '补签次数',
    },
    baseRewardConfig: {
      minWidth: 190,
      showOverflow: false,
      slots: { default: 'baseRewardConfig' },
      title: '默认奖励',
    },
    updatedAt: {
      show: true,
      width: 160,
    },
    actions: {
      show: true,
      slots: { default: 'planActions' },
      width: 280,
    },
  });

export const reconciliationColumns: VxeGridPropTypes.Columns<CheckInReconciliationRow> =
  formSchemaTransform.toTableColumns<CheckInReconciliationRow>(
    reconciliationTableFormSchema,
    {
      recordId: {
        fixed: 'left',
        minWidth: 110,
      },
      signDate: {
        fixed: 'left',
        minWidth: 180,
        showOverflow: false,
        slots: { default: 'signInfo' },
      },
      userId: {
        minWidth: 100,
      },
      planId: {
        minWidth: 100,
      },
      cycleId: {
        minWidth: 100,
      },
      resolvedRewardSourceType: {
        minWidth: 140,
        showOverflow: false,
        slots: { default: 'resolvedRewardSourceType' },
        title: '解析来源',
      },
      rewardStatus: {
        minWidth: 150,
        showOverflow: false,
        slots: { default: 'baseRewardStatus' },
      },
      resolvedRewardConfig: {
        minWidth: 220,
        showOverflow: false,
        slots: { default: 'resolvedRewardConfig' },
        title: '奖励快照',
      },
      baseRewardLedgerIds: {
        minWidth: 180,
        showOverflow: false,
        slots: { default: 'baseRewardLedgerIds' },
      },
      grants: {
        minWidth: 360,
        showOverflow: false,
        slots: { default: 'grants' },
      },
      lastRewardError: {
        minWidth: 220,
        showOverflow: 'tooltip',
      },
      createdAt: {
        show: true,
        width: 160,
      },
      actions: {
        slots: { default: 'reconciliationActions' },
        sort: 999_999,
        title: '操作',
      },
    },
  );

export function formatLedgerIds(
  ids?: CheckInGrantItemDto['ledgerIds'] | null  ,
) {
  return ids && ids.length > 0 ? ids.join(', ') : '-';
}

export function getPlanBaseRewardSummary(source: {
  baseRewardConfig?: CheckInRewardConfigValue | null;
  dateRewardRules?: Array<
    Pick<
      CheckInPlanDetailResponseDto['dateRewardRules'][number],
      'rewardConfig'
    >
  > | null;
  patternRewardRules?: Array<
    Pick<CheckInPatternRewardRuleItemDto, 'rewardConfig'>
  > | null;
}) {
  const baseRewardConfig = parseRewardConfig(source.baseRewardConfig);
  if (hasConfiguredReward(baseRewardConfig)) {
    return formatRewardSummary(baseRewardConfig);
  }

  if (source.dateRewardRules?.length || source.patternRewardRules?.length) {
    return '规则内单独配置';
  }

  return '未配置';
}

export function getOptionLabel<T extends boolean | number | string>(
  options: Array<{ label: string; value: T }>,
  value: T,
) {
  return options.find((item) => item.value === value)?.label || '-';
}
