import type {
  MembershipAutoRenewAgreementCancellationCreateRequest,
  MembershipAutoRenewAgreementPageResponse,
} from '#/api/types';
import type { DetailCard } from '#/components/es-record-detail';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';
import { getOptionLabel } from '#/utils/options';

import {
  autoRenewStatusOptions,
  environmentOptions,
  paymentChannelOptions,
  paymentSceneOptions,
  platformOptions,
} from './options';

export type AutoRenewAgreementRow = NonNullable<
  MembershipAutoRenewAgreementPageResponse['list']
>[number] & {
  cancelLoading?: boolean;
};

export function buildAutoRenewAgreementCancellationPayload(
  row: Pick<AutoRenewAgreementRow, 'id'>,
) {
  return {
    id: row.id,
  } satisfies MembershipAutoRenewAgreementCancellationCreateRequest;
}

function formatOptionText(
  options: Array<{ label: string; value: boolean | number | string }>,
  value: unknown,
) {
  return (
    getOptionLabel(options, value as boolean | number | string) ||
    String(value ?? '-')
  );
}

const autoRenewAgreementListSchema: EsFormSchema = [
  { component: 'Input', fieldName: 'agreementNo', label: '签约协议号' },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '请输入用户 ID',
    },
    fieldName: 'userId',
    label: '用户 ID',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '请输入 VIP 套餐 ID',
    },
    fieldName: 'planId',
    label: 'VIP 套餐 ID',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      options: paymentChannelOptions,
      placeholder: '请选择支付渠道',
    },
    fieldName: 'channel',
    label: '支付渠道',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      options: paymentSceneOptions,
      placeholder: '请选择支付场景',
    },
    fieldName: 'paymentScene',
    label: '支付场景',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      options: autoRenewStatusOptions,
      placeholder: '请选择协议状态',
    },
    fieldName: 'status',
    label: '协议状态',
  },
  {
    component: 'Select',
    componentProps: { options: platformOptions },
    fieldName: 'platform',
    label: '客户端平台',
  },
  {
    component: 'Select',
    componentProps: { options: environmentOptions },
    fieldName: 'environment',
    label: '运行环境',
  },
  { component: 'Input', fieldName: 'nextRenewAt', label: '下次续扣时间' },
  { component: 'Input', fieldName: 'signedAt', label: '签约时间' },
  { component: 'Input', fieldName: 'cancelledAt', label: '取消时间' },
];

export const autoRenewAgreementSearchSchema =
  formSchemaTransform.toSearchSchema(autoRenewAgreementListSchema, {
    userId: { show: true },
    planId: { show: true },
    channel: { show: true },
    paymentScene: { show: true },
    status: { show: true },
    dateRange: {
      component: 'DatePicker',
      componentProps: {
        clearable: true,
        endPlaceholder: '结束时间',
        startPlaceholder: '开始时间',
        type: 'datetimerange',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
      },
      fieldName: 'dateRange',
    },
  });

export const autoRenewAgreementColumns =
  formSchemaTransform.toTableColumns<AutoRenewAgreementRow>(
    autoRenewAgreementListSchema,
    {
      actions: {
        minWidth: 160,
        show: true,
      },
      agreementNo: {
        fixed: 'left',
        minWidth: 220,
        slots: { default: 'detail' },
      },
      cancelledAt: { cellRender: { name: 'CellDate' }, minWidth: 170 },
      nextRenewAt: { cellRender: { name: 'CellDate' }, minWidth: 170 },
      signedAt: { cellRender: { name: 'CellDate' }, minWidth: 170 },
    },
  );

export function getAutoRenewAgreementDetailCards(
  record: AutoRenewAgreementRow,
) {
  return [
    {
      fields: [
        { label: 'ID', type: 'text', value: record.id },
        { label: '签约协议号', type: 'text', value: record.agreementNo },
        { label: '用户 ID', type: 'text', value: record.userId },
        { label: '套餐 ID', type: 'text', value: record.planId },
        {
          label: 'provider 配置 ID',
          type: 'text',
          value: record.providerConfigId,
        },
        {
          label: '密钥版本引用快照',
          type: 'text',
          value: record.credentialVersionRef,
        },
        {
          label: '支付渠道',
          tagText: formatOptionText(paymentChannelOptions, record.channel),
          type: 'tag',
          value: record.channel,
        },
        {
          label: '支付场景',
          tagText: formatOptionText(paymentSceneOptions, record.paymentScene),
          type: 'tag',
          value: record.paymentScene,
        },
        {
          label: '客户端平台',
          tagText: formatOptionText(platformOptions, record.platform),
          type: 'tag',
          value: record.platform,
        },
        {
          label: '运行环境',
          tagText: formatOptionText(environmentOptions, record.environment),
          type: 'tag',
          value: record.environment,
        },
        {
          label: '协议状态',
          tagText: formatOptionText(autoRenewStatusOptions, record.status),
          type: 'tag',
          value: record.status,
        },
        { label: '签约成功时间', type: 'date', value: record.signedAt },
        { label: '下次预计续扣时间', type: 'date', value: record.nextRenewAt },
        { label: '取消时间', type: 'date', value: record.cancelledAt },
        { label: '创建时间', type: 'date', value: record.createdAt },
        { label: '更新时间', type: 'date', value: record.updatedAt },
      ],
      show: true,
      title: '自动续费协议',
    },
  ] satisfies DetailCard[];
}
