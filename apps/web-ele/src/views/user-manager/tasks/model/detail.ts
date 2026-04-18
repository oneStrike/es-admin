import type { AdminTaskPageResponseDto } from '#/api/types';

import { formatUTC } from '#/utils';
import { growthTypeOptions } from '#/views/user-manager/growth/model/constants';

import {
  claimModeOptions,
  completeModeOptions,
  objectiveTypeOptions,
  taskStatusOptions,
  taskTypeOptions,
} from './shared';

function getOptionLabel(
  options: Array<{ label: string; value: number }>,
  value?: number,
) {
  return options.find((item) => item.value === value)?.label || '-';
}

function formatTaskRewardItems(
  rewardItems?: AdminTaskPageResponseDto['rewardItems'],
) {
  if (!rewardItems?.length) {
    return '-';
  }

  return rewardItems
    .map((item) => {
      let assetLabel = `资产 ${item.assetType}`;

      if (item.assetType === 1) {
        assetLabel = '积分';
      } else if (item.assetType === 2) {
        assetLabel = '经验';
      }

      return `${assetLabel} ${item.amount}`;
    })
    .join(' / ');
}

export function getDetailCards(detail: AdminTaskPageResponseDto) {
  const taskStatus = taskStatusOptions.find((item) => item.value === detail.status);
  const eventCodeLabel =
    growthTypeOptions.find((item) => item.value === detail.eventCode)?.label || '-';

  return [
    {
      title: '',
      show: true,
      fields: [
        {
          label: '任务标题',
          value: detail.title,
          type: 'title',
        },
        {
          label: '任务编码',
          value: detail.code || '-',
          type: 'text',
        },
        {
          label: '任务类型',
          value: getOptionLabel(taskTypeOptions, detail.type),
          type: 'text',
        },
        {
          label: '任务状态',
          value: detail.status,
          type: 'tag',
          tagText: taskStatus?.label || '-',
          tagType: taskStatus?.color || 'info',
        },
      ],
    },
    {
      title: '配置概览',
      show: true,
      fields: [
        {
          label: '启用状态',
          value: detail.isEnabled,
          type: 'tag',
          tagText: detail.isEnabled ? '启用' : '禁用',
          tagType: detail.isEnabled ? 'success' : 'danger',
        },
        {
          label: '领取模式',
          value: getOptionLabel(claimModeOptions, detail.claimMode),
          type: 'text',
        },
        {
          label: '完成模式',
          value: getOptionLabel(completeModeOptions, detail.completeMode),
          type: 'text',
        },
        {
          label: '目标次数',
          value: detail.targetCount ?? 0,
          type: 'text',
        },
        {
          label: '目标类型',
          value: getOptionLabel(objectiveTypeOptions, detail.objectiveType),
          type: 'text',
        },
        {
          label: '优先级',
          value: detail.priority ?? 0,
          type: 'text',
        },
      ],
    },
    {
      title: '发布时间',
      show: true,
      fields: [
        {
          label: '开始时间',
          value: detail.publishStartAt
            ? formatUTC(detail.publishStartAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text',
        },
        {
          label: '结束时间',
          value: detail.publishEndAt
            ? formatUTC(detail.publishEndAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text',
        },
      ],
    },
    {
      title: '规则配置',
      show: true,
      fields: [
        {
          label: '事件编码',
          value: detail.eventCode ? eventCodeLabel : '-',
          type: 'text',
        },
        {
          label: '目标配置',
          value: detail.objectiveConfig || '-',
          type: 'text',
        },
        {
          label: '周期规则',
          value: detail.repeatRule || '-',
          type: 'text',
        },
        {
          label: '奖励配置',
          value: formatTaskRewardItems(detail.rewardItems),
          type: 'text',
        },
      ],
    },
    {
      title: '任务说明',
      show: true,
      fields: [
        {
          label: '任务说明',
          value: detail.description || '-',
          type: 'text',
        },
      ],
    },
    {
      title: '时间信息',
      show: true,
      fields: [
        {
          label: '创建时间',
          value: detail.createdAt
            ? formatUTC(detail.createdAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text',
        },
        {
          label: '更新时间',
          value: detail.updatedAt
            ? formatUTC(detail.updatedAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text',
        },
      ],
    },
  ];
}
