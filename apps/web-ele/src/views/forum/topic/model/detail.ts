import type { ForumTopicDetailResponse } from '#/api/types';

import { formatUTC } from '#/utils';

import {
  auditStatusMap,
  formatTopicActorSummary,
  userStatusMap,
} from './shared';

export function getDetailSections(detail: ForumTopicDetailResponse) {
  const auditStatus = auditStatusMap[detail.auditStatus];
  const userStatus = detail.user
    ? userStatusMap[detail.user.status]
    : undefined;
  let accountStatusText = '-';
  let accountStatusType = 'info';

  if (detail.user) {
    accountStatusText = detail.user.isEnabled ? '启用' : '禁用';
    accountStatusType = detail.user.isEnabled ? 'success' : 'danger';
  }

  return [
    {
      title: '基本信息',
      show: true,
      items: [
        {
          label: '帖子标题',
          value: detail.title,
          type: 'text' as const,
        },
        {
          label: '所属板块',
          value: detail.section?.name || '-',
          type: 'text' as const,
        },
        {
          label: '发帖用户',
          value: detail.user?.nickname || '-',
          type: 'text' as const,
        },
        {
          label: '用户等级',
          value: detail.user?.level?.name || '-',
          type: 'text' as const,
        },
        {
          label: '用户状态',
          value: detail.user?.status,
          type: 'tag' as const,
          tagText: userStatus?.label || '-',
          tagType: userStatus?.color || 'info',
        },
        {
          label: '账号状态',
          value: detail.user?.isEnabled,
          type: 'tag' as const,
          tagText: accountStatusText,
          tagType: accountStatusType,
        },
        {
          label: '审核状态',
          value: detail.auditStatus,
          type: 'tag' as const,
          tagText: auditStatus?.label || '-',
          tagType: auditStatus?.color || 'info',
        },
        {
          label: '删除时间',
          value: detail.deletedAt
            ? formatUTC(detail.deletedAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text' as const,
        },
      ],
    },
    {
      title: '状态与互动',
      show: true,
      items: [
        {
          label: '置顶',
          value: detail.isPinned,
          type: 'tag' as const,
          tagText: detail.isPinned ? '是' : '否',
          tagType: detail.isPinned ? 'success' : 'info',
        },
        {
          label: '精华',
          value: detail.isFeatured,
          type: 'tag' as const,
          tagText: detail.isFeatured ? '是' : '否',
          tagType: detail.isFeatured ? 'success' : 'info',
        },
        {
          label: '锁定',
          value: detail.isLocked,
          type: 'tag' as const,
          tagText: detail.isLocked ? '是' : '否',
          tagType: detail.isLocked ? 'warning' : 'info',
        },
        {
          label: '隐藏',
          value: detail.isHidden,
          type: 'tag' as const,
          tagText: detail.isHidden ? '是' : '否',
          tagType: detail.isHidden ? 'danger' : 'info',
        },
        {
          label: '浏览数',
          value: detail.viewCount,
          type: 'text' as const,
        },
        {
          label: '评论数',
          value: detail.commentCount,
          type: 'text' as const,
        },
        {
          label: '点赞数',
          value: detail.likeCount,
          type: 'text' as const,
        },
        {
          label: '收藏数',
          value: detail.favoriteCount,
          type: 'text' as const,
        },
      ],
    },
    {
      title: '审核与话题',
      show: true,
      items: [
        {
          label: '审核人',
          value: formatTopicActorSummary(detail.auditorSummary),
          type: 'text' as const,
        },
        {
          label: '审核角色',
          value: detail.auditorSummary?.roleName || '-',
          type: 'text' as const,
        },
        {
          label: '审核拒绝原因',
          value: detail.auditReason || '-',
          type: 'text' as const,
        },
        {
          label: '敏感词命中数',
          value: detail.sensitiveWordHits?.length ?? 0,
          type: 'text' as const,
        },
        {
          label: '关联话题',
          value: detail.hashtags?.length
            ? detail.hashtags
                .map((item) => `${item.displayName}(#${item.slug})`)
                .join('、')
            : '-',
          type: 'text' as const,
        },
      ],
    },
    {
      title: '时间信息',
      show: true,
      items: [
        {
          label: '创建时间',
          value: detail.createdAt
            ? formatUTC(detail.createdAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text' as const,
        },
        {
          label: '更新时间',
          value: detail.updatedAt
            ? formatUTC(detail.updatedAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text' as const,
        },
        {
          label: '审核时间',
          value: detail.auditAt
            ? formatUTC(detail.auditAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text' as const,
        },
        {
          label: '最后评论时间',
          value: detail.lastCommentAt
            ? formatUTC(detail.lastCommentAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text' as const,
        },
      ],
    },
    {
      title: '媒体',
      show: true,
      items: [
        {
          label: '图片',
          value: detail.images?.length ? detail.images.join('、') : '-',
          type: 'text' as const,
        },
        {
          label: '视频',
          value: detail.videos ? JSON.stringify(detail.videos, null, 2) : '-',
          type: 'text' as const,
        },
      ],
    },
    {
      title: '帖子内容',
      show: true,
      type: 'html' as const,
      content: detail.html || '-',
    },
  ];
}
