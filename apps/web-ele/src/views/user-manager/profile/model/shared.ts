import type { VxeGridPropTypes } from '#/adapter/vxe-table';
import type {
  AdminAppUserPageItemDto,
  AppUsersCreateRequest,
  AppUsersProfileUpdateRequest,
  AppUsersUpdateStatusRequest,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { z } from '#/adapter/form';
import { UploadSceneEnum } from '#/enum/api';
import { formatUTC } from '#/utils';

type UserStatusValue = AppUsersUpdateStatusRequest['status'];
type GenderValue = NonNullable<AppUsersProfileUpdateRequest['genderType']>;

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
  { label: '未删除', value: 'active' },
  { label: '已删除', value: 'deleted' },
  { label: '全部', value: 'all' },
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

export const searchFormSchema: EsFormSchema = [
  {
    component: 'Input',
    fieldName: 'account',
    componentProps: {
      clearable: true,
      placeholder: '账号',
    },
  },
  {
    component: 'Input',
    fieldName: 'nickname',
    componentProps: {
      clearable: true,
      placeholder: '昵称',
    },
  },
  {
    component: 'Input',
    fieldName: 'phoneNumber',
    componentProps: {
      clearable: true,
      placeholder: '手机号',
    },
  },
  {
    component: 'Input',
    fieldName: 'emailAddress',
    componentProps: {
      clearable: true,
      placeholder: '邮箱',
    },
  },
  {
    component: 'Select',
    fieldName: 'isEnabled',
    componentProps: {
      clearable: true,
      options: enabledOptions,
      placeholder: '启用状态',
    },
  },
  {
    component: 'Select',
    fieldName: 'status',
    componentProps: {
      clearable: true,
      options: userStatusOptions,
      placeholder: '社区状态',
    },
  },
  {
    component: 'Select',
    fieldName: 'deletedScope',
    componentProps: {
      clearable: true,
      options: deletedScopeOptions,
      placeholder: '删除态',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'dateRange',
    componentProps: {
      clearable: true,
      endPlaceholder: '注册结束时间',
      startPlaceholder: '注册开始时间',
      type: 'daterange',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'lastLoginDateRange',
    componentProps: {
      clearable: true,
      endPlaceholder: '登录结束时间',
      startPlaceholder: '登录开始时间',
      type: 'daterange',
      valueFormat: 'YYYY-MM-DD',
    },
  },
];

type CreateUserStatusValue = NonNullable<AppUsersCreateRequest['status']>;

export const createFormSchema: EsFormSchema = [
  {
    component: 'Upload',
    fieldName: 'avatarUrl',
    label: '头像',
    componentProps: {
      accept: 'image/*',
      maxCount: 1,
      returnDataType: 'url',
      scene: UploadSceneEnum.SHARED,
    },
  },
  {
    component: 'Input',
    fieldName: 'nickname',
    label: '昵称',
    rules: z.string().trim().min(1, '昵称不能为空').max(30, '昵称不能超过30个字符'),
    componentProps: {
      maxlength: 30,
      placeholder: '请输入昵称',
      showWordLimit: true,
    },
  },
  {
    component: 'Input',
    fieldName: 'password',
    label: '密码',
    rules: z.string().min(6, '密码长度不能少于6位').max(32, '密码长度不能超过32位'),
    componentProps: {
      autocomplete: 'new-password',
      placeholder: '请输入密码',
      showPassword: true,
      type: 'password',
    },
  },
  {
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
  },
  {
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
  },
  {
    component: 'Select',
    fieldName: 'genderType',
    label: '性别',
    componentProps: {
      options: genderOptions,
      placeholder: '请选择性别',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'birthDate',
    label: '出生日期',
    componentProps: {
      clearable: true,
      placeholder: '请选择出生日期',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    component: 'RadioGroup',
    fieldName: 'isEnabled',
    label: '是否启用',
    defaultValue: true,
    componentProps: {
      options: enabledOptions,
    },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '社区状态',
    defaultValue: normalUserStatus as CreateUserStatusValue,
    componentProps: {
      options: userStatusOptions,
      placeholder: '请选择社区状态',
    },
  },
];

export const editFormSchema: EsFormSchema = [
  {
    component: 'Upload',
    fieldName: 'avatarUrl',
    label: '头像',
    componentProps: {
      accept: 'image/*',
      maxCount: 1,
      returnDataType: 'url',
      scene: UploadSceneEnum.SHARED,
    },
  },
  {
    component: 'Input',
    fieldName: 'nickname',
    label: '昵称',
    rules: z.string().trim().min(1, '昵称不能为空').max(30, '昵称不能超过30个字符'),
    componentProps: {
      maxlength: 30,
      placeholder: '请输入昵称',
      showWordLimit: true,
    },
  },
  {
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
  },
  {
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
  },
  {
    component: 'Select',
    fieldName: 'genderType',
    label: '性别',
    componentProps: {
      options: genderOptions,
      placeholder: '请选择性别',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'birthDate',
    label: '出生日期',
    componentProps: {
      clearable: true,
      placeholder: '请选择出生日期',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
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
  },
  {
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
  },
];

export const statusFormSchema: EsFormSchema = [
  {
    component: 'Select',
    fieldName: 'status',
    label: '社区状态',
    rules: z.number().min(1, '请选择社区状态'),
    componentProps: {
      options: userStatusOptions,
      placeholder: '请选择社区状态',
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

export const userColumns: VxeGridPropTypes.Columns<AdminAppUserPageItemDto> = [
  {
    fixed: 'left',
    title: '序号',
    type: 'seq',
    width: 60,
  },
  {
    field: 'avatarUrl',
    title: '头像',
    width: 80,
    slots: { default: 'avatarUrl' },
  },
  {
    field: 'account',
    minWidth: 140,
    showOverflow: 'tooltip',
    title: '账号',
  },
  {
    field: 'nickname',
    minWidth: 140,
    showOverflow: 'tooltip',
    title: '昵称',
  },
  {
    field: 'phoneNumber',
    minWidth: 140,
    title: '手机号',
    formatter: ({ cellValue }) => cellValue || '-',
  },
  {
    field: 'emailAddress',
    minWidth: 200,
    showOverflow: 'tooltip',
    title: '邮箱',
    formatter: ({ cellValue }) => cellValue || '-',
  },
  {
    field: 'genderType',
    title: '性别',
    width: 90,
    slots: { default: 'genderType' },
  },
  {
    field: 'levelName',
    minWidth: 120,
    title: '等级',
    formatter: ({ cellValue }) => cellValue || '-',
  },
  {
    field: 'points',
    sortable: true,
    title: '积分',
    width: 100,
  },
  {
    field: 'experience',
    sortable: true,
    title: '经验',
    width: 100,
  },
  {
    field: 'topicCount',
    sortable: true,
    title: '主题数',
    width: 100,
  },
  {
    field: 'replyCount',
    sortable: true,
    title: '回复数',
    width: 100,
  },
  {
    field: 'isEnabled',
    title: '启用状态',
    width: 110,
    slots: { default: 'isEnabled' },
  },
  {
    field: 'status',
    minWidth: 120,
    title: '社区状态',
    slots: { default: 'status' },
  },
  {
    field: 'banUntil',
    minWidth: 160,
    title: '状态截止',
    slots: { default: 'banUntil' },
  },
  {
    field: 'lastLoginAt',
    minWidth: 170,
    sortable: true,
    title: '最后登录',
    formatter: ({ cellValue }) =>
      cellValue ? formatUTC(cellValue, 'YYYY-MM-DD HH:mm:ss') : '-',
  },
  {
    field: 'lastLoginIp',
    minWidth: 140,
    title: '登录 IP',
    formatter: ({ cellValue }) => cellValue || '-',
  },
  {
    field: 'createdAt',
    minWidth: 170,
    sortable: true,
    title: '注册时间',
    formatter: ({ cellValue }) =>
      cellValue ? formatUTC(cellValue, 'YYYY-MM-DD HH:mm:ss') : '-',
  },
  {
    field: 'deletedAt',
    minWidth: 170,
    title: '删除时间',
    formatter: ({ cellValue }) =>
      cellValue ? formatUTC(cellValue, 'YYYY-MM-DD HH:mm:ss') : '-',
  },
  {
    field: 'actions',
    fixed: 'right',
    title: '操作',
    width: 260,
    slots: { default: 'actions' },
  },
];
