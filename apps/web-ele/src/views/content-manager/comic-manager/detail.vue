<script lang="ts" setup>
import type { BaseComicDto } from '#/apis/types/comic';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { comicDetailApi } from '#/apis';
import { formatUTC } from '#/utils';

import { readRuleMap, serialStatusMap } from './shared';

defineOptions({ name: 'ComicDetail' });

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

const detail = ref<BaseComicDto>();
const loading = ref(false);

async function getDetail() {
  try {
    loading.value = true;
    const { recordId } = modalApi.getData<{ recordId: number }>();
    detail.value = await comicDetailApi({ id: recordId });
  } catch (error) {
    console.error('获取漫画详情失败:', error);
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
        label: '漫画名称',
        value: detail.value?.name,
        type: 'text',
      },
      {
        label: '漫画别名',
        value: detail.value?.alias || '-',
        type: 'text',
      },
      {
        label: '作者',
        value:
          detail.value?.comicAuthors?.map((author) => author.name).join(', ') ||
          '-',
        type: 'text',
      },
      {
        label: '分类',
        value:
          detail.value?.comicCategories
            ?.map((category) => category.name)
            .join(', ') || '-',
        type: 'text',
      },
      {
        label: '标签',
        value:
          detail.value?.comicTags?.map((tag) => tag.name).join(', ') || '-',
        type: 'text',
      },
      {
        label: '出版社',
        value: detail.value?.publisher || '-',
        type: 'text',
      },
      {
        label: '地区',
        value: detail.value?.region || '-',
        type: 'text',
      },
      {
        label: '语言',
        value: detail.value?.language || '-',
        type: 'text',
      },
      {
        label: '年龄分级',
        value: detail.value?.ageRating || '-',
        type: 'text',
      },
      {
        label: '连载状态',
        value: serialStatusMap[detail.value?.serialStatus || 0] || '-',
        type: 'text',
      },
      {
        label: '阅读权限',
        value: readRuleMap[detail.value?.readRule || 0] || '-',
        type: 'text',
      },
    ],
  },
  {
    title: '状态信息',
    show: true,
    fields: [
      {
        label: '发布状态',
        value: detail.value?.isPublished,
        type: 'tag',
        tagType: detail.value?.isPublished ? 'success' : 'danger',
        tagText: detail.value?.isPublished ? '已发布' : '未发布',
      },
      {
        label: '推荐状态',
        value: detail.value?.isRecommended,
        type: 'tag',
        tagType: detail.value?.isRecommended ? 'success' : 'info',
        tagText: detail.value?.isRecommended ? '是' : '否',
      },
      {
        label: '热门状态',
        value: detail.value?.isHot,
        type: 'tag',
        tagType: detail.value?.isHot ? 'success' : 'info',
        tagText: detail.value?.isHot ? '是' : '否',
      },
      {
        label: '新作状态',
        value: detail.value?.isNew,
        type: 'tag',
        tagType: detail.value?.isNew ? 'success' : 'info',
        tagText: detail.value?.isNew ? '是' : '否',
      },
      {
        label: '允许评论',
        value: detail.value?.canComment,
        type: 'tag',
        tagType: detail.value?.canComment ? 'success' : 'info',
        tagText: detail.value?.canComment ? '是' : '否',
      },
      {
        label: '允许下载',
        value: detail.value?.canDownload,
        type: 'tag',
        tagType: detail.value?.canDownload ? 'success' : 'info',
        tagText: detail.value?.canDownload ? '是' : '否',
      },
    ],
  },
  {
    title: '统计信息',
    show: true,
    fields: [
      {
        label: '总章节数',
        value: detail.value?.totalChapters || 0,
        type: 'text',
      },
      {
        label: '总阅读量',
        value: detail.value?.totalViews || 0,
        type: 'text',
      },
      {
        label: '收藏数',
        value: detail.value?.favoriteCount || 0,
        type: 'text',
      },
      {
        label: '点赞数',
        value: detail.value?.likeCount || 0,
        type: 'text',
      },
      {
        label: '评论数',
        value: detail.value?.commentCount || 0,
        type: 'text',
      },
      {
        label: '评分',
        value: `${detail.value?.rating || 0} (${detail.value?.ratingCount || 0}人评分)`,
        type: 'text',
      },
    ],
  },
  {
    title: '时间信息',
    show: true,
    fields: [
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
      {
        label: '最后更新',
        value: detail.value?.lastUpdated
          ? formatUTC(detail.value.lastUpdated, 'YYYY-MM-DD')
          : '-',
        type: 'text',
      },
      {
        label: '发布日期',
        value: detail.value?.publishAt
          ? formatUTC(detail.value.publishAt, 'YYYY-MM-DD')
          : '-',
        type: 'text',
      },
    ],
  },
  {
    title: '封面信息',
    show: !!detail.value?.cover,
    type: 'image',
    imageUrl: detail.value?.cover,
  },
  {
    title: '漫画简介',
    show: true,
    type: 'text',
    content: detail.value?.description,
  },
  {
    title: '高级信息',
    show: true,
    fields: [
      {
        label: '版权信息',
        value: detail.value?.copyright || '-',
        type: 'text',
      },
      {
        label: '免责声明',
        value: detail.value?.disclaimer || '-',
        type: 'text',
      },
      {
        label: '推荐权重',
        value: detail.value?.recommendWeight || 0,
        type: 'text',
      },
      {
        label: '热度权重',
        value: detail.value?.popularityWeight || 0,
        type: 'text',
      },
      {
        label: '热度值',
        value: detail.value?.popularity || 0,
        type: 'text',
      },
      {
        label: '所需积分',
        value: detail.value?.purchaseAmount || 0,
        type: 'text',
      },
    ],
  },
  {
    title: 'SEO信息',
    show: true,
    fields: [
      {
        label: 'SEO标题',
        value: detail.value?.seoTitle || '-',
        type: 'text',
      },
      {
        label: 'SEO关键词',
        value: detail.value?.seoKeywords || '-',
        type: 'text',
      },
      {
        label: 'SEO描述',
        value: detail.value?.seoDescription || '-',
        type: 'text',
      },
      {
        label: '管理员备注',
        value: detail.value?.remark || '-',
        type: 'text',
      },
    ],
  },
]);
</script>

<template>
  <Modal title="漫画详情" class="!w-[1000px]" v-if="detail">
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
              <p
                v-if="field.type === 'text'"
                class="text-sm text-gray-900 dark:text-gray-100"
              >
                {{ field.value }}
              </p>

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
              class="max-h-80 max-w-full rounded-lg"
              fit="contain"
              preview-teleported
            />
          </div>

          <!-- 文本内容类型 -->
          <div
            v-else-if="card.type === 'text'"
            class="whitespace-pre-wrap text-gray-900 dark:text-gray-100"
          >
            {{ card.content }}
          </div>
        </el-card>
      </template>
    </div>
  </Modal>
</template>
