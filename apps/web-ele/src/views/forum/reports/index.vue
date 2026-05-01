<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { AdminReportPageItemDto, ReportHandleRequest } from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import { reportDetailApi, reportHandleApi, reportPageApi } from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailCards } from './model/detail';
import {
  handleFormSchema,
  pageColumns,
  searchFormSchema,
} from './model/shared';

defineOptions({
  name: 'ForumReports',
});

const gridOptions: VxeGridProps<AdminReportPageItemDto> = {
  columns: pageColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const { dateRange, ...restFormValues } = formValues || {};
        const [startDate, endDate] = Array.isArray(dateRange) ? dateRange : [];

        return await reportPageApi(
          formatQuery({
            page,
            formValues: {
              ...restFormValues,
              endDate,
              startDate,
            },
            sorts,
          }),
        );
      },
    },
    sort: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(searchFormSchema),
  gridOptions,
});

const [HandleForm, handleFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
  title: '举报详情',
});

function canHandleReport(row: AdminReportPageItemDto) {
  return row.status !== 3 && row.status !== 4;
}

function openHandleModal(row: AdminReportPageItemDto) {
  handleFormApi
    .setData({
      cols: 1,
      record: {
        handlingNote: row.handlingNote ?? '',
        id: row.id,
        status: 3,
      },
      schema: handleFormSchema,
      title: '处理举报',
      width: 720,
    })
    .open();
}

async function handleReportSubmit(values: Record<string, any>) {
  const status = Number(values.status) as 3 | 4;

  if (status !== 3 && status !== 4) {
    useMessage.warning('请选择有效处理结果');
    throw new Error('invalid report status');
  }

  await reportHandleApi({
    handlingNote: values.handlingNote?.trim?.() || undefined,
    id: Number(values.id),
    status,
  } satisfies ReportHandleRequest);
  handleFormApi.close();
  useMessage.success('处理成功');
  await gridApi.reload();
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #evidence="{ row }">
        <el-image
          v-if="row.evidenceUrl"
          :preview-src-list="[row.evidenceUrl]"
          :src="row.evidenceUrl"
          class="h-9 w-9 rounded"
          fit="cover"
          preview-teleported
        />
        <span v-else>-</span>
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
          <el-button
            :disabled="!canHandleReport(row)"
            link
            type="primary"
            @click="openHandleModal(row)"
          >
            处理
          </el-button>
        </div>
      </template>
    </Grid>

    <HandleForm :schema="handleFormSchema" :on-submit="handleReportSubmit" />

    <DetailModal
      :api="reportDetailApi"
      :cards="getDetailCards"
      class="!w-[960px]"
    />
  </Page>
</template>

<style scoped></style>
