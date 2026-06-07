import type { AdminAgreementDetailDto } from '#/api/types';

import { formatUTC } from '#/utils';

export function getDetailSections(detail: AdminAgreementDetailDto) {
  return [
    {
      title: '基本信息',
      show: true,
      items: [
        {
          label: '标题',
          value: detail.title,
          type: 'title' as const,
        },
        {
          label: '版本号',
          value: detail.version,
          type: 'text' as const,
        },
        {
          label: '发布状态',
          value: detail.isPublished,
          type: 'tag' as const,
          tagType: detail.isPublished ? 'success' : 'info',
          tagText: detail.isPublished ? '已发布' : '未发布',
        },
        {
          label: '登录注册页展示',
          value: detail.showInAuth,
          type: 'tag' as const,
          tagType: detail.showInAuth ? 'success' : 'info',
          tagText: detail.showInAuth ? '是' : '否',
        },
        {
          label: '强制重新同意',
          value: detail.isForce,
          type: 'tag' as const,
          tagType: detail.isForce ? 'warning' : 'info',
          tagText: detail.isForce ? '是' : '否',
        },
        {
          label: '发布时间',
          value: detail.publishedAt
            ? formatUTC(detail.publishedAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text' as const,
        },
      ],
    },
    {
      title: '协议内容',
      show: true,
      type: 'html' as const,
      content: detail.content || '-',
    },
    {
      title: '管理信息',
      show: true,
      items: [
        {
          label: '创建时间',
          value: formatUTC(detail.createdAt, 'YYYY-MM-DD HH:mm:ss'),
          type: 'text' as const,
        },
        {
          label: '更新时间',
          value: formatUTC(detail.updatedAt, 'YYYY-MM-DD HH:mm:ss'),
          type: 'text' as const,
        },
      ],
    },
  ];
}
