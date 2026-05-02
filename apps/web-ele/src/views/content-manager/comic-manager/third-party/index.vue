<script setup lang="ts">
import type { PlatformResponseDto, SearchComicItemDto } from '#/api/types';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { fromApiPageIndex } from '#/adapter/vxe-table';
import {
  contentComicThirdPartyChapterContentDetailApi,
  contentComicThirdPartyChapterListApi,
  contentComicThirdPartyDetailApi,
  contentComicThirdPartyPlatformListApi,
  contentComicThirdPartySearchPageApi,
} from '#/api/core';
import { getApiErrorMessage } from '#/api/error';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils';

type PlatformOption = {
  label: string;
  value: string;
};

type ThirdPartyChapterItem = Record<string, any>;

const keyword = ref('');
const platform = ref('');
const platformOptions = ref<PlatformOption[]>([]);

const [Form, formApi] = useVbenForm(
  createSearchFormOptions(
    [
      {
        fieldName: 'platform',
        label: '',
        formItemClass: 'col-span-1',
        component: 'Select',
        componentProps: () => ({
          options: platformOptions.value,
          placeholder: '请选择平台',
        }),
      },
      {
        fieldName: 'keyword',
        label: '',
        formItemClass: 'col-span-3',
        component: 'Input',
        componentProps: {
          placeholder: '请输入关键词',
        },
      },
    ],
    {
      handleSubmit: async (values) => {
        const currentPlatform = String(values.platform || '').trim();
        const trimmedKeyword = String(values.keyword || '').trim();
        if (!currentPlatform) {
          useMessage.warning('请先选择平台');
          return;
        }
        if (!trimmedKeyword) {
          useMessage.warning('请输入有效的关键词');
          return;
        }
        platform.value = currentPlatform;
        keyword.value = trimmedKeyword;
        pagination.value.pageIndex = 1;
        await handleSearch();
      },
    },
  ),
);

const loading = ref(false);
const comicList = ref<SearchComicItemDto[]>([]);
const pagination = ref({
  pageIndex: 1,
  pageSize: 20,
  total: 0,
});

const detailVisible = ref(false);
const detailLoading = ref(false);
const chapterLoading = ref(false);
const chapterContentLoading = ref(false);
const activeComic = ref<null | SearchComicItemDto>(null);
const activePlatform = ref('');
const detailData = ref<null | Record<string, any>>(null);
const chapterList = ref<ThirdPartyChapterItem[]>([]);
const activeChapter = ref<null | ThirdPartyChapterItem>(null);
const chapterContent = ref<unknown>(null);

const detailEntries = computed(() => {
  if (!detailData.value || typeof detailData.value !== 'object') {
    return [] as Array<{ key: string; value: unknown }>;
  }
  return Object.entries(detailData.value)
    .filter(
      ([, value]) => value !== undefined && value !== null && value !== '',
    )
    .map(([key, value]) => ({ key, value }));
});

const chapterContentText = computed(() => {
  if (chapterContent.value === undefined || chapterContent.value === null) {
    return '';
  }
  if (typeof chapterContent.value === 'string') {
    return chapterContent.value;
  }
  try {
    return JSON.stringify(chapterContent.value, null, 2);
  } catch {
    return String(chapterContent.value);
  }
});

const [Modal, modalApi] = useVbenModal({
  onOpenChange: async (isOpen) => {
    if (isOpen) {
      modalApi.setState({
        title: '第三方平台资源解析',
      });
      await loadPlatforms();
    }
  },
});

function resolveComicPlatform(item: SearchComicItemDto) {
  return String(item.platform || activePlatform.value || platform.value || '');
}

function resolveChapterId(chapter: ThirdPartyChapterItem) {
  const value =
    chapter.chapterId ??
    chapter.id ??
    chapter.cid ??
    chapter.chapter_id ??
    chapter.uuid;
  return value === undefined || value === null ? '' : String(value);
}

function resolveChapterTitle(chapter: ThirdPartyChapterItem) {
  return String(
    chapter.title ??
      chapter.name ??
      chapter.chapterTitle ??
      chapter.chapter_name ??
      `章节 ${resolveChapterId(chapter) || '-'}`,
  );
}

function formatDisplayValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.join('、');
  }
  if (value && typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  return String(value);
}

async function loadPlatforms() {
  try {
    const list = await contentComicThirdPartyPlatformListApi();
    platformOptions.value = (list || []).map((item: PlatformResponseDto) => ({
      label: item.name,
      value: item.code,
    }));
    const defaultPlatform =
      platform.value || String(platformOptions.value[0]?.value || '');
    if (defaultPlatform) {
      platform.value = defaultPlatform;
      formApi.setValues({
        platform: defaultPlatform,
      });
    }
  } catch (error: any) {
    useMessage.error(getApiErrorMessage(error, '加载平台列表失败'));
  }
}

async function handleSearch() {
  if (!keyword.value || !platform.value) return;
  try {
    loading.value = true;
    const res = await contentComicThirdPartySearchPageApi({
      keyword: keyword.value.trim(),
      pageIndex: pagination.value.pageIndex,
      pageSize: pagination.value.pageSize,
      platform: platform.value,
    });
    comicList.value = res.list || [];
    pagination.value.total = res.total || 0;
    pagination.value.pageIndex = fromApiPageIndex(res.pageIndex);
    pagination.value.pageSize = res.pageSize || 20;
  } finally {
    loading.value = false;
  }
}

function handlePageChange(page: number) {
  pagination.value.pageIndex = page;
  void handleSearch();
}

function handleSizeChange(size: number) {
  pagination.value.pageSize = size;
  pagination.value.pageIndex = 1;
  void handleSearch();
}

async function showDetail(item: SearchComicItemDto) {
  const currentPlatform = resolveComicPlatform(item);
  if (!currentPlatform) {
    useMessage.warning('当前资源缺少平台标识，请先重新搜索');
    return;
  }

  detailVisible.value = true;
  detailLoading.value = true;
  chapterLoading.value = true;
  activeComic.value = item;
  activePlatform.value = currentPlatform;
  detailData.value = null;
  chapterList.value = [];
  activeChapter.value = null;
  chapterContent.value = null;

  try {
    const [detailRes, chapterRes] = await Promise.all([
      contentComicThirdPartyDetailApi({
        comicId: String(item.id),
        platform: currentPlatform,
      }),
      contentComicThirdPartyChapterListApi({
        comicId: String(item.id),
        platform: currentPlatform,
      }),
    ]);

    detailData.value =
      detailRes && typeof detailRes === 'object'
        ? (detailRes as Record<string, any>)
        : {};
    chapterList.value = Array.isArray(chapterRes) ? chapterRes : [];

    if (chapterList.value.length > 0) {
      const firstChapter = chapterList.value[0];
      if (firstChapter) {
        await loadChapterContent(firstChapter);
      }
    }
  } catch (error: any) {
    useMessage.error(getApiErrorMessage(error, '加载资源详情失败'));
  } finally {
    detailLoading.value = false;
    chapterLoading.value = false;
  }
}

async function loadChapterContent(chapter: ThirdPartyChapterItem) {
  const comicId = activeComic.value?.id;
  if (!comicId || !activePlatform.value) return;

  const chapterId = resolveChapterId(chapter);
  if (!chapterId) {
    useMessage.warning('当前章节缺少章节ID，无法读取正文');
    return;
  }

  activeChapter.value = chapter;
  chapterContentLoading.value = true;
  try {
    chapterContent.value = await contentComicThirdPartyChapterContentDetailApi({
      chapterId,
      comicId: String(comicId),
      platform: activePlatform.value,
    });
  } catch (error: any) {
    useMessage.error(getApiErrorMessage(error, '加载章节正文失败'));
  } finally {
    chapterContentLoading.value = false;
  }
}
</script>

<template>
  <Modal class="h-[70vh] w-[1200px]">
    <div class="relative flex h-full flex-col" v-loading="loading">
      <div class="shrink-0 border-b bg-white p-4">
        <Form />
      </div>

      <div class="flex-1 overflow-auto p-4">
        <el-empty
          :description="
            keyword ? '暂未搜索到相关资源' : '请选择平台并输入关键词搜索'
          "
          v-if="comicList.length === 0"
        />

        <div v-else class="grid grid-cols-5 gap-4">
          <div
            v-for="item in comicList"
            :key="`${resolveComicPlatform(item)}-${item.id}`"
            class="group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:border-blue-500 hover:shadow-lg"
            @click="showDetail(item)"
          >
            <div class="relative aspect-[9/16] overflow-hidden">
              <el-image
                :src="item.cover"
                class="h-full w-full cursor-pointer object-cover transition-transform duration-300 group-hover:scale-105"
                fit="cover"
              />
            </div>
            <div class="p-3">
              <div
                class="mb-2 line-clamp-2 text-sm font-semibold text-gray-900"
              >
                {{ item.name }}
              </div>
              <div class="mb-1 flex items-center gap-1 text-xs text-gray-600">
                <span class="font-medium">作者:</span>
                <span class="line-clamp-1">{{
                  item.author?.join('、') || '-'
                }}</span>
              </div>
              <div class="mb-1 flex items-center gap-1 text-xs text-gray-600">
                <span class="font-medium">来源:</span>
                <span class="line-clamp-1">{{ item.source || '-' }}</span>
              </div>
              <div class="flex items-center gap-1 text-xs text-gray-600">
                <span class="font-medium">平台:</span>
                <span class="line-clamp-1">{{
                  resolveComicPlatform(item) || '-'
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="pagination.total > 0" class="shrink-0 border-t bg-white p-4">
        <el-pagination
          v-model:current-page="pagination.pageIndex"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 30, 50]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>

    <el-dialog
      v-model="detailVisible"
      append-to-body
      class="third-party-detail-dialog"
      title="第三方资源详情"
      top="5vh"
      width="92%"
    >
      <div class="grid grid-cols-12 gap-4" v-loading="detailLoading">
        <div class="col-span-4 space-y-3">
          <div class="rounded-lg border border-gray-200 bg-white p-3">
            <div class="mb-3 flex items-start gap-3">
              <el-image
                v-if="activeComic?.cover"
                :src="activeComic.cover"
                class="h-[140px] w-[95px] shrink-0 rounded object-cover"
                fit="cover"
              />
              <div class="min-w-0 space-y-1">
                <div class="line-clamp-2 text-base font-semibold text-gray-900">
                  {{ activeComic?.name || '-' }}
                </div>
                <div class="text-sm text-gray-500">
                  平台：{{ activePlatform || '-' }}
                </div>
                <div class="text-sm text-gray-500">
                  漫画ID：{{ activeComic?.id ?? '-' }}
                </div>
              </div>
            </div>
            <div class="text-sm text-gray-600">
              作者：{{ activeComic?.author?.join('、') || '-' }}
            </div>
            <div class="text-sm text-gray-600">
              来源：{{ activeComic?.source || '-' }}
            </div>
          </div>

          <div class="rounded-lg border border-gray-200 bg-white p-3">
            <div class="mb-2 text-sm font-semibold text-gray-800">详情字段</div>
            <el-empty
              v-if="detailEntries.length === 0"
              description="无可展示字段"
            />
            <el-descriptions
              v-else
              :column="1"
              border
              class="third-party-detail-desc"
              size="small"
            >
              <el-descriptions-item
                v-for="entry in detailEntries"
                :key="entry.key"
                :label="entry.key"
              >
                {{ formatDisplayValue(entry.value) }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <div class="col-span-8 grid grid-cols-12 gap-4">
          <div
            class="col-span-5 rounded-lg border border-gray-200 bg-white p-3"
          >
            <div class="mb-3 flex items-center justify-between">
              <div class="text-sm font-semibold text-gray-800">章节列表</div>
              <div class="text-xs text-gray-500">
                {{ chapterList.length }} 条
              </div>
            </div>
            <div
              class="max-h-[560px] space-y-2 overflow-y-auto pr-1"
              v-loading="chapterLoading"
            >
              <el-empty
                v-if="chapterList.length === 0"
                description="暂无章节"
              />
              <div
                v-for="(chapter, index) in chapterList"
                :key="`${resolveChapterId(chapter) || index}`"
                class="cursor-pointer rounded border p-2 transition-all hover:border-blue-300 hover:bg-blue-50"
                :class="{
                  'border-blue-400 bg-blue-50':
                    resolveChapterId(chapter) ===
                    resolveChapterId(activeChapter || {}),
                }"
                @click="loadChapterContent(chapter)"
              >
                <div class="line-clamp-2 text-sm font-medium text-gray-900">
                  {{ resolveChapterTitle(chapter) }}
                </div>
                <div class="mt-1 text-xs text-gray-500">
                  章节ID：{{ resolveChapterId(chapter) || '-' }}
                </div>
              </div>
            </div>
          </div>

          <div
            class="col-span-7 rounded-lg border border-gray-200 bg-white p-3"
          >
            <div class="mb-3 flex items-center justify-between">
              <div class="text-sm font-semibold text-gray-800">章节正文</div>
              <div class="text-xs text-gray-500">
                当前章节：{{ resolveChapterTitle(activeChapter || {}) }}
              </div>
            </div>
            <div v-loading="chapterContentLoading">
              <el-empty
                v-if="!chapterContentText"
                description="请选择章节后查看正文内容"
              />
              <el-input
                v-else
                :model-value="chapterContentText"
                :rows="28"
                readonly
                type="textarea"
              />
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </Modal>
</template>

<style scoped>
:deep(.third-party-detail-dialog .el-dialog__body) {
  padding-top: 8px;
}

:deep(.third-party-detail-desc .el-descriptions__cell) {
  vertical-align: top;
}
</style>
