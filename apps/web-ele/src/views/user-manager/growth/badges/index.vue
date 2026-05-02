<script lang="ts" setup>
import type { VxeGridProps } from '@vben/plugins/vxe-table';
import type { Recordable } from '@vben/types';

import type {
  BadgeUserPageItemDto,
  BaseUserBadgeDto,
  GrowthBadgesCreateRequest,
  GrowthBadgesUpdateRequest,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

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
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions, formSchemaTransform } from '#/utils';

import { getDetailCards } from './modules/model/detail';
import {
  formSchema,
  pageColumns,
  searchFormSchema,
} from './modules/model/shared';

defineOptions({
  name: 'UserGrowthBadges',
});

const currentBadge = ref<BaseUserBadgeDto | null>(null);

const userSearchSchema: EsFormSchema = [];

const userTableSchema: EsFormSchema = [
  { component: 'InputNumber', fieldName: 'userId', label: '用户ID' },
  { component: 'Input', fieldName: 'nickname', label: '昵称' },
  { component: 'Input', fieldName: 'level', label: '等级' },
  { component: 'DatePicker', fieldName: 'createdAt', label: '获得时间' },
];

const userColumns = formSchemaTransform.toTableColumns<BadgeUserPageItemDto>(
  userTableSchema,
  {
    userId: {
      formatter: ({ cellValue }) => cellValue ?? '-',
      minWidth: 100,
    },
    nickname: {
      field: 'user',
      formatter: ({ row }) => row.user?.nickname || '-',
      minWidth: 140,
    },
    level: {
      field: 'user',
      formatter: ({ row }) => row.user?.level || '-',
      minWidth: 140,
    },
    createdAt: {
      cellRender: {
        name: 'CellDate',
      },
      minWidth: 160,
    },
  },
);

const gridOptions: VxeGridProps<BaseUserBadgeDto> = {
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
  connectedComponent: EsRecordDetail,
  title: '徽章详情',
});

const [AssignForm, assignFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [RevokeModal, revokeApi] = useVbenModal({
  connectedComponent: EsModalTable,
});

async function openFormModal(row?: BaseUserBadgeDto) {
  let record;
  if (row) {
    record = await growthBadgesDetailApi({ id: row.id });
  }
  formApi.setData({ title: '徽章', record, schema: formSchema }).open();
}

async function handleSubmit(
  values: GrowthBadgesCreateRequest | GrowthBadgesUpdateRequest,
) {
  await (values?.id
    ? growthBadgesUpdateApi(values as GrowthBadgesUpdateRequest)
    : growthBadgesCreateApi(values as GrowthBadgesCreateRequest));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function deleteBadge(record: BaseUserBadgeDto) {
  await growthBadgesDeleteApi({ id: record.id });
  useMessage.success('删除成功');
  gridApi.reload();
}

async function toggleEnableStatus(record: BaseUserBadgeDto) {
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

const assignFormSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入APP用户ID，多个用逗号分隔',
      type: 'textarea',
      rows: 4,
    },
    fieldName: 'userIds',
    label: '用户ID',
    rules: 'required',
    formItemClass: 'col-span-2',
  },
];

function openAssignModal(record: BaseUserBadgeDto) {
  currentBadge.value = record;
  assignFormApi
    .setData({
      title: `分配徽章用户 - ${record.name}`,
      schema: assignFormSchema,
    })
    .open();
}

function openRevokeModal(record: BaseUserBadgeDto) {
  currentBadge.value = record;
  revokeApi
    .setData({
      title: `撤销徽章用户 - ${record.name}`,
      columns: userColumns,
      api: (params: Recordable<any>) =>
        growthBadgesUserPageApi({ ...params, badgeId: record.id }),
      selectionMode: 'multiple',
      multipleLimit: 50,
      searchSchema: createSearchFormOptions(userSearchSchema),
    })
    .open();
}

async function handleAssignSubmit(values: { userIds: string }) {
  const badgeId = currentBadge.value?.id;
  if (!badgeId) return;
  const ids = values.userIds
    .split(/[,，\s]+/)
    .map(Number)
    .filter((value) => Number.isFinite(value) && value > 0);
  if (ids.length === 0) return;
  await Promise.all(
    ids.map((userId) => growthBadgesAssignApi({ badgeId, userId })),
  );
  useMessage.success('操作成功');
  assignFormApi.close();
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
          <el-button link type="primary" @click="openAssignModal(row)">
            分配
          </el-button>
          <el-divider direction="vertical" />
          <el-button link type="warning" @click="openRevokeModal(row)">
            撤销
          </el-button>
          <el-divider direction="vertical" />
          <el-popconfirm
            title="确认删除当前徽章?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="deleteBadge(row)"
          >
            <template #reference>
              <el-button link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </Grid>

    <Form :on-submit="handleSubmit" />
    <DetailModal
      :api="growthBadgesDetailApi"
      :cards="getDetailCards"
      class="!min-w-[800px]"
    />
    <AssignForm :on-submit="handleAssignSubmit" />
    <RevokeModal @confirm="handleRevokeConfirm" />
  </Page>
</template>

<style scoped></style>
