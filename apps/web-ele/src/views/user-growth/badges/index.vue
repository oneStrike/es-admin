<script lang="ts" setup>
import type { VxeGridProps } from '@vben/plugins/vxe-table';
import type { Recordable } from '@vben/types';

import type {
  BadgesCreateRequest,
  BadgesUpdateRequest,
  BaseUserBadgeDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  badgesAssignApi,
  badgesCreateApi,
  badgesDeleteApi,
  badgesDetailApi,
  badgesPageApi,
  badgesRevokeApi,
  badgesUpdateApi,
  badgesUpdateStatusApi,
  badgesUsersApi,
} from '#/api';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsModalTable from '#/components/es-modal-table';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils';

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

const userSearchSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入用户名',
    },
    fieldName: 'username',
    label: '用户名',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入手机号',
    },
    fieldName: 'mobile',
    label: '手机号',
  },
];

const userColumns: VxeGridProps['columns'] = [
  {
    field: 'id',
    title: '用户ID',
    minWidth: 100,
  },
  {
    field: 'username',
    title: '用户名',
    minWidth: 140,
  },
  {
    field: 'mobile',
    title: '手机号',
    minWidth: 140,
  },
  {
    field: 'isEnabled',
    title: '状态',
    minWidth: 100,
    cellRender: {
      name: 'CellTag',
      props: {
        map: {
          false: '禁用',
          true: '启用',
        },
      },
    },
  },
  {
    field: 'createdAt',
    title: '创建时间',
    minWidth: 160,
    cellRender: {
      name: 'CellDate',
    },
  },
];

const gridOptions: VxeGridProps<BaseUserBadgeDto> = {
  columns: pageColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await badgesPageApi(
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
    record = await badgesDetailApi({ id: row.id });
  }
  formApi.setData({ title: '徽章', record, schema: formSchema }).open();
}

async function handleSubmit(values: BadgesCreateRequest | BadgesUpdateRequest) {
  await (values?.id
    ? badgesUpdateApi(values as BadgesUpdateRequest)
    : badgesCreateApi(values as BadgesCreateRequest));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function deleteBadge(record: BaseUserBadgeDto) {
  await badgesDeleteApi({ id: record.id });
  useMessage.success('删除成功');
  gridApi.reload();
}

async function toggleEnableStatus(record: BaseUserBadgeDto) {
  record.loading = true;
  await badgesUpdateStatusApi({
    id: record.id,
    name: record.name,
    type: record.type,
    description: record.description,
    icon: record.icon,
    sortOrder: record.sortOrder,
    eventKey: record.eventKey,
    isEnabled: !record.isEnabled,
  });
  record.loading = false;
  useMessage.success('操作成功');
  gridApi.reload();
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
        badgesUsersApi({ ...params, badgeId: record.id }),
      selectionMode: 'multiple',
      multipleLimit: 50,
      searchSchema: createSearchFormOptions(userSearchSchema),
    })
    .open();
}

async function handleAssignSubmit(values: { userIds: string }) {
  if (!currentBadge.value) return;
  const ids = values.userIds
    .split(/[,，\s]+/)
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value > 0);
  if (ids.length === 0) return;
  await Promise.all(
    ids.map((userId) =>
      badgesAssignApi({ badgeId: currentBadge.value!.id, userId }),
    ),
  );
  useMessage.success('操作成功');
  assignFormApi.close();
  gridApi.reload();
}

async function handleRevokeConfirm(rows: any[]) {
  if (!currentBadge.value || rows.length === 0) return;
  await Promise.all(
    rows.map((row) =>
      badgesRevokeApi({ badgeId: currentBadge.value!.id, userId: row.id }),
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
            @click="
              detailApi.setData({ title: '徽章详情', recordId: row.id }).open()
            "
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
      :api="badgesDetailApi"
      :cards="getDetailCards"
      class="!min-w-[800px]"
    />
    <AssignForm :on-submit="handleAssignSubmit" />
    <RevokeModal @confirm="handleRevokeConfirm" />
  </Page>
</template>

<style scoped></style>
