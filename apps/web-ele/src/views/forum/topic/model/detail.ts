import type { ForumTopicDetailResponse } from '#/api/types';

import { formatUTC } from '#/utils';

import { auditStatusMap } from './shared';

function getAuditRoleLabel(role?: null | number) {
  if (role === 0) return '版主';
  if (role === 1) return '管理员';
  return '-';
}

export function getDetailCards(detail: ForumTopicDetailResponse) {
  return [
    {
      title: '基本信息',
      show: true,
      fields: [
        {
          label: '帖子标题',
          value: detail.title,
          type: 'text' as const,
        },
        {
          label: '所属板块',
          value: detail.section?.name || `ID:${detail.sectionId}`,
          type: 'text' as const,
        },
        {
          label: '发帖用户',
          value: detail.user?.nickname || `ID:${detail.userId}`,
          type: 'text' as const,
        },
        {
          label: '用户状态',
          value: detail.user?.isEnabled,
          type: 'tag' as const,
          tagText: detail.user?.isEnabled ? '启用' : '禁用',
          tagType: detail.user?.isEnabled ? 'success' : 'danger',
        },
        {
          label: '审核状态',
          value: auditStatusMap[detail.auditStatus]?.label || '-',
          type: 'text' as const,
        },
        {
          label: '审核角色',
          value: getAuditRoleLabel(detail.auditRole),
          type: 'text' as const,
        },
      ],
    },
    {
      title: '状态与互动',
      show: true,
      fields: [
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
          label: '回复数',
          value: detail.replyCount,
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
      title: '审核与标签',
      show: true,
      fields: [
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
          label: '关联标签',
          value: detail.topicTags?.length
            ? detail.topicTags.map((item) => `#${item.tagId}`).join('、')
            : '-',
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
          label: '最后回复时间',
          value: detail.lastReplyAt
            ? formatUTC(detail.lastReplyAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text' as const,
        },
      ],
    },
    {
      title: '帖子内容',
      show: true,
      fields: [
        {
          label: '内容',
          value: detail.content || '-',
          type: 'text' as const,
        },
      ],
    },
  ];
}
