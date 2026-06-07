import type { ExperienceEventOption } from './constants';

import type {
  BaseGrowthRewardRuleDto,
  UserExperienceRecordDetailDto,
} from '#/api/types';

import { formatExperienceEventLabel } from './constants';
import { getDiagnosticRecordSections } from './shared';

function formatSignedValue(value?: null | number) {
  if (value === null || value === undefined) return '-';

  return value > 0 ? `+${value}` : String(value);
}

function formatLimitValue(value?: null | number) {
  if (value === null || value === undefined) return '-';

  return value === 0 ? '无限制' : String(value);
}

export function getRuleDetailSections(
  detail: BaseGrowthRewardRuleDto,
  eventOptions: ExperienceEventOption[] = [],
) {
  return [
    {
      title: '规则信息',
      show: true,
      items: [
        {
          label: '经验事件',
          type: 'text' as const,
          value: formatExperienceEventLabel(detail.type, eventOptions),
        },
        {
          label: '经验奖励',
          tagText: formatSignedValue(detail.delta),
          tagType: detail.delta > 0 ? 'success' : 'danger',
          type: 'tag' as const,
        },
        {
          label: '每日上限',
          tagText: formatLimitValue(detail.dailyLimit),
          tagType: detail.dailyLimit > 0 ? 'warning' : 'info',
          type: 'tag' as const,
        },
        {
          label: '总上限',
          tagText: formatLimitValue(detail.totalLimit),
          tagType: detail.totalLimit > 0 ? 'warning' : 'info',
          type: 'tag' as const,
        },
        {
          label: '启用状态',
          tagText: detail.isEnabled ? '启用' : '禁用',
          tagType: detail.isEnabled ? 'success' : 'danger',
          type: 'tag' as const,
        },
        {
          label: '规则状态',
          tagText: detail.archivedAt ? '已归档' : '当前规则',
          tagType: detail.archivedAt ? 'info' : 'success',
          type: 'tag' as const,
        },
      ],
    },
    {
      title: '审计信息',
      show: true,
      items: [
        {
          label: '备注',
          type: 'text' as const,
          value: detail.remark || '-',
        },
        {
          label: '归档原因',
          type: 'text' as const,
          value: detail.archiveReason || '-',
        },
        {
          label: '归档时间',
          type: 'date' as const,
          value: detail.archivedAt || null,
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
  ];
}

export function getRecordDetailSections(
  detail: UserExperienceRecordDetailDto,
  eventOptions: ExperienceEventOption[] = [],
) {
  return getDiagnosticRecordSections(detail, eventOptions);
}

export const getDetailSections = getRuleDetailSections;
