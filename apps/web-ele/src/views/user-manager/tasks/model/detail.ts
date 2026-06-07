import type { TaskDetailResponse } from '#/api/types';

import { formatUTC } from '#/utils';

import {
  formatCompletionPolicy,
  formatCountingMode,
  formatFilterSummary,
  formatRewardItems,
  getOptionLabel,
  taskClaimModeOptions,
  taskDefinitionStatusOptions,
  taskRepeatTypeOptions,
  taskSceneTypeOptions,
  taskStepDedupeScopeOptions,
  taskStepTriggerModeOptions,
} from './options';

export function getTaskDefinitionDetailSections(detail: TaskDetailResponse) {
  const step = detail.steps?.[0];

  return [
    {
      title: '基本信息',
      show: true,
      items: [
        { label: '任务标题', type: 'title' as const, value: detail.title },
        { label: '任务编码', type: 'text' as const, value: detail.code || '-' },
        {
          label: '任务场景',
          type: 'text' as const,
          value: getOptionLabel(taskSceneTypeOptions, detail.sceneType),
        },
        {
          label: '任务状态',
          type: 'tag' as const,
          value: detail.status,
          tagText: getOptionLabel(taskDefinitionStatusOptions, detail.status),
          tagType:
            taskDefinitionStatusOptions.find(
              (item) => item.value === detail.status,
            )?.color || 'info',
        },
        {
          label: '步骤数量',
          type: 'text' as const,
          value: detail.stepCount ?? 0,
        },
        {
          label: '活跃实例',
          type: 'text' as const,
          value: detail.activeInstanceCount ?? 0,
        },
        {
          label: '待补偿奖励',
          type: 'text' as const,
          value: detail.pendingRewardCompensationCount ?? 0,
        },
      ],
    },
    {
      title: '任务配置',
      show: true,
      items: [
        {
          label: '领取方式',
          type: 'text' as const,
          value: getOptionLabel(taskClaimModeOptions, detail.claimMode),
        },
        {
          label: '重复周期',
          type: 'text' as const,
          value: getOptionLabel(taskRepeatTypeOptions, detail.repeatType),
        },
        {
          label: '完成策略',
          type: 'text' as const,
          value: formatCompletionPolicy(detail.completionPolicy),
        },
        {
          label: '排序值',
          type: 'text' as const,
          value: detail.sortOrder ?? 0,
        },
        {
          label: '奖励配置',
          type: 'text' as const,
          value: formatRewardItems(detail.rewardItems),
        },
      ],
    },
    {
      title: '完成条件',
      show: true,
      items: [
        {
          label: '完成条件说明',
          type: 'text' as const,
          value: step?.description || '-',
        },
        {
          label: '步骤标题',
          type: 'text' as const,
          value: step?.title || '-',
        },
        {
          label: '触发方式',
          type: 'text' as const,
          value: getOptionLabel(taskStepTriggerModeOptions, step?.triggerMode),
        },
        {
          label: '累计口径',
          type: 'text' as const,
          value: formatCountingMode(step?.dedupeScope),
        },
        {
          label: '完成次数',
          type: 'text' as const,
          value: step?.targetValue ?? '-',
        },
        {
          label: '事件模板',
          type: 'text' as const,
          value: step?.templateKey || '-',
        },
        {
          label: '去重范围',
          type: 'text' as const,
          value: getOptionLabel(taskStepDedupeScopeOptions, step?.dedupeScope),
        },
        {
          label: '过滤条件',
          type: 'text' as const,
          value: formatFilterSummary(step?.filters),
        },
      ],
    },
    {
      title: '时间信息',
      show: true,
      items: [
        {
          label: '开始时间',
          type: 'text' as const,
          value: detail.startAt
            ? formatUTC(detail.startAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
        },
        {
          label: '结束时间',
          type: 'text' as const,
          value: detail.endAt
            ? formatUTC(detail.endAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
        },
        {
          label: '创建时间',
          type: 'date' as const,
          value: detail.createdAt,
        },
        {
          label: '更新时间',
          type: 'date' as const,
          value: detail.updatedAt,
        },
      ],
    },
    {
      title: '说明',
      show: true,
      items: [
        {
          label: '任务说明',
          type: 'text' as const,
          value: detail.description || '-',
        },
      ],
    },
  ];
}
