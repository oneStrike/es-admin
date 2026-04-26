<script lang="ts" setup>
import type { CheckInStreakDetailResponse } from '#/api/types';
import type { RewardConfigValue } from '../../shared/reward-config/reward-config.types';

import { computed, onMounted, reactive, ref } from 'vue';

import { ElMessageBox } from 'element-plus';

import {
  checkInStreakHistoryPageApi,
  checkInStreakPageApi,
  checkInStreakPublishApi,
  checkInStreakTerminateApi,
} from '#/api/core';
import { useMessage } from '#/hooks/useFeedback';
import RewardConfigModal from '../../shared/reward-config/reward-config-modal.vue';

import {
  checkInRewardAssetOptions,
  checkInStreakPublishStrategyOptions,
  cloneRewardItems,
  formatRewardSummary,
  getStreakConfigStatusMeta,
  getStreakPublishStrategyLabel,
} from '../model/shared';
import {
  buildStreakPublishPayload,
  createDefaultStreakFormState,
  mapStreakDetailToForm,
  validateStreakForm,
} from '../model/streak-config';

defineOptions({
  name: 'CheckInStreakPanel',
});

const loading = ref(false);
const saving = ref(false);
const historyLoading = ref(false);
const editorVisible = ref(false);
const rewardConfigVisible = ref(false);
const historyVisible = ref(false);
const historyRules = ref<CheckInStreakDetailResponse[]>([]);
const ruleList = ref<CheckInStreakDetailResponse[]>([]);
const currentHistoryTarget = ref<CheckInStreakDetailResponse | null>(null);
const terminatingMap = reactive<Record<number, boolean>>({});
const formState = reactive(createDefaultStreakFormState());

const editorTitle = computed(() =>
  formState.sourceVersion > 0
    ? `发布连续签到 ${formState.streakDays} 天的新版本`
    : '新增连续签到记录',
);

const publishButtonLabel = computed(() => {
  switch (formState.publishStrategy) {
    case 2: {
      return '发布次日生效版本';
    }
    case 3: {
      return '发布排期版本';
    }
    default: {
      return '发布立即生效版本';
    }
  }
});

async function loadRules() {
  loading.value = true;
  try {
    const page = await checkInStreakPageApi({
      pageIndex: 1,
      pageSize: 100,
    });
    ruleList.value = page.list || [];
  } finally {
    loading.value = false;
  }
}

function openCreateEditor() {
  Object.assign(formState, createDefaultStreakFormState());
  editorVisible.value = true;
}

function openEditEditor(rule: CheckInStreakDetailResponse) {
  Object.assign(formState, mapStreakDetailToForm(rule));
  editorVisible.value = true;
}

function openRewardConfigEditor() {
  rewardConfigVisible.value = true;
}

function handleRewardConfigConfirm(value: RewardConfigValue) {
  formState.rewardItems = cloneRewardItems(value.rewardItems);
}

async function handlePublish() {
  const error = validateStreakForm(formState);
  if (error) {
    useMessage.warning(error);
    return;
  }

  saving.value = true;
  try {
    await checkInStreakPublishApi(buildStreakPublishPayload(formState));
    useMessage.success('连续签到记录已发布');
    editorVisible.value = false;
    await loadRules();

    if (
      currentHistoryTarget.value &&
      currentHistoryTarget.value.streakDays === formState.streakDays
    ) {
      await openHistory(currentHistoryTarget.value);
    }
  } finally {
    saving.value = false;
  }
}

async function terminateRule(rule: CheckInStreakDetailResponse) {
  try {
    await ElMessageBox.confirm(
      `确认终止连续签到 ${rule.streakDays} 天的版本 V${rule.version} 吗？`,
      '终止记录版本',
      {
        confirmButtonText: '确认终止',
        draggable: true,
        type: 'warning',
      },
    );
  } catch {
    return;
  }

  terminatingMap[rule.id] = true;
  try {
    await checkInStreakTerminateApi({ id: rule.id });
    useMessage.success('连续签到记录版本已终止');
    await loadRules();

    if (currentHistoryTarget.value?.streakDays === rule.streakDays) {
      await openHistory(rule);
    }
  } finally {
    terminatingMap[rule.id] = false;
  }
}

async function openHistory(rule: CheckInStreakDetailResponse) {
  currentHistoryTarget.value = rule;
  historyVisible.value = true;
  historyLoading.value = true;
  try {
    const page = await checkInStreakHistoryPageApi({
      pageIndex: 1,
      pageSize: 100,
      streakDays: rule.streakDays,
    });
    historyRules.value = page.list || [];
  } finally {
    historyLoading.value = false;
  }
}

function formatEffectiveWindow(
  rule: Pick<CheckInStreakDetailResponse, 'effectiveFrom' | 'effectiveTo'>,
) {
  return rule.effectiveTo
    ? `${rule.effectiveFrom} 至 ${rule.effectiveTo}`
    : `${rule.effectiveFrom} 起长期有效`;
}

onMounted(async () => {
  await loadRules();
});
</script>

<template>
  <div v-loading="loading" class="space-y-5">
    <div class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div class="flex items-center justify-between gap-4">
        <div>
          <div class="text-base font-semibold text-slate-900">连续签到记录</div>
          <div class="mt-1 text-sm text-slate-500">
            每一条记录对应一个连续天数阈值。发布、终止、历史都只针对该条记录本身。
          </div>
        </div>
        <el-button type="primary" @click="openCreateEditor">
          新增连续天记录
        </el-button>
      </div>
    </div>

    <div
      v-if="ruleList.length === 0"
      class="rounded-lg border border-dashed border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-400 shadow-sm"
    >
      暂无连续签到记录
    </div>

    <div v-else class="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
      <div
        v-for="rule in ruleList"
        :key="rule.id"
        class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="text-base font-semibold text-slate-900">
              连续签到 {{ rule.streakDays }} 天
            </div>
            <div class="mt-1 text-xs text-slate-500">
              记录编码：{{ rule.ruleCode }}
            </div>
          </div>
          <el-tag
            :type="getStreakConfigStatusMeta(rule.status).color"
            effect="light"
            round
          >
            {{ getStreakConfigStatusMeta(rule.status).label }}
          </el-tag>
        </div>

        <div class="mt-4 space-y-3 text-sm text-slate-600">
          <div class="flex items-center justify-between gap-3">
            <span>当前版本</span>
            <span class="font-medium text-slate-900">V{{ rule.version }}</span>
          </div>
          <div class="flex items-center justify-between gap-3">
            <span>发布策略</span>
            <span class="font-medium text-slate-900">
              {{ getStreakPublishStrategyLabel(rule.publishStrategy) }}
            </span>
          </div>
          <div class="flex items-center justify-between gap-3">
            <span>生效时间</span>
            <span class="text-right font-medium text-slate-900">
              {{ formatEffectiveWindow(rule) }}
            </span>
          </div>
          <div class="flex items-center justify-between gap-3">
            <span>奖励</span>
            <span class="text-right font-medium text-slate-900">
              {{ formatRewardSummary(rule.rewardItems) }}
            </span>
          </div>
          <div class="flex items-center justify-between gap-3">
            <span>重复发放</span>
            <span class="font-medium text-slate-900">
              {{ rule.repeatable ? '允许' : '不允许' }}
            </span>
          </div>
        </div>

        <div class="mt-5 flex flex-wrap gap-2">
          <el-button type="primary" @click="openEditEditor(rule)">
            编辑并发新版
          </el-button>
          <el-button @click="openHistory(rule)">查看历史</el-button>
          <el-button
            v-if="rule.status === 1 || rule.status === 2"
            :loading="terminatingMap[rule.id]"
            type="danger"
            @click="terminateRule(rule)"
          >
            终止当前版本
          </el-button>
        </div>
      </div>
    </div>

    <el-drawer v-model="editorVisible" size="35%" :title="editorTitle">
      <div class="space-y-5">
        <div
          class="rounded-lg border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-600"
        >
          <div class="flex items-center justify-between gap-3">
            <span>基线版本</span>
            <span class="font-medium text-slate-900">
              {{
                formState.sourceVersion
                  ? `V${formState.sourceVersion}`
                  : '新记录'
              }}
            </span>
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <div class="mb-2 text-sm font-medium text-slate-700">连续天数</div>
            <el-input-number
              v-model="formState.streakDays"
              class="!w-full"
              :min="1"
              placeholder="连续天数"
            />
          </div>
          <div>
            <div class="mb-2 text-sm font-medium text-slate-700">重复发放</div>
            <el-radio-group v-model="formState.repeatable">
              <el-radio :value="false">不允许</el-radio>
              <el-radio :value="true">允许</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="rounded-lg border border-slate-200 bg-white p-4">
          <div class="flex items-start justify-between gap-3">
            <div>
              <div class="text-sm font-medium text-slate-500">连续奖励配置</div>
              <div class="mt-2 text-base font-semibold text-slate-900">
                {{ formatRewardSummary(formState.rewardItems) }}
              </div>
            </div>
            <el-button type="primary" @click="openRewardConfigEditor">
              编辑奖励配置
            </el-button>
          </div>
        </div>

        <div>
          <div class="mb-2 text-sm font-medium text-slate-700">发布策略</div>
          <el-radio-group v-model="formState.publishStrategy">
            <el-radio-button
              v-for="item in checkInStreakPublishStrategyOptions"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </el-radio-button>
          </el-radio-group>
        </div>

        <div v-if="formState.publishStrategy === 3">
          <div class="mb-2 text-sm font-medium text-slate-700">
            指定生效时间
          </div>
          <el-date-picker
            v-model="formState.effectiveFrom"
            class="!w-full"
            format="YYYY-MM-DD HH:mm"
            placeholder="选择生效时间"
            type="datetime"
            value-format="YYYY-MM-DDTHH:mm:ssZ"
          />
        </div>

        <div
          class="rounded-lg border border-slate-200 bg-slate-50/70 px-4 py-4 text-xs leading-6 text-slate-500"
        >
          这次发布只会生成当前连续天数的一条新版本，不会影响其他连续天记录。
        </div>

        <div class="flex justify-end gap-3">
          <el-button @click="editorVisible = false">取消</el-button>
          <el-button :loading="saving" type="primary" @click="handlePublish">
            {{ publishButtonLabel }}
          </el-button>
        </div>
      </div>
    </el-drawer>

    <RewardConfigModal
      v-model:visible="rewardConfigVisible"
      :asset-options="checkInRewardAssetOptions"
      confirm-text="应用奖励配置"
      :model-value="{ rewardItems: formState.rewardItems }"
      :show-overview-icon="false"
      title="编辑连续奖励"
      @confirm="handleRewardConfigConfirm"
    />

    <el-drawer
      v-model="historyVisible"
      size="40%"
      :title="
        currentHistoryTarget
          ? `连续签到 ${currentHistoryTarget.streakDays} 天的版本历史`
          : '版本历史'
      "
    >
      <div v-loading="historyLoading" class="space-y-4">
        <div
          v-if="historyRules.length === 0"
          class="rounded-lg border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-400"
        >
          暂无历史版本
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="rule in historyRules"
            :key="rule.id"
            class="rounded-lg border border-slate-200 bg-slate-50/70 p-4"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <div class="text-sm font-semibold text-slate-900">
                  V{{ rule.version }} · 连续签到 {{ rule.streakDays }} 天
                </div>
                <div class="mt-1 text-xs text-slate-500">
                  {{ formatEffectiveWindow(rule) }}
                </div>
              </div>
              <el-tag
                :type="getStreakConfigStatusMeta(rule.status).color"
                effect="light"
                round
              >
                {{ getStreakConfigStatusMeta(rule.status).label }}
              </el-tag>
            </div>

            <div class="mt-3 grid gap-2 text-sm text-slate-600">
              <div class="flex items-center justify-between gap-3">
                <span>发布策略</span>
                <span class="font-medium text-slate-900">
                  {{ getStreakPublishStrategyLabel(rule.publishStrategy) }}
                </span>
              </div>
              <div class="flex items-center justify-between gap-3">
                <span>奖励</span>
                <span class="font-medium text-slate-900">
                  {{ formatRewardSummary(rule.rewardItems) }}
                </span>
              </div>
              <div class="flex items-center justify-between gap-3">
                <span>重复发放</span>
                <span class="font-medium text-slate-900">
                  {{ rule.repeatable ? '允许' : '不允许' }}
                </span>
              </div>
            </div>

            <div class="mt-4 flex flex-wrap gap-2">
              <el-button type="primary" @click="openEditEditor(rule)">
                基于此版本再发布
              </el-button>
              <el-button
                v-if="rule.status === 1 || rule.status === 2"
                :loading="terminatingMap[rule.id]"
                type="danger"
                @click="terminateRule(rule)"
              >
                终止此版本
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
