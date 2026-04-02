import type { BaseUserLevelRuleDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

export const formSchema: EsFormSchema = [
  {
    component: 'Divider',
    fieldName: '_baseInfoDivider',
    formItemClass: 'col-span-2',
    renderComponentContent: () => {
      return {
        default: () => h('div', '基础信息'),
      };
    },
  },
  {
    component: 'Upload',
    componentProps: {
      placeholder: '请上传等级图标',
      accept: 'image/*',
      scene: 'levelRule',
    },
    fieldName: 'icon',
    label: '等级图标',
    rules: 'uploadRequired',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入等级名称',
    },
    fieldName: 'name',
    label: '等级名称',
    rules: 'required',
  },
  {
    component: 'ColorPicker',
    componentProps: {
      placeholder: '请选择等级专属标识颜色',
    },
    fieldName: 'color',
    label: '专属颜色',
    rules: 'selectRequired',
  },
  {
    component: 'Upload',
    componentProps: {
      placeholder: '请上传等级徽章',
      accept: 'image/*',
      scene: 'levelRule',
    },
    fieldName: 'badge',
    label: '等级徽章',
  },
  {
    component: 'Input',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入等级描述',
      rows: 4,
    },
    fieldName: 'description',
    label: '等级描述',
    formItemClass: 'col-span-2',
    rules: 'required',
  },
  {
    component: 'Divider',
    fieldName: '_upgradeRequirementDivider',
    formItemClass: 'col-span-2',
    renderComponentContent: () => {
      return {
        default: () => h('div', '升级要求'),
      };
    },
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入所需经验值',
      min: 0,
    },
    fieldName: 'requiredExperience',
    label: '所需经验值',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入排序值（数值越小越靠前）',
      min: 0,
    },
    fieldName: 'sortOrder',
    label: '排序值',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入所需登录天数',
      min: 0,
    },
    defaultValue: 0,
    fieldName: 'loginDays',
    label: '所需登录天数',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入积分购买折扣（0-1）',
    },
    defaultValue: '1',
    fieldName: 'discount',
    label: '积分购买折扣',
    rules: 'required',
  },
  {
    component: 'Divider',
    fieldName: '_permissionDivider',
    formItemClass: 'col-span-2',
    renderComponentContent: () => {
      return {
        default: () => '权限限制',
      };
    },
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '0表示无限制',
      min: 0,
    },
    fieldName: 'dailyTopicLimit',
    label: '每日发帖上限',
    rules: 'required',
    help: '0表示无限制',
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '0表示无限制',
      min: 0,
    },
    fieldName: 'dailyReplyCommentLimit',
    label: '每日回复和评论上限',
    rules: 'required',
    help: '0表示无限制',
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '0表示无限制',
      min: 0,
    },
    fieldName: 'dailyLikeLimit',
    label: '每日点赞上限',
    rules: 'required',
    help: '0表示无限制',
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '0表示无限制',
      min: 0,
    },
    fieldName: 'dailyFavoriteLimit',
    label: '每日收藏上限',
    rules: 'required',
    help: '0表示无限制',
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '0表示无限制',
      min: 0,
    },
    defaultValue: 0,
    fieldName: 'workCollectionLimit',
    label: '作品收藏上限',
    rules: 'required',
    help: '0表示无限制',
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '0表示无限制',
      min: 0,
    },
    defaultValue: 0,
    fieldName: 'blacklistLimit',
    label: '黑名单上限',
    rules: 'required',
    help: '0表示无限制',
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '0表示无限制',
      min: 0,
    },
    fieldName: 'postInterval',
    label: '发帖间隔秒数',
    rules: 'required',
    help: '0表示无限制',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      placeholder: '请选择是否启用',
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
      class: 'w-full',
    },
    fieldName: 'isEnabled',
    label: '是否启用',
    rules: 'required',
    defaultValue: true,
  },
];

export const pageColumns =
  formSchemaTransform.toTableColumns<BaseUserLevelRuleDto>(formSchema, {
    icon: {
      minWidth: 100,
      cellRender: {
        name: 'CellImage',
      },
    },
    badge: {
      minWidth: 100,
      cellRender: {
        name: 'CellImage',
      },
    },
    color: {
      minWidth: 120,
      slots: { default: 'color' },
    },
    description: {
      hide: true,
    },
    discount: {
      hide: true,
    },
    loginDays: {
      hide: true,
    },
    workCollectionLimit: {
      hide: true,
    },
    blacklistLimit: {
      hide: true,
    },
    dailyReplyCommentLimit: {
      minWidth: 150,
    },
    dailyLikeLimit: {
      minWidth: 120,
    },
    dailyFavoriteLimit: {
      minWidth: 120,
    },
    postInterval: {
      minWidth: 140,
    },
    requiredExperience: {
      minWidth: 120,
    },
    isEnabled: {
      show: true,
      minWidth: 100,
      slots: { default: 'isEnabled' },
    },
    actions: {
      show: true,
    },
  });

export const searchFormSchema = formSchemaTransform.toSearchSchema(formSchema, {
  name: {
    show: true,
  },
  isEnabled: {
    show: true,
  },
  requiredExperience: {
    show: false,
  },
});
