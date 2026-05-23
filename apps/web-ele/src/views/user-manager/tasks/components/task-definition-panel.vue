<script lang="ts" setup>
import type { TaskDefinitionRow } from '../model/definition';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  TaskCreateRequest,
  TaskDetailResponse,
  TaskEventTemplateOptionDto,
  TaskTemplateFilterValueDto,
  TaskUpdateRequest,
} from '#/api/types';

import { useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  taskCreateApi,
  taskDeleteApi,
  taskDetailApi,
  taskPageApi,
  taskTemplateOptionsApi,
  taskUpdateApi,
  taskUpdateStatusApi,
} from '#/api/core';
import { markHandledFormError } from '#/components/es-modal-form/error';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import {
  createTaskDefinitionFormSchema,
  definitionSearchFormSchema,
  mapTaskDefinitionDetailToFormRecord,
  taskDefinitionColumns,
} from '../model/definition';
import { getTaskDefinitionDetailCards } from '../model/detail';
import {
  buildTaskRewardItems,
  formatTemplateWarningHints,
  normalizeTaskTemplateFilters,
  parseJsonArrayText,
  taskDefinitionStatusOptions,
} from '../model/options';

const templateOptions = ref<TaskEventTemplateOptionDto[]>([]);
const editingTemplateKey = ref<string>();

const gridOptions: VxeGridProps<TaskDefinitionRow> = {
  columns: taskDefinitionColumns,
  height: '100%',
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
  formOptions: createSearchFormOptions(definitionSearchFormSchema),
  gridOptions,
});

const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
  title: '任务详情',
});

async function loadTemplateOptions() {
  try {
    const response = await taskTemplateOptionsApi();
    templateOptions.value = response.list || [];
  } catch {
    templateOptions.value = [];
  }
}

async function ensureTemplateOptionsLoaded() {
  if (templateOptions.value.length === 0) {
    await loadTemplateOptions();
  }
}

function parseTextValue(value: unknown) {
  const text = typeof value === 'string' ? value.trim() : '';
  return text || undefined;
}

function parseTaskFilters(value: unknown) {
  return parseJsonArrayText<TaskTemplateFilterValueDto>(value, '过滤条件');
}

function resolveSelectedTemplate(
  stepTemplateKey?: string,
): TaskEventTemplateOptionDto | undefined {
  return templateOptions.value.find(
    (item) => item.templateKey === stepTemplateKey,
  );
}

function shouldBlockUnselectableTemplate(
  selectedTemplate?: TaskEventTemplateOptionDto,
) {
  if (!selectedTemplate || selectedTemplate.isSelectable) {
    return false;
  }

  if (!editingTemplateKey.value) {
    return true;
  }

  return editingTemplateKey.value !== selectedTemplate.templateKey;
}

function buildTaskPayloadBase(values: Record<string, any>): TaskCreateRequest {
  const title = parseTextValue(values.title);

  if (!title) {
    throw new Error('任务标题不能为空');
  }

  const stepTriggerMode = Number(values.stepTriggerMode ?? 1) as 1 | 2;
  const stepTemplateKey = parseTextValue(values.stepTemplateKey);
  const stepDedupeScope = values.stepDedupeScope
    ? (Number(values.stepDedupeScope) as 1 | 2)
    : undefined;
  const selectedTemplate = resolveSelectedTemplate(stepTemplateKey);

  if (stepTriggerMode === 2 && !stepTemplateKey) {
    throw new Error('事件驱动步骤必须选择事件模板');
  }

  if (stepTriggerMode === 2 && !selectedTemplate) {
    throw new Error('当前事件模板不存在或已失效，请重新选择');
  }

  if (
    stepTriggerMode === 2 &&
    shouldBlockUnselectableTemplate(selectedTemplate)
  ) {
    throw new Error(
      `当前模板暂不可用于创建任务：${formatTemplateWarningHints(selectedTemplate)}`,
    );
  }

  if (stepDedupeScope && !selectedTemplate?.supportsUniqueCounting) {
    throw new Error('当前模板不支持按不同对象累计');
  }

  const stepFilters =
    stepTriggerMode === 2 && selectedTemplate
      ? normalizeTaskTemplateFilters(
          parseTaskFilters(values.stepFiltersText),
          selectedTemplate,
        )
      : undefined;

  const targetValue = Number(values.stepTargetValue ?? 1);
  if (!Number.isInteger(targetValue) || targetValue <= 0) {
    throw new Error('目标值必须是大于 0 的整数');
  }

  return {
    claimMode: Number(values.claimMode ?? 1) as 1 | 2,
    completionPolicy: 1 as const,
    cover: parseTextValue(values.cover),
    description: parseTextValue(values.description),
    endAt: values.endAt || undefined,
    rewardItems: buildTaskRewardItems(
      Number(values.rewardPoints ?? 0),
      Number(values.rewardExperience ?? 0),
    ),
    repeatType: Number(values.repeatType ?? 0) as 0 | 1 | 2 | 3,
    sceneType: Number(values.sceneType ?? 1) as 1 | 2 | 4,
    sortOrder: Number(values.sortOrder ?? 0),
    startAt: values.startAt || undefined,
    status: Number(values.status ?? 0) as 0 | 1 | 2 | 3,
    step: {
      dedupeScope:
        stepTriggerMode === 2 && selectedTemplate?.supportsUniqueCounting
          ? stepDedupeScope
          : undefined,
      description: parseTextValue(values.stepDescription),
      filters: stepFilters,
      targetValue,
      templateKey: stepTriggerMode === 2 ? stepTemplateKey : undefined,
      triggerMode: stepTriggerMode,
    },
    title,
  };
}

function buildCreateTaskPayload(
  values: Record<string, any>,
): TaskCreateRequest {
  return buildTaskPayloadBase(values);
}

function buildUpdateTaskPayload(
  values: Record<string, any>,
): TaskUpdateRequest {
  return {
    ...buildTaskPayloadBase(values),
    id: Number(values.id),
  };
}

async function openFormModal(row?: TaskDefinitionRow) {
  await ensureTemplateOptionsLoaded();

  let record: Record<string, any> | TaskDetailResponse | undefined;
  if (row) {
    const detail = await taskDetailApi({ id: row.id });
    editingTemplateKey.value = detail.steps?.[0]?.templateKey ?? undefined;
    record = mapTaskDefinitionDetailToFormRecord(detail);
  } else {
    editingTemplateKey.value = undefined;
  }

  formApi
    .setData({
      cols: 2,
      record,
      schema: createTaskDefinitionFormSchema(templateOptions.value),
      title: row ? '编辑任务' : '添加任务',
      width: 1080,
    })
    .open();
}

async function handleSubmit(values: Record<string, any>) {
  let payload: TaskCreateRequest | TaskUpdateRequest;
  try {
    payload = values.id
      ? buildUpdateTaskPayload(values)
      : buildCreateTaskPayload(values);
  } catch (error) {
    useMessage.warning(error instanceof Error ? error.message : '提交失败');
    throw markHandledFormError(error);
  }

  await (values.id
    ? taskUpdateApi(payload as TaskUpdateRequest)
    : taskCreateApi(payload as TaskCreateRequest));
  useMessage.success('操作成功');
  formApi.close();
  await gridApi.reload();
}

async function deleteTask(row: TaskDefinitionRow) {
  await taskDeleteApi({ id: row.id });
  useMessage.success('删除成功');
  await gridApi.reload();
}

async function updateTaskStatus(row: TaskDefinitionRow, status: 0 | 1 | 2 | 3) {
  if (row.status === status) {
    return;
  }

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

onMounted(async () => {
  await loadTemplateOptions();
});
</script>

<template>
  <div class="es-full-height-pane">
    <div
      class="mb-4 rounded-lg border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm leading-6 text-slate-600"
    >
      事件模板下拉仅保留当前允许创建的模板；
      过滤条件需使用模板声明的字段键和值类型。 具体字段请参考模板返回的说明。
    </div>
    <Grid class="es-full-height-grid">
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
          <el-dropdown
            :disabled="row.statusLoading"
            @command="(status: 0 | 1 | 2 | 3) => updateTaskStatus(row, status)"
          >
            <el-button link type="primary">状态</el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in taskDefinitionStatusOptions"
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
            title="确认删除当前任务？"
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

    <Form
      :schema="createTaskDefinitionFormSchema(templateOptions)"
      :on-submit="handleSubmit"
    />

    <DetailModal
      :api="taskDetailApi"
      :cards="getTaskDefinitionDetailCards"
      class="w-[980px]"
    />
  </div>
</template>
