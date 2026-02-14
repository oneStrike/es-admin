import type { EsFormSchema } from '#/types';

export const formSchema: EsFormSchema = [
  {
    component: 'Divider',
    fieldName: 'divider_aliyun',
    hideLabel: true,
    formItemClass: 'col-span-2',
    renderComponentContent: () => {
      return {
        default: () => h('div', { class: 'text-lg font-bold' }, '阿里云配置'),
      };
    },
  },
  {
    component: 'Input',
    fieldName: 'accessKeyId',
    label: 'AccessKey ID',
    componentProps: {
      placeholder: '请输入 AccessKey ID',
    },
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'accessKeySecret',
    label: 'AccessKey Secret',
    componentProps: {
      placeholder: '请输入 AccessKey Secret',
      type: 'password',
      showPassword: true,
    },
    rules: 'required',
  },
  {
    component: 'Divider',
    fieldName: 'divider_sms',
    hideLabel: true,
    formItemClass: 'col-span-2',
    renderComponentContent: () => {
      return {
        default: () => h('div', { class: 'text-lg font-bold' }, '短信配置'),
      };
    },
  },
  {
    component: 'Input',
    fieldName: 'sms.endpoint',
    label: '短信 Endpoint',
    componentProps: {
      placeholder: '请输入短信 Endpoint',
    },
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'sms.signName',
    label: '短信签名',
    componentProps: {
      placeholder: '请输入短信签名',
    },
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'sms.verifyCodeExpire',
    label: '验证码过期时间(秒)',
    componentProps: {
      placeholder: '请输入验证码过期时间',
      min: 1,
    },
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'sms.verifyCodeLength',
    label: '验证码长度',
    componentProps: {
      placeholder: '请输入验证码长度',
      min: 4,
      max: 6,
    },
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'sms.verifyCodeTemplate',
    label: '验证码模版Code',
    componentProps: {
      placeholder: '请输入验证码模版Code',
    },
    rules: 'required',
  },
];
