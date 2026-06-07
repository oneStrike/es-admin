<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type {
  PaymentProviderConfigRow,
  PaymentProviderFormValues,
} from './model/provider';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  PaymentProviderPageRequest,
  PaymentProviderUpdateStatusRequest,
} from '#/api/types';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  paymentProviderCreateApi,
  paymentProviderPageApi,
  paymentProviderUpdateApi,
  paymentProviderUpdateStatusApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import RecordDetailModal from '#/components/record-detail-modal';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';
import {
  normalizeSearchBoolean,
  normalizeSearchNumber,
  normalizeSearchText,
  splitSearchDateRange,
} from '#/utils/search-normalize';

import {
  buildPaymentProviderCreatePayload,
  buildPaymentProviderUpdatePayload,
  getPaymentProviderDetailSections,
  mapProviderToFormRecord,
  paymentProviderColumns,
  paymentProviderFormSchema,
  paymentProviderSearchSchema,
} from './model/provider';

defineOptions({
  name: 'PaymentConfig',
});

type PaymentProviderSearchValues = {
  channel?: unknown;
  clientAppKey?: unknown;
  dateRange?: unknown;
  environment?: unknown;
  isEnabled?: unknown;
  paymentScene?: unknown;
  platform?: unknown;
};

const currentPaymentProvider = ref({} as PaymentProviderConfigRow);

const paymentProviderGridOptions: VxeGridProps<PaymentProviderConfigRow> = {
  columns: paymentProviderColumns,
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async (
        { page, sorts },
        formValues?: PaymentProviderSearchValues,
      ) =>
        await paymentProviderPageApi(
          formatQuery({
            page,
            formValues: buildPaymentProviderSearchValues(formValues),
            sorts,
          }),
        ),
    },
    sort: true,
  },
};

const [PaymentProviderGrid, paymentProviderGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(paymentProviderSearchSchema),
  gridOptions: paymentProviderGridOptions,
});

const [CreateForm, createFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [EditForm, editFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: RecordDetailModal,
  title: '支付 provider 详情',
});

function buildPaymentProviderSearchValues(
  formValues: PaymentProviderSearchValues = {},
) {
  const { endDate, startDate } = splitSearchDateRange(formValues.dateRange);

  return {
    channel: normalizeSearchNumber(formValues.channel),
    clientAppKey: normalizeSearchText(formValues.clientAppKey),
    endDate,
    environment: normalizeSearchNumber(formValues.environment),
    isEnabled: normalizeSearchBoolean(formValues.isEnabled),
    paymentScene: normalizeSearchNumber(formValues.paymentScene),
    platform: normalizeSearchNumber(formValues.platform),
    startDate,
  } satisfies Partial<PaymentProviderPageRequest>;
}

function openCreateModal() {
  createFormApi
    .setData({
      cols: 2,
      schema: paymentProviderFormSchema,
      title: '支付 provider',
      width: 1120,
    })
    .open();
}

function openEditModal(row: PaymentProviderConfigRow) {
  editFormApi
    .setData({
      cols: 2,
      record: mapProviderToFormRecord(row),
      schema: paymentProviderFormSchema,
      title: '支付 provider',
      width: 1120,
    })
    .open();
}

function openDetailModal(row: PaymentProviderConfigRow) {
  currentPaymentProvider.value = row;
  detailApi.setData({ id: row.id }).open();
}

async function handleCreateSubmit(values: PaymentProviderFormValues) {
  await paymentProviderCreateApi(buildPaymentProviderCreatePayload(values));
  useMessage.success('操作成功');
  await paymentProviderGridApi.reload();
}

async function handleEditSubmit(values: PaymentProviderFormValues) {
  await paymentProviderUpdateApi(buildPaymentProviderUpdatePayload(values));
  useMessage.success('操作成功');
  await paymentProviderGridApi.reload();
}

async function toggleEnableStatus(row: PaymentProviderConfigRow) {
  if (typeof row.id !== 'number') {
    return;
  }

  row.statusLoading = true;
  try {
    await paymentProviderUpdateStatusApi({
      id: row.id,
      isEnabled: row.isEnabled !== true,
    } satisfies PaymentProviderUpdateStatusRequest);
    useMessage.success('状态更新成功');
    await paymentProviderGridApi.reload();
  } finally {
    row.statusLoading = false;
  }
}

function getPaymentProviderActions(
  row: PaymentProviderConfigRow,
): ActionItem[] {
  return [
    {
      key: 'detail',
      onClick: () => openDetailModal(row),
      text: '详情',
    },
    {
      key: 'edit',
      onClick: () => openEditModal(row),
      text: '编辑',
    },
  ];
}

async function getCurrentPaymentProvider() {
  return currentPaymentProvider.value;
}
</script>

<template>
  <Page auto-content-height content-class="es-full-height-page-content">
    <div class="es-full-height-pane">
      <PaymentProviderGrid class="es-full-height-grid">
        <template #toolbar-actions>
          <el-button class="ml-2" type="primary" @click="openCreateModal()">
            添加支付 provider
          </el-button>
        </template>

        <template #detail="{ row }">
          <el-text
            class="cursor-pointer text-left hover:opacity-80"
            type="primary"
            @click="openDetailModal(row)"
          >
            {{ row.configName || row.clientAppKey || row.id }}
          </el-text>
        </template>

        <template #isEnabled="{ row }">
          <el-switch
            :active-value="true"
            :inactive-value="false"
            :loading="row.statusLoading"
            :model-value="row.isEnabled === true"
            @change="toggleEnableStatus(row)"
          />
        </template>

        <template #actions="{ row }">
          <VbenTableAction
            align="center"
            :actions="getPaymentProviderActions(row)"
          />
        </template>
      </PaymentProviderGrid>

      <CreateForm
        :schema="paymentProviderFormSchema"
        :on-submit="handleCreateSubmit"
      />
      <EditForm
        :schema="paymentProviderFormSchema"
        :on-submit="handleEditSubmit"
      />

      <DetailModal
        :api="getCurrentPaymentProvider"
        :sections="getPaymentProviderDetailSections"
        class="w-[980px]"
      />
    </div>
  </Page>
</template>
