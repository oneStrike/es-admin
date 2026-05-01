import type { ReportDetailResponse } from '#/api/types';

import { formatUTC } from '#/utils';

import { reasonTypeMap, reportStatusMap } from './shared';

export function getDetailCards(detail: ReportDetailResponse) {
  const status = reportStatusMap[detail.status];
  const reasonType = reasonTypeMap[detail.reasonType];

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
      fields: [
        {
          label: '举报 ID',
          value: detail.id,
          type: 'text' as const,
        },
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
      ],
    },
    {
      title: '举报说明',
      show: true,
      fields: [
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
      fields: [
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
      ],
    },
  ];
}
