import type { Recordable } from '@vben/types';

import type { BaseWorkDto } from '#/api/types';
import type { UseDictItem } from '#/hooks/useDict';

import { formSchemaTransform } from '#/utils';

import { formSchema, serialStatus, viewRuleOptions } from './shared';

export const comicColumns = ({
  work_publisher,
  work_language,
  work_region,
  work_age_rating,
}: Recordable<undefined | UseDictItem>) => {
  return formSchemaTransform.toTableColumns<BaseWorkDto>(formSchema, {
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
    // ========== 权限设置 ==========
    viewRule: {
      width: 100,
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: viewRuleOptions,
        },
      },
    },
    canComment: {
      hide: true,
    },
    canDownload: {
      hide: true,
    },
    canExchange: {
      hide: true,
    },
    requiredViewLevelId: {
      hide: true,
    },
    // ========== 价格设置 ==========
    price: {
      hide: true,
    },
    chapterPrice: {
      hide: true,
    },
    exchangePoints: {
      hide: true,
    },
    chapterExchangePoints: {
      hide: true,
    },
    purchaseCount: {
      hide: true,
    },
    // ========== 发布设置 ==========
    publishAt: {
      hide: true,
    },
    lastUpdated: {
      hide: true,
    },
    // ========== 推荐设置 ==========
    rating: {
      hide: true,
    },
    // ========== 列表展示字段 ==========
    authors: {
      title: '作者',
      width: 240,
      sort: 2,
      cellRender: {
        name: 'CellTag',
        props: {
          formatter: (row: BaseWorkDto['authors']) => {
            return row?.map(
              (author: BaseWorkDto['authors'][number]) => author.author.name,
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
    categories: {
      title: '分类',
      width: 150,
      sort: 4,
      cellRender: {
        name: 'CellTag',
        props: {
          formatter: (row: BaseWorkDto['categories']) => {
            return row?.map(
              (category: BaseWorkDto['categories'][number]) =>
                category.category.name,
            );
          },
        },
      },
    },
    tags: {
      title: '标签',
      width: 150,
      sort: 4,
      cellRender: {
        name: 'CellTag',
        props: {
          formatter: (row: BaseWorkDto['tags']) => {
            return row?.map(
              (tag: BaseWorkDto['tags'][number]) => tag.tag.name,
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
    isPublished: {
      width: 100,
      slots: { default: 'isPublished' },
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
    // ========== 分割线隐藏 ==========
    divider_permission: {
      hide: true,
    },
    divider_price: {
      hide: true,
    },
    divider_publish: {
      hide: true,
    },
    divider_recommend: {
      hide: true,
    },
    divider_copyright: {
      hide: true,
    },
  });
};
