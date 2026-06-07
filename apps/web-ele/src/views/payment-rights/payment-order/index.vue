<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type {
  PaymentOrderConfirmFormValues,
  PaymentOrderRow,
} from './model/order';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  PaymentOrderPageRequest,
  PaymentOrderUpdateStatusRequest,
} from '#/api/types';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import { paymentOrderPageApi, paymentOrderUpdateStatusApi } from '#/api/core';
import { markHandledFormError } from '#/components/es-modal-form/error';
import EsModalForm from '#/components/es-modal-form/index.vue';
import RecordDetailModal from '#/components/record-detail-modal';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';
import {
  normalizeSearchNumber,
  splitSearchDateRange,
} from '#/utils/search-normalize';

import {
  buildPaymentOrderConfirmPayload,
  canConfirmPaymentOrder,
  getPaymentOrderDetailSections,
  mapPaymentOrderToConfirmRecord,
  paymentOrderColumns,
  paymentOrderConfirmFormSchema,
  paymentOrderSearchSchema,
} from './model/order';

defineOptions({
  name: 'PaymentOrder',
});

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
  connectedComponent: RecordDetailModal,
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
  detailApi.setData({ id: row.id }).open();
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

function getPaymentOrderActions(row: PaymentOrderRow): ActionItem[] {
  return [
    {
      key: 'detail',
      text: '详情',
      onClick: () => openDetail(row),
    },
    {
      disabled: !canConfirmPaymentOrder(row),
      key: 'confirm',
      text: '确认支付',
      onClick: () => openConfirmForm(row),
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

        <template #actions="{ row }">
          <VbenTableAction
            align="center"
            :actions="getPaymentOrderActions(row)"
          />
        </template>
      </Grid>

      <ConfirmForm
        :schema="paymentOrderConfirmFormSchema"
        :on-submit="handleConfirm"
      />
      <DetailModal
        :api="resolveDetailRecord"
        :sections="getPaymentOrderDetailSections"
        class="w-[980px]"
      />
    </div>
  </Page>
</template>
