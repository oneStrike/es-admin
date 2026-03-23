<script setup lang="ts">
import type { Recordable } from '@vben/types';

import type { BaseDictionaryDto } from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import * as Api from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils';

import DictionaryItem from './item.vue';
import {
  dictionaryColumns,
  dictionarySearchSchema,
  formSchema,
} from './model/shared';

const [Grid, gridApi] = useVbenVxeGrid<BaseDictionaryDto>({
  gridOptions: {
    columns: dictionaryColumns,
    proxyConfig: {
      ajax: {
        query: async (
          { page }: { page: { currentPage: number; pageSize: number } },
          formValues: Recordable<any>,
        ) => {
          return await Api.dictionaryPageApi({
            pageIndex: --page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
      sort: true,
    },
  },
  formOptions: createSearchFormOptions(dictionarySearchSchema, {
    showCollapseButton: false,
  }),
});

async function deleteDictionary(row: BaseDictionaryDto) {
  await Api.dictionaryDeleteApi({ id: row.id });
  useMessage.success('操作成功');
  gridApi.reload();
}

const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});
async function openFormModal(row?: BaseDictionaryDto) {
  let record;
  if (row) {
    record = await Api.dictionaryDetailApi({ id: row.id });
  }
  formApi
    .setData({
      title: '数据字典',
      record,
      cols: 1,
    })
    .open();
}

async function toggleEnableStatus(row: BaseDictionaryDto) {
  const newStatus = !row.isEnabled;
  row.loading = true;
  try {
    await Api.dictionaryUpdateStatusApi({
      id: row.id,
      isEnabled: newStatus,
    });
    useMessage.success('操作成功');
    gridApi.reload();
  } finally {
    row.loading = false;
  }
}

// 添加数据字典
async function addDictionary(values: any) {
  await (values.id
    ? Api.dictionaryUpdateApi(values)
    : Api.dictionaryCreateApi(values));
  useMessage.success('操作成功');
  formApi.close();
  gridApi.reload();
}

const [Detail, detailApi] = useVbenModal({
  connectedComponent: DictionaryItem,
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
      <template #isEnabled="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="row.isEnabled"
          :loading="row.loading"
          :model-value="row.isEnabled"
          @change="toggleEnableStatus(row)"
        />
      </template>

      <template #actions="{ row }">
        <el-button
          link
          type="primary"
          @click="detailApi.setData({ record: row }).open()"
        >
          子项
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
          @confirm="deleteDictionary(row)"
        >
          <template #reference>
            <el-button link type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </Grid>

    <Form :schema="formSchema" :on-submit="addDictionary" />

    <Detail />
  </Page>
</template>

<style scoped></style>
