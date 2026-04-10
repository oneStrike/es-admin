<script lang="ts" setup>
import type { CheckInPlanRow, CheckInReconciliationRow } from './model/shared';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  CheckInGrantItemDto,
  CheckInReconciliationRepairRequest,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { ElMessageBox } from 'element-plus';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  checkInPlanDetailApi,
  checkInPlanPageApi,
  checkInPlanUpdateStatusApi,
  checkInReconciliationPageApi,
  checkInReconciliationRepairApi,
} from '#/api/core';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils';

import CheckInPlanModal from './components/check-in-plan-modal.vue';
import CheckInPlanRewardPreviewModal from './components/check-in-plan-reward-preview-modal.vue';
import { getDetailCards } from './model/detail';
import {
  checkInRecordTypeOptions,
  checkInRewardResultOptions,
  checkInRewardSourceOptions,
  checkInRewardStatusOptions,
  formatLedgerIds,
  formatRewardSummary,
  getPlanBaseRewardSummary,
  planColumns,
  planSearchFormSchema,
  reconciliationColumns,
  reconciliationSearchFormSchema,
} from './model/shared';

defineOptions({
  name: 'CheckInManager',
});

type TabKey = 'plans' | 'reconciliation';

const activeTab = ref<TabKey>('plans');

const planGridOptions: VxeGridProps<CheckInPlanRow> = {
  columns: planColumns,
  height: 'auto',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await checkInPlanPageApi(
          formatQuery({
            page,
            formValues,
            sorts,
          }),
        );
      },
    },
    sort: true,
  },
};

const [PlanGrid, planGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(planSearchFormSchema, {
    showCollapseButton: true,
    wrapperClass: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4',
  }),
  gridOptions: planGridOptions,
});

const reconciliationGridOptions: VxeGridProps<CheckInReconciliationRow> = {
  columns: reconciliationColumns,
  height: 'auto',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await checkInReconciliationPageApi(
          formatQuery({
            page,
            formValues,
            sorts,
          }),
        );
      },
    },
    sort: true,
  },
};

const [ReconciliationGrid, reconciliationGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(reconciliationSearchFormSchema, {
    showCollapseButton: true,
    wrapperClass: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4',
  }),
  gridOptions: reconciliationGridOptions,
});

const [PlanFormModal, planFormApi] = useVbenModal({
  connectedComponent: CheckInPlanModal,
});

const [RewardPreviewModal, rewardPreviewApi] = useVbenModal({
  connectedComponent: CheckInPlanRewardPreviewModal,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
  title: '签到计划详情',
});

const statusLoadingMap = reactive<Record<number, boolean>>({});
const baseRepairingMap = reactive<Record<number, boolean>>({});
const grantRepairingMap = reactive<Record<number, boolean>>({});

function syncActiveGridLayout() {
  nextTick(() => {
    requestAnimationFrame(() => {
      const currentGridApi =
        activeTab.value === 'plans' ? planGridApi : reconciliationGridApi;
      currentGridApi.grid?.recalculate?.();
      window.dispatchEvent(new Event('resize'));
    });
  });
}

watch(activeTab, () => {
  syncActiveGridLayout();
});

onMounted(() => {
  syncActiveGridLayout();
});

async function openPlanFormModal(row?: CheckInPlanRow) {
  planFormApi
    .setData({
      onSaved: () => planGridApi.reload(),
      row,
    })
    .open();
}

function openPlanDetail(row: CheckInPlanRow) {
  detailApi
    .setData({
      recordId: row.id,
      title: `${row.planName} · 详情`,
    })
    .open();
}

function openPlanRewardPreview(row: CheckInPlanRow) {
  rewardPreviewApi
    .setData({
      row,
    })
    .open();
}

async function changePlanStatus(row: CheckInPlanRow, status: 0 | 1 | 2) {
  if (row.status === status) {
    return;
  }

  statusLoadingMap[row.id] = true;
  try {
    await checkInPlanUpdateStatusApi({
      id: row.id,
      status,
    });
    useMessage.success('计划状态已更新');
    await planGridApi.reload();
  } finally {
    statusLoadingMap[row.id] = false;
  }
}

async function repairRecordReward(row: CheckInReconciliationRow) {
  if (row.rewardStatus === null || row.rewardStatus === 1) {
    return;
  }

  baseRepairingMap[row.recordId] = true;
  try {
    const confirmed = await confirmRepair({
      recordId: row.recordId,
      targetType: 1,
    });
    if (!confirmed) {
      return;
    }
    await checkInReconciliationRepairApi({
      recordId: row.recordId,
      targetType: 1,
    } satisfies CheckInReconciliationRepairRequest);
    useMessage.success('基础奖励补偿已触发');
    await reconciliationGridApi.reload();
  } finally {
    baseRepairingMap[row.recordId] = false;
  }
}

async function repairGrantReward(grant: CheckInGrantItemDto) {
  if (grant.grantStatus === 1) {
    return;
  }

  grantRepairingMap[grant.id] = true;
  try {
    const confirmed = await confirmRepair({
      grantId: grant.id,
      targetType: 2,
    });
    if (!confirmed) {
      return;
    }
    await checkInReconciliationRepairApi({
      grantId: grant.id,
      targetType: 2,
    } satisfies CheckInReconciliationRepairRequest);
    useMessage.success('连续奖励补偿已触发');
    await reconciliationGridApi.reload();
  } finally {
    grantRepairingMap[grant.id] = false;
  }
}

async function confirmRepair(params: {
  grantId?: number;
  recordId?: number;
  targetType: 1 | 2;
}) {
  const targetLabel = params.targetType === 1 ? '基础奖励' : '连续奖励';
  const targetId = params.targetType === 1 ? params.recordId : params.grantId;

  return await confirmAction(
    `确认补偿${targetLabel}吗？目标 ID：${targetId}`,
    '触发补偿',
    '确认补偿',
  );
}

async function confirmAction(
  message: string,
  title: string,
  confirmButtonText: string,
) {
  try {
    await ElMessageBox.confirm(message, title, {
      confirmButtonText,
      draggable: true,
      type: 'warning',
    });
    return true;
  } catch {
    return false;
  }
}

function hasRepairableBaseReward(row: CheckInReconciliationRow) {
  return row.rewardStatus === 0 || row.rewardStatus === 2;
}

function hasRepairableGrant(grant: CheckInGrantItemDto) {
  return grant.grantStatus === 0 || grant.grantStatus === 2;
}

function renderRewardTagType(status?: null | number) {
  return (
    checkInRewardStatusOptions.find((item) => item.value === status)?.color ||
    'info'
  );
}

function formatPlanBaseRewardSummary(row: CheckInPlanRow) {
  return row.baseRewardConfig === undefined
    ? '查看详情'
    : getPlanBaseRewardSummary(row);
}

function formatRewardSourceLabel(sourceType?: null | string) {
  return (
    checkInRewardSourceOptions.find((item) => item.value === sourceType)
      ?.label || '未命中'
  );
}
</script>

<template>
  <Page auto-content-height>
    <div class="h-full min-h-0">
      <el-tabs v-model="activeTab" class="check-in-tabs h-full">
        <el-tab-pane label="计划管理" name="plans">
          <PlanGrid>
            <template #toolbar-actions>
              <el-button type="primary" @click="openPlanFormModal()">
                新增签到计划
              </el-button>
            </template>

            <template #planName="{ row }">
              <el-text
                class="cursor-pointer hover:opacity-50"
                type="primary"
                @click="openPlanDetail(row)"
              >
                {{ row.planName }}
              </el-text>
            </template>

            <template #baseRewardConfig="{ row }">
              <div class="w-full flex justify-center">
                <div class="flex min-h-10 items-center">
                  <el-tag effect="light" round type="info">
                    {{ formatPlanBaseRewardSummary(row) }}
                  </el-tag>
                </div>
              </div>
            </template>

            <template #planActions="{ row }">
              <div class="flex flex-wrap items-center gap-2 py-1">
                <el-button link type="primary" @click="openPlanDetail(row)">
                  详情
                </el-button>
                <el-button
                  link
                  type="primary"
                  @click="openPlanRewardPreview(row)"
                >
                  周期奖励
                </el-button>
                <el-button link type="primary" @click="openPlanFormModal(row)">
                  编辑
                </el-button>
                <el-dropdown
                  trigger="click"
                  @command="(value: 0 | 1 | 2) => changePlanStatus(row, value)"
                >
                  <el-button
                    :loading="statusLoadingMap[row.id]"
                    link
                    type="primary"
                  >
                    切换状态
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item
                        :command="0"
                        :disabled="row.status === 0"
                      >
                        设为草稿
                      </el-dropdown-item>
                      <el-dropdown-item
                        :command="1"
                        :disabled="row.status === 1"
                      >
                        设为已发布
                      </el-dropdown-item>
                      <el-dropdown-item
                        :command="2"
                        :disabled="row.status === 2"
                      >
                        设为已下线
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </template>
          </PlanGrid>
        </el-tab-pane>

        <el-tab-pane label="奖励对账" name="reconciliation">
          <ReconciliationGrid>
            <template #signInfo="{ row }">
              <div class="space-y-1">
                <div class="font-medium text-slate-900">{{ row.signDate }}</div>
                <div class="flex flex-wrap items-center gap-2">
                  <el-tag
                    :type="row.recordType === 1 ? 'success' : 'warning'"
                    effect="light"
                    round
                  >
                    {{
                      checkInRecordTypeOptions.find(
                        (item) => item.value === row.recordType,
                      )?.label
                    }}
                  </el-tag>
                  <el-tag
                    v-if="row.resolvedRewardSourceType"
                    effect="plain"
                    round
                    type="info"
                  >
                    {{ formatRewardSourceLabel(row.resolvedRewardSourceType) }}
                  </el-tag>
                </div>
              </div>
            </template>

            <template #resolvedRewardSourceType="{ row }">
              <div class="flex min-h-10 items-center">
                <el-tag
                  v-if="row.resolvedRewardSourceType"
                  effect="light"
                  round
                  type="info"
                >
                  {{ formatRewardSourceLabel(row.resolvedRewardSourceType) }}
                </el-tag>
                <el-text v-else class="text-xs text-slate-400">-</el-text>
              </div>
            </template>

            <template #baseRewardStatus="{ row }">
              <div class="flex min-h-12 flex-wrap items-center gap-2">
                <template v-if="row.rewardStatus === null">
                  <el-tag effect="light" round type="info">无基础奖励</el-tag>
                </template>
                <template v-else>
                  <el-tag
                    :type="renderRewardTagType(row.rewardStatus)"
                    effect="light"
                    round
                  >
                    {{
                      checkInRewardStatusOptions.find(
                        (item) => item.value === row.rewardStatus,
                      )?.label
                    }}
                  </el-tag>
                  <el-tag
                    v-if="row.rewardResultType"
                    effect="plain"
                    round
                    :type="
                      checkInRewardResultOptions.find(
                        (item) => item.value === row.rewardResultType,
                      )?.color || 'info'
                    "
                  >
                    {{
                      checkInRewardResultOptions.find(
                        (item) => item.value === row.rewardResultType,
                      )?.label
                    }}
                  </el-tag>
                </template>
              </div>
            </template>

            <template #resolvedRewardConfig="{ row }">
              <div class="flex min-h-10 items-center">
                <el-tag effect="light" round type="primary">
                  {{
                    row.rewardStatus === null
                      ? '无基础奖励'
                      : formatRewardSummary(row.resolvedRewardConfig)
                  }}
                </el-tag>
              </div>
            </template>

            <template #baseRewardLedgerIds="{ row }">
              <div class="flex min-h-10 items-center">
                <el-tag effect="light" round type="info">
                  {{ formatLedgerIds(row.baseRewardLedgerIds) }}
                </el-tag>
              </div>
            </template>

            <template #grants="{ row }">
              <div v-if="row.grants?.length" class="space-y-2 py-1">
                <div
                  v-for="grant in row.grants"
                  :key="grant.id"
                  class="rounded-2xl border border-slate-200 bg-slate-50/80 p-3"
                >
                  <div
                    class="flex flex-wrap items-center justify-between gap-2"
                  >
                    <div class="flex flex-wrap items-center gap-2">
                      <el-tag effect="light" round type="primary">
                        发放 #{{ grant.id }}
                      </el-tag>
                      <el-tag
                        effect="light"
                        round
                        :type="renderRewardTagType(grant.grantStatus)"
                      >
                        {{
                          checkInRewardStatusOptions.find(
                            (item) => item.value === grant.grantStatus,
                          )?.label
                        }}
                      </el-tag>
                      <el-tag
                        v-if="grant.grantResultType"
                        effect="plain"
                        round
                        :type="
                          checkInRewardResultOptions.find(
                            (item) => item.value === grant.grantResultType,
                          )?.color || 'info'
                        "
                      >
                        {{
                          checkInRewardResultOptions.find(
                            (item) => item.value === grant.grantResultType,
                          )?.label
                        }}
                      </el-tag>
                    </div>
                    <el-button
                      v-if="hasRepairableGrant(grant)"
                      :loading="grantRepairingMap[grant.id]"
                      link
                      type="primary"
                      @click="repairGrantReward(grant)"
                    >
                      补发连续奖励
                    </el-button>
                  </div>
                  <div class="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                    <span>规则ID：{{ grant.ruleId }}</span>
                    <span>触发日：{{ grant.triggerSignDate }}</span>
                    <span>账本：{{ formatLedgerIds(grant.ledgerIds) }}</span>
                  </div>
                  <div
                    v-if="grant.lastGrantError"
                    class="mt-2 rounded-xl bg-rose-50 px-3 py-2 text-xs text-rose-600"
                  >
                    {{ grant.lastGrantError }}
                  </div>
                </div>
              </div>
              <div v-else class="flex min-h-10 items-center">
                <el-tag effect="light" round type="info">未触发连续奖励</el-tag>
              </div>
            </template>

            <template #reconciliationActions="{ row }">
              <div class="flex min-h-12 items-center">
                <el-button
                  v-if="hasRepairableBaseReward(row)"
                  :loading="baseRepairingMap[row.recordId]"
                  link
                  type="primary"
                  @click="repairRecordReward(row)"
                >
                  补基础奖励
                </el-button>
                <el-text v-else class="text-xs text-slate-400">
                  无需补偿
                </el-text>
              </div>
            </template>
          </ReconciliationGrid>
        </el-tab-pane>
      </el-tabs>
    </div>

    <PlanFormModal />
    <RewardPreviewModal />
    <DetailModal
      :api="checkInPlanDetailApi"
      :cards="getDetailCards"
      class="!min-w-[960px]"
    />
  </Page>
</template>

<style scoped>
.check-in-tabs {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

:deep(.check-in-tabs .el-tabs__header) {
  margin-bottom: 20px;
}

:deep(.check-in-tabs .el-tabs__content) {
  flex: 1;
  min-height: 0;
}

:deep(.check-in-tabs .el-tab-pane) {
  height: 100%;
  min-height: 0;
}

:deep(.check-in-tabs .el-tabs__item) {
  padding: 0 18px;
  font-weight: 600;
  border-radius: 9999px;
}
</style>
