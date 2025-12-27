import type { Recordable } from '@vben/types';

import type { BaseComicDto } from '#/apis/types/comic';
import type { UseDictItem } from '#/hooks/useDict';

import { formSchemaTransform } from '#/utils';

import { formSchema, serialStatus } from './shared';

export const comicColumns = ({
  work_publisher,
  work_language,
  work_region,
  work_age_rating,
}: Recordable<undefined | UseDictItem>) => {
  return formSchemaTransform.toTableColumns<BaseComicDto>(formSchema, {
    name: {
      width: 200,
      fixed: 'left',
      slots: { default: 'name' },
    },
    cover: {
      title: '封面',
      width: 100,
      cellRender: {
        name: 'CellImage',
        props: {
          fit: 'cover',
          height: 60,
          width: 80,
        },
      },
    },
    authorIds: {
      hide: true,
    },
    categoryIds: {
      hide: true,
    },
    tagIds: {
      hide: true,
    },
    description: {
      hide: true,
    },
    remark: {
      hide: true,
    },
    copyright: {
      hide: true,
    },
    disclaimer: {
      hide: true,
    },
    comicAuthors: {
      title: '作者',
      width: 240,
      sort: 2,
      cellRender: {
        name: 'CellTag',
        props: {
          formatter: (row: BaseComicDto['comicAuthors']) => {
            return row?.map((author) => author.author.name);
          },
        },
      },
    },
    serialStatus: {
      title: '连载状态',
      width: 100,
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: serialStatus,
        },
      },
    },
    comicCategories: {
      title: '分类',
      width: 150,
      sort: 4,
      cellRender: {
        name: 'CellTag',
        props: {
          formatter: (row: BaseComicDto['comicCategories']) => {
            return row?.map((category) => category.category.name);
          },
        },
      },
    },
    comicTags: {
      title: '标签',
      width: 150,
      sort: 4,
      cellRender: {
        name: 'CellTag',
        props: {
          formatter: (row: BaseComicDto['comicCategories']) => {
            return row?.map((tag) => tag.tag.name);
          },
        },
      },
    },

    publisher: {
      width: 120,
      formatter: ({ cellValue }) => {
        return work_publisher?.labels[cellValue] ?? cellValue;
      },
    },
    region: {
      width: 120,
      formatter: ({ cellValue }) => {
        return work_region?.labels[cellValue] ?? cellValue;
      },
    },
    language: {
      width: 120,
      formatter: ({ cellValue }) => {
        return work_language?.labels[cellValue] ?? cellValue;
      },
    },
    ageRating: {
      width: 120,
      formatter: ({ cellValue }) => {
        return work_age_rating?.labels[cellValue] ?? cellValue;
      },
    },
    isHot: {
      slots: { default: 'isHot' },
    },
    isNew: {
      slots: { default: 'isNew' },
    },
    recommendWeight: {
      sortable: true,
    },
    isRecommended: {
      width: 120,
      title: '是否推荐',
      slots: { default: 'isRecommended' },
    },
    popularityWeight: {
      sortable: true,
      formatter: ({ cellValue }) => {
        return cellValue || '0';
      },
    },
    createdAt: {
      width: 160,
      sortable: true,
      show: true,
    },
    updatedAt: {
      title: '更新时间',
      width: 160,
      sortable: true,
      cellRender: {
        name: 'CellDate',
      },
    },
    actions: {
      show: true,
      width: 160,
    },
  });
};
