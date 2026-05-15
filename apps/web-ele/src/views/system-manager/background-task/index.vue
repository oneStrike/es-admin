<script setup lang="ts">
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  BackgroundTaskCancelRequest,
  BackgroundTaskDetailRequest,
  BackgroundTaskDto,
  BackgroundTaskPageRequest,
  BackgroundTaskRetryRequest,
} from '#/api/types/backgroundTask';

import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  backgroundTaskCancelApi,
  backgroundTaskDetailApi,
  backgroundTaskPageApi,
  backgroundTaskRetryApi,
} from '#/api/core';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions, formatUTC } from '#/utils';

import {
  backgroundTaskColumns,
  backgroundTaskSearchSchema,
  canCancelBackgroundTask,
  canRetryBackgroundTask,
  formatBackgroundTaskOperator,
  formatBackgroundTaskStatus,
  formatBackgroundTaskType,
  formatDiagnosticJson,
  getDiagnosticMessage,
  resolveBackgroundTaskProgress,
} from './model/shared';

defineOptions({
  name: 'BackgroundTaskManager',
});

const route = useRoute();
const currentTask = ref<BackgroundTaskDto | null>(null);
const taskJsonFields: Array<{
  field: keyof BackgroundTaskDto;
  label: string;
}> = [
  { field: 'payload', label: '原始负载' },
  { field: 'progress', label: '原始进度' },
  { field: 'result', label: '原始结果' },
  { field: 'error', label: '原始错误' },
  { field: 'residue', label: '残留诊断' },
  { field: 'rollbackError', label: '回滚诊断' },
];
const taskTimelineFields: Array<{
  field: keyof BackgroundTaskDto;
  label: string;
}> = [
  { field: 'createdAt', label: '创建' },
  { field: 'startedAt', label: '开始处理' },
  { field: 'finalizingAt', label: '最终写入' },
  { field: 'cancelRequestedAt', label: '请求取消' },
  { field: 'finishedAt', label: '完成' },
  { field: 'updatedAt', label: '最近更新' },
  { field: 'claimExpiresAt', label: 'Claim 过期' },
];

function buildBackgroundTaskPageRequest(
  formValues: Record<string, unknown>,
): Omit<BackgroundTaskPageRequest, 'pageIndex' | 'pageSize'> {
  const dateRange = Array.isArray(formValues.dateRange)
    ? formValues.dateRange
    : [];

  return {
    endDate: typeof dateRange[1] === 'string' ? dateRange[1] : undefined,
    startDate: typeof dateRange[0] === 'string' ? dateRange[0] : undefined,
    status:
      typeof formValues.status === 'number' ? formValues.status : undefined,
    taskId:
      typeof formValues.taskId === 'string' && formValues.taskId.trim()
        ? formValues.taskId.trim()
        : undefined,
    taskType:
      typeof formValues.taskType === 'string' && formValues.taskType.trim()
        ? formValues.taskType.trim()
        : undefined,
  };
}

const gridOptions: VxeGridProps<BackgroundTaskDto> = {
  columns: backgroundTaskColumns,
  height: 'auto',
  proxyConfig: {
    autoLoad: false,
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await backgroundTaskPageApi(
          formatQuery({
            page,
            sorts,
            formValues: buildBackgroundTaskPageRequest(formValues ?? {}),
          }) satisfies BackgroundTaskPageRequest,
        );
      },
    },
    sort: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(backgroundTaskSearchSchema),
  gridOptions,
});

const [DetailModal, detailApi] = useVbenModal({
  footer: false,
  title: '后台任务详情',
  class: 'w-[1000px] h-[800px]',
});

const currentTaskProgress = computed(() =>
  currentTask.value ? resolveBackgroundTaskProgress(currentTask.value) : null,
);
const currentTaskStatus = computed(() =>
  currentTask.value
    ? formatBackgroundTaskStatus(currentTask.value.status)
    : formatBackgroundTaskStatus(null),
);
const currentTaskTypeLabel = computed(() =>
  currentTask.value
    ? formatBackgroundTaskType(currentTask.value.taskType)
    : '-',
);
const currentErrorMessage = computed(() =>
  currentTask.value ? getDiagnosticMessage(currentTask.value.error) : '',
);
const currentRollbackErrorMessage = computed(() =>
  currentTask.value
    ? getDiagnosticMessage(currentTask.value.rollbackError)
    : '',
);
const currentTaskOverview = computed(() => {
  const task = currentTask.value;
  if (!task) {
    return [];
  }

  return [
    { label: '操作者', value: formatBackgroundTaskOperator(task) },
    { label: '重试次数', value: `${task.retryCount} / ${task.maxRetries}` },
    { label: '处理 Worker', value: task.claimedBy || '未分配' },
    { label: '残留诊断', value: task.residue ? '有残留' : '无残留' },
    { label: '回滚错误', value: task.rollbackError ? '需处理' : '无' },
  ];
});

function canCancelTask(task: BackgroundTaskDto) {
  return canCancelBackgroundTask(task);
}

function canRetryTask(task: BackgroundTaskDto) {
  return canRetryBackgroundTask(task);
}

async function openDetail(row: BackgroundTaskDto) {
  currentTask.value = await backgroundTaskDetailApi({
    taskId: row.taskId,
  } satisfies BackgroundTaskDetailRequest);
  detailApi.open();
}

async function cancelTask(row: BackgroundTaskDto) {
  currentTask.value = await backgroundTaskCancelApi({
    taskId: row.taskId,
  } satisfies BackgroundTaskCancelRequest);
  useMessage.success('后台任务已请求取消');
  await gridApi.reload();
}

async function retryTask(row: BackgroundTaskDto) {
  currentTask.value = await backgroundTaskRetryApi({
    taskId: row.taskId,
  } satisfies BackgroundTaskRetryRequest);
  useMessage.success('后台任务已提交重试');
  await gridApi.reload();
}

async function cancelCurrentTask() {
  if (currentTask.value) {
    await cancelTask(currentTask.value);
  }
}

async function retryCurrentTask() {
  if (currentTask.value) {
    await retryTask(currentTask.value);
  }
}

function formatTaskTime(value: unknown) {
  return typeof value === 'string' && value
    ? formatUTC(value, 'YYYY-MM-DD HH:mm:ss') || '-'
    : '-';
}

function getInitialTaskId() {
  const rawTaskId = route.query.taskId;
  const taskId = Array.isArray(rawTaskId) ? rawTaskId[0] : rawTaskId;
  return typeof taskId === 'string' ? taskId.trim() : '';
}

onMounted(async () => {
  const taskId = getInitialTaskId();
  if (taskId) {
    await gridApi.formApi.setValues({ taskId });
  }

  await gridApi.reload();
});
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #progress="{ row }">
        <div class="my-1">
          <el-progress
            :percentage="resolveBackgroundTaskProgress(row).percent"
            :status="resolveBackgroundTaskProgress(row).status"
            :striped="resolveBackgroundTaskProgress(row).striped"
            :striped-flow="resolveBackgroundTaskProgress(row).striped"
            :stroke-width="8"
            class="w-full"
          />
        </div>
      </template>

      <template #actions="{ row }">
        <div class="my-1 flex items-center justify-center gap-1">
          <el-button link type="primary" @click="openDetail(row)">
            详情
          </el-button>
          <el-divider direction="vertical" />
          <el-popconfirm
            cancel-button-text="取消"
            confirm-button-text="确认"
            title="确认请求取消当前后台任务？"
            @confirm="cancelTask(row)"
          >
            <template #reference>
              <el-button link type="warning" :disabled="!canCancelTask(row)">
                取消
              </el-button>
            </template>
          </el-popconfirm>
          <el-divider direction="vertical" />
          <el-popconfirm
            cancel-button-text="取消"
            confirm-button-text="确认"
            title="确认重试当前后台任务？"
            @confirm="retryTask(row)"
          >
            <template #reference>
              <el-button link type="primary" :disabled="!canRetryTask(row)">
                重试
              </el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </Grid>

    <DetailModal>
      <div
        v-if="currentTask && currentTaskProgress"
        class="flex h-full min-h-0 flex-col overflow-hidden"
      >
        <section class="shrink-0 border-b border-border px-1 pb-4">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div class="min-w-0 flex-1">
              <div class="mb-2 flex flex-wrap items-center gap-2">
                <el-tag :type="currentTaskStatus.type">
                  {{ currentTaskStatus.label }}
                </el-tag>
                <el-tag v-if="currentTask.cancelRequestedAt" type="warning">
                  已请求取消
                </el-tag>
                <span
                  class="rounded border border-border px-2 py-0.5 text-xs text-muted-foreground"
                >
                  重试 {{ currentTask.retryCount }} /
                  {{ currentTask.maxRetries }}
                </span>
              </div>
              <div class="truncate text-base font-semibold">
                {{ currentTaskTypeLabel }}
              </div>
              <div
                class="mt-1 truncate font-mono text-xs text-muted-foreground"
              >
                {{ currentTask.taskId }}
              </div>
            </div>
            <div class="flex shrink-0 items-center gap-2">
              <el-popconfirm
                cancel-button-text="取消"
                confirm-button-text="确认"
                title="确认请求取消当前后台任务？"
                @confirm="cancelCurrentTask"
              >
                <template #reference>
                  <el-button
                    type="warning"
                    :disabled="!canCancelTask(currentTask)"
                  >
                    请求取消
                  </el-button>
                </template>
              </el-popconfirm>
              <el-popconfirm
                cancel-button-text="取消"
                confirm-button-text="确认"
                title="确认重试当前后台任务？"
                @confirm="retryCurrentTask"
              >
                <template #reference>
                  <el-button
                    type="primary"
                    :disabled="!canRetryTask(currentTask)"
                  >
                    重试
                  </el-button>
                </template>
              </el-popconfirm>
            </div>
          </div>

          <div class="mt-4">
            <div class="mb-2 flex items-center justify-between gap-3">
              <span class="truncate text-sm text-muted-foreground">
                {{ currentTaskProgress.message }}
              </span>
              <span class="shrink-0 font-mono text-sm">
                {{ currentTaskProgress.percent }}%
              </span>
            </div>
            <el-progress
              :percentage="currentTaskProgress.percent"
              :show-text="false"
              :status="currentTaskProgress.status"
              :striped="currentTaskProgress.striped"
              :striped-flow="currentTaskProgress.striped"
              :stroke-width="10"
            />
          </div>
        </section>

        <div class="shrink-0 space-y-2 pt-4">
          <el-alert
            v-if="currentTask.cancelRequestedAt && canCancelTask(currentTask)"
            :closable="false"
            show-icon
            title="已请求取消，等待任务响应。"
            type="warning"
          />
          <el-alert
            v-if="currentTask.status === 7"
            :closable="false"
            show-icon
            title="任务回滚失败，需要先完成残留清理或定位回滚错误后再处理重试。"
            type="error"
          />
          <el-alert
            v-if="currentErrorMessage"
            :closable="false"
            :description="currentErrorMessage"
            show-icon
            title="错误信息"
            type="error"
          />
          <el-alert
            v-if="currentRollbackErrorMessage"
            :closable="false"
            :description="currentRollbackErrorMessage"
            show-icon
            title="回滚错误"
            type="error"
          />
        </div>

        <div class="grid shrink-0 grid-cols-2 gap-3 pt-4 lg:grid-cols-4">
          <div
            v-for="item in currentTaskOverview"
            :key="item.label"
            class="rounded-md border border-border bg-muted/30 p-3"
          >
            <div class="text-xs text-muted-foreground">{{ item.label }}</div>
            <div class="mt-1 truncate text-sm font-medium">
              {{ item.value }}
            </div>
          </div>
        </div>

        <div class="grid min-h-0 flex-1 grid-cols-1 gap-4 pt-4 lg:grid-cols-5">
          <section
            class="min-h-0 rounded-md border border-border p-4 lg:col-span-2"
          >
            <div class="mb-3 flex items-center justify-between">
              <span class="text-base font-medium">生命周期</span>
            </div>
            <div class="space-y-3 text-sm">
              <div v-for="item in taskTimelineFields" :key="item.field">
                <div class="flex items-center justify-between gap-3">
                  <span class="shrink-0">
                    {{ item.label }}
                  </span>
                  <span class="min-w-0 truncate">
                    {{ formatTaskTime(currentTask[item.field]) }}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section
            class="flex flex-col min-h-0 overflow-hidden rounded-md border p-4 lg:col-span-3"
          >
            <div class="mb-3 flex items-center justify-between gap-3">
              <span class="text-base font-medium">诊断数据</span>
              <span class="text-sm text-muted-foreground">
                展开对应字段查看完整内容
              </span>
            </div>
            <el-collapse class="overflow-auto flex-1">
              <el-collapse-item
                v-for="item in taskJsonFields"
                :key="item.field"
                :name="item.field"
                :title="item.label"
              >
                <div class="bg-muted px-3 rounded">
                  <pre
                    class="max-h-[320px] overflow-auto whitespace-pre-wrap break-alltext-xs leading-5"
                  >
                  {{ formatDiagnosticJson(currentTask[item.field]) }}
                  </pre>
                </div>
              </el-collapse-item>
            </el-collapse>
          </section>
        </div>
      </div>
    </DetailModal>
  </Page>
</template>
