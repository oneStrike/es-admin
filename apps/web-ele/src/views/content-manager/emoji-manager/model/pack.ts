import type { BaseEmojiPackDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { UploadSceneEnum } from '#/enum/api';
import { formSchemaTransform } from '#/utils';

import {
  emojiEnableOptions,
  emojiSceneTypeOptions,
  emojiVisibilityOptions,
  normalizeSceneTypeValue,
} from './shared';

export const emojiPackFormSchema: EsFormSchema = [
  {
    component: 'Upload',
    componentProps: {
      accept: 'image/*',
      maxCount: 1,
      multiple: false,
      placeholder: '请上传表情包图标',
      scene: UploadSceneEnum.SHARED,
    },
    fieldName: 'iconUrl',
    formItemClass: 'col-span-2',
    label: '图标',
  },
  {
    component: 'Input',
    componentProps: {
      maxlength: 64,
      placeholder: '请输入表情包名称',
      showWordLimit: true,
    },
    fieldName: 'name',
    label: '表情包名称',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      maxlength: 64,
      placeholder: '请输入表情包编码',
      showWordLimit: true,
    },
    fieldName: 'code',
    label: '表情包编码',
    rules: 'required',
  },
  {
    component: 'CheckboxGroup',
    componentProps: {
      options: emojiSceneTypeOptions,
    },
    fieldName: 'sceneType',
    label: '场景类型',
    rules: 'arrayRequired',
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
    component: 'RadioGroup',
    componentProps: {
      class: 'w-full',
      options: emojiVisibilityOptions,
    },
    defaultValue: true,
    fieldName: 'visibleInPicker',
    label: '选择器可见',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入表情包描述',
      rows: 4,
      type: 'textarea',
    },
    fieldName: 'description',
    formItemClass: 'col-span-2',
    label: '描述',
  },
];

export const emojiPackSearchSchema = formSchemaTransform.toSearchSchema(
  emojiPackFormSchema,
  {
    code: {
      show: true,
    },
    name: {
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
    visibleInPicker: {
      show: true,
      component: 'Select',
      componentProps: {
        options: emojiVisibilityOptions,
        placeholder: '选择器可见',
      },
    },
  },
);

export const emojiPackColumns =
  formSchemaTransform.toTableColumns<BaseEmojiPackDto>(emojiPackFormSchema, {
    iconUrl: {
      cellRender: {
        name: 'CellImage',
      },
      sort: 0,
    },
    sceneType: {
      cellRender: {
        name: 'CellTag',
        props: {
          formatter: normalizeSceneTypeValue,
        },
      },
      minWidth: 220,
    },
    sortOrder: {
      sortable: true,
    },
    isEnabled: {
      show: true,
      slots: { default: 'isEnabled' },
      title: '状态',
    },
    visibleInPicker: {
      minWidth: 120,
      show: true,
      slots: { default: 'visibleInPicker' },
      title: '选择器可见',
    },
    description: {
      minWidth: 240,
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
  });
