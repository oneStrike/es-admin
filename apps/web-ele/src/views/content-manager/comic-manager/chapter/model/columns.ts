import type { VxeGridProps } from '#/adapter/vxe-table';
import type { ContentComicChapterDetailResponse } from '#/api/types';

import { formSchemaTransform } from '#/utils';

import { chapterFormSchema } from './form';

/**
 * 章节表格列配置
 * 参考作品管理(core)的列配置模式
 */
const hideField = [
  'workId',
  'cover',
  'price',
  'requiredViewLevelId',
  'content',
  'description',
  'remark',
];

const hideFieldConfig = Object.fromEntries(
  hideField.map((field) => [field, { hide: true }]),
);

const selectionColumn: NonNullable<
  VxeGridProps<ContentComicChapterDetailResponse>['columns']
>[number] = {
  align: 'center',
  fixed: 'left',
  type: 'checkbox',
  width: 48,
};

export const chapterColumns: VxeGridProps<ContentComicChapterDetailResponse>['columns'] =
  [
    selectionColumn,
    ...formSchemaTransform.toTableColumns<ContentComicChapterDetailResponse>(
      chapterFormSchema,
      {
        ...hideFieldConfig,
        seq: {
          dragSort: true,
          sort: 1,
        },
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
        title: {
          width: 200,
          sort: 2,
          fixed: 'left',
          showOverflow: 'tooltip',
          slots: { default: 'title' },
        },
        sortOrder: {
          width: 100,
          sort: 4,
          sortable: true,
        },
        viewRule: {
          width: 120,
          sort: 5,
          cellRender: {
            name: 'CellTag',
          },
        },
        isPreview: {
          width: 100,
          sort: 6,
          cellRender: {
            name: 'CellTag',
          },
        },
        canComment: {
          width: 100,
          sort: 7,
          cellRender: {
            name: 'CellTag',
          },
        },
        canDownload: {
          width: 100,
          sort: 8,
          cellRender: {
            name: 'CellTag',
          },
        },
        isPublished: {
          width: 100,
          sort: 10,
          title: '发布状态',
          slots: { default: 'isPublished' },
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
          width: 180,
        },
      },
    ),
  ];
