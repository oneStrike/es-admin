<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  BaseForumTagDto,
  ForumTagsCreateRequest,
  ForumTagsUpdateRequest,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  forumTagsCreateApi,
  forumTagsDeleteApi,
  forumTagsDetailApi,
  forumTagsPageApi,
  forumTagsUpdateApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailCards } from './model/detail';
import { formSchema, pageColumns, searchFormSchema } from './model/shared';

defineOptions({
  name: 'ForumTags',
});

const gridOptions: VxeGridProps<BaseForumTagDto> = {
  columns: pageColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await forumTagsPageApi(
          formatQuery({
            page,
            formValues,
            sorts,
          }),
        );
      },
    },
    sort: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(searchFormSchema, {
    showCollapseButton: false,
  }),
  gridOptions,
});

const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
  title: '话题详情',
});

async function openFormModal(row?: BaseForumTagDto) {
  let record: BaseForumTagDto | undefined;
  if (row) {
    record = await forumTagsDetailApi({ id: row.id });
  }
  formApi
    .setData({
      cols: 2,
      record,
      schema: formSchema,
      title: '话题',
      width: 960,
    })
    .open();
}

async function handleSubmit(
  values: ForumTagsCreateRequest | ForumTagsUpdateRequest,
) {
  await (values?.id
    ? forumTagsUpdateApi(values as ForumTagsUpdateRequest)
    : forumTagsCreateApi(values as ForumTagsCreateRequest));
  useMessage.success('操作成功');
  await gridApi.reload();
}

async function deleteTag(row: BaseForumTagDto) {
  await forumTagsDeleteApi({ id: row.id });
  useMessage.success('删除成功');
  await gridApi.reload();
}

async function toggleEnableStatus(row: BaseForumTagDto) {
  row.loading = true as any;
  try {
    await forumTagsUpdateApi({
      description: row.description ?? undefined,
      icon: row.icon ?? undefined,
      id: row.id,
      isEnabled: !row.isEnabled,
      name: row.name,
      sortOrder: row.sortOrder,
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
        <el-button class="ml-2" type="primary" @click="openFormModal()">
          添加话题
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
          <el-button
            link
            type="primary"
            @click="detailApi.setData({ recordId: row.id }).open()"
          >
            详情
          </el-button>
          <el-divider direction="vertical" />
          <el-button link type="primary" @click="openFormModal(row)">
            编辑
          </el-button>
          <el-divider direction="vertical" />
          <el-popconfirm
            title="确认删除当前话题?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="deleteTag(row)"
          >
            <template #reference>
              <el-button link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </Grid>

    <Form :schema="formSchema" :on-submit="handleSubmit" />

    <DetailModal
      :api="forumTagsDetailApi"
      :cards="getDetailCards"
      class="!w-[960px]"
    />
  </Page>
</template>

<style scoped></style>
