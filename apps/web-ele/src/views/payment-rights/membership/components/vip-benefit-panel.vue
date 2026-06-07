<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type { VipBenefitFormValues, VipBenefitRow } from '../model/benefit';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  MembershipBenefitPageRequest,
  MembershipBenefitUpdateStatusRequest,
} from '#/api/types';

import { useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  membershipBenefitCreateApi,
  membershipBenefitPageApi,
  membershipBenefitUpdateApi,
  membershipBenefitUpdateStatusApi,
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
  buildVipBenefitCreatePayload,
  buildVipBenefitUpdatePayload,
  getVipBenefitDetailSections,
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
        await membershipBenefitPageApi(
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
  connectedComponent: RecordDetailModal,
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
  } satisfies Partial<MembershipBenefitPageRequest>;
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
  detailApi.setData({ id: row.id }).open();
}

async function handleCreateSubmit(values: VipBenefitFormValues) {
  await membershipBenefitCreateApi(buildVipBenefitCreatePayload(values));
  useMessage.success('操作成功');
  await vipBenefitGridApi.reload();
}

async function handleEditSubmit(values: VipBenefitFormValues) {
  await membershipBenefitUpdateApi(buildVipBenefitUpdatePayload(values));
  useMessage.success('操作成功');
  await vipBenefitGridApi.reload();
}

async function toggleEnableStatus(row: VipBenefitRow) {
  if (typeof row.id !== 'number') {
    return;
  }

  row.statusLoading = true;
  try {
    await membershipBenefitUpdateStatusApi({
      id: row.id,
      isEnabled: row.isEnabled !== true,
    } satisfies MembershipBenefitUpdateStatusRequest);
    useMessage.success('状态更新成功');
    await vipBenefitGridApi.reload();
  } finally {
    row.statusLoading = false;
  }
}

async function getCurrentVipBenefit() {
  return currentVipBenefit.value;
}

function getVipBenefitActions(row: VipBenefitRow): ActionItem[] {
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
        <VbenTableAction align="center" :actions="getVipBenefitActions(row)" />
      </template>
    </VipBenefitGrid>

    <CreateForm
      :schema="vipBenefitFormSchema"
      :on-submit="handleCreateSubmit"
    />
    <EditForm :schema="vipBenefitFormSchema" :on-submit="handleEditSubmit" />

    <DetailModal
      :api="getCurrentVipBenefit"
      :sections="getVipBenefitDetailSections"
      class="w-[980px]"
    />
  </div>
</template>
