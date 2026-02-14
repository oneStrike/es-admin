import type { CreateForumSectionDto } from '#/api/types';

import { formatUTC } from '#/utils';

import { topicReviewPolicy } from './constants';

/**
 * 获取板块详情卡片配置
 * @param detail 板块详情数据
 * @returns 卡片配置数组
 */
export function getDetailCards(detail: CreateForumSectionDto) {
  // 获取审核策略标签
  const reviewPolicyLabel =
    topicReviewPolicy.find((item) => item.value === detail.topicReviewPolicy)
      ?.label || '-';

  return [
    {
      title: '基本信息',
      show: true,
      fields: [
        {
          label: '板块名称',
          value: detail?.name,
          type: 'text' as const,
        },
        {
          label: '板块状态',
          value: detail?.isEnabled ? '启用' : '禁用',
          type: 'text' as const,
        },
        {
          label: '排序权重',
          value: detail?.sortOrder,
          type: 'text' as const,
        },
        {
          label: '审核策略',
          value: reviewPolicyLabel,
          type: 'text' as const,
        },
        {
          label: '板块图标',
          value: detail?.icon || '-',
          type: 'text' as const,
        },
        {
          label: '板块描述',
          value: detail?.description || '-',
          type: 'text' as const,
        },
      ],
    },
    {
      title: '时间信息',
      show: true,
      fields: [
        {
          label: '创建时间',
          value: detail?.createdAt
            ? formatUTC(detail.createdAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text' as const,
        },
        {
          label: '更新时间',
          value: detail?.updatedAt
            ? formatUTC(detail.updatedAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text' as const,
        },
      ],
    },
  ];
}
