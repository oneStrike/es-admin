import type { BaseUserBadgeDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

import { badgeTypeOptions } from './constants';

export const formSchema: EsFormSchema = [
  {
    component: 'Upload',
    componentProps: {
      placeholder: '请上传徽章图标',
      accept: 'image/*',
      maxCount: 1,
      returnDataType: 'url',
    },
    fieldName: 'icon',
    label: '徽章图标',
    rules: 'uploadRequired',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入徽章名称',
    },
    fieldName: 'name',
    label: '徽章名称',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      placeholder: '请选择徽章类型',
      options: badgeTypeOptions,
    },
    fieldName: 'type',
    label: '徽章类型',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      min: 0,
      max: 999_999_999,
      align: 'left',
      class: '!w-full',
      controlsPosition: 'right',
      placeholder: '请输入排序值（数值越小越靠前）',
    },
    fieldName: 'sortOrder',
    label: '排序',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入事件键',
    },
    fieldName: 'eventKey',
    label: '事件键',
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
    },
    fieldName: 'isEnabled',
    label: '是否启用',
    rules: 'required',
    defaultValue: true,
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入徽章描述',
      type: 'textarea',
      rows: 4,
    },
    fieldName: 'description',
    label: '徽章描述',
    formItemClass: 'col-span-2',
  },
];

export const pageColumns = formSchemaTransform.toTableColumns<BaseUserBadgeDto>(
  formSchema,
  {
    icon: {
      cellRender: {
        name: 'CellImage',
      },
      minWidth: 80,
    },
    type: {
      minWidth: 120,
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: badgeTypeOptions,
        },
      },
    },
    description: {
      minWidth: 200,
      showOverflow: 'tooltip',
    },
    sortOrder: {
      title: '排序',
      sortable: true,
      minWidth: 100,
    },
    eventKey: {
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
    },
    updatedAt: {
      show: true,
    },
    actions: {
      show: true,
    },
  },
);

export const searchFormSchema = formSchemaTransform.toSearchSchema(formSchema, {
  name: {
    show: true,
  },
  type: {
    show: true,
  },
  isEnabled: {
    show: true,
  },
  eventKey: {
    show: true,
  },
});
