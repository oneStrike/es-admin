import type { CreateForumSectionGroupDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

// 表单配置
export const formSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入分组名称',
    },
    fieldName: 'name',
    label: '分组名称',
    rules: 'required',
  },
  {
    label: '分组状态',
    fieldName: 'isEnabled',
    component: 'RadioGroup',
    rules: 'required',
    defaultValue: true,
    componentProps: {
      placeholder: '请选择分组状态',
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
    label: '分组描述',
    fieldName: 'description',
    component: 'Input',
    formItemClass: 'col-span-2',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入分组描述信息...',
      rows: 4,
    },
  },
];

// 表格列配置
export const sectionGroupColumns =
  formSchemaTransform.toTableColumns<CreateForumSectionGroupDto>(formSchema, {
    actions: {
      show: true,
      width: 200,
    },
    name: {
      width: 400,
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
      width: 120,
      sortable: true,
    },
    createdAt: {
      show: true,
    },
    updatedAt: {
      show: true,
    },
    seq: {
      dragSort: true,
    },
  });

// 搜索表单配置
export const sectionGroupFilter = formSchemaTransform
  .toSearchSchema(formSchema, {
    name: {
      show: true,
    },
    isEnabled: {
      show: true,
    },
  })
  .toReversed();
