<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AdminCheckInSignedUserPageItemDto,
  CheckInCalendarDetailResponse,
  CheckInCalendarUserDetailResponse,
} from '#/api/types';

import { computed, nextTick, ref } from 'vue';

import { useVbenModal, VbenButton } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  checkInCalendarDetailApi,
  checkInCalendarSignedUserPageApi,
  checkInCalendarUserDetailApi,
} from '#/api/core';
import { useMessage } from '#/hooks/useFeedback';

import {
  buildCalendarDetailRequest,
  buildCalendarUserDetailRequest,
  buildDefaultSignedUserQueryDate,
  buildSignedUserGridPageRequest,
  parsePositiveIntegerUserId,
  resolveCalendarDay,
} from '../model/calendar-runtime';
import {
  formatRewardSummary,
  getRewardResultMeta,
  getRewardSourceLabel,
  getRewardStatusMeta,
} from '../model/shared';

defineOptions({
  name: 'CheckInSignedUserQueryDialog',
});

const calendarDetail = ref<CheckInCalendarDetailResponse>();
const userCalendarDetail = ref<CheckInCalendarUserDetailResponse>();
const selectedDate = ref(buildDefaultSignedUserQueryDate());
const calendarLoading = ref(false);
const userDetailLoading = ref(false);
let calendarQuerySequence = 0;

const selectedDay = computed(() =>
  resolveCalendarDay(calendarDetail.value?.days || [], selectedDate.value),
);

const signedUserGridOptions: VxeGridProps<AdminCheckInSignedUserPageItemDto> = {
  columns: [
    {
      minWidth: 120,
      slots: { default: 'record' },
      title: '记录',
    },
    {
      minWidth: 160,
      slots: { default: 'user' },
      title: '用户',
    },
    {
      minWidth: 220,
      slots: { default: 'baseReward' },
      title: '基础奖励',
    },
    {
      minWidth: 160,
      slots: { default: 'settlement' },
      title: '补偿状态',
    },
    {
      minWidth: 240,
      slots: { default: 'streakReward' },
      title: '连续奖励',
    },
    {
      field: 'createdAt',
      minWidth: 170,
      title: '时间',
    },
    {
      fixed: 'right',
      slots: { default: 'actions' },
      title: '操作',
      width: 140,
    },
  ],
  height: '100%',
  pagerConfig: {
    pageSize: 15,
    pageSizes: [15, 30, 50, 100],
  },
  proxyConfig: {
    autoLoad: false,
    ajax: {
      query: async ({ page }) => {
        resetUserDetail();

        if (!selectedDate.value) {
          return {
            list: [],
            pageIndex: page.currentPage,
            pageSize: page.pageSize,
            total: 0,
          };
        }

        return await checkInCalendarSignedUserPageApi(
          buildSignedUserGridPageRequest(selectedDate.value, page),
        );
      },
    },
    sort: true,
  },
  toolbarConfig: {
    custom: false,
    export: false,
    refresh: false,
    zoom: false,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: signedUserGridOptions,
});

const [Modal, modalApi] = useVbenModal({
  footer: false,
  onOpenChange(isOpen) {
    if (!isOpen) {
      return;
    }

    const data = modalApi.getData<{ targetDate?: string }>();
    void openQueryDialog(data.targetDate);
  },
});

function resetUserDetail() {
  userCalendarDetail.value = undefined;
}

async function openQueryDialog(targetDate?: string) {
  selectedDate.value = targetDate || buildDefaultSignedUserQueryDate();
  calendarDetail.value = undefined;
  resetUserDetail();
  await nextTick();
  await refreshQueryData();
}

async function handleDateChange() {
  calendarDetail.value = undefined;
  resetUserDetail();
  await refreshQueryData();
}

async function refreshQueryData() {
  if (!selectedDate.value) {
    return;
  }

  await Promise.all([loadCalendarDetail(), gridApi.reload()]);
}

async function refreshSignedUsers() {
  if (!selectedDate.value) {
    return;
  }

  await gridApi.reload();
}

async function loadCalendarDetail() {
  if (!selectedDate.value) {
    return;
  }

  const currentCalendarSequence = ++calendarQuerySequence;
  const targetDate = selectedDate.value;
  calendarLoading.value = true;
  try {
    const detail = await checkInCalendarDetailApi(
      buildCalendarDetailRequest(targetDate),
    );

    if (
      currentCalendarSequence === calendarQuerySequence &&
      selectedDate.value === targetDate
    ) {
      calendarDetail.value = detail;
    }
  } finally {
    if (currentCalendarSequence === calendarQuerySequence) {
      calendarLoading.value = false;
    }
  }
}

async function loadUserCalendar(userId: number) {
  if (!selectedDate.value) {
    return;
  }

  userDetailLoading.value = true;
  try {
    userCalendarDetail.value = await checkInCalendarUserDetailApi(
      buildCalendarUserDetailRequest(selectedDate.value, userId),
    );
  } finally {
    userDetailLoading.value = false;
  }
}

async function viewUserCalendar(row: AdminCheckInSignedUserPageItemDto) {
  const userId = parsePositiveIntegerUserId(row.user?.id);
  if (!userId) {
    useMessage.warning('用户信息缺失，无法查询用户周期');
    return;
  }

  await loadUserCalendar(userId);
}

function formatPeriodType(periodType?: number) {
  if (periodType === 1) return '自然周';
  if (periodType === 2) return '自然月';
  return '未知周期';
}

function formatRecordType(recordType?: number) {
  if (recordType === 1) return '正常签到';
  if (recordType === 2) return '补签';
  return '未知类型';
}

function formatGrantSummary(row: AdminCheckInSignedUserPageItemDto) {
  if (!row.grants?.length) {
    return '未触发连续奖励';
  }

  return row.grants
    .map(
      (grant) =>
        `${grant.streakDays}天：${formatRewardSummary(grant.rewardItems)}`,
    )
    .join('；');
}
</script>

<template>
  <Modal>
    <div class="check-in-theme flex h-full min-h-0 flex-col gap-3">
      <div
        class="shrink-0 rounded-lg border border-slate-200 bg-white px-5 py-4"
      >
        <div class="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
          <div
            class="flex flex-col justify-center gap-3 lg:border-r lg:border-slate-200 lg:pr-5"
          >
            <div>
              <div class="text-sm font-semibold text-slate-900">查询日期</div>
              <div class="mt-1 text-xs text-slate-500">
                选择某一天后同步刷新概览与已签列表
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <el-date-picker
                v-model="selectedDate"
                class="!w-[190px]"
                type="date"
                value-format="YYYY-MM-DD"
                @change="handleDateChange"
              />
              <VbenButton
                :disabled="!selectedDate"
                :loading="calendarLoading"
                size="sm"
                @click="refreshQueryData"
              >
                刷新
              </VbenButton>
            </div>
          </div>

          <div class="min-w-0">
            <div class="mb-3 flex flex-wrap items-start justify-between gap-3">
              <div>
                <div class="flex items-center gap-2">
                  <div class="text-lg font-semibold text-slate-900">
                    单日概览
                  </div>
                  <el-tag
                    v-if="selectedDay?.isToday"
                    effect="light"
                    round
                    size="small"
                  >
                    今天
                  </el-tag>
                </div>
                <div class="mt-1 text-xs text-slate-500">
                  {{ selectedDate || '请选择日期' }}
                  <template v-if="calendarDetail">
                    · {{ formatPeriodType(calendarDetail.periodType) }} ·
                    {{ calendarDetail.periodKey }}
                  </template>
                </div>
              </div>
              <el-tag v-if="!selectedDay" effect="plain" round type="info">
                当前日期暂无概览数据
              </el-tag>
            </div>

            <template v-if="selectedDay">
              <div class="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
                <div
                  class="rounded-md border border-emerald-100 bg-emerald-50/70 px-3 py-2"
                >
                  <div class="text-xs text-emerald-600">已签</div>
                  <div class="mt-1 text-xl font-semibold text-emerald-600">
                    {{ selectedDay.signedCount }}
                  </div>
                </div>
                <div
                  class="rounded-md border border-blue-100 bg-blue-50/70 px-3 py-2"
                >
                  <div class="text-xs text-blue-600">正常签到</div>
                  <div class="mt-1 text-xl font-semibold text-blue-600">
                    {{ selectedDay.normalSignCount }}
                  </div>
                </div>
                <div
                  class="rounded-md border border-amber-100 bg-amber-50/70 px-3 py-2"
                >
                  <div class="text-xs text-amber-600">补签</div>
                  <div class="mt-1 text-xl font-semibold text-amber-600">
                    {{ selectedDay.makeupSignCount }}
                  </div>
                </div>
                <div
                  class="rounded-md border border-slate-200 bg-slate-50 px-3 py-2"
                >
                  <div class="text-xs text-slate-500">连续奖励</div>
                  <div class="mt-1 text-xl font-semibold text-slate-700">
                    {{ selectedDay.streakRewardTriggerCount }}
                  </div>
                </div>
              </div>

              <div class="mt-3 flex flex-wrap gap-x-8 gap-y-1">
                <div class="text-xs text-slate-500">
                  配置奖励：{{
                    formatRewardSummary(
                      selectedDay.baseRewardConfigProjectionOverview,
                    )
                  }}
                </div>
                <div class="text-xs text-slate-500">
                  实际奖励：{{
                    formatRewardSummary(selectedDay.baseRewardActualOverview)
                  }}
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div
        class="check-in-signed-user-table-pane min-h-0 flex-1 rounded-lg border border-slate-200 px-4 py-3"
      >
        <div
          class="mb-3 flex shrink-0 flex-wrap items-center justify-between gap-3"
        >
          <div>
            <div class="text-base font-semibold text-slate-900">已签用户</div>
            <div class="mt-1 text-xs text-slate-500">
              {{ selectedDate || '请选择日期' }}
            </div>
          </div>
          <VbenButton
            :disabled="!selectedDate"
            size="sm"
            variant="outline"
            @click="refreshSignedUsers"
          >
            刷新列表
          </VbenButton>
        </div>

        <Grid class="es-full-height-grid min-h-0">
          <template #record="{ row }">
            <div class="text-sm font-medium text-slate-900">#{{ row.id }}</div>
            <div class="text-xs text-slate-500">
              {{ formatRecordType(row.recordType) }}
            </div>
          </template>

          <template #user="{ row }">
            <div class="text-sm font-medium text-slate-900">
              {{ row.user?.nickname || '未知用户' }}
            </div>
            <div class="text-xs text-slate-500">
              ID：{{ row.user?.id ?? '-' }}
            </div>
          </template>

          <template #baseReward="{ row }">
            <div class="flex flex-wrap items-center gap-2">
              <el-tag effect="light" round type="primary">
                {{ formatRewardSummary(row.resolvedRewardItems) }}
              </el-tag>
              <el-tag
                v-if="row.resolvedRewardSourceType"
                effect="plain"
                round
                type="info"
              >
                {{ getRewardSourceLabel(row.resolvedRewardSourceType) }}
              </el-tag>
            </div>
          </template>

          <template #settlement="{ row }">
            <div class="flex flex-wrap gap-2">
              <el-tag
                v-if="row.rewardSettlement"
                :type="
                  getRewardStatusMeta(row.rewardSettlement.settlementStatus)
                    .color
                "
                effect="light"
                round
              >
                {{
                  getRewardStatusMeta(row.rewardSettlement.settlementStatus)
                    .label
                }}
              </el-tag>
              <el-tag
                v-if="row.rewardSettlement?.settlementResultType"
                :type="
                  getRewardResultMeta(row.rewardSettlement.settlementResultType)
                    .color
                "
                effect="plain"
                round
              >
                {{
                  getRewardResultMeta(row.rewardSettlement.settlementResultType)
                    .label
                }}
              </el-tag>
              <el-tag
                v-if="!row.rewardSettlement"
                effect="light"
                round
                type="info"
              >
                无补偿
              </el-tag>
            </div>
          </template>

          <template #streakReward="{ row }">
            <span class="text-sm text-slate-600">
              {{ formatGrantSummary(row) }}
            </span>
          </template>

          <template #actions="{ row }">
            <el-tooltip
              :disabled="!!parsePositiveIntegerUserId(row.user?.id)"
              content="用户信息缺失，无法查询用户周期"
              placement="top"
            >
              <span>
                <VbenButton
                  :disabled="!parsePositiveIntegerUserId(row.user?.id)"
                  :loading="userDetailLoading"
                  class="h-auto px-0"
                  variant="link"
                  @click="viewUserCalendar(row)"
                >
                  查看用户周期
                </VbenButton>
              </span>
            </el-tooltip>
          </template>
        </Grid>
      </div>

      <div
        v-if="userCalendarDetail"
        class="max-h-[180px] shrink-0 overflow-auto rounded-lg border border-slate-200 px-4 py-3"
      >
        <div class="mb-3">
          <div class="text-base font-semibold text-slate-900">用户周期详情</div>
          <div class="mt-1 text-xs text-slate-500">
            {{ userCalendarDetail.periodStartDate }} 至
            {{ userCalendarDetail.periodEndDate }} ·
            {{ formatPeriodType(userCalendarDetail.periodType) }}
          </div>
        </div>
        <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div
            v-for="day in userCalendarDetail.days"
            :key="day.signDate"
            class="rounded-lg border border-slate-200 px-4 py-3"
          >
            <div class="flex items-center justify-between gap-2">
              <div class="text-sm font-semibold text-slate-900">
                第 {{ day.dayIndex }} 天
              </div>
              <el-tag
                :type="day.isSigned ? 'success' : 'info'"
                effect="light"
                round
                size="small"
              >
                {{ day.isSigned ? '已签' : '未签' }}
              </el-tag>
            </div>
            <div class="mt-1 text-xs text-slate-500">{{ day.signDate }}</div>
            <div class="mt-2 text-xs text-slate-500">
              基础奖励：{{ formatRewardSummary(day.rewardItems) }}
            </div>
            <div class="mt-1 text-xs text-slate-500">
              连续奖励数：{{ day.grantCount }}
            </div>
            <div v-if="day.rewardSettlement" class="mt-2">
              <el-tag
                :type="
                  getRewardStatusMeta(day.rewardSettlement.settlementStatus)
                    .color
                "
                effect="light"
                round
                size="small"
              >
                {{
                  getRewardStatusMeta(day.rewardSettlement.settlementStatus)
                    .label
                }}
              </el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<style>
.check-in-signed-user-table-pane {
  display: flex;
  flex-direction: column;
}
</style>
