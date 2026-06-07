<script setup lang="ts">
import type { ActionItem } from '@vben/common-ui';
import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type {
  BaseCategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '#/api/types';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  contentCategoryCreateApi,
  contentCategoryDeleteApi,
  contentCategoryDetailApi,
  contentCategoryPageApi,
  contentCategorySwapSortOrderApi,
  contentCategoryUpdateApi,
  contentCategoryUpdateStatusApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils';

import {
  categoryColumns,
  categorySearchSchema,
  formSchema,
} from './model/shared';

type CategoryRow = BaseCategoryDto & {
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
const gridOptions: VxeGridProps<CategoryRow> = {
  columns: categoryColumns,
  height: 'auto',
  rowConfig: {
    drag: true,
  },
  rowDragConfig: {
    async dragEndMethod(params) {
      await contentCategorySwapSortOrderApi({
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
        if (Array.isArray(formValues.contentType)) {
          formValues.contentType = JSON.stringify(formValues.contentType);
        }
        return await contentCategoryPageApi(
          formatQuery({ page, formValues, sorts }),
        );
      },
    },
    sort: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
  formOptions: createSearchFormOptions(categorySearchSchema),
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
async function openFormModal(row?: CategoryRow) {
  let record: BaseCategoryDto | undefined;
  if (row) {
    record = await contentCategoryDetailApi({ id: row.id });
  }
  formApi
    .setData({
      title: '分类',
      record,
      schema: formSchema,
    })
    .open();
}

/**
 * 切换启用状态
 */
async function toggleEnableStatus(row: CategoryRow) {
  row.loading = true;
  try {
    await contentCategoryUpdateStatusApi({
      id: row.id,
      isEnabled: !row.isEnabled,
    });
    handleSuccessReload();
  } finally {
    row.loading = false;
  }
}

/**
 * 新增或更新分类
 */
function buildCategoryPayload(
  values: CreateCategoryDto | UpdateCategoryDto,
): CreateCategoryDto | UpdateCategoryDto {
  const payload = {
    icon: values.icon,
    name: values.name,
    contentType: values.contentType,
    sortOrder: values.sortOrder,
    isEnabled: values.isEnabled,
    description: values.description,
  };

  return 'id' in values && typeof values.id === 'number'
    ? ({ id: values.id, ...payload } as UpdateCategoryDto)
    : (payload as CreateCategoryDto);
}

async function addOrUpdateCategory(
  values: CreateCategoryDto | UpdateCategoryDto,
) {
  const payload = buildCategoryPayload(values);

  await ('id' in payload && typeof payload.id === 'number'
    ? contentCategoryUpdateApi(payload as UpdateCategoryDto)
    : contentCategoryCreateApi(payload as CreateCategoryDto));
  useMessage.success('操作成功');
  await gridApi.reload();
}

/**
 * 删除分类
 */
async function deleteCategory(row: CategoryRow) {
  await contentCategoryDeleteApi({
    id: row.id,
  });
  handleSuccessReload();
}

async function confirmDeleteCategory(row: CategoryRow) {
  const confirmed = await useConfirm({
    content: '确认删除当前项?',
    successMessage: false,
  });
  if (!confirmed) return;

  await deleteCategory(row);
}

function getCategoryActions(row: CategoryRow): ActionItem[] {
  return [
    {
      key: 'edit',
      onClick: () => openFormModal(row),
      text: '编辑',
    },
    {
      danger: true,
      disabled: !!row.isEnabled,
      key: 'delete',
      onClick: () => confirmDeleteCategory(row),
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
          :model-value="row.isEnabled!"
          @change="toggleEnableStatus(row)"
        />
      </template>

      <template #actions="{ row }">
        <VbenTableAction align="center" :actions="getCategoryActions(row)" />
      </template>
    </Grid>

    <!-- 复用模块化的表单 schema -->
    <Form :schema="formSchema" :on-submit="addOrUpdateCategory" />
  </Page>
</template>

<style scoped></style>
