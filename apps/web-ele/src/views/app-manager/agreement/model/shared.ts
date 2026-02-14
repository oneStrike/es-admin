import type { ListOrPageAgreementResponseDto } from '#/api/types';
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
      placeholder: '请选择发布状态',
      options: booleanOptions,
      class: 'w-full',
    },
    defaultValue: false,
    fieldName: 'isPublished',
    label: '已发布',
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
    component: 'Input',
    componentProps: {
      placeholder: '请输入协议内容',
      rows: 6,
      type: 'textarea',
    },
    fieldName: 'content',
    label: '协议内容',
    rules: 'required',
    formItemClass: 'col-span-2',
  },
];

export const agreementColumns =
  formSchemaTransform.toTableColumns<ListOrPageAgreementResponseDto>(
    formSchema,
    {
      content: {
        show: false,
      },
      isPublished: {
        show: true,
        title: '发布状态',
        slots: { default: 'isPublished' },
      },
      showInAuth: {
        show: true,
        title: '登录注册页',
        slots: { default: 'showInAuth' },
      },
      isForce: {
        show: true,
        title: '强制同意',
        slots: { default: 'isForce' },
      },
      createdAt: {
        show: true,
      },
      updatedAt: {
        show: true,
      },
      actions: {
        show: true,
      },
    },
  );

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
  isForce: {
    label: '',
    component: 'Select',
    componentProps: {
      placeholder: '强制同意',
      clearable: true,
      options: booleanOptions,
    },
  },
});
