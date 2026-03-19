<script setup lang="ts">
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  BaseAgreementDto,
  CreateAgreementDto,
  ListOrPageAgreementResponseDto,
  UpdateAgreementDto,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  agreementCreateApi,
  agreementDeleteApi,
  agreementDetailApi,
  agreementPageApi,
  agreementUpdateApi,
  agreementUpdateStatusApi,
} from '#/api';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailCards } from './model/detail';
import { agreementColumns, agreementFilter, formSchema } from './model/shared';

const gridOptions: VxeGridProps<ListOrPageAgreementResponseDto> = {
  columns: agreementColumns,
  height: 'auto',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await agreementPageApi(formatQuery({ page, formValues, sorts }));
      },
    },
    sort: true,
  },
};

const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(agreementFilter),
  gridOptions,
});

async function openFormModal(row?: ListOrPageAgreementResponseDto) {
  let record;
  if (row) {
    record = await agreementDetailApi({ id: row.id });
  }
  formApi.setData({ title: '协议管理', record }).open();
}

async function handleSubmit(values: CreateAgreementDto | UpdateAgreementDto) {
  await (values?.id
    ? agreementUpdateApi(values as UpdateAgreementDto)
    : agreementCreateApi(values as CreateAgreementDto));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function deleteAgreement(record: ListOrPageAgreementResponseDto) {
  await agreementDeleteApi({ id: record.id });
  useMessage.success('操作成功');
  gridApi.reload();
}

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
});

async function togglePublishedStatus(record: BaseAgreementDto | ListOrPageAgreementResponseDto) {
  record.loading = true;
  await agreementUpdateStatusApi({
    id: record.id,
    isPublished: !record.isPublished,
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
          添加
        </el-button>
      </template>

      <template #isPublished="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="row.isPublished"
          :loading="row.loading"
          :model-value="row.isPublished"
          @change="togglePublishedStatus(row)"
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
          <el-popconfirm
            title="确认删除当前项?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="deleteAgreement(row)"
          >
            <template #reference>
              <el-button link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </Grid>

    <Form :schema="formSchema" :on-submit="handleSubmit" />

    <DetailModal
      title="协议详情"
      :api="agreementDetailApi"
      :cards="getDetailCards"
      class="!w-[900px]"
    />
  </Page>
</template>
