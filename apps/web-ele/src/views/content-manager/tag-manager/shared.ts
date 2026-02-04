import type { BaseTagDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

/**
 * 标签管理模块的表单 Schema
 */
export const formSchema: EsFormSchema = [
  {
    component: 'Upload',
    componentProps: {
      placeholder: '请上传标签图标',
    },
    fieldName: 'icon',
    label: '图标',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入标签名称',
    },
    fieldName: 'name',
    label: '标签名称',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      min: 0,
      max: 999_999_999,
      align: 'left',
      class: '!w-full',
      controlsPosition: 'right',
      placeholder: '请输入排序值（数字越小越靠前）',
    },
    fieldName: 'order',
    label: '排序',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入标签描述',
      type: 'textarea',
      rows: 4,
    },
    fieldName: 'description',
    label: '描述',
    formItemClass: 'col-span-2',
  },
];

/**
 * 列定义：依据 formSchema 自动转换为表格列，并按需覆盖展示细节。
 */
export const tagColumns = formSchemaTransform.toTableColumns<BaseTagDto>(
  formSchema,
  {
    icon: {
      cellRender: {
        name: 'CellImage',
      },
    },

    order: {
      sortable: true,
    },
    popularity: {
      title: '热度',
      field: 'popularity',
      minWidth: 100,
      sortable: true,
    },

    isEnabled: {
      show: true,
      title: '状态',
      minWidth: 100,
      slots: { default: 'isEnabled' },
    },

    createdAt: {
      show: true,
    },
    actions: {
      show: true,
    },
    seq: {
      dragSort: true,
    },
    description: {
      sort: 80,
      minWidth: 200,
    },
  },
);

/**
 * 搜索表单 Schema：从 formSchema 选择常用筛选项
 */
export const tagSearchSchema = formSchemaTransform.toSearchSchema(formSchema, {
  name: {
    show: true,
  },
  isEnabled: {
    label: '',
    component: 'Select',
    componentProps: {
      placeholder: '状态',
      clearable: true,
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
    },
  },
});
