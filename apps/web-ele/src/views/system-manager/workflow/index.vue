<script setup lang="ts">
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  ContentImportItemDto,
  WorkflowJobDetailDto,
  WorkflowJobDto,
} from '#/api/types/workflow';

import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';
import { RotateCw } from '@vben/icons';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  workflowArchiveApi,
  workflowCancelApi,
  workflowDetailApi,
  workflowExpireApi,
  workflowItemPageApi,
  workflowPageApi,
  workflowRetryItemsApi,
} from '#/api/core';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions, formatUTC } from '#/utils';

import {
  buildWorkflowItemPageRequest,
  buildWorkflowPageRequest,
  canArchiveWorkflow,
  canCancelWorkflow,
  canExpireWorkflow,
  canRetryWorkflowItems,
  createWorkflowImageProgressActiveState,
  formatWorkflowAttemptStatus,
  formatWorkflowItemImageProgress,
  formatWorkflowItemRetrySummary,
  formatWorkflowJobProgress,
  formatWorkflowJobStatus,
  formatWorkflowOperator,
  formatWorkflowType,
  getWorkflowItemCheckboxDisabledReason,
  workflowColumns,
  workflowItemColumns,
  workflowItemSearchSchema,
  workflowSearchSchema,
} from './model/shared';

defineOptions({
  name: 'WorkflowManager',
});

const route = useRoute();
const currentJob = ref<null | WorkflowJobDetailDto>(null);
const detailLoading = ref(false);
const recordJob = ref<null | WorkflowJobDetailDto>(null);
const recordLoading = ref(false);
const retrying = ref(false);
const selectedItems = ref<ContentImportItemDto[]>([]);
let activeDetailJobId = '';
let detailSessionId = 0;

const canRetrySelected = computed(() =>
  canRetryWorkflowItems(currentJob.value, selectedItems.value),
);

const gridOptions: VxeGridProps<WorkflowJobDto> = {
  columns: workflowColumns,
  height: 'auto',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await workflowPageApi(
          buildWorkflowPageRequest({
            currentPage: page.currentPage,
            filters: formValues,
            pageSize: page.pageSize,
            sorts,
          }),
        );
      },
    },
    sort: true,
  },
};

const itemGridOptions: VxeGridProps<ContentImportItemDto> = {
  checkboxConfig: {
    checkMethod: ({ row }) => !getWorkflowItemCheckboxDisabledReason(row),
    highlight: true,
  },
  columns: workflowItemColumns,
  height: 'auto',
  pagerConfig: {
    pageSize: 15,
    pageSizes: [15, 30, 45, 75, 100],
  },
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const jobId = currentJob.value?.jobId;
        if (!jobId) {
          return { list: [], total: 0 };
        }
        return await workflowItemPageApi(
          buildWorkflowItemPageRequest({
            currentPage: page.currentPage,
            filters: formValues,
            jobId,
            pageSize: page.pageSize,
            sorts,
          }),
        );
      },
    },
    sort: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(workflowSearchSchema),
  gridOptions,
});

const [ItemGrid, itemGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(workflowItemSearchSchema, {
    actionLayout: 'inline',
    actionPosition: 'right',
    actionWrapperClass:
      'workflow-detail__filter-actions ml-auto shrink-0 !pb-0',
    layout: 'inline',
    showCollapseButton: false,
    wrapperClass: 'workflow-detail__filter-row flex-nowrap items-center gap-3',
  }),
  gridEvents: {
    checkboxAll: handleItemSelectionChange,
    checkboxChange: handleItemSelectionChange,
  },
  gridOptions: itemGridOptions,
});

const [DetailModal, detailApi] = useVbenModal({
  footer: false,
  title: '任务详情',
  class: 'w-[1200px] !h-[86vh] !max-h-[86vh]',
  contentClass: 'min-h-0 !overflow-hidden p-4',
  onOpenChange: (isOpen) => {
    if (!isOpen) {
      closeDetailSession();
    }
  },
});

const [RecordModal, recordApi] = useVbenModal({
  footer: false,
  title: '处理记录',
  class: 'w-[900px] !h-[76vh] !max-h-[76vh]',
  contentClass: 'min-h-0 !overflow-hidden p-4',
  onOpenChange: (isOpen) => {
    if (!isOpen) {
      recordJob.value = null;
    }
  },
});

onMounted(async () => {
  const queryJobId = getInitialJobId();
  if (!queryJobId) {
    return;
  }

  await nextTick();
  await gridApi.formApi.setValues({ jobId: queryJobId });
  await gridApi.reload({ page: { currentPage: 1 } });
  await openDetail(queryJobId);
});

onBeforeUnmount(() => {
  closeDetailSession();
});

function getInitialJobId() {
  const rawJobId = route.query.jobId;
  const jobId = Array.isArray(rawJobId) ? rawJobId[0] : rawJobId;
  return typeof jobId === 'string' ? jobId.trim() : '';
}

async function loadDetail(jobId: string, options: { reset?: boolean } = {}) {
  const reset = options.reset ?? true;
  const sessionId = detailSessionId;
  if (!isCurrentDetailSession(jobId, sessionId)) {
    return null;
  }
  detailLoading.value = true;
  if (reset) {
    selectedItems.value = [];
    itemGridApi.grid?.clearCheckboxRow?.();
  }
  try {
    const job = await workflowDetailApi({ jobId });
    if (!isCurrentDetailSession(jobId, sessionId)) {
      return null;
    }
    currentJob.value = job;
    await nextTick();
    if (!isCurrentDetailSession(jobId, sessionId)) {
      return null;
    }
    if (reset) {
      await itemGridApi.formApi.resetForm();
      await itemGridApi.reload({ page: { currentPage: 1 } });
    } else {
      await itemGridApi.reload();
    }
    return currentJob.value;
  } finally {
    if (isCurrentDetailSession(jobId, sessionId)) {
      detailLoading.value = false;
    }
  }
}

async function openDetail(jobId: string) {
  openDetailSession(jobId);
  detailApi.open();
  await nextTick();
  await loadDetail(jobId);
}

async function openRecords(jobId: string) {
  recordApi.open();
  recordLoading.value = true;
  try {
    recordJob.value = await workflowDetailApi({ jobId });
  } finally {
    recordLoading.value = false;
  }
}

async function reloadDetailIfCurrent(jobId: string) {
  if (currentJob.value?.jobId === jobId) {
    await loadDetail(jobId);
  }
  if (recordJob.value?.jobId === jobId) {
    recordJob.value = await workflowDetailApi({ jobId });
  }
}

async function refreshCurrentDetail() {
  const jobId = currentJob.value?.jobId;
  if (!jobId) {
    return;
  }
  await loadDetail(jobId, { reset: false });
}

async function cancelJob(job: WorkflowJobDto) {
  await workflowCancelApi({ jobId: job.jobId });
  useMessage.success('已请求取消');
  await gridApi.reload();
  await reloadDetailIfCurrent(job.jobId);
}

async function archiveJob(job: WorkflowJobDto) {
  const result = await useConfirm({
    confirmText: '归档',
    content: `归档后任务「${job.displayName}」将从默认列表隐藏，可通过归档范围筛选查看。`,
    successMessage: false,
    title: '归档工作流任务',
  });
  if (result === 'cancel') {
    return;
  }

  await workflowArchiveApi({ jobId: job.jobId });
  useMessage.success('已归档');
  await gridApi.reload();
  await reloadDetailIfCurrent(job.jobId);
}

async function expireJob(job: WorkflowJobDto) {
  await workflowExpireApi({ jobId: job.jobId });
  useMessage.success('已过期清理');
  await gridApi.reload();
  await reloadDetailIfCurrent(job.jobId);
}

async function retrySelectedItems() {
  const jobId = currentJob.value?.jobId;
  if (!jobId || !canRetrySelected.value) {
    return;
  }

  retrying.value = true;
  try {
    await workflowRetryItemsApi({
      itemIds: selectedItems.value.map((item) => item.itemId),
      jobId,
    });
    useMessage.success('已创建重试 attempt');
    selectedItems.value = [];
    itemGridApi.grid?.clearCheckboxRow?.();
    await gridApi.reload();
    await loadDetail(jobId);
  } finally {
    retrying.value = false;
  }
}

function handleItemSelectionChange(params: {
  records: ContentImportItemDto[];
}) {
  selectedItems.value =
    itemGridApi.grid?.getCheckboxRecords?.() ?? params.records;
}

function openDetailSession(jobId: string) {
  detailSessionId += 1;
  activeDetailJobId = jobId;
}

function closeDetailSession() {
  detailSessionId += 1;
  activeDetailJobId = '';
  detailLoading.value = false;
  currentJob.value = null;
  selectedItems.value = [];
}

function isCurrentDetailSession(jobId: string, sessionId: number) {
  return activeDetailJobId === jobId && detailSessionId === sessionId;
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #displayName="{ row }">
        <el-text
          class="cursor-pointer hover:opacity-50"
          type="primary"
          @click="openDetail(row.jobId)"
        >
          {{ row.displayName }}
        </el-text>
      </template>

      <template #workflowType="{ row }">
        {{ formatWorkflowType(row.workflowType) }}
      </template>

      <template #status="{ row }">
        <el-tag :type="formatWorkflowJobStatus(row).type">
          {{ formatWorkflowJobStatus(row).label }}
        </el-tag>
      </template>

      <template #progress="{ row }">
        <el-progress :percentage="row.progressPercent" :stroke-width="8" />
      </template>

      <template #operator="{ row }">
        {{ formatWorkflowOperator(row) }}
      </template>

      <template #actions="{ row }">
        <el-button link type="primary" @click="openDetail(row.jobId)">
          详情
        </el-button>
        <el-button link type="primary" @click="openRecords(row.jobId)">
          处理记录
        </el-button>
        <el-button
          v-if="canArchiveWorkflow(row)"
          link
          type="primary"
          @click="archiveJob(row)"
        >
          归档
        </el-button>
        <el-button
          v-if="canCancelWorkflow(row)"
          link
          type="warning"
          @click="cancelJob(row)"
        >
          取消
        </el-button>
        <el-button
          v-if="canExpireWorkflow(row)"
          link
          type="danger"
          @click="expireJob(row)"
        >
          清理
        </el-button>
      </template>
    </Grid>

    <DetailModal>
      <div
        v-loading="detailLoading"
        class="workflow-detail flex h-full min-h-0 flex-col overflow-hidden"
      >
        <template v-if="currentJob">
          <section class="workflow-detail__summary">
            <div class="workflow-detail__headline">
              <div class="workflow-detail__identity">
                <div class="workflow-detail__title-row">
                  <el-tag :type="formatWorkflowJobStatus(currentJob).type">
                    {{ formatWorkflowJobStatus(currentJob).label }}
                  </el-tag>
                  <el-tag type="info">
                    {{ formatWorkflowType(currentJob.workflowType) }}
                  </el-tag>
                  <span class="truncate text-base font-semibold">
                    {{ currentJob.displayName }}
                  </span>
                </div>
                <div class="workflow-detail__job-id">
                  {{ currentJob.jobId }}
                </div>
              </div>

              <div class="workflow-detail__metrics">
                <div class="workflow-detail__metric">
                  <span>成功</span>
                  <strong>{{ currentJob.successItemCount }}</strong>
                </div>
                <div class="workflow-detail__metric">
                  <span>失败</span>
                  <strong>{{ currentJob.failedItemCount }}</strong>
                </div>
                <div class="workflow-detail__metric">
                  <span>跳过</span>
                  <strong>{{ currentJob.skippedItemCount }}</strong>
                </div>
                <div
                  class="workflow-detail__metric workflow-detail__metric--time"
                >
                  <span>更新</span>
                  <strong>{{ formatUTC(currentJob.updatedAt) }}</strong>
                </div>
              </div>
            </div>

            <div class="workflow-detail__progress">
              <div class="mb-1 flex items-center justify-between gap-4">
                <span class="truncate text-sm text-muted-foreground">
                  {{ formatWorkflowJobProgress(currentJob) }}
                </span>
                <span class="shrink-0 font-mono text-sm font-medium">
                  {{ currentJob.progressPercent }}%
                </span>
              </div>
              <el-progress
                :percentage="currentJob.progressPercent"
                :show-text="false"
                :stroke-width="8"
              />
            </div>
          </section>

          <section class="workflow-detail__grid">
            <ItemGrid class="workflow-detail__item-grid">
              <template #toolbar-actions>
                <div class="flex w-full flex-wrap items-center gap-2">
                  <el-button
                    :loading="detailLoading"
                    @click="refreshCurrentDetail"
                  >
                    <RotateCw class="mr-1 size-4" />
                    刷新详情
                  </el-button>
                  <el-button
                    :disabled="!canRetrySelected"
                    :loading="retrying"
                    type="primary"
                    @click="retrySelectedItems"
                  >
                    重试所选失败章节
                  </el-button>
                  <el-text size="small" type="info">
                    已选 {{ selectedItems.length }} 个失败章节
                  </el-text>
                </div>
              </template>

              <template #imageProgress="{ row }">
                {{
                  formatWorkflowItemImageProgress(row, {
                    isActive:
                      createWorkflowImageProgressActiveState(currentJob),
                    progressDetail: currentJob?.progressDetail,
                  })
                }}
              </template>

              <template #nextRetryAt="{ row }">
                <el-tooltip
                  v-if="getWorkflowItemCheckboxDisabledReason(row)"
                  :content="getWorkflowItemCheckboxDisabledReason(row)"
                  placement="top"
                >
                  <span>{{ formatWorkflowItemRetrySummary(row) }}</span>
                </el-tooltip>
                <span v-else>{{ formatWorkflowItemRetrySummary(row) }}</span>
              </template>
            </ItemGrid>
          </section>
        </template>
      </div>
    </DetailModal>

    <RecordModal>
      <div
        v-loading="recordLoading"
        class="flex h-full min-h-0 flex-col overflow-hidden"
      >
        <template v-if="recordJob">
          <el-card class="mb-4 shrink-0" shadow="never">
            <template #header>
              <span>{{ recordJob.displayName }}</span>
            </template>
            <el-descriptions :column="2" border size="small">
              <el-descriptions-item label="任务编号">
                <el-text class="font-mono" truncated>
                  {{ recordJob.jobId }}
                </el-text>
              </el-descriptions-item>
              <el-descriptions-item label="状态">
                <el-tag :type="formatWorkflowJobStatus(recordJob).type">
                  {{ formatWorkflowJobStatus(recordJob).label }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="已完成">
                {{ recordJob.successItemCount }}
              </el-descriptions-item>
              <el-descriptions-item label="未完成">
                {{ recordJob.failedItemCount }}
              </el-descriptions-item>
            </el-descriptions>
          </el-card>

          <el-card
            body-class="min-h-0 flex-1 overflow-hidden"
            class="flex min-h-0 flex-1 flex-col"
            shadow="never"
          >
            <template #header>
              <span>处理记录</span>
            </template>
            <el-scrollbar>
              <el-timeline>
                <el-timeline-item
                  v-for="attempt in recordJob.attempts"
                  :key="attempt.attemptId"
                  :timestamp="formatUTC(attempt.updatedAt)"
                >
                  <el-space direction="vertical" alignment="start" :size="6">
                    <el-space :size="8" wrap>
                      <span>第 {{ attempt.attemptNo }} 次处理</span>
                      <el-tag
                        size="small"
                        :type="formatWorkflowAttemptStatus(attempt.status).type"
                      >
                        {{ formatWorkflowAttemptStatus(attempt.status).label }}
                      </el-tag>
                    </el-space>
                    <el-text size="small" type="info">
                      已完成 {{ attempt.successItemCount }} 个，未完成
                      {{ attempt.failedItemCount }} 个
                    </el-text>
                  </el-space>
                </el-timeline-item>
              </el-timeline>
            </el-scrollbar>
          </el-card>
        </template>
      </div>
    </RecordModal>
  </Page>
</template>

<style lang="scss">
.workflow-detail {
  gap: 1rem;
}

.workflow-detail__summary {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.5rem 0 0.875rem;
  border-bottom: 1px solid hsl(var(--border));
}

.workflow-detail__headline {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
}

.workflow-detail__identity {
  display: flex;
  flex: 1 1 auto;
  gap: 0.75rem;
  align-items: center;
  min-width: 0;
}

.workflow-detail__title-row {
  display: flex;
  flex: 1 1 auto;
  gap: 0.5rem;
  align-items: center;
  min-width: 0;
}

.workflow-detail__job-id {
  flex: 0 1 220px;
  min-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  line-height: 1rem;
  color: hsl(var(--muted-foreground));
  white-space: nowrap;
}

.workflow-detail__metrics {
  display: grid;
  flex: 0 0 auto;
  grid-template-columns: repeat(3, minmax(72px, max-content)) minmax(
      132px,
      168px
    );
  gap: 0.5rem;
}

.workflow-detail__metric {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  min-height: 46px;
  padding: 0.4rem 0.625rem;
  background: hsl(var(--muted) / 45%);
  border: 1px solid hsl(var(--border));
  border-radius: 6px;

  span {
    font-size: 0.75rem;
    line-height: 1rem;
    color: hsl(var(--muted-foreground));
  }

  strong {
    min-width: 0;
    margin-top: 0.125rem;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.9375rem;
    font-weight: 600;
    line-height: 1.25rem;
    color: hsl(var(--foreground));
    white-space: nowrap;
  }
}

.workflow-detail__metric--time strong {
  font-size: 0.8125rem;
}

.workflow-detail__progress {
  width: 100%;
}

.workflow-detail__grid,
.workflow-detail__item-grid {
  min-height: 0;
  overflow: hidden;
}

.workflow-detail__grid {
  flex: 1 1 0;
}

.workflow-detail__item-grid {
  height: 100%;
}

.workflow-detail__filter-row {
  width: 100%;
}

.workflow-detail__filter-actions {
  align-self: center;
}

@media (max-width: 1280px) {
  .workflow-detail__headline,
  .workflow-detail__identity {
    flex-direction: column;
    align-items: flex-start;
  }

  .workflow-detail__metrics {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    width: 100%;
  }

  .workflow-detail__job-id {
    flex-basis: auto;
    width: 100%;
  }
}
</style>
