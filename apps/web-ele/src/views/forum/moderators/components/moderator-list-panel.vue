<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { ForumModeratorDto } from '#/api/types';

import { useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  forumModeratorsAssignSectionApi,
  forumModeratorsCreateApi,
  forumModeratorsDeleteApi,
  forumModeratorsPageApi,
  forumModeratorsUpdateApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailCards } from '../model/detail';
import {
  assignSectionFormSchema,
  createFormSchema,
  editFormSchema,
  fetchModeratorOptions,
  mapModeratorToFormRecord,
  moderatorColumns,
  searchFormSchema,
} from '../model/shared';
import {
  ModeratorPayloadValidationError,
  buildAssignModeratorSectionPayload,
  buildCreateModeratorPayload,
  buildUpdateModeratorPayload,
} from '../model/payload';

type ForumModeratorRow = ForumModeratorDto & {
  loading?: boolean;
};

const currentModerator = ref({} as ForumModeratorRow);

void fetchModeratorOptions();

const moderatorGridOptions: VxeGridProps<ForumModeratorRow> = {
  columns: moderatorColumns,
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const { dateRange, ...restFormValues } = formValues || {};
        const [startDate, endDate] = Array.isArray(dateRange) ? dateRange : [];

        return await forumModeratorsPageApi(
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

const [ModeratorGrid, moderatorGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(searchFormSchema),
  gridOptions: moderatorGridOptions,
});

const [CreateForm, createFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [EditForm, editFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [AssignForm, assignFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
  title: '版主详情',
});

function openCreateModal() {
  createFormApi
    .setData({
      cols: 2,
      schema: createFormSchema,
      title: '版主',
      width: 980,
    })
    .open();
}

function openDetailModal(row: ForumModeratorRow) {
  currentModerator.value = row;
  detailApi.setData({ recordId: row.id }).open();
}

function openEditModal(row: ForumModeratorRow) {
  editFormApi
    .setData({
      cols: 2,
      record: {
        id: row.id,
        ...mapModeratorToFormRecord(row),
      },
      schema: editFormSchema,
      title: '版主',
      width: 980,
    })
    .open();
}

function openAssignModal(row: ForumModeratorRow) {
  currentModerator.value = row;
  assignFormApi
    .setData({
      cols: 1,
      record: {
        sectionIds: row.sections?.map((item) => item.id) ?? [],
      },
      schema: assignSectionFormSchema,
      title: '分配板块',
      width: 760,
    })
    .open();
}

function showPayloadValidationError(error: unknown) {
  if (error instanceof ModeratorPayloadValidationError) {
    useMessage.warning(error.message);
  }
  throw error;
}

async function handleCreateSubmit(values: Record<string, unknown>) {
  try {
    await forumModeratorsCreateApi(buildCreateModeratorPayload(values));
  } catch (error) {
    showPayloadValidationError(error);
  }
  useMessage.success('操作成功');
  await moderatorGridApi.reload();
}

async function handleEditSubmit(values: Record<string, unknown>) {
  try {
    await forumModeratorsUpdateApi(buildUpdateModeratorPayload(values));
  } catch (error) {
    showPayloadValidationError(error);
  }
  useMessage.success('操作成功');
  await moderatorGridApi.reload();
}

async function handleAssignSubmit(values: Record<string, unknown>) {
  try {
    await forumModeratorsAssignSectionApi(
      buildAssignModeratorSectionPayload(values, currentModerator.value.id),
    );
  } catch (error) {
    showPayloadValidationError(error);
  }
  useMessage.success('分配成功');
  await moderatorGridApi.reload();
}

async function deleteModerator(row: ForumModeratorRow) {
  await forumModeratorsDeleteApi({ id: row.id });
  useMessage.success('删除成功');
  await moderatorGridApi.reload();
}

async function toggleEnableStatus(row: ForumModeratorRow) {
  row.loading = true;
  try {
    await forumModeratorsUpdateApi({
      id: row.id,
      isEnabled: !row.isEnabled,
    });
    useMessage.success('操作成功');
    await moderatorGridApi.reload();
  } finally {
    row.loading = false;
  }
}

async function reload() {
  await moderatorGridApi.reload();
}

async function getCurrentModerator() {
  return currentModerator.value;
}

defineExpose({
  reload,
});
</script>

<template>
  <div class="es-full-height-pane">
    <ModeratorGrid class="es-full-height-grid">
      <template #toolbar-actions>
        <el-button class="ml-2" type="primary" @click="openCreateModal()">
          添加版主
        </el-button>
      </template>

      <template #moderatorUser="{ row }">
        <div class="flex min-w-0 items-center gap-2">
          <el-avatar v-if="row.avatar" :size="28" :src="row.avatar" />
          <div class="min-w-0">
            <div class="truncate text-sm">{{ row.nickname || '-' }}</div>
          </div>
        </div>
      </template>

      <template #isEnabled="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.loading"
          :model-value="row.isEnabled"
          @change="toggleEnableStatus(row)"
        />
      </template>

      <template #actions="{ row }">
        <div class="my-1">
          <el-button link type="primary" @click="openDetailModal(row)">
            详情
          </el-button>
          <el-divider direction="vertical" />
          <el-button link type="primary" @click="openEditModal(row)">
            编辑
          </el-button>
          <el-divider direction="vertical" />
          <el-button link type="primary" @click="openAssignModal(row)">
            分配板块
          </el-button>
          <el-divider direction="vertical" />
          <el-popconfirm
            title="确认删除当前版主?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="deleteModerator(row)"
          >
            <template #reference>
              <el-button link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </ModeratorGrid>

    <CreateForm :schema="createFormSchema" :on-submit="handleCreateSubmit" />
    <EditForm :schema="editFormSchema" :on-submit="handleEditSubmit" />
    <AssignForm
      :schema="assignSectionFormSchema"
      :on-submit="handleAssignSubmit"
    />

    <DetailModal
      :api="getCurrentModerator"
      :cards="getDetailCards"
      class="w-[960px]"
    />
  </div>
</template>
