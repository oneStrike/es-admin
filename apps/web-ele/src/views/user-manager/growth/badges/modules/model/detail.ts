import type { BaseUserBadgeDto } from '#/api/types';

import { badgeTypeMap } from './constants';

export function getDetailSections(detail: BaseUserBadgeDto) {
  return [
    {
      title: '基本信息',
      show: true,
      items: [
        {
          label: '徽章图标',
          value: detail?.icon,
          type: 'image' as const,
        },
        {
          label: '徽章名称',
          value: detail?.name,
          type: 'text' as const,
        },
        {
          label: '徽章类型',
          value: badgeTypeMap[detail?.type] || '-',
          type: 'text' as const,
        },
        {
          label: '事件键',
          value: detail?.eventKey || '-',
          type: 'text' as const,
        },
        {
          label: '排序值',
          value: detail?.sortOrder ?? 0,
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
      title: '描述信息',
      show: true,
      type: 'text' as const,
      content: detail?.description || '-',
    },
    {
      title: '时间信息',
      show: true,
      items: [
        {
          label: '创建时间',
          value: detail?.createdAt,
          type: 'date' as const,
        },
        {
          label: '更新时间',
          value: detail?.updatedAt,
          type: 'date' as const,
        },
      ],
    },
  ];
}
