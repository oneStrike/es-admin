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

const requestMethodOptions = [
  { label: 'GET', value: 'GET' },
  { label: 'POST', value: 'POST' },
  { label: 'PUT', value: 'PUT' },
  { label: 'DELETE', value: 'DELETE' },
  { label: 'PATCH', value: 'PATCH' },
];

const operationResultOptions = [
  { label: '成功', value: true },
  { label: '失败', value: false },
];

const apiTypeMap = Object.fromEntries(
  apiTypeOptions.map((item) => [item.value, item]),
) as Record<number, (typeof apiTypeOptions)[number]>;

const actionTypeMap = Object.fromEntries(
  actionTypeOptions.map((item) => [item.value, item]),
) as Record<number, (typeof actionTypeOptions)[number]>;

const operationLogListSchema: EsFormSchema = [
  { component: 'Input', fieldName: 'username', label: '用户名' },
  { component: 'Select', fieldName: 'apiType', label: '接口类型' },
  { component: 'Select', fieldName: 'method', label: '请求方法' },
  { component: 'Input', fieldName: 'path', label: '请求路径' },
  { component: 'Select', fieldName: 'actionType', label: '操作类型' },
  { component: 'Input', fieldName: 'ip', label: 'IP地址' },
  { component: 'Select', fieldName: 'isSuccess', label: '操作结果' },
  { component: 'Input', fieldName: 'device', label: '设备信息' },
  { component: 'Input', fieldName: 'params', label: '请求参数' },
  { component: 'Input', fieldName: 'content', label: '日志内容' },
];

export const operationLogColumns =
  formSchemaTransform.toTableColumns<AuditItemDto>(operationLogListSchema, {
    username: {
      formatter: ({ cellValue }) => cellValue ?? '-',
      showOverflow: 'tooltip',
      width: 120,
    },
    apiType: {
      formatter: ({ cellValue }) => {
        return apiTypeMap[Number(cellValue)]?.label ?? cellValue ?? '-';
      },
      width: 100,
    },
    method: {
      slots: { default: 'method' },
      width: 100,
    },
    path: {
      minWidth: 200,
      showOverflow: 'tooltip',
    },
    actionType: {
      formatter: ({ cellValue, row }) =>
        row.actionTypeLabel ??
        actionTypeMap[Number(cellValue)]?.label ??
        cellValue ??
        '-',
      width: 120,
    },
    ip: {
      formatter: ({ cellValue }) => cellValue ?? '-',
      width: 140,
    },
    isSuccess: {
      slots: { default: 'isSuccess' },
      width: 100,
    },
    device: {
      cellRender: { name: 'CellJson' },
      minWidth: 200,
    },
    params: {
      cellRender: { name: 'CellJson' },
      minWidth: 200,
    },
    content: {
      formatter: ({ cellValue }) => cellValue ?? '-',
      minWidth: 200,
      showOverflow: 'tooltip',
    },
    createdAt: {
      fixed: 'right',
      formatter: ({ cellValue }) => formatUTC(cellValue),
      sortable: true,
      title: '操作时间',
      width: 160,
    },
  });

export const searchFormSchema = formSchemaTransform.toSearchSchema(
  operationLogListSchema,
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
    apiType: {
      show: true,
      componentProps: {
        clearable: true,
        options: apiTypeOptions,
        placeholder: '接口类型',
      },
    },
    method: {
      show: true,
      componentProps: {
        clearable: true,
        options: requestMethodOptions,
        placeholder: '请求方法',
      },
    },
    path: {
      show: true,
      componentProps: {
        clearable: true,
        placeholder: '请求路径',
      },
    },
    actionType: {
      show: true,
      componentProps: {
        clearable: true,
        options: actionTypeOptions,
        placeholder: '操作类型',
      },
    },
    isSuccess: {
      show: true,
      componentProps: {
        clearable: true,
        options: operationResultOptions,
        placeholder: '操作结果',
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
