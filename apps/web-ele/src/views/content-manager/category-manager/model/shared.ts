import type { BaseCategoryDto, BaseTagDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { ContentTypeEnum } from '#/enum';
import { formSchemaTransform } from '#/utils';

export const contentTypeOptions = [
  {
    label: '漫画',
    value: ContentTypeEnum.COMIC,
  },
  {
    label: '插画',
    value: ContentTypeEnum.ILLUSTRATION,
  },
  {
    label: '小说',
    value: ContentTypeEnum.NOVEL,
  },
  {
    label: '写真',
    value: ContentTypeEnum.PHOTO,
  },
];

/**
 * 分类管理模块的表单 Schema
 */
export const formSchema: EsFormSchema = [
  {
    component: 'Upload',
    componentProps: {
      placeholder: '请上传分类图标',
    },
    fieldName: 'icon',
    label: '图标',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入分类名称',
    },
    fieldName: 'name',
    label: '分类名称',
    rules: 'required',
  },
  {
    label: '内容类型',
    fieldName: 'contentType',
    component: 'CheckboxGroup',
    rules: 'required',
    componentProps: {
      placeholder: '请选择内容类型',
      options: contentTypeOptions,
    },
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
    fieldName: 'sortOrder',
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
 * 与数据字典模块一致，统一使用 formSchemaTransform.toTableColumns。
 */
export const categoryColumns =
  formSchemaTransform.toTableColumns<BaseCategoryDto>(formSchema, {
    icon: {
      cellRender: {
        name: 'CellImage',
      },
    },
    isEnabled: {
      show: true,
      title: '状态',
      sort: 99,
      minWidth: 100,
      slots: { default: 'isEnabled' },
    },
    sortOrder: {
      sortable: true,
    },
    contentType: {
      title: '应用类型',
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: contentTypeOptions,
        },
      },
      minWidth: 200,
    },
    popularity: {
      title: '热度',
      field: 'popularity',
      sort: 9,
      minWidth: 100,
      sortable: true,
    },
    description: {
      minWidth: 200,
      sort: 20,
      formatter: ({ row }: { row: BaseTagDto }) => {
        return row.description || '-';
      },
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
  });

/**
 * 搜索表单 Schema：从 formSchema 选择常用筛选项，遵循数据字典的搜索构建方式。
 */
export const categorySearchSchema = formSchemaTransform.toSearchSchema(
  formSchema,
  {
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
    contentType: {
      show: true,
    },
  },
);
