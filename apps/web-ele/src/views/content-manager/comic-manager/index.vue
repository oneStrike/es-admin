<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  BaseComicDto,
  ComicCreateRequest,
  ComicUpdateRequest,
} from '#/apis/types/comic';

import { Page, useVbenModal } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  comicCreateApi,
  comicDeleteApi,
  comicDetailApi,
  comicPageApi,
  comicUpdateApi,
} from '#/apis';
import EsModalForm from '#/components/es-modal-form/index.vue';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import ComicDetail from './detail.vue';
import { formSchema, pageColumns, pageFilter } from './shared';

const gridOptions: VxeGridProps<BaseComicDto> = {
  columns: pageColumns,
  height: 'auto',
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await comicPageApi({
          pageIndex: --page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
    sort: true,
  },
};

const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(pageFilter),
  gridOptions,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: ComicDetail,
});

async function openFormModal(row?: BaseComicDto) {
  let record;
  if (row) {
    record = await comicDetailApi({ id: row.id });
  }
  formApi.setData({ title: '漫画管理', record }).open();
}

async function handleSubmit(values: ComicCreateRequest | ComicUpdateRequest) {
  await (values?.id
    ? comicUpdateApi(values as ComicUpdateRequest)
    : comicCreateApi(values as ComicCreateRequest));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function deleteComic(record: BaseComicDto) {
  await comicDeleteApi({ id: record.id });
  useMessage.success('删除成功');
  gridApi.reload();
}

async function toggleStatus(record: BaseComicDto, field: keyof BaseComicDto) {
  record.loading = true;
  const newValue = !record[field];
  await comicUpdateApi({
    id: record.id,
    [field]: newValue,
  });
  record.loading = false;
  useMessage.success('操作成功');
  gridApi.reload();
}

async function togglePublishStatus(record: BaseComicDto) {
  await toggleStatus(record, 'isPublished');
}

async function toggleRecommendedStatus(record: BaseComicDto) {
  await toggleStatus(record, 'isRecommended');
}

async function toggleHotStatus(record: BaseComicDto) {
  await toggleStatus(record, 'isHot');
}

async function toggleNewStatus(record: BaseComicDto) {
  await toggleStatus(record, 'isNew');
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <el-button class="ml-2" type="primary" @click="openFormModal()">
          添加漫画
        </el-button>
      </template>

      <template #isPublished="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.loading"
          :model-value="row.isPublished"
          @change="togglePublishStatus(row)"
        />
      </template>

      <template #isRecommended="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.loading"
          :model-value="row.isRecommended"
          @change="toggleRecommendedStatus(row)"
        />
      </template>

      <template #isHot="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.loading"
          :model-value="row.isHot"
          @change="toggleHotStatus(row)"
        />
      </template>

      <template #isNew="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.loading"
          :model-value="row.isNew"
          @change="toggleNewStatus(row)"
        />
      </template>

      <template #actions="{ row }">
        <div class="my-1">
          <el-button
            link
            type="primary"
            @click="detailApi.setData({ recordId: row.id }).open()"
          >
            查看
          </el-button>
          <el-divider direction="vertical" />
          <el-button link type="primary" @click="openFormModal(row)">
            编辑
          </el-button>
          <el-divider direction="vertical" />
          <el-popconfirm
            title="确认删除当前漫画?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="deleteComic(row)"
          >
            <template #reference>
              <el-button link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </Grid>

    <Form :schema="formSchema" :on-submit="handleSubmit" />

    <DetailModal />
  </Page>
</template>

<style scoped></style>
