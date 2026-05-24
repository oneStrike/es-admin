<script lang="ts" setup>
import type {
  VipPlanBenefitConfigRow,
  VipPlanBenefitValue,
  VipPlanFormValues,
} from '../model/plan';

import type {
  BaseCouponDefinitionDto,
  BaseMembershipBenefitDefinitionDto,
} from '#/api/types';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { couponDefinitionPageApi, membershipBenefitPageApi } from '#/api/core';
import { useMessage } from '#/hooks/useFeedback';
import { getOptionLabel } from '#/utils/options';

import { benefitTypeOptions, grantPolicyOptions } from '../model/options';
import { vipPlanBaseFormSchema } from '../model/plan';

defineOptions({
  name: 'VipPlanFormModal',
});

const props = defineProps<Props>();

interface Props {
  onSubmit?: (values: VipPlanFormValues) => Promise<void> | void;
}

type BenefitValue = VipPlanBenefitValue;

const message = useMessage;

const displayBenefitType = 1;
const couponGrantBenefitType = 2;
const itemGrantBenefitType = 3;
const subscriptionEntitlementBenefitType = 4;
const noAdPolicyBenefitType = 5;
const earlyAccessPolicyBenefitType = 6;

const sharedData = ref<{ record?: VipPlanFormValues }>({});
const showForm = ref(false);
const selectedBenefitIds = ref<number[]>([]);
const benefitRows = ref<VipPlanBenefitConfigRow[]>([]);
const benefitRecords = ref<BaseMembershipBenefitDefinitionDto[]>([]);
const couponRecords = ref<BaseCouponDefinitionDto[]>([]);

const modalTitle = computed(() => {
  return sharedData.value.record?.id ? '编辑 VIP 套餐' : '新增 VIP 套餐';
});

const benefitOptions = computed(() =>
  benefitRecords.value.map((item) => ({
    label: `${item.name} (${formatOptionText(benefitTypeOptions, item.benefitType)})`,
    value: item.id,
  })),
);

const couponOptions = computed(() =>
  couponRecords.value.map((item) => ({
    label: item.name,
    value: item.id,
  })),
);

const [BaseForm, formApi] = useVbenForm({
  fieldMappingTime: undefined,
  handleSubmit: async () => {},
  layout: 'vertical',
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2 gap-x-4',
});

const [Modal, modalApi] = useVbenModal({
  class: 'vip-plan-form-modal w-[1000px]',
  contentClass: 'px-4',
  onConfirm: handleConfirm,
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      return;
    }

    showForm.value = true;
    sharedData.value = modalApi.getData<{ record?: VipPlanFormValues }>() || {};
    modalApi.setState({
      title: modalTitle.value,
    });
    await loadOptions();
    await applyRecord(sharedData.value.record);
  },
  onClosed() {
    showForm.value = false;
    selectedBenefitIds.value = [];
    benefitRows.value = [];
  },
});

watch(
  selectedBenefitIds,
  () => {
    syncBenefitRows();
  },
  { deep: true },
);

async function loadOptions() {
  const [benefitPage, couponPage] = await Promise.all([
    membershipBenefitPageApi({
      isEnabled: true,
      pageIndex: 1,
      pageSize: 200,
    }),
    couponDefinitionPageApi({
      isEnabled: true,
      pageIndex: 1,
      pageSize: 200,
    }),
  ]);

  benefitRecords.value = mergeBenefitRecords(benefitPage.list || []);
  couponRecords.value = couponPage.list || [];
}

function mergeBenefitRecords(
  loadedBenefits: BaseMembershipBenefitDefinitionDto[],
) {
  const recordMap = new Map<number, BaseMembershipBenefitDefinitionDto>();
  for (const item of loadedBenefits) {
    recordMap.set(item.id, item);
  }

  const recordBenefits = normalizeRows(sharedData.value.record?.benefitRows)
    .map((item) => item.benefit)
    .filter((item): item is BaseMembershipBenefitDefinitionDto => !!item);
  for (const item of recordBenefits) {
    recordMap.set(item.id, item);
  }

  return [...recordMap.values()];
}

async function applyRecord(record?: VipPlanFormValues) {
  await formApi.resetForm();

  if (record) {
    await formApi.setValues(record);
    selectedBenefitIds.value = Array.isArray(record.benefitIds)
      ? [...record.benefitIds]
      : [];
    benefitRows.value = normalizeRows(record.benefitRows);
  } else {
    await formApi.setValues({
      autoRenewEnabled: false,
      bonusPointAmount: 0,
      durationDays: 30,
      isEnabled: true,
      originalPriceAmount: 0,
      priceAmount: 0,
      sortOrder: 0,
      tier: 1,
    });
    selectedBenefitIds.value = [];
    benefitRows.value = [];
  }

  syncBenefitRows();
}

function normalizeRows(value: unknown): VipPlanBenefitConfigRow[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item) => item && typeof item === 'object')
    .map((item) => ({ ...(item as VipPlanBenefitConfigRow) }));
}

function syncBenefitRows() {
  const previousRows = new Map(
    benefitRows.value.map((row) => [Number(row.benefitId), row]),
  );

  benefitRows.value = selectedBenefitIds.value.map((benefitId, index) => {
    const previous = previousRows.get(benefitId);
    const benefit = getBenefitById(benefitId) || previous?.benefit;
    const benefitType = benefit?.benefitType ?? displayBenefitType;
    const row = {
      benefit,
      benefitId,
      benefitValue:
        previous?.benefitValue ?? createDefaultBenefitValue(benefitType),
      grantPolicy:
        previous?.grantPolicy ?? createDefaultGrantPolicy(benefitType),
      isEnabled: previous?.isEnabled ?? true,
      sortOrder: previous?.sortOrder ?? index,
    };

    if (benefitType === displayBenefitType) {
      row.benefitValue = null;
      row.grantPolicy = 1;
    }

    return row;
  });
}

function getBenefitById(id: number) {
  return benefitRecords.value.find((item) => item.id === id);
}

function createDefaultGrantPolicy(benefitType: number) {
  if (benefitType === displayBenefitType) {
    return 1;
  }
  if (
    benefitType === couponGrantBenefitType ||
    benefitType === itemGrantBenefitType
  ) {
    return 2;
  }
  return 4;
}

function createDefaultBenefitValue(benefitType: number): BenefitValue | null {
  if (benefitType === displayBenefitType) {
    return null;
  }
  if (benefitType === couponGrantBenefitType) {
    return { couponDefinitionId: undefined, grantCount: 1, validDays: 0 };
  }
  if (benefitType === itemGrantBenefitType) {
    return { assetKey: '', assetType: 1, grantCount: 1, validDays: 0 };
  }
  if (benefitType === subscriptionEntitlementBenefitType) {
    return { entitlementKey: '' };
  }
  if (benefitType === noAdPolicyBenefitType) {
    return { adScope: 'reading', durationPolicy: 'subscription_period' };
  }
  if (benefitType === earlyAccessPolicyBenefitType) {
    return { advanceHours: 24, contentScope: 'chapter' };
  }
  return {};
}

function ensureBenefitValue(row: VipPlanBenefitConfigRow): BenefitValue {
  if (!row.benefitValue || typeof row.benefitValue !== 'object') {
    row.benefitValue = {};
  }
  return row.benefitValue as BenefitValue;
}

function getBenefitType(row: VipPlanBenefitConfigRow) {
  return row.benefit?.benefitType ?? displayBenefitType;
}

function formatOptionText(
  options: Array<{ label: string; value: boolean | number | string }>,
  value: unknown,
) {
  return (
    getOptionLabel(options, value as boolean | number | string) ||
    String(value ?? '-')
  );
}

function getBenefitName(row: VipPlanBenefitConfigRow) {
  return row.benefit?.name || `权益 #${row.benefitId}`;
}

function isDisplayBenefit(row: VipPlanBenefitConfigRow) {
  return getBenefitType(row) === displayBenefitType;
}

function isCouponBenefit(row: VipPlanBenefitConfigRow) {
  return getBenefitType(row) === couponGrantBenefitType;
}

function isItemBenefit(row: VipPlanBenefitConfigRow) {
  return getBenefitType(row) === itemGrantBenefitType;
}

function isSubscriptionBenefit(row: VipPlanBenefitConfigRow) {
  return getBenefitType(row) === subscriptionEntitlementBenefitType;
}

function isNoAdBenefit(row: VipPlanBenefitConfigRow) {
  return getBenefitType(row) === noAdPolicyBenefitType;
}

function isEarlyAccessBenefit(row: VipPlanBenefitConfigRow) {
  return getBenefitType(row) === earlyAccessPolicyBenefitType;
}

function assertPositiveInteger(value: unknown, label: string) {
  if (!Number.isInteger(value) || Number(value) <= 0) {
    throw new Error(`${label}必须是正整数`);
  }
}

function assertNonNegativeInteger(value: unknown, label: string) {
  if (!Number.isInteger(value) || Number(value) < 0) {
    throw new Error(`${label}必须是非负整数`);
  }
}

function assertText(value: unknown, label: string) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${label}不能为空`);
  }
}

function validateBenefitRows() {
  for (const row of benefitRows.value) {
    const benefitName = getBenefitName(row);
    const value = row.benefitValue as BenefitValue | null;

    if (isDisplayBenefit(row)) {
      row.grantPolicy = 1;
      row.benefitValue = null;
      continue;
    }

    if (!value) {
      throw new Error(`${benefitName}必须完善权益配置`);
    }
    if (isCouponBenefit(row)) {
      assertPositiveInteger(value.couponDefinitionId, `${benefitName}的券定义`);
      assertPositiveInteger(value.grantCount, `${benefitName}的发放数量`);
      assertNonNegativeInteger(value.validDays, `${benefitName}的有效天数`);
    } else if (isItemBenefit(row)) {
      assertPositiveInteger(value.assetType, `${benefitName}的资产类型`);
      assertText(value.assetKey, `${benefitName}的资产键`);
      assertPositiveInteger(value.grantCount, `${benefitName}的发放数量`);
      assertNonNegativeInteger(value.validDays, `${benefitName}的有效天数`);
    } else if (isSubscriptionBenefit(row)) {
      assertText(value.entitlementKey, `${benefitName}的订阅权益键`);
    } else if (isNoAdBenefit(row)) {
      assertText(value.adScope, `${benefitName}的广告范围`);
      assertText(value.durationPolicy, `${benefitName}的生效周期策略`);
    } else if (isEarlyAccessBenefit(row)) {
      assertText(value.contentScope, `${benefitName}的内容范围`);
      assertPositiveInteger(value.advanceHours, `${benefitName}的提前小时数`);
    }
  }
}

function setRowEnabled(
  row: VipPlanBenefitConfigRow,
  value: boolean | number | string,
) {
  row.isEnabled = Boolean(value);
}

async function handleConfirm() {
  modalApi.lock();
  try {
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    const values = await formApi.getValues();
    try {
      validateBenefitRows();
    } catch (error) {
      message.warning(error instanceof Error ? error.message : '提交失败');
      return;
    }
    await props.onSubmit?.({
      ...values,
      benefitIds: [...selectedBenefitIds.value],
      benefitRows: benefitRows.value.map((row) => ({ ...row })),
      id: sharedData.value.record?.id,
    });
    modalApi.close();
  } catch (error) {
    throw error;
  } finally {
    modalApi.unlock();
  }
}
</script>

<template>
  <Modal>
    <template #prepend-footer>
      <el-button @click="applyRecord(sharedData.record)">重置</el-button>
    </template>

    <BaseForm v-if="showForm" :schema="vipPlanBaseFormSchema" />

    <div v-if="showForm" class="mt-4 space-y-3">
      <div>
        <div class="mb-2 text-sm font-medium">关联权益</div>
        <el-select-v2
          v-model="selectedBenefitIds"
          class="w-full"
          clearable
          collapse-tags
          filterable
          :max-collapse-tags="4"
          multiple
          :options="benefitOptions"
          placeholder="请选择权益"
        />
      </div>

      <div>
        <div class="mb-2 text-sm font-medium">套餐权益配置</div>
        <div
          v-if="benefitRows.length === 0"
          class="py-6 text-center text-sm text-gray-400"
        >
          请选择权益
        </div>
        <div
          v-for="row in benefitRows"
          :key="row.benefitId"
          class="rounded border border-gray-200 p-3"
        >
          <div
            class="grid grid-cols-1 gap-2 md:grid-cols-[1fr_120px_80px] md:items-center"
          >
            <div class="min-w-0">
              <div class="truncate text-sm" :title="getBenefitName(row)">
                {{ getBenefitName(row) }}
              </div>
              <el-tag class="mt-1" size="small">
                {{ formatOptionText(benefitTypeOptions, getBenefitType(row)) }}
              </el-tag>
            </div>
            <el-input-number
              v-model="row.sortOrder"
              class="!w-full"
              :min="0"
              placeholder="排序"
            />
            <el-switch
              :active-value="true"
              :inactive-value="false"
              :model-value="row.isEnabled !== false"
              @change="(value) => setRowEnabled(row, value)"
            />
          </div>

          <div class="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
            <el-select-v2
              v-model="row.grantPolicy"
              class="w-full"
              :disabled="isDisplayBenefit(row)"
              :options="grantPolicyOptions"
              placeholder="发放策略"
            />
            <el-text
              v-if="isDisplayBenefit(row)"
              class="self-center"
              size="small"
              type="info"
            >
              仅展示，不需要发放配置
            </el-text>
            <template v-else-if="isCouponBenefit(row)">
              <el-select-v2
                v-model="ensureBenefitValue(row).couponDefinitionId"
                class="w-full"
                filterable
                :options="couponOptions"
                placeholder="券定义"
              />
              <el-input-number
                v-model="ensureBenefitValue(row).grantCount"
                class="!w-full"
                :min="1"
                placeholder="数量"
              />
              <el-input-number
                v-model="ensureBenefitValue(row).validDays"
                class="!w-full"
                :min="0"
                placeholder="有效天数"
              />
            </template>
            <template v-else-if="isItemBenefit(row)">
              <el-input-number
                v-model="ensureBenefitValue(row).assetType"
                class="!w-full"
                :min="1"
                placeholder="资产类型"
              />
              <el-input
                v-model="ensureBenefitValue(row).assetKey"
                clearable
                placeholder="资产键"
              />
              <el-input-number
                v-model="ensureBenefitValue(row).grantCount"
                class="!w-full"
                :min="1"
                placeholder="数量"
              />
              <el-input-number
                v-model="ensureBenefitValue(row).validDays"
                class="!w-full"
                :min="0"
                placeholder="有效天数"
              />
            </template>
            <el-input
              v-else-if="isSubscriptionBenefit(row)"
              v-model="ensureBenefitValue(row).entitlementKey"
              clearable
              placeholder="订阅权益键"
            />
            <template v-else-if="isNoAdBenefit(row)">
              <el-input
                v-model="ensureBenefitValue(row).adScope"
                clearable
                placeholder="广告范围"
              />
              <el-input
                v-model="ensureBenefitValue(row).durationPolicy"
                clearable
                placeholder="生效周期策略"
              />
            </template>
            <template v-else-if="isEarlyAccessBenefit(row)">
              <el-input
                v-model="ensureBenefitValue(row).contentScope"
                clearable
                placeholder="内容范围"
              />
              <el-input-number
                v-model="ensureBenefitValue(row).advanceHours"
                class="!w-full"
                :min="1"
                placeholder="提前小时数"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>
