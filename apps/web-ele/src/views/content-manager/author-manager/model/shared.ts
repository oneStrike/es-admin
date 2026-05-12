import type { AuthorPageResponseDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { AuthorTypeEnum, GenderEnum } from '#/enum';
import { formSchemaTransform } from '#/utils';

export const genderOptions = [
  { label: '未知', value: GenderEnum.UNKNOWN },
  { label: '男性', value: GenderEnum.MALE },
  { label: '女性', value: GenderEnum.FEMALE },
  { label: '其他', value: GenderEnum.OTHER },
  { label: '保密', value: GenderEnum.SECRET },
];

export const typeOptions = [
  { label: '漫画家', value: AuthorTypeEnum.MANGA },
  { label: '轻小说作者', value: AuthorTypeEnum.NOVEL },
];

/**
 * 作者管理模块的表单 Schema
 */
export const formSchema: EsFormSchema = [
  {
    component: 'Upload',
    componentProps: {
      placeholder: '请上传作者头像',
      scene: 'author',
      maxCount: 1,
      multiple: false,
      accept: 'image/*',
    },
    fieldName: 'avatar',
    label: '头像',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入姓名',
    },
    fieldName: 'name',
    label: '姓名',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      placeholder: '请选择性别',
      options: genderOptions,
    },
    fieldName: 'gender',
    label: '性别',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      placeholder: '请选择国籍',
      options: [],
    },
    fieldName: 'nationality',
    label: '国籍',
  },
  {
    component: 'CheckboxGroup',
    componentProps: {
      placeholder: '请选择作者身份',
      options: typeOptions,
    },
    rules: 'required',
    fieldName: 'type',
    label: '身份角色',
  },
  {
    component: 'Input',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入作者描述',
      rows: 3,
    },
    fieldName: 'description',
    label: '作者描述',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入管理员备注',
      rows: 3,
      type: 'textarea',
    },
    fieldName: 'remark',
    label: '备注',
    formItemClass: 'col-span-2',
  },
];

/**
 * 列定义：依据 formSchema 自动转换为表格列，并按需覆盖展示细节
 */
export const authorColumns =
  formSchemaTransform.toTableColumns<AuthorPageResponseDto>(formSchema, {
    description: {
      hide: true,
    },
    remark: {
      hide: true,
    },
    avatar: {
      cellRender: {
        name: 'CellImage',
      },
    },
    gender: {
      formatter: ({ cellValue }) =>
        genderOptions.find((item) => item.value === cellValue)?.label ?? '-',
    },
    nationality: {
      slots: { default: 'nationality' },
    },
    isEnabled: {
      show: true,
      title: '状态',
      sort: 98,
      slots: { default: 'isEnabled' },
    },
    isRecommended: {
      show: true,
      title: '推荐',
      sort: 12,
      slots: { default: 'isRecommended' },
    },
    workCount: {
      show: true,
      title: '作品数',
      field: 'workCount',
      sort: 10,
      sortable: true,
    },
    followersCount: {
      show: true,
      title: '粉丝数',
      field: 'followersCount',
      sort: 11,
      sortable: true,
    },
    createdAt: {
      show: true,
    },
    actions: {
      show: true,
      width: 180,
    },
  });

/**
 * 搜索表单 Schema：从 formSchema 选择常用筛选项
 */
export const authorSearchSchema = formSchemaTransform.toSearchSchema(
  formSchema,
  {
    name: {
      show: true,
    },
    gender: {
      show: true,
    },
    nationality: {
      show: true,
    },

    isEnabled: {
      label: '状态',
      component: 'Select',
      componentProps: {
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
    isRecommended: {
      label: '是否推荐',
      component: 'Select',
      componentProps: {
        clearable: true,
        options: [
          {
            label: '是',
            value: true,
          },
          {
            label: '否',
            value: false,
          },
        ],
      },
    },
  },
);
