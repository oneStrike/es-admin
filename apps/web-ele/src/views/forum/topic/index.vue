<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  BaseForumTagDto,
  BaseForumTopicDto,
  ForumTagsPageRequest,
  ForumTopicCreateRequest,
  ForumTopicUpdateAuditStatusRequest,
  ForumTopicUpdateRequest,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  forumTagsAssignTopicApi,
  forumTagsPageApi,
  forumTagsTopicTagListApi,
  forumTagsUnassignTopicApi,
  forumTopicCreateApi,
  forumTopicDeleteApi,
  forumTopicDetailApi,
  forumTopicPageApi,
  forumTopicUpdateApi,
  forumTopicUpdateAuditStatusApi,
  forumTopicUpdateFeaturedApi,
  forumTopicUpdateHiddenApi,
  forumTopicUpdateLockedApi,
  forumTopicUpdatePinnedApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsModalTable from '#/components/es-modal-table';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailCards } from './model/detail';
import {
  auditFormSchema,
  createFormSchema,
  editFormSchema,
  fetchTopicSectionOptions,
  searchFormSchema,
  tagSelectionColumns,
  tagSelectionSearchSchema,
  topicColumns,
} from './model/shared';

defineOptions({
  name: 'ForumTopic',
});

const currentTopic = ref<BaseForumTopicDto | null>(null);
const currentTopicTags = ref<BaseForumTagDto[]>([]);

void fetchTopicSectionOptions();

const gridOptions: VxeGridProps<BaseForumTopicDto> = {
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

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
  title: '帖子详情',
});

const [TagModal, tagApi] = useVbenModal({
  connectedComponent: EsModalTable,
});

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

async function openEditModal(row: BaseForumTopicDto) {
  const detail = await forumTopicDetailApi({ id: row.id });
  editFormApi
    .setData({
      cols: 2,
      record: {
        content: detail.content,
        id: detail.id,
        title: detail.title,
      },
      schema: editFormSchema,
      title: '帖子',
      width: 980,
    })
    .open();
}

async function openAuditModal(row: BaseForumTopicDto) {
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

async function openTagModal(row: BaseForumTopicDto) {
  currentTopic.value = row;
  const selectedRows = await forumTagsTopicTagListApi({ topicId: row.id });
  currentTopicTags.value = selectedRows;

  tagApi
    .setData({
      api: (params: ForumTagsPageRequest) => forumTagsPageApi(params),
      columns: tagSelectionColumns,
      multipleLimit: 20,
      searchSchema: createSearchFormOptions(tagSelectionSearchSchema, {
        showCollapseButton: false,
      }),
      selectedRows,
      selectionMode: 'multiple',
      title: `标签关联 - ${row.title}`,
      width: 1200,
    })
    .open();
}

function normalizeCreatePayload(values: Record<string, any>) {
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
    content: values.content.trim(),
    sectionId: Number(values.sectionId),
    title: values.title.trim(),
    userId: Number(selectedUserIds[0]),
  } satisfies ForumTopicCreateRequest;
}

function normalizeEditPayload(values: Record<string, any>) {
  if (!values.title?.trim?.() || !values.content?.trim?.()) {
    useMessage.warning('请完整填写标题和内容');
    throw new Error('missing content');
  }

  return {
    content: values.content.trim(),
    id: Number(values.id),
    title: values.title.trim(),
  } satisfies ForumTopicUpdateRequest;
}

async function handleCreateSubmit(values: Record<string, any>) {
  await forumTopicCreateApi(normalizeCreatePayload(values));
  useMessage.success('操作成功');
  await gridApi.reload();
}

async function handleEditSubmit(values: Record<string, any>) {
  await forumTopicUpdateApi(normalizeEditPayload(values));
  useMessage.success('操作成功');
  await gridApi.reload();
}

async function handleAuditSubmit(values: Record<string, any>) {
  if (values.auditStatus === 2 && !values.auditReason?.trim?.()) {
    useMessage.warning('拒绝时请填写审核意见');
    throw new Error('missing audit reason');
  }

  await forumTopicUpdateAuditStatusApi({
    auditReason: values.auditReason?.trim?.() || undefined,
    auditStatus: Number(values.auditStatus) as 0 | 1 | 2,
    id: Number(values.id),
  } satisfies ForumTopicUpdateAuditStatusRequest);
  useMessage.success('审核成功');
  await gridApi.reload();
}

async function deleteTopic(row: BaseForumTopicDto) {
  await forumTopicDeleteApi({ id: row.id });
  useMessage.success('删除成功');
  await gridApi.reload();
}

async function handleTagConfirm(rows: BaseForumTagDto[]) {
  if (!currentTopic.value) return;

  const topicId = currentTopic.value.id;
  const previousIds = new Set(currentTopicTags.value.map((item) => item.id));
  const nextIds = new Set(rows.map((item) => item.id));

  const assignTasks = rows
    .filter((item) => !previousIds.has(item.id))
    .map((item) => forumTagsAssignTopicApi({ tagId: item.id, topicId }));
  const unassignTasks = currentTopicTags.value
    .filter((item) => !nextIds.has(item.id))
    .map((item) => forumTagsUnassignTopicApi({ tagId: item.id, topicId }));

  if (assignTasks.length === 0 && unassignTasks.length === 0) {
    useMessage.info('标签未发生变化');
    return;
  }

  await Promise.all([...assignTasks, ...unassignTasks]);
  currentTopicTags.value = rows;
  useMessage.success('标签关联已更新');
  await gridApi.reload();
}

async function toggleTopicBoolean(
  row: BaseForumTopicDto,
  field: 'isFeatured' | 'isHidden' | 'isLocked' | 'isPinned',
  api: (params: any) => Promise<any>,
  loadingKey: 'featuredLoading' | 'hiddenLoading' | 'lockedLoading' | 'pinnedLoading',
) {
  row[loadingKey] = true as any;
  try {
    await api({
      [field]: !row[field],
      id: row.id,
    });
    useMessage.success('操作成功');
    await gridApi.reload();
  } finally {
    row[loadingKey] = false as any;
  }
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
          @click="detailApi.setData({ recordId: row.id }).open()"
        >
          {{ row.title }}
        </el-text>
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
        <div class="my-1">
          <el-button
            link
            type="primary"
            @click="detailApi.setData({ recordId: row.id }).open()"
          >
            详情
          </el-button>
          <el-divider direction="vertical" />
          <el-button link type="primary" @click="openEditModal(row)">
            编辑
          </el-button>
          <el-divider direction="vertical" />
          <el-button link type="primary" @click="openAuditModal(row)">
            审核
          </el-button>
          <el-divider direction="vertical" />
          <el-button link type="primary" @click="openTagModal(row)">
            标签
          </el-button>
          <el-divider direction="vertical" />
          <el-popconfirm
            title="确认删除当前帖子?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="deleteTopic(row)"
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
    <AuditForm :schema="auditFormSchema" :on-submit="handleAuditSubmit" />

    <TagModal @confirm="handleTagConfirm" />

    <DetailModal
      :api="forumTopicDetailApi"
      :cards="getDetailCards"
      class="!w-[1040px]"
    />
  </Page>
</template>

<style scoped></style>
