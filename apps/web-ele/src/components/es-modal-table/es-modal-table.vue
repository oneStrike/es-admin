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
  displayField: 'name',
  keyField: 'id',
});

const emit = defineEmits<EsModalTableEmits>();

const sharedData = ref<EsModalTableProps>();
const currentSelectedRows = ref<EsModalTableRow[]>([]);

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
    rowConfig: {
      ...data.gridProps?.rowConfig,
      keyField: data.keyField || props.keyField,
    },
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

  const labelField = data.displayField || props.displayField;

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
    currentSelectedRows.value.forEach((row) =>
      gridApi.grid?.setCheckboxRow(row, true),
    );
    useMessage.warning(`最多只能选择 ${data.multipleLimit} 项`);
    return;
  }

  // 更新选中数据
  currentSelectedRows.value = records;
  emit('select', records);
}

function handleRemoveItem(item: EsModalTableRow) {
  const data = sharedData.value;
  if (!data) return;
  const keyField = data.keyField || props.keyField;
  const itemKey = item[keyField];

  if (data.selectionMode === 'multiple') {
    const newSelectedRows = currentSelectedRows.value.filter(
      (row) => row[keyField] !== itemKey,
    );
    gridApi.grid?.clearCheckboxRow();
    newSelectedRows.forEach((row) => gridApi.grid?.setCheckboxRow(row, true));
    currentSelectedRows.value = newSelectedRows;
    emit('select', newSelectedRows);
  } else if (data.selectionMode === 'single') {
    gridApi.grid?.clearRadioRow();
    currentSelectedRows.value = [];
    emit('select', []);
  }
}

function handleBatchRemove() {
  const data = sharedData.value;
  if (!data) return;

  if (data.selectionMode === 'multiple') {
    gridApi.grid?.clearCheckboxRow();
    currentSelectedRows.value = [];
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
      currentSelectedRows.value = sharedData.value.selectedRows || [];
      gridApi.setGridOptions(getGridOptions(sharedData.value));
      nextTick(() => {
        gridApi.reload().then(() => {
          restoreGridSelection();
        });
      });
    }
  },
  onConfirm() {
    emit('confirm', currentSelectedRows.value);
    modalApi.close();
  },
});

const tableHeightClass = ref('h-[70vh]');
const state = modalApi.useStore();
watch(
  () => state.value.fullscreen,
  (isFullscreen) => {
    tableHeightClass.value = isFullscreen ? 'h-[90vh]' : 'h-[70vh]';
  },
);

function restoreGridSelection() {
  const data = sharedData.value;
  const table = gridApi.grid;
  if (!data || !table) return;

  if (data.selectionMode === 'multiple') {
    table.clearCheckboxRow?.();
    currentSelectedRows.value.forEach((row) => {
      table.setCheckboxRow?.(row, true);
    });
  } else if (data.selectionMode === 'single') {
    table.clearRadioRow?.();
    if (currentSelectedRows.value && currentSelectedRows.value.length > 0) {
      table.setRadioRow?.(currentSelectedRows.value[0]);
    }
  }
}

function getRowLabel(item: EsModalTableRow) {
  const field =
    sharedData.value?.displayField ||
    props.displayField ||
    sharedData.value?.columns?.[0]?.field;
  return field ? String(item[String(field)] ?? '') : '';
}

function getRowKey(item: EsModalTableRow, index: number) {
  const keyField = sharedData.value?.keyField || props.keyField;
  const key = item[keyField];
  return typeof key === 'number' ||
    typeof key === 'string' ||
    typeof key === 'symbol'
    ? key
    : index;
}
</script>

<template>
  <Modal v-if="sharedData?.columns" class="w-[1200px]">
    <el-row :gutter="20" class="h-full">
      <el-col :span="16" class="flex h-full flex-col">
        <div :class="tableHeightClass">
          <Grid
            @checkbox-change="handleCheckboxChange"
            @radio-change="handleRadioChange"
          />
        </div>
      </el-col>
      <el-col :span="8" :class="tableHeightClass">
        <el-card class="h-full" shadow="never">
          <div class="mb-3 flex justify-between">
            <el-text tag="h3" size="large" class="font-semibold">
              已选择数据
            </el-text>
            <div class="flex items-center space-x-3">
              <el-text type="info">
                {{ currentSelectedRows.length }} 项
              </el-text>
              <el-button
                v-if="
                  currentSelectedRows.length > 0 &&
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
            <template v-if="currentSelectedRows.length > 0">
              <el-tag
                v-for="(item, index) in currentSelectedRows"
                :key="getRowKey(item, index)"
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
