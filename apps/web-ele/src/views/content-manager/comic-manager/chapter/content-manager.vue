<script lang="ts" setup>
import type { Sortable } from '@vben/hooks';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { useSortable } from '@vben/hooks';

import {
  comicChapterAddContentApi,
  comicChapterClearContentsApi,
  comicChapterContentsApi,
  comicChapterDeleteContentApi,
  comicChapterMoveContentApi,
} from '#/apis';
import { DeleteBinIcon, EyeLineIcon, UploadLoop } from '#/components/es-icons';
import EsUpload from '#/components/es-upload/es-upload.vue';
import { useConfirm, useMessage } from '#/hooks/useFeedback';

defineOptions({
  name: 'ChapterContentManager',
});

interface ShareData {
  chapterId: number;
  chapterTitle: string;
}

const shareData = ref<ShareData>();

const contentList = ref<string[]>([]);
const selectedIndices = ref<number[]>([]);
const uploading = ref(false);
const uploadUrl = ref('');

const [Modal, modalApi] = useVbenModal({
  async onOpenChange(isOpen) {
    if (isOpen) {
      shareData.value = modalApi.getData<ShareData>();
      modalApi.setState({
        title: `${shareData.value?.chapterTitle} - 内容管理`,
      });
      await loadContents();
      await nextTick();
      await initializeDrag();
    } else {
      if (sortableInstance.value) {
        sortableInstance.value.destroy();
        sortableInstance.value = null;
      }
    }
  },
});

const gridContainer = ref<HTMLElement>();

async function loadContents() {
  if (!shareData.value?.chapterId) return;
  try {
    const res = await comicChapterContentsApi({
      id: shareData.value.chapterId,
    });
    contentList.value = res || [];
  } catch (error) {
    console.error('加载章节内容失败:', error);
  }
}

const uploadUrls: string[] = [];
let timer: null | number = null;
async function handleUploadSuccess(urls: any | string | string[]) {
  uploading.value = true;
  let urlArray: string[] = [];
  if (typeof urls === 'string') {
    urlArray = urls.split(',').filter((url) => url.trim());
  } else if (Array.isArray(urls)) {
    urlArray = urls;
  }
  if (urlArray.length === 0) return;
  uploadUrls.push(...urlArray);
  if (timer) {
    clearTimeout(timer);
  }
  timer = window.setTimeout(async () => {
    try {
      await comicChapterAddContentApi({
        id: shareData.value!.chapterId,
        content: uploadUrls.filter(Boolean),
      });
      await loadContents();
    } finally {
      uploading.value = false;
    }
  }, 200);
}

async function handleDelete(index?: number) {
  const deleteIndex =
    typeof index === 'number' ? [index] : selectedIndices.value;
  if (deleteIndex.length <= 0) {
    useMessage.warning('请先选择要删除的图片');
    return;
  }
  useConfirm('delete', async () => {
    contentList.value = await comicChapterDeleteContentApi({
      id: shareData.value!.chapterId,
      index: deleteIndex,
    });
    selectedIndices.value = [];
  });
}

async function handleClearAll() {
  useConfirm('clear', async () => {
    await comicChapterClearContentsApi({ id: shareData.value!.chapterId });
    useMessage.success('清空成功');
    await loadContents();
  });
}

async function handleMove(fromIndex: number, toIndex: number) {
  if (fromIndex === toIndex) return;

  try {
    contentList.value = await comicChapterMoveContentApi({
      id: shareData.value!.chapterId,
      fromIndex,
      toIndex,
    });
  } catch (error) {
    console.error('移动失败:', error);
  }
}

async function handleSave() {
  useMessage.success('保存成功');
  modalApi.close();
}

function toggleSelection(index: number) {
  const idx = selectedIndices.value.indexOf(index);
  if (idx === -1) {
    selectedIndices.value.push(index);
  } else {
    selectedIndices.value.splice(idx, 1);
  }
}

function handlePreview(index: number) {
  previewIndex.value = index;
  showPreview.value = true;
}

const showPreview = ref(false);
const previewIndex = ref(0);

const sortableInstance = ref<null | Sortable>(null);

const isAllSelected = computed(() => {
  return (
    contentList.value.length > 0 &&
    selectedIndices.value.length === contentList.value.length
  );
});

function toggleSelectAll() {
  selectedIndices.value = isAllSelected.value
    ? []
    : contentList.value.map((_, index) => index);
}

async function initializeDrag() {
  if (!gridContainer.value) return;

  const { initializeSortable } = useSortable(gridContainer.value, {
    onEnd: async (evt) => {
      const { oldIndex, newIndex } = evt;
      if (oldIndex !== undefined && newIndex !== undefined) {
        await handleMove(oldIndex, newIndex);
      }
    },
  });

  sortableInstance.value = await initializeSortable();
}
</script>

<template>
  <Modal class="h-[70vh] w-[1200px]">
    <div class="flex h-full flex-col">
      <div class="mb-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div>
            <EsUpload
              v-model="uploadUrl"
              :disabled="uploading"
              :max-count="50"
              :multiple="true"
              accept="image/*"
              list-type="picture"
              return-data-type="array"
              scene="common"
              :show-list="false"
              @update:model-value="handleUploadSuccess"
            >
              <el-button type="primary">
                <template #icon>
                  <UploadLoop class="text-4xl" />
                </template>
                点击上传
              </el-button>
            </EsUpload>
          </div>
          <div class="flex items-center gap-2">
            <el-checkbox :model-value="isAllSelected" @change="toggleSelectAll">
              全选
            </el-checkbox>
            <span class="text-sm text-gray-500">
              已选择 {{ selectedIndices.length }} / {{ contentList.length }} 张
            </span>
          </div>
        </div>
        <div class="flex gap-2">
          <el-button
            :disabled="selectedIndices.length === 0"
            type="danger"
            @click="handleDelete()"
          >
            批量删除
          </el-button>
          <el-button
            :disabled="contentList.length === 0"
            type="danger"
            @click="handleClearAll"
          >
            清空全部
          </el-button>
        </div>
      </div>

      <div
        v-if="contentList.length > 0"
        ref="gridContainer"
        class="flex flex-wrap justify-start gap-2 overflow-y-auto"
        style="
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          scrollbar-color: #888 #f1f1f1;
          scrollbar-width: thin;
        "
      >
        <div
          v-for="(url, index) in contentList"
          :key="`${url}-${index}`"
          class="group relative h-[300px] w-[16%] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-200 hover:border-blue-500 hover:shadow-md"
          :class="{
            'border-blue-500 shadow-lg ring-2 ring-blue-300':
              selectedIndices.includes(index),
          }"
          style="box-sizing: border-box; aspect-ratio: 9/16"
        >
          <div
            class="absolute left-2 top-2 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-sm transition-all duration-200 group-hover:opacity-100"
            :class="{
              'scale-100 opacity-100': selectedIndices.includes(index),
              'scale-90 opacity-0': !selectedIndices.includes(index),
            }"
            @click="toggleSelection(index)"
          >
            <el-checkbox
              :model-value="selectedIndices.includes(index)"
              @click.stop="toggleSelection(index)"
              size="small"
            />
          </div>

          <div
            class="absolute right-2 top-2 z-10 flex gap-1 opacity-0 transition-all duration-200 group-hover:opacity-100"
          >
            <el-button
              circle
              size="small"
              type="primary"
              @click="handlePreview(index)"
              class="transition-transform duration-200 hover:scale-110"
            >
              <EyeLineIcon />
            </el-button>
            <el-button
              circle
              size="small"
              type="danger"
              @click="handleDelete(index)"
              class="transition-transform duration-200 hover:scale-110"
            >
              <DeleteBinIcon />
            </el-button>
          </div>

          <div
            class="absolute bottom-2 left-2 z-10 rounded bg-black/60 px-2 py-1 text-xs text-white"
          >
            {{ index + 1 }}
          </div>

          <div class="h-full w-full overflow-hidden">
            <el-image
              :src="url"
              class="h-full w-full cursor-pointer object-cover"
              fit="cover"
              @click="handlePreview(index)"
            />
          </div>
        </div>
      </div>

      <div v-if="contentList.length === 0">
        <el-empty description="暂无内容，请上传图片" />
      </div>
    </div>

    <template #footer>
      <el-button @click="modalApi.close()">取消</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </template>

    <el-image-viewer
      v-if="showPreview"
      teleported
      :url-list="contentList"
      :initial-index="previewIndex"
      @close="showPreview = false"
    />
  </Modal>
</template>

<style scoped></style>
