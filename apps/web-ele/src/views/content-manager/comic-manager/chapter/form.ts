import type { EsFormSchema } from '#/types';

// 阅读权限配置
import { ContentPermissionEnum, DownloadPermissionEnum } from '#/enum';
import { formSchemaTransform } from '#/utils';

export const readRule = [
  { label: '所有人', value: ContentPermissionEnum.ALL, color: 'default' },
  { label: '登录用户', value: ContentPermissionEnum.LOGIN, color: 'primary' },
  { label: '会员用户', value: ContentPermissionEnum.VIP, color: 'success' },
  {
    label: '积分购买',
    value: ContentPermissionEnum.PURCHASE,
    color: 'warning',
  },
];

export const readRuleMap = Object.fromEntries(
  readRule.map((item) => [item.value, item.label]),
);

export const downloadRule = [
  { label: '禁止', value: DownloadPermissionEnum.DENY, color: 'danger' },
  { label: '允许', value: DownloadPermissionEnum.ALLOW, color: 'success' },
  { label: '会员', value: DownloadPermissionEnum.VIP, color: 'info' },
  { label: '积分', value: DownloadPermissionEnum.PURCHASE, color: 'warning' },
];

export const downloadRuleMap = Object.fromEntries(
  downloadRule.map((item) => [item.value, item.label]),
);

export const chapterFormSchema: EsFormSchema = [
  {
    fieldName: 'title',
    label: '章节标题',
    component: 'Input',
    rules: 'required',
    formItemClass: 'col-span-2',
    componentProps: {
      placeholder: '请输入章节标题',
    },
  },
  {
    fieldName: 'subtitle',
    label: '章节副标题',
    component: 'Input',
    formItemClass: 'col-span-2',
    componentProps: {
      placeholder: '请输入章节副标题',
    },
  },
  {
    fieldName: 'readRule',
    label: '查看规则',
    component: 'Select',
    formItemClass: 'col-span-2',
    rules: 'required',
    defaultValue: 0,
    componentProps: {
      placeholder: '请选择查看规则',
      options: readRule,
    },
  },
  {
    fieldName: 'downloadRule',
    label: '下载规则',
    component: 'Select',
    formItemClass: 'col-span-2',
    rules: 'required',
    defaultValue: 0,
    componentProps: {
      placeholder: '请选择下载规则',
      options: downloadRule,
    },
  },
  {
    fieldName: 'isPreview',
    label: '试读章节',
    component: 'RadioGroup',
    defaultValue: false,
    formItemClass: 'col-span-1',
    help: '试读章节将无视查看规则',
    componentProps: {
      options: [
        { label: '否', value: false },
        { label: '是', value: true },
      ],
    },
  },
  {
    fieldName: 'canComment',
    label: '允许评论',
    component: 'RadioGroup',
    defaultValue: true,
    formItemClass: 'col-span-1',
    componentProps: {
      options: [
        { label: '否', value: false },
        { label: '是', value: true },
      ],
    },
  },
  {
    fieldName: 'isPublished',
    label: '发布',
    component: 'RadioGroup',
    defaultValue: true,
    formItemClass: 'col-span-1',
    componentProps: {
      options: [
        { label: '否', value: false },
        { label: '是', value: true },
      ],
    },
  },
  {
    fieldName: 'readPoints',
    label: '购买所需积分',
    component: 'InputNumber',
    formItemClass: 'col-span-2',
    defaultValue: 0,
    componentProps: {
      placeholder: '请输入购买所需积分',
      min: 0,
    },
  },
  {
    fieldName: 'downloadPoints',
    label: '下载所需积分',
    formItemClass: 'col-span-2',
    component: 'InputNumber',
    defaultValue: 0,
    componentProps: {
      placeholder: '请输入下载所需积分',
      min: 0,
    },
  },
  {
    fieldName: 'remark',
    label: '管理员备注',
    component: 'Input',
    formItemClass: 'col-span-4',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入管理员备注',
      rows: 4,
    },
  },
];

export const chapterSearchFormSchema: EsFormSchema =
  formSchemaTransform.toSearchSchema(chapterFormSchema, {
    title: {
      show: true,
    },
    isPreview: {
      show: true,
    },
    canComment: {
      show: true,
    },
    isPublished: {
      show: true,
    },
  });
