<script setup lang="ts">
import type { ActionItem } from '@vben/common-ui';
import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type { BaseTagDto, CreateTagDto, UpdateTagDto } from '#/api/types';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  contentTagCreateApi,
  contentTagDeleteApi,
  contentTagDetailApi,
  contentTagPageApi,
  contentTagSwapSortOrderApi,
  contentTagUpdateApi,
  contentTagUpdateStatusApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils';

import { formSchema, tagColumns, tagSearchSchema } from './model/shared';

type TagRow = BaseTagDto & {
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
 * VxeGrid 的选项配置：
 */
const gridOptions: VxeGridProps<TagRow> = {
  columns: tagColumns,
  rowConfig: {
    drag: true,
  },
  rowDragConfig: {
    async dragEndMethod(params) {
      await contentTagSwapSortOrderApi({
        dragId: params.dragRow.id,
        targetId: params.newRow.id,
      });
      await gridApi.reload();
      return true;
    },
  },
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await contentTagPageApi(
          formatQuery({ page, formValues, sorts }),
        );
      },
    },
    sort: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
  formOptions: createSearchFormOptions(tagSearchSchema),
});

/**
 * 新建/编辑弹窗
 */
const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

/**
 * 打开表单弹窗
 */
async function openFormModal(row?: TagRow) {
  let record: BaseTagDto | undefined;
  if (row) {
    record = await contentTagDetailApi({ id: row.id });
  }
  formApi
    .setData({
      title: '标签',
      record,
      schema: formSchema,
    })
    .open();
}

/**
 * 切换启用状态
 */
async function toggleEnableStatus(row: TagRow) {
  row.loading = true;
  try {
    await contentTagUpdateStatusApi({
      id: row.id,
      isEnabled: !row.isEnabled,
    });
    handleSuccessReload();
  } finally {
    row.loading = false;
  }
}

/**
 * 新增或更新标签
 */
function buildTagPayload(
  values: CreateTagDto | UpdateTagDto,
): CreateTagDto | UpdateTagDto {
  const payload = {
    icon: values.icon,
    name: values.name,
    sortOrder: values.sortOrder,
    description: values.description,
  };

  return 'id' in values && typeof values.id === 'number'
    ? ({ id: values.id, ...payload } as UpdateTagDto)
    : (payload as CreateTagDto);
}

async function addOrUpdateTag(values: CreateTagDto | UpdateTagDto) {
  const payload = buildTagPayload(values);

  await ('id' in payload && typeof payload.id === 'number'
    ? contentTagUpdateApi(payload as UpdateTagDto)
    : contentTagCreateApi(payload as CreateTagDto));
  useMessage.success('操作成功');
  await gridApi.reload();
}

/**
 * 删除标签
 */
async function deleteTag(row: TagRow) {
  await contentTagDeleteApi({ id: row.id });
  handleSuccessReload();
}

async function confirmDeleteTag(row: TagRow) {
  const confirmed = await useConfirm({
    content: '确认删除当前项?',
    successMessage: false,
  });
  if (!confirmed) return;

  await deleteTag(row);
}

function getTagActions(row: TagRow): ActionItem[] {
  return [
    {
      key: 'edit',
      text: '编辑',
      onClick: () => openFormModal(row),
    },
    {
      danger: true,
      disabled: !!row.isEnabled,
      key: 'delete',
      text: '删除',
      onClick: () => confirmDeleteTag(row),
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
          :model-value="!!row.isEnabled"
          @change="toggleEnableStatus(row)"
        />
      </template>

      <template #actions="{ row }">
        <VbenTableAction align="center" :actions="getTagActions(row)" />
      </template>
    </Grid>

    <!-- 复用模块化的表单 schema -->
    <Form :schema="formSchema" :on-submit="addOrUpdateTag" />
  </Page>
</template>

<style scoped></style>
