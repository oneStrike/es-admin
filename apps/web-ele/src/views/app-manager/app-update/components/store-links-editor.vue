<script lang="ts" setup>
import type {
  AppUpdateChannelOption,
  AppUpdateStoreLinkFormItem,
} from '../model/store-links';

defineOptions({
  name: 'AppUpdateStoreLinksEditor',
});

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    modelValue?: AppUpdateStoreLinkFormItem[];
    options?: AppUpdateChannelOption[];
    platform?: null | string;
  }>(),
  {
    disabled: false,
    modelValue: () => [],
    options: () => [],
    platform: undefined,
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: AppUpdateStoreLinkFormItem[]): void;
}>();

const storeLinks = computed(() => props.modelValue ?? []);
const channelOptions = computed(() => props.options ?? []);
const resolvedChannelOptions = computed(() => {
  const optionMap = new Map(
    channelOptions.value.map((item) => [item.value, item.label]),
  );

  storeLinks.value.forEach((item) => {
    if (!item.channelCode || optionMap.has(item.channelCode)) {
      return;
    }

    optionMap.set(item.channelCode, item.channelName || item.channelCode);
  });

  return [...optionMap.entries()].map(([value, label]) => ({
    label,
    value,
  }));
});

function updateStoreLinks(nextStoreLinks: AppUpdateStoreLinkFormItem[]) {
  emit('update:modelValue', nextStoreLinks);
}

function updateStoreLink(
  index: number,
  field: keyof AppUpdateStoreLinkFormItem,
  value: string,
) {
  const nextStoreLinks = storeLinks.value.map((item, itemIndex) =>
    itemIndex === index
      ? {
          ...item,
          [field]: value,
        }
      : item,
  );

  updateStoreLinks(nextStoreLinks);
}

function updateChannelCode(index: number, value: string) {
  const matchedChannel = resolvedChannelOptions.value.find(
    (item) => item.value === value,
  );

  const nextStoreLinks = storeLinks.value.map((item, itemIndex) =>
    itemIndex === index
      ? {
          ...item,
          channelCode: value,
          channelName: matchedChannel?.label || item.channelName,
        }
      : item,
  );

  updateStoreLinks(nextStoreLinks);
}

function addStoreLink() {
  if (!props.platform) {
    return;
  }

  updateStoreLinks([
    ...storeLinks.value,
    { channelCode: '', channelName: '', storeUrl: '' },
  ]);
}

function removeStoreLink(index: number) {
  updateStoreLinks(
    storeLinks.value.filter((_, itemIndex) => itemIndex !== index),
  );
}

watch(
  () => props.platform,
  (currentPlatform, previousPlatform) => {
    if (!previousPlatform || previousPlatform === currentPlatform) {
      return;
    }

    const allowedCodes = new Set(channelOptions.value.map((item) => item.value));
    updateStoreLinks(
      storeLinks.value.filter(
        (item) => item.channelCode && allowedCodes.has(item.channelCode),
      ),
    );
  },
);
</script>

<template>
  <div class="w-full space-y-3">
    <div
      v-if="storeLinks.length === 0"
      class="rounded-md border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-500"
    >
      {{
        platform
          ? '暂未配置应用商店地址，可点击下方按钮新增'
          : '请先选择发布平台，再配置对应的应用商店地址'
      }}
    </div>

    <div
      v-for="(storeLink, index) in storeLinks"
      :key="`${index}-${storeLink.channelCode}-${storeLink.storeUrl}`"
      class="rounded-md border border-slate-200 px-4 py-4"
    >
      <div class="mb-3 flex items-center justify-between">
        <span class="text-sm font-medium text-slate-700">
          商店地址 {{ index + 1 }}
        </span>
        <el-button
          link
          type="danger"
          :disabled="disabled"
          @click="removeStoreLink(index)"
        >
          删除
        </el-button>
      </div>

      <div class="grid gap-3 md:grid-cols-2">
        <el-select
          :disabled="disabled || !platform"
          :model-value="storeLink.channelCode"
          clearable
          filterable
          placeholder="请选择渠道"
          @update:model-value="updateChannelCode(index, $event)"
        >
          <el-option
            v-for="option in resolvedChannelOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>

        <div class="flex items-center rounded-md border border-dashed border-slate-200 px-3 text-sm text-slate-500">
          {{ storeLink.channelName || '渠道名称将自动带出' }}
        </div>
      </div>

      <el-input
        class="mt-3"
        :disabled="disabled"
        :model-value="storeLink.storeUrl"
        placeholder="请输入应用商店地址"
        @update:model-value="updateStoreLink(index, 'storeUrl', $event)"
      />
    </div>

    <el-button
      plain
      type="primary"
      class="w-full"
      :disabled="disabled || !platform"
      @click="addStoreLink"
    >
      添加商店地址
    </el-button>
  </div>
</template>
