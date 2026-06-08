<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  BaseAppPageDto,
  CreateAppPageDto,
  UpdateAppPageDto,
} from '#/api/types';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  appPageCreateApi,
  appPageDeleteApi,
  appPageDetailApi,
  appPagePageApi,
  appPageUpdateApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import RecordDetailModal from '#/components/record-detail-modal';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailSections } from './model/detail';
import {
  accessLevelObj,
  formSchema,
  pageColumns,
  pageFilter,
} from './model/shared';

type AppPageRow = BaseAppPageDto & {
  loading?: boolean;
};

const gridOptions: VxeGridProps<AppPageRow> = {
  columns: pageColumns,
  height: 'auto',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const nextFormValues = { ...formValues };
        if (nextFormValues.enablePlatform) {
          nextFormValues.enablePlatform = JSON.stringify(
            nextFormValues.enablePlatform,
          );
        }
        return await appPagePageApi(
          formatQuery({ page, sorts, formValues: nextFormValues }),
        );
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

async function openFormModal(row?: AppPageRow) {
  let record;
  if (row) {
    record = await appPageDetailApi({ id: row.id });
  }
  formApi.setData({ title: '页面', record }).open();
}

function buildAppPagePayload(
  values: CreateAppPageDto | UpdateAppPageDto,
): CreateAppPageDto | UpdateAppPageDto {
  const payload = {
    code: values.code,
    path: values.path,
    name: values.name,
    title: values.title,
    accessLevel: values.accessLevel,
    isEnabled: values.isEnabled,
    enablePlatform: values.enablePlatform,
    description: values.description,
  };

  return 'id' in values && typeof values.id === 'number'
    ? ({ id: values.id, ...payload } as UpdateAppPageDto)
    : (payload as CreateAppPageDto);
}

async function handleSubmit(values: CreateAppPageDto | UpdateAppPageDto) {
  const payload = buildAppPagePayload(values);

  await ('id' in payload && typeof payload.id === 'number'
    ? appPageUpdateApi(payload as UpdateAppPageDto)
    : appPageCreateApi(payload as CreateAppPageDto));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function deletePage(record: AppPageRow) {
  await appPageDeleteApi({ ids: [record.id] });
  useMessage.success('操作成功');
  gridApi.reload();
}

async function confirmDeletePage(record: AppPageRow) {
  const confirmed = await useConfirm({
    content: '确认删除当前项?',
    successMessage: false,
  });
  if (!confirmed) return;

  await deletePage(record);
}

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: RecordDetailModal,
  title: '页面详情',
});

async function toggleEnableStatus(record: AppPageRow) {
  record.loading = true;
  try {
    await appPageUpdateApi({
      id: record.id,
      isEnabled: !record.isEnabled,
    });
    useMessage.success('操作成功');
    gridApi.reload();
  } finally {
    record.loading = false;
  }
}

function getPageActions(row: AppPageRow): ActionItem[] {
  return [
    {
      key: 'detail',
      text: '详情',
      onClick: () => detailApi.setData({ id: row.id }).open(),
    },
    {
      key: 'edit',
      text: '编辑',
      onClick: () => openFormModal(row),
    },
    {
      danger: true,
      key: 'delete',
      text: '删除',
      onClick: () => confirmDeletePage(row),
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

      <template #accessLevel="{ row }">
        <el-tag :type="accessLevelObj[row.accessLevel]?.tagType || 'info'">
          {{ accessLevelObj[row.accessLevel]?.label }}
        </el-tag>
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
        <VbenTableAction align="center" :actions="getPageActions(row)" />
      </template>
    </Grid>

    <Form :schema="formSchema" :on-submit="handleSubmit" />

    <DetailModal
      :api="appPageDetailApi"
      :sections="getDetailSections"
      class="w-[800px]"
    />
  </Page>
</template>

<style scoped></style>
