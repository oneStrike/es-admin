<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { ForumModeratorDto } from '#/api/types';

import { useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  forumModeratorsAssignSectionApi,
  forumModeratorsCreateApi,
  forumModeratorsDeleteApi,
  forumModeratorsPageApi,
  forumModeratorsUpdateApi,
} from '#/api/core';
import { markHandledFormError } from '#/components/es-modal-form/error';
import EsModalForm from '#/components/es-modal-form/index.vue';
import RecordDetailModal from '#/components/record-detail-modal';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailSections } from '../model/detail';
import {
  buildAssignModeratorSectionPayload,
  buildCreateModeratorPayload,
  buildUpdateModeratorPayload,
  ModeratorPayloadValidationError,
} from '../model/payload';
import {
  assignSectionFormSchema,
  createFormSchema,
  editFormSchema,
  fetchModeratorOptions,
  mapModeratorToFormRecord,
  moderatorColumns,
  searchFormSchema,
} from '../model/shared';

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
  connectedComponent: RecordDetailModal,
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
  detailApi.setData({ id: row.id }).open();
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
    throw markHandledFormError(error);
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

async function confirmDeleteModerator(row: ForumModeratorRow) {
  const confirmed = await useConfirm({
    content: '确认删除当前版主?',
    successMessage: false,
  });
  if (!confirmed) return;

  await deleteModerator(row);
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

function getModeratorActions(row: ForumModeratorRow): ActionItem[] {
  return [
    {
      key: 'detail',
      onClick: () => openDetailModal(row),
      text: '详情',
    },
    {
      key: 'edit',
      onClick: () => openEditModal(row),
      text: '编辑',
    },
    {
      key: 'assign',
      onClick: () => openAssignModal(row),
      text: '分配板块',
    },
    {
      danger: true,
      key: 'delete',
      onClick: () => confirmDeleteModerator(row),
      text: '删除',
    },
  ];
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
        <VbenTableAction align="center" :actions="getModeratorActions(row)" />
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
      :sections="getDetailSections"
      class="w-[960px]"
    />
  </div>
</template>
