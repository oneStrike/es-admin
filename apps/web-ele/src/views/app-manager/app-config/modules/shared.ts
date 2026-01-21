import type { EsFormSchema } from '#/types';

import { UploadSceneEnum } from '#/enum/api';

// 应用设置表单配置
export const formSchema: EsFormSchema = [
  // 应用基本信息分隔符
  {
    component: 'Divider',
    fieldName: 'divider_base',
    hideLabel: true,
    formItemClass: 'col-span-2',
    renderComponentContent: () => {
      return {
        default: () => h('div', { class: 'text-red-400' }, '应用基本信息'),
      };
    },
  },
  // 应用名称输入框
  {
    component: 'Input',
    fieldName: 'appName',
    label: '应用名称',
    componentProps: {
      placeholder: '请输入应用名称',
    },
    rules: 'required',
  },
  // 应用描述输入框
  {
    component: 'Input',
    fieldName: 'appDesc',
    label: '应用描述',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入应用描述',
      rows: 3,
    },
  },
  // 配置版本号输入框
  {
    component: 'Input',
    fieldName: 'version',
    label: '配置版本号',
    componentProps: {
      placeholder: '请输入配置版本号',
    },
    rules: 'required',
  },
  // 应用Logo上传
  {
    component: 'Upload',
    fieldName: 'appLogo',
    label: '应用Logo',
    componentProps: {
      maxCount: 1,
      scene: UploadSceneEnum.SHARED,
      placeholder: '请上传应用Logo',
    },
  },
  // 引导页图片上传
  {
    component: 'Upload',
    fieldName: 'onboardingImage',
    label: '引导页图片',
    componentProps: {
      maxCount: 5,
      scene: UploadSceneEnum.SHARED,
      returnDataType: 'url',
      placeholder: '请上传引导页图片，最多5张',
    },
  },
  // 主题色选择器
  {
    component: 'ColorPicker',
    fieldName: 'themeColor',
    label: '主题色',
    componentProps: {
      placeholder: '请选择主题色',
    },
    rules: 'selectRequired',
  },
  // 第二主题色选择器
  {
    component: 'ColorPicker',
    fieldName: 'secondaryColor',
    label: '第二主题色',
    componentProps: {
      placeholder: '请选择第二主题色',
    },
  },
  // 可选主题色多选器
  {
    component: 'MultiColorPicker',
    fieldName: 'optionalThemeColors',
    label: '可选主题色',
    componentProps: {
      placeholder: '请选择可选主题色',
    },
  },
  // 维护模式设置分隔符
  {
    component: 'Divider',
    fieldName: 'divider_maintenance',
    hideLabel: true,
    formItemClass: 'col-span-2',
    renderComponentContent: () => {
      return {
        default: () => h('div', { class: 'text-red-400' }, '维护模式设置'),
      };
    },
  },
  // 维护模式开关
  {
    component: 'Switch',
    fieldName: 'enableMaintenanceMode',
    label: '启用维护模式',
    help: '启用后，普通用户将无法访问系统',
  },
  // 维护提示信息输入框
  {
    component: 'Input',
    fieldName: 'maintenanceMessage',
    label: '维护提示信息',
    formItemClass: 'col-span-2',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入维护模式下的提示信息',
      rows: 4,
    },
    dependencies: {
      triggerFields: ['enableMaintenanceMode'],
      show: (values) => values.enableMaintenanceMode,
    },
  },
];
