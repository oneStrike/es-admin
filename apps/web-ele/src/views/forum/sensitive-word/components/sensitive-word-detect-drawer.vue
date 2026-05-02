<script lang="ts" setup>
import type {
  ForumSensitiveWordCountResponse,
  ForumSensitiveWordDetectResponse,
  ForumSensitiveWordDetectStatusResponse,
  ForumSensitiveWordReplaceResponse,
  SensitiveWordHitDto,
} from '#/api/types';

import { computed, ref, watch } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import {
  forumSensitiveWordCountApi,
  forumSensitiveWordDetectApi,
  forumSensitiveWordDetectStatusApi,
  forumSensitiveWordReplaceApi,
} from '#/api/core';
import { useMessage } from '#/hooks/useFeedback';

import {
  sensitiveWordLevelOptions,
  sensitiveWordTypeOptions,
} from '../modules/model/constants';

type TagType = 'danger' | 'info' | 'primary' | 'success' | 'warning';

const props = withDefaults(
  defineProps<{
    visible?: boolean;
  }>(),
  {
    visible: false,
  },
);

const emit = defineEmits<{
  (event: 'update:visible', value: boolean): void;
}>();

const tagTypes = new Set<TagType>([
  'danger',
  'info',
  'primary',
  'success',
  'warning',
]);

const [Drawer, drawerApi] = useVbenDrawer({
  class: '!w-[720px] max-w-full',
  destroyOnClose: false,
  footer: false,
  title: '敏感词检测工具',
  onOpenChange(isOpen) {
    if (props.visible !== isOpen) {
      emit('update:visible', isOpen);
    }
  },
});

const content = ref('');
const replaceChar = ref('*');
const status = ref<ForumSensitiveWordDetectStatusResponse>();
const count = ref<ForumSensitiveWordCountResponse>();
const detectResult = ref<ForumSensitiveWordDetectResponse>();
const replaceResult = ref<ForumSensitiveWordReplaceResponse>();
const statusLoading = ref(false);
const detecting = ref(false);
const replacing = ref(false);

const hits = computed(() => detectResult.value?.hits ?? []);
const highestLevelOption = computed(() =>
  getLevelOption(detectResult.value?.highestLevel),
);
const highestLevelTagType = computed(() =>
  normalizeTagType(highestLevelOption.value?.color, 'success'),
);
const statusLabel = computed(() => {
  if (!status.value) return '未知';

  return status.value.isReady ? '就绪' : '未就绪';
});
const statusTagType = computed<TagType>(() => {
  if (!status.value) return 'info';

  return status.value.isReady ? 'success' : 'warning';
});

watch(
  () => props.visible,
  (visible) => {
    if (visible) {
      drawerApi.open();
      void loadStatus();
    } else {
      drawerApi.close();
    }
  },
  { immediate: true },
);

function getLevelOption(level?: null | number) {
  if (level === null || level === undefined) return undefined;

  return sensitiveWordLevelOptions.find((item) => item.value === level);
}

function getLevelTagType(level?: null | number) {
  return normalizeTagType(getLevelOption(level)?.color);
}

function getTypeOption(type?: null | number) {
  if (type === null || type === undefined) return undefined;

  return sensitiveWordTypeOptions.find((item) => item.value === type);
}

function normalizeTagType(type?: string, fallback: TagType = 'info') {
  return tagTypes.has(type as TagType) ? (type as TagType) : fallback;
}

function formatHitField(field?: null | string) {
  if (field === 'title') return '标题';
  if (field === 'content') return '正文';

  return field || '-';
}

function formatHitPosition(hit: SensitiveWordHitDto) {
  return `${hit.start}-${hit.end}`;
}

function resolveContent() {
  if (!content.value.trim()) {
    useMessage.warning('请输入待检测文本');
    return '';
  }

  return content.value;
}

async function loadStatus() {
  statusLoading.value = true;
  try {
    const [statusData, countData] = await Promise.all([
      forumSensitiveWordDetectStatusApi(),
      forumSensitiveWordCountApi(),
    ]);
    status.value = statusData;
    count.value = countData;
  } catch {
    useMessage.error('检测器状态加载失败');
  } finally {
    statusLoading.value = false;
  }
}

async function detectContent() {
  const nextContent = resolveContent();
  if (!nextContent) return;

  detecting.value = true;
  try {
    detectResult.value = await forumSensitiveWordDetectApi({
      content: nextContent,
    });
  } catch {
    useMessage.error('敏感词检测失败');
  } finally {
    detecting.value = false;
  }
}

async function previewReplace() {
  const nextContent = resolveContent();
  if (!nextContent) return;

  replacing.value = true;
  try {
    replaceResult.value = await forumSensitiveWordReplaceApi({
      content: nextContent,
      replaceChar: replaceChar.value || '*',
    });
  } catch {
    useMessage.error('替换预览失败');
  } finally {
    replacing.value = false;
  }
}

function clearContent() {
  content.value = '';
  detectResult.value = undefined;
  replaceResult.value = undefined;
}
</script>

<template>
  <Drawer>
    <div class="space-y-4">
      <el-card shadow="never">
        <div class="mb-4 flex items-center justify-between gap-3">
          <div class="text-sm font-medium text-slate-700">检测器状态</div>
          <el-button size="small" :loading="statusLoading" @click="loadStatus">
            刷新状态
          </el-button>
        </div>
        <div class="grid gap-3 md:grid-cols-3">
          <div class="rounded-md border border-slate-100 p-3">
            <div class="mb-2 text-xs text-slate-500">就绪状态</div>
            <el-tag :type="statusTagType">{{ statusLabel }}</el-tag>
          </div>
          <div class="rounded-md border border-slate-100 p-3">
            <div class="mb-2 text-xs text-slate-500">已加载词数</div>
            <div class="text-lg font-semibold text-slate-900">
              {{ status?.wordCount ?? '-' }}
            </div>
          </div>
          <div class="rounded-md border border-slate-100 p-3">
            <div class="mb-2 text-xs text-slate-500">词库数量</div>
            <div class="text-lg font-semibold text-slate-900">
              {{ count?.count ?? '-' }}
            </div>
          </div>
        </div>
      </el-card>

      <el-card shadow="never">
        <div class="mb-3 text-sm font-medium text-slate-700">待检测文本</div>
        <el-input
          v-model="content"
          maxlength="5000"
          placeholder="请输入待检测文本"
          :rows="8"
          show-word-limit
          type="textarea"
        />
        <div class="mt-3 grid gap-3 md:grid-cols-[1fr_auto]">
          <el-input v-model="replaceChar" maxlength="8" placeholder="替换字符">
            <template #prepend>替换字符</template>
          </el-input>
          <div class="flex flex-wrap justify-end gap-2">
            <el-button @click="clearContent">清空</el-button>
            <el-button
              :loading="replacing"
              type="primary"
              plain
              @click="previewReplace"
            >
              替换预览
            </el-button>
            <el-button
              :loading="detecting"
              type="primary"
              @click="detectContent"
            >
              检测
            </el-button>
          </div>
        </div>
      </el-card>

      <el-card shadow="never">
        <template #header>
          <div class="flex items-center justify-between gap-3">
            <span>检测结果</span>
            <div class="flex items-center gap-2">
              <el-tag v-if="detectResult" :type="highestLevelTagType">
                {{ highestLevelOption?.label || '无风险' }}
              </el-tag>
              <el-tag v-if="detectResult" type="info">
                命中 {{ hits.length }} 项
              </el-tag>
            </div>
          </div>
        </template>

        <el-empty v-if="!detectResult" description="暂无检测结果" />
        <el-empty v-else-if="hits.length === 0" description="未命中敏感词" />
        <el-table v-else :data="hits" border max-height="280" size="small">
          <el-table-column label="敏感词" min-width="130" prop="word" />
          <el-table-column label="级别" min-width="100">
            <template #default="{ row }">
              <el-tag :type="getLevelTagType(row.level)">
                {{ getLevelOption(row.level)?.label || row.level }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="类型" min-width="120">
            <template #default="{ row }">
              <el-tag type="info">
                {{ getTypeOption(row.type)?.label || row.type }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="命中字段" min-width="100">
            <template #default="{ row }">
              {{ formatHitField(row.field) }}
            </template>
          </el-table-column>
          <el-table-column label="位置" min-width="100">
            <template #default="{ row }">
              {{ formatHitPosition(row) }}
            </template>
          </el-table-column>
          <el-table-column label="替换词" min-width="120">
            <template #default="{ row }">
              {{ row.replaceWord || '-' }}
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-card shadow="never">
        <template #header>替换结果</template>
        <el-input
          :model-value="replaceResult?.replacedText || ''"
          placeholder="暂无替换结果"
          readonly
          :rows="5"
          type="textarea"
        />
      </el-card>
    </div>
  </Drawer>
</template>
