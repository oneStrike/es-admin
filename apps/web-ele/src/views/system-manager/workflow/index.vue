<script setup lang="ts">
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { ContentImportItemDto } from '#/api/types/content';
import type {
  WorkflowJobDetailDto,
  WorkflowJobDto,
  WorkflowRecordDto,
} from '#/api/types/workflow';

import { computed, nextTick, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  contentComicThirdPartyImportItemPageApi,
  workflowCancelApi,
  workflowDetailApi,
  workflowExpireApi,
  workflowPageApi,
  workflowRecordPageApi,
  workflowRetryItemsApi,
} from '#/api/core';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions, formatUTC } from '#/utils';

import {
  buildWorkflowItemPageRequest,
  buildWorkflowPageRequest,
  buildWorkflowRecordPageRequest,
  canCancelWorkflow,
  canExpireWorkflow,
  canManualRetryItem,
  canRetryWorkflowItems,
  formatWorkflowItemRetrySummary,
  formatWorkflowOperator,
  formatWorkflowStatus,
  formatWorkflowType,
  getWorkflowItemCheckboxDisabledReason,
  workflowColumns,
  workflowItemColumns,
  workflowSearchSchema,
} from './model/shared';

defineOptions({
  name: 'WorkflowManager',
});

const route = useRoute();
const currentJob = ref<null | WorkflowJobDetailDto>(null);
const detailLoading = ref(false);
const recordJob = ref<null | WorkflowJobDto>(null);
const recordLoading = ref(false);
const retrying = ref(false);
const selectedItems = ref<ContentImportItemDto[]>([]);

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
    checkMethod: ({ row }) => canManualRetryItem(row),
    labelField: 'title',
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
      query: async ({ page }) => {
        const jobId = currentJob.value?.jobId;
        if (!jobId) {
          return { list: [], total: 0 };
        }
        return await contentComicThirdPartyImportItemPageApi(
          buildWorkflowItemPageRequest({
            currentPage: page.currentPage,
            jobId,
            pageSize: page.pageSize,
          }),
        );
      },
    },
  },
};

const recordGridOptions: VxeGridProps<WorkflowRecordDto> = {
  columns: [
    {
      field: 'createdAt',
      formatter: ({ cellValue }) => formatUTC(cellValue),
      title: '时间',
      width: 180,
    },
    { field: 'attemptNo', title: 'attempt', width: 90 },
    { field: 'message', minWidth: 220, title: '记录' },
    { field: 'eventType', title: '类型', width: 90 },
  ],
  height: 'auto',
  pagerConfig: {
    pageSize: 20,
    pageSizes: [20, 50, 100],
  },
  proxyConfig: {
    ajax: {
      query: async ({ page }) => {
        const jobId = recordJob.value?.jobId;
        if (!jobId) {
          return { list: [], total: 0 };
        }
        return await workflowRecordPageApi(
          buildWorkflowRecordPageRequest({
            currentPage: page.currentPage,
            jobId,
            pageSize: page.pageSize,
          }),
        );
      },
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(workflowSearchSchema),
  gridOptions,
});

const [ItemGrid, itemGridApi] = useVbenVxeGrid({
  gridEvents: {
    checkboxAll: handleItemSelectionChange,
    checkboxChange: handleItemSelectionChange,
  },
  gridOptions: itemGridOptions,
  showSearchForm: false,
});

const [RecordGrid, recordGridApi] = useVbenVxeGrid({
  gridOptions: recordGridOptions,
  showSearchForm: false,
});

const [DetailModal, detailApi] = useVbenModal({
  footer: false,
  title: '任务详情',
  class: 'w-[1200px] !h-[86vh] !max-h-[86vh]',
  contentClass: 'min-h-0 !overflow-hidden p-4',
  onOpenChange: (isOpen) => {
    if (!isOpen) {
      currentJob.value = null;
      selectedItems.value = [];
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

function getInitialJobId() {
  const rawJobId = route.query.jobId;
  const jobId = Array.isArray(rawJobId) ? rawJobId[0] : rawJobId;
  return typeof jobId === 'string' ? jobId.trim() : '';
}

async function loadDetail(jobId: string) {
  detailLoading.value = true;
  selectedItems.value = [];
  itemGridApi.grid?.clearCheckboxRow?.();
  try {
    currentJob.value = await workflowDetailApi({ jobId });
    await nextTick();
    await itemGridApi.reload({ page: { currentPage: 1 } });
  } finally {
    detailLoading.value = false;
  }
}

async function openDetail(jobId: string) {
  detailApi.open();
  await nextTick();
  await loadDetail(jobId);
}

async function openRecords(job: WorkflowJobDto) {
  recordApi.open();
  recordLoading.value = true;
  try {
    recordJob.value = job;
    await nextTick();
    await recordGridApi.reload({ page: { currentPage: 1 } });
  } finally {
    recordLoading.value = false;
  }
}

async function reloadDetailIfCurrent(jobId: string) {
  if (currentJob.value?.jobId === jobId) {
    await loadDetail(jobId);
  }
  if (recordJob.value?.jobId === jobId) {
    if (currentJob.value?.jobId === jobId) {
      recordJob.value = currentJob.value;
    }
    await nextTick();
    await recordGridApi.reload();
  }
}

async function cancelJob(job: WorkflowJobDto) {
  await workflowCancelApi({ jobId: job.jobId });
  useMessage.success('已请求取消');
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
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #displayName="{ row }">
        <div class="flex flex-col gap-1">
          <button
            class="text-left text-sm font-medium text-primary hover:underline"
            type="button"
            @click="openDetail(row.jobId)"
          >
            {{ row.displayName }}
          </button>
          <span class="font-mono text-xs text-gray-500">{{ row.jobId }}</span>
        </div>
      </template>

      <template #workflowType="{ row }">
        {{ formatWorkflowType(row.workflowType) }}
      </template>

      <template #progress="{ row }">
        <el-progress :percentage="row.progressPercent" :stroke-width="8" />
        <div class="mt-1 text-xs text-gray-500">
          {{ row.successItemCount }}/{{ row.selectedItemCount }} 成功，失败
          {{ row.failedItemCount }}
        </div>
      </template>

      <template #operator="{ row }">
        {{ formatWorkflowOperator(row) }}
      </template>

      <template #actions="{ row }">
        <el-button link type="primary" @click="openDetail(row.jobId)">
          详情
        </el-button>
        <el-button link type="primary" @click="openRecords(row)">
          处理记录
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
        class="flex h-full min-h-0 flex-col gap-5 overflow-hidden"
      >
        <template v-if="currentJob">
          <section class="shrink-0 border-b border-border pb-4">
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div class="min-w-0 flex-1">
                <div class="mb-3 flex flex-wrap items-center gap-3">
                  <el-tag :type="formatWorkflowStatus(currentJob.status).type">
                    {{ formatWorkflowStatus(currentJob.status).label }}
                  </el-tag>
                  <el-tag type="info">
                    {{ formatWorkflowType(currentJob.workflowType) }}
                  </el-tag>
                </div>
                <div class="truncate text-base font-semibold">
                  {{ currentJob.displayName }}
                </div>
                <div class="mt-3 truncate font-mono text-xs text-gray-500">
                  {{ currentJob.jobId }}
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4 text-sm lg:grid-cols-4">
                <div>
                  <div class="text-xs text-gray-500">成功</div>
                  <div>{{ currentJob.successItemCount }}</div>
                </div>
                <div>
                  <div class="text-xs text-gray-500">失败</div>
                  <div>{{ currentJob.failedItemCount }}</div>
                </div>
                <div>
                  <div class="text-xs text-gray-500">跳过</div>
                  <div>{{ currentJob.skippedItemCount }}</div>
                </div>
                <div>
                  <div class="text-xs text-gray-500">更新</div>
                  <div>{{ formatUTC(currentJob.updatedAt) }}</div>
                </div>
              </div>
            </div>

            <div class="mt-4">
              <div class="mb-2 flex items-center justify-between gap-4">
                <span class="truncate text-sm text-gray-500">
                  {{ currentJob.progressMessage || '等待进度更新' }}
                </span>
                <span class="shrink-0 font-mono text-sm">
                  {{ currentJob.progressPercent }}%
                </span>
              </div>
              <el-progress
                :percentage="currentJob.progressPercent"
                :show-text="false"
                :stroke-width="10"
              />
            </div>
          </section>

          <section
            class="flex min-h-[320px] min-w-0 flex-1 flex-col overflow-hidden"
          >
            <ItemGrid>
              <template #toolbar-actions>
                <el-button
                  :disabled="!canRetrySelected"
                  :loading="retrying"
                  type="primary"
                  @click="retrySelectedItems"
                >
                  重试所选失败章节
                </el-button>
              </template>

              <template #imageProgress="{ row }">
                {{ row.imageSuccessCount }}/{{ row.imageTotal }}
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
                <el-tag :type="formatWorkflowStatus(recordJob.status).type">
                  {{ formatWorkflowStatus(recordJob.status).label }}
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
            body-class="min-h-0 h-full overflow-hidden"
            class="min-h-0 flex-1"
            shadow="never"
          >
            <template #header>
              <span>处理记录</span>
            </template>
            <RecordGrid />
          </el-card>
        </template>
      </div>
    </RecordModal>
  </Page>
</template>
