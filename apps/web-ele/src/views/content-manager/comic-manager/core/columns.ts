import type { Recordable } from '@vben/types';

import type { BaseComicDto } from '#/api/types';
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
            return row?.map(
              (author: BaseComicDto['comicAuthors'][number]) =>
                author.author.name,
            );
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
            return row?.map(
              (category: BaseComicDto['comicCategories'][number]) =>
                category.category.name,
            );
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
          formatter: (row: BaseComicDto['comicTags']) => {
            return row?.map(
              (tag: BaseComicDto['comicTags'][number]) => tag.tag.name,
            );
          },
        },
      },
    },

    publisher: {
      width: 120,
      formatter: ({ cellValue }: { cellValue?: string }) => {
        const value = cellValue ?? '';
        return work_publisher?.labels[value] ?? value;
      },
    },
    region: {
      width: 120,
      formatter: ({ cellValue }: { cellValue?: string }) => {
        const value = cellValue ?? '';
        return work_region?.labels[value] ?? value;
      },
    },
    language: {
      width: 120,
      formatter: ({ cellValue }: { cellValue?: string }) => {
        const value = cellValue ?? '';
        return work_language?.labels[value] ?? value;
      },
    },
    ageRating: {
      width: 120,
      formatter: ({ cellValue }: { cellValue?: string }) => {
        const value = cellValue ?? '';
        return work_age_rating?.labels[value] ?? value;
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
    createdAt: {
      show: true,
    },
    updatedAt: {
      show: true,
    },
    actions: {
      show: true,
      width: 160,
    },
  });
};
