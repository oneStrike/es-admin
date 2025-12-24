<script setup lang="ts">
import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type { EsModalTableEmits, EsModalTableProps } from './types';

import { nextTick, ref } from 'vue';

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
  height: 700,
});

const emit = defineEmits<EsModalTableEmits>();

const sharedData = ref<EsModalTableProps>();
// 存储当前选中的行数据
const selectedRows = ref<any[]>([]);
// 初始化表格，使用gridEvents配置
const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: props.searchSchema,
  gridEvents: {
    radioChange(params: any) {
      handleRadioChange(params);
    },
    checkboxChange(params: any) {
      handleCheckboxChange(params);
    },
    checkboxAll(params: any) {
      handleCheckboxChange(params);
    },
  },
});

function getGridOptions(data: EsModalTableProps) {
  const options: VxeGridProps<any> = {
    height: typeof data.height === 'number' ? `${data.height}px` : data.height,
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

  const labelField = data.columns![0]!.field;

  if (data.selectionMode === 'multiple') {
    options.checkboxConfig = {
      highlight: true,
      labelField,
    };
    options.columns![0]!.type = 'checkbox';
  } else if (data.selectionMode === 'single') {
    options.radioConfig = {
      highlight: true,
      labelField,
    };
    options.columns![0]!.type = 'radio';
  }

  return options;
}

// 处理复选框选择变化
function handleCheckboxChange(params: any) {
  handleSelectionChange(params.records);
}

// 处理单选框选择变化
function handleRadioChange(params: any) {
  handleSelectionChange(params.records);
}
// 处理选择变化
function handleSelectionChange(records: any[]) {
  const data = sharedData.value;
  if (!data) return;

  // 多选模式下的限制处理
  if (
    data.selectionMode === 'multiple' &&
    data.multipleLimit &&
    records.length > data.multipleLimit
  ) {
    // 超过限制，恢复之前的选择状态
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

// 单个取消选择
function handleRemoveItem(item: any) {
  const data = sharedData.value;
  if (!data) return;

  if (data.selectionMode === 'multiple') {
    // 从选中列表中移除该项
    const newSelectedRows = selectedRows.value.filter(
      (row) => row.id !== item.id,
    );
    // 更新表格选择状态
    gridApi.grid?.clearCheckboxRow();
    newSelectedRows.forEach((row) => gridApi.grid?.setCheckboxRow(row, true));
    // 更新选中数据
    selectedRows.value = newSelectedRows;
    emit('select', newSelectedRows);
  } else if (data.selectionMode === 'single') {
    // 单选模式下直接清空选择
    gridApi.grid?.clearRadioRow();
    selectedRows.value = [];
    emit('select', []);
  }
}

// 批量取消选择
function handleBatchRemove() {
  const data = sharedData.value;
  if (!data) return;

  if (data.selectionMode === 'multiple') {
    // 清空表格选择状态
    gridApi.grid?.clearCheckboxRow();
    // 更新选中数据
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
      // 如果调用方传入了初始已选数据，则优先使用
      selectedRows.value = (sharedData.value as any)?.selectedRows || [];
      gridApi.setGridOptions(getGridOptions(sharedData.value));

      // if (sharedData.value?.searchSchema) {
      //   gridApi.formApi.updateSchema(sharedData.value.searchSchema);
      // }
      nextTick(() => {
        gridApi.reload().then(() => {
          // 表格数据刷新后恢复选中回显
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

// 将组件内的 selectedRows 同步到表格，用于打开时回显
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
</script>

<template>
  <Modal
    v-if="sharedData?.columns"
    class="w-[1080px]"
    :height="
      sharedData.height && typeof sharedData.height === 'number'
        ? sharedData.height + 100
        : 600
    "
  >
    <el-row :gutter="20" class="h-full">
      <!-- 左侧表格区域 -->
      <el-col :span="16" class="h-full">
        <Grid
          @checkbox-change="handleCheckboxChange"
          @radio-change="handleRadioChange"
        />
      </el-col>
      <!-- 右侧回显面板 -->
      <el-col :span="8" class="h-full">
        <div
          class="selected-panel h-full rounded-lg border border-gray-200 p-4"
        >
          <!-- 面板标题 -->
          <div class="panel-header my-3 flex items-center justify-between">
            <h3 class="text-lg font-semibold">已选择数据</h3>
            <div class="flex items-center space-x-2">
              <span class="text-gray-500"> {{ selectedRows.length }} 项 </span>
              <!-- 批量取消选择按钮 -->
              <el-button
                v-if="
                  selectedRows.length > 0 &&
                  sharedData.selectionMode === 'multiple'
                "
                type="text"
                @click="handleBatchRemove"
                icon="el-icon-delete"
              >
                清空
              </el-button>
            </div>
          </div>
          <!-- 面板内容 -->
          <div class="panel-content overflow-y-auto">
            <!-- 选中项列表 -->
            <div v-if="selectedRows.length > 0" class="selected-list">
              <div
                v-for="(item, index) in selectedRows"
                :key="item.id || index"
                class="selected-item mb-2 flex items-center justify-between rounded-md border border-gray-100 p-3 hover:bg-gray-50"
              >
                <!-- 选中项信息 -->
                <div class="item-info truncate">
                  {{
                    sharedData.columns?.[0]?.field
                      ? item[sharedData.columns[0].field]
                      : ''
                  }}
                </div>
                <!-- 取消选择按钮 -->
                <DeleteBinIcon
                  class="cursor-pointer transition-colors duration-300 hover:text-red-600"
                  @click="handleRemoveItem(item)"
                />
              </div>
            </div>
            <!-- 空状态 -->
            <div v-else class="empty-state py-10 text-center text-gray-400">
              <el-icon class="mb-2 text-4xl" name="el-icon-document-remove" />
              <p>暂无选中数据</p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </Modal>
</template>

<style scoped lang="scss">
.selected-panel {
  display: flex;
  flex-direction: column;
}

.panel-header {
  flex-shrink: 0;
}

.panel-content {
  flex: 1;
}

.selected-list {
  display: flex;
  flex-direction: column;
}

.selected-item {
  transition: all 0.3s ease;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
