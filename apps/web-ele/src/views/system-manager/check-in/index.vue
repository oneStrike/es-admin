<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AdminCheckInGrantItemDto,
  CheckInPlanCreateRequest,
  CheckInPlanUpdateRequest,
  CheckInReconciliationRepairRequest,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { ElMessageBox } from 'element-plus';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  checkInPlanCreateApi,
  checkInPlanDetailApi,
  checkInPlanPageApi,
  checkInPlanPublishApi,
  checkInPlanUpdateApi,
  checkInPlanUpdateStatusApi,
  checkInReconciliationPageApi,
  checkInReconciliationRepairApi,
} from '#/api/core';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions, formatUTC } from '#/utils';

import CheckInPlanModal from './check-in-plan-modal.vue';
import { getDetailCards } from './model/detail';
import {
  type CheckInPlanFormModel,
  type CheckInPlanRow,
  type CheckInReconciliationRow,
  checkInRecordTypeOptions,
  checkInRewardResultOptions,
  checkInRewardStatusOptions,
  formatLedgerIds,
  formatRewardSummary,
  mapPlanDetailToFormModel,
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

const planSummary = ref({
  activeCycleCount: 0,
  pendingRewardCount: 0,
  publishedInPage: 0,
  total: 0,
});

const reconciliationSummary = ref({
  failedBaseCount: 0,
  failedGrantCount: 0,
  pendingBaseCount: 0,
  pendingGrantCount: 0,
  repairableRows: 0,
  total: 0,
});

const planGridOptions: VxeGridProps<CheckInPlanRow> = {
  columns: planColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const result = await checkInPlanPageApi(
          formatQuery({
            page,
            formValues,
            sorts,
          }),
        );

        updatePlanSummary(result);
        return result;
      },
    },
    sort: true,
  },
};

const [PlanGrid, planGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(planSearchFormSchema, {
    showCollapseButton: false,
    wrapperClass: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4',
  }),
  gridOptions: planGridOptions,
});

const reconciliationGridOptions: VxeGridProps<CheckInReconciliationRow> = {
  columns: reconciliationColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const { dateRange, ...restFormValues } = formValues || {};
        const [startDate, endDate] = Array.isArray(dateRange) ? dateRange : [];

        const result = await checkInReconciliationPageApi(
          formatQuery({
            page,
            formValues: {
              ...restFormValues,
              endDate,
              startDate,
            },
            sorts,
          }),
        );

        updateReconciliationSummary(result);
        return result;
      },
    },
    sort: true,
  },
};

const [ReconciliationGrid, reconciliationGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(reconciliationSearchFormSchema, {
    wrapperClass: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4',
  }),
  gridOptions: reconciliationGridOptions,
});

const [PlanFormModal, planFormApi] = useVbenModal({
  connectedComponent: CheckInPlanModal,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
  title: '签到计划详情',
});

const enableLoadingMap = reactive<Record<number, boolean>>({});
const statusLoadingMap = reactive<Record<number, boolean>>({});
const publishLoadingMap = reactive<Record<number, boolean>>({});
const baseRepairingMap = reactive<Record<number, boolean>>({});
const grantRepairingMap = reactive<Record<number, boolean>>({});

const activeTabStats = computed(() => {
  if (activeTab.value === 'plans') {
    return [
      {
        accent: 'from-amber-400/20 to-orange-500/5',
        label: '筛选结果总计划数',
        tone: 'text-amber-600',
        value: planSummary.value.total,
      },
      {
        accent: 'from-emerald-400/20 to-green-500/5',
        label: '当前页已发布计划',
        tone: 'text-emerald-600',
        value: planSummary.value.publishedInPage,
      },
      {
        accent: 'from-sky-400/20 to-blue-500/5',
        label: '当前页活跃周期数',
        tone: 'text-sky-600',
        value: planSummary.value.activeCycleCount,
      },
      {
        accent: 'from-rose-400/20 to-red-500/5',
        label: '当前页待补偿奖励',
        tone: 'text-rose-600',
        value: planSummary.value.pendingRewardCount,
      },
    ];
  }

  return [
    {
      accent: 'from-slate-400/20 to-slate-500/5',
      label: '筛选结果总记录数',
      tone: 'text-slate-600',
      value: reconciliationSummary.value.total,
    },
    {
      accent: 'from-amber-400/20 to-orange-500/5',
      label: '当前页待处理基础奖励',
      tone: 'text-amber-600',
      value: reconciliationSummary.value.pendingBaseCount,
    },
    {
      accent: 'from-red-400/20 to-rose-500/5',
      label: '当前页失败奖励',
      tone: 'text-rose-600',
      value:
        reconciliationSummary.value.failedBaseCount
        + reconciliationSummary.value.failedGrantCount,
    },
    {
      accent: 'from-violet-400/20 to-indigo-500/5',
      label: '当前页需补偿记录',
      tone: 'text-violet-600',
      value: reconciliationSummary.value.repairableRows,
    },
  ];
});

function updatePlanSummary(result: {
  list?: CheckInPlanRow[];
  total?: number;
}) {
  const list = result.list || [];

  planSummary.value = {
    activeCycleCount: list.reduce(
      (total, item) => total + Number(item.activeCycleCount || 0),
      0,
    ),
    pendingRewardCount: list.reduce(
      (total, item) => total + Number(item.pendingRewardCount || 0),
      0,
    ),
    publishedInPage: list.filter(item => item.status === 1).length,
    total: Number(result.total || 0),
  };
}

function updateReconciliationSummary(result: {
  list?: CheckInReconciliationRow[];
  total?: number;
}) {
  const list = result.list || [];
  let pendingGrantCount = 0;
  let failedGrantCount = 0;
  let repairableRows = 0;

  for (const row of list) {
    const hasRepairableBase =
      row.rewardStatus === 0 || row.rewardStatus === 2;
    const hasRepairableGrant = (row.grants || []).some(
      grant => grant.grantStatus === 0 || grant.grantStatus === 2,
    );

    if (hasRepairableBase || hasRepairableGrant) {
      repairableRows += 1;
    }

    for (const grant of row.grants || []) {
      if (grant.grantStatus === 0) {
        pendingGrantCount += 1;
      }
      if (grant.grantStatus === 2) {
        failedGrantCount += 1;
      }
    }
  }

  reconciliationSummary.value = {
    failedBaseCount: list.filter(item => item.rewardStatus === 2).length,
    failedGrantCount,
    pendingBaseCount: list.filter(item => item.rewardStatus === 0).length,
    pendingGrantCount,
    repairableRows,
    total: Number(result.total || 0),
  };
}

async function openPlanFormModal(row?: CheckInPlanRow) {
  let record: CheckInPlanFormModel | undefined;

  if (row?.id) {
    record = mapPlanDetailToFormModel(await checkInPlanDetailApi({ id: row.id }));
  }

  planFormApi
    .setData({
      onSubmit: handlePlanSubmit,
      record,
      title: '签到计划',
    })
    .open();
}

async function handlePlanSubmit(
  payload: CheckInPlanCreateRequest | CheckInPlanUpdateRequest,
) {
  await ('id' in payload && payload.id
    ? checkInPlanUpdateApi(payload as CheckInPlanUpdateRequest)
    : checkInPlanCreateApi(payload as CheckInPlanCreateRequest));

  useMessage.success('保存成功');
  await planGridApi.reload();
}

function openPlanDetail(row: CheckInPlanRow) {
  detailApi
    .setData({
      recordId: row.id,
      title: `${row.planName} · 详情`,
    })
    .open();
}

async function togglePlanEnable(row: CheckInPlanRow) {
  enableLoadingMap[row.id] = true;
  try {
    await checkInPlanUpdateStatusApi({
      id: row.id,
      isEnabled: !row.isEnabled,
    });
    useMessage.success(row.isEnabled ? '已禁用该计划' : '已启用该计划');
    await planGridApi.reload();
  } finally {
    enableLoadingMap[row.id] = false;
  }
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

async function publishPlan(row: CheckInPlanRow) {
  publishLoadingMap[row.id] = true;
  try {
    const confirmed = await confirmAction(
      `确认发布计划「${row.planName}」吗？发布后会成为可执行计划。`,
      '发布签到计划',
      '确认发布',
    );
    if (!confirmed) {
      return;
    }
    await checkInPlanPublishApi({ id: row.id });
    useMessage.success('计划已发布');
    await planGridApi.reload();
  } finally {
    publishLoadingMap[row.id] = false;
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

async function repairGrantReward(grant: AdminCheckInGrantItemDto) {
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

async function confirmRepair(params: { grantId?: number; recordId?: number; targetType: 1 | 2 }) {
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

function hasRepairableGrant(grant: AdminCheckInGrantItemDto) {
  return grant.grantStatus === 0 || grant.grantStatus === 2;
}

function renderRewardTagType(status?: null | number) {
  return (
    checkInRewardStatusOptions.find(item => item.value === status)?.color || 'info'
  );
}
</script>

<template>
  <Page auto-content-height>
    <div class="space-y-5">
      <el-card
        shadow="never"
        class="overflow-hidden rounded-3xl border-0 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.18),_transparent_32%),linear-gradient(135deg,#ffffff_0%,#fff7ed_42%,#eff6ff_100%)]"
      >
        <div class="flex flex-col gap-6 p-6 lg:flex-row lg:items-end lg:justify-between">
          <div class="max-w-3xl">
            <div class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">
              Check-In Console
            </div>
            <div class="mt-3 text-3xl font-semibold text-slate-900">
              签到计划与奖励补偿管理
            </div>
            <div class="mt-3 text-sm leading-6 text-slate-600">
              在同一页面里统一维护签到计划、版本规则和奖励补偿。计划详情、状态切换、发布动作和对账补偿
              都已经接到最新接口，方便运营在一个入口里闭环处理。
            </div>
          </div>

          <div class="grid min-w-[320px] grid-cols-2 gap-3">
            <div
              v-for="item in activeTabStats"
              :key="item.label"
              class="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm backdrop-blur"
              :class="`bg-gradient-to-br ${item.accent}`"
            >
              <div class="text-xs text-slate-500">{{ item.label }}</div>
              <div class="mt-3 text-2xl font-semibold" :class="item.tone">
                {{ item.value }}
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <el-tabs v-model="activeTab" class="check-in-tabs">
        <el-tab-pane label="计划管理" name="plans">
          <div class="mb-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.3fr_1fr]">
            <el-card shadow="never" class="rounded-3xl border-slate-200/80">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <div class="text-base font-semibold text-slate-900">计划管理视图</div>
                  <div class="mt-1 text-sm text-slate-500">
                    这里维护计划配置、版本演进和发布状态。关键配置变更后，服务端会自动切到新版本。
                  </div>
                </div>
                <el-tag type="primary">已接入全部计划接口</el-tag>
              </div>
            </el-card>
            <el-card shadow="never" class="rounded-3xl border-slate-200/80">
              <div class="text-sm font-semibold text-slate-900">运营提醒</div>
              <div class="mt-3 space-y-2 text-sm text-slate-500">
                <div>1. 发布动作会单独调用发布接口，避免和普通状态更新混淆。</div>
                <div>2. 时区字段当前跟随后端部署口径，页面中只展示不允许随意改动。</div>
              </div>
            </el-card>
          </div>

          <PlanGrid>
            <template #toolbar-actions>
              <el-button type="primary" @click="openPlanFormModal()">
                新增签到计划
              </el-button>
            </template>

            <template #planName="{ row }">
              <div class="min-w-0">
                <div
                  class="cursor-pointer truncate text-left text-sm font-semibold text-slate-900 transition hover:text-primary"
                  @click="openPlanDetail(row)"
                >
                  {{ row.planName }}
                </div>
                <div class="mt-1 truncate text-xs text-slate-500">
                  {{ row.planCode }}
                </div>
              </div>
            </template>

            <template #isEnabled="{ row }">
              <el-switch
                :active-value="true"
                :inactive-value="false"
                :loading="enableLoadingMap[row.id]"
                :model-value="row.isEnabled"
                @change="togglePlanEnable(row)"
              />
            </template>

            <template #baseRewardConfig="{ row }">
              <div class="flex min-h-10 items-center">
                <el-tag effect="light" round type="info">
                  {{ formatRewardSummary(row.baseRewardConfig) }}
                </el-tag>
              </div>
            </template>

            <template #pendingRewardCount="{ row }">
              <div class="flex items-center gap-2">
                <span class="font-medium text-slate-900">{{ row.pendingRewardCount }}</span>
                <el-tag
                  v-if="row.pendingRewardCount > 0"
                  effect="light"
                  round
                  type="danger"
                >
                  待处理
                </el-tag>
              </div>
            </template>

            <template #publishWindow="{ row }">
              <div class="space-y-1 text-xs leading-5 text-slate-500">
                <div>
                  开始：
                  {{
                    row.publishStartAt
                      ? formatUTC(row.publishStartAt, 'YYYY-MM-DD HH:mm:ss')
                      : '不限'
                  }}
                </div>
                <div>
                  结束：
                  {{
                    row.publishEndAt
                      ? formatUTC(row.publishEndAt, 'YYYY-MM-DD HH:mm:ss')
                      : '不限'
                  }}
                </div>
              </div>
            </template>

            <template #planActions="{ row }">
              <div class="flex flex-wrap items-center gap-2 py-1">
                <el-button link type="primary" @click="openPlanDetail(row)">
                  详情
                </el-button>
                <el-button link type="primary" @click="openPlanFormModal(row)">
                  编辑
                </el-button>
                <el-button
                  :disabled="row.status === 1 && row.isEnabled"
                  :loading="publishLoadingMap[row.id]"
                  link
                  type="success"
                  @click="publishPlan(row)"
                >
                  发布
                </el-button>
                <el-dropdown
                  trigger="click"
                  @command="(value: 0 | 1 | 2) => changePlanStatus(row, value)"
                >
                  <el-button :loading="statusLoadingMap[row.id]" link type="warning">
                    切换状态
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item :command="0" :disabled="row.status === 0">
                        设为草稿
                      </el-dropdown-item>
                      <el-dropdown-item :command="1" :disabled="row.status === 1">
                        设为已发布
                      </el-dropdown-item>
                      <el-dropdown-item :command="2" :disabled="row.status === 2">
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
          <div class="mb-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.3fr_1fr]">
            <el-card shadow="never" class="rounded-3xl border-slate-200/80">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <div class="text-base font-semibold text-slate-900">对账补偿视图</div>
                  <div class="mt-1 text-sm text-slate-500">
                    支持查看签到基础奖励与连续奖励的落账状态，并按记录或发放事实触发补偿。
                  </div>
                </div>
                <el-tag type="danger">已接入补偿接口</el-tag>
              </div>
            </el-card>
            <el-card shadow="never" class="rounded-3xl border-slate-200/80">
              <div class="text-sm font-semibold text-slate-900">补偿说明</div>
              <div class="mt-3 space-y-2 text-sm text-slate-500">
                <div>1. 基础奖励只对签到记录补偿，连续奖励按单条发放事实补偿。</div>
                <div>2. 连续奖励按钮已经按每条发放事实独立接线，不会误触发整行批量补发。</div>
              </div>
            </el-card>
          </div>

          <ReconciliationGrid>
            <template #signInfo="{ row }">
              <div class="space-y-1">
                <div class="font-medium text-slate-900">{{ row.signDate }}</div>
                <el-tag
                  :type="row.recordType === 1 ? 'success' : 'warning'"
                  effect="light"
                  round
                >
                  {{
                    checkInRecordTypeOptions.find(item => item.value === row.recordType)?.label
                  }}
                </el-tag>
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
                      checkInRewardStatusOptions.find(item => item.value === row.rewardStatus)?.label
                    }}
                  </el-tag>
                  <el-tag
                    v-if="row.rewardResultType"
                    effect="plain"
                    round
                    :type="
                      checkInRewardResultOptions.find(
                        item => item.value === row.rewardResultType,
                      )?.color || 'info'
                    "
                  >
                    {{
                      checkInRewardResultOptions.find(
                        item => item.value === row.rewardResultType,
                      )?.label
                    }}
                  </el-tag>
                </template>
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
                  <div class="flex flex-wrap items-center justify-between gap-2">
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
                            item => item.value === grant.grantStatus,
                          )?.label
                        }}
                      </el-tag>
                      <el-tag
                        v-if="grant.grantResultType"
                        effect="plain"
                        round
                        :type="
                          checkInRewardResultOptions.find(
                            item => item.value === grant.grantResultType,
                          )?.color || 'info'
                        "
                      >
                        {{
                          checkInRewardResultOptions.find(
                            item => item.value === grant.grantResultType,
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
                <el-text v-else class="text-xs text-slate-400">无需补偿</el-text>
              </div>
            </template>
          </ReconciliationGrid>
        </el-tab-pane>
      </el-tabs>
    </div>

    <PlanFormModal />
    <DetailModal
      :api="checkInPlanDetailApi"
      :cards="getDetailCards"
      class="!min-w-[960px]"
    />
  </Page>
</template>

<style scoped>
:deep(.check-in-tabs .el-tabs__header) {
  margin-bottom: 20px;
}

:deep(.check-in-tabs .el-tabs__item) {
  border-radius: 9999px;
  font-weight: 600;
  padding: 0 18px;
}
</style>
