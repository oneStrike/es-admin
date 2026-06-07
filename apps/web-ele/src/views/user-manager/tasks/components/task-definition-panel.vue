<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type { TaskDefinitionRow } from '../model/definition';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  TaskCreateRequest,
  TaskEventTemplateOptionDto,
  TaskUpdateRequest,
} from '#/api/types';

import { useVbenModal, VbenTableAction } from '@vben/common-ui';

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
import RecordDetailModal from '#/components/record-detail-modal';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import {
  createTaskDefinitionFormSchema,
  definitionSearchFormSchema,
  mapTaskDefinitionDetailToFormRecord,
  taskDefinitionColumns,
} from '../model/definition';
import { getTaskDefinitionDetailSections } from '../model/detail';
import {
  buildTaskRewardItems,
  formatTemplateWarningHints,
  normalizeTaskTemplateFilters,
  parseJsonArrayText,
  type TaskTemplateFilterValueDto,
  taskDefinitionStatusOptions,
} from '../model/options';

const templateOptions = ref<TaskEventTemplateOptionDto[]>([]);
const editingTemplateKey = ref<string>();

type TaskFormValues = Partial<
  Pick<
    TaskCreateRequest,
    | 'claimMode'
    | 'cover'
    | 'description'
    | 'endAt'
    | 'repeatType'
    | 'sceneType'
    | 'sortOrder'
    | 'startAt'
    | 'status'
    | 'title'
  >
> &
  Pick<Partial<TaskUpdateRequest>, 'id'> & {
    rewardExperience?: number | string;
    rewardPoints?: number | string;
    stepDedupeScope?: null | number | string;
    stepDescription?: null | string;
    stepFilterKey?: null | string;
    stepFilterValue?: null | string;
    stepFiltersText?: string;
    stepTargetValue?: number | string;
    stepTemplateKey?: null | string;
    stepTriggerMode?: 1 | 2 | number | string;
  };

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
  connectedComponent: RecordDetailModal,
  title: '任务详情',
});

async function loadTemplateOptions() {
  try {
    const response = await taskTemplateOptionsApi();
    templateOptions.value = response.list || [];
  } catch (error) {
    templateOptions.value = [];
    useMessage.warning(
      error instanceof Error ? error.message : '任务事件模板加载失败',
    );
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

function buildTaskFilterDrafts(
  values: TaskFormValues,
  selectedTemplate: TaskEventTemplateOptionDto,
) {
  const rawFilters = parseTaskFilters(values.stepFiltersText) || [];
  const filterKey = parseTextValue(values.stepFilterKey);

  if (!filterKey) {
    return rawFilters.length > 0 ? rawFilters : undefined;
  }

  const selectedField = selectedTemplate.availableFilterFields.find(
    (item) => item.key === filterKey,
  );

  if (!selectedField) {
    throw new Error('常用过滤字段不在当前模板可选字段中');
  }

  if (rawFilters.some((item) => item.key === filterKey)) {
    throw new Error('常用过滤字段已在高级 JSON 中配置，请保留一种输入方式');
  }

  const filterValue = parseTextValue(values.stepFilterValue);
  if (!filterValue) {
    throw new Error('常用过滤值不能为空');
  }

  return [
    ...rawFilters,
    {
      key: filterKey,
      label: selectedField.label,
      value: filterValue,
    },
  ];
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

function buildTaskPayloadBase(values: TaskFormValues) {
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
          buildTaskFilterDrafts(values, selectedTemplate),
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
  } satisfies TaskCreateRequest;
}

function buildUpdateTaskPayload(values: TaskFormValues) {
  return {
    ...buildTaskPayloadBase(values),
    id: Number(values.id),
  } satisfies TaskUpdateRequest;
}

async function openFormModal(row?: TaskDefinitionRow) {
  await ensureTemplateOptionsLoaded();

  let record:
    | ReturnType<typeof mapTaskDefinitionDetailToFormRecord>
    | undefined;
  if (row) {
    const detail = await taskDetailApi({ id: row.id });
    editingTemplateKey.value = detail.steps?.[0]?.templateKey ?? undefined;
    try {
      record = mapTaskDefinitionDetailToFormRecord(detail);
    } catch (error) {
      useMessage.warning(
        error instanceof Error ? error.message : '当前任务配置暂不支持编辑',
      );
      return;
    }
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

function handleLocalFormError(error: unknown): never {
  const normalizedError =
    error instanceof Error ? error : new Error('提交参数无效');

  useMessage.warning(normalizedError.message);
  throw markHandledFormError(normalizedError);
}

async function handleSubmit(values: TaskFormValues) {
  if (values.id) {
    let payload: TaskUpdateRequest;

    try {
      payload = buildUpdateTaskPayload(values);
    } catch (error) {
      handleLocalFormError(error);
    }

    await taskUpdateApi(payload);
  } else {
    let payload: TaskCreateRequest;

    try {
      payload = buildTaskPayloadBase(values);
    } catch (error) {
      handleLocalFormError(error);
    }

    await taskCreateApi(payload);
  }

  useMessage.success('操作成功');
  formApi.close();
  await gridApi.reload();
}

async function deleteTask(row: TaskDefinitionRow) {
  await taskDeleteApi({ id: row.id });
  useMessage.success('删除成功');
  await gridApi.reload();
}

async function confirmDeleteTask(row: TaskDefinitionRow) {
  const confirmed = await useConfirm({
    content: '确认删除当前任务？',
    successMessage: false,
  });
  if (!confirmed) return;

  await deleteTask(row);
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

function getTaskActions(row: TaskDefinitionRow): ActionItem[] {
  return [
    {
      key: 'detail',
      onClick: () => detailApi.setData({ id: row.id }).open(),
      text: '详情',
    },
    {
      key: 'edit',
      onClick: () => openFormModal(row),
      text: '编辑',
    },
    {
      danger: true,
      key: 'delete',
      onClick: () => confirmDeleteTask(row),
      text: '删除',
    },
  ];
}

function getTaskStatusActions(row: TaskDefinitionRow): ActionItem[] {
  return taskDefinitionStatusOptions.map((item) => ({
    disabled: row.status === item.value || row.statusLoading,
    key: `status-${item.value}`,
    loading: row.statusLoading && row.status !== item.value,
    onClick: () => updateTaskStatus(row, item.value as 0 | 1 | 2 | 3),
    text: item.label,
  }));
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
          @click="detailApi.setData({ id: row.id }).open()"
        >
          {{ row.title }}
        </el-text>
      </template>

      <template #actions="{ row }">
        <VbenTableAction
          align="center"
          :actions="getTaskActions(row)"
          :dropdown-actions="getTaskStatusActions(row)"
          more-text="状态"
        />
      </template>
    </Grid>

    <Form
      :schema="createTaskDefinitionFormSchema(templateOptions)"
      :on-submit="handleSubmit"
    />

    <DetailModal
      :api="taskDetailApi"
      :sections="getTaskDefinitionDetailSections"
      class="w-[980px]"
    />
  </div>
</template>
