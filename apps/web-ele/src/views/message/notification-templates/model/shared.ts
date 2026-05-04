import type { AdminMessageNotificationTemplateDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

import {
  getNotificationCategoryLabel,
  notificationCategoryOptions,
} from '../../model/notification';

const enabledOption = { label: '启用', value: true, color: 'success' as const };
const disabledOption = { label: '停用', value: false, color: 'info' as const };

export const enabledOptions = [enabledOption, disabledOption];

export function getEnabledOption(value?: boolean) {
  return value ? enabledOption : disabledOption;
}

export function formatCategory(
  record: Pick<
    AdminMessageNotificationTemplateDto,
    'categoryKey' | 'categoryLabel'
  >,
) {
  return (
    record.categoryLabel ||
    getNotificationCategoryLabel(record.categoryKey) ||
    '-'
  );
}

export function createTemplateFormSchema(
  onCategoryChange?: (categoryKey?: string) => void,
): EsFormSchema {
  return [
    {
      component: 'Select',
      componentProps: {
        clearable: true,
        filterable: true,
        onChange: onCategoryChange,
        options: notificationCategoryOptions,
        placeholder: '请选择通知分类',
      },
      fieldName: 'categoryKey',
      label: '通知分类',
      rules: 'required',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        class: 'w-full',
        options: enabledOptions.map(({ color: _color, ...rest }) => rest),
      },
      defaultValue: true,
      fieldName: 'isEnabled',
      label: '是否启用',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        clearable: true,
        placeholder:
          '请输入标题模板，如 {{title}}、{{actor.nickname}}、{{data.object.title}}',
      },
      fieldName: 'titleTemplate',
      formItemClass: 'col-span-2',
      label: '标题模板',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder:
          '请输入正文模板，支持 {{content}}、{{data.object.title}}、{{data.object.snippet}} 等占位符',
        rows: 6,
        type: 'textarea',
      },
      fieldName: 'contentTemplate',
      formItemClass: 'col-span-2',
      label: '正文模板',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入备注',
        rows: 3,
        type: 'textarea',
      },
      fieldName: 'remark',
      formItemClass: 'col-span-2',
      label: '备注',
    },
  ];
}

export const templateFormSchema = createTemplateFormSchema();

export const searchFormSchema: EsFormSchema = [
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      filterable: true,
      options: notificationCategoryOptions,
      placeholder: '通知分类',
    },
    fieldName: 'categoryKey',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: enabledOptions.map(({ color: _color, ...rest }) => rest),
      placeholder: '启用状态',
    },
    fieldName: 'isEnabled',
  },
  {
    component: 'DatePicker',
    componentProps: {
      clearable: true,
      endPlaceholder: '创建结束时间',
      startPlaceholder: '创建开始时间',
      type: 'daterange',
      valueFormat: 'YYYY-MM-DD',
    },
    fieldName: 'dateRange',
  },
];

const templateTableSchema: EsFormSchema = [
  { component: 'InputNumber', fieldName: 'id', label: '模板 ID' },
  { component: 'Select', fieldName: 'categoryLabel', label: '通知分类' },
  { component: 'Input', fieldName: 'titleTemplate', label: '标题模板' },
  { component: 'Input', fieldName: 'contentTemplate', label: '正文模板' },
  { component: 'RadioGroup', fieldName: 'isEnabled', label: '启用状态' },
  { component: 'Input', fieldName: 'remark', label: '备注' },
];

export const pageColumns =
  formSchemaTransform.toTableColumns<AdminMessageNotificationTemplateDto>(
    templateTableSchema,
    {
      id: {
        fixed: 'left',
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 90,
        sortable: true,
      },
      categoryLabel: {
        formatter: undefined,
        minWidth: 180,
        slots: { default: 'category' },
      },
      titleTemplate: {
        minWidth: 240,
        showOverflow: 'tooltip',
      },
      contentTemplate: {
        minWidth: 320,
        showOverflow: 'tooltip',
      },
      isEnabled: {
        formatter: undefined,
        minWidth: 110,
        slots: { default: 'isEnabled' },
      },
      remark: {
        formatter: ({ cellValue }) => cellValue || '-',
        minWidth: 180,
        showOverflow: 'tooltip',
      },
      createdAt: {
        cellRender: {
          name: 'CellDate',
        },
        minWidth: 160,
        sortable: true,
      },
      updatedAt: {
        cellRender: {
          name: 'CellDate',
        },
        minWidth: 160,
        sortable: true,
      },
      actions: {
        show: true,
        fixed: 'right',
        slots: { default: 'actions' },
        width: 170,
      },
    },
  );
