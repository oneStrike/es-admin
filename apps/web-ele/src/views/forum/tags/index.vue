<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  BaseForumHashtagDto,
  ForumHashtagsCreateRequest,
  ForumHashtagsUpdateAuditStatusRequest,
  ForumHashtagsUpdateHiddenRequest,
  ForumHashtagsUpdateRequest,
} from '#/api/types';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  forumHashtagsCreateApi,
  forumHashtagsDetailApi,
  forumHashtagsPageApi,
  forumHashtagsUpdateApi,
  forumHashtagsUpdateAuditStatusApi,
  forumHashtagsUpdateHiddenApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import RecordDetailModal from '#/components/record-detail-modal';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailSections } from './model/detail';
import {
  auditFormSchema,
  createFormSchema,
  editFormSchema,
  pageColumns,
  searchFormSchema,
} from './model/shared';

defineOptions({
  name: 'ForumHashtags',
});

type ForumHashtagRow = BaseForumHashtagDto & {
  hiddenLoading?: boolean;
};

type HashtagCreateFormValues = Pick<
  ForumHashtagsCreateRequest,
  'description' | 'displayName' | 'manualBoost'
>;

type HashtagUpdateFormValues = Pick<
  ForumHashtagsUpdateRequest,
  'description' | 'id' | 'manualBoost'
>;

type HashtagAuditFormValues = Pick<
  ForumHashtagsUpdateAuditStatusRequest,
  'auditReason' | 'auditStatus' | 'id'
>;

const gridOptions: VxeGridProps<ForumHashtagRow> = {
  columns: pageColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const { dateRange, ...restFormValues } = formValues || {};
        const [startDate, endDate] = Array.isArray(dateRange) ? dateRange : [];

        return await forumHashtagsPageApi(
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
  connectedComponent: RecordDetailModal,
  title: '话题详情',
});

function openCreateModal() {
  createFormApi
    .setData({
      cols: 2,
      schema: createFormSchema,
      title: '话题',
      width: 960,
    })
    .open();
}

async function openEditModal(row: ForumHashtagRow) {
  const detail = await forumHashtagsDetailApi({ id: row.id });
  editFormApi
    .setData({
      cols: 2,
      record: {
        description: detail.description ?? undefined,
        displayName: detail.displayName,
        id: detail.id,
        manualBoost: detail.manualBoost,
      },
      schema: editFormSchema,
      title: '话题',
      width: 960,
    })
    .open();
}

function openAuditModal(row: ForumHashtagRow) {
  auditFormApi
    .setData({
      cols: 1,
      record: {
        auditReason: row.auditReason ?? '',
        auditStatus: row.auditStatus,
        id: row.id,
      },
      schema: auditFormSchema,
      title: '话题审核',
      width: 720,
    })
    .open();
}

function normalizeDescription(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function normalizeManualBoost(value: unknown) {
  return value === null || value === undefined || value === ''
    ? undefined
    : Number(value);
}

function normalizeCreatePayload(
  values: HashtagCreateFormValues,
): ForumHashtagsCreateRequest {
  const displayName = values.displayName?.trim?.();
  if (!displayName) {
    useMessage.warning('请输入话题名称');
    throw new Error('missing displayName');
  }

  return {
    description: normalizeDescription(values.description),
    displayName,
    manualBoost: normalizeManualBoost(values.manualBoost),
  };
}

function normalizeUpdatePayload(
  values: HashtagUpdateFormValues,
): ForumHashtagsUpdateRequest {
  return {
    description: normalizeDescription(values.description),
    id: Number(values.id),
    manualBoost: normalizeManualBoost(values.manualBoost),
  };
}

async function handleCreateSubmit(values: HashtagCreateFormValues) {
  await forumHashtagsCreateApi(normalizeCreatePayload(values));
  createFormApi.close();
  useMessage.success('操作成功');
  await gridApi.reload();
}

async function handleEditSubmit(values: HashtagUpdateFormValues) {
  await forumHashtagsUpdateApi(normalizeUpdatePayload(values));
  editFormApi.close();
  useMessage.success('操作成功');
  await gridApi.reload();
}

async function handleAuditSubmit(values: HashtagAuditFormValues) {
  if (Number(values.auditStatus) === 2 && !values.auditReason?.trim?.()) {
    useMessage.warning('拒绝时请填写审核意见');
    throw new Error('missing audit reason');
  }

  await forumHashtagsUpdateAuditStatusApi({
    auditReason: values.auditReason?.trim?.() || undefined,
    auditStatus: Number(values.auditStatus) as 0 | 1 | 2,
    id: Number(values.id),
  } satisfies ForumHashtagsUpdateAuditStatusRequest);
  auditFormApi.close();
  useMessage.success('审核成功');
  await gridApi.reload();
}

async function toggleHiddenStatus(row: ForumHashtagRow) {
  row.hiddenLoading = true;
  try {
    await forumHashtagsUpdateHiddenApi({
      id: row.id,
      isHidden: !row.isHidden,
    } satisfies ForumHashtagsUpdateHiddenRequest);
    useMessage.success('操作成功');
    await gridApi.reload();
  } finally {
    row.hiddenLoading = false;
  }
}

function getHashtagActions(row: ForumHashtagRow): ActionItem[] {
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
      key: 'audit',
      text: '审核',
      onClick: () => openAuditModal(row),
    },
  ];
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <el-button class="ml-2" type="primary" @click="openCreateModal()">
          添加话题
        </el-button>
      </template>

      <template #displayName="{ row }">
        <el-text
          class="cursor-pointer text-left hover:opacity-80"
          type="primary"
          @click="detailApi.setData({ id: row.id }).open()"
        >
          {{ row.displayName }}
        </el-text>
      </template>

      <template #isHidden="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.hiddenLoading"
          :model-value="row.isHidden"
          @change="toggleHiddenStatus(row)"
        />
      </template>

      <template #actions="{ row }">
        <VbenTableAction align="center" :actions="getHashtagActions(row)" />
      </template>
    </Grid>

    <CreateForm :schema="createFormSchema" :on-submit="handleCreateSubmit" />
    <EditForm :schema="editFormSchema" :on-submit="handleEditSubmit" />
    <AuditForm :schema="auditFormSchema" :on-submit="handleAuditSubmit" />

    <DetailModal
      :api="forumHashtagsDetailApi"
      :sections="getDetailSections"
      class="w-[960px]"
    />
  </Page>
</template>

<style scoped></style>
