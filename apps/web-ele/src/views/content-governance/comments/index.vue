<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AdminCommentPageItemDto,
  CommentUpdateAuditStatusRequest,
  CommentUpdateHiddenRequest,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  commentDetailApi,
  commentPageApi,
  commentUpdateAuditStatusApi,
  commentUpdateHiddenApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailCards } from './model/detail';
import {
  auditFormSchema,
  formatCommentTargetExtra,
  formatCommentTargetTitle,
  formatReplyCommentSummary,
  pageColumns,
  resolveCommentTargetState,
  resolveReplyCommentState,
  searchFormSchema,
  targetTypeMap,
  userStatusMap,
} from './model/shared';

defineOptions({
  name: 'ContentGovernanceComments',
});

type CommentRow = AdminCommentPageItemDto & {
  hiddenLoading?: boolean;
};

const gridOptions: VxeGridProps<CommentRow> = {
  columns: pageColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const { dateRange, ...restFormValues } = formValues || {};
        const [startDate, endDate] = Array.isArray(dateRange) ? dateRange : [];

        return await commentPageApi(
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
  title: '评论详情',
});

function openAuditModal(row: CommentRow) {
  auditFormApi
    .setData({
      cols: 1,
      record: {
        auditReason: row.auditReason ?? '',
        auditStatus: row.auditStatus,
        id: row.id,
      },
      schema: auditFormSchema,
      title: '评论审核',
      width: 720,
    })
    .open();
}

async function handleAuditSubmit(values: Record<string, any>) {
  const auditStatus = Number(values.auditStatus) as 0 | 1 | 2;
  const auditReason = values.auditReason?.trim?.() || undefined;

  if (auditStatus === 2 && !auditReason) {
    useMessage.warning('拒绝时请填写审核意见');
    throw new Error('missing audit reason');
  }

  await commentUpdateAuditStatusApi({
    auditReason,
    auditStatus,
    id: Number(values.id),
  } satisfies CommentUpdateAuditStatusRequest);
  auditFormApi.close();
  useMessage.success('审核成功');
  await gridApi.reload();
}

async function toggleHiddenStatus(row: CommentRow) {
  row.hiddenLoading = true;
  try {
    await commentUpdateHiddenApi({
      id: row.id,
      isHidden: !row.isHidden,
    } satisfies CommentUpdateHiddenRequest);
    useMessage.success('操作成功');
    await gridApi.reload();
  } finally {
    row.hiddenLoading = false;
  }
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #user="{ row }">
        <div class="flex min-w-0 items-center gap-2">
          <el-avatar
            v-if="row.user?.avatarUrl"
            :size="28"
            :src="row.user.avatarUrl"
          />
          <div class="min-w-0">
            <div class="truncate text-sm">
              {{ row.user?.nickname || '未知用户' }}
            </div>
            <div
              class="flex flex-wrap items-center gap-1 text-xs text-gray-400"
            >
              <el-tag
                v-if="row.user"
                :type="userStatusMap[row.user.status]?.color || 'info'"
                size="small"
              >
                {{ userStatusMap[row.user.status]?.label || '未知状态' }}
              </el-tag>
              <el-tag
                v-if="row.user && !row.user.isEnabled"
                size="small"
                type="danger"
              >
                禁用
              </el-tag>
            </div>
          </div>
        </div>
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
            {{ formatCommentTargetTitle(row.targetSummary) }}
          </div>
          <div class="mt-1 flex flex-wrap items-center gap-1 text-xs">
            <el-tag
              :type="resolveCommentTargetState(row.targetSummary).color"
              size="small"
            >
              {{ resolveCommentTargetState(row.targetSummary).label }}
            </el-tag>
          </div>
        </div>
        <span v-else>-</span>
      </template>

      <template #targetExtra="{ row }">
        <span v-if="row.targetSummary" class="text-sm text-gray-500">
          {{ formatCommentTargetExtra(row.targetSummary) }}
        </span>
        <span v-else>-</span>
      </template>

      <template #replyToSummary="{ row }">
        <div v-if="row.replyToSummary" class="min-w-0">
          <div class="truncate text-sm">
            {{ formatReplyCommentSummary(row.replyToSummary) }}
          </div>
          <div class="mt-1 flex flex-wrap items-center gap-1 text-xs">
            <el-tag
              :type="resolveReplyCommentState(row.replyToSummary).color"
              size="small"
            >
              {{ resolveReplyCommentState(row.replyToSummary).label }}
            </el-tag>
            <el-tag
              v-if="row.replyToSummary.userStatus"
              :type="
                userStatusMap[row.replyToSummary.userStatus]?.color || 'info'
              "
              size="small"
            >
              {{
                userStatusMap[row.replyToSummary.userStatus]?.label ||
                '未知用户状态'
              }}
            </el-tag>
          </div>
        </div>
        <span v-else>-</span>
      </template>

      <template #sensitiveWords="{ row }">
        <div v-if="row.sensitiveWordHits?.length" class="flex flex-wrap gap-1">
          <el-tag
            v-for="hit in row.sensitiveWordHits.slice(0, 2)"
            :key="`${hit.word}-${hit.start}-${hit.end}`"
            size="small"
            type="warning"
          >
            {{ hit.word }}
          </el-tag>
          <span
            v-if="row.sensitiveWordHits.length > 2"
            class="text-xs text-gray-400"
          >
            +{{ row.sensitiveWordHits.length - 2 }}
          </span>
        </div>
        <span v-else>-</span>
      </template>

      <template #isHidden="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.hiddenLoading"
          :model-value="row.isHidden"
          @change="toggleHiddenStatus(row)"
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
          <el-button link type="primary" @click="openAuditModal(row)">
            审核
          </el-button>
        </div>
      </template>
    </Grid>

    <AuditForm :schema="auditFormSchema" :on-submit="handleAuditSubmit" />

    <DetailModal
      :api="commentDetailApi"
      :cards="getDetailCards"
      class="w-[960px]"
    />
  </Page>
</template>

<style scoped></style>
