<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  CreateForumSectionDto,
  UpdateForumSectionDto,
} from '#/apis/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  sectionsCreateApi,
  sectionsDeleteApi,
  sectionsDetailApi,
  sectionsPageApi,
  sectionsUpdateApi,
  sectionsUpdateEnabledApi,
} from '#/apis';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailCards } from './detail';
import { formSchema, sectionColumns, sectionFilter } from './shared';

const gridOptions: VxeGridProps<CreateForumSectionDto> = {
  columns: sectionColumns,
  height: 'auto',
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await sectionsPageApi({
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
  formOptions: createSearchFormOptions(sectionFilter),
  gridOptions,
});

async function openFormModal(row?: CreateForumSectionDto) {
  let record;
  if (row) {
    record = await sectionsDetailApi({ id: row.id });
  }
  formApi.setData({ title: '板块配置', record }).open();
}

async function handleSubmit(
  values: CreateForumSectionDto | UpdateForumSectionDto,
) {
  await (values?.id
    ? sectionsUpdateApi(values as UpdateForumSectionDto)
    : sectionsCreateApi(values as CreateForumSectionDto));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function deleteSection(record: CreateForumSectionDto) {
  await sectionsDeleteApi({ id: record.id });
  useMessage.success('操作成功');
  gridApi.reload();
}

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
});

async function toggleEnableStatus(record: CreateForumSectionDto) {
  record.loading = true;
  await sectionsUpdateEnabledApi({
    id: record.id,
    isEnabled: record.isEnabled,
  });
  record.loading = false;
  useMessage.success('操作成功');
  gridApi.reload();
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
          :inactive-value="row.isEnabled"
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
            title="确认删除当前项?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="deleteSection(row)"
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
      title="板块详情"
      :api="sectionsDetailApi"
      :cards="getDetailCards"
      class="!w-[800px]"
    />
  </Page>
</template>

<style scoped></style>
