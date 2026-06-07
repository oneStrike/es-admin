<script setup lang="ts">
import type { ActionItem } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  BaseDictionaryDto,
  CreateDictionaryDto,
  UpdateDictionaryDto,
} from '#/api/types';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';

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

type DictionaryRow = BaseDictionaryDto & {
  loading?: boolean;
};

const gridOptions: VxeGridProps<DictionaryRow> = {
  columns: dictionaryColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await Api.dictionaryPageApi(
          formatQuery({ page, sorts, formValues }),
        );
      },
    },
    sort: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid<DictionaryRow>({
  gridOptions,
  formOptions: createSearchFormOptions(dictionarySearchSchema),
});

async function deleteDictionary(row: DictionaryRow) {
  await Api.dictionaryDeleteApi({ id: row.id });
  useMessage.success('操作成功');
  gridApi.reload();
}

async function confirmDeleteDictionary(row: DictionaryRow) {
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
async function openFormModal(row?: DictionaryRow) {
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

async function toggleEnableStatus(row: DictionaryRow) {
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

function buildDictionaryPayload(
  values: Partial<
    Pick<
      CreateDictionaryDto,
      'code' | 'cover' | 'description' | 'isEnabled' | 'name'
    >
  > &
    Pick<Partial<UpdateDictionaryDto>, 'id'>,
) {
  const code = values.code?.trim();
  const name = values.name?.trim();

  if (!code || !name || typeof values.isEnabled !== 'boolean') {
    useMessage.warning('请完整填写字典名称、编码和状态');
    throw new Error('invalid dictionary payload');
  }

  const payload = {
    cover: values.cover || undefined,
    name,
    code,
    isEnabled: values.isEnabled,
    description: values.description?.trim?.() || undefined,
  } satisfies CreateDictionaryDto;

  return 'id' in values && typeof values.id === 'number'
    ? ({ id: values.id, ...payload } satisfies UpdateDictionaryDto)
    : payload;
}

async function addDictionary(
  values: Parameters<typeof buildDictionaryPayload>[0],
) {
  const payload = buildDictionaryPayload(values);

  await ('id' in payload && typeof payload.id === 'number'
    ? Api.dictionaryUpdateApi(payload)
    : Api.dictionaryCreateApi(payload));
  useMessage.success('操作成功');
  formApi.close();
  gridApi.reload();
}

const [Detail, detailApi] = useVbenModal({
  connectedComponent: DictionaryItem,
});

function getDictionaryActions(row: DictionaryRow): ActionItem[] {
  return [
    {
      key: 'items',
      text: '子项',
      onClick: () => detailApi.setData({ record: row }).open(),
    },
    {
      key: 'edit',
      text: '编辑',
      onClick: () => openFormModal(row),
    },
    {
      danger: true,
      key: 'delete',
      text: '删除',
      onClick: () => confirmDeleteDictionary(row),
    },
  ];
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
        <VbenTableAction align="center" :actions="getDictionaryActions(row)" />
      </template>
    </Grid>

    <Form :schema="formSchema" :on-submit="addDictionary" />

    <Detail />
  </Page>
</template>

<style scoped></style>
