import type { BaseLevelRuleDto } from '#/apis/types';
import type { EsFormSchema } from '#/types';

import { h } from 'vue';

import { z } from '#/adapter/form';
import { formSchemaTransform } from '#/utils';

/**
 * 论坛等级规则管理模块的表单 Schema
 */
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
    rules: z.string().nonempty('请上传等级图标'),
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

/**
 * 列定义：依据 formSchema 自动转换为表格列，并按需覆盖展示细节
 */
export const pageColumns = formSchemaTransform.toTableColumns<BaseLevelRuleDto>(
  formSchema,
  {
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
    dailyReplyCommentLimit: {
      title: '每日回复和评论上限',
      minWidth: 150,
    },
    dailyLikeLimit: {
      title: '每日点赞上限',
      minWidth: 120,
    },
    dailyFavoriteLimit: {
      title: '每日收藏上限',
      minWidth: 120,
    },
    postInterval: {
      title: '发帖间隔秒数',
      minWidth: 140,
    },
    requiredExperience: {
      title: '所需经验值',
      minWidth: 120,
    },
    isEnabled: {
      show: true,
      title: '是否启用',
      minWidth: 100,
      slots: { default: 'isEnabled' },
    },
    actions: {
      show: true,
    },
  },
);

/**
 * 搜索表单配置
 */
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
