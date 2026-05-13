<script lang="ts" setup>
import type { UploadProps, UploadUserFile } from 'element-plus';

import type {
  ContentComicChapterContentArchiveConfirmRequest,
  ContentComicChapterContentArchiveDetailResponse,
  ContentComicChapterContentArchivePreviewResponse,
} from '#/api/types';

import { computed, onBeforeUnmount, ref, watch } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import {
  contentComicChapterContentArchiveConfirmApi,
  contentComicChapterContentArchiveDetailApi,
} from '#/api/core';
import { getApiErrorMessage } from '#/api/error';
import { requestClient } from '#/api/request';
import { AlertCircleIcon, ImageLine, UploadLoop } from '#/components/es-icons';
import { UploadUrlMapEnum } from '#/enum/api';
import { useMessage } from '#/hooks/useFeedback';

defineOptions({
  name: 'ArchiveImportPanel',
});

const props = defineProps<{
  chapterId?: number;
  chapterTitle?: string;
  displayTitle?: string;
  workId: number;
}>();

const emit = defineEmits<{
  (
    e: 'importFinished',
    task: ContentComicChapterContentArchiveDetailResponse,
  ): void;
}>();

const detailLoading = ref(false);
const errorMessage = ref('');
const uploading = ref(false);
const uploadProgress = ref(0);
const confirming = ref(false);
const archiveFileList = ref<UploadUserFile[]>([]);
const selectedArchiveFile = ref<File | null>(null);
const selectedChapterIds = ref<number[]>([]);
const sourceFileName = ref('');
const taskDetail = ref<ContentComicChapterContentArchiveDetailResponse | null>(
  null,
);

let pollTimer: null | number = null;
let notifiedTaskId = '';

const ARCHIVE_STATUS = {
  DRAFT: 0,
  PENDING: 1,
  PROCESSING: 2,
  SUCCESS: 3,
  PARTIAL_FAILED: 4,
  FAILED: 5,
  EXPIRED: 6,
  CANCELLED: 7,
} as const;

const ARCHIVE_RESULT_STATUS = {
  PENDING: 0,
  SUCCESS: 1,
  FAILED: 2,
} as const;

const [Modal, modalApi] = useVbenModal({
  closeOnClickModal: false,
  closeOnPressEscape: false,
  showCancelButton: false,
  showConfirmButton: false,
  title: '压缩包导入',
  onOpenChange(isOpen) {
    if (isOpen) {
      modalApi.setState({
        title: panelTitle.value,
      });
    }
  },
});

const terminalStatuses: Set<number> = new Set([
  ARCHIVE_STATUS.CANCELLED,
  ARCHIVE_STATUS.EXPIRED,
  ARCHIVE_STATUS.FAILED,
  ARCHIVE_STATUS.PARTIAL_FAILED,
  ARCHIVE_STATUS.SUCCESS,
]);
const processingStatuses: Set<number> = new Set([
  ARCHIVE_STATUS.PENDING,
  ARCHIVE_STATUS.PROCESSING,
]);
const statusLabelMap: Record<number, string> = {
  [ARCHIVE_STATUS.CANCELLED]: '已取消',
  [ARCHIVE_STATUS.DRAFT]: '等待确认',
  [ARCHIVE_STATUS.EXPIRED]: '已过期',
  [ARCHIVE_STATUS.FAILED]: '导入失败',
  [ARCHIVE_STATUS.PARTIAL_FAILED]: '部分失败',
  [ARCHIVE_STATUS.PENDING]: '等待处理',
  [ARCHIVE_STATUS.PROCESSING]: '处理中',
  [ARCHIVE_STATUS.SUCCESS]: '导入成功',
};
const statusTypeMap: Record<
  number,
  'danger' | 'info' | 'primary' | 'success' | 'warning'
> = {
  [ARCHIVE_STATUS.CANCELLED]: 'info',
  [ARCHIVE_STATUS.DRAFT]: 'primary',
  [ARCHIVE_STATUS.EXPIRED]: 'warning',
  [ARCHIVE_STATUS.FAILED]: 'danger',
  [ARCHIVE_STATUS.PARTIAL_FAILED]: 'warning',
  [ARCHIVE_STATUS.PENDING]: 'info',
  [ARCHIVE_STATUS.PROCESSING]: 'warning',
  [ARCHIVE_STATUS.SUCCESS]: 'success',
};
const resultStatusLabelMap: Record<number, string> = {
  [ARCHIVE_RESULT_STATUS.PENDING]: '待处理',
  [ARCHIVE_RESULT_STATUS.SUCCESS]: '成功',
  [ARCHIVE_RESULT_STATUS.FAILED]: '失败',
};
const resultStatusTypeMap: Record<
  number,
  'danger' | 'info' | 'success' | 'warning'
> = {
  [ARCHIVE_RESULT_STATUS.PENDING]: 'info',
  [ARCHIVE_RESULT_STATUS.SUCCESS]: 'success',
  [ARCHIVE_RESULT_STATUS.FAILED]: 'danger',
};
const ignoreReasonLabelMap: Record<number, string> = {
  1001: '目录名不是章节 ID',
  1002: '章节不存在',
  1003: '目录层级过深',
  1004: '缺少章节 ID',
  1005: '没有可导入图片',
};
const isSingleChapterMode = computed(() => Number.isInteger(props.chapterId));
const panelTitle = computed(() =>
  isSingleChapterMode.value ? '章节压缩包导入' : '多章节压缩包导入',
);
const panelSubtitle = computed(() => {
  if (isSingleChapterMode.value) {
    return `${props.chapterTitle || '当前章节'} · 仅支持当前章节压缩包导入，确认后会覆盖本章节内容`;
  }
  return `${props.displayTitle || '当前作品'} · 支持按章节 ID 批量匹配章节并确认导入`;
});

const currentStatusLabel = computed(() => {
  if (!taskDetail.value) {
    if (uploading.value) return '正在预解析';
    return selectedArchiveFile.value ? '等待预解析' : '等待上传';
  }
  return statusLabelMap[taskDetail.value.status] ?? '等待上传';
});
const currentStatusType = computed(() => {
  if (!taskDetail.value) return 'primary';
  return statusTypeMap[taskDetail.value.status] ?? 'primary';
});
const showConfirmStage = computed(
  () =>
    !!taskDetail.value &&
    taskDetail.value.status === ARCHIVE_STATUS.DRAFT &&
    taskDetail.value.requireConfirm,
);
const hasActiveTask = computed(
  () => !!taskDetail.value && processingStatuses.has(taskDetail.value.status),
);
const canConfirm = computed(
  () =>
    !!taskDetail.value &&
    taskDetail.value.status === ARCHIVE_STATUS.DRAFT &&
    selectedChapterIds.value.length > 0 &&
    !confirming.value,
);
const canStartPreview = computed(
  () =>
    !!selectedArchiveFile.value &&
    !uploading.value &&
    !confirming.value &&
    !hasActiveTask.value,
);
const selectedImageCount = computed(() => {
  if (!taskDetail.value) return 0;
  const selectedSet = new Set(selectedChapterIds.value);
  return taskDetail.value.matchedItems.reduce((total, item) => {
    return total + (selectedSet.has(item.chapterId) ? item.imageCount : 0);
  }, 0);
});
const archiveProgress = computed(() => {
  if (uploading.value) return uploadProgress.value;
  if (!taskDetail.value) return 0;
  let selectedCount = selectedChapterIds.value.length;
  if (selectedCount <= 0) {
    selectedCount = taskDetail.value.matchedItems.length || 1;
  }
  const total = Math.max(1, selectedCount);
  return Math.min(
    100,
    Math.round((taskDetail.value.resultItems.length / total) * 100),
  );
});
const ignoredReasonGroups = computed(() => {
  const counter = new Map<number, number>();
  for (const item of taskDetail.value?.ignoredItems ?? []) {
    counter.set(item.reason, (counter.get(item.reason) ?? 0) + 1);
  }
  return [...counter.entries()].map(([reason, count]) => ({
    count,
    label: ignoreReasonLabelMap[reason] ?? `原因 ${reason}`,
    reason,
  }));
});
const hasOverwriteWarning = computed(
  () =>
    taskDetail.value?.matchedItems.some((item) => item.hasExistingContent) ??
    false,
);
const taskHint = computed(() => {
  if (!taskDetail.value) {
    if (uploading.value && sourceFileName.value) {
      return `${sourceFileName.value} · 正在预解析`;
    }
    if (selectedArchiveFile.value && sourceFileName.value) {
      return `${sourceFileName.value} · 等待预解析`;
    }
    if (errorMessage.value && sourceFileName.value) {
      return `${sourceFileName.value} · 预解析失败`;
    }
    return isSingleChapterMode.value
      ? '支持 zip 压缩包，仅处理当前章节。'
      : '支持 zip 压缩包，按章节 ID 批量预解析后确认导入。';
  }
  return `${sourceFileName.value || '压缩包'} · 任务 ${taskDetail.value.taskId.slice(0, 8)}`;
});
const archiveRuleGroups = computed(() => [
  {
    title: '目录与命名',
    rules: isSingleChapterMode.value
      ? [
          '单章节导入只扫描压缩包根目录图片。',
          '压缩包内目录和不支持的文件会被忽略。',
        ]
      : [
          '批量导入按一级目录名匹配章节 ID。',
          '根目录文件、嵌套目录和不支持的文件会被忽略。',
        ],
  },
  {
    title: '覆盖风险',
    rules: [
      '确认导入后会用压缩包图片整体替换章节内容。',
      '已有旧资源不会在首版流程中自动删除。',
    ],
  },
  {
    title: '导入流程',
    rules: [
      '先选择 zip，再手动开始预解析。',
      '检查匹配章节和忽略项后，再确认提交后台导入。',
    ],
  },
]);

function openPanel() {
  modalApi.setState({
    title: panelTitle.value,
  });
  modalApi.open();
}

function closePanel() {
  if (!taskDetail.value && !uploading.value) {
    resetPreviewDraft();
  }
  modalApi.close();
}

watch(
  () =>
    `${props.workId}-${props.chapterId ?? 'all'}-${props.displayTitle ?? ''}`,
  () => {
    stopPolling();
    closePanel();
    detailLoading.value = false;
    errorMessage.value = '';
    uploading.value = false;
    uploadProgress.value = 0;
    confirming.value = false;
    resetPreviewDraft();
    selectedChapterIds.value = [];
    taskDetail.value = null;
    notifiedTaskId = '';
  },
);

onBeforeUnmount(() => {
  stopPolling();
});

function stopPolling() {
  if (pollTimer) {
    clearTimeout(pollTimer);
    pollTimer = null;
  }
}

function isZipFile(rawFile: File) {
  return /\.zip$/i.test(rawFile.name) || rawFile.type === 'application/zip';
}

function validateArchiveFile(rawFile: File) {
  if (!isZipFile(rawFile)) {
    useMessage.warning('仅支持上传 zip 压缩包');
    return false;
  }
  if (hasActiveTask.value) {
    useMessage.warning('当前已有导入任务处理中，请等待完成后再上传新的压缩包');
    return false;
  }
  return true;
}

const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  return validateArchiveFile(rawFile);
};

const handleArchiveFileChange: UploadProps['onChange'] = (uploadFile) => {
  const rawFile = uploadFile.raw;
  if (!rawFile || !validateArchiveFile(rawFile)) {
    resetPreviewDraft();
    return;
  }

  selectedArchiveFile.value = rawFile;
  sourceFileName.value = rawFile.name;
  errorMessage.value = '';
  archiveFileList.value = [uploadFile as UploadUserFile];
};

const handleArchiveFileRemove: UploadProps['onRemove'] = () => {
  resetPreviewDraft();
};

const handleArchiveFileExceed: UploadProps['onExceed'] = (files) => {
  const file = files[0];
  if (!file || !validateArchiveFile(file)) return;

  selectedArchiveFile.value = file;
  sourceFileName.value = file.name;
  errorMessage.value = '';
  archiveFileList.value = [
    {
      name: file.name,
      raw: file,
      size: file.size,
    } as UploadUserFile,
  ];
};

function toggleChapterSelection(chapterId: number) {
  const index = selectedChapterIds.value.indexOf(chapterId);
  if (index === -1) {
    selectedChapterIds.value.push(chapterId);
  } else {
    selectedChapterIds.value.splice(index, 1);
  }
}

async function fetchTaskDetail(taskId: string) {
  detailLoading.value = true;
  try {
    const detail = await contentComicChapterContentArchiveDetailApi({
      taskId,
    });
    taskDetail.value = detail;
    if (processingStatuses.has(detail.status)) {
      schedulePolling(taskId);
    } else {
      stopPolling();
    }
    if (
      terminalStatuses.has(detail.status) &&
      notifiedTaskId !== detail.taskId
    ) {
      notifiedTaskId = detail.taskId;
      emit('importFinished', detail);
      if (detail.status === ARCHIVE_STATUS.SUCCESS) {
        useMessage.success('压缩包导入完成');
      } else if (detail.status === ARCHIVE_STATUS.PARTIAL_FAILED) {
        useMessage.warning('压缩包导入完成，但有部分章节失败');
      } else {
        useMessage.error(detail.lastError || '压缩包导入失败');
      }
    }
  } finally {
    detailLoading.value = false;
  }
}

function schedulePolling(taskId: string) {
  stopPolling();
  pollTimer = window.setTimeout(() => {
    void fetchTaskDetail(taskId);
  }, 3000);
}

function resetPreviewDraft() {
  archiveFileList.value = [];
  selectedArchiveFile.value = null;
  sourceFileName.value = '';
  uploadProgress.value = 0;
  errorMessage.value = '';
}

async function handleStartPreview() {
  const file = selectedArchiveFile.value;
  if (!file) {
    useMessage.warning('请先选择 zip 压缩包');
    return;
  }
  if (!validateArchiveFile(file)) {
    resetPreviewDraft();
    return;
  }

  const params = new URLSearchParams({
    workId: String(props.workId),
  });
  if (isSingleChapterMode.value && props.chapterId !== undefined) {
    params.set('chapterId', String(props.chapterId));
  }

  errorMessage.value = '';
  sourceFileName.value = file.name;
  taskDetail.value = null;
  selectedChapterIds.value = [];
  uploadProgress.value = 0;
  uploading.value = true;
  stopPolling();

  try {
    const task =
      await requestClient.upload<ContentComicChapterContentArchivePreviewResponse>(
        `${UploadUrlMapEnum.COMIC_ARCHIVE_PREVIEW}?${params.toString()}`,
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
    taskDetail.value = task;
    selectedChapterIds.value = task.matchedItems.map((item) => item.chapterId);
    archiveFileList.value = [];
    selectedArchiveFile.value = null;
    if (task.matchedItems.length > 0) {
      useMessage.success(
        isSingleChapterMode.value
          ? '压缩包预解析完成，请确认覆盖当前章节'
          : '压缩包预解析完成，请确认导入章节',
      );
    } else {
      useMessage.warning('预解析完成，但没有可导入的章节');
    }
  } catch (error: any) {
    errorMessage.value = getApiErrorMessage(
      error,
      '压缩包预解析失败，请稍后重试',
    );
  } finally {
    uploading.value = false;
  }
}

async function handleConfirmImport() {
  if (!taskDetail.value || selectedChapterIds.value.length === 0) return;
  confirming.value = true;
  try {
    await contentComicChapterContentArchiveConfirmApi({
      confirmedChapterIds: selectedChapterIds.value,
      taskId: taskDetail.value.taskId,
    } satisfies ContentComicChapterContentArchiveConfirmRequest);
    useMessage.success('导入任务已提交，正在后台处理');
    taskDetail.value = {
      ...taskDetail.value,
      lastError: null,
      resultItems: [],
      status: ARCHIVE_STATUS.PENDING,
    };
    await fetchTaskDetail(taskDetail.value.taskId);
  } finally {
    confirming.value = false;
  }
}
</script>

<template>
  <div class="flex items-center gap-3">
    <el-button :loading="uploading" @click="openPanel">
      <template #icon>
        <UploadLoop class="text-4xl" />
      </template>
      {{ panelTitle }}
    </el-button>

    <button
      v-if="taskDetail"
      class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 via-white to-blue-50 px-4 py-2 text-left shadow-sm transition hover:border-blue-300 hover:shadow"
      type="button"
      @click="openPanel"
    >
      <div
        class="flex size-9 items-center justify-center rounded-xl bg-slate-900 text-white"
      >
        <ImageLine class="text-4xl" />
      </div>
      <div>
        <div class="text-sm font-semibold text-slate-900">
          {{ isSingleChapterMode ? '章节导入任务' : '批量导入任务' }}
        </div>
        <div class="text-xs text-slate-500">{{ taskHint }}</div>
      </div>
      <el-tag :type="currentStatusType" effect="light">
        {{ currentStatusLabel }}
      </el-tag>
    </button>

    <Modal class="w-[1080px] top-[6vh]">
      <template #title>
        <div class="flex items-start justify-between gap-4">
          <div>
            <div class="text-lg font-semibold text-slate-900">
              {{ panelTitle }}
            </div>
            <div class="mt-1 text-sm text-slate-500">{{ panelSubtitle }}</div>
          </div>
          <el-tag :type="currentStatusType" effect="light">
            {{ currentStatusLabel }}
          </el-tag>
        </div>
      </template>

      <div class="space-y-4">
        <div v-if="taskDetail || uploading" class="grid grid-cols-4 gap-3">
          <div
            class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div class="text-xs text-slate-500">可导入章节</div>
            <div class="mt-2 text-2xl font-semibold text-slate-900">
              {{ taskDetail?.summary.matchedChapterCount ?? 0 }}
            </div>
          </div>
          <div
            class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div class="text-xs text-slate-500">有效图片</div>
            <div class="mt-2 text-2xl font-semibold text-slate-900">
              {{ selectedImageCount || taskDetail?.summary.imageCount || 0 }}
            </div>
          </div>
          <div
            class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div class="text-xs text-slate-500">忽略条目</div>
            <div class="mt-2 text-2xl font-semibold text-slate-900">
              {{ taskDetail?.summary.ignoredItemCount ?? 0 }}
            </div>
          </div>
          <div
            class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div class="text-xs text-slate-500">处理进度</div>
            <div class="mt-2 text-2xl font-semibold text-slate-900">
              {{ archiveProgress }}%
            </div>
          </div>
        </div>

        <div
          v-if="uploading"
          class="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 shadow-sm"
        >
          <div class="flex items-center gap-3 text-slate-900">
            <UploadLoop class="text-5xl" />
            <div>
              <div class="text-base font-semibold">正在预解析压缩包</div>
              <div class="text-sm text-slate-500">{{ sourceFileName }}</div>
            </div>
          </div>
          <el-progress
            class="mt-5"
            :percentage="archiveProgress"
            :stroke-width="10"
          />
        </div>

        <template v-else>
          <el-alert
            v-if="errorMessage"
            :closable="false"
            show-icon
            type="error"
            :title="errorMessage"
          />

          <template v-if="taskDetail">
            <el-alert
              v-if="hasOverwriteWarning"
              :closable="false"
              show-icon
              type="warning"
              title="检测到已有章节内容，本次压缩包导入采用覆盖模式，确认后会用新图片整体替换章节内容。"
            />
            <el-alert
              v-if="taskDetail.matchedItems.length === 0"
              :closable="false"
              show-icon
              type="info"
              title="当前压缩包没有匹配到可导入章节，请检查目录是否为一级章节 ID，或确认压缩包内是否包含有效图片。"
            />
            <el-alert
              v-if="taskDetail.lastError"
              :closable="false"
              show-icon
              type="error"
              :title="taskDetail.lastError"
            />

            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-7 space-y-3">
                <div
                  class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div class="mb-3 flex items-center justify-between">
                    <div class="text-sm font-semibold text-slate-900">
                      {{ isSingleChapterMode ? '当前章节预解析' : '匹配章节' }}
                    </div>
                    <div
                      v-if="!isSingleChapterMode"
                      class="text-xs text-slate-500"
                    >
                      已选择 {{ selectedChapterIds.length }} 个章节
                    </div>
                    <div v-else class="text-xs text-slate-500">
                      仅处理当前章节
                    </div>
                  </div>
                  <div class="max-h-[460px] space-y-3 overflow-y-auto pr-1">
                    <div
                      v-for="item in taskDetail.matchedItems"
                      :key="item.chapterId"
                      class="rounded-2xl border p-4 transition"
                      :class="
                        isSingleChapterMode ||
                        selectedChapterIds.includes(item.chapterId)
                          ? 'border-blue-300 bg-blue-50/70 shadow-sm'
                          : 'border-slate-200 bg-slate-50/70 hover:border-blue-200 hover:bg-white'
                      "
                      :role="isSingleChapterMode ? undefined : 'button'"
                      :tabindex="isSingleChapterMode ? undefined : 0"
                      @click="
                        !isSingleChapterMode &&
                        toggleChapterSelection(item.chapterId)
                      "
                      @keydown.enter.prevent="
                        !isSingleChapterMode &&
                        toggleChapterSelection(item.chapterId)
                      "
                      @keydown.space.prevent="
                        !isSingleChapterMode &&
                        toggleChapterSelection(item.chapterId)
                      "
                    >
                      <div class="flex items-start gap-3">
                        <el-checkbox
                          v-if="!isSingleChapterMode"
                          :model-value="
                            selectedChapterIds.includes(item.chapterId)
                          "
                          @click.stop="toggleChapterSelection(item.chapterId)"
                        />
                        <div class="min-w-0 flex-1">
                          <div
                            class="flex flex-wrap items-center justify-between gap-2"
                          >
                            <div>
                              <div class="text-sm font-semibold text-slate-900">
                                {{ item.chapterTitle }}
                              </div>
                              <div class="mt-1 text-xs text-slate-500">
                                章节 #{{ item.chapterId }} · 来源
                                {{ item.path }}
                              </div>
                            </div>
                            <div class="flex items-center gap-2">
                              <span
                                class="rounded-full bg-slate-900 px-2.5 py-1 text-xs text-white"
                              >
                                {{ item.imageCount }} 张
                              </span>
                              <el-tag
                                v-if="isSingleChapterMode"
                                effect="light"
                                type="success"
                              >
                                当前章节
                              </el-tag>
                              <el-tag
                                v-if="item.hasExistingContent"
                                effect="light"
                                type="warning"
                              >
                                覆盖 {{ item.existingImageCount }} 张
                              </el-tag>
                            </div>
                          </div>
                          <div class="mt-3 text-sm text-slate-600">
                            {{ item.message }}
                          </div>
                          <div
                            v-if="item.warningMessage"
                            class="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-700"
                          >
                            {{ item.warningMessage }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="taskDetail.matchedItems.length === 0"
                      class="rounded-2xl border border-dashed border-slate-200 px-4 py-10 text-center text-sm text-slate-400"
                    >
                      当前没有匹配成功的章节
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-span-5 space-y-3">
                <div
                  class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div class="text-sm font-semibold text-slate-900">
                    忽略原因
                  </div>
                  <div class="mt-3 flex flex-wrap gap-2">
                    <el-tag
                      v-for="item in ignoredReasonGroups"
                      :key="item.reason"
                      effect="light"
                      type="info"
                    >
                      {{ item.label }} × {{ item.count }}
                    </el-tag>
                    <span
                      v-if="ignoredReasonGroups.length === 0"
                      class="text-sm text-slate-400"
                    >
                      没有忽略项
                    </span>
                  </div>
                </div>

                <div
                  class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div class="mb-3 flex items-center justify-between">
                    <div class="text-sm font-semibold text-slate-900">
                      忽略明细
                    </div>
                    <div v-if="detailLoading" class="text-xs text-slate-400">
                      刷新中
                    </div>
                  </div>
                  <div class="max-h-[240px] space-y-2 overflow-y-auto pr-1">
                    <div
                      v-for="item in taskDetail.ignoredItems"
                      :key="`${item.path}-${item.reason}`"
                      class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3"
                    >
                      <div
                        class="flex items-center gap-2 text-xs text-slate-500"
                      >
                        <AlertCircleIcon class="text-3xl text-amber-500" />
                        <span>
                          {{
                            ignoreReasonLabelMap[item.reason] ??
                            `原因 ${item.reason}`
                          }}
                        </span>
                      </div>
                      <div class="mt-2 text-sm font-medium text-slate-900">
                        {{ item.path }}
                      </div>
                      <div class="mt-1 text-xs leading-5 text-slate-500">
                        {{ item.message }}
                      </div>
                    </div>
                    <div
                      v-if="taskDetail.ignoredItems.length === 0"
                      class="rounded-xl border border-dashed border-slate-200 px-3 py-6 text-center text-sm text-slate-400"
                    >
                      所有目录都通过了预解析
                    </div>
                  </div>
                </div>

                <div
                  class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div class="mb-3 flex items-center justify-between">
                    <div class="text-sm font-semibold text-slate-900">
                      执行结果
                    </div>
                    <div class="text-xs text-slate-400">
                      {{ taskDetail.resultItems.length }} 条
                    </div>
                  </div>
                  <div class="max-h-[240px] space-y-2 overflow-y-auto pr-1">
                    <div
                      v-for="item in taskDetail.resultItems"
                      :key="`${item.chapterId}-${item.status}`"
                      class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3"
                    >
                      <div class="flex items-center justify-between gap-2">
                        <div class="text-sm font-semibold text-slate-900">
                          {{ item.chapterTitle }}
                        </div>
                        <el-tag
                          :type="resultStatusTypeMap[item.status] ?? 'info'"
                          effect="light"
                        >
                          {{ resultStatusLabelMap[item.status] ?? item.status }}
                        </el-tag>
                      </div>
                      <div class="mt-2 text-xs text-slate-500">
                        章节 #{{ item.chapterId }} · 导入
                        {{ item.importedImageCount }}
                        张
                      </div>
                      <div class="mt-1 text-xs leading-5 text-slate-500">
                        {{ item.message }}
                      </div>
                    </div>
                    <div
                      v-if="taskDetail.resultItems.length === 0"
                      class="rounded-xl border border-dashed border-slate-200 px-3 py-6 text-center text-sm text-slate-400"
                    >
                      确认导入后，这里会展示每个章节的执行结果
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <div v-else class="grid grid-cols-12 gap-4">
            <section
              class="col-span-12 rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:col-span-5"
            >
              <div class="flex items-start justify-between gap-3">
                <div>
                  <div class="text-sm font-semibold text-slate-900">
                    选择压缩包
                  </div>
                  <div class="mt-1 text-xs leading-5 text-slate-500">
                    选择文件后不会立即上传，需要再次点击开始预解析。
                  </div>
                </div>
                <ImageLine class="text-4xl text-slate-400" />
              </div>

              <el-upload
                v-model:file-list="archiveFileList"
                class="mt-4"
                :auto-upload="false"
                :before-upload="beforeUpload"
                :disabled="uploading || confirming || hasActiveTask"
                :limit="1"
                :multiple="false"
                :on-change="handleArchiveFileChange"
                :on-exceed="handleArchiveFileExceed"
                :on-remove="handleArchiveFileRemove"
                accept=".zip,application/zip"
              >
                <el-button
                  :disabled="uploading || confirming || hasActiveTask"
                  type="primary"
                  plain
                >
                  选择 zip 压缩包
                </el-button>
                <template #tip>
                  <div class="mt-2 text-xs leading-5 text-slate-500">
                    仅支持 zip。批量导入会按章节 ID
                    目录匹配，单章导入只处理当前章节。
                  </div>
                </template>
              </el-upload>

              <div
                v-if="selectedArchiveFile"
                class="mt-4 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-700"
              >
                已选择 {{ sourceFileName }}，点击“开始预解析”后才会上传。
              </div>
            </section>

            <section class="col-span-12 grid grid-cols-1 gap-3 lg:col-span-7">
              <div
                v-for="group in archiveRuleGroups"
                :key="group.title"
                class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div class="mb-3 flex items-center gap-2">
                  <AlertCircleIcon class="text-3xl text-blue-500" />
                  <div class="text-sm font-semibold text-slate-900">
                    {{ group.title }}
                  </div>
                </div>
                <ul class="space-y-2 text-sm leading-6 text-slate-500">
                  <li
                    v-for="rule in group.rules"
                    :key="rule"
                    class="flex gap-2"
                  >
                    <span class="mt-2 size-1.5 rounded-full bg-slate-300" />
                    <span>{{ rule }}</span>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </template>
      </div>

      <template #footer>
        <div class="flex items-center justify-between gap-4">
          <div class="text-xs text-slate-500">{{ taskHint }}</div>
          <div class="flex gap-2">
            <el-button @click="closePanel">
              {{ hasActiveTask ? '后台继续处理，先关闭' : '关闭' }}
            </el-button>
            <el-button
              v-if="!taskDetail"
              :disabled="!canStartPreview"
              :loading="uploading"
              type="primary"
              @click="handleStartPreview"
            >
              开始预解析
            </el-button>
            <el-button
              v-if="showConfirmStage"
              :disabled="!canConfirm"
              :loading="confirming"
              type="primary"
              @click="handleConfirmImport"
            >
              {{
                isSingleChapterMode
                  ? '确认覆盖当前章节'
                  : `确认导入 ${selectedChapterIds.length} 个章节`
              }}
            </el-button>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>
