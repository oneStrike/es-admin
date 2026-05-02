import type { AuditItemDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formatUTC, formSchemaTransform } from '#/utils';

const apiTypeOptions = [
  { label: '管理端', value: 1 },
  { label: '应用端', value: 2 },
  { label: '系统端', value: 3 },
  { label: '公共端', value: 4 },
];

const actionTypeOptions = [
  { label: '登录', value: 1 },
  { label: '登出', value: 2 },
  { label: '创建', value: 3 },
  { label: '更新', value: 4 },
  { label: '删除', value: 5 },
  { label: '上传', value: 6 },
  { label: '下载', value: 7 },
  { label: '导出', value: 8 },
  { label: '导入', value: 9 },
];

const apiTypeMap = Object.fromEntries(
  apiTypeOptions.map((item) => [item.value, item]),
) as Record<number, (typeof apiTypeOptions)[number]>;

const actionTypeMap = Object.fromEntries(
  actionTypeOptions.map((item) => [item.value, item]),
) as Record<number, (typeof actionTypeOptions)[number]>;

// 操作日志表格列配置
const operationLogTableSchema: EsFormSchema = [
  { component: 'InputNumber', fieldName: 'id', label: 'ID' },
  { component: 'Input', fieldName: 'username', label: '用户名' },
  { component: 'InputNumber', fieldName: 'userId', label: '用户ID' },
  { component: 'Select', fieldName: 'apiType', label: '接口类型' },
  { component: 'Select', fieldName: 'method', label: '请求方法' },
  { component: 'Input', fieldName: 'path', label: '请求路径' },
  { component: 'Select', fieldName: 'actionType', label: '操作类型' },
  { component: 'Input', fieldName: 'ip', label: 'IP地址' },
  { component: 'Select', fieldName: 'isSuccess', label: '操作结果' },
  { component: 'Input', fieldName: 'userAgent', label: '用户代理' },
  { component: 'Input', fieldName: 'device', label: '设备信息' },
  { component: 'Input', fieldName: 'params', label: '请求参数' },
  { component: 'Input', fieldName: 'content', label: '日志内容' },
  { component: 'DatePicker', fieldName: 'createdAt', label: '操作时间' },
];

export const operationLogColumns =
  formSchemaTransform.toTableColumns<AuditItemDto>(operationLogTableSchema, {
    seq: { width: 60 },
    id: {
      formatter: undefined,
      width: 80,
    },
    username: {
      formatter: ({ cellValue }) => cellValue || '-',
      showOverflow: 'tooltip',
      width: 120,
    },
    userId: {
      formatter: ({ cellValue }) => cellValue || '-',
      width: 80,
    },
    apiType: {
      formatter: ({ cellValue }) => {
        return apiTypeMap[Number(cellValue)]?.label || cellValue || '-';
      },
      width: 100,
    },
    method: {
      formatter: undefined,
      slots: { default: 'method' },
      width: 100,
    },
    path: {
      formatter: undefined,
      minWidth: 200,
      showOverflow: 'tooltip',
    },
    actionType: {
      formatter: ({ cellValue, row }) =>
        row.actionTypeLabel ||
        actionTypeMap[Number(cellValue)]?.label ||
        cellValue ||
        '-',
      width: 120,
    },
    ip: {
      formatter: ({ cellValue }) => cellValue || '-',
      width: 140,
    },
    isSuccess: {
      formatter: undefined,
      slots: { default: 'isSuccess' },
      width: 100,
    },
    userAgent: {
      formatter: ({ cellValue }) => cellValue || '-',
      minWidth: 250,
      showOverflow: 'tooltip',
    },
    device: {
      formatter: ({ cellValue }) => {
        if (!cellValue) return '-';
        try {
          const device = JSON.parse(cellValue);
          return (
            `${device.browser || ''} ${device.os || ''}`.trim() || cellValue
          );
        } catch {
          return cellValue;
        }
      },
      minWidth: 200,
      showOverflow: 'tooltip',
    },
    params: {
      formatter: ({ cellValue }) => cellValue || '-',
      minWidth: 200,
      showOverflow: 'tooltip',
    },
    content: {
      formatter: ({ cellValue }) => cellValue || '-',
      minWidth: 200,
      showOverflow: 'tooltip',
    },
    createdAt: {
      fixed: 'right',
      formatter: ({ cellValue }) => formatUTC(cellValue),
      sortable: true,
      width: 160,
    },
  });

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
    fieldName: 'apiType',
    componentProps: {
      placeholder: '接口类型',
      clearable: true,
      options: apiTypeOptions,
    },
  },
  {
    component: 'Select',
    fieldName: 'method',
    componentProps: {
      placeholder: '请求方法',
      clearable: true,
      options: [
        { label: 'GET', value: 'GET' },
        { label: 'POST', value: 'POST' },
        { label: 'PUT', value: 'PUT' },
        { label: 'DELETE', value: 'DELETE' },
        { label: 'PATCH', value: 'PATCH' },
      ],
    },
  },
  {
    component: 'Input',
    fieldName: 'path',
    componentProps: {
      placeholder: '请求路径',
      clearable: true,
    },
  },
  {
    component: 'Select',
    fieldName: 'actionType',
    componentProps: {
      placeholder: '操作类型',
      clearable: true,
      options: actionTypeOptions,
    },
  },
  {
    component: 'Select',
    fieldName: 'isSuccess',
    componentProps: {
      placeholder: '操作结果',
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
