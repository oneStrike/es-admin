<script setup lang="ts">
import type { ActionItem } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  BaseDictionaryDto,
  BaseDictionaryItemDto,
  CreateDictionaryItemDto,
  UpdateDictionaryItemDto,
} from '#/api/types';

import { useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  dictionaryItemCreateApi,
  dictionaryItemDeleteApi,
  dictionaryItemPageApi,
  dictionaryItemSwapSortOrderApi,
  dictionaryItemUpdateApi,
  dictionaryItemUpdateStatusApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils';

import {
  dictionaryItemColumns,
  dictionarySearchSchema,
  itemFormSchema,
} from './model/shared';

type ShareData = {
  record: BaseDictionaryDto;
};

type DictionaryItemRow = BaseDictionaryItemDto & {
  loading?: boolean;
};

defineOptions({
  name: 'DictionaryItem',
});

const shareData = ref<ShareData>();

const gridOptions: VxeGridProps<DictionaryItemRow> = {
  columns: dictionaryItemColumns,
  height: 'auto',
  rowConfig: {
    drag: true,
  },
  sortConfig: {
    remote: true,
    multiple: true,
  },
  rowDragConfig: {
    async dragEndMethod(params) {
      await dictionaryItemSwapSortOrderApi({
        dragId: params.dragRow.id,
        targetId: params.newRow.id,
      });
      await gridApi.reload();
      return true;
    },
  },
  proxyConfig: {
    sort: true,
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const dictionaryCode = shareData.value?.record.code;

        if (!dictionaryCode) {
          return { list: [], total: 0 };
        }

        return dictionaryItemPageApi({
          ...formatQuery({ page, formValues, sorts }),
          dictionaryCode,
        });
      },
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
  formOptions: createSearchFormOptions(dictionarySearchSchema),
});

const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    if (isOpen) {
      shareData.value = modalApi.getData<ShareData>();
      modalApi.setState({
        title: shareData.value.record.name,
      });
    }
  },
});

const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

type DictionaryItemFormValues =
  | CreateDictionaryItemDto
  | UpdateDictionaryItemDto;

function resolveDictionaryCode(values: DictionaryItemFormValues) {
  return values.dictionaryCode ?? shareData.value?.record.code ?? '';
}

function buildDictionaryItemPayload(
  values: DictionaryItemFormValues,
): CreateDictionaryItemDto | UpdateDictionaryItemDto {
  const payload = {
    cover: values.cover,
    name: values.name,
    code: values.code,
    sortOrder: values.sortOrder,
    isEnabled: values.isEnabled,
    description: values.description,
    dictionaryCode: resolveDictionaryCode(values),
  };

  return 'id' in values && typeof values.id === 'number'
    ? ({ id: values.id, ...payload } as UpdateDictionaryItemDto)
    : (payload as CreateDictionaryItemDto);
}

async function addDictionaryItem(values: DictionaryItemFormValues) {
  const payload = buildDictionaryItemPayload(values);

  await ('id' in payload && typeof payload.id === 'number'
    ? dictionaryItemUpdateApi(payload as UpdateDictionaryItemDto)
    : dictionaryItemCreateApi(payload as CreateDictionaryItemDto));

  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function toggleEnableStatus(row: DictionaryItemRow) {
  const newStatus = !row.isEnabled;
  row.loading = true;
  try {
    await dictionaryItemUpdateStatusApi({
      id: row.id,
      isEnabled: newStatus,
    });
    useMessage.success('操作成功');
    gridApi.reload();
  } finally {
    row.loading = false;
  }
}

async function openFormModal(row?: DictionaryItemRow) {
  formApi
    .setData({
      title: '数据字典子项',
      record: row || null,
      cols: 1,
    })
    .open();
}

async function deleteDictionary(row: DictionaryItemRow) {
  await dictionaryItemDeleteApi({ id: row.id });
  useMessage.success('操作成功');
  gridApi.reload();
}

async function confirmDeleteDictionary(row: DictionaryItemRow) {
  const confirmed = await useConfirm({
    content: '确认删除当前项?',
    successMessage: false,
  });
  if (!confirmed) return;

  await deleteDictionary(row);
}

function getDictionaryItemActions(row: DictionaryItemRow): ActionItem[] {
  return [
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
  <Modal class="h-[1000px] w-[1200px]" v-if="shareData">
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
        <VbenTableAction
          align="center"
          :actions="getDictionaryItemActions(row)"
        />
      </template>
    </Grid>

    <Form :schema="itemFormSchema" :on-submit="addDictionaryItem" />
  </Modal>
</template>
