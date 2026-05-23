import type { AuditItemDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formatUTC, formSchemaTransform, safeParseJson } from '#/utils';

function parseLoginLogDevice(value: unknown) {
  const device = typeof value === 'string' ? safeParseJson(value) : value;

  return device && typeof device === 'object'
    ? (device as Record<string, unknown>)
    : undefined;
}

function getLoginLogDeviceField(value: unknown, field: string) {
  const fieldValue = parseLoginLogDevice(value)?.[field];

  return fieldValue === null || fieldValue === undefined || fieldValue === ''
    ? '-'
    : String(fieldValue);
}

const loginResultOptions = [
  { label: '成功', value: true },
  { label: '失败', value: false },
];

const loginLogListSchema: EsFormSchema = [
  { component: 'Input', fieldName: 'username', label: '用户名' },
  { component: 'Input', fieldName: 'ip', label: '登录IP' },
  { component: 'Input', fieldName: 'deviceOs', label: '操作系统' },
  { component: 'Input', fieldName: 'deviceType', label: '设备' },
  { component: 'Input', fieldName: 'deviceBrowser', label: '浏览器' },
  { component: 'Input', fieldName: 'deviceVersion', label: '版本' },
  { component: 'Select', fieldName: 'isSuccess', label: '登录结果' },
  { component: 'Input', fieldName: 'content', label: '日志内容' },
];

export const loginLogColumns = formSchemaTransform.toTableColumns<AuditItemDto>(
  loginLogListSchema,
  {
    seq: { width: 60 },
    username: {
      showOverflow: 'tooltip',
      width: 120,
    },
    ip: {
      width: 140,
    },
    deviceOs: {
      formatter: ({ row }) => getLoginLogDeviceField(row.device, 'os'),
      minWidth: 100,
      showOverflow: 'tooltip',
    },
    deviceType: {
      formatter: ({ row }) => getLoginLogDeviceField(row.device, 'device'),
      minWidth: 100,
      showOverflow: 'tooltip',
    },
    deviceBrowser: {
      formatter: ({ row }) =>
        getLoginLogDeviceField(row.device ?? row.userAgent, 'browser'),
      minWidth: 110,
      showOverflow: 'tooltip',
    },
    deviceVersion: {
      formatter: ({ row }) => getLoginLogDeviceField(row.device, 'version'),
      minWidth: 90,
      showOverflow: 'tooltip',
    },
    createdAt: {
      formatter: ({ cellValue }) => formatUTC(cellValue),
      sortable: true,
      title: '登录时间',
      width: 160,
    },
    isSuccess: {
      slots: { default: 'isSuccess' },
      width: 120,
    },
    content: {
      formatter: ({ cellValue }) => cellValue ?? '-',
      minWidth: 200,
      showOverflow: 'tooltip',
    },
  },
);

export const searchFormSchema = formSchemaTransform.toSearchSchema(
  loginLogListSchema,
  {
    username: {
      show: true,
      componentProps: {
        clearable: true,
        placeholder: '用户名',
      },
    },
    ip: {
      show: true,
      componentProps: {
        clearable: true,
        placeholder: 'IP地址',
      },
    },
    isSuccess: {
      show: true,
      componentProps: {
        clearable: true,
        options: loginResultOptions,
        placeholder: '登录结果',
      },
    },
    dateRange: {
      component: 'DatePicker',
      componentProps: {
        clearable: true,
        endPlaceholder: '结束时间',
        format: 'YYYY-MM-DD HH:mm:ss',
        startPlaceholder: '开始时间',
        type: 'datetimerange',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
      },
      fieldName: 'dateRange',
    },
  },
);
