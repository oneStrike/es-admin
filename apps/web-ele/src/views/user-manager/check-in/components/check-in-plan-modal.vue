<!--
  签到计划编辑弹窗 - 视图层

  两步式编辑器：
  Step 1 - 基础信息：计划名称、编码、状态、周期类型、补签次数、起止日期
  Step 2 - 奖励配置：默认基础奖励 + 周期规则（周视图/月视图日历）+ 连续奖励

  核心交互流程：
  1. 用户填写基础信息 → 点击「下一步」→ 校验通过后进入 Step 2
  2. 在日历上选择日期 → 编辑该日期的奖励（支持 date/weekday/month_day 三种模式）
  3. 可选配置连续签到奖励规则
  4. 点击「完成并保存」→ 将计划和奖励配置合并后一次性提交
-->
<script lang="ts" setup>
import type { Dayjs } from 'dayjs';

import type { CheckInPatternRuleDraft } from '../model/plan-modal';
import type { CheckInPlanRow } from '../model/shared';

import { computed, reactive, ref, watch } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import {
  checkInPlanCreateApi,
  checkInPlanDetailApi,
  checkInPlanUpdateApi,
} from '#/api/core';
import { useMessage } from '#/hooks/useFeedback';
import { dayjs } from '#/utils';

import {
  buildMonthCalendar,
  buildPlanSubmitPayload,
  buildPlanWithRewardPayload,
  buildWeekCalendar,
  createDefaultPlanFormModel,
  createDefaultRewardFormModel,
  createPlanDateDisableHandlers,
  findPatternRuleByKey,
  formatMonthCursor,
  getMonthlyRewardModeOptions,
  getPlanBusinessRuleError,
  getPlanFormDisplayValues,
  getRewardBusinessRuleError,
  getWeeklyRewardModeOptions,
  mapPlanDetailToEditorState,
  normalizePlanFormValues,
  planFormSchema,
  removeDateRule,
  removePatternRule,
  resolveMonthlyRewardMode,
  resolveWeeklyRewardMode,
  upsertDateRule,
  upsertPatternRule,
} from '../model/plan-modal';

defineOptions({
  name: 'CheckInPlanModal',
});

/** 弹窗外部传入的数据：编辑时携带 row，保存成功后回调 onSaved */
type SharedData = {
  onSaved?: () => Promise<void> | void;
  row?: CheckInPlanRow;
};

/** 当前步骤：1=基础信息, 2=奖励配置 */
type StepKey = 1 | 2;

// ======================== 响应式状态 ========================

/** 弹窗共享数据（从 modalApi.getData 获取） */
const sharedData = ref<SharedData>({});
/** 详情加载中的 loading 状态 */
const loading = ref(false);
/** 提交中的 loading 状态（控制按钮禁用 + 全局遮罩） */
const submitting = ref(false);
/** 当前所处的编辑步骤 */
const currentStep = ref<StepKey>(1);
/** 该计划是否已存在奖励配置（决定保存时走 create 还是 update 接口） */
const rewardConfigExists = ref(false);
/** 周视图中当前选中的星期几（1-7） */
const weeklySelectedWeekday = ref(1);
/** 周视图中当前选中的日期字符串 (YYYY-MM-DD) */
const weeklyDateSelection = ref('');
/** 月视图中当前选中的日期字符串 (YYYY-MM-DD) */
const monthlyDateSelection = ref('');

/** 第一步：计划基础信息表单状态 */
const planState = reactive(createDefaultPlanFormModel());
/** 第二步：奖励配置表单状态 */
const rewardState = reactive(createDefaultRewardFormModel());
/** 日期选择器的禁用闭包，内部读取最新的 planState 实现联动 */
const planDateDisableHandlers = createPlanDateDisableHandlers(() => ({
  cycleType: planState.cycleType,
  startDate: planState.startDate,
}));

// ======================== 表单与弹窗实例 ========================

/** 基础信息表单实例 */
const [PlanForm, planFormApi] = useVbenForm({
  /** 表单值变化回调：归一化日期、同步显示值、动态更新日期选择器 Schema */
  handleValuesChange(values, changedFields) {
    const nextPlanState = normalizePlanFormValues({
      ...planState,
      ...values,
    });
    const displayValues = getPlanFormDisplayValues(nextPlanState);

    Object.assign(planState, nextPlanState);

    if (
      (changedFields.includes('cycleType') ||
        changedFields.includes('startDate')) &&
      values.startDate !== displayValues.startDate
    ) {
      void planFormApi.setFieldValue('startDate', displayValues.startDate);
    }

    if (
      (changedFields.includes('cycleType') ||
        changedFields.includes('endDate')) &&
      values.endDate !== displayValues.endDate
    ) {
      void planFormApi.setFieldValue('endDate', displayValues.endDate);
    }

    syncPlanDateSchema(planState.startDate, planState.cycleType);
  },
  layout: 'vertical',
  scrollToFirstError: true,
  schema: planFormSchema,
  showDefaultActions: false,
  wrapperClass: 'grid-cols-1 gap-x-4 md:grid-cols-2',
});

/** 弹窗实例 */
const [Modal, modalApi] = useVbenModal({
  closeOnClickModal: false,
  showCancelButton: false,
  showConfirmButton: false,
  title: '签到计划',
  /** 弹窗打开时初始化数据：区分新增/编辑模式 */
  async onOpenChange(isOpen) {
    if (!isOpen) {
      return;
    }

    sharedData.value = modalApi.getData<SharedData>() || {};
    modalApi.setState({
      title: sharedData.value.row ? '编辑签到计划' : '新增签到计划',
    });

    await initializeModal();
  },
});

// ======================== 计算属性 ========================

/** 周视图日历格子数据（根据当前 weekCursor 和奖励规则实时计算） */
const weekCalendarCells = computed(() =>
  buildWeekCalendar({
    dateRules: rewardState.dateRules,
    patternRules: rewardState.patternRules,
    weekCursor: rewardState.weekCursor,
  }),
);

/**
 * 月末规则草稿：从 patternRules 中查找 MONTH_LAST_DAY 规则
 * 若不存在则返回空默认值，用于月末奖励独立编辑区域的绑定
 */
const monthLastDayRule = computed(() => {
  return (
    findPatternRuleByKey(rewardState.patternRules, 'MONTH_LAST_DAY') || {
      experience: undefined,
      key: 'MONTH_LAST_DAY',
      patternType: 'MONTH_LAST_DAY' as const,
      points: undefined,
    }
  );
});

/** 月视图日历格子数据（根据当前 monthCursor 和奖励规则实时计算） */
const monthlyCalendarCells = computed(() =>
  buildMonthCalendar({
    cycleType: planState.cycleType,
    dateRules: rewardState.dateRules,
    endDate: planState.endDate,
    mode: rewardState.monthlyRewardMode,
    monthCursor: rewardState.monthCursor,
    patternRules: rewardState.patternRules,
    startDate: planState.startDate,
  }),
);

/** 月视图标题（如「2025 年 1 月」） */
const monthTitle = computed(() =>
  dayjs(`${rewardState.monthCursor}-01`).format('YYYY 年 M 月'),
);

/** 是否允许切换到上一月（不能早于计划开始月份） */
const canGoPrevMonth = computed(() => {
  const prevMonthEnd = dayjs(`${rewardState.monthCursor}-01`)
    .subtract(1, 'month')
    .endOf('month');
  return (
    prevMonthEnd.valueOf() >=
    dayjs(planState.startDate).startOf('day').valueOf()
  );
});

/** 是否允许切换到下一月（无结束日期则不限；否则不能超过计划结束月份） */
const canGoNextMonth = computed(() => {
  if (!planState.endDate) {
    return true;
  }
  const nextMonthStart = dayjs(`${rewardState.monthCursor}-01`)
    .add(1, 'month')
    .startOf('month');
  return (
    nextMonthStart.valueOf() <= dayjs(planState.endDate).endOf('day').valueOf()
  );
});

/** 周视图标题（如「2025-01-13 至 2025-01-19」） */
const weekTitle = computed(() => {
  const start = dayjs(rewardState.weekCursor);
  const end = start.add(6, 'day');
  return `${start.format('YYYY-MM-DD')} 至 ${end.format('YYYY-MM-DD')}`;
});

/** 是否允许切换到上一周（不能早于计划开始日期） */
const canGoPrevWeek = computed(() => {
  const prevWeekEnd = dayjs(rewardState.weekCursor).subtract(1, 'day');
  return (
    prevWeekEnd.valueOf() >= dayjs(planState.startDate).startOf('day').valueOf()
  );
});

/** 是否允许切换到下一周（无结束日期则不限；否则不能超过计划结束日期） */
const canGoNextWeek = computed(() => {
  if (!planState.endDate) {
    return true;
  }
  const nextWeekStart = dayjs(rewardState.weekCursor).add(7, 'day');
  return (
    nextWeekStart.valueOf() <= dayjs(planState.endDate).endOf('day').valueOf()
  );
});

/** 周度奖励模式选项列表 */
const weeklyModeOptions = computed(() => getWeeklyRewardModeOptions());

/**
 * 周视图中当前选中日期对应的规则草稿
 * 根据 weeklyRewardMode 决定从 dateRules 还是 patternRules 中查找
 * 若不存在已有规则则返回空草稿（用于绑定编辑框）
 */
const selectedWeeklyRuleDraft = computed(() => {
  if (!weeklyDateSelection.value) {
    return null;
  }

  // date 模式：在具体日期规则中按 rewardDate 查找
  if (rewardState.weeklyRewardMode === 'date') {
    return (
      rewardState.dateRules.find(
        (item) => item.rewardDate === weeklyDateSelection.value,
      ) || {
        experience: undefined,
        localId: `date-${weeklyDateSelection.value}`,
        points: undefined,
        rewardDate: weeklyDateSelection.value,
      }
    );
  }

  // weekday 模式：在周期模式规则中按 WEEKDAY:key 查找
  return (
    findPatternRuleByKey(
      rewardState.patternRules,
      `WEEKDAY:${weeklySelectedWeekday.value}`,
    ) || {
      experience: undefined,
      key: `WEEKDAY:${weeklySelectedWeekday.value}`,
      patternType: 'WEEKDAY' as const,
      points: undefined,
      weekday: weeklySelectedWeekday.value,
    }
  );
});

/** 周度奖励模式的描述文案（用于提示用户当前奖励的作用范围） */
const currentWeeklyModeDescription = computed(() => {
  return rewardState.weeklyRewardMode === 'weekday'
    ? '当前奖励会应用到周期内每一天。'
    : '当前奖励只对这个自然日生效。';
});

/** 月度奖励模式选项列表（未选择日期时返回空） */
const monthlyModeOptions = computed(() => {
  if (!monthlyDateSelection.value) {
    return [];
  }
  return getMonthlyRewardModeOptions(monthlyDateSelection.value);
});

/**
 * 月视图中当前选中日期对应的规则草稿
 * 逻辑同 selectedWeeklyRuleDraft，但额外处理 month_last_day 模式
 */
const selectedMonthlyRuleDraft = computed(() => {
  if (!monthlyDateSelection.value) {
    return null;
  }

  // date 模式：在具体日期规则中查找
  if (rewardState.monthlyRewardMode === 'date') {
    return (
      rewardState.dateRules.find(
        (item) => item.rewardDate === monthlyDateSelection.value,
      ) || {
        experience: undefined,
        localId: `date-${monthlyDateSelection.value}`,
        points: undefined,
        rewardDate: monthlyDateSelection.value,
      }
    );
  }

  // month_day 或 month_last_day 模式：在周期模式规则中查找
  const selectedDate = dayjs(monthlyDateSelection.value);
  const key =
    rewardState.monthlyRewardMode === 'month_last_day'
      ? 'MONTH_LAST_DAY'
      : `MONTH_DAY:${selectedDate.date()}`;

  return (
    findPatternRuleByKey(rewardState.patternRules, key) ||
    ({
      experience: undefined,
      key,
      monthDay:
        rewardState.monthlyRewardMode === 'month_day'
          ? selectedDate.date()
          : undefined,
      patternType:
        rewardState.monthlyRewardMode === 'month_last_day'
          ? 'MONTH_LAST_DAY'
          : 'MONTH_DAY',
      points: undefined,
    } satisfies CheckInPatternRuleDraft)
  );
});

/** 月度奖励模式的描述文案 */
const currentMonthlyModeDescription = computed(() => {
  switch (rewardState.monthlyRewardMode) {
    case 'month_day': {
      return '当前奖励会应用到周期内每个月的同一天。';
    }
    case 'month_last_day': {
      return '当前奖励会应用到周期内每个月最后一天。';
    }
    default: {
      return '当前奖励只对这个自然日生效。';
    }
  }
});

// ======================== 监听器 ========================

/** 周光标变化时重新对齐选中日期和奖励模式 */
watch(
  () => rewardState.weekCursor,
  () => {
    ensureWeeklyDateSelection();
    syncSelectedWeeklyMode();
  },
);

/** 月光标变化时重新对齐选中日期和奖励模式 */
watch(
  () => rewardState.monthCursor,
  () => {
    ensureMonthlyDateSelection();
    syncSelectedMonthlyMode();
  },
);

// ======================== 初始化与重置 ========================

/**
 * 弹窗打开时的初始化入口
 * 新增模式：使用默认值填充表单
 * 编辑模式：请求 API 获取详情并映射为编辑器状态
 */
async function initializeModal() {
  resetModalState();

  // 新增模式：直接使用默认值
  if (!sharedData.value.row?.id) {
    await planFormApi.setValues(getPlanFormDisplayValues(planState));
    syncPlanDateSchema(planState.startDate, planState.cycleType);
    return;
  }

  // 编辑模式：拉取详情并填充
  loading.value = true;
  try {
    const detail = await checkInPlanDetailApi({ id: sharedData.value.row.id });
    const editorState = mapPlanDetailToEditorState(detail);
    Object.assign(planState, editorState.plan);
    Object.assign(rewardState, editorState.reward);
    rewardConfigExists.value = editorState.rewardConfigExists;
    await planFormApi.setValues(getPlanFormDisplayValues(editorState.plan));
    syncPlanDateSchema(editorState.plan.startDate, editorState.plan.cycleType);
    syncSelections();
  } finally {
    loading.value = false;
  }
}

/** 重置所有状态到初始值（弹窗打开 / 关闭时调用） */
function resetModalState() {
  Object.assign(planState, createDefaultPlanFormModel());
  Object.assign(rewardState, createDefaultRewardFormModel(planState.startDate));
  rewardConfigExists.value = false;
  currentStep.value = 1;
  weeklySelectedWeekday.value = 1;
  weeklyDateSelection.value = '';
  monthlyDateSelection.value = '';
  syncPlanDateSchema(planState.startDate, planState.cycleType);
}

/**
 * 同步所有日历选中状态和奖励模式
 * 将 weekCursor/monthCursor 钳位到合法范围后重新确定选中日期和模式
 */
function syncSelections() {
  rewardState.weekCursor = clampWeekCursor(rewardState.weekCursor);
  rewardState.monthCursor = clampMonthCursor(rewardState.monthCursor);
  ensureWeeklyDateSelection();
  if (!weeklySelectedWeekday.value) {
    weeklySelectedWeekday.value = 1;
  }
  syncSelectedWeeklyMode();
  ensureMonthlyDateSelection();
  syncSelectedMonthlyMode();
}

// ======================== 步骤流转与提交 ========================

/**
 * 「下一步」按钮处理：校验基础信息 → 通过后进入奖励配置步骤
 */
async function handleNextStep() {
  const validationMessage = await validateAndSyncPlanState();
  if (validationMessage) {
    return;
  }

  rewardState.monthCursor = clampMonthCursor(rewardState.monthCursor);
  currentStep.value = 2;
  syncSelections();
}

/**
 * 校验并同步计划表单状态
 * 先做表单级校验（必填、格式等），再做业务规则校验（周期约束等）
 * 返回错误信息或 null（表示通过）
 */
async function validateAndSyncPlanState() {
  const { valid } = await planFormApi.validate();
  if (!valid) {
    return 'invalid';
  }

  Object.assign(
    planState,
    normalizePlanFormValues(await planFormApi.getValues()),
  );

  const validationMessage = getPlanBusinessRuleError(planState);
  if (validationMessage) {
    useMessage.warning(validationMessage);
    return validationMessage;
  }

  return null;
}

/**
 * 「保存」按钮处理（仅保存计划基础信息，不进入奖励配置步骤）
 * 用于只想快速保存基本信息的场景
 */
async function handleSavePlanOnly() {
  const validationMessage = await validateAndSyncPlanState();
  if (validationMessage) {
    return;
  }

  submitting.value = true;
  try {
    const payload = buildPlanSubmitPayload(planState);
    if (planState.id) {
      await checkInPlanUpdateApi(
        payload as Parameters<typeof checkInPlanUpdateApi>[0],
      );
    } else {
      const created = await checkInPlanCreateApi(
        payload as Parameters<typeof checkInPlanCreateApi>[0],
      );
      planState.id = (created as { id: number }).id;
    }
    useMessage.success('保存成功');
    await sharedData.value.onSaved?.();
    modalApi.close();
  } finally {
    submitting.value = false;
  }
}

/**
 * 主提交入口（「下一步」/「完成并保存」共用）
 * Step 1 时执行「下一步」逻辑；
 * Step 2 时依次校验计划 → 校验奖励 → 提交计划 → 提交奖励配置
 */
async function handleSubmit() {
  if (currentStep.value === 1) {
    await handleNextStep();
    return;
  }

  // Step 2：先重新同步最新表单值，再执行完整校验
  Object.assign(
    planState,
    normalizePlanFormValues(await planFormApi.getValues()),
  );

  const planValidationMessage = getPlanBusinessRuleError(planState);
  if (planValidationMessage) {
    currentStep.value = 1; // 计划有误则回退到 Step 1 让用户修改
    useMessage.warning(planValidationMessage);
    return;
  }

  const rewardValidationMessage = getRewardBusinessRuleError(
    planState,
    rewardState,
  );
  if (rewardValidationMessage) {
    useMessage.warning(rewardValidationMessage);
    return;
  }

  submitting.value = true;
  try {
    // 将计划基础信息与奖励配置合并，通过计划接口一次性提交
    const payload = buildPlanWithRewardPayload({
      cycleType: planState.cycleType,
      plan: planState,
      reward: rewardState,
    });

    const isEdit = !!planState.id;
    void (isEdit
      ? checkInPlanUpdateApi(
          payload as Parameters<typeof checkInPlanUpdateApi>[0],
        )
      : checkInPlanCreateApi(
          payload as Parameters<typeof checkInPlanCreateApi>[0],
        ));

    useMessage.success('保存成功');
    await sharedData.value.onSaved?.();
    modalApi.close();
  } finally {
    submitting.value = false;
  }
}

// ======================== 导航操作 ========================

/** 关闭弹窗 */
function handleClose() {
  modalApi.close();
}

/** 从奖励配置步骤返回基础信息步骤 */
function goBackToPlanStep() {
  void planFormApi.setValues(getPlanFormDisplayValues(planState));
  currentStep.value = 1;
}

// ======================== Schema 动态更新 ========================

/**
 * 根据周期类型动态更新开始/结束日期选择器的 Schema
 * 周计划：type=date, valueFormat=YYYY-MM-DD, 禁用非周一/非周日
 * 月计划：type=month, valueFormat=YYYY-MM, 禁用早于开始月的月份
 */
function syncPlanDateSchema(
  startDate?: string,
  cycleType?: 'monthly' | 'weekly',
) {
  planState.cycleType = cycleType || planState.cycleType;
  planState.startDate = startDate || planState.startDate;
  const isMonthly = planState.cycleType === 'monthly';

  planFormApi.updateSchema([
    {
      componentProps: {
        class: '!w-full',
        disabledDate: planDateDisableHandlers.isStartDateDisabled,
        placeholder: isMonthly ? '请选择开始月份' : '请选择开始日期',
        type: isMonthly ? 'month' : 'date',
        valueFormat: isMonthly ? 'YYYY-MM' : 'YYYY-MM-DD',
      },
      fieldName: 'startDate',
    },
    {
      componentProps: {
        class: '!w-full',
        disabledDate: planDateDisableHandlers.isEndDateDisabled,
        placeholder: isMonthly ? '请选择结束月份' : '请选择结束日期',
        type: isMonthly ? 'month' : 'date',
        valueFormat: isMonthly ? 'YYYY-MM' : 'YYYY-MM-DD',
      },
      fieldName: 'endDate',
    },
  ]);
}

// ======================== 周视图交互 ========================

/** 选中周视图中的某个格子，同时记录日期和星期几 */
function selectWeekCell(date: string, weekday: number) {
  weeklyDateSelection.value = date;
  weeklySelectedWeekday.value = weekday;
  syncSelectedWeeklyMode();
}

/** 切换周度奖励的生效模式（date ↔ weekday） */
function updateWeeklyRuleMode(value: 'date' | 'weekday') {
  rewardState.weeklyRewardMode = value;
}

/**
 * 更新周视图中当前选中日期的奖励值
 * 根据 weeklyRewardMode 决定写入 dateRules 还是 patternRules
 */
function updateSelectedWeeklyReward(
  field: 'experience' | 'points',
  value?: number,
) {
  if (!selectedWeeklyRuleDraft.value || !weeklyDateSelection.value) {
    return;
  }

  if (rewardState.weeklyRewardMode === 'date') {
    if (!('rewardDate' in selectedWeeklyRuleDraft.value)) {
      return;
    }
    rewardState.dateRules = upsertDateRule(rewardState.dateRules, {
      ...selectedWeeklyRuleDraft.value,
      [field]: normalizeRewardInput(value),
    });
    return;
  }

  if (!('key' in selectedWeeklyRuleDraft.value)) {
    return;
  }
  rewardState.patternRules = upsertPatternRule(rewardState.patternRules, {
    ...selectedWeeklyRuleDraft.value,
    [field]: normalizeRewardInput(value),
  });
}

/** 清除周视图中当前选中日期的奖励规则 */
function removeSelectedWeeklyRule() {
  if (!selectedWeeklyRuleDraft.value || !weeklyDateSelection.value) {
    return;
  }

  if (rewardState.weeklyRewardMode === 'date') {
    rewardState.dateRules = removeDateRule(
      rewardState.dateRules,
      weeklyDateSelection.value,
    );
    return;
  }

  if (!('key' in selectedWeeklyRuleDraft.value)) {
    return;
  }
  rewardState.patternRules = removePatternRule(
    rewardState.patternRules,
    selectedWeeklyRuleDraft.value.key,
  );
}

// ======================== 月视图交互 ========================

/** 选中月视图中的某个格子 */
function selectMonthCell(date: string) {
  monthlyDateSelection.value = date;
  syncSelectedMonthlyMode();
}

/** 切换月度奖励的生效模式（date ↔ month_day） */
function updateMonthlyRuleMode(value: 'date' | 'month_day') {
  rewardState.monthlyRewardMode = value;
}

/**
 * 更新月视图中当前选中日期的奖励值
 * 根据 monthlyRewardMode 决定写入 dateRules 还是 patternRules
 */
function updateSelectedMonthlyReward(
  field: 'experience' | 'points',
  value?: number,
) {
  if (!selectedMonthlyRuleDraft.value || !monthlyDateSelection.value) {
    return;
  }

  if (rewardState.monthlyRewardMode === 'date') {
    if (!('rewardDate' in selectedMonthlyRuleDraft.value)) {
      return;
    }
    rewardState.dateRules = upsertDateRule(rewardState.dateRules, {
      ...selectedMonthlyRuleDraft.value,
      [field]: normalizeRewardInput(value),
    });
    return;
  }

  if (!('key' in selectedMonthlyRuleDraft.value)) {
    return;
  }
  rewardState.patternRules = upsertPatternRule(rewardState.patternRules, {
    ...selectedMonthlyRuleDraft.value,
    [field]: normalizeRewardInput(value),
  });
}

/** 清除月视图中当前选中日期的奖励规则 */
function removeSelectedMonthlyRule() {
  if (!selectedMonthlyRuleDraft.value || !monthlyDateSelection.value) {
    return;
  }

  if (rewardState.monthlyRewardMode === 'date') {
    rewardState.dateRules = removeDateRule(
      rewardState.dateRules,
      monthlyDateSelection.value,
    );
    return;
  }

  if (!('key' in selectedMonthlyRuleDraft.value)) {
    return;
  }
  rewardState.patternRules = removePatternRule(
    rewardState.patternRules,
    selectedMonthlyRuleDraft.value.key,
  );
}

/** 更新月末规则的奖励值 */
function updateMonthLastDayReward(
  field: 'experience' | 'points',
  value?: number,
) {
  rewardState.patternRules = upsertPatternRule(rewardState.patternRules, {
    ...monthLastDayRule.value,
    [field]: normalizeRewardInput(value),
  });
}

/** 清除月末规则 */
function removeMonthLastDayRule() {
  rewardState.patternRules = removePatternRule(
    rewardState.patternRules,
    monthLastDayRule.value.key,
  );
}

// ======================== 连续奖励交互 ========================

/** 新增一条连续签到奖励规则（追加到列表末尾） */
function addStreakRule() {
  rewardState.streakRules = [
    ...rewardState.streakRules,
    {
      experience: undefined,
      // 使用时间戳+随机数生成唯一 localId
      localId: `streak-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      points: undefined,
      repeatable: false,
      ruleCode: `STREAK_${rewardState.streakRules.length + 1}`,
      status: 1,
      streakDays: undefined,
    },
  ];
}

/** 按 localId 删除一条连续签到奖励规则 */
function removeStreakRule(localId: string) {
  rewardState.streakRules = rewardState.streakRules.filter(
    (item) => item.localId !== localId,
  );
}

/** 更新某条连续签到规则的指定字段 */
function updateStreakRule(
  localId: string,
  field:
    | 'experience'
    | 'points'
    | 'repeatable'
    | 'ruleCode'
    | 'status'
    | 'streakDays',
  value: boolean | number | string | undefined,
) {
  rewardState.streakRules = rewardState.streakRules.map((item) => {
    if (item.localId !== localId) {
      return item;
    }

    let nextValue = value;
    if (field === 'experience' || field === 'points') {
      nextValue = normalizeRewardInput(value as number | undefined);
    } else if (field === 'streakDays') {
      nextValue = normalizeCountInput(value as number | undefined);
    }

    return {
      ...item,
      [field]: nextValue,
    };
  });
}

// ======================== 日历导航 ========================

/** 切换到上一月（带边界钳位） */
function goPrevMonth() {
  if (!canGoPrevMonth.value) {
    return;
  }
  rewardState.monthCursor = clampMonthCursor(
    dayjs(`${rewardState.monthCursor}-01`)
      .subtract(1, 'month')
      .format('YYYY-MM'),
  );
}

/** 切换到下一月（带边界钳位） */
function goNextMonth() {
  if (!canGoNextMonth.value) {
    return;
  }
  rewardState.monthCursor = clampMonthCursor(
    dayjs(`${rewardState.monthCursor}-01`).add(1, 'month').format('YYYY-MM'),
  );
}

/** 切换到上一周（带边界钳位） */
function goPrevWeek() {
  if (!canGoPrevWeek.value) {
    return;
  }
  rewardState.weekCursor = clampWeekCursor(
    dayjs(rewardState.weekCursor).subtract(7, 'day').format('YYYY-MM-DD'),
  );
}

/** 切换到下一周（带边界钳位） */
function goNextWeek() {
  if (!canGoNextWeek.value) {
    return;
  }
  rewardState.weekCursor = clampWeekCursor(
    dayjs(rewardState.weekCursor).add(7, 'day').format('YYYY-MM-DD'),
  );
}

// ======================== 选中状态同步工具 ========================

/**
 * 确保月视图的选中日期落在有效格子上
 * 优先保持原选中日期；若已失效则回退到当月第一个有效日期
 */
function ensureMonthlyDateSelection() {
  if (planState.cycleType !== 'monthly') {
    return;
  }

  const targetCell =
    monthlyCalendarCells.value.find(
      (item) =>
        item.date === monthlyDateSelection.value &&
        !item.isDisabled &&
        item.isCurrentMonth,
    ) ||
    monthlyCalendarCells.value.find(
      (item) => !item.isDisabled && item.isCurrentMonth,
    );

  monthlyDateSelection.value = targetCell?.date || '';
}

/** 根据当前选中日期已有的规则类型，自动设置月度奖励模式 */
function syncSelectedMonthlyMode() {
  if (!monthlyDateSelection.value) {
    rewardState.monthlyRewardMode = 'date';
    return;
  }

  rewardState.monthlyRewardMode = resolveMonthlyRewardMode({
    dateRules: rewardState.dateRules,
    patternRules: rewardState.patternRules,
    selectedDate: monthlyDateSelection.value,
  });
}

/**
 * 确保周视图的选中日期落在有效格子上
 * 优先保持原选中日期；若已失效则回退到第一个有效日期
 */
function ensureWeeklyDateSelection() {
  if (planState.cycleType !== 'weekly') {
    return;
  }

  const targetCell =
    weekCalendarCells.value.find(
      (item) => !item.isDisabled && item.date === weeklyDateSelection.value,
    ) || weekCalendarCells.value.find((item) => !item.isDisabled);

  weeklyDateSelection.value = targetCell?.date || '';
  if (targetCell) {
    weeklySelectedWeekday.value = targetCell.weekday;
  }
}

/** 根据当前选中日期已有的规则类型，自动设置周度奖励模式 */
function syncSelectedWeeklyMode() {
  if (!weeklyDateSelection.value) {
    rewardState.weeklyRewardMode = 'date';
    return;
  }

  rewardState.weeklyRewardMode = resolveWeeklyRewardMode({
    dateRules: rewardState.dateRules,
    patternRules: rewardState.patternRules,
    selectedDate: weeklyDateSelection.value,
  });
}

// ======================== 工具函数 ========================

/**
 * 将月份光标钳位到计划有效范围内
 * 不能早于开始月份，不能晚于结束月份（如有）
 */
function clampMonthCursor(value: string) {
  const startMonth = formatMonthCursor(planState.startDate);
  const endMonth = planState.endDate
    ? formatMonthCursor(planState.endDate)
    : null;
  const monthCursor = formatMonthCursor(`${value}-01`);

  if (monthCursor < startMonth) {
    return startMonth;
  }
  if (endMonth && monthCursor > endMonth) {
    return endMonth;
  }
  return monthCursor;
}

/**
 * 将周光标钳位到计划有效范围内
 * 归一到所在周周一后判断是否超出起止日期边界
 */
function clampWeekCursor(value: string) {
  const weekCursor = dayjs(value);
  const weekStart = weekCursor.subtract(
    getMondayBasedWeekday(weekCursor) - 1,
    'day',
  );
  const planStart = dayjs(planState.startDate).startOf('day');
  const planEnd = planState.endDate
    ? dayjs(planState.endDate).endOf('day')
    : null;

  if (weekStart.valueOf() < planStart.valueOf()) {
    return planStart
      .subtract(getMondayBasedWeekday(planStart) - 1, 'day')
      .format('YYYY-MM-DD');
  }

  if (planEnd && weekStart.valueOf() > planEnd.valueOf()) {
    return planEnd
      .subtract(getMondayBasedWeekday(planEnd) - 1, 'day')
      .format('YYYY-MM-DD');
  }

  return weekStart.format('YYYY-MM-DD');
}

/** 将 dayjs 星期转为周一制（与模型层 toMondayBasedWeekday 功能相同，Vue 层本地副本） */
function getMondayBasedWeekday(value: Dayjs) {
  const weekday = value.day();
  return weekday === 0 ? 7 : weekday;
}

/** 规范化奖励输入值：仅保留大于 0 的数值，否则返回 undefined */
function normalizeRewardInput(value?: number) {
  return value && value > 0 ? Number(value) : undefined;
}

/** 规范化数量输入值：仅保留大于 0 的数值，否则返回 undefined */
function normalizeCountInput(value?: number) {
  return value && value > 0 ? Number(value) : undefined;
}
</script>

<template>
  <Modal class="top-[4vh] w-[1240px]">
    <div v-loading="loading || submitting" class="space-y-5">
      <div class="rounded-lg border border-slate-200 bg-slate-50/80 p-5">
        <div class="flex items-center justify-between gap-4">
          <div>
            <div class="text-lg font-semibold text-slate-900">签到计划配置</div>
            <div class="mt-1 text-sm text-slate-500">
              基础信息与奖励配置分步编辑，最终保存时按「计划 -> 奖励」顺序提交。
            </div>
          </div>
          <el-steps
            :active="currentStep"
            finish-status="success"
            simple
            class="max-w-[460px] flex-1"
          >
            <el-step title="基础信息" />
            <el-step title="奖励配置" />
          </el-steps>
        </div>
      </div>

      <div
        v-show="currentStep === 1"
        class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      >
        <PlanForm />
      </div>

      <div v-show="currentStep === 2" class="space-y-5">
        <div
          :class="
            planState.cycleType === 'monthly'
              ? 'grid gap-4 lg:grid-cols-2'
              : 'grid gap-4'
          "
        >
          <div
            class="rounded-lg border border-sky-200 bg-sky-50/80 p-5 shadow-sm"
          >
            <div>
              <div>
                <div class="text-base font-semibold text-slate-900">
                  默认基础奖励
                </div>
                <div class="mt-1 text-sm text-slate-600">
                  周期规则和具体日期都未命中时，默认发放这里的奖励。
                </div>
              </div>
            </div>
            <div class="mt-4 grid gap-3 md:grid-cols-2">
              <el-input-number
                :model-value="rewardState.baseRewardPoints"
                class="!w-full"
                :min="0"
                placeholder="默认积分"
                @update:model-value="
                  (value) =>
                    (rewardState.baseRewardPoints = normalizeRewardInput(
                      value as number | undefined,
                    ))
                "
              />
              <el-input-number
                :model-value="rewardState.baseRewardExperience"
                class="!w-full"
                :min="0"
                placeholder="默认经验"
                @update:model-value="
                  (value) =>
                    (rewardState.baseRewardExperience = normalizeRewardInput(
                      value as number | undefined,
                    ))
                "
              />
            </div>
          </div>

          <div
            v-if="planState.cycleType === 'monthly'"
            class="rounded-lg border border-amber-200 bg-amber-50/70 p-5 shadow-sm"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <div class="text-base font-semibold text-slate-900">
                  每个月最后一天奖励
                </div>
                <div class="mt-1 text-sm text-slate-600">
                  独立周期规则，不与“当前日期”或“每月同日”混用。
                </div>
              </div>
            </div>
            <div class="mt-4 grid gap-3 md:grid-cols-2">
              <el-input-number
                :model-value="monthLastDayRule.points"
                class="!w-full"
                :min="0"
                placeholder="奖励积分"
                @update:model-value="
                  (value) =>
                    updateMonthLastDayReward(
                      'points',
                      value as number | undefined,
                    )
                "
              />
              <el-input-number
                :model-value="monthLastDayRule.experience"
                class="!w-full"
                :min="0"
                placeholder="奖励经验"
                @update:model-value="
                  (value) =>
                    updateMonthLastDayReward(
                      'experience',
                      value as number | undefined,
                    )
                "
              />
            </div>
            <div class="mt-4 flex flex-wrap items-center gap-2">
              <el-button link type="danger" @click="removeMonthLastDayRule">
                清除月末规则
              </el-button>
            </div>
          </div>
        </div>

        <div class="space-y-5">
          <div class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div class="mb-4 flex items-center justify-between gap-3">
              <div>
                <div class="text-base font-semibold text-slate-900">
                  基础奖励规则
                </div>
                <div class="mt-1 text-sm text-slate-500">
                  {{
                    planState.cycleType === 'weekly'
                      ? '周计划支持每周同日奖励，也支持针对某个具体日期设置例外奖励。'
                      : '月计划支持每月同日奖励、具体日期例外奖励，并单独配置每个月最后一天奖励。'
                  }}
                </div>
              </div>
            </div>

            <template v-if="planState.cycleType === 'weekly'">
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

              <div
                class="grid gap-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7"
              >
                <button
                  v-for="cell in weekCalendarCells"
                  :key="cell.date"
                  class="rounded-lg border px-4 py-4 text-left transition"
                  :class="
                    weeklyDateSelection === cell.date
                      ? 'border-sky-300 bg-sky-50 shadow-sm'
                      : 'border-slate-200 bg-slate-50/70 hover:border-sky-200 hover:bg-white'
                  "
                  type="button"
                  @click="selectWeekCell(cell.date, cell.weekday)"
                >
                  <div class="text-sm font-semibold text-slate-900">
                    {{ cell.dayLabel }}
                  </div>
                  <div class="mt-2 text-xs text-slate-500">
                    {{ cell.rewardSummary }}
                  </div>
                </button>
              </div>

              <div
                v-if="selectedWeeklyRuleDraft"
                class="mt-5 rounded-lg border border-sky-200 bg-sky-50/60 p-4"
              >
                <div class="mb-3">
                  <div class="text-sm font-semibold text-slate-900">
                    当前编辑：{{ weeklyDateSelection }}
                  </div>
                  <div class="mt-1 text-xs text-slate-500">
                    {{ currentWeeklyModeDescription }}
                  </div>
                </div>
                <el-radio-group
                  :model-value="rewardState.weeklyRewardMode"
                  class="mb-4"
                  size="large"
                  @update:model-value="
                    (value) => updateWeeklyRuleMode(value as 'date' | 'weekday')
                  "
                >
                  <el-radio-button
                    v-for="item in weeklyModeOptions"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </el-radio-button>
                </el-radio-group>
                <div class="grid gap-3 md:grid-cols-2">
                  <el-input-number
                    :model-value="selectedWeeklyRuleDraft.points"
                    class="!w-full"
                    :min="0"
                    placeholder="奖励积分"
                    @update:model-value="
                      (value) =>
                        updateSelectedWeeklyReward(
                          'points',
                          value as number | undefined,
                        )
                    "
                  />
                  <el-input-number
                    :model-value="selectedWeeklyRuleDraft.experience"
                    class="!w-full"
                    :min="0"
                    placeholder="奖励经验"
                    @update:model-value="
                      (value) =>
                        updateSelectedWeeklyReward(
                          'experience',
                          value as number | undefined,
                        )
                    "
                  />
                </div>
                <div class="mt-4 flex flex-wrap items-center gap-2">
                  <el-button
                    link
                    type="danger"
                    @click="removeSelectedWeeklyRule"
                  >
                    清除当前规则
                  </el-button>
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
                <button
                  v-for="cell in monthlyCalendarCells"
                  :key="cell.date"
                  class="min-h-[92px] rounded-lg border px-3 py-3 text-left transition"
                  :class="[
                    cell.isDisabled
                      ? 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300'
                      : 'border-slate-200 bg-white hover:border-sky-200 hover:bg-sky-50/50',
                    monthlyDateSelection === cell.date && !cell.isDisabled
                      ? '!border-sky-300 !bg-sky-50 shadow-sm'
                      : '',
                  ]"
                  type="button"
                  @click="!cell.isDisabled && selectMonthCell(cell.date)"
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
                </button>
              </div>
            </template>
          </div>

          <div
            v-if="planState.cycleType === 'monthly' && selectedMonthlyRuleDraft"
            class="rounded-lg border border-sky-200 bg-sky-50/60 p-4"
          >
            <div class="mb-3">
              <div class="text-sm font-semibold text-slate-900">
                当前编辑：{{ monthlyDateSelection }}
              </div>
              <div class="mt-1 text-xs text-slate-500">
                {{ currentMonthlyModeDescription }}
              </div>
            </div>
            <el-radio-group
              :model-value="rewardState.monthlyRewardMode"
              class="mb-4"
              size="large"
              @update:model-value="
                (value) => updateMonthlyRuleMode(value as 'date' | 'month_day')
              "
            >
              <el-radio-button
                v-for="item in monthlyModeOptions"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
            <div class="grid gap-3 md:grid-cols-2">
              <el-input-number
                :model-value="selectedMonthlyRuleDraft.points"
                class="!w-full"
                :min="0"
                placeholder="奖励积分"
                @update:model-value="
                  (value) =>
                    updateSelectedMonthlyReward(
                      'points',
                      value as number | undefined,
                    )
                "
              />
              <el-input-number
                :model-value="selectedMonthlyRuleDraft.experience"
                class="!w-full"
                :min="0"
                placeholder="奖励经验"
                @update:model-value="
                  (value) =>
                    updateSelectedMonthlyReward(
                      'experience',
                      value as number | undefined,
                    )
                "
              />
            </div>
            <div class="mt-4 flex flex-wrap items-center gap-2">
              <el-button link type="danger" @click="removeSelectedMonthlyRule">
                清除当前规则
              </el-button>
            </div>
          </div>

          <div class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div class="mb-4 flex items-center justify-between gap-3">
              <div>
                <div class="text-base font-semibold text-slate-900">
                  连续奖励
                </div>
                <div class="mt-1 text-sm text-slate-500">
                  按连续签到天数配置额外奖励，支持原地新增和删除。
                </div>
              </div>
              <el-button type="primary" @click="addStreakRule">
                新增连续奖励
              </el-button>
            </div>

            <div
              v-if="rewardState.streakRules.length === 0"
              class="rounded-lg border border-dashed border-slate-200 px-4 py-10 text-center text-sm text-slate-400"
            >
              暂未配置连续奖励
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="rule in rewardState.streakRules"
                :key="rule.localId"
                class="rounded-lg border border-amber-200 bg-amber-50/60 p-4"
              >
                <div class="mb-4 flex items-center justify-between gap-3">
                  <div class="text-sm font-semibold text-slate-900">
                    {{
                      rule.streakDays
                        ? `连续签到 ${rule.streakDays} 天`
                        : '未填写连续天数'
                    }}
                  </div>
                  <el-button
                    link
                    type="danger"
                    @click="removeStreakRule(rule.localId)"
                  >
                    删除
                  </el-button>
                </div>
                <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  <el-input-number
                    :model-value="rule.streakDays"
                    class="!w-full"
                    :min="1"
                    placeholder="连续天数"
                    @update:model-value="
                      (value) =>
                        updateStreakRule(
                          rule.localId,
                          'streakDays',
                          value as number | undefined,
                        )
                    "
                  />
                  <el-input-number
                    :model-value="rule.points"
                    class="!w-full"
                    :min="0"
                    placeholder="奖励积分"
                    @update:model-value="
                      (value) =>
                        updateStreakRule(
                          rule.localId,
                          'points',
                          value as number | undefined,
                        )
                    "
                  />
                  <el-input-number
                    :model-value="rule.experience"
                    class="!w-full"
                    :min="0"
                    placeholder="奖励经验"
                    @update:model-value="
                      (value) =>
                        updateStreakRule(
                          rule.localId,
                          'experience',
                          value as number | undefined,
                        )
                    "
                  />
                  <el-input
                    :model-value="rule.ruleCode"
                    placeholder="规则编码"
                    @update:model-value="
                      (value) =>
                        updateStreakRule(
                          rule.localId,
                          'ruleCode',
                          value as string,
                        )
                    "
                  />
                  <el-select
                    :model-value="rule.status"
                    class="!w-full"
                    @update:model-value="
                      (value) =>
                        updateStreakRule(
                          rule.localId,
                          'status',
                          value as number,
                        )
                    "
                  >
                    <el-option label="已启用" :value="1" />
                    <el-option label="已停用" :value="0" />
                  </el-select>
                  <el-radio-group
                    :model-value="rule.repeatable"
                    @update:model-value="
                      (value) =>
                        updateStreakRule(
                          rule.localId,
                          'repeatable',
                          value as boolean,
                        )
                    "
                  >
                    <el-radio :value="false">仅领取一次</el-radio>
                    <el-radio :value="true">可重复领取</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-between gap-4">
        <div class="text-xs text-slate-500">
          {{
            currentStep === 1
              ? '先完成基础信息校验，再进入奖励配置。'
              : '点击完成后，将依次提交计划接口和奖励配置接口。'
          }}
        </div>
        <div class="flex gap-2">
          <el-button
            @click="currentStep === 1 ? handleClose() : goBackToPlanStep()"
          >
            {{ currentStep === 1 ? '取消' : '上一步' }}
          </el-button>
          <el-button
            v-if="currentStep === 1"
            :loading="submitting"
            @click="handleSavePlanOnly"
          >
            保存
          </el-button>
          <el-button :loading="submitting" type="primary" @click="handleSubmit">
            {{ currentStep === 1 ? '下一步' : '完成并保存' }}
          </el-button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<style scoped>
:deep(.el-step.is-simple) {
  background: transparent;
}
</style>
