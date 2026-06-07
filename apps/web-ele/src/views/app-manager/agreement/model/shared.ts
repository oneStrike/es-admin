import type { AdminAgreementListItemDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

export const booleanOptions = [
  {
    label: '是',
    value: true,
  },
  {
    label: '否',
    value: false,
  },
];

export type BooleanTag = {
  label: string;
  type: 'danger' | 'info' | 'primary' | 'success' | 'warning';
};

export const booleanTagObj: Record<'false' | 'true', BooleanTag> = {
  false: {
    label: '否',
    type: 'info',
  },
  true: {
    label: '是',
    type: 'success',
  },
};

export const formSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入协议标题',
    },
    fieldName: 'title',
    label: '标题',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入版本号',
    },
    fieldName: 'version',
    label: '版本号',
    rules: 'required',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      placeholder: '请选择登录注册页展示',
      options: booleanOptions,
      class: 'w-full',
    },
    defaultValue: false,
    fieldName: 'showInAuth',
    label: '登录注册页展示',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      placeholder: '请选择是否强制重新同意',
      options: booleanOptions,
      class: 'w-full',
    },
    defaultValue: false,
    fieldName: 'isForce',
    label: '强制重新同意',
  },
  {
    component: 'VbenTiptap',
    componentProps: {
      placeholder: '请输入协议内容...',
    },
    fieldName: 'content',
    label: '协议内容',
    rules: 'required',
    formItemClass: 'col-span-2',
  },
];

export const agreementColumns =
  formSchemaTransform.toTableColumns<AdminAgreementListItemDto>(formSchema, {
    content: {
      hide: true,
    },
    isPublished: {
      title: '发布状态',
      slots: { default: 'isPublished' },
    },
    showInAuth: {
      title: '登录注册页',
      cellRender: {
        name: 'CellTag',
      },
    },
    isForce: {
      title: '强制同意',
      cellRender: {
        name: 'CellTag',
      },
    },
    createdAt: {
      show: true,
    },
    updatedAt: {
      show: true,
    },
    actions: {
      show: true,
      width: 260,
    },
  });

export const agreementFilter = formSchemaTransform.toSearchSchema(formSchema, {
  title: {
    show: true,
  },
  isPublished: {
    label: '',
    component: 'Select',
    componentProps: {
      placeholder: '发布状态',
      clearable: true,
      options: booleanOptions,
    },
  },
  showInAuth: {
    label: '',
    component: 'Select',
    componentProps: {
      placeholder: '登录注册页',
      clearable: true,
      options: booleanOptions,
    },
  },
});
