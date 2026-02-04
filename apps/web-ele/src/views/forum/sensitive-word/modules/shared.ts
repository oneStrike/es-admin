import type { CreateSensitiveWordDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { z } from '#/adapter/form';
import { formSchemaTransform } from '#/utils';

import {
  matchModeOptions,
  sensitiveWordLevelOptions,
  sensitiveWordTypeOptions,
} from './constants';

export const formSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入敏感词',
    },
    fieldName: 'word',
    label: '敏感词',
    rules: z.string().nonempty('请输入敏感词'),
  },
  {
    component: 'Select',
    componentProps: {
      placeholder: '请选择敏感词类型',
      options: sensitiveWordTypeOptions,
    },
    fieldName: 'type',
    label: '敏感词类型',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      placeholder: '请选择敏感词级别',
      options: sensitiveWordLevelOptions,
    },
    fieldName: 'level',
    label: '敏感词级别',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      placeholder: '请选择匹配模式',
      options: matchModeOptions,
    },
    fieldName: 'matchMode',
    label: '匹配模式',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入替换词',
    },
    fieldName: 'replaceWord',
    label: '替换词',
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
  formSchemaTransform.toTableColumns<CreateSensitiveWordDto>(formSchema, {
    remark: {
      showOverflow: 'tooltip',
    },
    replaceWord: {
      title: '替换词',
      minWidth: 120,
    },
    type: {
      title: '敏感词类型',
      minWidth: 120,
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: sensitiveWordTypeOptions,
        },
      },
    },
    level: {
      title: '敏感词级别',
      minWidth: 120,
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: sensitiveWordLevelOptions,
        },
      },
    },
    matchMode: {
      title: '匹配模式',
      minWidth: 120,
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: matchModeOptions,
        },
      },
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
  });

export const searchFormSchema = formSchemaTransform.toSearchSchema(formSchema, {
  word: {
    show: true,
  },
  type: {
    show: true,
  },
  level: {
    show: true,
  },
  isEnabled: {
    show: true,
  },
});
