import type { Recordable } from '@vben/types';

import type { BaseWorkDto } from '#/api/types';
import type { UseDictItem } from '#/hooks/useDict';

import { formatUTC } from '#/utils';

import { extractRelationNames } from '../../../work-relations';
import { serialStatusMap } from './shared';

const viewRuleMap: Record<number, string> = {
  0: '所有人',
  1: '登录用户',
  2: '会员用户',
  3: '购买',
  [-1]: '继承',
};

export function getDetailSections(
  detail: BaseWorkDto,
  dataDict: Recordable<undefined | UseDictItem>,
) {
  return [
    {
      title: '',
      show: true,
      items: [
        {
          label: '小说名称',
          value: detail.name,
          type: 'title',
        },
        {
          label: '作者',
          value:
            extractRelationNames(detail.authors, 'author').join(', ') || '-',
          type: 'text',
        },
        {
          label: '分类',
          value:
            extractRelationNames(detail.categories, 'category').join(', ') ||
            '-',
          type: 'text',
        },
        {
          label: '标签',
          value: extractRelationNames(detail.tags, 'tag').join(', ') || '-',
          type: 'text',
        },
      ],
    },
    {
      title: '基本信息',
      show: true,
      items: [
        {
          label: '小说别名',
          value: detail.alias || '-',
          type: 'text',
        },
        {
          label: '出版社',
          value: dataDict.work_publisher?.labels[detail.publisher || ''] || '-',
          type: 'text',
        },
        {
          label: '地区',
          value: dataDict.work_region?.labels[detail.region || ''] || '-',
          type: 'text',
        },
        {
          label: '语言',
          value: dataDict.work_language?.labels[detail.language || ''] || '-',
          type: 'text',
        },
        {
          label: '年龄分级',
          value:
            dataDict.work_age_rating?.labels[detail.ageRating || ''] || '-',
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
      title: '权限设置',
      show: true,
      items: [
        {
          label: '查看规则',
          value: viewRuleMap[detail.viewRule] || '-',
          type: 'text',
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
          label: '阅读会员等级ID',
          value: detail.requiredViewLevelId || '-',
          type: 'text',
        },
      ],
    },
    {
      title: '价格设置',
      show: true,
      items: [
        {
          label: '作品价格',
          value: detail.price || 0,
          type: 'text',
        },
        {
          label: '章节默认价格',
          value: detail.chapterPrice || 0,
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
      title: '状态信息',
      show: true,
      items: [
        {
          label: '发布状态',
          value: detail.isPublished,
          type: 'tag',
          tagText: detail.isPublished ? '已发布' : '未发布',
          tagType: detail.isPublished ? 'success' : 'danger',
        },
        {
          label: '推荐状态',
          value: detail.isRecommended,
          type: 'tag',
          tagText: detail.isRecommended ? '是' : '否',
          tagType: detail.isRecommended ? 'success' : 'info',
        },
        {
          label: '热门状态',
          value: detail.isHot,
          type: 'tag',
          tagText: detail.isHot ? '是' : '否',
          tagType: detail.isHot ? 'success' : 'info',
        },
        {
          label: '新作状态',
          value: detail.isNew,
          type: 'tag',
          tagText: detail.isNew ? '是' : '否',
          tagType: detail.isNew ? 'success' : 'info',
        },
        {
          label: '推荐权重',
          value: detail.recommendWeight || 0,
          type: 'text',
        },
      ],
    },
    {
      title: '统计信息',
      show: true,
      items: [
        {
          label: '浏览量',
          value: detail.viewCount || 0,
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
          label: '下载量',
          value: detail.downloadCount || 0,
          type: 'text',
        },
        {
          label: '评分',
          value: detail.rating
            ? `${detail.rating} (${detail.ratingCount}人)`
            : '0 (0人)',
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
      items: [
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
      title: '小说简介',
      show: true,
      type: 'text',
      content: detail.description || '-',
    },
    {
      title: '版权信息',
      show: true,
      items: [
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
          label: '管理员备注',
          value: detail.remark || '-',
          type: 'text',
        },
      ],
    },
  ];
}
