import type { AdminAppUserPageItemDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { appUsersPageApi } from '#/api/core';
import { formSchemaTransform } from '#/utils';

const ACTIVE_DELETED_SCOPE = 0;

export const activeUserEnabledOptions = [
  { label: '启用', value: true },
  { label: '禁用', value: false },
];

const appUserSelectListSchema: EsFormSchema = [
  { component: 'InputNumber', fieldName: 'id', label: '用户ID' },
  { component: 'Input', fieldName: 'nickname', label: '昵称' },
  { component: 'Input', fieldName: 'phoneNumber', label: '手机号' },
  { component: 'Input', fieldName: 'levelName', label: '等级' },
  {
    component: 'Select',
    componentProps: {
      options: activeUserEnabledOptions,
    },
    fieldName: 'isEnabled',
    label: '启用状态',
  },
];

export const appUserSelectSearchSchema = formSchemaTransform.toSearchSchema(
  appUserSelectListSchema,
  {
    id: {
      show: true,
      componentProps: {
        class: '!w-full',
        min: 1,
        placeholder: '用户ID',
      },
    },
    nickname: {
      show: true,
      componentProps: {
        placeholder: '昵称',
      },
    },
    phoneNumber: {
      show: true,
      componentProps: {
        placeholder: '手机号',
      },
    },
    isEnabled: {
      show: true,
      componentProps: {
        placeholder: '启用状态',
      },
    },
  },
);

export const appUserSelectColumns =
  formSchemaTransform.toTableColumns<AdminAppUserPageItemDto>(
    appUserSelectListSchema,
    {
      id: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        sort: -0.5,
      },
      nickname: {
        minWidth: 140,
      },
      phoneNumber: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 140,
      },
      levelName: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 120,
      },
      isEnabled: {
        cellRender: {
          name: 'CellTag',
        },
        minWidth: 110,
      },
    },
  );

export function createAppUserTableSelectProps(
  options: {
    enabledOnly?: boolean;
    multiple?: boolean;
    placeholder?: string;
    title?: string;
  } = {},
) {
  const multiple = options.multiple ?? true;

  return {
    api: async (params: Record<string, unknown>) =>
      appUsersPageApi({
        ...params,
        deletedScope: ACTIVE_DELETED_SCOPE,
        ...(options.enabledOnly ? { isEnabled: true } : {}),
      }),
    columns: appUserSelectColumns,
    displayField: 'nickname',
    keyField: 'id',
    multiple,
    onlyKey: true,
    placeholder:
      options.placeholder ?? (multiple ? '请选择 APP 用户' : '请选择 APP 用户'),
    searchSchema: appUserSelectSearchSchema,
    title: options.title ?? '选择 APP 用户',
    width: 1000,
  };
}
