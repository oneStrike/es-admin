import type { AuditItemDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formatUTC, formSchemaTransform } from '#/utils';

const loginResultOptions = [
  { label: '成功', value: true },
  { label: '失败', value: false },
];

type LoginLogSchemaField = EsFormSchema[number];

const loginLogFieldCatalog = {
  ip: {
    component: 'Input',
    fieldName: 'ip',
    label: '登录IP',
  },
  isSuccess: {
    component: 'Select',
    fieldName: 'isSuccess',
    label: '登录结果',
  },
  username: {
    component: 'Input',
    fieldName: 'username',
    label: '用户名',
  },
} satisfies Record<string, LoginLogSchemaField>;

function createLoginLogField(
  field: keyof typeof loginLogFieldCatalog,
  overrides: Partial<LoginLogSchemaField> = {},
): LoginLogSchemaField {
  const base = loginLogFieldCatalog[field] as LoginLogSchemaField;
  const componentProps = overrides.componentProps ?? base.componentProps;

  return {
    ...base,
    ...overrides,
    componentProps:
      componentProps &&
      typeof componentProps === 'object' &&
      !Array.isArray(componentProps)
        ? { ...componentProps }
        : componentProps,
  };
}

// 登录日志表格列配置
const loginLogTableSchema: EsFormSchema = [
  createLoginLogField('username'),
  createLoginLogField('ip'),
  { component: 'Input', fieldName: 'userAgent', label: '用户代理' },
  createLoginLogField('isSuccess'),
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
  createLoginLogField('username', {
    componentProps: {
      placeholder: '用户名',
      clearable: true,
    },
  }),
  createLoginLogField('ip', {
    componentProps: {
      placeholder: 'IP地址',
      clearable: true,
    },
  }),
  createLoginLogField('isSuccess', {
    componentProps: {
      placeholder: '登录结果',
      clearable: true,
      options: loginResultOptions,
    },
  }),
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
