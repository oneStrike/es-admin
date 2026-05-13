import type { VxeGridProps } from '#/adapter/vxe-table';
import type { ContentNovelChapterDetailResponse } from '#/api/types';

import { formSchemaTransform } from '#/utils';

import { chapterFormSchema } from './form';

const hideField = [
  'content',
  'cover',
  'description',
  'price',
  'remark',
  'requiredViewLevelId',
  'workId',
];

const hideFieldConfig = Object.fromEntries(
  hideField.map((field) => [field, { hide: true }]),
);

const selectionColumn: NonNullable<
  VxeGridProps<ContentNovelChapterDetailResponse>['columns']
>[number] = {
  align: 'center',
  fixed: 'left',
  type: 'checkbox',
  width: 48,
};

export const chapterColumns: VxeGridProps<ContentNovelChapterDetailResponse>['columns'] =
  [
    selectionColumn,
    ...formSchemaTransform.toTableColumns<ContentNovelChapterDetailResponse>(
      chapterFormSchema,
      {
        ...hideFieldConfig,
        seq: {
          dragSort: true,
          sort: 1,
        },
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
        title: {
          fixed: 'left',
          showOverflow: 'tooltip',
          slots: { default: 'title' },
          sort: 2,
          width: 220,
        },
        sortOrder: {
          sort: 4,
          sortable: true,
          width: 100,
        },
        viewRule: {
          cellRender: {
            name: 'CellTag',
          },
          sort: 5,
          width: 120,
        },
        isPreview: {
          cellRender: {
            name: 'CellTag',
          },
          sort: 6,
          width: 100,
        },
        canComment: {
          cellRender: {
            name: 'CellTag',
          },
          sort: 7,
          width: 100,
        },
        canDownload: {
          cellRender: {
            name: 'CellTag',
          },
          sort: 8,
          width: 100,
        },
        isPublished: {
          sort: 10,
          slots: { default: 'isPublished' },
          title: '发布状态',
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
          width: 220,
        },
      },
    ),
  ];
