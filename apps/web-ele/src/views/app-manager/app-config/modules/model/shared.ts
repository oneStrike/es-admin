import type { AppConfigUpdateRequest, BaseAppConfigDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { ElText } from 'element-plus';

import { UploadSceneEnum } from '#/enum/api';

export type AppConfigFormValues = Record<string, unknown>;

function textValue(value: unknown) {
  return typeof value === 'string' ? value : undefined;
}

function booleanValue(value: unknown) {
  return typeof value === 'boolean' ? value : undefined;
}

function sectionTitle(title: string) {
  return () =>
    h(ElText, { class: 'text-base font-medium', tag: 'span' }, () => title);
}

/**
 * 应用配置编辑表单源 schema，同时作为回填与提交 payload 白名单的字段来源。
 */
export const formSchema: EsFormSchema = [
  {
    component: 'Divider',
    fieldName: 'divider_base',
    hideLabel: true,
    formItemClass: 'col-span-2',
    renderComponentContent: () => {
      return {
        default: sectionTitle('应用基本信息'),
      };
    },
  },
  {
    component: 'Input',
    fieldName: 'appName',
    label: '应用名称',
    componentProps: {
      placeholder: '请输入应用名称',
    },
    rules: 'required',
  },
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
  {
    component: 'Input',
    fieldName: 'version',
    label: '配置版本号',
    componentProps: {
      placeholder: '请输入配置版本号',
    },
    rules: 'required',
  },
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
  {
    component: 'ColorPicker',
    fieldName: 'themeColor',
    label: '主题色',
    componentProps: {
      placeholder: '请选择主题色',
    },
    rules: 'selectRequired',
  },
  {
    component: 'ColorPicker',
    fieldName: 'secondaryColor',
    label: '第二主题色',
    componentProps: {
      placeholder: '请选择第二主题色',
    },
  },
  {
    component: 'MultiColorPicker',
    fieldName: 'optionalThemeColors',
    label: '可选主题色',
    componentProps: {
      placeholder: '请选择可选主题色，可自定义颜色名称',
    },
  },
  {
    component: 'Divider',
    fieldName: 'divider_maintenance',
    hideLabel: true,
    formItemClass: 'col-span-2',
    renderComponentContent: () => {
      return {
        default: sectionTitle('维护模式设置'),
      };
    },
  },
  {
    component: 'Switch',
    fieldName: 'enableMaintenanceMode',
    label: '启用维护模式',
    help: '启用后，普通用户将无法访问系统',
  },
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

export function buildAppConfigFormValues(
  config: BaseAppConfigDto | null,
): AppConfigFormValues {
  if (!config) {
    return {};
  }

  return {
    appDesc: config.appDesc,
    appLogo: config.appLogo,
    appName: config.appName,
    enableMaintenanceMode: config.enableMaintenanceMode,
    maintenanceMessage: config.maintenanceMessage,
    onboardingImage: config.onboardingImage,
    optionalThemeColors: config.optionalThemeColors,
    secondaryColor: config.secondaryColor,
    themeColor: config.themeColor,
    version: config.version,
  };
}

export function buildAppConfigUpdatePayload(values: AppConfigFormValues) {
  return {
    appDesc: textValue(values.appDesc) ?? null,
    appLogo: textValue(values.appLogo) ?? null,
    appName: textValue(values.appName) ?? '',
    enableMaintenanceMode: booleanValue(values.enableMaintenanceMode) ?? false,
    maintenanceMessage: textValue(values.maintenanceMessage) ?? null,
    onboardingImage: textValue(values.onboardingImage) ?? null,
    optionalThemeColors: textValue(values.optionalThemeColors) ?? null,
    secondaryColor: textValue(values.secondaryColor) ?? null,
    themeColor: textValue(values.themeColor) ?? '',
    version: textValue(values.version) ?? '',
  } satisfies AppConfigUpdateRequest;
}
