<script setup lang="ts">
import type { Recordable } from '@vben/types';

import type {
  BaseDictionaryDto,
  CreateDictionaryDto,
  UpdateDictionaryDto,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import * as Api from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
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
          {
            page,
            sorts,
          }: {
            page: { currentPage: number; pageSize: number };
            sorts: any[];
          },
          formValues: Recordable<any>,
        ) => {
          return await Api.dictionaryPageApi(
            formatQuery({ page, sorts, formValues }),
          );
        },
      },
      sort: true,
    },
  },
  formOptions: createSearchFormOptions(dictionarySearchSchema),
});

async function deleteDictionary(row: BaseDictionaryDto) {
  await Api.dictionaryDeleteApi({ id: row.id });
  useMessage.success('操作成功');
  gridApi.reload();
}

async function confirmDeleteDictionary(row: BaseDictionaryDto) {
  const confirmed = await useConfirm({
    content: '确认删除当前项?',
    successMessage: false,
  });
  if (!confirmed) return;

  await deleteDictionary(row);
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
type DictionaryFormValues = CreateDictionaryDto | UpdateDictionaryDto;

function buildDictionaryPayload(
  values: DictionaryFormValues,
): CreateDictionaryDto | UpdateDictionaryDto {
  const payload = {
    cover: values.cover,
    name: values.name,
    code: values.code,
    isEnabled: values.isEnabled,
    description: values.description,
  };

  return 'id' in values && typeof values.id === 'number'
    ? ({ id: values.id, ...payload } as UpdateDictionaryDto)
    : (payload as CreateDictionaryDto);
}

async function addDictionary(values: DictionaryFormValues) {
  const payload = buildDictionaryPayload(values);

  await ('id' in payload && typeof payload.id === 'number'
    ? Api.dictionaryUpdateApi(payload as UpdateDictionaryDto)
    : Api.dictionaryCreateApi(payload as CreateDictionaryDto));
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
          :inactive-value="false"
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
        <el-button link type="danger" @click="confirmDeleteDictionary(row)">
          删除
        </el-button>
      </template>
    </Grid>

    <Form :schema="formSchema" :on-submit="addDictionary" />

    <Detail />
  </Page>
</template>

<style scoped></style>
