<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  CreateForumSectionGroupDto,
  UpdateForumSectionGroupDto,
} from '#/apis/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  sectionGroupsCreateApi,
  sectionGroupsDeleteApi,
  sectionGroupsDetailApi,
  sectionGroupsPageApi,
  sectionGroupsSwapSortOrderApi,
  sectionGroupsUpdateApi,
} from '#/apis';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailCards } from './detail';
import { formSchema, sectionGroupColumns, sectionGroupFilter } from './shared';

const gridOptions: VxeGridProps<CreateForumSectionGroupDto> = {
  columns: sectionGroupColumns,
  height: 'auto',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await sectionGroupsPageApi(
          formatQuery({
            page,
            sorts,
            formValues,
          }),
        );
      },
    },
    sort: true,
  },
  rowConfig: {
    drag: true,
  },
  rowDragConfig: {
    async dragEndMethod(params) {
      await sectionGroupsSwapSortOrderApi({
        dragId: params.dragRow.id,
        targetId: params.newRow.id,
      });
      useMessage.success('交换成功');
      await gridApi.reload();
      return true;
    },
  },
};

const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(sectionGroupFilter),
  gridOptions,
});

async function openFormModal(row?: CreateForumSectionGroupDto) {
  let record;
  if (row) {
    record = await sectionGroupsDetailApi({ id: row.id });
  }
  formApi.setData({ title: '板块组配置', record }).open();
}

async function handleSubmit(
  values: CreateForumSectionGroupDto | UpdateForumSectionGroupDto,
) {
  await (values?.id
    ? sectionGroupsUpdateApi(values as UpdateForumSectionGroupDto)
    : sectionGroupsCreateApi(values as CreateForumSectionGroupDto));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function deleteSectionGroup(record: CreateForumSectionGroupDto) {
  await sectionGroupsDeleteApi({ id: record.id });
  useMessage.success('操作成功');
  gridApi.reload();
}

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
});

async function toggleEnableStatus(record: CreateForumSectionGroupDto) {
  record.loading = true;
  await sectionGroupsUpdateApi({
    id: record.id,
    isEnabled: !record.isEnabled,
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
            @confirm="deleteSectionGroup(row)"
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
      :api="sectionGroupsDetailApi"
      :cards="getDetailCards"
      class="!w-[800px]"
    />
  </Page>
</template>

<style scoped></style>
