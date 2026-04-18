<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AdminTaskPageResponseDto,
  TaskCreateRequest,
  TaskDetailResponse,
  TaskUpdateRequest,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  taskCreateApi,
  taskDeleteApi,
  taskDetailApi,
  taskPageApi,
  taskUpdateApi,
  taskUpdateStatusApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailCards } from './model/detail';
import {
  formSchema,
  mapTaskToFormRecord,
  pageColumns,
  searchFormSchema,
  taskStatusOptions,
} from './model/shared';
import TaskAssignmentModal from './task-assignment-modal.vue';

defineOptions({
  name: 'TaskManager',
});

type TaskRow = AdminTaskPageResponseDto & {
  enableLoading?: boolean;
  statusLoading?: boolean;
};

const gridOptions: VxeGridProps<TaskRow> = {
  columns: pageColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const { dateRange, ...restFormValues } = formValues || {};
        const [startDate, endDate] = Array.isArray(dateRange) ? dateRange : [];

        return await taskPageApi(
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
  formOptions: createSearchFormOptions(searchFormSchema, {
    showCollapseButton: false,
  }),
  gridOptions,
});

const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
  title: '任务详情',
});

const [AssignmentModal, assignmentApi] = useVbenModal({
  connectedComponent: TaskAssignmentModal,
});

async function openFormModal(row?: TaskRow) {
  let record: Record<string, any> | TaskDetailResponse | undefined;
  if (row) {
    record = mapTaskToFormRecord(await taskDetailApi({ id: row.id }));
  }

  formApi
    .setData({
      cols: 2,
      record,
      schema: formSchema,
      title: '任务',
      width: 980,
    })
    .open();
}

function normalizeTaskPayload(values: Record<string, any>) {
  const title = values.title?.trim?.();
  const code = values.code?.trim?.();

  if (!title || !code) {
    useMessage.warning('请完整填写任务标题和任务编码');
    throw new Error('missing required fields');
  }

  const publishStartAt = values.publishStartAt || undefined;
  const publishEndAt = values.publishEndAt || undefined;
  const rewardItems = parseTaskRewardItems(values.rewardItems);

  if (
    publishStartAt &&
    publishEndAt &&
    new Date(publishEndAt).getTime() < new Date(publishStartAt).getTime()
  ) {
    useMessage.warning('发布结束时间不能早于开始时间');
    throw new Error('invalid publish range');
  }

  return {
    claimMode: Number(values.claimMode) as 1 | 2,
    code,
    completeMode: Number(values.completeMode) as 1 | 2,
    cover: values.cover || undefined,
    description: values.description?.trim?.() || undefined,
    id: values.id ? Number(values.id) : undefined,
    isEnabled: !!values.isEnabled,
    eventCode: values.eventCode ? Number(values.eventCode) : undefined,
    objectiveConfig: values.objectiveConfig?.trim?.() || undefined,
    objectiveType: Number(values.objectiveType ?? 1) as 1 | 2,
    priority: Number(values.priority ?? 0),
    publishEndAt,
    publishStartAt,
    repeatRule: values.repeatRule?.trim?.() || undefined,
    rewardItems,
    status: Number(values.status) as 0 | 1 | 2,
    targetCount: Number(values.targetCount ?? 1),
    title,
    type: Number(values.type) as 1 | 2 | 4,
  };
}

function parseTaskRewardItems(value: unknown) {
  if (!value) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value !== 'string') {
    useMessage.warning('奖励配置必须是奖励项数组');
    throw new Error('invalid reward items');
  }

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      throw new TypeError('rewardItems is not an array');
    }
    return parsed;
  } catch {
    useMessage.warning('奖励配置请填写合法的 JSON 数组');
    throw new Error('invalid reward items');
  }
}

async function handleSubmit(values: Record<string, any>) {
  const payload = normalizeTaskPayload(values);

  if (payload.objectiveType === 2 && !payload.eventCode) {
    useMessage.warning('事件累计任务必须选择事件编码');
    throw new Error('missing event code');
  }

  await (payload.id
    ? taskUpdateApi(payload as TaskUpdateRequest)
    : taskCreateApi(payload as TaskCreateRequest));

  useMessage.success('操作成功');
  await gridApi.reload();
}

async function deleteTask(row: TaskRow) {
  await taskDeleteApi({ id: row.id });
  useMessage.success('删除成功');
  await gridApi.reload();
}

async function toggleEnableStatus(row: TaskRow) {
  row.enableLoading = true;
  try {
    await taskUpdateStatusApi({
      id: row.id,
      isEnabled: !row.isEnabled,
    });
    useMessage.success('操作成功');
    await gridApi.reload();
  } finally {
    row.enableLoading = false;
  }
}

async function updateTaskStatus(row: TaskRow, status: 0 | 1 | 2) {
  if (row.status === status) return;

  row.statusLoading = true;
  try {
    await taskUpdateStatusApi({
      id: row.id,
      status,
    });
    useMessage.success('状态更新成功');
    await gridApi.reload();
  } finally {
    row.statusLoading = false;
  }
}

function openAssignmentModal(row: TaskRow) {
  assignmentApi.setData({ task: row }).open();
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <el-button class="ml-2" type="primary" @click="openFormModal()">
          添加任务
        </el-button>
      </template>

      <template #title="{ row }">
        <el-text
          class="cursor-pointer text-left hover:opacity-80"
          type="primary"
          @click="detailApi.setData({ recordId: row.id }).open()"
        >
          {{ row.title }}
        </el-text>
      </template>

      <template #isEnabled="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.enableLoading"
          :model-value="row.isEnabled"
          @change="toggleEnableStatus(row)"
        />
      </template>

      <template #actions="{ row }">
        <div class="my-1 flex items-center">
          <el-button
            link
            type="primary"
            @click="detailApi.setData({ recordId: row.id }).open()"
          >
            详情
          </el-button>
          <el-divider direction="vertical" />
          <el-button link type="primary" @click="openFormModal(row)">
            编辑
          </el-button>
          <el-divider direction="vertical" />
          <el-button link type="primary" @click="openAssignmentModal(row)">
            记录
          </el-button>
          <el-divider direction="vertical" />
          <el-dropdown
            :disabled="row.statusLoading"
            @command="(status) => updateTaskStatus(row, status)"
          >
            <el-button link type="primary">状态</el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in taskStatusOptions"
                  :key="item.value"
                  :command="item.value"
                  :disabled="row.status === item.value"
                >
                  {{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-divider direction="vertical" />
          <el-popconfirm
            title="确认删除当前任务?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="deleteTask(row)"
          >
            <template #reference>
              <el-button link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </Grid>

    <Form :schema="formSchema" :on-submit="handleSubmit" />

    <DetailModal :api="taskDetailApi" :cards="getDetailCards" class="!w-[980px]" />

    <AssignmentModal />
  </Page>
</template>

<style scoped></style>
