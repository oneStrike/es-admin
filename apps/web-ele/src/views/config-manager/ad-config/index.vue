<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type { AdProviderFormValues, AdProviderRow } from './model/provider';
import type {
  AdRewardReconcileRow,
  AdRewardRecordRevokeFormValues,
  AdRewardRecordRow,
  AdRewardRecordSearchValues,
} from './model/record';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AdRewardProviderPageRequest,
  AdRewardProviderUpdateStatusRequest,
} from '#/api/types';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  adRewardProviderCreateApi,
  adRewardProviderPageApi,
  adRewardProviderUpdateApi,
  adRewardProviderUpdateStatusApi,
  adRewardRecordDetailApi,
  adRewardRecordPageApi,
  adRewardRecordReconcilePageApi,
  adRewardRecordRevokeApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import RecordDetailModal from '#/components/record-detail-modal';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
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
  getAdProviderCredentialOptionText,
  getAdProviderDetailSections,
  mapAdProviderToFormRecord,
} from './model/provider';
import {
  adRewardReconcileColumns,
  adRewardRecordColumns,
  adRewardRecordRevokeSchema,
  adRewardRecordSearchSchema,
  buildAdRewardReconcileSearchValues,
  buildAdRewardRecordRevokePayload,
  buildAdRewardRecordSearchValues,
  getAdRewardReconcileDetailSections,
  getAdRewardRecordDetailSections,
} from './model/record';

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

const activeTab = ref<'provider' | 'reconcile' | 'record'>('provider');
const currentAdProvider = ref({} as AdProviderRow);
const currentReconcileRecord = ref({} as AdRewardReconcileRow);
const currentRevokeRecord = ref<AdRewardReconcileRow | AdRewardRecordRow>();

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

const adRewardRecordGridOptions: VxeGridProps<AdRewardRecordRow> = {
  columns: adRewardRecordColumns,
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues?: AdRewardRecordSearchValues) =>
        await adRewardRecordPageApi(
          formatQuery({
            page,
            formValues: buildAdRewardRecordSearchValues(formValues),
            sorts,
          }),
        ),
    },
    sort: true,
  },
};

const adRewardReconcileGridOptions: VxeGridProps<AdRewardReconcileRow> = {
  columns: adRewardReconcileColumns,
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues?: AdRewardRecordSearchValues) =>
        await adRewardRecordReconcilePageApi(
          formatQuery({
            page,
            formValues: buildAdRewardReconcileSearchValues(formValues),
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

const [AdRewardRecordGrid, adRewardRecordGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(adRewardRecordSearchSchema),
  gridOptions: adRewardRecordGridOptions,
});

const [AdRewardReconcileGrid, adRewardReconcileGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(adRewardRecordSearchSchema),
  gridOptions: adRewardReconcileGridOptions,
});

const [CreateForm, createFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [EditForm, editFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [RevokeForm, revokeFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [AdProviderDetailModal, adProviderDetailApi] = useVbenModal({
  connectedComponent: RecordDetailModal,
  title: '广告 provider 详情',
});

const [RewardRecordDetailModal, rewardRecordDetailApi] = useVbenModal({
  connectedComponent: RecordDetailModal,
  title: '广告奖励记录详情',
});

const [RewardReconcileDetailModal, rewardReconcileDetailApi] = useVbenModal({
  connectedComponent: RecordDetailModal,
  title: '广告奖励对账详情',
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

function openAdProviderDetailModal(row: AdProviderRow) {
  currentAdProvider.value = row;
  adProviderDetailApi.setData({ id: row.id }).open();
}

function openRecordDetailModal(row: AdRewardRecordRow) {
  rewardRecordDetailApi.setData({ id: row.id }).open();
}

function openReconcileDetailModal(row: AdRewardReconcileRow) {
  currentReconcileRecord.value = row;
  rewardReconcileDetailApi
    .setData({
      data: row,
      id: row.id,
    })
    .open();
}

async function openRevokeModal(row: AdRewardReconcileRow | AdRewardRecordRow) {
  const alreadyRevoked = row.status === 3;
  const confirmed = await useConfirm({
    confirmText: '继续',
    content: alreadyRevoked
      ? '奖励记录已撤销，将重新清理这条奖励写入的 AD 内容权益。'
      : '确认发起撤销当前广告奖励记录？',
    successMessage: false,
    title: alreadyRevoked ? '清理广告权益' : '撤销广告奖励',
  });

  if (!confirmed) {
    return;
  }

  currentRevokeRecord.value = row;
  revokeFormApi
    .setData({
      cols: 1,
      record: {},
      schema: adRewardRecordRevokeSchema,
      title: alreadyRevoked ? '广告权益清理' : '广告奖励撤销',
      width: 700,
    })
    .open();
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

async function handleRevokeSubmit(values: AdRewardRecordRevokeFormValues) {
  const record = currentRevokeRecord.value;

  await adRewardRecordRevokeApi(
    buildAdRewardRecordRevokePayload(record?.id, values),
  );
  useMessage.success('撤销成功');
  await Promise.all([
    adRewardRecordGridApi.reload(),
    adRewardReconcileGridApi.reload(),
  ]);
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

function getAdProviderActions(row: AdProviderRow): ActionItem[] {
  return [
    {
      key: 'detail',
      onClick: () => openAdProviderDetailModal(row),
      text: '详情',
    },
    {
      key: 'edit',
      onClick: () => openEditModal(row),
      text: '编辑',
    },
  ];
}

function getAdRewardRecordActions(row: AdRewardRecordRow): ActionItem[] {
  const actions: ActionItem[] = [
    {
      key: 'detail',
      onClick: () => openRecordDetailModal(row),
      text: '详情',
    },
  ];

  if (row.status !== 3) {
    actions.push({
      danger: true,
      key: 'revoke',
      onClick: () => openRevokeModal(row),
      text: '撤销',
    });
  }

  return actions;
}

function canRepairReconcileEntitlement(row: AdRewardReconcileRow) {
  return [
    'failed_reward_active_entitlement',
    'revoked_reward_active_entitlement',
    'revoked_reward_expired_entitlement',
  ].includes(row.reconcileStatus);
}

function getAdRewardReconcileActions(row: AdRewardReconcileRow): ActionItem[] {
  const actions: ActionItem[] = [
    {
      key: 'detail',
      onClick: () => openReconcileDetailModal(row),
      text: '详情',
    },
  ];

  if (canRepairReconcileEntitlement(row)) {
    actions.push({
      danger: true,
      key: 'repair-entitlement',
      onClick: () => openRevokeModal(row),
      text: '清理权益',
    });
  }

  return actions;
}

async function getCurrentAdProvider() {
  return currentAdProvider.value;
}

async function getCurrentReconcileRecord() {
  return currentReconcileRecord.value;
}
</script>

<template>
  <Page auto-content-height content-class="es-full-height-page-content">
    <div class="es-full-height-pane">
      <el-tabs v-model="activeTab" class="ad-config-tabs h-full min-h-0">
        <el-tab-pane label="Provider 配置" name="provider">
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
                @click="openAdProviderDetailModal(row)"
              >
                {{ row.placementKey || row.id }}
              </el-text>
            </template>

            <template #credentialOption="{ row }">
              <el-text class="text-left">
                {{ getAdProviderCredentialOptionText(row) }}
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
                :actions="getAdProviderActions(row)"
              />
            </template>
          </AdProviderGrid>
        </el-tab-pane>

        <el-tab-pane label="奖励记录" name="record">
          <AdRewardRecordGrid class="es-full-height-grid">
            <template #recordDetail="{ row }">
              <el-text
                class="cursor-pointer text-left hover:opacity-80"
                type="primary"
                @click="openRecordDetailModal(row)"
              >
                {{ row.id }}
              </el-text>
            </template>

            <template #actions="{ row }">
              <VbenTableAction
                align="center"
                :actions="getAdRewardRecordActions(row)"
              />
            </template>
          </AdRewardRecordGrid>
        </el-tab-pane>

        <el-tab-pane label="权益对账" name="reconcile">
          <AdRewardReconcileGrid class="es-full-height-grid">
            <template #reconcileDetail="{ row }">
              <el-text
                class="cursor-pointer text-left hover:opacity-80"
                type="primary"
                @click="openReconcileDetailModal(row)"
              >
                {{ row.id }}
              </el-text>
            </template>

            <template #actions="{ row }">
              <VbenTableAction
                align="center"
                :actions="getAdRewardReconcileActions(row)"
              />
            </template>
          </AdRewardReconcileGrid>
        </el-tab-pane>
      </el-tabs>

      <CreateForm
        :schema="adProviderFormSchema"
        :on-submit="handleCreateSubmit"
      />
      <EditForm :schema="adProviderFormSchema" :on-submit="handleEditSubmit" />
      <RevokeForm
        :schema="adRewardRecordRevokeSchema"
        :on-submit="handleRevokeSubmit"
      />

      <AdProviderDetailModal
        :api="getCurrentAdProvider"
        :sections="getAdProviderDetailSections"
        class="w-[980px]"
      />
      <RewardRecordDetailModal
        :api="adRewardRecordDetailApi"
        :sections="getAdRewardRecordDetailSections"
        class="w-[980px]"
      />
      <RewardReconcileDetailModal
        :api="getCurrentReconcileRecord"
        :sections="getAdRewardReconcileDetailSections"
        class="w-[980px]"
      />
    </div>
  </Page>
</template>

<style scoped lang="scss">
.ad-config-tabs {
  :deep(.el-tabs__content) {
    height: calc(100% - 48px);
  }

  :deep(.el-tab-pane) {
    height: 100%;
    min-height: 0;
  }
}
</style>
