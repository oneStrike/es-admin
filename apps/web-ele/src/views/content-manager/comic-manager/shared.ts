import type { EsFormSchema } from '#/types';
import type { Options } from '#/utils/options';

import { ref } from 'vue';

import { cloneDeep } from 'lodash-es';

import { z } from '#/adapter/form';
import { authorPageApi, categoryPageApi, tagPageApi } from '#/apis';
import { formSchemaTransform } from '#/utils';
import { optionsToMap } from '#/utils/options';
import {
  authorColumns,
  authorSearchSchema,
} from '#/views/content-manager/author-manager/shared';

// 阅读权限配置
export const readRule = [
  { label: '所有人', value: 0, color: 'default' },
  { label: '登录用户', value: 1, color: 'primary' },
  { label: '会员用户', value: 2, color: 'success' },
  { label: '积分购买', value: 3, color: 'warning' },
];

export const readRuleMap = Object.fromEntries(
  readRule.map((item) => [item.value, item.label]),
);

// 连载状态配置
export const serialStatus = [
  { label: '连载中', value: 0, color: 'primary' },
  { label: '已完结', value: 1, color: 'success' },
  { label: '暂停更新', value: 2, color: 'warning' },
  { label: '停止更新', value: 3, color: 'danger' },
];

export const serialStatusMap = optionsToMap(serialStatus);

// 表单配置
const categoryOptions = ref<Options[]>([]);
const tagOptions = ref<Options[]>([]);
export const formSchema: EsFormSchema = [
  {
    component: 'Upload',
    componentProps: {
      placeholder: '请上传漫画封面',
      accept: 'image/*',
      scene: 'comic',
    },
    fieldName: 'cover',
    label: '封面',
    rules: z.string({ message: '请上传漫画封面' }),
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入漫画名称',
    },
    fieldName: 'name',
    label: '漫画名称',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入漫画别名（支持多别名，用逗号分隔）',
    },
    fieldName: 'alias',
    label: '漫画别名',
  },

  {
    component: 'TableSelect',
    // 对应组件的参数
    componentProps: () => {
      return {
        placeholder: '请选择漫画作者',
        multiple: true,
        selectionMode: 'multiple',
        columns: cloneDeep(authorColumns).filter((item) =>
          ['createdAt', 'gender', 'name'].includes(
            typeof item?.field === 'string' ? item?.field : '',
          ),
        ),
        searchSchema: cloneDeep(authorSearchSchema).filter((item) =>
          ['gender', 'isRecommended', 'name'].includes(
            typeof item?.fieldName === 'string' ? item?.fieldName : '',
          ),
        ),
        api: async (value: Record<string, any>) => {
          return authorPageApi({
            ...value,
            isEnabled: true,
            type: JSON.stringify([4]),
          });
        },
      };
    },
    fieldName: 'authorIds',
    label: '作者',
    rules: 'selectRequired',
  },
  {
    component: 'Select',
    componentProps: {
      placeholder: '请选择连载状态',
      options: serialStatus,
      class: 'w-full',
    },
    fieldName: 'serialStatus',
    label: '连载状态',
    rules: 'required',
  },
  {
    component: 'ApiSelect',
    // 对应组件的参数
    componentProps: () => {
      return {
        placeholder: '输入分类名称进行搜索',
        multiple: true,
        remote: true,
        filterable: true,
        immediate: false,
        options: categoryOptions.value,
        remoteMethod: async (value: string) => {
          const res = await categoryPageApi({ name: value || undefined });
          categoryOptions.value =
            res.list?.map((item) => ({
              label: item.name,
              value: item.id,
            })) || [];
        },
      };
    },
    fieldName: 'categoryIds',
    label: '分类',
    rules: 'selectRequired',
  },
  {
    component: 'ApiSelect',
    componentProps: () => {
      return {
        placeholder: '输入标签名称进行搜索',
        multiple: true,
        remote: true,
        filterable: true,
        immediate: false,
        options: tagOptions.value,
        remoteMethod: async (value: string) => {
          const res = await tagPageApi({ name: value || undefined });
          tagOptions.value =
            res.list?.map((item) => ({
              label: item.name,
              value: item.id,
            })) || [];
        },
      };
    },
    fieldName: 'tagIds',
    label: '标签',
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
      placeholder: '请输入原始来源（例如：官方授权、漫画网站等）',
    },
    fieldName: 'originalSource',
    label: '原始来源',
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
    component: 'RichText',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入漫画简介',
      rows: 4,
    },
    fieldName: 'description',
    label: '漫画简介',
    formItemClass: 'col-span-2',
    rules: 'required',
  },
  {
    component: 'RadioGroup',
    defaultValue: false,
    componentProps: {
      placeholder: '请选择是否为热门作品',
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
    fieldName: 'isHot',
    label: '是否热门',
  },
  {
    component: 'RadioGroup',
    defaultValue: false,
    componentProps: {
      placeholder: '请选择是否为最新作品',
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
    fieldName: 'isNew',
    label: '是否新作',
  },
  {
    component: 'RadioGroup',
    defaultValue: false,
    componentProps: {
      placeholder: '请选择是否为推荐作品',
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
    fieldName: 'isRecommended',
    label: '是否推荐',
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入虚拟热度',
      min: 0,
      max: 100,
    },
    fieldName: 'popularityWeight',
    label: '虚拟热度',
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入推荐权重',
      min: 0,
      max: 100,
    },
    fieldName: 'recommendWeight',
    label: '推荐权重',
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
    component: 'Input',
    formItemClass: 'col-span-2',
    componentProps: {
      type: 'textarea',
      rows: 4,
      placeholder: '请输入备注',
    },
    fieldName: 'remark',
    label: '备注',
  },
];

// 搜索表单配置
export const pageFilter = formSchemaTransform
  .toSearchSchema(formSchema, {
    name: {
      show: true,
    },
    publisher: {
      show: true,
    },
    serialStatus: {
      show: true,
    },
  })
  .reverse();
