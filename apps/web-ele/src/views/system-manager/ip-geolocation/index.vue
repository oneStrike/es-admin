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
const inlineCodeClass = 'rounded bg-slate-100 px-1 py-0.5 text-slate-700';

function formatDateTime(value?: null | string) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
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
      '/api/admin/system/ip2region/upload',
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
  } catch (error: any) {
    options.onError?.(error);
    useMessage.error(getApiErrorMessage(error, 'IP 属地库上传失败'));
  } finally {
    uploading.value = false;
  }
}

onMounted(loadStatus);
</script>

<template>
  <Page auto-content-height title="IP 属地库">
    <main class="space-y-6">
      <section
        class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div class="space-y-2">
            <div class="flex items-center gap-3">
              <h1 class="text-xl font-semibold text-slate-900">
                IP 属地库管理
              </h1>
              <el-tag :type="statusTagType" effect="light">
                {{ statusSummary }}
              </el-tag>
            </div>
            <p class="max-w-3xl text-sm leading-6 text-slate-500">
              用于上传并切换当前进程使用的
              <code :class="inlineCodeClass">ip2region_v4.xdb</code>
              文件。当前能力只保证接收上传请求的 API
              进程立即生效，不处理跨进程或跨实例同步。
            </p>
          </div>
          <el-button :loading="statusLoading" @click="loadStatus">
            刷新状态
          </el-button>
        </div>
      </section>

      <section
        class="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_360px]"
      >
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="mb-4 flex items-center justify-between gap-3">
            <h2 class="text-base font-semibold text-slate-900">当前状态</h2>
            <div class="text-xs text-slate-400">
              {{ statusData ? '已同步' : '等待加载' }}
            </div>
          </div>

          <el-alert
            v-if="statusData && !statusData.ready"
            :closable="false"
            show-icon
            title="当前进程未加载可用属地库，可上传新的 xdb 文件后立即切换。"
            type="warning"
          />

          <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div class="text-xs text-slate-500">当前来源</div>
              <div class="mt-2 text-sm font-medium text-slate-900">
                {{ getSourceLabel(statusData?.source) }}
              </div>
            </div>
            <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div class="text-xs text-slate-500">当前文件名</div>
              <div class="mt-2 break-all text-sm font-medium text-slate-900">
                {{ statusData?.fileName || '-' }}
              </div>
            </div>
            <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div class="text-xs text-slate-500">文件大小</div>
              <div class="mt-2 text-sm font-medium text-slate-900">
                {{ formatFileSize(statusData?.fileSize) }}
              </div>
            </div>
            <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div class="text-xs text-slate-500">生效时间</div>
              <div class="mt-2 text-sm font-medium text-slate-900">
                {{ formatDateTime(statusData?.activatedAt) }}
              </div>
            </div>
          </div>

          <div class="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div class="text-xs text-slate-500">文件路径</div>
            <div class="mt-2 break-all text-sm text-slate-900">
              {{ statusData?.filePath || '-' }}
            </div>
          </div>

          <div class="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div class="text-xs text-slate-500">存储目录</div>
            <div class="mt-2 break-all text-sm text-slate-900">
              {{ statusData?.storageDir || '-' }}
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <section
            class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 class="text-base font-semibold text-slate-900">上传新库</h2>
            <p class="mt-2 text-sm leading-6 text-slate-500">
              仅支持上传
              <code :class="inlineCodeClass">ip2region_v4.xdb</code>
              。上传成功后会写入
              <code :class="inlineCodeClass">versions</code>
              和
              <code :class="inlineCodeClass">active</code>
              目录，并切换当前进程查询器。
            </p>

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
              <div
                class="mb-2 flex items-center justify-between text-xs text-slate-500"
              >
                <span>{{ lastUploadFileName || '上传中' }}</span>
                <span>{{ uploadProgress }}%</span>
              </div>
              <el-progress :percentage="uploadProgress" :stroke-width="10" />
            </div>
          </section>

          <section
            class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 class="text-base font-semibold text-slate-900">操作说明</h2>
            <ul class="mt-3 space-y-3 text-sm leading-6 text-slate-500">
              <li>1. 上传失败不会影响当前在线查询能力。</li>
              <li>2. 同一时刻只允许一个热切换流程执行。</li>
              <li>3. 服务重启后会优先尝试从 active 目录恢复当前生效库。</li>
              <li>
                4. 若 `admin-api` 与 `app-api`
                分离运行，本页上传只影响当前接收请求的进程。
              </li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  </Page>
</template>
