<script setup lang="ts">
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  BackgroundTaskCancelRequest,
  BackgroundTaskDetailRequest,
  BackgroundTaskDto,
  BackgroundTaskPageRequest,
  BackgroundTaskRetryRequest,
} from '#/api/types/backgroundTask';

import { onMounted, ref } from 'vue';
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
  formatBackgroundTaskStatus,
  formatTaskJson,
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
  { field: 'payload', label: '任务负载' },
  { field: 'progress', label: '任务进度' },
  { field: 'result', label: '任务结果' },
  { field: 'error', label: '错误信息' },
  { field: 'residue', label: '残留诊断' },
  { field: 'rollbackError', label: '回滚失败诊断' },
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
});

function canCancelTask(task: BackgroundTaskDto) {
  return [1, 2, 3].includes(task.status);
}

function canRetryTask(task: BackgroundTaskDto) {
  return [5, 6, 7].includes(task.status);
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

    <DetailModal class="h-[82vh] w-[960px]">
      <div v-if="currentTask" class="flex h-full min-h-0 flex-col gap-4">
        <el-descriptions :column="2" border size="small">
          <el-descriptions-item label="任务ID">
            {{ currentTask.taskId }}
          </el-descriptions-item>
          <el-descriptions-item label="任务类型">
            {{ currentTask.taskType }}
          </el-descriptions-item>
          <el-descriptions-item label="任务状态">
            <el-tag :type="formatBackgroundTaskStatus(currentTask.status).type">
              {{ formatBackgroundTaskStatus(currentTask.status).label }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="重试次数">
            {{ currentTask.retryCount }} / {{ currentTask.maxRetries }}
          </el-descriptions-item>
          <el-descriptions-item label="处理 Worker">
            {{ currentTask.claimedBy || '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="创建时间">
            {{ formatUTC(currentTask.createdAt) || '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="开始时间">
            {{ formatUTC(currentTask.startedAt) || '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="最终写入时间">
            {{ formatUTC(currentTask.finalizingAt) || '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="完成时间">
            {{ formatUTC(currentTask.finishedAt) || '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="更新时间">
            {{ formatUTC(currentTask.updatedAt) || '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="取消请求时间">
            {{ formatUTC(currentTask.cancelRequestedAt) || '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="Claim 过期时间">
            {{ formatUTC(currentTask.claimExpiresAt) || '-' }}
          </el-descriptions-item>
        </el-descriptions>

        <div class="min-h-0 flex-1 overflow-auto">
          <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <section
              v-for="item in taskJsonFields"
              :key="item.field"
              class="min-h-[180px] rounded border border-border bg-card p-3"
            >
              <div class="mb-2 text-sm font-medium">{{ item.label }}</div>
              <pre
                class="max-h-[320px] overflow-auto whitespace-pre-wrap break-all rounded bg-muted p-3 text-xs leading-5"
                >{{ formatTaskJson(currentTask[item.field]) }}</pre>
            </section>
          </div>
        </div>
      </div>
    </DetailModal>
  </Page>
</template>
