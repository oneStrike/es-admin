import type { AppUpdateReleaseDetailDto } from '#/api/types';

import { formatUTC } from '#/utils';

import {
  platformOptionsObj,
} from './shared';

/**
 * 格式化文件大小
 */
function formatFileSize(bytes?: null | number): string {
  if (!bytes) return '-';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * 获取版本更新详情卡片配置
 * @param detail 版本更新详情数据
 * @returns 卡片配置数组
 */
export function getDetailCards(detail: AppUpdateReleaseDetailDto) {
  // 平台信息
  const platformInfo = platformOptionsObj[detail.platform];

  return [
    {
      title: '基本信息',
      show: true,
      fields: [
        {
          label: '展示版本号',
          value: detail.versionName,
          type: 'title' as const,
        },
        {
          label: '内部构建号',
          value: detail.buildCode,
          type: 'text' as const,
        },
        {
          label: '发布平台',
          value: platformInfo?.label ?? detail.platform,
          type: 'text' as const,
        },
        {
          label: '强制更新',
          value: detail.forceUpdate,
          type: 'tag' as const,
          tagType: detail.forceUpdate ? 'danger' : 'info',
          tagText: detail.forceUpdate ? '是' : '否',
        },
        {
          label: '发布状态',
          value: detail.isPublished,
          type: 'tag' as const,
          tagType: detail.isPublished ? 'success' : 'info',
          tagText: detail.isPublished ? '已发布' : '未发布',
        },
      ],
    },
    {
      title: '安装包信息',
      show: !!(
        detail.packageUrl ||
        detail.packageOriginalName ||
        detail.packageFileSize
      ),
      fields: [
        {
          label: '安装包来源',
          value: detail.packageSourceType === 'url' ? '外部下载地址' : '后台上传',
          type: 'text' as const,
          show: !!detail.packageSourceType,
        },
        {
          label: '安装包地址',
          value: detail.packageUrl || '-',
          type: 'text' as const,
          show: !!detail.packageUrl,
        },
        {
          label: '原始文件名',
          value: detail.packageOriginalName || '-',
          type: 'text' as const,
          show: !!detail.packageOriginalName,
        },
        {
          label: '文件大小',
          value: formatFileSize(detail.packageFileSize),
          type: 'text' as const,
          show: !!detail.packageFileSize,
        },
      ].filter((field) => field.show !== false),
    },
    {
      title: '自定义下载页',
      show: !!detail.customDownloadUrl,
      fields: [
        {
          label: '下载页地址',
          value: detail.customDownloadUrl,
          type: 'text' as const,
        },
      ],
    },
    {
      title: '应用商店地址',
      show: !!(detail.storeLinks && detail.storeLinks.length > 0),
      fields:
        detail.storeLinks?.map((link) => ({
          label: link.channelName,
          value: link.storeUrl,
          type: 'text' as const,
        })) ?? [],
    },
    {
      title: '更新说明',
      show: !!detail.releaseNotes,
      type: 'html' as const,
      content: detail.releaseNotes?.replaceAll('\n', '<br/>') || '-',
    },
    {
      title: '时间信息',
      show: true,
      fields: [
        {
          label: '发布时间',
          value: detail.publishedAt
            ? formatUTC(detail.publishedAt, 'YYYY-MM-DD HH:mm:ss')
            : '-',
          type: 'text' as const,
        },
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
