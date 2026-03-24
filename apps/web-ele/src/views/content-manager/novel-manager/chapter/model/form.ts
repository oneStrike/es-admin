import type { EsFormSchema } from '#/types';

import { ContentPermissionEnum } from '#/enum';
import { formSchemaTransform } from '#/utils';

export const readRule = [
  { label: '继承', value: -1, color: 'info' },
  { label: '所有人', value: ContentPermissionEnum.ALL, color: '' },
  { label: '登录用户', value: ContentPermissionEnum.LOGIN, color: 'primary' },
  { label: '会员用户', value: ContentPermissionEnum.VIP, color: 'success' },
  {
    label: '购买',
    value: ContentPermissionEnum.PURCHASE,
    color: 'warning',
  },
];

export const readRuleMap = Object.fromEntries(
  readRule.map((item) => [item.value, item.label]),
);

export const chapterFormSchema: EsFormSchema = [
  {
    component: 'Upload',
    componentProps: {
      accept: 'image/*',
      maxCount: 1,
      multiple: false,
      placeholder: '请上传章节封面',
      scene: 'chapter',
    },
    fieldName: 'cover',
    label: '章节封面',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      max: 9999,
      min: 0,
      placeholder: '请输入章节序号',
    },
    fieldName: 'sortOrder',
    label: '章节序号',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入章节标题',
    },
    fieldName: 'title',
    label: '章节标题',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入章节副标题',
    },
    fieldName: 'subtitle',
    label: '章节副标题',
  },
  {
    component: 'Select',
    componentProps: {
      options: readRule,
      placeholder: '请选择查看规则',
    },
    defaultValue: -1,
    fieldName: 'viewRule',
    label: '查看规则',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      filterable: true,
      options: [],
      placeholder: '请选择会员等级限制',
    },
    dependencies: {
      show: ({ viewRule }) => {
        return viewRule === ContentPermissionEnum.VIP;
      },
      triggerFields: ['viewRule'],
    },
    fieldName: 'requiredViewLevelId',
    label: '会员等级限制（查看）',
  },
  {
    component: 'InputNumber',
    componentProps: {
      min: 0,
      placeholder: '请输入章节价格',
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
    label: '章节价格',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      options: [
        { label: '否', value: false },
        { label: '是', value: true },
      ],
    },
    defaultValue: false,
    fieldName: 'isPreview',
    help: '试读章节将无视查看规则',
    label: '试读章节',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      options: [
        { label: '否', value: false },
        { label: '是', value: true },
      ],
    },
    defaultValue: true,
    fieldName: 'canComment',
    label: '允许评论',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      options: [
        { label: '否', value: false },
        { label: '是', value: true },
      ],
    },
    defaultValue: false,
    fieldName: 'canDownload',
    label: '允许下载',
  },
  {
    component: 'DatePicker',
    componentProps: {
      class: '!w-full',
      format: 'YYYY-MM-DD',
      placeholder: '请选择发布日期',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
    },
    fieldName: 'publishAt',
    help: '作品真实发布日期，非系统关联数据',
    label: '发布日期',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入章节描述',
      rows: 4,
      type: 'textarea',
    },
    fieldName: 'description',
    formItemClass: 'col-span-2',
    label: '章节描述',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入正文内容',
      rows: 12,
      type: 'textarea',
    },
    fieldName: 'content',
    formItemClass: 'col-span-2',
    label: '正文内容',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入管理员备注',
      rows: 4,
      type: 'textarea',
    },
    fieldName: 'remark',
    formItemClass: 'col-span-2',
    label: '管理员备注',
  },
];

export const chapterSearchFormSchema: EsFormSchema =
  formSchemaTransform.toSearchSchema(chapterFormSchema, {
    canComment: {
      show: true,
    },
    canDownload: {
      show: true,
    },
    isPreview: {
      show: true,
    },
    isPublished: {
      component: 'Select',
      componentProps: {
        options: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
        placeholder: '发布状态',
      },
    },
    title: {
      show: true,
    },
    viewRule: {
      show: true,
    },
  });
