import type { BaseGrowthRewardRuleDto } from '#/api/types';

import { experienceTypeMap } from './constants';

export function getDetailCards(detail: BaseGrowthRewardRuleDto) {
  return [
    {
      title: '基本信息',
      show: true,
      fields: [
        {
          label: '规则类型',
          value: experienceTypeMap[detail?.type] || '-',
          type: 'text' as const,
        },
        {
          label: '经验值变化',
          tagText: detail?.delta > 0 ? `+${detail?.delta}` : detail?.delta,
          tagType: detail?.delta > 0 ? 'success' : 'danger',
          type: 'tag' as const,
        },
        {
          label: '每日上限',
          tagText: detail?.dailyLimit === 0 ? '无限制' : detail?.dailyLimit,
          type: 'tag' as const,
          tagType: detail?.dailyLimit > 0 ? 'danger' : 'success',
        },
        {
          label: '是否启用',
          type: 'tag' as const,
          tagType: detail?.isEnabled ? 'success' : 'danger',
          tagText: detail?.isEnabled ? '是' : '否',
        },
      ],
    },
    {
      title: '其他信息',
      show: true,
      fields: [
        {
          label: '备注',
          value: detail?.remark || '-',
          type: 'text' as const,
        },
        {
          label: '创建时间',
          value: detail?.createdAt,
          type: 'date' as const,
        },
        {
          label: '更新时间',
          value: detail?.updatedAt,
          type: 'date' as const,
        },
      ],
    },
  ];
}
