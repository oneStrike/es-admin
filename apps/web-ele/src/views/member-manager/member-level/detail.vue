<script setup lang="ts">
import type { BaseMemberLevelDto } from '#/apis/types/memberLevel';

import { useVbenModal } from '@vben/common-ui';

import { memberLevelDetailApi } from '#/apis';
import { formatUTC } from '#/utils';

defineOptions({ name: 'MemberLevelDetail' });

const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      getDetail();
    }
  },
  onConfirm() {
    modalApi.close();
  },
});

const detail = ref<BaseMemberLevelDto>();
const loading = ref(false);

async function getDetail() {
  try {
    loading.value = true;
    const { recordId } = modalApi.getData<{ recordId: number }>();
    detail.value = await memberLevelDetailApi({ id: recordId });
  } finally {
    loading.value = false;
  }
}

// 详情卡片配置
const detailCards = computed(() => [
  {
    title: '基本信息',
    show: true,
    fields: [
      {
        label: '等级图标',
        value: detail.value?.icon,
        type: 'image',
      },
      {
        label: '等级名称',
        value: detail.value?.name,
        type: 'text',
      },
      {
        label: '专属颜色',
        value: detail.value?.color,
        type: 'color',
      },
      {
        label: '等级描述',
        value: detail.value?.description || '-',
        type: 'text',
      },
      {
        label: '是否启用',
        value: detail.value?.isEnabled ? '是' : '否',
        type: 'tag',
        tagType: detail.value?.isEnabled ? 'success' : 'danger',
        tagText: detail.value?.isEnabled ? '是' : '否',
      },
    ],
  },
  {
    title: '升级要求',
    show: true,
    fields: [
      {
        label: '所需积分',
        value: detail.value?.points || 0,
        type: 'text',
      },
      {
        label: '所需登录天数',
        value: detail.value?.loginDays || 0,
        type: 'text',
      },
    ],
  },
  {
    title: '等级特权',
    show: true,
    fields: [
      {
        label: '积分购买折扣',
        value: detail.value?.discount
          ? `${(detail.value.discount * 100).toFixed(0)}%`
          : '0%',
        type: 'text',
      },
      {
        label: '作品收藏上限',
        value: detail.value?.workCollectionLimit || 0,
        type: 'text',
      },
      {
        label: '黑名单上限',
        value: detail.value?.blacklistLimit || 0,
        type: 'text',
      },
    ],
  },
  {
    title: '其他信息',
    show: true,
    fields: [
      {
        label: '备注信息',
        value: detail.value?.remark || '-',
        type: 'text',
      },
      {
        label: '创建时间',
        value: detail.value?.createdAt
          ? formatUTC(detail.value.createdAt, 'YYYY-MM-DD HH:mm:ss')
          : '-',
        type: 'text',
      },
      {
        label: '更新时间',
        value: detail.value?.updatedAt
          ? formatUTC(detail.value.updatedAt, 'YYYY-MM-DD HH:mm:ss')
          : '-',
        type: 'text',
      },
    ],
  },
]);
</script>

<template>
  <Modal title="会员等级详情" class="!min-w-[800px]" v-if="detail">
    <div v-loading="loading" class="space-y-6">
      <!-- 动态渲染卡片 -->
      <template v-for="card in detailCards" :key="card.title">
        <el-card v-if="card.show" shadow="never">
          <template #header>
            <div class="flex items-center">
              <span class="text-lg font-medium">{{ card.title }}</span>
            </div>
          </template>

          <!-- 字段列表类型 -->
          <div v-if="card.fields" class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div
              v-for="field in card.fields"
              :key="field.label"
              class="flex items-center"
            >
              <label
                class="text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                {{ field.label }}：
              </label>

              <!-- 普通文本 -->
              <el-text v-if="field.type === 'text'" class="text-sm">
                {{ field.value || '-' }}
              </el-text>

              <!-- 带颜色的文本 -->
              <el-text
                v-else-if="field.type === 'colored-text' && field.value"
                :style="{ color: 'color' in field ? field.color : undefined }"
                class="text-sm"
              >
                {{ field.value }}
              </el-text>

              <!-- 标签 -->
              <el-tag
                v-else-if="
                  field.type === 'tag' && 'tagText' in field && field.tagText
                "
                :type="('tagType' in field && field.tagType) as any"
                size="small"
              >
                {{ 'tagText' in field ? field.tagText : '' }}
              </el-tag>

              <!-- 图片 -->
              <el-image
                v-else-if="field.type === 'image' && field.value"
                :src="field.value"
                :preview-src-list="[field.value]"
                class="h-10 w-10 rounded object-cover"
                fit="cover"
                preview-teleported
              />

              <!-- 颜色 -->
              <div
                v-else-if="field.type === 'color'"
                class="flex items-center gap-2"
              >
                <div
                  class="h-6 w-6 rounded-full border border-gray-300"
                  :style="{ backgroundColor: field.value }"
                ></div>
                <el-text class="text-sm">{{ field.value }}</el-text>
              </div>

              <!-- 默认情况 -->
              <el-text class="text-sm" v-else>
                {{ field.value || '-' }}
              </el-text>
            </div>
          </div>

          <!-- 图片类型 -->
          <div
            v-else-if="card.type === 'image' && card.imageUrl"
            class="flex justify-center"
          >
            <el-image
              :src="card.imageUrl"
              :preview-src-list="[card.imageUrl]"
              class="max-h-60 max-w-full rounded-lg"
              fit="contain"
              preview-teleported
            />
          </div>

          <!-- HTML内容类型 -->
          <div
            v-else-if="card.type === 'html'"
            class="prose dark:prose-invert max-w-none"
            v-html="card.content"
          ></div>

          <!-- 文本内容类型 -->
          <div
            v-else-if="card.type === 'text' && card.content"
            class="whitespace-pre-wrap"
          >
            {{ card.content }}
          </div>
        </el-card>
      </template>
    </div>
  </Modal>
</template>

<style scoped>
.prose {
  @apply text-gray-900 dark:text-gray-100;
}

.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3),
.prose :deep(h4),
.prose :deep(h5),
.prose :deep(h6) {
  @apply text-gray-900 dark:text-gray-100;
}

.prose :deep(p) {
  @apply text-gray-700 dark:text-gray-300;
}

.prose :deep(a) {
  @apply text-blue-600 dark:text-blue-400;
}

.prose :deep(blockquote) {
  @apply border-l-gray-300 text-gray-600 dark:border-l-gray-600 dark:text-gray-400;
}

.prose :deep(code) {
  @apply bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100;
}

.prose :deep(pre) {
  @apply bg-gray-100 dark:bg-gray-800;
}

.prose :deep(table) {
  @apply border-gray-300 dark:border-gray-600;
}

.prose :deep(th),
.prose :deep(td) {
  @apply border-gray-300 dark:border-gray-600;
}

.prose :deep(th) {
  @apply bg-gray-50 dark:bg-gray-800;
}
</style>
