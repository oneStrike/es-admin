import type { Recordable } from '@vben/types';

import type { BaseWorkDto } from '#/api/types';
import type { UseDictItem } from '#/hooks/useDict';

import { formSchemaTransform } from '#/utils';

import { extractRelationNames } from '../../../work-relations';
import { formSchema } from './shared';

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

export const novelColumns = ({
  work_age_rating,
  work_language,
  work_publisher,
  work_region,
}: Recordable<undefined | UseDictItem>) => {
  return formSchemaTransform.toTableColumns<BaseWorkDto>(formSchema, {
    ...hideFieldConfig,
    cover: {
      cellRender: {
        name: 'CellImage',
        props: {
          fit: 'cover',
          height: 80,
          width: 60,
        },
      },
      fixed: 'left',
      sort: 1,
      title: '封面',
      width: 60,
    },
    name: {
      fixed: 'left',
      sort: 2,
      slots: { default: 'name' },
      title: '名称',
      width: 200,
    },
    authors: {
      cellRender: {
        name: 'CellTag',
        props: {
          formatter: (row: BaseWorkDto['authors']) => {
            return extractRelationNames(row, 'author');
          },
        },
      },
      sort: 3,
      title: '作者',
      width: 180,
    },
    serialStatus: {
      sort: 4,
      title: '连载状态',
      width: 100,
    },
    categories: {
      cellRender: {
        name: 'CellTag',
        props: {
          formatter: (row: BaseWorkDto['categories']) => {
            return extractRelationNames(row, 'category');
          },
        },
      },
      sort: 5,
      title: '分类',
      width: 150,
    },
    tags: {
      cellRender: {
        name: 'CellTag',
        props: {
          formatter: (row: BaseWorkDto['tags']) => {
            return extractRelationNames(row, 'tag');
          },
        },
      },
      sort: 6,
      title: '标签',
      width: 150,
    },
    isPublished: {
      sort: 7,
      slots: { default: 'isPublished' },
      title: '发布状态',
      width: 100,
    },
    isHot: {
      sort: 8,
      slots: { default: 'isHot' },
      title: '热门',
      width: 80,
    },
    isNew: {
      sort: 9,
      slots: { default: 'isNew' },
      title: '新作',
      width: 80,
    },
    isRecommended: {
      sort: 10,
      slots: { default: 'isRecommended' },
      title: '推荐',
      width: 80,
    },
    publisher: {
      formatter: ({ cellValue }: { cellValue?: string }) => {
        const value = cellValue ?? '';
        return work_publisher?.labels[value] ?? value;
      },
      sort: 11,
      title: '出版社',
      width: 120,
    },
    region: {
      formatter: ({ cellValue }: { cellValue?: string }) => {
        const value = cellValue ?? '';
        return work_region?.labels[value] ?? value;
      },
      sort: 12,
      title: '地区',
      width: 100,
    },
    language: {
      formatter: ({ cellValue }: { cellValue?: string }) => {
        const value = cellValue ?? '';
        return work_language?.labels[value] ?? value;
      },
      sort: 13,
      title: '语言',
      width: 100,
    },
    ageRating: {
      formatter: ({ cellValue }: { cellValue?: string }) => {
        const value = cellValue ?? '';
        return work_age_rating?.labels[value] ?? value;
      },
      sort: 14,
      title: '年龄分级',
      width: 100,
    },
    publishAt: {
      cellRender: {
        name: 'CellDate',
      },
      sortable: true,
      width: 160,
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
