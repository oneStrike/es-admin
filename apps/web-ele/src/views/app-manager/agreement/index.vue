<script setup lang="ts">
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
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
} from '#/api';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailCards } from './model/detail';
import {
  agreementColumns,
  agreementFilter,
  booleanTagObj,
  formSchema,
} from './model/shared';

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

function resolveBooleanTag(value?: boolean | null) {
  return value ? booleanTagObj.true : booleanTagObj.false;
}

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
        <el-tag :type="resolveBooleanTag(row.isPublished).type">
          {{ resolveBooleanTag(row.isPublished).label }}
        </el-tag>
      </template>

      <template #showInAuth="{ row }">
        <el-tag :type="resolveBooleanTag(row.showInAuth).type">
          {{ resolveBooleanTag(row.showInAuth).label }}
        </el-tag>
      </template>

      <template #isForce="{ row }">
        <el-tag :type="resolveBooleanTag(row.isForce).type">
          {{ resolveBooleanTag(row.isForce).label }}
        </el-tag>
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
