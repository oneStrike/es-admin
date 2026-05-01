import type { MessageNotificationTemplatesDetailResponse } from '#/api/types';

import { formatUTC } from '#/utils';

import { formatCategory, getEnabledOption } from './shared';

export function getDetailCards(
  detail: MessageNotificationTemplatesDetailResponse,
) {
  const enabled = getEnabledOption(detail.isEnabled);

  return [
    {
      title: '基本信息',
      show: true,
      fields: [
        {
          label: '模板 ID',
          value: detail.id,
          type: 'text' as const,
        },
        {
          label: '通知分类',
          value: formatCategory(detail),
          type: 'text' as const,
        },
        {
          label: '分类 key',
          value: detail.categoryKey,
          type: 'text' as const,
        },
        {
          label: '启用状态',
          value: enabled.label,
          type: 'tag' as const,
          tagText: enabled.label,
          tagType: enabled.color,
        },
        {
          label: '备注',
          value: detail.remark || '-',
          type: 'text' as const,
        },
      ],
    },
    {
      title: '模板内容',
      show: true,
      fields: [
        {
          label: '标题模板',
          value: detail.titleTemplate,
          type: 'text' as const,
        },
        {
          label: '正文模板',
          value: detail.contentTemplate,
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
