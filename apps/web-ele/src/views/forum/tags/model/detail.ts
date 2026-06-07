import type { ForumHashtagsDetailResponse } from '#/api/types';

import { formatUTC } from '#/utils';

import { auditRoleMap, auditStatusMap, createSourceTypeMap } from './shared';

export function getDetailSections(detail: ForumHashtagsDetailResponse) {
  const auditStatus = auditStatusMap[detail.auditStatus];
  const createSourceType = createSourceTypeMap[detail.createSourceType];
  const auditRole =
    detail.auditRole === null || detail.auditRole === undefined
      ? undefined
      : auditRoleMap[detail.auditRole];

  return [
    {
      title: '基本信息',
      show: true,
      items: [
        {
          label: '话题名称',
          value: detail.displayName,
          type: 'text' as const,
        },
        {
          label: 'Slug',
          value: detail.slug,
          type: 'text' as const,
        },
        {
          label: '创建来源',
          value: createSourceType?.label || '-',
          type: 'text' as const,
        },
        {
          label: '运营描述',
          value: detail.description || '-',
          type: 'text' as const,
        },
      ],
    },
    {
      title: '状态信息',
      show: true,
      items: [
        {
          label: '审核状态',
          value: auditStatus?.label || '-',
          type: 'tag' as const,
          tagText: auditStatus?.label || '-',
          tagType: auditStatus?.color || 'info',
        },
        {
          label: '隐藏',
          value: detail.isHidden,
          type: 'tag' as const,
          tagText: detail.isHidden ? '是' : '否',
          tagType: detail.isHidden ? 'danger' : 'info',
        },
        {
          label: '人工热度',
          value: detail.manualBoost,
          type: 'text' as const,
        },
      ],
    },
    {
      title: '引用统计',
      show: true,
      items: [
        {
          label: '关注人数',
          value: detail.followerCount,
          type: 'text' as const,
        },
        {
          label: '主题引用数',
          value: detail.topicRefCount,
          type: 'text' as const,
        },
        {
          label: '评论引用数',
          value: detail.commentRefCount,
          type: 'text' as const,
        },
        {
          label: '最近引用时间',
          value: detail.lastReferencedAt
            ? formatUTC(detail.lastReferencedAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text' as const,
        },
      ],
    },
    {
      title: '审核信息',
      show: true,
      items: [
        {
          label: '审核原因',
          value: detail.auditReason || '-',
          type: 'text' as const,
        },
        {
          label: '审核角色',
          value: auditRole?.label || '-',
          type: 'text' as const,
        },
        {
          label: '审核人 ID',
          value: detail.auditById ?? '-',
          type: 'text' as const,
        },
        {
          label: '审核时间',
          value: detail.auditAt
            ? formatUTC(detail.auditAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text' as const,
        },
      ],
    },
    {
      title: '敏感词',
      show: true,
      items: [
        {
          label: '命中数量',
          value: detail.sensitiveWordHits?.length ?? 0,
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
      ],
    },
  ];
}
