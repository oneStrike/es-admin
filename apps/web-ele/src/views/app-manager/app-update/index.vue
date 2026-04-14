<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AppUpdateReleaseListItemDto,
  CreateAppUpdateReleaseDto,
  UpdateAppUpdateReleaseDto,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  appUpdateCreateApi,
  appUpdateDetailApi,
  appUpdatePageApi,
  appUpdateUpdateApi,
  appUpdateUpdateStatusApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { formatUTC } from '#/utils';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailCards } from './model/detail';
import {
  appUpdateColumns,
  appUpdateFilter,
  buildAppUpdateSubmitPayload,
  formSchema,
  mapAppUpdateDetailToFormValues,
} from './model/shared';

const gridOptions: VxeGridProps<AppUpdateReleaseListItemDto> = {
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

async function openFormModal(row?: AppUpdateReleaseListItemDto) {
  let record;
  if (row) {
    record = mapAppUpdateDetailToFormValues(
      await appUpdateDetailApi({ id: row.id }),
    );
  }
  formApi.setData({ title: '版本更新', record, width: 900 }).open();
}

async function handleSubmit(
  values: CreateAppUpdateReleaseDto | UpdateAppUpdateReleaseDto,
) {
  const raw = buildAppUpdateSubmitPayload(values as Record<string, any>);

  await ('id' in raw && typeof raw.id === 'number'
    ? appUpdateUpdateApi(raw as UpdateAppUpdateReleaseDto)
    : appUpdateCreateApi(raw as CreateAppUpdateReleaseDto));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function togglePublishStatus(record: AppUpdateReleaseListItemDto) {
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
  connectedComponent: EsRecordDetail,
  title: '版本更新详情',
});
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
          @click="detailApi.setData({ recordId: row.id }).open()"
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
        </div>
      </template>
    </Grid>

    <Form :schema="formSchema" :on-submit="handleSubmit" />

    <DetailModal
      :api="appUpdateDetailApi"
      :cards="getDetailCards"
      class="!w-[900px]"
    />
  </Page>
</template>
