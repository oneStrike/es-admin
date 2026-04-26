<script lang="ts" setup>
import type {
  CheckInConfigEditorKind,
  CheckInConfigFormState,
  CheckInConfigPreviewDay,
} from '../model/config';

import type { CheckInRewardItemDto } from '#/api/types';
import type { RewardConfigValue } from '../../shared/reward-config/reward-config.types';

import { computed, onMounted, reactive, ref, watch } from 'vue';

import {
  checkInConfigDetailApi,
  checkInConfigUpdateApi,
  checkInConfigUpdateEnabledApi,
} from '#/api/core';
import EsUpload from '#/components/es-upload/es-upload.vue';
import { UploadSceneEnum } from '#/enum/api';
import { useMessage } from '#/hooks/useFeedback';
import { dayjs } from '#/utils';
import RewardConfigModal from '../../shared/reward-config/reward-config-modal.vue';

import {
  applyMakeupPeriodTypeChange,
  buildConfigPreviewDays,
  buildConfigUpdatePayload,
  buildDateRuleSummaryGroups,
  buildMonthlyScopeOptions,
  buildWeeklyScopeOptions,
  createDefaultConfigFormState,
  getDateRuleByDate,
  getMonthLastDayRule,
  getPatternRuleByMonthDay,
  getPatternRuleByWeekday,
  isEditableRewardDate,
  mapConfigDetailToForm,
  removeDateRule,
  removePatternRule,
  upsertDateRule,
  upsertPatternRule,
  validateConfigForm,
} from '../model/config';
import {
  checkInMakeupPeriodTypeOptions,
  checkInRewardAssetOptions,
  cloneRewardItems,
  formatRewardSummary,
  weeklyCalendarLabels,
} from '../model/shared';

defineOptions({
  name: 'CheckInConfigPanel',
});

type RewardEditorState = {
  rewardItems: CheckInRewardItemDto[];
  rewardOverviewIconUrl?: string;
  scope: CheckInConfigEditorKind;
  scopeOptions: Array<{ label: string; value: CheckInConfigEditorKind }>;
  targetDate?: string;
  targetMonthDay?: number;
  targetWeekday?: number;
  title: string;
};

const loading = ref(false);
const saving = ref(false);
const toggleLoading = ref(false);
const isEnabled = ref(false);
const formState = reactive<CheckInConfigFormState>(
  createDefaultConfigFormState(),
);
const weekCursor = ref(
  dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD'),
);
const monthCursor = ref(dayjs().format('YYYY-MM'));
const rewardDrawerVisible = ref(false);
const rewardEditor = reactive<RewardEditorState>({
  rewardItems: [],
  rewardOverviewIconUrl: undefined,
  scope: 'date',
  scopeOptions: [],
  targetDate: undefined,
  targetMonthDay: undefined,
  targetWeekday: undefined,
  title: '',
});

const previewDays = computed(() =>
  buildConfigPreviewDays({
    cursor:
      formState.makeupPeriodType === 1 ? weekCursor.value : monthCursor.value,
    state: formState,
  }),
);

const weekTitle = computed(() => {
  const start = dayjs(weekCursor.value);
  const end = start.add(6, 'day');
  return `${start.format('YYYY-MM-DD')} 至 ${end.format('YYYY-MM-DD')}`;
});

const monthTitle = computed(() =>
  dayjs(`${monthCursor.value}-01`).format('YYYY 年 M 月'),
);

const expandedDateRuleMonths = ref<string[]>([]);

const dateRuleSummaryGroups = computed(() =>
  buildDateRuleSummaryGroups(formState.dateRules).map((group) => ({
    key: group.key,
    label: group.label,
    rules: group.rules.map((rule) => ({
      editable: isEditableRewardDate(rule.rewardDate),
      key: rule.localId,
      label: dayjs(rule.rewardDate).format('M 月 D 日'),
      rewardDate: rule.rewardDate,
      rewardOverviewIconUrl: rule.rewardOverviewIconUrl,
      rewardSummary: formatRewardSummary(rule.rewardItems),
    })),
  })),
);

const patternRuleSummaries = computed(() =>
  formState.patternRules.map((rule) => ({
    key: rule.localId,
    label: formatPatternRuleLabel(rule),
    rewardOverviewIconUrl: rule.rewardOverviewIconUrl,
    rewardSummary: formatRewardSummary(rule.rewardItems),
  })),
);

watch(
  dateRuleSummaryGroups,
  (groups) => {
    const availableKeys = new Set(groups.map((group) => group.key));
    const preservedKeys = expandedDateRuleMonths.value.filter((key) =>
      availableKeys.has(key),
    );

    if (groups.length === 0) {
      expandedDateRuleMonths.value = [];
      return;
    }

    if (preservedKeys.length > 0) {
      expandedDateRuleMonths.value = preservedKeys;
      return;
    }

    const fallbackGroup = groups[0];
    if (!fallbackGroup) {
      expandedDateRuleMonths.value = [];
      return;
    }

    const currentMonthKey = dayjs().format('YYYY-MM');
    expandedDateRuleMonths.value = [
      groups.find((group) => group.key === currentMonthKey)?.key ||
        fallbackGroup.key,
    ];
  },
  { immediate: true },
);

async function loadConfig() {
  loading.value = true;
  try {
    const detail = await checkInConfigDetailApi();
    isEnabled.value = detail.isEnabled;
    Object.assign(formState, mapConfigDetailToForm(detail));
  } finally {
    loading.value = false;
  }
}

async function handleToggleEnabled(nextValue: boolean | number | string) {
  const nextEnabled = !!nextValue;
  const previousEnabled = isEnabled.value;
  isEnabled.value = nextEnabled;
  toggleLoading.value = true;
  try {
    await checkInConfigUpdateEnabledApi({ isEnabled: nextEnabled });
    useMessage.success(nextEnabled ? '签到功能已开启' : '签到功能已关闭');
  } catch (error) {
    isEnabled.value = previousEnabled;
    throw error;
  } finally {
    toggleLoading.value = false;
  }
}

async function handleSave() {
  const error = validateConfigForm(formState);
  if (error) {
    useMessage.warning(error);
    return;
  }

  saving.value = true;
  try {
    await checkInConfigUpdateApi(
      buildConfigUpdatePayload(isEnabled.value, formState),
    );
    useMessage.success('签到基础配置已保存');
    await loadConfig();
  } finally {
    saving.value = false;
  }
}

function handleMakeupPeriodTypeChange(nextType: 1 | 2) {
  const changed = applyMakeupPeriodTypeChange(formState, nextType);
  if (!changed) {
    return;
  }

  weekCursor.value = dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD');
  monthCursor.value = dayjs().format('YYYY-MM');

  if (
    rewardDrawerVisible.value &&
    ['monthDay', 'monthLastDay', 'weekday'].includes(rewardEditor.scope)
  ) {
    rewardDrawerVisible.value = false;
  }

  useMessage.success('签到周期已切换，周期模式奖励已重置');
}

function openBaseRewardEditor() {
  rewardEditor.title = '编辑默认基础奖励';
  rewardEditor.scope = 'base';
  rewardEditor.scopeOptions = [{ label: '默认基础奖励', value: 'base' }];
  rewardEditor.targetDate = undefined;
  rewardEditor.targetMonthDay = undefined;
  rewardEditor.targetWeekday = undefined;
  rewardEditor.rewardItems = cloneRewardItems(formState.baseRewardItems);
  rewardEditor.rewardOverviewIconUrl = formState.rewardOverviewIconUrl;
  rewardDrawerVisible.value = true;
}

function openPreviewEditor(cell: CheckInConfigPreviewDay) {
  if (!cell.isEditable) {
    useMessage.warning('历史日期奖励仅可查看，不可修改');
    return;
  }

  rewardEditor.targetDate = cell.date;
  rewardEditor.targetWeekday = cell.weekday;
  rewardEditor.targetMonthDay = cell.monthDay;
  rewardEditor.scopeOptions =
    formState.makeupPeriodType === 1
      ? buildWeeklyScopeOptions()
      : buildMonthlyScopeOptions(cell.date);

  rewardEditor.scope = resolveDefaultScope(cell);
  rewardEditor.title = resolveEditorTitle(cell, rewardEditor.scope);
  syncRewardEditorFromScope();
  rewardDrawerVisible.value = true;
}

function openRuleSummaryEditor(target: {
  kind: CheckInConfigEditorKind;
  label: string;
  monthDay?: number;
  rewardDate?: string;
  weekday?: number;
}) {
  if (target.rewardDate && !isEditableRewardDate(target.rewardDate)) {
    useMessage.warning('历史日期奖励仅可查看，不可修改');
    return;
  }

  rewardEditor.targetDate = target.rewardDate;
  rewardEditor.targetMonthDay = target.monthDay;
  rewardEditor.targetWeekday = target.weekday;
  rewardEditor.scope = target.kind;
  rewardEditor.scopeOptions = [{ label: target.label, value: target.kind }];
  rewardEditor.title = `编辑${target.label}`;
  syncRewardEditorFromScope();
  rewardDrawerVisible.value = true;
}

function handleScopeChange(nextScope: CheckInConfigEditorKind) {
  rewardEditor.scope = nextScope;
  rewardEditor.title = resolveEditorTitleFromCurrentState();
  syncRewardEditorFromScope();
}

function handleSaveRewardEditor(value: RewardConfigValue) {
  switch (rewardEditor.scope) {
    case 'base': {
      formState.baseRewardItems = cloneRewardItems(value.rewardItems);
      formState.rewardOverviewIconUrl = value.rewardOverviewIconUrl;
      break;
    }
    case 'date': {
      if (!rewardEditor.targetDate) {
        break;
      }
      upsertDateRule({
        rewardDate: rewardEditor.targetDate,
        rewardItems: cloneRewardItems(value.rewardItems),
        rewardOverviewIconUrl: value.rewardOverviewIconUrl,
        state: formState,
      });
      break;
    }
    case 'monthDay': {
      if (!rewardEditor.targetMonthDay) {
        break;
      }
      upsertPatternRule({
        monthDay: rewardEditor.targetMonthDay,
        patternType: 2,
        rewardItems: cloneRewardItems(value.rewardItems),
        rewardOverviewIconUrl: value.rewardOverviewIconUrl,
        state: formState,
      });
      break;
    }
    case 'monthLastDay': {
      upsertPatternRule({
        patternType: 3,
        rewardItems: cloneRewardItems(value.rewardItems),
        rewardOverviewIconUrl: value.rewardOverviewIconUrl,
        state: formState,
      });
      break;
    }
    case 'weekday': {
      if (!rewardEditor.targetWeekday) {
        break;
      }
      upsertPatternRule({
        patternType: 1,
        rewardItems: cloneRewardItems(value.rewardItems),
        rewardOverviewIconUrl: value.rewardOverviewIconUrl,
        state: formState,
        weekday: rewardEditor.targetWeekday,
      });
      break;
    }
  }

  rewardDrawerVisible.value = false;
}

function handleRemoveCurrentRule() {
  switch (rewardEditor.scope) {
    case 'base': {
      formState.baseRewardItems = [];
      formState.rewardOverviewIconUrl = undefined;
      break;
    }
    case 'date': {
      if (rewardEditor.targetDate) {
        removeDateRule({
          rewardDate: rewardEditor.targetDate,
          state: formState,
        });
      }
      break;
    }
    case 'monthDay': {
      if (rewardEditor.targetMonthDay) {
        removePatternRule({
          monthDay: rewardEditor.targetMonthDay,
          patternType: 2,
          state: formState,
        });
      }
      break;
    }
    case 'monthLastDay': {
      removePatternRule({
        patternType: 3,
        state: formState,
      });
      break;
    }
    case 'weekday': {
      if (rewardEditor.targetWeekday) {
        removePatternRule({
          patternType: 1,
          state: formState,
          weekday: rewardEditor.targetWeekday,
        });
      }
      break;
    }
  }

  rewardEditor.rewardItems = [];
  rewardEditor.rewardOverviewIconUrl = undefined;
}

function goPrevWeek() {
  weekCursor.value = dayjs(weekCursor.value)
    .subtract(7, 'day')
    .format('YYYY-MM-DD');
}

function goNextWeek() {
  weekCursor.value = dayjs(weekCursor.value).add(7, 'day').format('YYYY-MM-DD');
}

function goPrevMonth() {
  monthCursor.value = dayjs(`${monthCursor.value}-01`)
    .subtract(1, 'month')
    .format('YYYY-MM');
}

function goNextMonth() {
  monthCursor.value = dayjs(`${monthCursor.value}-01`)
    .add(1, 'month')
    .format('YYYY-MM');
}

function toggleDateRuleMonth(monthKey: string) {
  const expandedKeys = new Set(expandedDateRuleMonths.value);
  if (expandedKeys.has(monthKey)) {
    expandedKeys.delete(monthKey);
  } else {
    expandedKeys.add(monthKey);
  }

  expandedDateRuleMonths.value = [...expandedKeys];
}

function isDateRuleMonthExpanded(monthKey: string) {
  return expandedDateRuleMonths.value.includes(monthKey);
}

function formatPatternRuleLabel(
  rule: CheckInConfigFormState['patternRules'][number],
) {
  if (rule.patternType === 1) {
    return `每周星期${rule.weekday}`;
  }
  if (rule.patternType === 2) {
    return `每月 ${rule.monthDay} 号`;
  }
  return '每月最后一天';
}

function resolveDefaultScope(
  cell: CheckInConfigPreviewDay,
): CheckInConfigEditorKind {
  if (
    rewardEditor.targetDate &&
    getDateRuleByDate(formState, rewardEditor.targetDate)
  ) {
    return 'date';
  }
  if (formState.makeupPeriodType === 1) {
    return getPatternRuleByWeekday(formState, cell.weekday || 1)
      ? 'weekday'
      : 'date';
  }
  if (cell.isLastDayOfMonth && getMonthLastDayRule(formState)) {
    return 'monthLastDay';
  }
  if (getPatternRuleByMonthDay(formState, cell.monthDay || 1)) {
    return 'monthDay';
  }
  return 'date';
}

function resolveEditorTitle(
  cell: CheckInConfigPreviewDay,
  kind: CheckInConfigEditorKind,
) {
  if (kind === 'weekday') {
    return `编辑每周${cell.dayLabel.slice(0, 2)}奖励`;
  }
  if (kind === 'monthDay') {
    return `编辑每月 ${cell.monthDay} 号奖励`;
  }
  if (kind === 'monthLastDay') {
    return '编辑每月最后一天奖励';
  }
  return `编辑 ${cell.date} 奖励`;
}

function resolveEditorTitleFromCurrentState() {
  if (rewardEditor.scope === 'base') {
    return '编辑默认基础奖励';
  }
  if (rewardEditor.scope === 'weekday') {
    return `编辑每周星期${rewardEditor.targetWeekday}奖励`;
  }
  if (rewardEditor.scope === 'monthDay') {
    return `编辑每月 ${rewardEditor.targetMonthDay} 号奖励`;
  }
  if (rewardEditor.scope === 'monthLastDay') {
    return '编辑每月最后一天奖励';
  }
  return `编辑 ${rewardEditor.targetDate} 奖励`;
}

function syncRewardEditorFromScope() {
  switch (rewardEditor.scope) {
    case 'base': {
      rewardEditor.rewardItems = cloneRewardItems(formState.baseRewardItems);
      rewardEditor.rewardOverviewIconUrl = formState.rewardOverviewIconUrl;
      break;
    }
    case 'date': {
      const rule = getDateRuleByDate(formState, rewardEditor.targetDate || '');
      rewardEditor.rewardItems = cloneRewardItems(rule?.rewardItems);
      rewardEditor.rewardOverviewIconUrl = rule?.rewardOverviewIconUrl;
      break;
    }
    case 'monthDay': {
      const rule = getPatternRuleByMonthDay(
        formState,
        rewardEditor.targetMonthDay || 1,
      );
      rewardEditor.rewardItems = cloneRewardItems(rule?.rewardItems);
      rewardEditor.rewardOverviewIconUrl = rule?.rewardOverviewIconUrl;
      break;
    }
    case 'monthLastDay': {
      const rule = getMonthLastDayRule(formState);
      rewardEditor.rewardItems = cloneRewardItems(rule?.rewardItems);
      rewardEditor.rewardOverviewIconUrl = rule?.rewardOverviewIconUrl;
      break;
    }
    case 'weekday': {
      const rule = getPatternRuleByWeekday(
        formState,
        rewardEditor.targetWeekday || 1,
      );
      rewardEditor.rewardItems = cloneRewardItems(rule?.rewardItems);
      rewardEditor.rewardOverviewIconUrl = rule?.rewardOverviewIconUrl;
      break;
    }
  }
}

onMounted(async () => {
  await loadConfig();
});
</script>

<template>
  <div v-loading="loading" class="space-y-5">
    <div class="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
      <div class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div class="flex items-center justify-between gap-4">
          <div class="text-base font-semibold text-slate-900">签到基础配置</div>
          <div class="flex items-center gap-3">
            <span class="text-sm text-slate-500">签到开关</span>
            <el-switch
              :model-value="isEnabled"
              :loading="toggleLoading"
              @change="handleToggleEnabled"
            />
          </div>
        </div>

        <div class="mt-3 grid gap-4 md:grid-cols-2">
          <div>
            <div class="mb-2 text-sm font-medium text-slate-700">签到周期</div>
            <el-select
              :model-value="formState.makeupPeriodType"
              class="!w-full"
              @update:model-value="
                (value) => handleMakeupPeriodTypeChange(value as 1 | 2)
              "
            >
              <el-option
                v-for="item in checkInMakeupPeriodTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div>
            <div class="mb-2 text-sm font-medium text-slate-700">
              每周期补签额度
            </div>
            <el-input-number
              v-model="formState.periodicAllowance"
              class="!w-full"
              :min="0"
              :max="formState.makeupPeriodType === 1 ? 7 : 31"
            />
          </div>
        </div>

        <div class="mt-4">
          <div class="mb-2 text-sm font-medium text-slate-700">补签图标</div>
          <EsUpload
            :model-value="formState.makeupIconUrl || ''"
            :max-count="1"
            accept="image/*"
            list-type="picture-card"
            return-data-type="url"
            :scene="UploadSceneEnum.SHARED"
            @update:model-value="
              (value) => (formState.makeupIconUrl = value as string)
            "
          />
        </div>
      </div>

      <div class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="text-sm font-medium text-slate-500">默认基础奖励</div>
            <div class="mt-2 text-lg font-semibold text-slate-900">
              {{ formatRewardSummary(formState.baseRewardItems) }}
            </div>
            <div
              v-if="formState.rewardOverviewIconUrl"
              class="mt-3 flex items-center gap-3"
            >
              <span class="text-xs text-slate-500">总览图标</span>
              <img
                :src="formState.rewardOverviewIconUrl"
                alt="默认奖励总览图标"
                class="h-12 w-12 rounded-lg border border-slate-200 object-cover"
              />
            </div>
            <div class="mt-2 text-sm text-slate-500">
              当具体日期奖励和周期模式奖励都未命中时，默认发放这里的奖励。
            </div>
          </div>
          <el-button type="primary" @click="openBaseRewardEditor">
            编辑默认奖励
          </el-button>
        </div>
      </div>
    </div>

    <div class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div class="mb-4 flex items-center justify-between gap-3">
        <div>
          <div class="text-base font-semibold text-slate-900">奖励预览</div>
        </div>
      </div>

      <template v-if="formState.makeupPeriodType === 1">
        <div
          class="mb-4 flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50/80 px-4 py-3"
        >
          <el-button @click="goPrevWeek">上一周</el-button>
          <div class="text-base font-semibold text-slate-900">
            {{ weekTitle }}
          </div>
          <el-button @click="goNextWeek">下一周</el-button>
        </div>
        <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
          <button
            v-for="cell in previewDays"
            :key="cell.date"
            class="rounded-lg border border-slate-200 px-4 py-4 text-left transition"
            :class="
              cell.isEditable
                ? 'bg-slate-50/70 hover:border-sky-200 hover:bg-sky-50/60'
                : 'cursor-not-allowed bg-slate-100 text-slate-400'
            "
            :disabled="!cell.isEditable"
            type="button"
            @click="openPreviewEditor(cell)"
          >
            <div class="text-sm font-semibold text-slate-900">
              {{ cell.dayLabel }}
            </div>
            <div class="mt-2 text-xs leading-5 text-slate-500">
              {{ cell.rewardSummary }}
            </div>
            <img
              v-if="cell.rewardOverviewIconUrl"
              :src="cell.rewardOverviewIconUrl"
              alt="奖励总览图标"
              class="mt-3 h-10 w-10 rounded-lg border border-slate-200 object-cover"
            />
            <div
              v-if="!cell.isEditable"
              class="mt-2 text-[11px] text-slate-400"
            >
              历史日期只读
            </div>
          </button>
        </div>
      </template>

      <template v-else>
        <div
          class="mb-4 flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50/80 px-4 py-3"
        >
          <el-button @click="goPrevMonth">上一月</el-button>
          <div class="text-base font-semibold text-slate-900">
            {{ monthTitle }}
          </div>
          <el-button @click="goNextMonth">下一月</el-button>
        </div>
        <div class="grid grid-cols-7 gap-2">
          <div
            v-for="item in weeklyCalendarLabels"
            :key="item.value"
            class="py-2 text-center text-xs font-semibold uppercase tracking-[0.12em] text-slate-400"
          >
            {{ item.label }}
          </div>
        </div>
        <div class="grid grid-cols-7 gap-2">
          <button
            v-for="cell in previewDays"
            :key="cell.date"
            class="min-h-[96px] rounded-lg border px-3 py-3 text-left transition"
            :class="
              cell.isCurrentMonth && cell.isEditable
                ? 'border-slate-200 bg-white hover:border-sky-200 hover:bg-sky-50/50'
                : 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300'
            "
            :disabled="!cell.isCurrentMonth || !cell.isEditable"
            type="button"
            @click="openPreviewEditor(cell)"
          >
            <div class="text-sm font-semibold">{{ cell.dayLabel }}</div>
            <div class="mt-3 text-xs leading-5">{{ cell.rewardSummary }}</div>
            <img
              v-if="cell.rewardOverviewIconUrl"
              :src="cell.rewardOverviewIconUrl"
              alt="奖励总览图标"
              class="mt-3 h-8 w-8 rounded-lg border border-slate-200 object-cover"
            />
            <div
              v-if="cell.isCurrentMonth && !cell.isEditable"
              class="mt-2 text-[11px] text-slate-400"
            >
              历史日期只读
            </div>
          </button>
        </div>
      </template>
    </div>

    <div class="grid gap-4 xl:grid-cols-2">
      <div class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div class="mb-4 flex items-center justify-between gap-3">
          <div>
            <div class="text-base font-semibold text-slate-900">
              具体日期奖励总览
            </div>
          </div>
        </div>

        <div
          v-if="dateRuleSummaryGroups.length === 0"
          class="rounded-lg border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-400"
        >
          暂未配置具体日期奖励
        </div>
        <div v-else class="space-y-3">
          <div
            v-for="group in dateRuleSummaryGroups"
            :key="group.key"
            class="overflow-hidden rounded-lg border border-slate-200"
          >
            <button
              class="flex w-full items-center justify-between gap-4 bg-slate-50/70 px-4 py-3 text-left transition hover:bg-slate-100/80"
              type="button"
              @click="toggleDateRuleMonth(group.key)"
            >
              <div>
                <div class="text-sm font-semibold text-slate-900">
                  {{ group.label }}
                </div>
                <div class="mt-1 text-xs text-slate-500">
                  共 {{ group.rules.length }} 条具体日期奖励
                </div>
              </div>
              <div class="text-xs font-medium text-slate-400">
                {{ isDateRuleMonthExpanded(group.key) ? '收起' : '展开' }}
              </div>
            </button>

            <div
              v-if="isDateRuleMonthExpanded(group.key)"
              class="space-y-3 border-t border-slate-200 bg-white p-3"
            >
              <button
                v-for="rule in group.rules"
                :key="rule.key"
                class="w-full rounded-lg border border-slate-200 px-4 py-3 text-left transition"
                :class="
                  rule.editable
                    ? 'bg-slate-50/70 hover:border-sky-200 hover:bg-sky-50/60'
                    : 'cursor-not-allowed bg-slate-100 text-slate-400'
                "
                :disabled="!rule.editable"
                type="button"
                @click="
                  openRuleSummaryEditor({
                    kind: 'date',
                    label: rule.rewardDate,
                    rewardDate: rule.rewardDate,
                  })
                "
              >
                <div class="text-sm font-semibold text-slate-900">
                  {{ rule.label }}
                </div>
                <img
                  v-if="rule.rewardOverviewIconUrl"
                  :src="rule.rewardOverviewIconUrl"
                  alt="日期奖励总览图标"
                  class="mt-2 h-10 w-10 rounded-lg border border-slate-200 object-cover"
                />
                <div class="mt-1 text-xs text-slate-500">
                  {{ rule.rewardSummary }}
                </div>
                <div
                  v-if="!rule.editable"
                  class="mt-2 text-[11px] text-slate-400"
                >
                  历史日期只读
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div class="mb-4 flex items-center justify-between gap-3">
          <div>
            <div class="text-base font-semibold text-slate-900">
              周期模式奖励总览
            </div>
          </div>
        </div>

        <div
          v-if="patternRuleSummaries.length === 0"
          class="rounded-lg border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-400"
        >
          暂未配置周期模式奖励
        </div>
        <div v-else class="space-y-3">
          <button
            v-for="rule in patternRuleSummaries"
            :key="rule.key"
            class="w-full rounded-lg border border-slate-200 bg-slate-50/70 px-4 py-3 text-left transition hover:border-sky-200 hover:bg-sky-50/60"
            type="button"
            @click="
              openRuleSummaryEditor(
                rule.label.includes('星期')
                  ? {
                      kind: 'weekday',
                      label: rule.label,
                      weekday: Number(rule.label.replace('每周星期', '')),
                    }
                  : rule.label.includes('最后一天')
                    ? {
                        kind: 'monthLastDay',
                        label: rule.label,
                      }
                    : {
                        kind: 'monthDay',
                        label: rule.label,
                        monthDay: Number(
                          rule.label.replace('每月 ', '').replace(' 号', ''),
                        ),
                      },
              )
            "
          >
            <div class="text-sm font-semibold text-slate-900">
              {{ rule.label }}
            </div>
            <img
              v-if="rule.rewardOverviewIconUrl"
              :src="rule.rewardOverviewIconUrl"
              alt="周期奖励总览图标"
              class="mt-2 h-10 w-10 rounded-lg border border-slate-200 object-cover"
            />
            <div class="mt-1 text-xs text-slate-500">
              {{ rule.rewardSummary }}
            </div>
          </button>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <el-button :loading="saving" type="primary" @click="handleSave">
        保存基础配置
      </el-button>
    </div>

    <RewardConfigModal
      v-model:visible="rewardDrawerVisible"
      :allow-clear="true"
      :asset-options="checkInRewardAssetOptions"
      clear-button-text="清除当前规则"
      confirm-text="应用到当前配置"
      :model-value="{
        rewardItems: rewardEditor.rewardItems,
        rewardOverviewIconUrl: rewardEditor.rewardOverviewIconUrl,
      }"
      overview-icon-label="奖励总览图标"
      :show-overview-icon="true"
      :title="rewardEditor.title"
      @clear="handleRemoveCurrentRule"
      @confirm="handleSaveRewardEditor"
    >
      <template #prepend>
        <div
          v-if="rewardEditor.scopeOptions.length > 1"
          class="rounded-lg border border-slate-200 bg-slate-50/70 p-4"
        >
          <div class="mb-3 text-sm font-medium text-slate-700">
            奖励作用范围
          </div>
          <el-radio-group
            :model-value="rewardEditor.scope"
            @update:model-value="
              (value) => handleScopeChange(value as CheckInConfigEditorKind)
            "
          >
            <el-radio-button
              v-for="option in rewardEditor.scopeOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </el-radio-button>
          </el-radio-group>
        </div>
      </template>
    </RewardConfigModal>
  </div>
</template>
