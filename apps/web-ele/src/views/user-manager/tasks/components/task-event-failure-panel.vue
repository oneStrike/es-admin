<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { TaskEventFailurePageItemDto } from '#/api/types';

import { VbenTableAction } from '@vben/common-ui';

import { ElMessageBox } from 'element-plus';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  taskEventFailurePageApi,
  taskEventFailureRetryApi,
  taskEventFailureRetryPendingBatchApi,
} from '#/api/core';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import {
  isRetryableTaskEventFailure,
  taskEventFailureColumns,
  taskEventFailureSearchFormSchema,
} from '../model/event-failure';

const retryingMap = reactive<Record<number, boolean>>({});
const batchRetrying = ref(false);

const gridOptions: VxeGridProps<TaskEventFailurePageItemDto> = {
  columns: taskEventFailureColumns,
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) =>
        await taskEventFailurePageApi(
          formatQuery({
            page,
            formValues,
            sorts,
          }),
        ),
    },
    sort: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(taskEventFailureSearchFormSchema),
  gridOptions,
  viewedRowOptions: {
    keyField: 'id',
    persist: 'task-event-failure-viewed-rows',
  },
});

async function retryFailure(row: TaskEventFailurePageItemDto) {
  if (!isRetryableTaskEventFailure(row)) return;

  const confirmed = await useConfirm({
    confirmText: '确认重试',
    content: `确认重试失败事实 #${row.id}？`,
    successMessage: false,
    title: '重试任务事件消费',
  });
  if (!confirmed) return;

  retryingMap[row.id] = true;
  try {
    const result = await taskEventFailureRetryApi({ id: row.id });
    if (result.status === 3) {
      gridApi.markRowAsViewed(row);
      useMessage.success(result.message);
    } else {
      useMessage.warning(result.message);
    }
    await gridApi.reload();
  } finally {
    retryingMap[row.id] = false;
  }
}

async function retryPendingFailures() {
  let inputValue: string;

  try {
    const result = await ElMessageBox.prompt(
      '批量重试会扫描所有待重试任务事件失败事实，不受当前筛选影响。可选填写本次最多扫描数量，最大 500。',
      '批量重试任务事件消费',
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
    const result = await taskEventFailureRetryPendingBatchApi(
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

function getActions(row: TaskEventFailurePageItemDto): ActionItem[] {
  return [
    {
      disabled: !isRetryableTaskEventFailure(row),
      key: 'retry',
      loading: retryingMap[row.id],
      onClick: () => retryFailure(row),
      text: '重试',
    },
  ];
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
          @click="retryPendingFailures"
        >
          批量重试待处理（不受当前筛选影响）
        </el-button>
      </template>

      <template #actions="{ row }">
        <VbenTableAction align="center" :actions="getActions(row)" />
      </template>
    </Grid>
  </div>
</template>
