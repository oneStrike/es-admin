import type { BaseForumSectionGroupDto } from '#/api/types';

import { formatUTC } from '#/utils';

/**
 * 获取板块组详情卡片配置
 * @param detail 板块组详情数据
 * @returns 卡片配置数组
 */
export function getDetailSections(detail: BaseForumSectionGroupDto) {
  return [
    {
      title: '基本信息',
      show: true,
      items: [
        {
          label: '分组名称',
          value: detail?.name,
          type: 'text' as const,
        },
        {
          label: '分组状态',
          value: detail?.isEnabled ? '启用' : '禁用',
          type: 'tag' as const,
          tagText: detail?.isEnabled ? '启用' : '禁用',
          tagType: detail?.isEnabled ? 'success' : 'info',
        },
        {
          label: '排序权重',
          value: detail?.sortOrder,
          type: 'text' as const,
        },
        {
          label: '版主数量上限',
          value: detail?.maxModerators,
          type: 'text' as const,
        },
        {
          label: '分组描述',
          value: detail?.description || '-',
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
          value: detail?.createdAt
            ? formatUTC(detail.createdAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text' as const,
        },
        {
          label: '更新时间',
          value: detail?.updatedAt
            ? formatUTC(detail.updatedAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text' as const,
        },
      ],
    },
  ];
}
