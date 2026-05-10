<script lang="ts" setup>
import type {
  CurrencyPackageFormValues,
  CurrencyPackageRow,
} from '../model/currency-package';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  WalletCurrencyPackagePageRequest,
  WalletCurrencyPackageUpdateStatusRequest,
} from '#/api/types';

import { useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  walletCurrencyPackageCreateApi,
  walletCurrencyPackagePageApi,
  walletCurrencyPackageUpdateApi,
  walletCurrencyPackageUpdateStatusApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';
import {
  normalizeSearchBoolean,
  normalizeSearchText,
  splitSearchDateRange,
} from '#/utils/search-normalize';

import {
  buildCurrencyPackageCreatePayload,
  buildCurrencyPackageUpdatePayload,
  currencyPackageColumns,
  currencyPackageFormSchema,
  currencyPackageSearchSchema,
  getCurrencyPackageDetailCards,
} from '../model/currency-package';

type CurrencyPackageSearchValues = {
  dateRange?: unknown;
  isEnabled?: unknown;
  name?: unknown;
};

const currentCurrencyPackage = ref({} as CurrencyPackageRow);

const currencyPackageGridOptions: VxeGridProps<CurrencyPackageRow> = {
  columns: currencyPackageColumns,
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async (
        { page, sorts },
        formValues?: CurrencyPackageSearchValues,
      ) =>
        await walletCurrencyPackagePageApi(
          formatQuery({
            page,
            formValues: buildCurrencyPackageSearchValues(formValues),
            sorts,
          }),
        ),
    },
    sort: true,
  },
};

const [CurrencyPackageGrid, currencyPackageGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(currencyPackageSearchSchema),
  gridOptions: currencyPackageGridOptions,
});

const [CreateForm, createFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [EditForm, editFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
  title: '虚拟币充值包详情',
});

function buildCurrencyPackageSearchValues(
  formValues: CurrencyPackageSearchValues = {},
) {
  const { endDate, startDate } = splitSearchDateRange(formValues.dateRange);

  return {
    endDate,
    isEnabled: normalizeSearchBoolean(formValues.isEnabled),
    name: normalizeSearchText(formValues.name),
    startDate,
  } satisfies Partial<WalletCurrencyPackagePageRequest>;
}

function openCreateModal() {
  createFormApi
    .setData({
      cols: 2,
      schema: currencyPackageFormSchema,
      title: '虚拟币充值包',
      width: 1000,
    })
    .open();
}

function openEditModal(row: CurrencyPackageRow) {
  editFormApi
    .setData({
      cols: 2,
      record: { ...row },
      schema: currencyPackageFormSchema,
      title: '虚拟币充值包',
      width: 1000,
    })
    .open();
}

function openDetailModal(row: CurrencyPackageRow) {
  currentCurrencyPackage.value = row;
  detailApi.setData({ recordId: row.id }).open();
}

async function handleCreateSubmit(values: CurrencyPackageFormValues) {
  await walletCurrencyPackageCreateApi(
    buildCurrencyPackageCreatePayload(values),
  );
  useMessage.success('操作成功');
  await currencyPackageGridApi.reload();
}

async function handleEditSubmit(values: CurrencyPackageFormValues) {
  await walletCurrencyPackageUpdateApi(
    buildCurrencyPackageUpdatePayload(values),
  );
  useMessage.success('操作成功');
  await currencyPackageGridApi.reload();
}

async function toggleEnableStatus(row: CurrencyPackageRow) {
  if (typeof row.id !== 'number') {
    return;
  }

  row.statusLoading = true;
  try {
    await walletCurrencyPackageUpdateStatusApi({
      id: row.id,
      isEnabled: row.isEnabled !== true,
    } satisfies WalletCurrencyPackageUpdateStatusRequest);
    useMessage.success('状态更新成功');
    await currencyPackageGridApi.reload();
  } finally {
    row.statusLoading = false;
  }
}

async function getCurrentCurrencyPackage() {
  return currentCurrencyPackage.value;
}
</script>

<template>
  <div class="es-full-height-pane">
    <CurrencyPackageGrid class="es-full-height-grid">
      <template #toolbar-actions>
        <el-button class="ml-2" type="primary" @click="openCreateModal()">
          添加充值包
        </el-button>
      </template>

      <template #detail="{ row }">
        <el-text
          class="cursor-pointer text-left hover:opacity-80"
          type="primary"
          @click="openDetailModal(row)"
        >
          {{ row.name || row.id }}
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
        <div class="my-1 flex items-center">
          <el-button link type="primary" @click="openDetailModal(row)">
            详情
          </el-button>
          <el-divider direction="vertical" />
          <el-button link type="primary" @click="openEditModal(row)">
            编辑
          </el-button>
        </div>
      </template>
    </CurrencyPackageGrid>

    <CreateForm
      :schema="currencyPackageFormSchema"
      :on-submit="handleCreateSubmit"
    />
    <EditForm
      :schema="currencyPackageFormSchema"
      :on-submit="handleEditSubmit"
    />

    <DetailModal
      :api="getCurrentCurrencyPackage"
      :cards="getCurrencyPackageDetailCards"
      class="w-[980px]"
    />
  </div>
</template>
