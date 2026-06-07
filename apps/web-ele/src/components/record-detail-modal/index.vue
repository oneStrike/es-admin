<script setup lang="ts">
import type {
  DetailTagType,
  RecordDescriptionItem,
  RecordDetailSection,
} from './types';

import { computed, defineComponent, h, ref, watch } from 'vue';

import {
  useVbenModal,
  VbenDescriptions,
  VbenDescriptionsItem,
} from '@vben/common-ui';

import { useMessage } from '#/hooks/useFeedback';
import { formatUTC } from '#/utils';

type DetailRecord = Record<string, unknown>;
interface Props {
  title?: string;
  api?: (params: { id: number }) => Promise<DetailRecord>;
  id?: number;
  data?: DetailRecord;
  sections: (
    data: DetailRecord,
    extraData?: DetailRecord,
  ) => RecordDetailSection[];
}

defineOptions({
  name: 'RecordDetailModal',
});

const props = withDefaults(defineProps<Props>(), {
  title: '详情',
  api: undefined,
  id: undefined,
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
        innerHTML: sanitizeDetailHtml(componentProps.html || '-'),
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
    const recordId = sharedData.value?.id;

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

function isEmptyDetailValue(value: unknown) {
  return value === undefined || value === null || value === '';
}

function sanitizeDetailHtml(html: string) {
  if (typeof window === 'undefined') {
    return '';
  }

  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(html, 'text/html');
  sanitizeHtmlChildren(parsedDocument.body);

  return parsedDocument.body.innerHTML || '-';
}

function sanitizeHtmlChildren(parent: ParentNode) {
  const allowedElements = new Set([
    'a',
    'b',
    'blockquote',
    'br',
    'code',
    'div',
    'em',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'i',
    'img',
    'li',
    'ol',
    'p',
    'pre',
    's',
    'span',
    'strong',
    'table',
    'tbody',
    'td',
    'th',
    'thead',
    'tr',
    'u',
    'ul',
  ]);
  const removableElements = new Set([
    'base',
    'embed',
    'form',
    'iframe',
    'input',
    'link',
    'meta',
    'object',
    'script',
    'style',
  ]);

  [...parent.childNodes].forEach((node) => {
    if (!(node instanceof Element)) {
      return;
    }

    const tagName = node.tagName.toLowerCase();
    if (removableElements.has(tagName)) {
      node.remove();
      return;
    }

    if (!allowedElements.has(tagName)) {
      const children = [...node.childNodes];
      node.replaceWith(...children);
      children.forEach((child) => {
        if (child instanceof Element) {
          sanitizeHtmlChildren(child);
        }
      });
      return;
    }

    sanitizeHtmlAttributes(node, tagName);
    sanitizeHtmlChildren(node);
  });
}

function sanitizeHtmlAttributes(element: Element, tagName: string) {
  const globalAttributes = new Set(['class', 'title']);
  const tagAttributes: Record<string, Set<string>> = {
    a: new Set(['href', 'rel', 'target']),
    img: new Set(['alt', 'src']),
    td: new Set(['colspan', 'rowspan']),
    th: new Set(['colspan', 'rowspan']),
  };
  const allowedAttributes = tagAttributes[tagName] ?? new Set<string>();

  [...element.attributes].forEach((attribute) => {
    const name = attribute.name.toLowerCase();
    const isAllowed = globalAttributes.has(name) || allowedAttributes.has(name);

    if (
      !isAllowed ||
      !isSafeHtmlAttributeValue(tagName, name, attribute.value)
    ) {
      element.removeAttribute(attribute.name);
    }
  });

  if (tagName === 'a' && element.getAttribute('target') === '_blank') {
    element.setAttribute('rel', 'noopener noreferrer');
  }
}

function isSafeHtmlAttributeValue(
  tagName: string,
  attributeName: string,
  value: string,
) {
  if (attributeName === 'href') {
    return (
      tagName === 'a' &&
      isAllowedHtmlUrl(value, ['http', 'https', 'mailto', 'tel'])
    );
  }
  if (attributeName === 'src') {
    return tagName === 'img' && isAllowedHtmlUrl(value, ['http', 'https']);
  }
  if (attributeName === 'target') {
    return value === '_blank' || value === '_self';
  }
  if (attributeName === 'colspan' || attributeName === 'rowspan') {
    return /^[1-9]\d{0,2}$/.test(value);
  }
  return true;
}

function isAllowedHtmlUrl(value: string, allowedProtocols: string[]) {
  const normalized = value.replaceAll(/[\u0000-\u001F\u007F\s]+/g, '');
  if (normalized.startsWith('#') || normalized.startsWith('/')) {
    return true;
  }

  try {
    const url = new URL(normalized, window.location.origin);
    return allowedProtocols.includes(url.protocol.replace(':', ''));
  } catch {
    return false;
  }
}

function formatDescriptionFieldValue(field: RecordDescriptionItem) {
  if (isEmptyDetailValue(field.value)) {
    return '-';
  }
  if (field.type === 'date') {
    return formatDetailDate(field.value, field.dateType);
  }
  return String(field.value);
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

function getTitleFields(fields?: RecordDescriptionItem[]) {
  return fields?.filter((field) => field.type === 'title') ?? [];
}

function getDescriptionFields(fields?: RecordDescriptionItem[]) {
  return fields?.filter((field) => field.type !== 'title') ?? [];
}

const detailSections = computed(() => {
  if (!detail.value) return [];
  return (sharedData.value?.sections || props.sections)(
    detail.value,
    extraData.value,
  );
});

const availableDetailSections = computed(() => {
  return detailSections.value.filter((section) => {
    if (!section.show) return false;
    if (section.type === 'image') return !!section.imageUrl;
    return true;
  });
});

const topImageSections = computed(() => {
  return availableDetailSections.value.filter(
    (section) => section.type === 'image' && section.pinTop !== false,
  );
});

const normalDetailSections = computed(() => {
  return availableDetailSections.value.filter(
    (section) => section.type !== 'image' || section.pinTop === false,
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
        v-for="(section, index) in topImageSections"
        :key="`top-image-${section.title || 'image'}-${index}`"
        class="flex justify-center py-4"
      >
        <el-image
          :src="section.imageUrl || ''"
          :preview-src-list="section.imageUrl ? [section.imageUrl] : []"
          class="record-detail-modal__top-image h-64 w-48 rounded-xl border-4 object-cover shadow-lg"
          fit="cover"
          preview-teleported
        />
      </div>
      <template
        v-for="(section, index) in normalDetailSections"
        :key="`detail-section-${section.title || 'section'}-${index}`"
      >
        <el-card shadow="hover">
          <template v-if="section.title" #header>
            <div class="flex items-center">
              <el-text tag="span" size="large" class="font-semibold">
                {{ section.title }}
              </el-text>
            </div>
          </template>

          <div v-if="section.items">
            <div
              v-for="field in getTitleFields(section.items)"
              :key="field.label"
              class="mb-4"
            >
              <el-text
                tag="h2"
                size="large"
                class="mb-2 block text-center font-bold"
              >
                {{ field.value || '-' }}
              </el-text>
            </div>

            <VbenDescriptions
              :column="section.title ? 2 : 4"
              :bordered="false"
              :colon="false"
              class="record-detail-modal__descriptions"
            >
              <VbenDescriptionsItem
                v-for="field in getDescriptionFields(section.items)"
                :key="field.label"
                :label="`${field.label}：`"
              >
                <el-text
                  v-if="field.type === 'text' || field.type === 'date'"
                  class="text-sm"
                >
                  {{ formatDescriptionFieldValue(field) }}
                </el-text>

                <el-tag
                  v-else-if="field.type === 'tag'"
                  :type="resolveTagType(field.tagType)"
                  size="small"
                >
                  {{ field.tagText || '-' }}
                </el-tag>

                <el-image
                  v-else-if="
                    field.type === 'image' && !isEmptyDetailValue(field.value)
                  "
                  :src="String(field.value)"
                  :alt="field.label"
                  class="max-h-[100px] max-w-[100px] rounded"
                  fit="cover"
                  preview-teleported
                />

                <el-text v-else class="text-sm">-</el-text>
              </VbenDescriptionsItem>
            </VbenDescriptions>
          </div>

          <div
            v-else-if="section.type === 'image' && section.imageUrl"
            class="flex justify-center"
          >
            <el-image
              :src="section.imageUrl"
              :preview-src-list="[section.imageUrl]"
              class="max-h-80 max-w-full rounded-lg"
              fit="contain"
              preview-teleported
            />
          </div>

          <div
            v-else-if="section.type === 'html'"
            class="record-detail-modal__content"
          >
            <TrustedHtmlContent :html="section.content || '-'" />
          </div>

          <div
            v-else-if="section.type === 'text'"
            class="record-detail-modal__content"
          >
            <div class="whitespace-pre-wrap break-words text-sm">
              {{ section.content || '-' }}
            </div>
          </div>
        </el-card>
      </template>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
.record-detail-modal__top-image {
  border-color: var(--el-bg-color-overlay);
}

.record-detail-modal__content {
  padding: 16px;
  color: var(--el-text-color-primary);
  background-color: var(--el-fill-color-lighter);
  border-radius: var(--el-border-radius-base);
}
</style>
