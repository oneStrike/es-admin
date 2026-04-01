<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus';

import type {
  CheckInPlanFormModel,
  CheckInPlanRuleFormItem,
} from './model/shared';

import type {
  CheckInPlanCreateRequest,
  CheckInPlanUpdateRequest,
} from '#/api/types';

import { useVbenModal } from '@vben/common-ui';

import { useMessage } from '#/hooks/useFeedback';
import { dayjs } from '#/utils';

import {
  buildPlanSubmitPayload,
  checkInCycleTypeOptions,
  checkInPlanStatusOptions,
  checkInRuleStatusOptions,
  createDefaultPlanFormModel,
  createDefaultRuleFormItem,
  formatRewardSummary,
} from './model/shared';

defineOptions({
  name: 'CheckInPlanModal',
});

type ModalData = {
  onSubmit?: (
    payload: CheckInPlanCreateRequest | CheckInPlanUpdateRequest,
  ) => Promise<void>;
  record?: CheckInPlanFormModel;
  title?: string;
};

const formRef = ref<FormInstance>();
const sharedData = ref<ModalData>();

const formModel = reactive<CheckInPlanFormModel>(createDefaultPlanFormModel());

const formRules: FormRules<CheckInPlanFormModel> = {
  allowMakeupCountPerCycle: [
    {
      message: '请输入每周期补签次数',
      required: true,
      trigger: 'blur',
    },
  ],
  cycleAnchorDate: [
    {
      message: '请选择周期锚点日期',
      required: true,
      trigger: 'change',
    },
  ],
  cycleType: [
    {
      message: '请选择周期类型',
      required: true,
      trigger: 'change',
    },
  ],
  planCode: [
    {
      message: '请输入计划编码',
      required: true,
      trigger: 'blur',
    },
  ],
  planName: [
    {
      message: '请输入计划名称',
      required: true,
      trigger: 'blur',
    },
  ],
  status: [
    {
      message: '请选择计划状态',
      required: true,
      trigger: 'change',
    },
  ],
  timezone: [
    {
      message: '请填写计划时区',
      required: true,
      trigger: 'blur',
    },
  ],
};

const modalTitle = computed(() => {
  return sharedData.value?.title || (formModel.id ? '编辑签到计划' : '新增签到计划');
});

const baseRewardSummary = computed(() => {
  return formatRewardSummary({
    experience: formModel.baseRewardExperience,
    points: formModel.baseRewardPoints,
  });
});

const [Modal, modalApi] = useVbenModal({
  onConfirm: async () => {
    await submitPlan();
  },
  onOpenChange(isOpen) {
    if (!isOpen) {
      return;
    }
    sharedData.value = modalApi.getData<ModalData>();
    resetForm(sharedData.value?.record);
    modalApi.setState({
      title: modalTitle.value,
    });
  },
});

function resetForm(record?: CheckInPlanFormModel) {
  const nextModel = cloneFormModel(record || createDefaultPlanFormModel());

  Object.assign(formModel, nextModel);
  formModel.streakRewardRules = nextModel.streakRewardRules;

  nextTick(() => {
    formRef.value?.clearValidate();
  });
}

function cloneFormModel(record: CheckInPlanFormModel): CheckInPlanFormModel {
  return {
    ...record,
    streakRewardRules: (record.streakRewardRules || []).map(rule => ({
      ...rule,
      localId: rule.localId || createDefaultRuleFormItem().localId,
    })),
  };
}

function addRule() {
  formModel.streakRewardRules.push(
    createDefaultRuleFormItem(formModel.streakRewardRules.length + 1),
  );
}

function removeRule(localId: string) {
  formModel.streakRewardRules = formModel.streakRewardRules.filter(
    item => item.localId !== localId,
  );
}

function copyRule(rule: CheckInPlanRuleFormItem) {
  formModel.streakRewardRules.push({
    ...rule,
    localId: createDefaultRuleFormItem().localId,
    ruleCode: `${rule.ruleCode}-copy`,
  });
}

async function submitPlan() {
  const formInstance = formRef.value;
  if (!formInstance) {
    return;
  }

  await formInstance.validate();
  validateBusinessRules();

  modalApi.lock();
  try {
    await sharedData.value?.onSubmit?.(buildPlanSubmitPayload(formModel));
    modalApi.close();
  } finally {
    modalApi.unlock();
  }
}

function validateBusinessRules() {
  if (
    formModel.publishStartAt &&
    formModel.publishEndAt &&
    dayjs(formModel.publishEndAt).valueOf()
      <= dayjs(formModel.publishStartAt).valueOf()
  ) {
    useMessage.warning('发布时间结束时间必须晚于开始时间');
    throw new Error('invalid publish window');
  }

  const ruleCodes = new Set<string>();
  const streakDays = new Set<number>();

  for (const [index, rule] of formModel.streakRewardRules.entries()) {
    const rowNumber = index + 1;
    const ruleCode = rule.ruleCode?.trim?.();
    const normalizedStreakDays = Number(rule.streakDays ?? 0);
    const rewardPoints = Number(rule.rewardPoints ?? 0);
    const rewardExperience = Number(rule.rewardExperience ?? 0);
    const sortOrder = Number(rule.sortOrder ?? normalizedStreakDays);

    if (!ruleCode) {
      useMessage.warning(`请填写第 ${rowNumber} 条连续奖励规则编码`);
      throw new Error('missing rule code');
    }

    if (!Number.isInteger(normalizedStreakDays) || normalizedStreakDays <= 0) {
      useMessage.warning(`第 ${rowNumber} 条连续奖励的阈值天数必须为正整数`);
      throw new Error('invalid streak days');
    }

    if (ruleCodes.has(ruleCode)) {
      useMessage.warning(`连续奖励规则编码重复：${ruleCode}`);
      throw new Error('duplicate rule code');
    }
    if (streakDays.has(normalizedStreakDays)) {
      useMessage.warning(`连续奖励阈值重复：${normalizedStreakDays} 天`);
      throw new Error('duplicate streak days');
    }

    if (rewardPoints <= 0 && rewardExperience <= 0) {
      useMessage.warning(`第 ${rowNumber} 条连续奖励至少配置一种奖励`);
      throw new Error('missing rule reward');
    }

    if (sortOrder < 0 || !Number.isInteger(sortOrder)) {
      useMessage.warning(`第 ${rowNumber} 条连续奖励排序值必须为非负整数`);
      throw new Error('invalid sort order');
    }

    ruleCodes.add(ruleCode);
    streakDays.add(normalizedStreakDays);
  }
}
</script>

<template>
  <Modal class="!w-[1180px]">
    <div class="space-y-5">
      <div
        class="overflow-hidden rounded-3xl border border-slate-200/80 bg-[linear-gradient(135deg,#f8fafc_0%,#fff7ed_45%,#eff6ff_100%)] p-6 shadow-sm"
      >
        <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div class="max-w-3xl">
            <div class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Check-In Ops
            </div>
            <div class="mt-3 text-2xl font-semibold text-slate-900">
              {{ modalTitle }}
            </div>
            <div class="mt-2 text-sm leading-6 text-slate-600">
              计划的关键配置变更会在服务端自动切到新版本，已生成的用户周期继续使用自己的快照。
              这里建议一次性把周期、基础奖励和连续奖励规则维护完整，减少后续补偿成本。
            </div>
          </div>
          <div class="grid min-w-[280px] grid-cols-1 gap-3 sm:grid-cols-2">
            <div class="rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-100">
              <div class="text-xs text-slate-500">当前基础奖励</div>
              <div class="mt-2 text-base font-semibold text-slate-900">
                {{ baseRewardSummary }}
              </div>
            </div>
            <div class="rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-100">
              <div class="text-xs text-slate-500">连续奖励规则</div>
              <div class="mt-2 text-base font-semibold text-slate-900">
                {{ formModel.streakRewardRules.length }} 条
              </div>
            </div>
          </div>
        </div>
      </div>

      <el-scrollbar max-height="70vh">
        <el-form
          ref="formRef"
          :model="formModel"
          :rules="formRules"
          class="space-y-5 pr-1"
          label-position="top"
        >
          <el-card shadow="never" class="rounded-3xl border-slate-200/80">
            <template #header>
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-base font-semibold text-slate-900">基础信息</div>
                  <div class="mt-1 text-xs text-slate-500">
                    维护计划编码、版本入口状态以及当前部署的时区口径。
                  </div>
                </div>
              </div>
            </template>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <el-form-item label="计划名称" prop="planName">
                <el-input
                  v-model="formModel.planName"
                  maxlength="200"
                  placeholder="请输入签到计划名称"
                  show-word-limit
                />
              </el-form-item>
              <el-form-item label="计划编码" prop="planCode">
                <el-input
                  v-model="formModel.planCode"
                  maxlength="50"
                  placeholder="请输入签到计划编码"
                  show-word-limit
                />
              </el-form-item>
              <el-form-item label="计划状态" prop="status">
                <el-select v-model="formModel.status" class="w-full" placeholder="请选择计划状态">
                  <el-option
                    v-for="item in checkInPlanStatusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="启用状态" prop="isEnabled">
                <div class="flex h-10 items-center">
                  <el-switch
                    v-model="formModel.isEnabled"
                    :active-value="true"
                    :inactive-value="false"
                  />
                </div>
              </el-form-item>
              <el-form-item label="周期类型" prop="cycleType">
                <el-select v-model="formModel.cycleType" class="w-full" placeholder="请选择周期类型">
                  <el-option
                    v-for="item in checkInCycleTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="周期锚点日期" prop="cycleAnchorDate">
                <el-date-picker
                  v-model="formModel.cycleAnchorDate"
                  class="!w-full"
                  placeholder="请选择周期锚点日期"
                  type="date"
                  value-format="YYYY-MM-DD"
                />
              </el-form-item>
              <el-form-item label="每周期补签次数" prop="allowMakeupCountPerCycle">
                <el-input-number
                  v-model="formModel.allowMakeupCountPerCycle"
                  :min="0"
                  class="!w-full"
                />
              </el-form-item>
              <el-form-item label="计划时区" prop="timezone">
                <el-input
                  v-model="formModel.timezone"
                  disabled
                  placeholder="当前部署时区"
                />
              </el-form-item>
            </div>
          </el-card>

          <el-card shadow="never" class="rounded-3xl border-slate-200/80">
            <template #header>
              <div>
                <div class="text-base font-semibold text-slate-900">发布时间窗</div>
                <div class="mt-1 text-xs text-slate-500">
                  发布时间按左闭右开处理，不填写结束时间表示长期有效。
                </div>
              </div>
            </template>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <el-form-item label="开始时间">
                <el-date-picker
                  v-model="formModel.publishStartAt"
                  class="!w-full"
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="请选择开始时间"
                  type="datetime"
                  value-format="YYYY-MM-DD HH:mm:ss"
                />
              </el-form-item>
              <el-form-item label="结束时间">
                <el-date-picker
                  v-model="formModel.publishEndAt"
                  class="!w-full"
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="请选择结束时间"
                  type="datetime"
                  value-format="YYYY-MM-DD HH:mm:ss"
                />
              </el-form-item>
            </div>
          </el-card>

          <el-card shadow="never" class="rounded-3xl border-slate-200/80">
            <template #header>
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-base font-semibold text-slate-900">基础奖励配置</div>
                  <div class="mt-1 text-xs text-slate-500">
                    不配置任何数值时，表示该计划只记录签到事实，不发放每日基础奖励。
                  </div>
                </div>
                <el-tag type="primary">{{ baseRewardSummary }}</el-tag>
              </div>
            </template>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div class="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <div class="text-sm font-medium text-slate-800">积分奖励</div>
                <div class="mt-1 text-xs text-slate-500">
                  每次签到基础奖励发放的积分数量。
                </div>
                <el-input-number
                  v-model="formModel.baseRewardPoints"
                  :min="0"
                  class="!mt-4 !w-full"
                  placeholder="不发积分可留空"
                />
              </div>
              <div class="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <div class="text-sm font-medium text-slate-800">经验奖励</div>
                <div class="mt-1 text-xs text-slate-500">
                  每次签到基础奖励发放的经验数量。
                </div>
                <el-input-number
                  v-model="formModel.baseRewardExperience"
                  :min="0"
                  class="!mt-4 !w-full"
                  placeholder="不发经验可留空"
                />
              </div>
            </div>
          </el-card>

          <el-card shadow="never" class="rounded-3xl border-slate-200/80">
            <template #header>
              <div class="flex items-center justify-between gap-4">
                <div>
                  <div class="text-base font-semibold text-slate-900">连续奖励规则</div>
                  <div class="mt-1 text-xs text-slate-500">
                    支持配置多档阈值；同一计划版本内，规则编码和阈值天数都必须唯一。
                  </div>
                </div>
                <el-button type="primary" @click="addRule()">新增规则</el-button>
              </div>
            </template>

            <div class="space-y-4">
              <el-empty
                v-if="formModel.streakRewardRules.length === 0"
                description="还没有连续奖励规则，点击右上角新增一条。"
              />

              <div
                v-for="(rule, index) in formModel.streakRewardRules"
                :key="rule.localId"
                class="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-sm"
              >
                <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div class="text-sm font-semibold text-slate-900">
                      规则 {{ index + 1 }}
                    </div>
                    <div class="mt-1 text-xs text-slate-500">
                      建议让排序值和阈值天数保持一致，便于后台查看。
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <el-button plain size="small" @click="copyRule(rule)">复制</el-button>
                    <el-button
                      plain
                      size="small"
                      type="danger"
                      @click="removeRule(rule.localId)"
                    >
                      删除
                    </el-button>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <el-form-item :label="`规则编码 ${index + 1}`">
                    <el-input
                      v-model="rule.ruleCode"
                      maxlength="50"
                      placeholder="例如 streak-7"
                      show-word-limit
                    />
                  </el-form-item>
                  <el-form-item :label="`阈值天数 ${index + 1}`">
                    <el-input-number
                      v-model="rule.streakDays"
                      :min="1"
                      class="!w-full"
                    />
                  </el-form-item>
                  <el-form-item :label="`排序值 ${index + 1}`">
                    <el-input-number
                      v-model="rule.sortOrder"
                      :min="0"
                      class="!w-full"
                    />
                  </el-form-item>
                  <el-form-item :label="`规则状态 ${index + 1}`">
                    <el-select v-model="rule.status" class="w-full" placeholder="请选择规则状态">
                      <el-option
                        v-for="item in checkInRuleStatusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="`奖励积分 ${index + 1}`">
                    <el-input-number
                      v-model="rule.rewardPoints"
                      :min="0"
                      class="!w-full"
                    />
                  </el-form-item>
                  <el-form-item :label="`奖励经验 ${index + 1}`">
                    <el-input-number
                      v-model="rule.rewardExperience"
                      :min="0"
                      class="!w-full"
                    />
                  </el-form-item>
                  <el-form-item :label="`重复领取 ${index + 1}`">
                    <div class="flex h-10 items-center">
                      <el-switch
                        v-model="rule.repeatable"
                        :active-value="true"
                        :inactive-value="false"
                      />
                    </div>
                  </el-form-item>
                  <div class="rounded-2xl bg-white/80 p-4 ring-1 ring-slate-100">
                    <div class="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Reward Preview
                    </div>
                    <div class="mt-2 text-sm font-medium text-slate-900">
                      {{
                        formatRewardSummary({
                          experience: rule.rewardExperience,
                          points: rule.rewardPoints,
                        })
                      }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-form>
      </el-scrollbar>
    </div>
  </Modal>
</template>
