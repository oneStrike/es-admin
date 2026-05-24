<script setup lang="ts">
// 使用 Element Plus 的类型与组件 API
import type {
  UploadFile,
  UploadProps,
  UploadRawFile,
  UploadRequestOptions,
} from 'element-plus';

import type { UploadFileUploadResponse, UploadResponseDto } from '#/api/types';
import type { EsUploadProps } from '#/components/es-upload/types';

import { cloneDeep, random } from 'es-toolkit';

import { UploadLoop } from '#/components/es-icons';
import { UploadSceneEnum, UploadUrlMapEnum } from '#/enum/api';
import { useMessage } from '#/hooks/useFeedback';
import { useUpload } from '#/hooks/useUpload';
import { safeParseJson } from '#/utils/parseJson';

defineOptions({
  name: 'EsUpload',
});
const props = withDefaults(defineProps<EsUploadProps>(), {
  scene: UploadSceneEnum.SHARED,
  accept: 'image/*',
  maxCount: 10,
  listType: 'picture-card',
  multiple: true,
  maxSize: 200 * 1024 * 1024, // 默认200MB，单位为字节
  autoUpload: true,
  showProgress: true,
  modelValue: () => [],
  returnDataType: 'url',
  showList: true,
  uploadUrl: UploadUrlMapEnum.SHARED,
});

const emit = defineEmits<{
  (e: 'update:modelValue', val: EsUploadProps['modelValue']): void;
}>();

const fileList = ref<UploadFile[]>([]);

const fileListDataType: EsUploadProps['returnDataType'] = props.returnDataType;

function formatFileList(files: EsUploadProps['modelValue']) {
  if (Array.isArray(files)) {
    files.forEach((file) => {
      if (!file) {
        return;
      }
      if (typeof file === 'string') {
        formatFileList(file);
      } else {
        const uploadFile = file as UploadResponseDto;
        fileList.value.push({
          uid: random(1000, 9999),
          size: uploadFile.fileSize ?? 0,
          name: uploadFile.originalName ?? uploadFile.filename ?? '',
          url: uploadFile.filePath ?? '',
          status: 'success',
          response: cloneDeep(uploadFile),
        } as UploadFile);
      }
    });
  } else {
    if (typeof files === 'string' && files.trim()) {
      const json = safeParseJson(files);
      if (json) {
        formatFileList(json as EsUploadProps['modelValue']);
      } else {
        if (fileListDataType === 'url' && files.includes(',')) {
          const urls = files.split(',').filter((url) => url.trim());
          urls.forEach((url) => {
            const fileName = url.split('/').pop();
            fileList.value.push({
              uid: random(1000, 9999),
              size: 0,
              name: fileName ?? '',
              url: url.trim(),
              status: 'success',
              response: { filePath: url.trim() },
            } as UploadFile);
          });
        } else {
          const fileName = files.split('/').pop();
          fileList.value.push({
            uid: random(1000, 9999),
            size: 0,
            name: fileName ?? '',
            url: files,
            status: 'success',
            response: { filePath: files },
          } as UploadFile);
        }
      }
    } else if (files && typeof files === 'object') {
      const uploadFile = files as UploadResponseDto;
      fileList.value.push({
        uid: random(1000, 9999),
        size: uploadFile.fileSize ?? 0,
        name: uploadFile.originalName ?? uploadFile.filename ?? '',
        url: uploadFile.filePath ?? '',
        status: 'success',
        response: cloneDeep(uploadFile),
      } as UploadFile);
    }
  }
}

let skipModalValueWatch = false;
watch(
  () => props.modelValue,
  (val) => {
    if (skipModalValueWatch) {
      skipModalValueWatch = false;
      return;
    }
    fileList.value = [];
    formatFileList(val);
  },
  { immediate: true, deep: true },
);

function beforeUpload(raw: UploadRawFile): boolean {
  if ((raw?.size ?? Number.MAX_VALUE) > props.maxSize) {
    useMessage.warning(`文件 ${raw.name} 大小超出限制`);
    return false;
  }
  return true;
}

function onChange(file: UploadFile, files: UploadFile[]) {
  if (file.status === 'ready') {
    const successCount = files.filter((f) => f.status === 'success').length;

    if (successCount >= props.maxCount) {
      const lastSuccessIndex = fileList.value.findLastIndex(
        (f) => f.status === 'success',
      );
      if (lastSuccessIndex !== -1) {
        fileList.value.splice(lastSuccessIndex, 1);
      }
    }
  }
}

const uploadResponseMap = new Map<number, Partial<UploadResponseDto>>();

function handlerModalValue() {
  nextTick(() => {
    if (!Array.isArray(fileList.value) || fileList.value.length === 0) {
      emit('update:modelValue', fileListDataType === 'array' ? [] : '');
      return;
    }

    let data: EsUploadProps['modelValue'];
    if (fileListDataType === 'url') {
      data = fileList.value.map((item) => getFilePath(item)).join(',');
    } else if (fileListDataType === 'array') {
      data = fileList.value.map((item) => getFilePath(item));
    } else {
      data = JSON.stringify(
        fileList.value.map((item) => getFileResponse(item)),
      );
    }
    emit('update:modelValue', data);
  });
}

async function customRequest(options: UploadRequestOptions) {
  notifyUploadProgress(options, 0);

  const res = await useUpload(
    props.uploadUrl,
    options.file,
    {
      scene: props.scene,
      ...options.data,
    },
    (progressEvent) => {
      notifyUploadProgress(options, progressEvent.percent);
    },
  );

  if (!res) {
    options.onError?.(createUploadError('上传失败'));
    return;
  }

  if (isUploadFailure(res)) {
    options.onError?.(
      createUploadError(getUploadErrorMessage(res), getUploadErrorStatus(res)),
    );
  } else {
    uploadResponseMap.set(options.file.uid, res as UploadFileUploadResponse);
    options.onSuccess?.(res);
    skipModalValueWatch = true;
    handlerModalValue();
  }
}

function onExceed(_files: File[]) {
  const lastSuccessIndex = fileList.value.findLastIndex(
    (f) => f.status === 'success',
  );
  if (lastSuccessIndex !== -1) {
    fileList.value.splice(lastSuccessIndex, 1);
  }
}

function onRemove(uploadFile: UploadFile) {
  uploadResponseMap.delete(uploadFile.uid);
  skipModalValueWatch = true;
  handlerModalValue();
}

const showPreview = ref(false);
const previewIndex = ref(0);
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  previewIndex.value = fileList.value.indexOf(uploadFile);
  showPreview.value = true;
};

function getFileResponse(file: UploadFile) {
  return (
    uploadResponseMap.get(file.uid) ?? (file.response as UploadResponseDto)
  );
}

function getFilePath(file: UploadFile) {
  return getFileResponse(file)?.filePath ?? file.url ?? '';
}

function notifyUploadProgress(options: UploadRequestOptions, percent: number) {
  const progress = { percent } as Parameters<
    NonNullable<UploadRequestOptions['onProgress']>
  >[0];
  options.onProgress?.(progress);
}

function createUploadError(message: string, status = 500) {
  return {
    message,
    status,
    method: 'post',
    url: '',
  } as Parameters<NonNullable<UploadRequestOptions['onError']>>[0];
}

function isUploadFailure(value: unknown) {
  if (value instanceof Error) return true;
  if (!value || typeof value !== 'object') return false;
  const response = value as Record<string, unknown>;
  return Boolean(response.code || response.message);
}

function getUploadErrorMessage(value: unknown) {
  if (value instanceof Error) return value.message;
  if (!value || typeof value !== 'object') return '上传失败';
  const response = value as Record<string, unknown>;
  return typeof response.message === 'string' ? response.message : '上传失败';
}

function getUploadErrorStatus(value: unknown) {
  if (!value || typeof value !== 'object') return 500;
  const response = value as Record<string, unknown>;
  return typeof response.status === 'number' ? response.status : 500;
}
</script>

<template>
  <div class="es-upload">
    <el-upload
      v-model:file-list="fileList"
      :accept="accept"
      :limit="maxCount + 1"
      :list-type="listType"
      :multiple="multiple"
      :data="data"
      :disabled="disabled"
      :name="name"
      :auto-upload="autoUpload"
      :before-upload="beforeUpload"
      :http-request="customRequest"
      :show-file-list="showList"
      :on-change="onChange"
      @exceed="onExceed"
      @remove="onRemove"
      :on-preview="handlePictureCardPreview"
    >
      <slot>
        <div
          class="es-upload__trigger flex size-full items-center justify-center"
        >
          <div v-if="listType === 'text'">
            <el-button type="primary" class="text-base">点击上传</el-button>
          </div>
          <UploadLoop v-else class="size-7" />
        </div>
      </slot>
    </el-upload>

    <el-image-viewer
      v-if="showPreview"
      :url-list="fileList.map((item) => item.url) as string[]"
      show-progress
      teleported
      :z-index="999999999"
      :close-on-press-escape="false"
      :initial-index="previewIndex"
      @close="showPreview = false"
    />
  </div>
</template>

<style lang="scss">
.es-upload .el-upload--picture-card {
  width: 100px;
  height: 100px;
}

.es-upload .el-upload-list--picture-card {
  .el-upload-list__item,
  .el-progress--circle {
    width: 100px;
    height: 100px;
  }

  .el-progress--circle {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .el-progress-circle {
    width: 80px !important;
    height: 80px !important;
  }
}

.es-upload__trigger {
  color: var(--el-text-color-secondary);
  transition: color var(--el-transition-duration);

  &:hover {
    color: var(--el-color-primary);
  }
}

.es-upload .hide-upload .el-upload--picture-card {
  display: none;
}
</style>
