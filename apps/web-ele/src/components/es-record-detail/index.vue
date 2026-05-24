<script setup lang="ts">
import type { DetailCard } from './types';

import { computed, defineComponent, h, ref, watch } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useMessage } from '#/hooks/useFeedback';
import { formatUTC } from '#/utils';

type DetailRecord = Record<string, unknown>;
type DetailTagType = 'danger' | 'info' | 'primary' | 'success' | 'warning';

interface Props {
  title?: string;
  api?: (params: { id: number }) => Promise<DetailRecord>;
  recordId?: number;
  data?: DetailRecord;
  cards: (data: DetailRecord, extraData?: DetailRecord) => DetailCard[];
}

defineOptions({
  name: 'EsRecordDetail',
});

const props = withDefaults(defineProps<Props>(), {
  title: '详情',
  api: undefined,
  recordId: undefined,
  data: undefined,
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'confirm'): void;
}>();

const TrustedHtmlContent = defineComponent({
  name: 'TrustedHtmlContent',
  props: {
    html: {
      type: String,
      default: '',
    },
  },
  setup(componentProps) {
    return () =>
      h('div', {
        class: 'prose max-w-none dark:prose-invert',
        innerHTML: componentProps.html || '-',
      });
  },
});

const sharedData = ref<Props>();

const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const modalData = modalApi.getData<DetailRecord & Props>() || {};
      sharedData.value = {
        ...props,
        ...modalData,
      };
      detail.value = sharedData.value.data ?? props.data;
      extraData.value = modalData;
      modalApi.setState({
        title: sharedData.value?.title || '详情',
      });
      if (sharedData.value.api) {
        getDetail();
      }
    }
  },
  onConfirm() {
    emit('confirm');
    modalApi.close();
  },
  onClosed() {
    emit('close');
  },
});

const detail = ref<DetailRecord | undefined>(props.data);
const loading = ref(false);
const extraData = ref<DetailRecord>({});

watch(
  () => props.data,
  (newData) => {
    if (newData) {
      detail.value = newData;
    }
  },
);

async function getDetail() {
  const api = sharedData.value?.api;
  if (!api) return;

  try {
    loading.value = true;
    const recordId = sharedData.value?.recordId;

    if (recordId === undefined || recordId === null) {
      useMessage.warning('缺少详情记录ID');
      return;
    }

    detail.value = await api({ id: recordId });
  } catch {
    // API failures are reported by the global request interceptor.
  } finally {
    loading.value = false;
  }
}

function formatDetailDate(value: unknown, dateType?: string) {
  return formatUTC(
    value as Parameters<typeof formatUTC>[0],
    dateType || 'YYYY-MM-DD HH:mm:ss',
  );
}

function resolveTagType(type?: string): DetailTagType {
  const tagTypes: DetailTagType[] = [
    'danger',
    'info',
    'primary',
    'success',
    'warning',
  ];
  return tagTypes.includes(type as DetailTagType)
    ? (type as DetailTagType)
    : 'info';
}

const detailCards = computed(() => {
  if (!detail.value) return [];
  return (sharedData.value?.cards || props.cards)(
    detail.value,
    extraData.value,
  );
});

const availableDetailCards = computed(() => {
  return detailCards.value.filter((card) => {
    if (!card.show) return false;
    if (card.type === 'image') return !!card.imageUrl;
    return true;
  });
});

const topImageCards = computed(() => {
  return availableDetailCards.value.filter(
    (card) => card.type === 'image' && card.pinTop !== false,
  );
});

const normalDetailCards = computed(() => {
  return availableDetailCards.value.filter(
    (card) => card.type !== 'image' || card.pinTop === false,
  );
});

defineExpose({
  setData: modalApi.setData,
  open: modalApi.open,
  close: modalApi.close,
});
</script>

<template>
  <Modal class="w-[1000px]">
    <div v-loading="loading" class="space-y-6">
      <div
        v-for="(card, index) in topImageCards"
        :key="`top-image-${card.title || 'image'}-${index}`"
        class="flex justify-center py-4"
      >
        <el-image
          :src="card.imageUrl || ''"
          :preview-src-list="card.imageUrl ? [card.imageUrl] : []"
          class="es-record-detail__top-image h-64 w-48 rounded-xl border-4 object-cover shadow-lg"
          fit="cover"
          preview-teleported
        />
      </div>
      <template
        v-for="(card, index) in normalDetailCards"
        :key="`detail-card-${card.title || 'card'}-${index}`"
      >
        <el-card shadow="hover">
          <template v-if="card.title" #header>
            <div class="flex items-center">
              <el-text tag="span" size="large" class="font-semibold">
                {{ card.title }}
              </el-text>
            </div>
          </template>

          <div v-if="card.fields">
            <div v-for="field in card.fields" :key="field.label" class="mb-4">
              <el-text
                v-if="field.type === 'title'"
                tag="h2"
                size="large"
                class="mb-2 block text-center font-bold"
              >
                {{ field.value || '-' }}
              </el-text>
            </div>

            <el-descriptions
              :column="card.title ? 2 : 4"
              :border="false"
              class="!gap-x-8 !gap-y-4 !text-sm"
            >
              <el-descriptions-item
                v-for="field in card.fields.filter((f) => f.type !== 'title')"
                :key="field.label"
                :label="`${field.label}：`"
              >
                <el-text
                  v-if="field.type === 'text' || field.type === 'date'"
                  :style="field.color ? { color: field.color } : undefined"
                  class="text-sm"
                >
                  {{
                    field.value === null || field.value === undefined
                      ? '-'
                      : field.type === 'date'
                        ? formatDetailDate(field.value, field.dateType)
                        : field.value
                  }}
                </el-text>

                <el-tag
                  v-else-if="field.type === 'tag' && 'tagText' in field"
                  :type="resolveTagType(field.tagType)"
                  size="small"
                >
                  {{ field.tagText || '-' }}
                </el-tag>

                <el-image
                  v-else-if="field.type === 'image' && field.value"
                  :src="String(field.value)"
                  :alt="field.label"
                  class="max-h-[100px] max-w-[100px] rounded"
                  fit="cover"
                  preview-teleported
                />
              </el-descriptions-item>
            </el-descriptions>
          </div>

          <div
            v-else-if="card.type === 'image' && card.imageUrl"
            class="flex justify-center"
          >
            <el-image
              :src="card.imageUrl"
              :preview-src-list="[card.imageUrl]"
              class="max-h-80 max-w-full rounded-lg"
              fit="contain"
              preview-teleported
            />
          </div>

          <div
            v-else-if="card.type === 'html'"
            class="es-record-detail__content"
          >
            <TrustedHtmlContent :html="card.content || '-'" />
          </div>

          <div
            v-else-if="card.type === 'text'"
            class="es-record-detail__content"
          >
            <TrustedHtmlContent :html="card.content || '-'" />
          </div>
        </el-card>
      </template>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
.es-record-detail__top-image {
  border-color: var(--el-bg-color-overlay);
}

.es-record-detail__content {
  padding: 16px;
  color: var(--el-text-color-primary);
  background-color: var(--el-fill-color-lighter);
  border-radius: var(--el-border-radius-base);
}
</style>
