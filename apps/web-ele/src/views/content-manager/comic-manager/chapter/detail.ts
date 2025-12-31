import type { ComicChapterDetailDto } from '#/apis/types/comicChapter';

import { formatUTC } from '#/utils';
import { readRuleMap, downloadRuleMap } from './form';

// 定义卡片配置函数
export function getDetailCards(detail: ComicChapterDetailDto) {
  return [
    {
      title: '',
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
          value: detail.sortOrder || 0,
          type: 'text',
        },
        {
          label: '关联漫画',
          value: detail.relatedComic?.name || '-',
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
          value: readRuleMap[detail.readRule] || '-',
          type: 'text',
        },
        {
          label: '下载规则',
          value: downloadRuleMap[detail.downloadRule] || '-',
          type: 'text',
        },
        {
          label: '试读章节',
          value: detail.isPreview,
          type: 'tag',
          tagType: detail.isPreview ? 'success' : 'info',
          tagText: detail.isPreview ? '是' : '否',
        },
        {
          label: '允许评论',
          value: detail.canComment,
          type: 'tag',
          tagType: detail.canComment ? 'success' : 'info',
          tagText: detail.canComment ? '是' : '否',
        },
        {
          label: '查看等级',
          value: detail.requiredReadLevel?.name || '-',
          type: 'text',
        },
        {
          label: '下载等级',
          value: detail.requiredDownloadLevel?.name || '-',
          type: 'text',
        },
      ],
    },
    {
      title: '积分设置',
      show: true,
      fields: [
        {
          label: '购买所需积分',
          value: detail.readPoints || 0,
          type: 'text',
        },
        {
          label: '下载所需积分',
          value: detail.downloadPoints || 0,
          type: 'text',
        },
      ],
    },
    {
      title: '状态信息',
      show: true,
      fields: [
        {
          label: '发布状态',
          value: detail.isPublished,
          type: 'tag',
          tagType: detail.isPublished ? 'success' : 'danger',
          tagText: detail.isPublished ? '已发布' : '未发布',
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
      title: '章节内容',
      show: true,
      fields: [
        {
          label: '章节描述',
          value: detail.description || '-',
          type: 'text',
        },
        {
          label: '章节缩略图',
          value: detail.thumbnail || '-',
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
          label: '漫画ID',
          value: detail.comicId || '-',
          type: 'text',
        },
        {
          label: '查看等级ID',
          value: detail.requiredReadLevelId || '-',
          type: 'text',
        },
        {
          label: '下载等级ID',
          value: detail.requiredDownloadLevelId || '-',
          type: 'text',
        },
      ],
    },
  ];
}
