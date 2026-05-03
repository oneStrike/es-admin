<script lang="ts" setup>
import type { RewardConfigValue } from '../../shared/reward-config/reward-config.types';
import type {
  CheckInConfigEditorKind,
  CheckInConfigFormState,
  CheckInConfigPreviewDay,
} from '../model/config';
import type { CheckInRewardItemDto } from '../model/shared';

import { computed, onMounted, reactive, ref, watch } from 'vue';

import { useVbenDrawer, useVbenModal } from '@vben/common-ui';

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
  isMonthSignedUserQueryDateVisible,
  isSignedUserQueryDateVisible,
} from '../model/calendar-runtime';
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
  removeRewardRuleByScope,
  upsertDateRule,
  upsertPatternRule,
  validateConfigForm,
} from '../model/config';
import {
  buildBaseRewardItems,
  checkInMakeupPeriodTypeOptions,
  checkInRewardAssetOptions,
  cloneRewardItems,
  formatRewardSummary,
  getRewardSourceTagMeta,
  parseBaseRewardItems,
  weeklyCalendarLabels,
} from '../model/shared';
import CheckInSignedUserQueryDialog from './check-in-signed-user-query-dialog.vue';

defineOptions({
  name: 'CheckInConfigPanel',
});

type RewardEditorState = {
  originalScope?: Exclude<CheckInConfigEditorKind, 'base'>;
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
  originalScope: undefined,
});

const [DateOverviewDrawer, dateOverviewDrawerApi] = useVbenDrawer({
  class: '!w-[42vw] max-w-full max-sm:!w-full',
  destroyOnClose: false,
  footer: false,
  title: '具体日期奖励总览',
});

const [PatternOverviewDrawer, patternOverviewDrawerApi] = useVbenDrawer({
  class: '!w-[42vw] max-w-full max-sm:!w-full',
  destroyOnClose: false,
  footer: false,
  title: '周期模式奖励总览',
});

const [SignedUserQueryModal, signedUserQueryModalApi] = useVbenModal({
  class:
    '!top-[5vh] !h-[86vh] !max-h-[86vh] !w-[1180px] max-w-[calc(100vw-32px)]',
  connectedComponent: CheckInSignedUserQueryDialog,
  contentClass: 'min-h-0 !overflow-hidden p-3',
  footer: false,
  title: '已签用户查询',
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
const baseRewardValues = computed(() =>
  parseBaseRewardItems(formState.baseRewardItems),
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

async function saveConfig(successMessage: string) {
  const error = validateConfigForm(formState);
  if (error) {
    useMessage.warning(error);
    return false;
  }

  saving.value = true;
  try {
    await checkInConfigUpdateApi(
      buildConfigUpdatePayload(isEnabled.value, formState),
    );
    useMessage.success(successMessage);
    await loadConfig();
    return true;
  } finally {
    saving.value = false;
  }
}

async function handleSaveBasicInfo() {
  await saveConfig('基础信息和默认基础奖励已保存');
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

function handleBaseRewardAmountChange(
  assetType: 1 | 2,
  value: null | number | string | undefined,
) {
  const nextRewardValues = { ...baseRewardValues.value };
  const numericValue = typeof value === 'number' ? value : Number(value);
  const normalizedValue =
    Number.isFinite(numericValue) && numericValue > 0
      ? Math.trunc(numericValue)
      : undefined;

  if (assetType === 1) {
    nextRewardValues.points = normalizedValue;
  } else {
    nextRewardValues.experience = normalizedValue;
  }

  formState.baseRewardItems = buildBaseRewardItems(
    nextRewardValues.points,
    nextRewardValues.experience,
  );
}

function openDateOverview() {
  dateOverviewDrawerApi.open();
}

function openPatternOverview() {
  patternOverviewDrawerApi.open();
}

function openSignedUserQuery(targetDate: string) {
  signedUserQueryModalApi.setData({ targetDate }).open();
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

  const resolvedScope = resolveDefaultScope(cell);
  rewardEditor.scope = resolvedScope;
  rewardEditor.originalScope = resolvedScope;
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
  rewardEditor.originalScope = target.kind === 'base' ? undefined : target.kind;
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

async function handleSaveRewardEditor(value: RewardConfigValue) {
  if (
    rewardEditor.originalScope &&
    rewardEditor.originalScope !== rewardEditor.scope
  ) {
    removeRewardRuleByScope({
      scope: rewardEditor.originalScope,
      state: formState,
      targetDate: rewardEditor.targetDate,
      targetMonthDay: rewardEditor.targetMonthDay,
      targetWeekday: rewardEditor.targetWeekday,
    });
  }

  switch (rewardEditor.scope) {
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

  const saved = await saveConfig('奖励配置已保存');
  if (saved) {
    rewardDrawerVisible.value = false;
  }
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
): Exclude<CheckInConfigEditorKind, 'base'> {
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
  <div v-loading="loading" class="check-in-theme es-scroll-pane space-y-5">
    <el-card shadow="never">
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

      <div class="mt-4 space-y-5">
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          <el-card shadow="never">
            <div class="mb-2 text-sm font-medium text-slate-700">图标配置</div>
            <div class="grid grid-cols-2 gap-4">
              <div class="min-w-0 rounded-lg p-3">
                <div class="mb-2 text-xs font-medium leading-4 text-slate-600">
                  补签图标
                </div>
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

              <div class="min-w-0 rounded-lg p-3">
                <div class="mb-2 text-xs font-medium leading-4 text-slate-600">
                  汇总图标
                </div>
                <EsUpload
                  :model-value="formState.rewardOverviewIconUrl || ''"
                  :max-count="1"
                  accept="image/*"
                  list-type="picture-card"
                  return-data-type="url"
                  :scene="UploadSceneEnum.SHARED"
                  @update:model-value="
                    (value) =>
                      (formState.rewardOverviewIconUrl = value as string)
                  "
                />
              </div>
            </div>
          </el-card>

          <el-card shadow="never">
            <div class="mb-2 text-sm font-medium text-slate-700">签到周期</div>
            <div class="text-xs text-slate-500">
              控制补签额度的自然周期范围。
            </div>
            <div class="mt-3">
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
          </el-card>

          <el-card shadow="never">
            <div class="mb-2 text-sm font-medium text-slate-700">
              每周期补签额度
            </div>
            <div class="text-xs text-slate-500">
              按当前签到周期发放的补签次数上限。
            </div>
            <div class="mt-3">
              <el-input-number
                v-model="formState.periodicAllowance"
                class="!w-full"
                :min="0"
                :max="formState.makeupPeriodType === 1 ? 7 : 31"
              />
            </div>
          </el-card>

          <el-card shadow="never">
            <div class="mb-2 text-sm font-medium text-slate-700">
              默认积分奖励
            </div>
            <div class="text-xs text-slate-500">
              未命中特殊奖励时发放的默认积分。
            </div>
            <div class="mt-3">
              <el-input-number
                class="!w-full"
                controls-position="right"
                :min="0"
                :model-value="baseRewardValues.points"
                :step="1"
                @update:model-value="
                  (value) =>
                    handleBaseRewardAmountChange(1, value as number | undefined)
                "
              />
            </div>
            <div class="mt-2 text-xs text-slate-500">0 或不填表示不发积分</div>
          </el-card>

          <el-card shadow="never">
            <div class="mb-2 text-sm font-medium text-slate-700">
              默认经验奖励
            </div>
            <div class="text-xs text-slate-500">
              未命中特殊奖励时发放的默认经验。
            </div>
            <div class="mt-3">
              <el-input-number
                class="!w-full"
                controls-position="right"
                :min="0"
                :model-value="baseRewardValues.experience"
                :step="1"
                @update:model-value="
                  (value) =>
                    handleBaseRewardAmountChange(2, value as number | undefined)
                "
              />
            </div>
            <div class="mt-2 text-xs text-slate-500">0 或不填表示不发经验</div>
          </el-card>

          <el-card shadow="never">
            <div class="mb-2 text-sm font-medium text-slate-700">操作</div>
            <div class="text-xs text-slate-500">
              查看奖励总览或保存当前基础配置。
            </div>
            <div class="mt-4 flex flex-col gap-3">
              <el-button class="!ml-0 w-full" @click="openDateOverview">
                具体日期总览
              </el-button>
              <el-button class="!ml-0 w-full" @click="openPatternOverview">
                周期模式总览
              </el-button>
              <el-button
                class="!ml-0 w-full"
                :loading="saving"
                type="primary"
                @click="handleSaveBasicInfo"
              >
                保存基础信息
              </el-button>
            </div>
          </el-card>
        </div>
      </div>
    </el-card>

    <el-card shadow="never">
      <div class="mb-4 flex items-center justify-between gap-3">
        <div>
          <div class="text-base font-semibold text-slate-900">奖励预览</div>
        </div>
      </div>

      <template v-if="formState.makeupPeriodType === 1">
        <div
          class="check-in-preview-toolbar mb-4 flex items-center justify-between gap-3 px-4 py-3"
        >
          <el-button @click="goPrevWeek">上一周</el-button>
          <div class="text-base font-semibold text-slate-900">
            {{ weekTitle }}
          </div>
          <el-button @click="goNextWeek">下一周</el-button>
        </div>
        <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
          <div
            v-for="cell in previewDays"
            :key="cell.date"
            class="check-in-preview-cell flex h-[102px] flex-col px-3 py-3 text-left transition"
            :class="
              cell.isEditable
                ? 'check-in-preview-cell--editable'
                : 'check-in-preview-cell--readonly cursor-not-allowed'
            "
            :aria-disabled="!cell.isEditable"
            role="button"
            @click="openPreviewEditor(cell)"
          >
            <div class="flex items-start justify-between gap-2">
              <div
                :class="
                  cell.isEditable
                    ? 'check-in-cell-title--editable'
                    : 'check-in-cell-title--readonly'
                "
                class="text-sm font-semibold"
              >
                {{ cell.dayLabel }}
              </div>
              <el-tag
                :type="getRewardSourceTagMeta(cell.rewardSourceType).color"
                effect="light"
                round
                size="small"
              >
                {{ getRewardSourceTagMeta(cell.rewardSourceType).label }}
              </el-tag>
            </div>
            <div class="mt-2 flex items-start justify-between gap-2">
              <div
                :class="
                  cell.isEditable
                    ? 'check-in-cell-summary--editable'
                    : 'check-in-cell-summary--readonly'
                "
                class="line-clamp-2 min-h-[28px] flex-1 text-xs leading-5"
              >
                {{ cell.rewardSummary }}
              </div>
              <img
                v-if="cell.rewardOverviewIconUrl"
                :src="cell.rewardOverviewIconUrl"
                alt="奖励总览图标"
                class="h-7 w-7 shrink-0 rounded-md border border-slate-200 object-cover"
              />
            </div>
            <div
              :class="
                cell.isEditable
                  ? 'check-in-preview-status--editable'
                  : 'check-in-preview-status--readonly'
              "
              class="mt-auto flex items-center justify-between gap-2 pt-1 text-[10px]"
            >
              <span>{{
                cell.isEditable ? '点击编辑奖励' : '历史日期只读'
              }}</span>
              <el-button
                v-if="isSignedUserQueryDateVisible(cell.date)"
                link
                size="small"
                type="primary"
                @click.stop="openSignedUserQuery(cell.date)"
              >
                已签用户
              </el-button>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div
          class="check-in-preview-toolbar mb-4 flex items-center justify-between gap-3 px-4 py-3"
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
            class="check-in-preview-weekday py-2 text-center text-xs font-semibold uppercase tracking-[0.12em]"
          >
            {{ item.label }}
          </div>
        </div>
        <div class="grid grid-cols-7 gap-2">
          <div
            v-for="cell in previewDays"
            :key="cell.date"
            class="check-in-month-cell flex h-[102px] flex-col px-3 py-3 text-left transition"
            :class="
              cell.isCurrentMonth && cell.isEditable
                ? 'check-in-month-cell--editable'
                : 'check-in-month-cell--readonly cursor-not-allowed'
            "
            :aria-disabled="!cell.isCurrentMonth || !cell.isEditable"
            role="button"
            @click="cell.isCurrentMonth && openPreviewEditor(cell)"
          >
            <div class="flex items-start justify-between gap-2">
              <div
                :class="
                  cell.isCurrentMonth && cell.isEditable
                    ? 'check-in-cell-title--editable'
                    : 'check-in-cell-title--readonly'
                "
                class="text-sm font-semibold"
              >
                {{ cell.dayLabel }}
              </div>
              <el-tag
                :type="getRewardSourceTagMeta(cell.rewardSourceType).color"
                effect="light"
                round
                size="small"
              >
                {{ getRewardSourceTagMeta(cell.rewardSourceType).label }}
              </el-tag>
            </div>
            <div class="mt-2 flex items-start justify-between gap-2">
              <div
                :class="
                  cell.isCurrentMonth && cell.isEditable
                    ? 'check-in-cell-summary--editable'
                    : 'check-in-cell-summary--readonly'
                "
                class="line-clamp-2 min-h-[28px] flex-1 text-xs leading-5"
              >
                {{ cell.rewardSummary }}
              </div>
              <img
                v-if="cell.rewardOverviewIconUrl"
                :src="cell.rewardOverviewIconUrl"
                alt="奖励总览图标"
                class="h-7 w-7 shrink-0 rounded-md border border-slate-200 object-cover"
              />
            </div>
            <div
              v-if="cell.isCurrentMonth"
              :class="
                cell.isEditable
                  ? 'check-in-preview-status--editable'
                  : 'check-in-preview-status--readonly'
              "
              class="mt-auto flex items-center justify-between gap-2 pt-1 text-[10px]"
            >
              <span>{{
                cell.isEditable ? '点击编辑奖励' : '历史日期只读'
              }}</span>
              <el-button
                v-if="isMonthSignedUserQueryDateVisible(cell)"
                link
                size="small"
                type="primary"
                @click.stop="openSignedUserQuery(cell.date)"
              >
                已签用户
              </el-button>
            </div>
          </div>
        </div>
      </template>
    </el-card>

    <RewardConfigModal
      v-model:visible="rewardDrawerVisible"
      :allow-clear="true"
      :allow-empty-confirm="true"
      :asset-options="checkInRewardAssetOptions"
      clear-button-text="清空当前配置"
      confirm-text="应用到当前配置"
      :model-value="{
        rewardItems: rewardEditor.rewardItems,
        rewardOverviewIconUrl: rewardEditor.rewardOverviewIconUrl,
      }"
      overview-icon-label="奖励总览图标"
      :show-overview-icon="true"
      :title="rewardEditor.title"
      @confirm="handleSaveRewardEditor"
    >
      <template #prepend>
        <el-card v-if="rewardEditor.scopeOptions.length > 1" shadow="never">
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
        </el-card>
      </template>
    </RewardConfigModal>

    <DateOverviewDrawer>
      <div class="space-y-3">
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
    </DateOverviewDrawer>

    <PatternOverviewDrawer>
      <div class="space-y-3">
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
    </PatternOverviewDrawer>

    <SignedUserQueryModal />
  </div>
</template>

<style>
.check-in-theme [class*='text-slate-900'] {
  color: var(--el-text-color-primary) !important;
}

.check-in-theme [class*='text-slate-700'],
.check-in-theme [class*='text-slate-600'],
.check-in-theme [class*='text-slate-500'],
.check-in-theme [class*='text-slate-400'],
.check-in-theme [class*='text-slate-300'] {
  color: var(--el-text-color-regular) !important;
}

.check-in-theme [class*='border-slate-200'],
.check-in-theme [class*='border-slate-100'] {
  border-color: var(--el-border-color) !important;
}

.check-in-theme [class*='bg-white'] {
  background-color: var(--el-bg-color) !important;
}

.check-in-theme [class*='bg-slate-50'],
.check-in-theme [class*='bg-slate-100'] {
  background-color: var(--el-fill-color-light) !important;
}

.check-in-preview-toolbar {
  background-color: var(--el-fill-color-light);
  border: 1px solid var(--el-border-color-light);
  border-radius: 10px;
}

.check-in-preview-weekday {
  color: var(--el-text-color-secondary);
}

.check-in-preview-cell,
.check-in-month-cell {
  background-color: var(--el-bg-color);
  border: 1px solid var(--el-border-color-light);
  border-radius: 12px;
}

.check-in-preview-cell--editable,
.check-in-month-cell--editable {
  color: var(--el-text-color-primary);
  background-color: color-mix(
    in srgb,
    var(--el-color-primary) 2%,
    var(--el-bg-color)
  );
}

.check-in-preview-cell--editable:hover,
.check-in-month-cell--editable:hover {
  background-color: color-mix(
    in srgb,
    var(--el-color-primary) 4%,
    var(--el-bg-color)
  );
  border-color: var(--el-color-primary-light-5);
}

.check-in-preview-cell--readonly,
.check-in-month-cell--readonly {
  color: var(--el-text-color-regular);
  background-color: color-mix(
    in srgb,
    var(--el-text-color-primary) 3%,
    var(--el-bg-color)
  );
}

.check-in-cell-title--editable {
  color: var(--el-text-color-primary);
}

.check-in-cell-title--readonly {
  color: var(--el-text-color-secondary);
}

.check-in-cell-summary--editable {
  color: var(--el-text-color-primary);
}

.check-in-cell-summary--readonly {
  color: var(--el-text-color-secondary);
}

.check-in-preview-status--editable {
  font-weight: 400;
  color: var(--el-text-color-secondary);
}

.check-in-preview-status--readonly {
  color: var(--el-text-color-placeholder);
}
</style>
