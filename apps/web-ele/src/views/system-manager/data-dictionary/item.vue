<script setup lang="ts">
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { BaseDictionaryDto, BaseDictionaryItemDto } from '#/api/types';

import { useVbenModal } from '@vben/common-ui';

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
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils';

import {
  dictionaryItemColumns,
  dictionarySearchSchema,
  itemFormSchema,
} from './model/shared';

type ShareData = {
  record: BaseDictionaryDto;
};

defineOptions({
  name: 'DictionaryItem',
});

const shareData = ref<ShareData>();

const gridOptions: VxeGridProps<BaseDictionaryItemDto> = {
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
        return dictionaryItemPageApi({
          ...formatQuery({ page, formValues, sorts }),
          dictionaryCode: shareData.value?.record.code,
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

async function addDictionaryItem(values: any) {
  if (!values.dictionaryCode) {
    values.dictionaryCode = shareData.value?.record.code;
  }
  await (values.id
    ? dictionaryItemUpdateApi(values)
    : dictionaryItemCreateApi(values));

  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function toggleEnableStatus(row: BaseDictionaryItemDto) {
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

async function openFormModal(row?: BaseDictionaryItemDto) {
  formApi
    .setData({
      title: '数据字典子项',
      record: row || null,
      cols: 1,
    })
    .open();
}

async function deleteDictionary(row: BaseDictionaryItemDto) {
  await dictionaryItemDeleteApi({ id: row.id });
  useMessage.success('操作成功');
  gridApi.reload();
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

    <Form :schema="itemFormSchema" :on-submit="addDictionaryItem" />
  </Modal>
</template>
