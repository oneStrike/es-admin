<script lang="ts" setup>
import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type {
  BaseSensitiveWordDto,
  ForumSensitiveWordCreateRequest,
  ForumSensitiveWordUpdateRequest,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { toApiPageIndex, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  forumSensitiveWordCreateApi,
  forumSensitiveWordDeleteApi,
  forumSensitiveWordPageApi,
  forumSensitiveWordUpdateApi,
  forumSensitiveWordUpdateStatusApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import {
  formSchema,
  pageColumns,
  searchFormSchema,
} from './modules/model/shared';

const router = useRouter();

const gridOptions: VxeGridProps<BaseSensitiveWordDto> = {
  columns: pageColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await forumSensitiveWordPageApi({
          pageIndex: toApiPageIndex(page.currentPage),
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
    sort: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(searchFormSchema),
  gridOptions,
});

const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

async function openFormModal(row?: BaseSensitiveWordDto) {
  formApi.setData({ title: '敏感词', record: row }).open();
}

async function handleSubmit(
  values: ForumSensitiveWordCreateRequest | ForumSensitiveWordUpdateRequest,
) {
  await (values?.id
    ? forumSensitiveWordUpdateApi(values as ForumSensitiveWordUpdateRequest)
    : forumSensitiveWordCreateApi(values as ForumSensitiveWordCreateRequest));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function deleteSensitiveWord(record: BaseSensitiveWordDto) {
  await forumSensitiveWordDeleteApi({ id: record.id });
  useMessage.success('删除成功');
  gridApi.reload();
}

async function toggleEnableStatus(record: BaseSensitiveWordDto) {
  record.loading = true;
  try {
    await forumSensitiveWordUpdateStatusApi({
      id: record.id,
      isEnabled: !record.isEnabled,
    });
    useMessage.success('操作成功');
    gridApi.reload();
  } finally {
    record.loading = false;
  }
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <el-button class="ml-2" type="primary" @click="openFormModal()">
          添加敏感词
        </el-button>
        <el-button
          class="ml-2"
          @click="router.push({ name: 'ForumSensitiveWordStatistics' })"
        >
          统计信息
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
          <el-button link type="primary" @click="openFormModal(row)">
            编辑
          </el-button>
          <el-divider direction="vertical" />
          <el-popconfirm
            title="确认删除当前敏感词?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="deleteSensitiveWord(row)"
          >
            <template #reference>
              <el-button link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </Grid>

    <Form :schema="formSchema" :on-submit="handleSubmit" />
  </Page>
</template>

<style scoped></style>
