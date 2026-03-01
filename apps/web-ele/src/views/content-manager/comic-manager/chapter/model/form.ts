import type { EsFormSchema } from '#/types';

// 阅读权限配置
import { ContentPermissionEnum, DownloadPermissionEnum } from '#/enum';
import { formSchemaTransform } from '#/utils';

// 查看规则配置（-1=继承, 0=所有人, 1=登录用户, 2=会员, 3=购买）
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

export const downloadRule = [
  { label: '禁止', value: DownloadPermissionEnum.DENY, color: 'danger' },
  { label: '允许', value: DownloadPermissionEnum.ALLOW, color: 'success' },
  { label: '会员', value: DownloadPermissionEnum.VIP, color: 'info' },
  {
    label: '购买',
    value: DownloadPermissionEnum.PURCHASE,
    color: 'warning',
  },
];

export const downloadRuleMap = Object.fromEntries(
  downloadRule.map((item) => [item.value, item.label]),
);

/**
 * 章节表单配置
 * 严格对应接口 CreateWorkChapterDto / UpdateWorkChapterDto
 */
export const chapterFormSchema: EsFormSchema = [
  {
    component: 'Upload',
    componentProps: {
      placeholder: '请上传章节封面',
      accept: 'image/*',
      scene: 'chapter',
      maxCount: 1,
      multiple: false,
    },
    fieldName: 'cover',
    label: '章节封面',
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入章节序号',
      min: 0,
      max: 9999,
      class: '!w-full',
    },
    fieldName: 'sortOrder',
    label: '章节序号',
    rules: 'required',
  },
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
    fieldName: 'viewRule',
    label: '查看规则',
    component: 'Select',
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
    fieldName: 'requiredViewLevelId',
    label: '会员等级限制（查看）',
    dependencies: {
      show: ({ viewRule }) => {
        return viewRule === ContentPermissionEnum.VIP;
      },
      triggerFields: ['viewRule'],
    },
  },
  {
    fieldName: 'price',
    label: '章节价格',
    component: 'InputNumber',
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
  {
    component: 'DatePicker',
    componentProps: {
      placeholder: '请选择发布日期',
      type: 'date',
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
      class: '!w-full',
    },
    fieldName: 'publishAt',
    label: '发布日期',
    help: '作品真实发布日期，非系统关联数据',
  },
  {
    fieldName: 'description',
    label: '章节描述',
    component: 'Input',
    formItemClass: 'col-span-2',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入章节描述',
      rows: 4,
    },
  },
  {
    fieldName: 'remark',
    label: '管理员备注',
    component: 'Input',
    formItemClass: 'col-span-2',
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
    canDownload: {
      show: true,
    },
    canExchange: {
      show: true,
    },
    viewRule: {
      show: true,
    },
    isPublished: {
      component: 'Select',
      componentProps: {
        placeholder: '发布状态',
        options: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
      },
    },
  });
