<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type { PaymentOrderRepairFormValues } from '../payment-order/model/order';
import type { PaymentReconcileRow } from './model/reconcile';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  PaymentOrderRepairPaidRequest,
  PaymentReconcilePageRequest,
} from '#/api/types';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import { paymentOrderRepairPaidApi, paymentReconcilePageApi } from '#/api/core';
import { markHandledFormError } from '#/components/es-modal-form/error';
import EsModalForm from '#/components/es-modal-form/index.vue';
import RecordDetailModal from '#/components/record-detail-modal';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';
import {
  normalizeSearchNumber,
  normalizeSearchText,
  splitSearchDateRange,
} from '#/utils/search-normalize';

import {
  buildPaymentOrderRepairPayload,
  mapPaymentOrderToRepairRecord,
  paymentOrderRepairFormSchema,
} from '../payment-order/model/order';
import {
  formatPaymentReconcileMismatchType,
  formatPaymentReconcileRefundAvailability,
  formatPaymentReconcileRepairAvailability,
  formatPaymentReconcileStatus,
  getPaymentReconcileDetailSections,
  getPaymentReconcileMismatchTypeColor,
  getPaymentReconcileRefundAvailabilityColor,
  getPaymentReconcileRepairAvailabilityColor,
  getPaymentReconcileStatusColor,
  paymentReconcileColumns,
  paymentReconcileSearchSchema,
} from './model/reconcile';

defineOptions({
  name: 'PaymentReconcile',
});

type PaymentReconcileSearchValues = {
  channel?: unknown;
  dateRange?: unknown;
  mismatchType?: unknown;
  orderNo?: unknown;
  providerTradeNo?: unknown;
  status?: unknown;
};

const currentDetailRecord = shallowRef<PaymentReconcileRow>();

const gridOptions: VxeGridProps<PaymentReconcileRow> = {
  columns: paymentReconcileColumns,
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await paymentReconcilePageApi(
          formatQuery({
            formValues: buildPaymentReconcileSearchValues(formValues),
            page,
            sorts,
          }),
        );
      },
    },
    sort: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(paymentReconcileSearchSchema),
  gridOptions,
});

const [RepairForm, repairFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: RecordDetailModal,
  title: '支付对账详情',
});

function buildPaymentReconcileSearchValues(
  formValues: PaymentReconcileSearchValues = {},
) {
  const { endDate, startDate } = splitSearchDateRange(formValues.dateRange);

  return {
    channel: normalizeSearchNumber(formValues.channel),
    endDate,
    mismatchType: normalizeSearchNumber(formValues.mismatchType),
    orderNo: normalizeSearchText(formValues.orderNo),
    providerTradeNo: normalizeSearchText(formValues.providerTradeNo),
    startDate,
    status: normalizeSearchNumber(formValues.status),
  } satisfies Partial<PaymentReconcilePageRequest>;
}

async function resolveDetailRecord() {
  return currentDetailRecord.value;
}

function openDetail(row: PaymentReconcileRow) {
  currentDetailRecord.value = row;
  detailApi.setData({ id: row.id }).open();
}

function openRepairForm(row: PaymentReconcileRow) {
  repairFormApi
    .setData({
      cols: 2,
      record: mapPaymentOrderToRepairRecord({
        orderNo: row.orderNo,
        paidAmount: row.providerAmount,
        providerTradeNo: row.providerTradeNo,
        reconciliationRecordId: row.id,
      }),
      schema: paymentOrderRepairFormSchema,
      title: '修复为已支付',
      width: 900,
    })
    .open();
}

async function handleRepair(values: PaymentOrderRepairFormValues) {
  let payload: PaymentOrderRepairPaidRequest;
  try {
    payload = buildPaymentOrderRepairPayload(values);
  } catch (error) {
    useMessage.warning(error instanceof Error ? error.message : '修复失败');
    throw markHandledFormError(error);
  }

  const confirmed = await useConfirm({
    confirmText: '确认修复',
    content: '确认按该对账记录的 provider 已支付事实修复本地订单？',
    successMessage: false,
    title: '异常修复确认',
  });

  if (!confirmed) {
    throw markHandledFormError(new Error('已取消异常修复'));
  }

  await paymentOrderRepairPaidApi(payload);
  useMessage.success('异常修复成功');
  repairFormApi.close();
  await gridApi.reload();
}

function getPaymentReconcileActions(row: PaymentReconcileRow): ActionItem[] {
  return [
    {
      key: 'detail',
      text: '详情',
      onClick: () => openDetail(row),
    },
    {
      disabled: !row.repairPaidAvailable,
      key: 'repair-paid',
      text: '异常修复',
      onClick: () => openRepairForm(row),
    },
  ];
}
</script>

<template>
  <Page auto-content-height content-class="es-full-height-page-content">
    <div class="es-full-height-pane">
      <Grid class="es-full-height-grid">
        <template #detail="{ row }">
          <el-text
            class="cursor-pointer text-left hover:opacity-80"
            type="primary"
            @click="openDetail(row)"
          >
            {{ row.orderNo }}
          </el-text>
        </template>

        <template #mismatchType="{ row }">
          <el-tag
            :type="getPaymentReconcileMismatchTypeColor(row.mismatchType)"
            size="small"
          >
            {{ formatPaymentReconcileMismatchType(row.mismatchType) }}
          </el-tag>
        </template>

        <template #status="{ row }">
          <el-tag
            :type="getPaymentReconcileStatusColor(row.status)"
            size="small"
          >
            {{ formatPaymentReconcileStatus(row.status) }}
          </el-tag>
        </template>

        <template #repairAvailability="{ row }">
          <el-tag
            :type="
              getPaymentReconcileRepairAvailabilityColor(
                row.repairPaidAvailable,
              )
            "
            size="small"
          >
            {{
              formatPaymentReconcileRepairAvailability(row.repairPaidAvailable)
            }}
          </el-tag>
        </template>

        <template #refundExecutionStatus="{ row }">
          <el-tag
            :type="
              getPaymentReconcileRefundAvailabilityColor(
                row.refundExecutionAvailable,
              )
            "
            size="small"
          >
            {{
              formatPaymentReconcileRefundAvailability(
                row.refundExecutionAvailable,
              )
            }}
          </el-tag>
        </template>

        <template #actions="{ row }">
          <VbenTableAction
            align="center"
            :actions="getPaymentReconcileActions(row)"
          />
        </template>
      </Grid>

      <DetailModal
        :api="resolveDetailRecord"
        :sections="getPaymentReconcileDetailSections"
        class="w-[980px]"
      />
      <RepairForm
        :schema="paymentOrderRepairFormSchema"
        :on-submit="handleRepair"
      />
    </div>
  </Page>
</template>
