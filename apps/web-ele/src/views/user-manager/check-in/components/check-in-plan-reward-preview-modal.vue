<script lang="ts" setup>
import type { CheckInPlanRow } from '../model/shared';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { checkInPlanDetailApi } from '#/api/core';
import { useMessage } from '#/hooks/useFeedback';
import { dayjs } from '#/utils';

import {
  buildMonthCalendar,
  buildWeekCalendar,
} from '../model/plan-modal';
import {
  clampRewardPreviewMonthCursor,
  clampRewardPreviewWeekCursor,
  createRewardPreviewState,
} from '../model/reward-preview';
import {
  checkInCycleTypeOptions,
  getOptionLabel,
} from '../model/shared';

defineOptions({
  name: 'CheckInPlanRewardPreviewModal',
});

type SharedData = {
  row?: CheckInPlanRow;
};

const sharedData = ref<SharedData>({});
const loading = ref(false);
const previewState = ref<null | ReturnType<typeof createRewardPreviewState>>(null);

const [Modal, modalApi] = useVbenModal({
  closeOnClickModal: false,
  showCancelButton: false,
  showConfirmButton: false,
  title: '计划周期奖励',
  async onOpenChange(isOpen) {
    if (!isOpen) {
      previewState.value = null;
      return;
    }

    sharedData.value = modalApi.getData<SharedData>() || {};
    modalApi.setState({
      title: sharedData.value.row?.planName
        ? `${sharedData.value.row.planName} · 周期奖励`
        : '计划周期奖励',
    });

    await initializeModal();
  },
});

const cycleTypeLabel = computed(() => {
  if (!previewState.value) {
    return '-';
  }
  return getOptionLabel(checkInCycleTypeOptions, previewState.value.cycleType);
});

const planWindowLabel = computed(() => {
  if (!previewState.value) {
    return '-';
  }
  return previewState.value.endDate
    ? `${previewState.value.startDate} 至 ${previewState.value.endDate}`
    : `${previewState.value.startDate} 起长期有效`;
});

const weekTitle = computed(() => {
  if (!previewState.value) {
    return '';
  }
  const start = dayjs(previewState.value.reward.weekCursor);
  const end = start.add(6, 'day');
  return `${start.format('YYYY-MM-DD')} 至 ${end.format('YYYY-MM-DD')}`;
});

const monthTitle = computed(() => {
  if (!previewState.value) {
    return '';
  }
  return dayjs(`${previewState.value.reward.monthCursor}-01`).format(
    'YYYY 年 M 月',
  );
});

const weekCalendarCells = computed(() => {
  if (!previewState.value) {
    return [];
  }
  return buildWeekCalendar({
    dateRules: previewState.value.reward.dateRules,
    patternRules: previewState.value.reward.patternRules,
    weekCursor: previewState.value.reward.weekCursor,
  });
});

const monthlyCalendarCells = computed(() => {
  if (!previewState.value) {
    return [];
  }
  return buildMonthCalendar({
    cycleType: previewState.value.cycleType,
    dateRules: previewState.value.reward.dateRules,
    endDate: previewState.value.endDate,
    mode: previewState.value.reward.monthlyRewardMode,
    monthCursor: previewState.value.reward.monthCursor,
    patternRules: previewState.value.reward.patternRules,
    startDate: previewState.value.startDate,
  });
});

const canGoPrevWeek = computed(() => {
  if (!previewState.value) {
    return false;
  }

  const prevCursor = dayjs(previewState.value.reward.weekCursor)
    .subtract(7, 'day')
    .format('YYYY-MM-DD');

  return (
    clampRewardPreviewWeekCursor({
      endDate: previewState.value.endDate,
      startDate: previewState.value.startDate,
      weekCursor: prevCursor,
    }) !== previewState.value.reward.weekCursor
  );
});

const canGoNextWeek = computed(() => {
  if (!previewState.value) {
    return false;
  }

  const nextCursor = dayjs(previewState.value.reward.weekCursor)
    .add(7, 'day')
    .format('YYYY-MM-DD');

  return (
    clampRewardPreviewWeekCursor({
      endDate: previewState.value.endDate,
      startDate: previewState.value.startDate,
      weekCursor: nextCursor,
    }) !== previewState.value.reward.weekCursor
  );
});

const canGoPrevMonth = computed(() => {
  if (!previewState.value) {
    return false;
  }

  const prevCursor = dayjs(`${previewState.value.reward.monthCursor}-01`)
    .subtract(1, 'month')
    .format('YYYY-MM');

  return (
    clampRewardPreviewMonthCursor({
      endDate: previewState.value.endDate,
      monthCursor: prevCursor,
      startDate: previewState.value.startDate,
    }) !== previewState.value.reward.monthCursor
  );
});

const canGoNextMonth = computed(() => {
  if (!previewState.value) {
    return false;
  }

  const nextCursor = dayjs(`${previewState.value.reward.monthCursor}-01`)
    .add(1, 'month')
    .format('YYYY-MM');

  return (
    clampRewardPreviewMonthCursor({
      endDate: previewState.value.endDate,
      monthCursor: nextCursor,
      startDate: previewState.value.startDate,
    }) !== previewState.value.reward.monthCursor
  );
});

async function initializeModal() {
  if (!sharedData.value.row?.id) {
    previewState.value = null;
    return;
  }

  loading.value = true;
  try {
    const detail = await checkInPlanDetailApi({
      id: sharedData.value.row.id,
    });
    previewState.value = createRewardPreviewState(detail);
  } catch (error: any) {
    previewState.value = null;
    useMessage.error(error?.message || '加载周期奖励失败，请稍后重试');
  } finally {
    loading.value = false;
  }
}

function goPrevWeek() {
  if (!previewState.value) {
    return;
  }

  previewState.value.reward.weekCursor = clampRewardPreviewWeekCursor({
    endDate: previewState.value.endDate,
    startDate: previewState.value.startDate,
    weekCursor: dayjs(previewState.value.reward.weekCursor)
      .subtract(7, 'day')
      .format('YYYY-MM-DD'),
  });
}

function goNextWeek() {
  if (!previewState.value) {
    return;
  }

  previewState.value.reward.weekCursor = clampRewardPreviewWeekCursor({
    endDate: previewState.value.endDate,
    startDate: previewState.value.startDate,
    weekCursor: dayjs(previewState.value.reward.weekCursor)
      .add(7, 'day')
      .format('YYYY-MM-DD'),
  });
}

function goPrevMonth() {
  if (!previewState.value) {
    return;
  }

  previewState.value.reward.monthCursor = clampRewardPreviewMonthCursor({
    endDate: previewState.value.endDate,
    monthCursor: dayjs(`${previewState.value.reward.monthCursor}-01`)
      .subtract(1, 'month')
      .format('YYYY-MM'),
    startDate: previewState.value.startDate,
  });
}

function goNextMonth() {
  if (!previewState.value) {
    return;
  }

  previewState.value.reward.monthCursor = clampRewardPreviewMonthCursor({
    endDate: previewState.value.endDate,
    monthCursor: dayjs(`${previewState.value.reward.monthCursor}-01`)
      .add(1, 'month')
      .format('YYYY-MM'),
    startDate: previewState.value.startDate,
  });
}
</script>

<template>
  <Modal class="!w-[1100px]">
    <div v-loading="loading" class="space-y-5">
      <template v-if="previewState">
        <div
          class="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 via-white to-sky-50/70 p-5"
        >
          <div
            class="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between"
          >
            <div>
              <div class="text-lg font-semibold text-slate-900">
                {{ previewState.planName }}
              </div>
              <div class="mt-3 flex flex-wrap items-center gap-2">
                <el-tag effect="light" round type="warning">
                  {{ cycleTypeLabel }}
                </el-tag>
                <el-tag effect="light" round type="info">
                  版本 {{ previewState.version }}
                </el-tag>
                <el-tag effect="plain" round type="success">
                  {{ planWindowLabel }}
                </el-tag>
              </div>
              <div class="mt-3 text-sm text-slate-500">
                未单独配置奖励的日期将沿用默认基础奖励。
              </div>
            </div>

            <div class="grid gap-3 md:grid-cols-2 xl:min-w-[420px]">
              <div class="rounded-xl border border-slate-200 bg-white/90 p-4">
                <div class="text-xs font-medium text-slate-500">
                  默认基础奖励
                </div>
                <div class="mt-2 text-sm font-semibold text-slate-900">
                  {{ previewState.baseRewardSummary }}
                </div>
              </div>
              <div class="rounded-xl border border-slate-200 bg-white/90 p-4">
                <div class="text-xs font-medium text-slate-500">
                  连续奖励规则
                </div>
                <div class="mt-2 text-sm font-semibold text-slate-900">
                  {{
                    previewState.streakRules.length > 0
                      ? `${previewState.streakRules.length} 条`
                      : '未配置'
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div class="mb-4">
            <div class="text-base font-semibold text-slate-900">
              计划周期奖励
            </div>
            <div class="mt-1 text-sm text-slate-500">
              {{
                previewState.cycleType === 'weekly'
                  ? '按周查看计划周期内每天实际命中的奖励。'
                  : '按月查看计划周期内每天实际命中的奖励。'
              }}
            </div>
          </div>

          <template v-if="previewState.cycleType === 'weekly'">
            <div
              class="mb-4 flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50/80 px-4 py-3"
            >
              <el-button :disabled="!canGoPrevWeek" @click="goPrevWeek">
                上一周
              </el-button>
              <div class="text-base font-semibold text-slate-900">
                {{ weekTitle }}
              </div>
              <el-button :disabled="!canGoNextWeek" @click="goNextWeek">
                下一周
              </el-button>
            </div>

            <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
              <div
                v-for="cell in weekCalendarCells"
                :key="cell.date"
                class="rounded-lg border border-slate-200 bg-slate-50/70 px-4 py-4"
              >
                <div class="text-sm font-semibold text-slate-900">
                  {{ cell.dayLabel }}
                </div>
                <div class="mt-2 text-xs leading-5 text-slate-500">
                  {{ cell.rewardSummary }}
                </div>
              </div>
            </div>
          </template>

          <template v-else>
            <div
              class="mb-4 flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50/80 px-4 py-3"
            >
              <el-button :disabled="!canGoPrevMonth" @click="goPrevMonth">
                上一月
              </el-button>
              <div class="text-base font-semibold text-slate-900">
                {{ monthTitle }}
              </div>
              <el-button :disabled="!canGoNextMonth" @click="goNextMonth">
                下一月
              </el-button>
            </div>

            <div class="grid grid-cols-7 gap-2">
              <div
                v-for="item in [
                  '周一',
                  '周二',
                  '周三',
                  '周四',
                  '周五',
                  '周六',
                  '周日',
                ]"
                :key="item"
                class="py-2 text-center text-xs font-semibold uppercase tracking-[0.12em] text-slate-400"
              >
                {{ item }}
              </div>
            </div>

            <div class="grid grid-cols-7 gap-2">
              <div
                v-for="cell in monthlyCalendarCells"
                :key="cell.date"
                class="min-h-[92px] rounded-lg border px-3 py-3"
                :class="
                  cell.isDisabled
                    ? 'border-slate-100 bg-slate-50 text-slate-300'
                    : 'border-slate-200 bg-white'
                "
              >
                <div class="flex items-start justify-between gap-2">
                  <span class="text-sm font-semibold">{{ cell.day }}</span>
                  <el-tag
                    v-if="cell.patternRuleKey === 'MONTH_LAST_DAY'"
                    effect="light"
                    size="small"
                    type="warning"
                  >
                    月末
                  </el-tag>
                </div>
                <div class="mt-3 text-xs leading-5">
                  {{ cell.rewardSummary }}
                </div>
              </div>
            </div>
          </template>
        </div>

        <div class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div class="mb-4">
            <div class="text-base font-semibold text-slate-900">连续奖励</div>
            <div class="mt-1 text-sm text-slate-500">
              按连续签到天数发放的额外奖励规则。
            </div>
          </div>

          <div
            v-if="previewState.streakRules.length > 0"
            class="grid gap-3 md:grid-cols-2 xl:grid-cols-3"
          >
            <div
              v-for="rule in previewState.streakRules"
              :key="rule.ruleCode"
              class="rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
            >
              <div class="flex items-center justify-between gap-3">
                <div class="text-sm font-semibold text-slate-900">
                  连续签到 {{ rule.streakDays }} 天
                </div>
                <el-tag
                  :type="rule.status === 1 ? 'success' : 'info'"
                  effect="light"
                  round
                  size="small"
                >
                  {{ rule.status === 1 ? '启用' : '停用' }}
                </el-tag>
              </div>
              <div class="mt-3 text-sm font-medium text-slate-700">
                {{ rule.rewardSummary }}
              </div>
              <div class="mt-2 text-xs leading-5 text-slate-500">
                {{
                  rule.repeatable
                    ? '命中阈值时可重复发放'
                    : '同周期内命中后不重复发放'
                }}
              </div>
            </div>
          </div>
          <el-empty v-else description="暂未配置连续奖励" :image-size="72" />
        </div>
      </template>
    </div>
  </Modal>
</template>
