<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { useVbenModal } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { configHistoryApi, configRestoreApi } from '#/apis/forum/config';
import { useConfirm } from '#/hooks/useFeedback';

const [Modal, modalApi] = useVbenModal({});

const historyColumns = [
  { field: 'id', title: '配置ID', width: 100 },
  { field: 'siteName', title: '站点名称', width: 200 },
  {
    field: 'operatedAt',
    title: '更新时间',
    width: 200,
    cellRender: {
      name: 'CellDate',
    },
  },
  {
    field: 'enableMaintenanceMode',
    title: '维护模式',
    width: 120,
    slots: { default: 'enableMaintenanceMode' },
  },
  {
    field: 'allowUserRegister',
    title: '允许注册',
    width: 120,
    slots: { default: 'allowUserRegister' },
  },
  {
    field: 'actions',
    title: '操作',
    width: 150,
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

const [Grid] = useVbenVxeGrid({
  gridOptions,
});

async function handleRestoreConfig(id: number) {
  if (!(await useConfirm('restore'))) return;
  await configRestoreApi({ id });
  modalApi.close();
}
</script>

<template>
  <Modal class="h-[600px] w-[900px]">
    <Grid>
      <template #enableMaintenanceMode="{ row }">
        <el-switch :model-value="row.enableMaintenanceMode" disabled />
      </template>

      <template #allowUserRegister="{ row }">
        <el-switch :model-value="row.allowUserRegister" disabled />
      </template>

      <template #actions="{ row }">
        <el-button
          type="primary"
          size="small"
          @click="handleRestoreConfig(row.id)"
        >
          恢复
        </el-button>
      </template>
    </Grid>
  </Modal>
</template>
