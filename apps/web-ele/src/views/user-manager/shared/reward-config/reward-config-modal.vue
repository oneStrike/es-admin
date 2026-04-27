<script lang="ts" setup>
import type {
  RewardConfigAssetOption,
  RewardConfigItemValue,
  RewardConfigValue,
} from './reward-config.types';

import { computed, reactive, watch } from 'vue';

import EsUpload from '#/components/es-upload/es-upload.vue';
import { UploadSceneEnum } from '#/enum/api';
import { useMessage } from '#/hooks/useFeedback';

import {
  cloneRewardConfigValue,
  createEmptyRewardConfigValue,
  createRewardItemValue,
  defaultRewardAssetOptions,
  formatRewardSummary,
  getRewardAssetOption,
  hasRewardItems,
  normalizeOptionalString,
  normalizeRewardItem,
} from './reward-config';

defineOptions({
  name: 'RewardConfigModal',
});

const props = withDefaults(
  defineProps<{
    allowClear?: boolean;
    allowEmptyConfirm?: boolean;
    assetOptions?: RewardConfigAssetOption[];
    clearButtonText?: string;
    confirmText?: string;
    modelValue?: Partial<RewardConfigValue>;
    overviewIconLabel?: string;
    showOverviewIcon?: boolean;
    title: string;
    visible: boolean;
  }>(),
  {
    allowClear: false,
    allowEmptyConfirm: false,
    assetOptions: () => defaultRewardAssetOptions,
    clearButtonText: '清空当前配置',
    confirmText: '应用配置',
    modelValue: () => createEmptyRewardConfigValue(),
    overviewIconLabel: '奖励总览图标',
    showOverviewIcon: false,
  },
);

const emit = defineEmits<{
  clear: [];
  confirm: [value: RewardConfigValue];
  'update:visible': [value: boolean];
}>();

const useDialogVisible = computed({
  get: () => props.visible,
  set: (value: boolean) => emit('update:visible', value),
});

const draft = reactive<RewardConfigValue>(createEmptyRewardConfigValue());

watch(
  () => props.visible,
  (visible) => {
    if (!visible) {
      return;
    }
    Object.assign(draft, cloneRewardConfigValue(props.modelValue));
  },
);

function addRewardItem() {
  draft.rewardItems.push(createRewardItemValue(props.assetOptions));
}

function removeRewardItem(index: number) {
  draft.rewardItems.splice(index, 1);
}

function handleAssetTypeChange(item: RewardConfigItemValue, assetType?: number) {
  item.assetType = Number(
    assetType || props.assetOptions[0]?.value || 1,
  ) as RewardConfigItemValue['assetType'];
  const assetOption = getRewardAssetOption(item.assetType, props.assetOptions);

  item.assetKey = assetOption?.supportsAssetKey
    ? normalizeOptionalString(item.assetKey)
    : (assetOption?.defaultAssetKey ?? '');
  if (!assetOption?.supportsIcon) {
    item.iconUrl = undefined;
  }
}

function handleConfirm() {
  const normalizedItems = draft.rewardItems.map((item) =>
    normalizeRewardItem(item, props.assetOptions),
  );

  for (const item of normalizedItems) {
    const assetOption = getRewardAssetOption(item.assetType, props.assetOptions);
    if (!assetOption) {
      useMessage.warning(`存在未支持的奖励类型：${item.assetType}`);
      return;
    }
    if (!Number.isFinite(item.amount) || Number(item.amount) <= 0) {
      useMessage.warning(`请填写 ${assetOption.label} 的有效奖励数量`);
      return;
    }
    if (assetOption.supportsAssetKey && !normalizeOptionalString(item.assetKey)) {
      useMessage.warning(`请填写 ${assetOption.label} 的资产键`);
      return;
    }
  }

  if (!props.allowEmptyConfirm && !hasRewardItems(normalizedItems)) {
    useMessage.warning('至少配置一项奖励');
    return;
  }

  emit('confirm', {
    rewardItems: normalizedItems,
    rewardOverviewIconUrl: props.showOverviewIcon
      ? normalizeOptionalString(draft.rewardOverviewIconUrl)
      : undefined,
  });
  useDialogVisible.value = false;
}

function handleClear() {
  draft.rewardItems = [];
  draft.rewardOverviewIconUrl = undefined;
}
</script>

<template>
  <el-dialog
    v-model="useDialogVisible"
    :title="title"
    width="980px"
    destroy-on-close
  >
    <div class="space-y-5">
      <slot name="prepend"></slot>

      <div
        v-if="showOverviewIcon"
        class="rounded-lg border border-slate-200 bg-slate-50/70 p-4"
      >
        <div class="mb-3 text-sm font-medium text-slate-700">
          {{ overviewIconLabel }}
        </div>
        <EsUpload
          :model-value="draft.rewardOverviewIconUrl || ''"
          :max-count="1"
          accept="image/*"
          list-type="picture-card"
          return-data-type="url"
          :scene="UploadSceneEnum.SHARED"
          @update:model-value="
            (value) =>
              (draft.rewardOverviewIconUrl = normalizeOptionalString(
                value as string,
              ))
          "
        />
      </div>

      <div class="rounded-lg border border-slate-200 bg-white p-4">
        <div class="mb-3 flex items-center justify-between gap-3">
          <div class="text-base font-semibold text-slate-900">奖励项列表</div>
          <el-button type="primary" plain @click="addRewardItem">
            添加奖励项
          </el-button>
        </div>

        <div
          v-if="draft.rewardItems.length === 0"
          class="rounded-lg border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-400"
        >
          暂未配置奖励项
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="(item, index) in draft.rewardItems"
            :key="`${item.assetType}-${index}`"
            class="rounded-lg border border-slate-200 bg-slate-50/70 p-4"
          >
            <div class="mb-3 flex items-center justify-between gap-3">
              <div class="text-sm font-medium text-slate-700">
                奖励项 {{ index + 1 }}
              </div>
              <el-button type="danger" link @click="removeRewardItem(index)">
                删除
              </el-button>
            </div>

            <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <div class="mb-2 text-sm font-medium text-slate-700">
                  奖励类型
                </div>
                <el-select
                  :model-value="item.assetType"
                  class="!w-full"
                  @update:model-value="
                    (value) => handleAssetTypeChange(item, value as number)
                  "
                >
                  <el-option
                    v-for="option in assetOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </div>

              <div>
                <div class="mb-2 text-sm font-medium text-slate-700">
                  奖励数量
                </div>
                <el-input-number
                  v-model="item.amount"
                  class="!w-full"
                  :min="1"
                  :precision="0"
                />
              </div>

              <div v-if="getRewardAssetOption(item.assetType, assetOptions)?.supportsAssetKey">
                <div class="mb-2 text-sm font-medium text-slate-700">
                  {{
                    getRewardAssetOption(item.assetType, assetOptions)
                      ?.assetKeyLabel || '资产键'
                  }}
                </div>
                <el-input
                  v-model="item.assetKey"
                  :placeholder="
                    getRewardAssetOption(item.assetType, assetOptions)
                      ?.assetKeyPlaceholder || '请输入资产键'
                  "
                />
              </div>

              <div v-if="getRewardAssetOption(item.assetType, assetOptions)?.supportsIcon">
                <div class="mb-2 text-sm font-medium text-slate-700">
                  奖励图标
                </div>
                <EsUpload
                  :model-value="item.iconUrl || ''"
                  :max-count="1"
                  accept="image/*"
                  list-type="picture-card"
                  return-data-type="url"
                  :scene="UploadSceneEnum.SHARED"
                  @update:model-value="
                    (value) =>
                      (item.iconUrl = normalizeOptionalString(value as string))
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-lg border border-slate-200 bg-slate-50/70 px-4 py-4 text-sm text-slate-600">
        当前摘要：{{ formatRewardSummary(draft.rewardItems, assetOptions) }}
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-between gap-3">
        <el-button v-if="allowClear" type="danger" @click="handleClear">
          {{ clearButtonText }}
        </el-button>
        <div class="ml-auto flex gap-3">
          <el-button @click="useDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">
            {{ confirmText }}
          </el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>
