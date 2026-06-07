import type { CommentDetailResponse } from '#/api/types';

import { formatUTC } from '#/utils';

import {
  auditRoleMap,
  auditStatusMap,
  formatActorSummary,
  formatCommentTargetExtra,
  formatCommentTargetSummary,
  formatCommentTargetTitle,
  formatCommentUser,
  formatSensitiveWordHit,
  resolveCommentTargetState,
  toPlainTextFromHtml,
  userStatusMap,
} from './shared';

export function getDetailSections(detail: CommentDetailResponse) {
  const auditStatus = auditStatusMap[detail.auditStatus];
  const userStatus = detail.user
    ? userStatusMap[detail.user.status]
    : undefined;
  const replyUserStatus = detail.replyTo?.user
    ? userStatusMap[detail.replyTo.user.status]
    : undefined;
  const auditRole =
    detail.auditRole === null || detail.auditRole === undefined
      ? undefined
      : auditRoleMap[detail.auditRole];
  const targetState = resolveCommentTargetState(detail.targetSummary);
  let userEnabledTagText = '-';
  let userEnabledTagType = 'info';

  if (detail.user) {
    userEnabledTagText = detail.user.isEnabled ? '启用' : '禁用';
    userEnabledTagType = detail.user.isEnabled ? 'success' : 'danger';
  }

  return [
    {
      title: '基本信息',
      show: true,
      items: [
        {
          label: '评论用户',
          value: formatCommentUser(detail.user),
          type: 'text' as const,
        },
        {
          label: '用户状态',
          value: userStatus?.label || '-',
          type: 'tag' as const,
          tagText: userStatus?.label || '-',
          tagType: userStatus?.color || 'info',
        },
        {
          label: '用户启用',
          value: detail.user?.isEnabled,
          type: 'tag' as const,
          tagText: userEnabledTagText,
          tagType: userEnabledTagType,
        },
        {
          label: '楼层',
          value: detail.floor ?? '-',
          type: 'text' as const,
        },
        {
          label: '点赞数',
          value: detail.likeCount,
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
          label: '审核角色',
          value: auditRole?.label || '-',
          type: 'text' as const,
        },
        {
          label: '审核人',
          value: formatActorSummary(detail.auditorSummary),
          type: 'text' as const,
        },
        {
          label: '审核人角色',
          value: detail.auditorSummary?.roleName || '-',
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
          label: '审核原因',
          value: detail.auditReason || '-',
          type: 'text' as const,
        },
      ],
    },
    {
      title: '评论对象',
      show: !!detail.targetSummary,
      items: [
        {
          label: '对象类型',
          value:
            detail.targetSummary?.targetTypeName ||
            (detail.targetSummary
              ? `类型 ${detail.targetSummary.targetType}`
              : '-'),
          type: 'text' as const,
        },
        {
          label: '对象标题',
          value: formatCommentTargetTitle(detail.targetSummary),
          type: 'text' as const,
        },
        {
          label: '对象摘要',
          value: formatCommentTargetSummary(detail.targetSummary),
          type: 'text' as const,
        },
        {
          label: '所属信息',
          value: formatCommentTargetExtra(detail.targetSummary),
          type: 'text' as const,
        },
        {
          label: '对象状态',
          value: targetState.label,
          type: 'tag' as const,
          tagText: targetState.label,
          tagType: targetState.color,
        },
      ],
    },
    {
      title: '回复关系',
      show: !!detail.replyTo,
      items: [
        {
          label: '被回复用户',
          value: detail.replyTo?.user
            ? formatCommentUser(detail.replyTo.user)
            : '-',
          type: 'text' as const,
        },
        {
          label: '被回复用户状态',
          value: replyUserStatus?.label || '-',
          type: 'tag' as const,
          tagText: replyUserStatus?.label || '-',
          tagType: replyUserStatus?.color || 'info',
        },
        {
          label: '被回复摘要',
          value: detail.replyTo
            ? toPlainTextFromHtml(detail.replyTo.html)
            : '-',
          type: 'text' as const,
        },
      ],
    },
    {
      title: '评论正文',
      show: true,
      items: [
        {
          label: '评论正文',
          value: toPlainTextFromHtml(detail.html),
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
        {
          label: '命中词',
          value:
            detail.sensitiveWordHits
              ?.map((item) => formatSensitiveWordHit(item))
              .join('、') || '-',
          type: 'text' as const,
        },
        {
          label: '替换建议',
          value:
            detail.sensitiveWordHits
              ?.filter((item) => item.replaceWord)
              .map((item) => `${item.word} -> ${item.replaceWord}`)
              .join('、') || '-',
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
