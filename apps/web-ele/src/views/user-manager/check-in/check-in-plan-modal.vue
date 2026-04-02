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

import { QuestionIcon } from '#/components/es-icons';
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
  getBaseRewardValidationMessage,
  getRuleRewardValidationMessage,
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

function validateBaseReward(
  _rule: unknown,
  _value: unknown,
  callback: (error?: Error) => void,
) {
  const message = getBaseRewardValidationMessage(formModel);
  callback(message ? new Error(message) : undefined);
}

const formRules: FormRules<CheckInPlanFormModel> = {
  allowMakeupCountPerCycle: [
    {
      message: '请输入每周期补签次数',
      required: true,
      trigger: 'blur',
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
  baseRewardExperience: [
    {
      trigger: ['blur', 'change'],
      validator: validateBaseReward,
    },
  ],
  baseRewardPoints: [
    {
      trigger: ['blur', 'change'],
      validator: validateBaseReward,
    },
  ],
};

const modalTitle = computed(() => {
  return (
    sharedData.value?.title || (formModel.id ? '编辑签到计划' : '新增签到计划')
  );
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
    streakRewardRules: (record.streakRewardRules || []).map((rule) => ({
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
    (item) => item.localId !== localId,
  );
}

function copyRule(rule: CheckInPlanRuleFormItem) {
  formModel.streakRewardRules.push({
    ...rule,
    localId: createDefaultRuleFormItem().localId,
    ruleCode: `${rule.ruleCode}-copy`,
  });
}

function validateBaseRewardFields() {
  formRef.value?.validateField(['baseRewardExperience', 'baseRewardPoints']);
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
    formModel.startDate &&
    formModel.endDate &&
    dayjs(formModel.endDate).valueOf() <= dayjs(formModel.startDate).valueOf()
  ) {
    useMessage.warning('结束日期必须晚于开始日期');
    throw new Error('invalid publish window');
  }

  const baseRewardMessage = getBaseRewardValidationMessage(formModel);
  if (baseRewardMessage) {
    useMessage.warning(baseRewardMessage);
    throw new Error('missing base reward');
  }

  const ruleCodes = new Set<string>();
  const streakDays = new Set<number>();

  for (const [index, rule] of formModel.streakRewardRules.entries()) {
    const rowNumber = index + 1;
    const ruleCode = rule.ruleCode?.trim?.();
    const normalizedStreakDays = Number(rule.streakDays ?? 0);
    if (!ruleCode) {
      useMessage.warning(`请填写第 ${rowNumber} 条连续奖励规则编码`);
      throw new Error('missing rule code');
    }

    if (!Number.isInteger(normalizedStreakDays) || normalizedStreakDays <= 0) {
      useMessage.warning(
        `第 ${rowNumber} 条连续奖励的连续签到天数必须为正整数`,
      );
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

    const ruleRewardMessage = getRuleRewardValidationMessage(rule, rowNumber);
    if (ruleRewardMessage) {
      useMessage.warning(ruleRewardMessage);
      throw new Error('missing rule reward');
    }

    ruleCodes.add(ruleCode);
    streakDays.add(normalizedStreakDays);
  }
}
</script>

<template>
  <Modal class="!w-[1080px]">
    <div class="space-y-5">
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
                  <div class="text-base font-semibold text-slate-900">
                    基础信息
                  </div>
                  <div class="mt-1 text-xs text-slate-500">
                    维护计划编码、版本入口状态等基础配置。
                  </div>
                </div>
              </div>
            </template>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
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
                <el-select
                  v-model="formModel.status"
                  class="w-full"
                  placeholder="请选择计划状态"
                >
                  <el-option
                    v-for="item in checkInPlanStatusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="周期类型" prop="cycleType">
                <el-select
                  v-model="formModel.cycleType"
                  class="w-full"
                  placeholder="请选择周期类型"
                >
                  <el-option
                    v-for="item in checkInCycleTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="每周期补签次数"
                prop="allowMakeupCountPerCycle"
              >
                <el-input-number
                  v-model="formModel.allowMakeupCountPerCycle"
                  :min="0"
                  class="!w-full"
                />
              </el-form-item>
              <el-form-item label="开始日期">
                <el-date-picker
                  v-model="formModel.startDate"
                  class="!w-full"
                  placeholder="请选择开始日期"
                  type="date"
                  value-format="YYYY-MM-DD"
                />
              </el-form-item>
              <el-form-item label="结束日期">
                <el-date-picker
                  v-model="formModel.endDate"
                  class="!w-full"
                  placeholder="请选择结束日期"
                  type="date"
                  value-format="YYYY-MM-DD"
                />
              </el-form-item>
            </div>
          </el-card>

          <el-card shadow="never" class="rounded-3xl border-slate-200/80">
            <template #header>
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-base font-semibold text-slate-900">
                    基础奖励配置
                  </div>
                  <div class="mt-1 text-xs text-slate-500">
                    基础奖励积分和经验至少填写一项，不可同时留空。
                  </div>
                </div>
                <el-tag type="primary">{{ baseRewardSummary }}</el-tag>
              </div>
            </template>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <el-form-item
                class="mb-0 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100"
                label-width="0"
                prop="baseRewardPoints"
              >
                <div class="text-sm font-medium text-slate-800">积分奖励</div>
                <div class="mt-1 text-xs text-slate-500">
                  每次签到基础奖励发放的积分数量。
                </div>
                <el-input-number
                  v-model="formModel.baseRewardPoints"
                  :min="0"
                  class="!mt-4 !w-full"
                  placeholder="请输入基础奖励积分"
                  @change="validateBaseRewardFields"
                />
              </el-form-item>
              <el-form-item
                class="mb-0 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100"
                label-width="0"
                prop="baseRewardExperience"
              >
                <div class="text-sm font-medium text-slate-800">经验奖励</div>
                <div class="mt-1 text-xs text-slate-500">
                  每次签到基础奖励发放的经验数量。
                </div>
                <el-input-number
                  v-model="formModel.baseRewardExperience"
                  :min="0"
                  class="!mt-4 !w-full"
                  placeholder="请输入基础奖励经验"
                  @change="validateBaseRewardFields"
                />
              </el-form-item>
            </div>
          </el-card>

          <el-card shadow="never" class="rounded-3xl border-slate-200/80">
            <template #header>
              <div class="flex items-center justify-between gap-4">
                <div>
                  <div class="text-base font-semibold text-slate-900">
                    连续奖励规则
                  </div>
                  <div class="mt-1 text-xs text-slate-500">
                    支持配置多档规则；同一计划版本内，规则编码和连续签到天数都必须唯一，且积分和经验至少填写一项。
                  </div>
                </div>
                <el-button type="primary" @click="addRule()">
                  新增规则
                </el-button>
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
                <div
                  class="mb-4 flex flex-wrap items-center justify-between gap-3"
                >
                  <div>
                    <div class="text-sm font-semibold text-slate-900">
                      规则 {{ index + 1 }}
                    </div>
                    <div class="mt-1 text-xs text-slate-500">
                      建议让排序值和连续签到天数保持一致，便于后台查看。
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <el-button plain size="small" @click="copyRule(rule)">
                      复制
                    </el-button>
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

                <div
                  class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
                >
                  <el-form-item label="规则编码">
                    <el-input
                      v-model="rule.ruleCode"
                      maxlength="50"
                      placeholder="例如 streak-7"
                      show-word-limit
                    />
                  </el-form-item>
                  <el-form-item label="连续签到天数">
                    <el-input-number
                      v-model="rule.streakDays"
                      :min="1"
                      class="!w-full"
                      placeholder="请输入连续签到天数"
                    />
                  </el-form-item>
                  <el-form-item label="规则状态">
                    <el-select
                      v-model="rule.status"
                      class="w-full"
                      placeholder="请选择规则状态"
                    >
                      <el-option
                        v-for="item in checkInRuleStatusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="奖励积分">
                    <el-input-number
                      v-model="rule.rewardPoints"
                      :min="0"
                      class="!w-full"
                      placeholder="请输入连续奖励积分"
                    />
                  </el-form-item>
                  <el-form-item label="奖励经验">
                    <el-input-number
                      v-model="rule.rewardExperience"
                      :min="0"
                      class="!w-full"
                      placeholder="请输入连续奖励经验"
                    />
                  </el-form-item>
                  <el-form-item label="重复领取">
                    <template #label>
                      <div class="flex items-center">
                        <span>重复领取</span>
                        <el-tooltip
                          popper-class="w-72"
                          effect="dark"
                          content="关闭时，同一周期内该规则只发一次；开启时，同一周期内再次满足这条连续奖励规则时，允许再次发放。"
                          placement="top"
                        >
                          <QuestionIcon class="ml-2 size-4 text-[#606266]" />
                        </el-tooltip>
                      </div>
                    </template>
                    <div class="flex h-10 items-center">
                      <el-switch
                        v-model="rule.repeatable"
                        :active-value="true"
                        :inactive-value="false"
                      />
                    </div>
                  </el-form-item>
                </div>
              </div>
            </div>
          </el-card>
      </el-form>
    </div>
  </Modal>
</template>
