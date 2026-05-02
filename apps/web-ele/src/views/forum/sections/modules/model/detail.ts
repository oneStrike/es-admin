import type { BasicOption } from '@vben/types';

import type { ForumSectionsDetailResponse } from '#/api/types';

import { formatUTC } from '#/utils';

import { topicReviewPolicy } from './constants';

function getUserLevelRuleLabel(
  detail: ForumSectionsDetailResponse,
  levelOptions: BasicOption[] = [],
) {
  if (detail.userLevelRuleId === null || detail.userLevelRuleId === undefined) {
    return '所有用户';
  }

  return (
    levelOptions.find((item) => item.value === detail.userLevelRuleId)?.label ||
    `规则ID：${detail.userLevelRuleId}`
  );
}

/**
 * 获取板块详情卡片配置
 * @param detail 板块详情数据
 * @returns 卡片配置数组
 */
export function getDetailCards(
  detail: ForumSectionsDetailResponse,
  levelOptions: BasicOption[] = [],
) {
  // 获取审核策略标签
  const reviewPolicyLabel =
    topicReviewPolicy.find((item) => item.value === detail.topicReviewPolicy)
      ?.label || '-';

  return [
    {
      title: '图标',
      show: !!detail.icon,
      type: 'image' as const,
      imageUrl: detail.icon,
    },
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
          label: '访问等级规则',
          value: getUserLevelRuleLabel(detail, levelOptions),
          type: 'text' as const,
        },
        {
          label: '运营备注',
          value: detail?.remark || '-',
          type: 'text' as const,
        },
      ],
    },
    {
      title: '数据统计',
      show: true,
      fields: [
        {
          label: '关注人数',
          value: detail?.followersCount,
          type: 'text' as const,
        },
        {
          label: '主题数',
          value: detail?.topicCount,
          type: 'text' as const,
        },
        {
          label: '评论数',
          value: detail?.commentCount,
          type: 'text' as const,
        },
        {
          label: '最后发表时间',
          value: detail?.lastPostAt
            ? formatUTC(detail.lastPostAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text' as const,
        },
      ],
    },
    {
      title: '板块背景图',
      show: !!detail?.cover,
      type: 'image' as const,
      imageUrl: detail?.cover,
      pinTop: false,
    },
    {
      title: '板块描述',
      show: true,
      type: 'html' as const,
      content: detail?.description || '<p>-</p>',
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
