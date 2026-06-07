<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type { VipPlanFormValues, VipPlanRow } from '../model/plan';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  MembershipPlanPageRequest,
  MembershipPlanUpdateStatusRequest,
} from '#/api/types';

import { useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  membershipPlanCreateApi,
  membershipPlanPageApi,
  membershipPlanUpdateApi,
  membershipPlanUpdateStatusApi,
} from '#/api/core';
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
  buildVipPlanCreatePayload,
  buildVipPlanUpdatePayload,
  getVipPlanDetailSections,
  mapVipPlanToFormRecord,
  vipPlanColumns,
  vipPlanSearchSchema,
} from '../model/plan';
import VipPlanFormModal from './vip-plan-form-modal.vue';

type VipPlanSearchValues = {
  dateRange?: unknown;
  isEnabled?: unknown;
  name?: unknown;
  tier?: unknown;
};

const currentDetailRecord = shallowRef<VipPlanRow>();

const gridOptions: VxeGridProps<VipPlanRow> = {
  columns: vipPlanColumns,
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await membershipPlanPageApi(
          formatQuery({
            formValues: buildVipPlanSearchValues(formValues),
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
  formOptions: createSearchFormOptions(vipPlanSearchSchema),
  gridOptions,
});

const [PlanForm, planFormApi] = useVbenModal({
  connectedComponent: VipPlanFormModal,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: RecordDetailModal,
  title: 'VIP 套餐详情',
});

function buildVipPlanSearchValues(formValues: VipPlanSearchValues = {}) {
  const { endDate, startDate } = splitSearchDateRange(formValues.dateRange);

  return {
    endDate,
    isEnabled: normalizeSearchBoolean(formValues.isEnabled),
    name: normalizeSearchText(formValues.name),
    startDate,
    tier: normalizeSearchNumber(formValues.tier),
  } satisfies Partial<MembershipPlanPageRequest>;
}

async function resolveDetailRecord() {
  return currentDetailRecord.value;
}

function openDetail(row: VipPlanRow) {
  currentDetailRecord.value = row;
  detailApi.setData({ id: row.id }).open();
}

function openFormModal(row?: VipPlanRow) {
  const record = row ? mapVipPlanToFormRecord(row) : undefined;
  planFormApi.setData({ record }).open();
}

async function handleSubmit(values: VipPlanFormValues) {
  await (values.id
    ? membershipPlanUpdateApi(buildVipPlanUpdatePayload(values))
    : membershipPlanCreateApi(buildVipPlanCreatePayload(values)));

  useMessage.success('操作成功');
  await gridApi.reload();
}

async function toggleEnableStatus(row: VipPlanRow) {
  if (typeof row.id !== 'number') {
    return;
  }

  row.statusLoading = true;
  try {
    await membershipPlanUpdateStatusApi({
      id: row.id,
      isEnabled: !row.isEnabled,
    } satisfies MembershipPlanUpdateStatusRequest);
    useMessage.success('状态更新成功');
    await gridApi.reload();
  } finally {
    row.statusLoading = false;
  }
}

function getVipPlanActions(row: VipPlanRow): ActionItem[] {
  return [
    {
      key: 'detail',
      onClick: () => openDetail(row),
      text: '详情',
    },
    {
      key: 'edit',
      onClick: () => openFormModal(row),
      text: '编辑',
    },
  ];
}
</script>

<template>
  <div class="es-full-height-pane">
    <Grid class="es-full-height-grid">
      <template #toolbar-actions>
        <el-button class="ml-2" type="primary" @click="openFormModal()">
          添加 VIP 套餐
        </el-button>
      </template>

      <template #detail="{ row }">
        <el-text
          class="cursor-pointer text-left hover:opacity-80"
          type="primary"
          @click="openDetail(row)"
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
        <VbenTableAction align="center" :actions="getVipPlanActions(row)" />
      </template>
    </Grid>

    <PlanForm :on-submit="handleSubmit" />

    <DetailModal
      :api="resolveDetailRecord"
      :sections="getVipPlanDetailSections"
      class="w-[980px]"
    />
  </div>
</template>
