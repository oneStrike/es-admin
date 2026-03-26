import type { BaseAuthorDto } from '#/api/types';

import { GenderEnum } from '#/enum';
import { formatUTC } from '#/utils';
import { getOptionLabel } from '#/utils/options';

import { typeOptions } from './shared';

/**
 * 获取作者详情卡片配置
 * @param detail 作者详情数据
 * @param extraData 额外数据
 * @returns 卡片配置数组
 */
export function getDetailCards(detail: BaseAuthorDto, extraData?: any) {
  // 解析作者类型
  const authorTypes = getOptionLabel(typeOptions, detail.type ?? []);

  // 从额外数据中获取国籍映射
  const nationalityMap = extraData?.nationalityMap || {};

  return [
    {
      title: '作者头像',
      show: !!detail.avatar,
      type: 'image' as const,
      imageUrl: detail.avatar,
    },
    {
      title: '',
      show: true,
      fields: [
        {
          label: '姓名',
          value: detail.name,
          type: 'title' as const,
        },
        {
          label: '性别',
          value: GenderEnum[detail.gender || 0],
          type: 'text' as const,
        },
        {
          label: '国籍',
          value: detail.nationality ? nationalityMap[detail.nationality] : '-',
          type: 'text' as const,
        },
        {
          label: '身份',
          value: authorTypes,
          type: 'text' as const,
        },
        {
          label: '状态',
          value: detail.isEnabled,
          type: 'tag' as const,
          tagType: detail.isEnabled ? 'success' : 'danger',
          tagText: detail.isEnabled ? '启用' : '禁用',
        },
        {
          label: '推荐',
          value: detail.isRecommended,
          type: 'tag' as const,
          tagType: detail.isRecommended ? 'success' : 'info',
          tagText: detail.isRecommended ? '推荐' : '不推荐',
        },
      ],
    },
    {
      title: '作品信息',
      show: true,
      fields: [
        {
          label: '作品数量',
          value: detail.worksCount || 0,
          type: 'text' as const,
        },
        {
          label: '粉丝数量',
          value: detail.followersCount || 0,
          type: 'text' as const,
        },
      ],
    },
    {
      title: '详细信息',
      show: true,
      type: 'text' as const,
      content: detail.description || '-',
    },
    {
      title: '管理信息',
      show: true,
      fields: [
        {
          label: '备注',
          value: detail.remark || '-',
          type: 'text' as const,
        },
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
