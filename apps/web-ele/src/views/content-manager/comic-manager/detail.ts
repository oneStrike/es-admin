import type { BaseComicDto } from '#/apis/types/comic';

import { formatUTC } from '#/utils';

import { serialStatusMap } from './shared';

// 定义卡片配置函数
export function getDetailCards(detail: BaseComicDto) {
  return [
    {
      title: '',
      show: true,
      fields: [
        {
          label: '漫画名称',
          value: detail.name,
          type: 'title',
        },
        {
          label: '作者',
          value:
            detail.comicAuthors?.map((author) => author.name).join(', ') || '-',
          type: 'text',
        },
        {
          label: '分类',
          value:
            detail.comicCategories
              ?.map((category) => category.name)
              .join(', ') || '-',
          type: 'text',
        },
        {
          label: '标签',
          value: detail.comicTags?.map((tag) => tag.name).join(', ') || '-',
          type: 'text',
        },
      ],
    },
    {
      title: '基本信息',
      show: true,
      fields: [
        {
          label: '漫画别名',
          value: detail.alias || '-',
          type: 'text',
        },
        {
          label: '出版社',
          value: detail.publisher || '-',
          type: 'text',
        },
        {
          label: '地区',
          value: detail.region || '-',
          type: 'text',
        },
        {
          label: '语言',
          value: detail.language || '-',
          type: 'text',
        },
        {
          label: '年龄分级',
          value: detail.ageRating || '-',
          type: 'text',
        },
        {
          label: '连载状态',
          value: serialStatusMap[detail.serialStatus || 0] || '-',
          type: 'text',
        },
        {
          label: '原始来源',
          value: detail.originalSource || '-',
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
        {
          label: '推荐状态',
          value: detail.isRecommended,
          type: 'tag',
          tagType: detail.isRecommended ? 'success' : 'info',
          tagText: detail.isRecommended ? '是' : '否',
        },
        {
          label: '热门状态',
          value: detail.isHot,
          type: 'tag',
          tagType: detail.isHot ? 'success' : 'info',
          tagText: detail.isHot ? '是' : '否',
        },
        {
          label: '新作状态',
          value: detail.isNew,
          type: 'tag',
          tagType: detail.isNew ? 'success' : 'info',
          tagText: detail.isNew ? '是' : '否',
        },
      ],
    },
    {
      title: '统计信息',
      show: true,
      fields: [
        {
          label: '总阅读量',
          value: detail.totalViews || 0,
          type: 'text',
        },
        {
          label: '收藏数',
          value: detail.favoriteCount || 0,
          type: 'text',
        },
        {
          label: '点赞数',
          value: detail.likeCount || 0,
          type: 'text',
        },
        {
          label: '评分',
          value: detail.rating || 0,
          type: 'text',
        },
        {
          label: '热度值',
          value: detail.popularity || 0,
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
          label: '最后更新',
          value: detail.lastUpdated
            ? formatUTC(detail.lastUpdated, 'YYYY-MM-DD')
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
      title: '漫画简介',
      show: true,
      type: 'text',
      content: detail.description || '-',
    },
    {
      title: '高级信息',
      show: true,
      fields: [
        {
          label: '版权信息',
          value: detail.copyright || '-',
          type: 'text',
        },
        {
          label: '免责声明',
          value: detail.disclaimer || '-',
          type: 'text',
        },
        {
          label: '推荐权重',
          value: detail.recommendWeight || 0,
          type: 'text',
        },
        {
          label: '热度权重',
          value: detail.popularityWeight || 0,
          type: 'text',
        },
        {
          label: '热度值',
          value: detail.popularity || 0,
          type: 'text',
        },
        {
          label: '管理员备注',
          value: detail.remark || '-',
          type: 'text',
        },
      ],
    },
  ];
}
