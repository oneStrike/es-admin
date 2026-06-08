import type { ForumModeratorDto } from '#/api/types';

import { formatUTC } from '#/utils';

import { moderatorRoleMap } from './shared';

export function getDetailSections(detail: ForumModeratorDto) {
  return [
    {
      title: '基本信息',
      show: true,
      items: [
        {
          label: '昵称',
          value: detail.nickname,
          type: 'text' as const,
        },
        {
          label: '角色类型',
          value: moderatorRoleMap[detail.roleType]?.label || '-',
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
          label: '所属分组',
          value: detail.group?.name || '-',
          type: 'text' as const,
        },
        {
          label: '备注',
          value: detail.remark || '-',
          type: 'text' as const,
        },
      ],
    },
    {
      title: '权限与板块',
      show: true,
      items: [
        {
          label: '权限名称',
          value: detail.permissionNames?.length
            ? detail.permissionNames.join('、')
            : '-',
          type: 'text' as const,
        },
        {
          label: '管理板块',
          value: detail.sections?.length
            ? detail.sections.map((item) => item.name).join('；')
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
