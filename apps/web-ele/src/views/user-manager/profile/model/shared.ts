import type {
  AdminAppUserPageItemDto,
  AppUsersCreateRequest,
  AppUsersProfileUpdateRequest,
  AppUsersUpdateStatusRequest,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { z } from '#/adapter/form';
import { UploadSceneEnum } from '#/enum/api';
import { formatUTC, formSchemaTransform } from '#/utils';

type UserStatusValue = AppUsersUpdateStatusRequest['status'];
type GenderValue = NonNullable<AppUsersProfileUpdateRequest['genderType']>;
type SchemaItem = EsFormSchema[number];
type CreateUserStatusValue = NonNullable<AppUsersCreateRequest['status']>;

export const normalUserStatus = 1 as UserStatusValue;

export const genderOptions: Array<{
  label: string;
  value: GenderValue;
}> = [
  { label: '未知', value: 0 },
  { label: '男', value: 1 },
  { label: '女', value: 2 },
  { label: '其他', value: 3 },
  { label: '保密', value: 4 },
];

export const genderMap = Object.fromEntries(
  genderOptions.map((item) => [item.value, item]),
) as Record<GenderValue, (typeof genderOptions)[number]>;

export const enabledOptions = [
  { label: '启用', value: true },
  { label: '禁用', value: false },
];

export const deletedScopeOptions = [
  { label: '未删除', value: 0 },
  { label: '已删除', value: 1 },
  { label: '全部', value: 2 },
];

export const userStatusOptions: Array<{
  color: string;
  label: string;
  tagType: 'danger' | 'info' | 'success' | 'warning';
  value: UserStatusValue;
}> = [
  {
    color: '#67c23a',
    label: '正常',
    tagType: 'success',
    value: 1,
  },
  {
    color: '#e6a23c',
    label: '禁言',
    tagType: 'warning',
    value: 2,
  },
  {
    color: '#f56c6c',
    label: '永久禁言',
    tagType: 'danger',
    value: 3,
  },
  {
    color: '#f56c6c',
    label: '封禁',
    tagType: 'danger',
    value: 4,
  },
  {
    color: '#909399',
    label: '永久封禁',
    tagType: 'info',
    value: 5,
  },
];

export const userStatusMap = Object.fromEntries(
  userStatusOptions.map((item) => [item.value, item]),
) as Record<UserStatusValue, (typeof userStatusOptions)[number]>;

export function isTemporaryStatus(status?: null | number) {
  return status === 2 || status === 4;
}

export function isPermanentStatus(status?: null | number) {
  return status === 3 || status === 5;
}

export function getUserStatusText(status?: null | number) {
  return userStatusMap[status as UserStatusValue]?.label ?? '-';
}

export function getUserBanUntilText(
  status?: null | number,
  banUntil?: null | string,
) {
  if (!status || status === normalUserStatus) {
    return '-';
  }

  if (isPermanentStatus(status)) {
    return '永久';
  }

  return banUntil ? formatUTC(banUntil, 'YYYY-MM-DD HH:mm:ss') : '-';
}

export const passwordRules = z
  .string()
  .min(6, '密码长度不能少于6位')
  .max(32, '密码长度不能超过32位');

function passwordField(label = '密码', placeholder = '请输入密码'): SchemaItem {
  return {
    component: 'Input',
    fieldName: 'password',
    label,
    rules: passwordRules,
    componentProps: {
      autocomplete: 'new-password',
      placeholder,
      showPassword: true,
      type: 'password',
    },
  };
}

const userField = {
  account: (): SchemaItem => ({
    component: 'Input',
    fieldName: 'account',
    label: '账号',
  }),
  avatarUrl: (): SchemaItem => ({
    component: 'Upload',
    fieldName: 'avatarUrl',
    label: '头像',
    componentProps: {
      accept: 'image/*',
      maxCount: 1,
      returnDataType: 'url',
      scene: UploadSceneEnum.SHARED,
    },
  }),
  birthDate: (): SchemaItem => ({
    component: 'DatePicker',
    fieldName: 'birthDate',
    label: '出生日期',
    componentProps: {
      clearable: true,
      placeholder: '请选择出生日期',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
    },
  }),
  bio: (): SchemaItem => ({
    component: 'Input',
    fieldName: 'bio',
    label: '论坛简介',
    componentProps: {
      maxlength: 300,
      placeholder: '请输入论坛简介',
      rows: 4,
      showWordLimit: true,
      type: 'textarea',
    },
    formItemClass: 'col-span-2',
  }),
  emailAddress: (): SchemaItem => ({
    component: 'Input',
    fieldName: 'emailAddress',
    label: '邮箱',
    rules: z
      .string()
      .regex(
        /^$|^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        '请输入正确的邮箱地址',
      )
      .optional(),
    componentProps: {
      clearable: true,
      placeholder: '请输入邮箱',
    },
  }),
  genderType: (): SchemaItem => ({
    component: 'Select',
    fieldName: 'genderType',
    label: '性别',
    componentProps: {
      options: genderOptions,
      placeholder: '请选择性别',
    },
  }),
  isEnabled: (): SchemaItem => ({
    component: 'RadioGroup',
    fieldName: 'isEnabled',
    label: '是否启用',
    defaultValue: true,
    componentProps: {
      options: enabledOptions,
    },
  }),
  nickname: (): SchemaItem => ({
    component: 'Input',
    fieldName: 'nickname',
    label: '昵称',
    rules: z
      .string()
      .trim()
      .min(1, '昵称不能为空')
      .max(30, '昵称不能超过30个字符'),
    componentProps: {
      maxlength: 30,
      placeholder: '请输入昵称',
      showWordLimit: true,
    },
  }),
  phoneNumber: (): SchemaItem => ({
    component: 'Input',
    fieldName: 'phoneNumber',
    label: '手机号',
    rules: z
      .string()
      .regex(/^$|^1[3-9]\d{9}$/, '请输入正确的手机号')
      .optional(),
    componentProps: {
      clearable: true,
      placeholder: '请输入手机号',
    },
  }),
  signature: (): SchemaItem => ({
    component: 'Input',
    fieldName: 'signature',
    label: '论坛签名',
    componentProps: {
      maxlength: 100,
      placeholder: '请输入论坛签名',
      rows: 3,
      showWordLimit: true,
      type: 'textarea',
    },
    formItemClass: 'col-span-2',
  }),
  status: (): SchemaItem => ({
    component: 'Select',
    fieldName: 'status',
    label: '用户状态',
    defaultValue: normalUserStatus as CreateUserStatusValue,
    componentProps: {
      options: userStatusOptions,
      placeholder: '请选择用户状态',
    },
  }),
} satisfies Record<string, () => SchemaItem>;

function pickUserFields(...keys: Array<keyof typeof userField>): EsFormSchema {
  return keys.map((key) => userField[key]());
}

export const createFormSchema: EsFormSchema = [
  ...pickUserFields('avatarUrl', 'nickname'),
  passwordField(),
  ...pickUserFields(
    'phoneNumber',
    'emailAddress',
    'genderType',
    'birthDate',
    'isEnabled',
    'status',
  ),
];

export const editFormSchema: EsFormSchema = [
  ...pickUserFields(
    'avatarUrl',
    'nickname',
    'phoneNumber',
    'emailAddress',
    'genderType',
    'birthDate',
    'signature',
    'bio',
  ),
];

export const passwordResetFormSchema: EsFormSchema = [
  passwordField('新密码', '请输入新密码'),
  {
    component: 'Input',
    fieldName: 'confirmPassword',
    label: '确认密码',
    rules: passwordRules,
    componentProps: {
      autocomplete: 'new-password',
      placeholder: '请再次输入新密码',
      showPassword: true,
      type: 'password',
    },
  },
];

export const statusFormSchema: EsFormSchema = [
  {
    component: 'Select',
    fieldName: 'status',
    label: '用户状态',
    rules: z.number().min(1, '请选择用户状态'),
    componentProps: {
      options: userStatusOptions,
      placeholder: '请选择用户状态',
    },
  },
  {
    component: 'Input',
    fieldName: 'banReason',
    label: '处理原因',
    componentProps: {
      maxlength: 500,
      placeholder: '正常状态可留空，禁言或封禁建议填写原因',
      rows: 4,
      showWordLimit: true,
      type: 'textarea',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'banUntil',
    label: '截止时间',
    help: '仅临时禁言和临时封禁需要填写，永久状态可留空',
    componentProps: {
      clearable: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      placeholder: '请选择截止时间',
      type: 'datetime',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];

const userListSchema: EsFormSchema = [
  ...pickUserFields(
    'avatarUrl',
    'account',
    'nickname',
    'phoneNumber',
    'emailAddress',
    'genderType',
  ),
  { component: 'Input', fieldName: 'levelName', label: '等级' },
  { component: 'InputNumber', fieldName: 'points', label: '积分' },
  { component: 'InputNumber', fieldName: 'experience', label: '经验' },
  { component: 'InputNumber', fieldName: 'topicCount', label: '主题数' },
  { component: 'InputNumber', fieldName: 'replyCount', label: '回复数' },
  { ...userField.isEnabled(), component: 'Switch', label: '启用状态' },
  userField.status(),
  { component: 'DatePicker', fieldName: 'banUntil', label: '状态截止' },
  { component: 'DatePicker', fieldName: 'lastLoginAt', label: '最后登录' },
  { component: 'Input', fieldName: 'lastLoginIp', label: '登录 IP' },
  { component: 'DatePicker', fieldName: 'deletedAt', label: '删除时间' },
  {
    component: 'Select',
    fieldName: 'deletedScope',
    label: '删除态',
    componentProps: {
      options: deletedScopeOptions,
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'dateRange',
    label: '注册时间',
    componentProps: {
      type: 'daterange',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'lastLoginDateRange',
    label: '登录时间',
    componentProps: {
      type: 'daterange',
      valueFormat: 'YYYY-MM-DD',
    },
  },
];

export const searchFormSchema = formSchemaTransform.toSearchSchema(
  userListSchema,
  {
    account: { show: true },
    nickname: { show: true },
    phoneNumber: { show: true },
    emailAddress: { show: true },
    isEnabled: {
      component: 'Select',
      componentProps: {
        clearable: true,
        options: enabledOptions,
        placeholder: '启用状态',
      },
    },
    status: { show: true },
    deletedScope: {
      componentProps: {
        clearable: true,
        options: deletedScopeOptions,
        placeholder: '删除态',
      },
    },
    dateRange: {
      componentProps: {
        clearable: true,
        endPlaceholder: '注册结束时间',
        startPlaceholder: '注册开始时间',
        type: 'daterange',
        valueFormat: 'YYYY-MM-DD',
      },
    },
    lastLoginDateRange: {
      componentProps: {
        clearable: true,
        endPlaceholder: '登录结束时间',
        startPlaceholder: '登录开始时间',
        type: 'daterange',
        valueFormat: 'YYYY-MM-DD',
      },
    },
  },
);

export const userColumns =
  formSchemaTransform.toTableColumns<AdminAppUserPageItemDto>(userListSchema, {
    seq: { width: 60 },
    avatarUrl: {
      formatter: undefined,
      slots: { default: 'avatarUrl' },
      width: 80,
    },
    account: {
      formatter: undefined,
      minWidth: 140,
      showOverflow: 'tooltip',
    },
    nickname: {
      formatter: undefined,
      minWidth: 140,
      showOverflow: 'tooltip',
    },
    phoneNumber: {
      formatter: ({ cellValue }) => cellValue ?? '-',
      minWidth: 140,
    },
    emailAddress: {
      formatter: ({ cellValue }) => cellValue ?? '-',
      minWidth: 200,
      showOverflow: 'tooltip',
    },
    genderType: {
      formatter: undefined,
      slots: { default: 'genderType' },
      width: 90,
    },
    levelName: {
      formatter: ({ cellValue, row }) => cellValue ?? row.level?.name ?? '-',
      minWidth: 120,
    },
    points: {
      formatter: undefined,
      sortable: true,
      width: 100,
    },
    experience: {
      formatter: undefined,
      sortable: true,
      width: 100,
    },
    topicCount: {
      formatter: ({ row }) => row.counts?.forumTopicCount ?? 0,
      sortable: true,
      width: 100,
    },
    replyCount: {
      formatter: ({ row }) => row.counts?.commentCount ?? 0,
      sortable: true,
      width: 100,
    },
    isEnabled: {
      formatter: undefined,
      slots: { default: 'isEnabled' },
      title: '启用状态',
      width: 110,
    },
    status: {
      formatter: undefined,
      minWidth: 120,
      slots: { default: 'status' },
    },
    banUntil: {
      formatter: undefined,
      minWidth: 160,
      slots: { default: 'banUntil' },
    },
    lastLoginAt: {
      formatter: ({ cellValue }) =>
        cellValue ? formatUTC(cellValue, 'YYYY-MM-DD HH:mm:ss') : '-',
      minWidth: 170,
      sortable: true,
    },
    lastLoginIp: {
      formatter: ({ cellValue }) => cellValue ?? '-',
      minWidth: 140,
    },
    createdAt: {
      formatter: ({ cellValue }) =>
        cellValue ? formatUTC(cellValue, 'YYYY-MM-DD HH:mm:ss') : '-',
      minWidth: 170,
      sortable: true,
      title: '注册时间',
    },
    deletedAt: {
      formatter: ({ cellValue }) =>
        cellValue ? formatUTC(cellValue, 'YYYY-MM-DD HH:mm:ss') : '-',
      minWidth: 170,
    },
    deletedScope: { hide: true },
    dateRange: { hide: true },
    lastLoginDateRange: { hide: true },
    actions: {
      show: true,
      width: 180,
    },
  });
