<script setup lang="ts">
import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type {
  EsModalTableEmits,
  EsModalTableProps,
  EsModalTableRow,
} from './types';

import { nextTick, ref, watch } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { useVbenVxeGrid } from '@vben/plugins/vxe-table';

import { formatQuery } from '#/adapter/vxe-table';
import { DeleteBinIcon } from '#/components/es-icons';
import { useMessage } from '#/hooks/useFeedback';

defineOptions({
  name: 'EsModalTable',
});

const props = withDefaults(defineProps<EsModalTableProps>(), {
  title: '选择数据',
  width: 800,
});

const emit = defineEmits<EsModalTableEmits>();

const sharedData = ref<EsModalTableProps>();
const selectedRows = ref<EsModalTableRow[]>([]);

type SelectionChangeParams = {
  records?: EsModalTableRow[];
};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: props.searchSchema,
  gridEvents: {
    radioChange(params: SelectionChangeParams) {
      handleRadioChange(params);
    },
    checkboxChange(params: SelectionChangeParams) {
      handleCheckboxChange(params);
    },
    checkboxAll(params: SelectionChangeParams) {
      handleCheckboxChange(params);
    },
  },
});

function getGridOptions(data: EsModalTableProps) {
  const options: VxeGridProps<EsModalTableRow> = {
    columns: data.columns,
    ...data.gridProps,
  };

  if (data.api) {
    const api = data.api;
    options.proxyConfig = {
      ajax: {
        query: ({ page, sorts }, formValues) => {
          return api(
            formatQuery({
              page,
              sorts,
              formValues,
            }),
          );
        },
      },
      sort: true,
    };
  }

  const firstColumn = options.columns?.[0];
  if (!firstColumn?.field) return options;

  const labelField = String(firstColumn.field);

  if (data.selectionMode === 'multiple') {
    options.checkboxConfig = {
      highlight: true,
      labelField,
    };
    firstColumn.type = 'checkbox';
  } else if (data.selectionMode === 'single') {
    options.radioConfig = {
      highlight: true,
      labelField,
    };
    firstColumn.type = 'radio';
  }

  return options;
}

function handleCheckboxChange(params: SelectionChangeParams) {
  handleSelectionChange(params.records || []);
}

function handleRadioChange(params: SelectionChangeParams) {
  handleSelectionChange(params.records || []);
}

function handleSelectionChange(records: EsModalTableRow[]) {
  const data = sharedData.value;
  if (!data) return;

  if (
    data.selectionMode === 'multiple' &&
    data.multipleLimit &&
    records.length > data.multipleLimit
  ) {
    gridApi.grid?.clearCheckboxRow();
    selectedRows.value.forEach((row) =>
      gridApi.grid?.setCheckboxRow(row, true),
    );
    useMessage.warning(`最多只能选择 ${data.multipleLimit} 项`);
    return;
  }

  // 更新选中数据
  selectedRows.value = records;
  emit('select', records);
}

function handleRemoveItem(item: EsModalTableRow) {
  const data = sharedData.value;
  if (!data) return;

  if (data.selectionMode === 'multiple') {
    const newSelectedRows = selectedRows.value.filter(
      (row) => row.id !== item.id,
    );
    gridApi.grid?.clearCheckboxRow();
    newSelectedRows.forEach((row) => gridApi.grid?.setCheckboxRow(row, true));
    selectedRows.value = newSelectedRows;
    emit('select', newSelectedRows);
  } else if (data.selectionMode === 'single') {
    gridApi.grid?.clearRadioRow();
    selectedRows.value = [];
    emit('select', []);
  }
}

function handleBatchRemove() {
  const data = sharedData.value;
  if (!data) return;

  if (data.selectionMode === 'multiple') {
    gridApi.grid?.clearCheckboxRow();
    selectedRows.value = [];
    emit('select', []);
  }
}

const [Modal, modalApi] = useVbenModal({
  title: props.title,
  onOpenChange(isOpen) {
    if (isOpen) {
      sharedData.value = {
        ...props,
        ...modalApi.getData<EsModalTableProps>(),
      };
      selectedRows.value = sharedData.value.selectedRows || [];
      gridApi.setGridOptions(getGridOptions(sharedData.value));
      nextTick(() => {
        gridApi.reload().then(() => {
          restoreGridSelection();
        });
      });
    }
  },
  onConfirm() {
    emit('confirm', selectedRows.value);
    modalApi.close();
  },
});

const tableHeight = ref('70vh');
const state = modalApi.useStore();
watch(
  () => state.value.fullscreen,
  (isFullscreen) => {
    tableHeight.value = isFullscreen ? '90vh' : '70vh';
  },
);

function restoreGridSelection() {
  const data = sharedData.value;
  const table = gridApi.grid;
  if (!data || !table) return;

  if (data.selectionMode === 'multiple') {
    table.clearCheckboxRow?.();
    selectedRows.value.forEach((row) => {
      table.setCheckboxRow?.(row, true);
    });
  } else if (data.selectionMode === 'single') {
    table.clearRadioRow?.();
    if (selectedRows.value && selectedRows.value.length > 0) {
      table.setRadioRow?.(selectedRows.value[0]);
    }
  }
}

function getRowLabel(item: EsModalTableRow) {
  const field = sharedData.value?.columns?.[0]?.field;
  return field ? String(item[String(field)] ?? '') : '';
}
</script>

<template>
  <Modal v-if="sharedData?.columns" class="w-[1200px]">
    <el-row :gutter="20" class="h-full">
      <el-col :span="16" class="flex h-full flex-col">
        <div :style="{ height: tableHeight }">
          <Grid
            @checkbox-change="handleCheckboxChange"
            @radio-change="handleRadioChange"
          />
        </div>
      </el-col>
      <el-col :span="8" :style="{ height: tableHeight }">
        <el-card class="h-full" shadow="never">
          <div class="mb-3 flex justify-between">
            <el-text tag="h3" size="large" class="font-semibold">
              已选择数据
            </el-text>
            <div class="flex items-center space-x-3">
              <el-text type="info"> {{ selectedRows.length }} 项 </el-text>
              <el-button
                v-if="
                  selectedRows.length > 0 &&
                  sharedData.selectionMode === 'multiple'
                "
                type="text"
                @click="handleBatchRemove"
              >
                清空
              </el-button>
            </div>
          </div>
          <div class="flex flex-col overflow-y-auto">
            <template v-if="selectedRows.length > 0">
              <el-tag
                v-for="(item, index) in selectedRows"
                :key="item.id || index"
                class="es-modal-table__selected-tag mb-3"
                size="large"
              >
                <div class="flex w-full items-center justify-between text-sm">
                  {{ getRowLabel(item) }}
                  <DeleteBinIcon
                    class="cursor-pointer text-lg transition-colors duration-300 hover:text-red-600"
                    @click="handleRemoveItem(item)"
                  />
                </div>
              </el-tag>
            </template>
            <el-empty v-else />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </Modal>
</template>

<style lang="scss">
.es-modal-table__selected-tag .el-tag__content {
  width: 100%;
}
</style>
