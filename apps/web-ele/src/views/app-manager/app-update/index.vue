<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type { AppUpdateFormValues } from './model/shared';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AppUpdateReleaseListItemDto,
  CreateAppUpdateReleaseDto,
  UpdateAppUpdateReleaseDto,
} from '#/api/types';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  appUpdateCreateApi,
  appUpdateDetailApi,
  appUpdatePageApi,
  appUpdateUpdateApi,
  appUpdateUpdateStatusApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import RecordDetailModal from '#/components/record-detail-modal';
import { useMessage } from '#/hooks/useFeedback';
import { formatUTC } from '#/utils';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailSections } from './model/detail';
import {
  appUpdateColumns,
  appUpdateFilter,
  buildAppUpdateSubmitPayload,
  formSchema,
  mapAppUpdateDetailToFormValues,
} from './model/shared';

type AppUpdateReleaseRow = AppUpdateReleaseListItemDto & {
  loading?: boolean;
};

const gridOptions: VxeGridProps<AppUpdateReleaseRow> = {
  columns: appUpdateColumns,
  height: 'auto',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const { startDate, endDate, ...restFormValues } = formValues;
        return await appUpdatePageApi(
          formatQuery({
            page,
            formValues: {
              ...restFormValues,
              startDate,
              endDate,
            },
            sorts,
          }),
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
  formOptions: createSearchFormOptions(appUpdateFilter),
  gridOptions,
});

async function openFormModal(row?: AppUpdateReleaseRow) {
  let record;
  if (row) {
    record = mapAppUpdateDetailToFormValues(
      await appUpdateDetailApi({ id: row.id }),
    );
  }
  formApi.setData({ title: '版本更新', record, width: 900 }).open();
}

async function handleSubmit(values: AppUpdateFormValues) {
  const payload = buildAppUpdateSubmitPayload(values);

  await ('id' in payload && typeof payload.id === 'number'
    ? appUpdateUpdateApi(payload as UpdateAppUpdateReleaseDto)
    : appUpdateCreateApi(payload as CreateAppUpdateReleaseDto));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function togglePublishStatus(record: AppUpdateReleaseRow) {
  record.loading = true;
  try {
    await appUpdateUpdateStatusApi({
      id: record.id,
      isPublished: !record.isPublished,
    });
    useMessage.success(record.isPublished ? '取消发布成功' : '发布成功');
    gridApi.reload();
  } finally {
    record.loading = false;
  }
}

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: RecordDetailModal,
  title: '版本更新详情',
});

function getAppUpdateActions(row: AppUpdateReleaseRow): ActionItem[] {
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

      <template #versionName="{ row }">
        <el-text
          class="cursor-pointer hover:opacity-50"
          type="primary"
          @click="detailApi.setData({ id: row.id }).open()"
        >
          {{ row.versionName }}
        </el-text>
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

      <template #publishedAt="{ row }">
        <el-text>
          {{
            row.publishedAt
              ? formatUTC(row.publishedAt, 'YYYY-MM-DD HH:mm:ss')
              : '-'
          }}
        </el-text>
      </template>

      <template #actions="{ row }">
        <VbenTableAction align="center" :actions="getAppUpdateActions(row)" />
      </template>
    </Grid>

    <Form :schema="formSchema" :on-submit="handleSubmit" />

    <DetailModal
      :api="appUpdateDetailApi"
      :sections="getDetailSections"
      class="w-[900px]"
    />
  </Page>
</template>
