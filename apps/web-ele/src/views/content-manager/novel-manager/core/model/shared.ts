import type { EsFormSchema } from '#/types';

import { cloneDeep } from 'es-toolkit';

import { contentAuthorPageApi } from '#/api/core';
import { AuthorTypeEnum, ContentPermissionEnum } from '#/enum';
import { formSchemaTransform } from '#/utils';
import { optionsToMap } from '#/utils/options';
import {
  authorColumns,
  authorSearchSchema,
} from '#/views/content-manager/author-manager/model/shared';

export const serialStatus = [
  { label: '未开始', value: 0, color: 'info' },
  { label: '连载中', value: 1, color: 'primary' },
  { label: '已完结', value: 2, color: 'success' },
  { label: '暂停更新', value: 3, color: 'warning' },
  { label: '停止更新', value: 4, color: 'danger' },
];

export const serialStatusMap = optionsToMap(serialStatus);

export const viewRuleOptions = [
  { label: '所有人', value: 0 },
  { label: '登录用户', value: 1 },
  { label: '会员用户', value: 2 },
  { label: '购买', value: 3 },
];

export const formSchema: EsFormSchema = [
  {
    component: 'Upload',
    componentProps: {
      accept: 'image/*',
      maxCount: 1,
      multiple: false,
      placeholder: '请上传小说封面',
      scene: 'work',
    },
    fieldName: 'cover',
    label: '封面',
    rules: 'uploadRequired',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入小说名称',
    },
    fieldName: 'name',
    label: '小说名称',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入小说别名（支持多别名，用逗号分隔）',
    },
    fieldName: 'alias',
    label: '小说别名',
  },
  {
    component: 'TableSelect',
    componentProps: () => {
      return {
        api: async (value: Record<string, unknown>) => {
          return contentAuthorPageApi({
            ...value,
            isEnabled: true,
            type: JSON.stringify([AuthorTypeEnum.NOVEL]),
          });
        },
        columns: cloneDeep(authorColumns).filter((item) =>
          ['createdAt', 'gender', 'name'].includes(
            typeof item?.field === 'string' ? item?.field : '',
          ),
        ),
        multiple: true,
        placeholder: '请选择小说作者',
        searchSchema: cloneDeep(authorSearchSchema).filter((item) =>
          ['name'].includes(
            typeof item?.fieldName === 'string' ? item?.fieldName : '',
          ),
        ),
        selectionMode: 'multiple',
      };
    },
    fieldName: 'authorIds',
    label: '作者',
    rules: 'arrayRequired',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      options: serialStatus,
      placeholder: '请选择连载状态',
    },
    fieldName: 'serialStatus',
    label: '连载状态',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      placeholder: '请选择地区代码',
    },
    fieldName: 'region',
    label: '地区',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      placeholder: '请选择语言代码',
    },
    fieldName: 'language',
    label: '语言',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      placeholder: '请选择年龄分级',
    },
    fieldName: 'ageRating',
    label: '年龄分级',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      filterable: true,
      multiple: true,
      options: [],
      placeholder: '输入分类名称进行搜索',
    },
    fieldName: 'categoryIds',
    label: '分类',
    rules: 'arrayRequired',
  },
  {
    component: 'Select',
    componentProps: {
      filterable: true,
      multiple: true,
      options: [],
      placeholder: '输入标签名称进行搜索',
    },
    fieldName: 'tagIds',
    label: '标签',
    rules: 'arrayRequired',
  },
  {
    component: 'VbenTiptap',
    componentProps: {
      placeholder: '请输入小说简介',
    },
    fieldName: 'description',
    formItemClass: 'col-span-2',
    label: '小说简介',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      placeholder: '请选择出版社',
    },
    fieldName: 'publisher',
    label: '出版社',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入原始来源（例如：官方授权、小说站点等）',
    },
    fieldName: 'originalSource',
    label: '原始来源',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入版权信息',
    },
    fieldName: 'copyright',
    label: '版权信息',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入免责声明',
    },
    fieldName: 'disclaimer',
    label: '免责声明',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      options: viewRuleOptions,
      placeholder: '请选择查看规则',
    },
    defaultValue: 0,
    fieldName: 'viewRule',
    label: '查看规则',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      filterable: true,
      options: [],
      placeholder: '请选择阅读所需会员等级',
    },
    dependencies: {
      show: ({ viewRule }) => {
        return viewRule === ContentPermissionEnum.VIP;
      },
      triggerFields: ['viewRule'],
    },
    fieldName: 'requiredViewLevelId',
    label: '阅读会员等级',
  },
  {
    component: 'InputNumber',
    componentProps: {
      min: 0,
      placeholder: '请输入作品购买价格',
      precision: 2,
    },
    defaultValue: 0,
    dependencies: {
      show: ({ viewRule }) => {
        return viewRule === ContentPermissionEnum.PURCHASE;
      },
      triggerFields: ['viewRule'],
    },
    fieldName: 'price',
    label: '作品价格',
  },
  {
    component: 'InputNumber',
    componentProps: {
      min: 0,
      placeholder: '请输入章节默认购买价格',
      precision: 2,
    },
    defaultValue: 0,
    dependencies: {
      show: ({ viewRule }) => {
        return viewRule === ContentPermissionEnum.PURCHASE;
      },
      triggerFields: ['viewRule'],
    },
    fieldName: 'chapterPrice',
    label: '章节默认价格',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
    defaultValue: false,
    fieldName: 'isHot',
    label: '是否热门',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
    defaultValue: false,
    fieldName: 'isNew',
    label: '是否新作',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
    defaultValue: false,
    fieldName: 'isRecommended',
    label: '是否推荐',
  },
  {
    component: 'InputNumber',
    componentProps: {
      max: 100,
      min: 0,
      placeholder: '请输入推荐权重',
    },
    fieldName: 'recommendWeight',
    label: '推荐权重',
  },
  {
    component: 'DatePicker',
    componentProps: {
      class: '!w-full',
      disabledDate: (current: Date) => {
        return current && current > new Date();
      },
      placeholder: '请选择作品发布时间',
    },
    fieldName: 'publishAt',
    label: '发布时间',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入备注',
      rows: 4,
      type: 'textarea',
    },
    fieldName: 'remark',
    formItemClass: 'col-span-2',
    label: '备注',
  },
];

export const pageFilter = formSchemaTransform.toSearchSchema(formSchema, {
  author: {
    component: 'Input',
    componentProps: {
      placeholder: '作者名称',
    },
    show: true,
  },
  isHot: {
    show: true,
  },
  isNew: {
    show: true,
  },
  isRecommended: {
    show: true,
  },
  language: {
    show: true,
  },
  name: {
    show: true,
  },
  publisher: {
    show: true,
  },
  region: {
    show: true,
  },
  serialStatus: {
    show: true,
  },
});
