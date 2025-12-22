<script setup lang="ts">
import type { EsTableSelectProps } from './types';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { BaseComicDto } from '#/apis/types/comic';

import { useVbenModal } from '@vben/common-ui';
import { useVbenVxeGrid } from '@vben/plugins/vxe-table';

import { createSearchFormOptions } from '#/utils';

// 定义组件名称
defineOptions({
  name: 'EsTableSelect',
});

// 定义组件属性
const props = withDefaults(defineProps<EsTableSelectProps>(), {
  mode: 'single',
  placeholder: '请选择',
  disabled: false,
  title: '选择数据',
  width: 1000,
  multiple: true,
});

function openTableModal() {
  modalApi.open();
}

const gridOptions: VxeGridProps<BaseComicDto> = {
  columns: props.columns,
  height: '580px',
  toolbarConfig: {
    enabled: false,
  },
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await props.api({
          ...page,
          ...formValues,
        });
      },
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  showSearchForm: false,
  formOptions: createSearchFormOptions(props.searchSchema || []),
  gridOptions,
});

// 创建弹窗实例
const [Modal, modalApi] = useVbenModal({
  title: props.title,
  onOpened: () => {
    gridApi.reload();
  },
});
</script>

<template>
  <div class="relative w-full">
    <el-input-tag
      class="!cursor-pointer"
      readonly
      :placeholder="props.placeholder"
      @click="openTableModal"
    />

    <!-- 弹窗表格 -->
    <Modal class="w-[800px]">
      <Grid />
    </Modal>
  </div>
</template>

<style scoped lang="scss">
::v-deep(.el-input-tag__input) {
  cursor: pointer;
}
</style>
