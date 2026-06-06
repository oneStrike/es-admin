<script setup lang="ts">
import type { ImageUploadOptions } from '@vben/plugins/tiptap';

import type { EsEditorProps } from './types';

import { computed } from 'vue';

import { VbenTiptap } from '@vben/plugins/tiptap';

import { useMessage } from '#/hooks/useFeedback';
import { useUpload } from '#/hooks/useUpload';

const props = withDefaults(defineProps<EsEditorProps>(), {
  editableRoot: true,
  enabled: true,
  height: 600,
  placeholder: '请输入内容...',
  plugins: undefined,
  readonly: false,
  toolbar: true,
});

const modelValue = defineModel<string>({ default: '' });

function resolveUploadedFilePath(result: unknown) {
  if (!result || typeof result !== 'object') {
    return '';
  }

  const uploadResult = result as {
    filePath?: string;
    success?: Array<{ filePath?: string; url?: string }>;
    url?: string;
  };
  return (
    uploadResult.filePath ??
    uploadResult.url ??
    uploadResult.success?.[0]?.filePath ??
    uploadResult.success?.[0]?.url ??
    ''
  );
}

const editable = computed(
  () => props.enabled && props.editableRoot && !props.readonly,
);

const toolbarEnabled = computed(() => props.toolbar !== false);

const imageUpload: ImageUploadOptions = {
  async upload(file, onProgress) {
    const result = await useUpload(
      '/api/admin/upload/file/upload',
      file,
      {},
      (event) => onProgress?.(event.percent),
    );
    const filePath = resolveUploadedFilePath(result);
    if (!filePath) {
      useMessage.error('文件上传失败');
      throw new Error('文件上传失败');
    }
    return filePath;
  },
};

function setContent(content: string) {
  modelValue.value = content;
}

function getContent() {
  return modelValue.value;
}

defineExpose({
  getContent,
  setContent,
});
</script>

<template>
  <VbenTiptap
    v-model="modelValue"
    :editable="editable"
    :image-upload="imageUpload"
    :max-height="height"
    :min-height="height"
    :placeholder="placeholder"
    :toolbar="toolbarEnabled"
  />
</template>
