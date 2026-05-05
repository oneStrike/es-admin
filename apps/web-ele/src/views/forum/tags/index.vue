<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  BaseForumHashtagDto,
  ForumHashtagsCreateRequest,
  ForumHashtagsUpdateAuditStatusRequest,
  ForumHashtagsUpdateHiddenRequest,
  ForumHashtagsUpdateRequest,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

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
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailCards } from './model/detail';
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
  connectedComponent: EsRecordDetail,
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
  values: Record<string, any>,
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
  values: Record<string, any>,
): ForumHashtagsUpdateRequest {
  return {
    description: normalizeDescription(values.description),
    id: Number(values.id),
    manualBoost: normalizeManualBoost(values.manualBoost),
  };
}

async function handleCreateSubmit(values: Record<string, any>) {
  await forumHashtagsCreateApi(normalizeCreatePayload(values));
  createFormApi.close();
  useMessage.success('操作成功');
  await gridApi.reload();
}

async function handleEditSubmit(values: Record<string, any>) {
  await forumHashtagsUpdateApi(normalizeUpdatePayload(values));
  editFormApi.close();
  useMessage.success('操作成功');
  await gridApi.reload();
}

async function handleAuditSubmit(values: Record<string, any>) {
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
          @click="detailApi.setData({ recordId: row.id }).open()"
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
        </div>
      </template>
    </Grid>

    <CreateForm :schema="createFormSchema" :on-submit="handleCreateSubmit" />
    <EditForm :schema="editFormSchema" :on-submit="handleEditSubmit" />
    <AuditForm :schema="auditFormSchema" :on-submit="handleAuditSubmit" />

    <DetailModal
      :api="forumHashtagsDetailApi"
      :cards="getDetailCards"
      class="w-[960px]"
    />
  </Page>
</template>

<style scoped></style>
