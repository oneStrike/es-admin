<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AdminForumTopicPageItemDto,
  ForumTopicCreateRequest,
  ForumTopicMoveRequest,
  ForumTopicUpdateAuditStatusRequest,
  ForumTopicUpdateFeaturedRequest,
  ForumTopicUpdateHiddenRequest,
  ForumTopicUpdateLockedRequest,
  ForumTopicUpdatePinnedRequest,
  ForumTopicUpdateRequest,
} from '#/api/types';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  forumTopicCreateApi,
  forumTopicDeleteApi,
  forumTopicDetailApi,
  forumTopicMoveApi,
  forumTopicPageApi,
  forumTopicUpdateApi,
  forumTopicUpdateAuditStatusApi,
  forumTopicUpdateFeaturedApi,
  forumTopicUpdateHiddenApi,
  forumTopicUpdateLockedApi,
  forumTopicUpdatePinnedApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import RecordDetailModal from '#/components/record-detail-modal';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailSections } from './model/detail';
import {
  auditFormSchema,
  createFormSchema,
  editFormSchema,
  fetchTopicSectionOptions,
  formatTopicReviewPolicy,
  formatTopicSectionExtra,
  formatTopicSectionSummary,
  formatTopicUserLevel,
  formatTopicUserSummary,
  moveFormSchema,
  resolveTopicSectionState,
  resolveTopicUserState,
  searchFormSchema,
  sectionOptions,
  topicColumns,
} from './model/shared';

defineOptions({
  name: 'ForumTopic',
});

type ForumTopicRow = AdminForumTopicPageItemDto & {
  featuredLoading?: boolean;
  hiddenLoading?: boolean;
  lockedLoading?: boolean;
  pinnedLoading?: boolean;
};

type TopicCreateFormValues = Pick<
  ForumTopicCreateRequest,
  'sectionId' | 'title'
> & {
  content?: string;
  selectedUserIds?: number[];
};

type TopicEditFormValues = Pick<ForumTopicUpdateRequest, 'id' | 'title'> & {
  content?: string;
};

type TopicAuditFormValues = Pick<
  ForumTopicUpdateAuditStatusRequest,
  'auditReason' | 'auditStatus' | 'id'
>;

type TopicMoveFormValues = Pick<ForumTopicMoveRequest, 'id' | 'sectionId'>;

type TopicBooleanFieldMap = {
  isFeatured: ForumTopicUpdateFeaturedRequest;
  isHidden: ForumTopicUpdateHiddenRequest;
  isLocked: ForumTopicUpdateLockedRequest;
  isPinned: ForumTopicUpdatePinnedRequest;
};

void fetchTopicSectionOptions();

const gridOptions: VxeGridProps<ForumTopicRow> = {
  columns: topicColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const { dateRange, ...restFormValues } = formValues || {};
        const [startDate, endDate] = Array.isArray(dateRange) ? dateRange : [];

        return await forumTopicPageApi(
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

const [AuditForm, auditFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [MoveForm, moveFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: RecordDetailModal,
  title: '帖子详情',
});

const currentMoveTopic = ref<ForumTopicRow | null>(null);

function openCreateModal() {
  createFormApi
    .setData({
      cols: 2,
      schema: createFormSchema,
      title: '帖子',
      width: 980,
    })
    .open();
}

async function openEditModal(row: ForumTopicRow) {
  const detail = await forumTopicDetailApi({ id: row.id });
  editFormApi
    .setData({
      cols: 2,
      record: {
        content: detail.html,
        id: detail.id,
        title: detail.title,
      },
      schema: editFormSchema,
      title: '帖子',
      width: 980,
    })
    .open();
}

async function openAuditModal(row: ForumTopicRow) {
  const detail = await forumTopicDetailApi({ id: row.id });
  auditFormApi
    .setData({
      cols: 1,
      record: {
        auditReason: detail.auditReason ?? '',
        auditStatus: detail.auditStatus,
        id: detail.id,
      },
      schema: auditFormSchema,
      title: '审核',
      width: 720,
    })
    .open();
}

async function openMoveModal(row: ForumTopicRow) {
  if (sectionOptions.length === 0) {
    await fetchTopicSectionOptions();
  }

  currentMoveTopic.value = row;
  moveFormApi
    .setData({
      cols: 1,
      record: {
        id: row.id,
        sectionId: row.sectionId,
      },
      schema: moveFormSchema,
      title: '移动板块',
      width: 640,
    })
    .open();
}

function normalizeCreatePayload(values: TopicCreateFormValues) {
  const selectedUserIds = Array.isArray(values.selectedUserIds)
    ? values.selectedUserIds
    : [];

  if (selectedUserIds.length === 0) {
    useMessage.warning('请选择发帖用户');
    throw new Error('missing user');
  }

  if (!values.sectionId) {
    useMessage.warning('请选择所属板块');
    throw new Error('missing section');
  }

  if (!values.title?.trim?.() || !values.content?.trim?.()) {
    useMessage.warning('请完整填写标题和内容');
    throw new Error('missing content');
  }

  return {
    html: values.content.trim(),
    sectionId: Number(values.sectionId),
    title: values.title.trim(),
    userId: Number(selectedUserIds[0]),
  } satisfies ForumTopicCreateRequest;
}

function normalizeEditPayload(values: TopicEditFormValues) {
  if (!values.title?.trim?.() || !values.content?.trim?.()) {
    useMessage.warning('请完整填写标题和内容');
    throw new Error('missing content');
  }

  return {
    html: values.content.trim(),
    id: Number(values.id),
    title: values.title.trim(),
  } satisfies ForumTopicUpdateRequest;
}

async function handleCreateSubmit(values: TopicCreateFormValues) {
  await forumTopicCreateApi(normalizeCreatePayload(values));
  useMessage.success('操作成功');
  await gridApi.reload();
}

async function handleEditSubmit(values: TopicEditFormValues) {
  await forumTopicUpdateApi(normalizeEditPayload(values));
  useMessage.success('操作成功');
  await gridApi.reload();
}

async function handleAuditSubmit(values: TopicAuditFormValues) {
  if (values.auditStatus === 2 && !values.auditReason?.trim?.()) {
    useMessage.warning('拒绝时请填写审核意见');
    throw new Error('missing audit reason');
  }

  await forumTopicUpdateAuditStatusApi({
    auditReason: values.auditReason?.trim?.() || null,
    auditStatus: Number(values.auditStatus) as 0 | 1 | 2,
    id: Number(values.id),
  } satisfies ForumTopicUpdateAuditStatusRequest);
  useMessage.success('审核成功');
  await gridApi.reload();
}

async function handleMoveSubmit(values: TopicMoveFormValues) {
  const nextSectionId = Number(values.sectionId);

  if (!nextSectionId) {
    useMessage.warning('请选择目标板块');
    throw new Error('missing target section');
  }

  if (nextSectionId === Number(currentMoveTopic.value?.sectionId)) {
    useMessage.warning('目标板块不能与当前板块相同');
    throw new Error('same section');
  }

  await forumTopicMoveApi({
    id: Number(values.id),
    sectionId: nextSectionId,
  } satisfies ForumTopicMoveRequest);
  currentMoveTopic.value = null;
  useMessage.success('移动成功');
  await gridApi.reload();
}

async function deleteTopic(row: ForumTopicRow) {
  await forumTopicDeleteApi({ id: row.id });
  useMessage.success('删除成功');
  await gridApi.reload();
}

async function confirmDeleteTopic(row: ForumTopicRow) {
  const confirmed = await useConfirm({
    content: '确认删除当前帖子?',
    successMessage: false,
  });
  if (!confirmed) return;

  await deleteTopic(row);
}

async function toggleTopicBoolean<Field extends keyof TopicBooleanFieldMap>(
  row: ForumTopicRow,
  field: Field,
  api: (params: TopicBooleanFieldMap[Field]) => Promise<unknown>,
  loadingKey:
    | 'featuredLoading'
    | 'hiddenLoading'
    | 'lockedLoading'
    | 'pinnedLoading',
) {
  row[loadingKey] = true;
  try {
    const payload = {
      [field]: !row[field],
      id: row.id,
    } as TopicBooleanFieldMap[Field];
    await api(payload);
    useMessage.success('操作成功');
    await gridApi.reload();
  } finally {
    row[loadingKey] = false;
  }
}

function getTopicActions(row: ForumTopicRow): ActionItem[] {
  return [
    {
      key: 'detail',
      text: '详情',
      onClick: () => detailApi.setData({ id: row.id }).open(),
    },
    {
      key: 'edit',
      text: '编辑',
      onClick: () => openEditModal(row),
    },
    {
      key: 'move',
      text: '移动板块',
      onClick: () => openMoveModal(row),
    },
    {
      key: 'audit',
      text: '审核',
      onClick: () => openAuditModal(row),
    },
    {
      danger: true,
      key: 'delete',
      text: '删除',
      onClick: () => confirmDeleteTopic(row),
    },
  ];
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <el-button class="ml-2" type="primary" @click="openCreateModal()">
          添加帖子
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

      <template #userSummary="{ row }">
        <div v-if="row.userSummary" class="flex min-w-0 items-center gap-2">
          <el-avatar
            v-if="row.userSummary.avatarUrl"
            :size="28"
            :src="row.userSummary.avatarUrl"
          />
          <div class="min-w-0">
            <div class="truncate text-sm">
              {{ formatTopicUserSummary(row.userSummary) }}
            </div>
            <div class="mt-1 flex flex-wrap items-center gap-1 text-xs">
              <el-tag
                v-if="formatTopicUserLevel(row.userSummary) !== '-'"
                size="small"
                type="info"
              >
                {{ formatTopicUserLevel(row.userSummary) }}
              </el-tag>
              <el-tag
                :type="resolveTopicUserState(row.userSummary).color"
                size="small"
              >
                {{ resolveTopicUserState(row.userSummary).label }}
              </el-tag>
            </div>
          </div>
        </div>
        <span v-else>-</span>
      </template>

      <template #sectionSummary="{ row }">
        <div v-if="row.sectionSummary" class="min-w-0">
          <div class="truncate text-sm">
            {{ formatTopicSectionSummary(row.sectionSummary) }}
          </div>
          <div class="mt-1 flex flex-wrap items-center gap-1 text-xs">
            <span
              v-if="formatTopicSectionExtra(row.sectionSummary) !== '-'"
              class="text-gray-400"
            >
              {{ formatTopicSectionExtra(row.sectionSummary) }}
            </span>
            <el-tag
              :type="resolveTopicSectionState(row.sectionSummary).color"
              size="small"
            >
              {{ resolveTopicSectionState(row.sectionSummary).label }}
            </el-tag>
            <el-tag size="small" type="info">
              {{ formatTopicReviewPolicy(row.sectionSummary) }}
            </el-tag>
          </div>
        </div>
        <span v-else>-</span>
      </template>

      <template #isPinned="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.pinnedLoading"
          :model-value="row.isPinned"
          @change="
            toggleTopicBoolean(
              row,
              'isPinned',
              forumTopicUpdatePinnedApi,
              'pinnedLoading',
            )
          "
        />
      </template>

      <template #isFeatured="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.featuredLoading"
          :model-value="row.isFeatured"
          @change="
            toggleTopicBoolean(
              row,
              'isFeatured',
              forumTopicUpdateFeaturedApi,
              'featuredLoading',
            )
          "
        />
      </template>

      <template #isLocked="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.lockedLoading"
          :model-value="row.isLocked"
          @change="
            toggleTopicBoolean(
              row,
              'isLocked',
              forumTopicUpdateLockedApi,
              'lockedLoading',
            )
          "
        />
      </template>

      <template #isHidden="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.hiddenLoading"
          :model-value="row.isHidden"
          @change="
            toggleTopicBoolean(
              row,
              'isHidden',
              forumTopicUpdateHiddenApi,
              'hiddenLoading',
            )
          "
        />
      </template>

      <template #actions="{ row }">
        <VbenTableAction align="center" :actions="getTopicActions(row)" />
      </template>
    </Grid>

    <CreateForm :schema="createFormSchema" :on-submit="handleCreateSubmit" />
    <EditForm :schema="editFormSchema" :on-submit="handleEditSubmit" />
    <AuditForm :schema="auditFormSchema" :on-submit="handleAuditSubmit" />
    <MoveForm :schema="moveFormSchema" :on-submit="handleMoveSubmit" />

    <DetailModal
      :api="forumTopicDetailApi"
      :sections="getDetailSections"
      class="w-[1040px]"
    />
  </Page>
</template>

<style scoped></style>
