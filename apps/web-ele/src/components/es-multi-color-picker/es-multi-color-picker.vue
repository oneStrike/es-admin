<script setup lang="ts">
import type { EsMultiColorPickerProps } from './types';

import { computed, ref, watch } from 'vue';

import { PlusIcon } from '#/components/es-icons';

defineOptions({
  name: 'EsMultiColorPicker',
});

const props = withDefaults(defineProps<EsMultiColorPickerProps>(), {
  placeholder: '请选择颜色',
  disabled: false,
  maxCount: 10,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const colors = ref<string[]>([]);

const displayColors = computed(() => {
  return colors.value.map((color) => color || '#000000');
});

const isAddDisabled = computed(() => {
  return props.disabled || displayColors.value.length >= props.maxCount;
});

watch(
  () => props.modelValue,
  (newValue) => {
    parseValue(newValue);
  },
  { immediate: true },
);

function parseValue(value: string | undefined) {
  if (!value) {
    colors.value = [];
    return;
  }
  colors.value = value.split(',').filter(Boolean);
}

function handleColorChange(index: number, color: null | string) {
  colors.value[index] = color || '';
  emitValue();
}

function addColor() {
  colors.value.push('#000000');
  emitValue();
}

function removeColor(index: number) {
  colors.value.splice(index, 1);
  emitValue();
}

function emitValue() {
  const value = colors.value.filter(Boolean).join(',');
  emit('update:modelValue', value);
}

defineExpose({
  getColors: () => colors.value,
});
</script>

<template>
  <div class="es-multi-color-picker">
    <div v-if="displayColors.length === 0" class="empty-state">
      <el-button :disabled="isAddDisabled" type="primary" @click="addColor">
        <PlusIcon class="mr-1" />
        添加颜色
      </el-button>
    </div>
    <div v-else class="color-tag-list">
      <el-tag
        v-for="(color, index) in displayColors"
        :key="index"
        closable
        :disable-transitions="false"
        @close="removeColor(index)"
      >
        <div class="color-tag-content">
          <el-color-picker
            :model-value="color"
            :disabled="props.disabled"
            size="small"
            @update:model-value="
              (val: string | null) => handleColorChange(index, val)
            "
          />
          <span class="color-value">{{ color }}</span>
        </div>
      </el-tag>
      <el-button
        v-if="displayColors.length < maxCount"
        :disabled="isAddDisabled"
        type="primary"
        size="small"
        circle
        @click="addColor"
      >
        <PlusIcon />
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.es-multi-color-picker {
  width: 100%;
  min-height: 48px;

  .empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    padding: 12px 0;
  }

  .color-tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    padding: 12px 0;

    .color-tag-content {
      display: flex;
      align-items: center;
      gap: 8px;

      .color-value {
        font-family: 'Courier New', monospace;
        font-size: 13px;
        color: #606266;
      }
    }
  }
}
</style>
