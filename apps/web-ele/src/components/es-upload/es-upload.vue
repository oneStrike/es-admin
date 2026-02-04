<script setup lang="ts">
// 使用 Element Plus 的类型与组件 API
import type {
  UploadFile,
  UploadProps,
  UploadRawFile,
  UploadRequestOptions,
} from 'element-plus';

import type { UploadResponseDto } from '#/apis/types/upload/upload';
import type { EsUploadProps } from '#/components/es-upload/types';

import { ElMessage } from 'element-plus';
import { cloneDeep, random } from 'es-toolkit';

import { UploadLoop } from '#/components/es-icons';
import { UploadSceneEnum, UploadUrlMapEnum } from '#/enum/api';
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
// 绑定到 el-upload 的文件列表（Element Plus UploadFile 类型）
const fileList = ref<UploadFile[]>([]);

// 固定读取初始化时的返回数据类型，保持与原逻辑一致
const fileListDataType: EsUploadProps['returnDataType'] = props.returnDataType;

/**
 * 根据外部 v-model 值构造内部 fileList
 * 支持：字符串(url/JSON)、数组(对象/字符串)
 */
function formatFileList(files: EsUploadProps['modelValue']) {
  if (Array.isArray(files)) {
    files.forEach((file) => {
      if (typeof file === 'string') {
        formatFileList(file);
      } else {
        // 明确指定 file 的类型
        const uploadFile = file as UploadResponseDto;
        fileList.value.push({
          uid: random(1000, 9999),
          size: uploadFile.fileSize,
          name: uploadFile.originalName,
          url: uploadFile.filePath,
          status: 'success',
          response: cloneDeep(uploadFile),
        } as UploadFile);
      }
    });
  } else {
    // 明确指定 files 为字符串类型
    if (typeof files === 'string' && files.trim()) {
      const json = safeParseJson(files);
      if (json) {
        formatFileList(json as any);
      } else {
        // 如果 returnDataType 是 'url'，检查是否是逗号分隔的多个 URL
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
    } else if (files) {
      // 处理单个 UploadResponseDto 对象
      const uploadFile = files as UploadResponseDto;
      fileList.value.push({
        uid: random(1000, 9999),
        size: uploadFile.fileSize,
        name: uploadFile.originalName,
        url: uploadFile.filePath,
        status: 'success',
        response: cloneDeep(uploadFile),
      } as UploadFile);
    }
  }
}

// 防止我们主动更新 v-model 后 watch 重复重建列表
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

/**
 * 上传前校验
 * - 大小限制
 * - 数量限制（结合 limit 与 exceed 提示）
 */
function beforeUpload(raw: UploadRawFile): boolean {
  if ((raw?.size ?? Number.MAX_VALUE) > props.maxSize) {
    ElMessage.error(`文件 ${raw.name} 大小超出限制`);
    return false;
  }
  // 只计算成功上传的文件数量
  const successCount = fileList.value.filter(
    (file) => file.status === 'success',
  ).length;
  if (successCount >= props.maxCount) {
    ElMessage.error('文件超出数量限制');
    return false;
  }
  return true;
}

/**
 * 将内部 fileList 转换为 v-model 指定的数据格式
 * - url: 以逗号分隔的 url 字符串
 * - array: url 字符串数组
 * - json: 完整响应对象数组的 JSON 字符串
 */
function handlerModalValue() {
  if (!Array.isArray(fileList.value) || fileList.value.length === 0) {
    emit('update:modelValue', [] as any);
    return;
  }

  let data: any;
  if (fileListDataType === 'url') {
    data = fileList.value.map((item: any) => item.response?.filePath).join(',');
  } else if (fileListDataType === 'array') {
    data = fileList.value.map((item: any) => item.response?.filePath);
  } else {
    data = JSON.stringify(fileList.value.map((item: any) => item.response));
  }

  emit('update:modelValue', data);
}

/**
 * 自定义上传流程，使用内部 useUpload 封装
 * 与 Element Plus 的 http-request 适配
 */
async function customRequest(options: UploadRequestOptions) {
  // 初始化进度
  options.onProgress?.({ percent: 0 } as any);

  const res = await useUpload(
    props.uploadUrl,
    // 将当前文件传入后端上传逻辑
    options.file as any,
    {
      scene: props.scene,
      ...options.data,
    },
    // 进度回调：转给 Element Plus
    (progressEvent) => {
      options.onProgress?.({ percent: progressEvent.percent } as any);
    },
  );

  if (!res) {
    // 根据 Element Plus 类型定义，创建符合 UploadAjaxError 类型的错误对象
    options.onError?.({
      message: '上传失败',
      status: 500,
      method: 'post',
      url: '',
    } as any);
    return;
  }

  // 判断是否为错误对象
  if (res instanceof Error || (res as any).code || (res as any).message) {
    // 根据 Element Plus 类型定义，创建符合 UploadAjaxError 类型的错误对象
    options.onError?.({
      message:
        res instanceof Error ? res.message : (res as any).message || '上传失败',
      status: (res as any).status || 500,
      method: 'post',
      url: '',
    } as any);
  } else {
    // 通知 Element Plus 上传成功，自动写入 file.response/status
    options.onSuccess?.(res);
    skipModalValueWatch = true;
    handlerModalValue();
  }
}

// 超出数量时的提示（Element Plus 触发 exceed）
function onExceed() {
  ElMessage.error(`最多只能上传 ${props.maxCount} 个文件`);
}

// 删除文件后同步外部 v-model（保持行为直观，不改变原有成功回写逻辑）
function onRemove() {
  skipModalValueWatch = true;
  handlerModalValue();
}

const showPreview = ref(false);
const previewIndex = ref(0);
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  previewIndex.value = fileList.value.indexOf(uploadFile);
  showPreview.value = true;
};

// 计算属性：判断是否需要隐藏上传按钮
const isUploadHidden = computed(() => {
  return (
    fileList.value.filter((file) => file.status === 'success').length >=
    props.maxCount
  );
});
</script>

<template>
  <div>
    <el-upload
      v-model:file-list="fileList"
      :accept="accept"
      :limit="maxCount"
      :list-type="listType"
      :multiple="multiple"
      :data="data"
      :disabled="disabled"
      :name="name"
      :auto-upload="autoUpload"
      :before-upload="beforeUpload"
      :http-request="customRequest"
      :show-file-list="showList"
      @exceed="onExceed"
      @remove="onRemove"
      :on-preview="handlePictureCardPreview"
      :class="{ 'hide-upload': isUploadHidden }"
    >
      <slot>
        <div
          class="hover:text-primary flex size-full items-center justify-center text-gray-500"
        >
          <UploadLoop class="size-7" />
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

<style scoped lang="scss">
::v-deep(.el-upload--picture-card) {
  width: 100px;
  height: 100px;
}

::v-deep(.el-upload-list--picture-card) {
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

// 隐藏上传按钮
::v-deep(.hide-upload .el-upload--picture-card) {
  display: none;
}
</style>
