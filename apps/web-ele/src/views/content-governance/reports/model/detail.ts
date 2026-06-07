import type { ReportDetailResponse } from '#/api/types';

import { formatUTC } from '#/utils';

import {
  formatActorSummary,
  formatCommentLevel,
  formatReportCommentSummary,
  formatReporterSummary,
  formatReportTargetExtra,
  formatReportTargetSummary,
  formatReportTargetTitle,
  formatSceneExtra,
  formatSceneSummary,
  formatSceneTitle,
  reasonTypeMap,
  reportStatusMap,
  resolveReportCommentState,
  resolveReporterState,
  resolveReportTargetState,
} from './shared';

export function getDetailSections(detail: ReportDetailResponse) {
  const status = reportStatusMap[detail.status];
  const reasonType = reasonTypeMap[detail.reasonType];
  const reporterState = resolveReporterState(detail.reporterSummary);
  const targetState = resolveReportTargetState(detail.targetSummary);
  const commentState = resolveReportCommentState(detail.commentSummary);

  return [
    {
      title: '证据图片',
      show: !!detail.evidenceUrl,
      type: 'image' as const,
      imageUrl: detail.evidenceUrl || undefined,
    },
    {
      title: '基本信息',
      show: true,
      items: [
        {
          label: '举报原因',
          value: reasonType?.label || detail.reasonType,
          type: 'text' as const,
        },
        {
          label: '状态',
          value: status?.label || '-',
          type: 'tag' as const,
          tagText: status?.label || '-',
          tagType: status?.color || 'info',
        },
        {
          label: '评论层级',
          value: formatCommentLevel(detail.commentLevel),
          type: 'text' as const,
        },
      ],
    },
    {
      title: '举报人',
      show: !!detail.reporterSummary,
      items: [
        {
          label: '昵称',
          value: formatReporterSummary(detail.reporterSummary),
          type: 'text' as const,
        },
        {
          label: '用户状态',
          value: reporterState.label,
          type: 'tag' as const,
          tagText: reporterState.label,
          tagType: reporterState.color,
        },
      ],
    },
    {
      title: '业务场景',
      show: !!detail.sceneSummary,
      items: [
        {
          label: '场景类型',
          value: detail.sceneSummary?.sceneTypeName || '-',
          type: 'text' as const,
        },
        {
          label: '场景标题',
          value: formatSceneTitle(detail.sceneSummary),
          type: 'text' as const,
        },
        {
          label: '场景摘要',
          value: formatSceneSummary(detail.sceneSummary),
          type: 'text' as const,
        },
        {
          label: '上级信息',
          value: formatSceneExtra(detail.sceneSummary),
          type: 'text' as const,
        },
      ],
    },
    {
      title: '举报目标',
      show: !!detail.targetSummary,
      items: [
        {
          label: '目标类型',
          value: detail.targetSummary?.targetTypeName || '-',
          type: 'text' as const,
        },
        {
          label: '目标标题',
          value: formatReportTargetTitle(detail.targetSummary),
          type: 'text' as const,
        },
        {
          label: '目标摘要',
          value: formatReportTargetSummary(detail.targetSummary),
          type: 'text' as const,
        },
        {
          label: '关联信息',
          value: formatReportTargetExtra(detail.targetSummary),
          type: 'text' as const,
        },
        {
          label: '目标状态',
          value: targetState.label,
          type: 'tag' as const,
          tagText: targetState.label,
          tagType: targetState.color,
        },
      ],
    },
    {
      title: '被举报评论',
      show: !!detail.commentSummary,
      items: [
        {
          label: '评论摘要',
          value: formatReportCommentSummary(detail.commentSummary),
          type: 'text' as const,
        },
        {
          label: '评论层级',
          value: formatCommentLevel(detail.commentSummary?.commentLevel),
          type: 'text' as const,
        },
        {
          label: '评论状态',
          value: commentState.label,
          type: 'tag' as const,
          tagText: commentState.label,
          tagType: commentState.color,
        },
      ],
    },
    {
      title: '举报说明',
      show: true,
      items: [
        {
          label: '举报说明',
          value: detail.description || '-',
          type: 'text' as const,
        },
      ],
    },
    {
      title: '处理信息',
      show: true,
      items: [
        {
          label: '处理人',
          value: formatActorSummary(detail.handlerSummary),
          type: 'text' as const,
        },
        {
          label: '处理人角色',
          value: detail.handlerSummary?.roleName || '-',
          type: 'text' as const,
        },
        {
          label: '处理备注',
          value: detail.handlingNote || '-',
          type: 'text' as const,
        },
        {
          label: '处理时间',
          value: detail.handledAt
            ? formatUTC(detail.handledAt, 'YYYY-MM-DD HH:mm:ss')
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
      ],
    },
  ];
}
