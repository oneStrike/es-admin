<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  BaseAppPageDto,
  CreateAppPageDto,
  UpdateAppPageDto,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  appPageCreateApi,
  appPageDeleteApi,
  appPageDetailApi,
  appPagePageApi,
  appPageUpdateApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailCards } from './model/detail';
import {
  accessLevelObj,
  formSchema,
  pageColumns,
  pageFilter,
} from './model/shared';

const gridOptions: VxeGridProps<BaseAppPageDto> = {
  columns: pageColumns,
  height: 'auto',
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        if (formValues.enablePlatform) {
          formValues.enablePlatform = JSON.stringify(formValues.enablePlatform);
        }
        return await appPagePageApi({
          pageIndex: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
    sort: true,
  },
};

const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(pageFilter),
  gridOptions,
});

async function openFormModal(row?: BaseAppPageDto) {
  let record;
  if (row) {
    record = await appPageDetailApi({ id: row.id });
  }
  formApi.setData({ title: '页面', record }).open();
}

function buildAppPagePayload(
  values: CreateAppPageDto | UpdateAppPageDto,
): CreateAppPageDto | UpdateAppPageDto {
  const payload = {
    code: values.code,
    path: values.path,
    name: values.name,
    title: values.title,
    accessLevel: values.accessLevel,
    isEnabled: values.isEnabled,
    enablePlatform: values.enablePlatform,
    description: values.description,
  };

  return 'id' in values && typeof values.id === 'number'
    ? ({ id: values.id, ...payload } as UpdateAppPageDto)
    : (payload as CreateAppPageDto);
}

async function handleSubmit(values: CreateAppPageDto | UpdateAppPageDto) {
  const payload = buildAppPagePayload(values);

  await ('id' in payload && typeof payload.id === 'number'
    ? appPageUpdateApi(payload as UpdateAppPageDto)
    : appPageCreateApi(payload as CreateAppPageDto));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function deletePage(record: BaseAppPageDto) {
  await appPageDeleteApi({ ids: [record.id] });
  useMessage.success('操作成功');
  gridApi.reload();
}

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
  title: '页面详情',
});

async function toggleEnableStatus(record: BaseAppPageDto) {
  record.loading = true;
  try {
    await appPageUpdateApi({
      id: record.id,
      isEnabled: !record.isEnabled,
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

      <template #accessLevel="{ row }">
        <el-text :style="{ color: accessLevelObj[row.accessLevel]?.color }">
          {{ accessLevelObj[row.accessLevel]?.label }}
        </el-text>
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
          <el-popconfirm
            title="确认删除当前项?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="deletePage(row)"
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
      :api="appPageDetailApi"
      :cards="getDetailCards"
      class="w-[800px]"
    />
  </Page>
</template>

<style scoped></style>
