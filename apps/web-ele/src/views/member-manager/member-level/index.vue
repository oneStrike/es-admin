<script lang="ts" setup>
import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type {
  BaseMemberLevelDto,
  MemberLevelCreateRequest,
  MemberLevelUpdateRequest,
} from '#/apis/types/memberLevel';

import { Page, useVbenModal } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  memberLevelChangeStatusApi,
  memberLevelCreateApi,
  memberLevelDeleteApi,
  memberLevelDetailApi,
  memberLevelListApi,
  memberLevelUpdateApi,
} from '#/apis';
import EsModalForm from '#/components/es-modal-form/index.vue';
import { useMessage } from '#/hooks/useFeedback';

import MemberLevelDetail from './detail.vue';
import { formSchema, pageColumns } from './shared';

const gridOptions: VxeGridProps<BaseMemberLevelDto> = {
  columns: pageColumns,
  proxyConfig: {
    ajax: {
      query: async () => {
        const data = await memberLevelListApi();
        return {
          list: data,
          total: data.length,
        };
      },
    },
    sort: true,
  },
};

const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [Detail, detailApi] = useVbenModal({
  connectedComponent: MemberLevelDetail,
});

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
});

async function openFormModal(row?: BaseMemberLevelDto) {
  let record;
  if (row) {
    record = await memberLevelDetailApi({ id: row.id });
  }
  formApi.setData({ title: '会员等级', record, schema: formSchema }).open();
}

function openDetailModal(row: BaseMemberLevelDto) {
  detailApi.setData({ recordId: row.id, title: '会员等级详情' }).open();
}

async function handleSubmit(
  values: MemberLevelCreateRequest | MemberLevelUpdateRequest,
) {
  await (values?.id
    ? memberLevelUpdateApi(values as MemberLevelUpdateRequest)
    : memberLevelCreateApi(values as MemberLevelCreateRequest));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function deleteMemberLevel(record: BaseMemberLevelDto) {
  await memberLevelDeleteApi({ id: record.id });
  useMessage.success('删除成功');
  gridApi.reload();
}

async function toggleStatus(record: BaseMemberLevelDto) {
  record.loading = true;
  const newValue = !record.isEnabled;
  await memberLevelChangeStatusApi({
    id: record.id,
    isEnabled: newValue,
  });
  record.loading = false;
  useMessage.success('操作成功');
  gridApi.reload();
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <el-button class="ml-2" type="primary" @click="openFormModal()">
          添加会员等级
        </el-button>
      </template>

      <template #icon="{ row }">
        <span>{{ row.icon }}</span>
      </template>

      <template #color="{ row }">
        <div class="flex items-center justify-center">
          <div
            class="h-6 w-6 rounded-md"
            :style="{ backgroundColor: row.color }"
          ></div>
          <span class="ml-2">{{ row.color }}</span>
        </div>
      </template>

      <template #isEnabled="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.loading"
          :model-value="row.isEnabled"
          @change="toggleStatus(row)"
        />
      </template>

      <template #actions="{ row }">
        <div class="my-1">
          <el-button link type="primary" @click="openDetailModal(row)">
            详情
          </el-button>
          <el-divider direction="vertical" />
          <el-button link type="primary" @click="openFormModal(row)">
            编辑
          </el-button>
          <el-divider direction="vertical" />
          <el-popconfirm
            title="确认删除当前会员等级?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="deleteMemberLevel(row)"
          >
            <template #reference>
              <el-button link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </Grid>

    <Form :on-submit="handleSubmit" />
    <Detail />
  </Page>
</template>

<style scoped></style>
