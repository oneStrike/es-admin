<script setup lang="ts">
import type { EsTableSelectProps } from './types';

import { ref, watch } from 'vue';

import { useVbenModal } from '@vben/common-ui';

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
  multiple: true,
  displayField: 'name',
});

// 定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', value: number[]): void;
  (e: 'selectChange', options: any[]): void;
}>();

// 选中值
const selectedValues = ref<number[]>(props.modelValue || []);
// 选中的完整数据记录
const selectedRows = ref<any[]>([]);

// 监听绑定值变化
watch(
  () => props.modelValue,
  (newValue) => {
    selectedValues.value = newValue || [];
  },
  { immediate: true, deep: true },
);

const displayValue = ref<string[]>([]);
const [ModalTable, modalTableApi] = useVbenModal({
  connectedComponent: EsModalTable,
  title: props.title,
  onConfirm() {
    // 触发事件
    emit('update:modelValue', selectedValues.value);
    displayValue.value = selectedRows.value.map(
      (row) => row[props.displayField],
    );
    modalTableApi.close();
  },
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
        searchSchema: props.searchSchema,
        selectionMode: props.multiple ? 'multiple' : 'single',
        selectedRows: selectedRows.value,
        multipleLimit: props.multipleLimit,
      })
      .open();
  }
}

// 处理选择结果
function handleSelect(selectedRowsData: any[]) {
  if (selectedRowsData.length === 0) return;

  // 提取选中值
  const values = selectedRowsData.map((row) => row.id || row.value);
  selectedValues.value = props.multiple ? values : values.slice(0, 1);
  // 更新选中的完整数据记录
  selectedRows.value = selectedRowsData;

  // 触发事件
  emit('selectChange', selectedRowsData);
}

// 暴露获取选中数据的方法
defineExpose({
  /**
   * 获取当前所有选中的数据
   * @returns 选中的数据数组
   */
  getSelectedData: () => selectedRows.value,
});
</script>

<template>
  <div class="relative w-full">
    <el-input-tag
      :model-value="displayValue"
      class="!cursor-pointer"
      :placeholder="props.placeholder"
      @click="openTableModal"
    />

    <!-- 使用表格模态框组件 -->
    <ModalTable @select="handleSelect" />
  </div>
</template>

<style scoped lang="scss">
::v-deep(.el-input-tag__input) {
  cursor: pointer;
}
</style>
