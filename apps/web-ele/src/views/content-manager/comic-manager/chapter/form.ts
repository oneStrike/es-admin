import type { EsFormSchema } from '#/types';

export const chapterFormSchema: EsFormSchema = [
  {
    fieldName: 'title',
    label: '章节标题',
    component: 'Input',
    rules: 'required',
    componentProps: {
      placeholder: '请输入章节标题',
    },
  },
  {
    fieldName: 'subtitle',
    label: '章节副标题',
    component: 'Input',
    componentProps: {
      placeholder: '请输入章节副标题',
    },
  },
  {
    fieldName: 'sortOrder',
    label: '章节序号',
    component: 'InputNumber',
    rules: 'required',
    defaultValue: 0,
    componentProps: {
      placeholder: '请输入章节序号',
      min: 0,
    },
  },
  {
    fieldName: 'readRule',
    label: '查看规则',
    component: 'Select',
    rules: 'required',
    defaultValue: 0,
    componentProps: {
      placeholder: '请选择查看规则',
      options: [
        { label: '公开', value: 0 },
        { label: '登录', value: 1 },
        { label: '会员', value: 2 },
        { label: '购买', value: 3 },
      ],
    },
  },
  {
    fieldName: 'downloadRule',
    label: '下载规则',
    component: 'Select',
    rules: 'required',
    defaultValue: 0,
    componentProps: {
      placeholder: '请选择下载规则',
      options: [
        { label: '禁止', value: 0 },
        { label: '允许', value: 1 },
        { label: 'VIP可下载', value: 2 },
        { label: '积分可下载', value: 3 },
      ],
    },
  },
  {
    fieldName: 'isPreview',
    label: '是否为试读章节',
    component: 'Switch',
    defaultValue: false,
  },
  {
    fieldName: 'canComment',
    label: '是否允许评论',
    component: 'Switch',
    defaultValue: true,
  },
  {
    fieldName: 'isPublished',
    label: '是否发布',
    component: 'Switch',
    defaultValue: true,
  },
  {
    fieldName: 'readPoints',
    label: '购买需要消耗的积分',
    component: 'InputNumber',
    defaultValue: 0,
    componentProps: {
      placeholder: '请输入购买需要消耗的积分',
      min: 0,
    },
  },
  {
    fieldName: 'downloadPoints',
    label: '下载所需要的积分',
    component: 'InputNumber',
    defaultValue: 0,
    componentProps: {
      placeholder: '请输入下载所需要的积分',
      min: 0,
    },
  },
  {
    fieldName: 'remark',
    label: '管理员备注',
    component: 'Input',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入管理员备注',
      rows: 4,
    },
  },
];
