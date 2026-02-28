import type { ChapterPageResponse } from '#/api/types';

import { formSchemaTransform } from '#/utils';

import { chapterFormSchema, readRule } from './form';

export const chapterColumns =
  formSchemaTransform.toTableColumns<ChapterPageResponse>(chapterFormSchema, {
    seq: {
      dragSort: true,
    },
    title: {
      width: 200,
      fixed: 'left',
      showOverflow: 'tooltip',
      slots: { default: 'title' },
    },
    subtitle: {
      width: 200,
    },
    sortOrder: {
      title: '章节序号',
      width: 100,
      sortable: true,
    },
    cover: {
      hide: true,
    },
    viewRule: {
      width: 120,
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: readRule,
        },
      },
    },
    isPreview: {
      width: 100,
      cellRender: {
        name: 'CellTag',
      },
    },
    canComment: {
      width: 100,
      cellRender: {
        name: 'CellTag',
      },
    },
    canDownload: {
      width: 100,
      cellRender: {
        name: 'CellTag',
      },
    },
    canExchange: {
      width: 100,
      cellRender: {
        name: 'CellTag',
      },
    },
    price: {
      hide: true,
    },
    exchangePoints: {
      hide: true,
    },
    requiredViewLevelId: {
      hide: true,
    },
    isPublished: {
      width: 100,
      slots: { default: 'isPublished' },
    },
    publishAt: {
      hide: true,
    },
    content: {
      hide: true,
    },
    description: {
      hide: true,
    },
    remark: {
      hide: true,
    },
    createdAt: {
      width: 160,
      sortable: true,
      cellRender: {
        name: 'CellDate',
      },
    },
    actions: {
      show: true,
    },
  });
