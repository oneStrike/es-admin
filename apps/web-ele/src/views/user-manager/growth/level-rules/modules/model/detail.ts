import type { BaseUserLevelRuleDto } from '#/api/types';

import { formatUTC } from '#/utils';

export function getDetailCards(detail: BaseUserLevelRuleDto) {
  return [
    {
      title: '基本信息',
      show: true,
      fields: [
        {
          label: '等级图标',
          value: detail?.icon,
          type: 'image' as const,
        },
        {
          label: '等级名称',
          value: detail?.name,
          type: 'text' as const,
        },
        {
          label: '专属颜色',
          value: detail?.color,
          type: 'color' as const,
        },
        {
          label: '等级描述',
          value: detail?.description || '-',
          type: 'text' as const,
        },
        {
          label: '是否启用',
          value: detail?.isEnabled,
          type: 'tag' as const,
          tagType: detail?.isEnabled ? 'success' : 'danger',
          tagText: detail?.isEnabled ? '是' : '否',
        },
      ],
    },
    {
      title: '升级要求',
      show: true,
      fields: [
        {
          label: '所需经验值',
          value: detail?.requiredExperience || 0,
          type: 'text' as const,
        },
        {
          label: '排序值',
          value: detail?.sortOrder || 0,
          type: 'text' as const,
        },
      ],
    },
    {
      title: '权限限制',
      show: true,
      fields: [
        {
          label: '每日发帖上限',
          value:
            detail?.dailyTopicLimit === 0 ? '无限制' : detail?.dailyTopicLimit,
          type: 'text' as const,
        },
        {
          label: '每日回复和评论上限',
          value:
            detail?.dailyReplyCommentLimit === 0
              ? '无限制'
              : detail?.dailyReplyCommentLimit,
          type: 'text' as const,
        },
        {
          label: '每日点赞上限',
          value:
            detail?.dailyLikeLimit === 0 ? '无限制' : detail?.dailyLikeLimit,
          type: 'text' as const,
        },
        {
          label: '每日收藏上限',
          value:
            detail?.dailyFavoriteLimit === 0
              ? '无限制'
              : detail?.dailyFavoriteLimit,
          type: 'text' as const,
        },
        {
          label: '发帖间隔秒数',
          value:
            detail?.postInterval === 0 ? '无限制' : `${detail?.postInterval}秒`,
          type: 'text' as const,
        },
      ],
    },
    {
      title: '其他信息',
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
