import type { ForumModeratorApplicationDto } from '#/api/types';

import { formatUTC } from '#/utils';

import { applicationStatusMap } from './shared';

export function getDetailCards(detail: ForumModeratorApplicationDto) {
  const statusOption = applicationStatusMap[detail.status];

  return [
    {
      title: '',
      show: true,
      fields: [
        {
          label: '申请标题',
          value: detail.applicant?.nickname
            ? `${detail.applicant.nickname} 的版主申请`
            : '版主申请',
          type: 'title',
        },
        {
          label: '申请人',
          value: detail.applicant?.nickname || '-',
          type: 'text',
        },
        {
          label: '申请板块',
          value: detail.section?.name || '-',
          type: 'text',
        },
        {
          label: '当前状态',
          value: detail.status,
          type: 'tag',
          tagText: statusOption?.label || '-',
          tagType: statusOption?.color || 'info',
        },
      ],
    },
    {
      title: '申请信息',
      show: true,
      fields: [
        {
          label: '申请权限',
          value: detail.permissionNames?.join('、') || '-',
          type: 'text',
        },
        {
          label: '申请理由',
          value: detail.reason || '-',
          type: 'text',
        },
        {
          label: '处理备注',
          value: detail.remark || '-',
          type: 'text',
        },
      ],
    },
    {
      title: '审核信息',
      show: true,
      fields: [
        {
          label: '审核人',
          value: detail.auditor?.nickname || '-',
          type: 'text',
        },
        {
          label: '审核意见',
          value: detail.auditReason || '-',
          type: 'text',
        },
        {
          label: '审核时间',
          value: detail.auditAt
            ? formatUTC(detail.auditAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text',
        },
      ],
    },
    {
      title: '板块信息',
      show: true,
      fields: [
        {
          label: '板块名称',
          value: detail.section?.name || '-',
          type: 'text',
        },
        {
          label: '板块描述',
          value: detail.section?.description || '-',
          type: 'text',
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
          type: 'text',
        },
        {
          label: '更新时间',
          value: detail.updatedAt
            ? formatUTC(detail.updatedAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text',
        },
      ],
    },
  ];
}
