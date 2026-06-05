<script lang="ts" setup>
import type { AdProviderFormValues, AdProviderRow } from './model/provider';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AdRewardProviderPageRequest,
  AdRewardProviderUpdateStatusRequest,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  adRewardProviderCreateApi,
  adRewardProviderPageApi,
  adRewardProviderUpdateApi,
  adRewardProviderUpdateStatusApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';
import {
  normalizeSearchBoolean,
  normalizeSearchNumber,
  normalizeSearchText,
  splitSearchDateRange,
} from '#/utils/search-normalize';

import {
  adProviderColumns,
  adProviderFormSchema,
  adProviderSearchSchema,
  buildAdProviderCreatePayload,
  buildAdProviderUpdatePayload,
  getAdProviderDetailCards,
  mapAdProviderToFormRecord,
} from './model/provider';

defineOptions({
  name: 'AdConfig',
});

type AdProviderSearchValues = {
  clientAppKey?: unknown;
  dateRange?: unknown;
  environment?: unknown;
  isEnabled?: unknown;
  placementKey?: unknown;
  platform?: unknown;
  provider?: unknown;
  targetScope?: unknown;
};

const currentAdProvider = ref({} as AdProviderRow);

const adProviderGridOptions: VxeGridProps<AdProviderRow> = {
  columns: adProviderColumns,
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues?: AdProviderSearchValues) =>
        await adRewardProviderPageApi(
          formatQuery({
            page,
            formValues: buildAdProviderSearchValues(formValues),
            sorts,
          }),
        ),
    },
    sort: true,
  },
};

const [AdProviderGrid, adProviderGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(adProviderSearchSchema),
  gridOptions: adProviderGridOptions,
});

const [CreateForm, createFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [EditForm, editFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
  title: '广告 provider 详情',
});

function buildAdProviderSearchValues(formValues: AdProviderSearchValues = {}) {
  const { endDate, startDate } = splitSearchDateRange(formValues.dateRange);

  return {
    clientAppKey: normalizeSearchText(formValues.clientAppKey),
    endDate,
    environment: normalizeSearchNumber(formValues.environment),
    isEnabled: normalizeSearchBoolean(formValues.isEnabled),
    placementKey: normalizeSearchText(formValues.placementKey),
    platform: normalizeSearchNumber(formValues.platform),
    provider: normalizeSearchNumber(formValues.provider),
    startDate,
    targetScope: normalizeSearchNumber(formValues.targetScope),
  } satisfies Partial<AdRewardProviderPageRequest>;
}

function openCreateModal() {
  createFormApi
    .setData({
      cols: 2,
      schema: adProviderFormSchema,
      title: '广告 provider',
      width: 1000,
    })
    .open();
}

function openEditModal(row: AdProviderRow) {
  editFormApi
    .setData({
      cols: 2,
      record: mapAdProviderToFormRecord(row),
      schema: adProviderFormSchema,
      title: '广告 provider',
      width: 1000,
    })
    .open();
}

function openDetailModal(row: AdProviderRow) {
  currentAdProvider.value = row;
  detailApi.setData({ recordId: row.id }).open();
}

async function handleCreateSubmit(values: AdProviderFormValues) {
  await adRewardProviderCreateApi(buildAdProviderCreatePayload(values));
  useMessage.success('操作成功');
  await adProviderGridApi.reload();
}

async function handleEditSubmit(values: AdProviderFormValues) {
  await adRewardProviderUpdateApi(buildAdProviderUpdatePayload(values));
  useMessage.success('操作成功');
  await adProviderGridApi.reload();
}

async function toggleEnableStatus(row: AdProviderRow) {
  if (typeof row.id !== 'number') {
    return;
  }

  row.statusLoading = true;
  try {
    await adRewardProviderUpdateStatusApi({
      id: row.id,
      isEnabled: row.isEnabled !== true,
    } satisfies AdRewardProviderUpdateStatusRequest);
    useMessage.success('状态更新成功');
    await adProviderGridApi.reload();
  } finally {
    row.statusLoading = false;
  }
}

async function getCurrentAdProvider() {
  return currentAdProvider.value;
}
</script>

<template>
  <Page auto-content-height content-class="es-full-height-page-content">
    <div class="es-full-height-pane">
      <AdProviderGrid class="es-full-height-grid">
        <template #toolbar-actions>
          <el-button class="ml-2" type="primary" @click="openCreateModal()">
            添加广告 provider
          </el-button>
        </template>

        <template #detail="{ row }">
          <el-text
            class="cursor-pointer text-left hover:opacity-80"
            type="primary"
            @click="openDetailModal(row)"
          >
            {{ row.placementKey || row.id }}
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
      </AdProviderGrid>

      <CreateForm
        :schema="adProviderFormSchema"
        :on-submit="handleCreateSubmit"
      />
      <EditForm :schema="adProviderFormSchema" :on-submit="handleEditSubmit" />

      <DetailModal
        :api="getCurrentAdProvider"
        :cards="getAdProviderDetailCards"
        class="w-[980px]"
      />
    </div>
  </Page>
</template>
