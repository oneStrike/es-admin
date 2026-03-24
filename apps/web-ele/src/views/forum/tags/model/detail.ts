import type { ForumTagsDetailResponse } from '#/api/types';

import { formatUTC } from '#/utils';

export function getDetailCards(detail: ForumTagsDetailResponse) {
  return [
    {
      title: '基本信息',
      show: true,
      fields: [
        {
          label: '话题名称',
          value: detail.name,
          type: 'text' as const,
        },
        {
          label: '启用状态',
          value: detail.isEnabled,
          type: 'tag' as const,
          tagText: detail.isEnabled ? '启用' : '禁用',
          tagType: detail.isEnabled ? 'success' : 'danger',
        },
        {
          label: '排序权重',
          value: detail.sortOrder,
          type: 'text' as const,
        },
        {
          label: '使用次数',
          value: detail.useCount,
          type: 'text' as const,
        },
        {
          label: '描述',
          value: detail.description || '-',
          type: 'text' as const,
        },
      ],
    },
    {
      title: '关联帖子',
      show: true,
      fields: [
        {
          label: '最近关联帖子',
          value: detail.topics?.length
            ? detail.topics.map((item) => `${item.title}(ID:${item.id})`).join('；')
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
