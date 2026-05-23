import type { BasicOption } from '@vben/types';

import type { BaseEmojiAssetDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { UploadSceneEnum } from '#/enum/api';
import { formSchemaTransform } from '#/utils';

import {
  emojiAnimatedOptions,
  emojiEnableOptions,
  emojiKindOptions,
  getEmojiPackLabel,
} from './shared';

export const emojiAssetFormSchema: EsFormSchema = [
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      filterable: true,
      options: [],
      placeholder: '请选择所属表情包',
    },
    fieldName: 'packId',
    label: '所属表情包',
    rules: 'required',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      class: 'w-full',
      options: emojiKindOptions,
    },
    defaultValue: 2,
    fieldName: 'kind',
    label: '资源类型',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      maxlength: 64,
      placeholder: '请输入短码，例如 smile',
      showWordLimit: true,
    },
    dependencies: {
      show: ({ kind }) => Number(kind) === 2,
      triggerFields: ['kind'],
    },
    fieldName: 'shortcode',
    label: '短码',
  },
  {
    component: 'Input',
    componentProps: {
      maxlength: 120,
      placeholder: '请输入 Unicode 序列，例如 1F600 或 U+1F600',
      showWordLimit: true,
    },
    dependencies: {
      show: ({ kind }) => Number(kind) === 1,
      triggerFields: ['kind'],
    },
    fieldName: 'unicodeSequence',
    label: 'Unicode 序列',
  },
  {
    component: 'Upload',
    componentProps: {
      accept: 'image/*',
      maxCount: 1,
      multiple: false,
      placeholder: '请上传表情资源',
      scene: UploadSceneEnum.SHARED,
    },
    dependencies: {
      show: ({ kind }) => Number(kind) === 2,
      triggerFields: ['kind'],
    },
    fieldName: 'imageUrl',
    formItemClass: 'col-span-2',
    label: '动态资源',
  },
  {
    component: 'Upload',
    componentProps: {
      accept: 'image/*',
      maxCount: 1,
      multiple: false,
      placeholder: '可选：请上传静态资源',
      scene: UploadSceneEnum.SHARED,
    },
    dependencies: {
      show: ({ kind }) => Number(kind) === 2,
      triggerFields: ['kind'],
    },
    fieldName: 'staticUrl',
    formItemClass: 'col-span-2',
    label: '静态资源',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      class: 'w-full',
      options: emojiAnimatedOptions,
    },
    defaultValue: false,
    dependencies: {
      show: ({ kind }) => Number(kind) === 2,
      triggerFields: ['kind'],
    },
    fieldName: 'isAnimated',
    label: '是否动图',
  },
  {
    component: 'Input',
    componentProps: {
      maxlength: 64,
      placeholder: '请输入资源分类',
      showWordLimit: true,
    },
    fieldName: 'category',
    label: '分类',
  },
  {
    component: 'InputNumber',
    componentProps: {
      align: 'left',
      class: '!w-full',
      controlsPosition: 'right',
      min: 0,
      placeholder: '请输入排序值（数字越小越靠前）',
    },
    defaultValue: 0,
    fieldName: 'sortOrder',
    label: '排序',
    rules: 'required',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      class: 'w-full',
      options: emojiEnableOptions,
    },
    defaultValue: true,
    fieldName: 'isEnabled',
    label: '状态',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入关键词，支持多语言内容',
      rows: 4,
      type: 'textarea',
    },
    fieldName: 'keywords',
    formItemClass: 'col-span-2',
    label: '关键词',
  },
];

export const emojiAssetSearchSchema = formSchemaTransform.toSearchSchema(
  emojiAssetFormSchema,
  {
    kind: {
      show: true,
    },
    category: {
      show: true,
    },
    shortcode: {
      show: true,
    },
    isEnabled: {
      show: true,
      component: 'Select',
      componentProps: {
        options: emojiEnableOptions,
        placeholder: '状态',
      },
    },
  },
);

export function createEmojiAssetColumns(
  packOptions: BasicOption[] = [],
  options?: {
    hidePackColumn?: boolean;
  },
) {
  return formSchemaTransform.toTableColumns<BaseEmojiAssetDto>(
    emojiAssetFormSchema,
    {
      imageUrl: {
        hide: true,
      },
      staticUrl: {
        hide: true,
      },
      preview: {
        field: 'preview',
        slots: { default: 'preview' },
        sort: 0,
        title: '预览',
      },
      packId: {
        formatter: ({ cellValue }) => getEmojiPackLabel(packOptions, cellValue),
        hide: options?.hidePackColumn,
        minWidth: 200,
        title: '所属表情包',
      },
      isAnimated: {
        formatter: ({ row }) => {
          if (Number(row.kind) !== 2) return '-';
          return row.isAnimated ? '是' : '否';
        },
        minWidth: 90,
        title: '动图',
      },
      category: {
        minWidth: 120,
      },
      shortcode: {
        minWidth: 140,
      },
      unicodeSequence: {
        minWidth: 180,
      },
      keywords: {
        minWidth: 240,
      },
      sortOrder: {
        sortable: true,
      },
      isEnabled: {
        show: true,
        slots: { default: 'isEnabled' },
        title: '状态',
      },
      createdAt: {
        show: true,
      },
      actions: {
        show: true,
        width: 180,
      },
      seq: {
        dragSort: true,
      },
    },
  );
}
