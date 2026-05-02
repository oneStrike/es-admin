<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { AdminTaskReconciliationItemDto } from '#/api/types';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import { taskInstanceReconciliationPageApi } from '#/api/core';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import {
  taskRewardSettlementResultOptions,
  taskRewardSettlementStatusOptions,
} from '../model/options';
import {
  taskReconciliationColumns,
  taskReconciliationSearchFormSchema,
} from '../model/reconciliation';

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

const [Grid] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(taskReconciliationSearchFormSchema),
  gridOptions,
});
</script>

<template>
  <div class="es-full-height-pane">
    <Grid class="es-full-height-grid">
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
    </Grid>
  </div>
</template>
