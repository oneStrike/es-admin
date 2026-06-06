<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { AdminTaskReconciliationItemDto } from '#/api/types';

import { ElMessageBox } from 'element-plus';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  taskInstanceReconciliationPageApi,
  taskInstanceRewardRetryApi,
  taskInstanceRewardRetryPendingBatchApi,
} from '#/api/core';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import {
  taskRewardSettlementResultOptions,
  taskRewardSettlementStatusOptions,
} from '../model/options';
import {
  taskReconciliationColumns,
  taskReconciliationSearchFormSchema,
} from '../model/reconciliation';

const retryingMap = reactive<Record<number, boolean>>({});
const batchRetrying = ref(false);

const gridOptions: VxeGridProps<AdminTaskReconciliationItemDto> = {
  columns: taskReconciliationColumns,
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const { dateRange, ...restFormValues } = formValues || {};
        const [startDate, endDate] = Array.isArray(dateRange) ? dateRange : [];

        return await taskInstanceReconciliationPageApi(
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
      },
    },
    sort: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(taskReconciliationSearchFormSchema),
  gridOptions,
  viewedRowOptions: {
    keyField: 'id',
    persist: 'task-reconciliation-viewed-rows',
  },
});

function hasRetryableTaskReward(row: AdminTaskReconciliationItemDto) {
  const settlementStatus = row.rewardSettlement?.settlementStatus;

  return (
    row.rewardApplicable === 1 &&
    row.status === 2 &&
    settlementStatus !== 1 &&
    settlementStatus !== 2
  );
}

function showTaskRewardRetryResult(result: {
  message?: string;
  succeeded: boolean;
}) {
  const message =
    result.message ||
    (result.succeeded ? '任务奖励补偿成功' : '任务奖励补偿未完成');

  if (result.succeeded) {
    useMessage.success(message);
    return;
  }

  useMessage.warning(message);
}

async function retryTaskReward(row: AdminTaskReconciliationItemDto) {
  if (!hasRetryableTaskReward(row)) return;

  const confirmed = await useConfirm({
    confirmText: '确认重试',
    content: `确认重试任务实例 #${row.id} 的奖励补偿？`,
    successMessage: false,
    title: '重试任务奖励补偿',
  });

  if (!confirmed) return;

  retryingMap[row.id] = true;
  try {
    const result = await taskInstanceRewardRetryApi({ id: row.id });
    if (result.succeeded) {
      gridApi.markRowAsViewed(row);
    }
    showTaskRewardRetryResult(result);
    await gridApi.reload();
  } finally {
    retryingMap[row.id] = false;
  }
}

async function retryPendingTaskRewards() {
  let inputValue: string;

  try {
    const result = await ElMessageBox.prompt(
      '批量重试会扫描任务模块待补偿实例，不受当前筛选影响。可选填写本次最多扫描数量，最大 500。',
      '批量重试任务奖励补偿',
      {
        cancelButtonText: '取消',
        confirmButtonText: '确认重试',
        draggable: true,
        inputPlaceholder: '留空表示使用后端默认扫描数',
        inputValidator(value) {
          if (!value) return true;
          const limit = Number(value);
          return Number.isInteger(limit) && limit > 0 && limit <= 500
            ? true
            : '扫描数量必须是 1-500 的整数';
        },
        type: 'warning',
      },
    );
    inputValue = String(result.value || '').trim();
  } catch {
    return;
  }

  batchRetrying.value = true;
  try {
    const limit = inputValue ? Number(inputValue) : undefined;
    const result = await taskInstanceRewardRetryPendingBatchApi(
      limit ? { limit } : {},
    );
    useMessage.success(
      `批量重试完成：扫描 ${result.scannedCount}，成功 ${result.succeededCount}，跳过 ${result.skippedCount}，失败 ${result.failedCount}`,
    );
    await gridApi.reload();
  } finally {
    batchRetrying.value = false;
  }
}
</script>

<template>
  <div class="es-full-height-pane">
    <Grid class="es-full-height-grid">
      <template #toolbar-actions>
        <el-button
          class="ml-2"
          :loading="batchRetrying"
          type="primary"
          @click="retryPendingTaskRewards"
        >
          批量重试待补偿（不受当前筛选影响）
        </el-button>
      </template>

      <template #settlementStatus="{ row }">
        <el-tag
          v-if="typeof row.rewardSettlement?.settlementStatus === 'number'"
          :type="
            taskRewardSettlementStatusOptions.find(
              (item) => item.value === row.rewardSettlement?.settlementStatus,
            )?.color || 'info'
          "
        >
          {{
            taskRewardSettlementStatusOptions.find(
              (item) => item.value === row.rewardSettlement?.settlementStatus,
            )?.label || '-'
          }}
        </el-tag>
        <span v-else>-</span>
      </template>

      <template #settlementResult="{ row }">
        <el-tag
          v-if="typeof row.rewardSettlement?.settlementResultType === 'number'"
          :type="
            taskRewardSettlementResultOptions.find(
              (item) =>
                item.value === row.rewardSettlement?.settlementResultType,
            )?.color || 'info'
          "
        >
          {{
            taskRewardSettlementResultOptions.find(
              (item) =>
                item.value === row.rewardSettlement?.settlementResultType,
            )?.label || '-'
          }}
        </el-tag>
        <span v-else>-</span>
      </template>

      <template #actions="{ row }">
        <el-button
          v-if="hasRetryableTaskReward(row)"
          link
          :loading="retryingMap[row.id]"
          type="primary"
          @click="retryTaskReward(row)"
        >
          重试
        </el-button>
        <span v-else>-</span>
      </template>
    </Grid>
  </div>
</template>
