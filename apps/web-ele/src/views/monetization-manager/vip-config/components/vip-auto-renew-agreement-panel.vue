<script lang="ts" setup>
import type { AutoRenewAgreementRow } from '../model/auto-renew-agreement';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  MonetizationVipAutoRenewAgreementCancellationCreateRequest,
  MonetizationVipAutoRenewAgreementPageRequest,
} from '#/api/types';

import { useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  monetizationVipAutoRenewAgreementCancellationCreateApi,
  monetizationVipAutoRenewAgreementPageApi,
} from '#/api/core';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import {
  normalizeSearchNumber,
  splitSearchDateRange,
} from '../../model/search';
import {
  autoRenewAgreementColumns,
  autoRenewAgreementSearchSchema,
  getAutoRenewAgreementDetailCards,
} from '../model/auto-renew-agreement';

type AutoRenewAgreementSearchValues = {
  channel?: unknown;
  dateRange?: unknown;
  paymentScene?: unknown;
  planId?: unknown;
  status?: unknown;
  userId?: unknown;
};

const currentDetailRecord = shallowRef<AutoRenewAgreementRow>();

const gridOptions: VxeGridProps<AutoRenewAgreementRow> = {
  columns: autoRenewAgreementColumns,
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await monetizationVipAutoRenewAgreementPageApi(
          formatQuery({
            formValues: buildAutoRenewAgreementSearchValues(formValues),
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
  formOptions: createSearchFormOptions(autoRenewAgreementSearchSchema),
  gridOptions,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
  title: '自动续费协议详情',
});

function buildAutoRenewAgreementSearchValues(
  formValues: AutoRenewAgreementSearchValues = {},
) {
  const { endDate, startDate } = splitSearchDateRange(formValues.dateRange);

  return {
    channel: normalizeSearchNumber(formValues.channel),
    endDate,
    paymentScene: normalizeSearchNumber(formValues.paymentScene),
    planId: normalizeSearchNumber(formValues.planId),
    startDate,
    status: normalizeSearchNumber(formValues.status),
    userId: normalizeSearchNumber(formValues.userId),
  } satisfies Partial<MonetizationVipAutoRenewAgreementPageRequest>;
}

async function resolveDetailRecord() {
  return currentDetailRecord.value;
}

function openDetail(row: AutoRenewAgreementRow) {
  currentDetailRecord.value = row;
  detailApi.setData({ recordId: row.id }).open();
}

async function cancelAgreement(row: AutoRenewAgreementRow) {
  row.cancelLoading = true;
  try {
    await monetizationVipAutoRenewAgreementCancellationCreateApi({
      id: row.id,
    } satisfies MonetizationVipAutoRenewAgreementCancellationCreateRequest);
    useMessage.success('取消成功');
    await gridApi.reload();
  } finally {
    row.cancelLoading = false;
  }
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
          {{ row.agreementNo }}
        </el-text>
      </template>

      <template #actions="{ row }">
        <div class="my-1 flex items-center">
          <el-button link type="primary" @click="openDetail(row)">
            详情
          </el-button>
          <el-divider direction="vertical" />
          <el-popconfirm
            title="确认取消当前自动续费协议？"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="cancelAgreement(row)"
          >
            <template #reference>
              <el-button
                :disabled="row.status !== 1"
                :loading="row.cancelLoading"
                link
                type="danger"
              >
                取消协议
              </el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </Grid>

    <DetailModal
      :api="resolveDetailRecord"
      :cards="getAutoRenewAgreementDetailCards"
      class="w-[980px]"
    />
  </div>
</template>
