import type { AuditItemDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formatUTC, formSchemaTransform } from '#/utils';

// 登录日志表格列配置
const loginLogTableSchema: EsFormSchema = [
  { component: 'Input', fieldName: 'username', label: '用户名' },
  { component: 'Input', fieldName: 'ip', label: '登录IP' },
  { component: 'Input', fieldName: 'userAgent', label: '用户代理' },
  { component: 'Select', fieldName: 'isSuccess', label: '登录结果' },
  { component: 'Input', fieldName: 'content', label: '日志内容' },
];

export const loginLogColumns = formSchemaTransform.toTableColumns<AuditItemDto>(
  loginLogTableSchema,
  {
    seq: { width: 60 },
    username: {
      formatter: undefined,
      showOverflow: 'tooltip',
      width: 120,
    },
    ip: {
      formatter: undefined,
      width: 140,
    },
    userAgent: {
      formatter: ({ cellValue }) => cellValue || '-',
      minWidth: 250,
      showOverflow: 'tooltip',
    },
    createdAt: {
      formatter: ({ cellValue }) => formatUTC(cellValue),
      sortable: true,
      title: '登录时间',
      width: 160,
    },
    isSuccess: {
      formatter: undefined,
      slots: { default: 'isSuccess' },
      width: 120,
    },
    content: {
      formatter: ({ cellValue }) => cellValue || '-',
      minWidth: 200,
      showOverflow: 'tooltip',
    },
  },
);

// 搜索表单配置
export const searchFormSchema: EsFormSchema = [
  {
    component: 'Input',
    fieldName: 'username',
    componentProps: {
      placeholder: '用户名',
      clearable: true,
    },
  },
  {
    component: 'Input',
    fieldName: 'ip',
    componentProps: {
      placeholder: 'IP地址',
      clearable: true,
    },
  },
  {
    component: 'Select',
    fieldName: 'isSuccess',
    componentProps: {
      placeholder: '登录结果',
      clearable: true,
      options: [
        { label: '成功', value: true },
        { label: '失败', value: false },
      ],
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'dateRange',
    componentProps: {
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      clearable: true,
    },
  },
];
