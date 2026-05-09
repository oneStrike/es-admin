import type { AuditItemDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formatUTC, formSchemaTransform } from '#/utils';

const loginHistoryListSchema: EsFormSchema = [
  { component: 'Input', fieldName: 'ip', label: '登录IP' },
  { component: 'Input', fieldName: 'device', label: '浏览器' },
  { component: 'Select', fieldName: 'isSuccess', label: '登录结果' },
];

export const loginHistortColumn =
  formSchemaTransform.toTableColumns<AuditItemDto>(loginHistoryListSchema, {
    seq: { width: 50 },
    ip: {
      formatter: undefined,
      width: 140,
    },
    device: {
      formatter: undefined,
      minWidth: 200,
      showOverflow: 'tooltip',
    },
    createdAt: {
      formatter: ({ cellValue }) => formatUTC(cellValue),
      title: '登录时间',
      width: 160,
    },
    isSuccess: {
      formatter: undefined,
      slots: { default: 'isSuccess' },
      width: 120,
    },
  });

// 编辑用户信息表单配置
export const editFormSchema: EsFormSchema = [
  {
    component: 'Upload',
    fieldName: 'avatar',
    label: '头像',
    componentProps: {
      placeholder: '请上传头像',
      maxCount: 1,
      scene: 'common',
    },
  },
  {
    component: 'Input',
    fieldName: 'username',
    label: '用户名',
    rules: 'required',
    componentProps: {
      placeholder: '请输入用户名',
    },
  },
  {
    component: 'Input',
    fieldName: 'mobile',
    label: '手机号',
    rules: 'required',
    componentProps: {
      placeholder: '请输入手机号',
    },
  },
];

// 修改密码表单配置
export const passwordFormSchema: EsFormSchema = [
  {
    component: 'Input',
    fieldName: 'oldPassword',
    label: '原密码',
    rules: 'required',
    componentProps: {
      placeholder: '请输入原密码',
    },
  },
  {
    component: 'Input',
    fieldName: 'newPassword',
    label: '新密码',
    rules: 'required',
    componentProps: {
      placeholder: '请输入新密码',
    },
  },
  {
    component: 'Input',
    fieldName: 'confirmPassword',
    label: '确认密码',
    rules: 'required',
    componentProps: {
      placeholder: '请再次输入新密码',
    },
  },
];
