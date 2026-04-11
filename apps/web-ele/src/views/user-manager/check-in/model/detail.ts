import type { CheckInPlanDetailResponseDto } from '#/api/types';

import { formatUTC } from '#/utils';

import {
  checkInCycleTypeOptions,
  checkInPlanStatusOptions,
  getOptionLabel,
  getPlanBaseRewardSummary,
} from './shared';

export function getDetailCards(detail: CheckInPlanDetailResponseDto) {
  const status = checkInPlanStatusOptions.find(
    (item) => item.value === detail.status,
  );

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
          label: '计划ID',
          type: 'text',
          value: detail.id,
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
          label: '开始日期',
          type: 'text',
          value: detail.startDate,
        },
        {
          label: '结束日期',
          type: 'text',
          value: detail.endDate || '-',
        },
        {
          label: '每周期补签次数',
          type: 'text',
          value: detail.allowMakeupCountPerCycle,
        },
      ],
      show: true,
      title: '周期与时间窗',
    },
    {
      fields: [
        {
          label: '默认基础奖励',
          type: 'text',
          value: getPlanBaseRewardSummary(detail),
        },
        {
          label: '具体日期奖励',
          type: 'text',
          value: detail.dateRewardRules.length,
        },
        {
          label: '周期模式奖励',
          type: 'text',
          value: detail.patternRewardRules.length,
        },
        {
          label: '连续奖励规则',
          type: 'text',
          value: detail.ruleCount,
        },
      ],
      show: true,
      title: '奖励配置',
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
