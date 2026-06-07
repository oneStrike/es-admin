<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type {
  VipPageConfigFormValues,
  VipPageConfigRow,
} from '../model/page-config';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  MembershipPageConfigPageRequest,
  MembershipPageConfigUpdateStatusRequest,
} from '#/api/types';

import { useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  membershipPageConfigCreateApi,
  membershipPageConfigPageApi,
  membershipPageConfigUpdateApi,
  membershipPageConfigUpdateStatusApi,
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
  buildVipPageConfigCreatePayload,
  buildVipPageConfigUpdatePayload,
  getVipPageConfigDetailSections,
  mapVipPageConfigToFormRecord,
  vipPageConfigColumns,
  vipPageConfigFormSchema,
  vipPageConfigSearchSchema,
} from '../model/page-config';

type VipPageConfigSearchValues = {
  dateRange?: unknown;
  isEnabled?: unknown;
  title?: unknown;
};

const currentVipPageConfig = ref({} as VipPageConfigRow);

const vipPageConfigGridOptions: VxeGridProps<VipPageConfigRow> = {
  columns: vipPageConfigColumns,
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues?: VipPageConfigSearchValues) =>
        await membershipPageConfigPageApi(
          formatQuery({
            page,
            formValues: buildVipPageConfigSearchValues(formValues),
            sorts,
          }),
        ),
    },
    sort: true,
  },
};

const [VipPageConfigGrid, vipPageConfigGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(vipPageConfigSearchSchema),
  gridOptions: vipPageConfigGridOptions,
});

const [CreateForm, createFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [EditForm, editFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: RecordDetailModal,
  title: '会员页配置详情',
});

function buildVipPageConfigSearchValues(
  formValues: VipPageConfigSearchValues = {},
) {
  const { endDate, startDate } = splitSearchDateRange(formValues.dateRange);

  return {
    endDate,
    isEnabled: normalizeSearchBoolean(formValues.isEnabled),
    startDate,
    title: normalizeSearchText(formValues.title),
  } satisfies Partial<MembershipPageConfigPageRequest>;
}

function openCreateModal() {
  createFormApi
    .setData({
      cols: 2,
      schema: vipPageConfigFormSchema,
      title: '会员页配置',
      width: 1000,
    })
    .open();
}

function openEditModal(row: VipPageConfigRow) {
  editFormApi
    .setData({
      cols: 2,
      record: mapVipPageConfigToFormRecord(row),
      schema: vipPageConfigFormSchema,
      title: '会员页配置',
      width: 1000,
    })
    .open();
}

function openDetailModal(row: VipPageConfigRow) {
  currentVipPageConfig.value = row;
  detailApi.setData({ id: row.id }).open();
}

async function handleCreateSubmit(values: VipPageConfigFormValues) {
  await membershipPageConfigCreateApi(buildVipPageConfigCreatePayload(values));
  useMessage.success('操作成功');
  await vipPageConfigGridApi.reload();
}

async function handleEditSubmit(values: VipPageConfigFormValues) {
  await membershipPageConfigUpdateApi(buildVipPageConfigUpdatePayload(values));
  useMessage.success('操作成功');
  await vipPageConfigGridApi.reload();
}

async function toggleEnableStatus(row: VipPageConfigRow) {
  if (typeof row.id !== 'number') {
    return;
  }

  row.statusLoading = true;
  try {
    await membershipPageConfigUpdateStatusApi({
      id: row.id,
      isEnabled: row.isEnabled !== true,
    } satisfies MembershipPageConfigUpdateStatusRequest);
    useMessage.success('状态更新成功');
    await vipPageConfigGridApi.reload();
  } finally {
    row.statusLoading = false;
  }
}

async function getCurrentVipPageConfig() {
  return currentVipPageConfig.value;
}

function getVipPageConfigActions(row: VipPageConfigRow): ActionItem[] {
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
    <VipPageConfigGrid class="es-full-height-grid">
      <template #toolbar-actions>
        <el-button class="ml-2" type="primary" @click="openCreateModal()">
          添加会员页配置
        </el-button>
      </template>

      <template #detail="{ row }">
        <el-text
          class="cursor-pointer text-left hover:opacity-80"
          type="primary"
          @click="openDetailModal(row)"
        >
          {{ row.title || row.id }}
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
          :actions="getVipPageConfigActions(row)"
        />
      </template>
    </VipPageConfigGrid>

    <CreateForm
      :schema="vipPageConfigFormSchema"
      :on-submit="handleCreateSubmit"
    />
    <EditForm :schema="vipPageConfigFormSchema" :on-submit="handleEditSubmit" />

    <DetailModal
      :api="getCurrentVipPageConfig"
      :sections="getVipPageConfigDetailSections"
      class="w-[980px]"
    />
  </div>
</template>
