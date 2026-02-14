<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

import { formSchema } from './modules/model/shared';

defineOptions({
  name: 'ChangesDetailModal',
});

interface ChangeItem {
  new: any;
  old: any;
}

interface ChangesData {
  changes: Record<string, ChangeItem>;
}

const sharedData = ref<ChangesData>();

const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      sharedData.value = modalApi.getData<ChangesData>();
    }
  },
});

const fieldLabelMap = computed(() => {
  const map: Record<string, string> = {};
  formSchema.forEach((item) => {
    if (item.fieldName && item.label) {
      map[item.fieldName] = String(item.label);
    }
  });
  return map;
});

const changesList = computed(() => {
  if (!sharedData.value?.changes) return [];

  return Object.entries(sharedData.value.changes).map(([key, value]) => ({
    fieldName: key,
    label: fieldLabelMap.value[key] || key,
    oldValue: value.old,
    newValue: value.new,
  }));
});

function formatValue(value: any): string {
  if (value === null || value === undefined) {
    return '-';
  }
  if (typeof value === 'boolean') {
    return value ? '是' : '否';
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
}

defineExpose({
  setData: modalApi.setData,
  open: modalApi.open,
  close: modalApi.close,
});
</script>

<template>
  <Modal title="变更详情" class="!w-[800px]">
    <div v-if="changesList.length === 0" class="py-8 text-center text-gray-500">
      暂无变更数据
    </div>
    <div v-else class="space-y-4">
      <el-card
        v-for="item in changesList"
        :key="item.fieldName"
        shadow="hover"
        class="rounded-lg border border-gray-200"
      >
        <div class="mb-3 flex items-center justify-between">
          <span class="text-base font-semibold text-gray-800">
            {{ item.label }}
          </span>
          <span class="text-xs text-gray-400">({{ item.fieldName }})</span>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
            <div
              class="mb-1 text-sm font-medium text-red-600 dark:text-red-400"
            >
              旧值
            </div>
            <div class="text-sm text-gray-700 dark:text-gray-300">
              {{ formatValue(item.oldValue) }}
            </div>
          </div>
          <div class="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
            <div
              class="mb-1 text-sm font-medium text-green-600 dark:text-green-400"
            >
              新值
            </div>
            <div class="text-sm text-gray-700 dark:text-gray-300">
              {{ formatValue(item.newValue) }}
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </Modal>
</template>
