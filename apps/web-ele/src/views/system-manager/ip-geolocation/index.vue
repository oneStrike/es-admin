<script setup lang="ts">
import type { UploadProps, UploadRequestOptions } from 'element-plus';

import type {
  SystemIp2regionStatusResponse,
  SystemIp2regionUploadResponse,
} from '#/api/types';

import { computed, onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { systemIp2regionStatusApi } from '#/api/core';
import { getApiErrorMessage } from '#/api/error';
import { requestClient } from '#/api/request';
import { useMessage } from '#/hooks/useFeedback';

import {
  formatFileSize,
  getSourceLabel,
  validateIp2regionFile,
} from './modules/status';

defineOptions({
  name: 'IpGeolocationManager',
});

const IP2REGION_UPLOAD_URL = '/api/admin/system/ip2region/upload';
type UploadError = Parameters<UploadRequestOptions['onError']>[0];

const statusLoading = ref(false);
const uploading = ref(false);
const uploadProgress = ref(0);
const lastUploadFileName = ref('');
const statusData = ref<null | SystemIp2regionStatusResponse>(null);

const statusTagType = computed<
  'danger' | 'info' | 'primary' | 'success' | 'warning'
>(() => {
  if (!statusData.value?.ready) return 'warning';
  if (statusData.value.reloading) return 'primary';
  return 'success';
});

const statusSummary = computed(() => {
  if (!statusData.value) return '尚未加载状态';
  if (statusData.value.reloading) return '当前正在热切换 IP 属地库';
  if (!statusData.value.ready) return '当前进程尚未加载可用属地库';
  return '当前进程已加载可用属地库';
});
const inlineCodeClass = 'rounded px-1 py-0.5 font-mono';
const inlineCodeStyle = {
  backgroundColor: 'var(--el-fill-color-light)',
  color: 'var(--el-text-color-regular)',
};

function formatDateTime(value?: null | string) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

function createUploadError(message: string): UploadError {
  const uploadError = new Error(message) as UploadError;
  uploadError.name = 'UploadAjaxError';
  uploadError.status = 0;
  uploadError.method = 'post';
  uploadError.url = IP2REGION_UPLOAD_URL;
  return uploadError;
}

async function loadStatus() {
  statusLoading.value = true;
  try {
    statusData.value = await systemIp2regionStatusApi();
  } catch {
    useMessage.error('获取 IP 属地库状态失败');
  } finally {
    statusLoading.value = false;
  }
}

const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const validationResult = validateIp2regionFile(rawFile);
  if (!validationResult.valid) {
    useMessage.warning(validationResult.message);
    return false;
  }

  return true;
};

async function handleUpload(options: UploadRequestOptions) {
  const file = options.file as File;
  lastUploadFileName.value = file.name;
  uploadProgress.value = 0;
  uploading.value = true;

  try {
    const result = await requestClient.upload<SystemIp2regionUploadResponse>(
      IP2REGION_UPLOAD_URL,
      { file },
      {
        timeout: 180_000,
        onUploadProgress: (event) => {
          if (event.total) {
            uploadProgress.value = Math.round(
              (event.loaded * 100) / event.total,
            );
          }
        },
      },
    );

    statusData.value = result;
    options.onSuccess?.(result as never);
    useMessage.success('IP 属地库上传并切换成功');
  } catch (error: unknown) {
    const errorMessage = getApiErrorMessage(error, 'IP 属地库上传失败');
    options.onError?.(createUploadError(errorMessage));
    useMessage.error(errorMessage);
  } finally {
    uploading.value = false;
  }
}

onMounted(loadStatus);
</script>

<template>
  <Page auto-content-height>
    <main class="space-y-6">
      <el-card shadow="never">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div class="space-y-2">
            <div class="flex flex-wrap items-center gap-3">
              <el-text tag="h1" class="text-xl font-semibold">
                IP 属地库管理
              </el-text>
              <el-tag :type="statusTagType" effect="light">
                {{ statusSummary }}
              </el-tag>
            </div>
            <el-text
              tag="p"
              class="max-w-3xl leading-6"
              size="small"
              type="info"
            >
              用于上传并切换当前进程使用的
              <el-text
                tag="code"
                :class="inlineCodeClass"
                :style="inlineCodeStyle"
                size="small"
              >
                ip2region_v4.xdb
              </el-text>
              文件。当前能力只保证接收上传请求的 API
              进程立即生效，不处理跨进程或跨实例同步。
            </el-text>
          </div>
          <el-button :loading="statusLoading" @click="loadStatus">
            刷新状态
          </el-button>
        </div>
      </el-card>

      <section
        class="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_360px]"
      >
        <el-card shadow="never">
          <template #header>
            <div class="flex items-center justify-between gap-3">
              <el-text tag="h2" class="text-base font-semibold">
                当前状态
              </el-text>
              <el-text size="small" type="info">
                {{ statusData ? '已同步' : '等待加载' }}
              </el-text>
            </div>
          </template>

          <el-alert
            v-if="statusData && !statusData.ready"
            :closable="false"
            class="mb-4"
            show-icon
            title="当前进程未加载可用属地库，可上传新的 xdb 文件后立即切换。"
            type="warning"
          />

          <el-descriptions :column="2" border label-width="96px" size="small">
            <el-descriptions-item label="当前来源">
              <el-text>{{ getSourceLabel(statusData?.source) }}</el-text>
            </el-descriptions-item>
            <el-descriptions-item label="当前文件名">
              <el-text class="break-all">
                {{ statusData?.fileName || '-' }}
              </el-text>
            </el-descriptions-item>
            <el-descriptions-item label="文件大小">
              <el-text>{{ formatFileSize(statusData?.fileSize) }}</el-text>
            </el-descriptions-item>
            <el-descriptions-item label="生效时间">
              <el-text>
                {{ formatDateTime(statusData?.activatedAt) }}
              </el-text>
            </el-descriptions-item>
            <el-descriptions-item label="文件路径" :span="2">
              <el-text class="break-all font-mono" size="small">
                {{ statusData?.filePath || '-' }}
              </el-text>
            </el-descriptions-item>
            <el-descriptions-item label="存储目录" :span="2">
              <el-text class="break-all font-mono" size="small">
                {{ statusData?.storageDir || '-' }}
              </el-text>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <div class="space-y-6">
          <el-card shadow="never">
            <template #header>
              <el-text tag="h2" class="text-base font-semibold">
                上传新库
              </el-text>
            </template>

            <el-text tag="p" class="leading-6" size="small" type="info">
              仅支持上传
              <el-text
                tag="code"
                :class="inlineCodeClass"
                :style="inlineCodeStyle"
                size="small"
              >
                ip2region_v4.xdb
              </el-text>
              。上传成功后会写入
              <el-text
                tag="code"
                :class="inlineCodeClass"
                :style="inlineCodeStyle"
                size="small"
              >
                versions
              </el-text>
              和
              <el-text
                tag="code"
                :class="inlineCodeClass"
                :style="inlineCodeStyle"
                size="small"
              >
                active
              </el-text>
              目录，并切换当前进程查询器。
            </el-text>

            <el-upload
              class="mt-4 w-full"
              :auto-upload="true"
              :before-upload="beforeUpload"
              :disabled="uploading || statusData?.reloading"
              :http-request="handleUpload"
              :multiple="false"
              :show-file-list="false"
              accept=".xdb"
            >
              <el-button
                class="w-full"
                type="primary"
                plain
                :loading="uploading"
              >
                {{
                  uploading
                    ? '正在上传并切换...'
                    : '选择并上传 ip2region_v4.xdb'
                }}
              </el-button>
            </el-upload>

            <div v-if="uploading" class="mt-4">
              <div class="mb-2 flex items-center justify-between gap-3">
                <el-text class="min-w-0" size="small" type="info" truncated>
                  {{ lastUploadFileName || '上传中' }}
                </el-text>
                <el-text size="small" type="info">
                  {{ uploadProgress }}%
                </el-text>
              </div>
              <el-progress :percentage="uploadProgress" :stroke-width="10" />
            </div>
          </el-card>

          <el-card shadow="never">
            <template #header>
              <el-text tag="h2" class="text-base font-semibold">
                操作说明
              </el-text>
            </template>

            <ul class="space-y-3 leading-6">
              <li>
                <el-text size="small" type="info">
                  1. 上传失败不会影响当前在线查询能力。
                </el-text>
              </li>
              <li>
                <el-text size="small" type="info">
                  2. 同一时刻只允许一个热切换流程执行。
                </el-text>
              </li>
              <li>
                <el-text size="small" type="info">
                  3. 服务重启后会优先尝试从 active 目录恢复当前生效库。
                </el-text>
              </li>
              <li>
                <el-text size="small" type="info">
                  4. 若
                  <el-text
                    tag="code"
                    :class="inlineCodeClass"
                    :style="inlineCodeStyle"
                    size="small"
                  >
                    admin-api
                  </el-text>
                  与
                  <el-text
                    tag="code"
                    :class="inlineCodeClass"
                    :style="inlineCodeStyle"
                    size="small"
                  >
                    app-api
                  </el-text>
                  分离运行，本页上传只影响当前接收请求的进程。
                </el-text>
              </li>
            </ul>
          </el-card>
        </div>
      </section>
    </main>
  </Page>
</template>
