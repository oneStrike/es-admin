<script setup lang="ts">
import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type { BaseTagDto, CreateTagDto, UpdateTagDto } from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

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
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils';

import { formSchema, tagColumns, tagSearchSchema } from './model/shared';

/**
 * 通用的成功处理：提示 + 刷新（遵循DRY原则封装重复逻辑）
 */
function handleSuccessReload(gridApi: any, message = '操作成功'): void {
  useMessage.success(message);
  gridApi.reload();
}

/**
 * VxeGrid 的选项配置：
 */
const gridOptions: VxeGridProps<BaseTagDto> = {
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
        return await contentTagPageApi(formatQuery({ page, formValues, sorts }));
      },
    },
    sort: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
  formOptions: createSearchFormOptions(tagSearchSchema, {
    showCollapseButton: false,
  }),
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
async function openFormModal(row?: BaseTagDto): Promise<void> {
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
async function toggleEnableStatus(row: BaseTagDto): Promise<void> {
  row.loading = true as any;
  await contentTagUpdateStatusApi({
    id: row.id,
    isEnabled: !row.isEnabled,
  });
  handleSuccessReload(gridApi);
  row.loading = false as any;
}

/**
 * 新增或更新标签
 */
type TagFormValues = CreateTagDto | UpdateTagDto;

async function addOrUpdateTag(values: TagFormValues): Promise<void> {
  await (values.id
    ? contentTagUpdateApi(values as UpdateTagDto)
    : contentTagCreateApi(values as CreateTagDto));
  useMessage.success('操作成功');
  await gridApi.reload();
}

/**
 * 删除标签
 */
async function deleteTag(row: BaseTagDto): Promise<void> {
  await contentTagDeleteApi({ id: row.id });
  handleSuccessReload(gridApi);
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
        <el-button link type="primary" @click="openFormModal(row)">
          编辑
        </el-button>
        <el-divider direction="vertical" />
        <el-popconfirm
          title="确认删除当前项?"
          confirm-button-text="确认"
          cancel-button-text="取消"
          @confirm="deleteTag(row)"
        >
          <template #reference>
            <el-button link type="danger" :disabled="!!row.isEnabled">
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </Grid>

    <!-- 复用模块化的表单 schema -->
    <Form :schema="formSchema" :on-submit="addOrUpdateTag" />
  </Page>
</template>

<style scoped></style>
