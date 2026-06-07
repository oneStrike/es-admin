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
  emitScalar: false,
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
    } else if (isTableSelectRow(newValue) && newValue[props.keyField]) {
      confirmSelection([newValue]);
    } else {
      selectedRows.value = [
        {
          [props.keyField]: newValue,
          [props.displayField]: newValue,
        },
      ];
    }
  },
  { immediate: true },
);

const displayValue = computed<string[]>(() => {
  if (!selectedRows.value?.length) return [];
  return selectedRows.value.map((item) =>
    String(item[props.displayField] ?? item[props.keyField] ?? ''),
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
        displayField: props.displayField,
        keyField: props.keyField,
      })
      .open();
  }
}

function confirmSelection(selectedRowsData: TableSelectRow[] = []) {
  selectedRows.value = selectedRowsData;
  const values = selectedRows.value.map(
    (item) => item[props.keyField] as TableSelectValue,
  );
  const options = selectedRows.value.map((item) => ({
    label: String(item[props.displayField] ?? item[props.keyField] ?? ''),
    raw: item,
    value: item[props.keyField] as TableSelectValue,
  }));

  const nextValue = props.onlyKey ? values : selectedRows.value;

  emit(
    'update:modelValue',
    props.multiple || !props.emitScalar
      ? nextValue
      : (nextValue[0] ?? undefined),
  );
  emit('selectChange', props.multiple ? options : (options[0] ?? undefined));
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
