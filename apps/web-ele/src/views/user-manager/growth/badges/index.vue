<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';
import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type {
  BadgeUserPageItemDto,
  BaseUserBadgeDto,
  GrowthBadgesCreateRequest,
  GrowthBadgesUpdateRequest,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { ref } from 'vue';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  growthBadgesAssignApi,
  growthBadgesCreateApi,
  growthBadgesDeleteApi,
  growthBadgesDetailApi,
  growthBadgesPageApi,
  growthBadgesRevokeApi,
  growthBadgesUpdateApi,
  growthBadgesUpdateStatusApi,
  growthBadgesUserPageApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsModalTable from '#/components/es-modal-table';
import RecordDetailModal from '#/components/record-detail-modal';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions, formSchemaTransform } from '#/utils';
import { createAppUserTableSelectProps } from '#/views/user-manager/shared/app-user-select';

import { getDetailSections } from './modules/model/detail';
import {
  formSchema,
  pageColumns,
  searchFormSchema,
} from './modules/model/shared';

defineOptions({
  name: 'UserGrowthBadges',
});

const currentBadge = ref<BaseUserBadgeDto | null>(null);
type BadgeRow = BaseUserBadgeDto & {
  loading?: boolean;
};

const userListSchema: EsFormSchema = [
  { component: 'InputNumber', fieldName: 'userId', label: '用户ID' },
  { component: 'Input', fieldName: 'nickname', label: '昵称' },
  { component: 'Input', fieldName: 'level', label: '等级' },
];

// 徽章用户分页接口当前只支持按徽章上下文分页查询，不暴露用户筛选字段。
const userSearchSchema: EsFormSchema = [];

const userColumns = formSchemaTransform.toTableColumns<BadgeUserPageItemDto>(
  userListSchema,
  {
    userId: {
      formatter: ({ cellValue }) => cellValue ?? '-',
    },
    nickname: {
      formatter: ({ row }) => row.user?.nickname || '-',
      minWidth: 140,
    },
    level: {
      formatter: ({ row }) => row.user?.level ?? '-',
      minWidth: 140,
    },
    createdAt: {
      minWidth: 160,
      title: '获得时间',
    },
  },
);

const gridOptions: VxeGridProps<BadgeRow> = {
  columns: pageColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await growthBadgesPageApi(
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
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
  formOptions: createSearchFormOptions(searchFormSchema),
});

const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: RecordDetailModal,
  title: '徽章详情',
});

const [AssignModal, assignModalApi] = useVbenModal({
  connectedComponent: EsModalTable,
});

const [RevokeModal, revokeApi] = useVbenModal({
  connectedComponent: EsModalTable,
});

async function openFormModal(row?: BadgeRow) {
  let record;
  if (row) {
    record = await growthBadgesDetailApi({ id: row.id });
  }
  formApi.setData({ title: '徽章', record, schema: formSchema }).open();
}

function buildBadgePayload(
  values: GrowthBadgesCreateRequest | GrowthBadgesUpdateRequest,
): GrowthBadgesCreateRequest | GrowthBadgesUpdateRequest {
  const payload = {
    icon: values.icon,
    name: values.name,
    type: values.type,
    sortOrder: values.sortOrder,
    eventKey: values.eventKey,
    isEnabled: values.isEnabled,
    description: values.description,
  };

  return 'id' in values && typeof values.id === 'number'
    ? ({ id: values.id, ...payload } as GrowthBadgesUpdateRequest)
    : (payload as GrowthBadgesCreateRequest);
}

async function handleSubmit(
  values: GrowthBadgesCreateRequest | GrowthBadgesUpdateRequest,
) {
  const payload = buildBadgePayload(values);

  await ('id' in payload && typeof payload.id === 'number'
    ? growthBadgesUpdateApi(payload as GrowthBadgesUpdateRequest)
    : growthBadgesCreateApi(payload as GrowthBadgesCreateRequest));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function deleteBadge(record: BadgeRow) {
  await growthBadgesDeleteApi({ id: record.id });
  useMessage.success('删除成功');
  gridApi.reload();
}

async function confirmDeleteBadge(record: BadgeRow) {
  const confirmed = await useConfirm({
    content: '确认删除当前徽章?',
    successMessage: false,
  });
  if (!confirmed) return;

  await deleteBadge(record);
}

async function toggleEnableStatus(record: BadgeRow) {
  record.loading = true;
  try {
    await growthBadgesUpdateStatusApi({
      id: record.id,
      isEnabled: !record.isEnabled,
    });
    useMessage.success('操作成功');
    gridApi.reload();
  } finally {
    record.loading = false;
  }
}

function openAssignModal(record: BadgeRow) {
  currentBadge.value = record;
  const userSelectProps = createAppUserTableSelectProps({
    enabledOnly: true,
    multiple: true,
    title: `分配徽章用户 - ${record.name}`,
  });

  assignModalApi
    .setData({
      api: userSelectProps.api,
      columns: userSelectProps.columns,
      displayField: userSelectProps.displayField,
      keyField: userSelectProps.keyField,
      multipleLimit: 50,
      searchSchema: createSearchFormOptions(userSelectProps.searchSchema),
      selectionMode: 'multiple',
      title: userSelectProps.title,
      width: userSelectProps.width,
    })
    .open();
}

function openRevokeModal(record: BadgeRow) {
  currentBadge.value = record;
  revokeApi
    .setData({
      title: `撤销徽章用户 - ${record.name}`,
      columns: userColumns,
      api: (params: Record<string, unknown>) =>
        growthBadgesUserPageApi({ ...params, badgeId: record.id }),
      selectionMode: 'multiple',
      multipleLimit: 50,
      searchSchema: createSearchFormOptions(userSearchSchema),
    })
    .open();
}

async function handleAssignConfirm(rows: Array<{ id?: number | string }>) {
  const badgeId = currentBadge.value?.id;
  if (!badgeId || rows.length === 0) return;
  const ids = rows
    .map((row) => Number(row.id))
    .filter((value) => Number.isFinite(value) && value > 0);
  if (ids.length === 0) return;
  await Promise.all(
    ids.map((userId) => growthBadgesAssignApi({ badgeId, userId })),
  );
  useMessage.success('操作成功');
  assignModalApi.close();
  gridApi.reload();
}

async function handleRevokeConfirm(rows: BadgeUserPageItemDto[]) {
  const badgeId = currentBadge.value?.id;
  if (!badgeId || rows.length === 0) return;
  await Promise.all(
    rows.map((row) =>
      growthBadgesRevokeApi({
        badgeId,
        userId: row.userId,
      }),
    ),
  );
  useMessage.success('操作成功');
  gridApi.reload();
}

function getBadgeActions(row: BadgeRow): ActionItem[] {
  return [
    {
      key: 'detail',
      onClick: () => detailApi.setData({ id: row.id }).open(),
      text: '详情',
    },
    {
      key: 'edit',
      onClick: () => openFormModal(row),
      text: '编辑',
    },
    {
      key: 'assign',
      onClick: () => openAssignModal(row),
      text: '分配',
    },
    {
      key: 'revoke',
      onClick: () => openRevokeModal(row),
      text: '撤销',
    },
    {
      danger: true,
      key: 'delete',
      onClick: () => confirmDeleteBadge(row),
      text: '删除',
    },
  ];
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <el-button class="ml-2" type="primary" @click="openFormModal()">
          添加徽章
        </el-button>
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
        <VbenTableAction align="center" :actions="getBadgeActions(row)" />
      </template>
    </Grid>

    <Form :on-submit="handleSubmit" />
    <DetailModal
      :api="growthBadgesDetailApi"
      :sections="getDetailSections"
      class="min-w-[800px]"
    />
    <AssignModal @confirm="handleAssignConfirm" />
    <RevokeModal @confirm="handleRevokeConfirm" />
  </Page>
</template>

<style scoped></style>
