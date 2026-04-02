import type { VxeGridPropTypes } from '#/adapter/vxe-table';
import type {
  AdminCheckInGrantItemDto,
  AdminCheckInPlanDetailResponseDto,
  AdminCheckInPlanPageResponseDto,
  AdminCheckInReconciliationPageResponseDto,
  AdminCheckInStreakRewardRuleItemDto,
  CheckInPlanCreateRequest,
  CheckInPlanUpdateRequest,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { dayjs, safeParseJson } from '#/utils';

export type CheckInRewardConfigValue = NonNullable<
  AdminCheckInPlanDetailResponseDto['baseRewardConfig']
>;

export type CheckInPlanRuleFormItem = Pick<
  AdminCheckInStreakRewardRuleItemDto,
  'repeatable' | 'ruleCode' | 'status' | 'streakDays'
> & {
  localId: string;
  rewardExperience?: CheckInRewardConfigValue['experience'];
  rewardPoints?: CheckInRewardConfigValue['points'];
  sortOrder?: AdminCheckInStreakRewardRuleItemDto['sortOrder'];
};

export type CheckInPlanFormModel = Partial<Pick<CheckInPlanUpdateRequest, 'id'>> &
  Pick<
  AdminCheckInPlanDetailResponseDto,
  | 'allowMakeupCountPerCycle'
  | 'cycleType'
  | 'endDate'
  | 'planCode'
  | 'planName'
  | 'startDate'
  | 'status'
> & {
    baseRewardExperience?: CheckInRewardConfigValue['experience'];
    baseRewardPoints?: CheckInRewardConfigValue['points'];
    streakRewardRules: CheckInPlanRuleFormItem[];
  };

export type CheckInPlanRow = AdminCheckInPlanPageResponseDto & {
  enableLoading?: boolean;
  publishLoading?: boolean;
  statusLoading?: boolean;
};

export type CheckInReconciliationRow =
  AdminCheckInReconciliationPageResponseDto;

export const checkInPlanStatusOptions = [
  { color: 'info' as const, label: '草稿', value: 0 },
  { color: 'success' as const, label: '已发布', value: 1 },
  { color: 'danger' as const, label: '已下线', value: 2 },
  { color: 'warning' as const, label: '已停用', value: 3 },
]

export const checkInCycleTypeOptions = [
  { color: 'primary' as const, label: '按日', value: 'daily' },
  { color: 'warning' as const, label: '按周', value: 'weekly' },
  { color: 'success' as const, label: '按月', value: 'monthly' },
]

export const checkInRewardStatusOptions = [
  { color: 'warning' as const, label: '待处理', value: 0 },
  { color: 'success' as const, label: '成功', value: 1 },
  { color: 'danger' as const, label: '失败', value: 2 },
]

export const checkInRewardResultOptions = [
  { color: 'success' as const, label: '已落账', value: 1 },
  { color: 'info' as const, label: '幂等命中', value: 2 },
  { color: 'danger' as const, label: '处理失败', value: 3 },
]

export const checkInRecordTypeOptions = [
  { color: 'success' as const, label: '正常签到', value: 1 },
  { color: 'warning' as const, label: '补签', value: 2 },
]

export const checkInRuleStatusOptions = [
  { color: 'info' as const, label: '停用', value: 0 },
  { color: 'success' as const, label: '启用', value: 1 },
]
export const planSearchFormSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '计划编码',
    },
    fieldName: 'planCode',
  },
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '计划名称',
    },
    fieldName: 'planName',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: checkInPlanStatusOptions,
      placeholder: '计划状态',
    },
    fieldName: 'status',
  },
];

export const reconciliationSearchFormSchema: EsFormSchema = [
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '用户ID',
    },
    fieldName: 'userId',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '计划ID',
    },
    fieldName: 'planId',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '周期ID',
    },
    fieldName: 'cycleId',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '记录ID',
    },
    fieldName: 'recordId',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '发放事实ID',
    },
    fieldName: 'grantId',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: checkInRewardStatusOptions,
      placeholder: '基础奖励状态',
    },
    fieldName: 'rewardStatus',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: checkInRewardStatusOptions,
      placeholder: '连续奖励状态',
    },
    fieldName: 'grantStatus',
  },
  {
    component: 'DatePicker',
    componentProps: {
      clearable: true,
      endPlaceholder: '签到结束日期',
      startPlaceholder: '签到开始日期',
      type: 'daterange',
      valueFormat: 'YYYY-MM-DD',
    },
    fieldName: 'dateRange',
  },
];

export const planColumns: VxeGridPropTypes.Columns<CheckInPlanRow> = [
  {
    field: 'planName',
    fixed: 'left',
    minWidth: 240,
    showOverflow: 'tooltip',
    title: '签到计划',
    slots: { default: 'planName' },
  },
  {
    field: 'planCode',
    fixed: 'left',
    minWidth: 140,
    title: '编码',
  },
  {
    field: 'status',
    minWidth: 120,
    title: '状态',
    cellRender: {
      name: 'CellTag',
      props: {
        mapOptions: checkInPlanStatusOptions,
      },
    },
  },
  {
    field: 'cycleType',
    minWidth: 110,
    title: '周期',
    cellRender: {
      name: 'CellTag',
      props: {
        mapOptions: checkInCycleTypeOptions,
      },
    },
  },
  {
    field: 'startDate',
    minWidth: 130,
    title: '开始日期',
  },
  {
    field: 'allowMakeupCountPerCycle',
    minWidth: 110,
    title: '补签次数',
  },
  {
    field: 'baseRewardConfig',
    minWidth: 190,
    showOverflow: false,
    slots: { default: 'baseRewardConfig' },
    title: '基础奖励',
  },
  {
    field: 'version',
    minWidth: 90,
    title: '版本',
  },
  {
    field: 'ruleCount',
    minWidth: 110,
    title: '规则数',
  },
  {
    field: 'activeCycleCount',
    minWidth: 120,
    title: '活跃周期',
  },
  {
    field: 'pendingRewardCount',
    minWidth: 120,
    slots: { default: 'pendingRewardCount' },
    title: '待补偿',
  },
  {
    field: 'startDate',
    minWidth: 220,
    showOverflow: false,
    slots: { default: 'publishWindow' },
    title: '生效时间',
  },
  {
    field: 'updatedAt',
    minWidth: 160,
    sortable: true,
    title: '更新时间',
    cellRender: {
      name: 'CellDate',
    },
  },
  {
    field: 'actions',
    fixed: 'right',
    minWidth: 340,
    slots: { default: 'planActions' },
    title: '操作',
  },
];

export const reconciliationColumns: VxeGridPropTypes.Columns<CheckInReconciliationRow> =
  [
    {
      field: 'recordId',
      fixed: 'left',
      minWidth: 110,
      title: '签到记录ID',
    },
    {
      field: 'signDate',
      fixed: 'left',
      minWidth: 180,
      showOverflow: false,
      slots: { default: 'signInfo' },
      title: '签到日期',
    },
    {
      field: 'userId',
      minWidth: 100,
      title: '用户ID',
    },
    {
      field: 'planId',
      minWidth: 100,
      title: '计划ID',
    },
    {
      field: 'cycleId',
      minWidth: 100,
      title: '周期ID',
    },
    {
      field: 'rewardStatus',
      minWidth: 150,
      showOverflow: false,
      slots: { default: 'baseRewardStatus' },
      title: '基础奖励',
    },
    {
      field: 'baseRewardLedgerIds',
      minWidth: 180,
      showOverflow: false,
      slots: { default: 'baseRewardLedgerIds' },
      title: '基础账本',
    },
    {
      field: 'grants',
      minWidth: 360,
      showOverflow: false,
      slots: { default: 'grants' },
      title: '连续奖励',
    },
    {
      field: 'lastRewardError',
      minWidth: 220,
      showOverflow: 'tooltip',
      title: '基础奖励错误',
    },
    {
      field: 'createdAt',
      minWidth: 160,
      sortable: true,
      title: '创建时间',
      cellRender: {
        name: 'CellDate',
      },
    },
    {
      field: 'actions',
      fixed: 'right',
      minWidth: 160,
      slots: { default: 'reconciliationActions' },
      title: '操作',
    },
  ];

export function createDefaultRuleFormItem(seed = 1): CheckInPlanRuleFormItem {
  return {
    localId: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    repeatable: false,
    rewardExperience: undefined,
    rewardPoints: undefined,
    ruleCode: `streak-${seed}`,
    sortOrder: seed,
    status: 1,
    streakDays: seed,
  };
}

export function createDefaultPlanFormModel(): CheckInPlanFormModel {
  return {
    allowMakeupCountPerCycle: 0,
    baseRewardExperience: undefined,
    baseRewardPoints: undefined,
    cycleType: 'weekly',
    endDate: undefined,
    planCode: '',
    planName: '',
    startDate: dayjs().format('YYYY-MM-DD'),
    status: 0,
    streakRewardRules: [],
  };
}

export function parseRewardConfig(value: unknown): CheckInRewardConfigValue {
  if (!value) {
    return {};
  }
  if (typeof value === 'object' && !Array.isArray(value)) {
    return value as CheckInRewardConfigValue;
  }
  if (typeof value === 'string') {
    return (safeParseJson(value) as CheckInRewardConfigValue | undefined) || {};
  }
  return {};
}

export function formatRewardSummary(value: unknown) {
  const rewardConfig = parseRewardConfig(value);
  const items = [
    rewardConfig.points ? `积分 ${rewardConfig.points}` : '',
    rewardConfig.experience ? `经验 ${rewardConfig.experience}` : '',
  ].filter(Boolean);

  return items.length > 0 ? items.join(' / ') : '未配置';
}

export function hasConfiguredReward(value: {
  experience?: null | number;
  points?: null | number;
}) {
  return Number(value.experience ?? 0) > 0 || Number(value.points ?? 0) > 0;
}

export function getBaseRewardValidationMessage(
  model: Pick<CheckInPlanFormModel, 'baseRewardExperience' | 'baseRewardPoints'>,
) {
  return hasConfiguredReward({
    experience: model.baseRewardExperience,
    points: model.baseRewardPoints,
  })
    ? null
    : '基础奖励积分或经验至少填写一项';
}

export function getRuleRewardValidationMessage(
  rule: Pick<CheckInPlanRuleFormItem, 'rewardExperience' | 'rewardPoints'>,
  rowNumber: number,
) {
  return hasConfiguredReward({
    experience: rule.rewardExperience,
    points: rule.rewardPoints,
  })
    ? null
    : `第 ${rowNumber} 条连续奖励积分或经验至少填写一项`;
}

export function formatLedgerIds(
  ids?: AdminCheckInGrantItemDto['ledgerIds'] | null,
) {
  return ids && ids.length > 0 ? ids.join(', ') : '-';
}

export function mapPlanDetailToFormModel(
  detail: AdminCheckInPlanDetailResponseDto,
): CheckInPlanFormModel {
  const baseRewardConfig = parseRewardConfig(detail.baseRewardConfig);

  return {
    allowMakeupCountPerCycle: detail.allowMakeupCountPerCycle,
    baseRewardExperience: baseRewardConfig.experience,
    baseRewardPoints: baseRewardConfig.points,
    cycleType: detail.cycleType,
    endDate: detail.endDate ? dayjs(detail.endDate).format('YYYY-MM-DD') : undefined,
    id: detail.id,
    planCode: detail.planCode,
    planName: detail.planName,
    startDate: dayjs(detail.startDate).format('YYYY-MM-DD'),
    status: detail.status,
    streakRewardRules: (detail.streakRewardRules || []).map((rule, index) => {
      const rewardConfig = parseRewardConfig(rule.rewardConfig);

      return {
        localId: `${rule.id}-${index}`,
        repeatable: rule.repeatable,
        rewardExperience: rewardConfig.experience,
        rewardPoints: rewardConfig.points,
        ruleCode: rule.ruleCode,
        sortOrder: rule.sortOrder,
        status: rule.status,
        streakDays: rule.streakDays,
      };
    }),
  };
}

export function buildPlanSubmitPayload(model: CheckInPlanFormModel) {
  const baseRewardConfig = buildRewardConfig(
    model.baseRewardPoints,
    model.baseRewardExperience,
  );
  const streakRewardRules = model.streakRewardRules.map((rule) => ({
    repeatable: rule.repeatable,
    rewardConfig: buildRewardConfig(rule.rewardPoints, rule.rewardExperience),
    ruleCode: rule.ruleCode.trim(),
    sortOrder: Number(rule.sortOrder ?? rule.streakDays ?? 0),
    status: rule.status,
    streakDays: Number(rule.streakDays ?? 0),
  }));

  const payload = {
    allowMakeupCountPerCycle: Number(model.allowMakeupCountPerCycle ?? 0),
    baseRewardConfig,
    cycleType: model.cycleType,
    endDate: model.endDate || undefined,
    planCode: model.planCode.trim(),
    planName: model.planName.trim(),
    startDate: model.startDate,
    status: model.status,
    streakRewardRules,
  } as Record<string, unknown>;

  if (model.id) {
    payload.id = model.id;
    return payload as unknown as CheckInPlanUpdateRequest;
  }

  return payload as unknown as CheckInPlanCreateRequest;
}

function buildRewardConfig(
  points?: CheckInRewardConfigValue['points'],
  experience?: CheckInRewardConfigValue['experience'],
) {
  const rewardConfig: CheckInRewardConfigValue = {};

  if (points && points > 0) {
    rewardConfig.points = Number(points);
  }
  if (experience && experience > 0) {
    rewardConfig.experience = Number(experience);
  }

  return Object.keys(rewardConfig).length > 0 ? rewardConfig : null;
}

export function getOptionLabel<T extends boolean | number | string>(
  options: Array<{ label: string; value: T }>,
  value: T,
) {
  return options.find((item) => item.value === value)?.label || '-';
}
