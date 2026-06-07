<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { AdminReportPageItemDto, ReportHandleRequest } from '#/api/types';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import { reportDetailApi, reportHandleApi, reportPageApi } from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import RecordDetailModal from '#/components/record-detail-modal';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailSections } from './model/detail';
import {
  formatActorSummary,
  formatReporterSummary,
  formatReportTargetExtra,
  formatReportTargetTitle,
  formatSceneExtra,
  formatSceneTitle,
  handleFormSchema,
  pageColumns,
  resolveReporterState,
  resolveReportTargetState,
  sceneTypeMap,
  searchFormSchema,
  targetTypeMap,
} from './model/shared';

defineOptions({
  name: 'ContentGovernanceReports',
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
  connectedComponent: RecordDetailModal,
  title: '举报详情',
});

type ReportHandleFormValues = Partial<
  Pick<ReportHandleRequest, 'handlingNote' | 'id' | 'status'>
>;

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

async function handleReportSubmit(values: ReportHandleFormValues) {
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

function getReportActions(row: AdminReportPageItemDto): ActionItem[] {
  return [
    {
      key: 'detail',
      text: '详情',
      onClick: () => detailApi.setData({ id: row.id }).open(),
    },
    {
      disabled: !canHandleReport(row),
      key: 'handle',
      text: '处理',
      onClick: () => openHandleModal(row),
    },
  ];
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #reporterSummary="{ row }">
        <div v-if="row.reporterSummary" class="flex min-w-0 items-center gap-2">
          <el-avatar
            v-if="row.reporterSummary.avatarUrl"
            :size="28"
            :src="row.reporterSummary.avatarUrl"
          />
          <div class="min-w-0">
            <div class="truncate text-sm">
              {{ formatReporterSummary(row.reporterSummary) }}
            </div>
            <div class="mt-1 flex flex-wrap items-center gap-1 text-xs">
              <el-tag
                :type="resolveReporterState(row.reporterSummary).color"
                size="small"
              >
                {{ resolveReporterState(row.reporterSummary).label }}
              </el-tag>
            </div>
          </div>
        </div>
        <span v-else>-</span>
      </template>

      <template #targetType="{ row }">
        <el-tag v-if="row.targetSummary" size="small">
          {{
            row.targetSummary.targetTypeName ||
            targetTypeMap[row.targetSummary.targetType]?.label ||
            '目标'
          }}
        </el-tag>
        <span v-else>-</span>
      </template>

      <template #targetTitle="{ row }">
        <div v-if="row.targetSummary" class="min-w-0">
          <div class="truncate text-sm">
            {{ formatReportTargetTitle(row.targetSummary) }}
          </div>
          <div class="mt-1 flex flex-wrap items-center gap-1 text-xs">
            <el-tag
              :type="resolveReportTargetState(row.targetSummary).color"
              size="small"
            >
              {{ resolveReportTargetState(row.targetSummary).label }}
            </el-tag>
          </div>
        </div>
        <span v-else>-</span>
      </template>

      <template #targetExtra="{ row }">
        <span v-if="row.targetSummary" class="text-sm text-gray-500">
          {{ formatReportTargetExtra(row.targetSummary) }}
        </span>
        <span v-else>-</span>
      </template>

      <template #sceneType="{ row }">
        <el-tag v-if="row.sceneSummary" size="small">
          {{
            row.sceneSummary.sceneTypeName ||
            sceneTypeMap[row.sceneSummary.sceneType]?.label ||
            '场景'
          }}
        </el-tag>
        <span v-else>-</span>
      </template>

      <template #sceneTitle="{ row }">
        <div v-if="row.sceneSummary" class="min-w-0">
          <div class="truncate text-sm">
            {{ formatSceneTitle(row.sceneSummary) }}
          </div>
        </div>
        <span v-else>-</span>
      </template>

      <template #sceneExtra="{ row }">
        <span v-if="row.sceneSummary" class="text-sm text-gray-500">
          {{ formatSceneExtra(row.sceneSummary) }}
        </span>
        <span v-else>-</span>
      </template>

      <template #handlerSummary="{ row }">
        <div v-if="row.handlerSummary" class="min-w-0">
          <div class="truncate text-sm">
            {{ formatActorSummary(row.handlerSummary) }}
          </div>
          <div
            v-if="row.handlerSummary.roleName"
            class="mt-1 truncate text-xs text-gray-400"
          >
            {{ row.handlerSummary.roleName }}
          </div>
        </div>
        <span v-else>-</span>
      </template>

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
        <VbenTableAction align="center" :actions="getReportActions(row)" />
      </template>
    </Grid>

    <HandleForm :schema="handleFormSchema" :on-submit="handleReportSubmit" />

    <DetailModal
      :api="reportDetailApi"
      :sections="getDetailSections"
      class="w-[960px]"
    />
  </Page>
</template>

<style scoped></style>
