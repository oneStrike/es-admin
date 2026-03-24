import type { BaseForumTagDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { UploadSceneEnum } from '#/enum/api';
import { formSchemaTransform } from '#/utils';

export const enabledOptions = [
  { label: '启用', value: true },
  { label: '禁用', value: false },
];

export const formSchema: EsFormSchema = [
  {
    component: 'Upload',
    componentProps: {
      accept: 'image/*',
      maxCount: 1,
      multiple: false,
      returnDataType: 'url',
      scene: UploadSceneEnum.SHARED,
    },
    fieldName: 'icon',
    label: '话题图标',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入话题名称',
    },
    fieldName: 'name',
    label: '话题名称',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      align: 'left',
      class: '!w-full',
      controlsPosition: 'right',
      min: 0,
      placeholder: '请输入排序权重',
    },
    defaultValue: 0,
    fieldName: 'sortOrder',
    label: '排序权重',
    rules: 'required',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      class: 'w-full',
      options: enabledOptions,
      placeholder: '请选择启用状态',
    },
    defaultValue: true,
    fieldName: 'isEnabled',
    label: '启用状态',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入话题描述',
      rows: 4,
      type: 'textarea',
    },
    fieldName: 'description',
    formItemClass: 'col-span-2',
    label: '话题描述',
  },
];

export const pageColumns = formSchemaTransform.toTableColumns<BaseForumTagDto>(
  formSchema,
  {
    description: {
      minWidth: 220,
      showOverflow: 'tooltip',
    },
    icon: {
      cellRender: {
        name: 'CellImage',
      },
      minWidth: 100,
    },
    isEnabled: {
      minWidth: 110,
      show: true,
      slots: { default: 'isEnabled' },
    },
    useCount: {
      field: 'useCount',
      minWidth: 100,
      show: true,
      sortable: true,
      title: '使用次数',
    },
    createdAt: {
      show: true,
    },
    updatedAt: {
      show: true,
    },
    actions: {
      show: true,
      width: 200,
    },
  },
);

export const searchFormSchema = formSchemaTransform.toSearchSchema(formSchema, {
  name: {
    show: true,
  },
  isEnabled: {
    show: true,
  },
});
