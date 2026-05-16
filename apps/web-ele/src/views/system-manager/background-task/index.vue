<script setup lang="ts">
import type {
  BackgroundTaskCancelRequest,
  BackgroundTaskDetailRequest,
  BackgroundTaskDto,
  BackgroundTaskRetryRequest,
} from '#/api/types/backgroundTask';

import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import {
  backgroundTaskCancelApi,
  backgroundTaskDetailApi,
  backgroundTaskPageApi,
  backgroundTaskRetryApi,
} from '#/api/core';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions, formatUTC } from '#/utils';

import { createBackgroundTaskDetailRequestGuard } from './model/detail-request-guard';
import { buildBackgroundTaskPageRequest } from './model/page-request';
import {
  backgroundTaskSearchSchema,
  canCancelBackgroundTask,
  canRetryBackgroundTask,
  formatBackgroundTaskOperator,
  formatBackgroundTaskStatus,
  formatBackgroundTaskType,
  formatDiagnosticJson,
  getDiagnosticMessage,
  hasActiveBackgroundTasks,
  isActiveBackgroundTaskStatus,
  resolveBackgroundTaskProgress,
} from './model/shared';

defineOptions({
  name: 'BackgroundTaskManager',
});

interface LoadTaskOptions {
  currentPage?: number;
  silent?: boolean;
}

const route = useRoute();
const BACKGROUND_TASK_PAGE_POLL_INTERVAL_MS = 5000;
const PAGE_SIZE_OPTIONS = [15, 30, 45, 75, 100] as const;
const currentTask = ref<BackgroundTaskDto | null>(null);
const hasActivePageTasks = ref(false);
const isDetailOpen = ref(false);
const isDocumentVisible = ref(readDocumentVisible());
const listLoading = ref(false);
const taskList = ref<BackgroundTaskDto[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(15);
const searchValues = ref<Record<string, unknown>>({});
let pagePollTimer: number | undefined;
let isPagePolling = false;
let listRequestToken = 0;
const detailRequestGuard = createBackgroundTaskDetailRequestGuard();
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
const taskCardTimeFields: Array<{
  field: keyof BackgroundTaskDto;
  label: string;
}> = [
  { field: 'updatedAt', label: '更新' },
  { field: 'createdAt', label: '创建' },
  { field: 'startedAt', label: '开始' },
  { field: 'finishedAt', label: '完成' },
  { field: 'claimExpiresAt', label: 'Claim' },
];

const [SearchForm, searchFormApi] = useVbenForm(
  createSearchFormOptions(backgroundTaskSearchSchema, {
    handleReset: async () => {
      searchValues.value = {};
      await loadTasks({ currentPage: 1 });
    },
    handleSubmit: async (values) => {
      searchValues.value = normalizeSearchValues(values);
      await loadTasks({ currentPage: 1 });
    },
    resetButtonOptions: {
      content: '重置',
    },
    submitButtonOptions: {
      content: '查询',
    },
    showCollapseButton: false,
  }),
);

const [DetailModal, detailApi] = useVbenModal({
  footer: false,
  title: '后台任务详情',
  class: 'w-[1000px] !h-[86vh] !max-h-[86vh]',
  contentClass: 'min-h-0 !overflow-hidden p-4',
  onOpenChange: (isOpen) => {
    isDetailOpen.value = isOpen;
    if (!isOpen) {
      detailRequestGuard.invalidate();
      currentTask.value = null;
    }
  },
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
const hasCurrentTaskAlerts = computed(() => {
  const task = currentTask.value;
  if (!task) {
    return false;
  }

  return Boolean(
    (task.cancelRequestedAt && canCancelTask(task)) ||
    task.status === 7 ||
    currentErrorMessage.value ||
    currentRollbackErrorMessage.value,
  );
});
const currentTaskOverview = computed(() => {
  const task = currentTask.value;
  if (!task) {
    return [];
  }

  return [
    { label: '操作者', value: formatBackgroundTaskOperator(task) },
    { label: '处理 Worker', value: task.claimedBy || '未分配' },
    ...buildTaskReservationOverview(task),
    { label: '残留诊断', value: task.residue ? '有残留' : '无残留' },
    { label: '回滚错误', value: task.rollbackError ? '需处理' : '无' },
  ];
});

function normalizeSearchValues(values: unknown): Record<string, unknown> {
  return typeof values === 'object' && values !== null
    ? (values as Record<string, unknown>)
    : {};
}

async function loadTasks(options: LoadTaskOptions = {}) {
  if (options.silent && listLoading.value) {
    return;
  }

  const targetPage = options.currentPage ?? currentPage.value;
  const requestToken = ++listRequestToken;

  if (!options.silent) {
    listLoading.value = true;
  }

  try {
    const response = await backgroundTaskPageApi(
      buildBackgroundTaskPageRequest({
        currentPage: targetPage,
        filters: searchValues.value,
        pageSize: pageSize.value,
      }),
    );

    if (requestToken !== listRequestToken) {
      return;
    }

    const nextList = response.list ?? [];
    taskList.value = nextList;
    total.value =
      typeof response.total === 'number' ? response.total : nextList.length;
    currentPage.value =
      typeof response.pageIndex === 'number' ? response.pageIndex : targetPage;
    pageSize.value =
      typeof response.pageSize === 'number'
        ? response.pageSize
        : pageSize.value;
    hasActivePageTasks.value = hasActiveBackgroundTasks(nextList);
  } finally {
    if (requestToken === listRequestToken && !options.silent) {
      listLoading.value = false;
    }
  }
}

async function reloadTasks(options: Pick<LoadTaskOptions, 'silent'> = {}) {
  await loadTasks({ currentPage: currentPage.value, silent: options.silent });
}

async function handlePageSizeChange(nextPageSize: number) {
  pageSize.value = nextPageSize;
  await loadTasks({ currentPage: 1 });
}

async function handleCurrentPageChange(nextPage: number) {
  await loadTasks({ currentPage: nextPage });
}

function canCancelTask(task: BackgroundTaskDto) {
  return canCancelBackgroundTask(task);
}

function canRetryTask(task: BackgroundTaskDto) {
  return canRetryBackgroundTask(task);
}

function buildTaskReservationOverview(task: BackgroundTaskDto) {
  return [
    { label: '去重键', value: getTaskReservationValue(task, 'dedupeKey') },
    { label: '串行键', value: getTaskReservationValue(task, 'serialKey') },
  ].filter((item) => item.value);
}

function getTaskReservationValue(
  task: BackgroundTaskDto,
  field: 'dedupeKey' | 'serialKey',
) {
  const value = (task as Record<string, unknown>)[field];
  return typeof value === 'string' && value ? value : '';
}

function canApplyDetailResponse(token: number, taskId: string) {
  return detailRequestGuard.canApply(token, taskId, currentTask.value?.taskId);
}

async function openDetail(row: BackgroundTaskDto) {
  const taskId = row.taskId;
  const requestToken = detailRequestGuard.createToken();
  currentTask.value = row;
  detailApi.open();

  const detail = await backgroundTaskDetailApi({
    taskId,
  } satisfies BackgroundTaskDetailRequest);

  if (canApplyDetailResponse(requestToken, taskId)) {
    currentTask.value = detail;
  }
}

async function refreshCurrentTask(taskId: string) {
  const requestToken = detailRequestGuard.createToken();
  const detail = await backgroundTaskDetailApi({
    taskId,
  } satisfies BackgroundTaskDetailRequest);

  if (canApplyDetailResponse(requestToken, taskId)) {
    currentTask.value = detail;
  }
}

async function pollVisibleBackgroundTasks() {
  if (!isDocumentVisible.value || isPagePolling) {
    return;
  }

  const detailTaskId =
    isDetailOpen.value &&
    currentTask.value &&
    isActiveBackgroundTaskStatus(currentTask.value.status)
      ? currentTask.value.taskId
      : '';

  if (!hasActivePageTasks.value && !detailTaskId) {
    return;
  }

  isPagePolling = true;
  try {
    await Promise.all([
      reloadTasks({ silent: true }),
      detailTaskId ? refreshCurrentTask(detailTaskId) : Promise.resolve(),
    ]);
  } catch {
    // Background refresh should not interrupt the operator's current page.
  } finally {
    isPagePolling = false;
  }
}

async function cancelTask(row: BackgroundTaskDto) {
  detailRequestGuard.invalidate();
  const updated = await backgroundTaskCancelApi({
    taskId: row.taskId,
  } satisfies BackgroundTaskCancelRequest);

  detailRequestGuard.invalidate();
  if (currentTask.value?.taskId === row.taskId) {
    currentTask.value = updated;
  }
  if (isDetailOpen.value && currentTask.value?.taskId === row.taskId) {
    try {
      await refreshCurrentTask(row.taskId);
    } catch {
      // Keep the mutation response visible when the follow-up detail refresh fails.
    }
  }
  useMessage.success('后台任务已请求取消');
  await reloadTasks();
}

async function retryTask(row: BackgroundTaskDto) {
  detailRequestGuard.invalidate();
  const updated = await backgroundTaskRetryApi({
    taskId: row.taskId,
  } satisfies BackgroundTaskRetryRequest);

  detailRequestGuard.invalidate();
  if (currentTask.value?.taskId === row.taskId) {
    currentTask.value = updated;
  }
  if (isDetailOpen.value && currentTask.value?.taskId === row.taskId) {
    try {
      await refreshCurrentTask(row.taskId);
    } catch {
      // Keep the mutation response visible when the follow-up detail refresh fails.
    }
  }
  useMessage.success('后台任务已提交重试');
  await reloadTasks();
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

function readDocumentVisible() {
  return typeof document === 'undefined'
    ? true
    : document.visibilityState === 'visible';
}

function syncDocumentVisibility() {
  isDocumentVisible.value = readDocumentVisible();
  if (isDocumentVisible.value) {
    void pollVisibleBackgroundTasks();
  }
}

function getTaskStatus(task: BackgroundTaskDto) {
  return formatBackgroundTaskStatus(task.status);
}

function getTaskProgress(task: BackgroundTaskDto) {
  return resolveBackgroundTaskProgress(task);
}

function getTaskTypeLabel(task: BackgroundTaskDto) {
  return formatBackgroundTaskType(task.taskType);
}

function getTaskWorker(task: BackgroundTaskDto) {
  return task.claimedBy || '未分配';
}

onMounted(async () => {
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', syncDocumentVisibility);
  }
  if (typeof window !== 'undefined') {
    pagePollTimer = window.setInterval(
      pollVisibleBackgroundTasks,
      BACKGROUND_TASK_PAGE_POLL_INTERVAL_MS,
    );
  }

  const taskId = getInitialTaskId();
  if (taskId) {
    await searchFormApi.setValues({ taskId });
  }

  searchValues.value = normalizeSearchValues(await searchFormApi.getValues());
  await loadTasks();
});

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('visibilitychange', syncDocumentVisibility);
  }
  if (pagePollTimer) {
    window.clearInterval(pagePollTimer);
  }
});
</script>

<template>
  <Page auto-content-height>
    <div class="flex h-full min-h-0 flex-col gap-4 overflow-hidden">
      <el-card shadow="never">
        <SearchForm :loading="listLoading" />
      </el-card>

      <el-card
        v-loading="listLoading"
        shadow="never"
        body-class="min-h-0 flex-1 overflow-hidden"
        class="flex min-h-0 flex-1 flex-col"
      >
        <template #header>
          <div class="flex flex-wrap items-center justify-between gap-4">
            <span>任务列表</span>
            <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              background
              :disabled="listLoading"
              layout="total, sizes, prev, pager, next, jumper"
              :page-sizes="[...PAGE_SIZE_OPTIONS]"
              size="small"
              :total="total"
              @current-change="handleCurrentPageChange"
              @size-change="handlePageSizeChange"
            />
          </div>
        </template>

        <el-empty
          v-if="!listLoading && taskList.length === 0"
          description="暂无后台任务"
        />
        <el-scrollbar v-else>
          <el-space :size="16" class="w-full" direction="vertical" fill>
            <el-card v-for="task in taskList" :key="task.taskId" shadow="hover">
              <template #header>
                <div class="flex flex-wrap items-center justify-between gap-4">
                  <el-space :size="16" wrap>
                    <el-tag :type="getTaskStatus(task).type">
                      {{ getTaskStatus(task).label }}
                    </el-tag>
                    <el-tag v-if="task.cancelRequestedAt" type="danger">
                      已请求取消
                    </el-tag>
                    <span class="font-medium">
                      {{ getTaskTypeLabel(task) }}
                    </span>
                    <el-text class="font-mono" truncated type="info">
                      {{ task.taskId }}
                    </el-text>
                  </el-space>
                  <el-space :size="16">
                    <el-button link type="primary" @click="openDetail(task)">
                      详情
                    </el-button>
                    <el-popconfirm
                      cancel-button-text="取消"
                      confirm-button-text="确认"
                      confirm-button-type="danger"
                      title="确认请求取消当前后台任务？"
                      @confirm="cancelTask(task)"
                    >
                      <template #reference>
                        <el-button
                          link
                          type="danger"
                          :disabled="!canCancelTask(task)"
                        >
                          取消
                        </el-button>
                      </template>
                    </el-popconfirm>
                    <el-popconfirm
                      cancel-button-text="取消"
                      confirm-button-text="确认"
                      title="确认重试当前后台任务？"
                      @confirm="retryTask(task)"
                    >
                      <template #reference>
                        <el-button
                          link
                          type="primary"
                          :disabled="!canRetryTask(task)"
                        >
                          重试
                        </el-button>
                      </template>
                    </el-popconfirm>
                  </el-space>
                </div>
              </template>

              <el-space
                :size="16"
                class="mb-4 w-full"
                direction="vertical"
                fill
              >
                <div class="flex items-center justify-between gap-4">
                  <el-text truncated type="info">
                    {{ getTaskProgress(task).message }}
                  </el-text>
                  <el-text class="font-mono">
                    {{ getTaskProgress(task).percent }}%
                  </el-text>
                </div>
                <el-progress
                  :percentage="getTaskProgress(task).percent"
                  :show-text="false"
                  :status="getTaskProgress(task).status"
                  :striped="getTaskProgress(task).striped"
                  :striped-flow="getTaskProgress(task).striped"
                />
              </el-space>

              <el-descriptions :column="4" border size="small">
                <el-descriptions-item label="操作者">
                  {{ formatBackgroundTaskOperator(task) }}
                </el-descriptions-item>
                <el-descriptions-item label="Worker">
                  {{ getTaskWorker(task) }}
                </el-descriptions-item>
                <el-descriptions-item label="重试">
                  {{ task.retryCount }} / {{ task.maxRetries }}
                </el-descriptions-item>
                <el-descriptions-item
                  v-for="item in taskCardTimeFields"
                  :key="item.field"
                  :label="item.label"
                >
                  {{ formatTaskTime(task[item.field]) }}
                </el-descriptions-item>
              </el-descriptions>
            </el-card>
          </el-space>
        </el-scrollbar>
      </el-card>
    </div>

    <DetailModal>
      <div
        v-if="currentTask && currentTaskProgress"
        class="flex h-full min-h-0 flex-col overflow-hidden"
      >
        <section class="shrink-0 border-b border-border pb-4">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div class="min-w-0 flex-1">
              <div class="mb-4 flex flex-wrap items-center gap-4">
                <el-tag :type="currentTaskStatus.type">
                  {{ currentTaskStatus.label }}
                </el-tag>
                <el-tag v-if="currentTask.cancelRequestedAt" type="danger">
                  已请求取消
                </el-tag>
                <el-tag type="info">
                  重试 {{ currentTask.retryCount }} /
                  {{ currentTask.maxRetries }}
                </el-tag>
              </div>
              <div class="truncate text-base font-semibold">
                {{ currentTaskTypeLabel }}
              </div>
              <div
                class="mt-4 truncate font-mono text-xs text-muted-foreground"
              >
                {{ currentTask.taskId }}
              </div>
            </div>
            <div class="flex shrink-0 items-center gap-4">
              <el-popconfirm
                cancel-button-text="取消"
                confirm-button-text="确认"
                confirm-button-type="danger"
                title="确认请求取消当前后台任务？"
                @confirm="cancelCurrentTask"
              >
                <template #reference>
                  <el-button
                    type="danger"
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
            <div class="mb-4 flex items-center justify-between gap-4">
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

        <div v-if="hasCurrentTaskAlerts" class="shrink-0 space-y-4 pt-4">
          <el-alert
            v-if="currentTask.cancelRequestedAt && canCancelTask(currentTask)"
            :closable="false"
            show-icon
            title="已请求取消，等待任务响应。"
            type="error"
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

        <div class="grid shrink-0 grid-cols-2 gap-4 pt-4 lg:grid-cols-4">
          <div
            v-for="item in currentTaskOverview"
            :key="item.label"
            class="rounded-md border border-border bg-muted/30 p-4"
          >
            <div class="text-xs text-muted-foreground">{{ item.label }}</div>
            <div class="mt-4 truncate text-sm font-medium">
              {{ item.value }}
            </div>
          </div>
        </div>

        <div class="grid min-h-0 flex-1 grid-cols-1 gap-4 pt-4 lg:grid-cols-5">
          <section
            class="min-h-0 rounded-md border border-border p-4 lg:col-span-2"
          >
            <div class="mb-4 flex items-center justify-between">
              <span class="text-base font-medium">生命周期</span>
            </div>
            <div class="space-y-4 text-sm">
              <div v-for="item in taskTimelineFields" :key="item.field">
                <div class="flex items-center justify-between gap-4">
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
            class="flex min-h-0 flex-col overflow-hidden rounded-md border border-border p-4 lg:col-span-3"
          >
            <div class="mb-4 flex items-center justify-between gap-4">
              <span class="text-base font-medium">诊断数据</span>
              <span class="text-sm text-muted-foreground">
                展开对应字段查看完整内容
              </span>
            </div>
            <el-collapse class="flex-1 overflow-auto">
              <el-collapse-item
                v-for="item in taskJsonFields"
                :key="item.field"
                :name="item.field"
                :title="item.label"
              >
                <div class="rounded bg-muted p-4">
                  <pre
                    class="max-h-[320px] overflow-auto whitespace-pre-wrap break-all text-xs leading-5"
                    v-text="formatDiagnosticJson(currentTask[item.field])"
                  ></pre>
                </div>
              </el-collapse-item>
            </el-collapse>
          </section>
        </div>
      </div>
    </DetailModal>
  </Page>
</template>
