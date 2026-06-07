import type { BaseUserLevelRuleDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

export const LEVEL_RULE_DEFAULT_BUSINESS = '__default__';

export const levelRuleBusinessOptions = [
  {
    label: '默认业务域',
    value: LEVEL_RULE_DEFAULT_BUSINESS,
  },
  {
    label: '论坛业务域',
    value: 'forum',
  },
];

export function formatLevelRuleBusiness(value?: null | string) {
  return (
    levelRuleBusinessOptions.find(
      (item) => item.value === (value ?? LEVEL_RULE_DEFAULT_BUSINESS),
    )?.label ?? '默认业务域'
  );
}

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
      maxCount: 1,
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
    component: 'Select',
    componentProps: {
      clearable: false,
      options: levelRuleBusinessOptions,
      placeholder: '请选择业务域',
    },
    defaultValue: LEVEL_RULE_DEFAULT_BUSINESS,
    fieldName: 'business',
    label: '业务域',
    rules: 'selectRequired',
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
      max: 1,
      min: 0,
      placeholder: '请选择积分支付比例（0-1）',
      precision: 2,
      step: 0.01,
    },
    defaultValue: 1,
    fieldName: 'purchasePayableRate',
    label: '积分支付比例',
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
    business: {
      formatter: ({ cellValue }) => formatLevelRuleBusiness(cellValue),
      minWidth: 120,
    },
    purchasePayableRate: {
      minWidth: 120,
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
  business: {
    show: true,
  },
  requiredExperience: {
    show: false,
  },
});
