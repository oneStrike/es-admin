import type { BaseDictionaryDto, BaseDictionaryItemDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

export const formSchema: EsFormSchema = [
  {
    component: 'Upload',
    componentProps: {
      scene: 'common',
      placeholder: '请上传字典封面',
    },
    fieldName: 'cover',
    label: '封面',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入字典名称',
    },
    fieldName: 'name',
    label: '字典名称',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入字典编码',
    },
    fieldName: 'code',
    label: '字典编码',
    rules: 'required',
  },
  {
    component: 'Switch',
    componentProps: {},
    defaultValue: true,
    fieldName: 'isEnabled',
    label: '状态',
    rules: 'required',
    help: '启用/禁用字典',
    formItemClass: 'col-span-1',
    renderComponentContent: () => ({
      active: () => '启用',
      inactive: () => '禁用',
    }),
  },
  {
    component: 'Input',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入备注信息...',
      rows: 4,
    },
    fieldName: 'description',
    label: '备注',
  },
];

export const itemFormSchema: EsFormSchema = [
  {
    component: 'Upload',
    componentProps: {
      scene: 'common',
      placeholder: '请上传字典项封面',
    },
    fieldName: 'cover',
    label: '封面',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入字典项名称',
    },
    fieldName: 'name',
    label: '名称',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入字典项编码',
    },
    fieldName: 'code',
    label: '编码',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入排序值',
      min: 0,
    },
    defaultValue: 0,
    fieldName: 'sortOrder',
    label: '排序',
    help: '数值越小越靠前',
  },
  {
    component: 'Switch',
    componentProps: {},
    defaultValue: true,
    fieldName: 'isEnabled',
    label: '状态',
    rules: 'required',
    help: '启用/禁用字典项',
    formItemClass: 'col-span-1',
    renderComponentContent: () => ({
      active: () => '启用',
      inactive: () => '禁用',
    }),
  },
  {
    component: 'Input',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入备注信息...',
      rows: 4,
    },
    fieldName: 'description',
    label: '备注',
  },
];
export const dictionaryColumns =
  formSchemaTransform.toTableColumns<BaseDictionaryDto>(formSchema, {
    actions: {
      width: 180,
      show: true,
    },
    code: {
      width: 300,
    },
    cover: {
      width: 150,
      cellRender: {
        name: 'CellImage',
      },
    },
    isEnabled: {
      show: true,
      width: 100,
      title: '状态',
      sort: 98,
      slots: { default: 'isEnabled' },
    },

    createdAt: {
      show: true,
    },
  });

export const dictionaryItemColumns =
  formSchemaTransform.toTableColumns<BaseDictionaryItemDto>(itemFormSchema, {
    seq: {
      dragSort: true,
    },
    actions: {
      show: true,
    },
    name: {
      width: 200,
    },
    code: {
      width: 200,
    },
    cover: {
      cellRender: {
        name: 'CellImage',
      },
    },
    sortOrder: {
      width: 100,
      sortable: true,
    },
    isEnabled: {
      show: true,
      width: 100,
      title: '状态',
      sort: 99,
      slots: { default: 'isEnabled' },
    },
    description: {
      formatter: ({ cellValue }) => {
        return cellValue ?? '-';
      },
    },
  });

export const dictionarySearchSchema = formSchemaTransform.toSearchSchema(
  formSchema,
  {
    name: {
      show: true,
    },
    code: {
      show: true,
    },
  },
);
