<script setup lang="ts">
import type {
  EsTableSelectEmits,
  EsTableSelectProps,
  TableSelectRow,
  TableSelectValue,
} from './types';

import { computed, ref, watch } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { createSearchFormOptions } from '#/utils';

import EsModalTable from '../es-modal-table';

defineOptions({
  name: 'EsTableSelect',
});

const props = withDefaults(defineProps<EsTableSelectProps>(), {
  placeholder: '请选择',
  disabled: false,
  title: '选择数据',
  width: 1000,
  onlyKey: true,
  multiple: true,
  keyField: 'id',
  displayField: 'name',
});
const emit = defineEmits<EsTableSelectEmits>();
const selectedRows = ref<TableSelectRow[]>([]);

watch(
  () => props.modelValue,
  (newValue) => {
    if (Array.isArray(newValue)) {
      if (newValue.length > 0) {
        const firstValue = newValue[0];
        if (isTableSelectRow(firstValue) && firstValue[props.keyField]) {
          confirmSelection(newValue as TableSelectRow[]);
        }
      } else {
        selectedRows.value = [];
      }
    } else if (!newValue) {
      selectedRows.value = [];
    }
  },
  { immediate: true },
);

const displayValue = computed<string[]>(() => {
  if (!selectedRows.value?.length) return [];
  return selectedRows.value.map((item) =>
    String(item[props.displayField] ?? ''),
  );
});

const modalSearchSchema = computed(() => {
  return props.searchSchema
    ? createSearchFormOptions(props.searchSchema)
    : undefined;
});

const [ModalTable, modalTableApi] = useVbenModal({
  connectedComponent: EsModalTable,
  title: props.title,
});

function openTableModal() {
  if (!props.disabled) {
    modalTableApi
      .setData({
        title: props.title,
        width: props.width,
        columns: props.columns,
        api: props.api,
        gridProps: props.gridProps,
        selectionMode: props.multiple ? 'multiple' : 'single',
        selectedRows: selectedRows.value,
        multipleLimit: props.multipleLimit,
      })
      .open();
  }
}

function confirmSelection(selectedRowsData: TableSelectRow[] = []) {
  selectedRows.value = selectedRowsData;
  const values = selectedRows.value.map(
    (item) => item[props.keyField] as TableSelectValue,
  );

  emit('update:modelValue', props.onlyKey ? values : selectedRows.value);
}

function handleRemoveTag(_value: string, idx: number) {
  selectedRows.value.splice(idx, 1);
  confirmSelection(selectedRows.value);
}

defineExpose({
  getSelectedData: () => selectedRows.value,
});

function isTableSelectRow(value: unknown): value is TableSelectRow {
  return typeof value === 'object' && value !== null;
}
</script>

<template>
  <div class="es-table-select relative w-full">
    <el-input-tag
      v-if="displayValue.length > 0"
      :model-value="displayValue"
      :placeholder="props.placeholder"
      @click="openTableModal"
      @remove-tag="handleRemoveTag"
    />
    <el-input v-else :placeholder="props.placeholder" @click="openTableModal" />

    <ModalTable
      :search-schema="modalSearchSchema"
      @confirm="confirmSelection"
    />
  </div>
</template>

<style lang="scss">
.es-table-select .el-input-tag__input,
.es-table-select .el-input__inner {
  cursor: pointer;
}
</style>
