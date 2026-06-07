<script setup lang="ts">
import type { ActionItem } from '@vben/common-ui';
import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type {
  AuthorPageResponseDto,
  CreateAuthorDto,
  UpdateAuthorDto,
} from '#/api/types';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  contentAuthorCreateApi,
  contentAuthorDeleteApi,
  contentAuthorDetailApi,
  contentAuthorPageApi,
  contentAuthorUpdateApi,
  contentAuthorUpdateRecommendedApi,
  contentAuthorUpdateStatusApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import RecordDetailModal from '#/components/record-detail-modal';
import { useDict } from '#/hooks/useDict';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { useForm } from '#/hooks/useForm';
import { createSearchFormOptions } from '#/utils';

import { getDetailSections } from './model/detail';
import { authorColumns, authorSearchSchema, formSchema } from './model/shared';

type AuthorRow = AuthorPageResponseDto & {
  loading?: boolean;
};

/**
 * 通用的成功处理：提示 + 刷新（遵循DRY原则封装重复逻辑）
 */
function handleSuccessReload(message = '操作成功') {
  useMessage.success(message);
  gridApi.reload();
}

/**
 * VxeGrid 的选项配置
 */
const gridOptions: VxeGridProps<AuthorRow> = {
  columns: authorColumns,
  proxyConfig: {
    ajax: {
      query: ({ page, sorts }, formValues) =>
        contentAuthorPageApi(formatQuery({ page, formValues, sorts })),
    },
    sort: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
  formOptions: createSearchFormOptions(authorSearchSchema),
});

const nationalityMap = ref();
useDict('nationality').then(({ nationality }) => {
  nationalityMap.value = nationality?.labels ?? {};
  useForm.setOptions(formSchema, {
    nationality: nationality?.options || [],
  });
  useForm.setOptions(authorSearchSchema, {
    nationality: nationality?.options || [],
  });
  gridApi.setState((prev) => ({
    formOptions: {
      ...prev.formOptions,
      schema: [...authorSearchSchema],
    },
  }));
});
/**
 * 新建/编辑弹窗
 */
const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

/**
 * 详情弹窗
 */
const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: RecordDetailModal,
  title: '作者详情',
});

/**
 * 打开表单弹窗
 */
async function openFormModal(row?: AuthorRow) {
  let record;
  if (row) {
    record = await contentAuthorDetailApi({ id: row.id });
  }
  formApi
    .setData({
      title: '作者',
      record,
      schema: formSchema,
    })
    .open();
}

/**
 * 切换启用状态
 */
async function toggleEnableStatus(row: AuthorRow) {
  row.loading = true;
  try {
    await contentAuthorUpdateStatusApi({
      id: row.id,
      isEnabled: !row.isEnabled,
    });
    handleSuccessReload();
  } finally {
    row.loading = false;
  }
}

/**
 * 切换推荐状态
 */
async function toggleIsRecommendedStatus(row: AuthorRow) {
  row.loading = true;
  try {
    await contentAuthorUpdateRecommendedApi({
      id: row.id,
      isRecommended: !row.isRecommended,
    });
    handleSuccessReload();
  } finally {
    row.loading = false;
  }
}

/**
 * 新增或更新作者
 */
function buildAuthorPayload(
  values: CreateAuthorDto | UpdateAuthorDto,
): CreateAuthorDto | UpdateAuthorDto {
  const payload = {
    avatar: values.avatar,
    name: values.name,
    gender: values.gender,
    nationality: values.nationality,
    type: values.type,
    description: values.description,
    remark: values.remark,
  };

  return 'id' in values && typeof values.id === 'number'
    ? ({ id: values.id, ...payload } as UpdateAuthorDto)
    : (payload as CreateAuthorDto);
}

async function addOrUpdateAuthor(values: CreateAuthorDto | UpdateAuthorDto) {
  const payload = buildAuthorPayload(values);

  await ('id' in payload && typeof payload.id === 'number'
    ? contentAuthorUpdateApi(payload as UpdateAuthorDto)
    : contentAuthorCreateApi(payload as CreateAuthorDto));
  useMessage.success('操作成功');
  await gridApi.reload();
}

/**
 * 删除作者
 */
async function deleteAuthor(row: AuthorRow) {
  await contentAuthorDeleteApi({
    id: row.id,
  });
  handleSuccessReload();
}

async function confirmDeleteAuthor(row: AuthorRow) {
  const confirmed = await useConfirm({
    content: '确认删除当前项?',
    successMessage: false,
  });
  if (!confirmed) return;

  await deleteAuthor(row);
}

function openDetailModal(row: AuthorRow) {
  detailApi
    .setData({
      nationalityMap: nationalityMap.value,
      id: row.id,
    })
    .open();
}

function getAuthorActions(row: AuthorRow): ActionItem[] {
  return [
    {
      key: 'detail',
      onClick: () => openDetailModal(row),
      text: '详情',
    },
    {
      key: 'edit',
      onClick: () => openFormModal(row),
      text: '编辑',
    },
    {
      danger: true,
      disabled: !!row.isEnabled,
      key: 'delete',
      onClick: () => confirmDeleteAuthor(row),
      text: '删除',
    },
  ];
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <el-button class="ml-2" type="primary" @click="openFormModal()">
          添加
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

      <template #nationality="{ row }">
        <span>{{ nationalityMap?.[row.nationality!] || '-' }}</span>
      </template>
      <template #isRecommended="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.loading"
          :model-value="row.isRecommended"
          @change="toggleIsRecommendedStatus(row)"
        />
      </template>

      <template #actions="{ row }">
        <VbenTableAction align="center" :actions="getAuthorActions(row)" />
      </template>
    </Grid>

    <!-- 复用模块化的表单 schema -->
    <Form :schema="formSchema" :on-submit="addOrUpdateAuthor" />
    <DetailModal
      :api="contentAuthorDetailApi"
      :sections="getDetailSections"
      class="min-w-[800px]"
    />
  </Page>
</template>

<style scoped></style>
