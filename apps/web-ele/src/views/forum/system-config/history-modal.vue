<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { useVbenModal } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  configDeleteApi,
  configHistoryApi,
  configRestoreApi,
} from '#/api';
import { useConfirm, useMessage } from '#/hooks/useFeedback';

import ChangesDetailModal from './changes-detail-modal.vue';

const [Modal, modalApi] = useVbenModal({});

const [ChangesDetail, changesDetailApi] = useVbenModal({
  connectedComponent: ChangesDetailModal,
});

const historyColumns = [
  { field: 'id', title: '配置ID' },
  {
    field: 'operatedById',
    title: '更新人ID',
  },
  {
    field: 'operatedAt',
    title: '更新时间',
    cellRender: {
      name: 'CellDate',
    },
  },
  {
    field: 'reason',
    title: '更新原因',
  },
  {
    field: 'actions',
    title: '操作',
    slots: { default: 'actions' },
  },
];

const gridOptions: VxeGridProps = {
  columns: historyColumns,
  proxyConfig: {
    ajax: {
      query: async () => {
        const data = await configHistoryApi();
        return {
          list: data,
          total: data.length,
        };
      },
    },
    sort: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
});

async function handleRestoreConfig(id: number) {
  if (!(await useConfirm('restore'))) return;
  await configRestoreApi({ id });
  modalApi.close();
}

async function deleteHistory(row: any) {
  await configDeleteApi({ id: row.id });
  useMessage.success('删除成功');
  gridApi.reload();
}

function viewChanges(row: any) {
  changesDetailApi.setData({ changes: row.changes }).open();
}
</script>

<template>
  <Modal class="h-[600px] w-[900px]">
    <Grid>
      <template #toolbar-actions>
        <el-alert
          title="提示：只要没有更改配置，即使提交保存，也不会生成历史记录"
          type="error"
          :closable="false"
        />
      </template>
      <template #actions="{ row }">
        <el-button type="primary" link @click="viewChanges(row)">
          查看变更
        </el-button>

        <el-divider direction="vertical" />

        <el-button type="primary" link @click="handleRestoreConfig(row.id)">
          恢复
        </el-button>

        <el-divider direction="vertical" />
        <el-popconfirm
          title="确认删除当前项?"
          confirm-button-text="确认"
          cancel-button-text="取消"
          @confirm="deleteHistory(row)"
        >
          <template #reference>
            <el-button link type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </Grid>

    <ChangesDetail />
  </Modal>
</template>
