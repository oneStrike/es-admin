<script lang="ts" setup>
import type { DetailCard } from './types';

import { computed, ref, watch } from 'vue';

import { useVbenModal } from '@vben/common-ui';

defineOptions({
  name: 'EsRecordDetail',
});

const props = withDefaults(defineProps<Props>(), {
  title: '详情',
  api: undefined,
  recordId: undefined,
  data: undefined,
});

// 定义组件事件
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'confirm'): void;
}>();

// 定义组件属性
interface Props {
  title?: string;
  api?: (params: any) => Promise<any>;
  recordId?: number;
  data?: any;
  cards: (data: any, extraData?: any) => DetailCard[];
}

const sharedData = ref<Props>();

// 创建 Modal 实例
const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen: boolean) {
    if (isOpen && props.api) {
      sharedData.value = modalApi.getData<Props>();
      getDetail();
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

// 定义响应式数据
const detail = ref<any>(props.data);
const loading = ref(false);
const extraData = ref<any>({});

// 监听 data 变化，更新 detail
watch(
  () => props.data,
  (newData) => {
    if (newData) {
      detail.value = newData;
    }
  },
);

// 获取详情数据
async function getDetail() {
  if (!props.api) return;

  try {
    loading.value = true;
    // 优先从 modalApi.getData() 获取 recordId，其次使用 props.recordId
    const modalData = modalApi.getData<{
      [key: string]: any;
      recordId: number;
    }>();
    const recordId = modalData?.recordId || props.recordId;
    // 保存额外数据
    extraData.value = modalData || {};

    if (!recordId) {
      console.error('获取详情失败: 缺少 recordId');
      return;
    }

    detail.value = await props.api({ id: recordId });
  } catch (error) {
    console.error('获取详情失败:', error);
  } finally {
    loading.value = false;
  }
}

// 计算卡片配置
const detailCards = computed(() => {
  if (!detail.value) return [];
  return props.cards(detail.value, extraData.value);
});

// 暴露方法给父组件
defineExpose({
  setData: modalApi.setData,
  open: modalApi.open,
  close: modalApi.close,
});
</script>

<template>
  <Modal :title="sharedData?.title || '详情'" class="!w-[1000px]">
    <div v-loading="loading" class="space-y-6">
      <!-- 封面/头像展示 -->
      <div
        v-if="detail && (detail.cover || detail.avatar)"
        class="flex justify-center py-4"
      >
        <el-image
          :src="detail.cover || detail.avatar"
          :preview-src-list="[detail.cover || detail.avatar]"
          class="h-64 w-48 rounded-xl border-4 border-white object-cover shadow-lg dark:border-gray-800"
          fit="cover"
          preview-teleported
        />
      </div>
      <!-- 动态渲染卡片 -->
      <template v-for="card in detailCards" :key="card.title">
        <el-card
          v-if="card.show"
          shadow="hover"
          class="rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <template #header v-if="card.title">
            <div class="flex items-center">
              <span
                class="text-lg font-semibold text-gray-800 dark:text-gray-100"
              >
                {{ card.title }}
              </span>
            </div>
          </template>

          <!-- 使用 Descriptions 组件展示字段 -->
          <div v-if="card.fields">
            <!-- 标题类型字段 -->
            <div v-for="field in card.fields" :key="field.label" class="mb-4">
              <h2
                v-if="field.type === 'title'"
                class="mb-2 text-center text-2xl font-bold text-gray-800 dark:text-gray-100"
              >
                {{ field.value || '-' }}
              </h2>
            </div>

            <!-- 其他字段 -->
            <el-descriptions
              :column="card.title ? 2 : 4"
              :border="false"
              class="!gap-x-8 !gap-y-4 !text-sm"
            >
              <el-descriptions-item
                v-for="field in card.fields.filter(
                  (f) => f.type !== 'title' && f.type !== 'image',
                )"
                :key="field.label"
                :label="`${field.label}：`"
                class="!text-gray-600 dark:!text-gray-300"
              >
                <!-- 普通文本 -->
                <el-text
                  v-if="field.type === 'text'"
                  class="text-sm text-gray-900 dark:text-gray-100"
                >
                  {{ field.value || '-' }}
                </el-text>

                <!-- 标签 -->
                <el-tag
                  v-else-if="
                    field.type === 'tag' && 'tagText' in field && field.tagText
                  "
                  :type="('tagType' in field ? field.tagType : 'info') as any"
                  size="small"
                >
                  {{ field.tagText }}
                </el-tag>

                <!-- 图片 -->
                <el-image
                  v-else-if="field.type === 'image' && field.value"
                  :src="field.value"
                  :alt="field.label"
                  class="max-h-[100px] max-w-[100px] rounded"
                  fit="cover"
                  preview-teleported
                />
              </el-descriptions-item>
            </el-descriptions>
          </div>

          <!-- 图片类型 -->
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

          <!-- HTML 类型 -->
          <div
            v-else-if="card.type === 'html'"
            class="rounded-lg bg-gray-50 p-4 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
          >
            <div
              v-html="card.content"
              class="prose dark:prose-invert max-w-none"
            ></div>
          </div>

          <!-- 文本内容类型 -->
          <div
            v-else-if="card.type === 'text'"
            class="rounded-lg bg-gray-50 p-4 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
          >
            <div
              v-html="card.content"
              class="prose dark:prose-invert max-w-none"
            ></div>
          </div>
        </el-card>
      </template>
    </div>
  </Modal>
</template>

<style scoped>
/* 组件样式 */
</style>
