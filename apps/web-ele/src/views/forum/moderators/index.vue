<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  ForumModeratorDto,
  ForumModeratorsAssignSectionRequest,
  ForumModeratorsCreateRequest,
  ForumModeratorsUpdateRequest,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

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

import { getDetailCards } from './model/detail';
import {
  assignSectionFormSchema,
  createFormSchema,
  editFormSchema,
  fetchModeratorOptions,
  mapModeratorToFormRecord,
  moderatorColumns,
  searchFormSchema,
} from './model/shared';

defineOptions({
  name: 'ForumModerators',
});

const currentModerator = ref({} as ForumModeratorDto);

void fetchModeratorOptions();

const gridOptions: VxeGridProps<ForumModeratorDto> = {
  columns: moderatorColumns,
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

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(searchFormSchema),
  gridOptions,
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

function openDetailModal(row: ForumModeratorDto) {
  currentModerator.value = row;
  detailApi.setData({ recordId: row.id }).open();
}

function openEditModal(row: ForumModeratorDto) {
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

function openAssignModal(row: ForumModeratorDto) {
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

function normalizeModeratorFields(values: Record<string, any>) {
  const sectionIds = Array.isArray(values.sectionIds)
    ? values.sectionIds.map(Number).filter(Boolean)
    : [];
  const groupId = values.groupId ? Number(values.groupId) : undefined;

  if (values.roleType === 2 && !groupId) {
    useMessage.warning('分组版主需要选择所属分组');
    throw new Error('missing group');
  }

  if (values.roleType === 3 && sectionIds.length === 0) {
    useMessage.warning('板块版主至少需要选择一个管理板块');
    throw new Error('missing sections');
  }

  return {
    groupId: values.roleType === 2 ? groupId : undefined,
    isEnabled: !!values.isEnabled,
    remark: values.remark?.trim?.() || undefined,
    roleType: values.roleType,
    sectionIds: values.roleType === 3 ? sectionIds : undefined,
  };
}

function normalizeCreateModeratorPayload(values: Record<string, any>) {
  const selectedUserIds = Array.isArray(values.selectedUserIds)
    ? values.selectedUserIds
    : [];

  if (selectedUserIds.length === 0) {
    useMessage.warning('请选择一个用户');
    throw new Error('missing user');
  }

  return {
    ...normalizeModeratorFields(values),
    userId: Number(selectedUserIds[0]),
  } satisfies ForumModeratorsCreateRequest;
}

function normalizeEditModeratorPayload(values: Record<string, any>) {
  return {
    ...normalizeModeratorFields(values),
    id: Number(values.id),
  } satisfies ForumModeratorsUpdateRequest;
}

async function handleCreateSubmit(values: Record<string, any>) {
  await forumModeratorsCreateApi(normalizeCreateModeratorPayload(values));
  useMessage.success('操作成功');
  await gridApi.reload();
}

async function handleEditSubmit(values: Record<string, any>) {
  await forumModeratorsUpdateApi(normalizeEditModeratorPayload(values));
  useMessage.success('操作成功');
  await gridApi.reload();
}

async function handleAssignSubmit(values: Record<string, any>) {
  if (!currentModerator.value) return;

  const sectionIds = Array.isArray(values.sectionIds)
    ? values.sectionIds.map(Number).filter(Boolean)
    : [];

  if (sectionIds.length === 0) {
    useMessage.warning('请至少选择一个板块');
    throw new Error('missing sections');
  }

  await forumModeratorsAssignSectionApi({
    moderatorId: currentModerator.value.id,
    sectionIds,
  } satisfies ForumModeratorsAssignSectionRequest);
  useMessage.success('分配成功');
  await gridApi.reload();
}

async function deleteModerator(row: ForumModeratorDto) {
  await forumModeratorsDeleteApi({ id: row.id });
  useMessage.success('删除成功');
  await gridApi.reload();
}

async function toggleEnableStatus(row: ForumModeratorDto) {
  row.loading = true as any;
  try {
    await forumModeratorsUpdateApi({
      id: row.id,
      isEnabled: !row.isEnabled,
    });
    useMessage.success('操作成功');
    await gridApi.reload();
  } finally {
    row.loading = false as any;
  }
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <el-button class="ml-2" type="primary" @click="openCreateModal()">
          添加版主
        </el-button>
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
    </Grid>

    <CreateForm :schema="createFormSchema" :on-submit="handleCreateSubmit" />
    <EditForm :schema="editFormSchema" :on-submit="handleEditSubmit" />
    <AssignForm
      :schema="assignSectionFormSchema"
      :on-submit="handleAssignSubmit"
    />

    <DetailModal
      :api="async () => currentModerator"
      :cards="getDetailCards"
      class="!w-[960px]"
    />
  </Page>
</template>

<style scoped></style>
