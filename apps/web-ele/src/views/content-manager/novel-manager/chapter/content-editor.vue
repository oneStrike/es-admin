<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

import {
  contentNovelChapterContentDeleteApi,
  contentNovelChapterContentDetailApi,
  contentNovelChapterUpdateApi,
} from '#/api/core';
import EsUpload from '#/components/es-upload/es-upload.vue';
import { UploadSceneEnum } from '#/enum/api';
import { useConfirm, useMessage } from '#/hooks/useFeedback';

defineOptions({
  name: 'NovelChapterContentEditor',
});

interface ShareData {
  workId: number;
  chapterId: number;
  chapterTitle: string;
}

const shareData = ref<ShareData>();
const content = ref('');
const loading = ref(false);
const uploadValue = ref('');

const [Modal, modalApi] = useVbenModal({
  async onOpenChange(isOpen) {
    if (isOpen) {
      shareData.value = modalApi.getData<ShareData>();
      modalApi.setState({
        title: `${shareData.value?.chapterTitle} - 正文内容`,
      });
      await loadContent();
    }
  },
});

async function loadContent() {
  if (!shareData.value?.chapterId) return;
  content.value =
    (await contentNovelChapterContentDetailApi({
      id: shareData.value.chapterId,
    })) || '';
}

async function handleUploadSuccess() {
  await loadContent();
  useMessage.success('正文导入成功');
}

async function handleClear() {
  const data = shareData.value;
  if (!data?.chapterId) return;

  await useConfirm('clear', async () => {
    await contentNovelChapterContentDeleteApi({
      id: data.chapterId,
    });
    content.value = '';
  });
}

async function handleSave() {
  if (!shareData.value?.chapterId) return;

  loading.value = true;
  try {
    await contentNovelChapterUpdateApi({
      content: content.value,
      id: shareData.value.chapterId,
    });
    useMessage.success('正文保存成功');
    modalApi.close();
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <Modal v-if="shareData" class="h-[80vh] w-[1000px]">
    <div class="flex h-full flex-col gap-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="text-sm text-gray-500">
          支持直接编辑正文，也可以导入文本文件覆盖当前内容。
        </div>
        <div class="flex items-center gap-2">
          <EsUpload
            upload-url="/api/admin/content/novel/chapter-content/upload"
            v-model="uploadValue"
            accept=".md,.markdown,.txt,text/plain"
            :data="{
              chapterId: shareData.chapterId,
              workId: shareData.workId,
            }"
            :max-count="1"
            :multiple="false"
            return-data-type="array"
            :scene="UploadSceneEnum.WORK"
            :show-list="false"
            @update:model-value="handleUploadSuccess"
          >
            <el-button type="primary">导入文本</el-button>
          </EsUpload>
          <el-button :disabled="!content" type="danger" @click="handleClear">
            清空正文
          </el-button>
        </div>
      </div>

      <el-input
        v-model="content"
        :autosize="{ minRows: 18, maxRows: 24 }"
        class="flex-1"
        placeholder="请输入正文内容"
        resize="none"
        type="textarea"
      />
    </div>

    <template #footer>
      <el-button @click="modalApi.close()">取消</el-button>
      <el-button :loading="loading" type="primary" @click="handleSave">
        保存
      </el-button>
    </template>
  </Modal>
</template>

<style scoped></style>
