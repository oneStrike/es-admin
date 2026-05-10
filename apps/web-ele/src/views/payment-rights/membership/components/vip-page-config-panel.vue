<script lang="ts" setup>
import type {
  VipPageConfigFormValues,
  VipPageConfigRow,
} from '../model/page-config';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  MembershipPageConfigPageRequest,
  MembershipPageConfigUpdateStatusRequest,
} from '#/api/types';

import { useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  membershipPageConfigCreateApi,
  membershipPageConfigPageApi,
  membershipPageConfigUpdateApi,
  membershipPageConfigUpdateStatusApi,
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
  buildVipPageConfigCreatePayload,
  buildVipPageConfigUpdatePayload,
  getVipPageConfigDetailCards,
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
  connectedComponent: EsRecordDetail,
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
  detailApi.setData({ recordId: row.id }).open();
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
    </VipPageConfigGrid>

    <CreateForm
      :schema="vipPageConfigFormSchema"
      :on-submit="handleCreateSubmit"
    />
    <EditForm :schema="vipPageConfigFormSchema" :on-submit="handleEditSubmit" />

    <DetailModal
      :api="getCurrentVipPageConfig"
      :cards="getVipPageConfigDetailCards"
      class="w-[980px]"
    />
  </div>
</template>
