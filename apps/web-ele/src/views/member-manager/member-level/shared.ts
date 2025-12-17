import type { BaseMemberLevelDto } from '#/apis/types/memberLevel';
import type { EsFormSchema } from '#/types';

import { h } from 'vue';

import { z } from '#/adapter/form';
import { formSchemaTransform } from '#/utils';

/**
 * 会员等级管理模块的表单 Schema
 */
export const formSchema: EsFormSchema = [
  // 基础信息分组标题
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
      placeholder: '请上传会员等级图标',
      accept: 'image/*',
      scene: 'memberLevel',
    },
    fieldName: 'icon',
    label: '等级图标',
    rules: z.string().nonempty('请上传会员等级图标'),
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入会员等级名称',
    },
    fieldName: 'name',
    label: '等级名称',
    rules: 'required',
  },

  {
    component: 'ColorPicker',
    componentProps: {
      placeholder: '请选择会员等级专属标识颜色',
    },
    fieldName: 'color',
    label: '标识颜色',
    rules: 'selectRequired',
  },
  {
    component: 'Input',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入会员等级描述',
      rows: 3,
    },
    fieldName: 'description',
    label: '等级描述',
    formItemClass: 'col-span-2',
    rules: 'required',
  },

  // 升级要求分组标题
  {
    component: 'Divider',
    fieldName: '_upgradeRequirementDivider',
    formItemClass: 'col-span-2',
    hideLabel: true,
    renderComponentContent: () => {
      return {
        default: () => '升级要求',
      };
    },
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入会员等级所需要的积分',
      min: 0,
    },
    fieldName: 'points',
    label: '所需积分',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入会员等级所需要的登录天数',
      min: 0,
    },
    fieldName: 'loginDays',
    label: '所需登录天数',
    rules: 'required',
  },

  // 等级特权分组标题
  {
    component: 'Divider',
    fieldName: '_privilegeDivider',
    formItemClass: 'col-span-2',
    hideLabel: true,
    renderComponentContent: () => {
      return {
        default: () => '等级特权',
      };
    },
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入积分购买折扣（0-1之间的小数）',
      min: 0,
      max: 1,
      step: 0.01,
    },
    fieldName: 'discount',
    label: '积分购买折扣',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入作品收藏上限',
      min: 0,
    },
    fieldName: 'workCollectionLimit',
    label: '作品收藏上限',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入黑名单上限',
      min: 0,
    },
    fieldName: 'blacklistLimit',
    label: '黑名单上限',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入备注信息',
      rows: 3,
    },
    fieldName: 'remark',
    label: '备注信息',
    formItemClass: 'col-span-2',
  },
];

/**
 * 列定义：依据 formSchema 自动转换为表格列，并按需覆盖展示细节
 */
export const pageColumns =
  formSchemaTransform.toTableColumns<BaseMemberLevelDto>(formSchema, {
    icon: {
      minWidth: 100,
      cellRender: {
        name: 'CellImage',
      },
    },
    color: {
      title: '标识颜色',
      minWidth: 100,
      slots: { default: 'color' },
    },
    points: {
      title: '所需积分',
      minWidth: 100,
    },
    loginDays: {
      title: '所需登录天数',
      minWidth: 120,
    },
    discount: {
      title: '积分购买折扣',
      minWidth: 120,
      formatter: ({ cellValue }) => {
        return `${(cellValue * 100).toFixed(0)}%`;
      },
    },
    workCollectionLimit: {
      title: '作品收藏上限',
      minWidth: 120,
    },
    blacklistLimit: {
      title: '黑名单上限',
      minWidth: 120,
    },
    isEnabled: {
      show: true,
      title: '是否启用',
      minWidth: 100,
      slots: { default: 'isEnabled' },
    },
    createdAt: {
      show: true,
      title: '创建时间',
      minWidth: 160,
    },
    actions: {
      show: true,
      width: 180,
      slots: { default: 'actions' },
    },
  });

/**
 * 搜索表单 Schema：从 formSchema 选择常用筛选项
 */
export const pageFilter = formSchemaTransform.toSearchSchema(formSchema, {
  name: {
    show: true,
  },
  isEnabled: {
    show: true,
    label: '状态',
    component: 'Select',
    componentProps: {
      clearable: true,
      options: [
        { label: '启用', value: true },
        { label: '禁用', value: false },
      ],
    },
  },
});
