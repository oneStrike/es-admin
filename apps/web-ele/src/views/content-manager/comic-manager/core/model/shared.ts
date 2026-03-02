import type { EsFormSchema } from '#/types';

import { cloneDeep } from 'es-toolkit';

import { authorPageApi } from '#/api';
import { ContentPermissionEnum } from '#/enum';
import { formSchemaTransform } from '#/utils';
import { optionsToMap } from '#/utils/options';
import {
  authorColumns,
  authorSearchSchema,
} from '#/views/content-manager/author-manager/model/shared';

// 连载状态配置
export const serialStatus = [
  { label: '连载中', value: 0, color: 'primary' },
  { label: '已完结', value: 1, color: 'success' },
  { label: '暂停更新', value: 2, color: 'warning' },
  { label: '停止更新', value: 3, color: 'danger' },
];

export const serialStatusMap = optionsToMap(serialStatus);

// 查看规则配置
export const viewRuleOptions = [
  { label: '所有人', value: 0 },
  { label: '登录用户', value: 1 },
  { label: '会员用户', value: 2 },
  { label: '购买', value: 3 },
];

// 表单配置

export const formSchema: EsFormSchema = [
  // ========== 基本信息 ==========
  {
    component: 'Upload',
    componentProps: {
      placeholder: '请上传漫画封面',
      accept: 'image/*',
      scene: 'comic',
      maxCount: 1,
      multiple: false,
    },
    fieldName: 'cover',
    label: '封面',
    rules: 'uploadRequired',
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
          ['name'].includes(
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
    rules: 'arrayRequired',
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

  // ========== 内容分类 ==========
  {
    component: 'Select',
    componentProps: {
      options: [],
      placeholder: '输入分类名称进行搜索',
      multiple: true,
      filterable: true,
    },
    fieldName: 'categoryIds',
    label: '分类',
    rules: 'arrayRequired',
  },
  {
    component: 'Select',
    componentProps: {
      options: [],
      placeholder: '输入标签名称进行搜索',
      multiple: true,
      filterable: true,
    },
    fieldName: 'tagIds',
    label: '标签',
  },

  // ========== 作品简介 ==========
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

  // ========== 来源与版权 ==========
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

  // ========== 阅读权限 ==========
  {
    component: 'Select',
    componentProps: {
      placeholder: '请选择查看规则',
      options: viewRuleOptions,
      class: 'w-full',
    },
    fieldName: 'viewRule',
    label: '查看规则',
    rules: 'required',
    defaultValue: 0,
  },
  {
    component: 'Select',
    componentProps: {
      placeholder: '请选择阅读所需会员等级',
      filterable: true,
      options: [], // 需要从 levelRulesPageApi 获取
    },
    fieldName: 'requiredViewLevelId',
    label: '阅读会员等级',
    dependencies: {
      show: ({ viewRule }) => {
        return viewRule === ContentPermissionEnum.VIP;
      },
      triggerFields: ['viewRule'],
    },
  },

  // ========== 价格设置 ==========
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入作品购买价格',
      min: 0,
      precision: 2,
    },
    fieldName: 'price',
    label: '作品价格',
    defaultValue: 0,
    dependencies: {
      show: ({ viewRule }) => {
        return viewRule === ContentPermissionEnum.PURCHASE;
      },
      triggerFields: ['viewRule'],
    },
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入章节默认购买价格',
      min: 0,
      precision: 2,
    },
    fieldName: 'chapterPrice',
    label: '章节默认价格',
    defaultValue: 0,
    dependencies: {
      show: ({ viewRule }) => {
        return viewRule === ContentPermissionEnum.PURCHASE;
      },
      triggerFields: ['viewRule'],
    },
  },

  // ========== 功能开关 ==========
  {
    component: 'RadioGroup',
    defaultValue: true,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
    fieldName: 'canComment',
    label: '允许评论',
  },
  // ========== 推荐标记 ==========
  {
    component: 'RadioGroup',
    defaultValue: false,
    componentProps: {
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
      placeholder: '请输入推荐权重',
      min: 0,
      max: 100,
    },
    fieldName: 'recommendWeight',
    label: '推荐权重',
  },
  {
    component: 'DatePicker',
    componentProps: {
      placeholder: '请选择作品发布时间',
      disabledDate: (current: Date) => {
        return current && current > new Date();
      },
      class: '!w-full',
    },
    fieldName: 'publishAt',
    label: '发布时间',
  },

  // ========== 其他 ==========
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
export const pageFilter = formSchemaTransform.toSearchSchema(formSchema, {
  name: {
    show: true,
  },
  author: {
    show: true,
    component: 'Input',
    componentProps: {
      placeholder: '作者名称',
    },
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
  serialStatus: {
    show: true,
  },
  region: {
    show: true,
  },
  language: {
    show: true,
  },

  publisher: {
    show: true,
  },
});
