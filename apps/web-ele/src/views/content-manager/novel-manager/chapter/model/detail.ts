import type { ContentNovelChapterDetailResponse } from '#/api/types';

import { formatUTC } from '#/utils';

import { readRuleMap } from './form';

export function getDetailCards(detail: ContentNovelChapterDetailResponse) {
  return [
    {
      title: '基本信息',
      show: true,
      fields: [
        {
          label: '章节标题',
          value: detail.title,
          type: 'title',
        },
        {
          label: '章节副标题',
          value: detail.subtitle || '-',
          type: 'text',
        },
        {
          label: '章节序号',
          value: detail.sortOrder ?? 0,
          type: 'text',
        },
        {
          label: '发布状态',
          value: detail.isPublished,
          type: 'tag',
          tagText: detail.isPublished ? '已发布' : '未发布',
          tagType: detail.isPublished ? 'success' : 'danger',
        },
        {
          label: '关联作品',
          value: detail.work?.name || '-',
          type: 'text',
        },
        {
          label: '章节描述',
          value: detail.description || '-',
          type: 'text',
        },
      ],
    },
    {
      title: '权限设置',
      show: true,
      fields: [
        {
          label: '查看规则',
          value: readRuleMap[detail.viewRule] || '-',
          type: 'tag',
          tagType: detail.viewRule === -1 ? 'info' : 'primary',
        },
        {
          label: '试读章节',
          value: detail.isPreview,
          type: 'tag',
          tagText: detail.isPreview ? '是' : '否',
          tagType: detail.isPreview ? 'success' : 'info',
        },
        {
          label: '允许评论',
          value: detail.canComment,
          type: 'tag',
          tagText: detail.canComment ? '是' : '否',
          tagType: detail.canComment ? 'success' : 'info',
        },
        {
          label: '允许下载',
          value: detail.canDownload,
          type: 'tag',
          tagText: detail.canDownload ? '是' : '否',
          tagType: detail.canDownload ? 'success' : 'info',
        },
        {
          label: '查看等级',
          value: detail.requiredViewLevel?.name || '-',
          type: 'text',
        },
      ],
    },
    {
      title: '价格设置',
      show: true,
      fields: [
        {
          label: '章节价格',
          value: `${detail.price || 0}`,
          type: 'text',
        },
      ],
    },
    {
      title: '统计信息',
      show: true,
      fields: [
        {
          label: '浏览量',
          value: detail.viewCount || 0,
          type: 'text',
        },
        {
          label: '点赞数',
          value: detail.likeCount || 0,
          type: 'text',
        },
        {
          label: '评论数',
          value: detail.commentCount || 0,
          type: 'text',
        },
        {
          label: '购买数',
          value: detail.purchaseCount || 0,
          type: 'text',
        },
        {
          label: '下载量',
          value: detail.downloadCount || 0,
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
        {
          label: '发布日期',
          value: detail.publishAt
            ? formatUTC(detail.publishAt, 'YYYY-MM-DD')
            : '-',
          type: 'text',
        },
      ],
    },
    {
      title: '高级信息',
      show: true,
      fields: [
        {
          label: '管理员备注',
          value: detail.remark || '-',
          type: 'text',
        },
        {
          label: '章节ID',
          value: detail.id || '-',
          type: 'text',
        },
        {
          label: '作品ID',
          value: detail.workId || '-',
          type: 'text',
        },
        {
          label: '查看等级ID',
          value: detail.requiredViewLevelId || '-',
          type: 'text',
        },
      ],
    },
  ];
}
