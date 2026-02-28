import type { EsFormSchema } from '#/types';

// 阅读权限配置
import { ContentPermissionEnum, DownloadPermissionEnum } from '#/enum';
import { formSchemaTransform } from '#/utils';

// 查看规则配置（-1=继承, 0=所有人, 1=登录用户, 2=会员, 3=积分购买）
export const readRule = [
  { label: '继承', value: -1, color: 'info' },
  { label: '所有人', value: ContentPermissionEnum.ALL, color: '' },
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
  {
    label: '积分购买',
    value: DownloadPermissionEnum.PURCHASE,
    color: 'warning',
  },
];

export const downloadRuleMap = Object.fromEntries(
  downloadRule.map((item) => [item.value, item.label]),
);

export const chapterFormSchema: EsFormSchema = [
  // ========== 基本信息 ==========
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
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入章节序号',
      min: 0,
      max: 9999,
    },
    formItemClass: 'col-span-1',
    fieldName: 'sortOrder',
    label: '章节序号',
    rules: 'required',
  },
  {
    component: 'Upload',
    componentProps: {
      placeholder: '请上传章节封面',
      accept: 'image/*',
      scene: 'chapter',
    },
    fieldName: 'cover',
    label: '章节封面',
    formItemClass: 'col-span-1',
  },
  {
    fieldName: 'description',
    label: '章节描述',
    component: 'Input',
    formItemClass: 'col-span-4',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入章节描述',
      rows: 4,
    },
  },

  // ========== 权限设置 ==========
  {
    component: 'Divider',
    componentProps: {
      contentPosition: 'left',
    },
    fieldName: 'divider_permission',
    label: '权限设置',
  },
  {
    fieldName: 'viewRule',
    label: '查看规则',
    component: 'Select',
    formItemClass: 'col-span-2',
    rules: 'required',
    defaultValue: -1,
    componentProps: {
      placeholder: '请选择查看规则',
      options: readRule,
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
    fieldName: 'canDownload',
    label: '允许下载',
    component: 'RadioGroup',
    defaultValue: false,
    formItemClass: 'col-span-1',
    componentProps: {
      options: [
        { label: '否', value: false },
        { label: '是', value: true },
      ],
    },
  },
  {
    fieldName: 'canExchange',
    label: '允许兑换',
    component: 'RadioGroup',
    defaultValue: false,
    formItemClass: 'col-span-1',
    componentProps: {
      options: [
        { label: '否', value: false },
        { label: '是', value: true },
      ],
    },
  },
  {
    component: 'Select',
    componentProps: {
      options: [],
      placeholder: '请选择会员等级限制',
      filterable: true,
    },
    formItemClass: 'col-span-2',
    fieldName: 'requiredViewLevelId',
    label: '会员等级限制（查看）',
    dependencies: {
      show: ({ viewRule }) => {
        return viewRule === ContentPermissionEnum.VIP;
      },
      triggerFields: ['viewRule'],
    },
  },

  // ========== 价格设置 ==========
  {
    component: 'Divider',
    componentProps: {
      contentPosition: 'left',
    },
    fieldName: 'divider_price',
    label: '价格设置',
  },
  {
    fieldName: 'price',
    label: '章节价格',
    component: 'InputNumber',
    formItemClass: 'col-span-2',
    defaultValue: 0,
    componentProps: {
      placeholder: '请输入章节价格',
      min: 0,
      precision: 2,
    },
    dependencies: {
      show: ({ viewRule }) => {
        return viewRule === ContentPermissionEnum.PURCHASE;
      },
      triggerFields: ['viewRule'],
    },
  },
  {
    fieldName: 'exchangePoints',
    label: '兑换所需积分',
    component: 'InputNumber',
    formItemClass: 'col-span-2',
    defaultValue: 0,
    componentProps: {
      placeholder: '请输入兑换所需积分',
      min: 0,
    },
    dependencies: {
      show: ({ canExchange }) => {
        return canExchange === true;
      },
      triggerFields: ['canExchange'],
    },
  },

  // ========== 发布设置 ==========
  {
    component: 'Divider',
    componentProps: {
      contentPosition: 'left',
    },
    fieldName: 'divider_publish',
    label: '发布设置',
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
    component: 'DatePicker',
    componentProps: {
      placeholder: '请选择发布日期',
      type: 'date',
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
    fieldName: 'publishAt',
    label: '发布日期',
    formItemClass: 'col-span-2',
  },

  // ========== 内容管理 ==========
  {
    component: 'Divider',
    componentProps: {
      contentPosition: 'left',
    },
    fieldName: 'divider_content',
    label: '内容管理',
  },
  {
    fieldName: 'content',
    label: '内容存储路径',
    component: 'Input',
    formItemClass: 'col-span-2',
    componentProps: {
      placeholder: '请输入内容存储路径',
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
    isPublished: {
      show: true,
    },
  });
