<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type {
  CurrencyPackageFormValues,
  CurrencyPackageRow,
} from './model/currency-package';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  WalletCurrencyPackagePageRequest,
  WalletCurrencyPackageUpdateStatusRequest,
} from '#/api/types';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  walletCurrencyPackageCreateApi,
  walletCurrencyPackagePageApi,
  walletCurrencyPackageUpdateApi,
  walletCurrencyPackageUpdateStatusApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import RecordDetailModal from '#/components/record-detail-modal';
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
  getCurrencyPackageDetailSections,
} from './model/currency-package';

defineOptions({
  name: 'WalletCurrencyPackage',
});

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
  connectedComponent: RecordDetailModal,
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
  detailApi.setData({ id: row.id }).open();
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

function getCurrencyPackageActions(row: CurrencyPackageRow): ActionItem[] {
  return [
    {
      key: 'detail',
      text: '详情',
      onClick: () => openDetailModal(row),
    },
    {
      key: 'edit',
      text: '编辑',
      onClick: () => openEditModal(row),
    },
  ];
}
</script>

<template>
  <Page auto-content-height content-class="es-full-height-page-content">
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
          <VbenTableAction
            align="center"
            :actions="getCurrencyPackageActions(row)"
          />
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
        :sections="getCurrencyPackageDetailSections"
        class="w-[980px]"
      />
    </div>
  </Page>
</template>
