<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { CheckInGrantItemDto, CheckInReconciliationRepairRequest } from '#/api/types';

import { reactive } from 'vue';

import { ElMessageBox } from 'element-plus';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  checkInReconciliationPageApi,
  checkInReconciliationRepairApi,
} from '#/api/core';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils';

import {
  checkInRecordTypeOptions,
  reconciliationColumns,
  reconciliationSearchFormSchema,
} from '../model/reconciliation';
import {
  formatLedgerIds,
  formatRewardSummary,
  getRewardResultMeta,
  getRewardSourceLabel,
  getRewardStatusMeta,
} from '../model/shared';

defineOptions({
  name: 'CheckInReconciliationPanel',
});

const baseRepairingMap = reactive<Record<number, boolean>>({});
const grantRepairingMap = reactive<Record<number, boolean>>({});

const reconciliationGridOptions: VxeGridProps<any> = {
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

async function repairRecordReward(row: any) {
  if (row.rewardSettlement?.settlementStatus === 1 || row.rewardSettlementId == null) {
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
  if (grant.rewardSettlement?.settlementStatus === 1) {
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

  try {
    await ElMessageBox.confirm(
      `确认补偿${targetLabel}吗？目标 ID：${targetId}`,
      '触发补偿',
      {
        confirmButtonText: '确认补偿',
        draggable: true,
        type: 'warning',
      },
    );
    return true;
  } catch {
    return false;
  }
}

function hasRepairableBaseReward(row: any) {
  return (
    row.rewardSettlement?.settlementStatus === 0 ||
    row.rewardSettlement?.settlementStatus === 2
  );
}

function hasRepairableGrant(grant: CheckInGrantItemDto) {
  return (
    grant.rewardSettlement?.settlementStatus === 0 ||
    grant.rewardSettlement?.settlementStatus === 2
  );
}
</script>

<template>
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
              checkInRecordTypeOptions.find((item) => item.value === row.recordType)
                ?.label
            }}
          </el-tag>
          <el-tag
            v-if="row.resolvedRewardSourceType"
            effect="plain"
            round
            type="info"
          >
            {{ getRewardSourceLabel(row.resolvedRewardSourceType) }}
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
          {{ getRewardSourceLabel(row.resolvedRewardSourceType) }}
        </el-tag>
        <el-text v-else class="text-xs text-slate-400">-</el-text>
      </div>
    </template>

    <template #baseRewardStatus="{ row }">
      <div class="flex min-h-12 flex-wrap items-center gap-2">
        <template v-if="row.rewardSettlementId == null">
          <el-tag effect="light" round type="info">无基础奖励</el-tag>
        </template>
        <template v-else>
          <el-tag
            :type="getRewardStatusMeta(row.rewardSettlement?.settlementStatus).color"
            effect="light"
            round
          >
            {{ getRewardStatusMeta(row.rewardSettlement?.settlementStatus).label }}
          </el-tag>
          <el-tag
            v-if="row.rewardSettlement?.settlementResultType"
            :type="getRewardResultMeta(row.rewardSettlement?.settlementResultType).color"
            effect="plain"
            round
          >
            {{ getRewardResultMeta(row.rewardSettlement?.settlementResultType).label }}
          </el-tag>
        </template>
      </div>
    </template>

    <template #resolvedRewardConfig="{ row }">
      <div class="flex min-h-10 items-center">
        <el-tag effect="light" round type="primary">
          {{
            row.rewardSettlementId == null
              ? '无基础奖励'
              : formatRewardSummary(row.resolvedRewardItems)
          }}
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
                :type="getRewardStatusMeta(grant.rewardSettlement?.settlementStatus).color"
                effect="light"
                round
              >
                {{ getRewardStatusMeta(grant.rewardSettlement?.settlementStatus).label }}
              </el-tag>
              <el-tag
                v-if="grant.rewardSettlement?.settlementResultType"
                :type="
                  getRewardResultMeta(grant.rewardSettlement?.settlementResultType)
                    .color
                "
                effect="plain"
                round
              >
                {{
                  getRewardResultMeta(grant.rewardSettlement?.settlementResultType)
                    .label
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
            <span>规则编码：{{ grant.ruleCode }}</span>
            <span>轮次ID：{{ grant.roundConfigId }}</span>
            <span>触发日：{{ grant.triggerSignDate }}</span>
            <span>
              账本：{{ formatLedgerIds(grant.rewardSettlement?.ledgerRecordIds) }}
            </span>
          </div>
          <div
            v-if="grant.rewardSettlement?.lastError"
            class="mt-2 rounded-xl bg-rose-50 px-3 py-2 text-xs text-rose-600"
          >
            {{ grant.rewardSettlement.lastError }}
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
</template>
