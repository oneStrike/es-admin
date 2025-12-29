import type { ComicChapterPageResponseDto } from '#/apis/types/comicChapter';

import { formSchemaTransform } from '#/utils';

import { chapterFormSchema } from './form';

// 查看规则映射
const readRuleMap = {
  0: { label: '公开', type: 'success' },
  1: { label: '登录', type: 'info' },
  2: { label: '会员', type: 'warning' },
  3: { label: '购买', type: 'danger' },
};

// 下载规则映射
const downloadRuleMap = {
  0: { label: '禁止', type: 'danger' },
  1: { label: '允许', type: 'success' },
  2: { label: 'VIP可下载', type: 'warning' },
  3: { label: '积分可下载', type: 'info' },
};

// 布尔值映射
const booleanMap = {
  true: { label: '是', type: 'success' },
  false: { label: '否', type: 'default' },
};

// 发布状态映射
const publishStatusMap = {
  true: { label: '已发布', type: 'success' },
  false: { label: '未发布', type: 'warning' },
};

export const chapterColumns = () => {
  return formSchemaTransform.toTableColumns<ComicChapterPageResponseDto>(
    chapterFormSchema,
    {
      title: {
        width: 200,
        fixed: 'left',
      },
      subtitle: {
        width: 200,
      },
      sortOrder: {
        width: 100,
        sortable: true,
      },
      readRule: {
        width: 120,
        cellRender: {
          name: 'CellTag',
          props: {
            mapOptions: readRuleMap,
          },
        },
      },
      downloadRule: {
        width: 120,
        cellRender: {
          name: 'CellTag',
          props: {
            mapOptions: downloadRuleMap,
          },
        },
      },
      isPreview: {
        width: 100,
        cellRender: {
          name: 'CellTag',
          props: {
            mapOptions: booleanMap,
          },
        },
      },
      canComment: {
        width: 100,
        cellRender: {
          name: 'CellTag',
          props: {
            mapOptions: booleanMap,
          },
        },
      },
      isPublished: {
        width: 100,
        cellRender: {
          name: 'CellTag',
          props: {
            mapOptions: publishStatusMap,
          },
        },
      },
      viewCount: {
        width: 100,
        sortable: true,
      },
      commentCount: {
        width: 100,
        sortable: true,
      },
      likeCount: {
        width: 100,
        sortable: true,
      },
      readPoints: {
        width: 100,
      },
      downloadPoints: {
        width: 100,
      },
      createdAt: {
        width: 160,
        sortable: true,
        cellRender: {
          name: 'CellDate',
        },
      },
      updatedAt: {
        width: 160,
        sortable: true,
        cellRender: {
          name: 'CellDate',
        },
      },
      remark: {
        hide: true,
      },
      actions: {
        show: true,
        width: 180,
        fixed: 'right',
      },
    },
  );
};
