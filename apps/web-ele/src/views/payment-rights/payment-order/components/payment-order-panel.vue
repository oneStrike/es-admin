<script lang="ts" setup>
import type {
  PaymentOrderConfirmFormValues,
  PaymentOrderRow,
} from '../model/order';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  PaymentOrderPageRequest,
  PaymentOrderUpdateStatusRequest,
} from '#/api/types';

import { useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import { paymentOrderPageApi, paymentOrderUpdateStatusApi } from '#/api/core';
import { markHandledFormError } from '#/components/es-modal-form/error';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';
import {
  normalizeSearchNumber,
  splitSearchDateRange,
} from '#/utils/search-normalize';

import {
  buildPaymentOrderConfirmPayload,
  canConfirmPaymentOrder,
  getPaymentOrderDetailCards,
  mapPaymentOrderToConfirmRecord,
  paymentOrderColumns,
  paymentOrderConfirmFormSchema,
  paymentOrderSearchSchema,
} from '../model/order';

type PaymentOrderSearchValues = {
  dateRange?: unknown;
  orderType?: unknown;
  status?: unknown;
};

const currentDetailRecord = shallowRef<PaymentOrderRow>();

const gridOptions: VxeGridProps<PaymentOrderRow> = {
  columns: paymentOrderColumns,
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await paymentOrderPageApi(
          formatQuery({
            formValues: buildPaymentOrderSearchValues(formValues),
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
  formOptions: createSearchFormOptions(paymentOrderSearchSchema),
  gridOptions,
});

const [ConfirmForm, confirmFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
  title: '支付订单详情',
});

function buildPaymentOrderSearchValues(
  formValues: PaymentOrderSearchValues = {},
) {
  const { endDate, startDate } = splitSearchDateRange(formValues.dateRange);

  return {
    endDate,
    orderType: normalizeSearchNumber(formValues.orderType),
    startDate,
    status: normalizeSearchNumber(formValues.status),
  } satisfies Partial<PaymentOrderPageRequest>;
}

async function resolveDetailRecord() {
  return currentDetailRecord.value;
}

function openDetail(row: PaymentOrderRow) {
  currentDetailRecord.value = row;
  detailApi.setData({ recordId: row.id }).open();
}

function openConfirmForm(row: PaymentOrderRow) {
  confirmFormApi
    .setData({
      cols: 2,
      record: mapPaymentOrderToConfirmRecord(row),
      schema: paymentOrderConfirmFormSchema,
      title: '支付订单确认',
      width: 900,
    })
    .open();
}

async function handleConfirm(values: PaymentOrderConfirmFormValues) {
  let payload: PaymentOrderUpdateStatusRequest;
  try {
    payload = buildPaymentOrderConfirmPayload(values);
  } catch (error) {
    useMessage.warning(error instanceof Error ? error.message : '确认失败');
    throw markHandledFormError(error);
  }

  await paymentOrderUpdateStatusApi(payload);
  useMessage.success('确认成功');
  confirmFormApi.close();
  await gridApi.reload();
}
</script>

<template>
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

      <template #actions="{ row }">
        <div class="my-1 flex items-center">
          <el-button link type="primary" @click="openDetail(row)">
            详情
          </el-button>
          <el-divider direction="vertical" />
          <el-button
            :disabled="!canConfirmPaymentOrder(row)"
            link
            type="primary"
            @click="openConfirmForm(row)"
          >
            确认支付
          </el-button>
        </div>
      </template>
    </Grid>

    <ConfirmForm
      :schema="paymentOrderConfirmFormSchema"
      :on-submit="handleConfirm"
    />
    <DetailModal
      :api="resolveDetailRecord"
      :cards="getPaymentOrderDetailCards"
      class="w-[980px]"
    />
  </div>
</template>
