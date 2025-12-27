import type { BaseClientPageDto } from '#/apis/types/clientPage';

import { formatUTC } from '#/utils';
import { getOptionLabel } from '#/utils/options';
import { enablePlatform } from '#/views/app-manager/notice/shared';

import { accessLevelObj } from './shared';

/**
 * 获取页面配置详情卡片配置
 * @param detail 页面配置详情数据
 * @returns 卡片配置数组
 */
export function getDetailCards(detail: BaseClientPageDto) {
  // 计算权限级别信息
  const accessLevelInfo = accessLevelObj[detail.accessLevel];

  // 计算平台标签
  const enablePlatformLabels = getOptionLabel(
    enablePlatform,
    detail.enablePlatform,
  );

  return [
    {
      title: '基本信息',
      show: true,
      fields: [
        {
          label: '页面名称',
          value: detail?.name,
          type: 'text' as const,
        },
        {
          label: '页面路径',
          value: detail?.path,
          type: 'text' as const,
        },
        {
          label: '页面代码',
          value: detail?.code,
          type: 'text' as const,
        },
        {
          label: '权限级别',
          value: accessLevelInfo?.label,
          type: 'colored-text' as const,
          color: accessLevelInfo?.color,
        },
        {
          label: '启用平台',
          value: enablePlatformLabels || '-',
          type: 'text' as const,
        },
        {
          label: '页面状态',
          value: detail?.isEnabled ? '启用' : '禁用',
          type: 'text' as const,
        },
        {
          label: '页面描述',
          value: detail?.pageDescription || '-',
          type: 'text' as const,
        },
        {
          label: '页面标题',
          value: detail?.title || '-',
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
    {
      title: '页面配置',
      show: !!detail?.pageConfig,
      type: 'json' as const,
      content: detail?.pageConfig,
    },
  ];
}
