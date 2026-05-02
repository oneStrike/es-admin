<script setup lang="ts">
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AgreementListItemDto,
  BaseAgreementDto,
  CreateAgreementDto,
  UpdateAgreementDto,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  agreementCreateApi,
  agreementDetailApi,
  agreementPageApi,
  agreementUpdateApi,
  agreementUpdateStatusApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailCards } from './model/detail';
import { agreementColumns, agreementFilter, formSchema } from './model/shared';

const gridOptions: VxeGridProps<AgreementListItemDto> = {
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

async function openFormModal(row?: AgreementListItemDto) {
  const record = row ? await agreementDetailApi({ id: row.id }) : undefined;
  formApi.setData({ title: '协议', record }).open();
}

async function handleSubmit(values: CreateAgreementDto | UpdateAgreementDto) {
  await (typeof (values as UpdateAgreementDto).id === 'number'
    ? agreementUpdateApi(values as UpdateAgreementDto)
    : agreementCreateApi(values as CreateAgreementDto));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
  title: '协议详情',
});

async function togglePublishedStatus(
  record: AgreementListItemDto | BaseAgreementDto,
) {
  record.loading = true;
  try {
    await agreementUpdateStatusApi({
      id: record.id,
      isPublished: !record.isPublished,
    });
    useMessage.success('操作成功');
    gridApi.reload();
  } finally {
    record.loading = false;
  }
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
          :inactive-value="false"
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
        </div>
      </template>
    </Grid>

    <Form :schema="formSchema" :on-submit="handleSubmit" />

    <DetailModal
      :api="agreementDetailApi"
      :cards="getDetailCards"
      class="!w-[900px]"
    />
  </Page>
</template>
