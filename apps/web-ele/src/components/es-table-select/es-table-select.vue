<script setup lang="ts">
import type { EsTableSelectProps } from './types';

import { computed, ref, watch } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { createSearchFormOptions } from '#/utils';

// 导入自定义组件
import EsModalTable from '../es-modal-table';

// 定义组件名称
defineOptions({
  name: 'EsTableSelect',
});

// 定义组件属性
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
// 定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', value: number[]): void;
  (e: 'selectChange', options: any[]): void;
}>();
// 选中的完整数据记录
const selectedRows = ref<any[]>([]);

// 监听绑定值变化（非深度监听，性能更好）
watch(
  () => props.modelValue,
  (newValue) => {
    if (Array.isArray(newValue)) {
      if (newValue.length > 0) {
        if (newValue[0]![props.keyField]) {
          confirmSelection(newValue);
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

// 使用 computed 计算显示值，避免手动管理响应式
const displayValue = computed<string[]>(() => {
  if (!selectedRows.value?.length) return [];
  return selectedRows.value.map((item) => item?.[props.displayField] ?? '');
});

const [ModalTable, modalTableApi] = useVbenModal({
  connectedComponent: EsModalTable,
  title: props.title,
});

// 打开表格模态框
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

// 确认选择
function confirmSelection(selectedRowsData: any[] = []) {
  selectedRows.value = selectedRowsData;
  const values = selectedRows.value.map((item: any) => item[props.keyField]);

  // 触发事件
  emit('update:modelValue', props.onlyKey ? values : selectedRows.value);
}

function handleRemoveTag(_value: string, idx: number) {
  selectedRows.value.splice(idx, 1);
  confirmSelection(selectedRows.value);
}

defineExpose({
  getSelectedData: () => selectedRows.value,
});
</script>

<template>
  <div class="relative w-full">
    <el-input-tag
      v-if="displayValue.length > 0"
      :model-value="displayValue"
      :placeholder="props.placeholder"
      @click="openTableModal"
      @remove-tag="handleRemoveTag"
    />
    <el-input v-else :placeholder="props.placeholder" @click="openTableModal" />

    <!-- 使用表格模态框组件 -->
    <ModalTable
      :search-schema="
        createSearchFormOptions(props.searchSchema!, {
          wrapperClass: 'grid-cols-2',
          showCollapseButton: false,
        })
      "
      @confirm="confirmSelection"
    />
  </div>
</template>

<style scoped lang="scss">
::v-deep(.el-input-tag__input) {
  cursor: pointer;
}

::v-deep(.el-input__inner) {
  cursor: pointer;
}
</style>
