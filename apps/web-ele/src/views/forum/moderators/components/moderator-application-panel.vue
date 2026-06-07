<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AuditForumModeratorApplicationDto,
  ForumModeratorApplicationDto,
} from '#/api/types';

import { useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  forumModeratorApplicationAuditApi,
  forumModeratorApplicationDeleteApi,
  forumModeratorApplicationDetailApi,
  forumModeratorApplicationPageApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import RecordDetailModal from '#/components/record-detail-modal';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailSections } from '../model/application/detail';
import {
  applicationColumns,
  auditFormSchema,
  fetchApplicationOptions,
  formatApplicationSection,
  formatApplicationUser,
  searchFormSchema,
} from '../model/application/shared';

const emit = defineEmits<{
  approved: [];
}>();

void fetchApplicationOptions();

const applicationGridOptions: VxeGridProps<ForumModeratorApplicationDto> = {
  columns: applicationColumns,
  height: '100%',
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

const [ApplicationGrid, applicationGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(searchFormSchema),
  gridOptions: applicationGridOptions,
});

const [AuditForm, auditFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: RecordDetailModal,
  title: '版主申请详情',
});

type ModeratorAuditFormValues = Partial<
  Pick<AuditForumModeratorApplicationDto, 'auditReason' | 'id' | 'remark'> & {
    status: 1 | 2 | number | string;
  }
>;

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

async function handleAuditSubmit(values: ModeratorAuditFormValues) {
  if (values.status === 2 && !values.auditReason?.trim?.()) {
    useMessage.warning('拒绝申请时请填写审核意见');
    throw new Error('missing audit reason');
  }

  const status = Number(values.status) as 1 | 2;

  await forumModeratorApplicationAuditApi({
    auditReason: values.auditReason?.trim?.() || undefined,
    id: Number(values.id),
    remark: values.remark?.trim?.() || undefined,
    status,
  } satisfies AuditForumModeratorApplicationDto);

  await applicationGridApi.reload();

  if (status === 1) {
    emit('approved');
    useMessage.success('审核成功，版主列表已同步刷新');
    return;
  }

  useMessage.success('审核成功');
}

async function deleteApplication(row: ForumModeratorApplicationDto) {
  await forumModeratorApplicationDeleteApi({ id: row.id });
  useMessage.success('删除成功');
  await applicationGridApi.reload();
}

async function confirmDeleteApplication(row: ForumModeratorApplicationDto) {
  const confirmed = await useConfirm({
    content: '确认删除当前申请记录?',
    successMessage: false,
  });
  if (!confirmed) return;

  await deleteApplication(row);
}

function getApplicationActions(
  row: ForumModeratorApplicationDto,
): ActionItem[] {
  const actions: ActionItem[] = [
    {
      key: 'detail',
      onClick: () => detailApi.setData({ id: row.id }).open(),
      text: '详情',
    },
    {
      danger: true,
      key: 'delete',
      onClick: () => confirmDeleteApplication(row),
      text: '删除',
    },
  ];

  if (row.status === 0) {
    actions.splice(1, 0, {
      key: 'audit',
      onClick: () => openAuditModal(row),
      text: '审核',
    });
  }

  return actions;
}

async function reload() {
  await applicationGridApi.reload();
}

defineExpose({
  reload,
});
</script>

<template>
  <div class="es-full-height-pane">
    <ApplicationGrid class="es-full-height-grid">
      <template #applicant="{ row }">
        <div v-if="row.applicant" class="flex min-w-0 items-center gap-2">
          <el-avatar
            v-if="row.applicant.avatarUrl"
            :size="28"
            :src="row.applicant.avatarUrl"
          />
          <div class="min-w-0">
            <div class="truncate text-sm">
              {{ formatApplicationUser(row.applicant) }}
            </div>
          </div>
        </div>
        <span v-else>-</span>
      </template>

      <template #section="{ row }">
        <span>{{ formatApplicationSection(row.section) }}</span>
      </template>

      <template #actions="{ row }">
        <VbenTableAction align="center" :actions="getApplicationActions(row)" />
      </template>
    </ApplicationGrid>

    <AuditForm :schema="auditFormSchema" :on-submit="handleAuditSubmit" />

    <DetailModal
      :api="forumModeratorApplicationDetailApi"
      :sections="getDetailSections"
      class="w-[980px]"
    />
  </div>
</template>
