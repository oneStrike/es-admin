import type { BaseForumSectionDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

import { topicReviewPolicy } from './constants';

// 表单配置
export const formSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入板块名称',
    },
    fieldName: 'name',
    label: '板块名称',
    rules: 'required',
  },
  {
    label: '板块状态',
    fieldName: 'isEnabled',
    component: 'RadioGroup',
    rules: 'required',
    defaultValue: true,
    componentProps: {
      placeholder: '请选择板块状态',
      options: [
        {
          label: '启用',
          value: true,
        },
        {
          label: '禁用',
          value: false,
        },
      ],
      class: 'w-full',
    },
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入排序权重',
      min: 0,
      controlsPosition: 'right',
      class: 'w-full',
    },
    fieldName: 'sortOrder',
    label: '排序权重',
    rules: 'required',
  },
  {
    label: '审核策略',
    fieldName: 'topicReviewPolicy',
    component: 'Select',
    rules: 'required',
    defaultValue: 0,
    componentProps: {
      placeholder: '请选择审核策略',
      options: topicReviewPolicy,
      class: 'w-full',
    },
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入板块图标',
    },
    fieldName: 'icon',
    label: '板块图标',
  },
  {
    label: '板块描述',
    fieldName: 'description',
    component: 'Input',
    formItemClass: 'col-span-2',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入板块描述信息...',
      rows: 4,
    },
  },
];

// 表格列配置
export const sectionColumns =
  formSchemaTransform.toTableColumns<BaseForumSectionDto>(formSchema, {
    icon: {
      hide: true,
    },
    actions: {
      show: true,
    },
    description: {
      showOverflow: 'tooltip',
      sort: 0,
    },
    isEnabled: {
      slots: { default: 'isEnabled' },
      width: 100,
    },
    sortOrder: {
      width: 100,
      sortable: true,
    },
    topicReviewPolicy: {
      width: 100,
    },
    createdAt: {
      show: true,
    },
    updatedAt: {
      show: true,
    },
  });

// 搜索表单配置
export const sectionFilter = formSchemaTransform
  .toSearchSchema(formSchema, {
    name: {
      show: true,
    },
    isEnabled: {
      show: true,
    },
    topicReviewPolicy: {
      show: true,
    },
  })
  .toReversed();
