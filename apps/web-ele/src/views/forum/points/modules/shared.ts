import type { BasePointRuleDto } from '#/apis/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

import { pointsTypeOptions } from './constants';

export const formSchema: EsFormSchema = [
  {
    component: 'Select',
    componentProps: {
      placeholder: '请选择规则类型',
      options: pointsTypeOptions,
    },
    fieldName: 'type',
    label: '规则类型',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入积分变化',
      min: -9999,
      max: 9999,
    },
    fieldName: 'points',
    label: '积分变化',
    rules: 'required',
    help: '正数为获得积分，负数为消费积分',
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '0表示无限制',
      min: 0,
    },
    fieldName: 'dailyLimit',
    label: '每日上限',
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
    },
    fieldName: 'isEnabled',
    label: '是否启用',
    rules: 'required',
    defaultValue: true,
  },
  {
    component: 'Input',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入备注',
      rows: 4,
    },
    fieldName: 'remark',
    label: '备注',
    formItemClass: 'col-span-2',
  },
];

export const pageColumns =
  formSchemaTransform.toTableColumns<BasePointRuleDto>(formSchema, {
    type: {
      minWidth: 120,
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: pointsTypeOptions,
        },
      },
    },
    points: {
      minWidth: 120,
      cellRender: {
        name: 'CellTag',
        props: {
          formatter: (value: number) => {
            return value > 0 ? `+${value}` : value;
          },
          type: (value: number) => (value > 0 ? 'success' : 'danger'),
        },
      },
    },
    dailyLimit: {
      minWidth: 120,
      cellRender: {
        name: 'CellTag',
        props: {
          formatter: (value: number) => {
            return value === 0 ? '无限制' : value;
          },
          type: (value: number) => {
            return value === 0 ? 'danger' : 'success';
          },
        },
      },
    },
    remark: {
      hide: true,
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
  });

export const searchFormSchema = formSchemaTransform.toSearchSchema(formSchema, {
  type: {
    show: true,
  },
  isEnabled: {
    show: true,
  },
});
