<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AuditForumModeratorApplicationDto,
  ForumModeratorApplicationDto,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  forumModeratorApplicationAuditApi,
  forumModeratorApplicationDeleteApi,
  forumModeratorApplicationDetailApi,
  forumModeratorApplicationPageApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailCards } from './model/detail';
import {
  applicationColumns,
  auditFormSchema,
  fetchApplicationOptions,
  searchFormSchema,
} from './model/shared';

defineOptions({
  name: 'ForumModeratorApplication',
});

void fetchApplicationOptions();

const gridOptions: VxeGridProps<ForumModeratorApplicationDto> = {
  columns: applicationColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const { dateRange, ...restFormValues } = formValues || {};
        const [startDate, endDate] = Array.isArray(dateRange) ? dateRange : [];

        return await forumModeratorApplicationPageApi(
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

const [AuditForm, auditFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
  title: '版主申请详情',
});

async function openAuditModal(row: ForumModeratorApplicationDto) {
  const detail = await forumModeratorApplicationDetailApi({ id: row.id });

  auditFormApi
    .setData({
      cols: 1,
      record: {
        auditReason: detail.auditReason ?? '',
        id: detail.id,
        remark: detail.remark ?? '',
        status: detail.status === 0 ? 1 : detail.status,
      },
      schema: auditFormSchema,
      title: '版主申请',
      width: 760,
    })
    .open();
}

async function handleAuditSubmit(values: Record<string, any>) {
  if (values.status === 2 && !values.auditReason?.trim?.()) {
    useMessage.warning('拒绝申请时请填写审核意见');
    throw new Error('missing audit reason');
  }

  await forumModeratorApplicationAuditApi({
    auditReason: values.auditReason?.trim?.() || undefined,
    id: Number(values.id),
    remark: values.remark?.trim?.() || undefined,
    status: Number(values.status) as 1 | 2,
  } satisfies AuditForumModeratorApplicationDto);

  useMessage.success('审核成功');
  await gridApi.reload();
}

async function deleteApplication(row: ForumModeratorApplicationDto) {
  await forumModeratorApplicationDeleteApi({ id: row.id });
  useMessage.success('删除成功');
  await gridApi.reload();
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
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
          <el-button link type="primary" @click="openAuditModal(row)">
            审核
          </el-button>
          <el-divider direction="vertical" />
          <el-popconfirm
            title="确认删除当前申请记录?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="deleteApplication(row)"
          >
            <template #reference>
              <el-button link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </Grid>

    <AuditForm :schema="auditFormSchema" :on-submit="handleAuditSubmit" />

    <DetailModal
      :api="forumModeratorApplicationDetailApi"
      :cards="getDetailCards"
      class="!w-[980px]"
    />
  </Page>
</template>

<style scoped></style>
