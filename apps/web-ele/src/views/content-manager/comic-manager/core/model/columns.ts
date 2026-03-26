import type { Recordable } from '@vben/types';

import type { BaseWorkDto } from '#/api/types';
import type { UseDictItem } from '#/hooks/useDict';

import { formSchemaTransform } from '#/utils';

import { extractRelationNames } from '../../../work-relations';
import { formSchema, serialStatus } from './shared';

const hideField = [
  'authorIds',
  'alias',
  'recommendWeight',
  'originalSource',
  'categoryIds',
  'tagIds',
  'description',
  'remark',
  'copyright',
  'disclaimer',
  'viewRule',
  'canComment',
  'canDownload',
  'price',
  'chapterPrice',
  'purchaseCount',
  'requiredViewLevelId',
  'lastUpdated',
  'rating',
];

const hideFieldConfig = Object.fromEntries(
  hideField.map((field) => [field, { hide: true }]),
);

export const comicColumns = ({
  work_publisher,
  work_language,
  work_region,
  work_age_rating,
}: Recordable<undefined | UseDictItem>) => {
  return formSchemaTransform.toTableColumns<BaseWorkDto>(formSchema, {
    ...hideFieldConfig,
    // ========== 核心信息（优先展示） ==========
    cover: {
      title: '封面',
      width: 60,
      sort: 1,
      fixed: 'left',
      cellRender: {
        name: 'CellImage',
        props: {
          fit: 'cover',
          height: 80,
          width: 60,
        },
      },
    },
    name: {
      title: '名称',
      width: 200,
      sort: 2,
      fixed: 'left',
      slots: { default: 'name' },
    },
    authors: {
      title: '作者',
      width: 180,
      sort: 3,
      cellRender: {
        name: 'CellTag',
        props: {
          formatter: (row: BaseWorkDto['authors']) => {
            return extractRelationNames(row, 'author');
          },
        },
      },
    },
    serialStatus: {
      title: '连载状态',
      width: 100,
      sort: 4,
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: serialStatus,
        },
      },
    },

    // ========== 内容分类 ==========
    categories: {
      title: '分类',
      width: 150,
      sort: 5,
      cellRender: {
        name: 'CellTag',
        props: {
          formatter: (row: BaseWorkDto['categories']) => {
            return extractRelationNames(row, 'category');
          },
        },
      },
    },
    tags: {
      title: '标签',
      width: 150,
      sort: 6,
      cellRender: {
        name: 'CellTag',
        props: {
          formatter: (row: BaseWorkDto['tags']) => {
            return extractRelationNames(row, 'tag');
          },
        },
      },
    },

    // ========== 状态标识 ==========
    isPublished: {
      title: '发布状态',
      width: 100,
      sort: 7,
      slots: { default: 'isPublished' },
    },
    isHot: {
      title: '热门',
      width: 80,
      sort: 8,
      slots: { default: 'isHot' },
    },
    isNew: {
      title: '新作',
      width: 80,
      sort: 9,
      slots: { default: 'isNew' },
    },
    isRecommended: {
      title: '推荐',
      width: 80,
      sort: 10,
      slots: { default: 'isRecommended' },
    },

    // ========== 补充信息 ==========
    publisher: {
      title: '出版社',
      width: 120,
      sort: 11,
      formatter: ({ cellValue }: { cellValue?: string }) => {
        const value = cellValue ?? '';
        return work_publisher?.labels[value] ?? value;
      },
    },
    region: {
      title: '地区',
      width: 100,
      sort: 12,
      formatter: ({ cellValue }: { cellValue?: string }) => {
        const value = cellValue ?? '';
        return work_region?.labels[value] ?? value;
      },
    },
    language: {
      title: '语言',
      width: 100,
      sort: 13,
      formatter: ({ cellValue }: { cellValue?: string }) => {
        const value = cellValue ?? '';
        return work_language?.labels[value] ?? value;
      },
    },
    ageRating: {
      title: '年龄分级',
      width: 100,
      sort: 14,
      formatter: ({ cellValue }: { cellValue?: string }) => {
        const value = cellValue ?? '';
        return work_age_rating?.labels[value] ?? value;
      },
    },
    publishAt: {
      cellRender: {
        name: 'CellDate',
      },
      width: 160,
      sortable: true,
    },

    updatedAt: {
      show: true,
    },
    createdAt: {
      show: true,
    },
    actions: {
      show: true,
      width: 160,
    },
  });
};
