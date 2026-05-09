<script lang="ts" setup>
import type { VipBenefitFormValues, VipBenefitRow } from '../model/benefit';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  MonetizationVipBenefitPageRequest,
  MonetizationVipBenefitUpdateStatusRequest,
} from '#/api/types';

import { useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  monetizationVipBenefitCreateApi,
  monetizationVipBenefitPageApi,
  monetizationVipBenefitUpdateApi,
  monetizationVipBenefitUpdateStatusApi,
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
} from '../../model/search';
import {
  buildVipBenefitCreatePayload,
  buildVipBenefitUpdatePayload,
  getVipBenefitDetailCards,
  vipBenefitColumns,
  vipBenefitFormSchema,
  vipBenefitSearchSchema,
} from '../model/benefit';

type VipBenefitSearchValues = {
  benefitType?: unknown;
  dateRange?: unknown;
  isEnabled?: unknown;
  name?: unknown;
};

const currentVipBenefit = ref({} as VipBenefitRow);

const vipBenefitGridOptions: VxeGridProps<VipBenefitRow> = {
  columns: vipBenefitColumns,
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues?: VipBenefitSearchValues) =>
        await monetizationVipBenefitPageApi(
          formatQuery({
            page,
            formValues: buildVipBenefitSearchValues(formValues),
            sorts,
          }),
        ),
    },
    sort: true,
  },
};

const [VipBenefitGrid, vipBenefitGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(vipBenefitSearchSchema),
  gridOptions: vipBenefitGridOptions,
});

const [CreateForm, createFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [EditForm, editFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
  title: '会员权益详情',
});

function buildVipBenefitSearchValues(formValues: VipBenefitSearchValues = {}) {
  const { endDate, startDate } = splitSearchDateRange(formValues.dateRange);

  return {
    benefitType: normalizeSearchNumber(formValues.benefitType),
    endDate,
    isEnabled: normalizeSearchBoolean(formValues.isEnabled),
    name: normalizeSearchText(formValues.name),
    startDate,
  } satisfies Partial<MonetizationVipBenefitPageRequest>;
}

function openCreateModal() {
  createFormApi
    .setData({
      cols: 2,
      schema: vipBenefitFormSchema,
      title: '会员权益',
      width: 1000,
    })
    .open();
}

function openEditModal(row: VipBenefitRow) {
  editFormApi
    .setData({
      cols: 2,
      record: { ...row },
      schema: vipBenefitFormSchema,
      title: '会员权益',
      width: 1000,
    })
    .open();
}

function openDetailModal(row: VipBenefitRow) {
  currentVipBenefit.value = row;
  detailApi.setData({ recordId: row.id }).open();
}

async function handleCreateSubmit(values: VipBenefitFormValues) {
  await monetizationVipBenefitCreateApi(buildVipBenefitCreatePayload(values));
  useMessage.success('操作成功');
  await vipBenefitGridApi.reload();
}

async function handleEditSubmit(values: VipBenefitFormValues) {
  await monetizationVipBenefitUpdateApi(buildVipBenefitUpdatePayload(values));
  useMessage.success('操作成功');
  await vipBenefitGridApi.reload();
}

async function toggleEnableStatus(row: VipBenefitRow) {
  if (typeof row.id !== 'number') {
    return;
  }

  row.statusLoading = true;
  try {
    await monetizationVipBenefitUpdateStatusApi({
      id: row.id,
      isEnabled: row.isEnabled !== true,
    } satisfies MonetizationVipBenefitUpdateStatusRequest);
    useMessage.success('状态更新成功');
    await vipBenefitGridApi.reload();
  } finally {
    row.statusLoading = false;
  }
}

async function getCurrentVipBenefit() {
  return currentVipBenefit.value;
}
</script>

<template>
  <div class="es-full-height-pane">
    <VipBenefitGrid class="es-full-height-grid">
      <template #toolbar-actions>
        <el-button class="ml-2" type="primary" @click="openCreateModal()">
          添加会员权益
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
    </VipBenefitGrid>

    <CreateForm
      :schema="vipBenefitFormSchema"
      :on-submit="handleCreateSubmit"
    />
    <EditForm :schema="vipBenefitFormSchema" :on-submit="handleEditSubmit" />

    <DetailModal
      :api="getCurrentVipBenefit"
      :cards="getVipBenefitDetailCards"
      class="w-[980px]"
    />
  </div>
</template>
