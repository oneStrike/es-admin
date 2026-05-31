<script lang="ts" setup>
import type { RewardConfigValue } from '../../shared/reward-config/reward-config.types';
import type {
  CheckInConfigEditorKind,
  CheckInConfigFormState,
  CheckInConfigPreviewDay,
} from '../model/config';
import type { CheckInRewardItemDto } from '../model/shared';

import type {
  AdminCheckInCalendarOverviewResponseDto,
  CheckInCalendarOverviewRequest,
} from '#/api/types';

import { computed, onMounted, reactive, ref, watch } from 'vue';

import { useVbenDrawer, useVbenModal } from '@vben/common-ui';

import {
  checkInCalendarOverviewApi,
  checkInConfigDetailApi,
  checkInConfigUpdateApi,
  checkInConfigUpdateEnabledApi,
} from '#/api/core';
import EsUpload from '#/components/es-upload/es-upload.vue';
import { UploadSceneEnum } from '#/enum/api';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
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
const calendarOverview = ref<AdminCheckInCalendarOverviewResponseDto | null>(
  null,
);
const todayOverviewLoading = ref(false);
const todayOverviewLoadFailed = ref(false);

interface PeriodOverviewData {
  totalSigned: number;
  totalNormal: number;
  totalMakeup: number;
  periodLabel: string;
}
const todayOverview = computed(() => calendarOverview.value?.targetDay ?? null);
const periodOverview = computed<null | PeriodOverviewData>(() => {
  const overview = calendarOverview.value;
  if (!overview) {
    return null;
  }

  return {
    totalSigned: overview.periodToDate.signedCount,
    totalNormal: overview.periodToDate.normalSignCount,
    totalMakeup: overview.periodToDate.makeupSignCount,
    periodLabel: overview.periodType === 1 ? '按自然周' : '按自然月',
  };
});
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
  connectedComponent: CheckInSignedUserQueryDialog,
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
  const confirmed = await useConfirm({
    type: nextEnabled ? 'enable' : 'disable',
    title: nextEnabled ? '启用签到功能' : '停用签到功能',
    content: nextEnabled ? '确认启用签到功能吗？' : '确认停用签到功能吗？',
    successMessage: false,
  });
  if (!confirmed) {
    return;
  }
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

// 保存奖励配置时，若 scope 发生变化需先清理原位置规则再写入新位置（迁移语义），
// 最后触发服务端持久化并刷新表单状态。
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

// scope 解析优先级：具体日期规则 > 周期模式规则(weekday/monthDay/monthLastDay) > 默认 date。
// 周模式下 weekday 优先于 date；月模式下 monthDay/monthLastDay 优先于 date；月末最后一天仅月模式生效。
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

// 编辑器打开或切换 scope 时，从 formState 中按 scope 类型提取对应规则数据同步到 rewardEditor。
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

async function loadTodayOverview() {
  todayOverviewLoading.value = true;
  todayOverviewLoadFailed.value = false;
  try {
    const today = dayjs().format('YYYY-MM-DD');
    const params = {
      targetDate: today,
    } satisfies CheckInCalendarOverviewRequest;
    calendarOverview.value = await checkInCalendarOverviewApi(params);
  } catch {
    calendarOverview.value = null;
    todayOverviewLoadFailed.value = true;
  } finally {
    todayOverviewLoading.value = false;
  }
}

onMounted(async () => {
  await loadConfig();
  loadTodayOverview();
});
</script>

<template>
  <div v-loading="loading" class="check-in-theme es-scroll-pane space-y-5">
    <el-card shadow="never">
      <div class="space-y-5">
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          <el-card shadow="never">
            <el-text class="mb-2 block text-sm font-medium">图标配置</el-text>
            <div class="grid grid-cols-2 gap-4">
              <div class="min-w-0 rounded-lg p-3">
                <el-text class="mb-2 block text-xs font-medium leading-4">
                  补签图标
                </el-text>
                <EsUpload
                  :model-value="formState.makeupIconUrl || ''"
                  :max-count="1"
                  accept="image/*"
                  list-type="picture-card"
                  return-data-type="url"
                  :scene="UploadSceneEnum.SHARED"
                  class="mt-4"
                  @update:model-value="
                    (value) => (formState.makeupIconUrl = value as string)
                  "
                />
              </div>

              <div class="min-w-0 rounded-lg p-3">
                <el-text class="mb-2 block text-xs font-medium leading-4">
                  汇总图标
                </el-text>
                <EsUpload
                  :model-value="formState.rewardOverviewIconUrl || ''"
                  :max-count="1"
                  accept="image/*"
                  list-type="picture-card"
                  return-data-type="url"
                  :scene="UploadSceneEnum.SHARED"
                  class="mt-4"
                  @update:model-value="
                    (value) =>
                      (formState.rewardOverviewIconUrl = value as string)
                  "
                />
              </div>
            </div>
          </el-card>

          <el-card shadow="never">
            <div class="flex flex-1 flex-col justify-between gap-4">
              <div>
                <el-text class="mb-2 block text-sm font-medium">
                  签到周期
                </el-text>
                <el-select
                  :model-value="formState.makeupPeriodType"
                  class="!w-full mt-3"
                  @update:model-value="
                    (value: unknown) =>
                      handleMakeupPeriodTypeChange(value as 1 | 2)
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
              <div class="mt-6">
                <el-text class="mb-2 block text-sm font-medium">
                  每周期补签额度
                </el-text>
                <el-input-number
                  placeholder="按当前签到周期发放的补签次数上限。"
                  v-model="formState.periodicAllowance"
                  class="!w-full mt-3"
                  :min="0"
                  :max="formState.makeupPeriodType === 1 ? 7 : 31"
                />
              </div>
            </div>
          </el-card>

          <el-card
            shadow="never"
            class="[&_.el-card__body]:flex [&_.el-card__body]:flex-col"
          >
            <div class="flex flex-1 flex-col justify-between gap-4">
              <div class="flex-1">
                <el-text class="mb-2 block text-sm font-medium">
                  默认积分奖励
                </el-text>
                <div class="mt-3">
                  <el-input-number
                    class="!w-full"
                    controls-position="right"
                    :min="0"
                    :model-value="baseRewardValues.points"
                    :step="1"
                    placeholder="0 或不填表示不发积分"
                    @update:model-value="
                      (value: unknown) =>
                        handleBaseRewardAmountChange(
                          1,
                          value as number | undefined,
                        )
                    "
                  />
                </div>
              </div>
              <div class="flex-1 mt-6">
                <el-text class="mb-2 block text-sm font-medium">
                  默认经验奖励
                </el-text>
                <div class="mt-3">
                  <el-input-number
                    class="!w-full"
                    controls-position="right"
                    :min="0"
                    :model-value="baseRewardValues.experience"
                    :step="1"
                    placeholder="0 或不填表示不发经验"
                    @update:model-value="
                      (value: unknown) =>
                        handleBaseRewardAmountChange(
                          2,
                          value as number | undefined,
                        )
                    "
                  />
                </div>
              </div>
            </div>
          </el-card>

          <el-card shadow="never">
            <div class="flex flex-col gap-4">
              <el-button
                class="!ml-0 w-full"
                :loading="toggleLoading"
                :type="isEnabled ? 'warning' : 'success'"
                @click="handleToggleEnabled(!isEnabled)"
              >
                {{ isEnabled ? '停用签到功能' : '启用签到功能' }}
              </el-button>
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

          <el-card shadow="never">
            <div class="mb-2 flex items-center gap-2">
              <el-text class="text-sm font-medium">今日概况</el-text>
              <el-text class="text-xs" type="info">
                {{ dayjs().format('MM-DD') }}
              </el-text>
            </div>
            <div v-loading="todayOverviewLoading" class="flex flex-col gap-3">
              <template v-if="todayOverviewLoadFailed">
                <el-text class="text-xs" type="danger">
                  今日概况加载失败
                </el-text>
                <el-button
                  class="!ml-0"
                  size="small"
                  @click="loadTodayOverview"
                >
                  重试
                </el-button>
              </template>
              <template v-else-if="todayOverview">
                <div
                  class="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5"
                >
                  <span class="text-xs text-slate-500">签到人数</span>
                  <span class="text-xl font-bold text-slate-800">
                    {{ todayOverview.signedCount }}
                  </span>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <div
                    class="check-in-stat-item check-in-stat-item--primary rounded-md border border-slate-200 px-3 py-2.5 text-center"
                  >
                    <div class="check-in-stat-label--primary text-xs">
                      正常签到
                    </div>
                    <div
                      class="mt-1 check-in-stat-value--primary text-lg font-semibold"
                    >
                      {{ todayOverview.normalSignCount }}
                    </div>
                  </div>
                  <div
                    class="check-in-stat-item check-in-stat-item--warning rounded-md border border-slate-200 px-3 py-2.5 text-center"
                  >
                    <div class="check-in-stat-label--warning text-xs">
                      补签签到
                    </div>
                    <div
                      class="mt-1 check-in-stat-value--warning text-lg font-semibold"
                    >
                      {{ todayOverview.makeupSignCount }}
                    </div>
                  </div>
                </div>
              </template>
              <el-text v-else class="text-xs" type="info">
                暂无今日数据
              </el-text>
            </div>
          </el-card>

          <el-card shadow="never">
            <div class="mb-2 flex items-center gap-2">
              <el-text class="text-sm font-medium">周期概览</el-text>
              <el-text v-if="periodOverview" class="text-xs" type="info">
                {{ periodOverview.periodLabel }}
              </el-text>
            </div>
            <div v-loading="todayOverviewLoading" class="flex flex-col gap-3">
              <template v-if="todayOverviewLoadFailed">
                <el-text class="text-xs" type="danger">
                  周期概览加载失败
                </el-text>
                <el-button
                  class="!ml-0"
                  size="small"
                  @click="loadTodayOverview"
                >
                  重试
                </el-button>
              </template>
              <template v-else-if="periodOverview">
                <div
                  class="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5"
                >
                  <span class="text-xs text-slate-500">周期签到</span>
                  <span class="text-xl font-bold text-slate-800">
                    {{ periodOverview.totalSigned }}
                  </span>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <div
                    class="check-in-stat-item check-in-stat-item--primary rounded-md border border-slate-200 px-3 py-2.5 text-center"
                  >
                    <div class="check-in-stat-label--primary text-xs">
                      正常签到
                    </div>
                    <div
                      class="mt-1 check-in-stat-value--primary text-lg font-semibold"
                    >
                      {{ periodOverview.totalNormal }}
                    </div>
                  </div>
                  <div
                    class="check-in-stat-item check-in-stat-item--warning rounded-md border border-slate-200 px-3 py-2.5 text-center"
                  >
                    <div class="check-in-stat-label--warning text-xs">
                      补签签到
                    </div>
                    <div
                      class="mt-1 check-in-stat-value--warning text-lg font-semibold"
                    >
                      {{ periodOverview.totalMakeup }}
                    </div>
                  </div>
                </div>
              </template>
              <el-text v-else class="text-xs" type="info">
                暂无周期数据
              </el-text>
            </div>
          </el-card>
        </div>
      </div>
    </el-card>

    <el-card shadow="never">
      <div class="mb-4 flex items-center justify-between gap-3">
        <div>
          <el-text class="text-base font-semibold">奖励预览</el-text>
        </div>
      </div>

      <template v-if="formState.makeupPeriodType === 1">
        <div
          class="check-in-preview-toolbar mb-4 flex items-center justify-between gap-3 px-4 py-3"
        >
          <el-button @click="goPrevWeek">上一周</el-button>
          <el-text class="text-base font-semibold">
            {{ weekTitle }}
          </el-text>
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
          <el-text class="text-base font-semibold">
            {{ monthTitle }}
          </el-text>
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
      clear-button-text="清空"
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
          <el-text class="mb-3 block text-sm font-medium">
            奖励作用范围
          </el-text>
          <el-radio-group
            :model-value="rewardEditor.scope"
            @update:model-value="
              (value: unknown) =>
                handleScopeChange(value as CheckInConfigEditorKind)
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
          class="rounded-lg border border-dashed px-4 py-8 text-center text-sm"
        >
          <el-text type="info">暂未配置具体日期奖励</el-text>
        </div>
        <div v-else class="space-y-3">
          <div
            v-for="group in dateRuleSummaryGroups"
            :key="group.key"
            class="overflow-hidden rounded-lg border border-slate-200"
          >
            <button
              class="flex w-full items-center justify-between gap-4 check-in-overview-group-header px-4 py-3 text-left transition"
              type="button"
              @click="toggleDateRuleMonth(group.key)"
            >
              <div>
                <el-text class="text-sm font-semibold">
                  {{ group.label }}
                </el-text>
                <el-text class="mt-1 text-xs" type="info">
                  共 {{ group.rules.length }} 条具体日期奖励
                </el-text>
              </div>
              <el-text class="text-xs font-medium" type="info">
                {{ isDateRuleMonthExpanded(group.key) ? '收起' : '展开' }}
              </el-text>
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
                    ? 'check-in-overview-item--editable'
                    : 'check-in-overview-item--readonly'
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
                <el-text class="text-sm font-semibold">
                  {{ rule.label }}
                </el-text>
                <img
                  v-if="rule.rewardOverviewIconUrl"
                  :src="rule.rewardOverviewIconUrl"
                  alt="日期奖励总览图标"
                  class="mt-2 h-10 w-10 rounded-lg border border-slate-200 object-cover"
                />
                <el-text class="mt-1 text-xs" type="info">
                  {{ rule.rewardSummary }}
                </el-text>
                <el-text
                  v-if="!rule.editable"
                  class="mt-2 block text-[11px]"
                  type="info"
                >
                  历史日期只读
                </el-text>
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
          class="rounded-lg border border-dashed px-4 py-8 text-center text-sm"
        >
          <el-text type="info">暂未配置周期模式奖励</el-text>
        </div>
        <div v-else class="space-y-3">
          <button
            v-for="rule in patternRuleSummaries"
            :key="rule.key"
            class="w-full rounded-lg border border-slate-200 check-in-overview-item--editable px-4 py-3 text-left transition"
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
            <el-text class="text-sm font-semibold">
              {{ rule.label }}
            </el-text>
            <img
              v-if="rule.rewardOverviewIconUrl"
              :src="rule.rewardOverviewIconUrl"
              alt="周期奖励总览图标"
              class="mt-2 h-10 w-10 rounded-lg border border-slate-200 object-cover"
            />
            <el-text class="mt-1 text-xs" type="info">
              {{ rule.rewardSummary }}
            </el-text>
          </button>
        </div>
      </div>
    </PatternOverviewDrawer>

    <SignedUserQueryModal />
  </div>
</template>

<style scoped>
/* ===== 工具栏 ===== */
.check-in-preview-toolbar {
  background-color: var(--el-fill-color-light);
  border: 1px solid var(--el-border-color-light);
  border-radius: 10px;
}

/* ===== 星期标题 ===== */
.check-in-preview-weekday {
  color: var(--el-text-color-secondary);
}

/* ===== 预览格子容器 ===== */
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

/* ===== 格子内部文本 ===== */
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

/* ===== 总览列表项（Drawer 内使用，通过 .check-in-theme 命名空间兜底） ===== */
.check-in-overview-group-header {
  background-color: var(--el-fill-color-light);
}

.check-in-overview-group-header:hover {
  background-color: var(--el-fill-color);
}

.check-in-overview-item--editable {
  background-color: var(--el-fill-color-light);
  border: 1px solid var(--el-border-color);
  transition: all 0.2s;
}

.check-in-overview-item--editable:hover {
  background-color: color-mix(
    in srgb,
    var(--el-color-primary) 4%,
    var(--el-bg-color)
  );
  border-color: var(--el-color-primary-light-5);
}

.check-in-overview-item--readonly {
  color: var(--el-text-color-placeholder);
  cursor: not-allowed;
  background-color: var(--el-fill-color);
}

/* ===== 概览统计卡片（左侧色条方案） ===== */
.check-in-stat-item--primary {
  border-left: 3px solid var(--el-color-primary);
}

.check-in-stat-item--warning {
  border-left: 3px solid #f59e0b;
}

.check-in-stat-label--primary,
.check-in-stat-value--primary {
  color: var(--el-color-primary);
}

.check-in-stat-label--warning,
.check-in-stat-value--warning {
  color: #d97706;
}
</style>
