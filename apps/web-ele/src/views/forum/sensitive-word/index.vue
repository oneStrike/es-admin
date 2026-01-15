<script lang="ts" setup>
import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type {
  CreateSensitiveWordDto,
  SensitiveWordCreateRequest,
  SensitiveWordUpdateRequest,
} from '#/apis/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  sensitiveWordCreateApi,
  sensitiveWordDeleteApi,
  sensitiveWordPageApi,
  sensitiveWordUpdateApi,
  sensitiveWordUpdateStatusApi,
} from '#/apis';
import EsModalForm from '#/components/es-modal-form/index.vue';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { formSchema, pageColumns, searchFormSchema } from './modules/shared';

const gridOptions: VxeGridProps<CreateSensitiveWordDto> = {
  columns: pageColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await sensitiveWordPageApi({
          pageIndex: --page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
    sort: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(searchFormSchema),
  gridOptions,
});

const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

async function openFormModal(row?: CreateSensitiveWordDto) {
  formApi.setData({ title: '敏感词', record: row }).open();
}

async function handleSubmit(
  values: SensitiveWordCreateRequest | SensitiveWordUpdateRequest,
) {
  await (values?.id
    ? sensitiveWordUpdateApi(values as SensitiveWordUpdateRequest)
    : sensitiveWordCreateApi(values as SensitiveWordCreateRequest));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function deleteSensitiveWord(record: CreateSensitiveWordDto) {
  await sensitiveWordDeleteApi({ id: record.id });
  useMessage.success('删除成功');
  gridApi.reload();
}

async function toggleEnableStatus(record: CreateSensitiveWordDto) {
  record.loading = true;
  await sensitiveWordUpdateStatusApi({
    id: record.id,
    isEnabled: !record.isEnabled,
  });
  useMessage.success('操作成功');
  gridApi.reload();
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <el-button class="ml-2" type="primary" @click="openFormModal()">
          添加敏感词
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
          <el-button link type="primary" @click="openFormModal(row)">
            编辑
          </el-button>
          <el-divider direction="vertical" />
          <el-popconfirm
            title="确认删除当前敏感词?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="deleteSensitiveWord(row)"
          >
            <template #reference>
              <el-button link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </Grid>

    <Form :schema="formSchema" :on-submit="handleSubmit" />
  </Page>
</template>

<style scoped></style>
