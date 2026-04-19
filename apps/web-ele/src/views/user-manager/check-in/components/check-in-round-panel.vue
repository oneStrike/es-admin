<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  CheckInStreakRoundHistoryDetailResponse,
  CheckInStreakRoundHistoryPageItemDto,
} from '#/api/types';

import { computed, onMounted, reactive, ref } from 'vue';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  checkInStreakRoundDetailApi,
  checkInStreakRoundHistoryDetailApi,
  checkInStreakRoundHistoryPageApi,
  checkInStreakRoundUpdateApi,
} from '#/api/core';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils';

import { formatRewardSummary, getRoundStatusMeta } from '../model/shared';
import {
  buildRoundUpdatePayload,
  createDefaultRoundFormState,
  createDefaultRoundRule,
  mapRoundDetailToForm,
  validateRoundForm,
} from '../model/streak-round';

defineOptions({
  name: 'CheckInRoundPanel',
});

const loading = ref(false);
const saving = ref(false);
const historyDetailLoading = ref(false);
const historyDetailVisible = ref(false);
const historyDetail = ref<CheckInStreakRoundHistoryDetailResponse | null>(null);
const formState = reactive(createDefaultRoundFormState());

const statusMeta = computed(() => getRoundStatusMeta(formState.status));

const historyGridOptions: VxeGridProps<CheckInStreakRoundHistoryPageItemDto> = {
  columns: [
    {
      field: 'version',
      minWidth: 100,
      title: '版本',
    },
    {
      field: 'roundCode',
      minWidth: 140,
      title: '轮次编码',
    },
    {
      field: 'status',
      minWidth: 120,
      slots: { default: 'status' },
      title: '状态',
    },
    {
      field: 'predecessorRoundCode',
      minWidth: 140,
      title: '前驱轮次',
    },
    {
      field: 'successorRoundCode',
      minWidth: 140,
      title: '后继轮次',
    },
    {
      field: 'updatedAt',
      minWidth: 180,
      title: '更新时间',
    },
    {
      field: 'actions',
      slots: { default: 'actions' },
      title: '操作',
      width: 120,
    },
  ],
  height: 'auto',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await checkInStreakRoundHistoryPageApi(
          formatQuery({
            page,
            formValues,
            sorts,
          }),
        );
      },
    },
    sort: true,
  },
};

const [HistoryGrid, historyGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions([], {
    showCollapseButton: false,
  }),
  gridOptions: historyGridOptions,
});

async function loadRoundDetail() {
  loading.value = true;
  try {
    const detail = await checkInStreakRoundDetailApi();
    Object.assign(formState, mapRoundDetailToForm(detail));
  } finally {
    loading.value = false;
  }
}

async function openHistoryDetail(row: CheckInStreakRoundHistoryPageItemDto) {
  historyDetailLoading.value = true;
  historyDetailVisible.value = true;
  try {
    historyDetail.value = await checkInStreakRoundHistoryDetailApi({
      id: row.id,
    });
  } finally {
    historyDetailLoading.value = false;
  }
}

async function handleSave() {
  const error = validateRoundForm(formState);
  if (error) {
    useMessage.warning(error);
    return;
  }

  saving.value = true;
  try {
    await checkInStreakRoundUpdateApi(buildRoundUpdatePayload(formState));
    useMessage.success('当前连续奖励轮次已更新');
    await Promise.all([loadRoundDetail(), historyGridApi.reload()]);
  } finally {
    saving.value = false;
  }
}

function addRule() {
  formState.rewardRules.push(createDefaultRoundRule());
}

function removeRule(localId: string) {
  formState.rewardRules = formState.rewardRules.filter(
    (rule) => rule.localId !== localId,
  );
}

onMounted(async () => {
  await Promise.all([loadRoundDetail(), historyGridApi.reload()]);
});
</script>

<template>
  <div class="space-y-5">
    <div class="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
      <div
        v-loading="loading"
        class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div class="mb-4 flex items-start justify-between gap-4">
          <div>
            <div class="text-base font-semibold text-slate-900">
              当前连续奖励轮次
            </div>
          </div>
          <el-tag :type="statusMeta.color" effect="light" round>
            {{ statusMeta.label }}
          </el-tag>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <div class="mb-2 text-sm font-medium text-slate-700">轮次编码</div>
            <el-input v-model="formState.roundCode" placeholder="轮次编码" />
          </div>
          <div>
            <div class="mb-2 text-sm font-medium text-slate-700">当前版本</div>
            <el-input
              :model-value="String(formState.version || '-')"
              readonly
            />
          </div>
        </div>

        <div class="mt-5">
          <div class="mb-4 flex items-center justify-between gap-3">
            <div>
              <div class="text-base font-semibold text-slate-900">
                连续奖励规则
              </div>
            </div>
            <el-button type="primary" @click="addRule">新增连续奖励</el-button>
          </div>

          <div
            v-if="formState.rewardRules.length === 0"
            class="rounded-lg border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-400"
          >
            暂未配置连续奖励规则
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="rule in formState.rewardRules"
              :key="rule.localId"
              class="rounded-lg border border-slate-200 bg-slate-50/70 p-4"
            >
              <div class="mb-4 flex items-center justify-between gap-3">
                <div class="text-sm font-semibold text-slate-900">
                  {{
                    rule.streakDays
                      ? `连续签到 ${rule.streakDays} 天`
                      : '未填写连续天数'
                  }}
                </div>
                <el-button type="danger" @click="removeRule(rule.localId)">
                  删除
                </el-button>
              </div>

              <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                <el-input-number
                  v-model="rule.streakDays"
                  class="!w-full"
                  :min="1"
                  placeholder="连续天数"
                />
                <el-input-number
                  v-model="rule.points"
                  class="!w-full"
                  :min="0"
                  placeholder="奖励积分"
                />
                <el-input-number
                  v-model="rule.experience"
                  class="!w-full"
                  :min="0"
                  placeholder="奖励经验"
                />
                <el-input v-model="rule.ruleCode" placeholder="规则编码" />
                <el-select v-model="rule.status" class="!w-full">
                  <el-option label="启用" :value="1" />
                  <el-option label="停用" :value="0" />
                </el-select>
                <el-radio-group v-model="rule.repeatable">
                  <el-radio :value="false">仅领取一次</el-radio>
                  <el-radio :value="true">可重复领取</el-radio>
                </el-radio-group>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-5 flex justify-end">
          <el-button :loading="saving" type="primary" @click="handleSave">
            保存当前轮次
          </el-button>
        </div>
      </div>

      <div class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div class="text-base font-semibold text-slate-900">当前状态摘要</div>
        <div class="mt-4 space-y-3 text-sm text-slate-600">
          <div
            class="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-4 py-3"
          >
            <span>轮次编码</span>
            <span class="font-medium text-slate-900">{{
              formState.roundCode || '-'
            }}</span>
          </div>
          <div
            class="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-4 py-3"
          >
            <span>当前版本</span>
            <span class="font-medium text-slate-900">{{
              formState.version || '-'
            }}</span>
          </div>
          <div
            class="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-4 py-3"
          >
            <span>轮次状态</span>
            <el-tag :type="statusMeta.color" effect="light" round>
              {{ statusMeta.label }}
            </el-tag>
          </div>
          <div
            class="rounded-lg border border-slate-200 bg-slate-50/70 px-4 py-4 text-xs leading-6 text-slate-500"
          >
            当前后台只允许维护一个可编辑的连续奖励轮次。历史归档轮次会在下方以只读方式展示。
          </div>
        </div>
      </div>
    </div>

    <div class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div class="mb-4 flex items-center justify-between gap-3">
        <div>
          <div class="text-base font-semibold text-slate-900">历史轮次</div>
        </div>
      </div>

      <HistoryGrid>
        <template #status="{ row }">
          <el-tag
            :type="getRoundStatusMeta(row.status).color"
            effect="light"
            round
          >
            {{ getRoundStatusMeta(row.status).label }}
          </el-tag>
        </template>

        <template #actions="{ row }">
          <el-button link type="primary" @click="openHistoryDetail(row)">
            查看详情
          </el-button>
        </template>
      </HistoryGrid>
    </div>

    <el-drawer v-model="historyDetailVisible" size="40%" title="轮次历史详情">
      <div v-loading="historyDetailLoading" class="space-y-4">
        <template v-if="historyDetail">
          <div class="grid gap-3 md:grid-cols-2">
            <div
              class="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600"
            >
              <div class="text-xs text-slate-400">轮次编码</div>
              <div class="mt-1 font-medium text-slate-900">
                {{ historyDetail.roundCode }}
              </div>
            </div>
            <div
              class="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600"
            >
              <div class="text-xs text-slate-400">版本</div>
              <div class="mt-1 font-medium text-slate-900">
                {{ historyDetail.version }}
              </div>
            </div>
            <div
              class="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600"
            >
              <div class="text-xs text-slate-400">前驱轮次</div>
              <div class="mt-1 font-medium text-slate-900">
                {{ historyDetail.predecessorRoundCode || '-' }}
              </div>
            </div>
            <div
              class="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600"
            >
              <div class="text-xs text-slate-400">后继轮次</div>
              <div class="mt-1 font-medium text-slate-900">
                {{ historyDetail.successorRoundCode || '-' }}
              </div>
            </div>
          </div>

          <div class="rounded-lg border border-slate-200 bg-white p-4">
            <div class="mb-3 text-sm font-semibold text-slate-900">
              奖励规则快照
            </div>
            <div
              v-if="historyDetail.rewardRules.length === 0"
              class="text-sm text-slate-400"
            >
              暂无奖励规则
            </div>
            <div v-else class="space-y-3">
              <div
                v-for="rule in historyDetail.rewardRules"
                :key="rule.ruleCode"
                class="rounded-lg border border-slate-200 bg-slate-50/70 p-4"
              >
                <div class="flex items-center justify-between gap-3">
                  <div class="text-sm font-semibold text-slate-900">
                    连续签到 {{ rule.streakDays }} 天
                  </div>
                  <el-tag
                    :type="rule.status === 1 ? 'success' : 'info'"
                    effect="light"
                    round
                  >
                    {{ rule.status === 1 ? '启用' : '停用' }}
                  </el-tag>
                </div>
                <div class="mt-2 text-sm text-slate-600">
                  {{ formatRewardSummary(rule.rewardItems) }}
                </div>
                <div class="mt-2 text-xs text-slate-500">
                  {{ rule.repeatable ? '可重复领取' : '仅领取一次' }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </el-drawer>
  </div>
</template>
