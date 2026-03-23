<script setup lang="ts">
import type { SearchComicItemDto } from '#/api/types';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import {
  contentComicThirdPartyDetailApi,
  contentComicThirdPartySearchPageApi,
} from '#/api/core';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils';

const keyword = ref('');
const [Form] = useVbenForm(
  createSearchFormOptions(
    [
      {
        fieldName: 'keyword',
        label: '',
        formItemClass: 'col-span-4',
        component: 'Input',
        componentProps: {
          placeholder: '请输入关键词',
        },
      },
    ],
    {
      showCollapseButton: false,
      handleSubmit: async (values) => {
        const trimmedKeyword = values.keyword?.trim();
        if (!trimmedKeyword) {
          useMessage.warning('请输入有效的关键词');
          return;
        }
        keyword.value = trimmedKeyword;
        pagination.value.pageIndex = 1;
        handleSearch();
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

async function handleSearch() {
  if (!keyword.value) return;
  try {
    loading.value = true;
    const res = await contentComicThirdPartySearchPageApi({
      platform: 'copy',
      keyword: keyword.value.trim(),
      pageIndex: pagination.value.pageIndex - 1,
      pageSize: pagination.value.pageSize,
    });
    comicList.value = res.list || [];
    pagination.value.total = res.total || 0;
    pagination.value.pageIndex = (res.pageIndex || 0) + 1;
    pagination.value.pageSize = res.pageSize || 20;
  } finally {
    loading.value = false;
  }
}

function handlePageChange(page: number) {
  pagination.value.pageIndex = page;
  handleSearch();
}

function handleSizeChange(size: number) {
  pagination.value.pageSize = size;
  pagination.value.pageIndex = 1;
  handleSearch();
}

const [Modal, modalApi] = useVbenModal({
  onOpenChange: async (isOpen) => {
    if (isOpen) {
      modalApi.setState({
        title: '第三方平台资源解析',
      });
    }
  },
});

async function showDetail(item: SearchComicItemDto) {
  await contentComicThirdPartyDetailApi({
    comicId: String(item.id),
    platform: item.platform,
  });
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
          :description="keyword ? '暂未搜索到相关资源' : '请输入关键词搜索'"
          v-if="comicList.length === 0"
        />

        <div v-else class="grid grid-cols-5 gap-4">
          <div
            v-for="item in comicList"
            :key="item.id"
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
              <div class="flex items-center gap-1 text-xs text-gray-600">
                <span class="font-medium">来源:</span>
                <span class="line-clamp-1">{{ item.source || '-' }}</span>
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
  </Modal>
</template>

<style scoped></style>
