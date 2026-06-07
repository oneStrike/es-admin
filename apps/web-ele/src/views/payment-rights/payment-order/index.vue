<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type { PaymentOrderRow } from './model/order';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { PaymentOrderPageRequest } from '#/api/types';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import { paymentOrderPageApi } from '#/api/core';
import RecordDetailModal from '#/components/record-detail-modal';
import { createSearchFormOptions } from '#/utils/grid-form-config';
import {
  normalizeSearchNumber,
  normalizeSearchText,
  splitSearchDateRange,
} from '#/utils/search-normalize';

import {
  getPaymentOrderDetailSections,
  paymentOrderColumns,
  paymentOrderSearchSchema,
} from './model/order';

defineOptions({
  name: 'PaymentOrder',
});

type PaymentOrderSearchValues = {
  channel?: unknown;
  clientAppKey?: unknown;
  dateRange?: unknown;
  environment?: unknown;
  orderNo?: unknown;
  orderType?: unknown;
  paymentScene?: unknown;
  platform?: unknown;
  providerConfigId?: unknown;
  providerTradeNo?: unknown;
  status?: unknown;
  userId?: unknown;
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

const [Grid] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(paymentOrderSearchSchema),
  gridOptions,
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
    channel: normalizeSearchNumber(formValues.channel),
    clientAppKey: normalizeSearchText(formValues.clientAppKey),
    endDate,
    environment: normalizeSearchNumber(formValues.environment),
    orderNo: normalizeSearchText(formValues.orderNo),
    orderType: normalizeSearchNumber(formValues.orderType),
    paymentScene: normalizeSearchNumber(formValues.paymentScene),
    platform: normalizeSearchNumber(formValues.platform),
    providerConfigId: normalizeSearchNumber(formValues.providerConfigId),
    providerTradeNo: normalizeSearchText(formValues.providerTradeNo),
    startDate,
    status: normalizeSearchNumber(formValues.status),
    userId: normalizeSearchNumber(formValues.userId),
  } satisfies Partial<PaymentOrderPageRequest>;
}

async function resolveDetailRecord() {
  return currentDetailRecord.value;
}

function openDetail(row: PaymentOrderRow) {
  currentDetailRecord.value = row;
  detailApi.setData({ id: row.id }).open();
}

function getPaymentOrderActions(row: PaymentOrderRow): ActionItem[] {
  return [
    {
      key: 'detail',
      text: '详情',
      onClick: () => openDetail(row),
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

      <DetailModal
        :api="resolveDetailRecord"
        :sections="getPaymentOrderDetailSections"
        class="w-[980px]"
      />
    </div>
  </Page>
</template>
