<script setup lang="ts">
import type { ColorItem, EsMultiColorPickerProps } from './types';

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

const colorItems = ref<ColorItem[]>([]);

const displayColorItems = computed(() => {
  return colorItems.value.map((item) => ({
    name: item.name || '未命名',
    color: item.color || '#000000',
  }));
});

const isAddDisabled = computed(() => {
  return props.disabled || displayColorItems.value.length >= props.maxCount;
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
    colorItems.value = [];
    return;
  }
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      colorItems.value = parsed;
    }
  } catch {
    colorItems.value = [];
  }
}

function handleNameChange(index: number, name: string) {
  colorItems.value[index]!.name = name;
  emitValue();
}

function handleColorChange(index: number, color: null | string) {
  colorItems.value[index]!.color = color || '';
  emitValue();
}

function addColor() {
  colorItems.value.push({
    name: '',
    color: '#000000',
  });
  emitValue();
}

function removeColor(index: number) {
  colorItems.value.splice(index, 1);
  emitValue();
}

function emitValue() {
  const value = JSON.stringify(colorItems.value.filter((item) => item.color));
  emit('update:modelValue', value);
}

defineExpose({
  getColors: () => colorItems.value,
});
</script>

<template>
  <div class="es-multi-color-picker">
    <div v-if="displayColorItems.length === 0" class="empty-state">
      <el-button :disabled="isAddDisabled" type="primary" @click="addColor">
        <PlusIcon class="mr-1" />
        添加颜色
      </el-button>
    </div>
    <div v-else class="color-tag-list">
      <el-tag
        v-for="(item, index) in displayColorItems"
        :key="index"
        closable
        :disable-transitions="false"
        @close="removeColor(index)"
      >
        <div class="color-tag-content">
          <el-input
            :model-value="item.name"
            :disabled="props.disabled"
            size="small"
            placeholder="颜色名称"
            class="name-input"
            @update:model-value="(val: string) => handleNameChange(index, val)"
          />
          <el-color-picker
            :model-value="item.color"
            :disabled="props.disabled"
            size="small"
            @update:model-value="
              (val: string | null) => handleColorChange(index, val)
            "
          />
          <span class="color-value">{{ item.color }}</span>
        </div>
      </el-tag>
      <el-button
        v-if="displayColorItems.length < maxCount"
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
      gap: 8px;
      align-items: center;

      .name-input {
        width: 100px;
      }

      .color-value {
        font-family: 'Courier New', monospace;
        font-size: 13px;
        color: #606266;
      }
    }
  }
}
</style>
