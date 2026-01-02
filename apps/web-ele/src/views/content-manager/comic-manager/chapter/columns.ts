import type { ComicChapterPageResponseDto } from '#/apis/types/comicChapter';

import { formSchemaTransform } from '#/utils';

import { chapterFormSchema, downloadRule, readRule } from './form';

export const chapterColumns =
  formSchemaTransform.toTableColumns<ComicChapterPageResponseDto>(
    chapterFormSchema,
    {
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
      readRule: {
        width: 120,
        cellRender: {
          name: 'CellTag',
          props: {
            mapOptions: readRule,
          },
        },
      },
      downloadRule: {
        width: 120,
        cellRender: {
          name: 'CellTag',
          props: {
            mapOptions: downloadRule,
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
      isPublished: {
        width: 100,
        slots: { default: 'isPublished' },
      },
      readPoints: {
        hide: true,
      },
      downloadPoints: {
        hide: true,
      },
      requiredDownloadLevelId: {
        hide: true,
      },
      requiredReadLevelId: {
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
    },
  );
