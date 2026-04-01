import type { AdminCheckInPlanDetailResponseDto } from '#/api/types';

import { formatUTC } from '#/utils';

import {
  checkInCycleTypeOptions,
  checkInPlanStatusOptions,
  checkInRuleStatusOptions,
  formatRewardSummary,
  getOptionLabel,
} from './shared';

function buildRuleFields(detail: AdminCheckInPlanDetailResponseDto) {
  if (!detail.streakRewardRules?.length) {
    return [
      {
        label: '规则列表',
        type: 'text',
        value: '当前版本未配置连续奖励规则',
      },
    ];
  }

  return detail.streakRewardRules.flatMap((rule, index) => [
    {
      label: `规则 ${index + 1}`,
      type: 'text',
      value: `${rule.ruleCode} · 连续 ${rule.streakDays} 天`,
    },
    {
      label: `奖励 ${index + 1}`,
      type: 'text',
      value: formatRewardSummary(rule.rewardConfig),
    },
    {
      label: `触发方式 ${index + 1}`,
      type: 'text',
      value: rule.repeatable ? '可重复领取' : '周期内仅一次',
    },
    {
      label: `状态 ${index + 1}`,
      type: 'text',
      value: getOptionLabel(checkInRuleStatusOptions, rule.status),
    },
  ]);
}

export function getDetailCards(detail: AdminCheckInPlanDetailResponseDto) {
  const status = checkInPlanStatusOptions.find(item => item.value === detail.status);

  return [
    {
      fields: [
        {
          label: '计划名称',
          type: 'title',
          value: detail.planName,
        },
        {
          label: '计划编码',
          type: 'text',
          value: detail.planCode,
        },
        {
          label: '计划状态',
          tagText: status?.label || '-',
          tagType: status?.color || 'info',
          type: 'tag',
          value: detail.status,
        },
      ],
      show: true,
      title: '',
    },
    {
      fields: [
        {
          label: '计划版本',
          type: 'text',
          value: detail.version,
        },
        {
          label: '规则数量',
          type: 'text',
          value: detail.ruleCount,
        },
        {
          label: '活跃周期实例',
          type: 'text',
          value: detail.activeCycleCount,
        },
        {
          label: '待补偿奖励',
          type: 'text',
          value: detail.pendingRewardCount,
        },
      ],
      show: true,
      title: '运行概览',
    },
    {
      fields: [
        {
          label: '周期类型',
          type: 'text',
          value: getOptionLabel(checkInCycleTypeOptions, detail.cycleType),
        },
        {
          label: '周期起算日期',
          type: 'text',
          value: detail.cycleAnchorDate,
        },
        {
          label: '每周期补签次数',
          type: 'text',
          value: detail.allowMakeupCountPerCycle,
        },
      ],
      show: true,
      title: '周期配置',
    },
    {
      fields: [
        {
          label: '基础奖励',
          type: 'text',
          value: formatRewardSummary(detail.baseRewardConfig),
        },
        {
          label: '生效开始时间',
          type: 'text',
          value: detail.publishStartAt
            ? formatUTC(detail.publishStartAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
        },
        {
          label: '生效结束时间',
          type: 'text',
          value: detail.publishEndAt
            ? formatUTC(detail.publishEndAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
        },
      ],
      show: true,
      title: '奖励与时间窗',
    },
    {
      fields: buildRuleFields(detail),
      show: true,
      title: '连续奖励规则',
    },
    {
      fields: [
        {
          label: '创建时间',
          type: 'text',
          value: formatUTC(detail.createdAt, 'YYYY-MM-DD HH:mm:ss'),
        },
        {
          label: '更新时间',
          type: 'text',
          value: formatUTC(detail.updatedAt, 'YYYY-MM-DD HH:mm:ss'),
        },
      ],
      show: true,
      title: '时间信息',
    },
  ];
}
