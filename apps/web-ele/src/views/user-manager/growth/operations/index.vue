<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  GrowthRewardSettlementPageItemDto,
  GrowthRuleEventPageItemDto,
} from '#/api/types';

import { computed, reactive, ref } from 'vue';

import { Page, useVbenDrawer } from '@vben/common-ui';

import { ElMessageBox } from 'element-plus';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  growthRewardSettlementPageApi,
  growthRewardSettlementRetryApi,
  growthRewardSettlementRetryPendingBatchApi,
  growthRuleEventsPageApi,
} from '#/api/core';
import EsFullHeightTabs from '#/components/es-full-height-tabs';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils';

import {
  buildRewardSettlementQuery,
  formatSettlementLedgerIds,
  rewardSettlementColumns,
  rewardSettlementSearchSchema,
  settlementResultOptions,
  settlementStatusOptions,
} from './model/reward-settlement';
import {
  buildRuleEventsQuery,
  formatAssetRules,
  formatTaskBinding,
  governanceGateOptions,
  implStatusOptions,
  ruleDomainOptions,
  ruleEventsColumns,
  ruleEventsSearchSchema,
} from './model/rule-events';
import {
  formatBoolean,
  formatDateTime,
  formatJsonBlock,
  getGrowthTypeLabel,
  getOptionColor,
  getOptionLabel,
  settlementTypeOptions,
} from './model/shared';

defineOptions({
  name: 'UserGrowthOperations',
});

type TabKey = 'reward-settlement' | 'rule-events';

const activeTab = ref<TabKey>('reward-settlement');
const retryingMap = reactive<Record<number, boolean>>({});
const batchRetrying = ref(false);
const currentSettlement = ref<GrowthRewardSettlementPageItemDto>();
const currentRuleEvent = ref<GrowthRuleEventPageItemDto>();

const settlementDetailTitle = computed(() =>
  currentSettlement.value
    ? `奖励补偿 #${currentSettlement.value.id}`
    : '奖励补偿详情',
);

const ruleEventDetailTitle = computed(() =>
  currentRuleEvent.value
    ? `${currentRuleEvent.value.eventName} 事件覆盖`
    : '事件覆盖详情',
);

const rewardSettlementGridOptions: VxeGridProps<GrowthRewardSettlementPageItemDto> =
  {
    columns: rewardSettlementColumns,
    height: '100%',
    proxyConfig: {
      ajax: {
        query: async ({ page, sorts }, formValues) => {
          return await growthRewardSettlementPageApi(
            formatQuery({
              page,
              formValues: buildRewardSettlementQuery(formValues),
              sorts,
            }),
          );
        },
      },
      sort: true,
    },
  };

const ruleEventsGridOptions: VxeGridProps<GrowthRuleEventPageItemDto> = {
  columns: ruleEventsColumns,
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await growthRuleEventsPageApi(
          formatQuery({
            page,
            formValues: buildRuleEventsQuery(formValues),
            sorts,
          }),
        );
      },
    },
    sort: true,
  },
};

const [RewardSettlementGrid, rewardSettlementGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(rewardSettlementSearchSchema),
  gridOptions: rewardSettlementGridOptions,
});

const [RuleEventsGrid] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(ruleEventsSearchSchema),
  gridOptions: ruleEventsGridOptions,
});

const [SettlementDetailDrawer, settlementDetailDrawerApi] = useVbenDrawer({
  class: '!w-[760px] max-w-full max-sm:!w-full',
  destroyOnClose: false,
  footer: false,
});

const [RuleEventDetailDrawer, ruleEventDetailDrawerApi] = useVbenDrawer({
  class: '!w-[760px] max-w-full max-sm:!w-full',
  destroyOnClose: false,
  footer: false,
});

function openSettlementDetail(row: GrowthRewardSettlementPageItemDto) {
  currentSettlement.value = row;
  settlementDetailDrawerApi.open();
}

function openRuleEventDetail(row: GrowthRuleEventPageItemDto) {
  currentRuleEvent.value = row;
  ruleEventDetailDrawerApi.open();
}

function hasRetryableSettlement(row: GrowthRewardSettlementPageItemDto) {
  return row.settlementStatus === 0 || row.settlementStatus === 2;
}

async function retrySettlement(row: GrowthRewardSettlementPageItemDto) {
  if (!hasRetryableSettlement(row)) return;

  try {
    await ElMessageBox.confirm(
      `确认重试奖励补偿记录 #${row.id} 吗？`,
      '重试奖励补偿',
      {
        confirmButtonText: '确认重试',
        draggable: true,
        type: 'warning',
      },
    );
  } catch {
    return;
  }

  retryingMap[row.id] = true;
  try {
    await growthRewardSettlementRetryApi({ id: row.id });
    useMessage.success('奖励补偿重试已触发');
    await rewardSettlementGridApi.reload();
  } finally {
    retryingMap[row.id] = false;
  }
}

async function retryPendingBatch() {
  let inputValue: string;

  try {
    const result = await ElMessageBox.prompt(
      '批量重试会扫描全局待补偿记录，不受当前筛选影响。可选填写本次最多扫描数量。',
      '批量重试待补偿记录',
      {
        cancelButtonText: '取消',
        confirmButtonText: '确认重试',
        draggable: true,
        inputPlaceholder: '留空表示使用后端默认扫描数',
        inputValidator(value) {
          if (!value) return true;
          const limit = Number(value);
          return Number.isInteger(limit) && limit > 0
            ? true
            : '扫描数量必须是正整数';
        },
        type: 'warning',
      },
    );
    inputValue = String(result.value || '').trim();
  } catch {
    return;
  }

  batchRetrying.value = true;
  try {
    const limit = inputValue ? Number(inputValue) : undefined;
    const result = await growthRewardSettlementRetryPendingBatchApi(
      limit ? { limit } : undefined,
    );
    useMessage.success(
      `批量重试完成：扫描 ${result.scannedCount}，成功 ${result.succeededCount}，失败 ${result.failedCount}`,
    );
    await rewardSettlementGridApi.reload();
  } finally {
    batchRetrying.value = false;
  }
}
</script>

<template>
  <Page
    auto-content-height
    content-class="es-full-height-page-content"
    title="成长运营"
  >
    <EsFullHeightTabs v-model="activeTab">
      <el-tab-pane label="奖励补偿" name="reward-settlement">
        <div class="es-full-height-pane">
          <RewardSettlementGrid class="es-full-height-grid">
            <template #toolbar-actions>
              <el-button
                class="ml-2"
                :loading="batchRetrying"
                type="primary"
                @click="retryPendingBatch"
              >
                批量重试待补偿（不受当前筛选影响）
              </el-button>
            </template>

            <template #settlementStatus="{ row }">
              <el-tag
                :type="
                  getOptionColor(settlementStatusOptions, row.settlementStatus)
                "
                effect="light"
                round
              >
                {{
                  getOptionLabel(settlementStatusOptions, row.settlementStatus)
                }}
              </el-tag>
            </template>

            <template #settlementResultType="{ row }">
              <el-tag
                v-if="row.settlementResultType"
                :type="
                  getOptionColor(
                    settlementResultOptions,
                    row.settlementResultType,
                  )
                "
                effect="plain"
                round
              >
                {{
                  getOptionLabel(
                    settlementResultOptions,
                    row.settlementResultType,
                  )
                }}
              </el-tag>
              <span v-else>-</span>
            </template>

            <template #actions="{ row }">
              <div class="my-1">
                <el-button
                  link
                  type="primary"
                  @click="openSettlementDetail(row)"
                >
                  详情
                </el-button>
                <template v-if="hasRetryableSettlement(row)">
                  <el-divider direction="vertical" />
                  <el-button
                    link
                    :loading="retryingMap[row.id]"
                    type="primary"
                    @click="retrySettlement(row)"
                  >
                    重试
                  </el-button>
                </template>
              </div>
            </template>
          </RewardSettlementGrid>
        </div>
      </el-tab-pane>

      <el-tab-pane label="事件覆盖" name="rule-events">
        <div class="es-full-height-pane">
          <RuleEventsGrid class="es-full-height-grid">
            <template #implStatus="{ row }">
              <el-tag
                :type="getOptionColor(implStatusOptions, row.implStatus)"
                effect="light"
                round
              >
                {{ getOptionLabel(implStatusOptions, row.implStatus) }}
              </el-tag>
            </template>

            <template #actions="{ row }">
              <el-button link type="primary" @click="openRuleEventDetail(row)">
                详情
              </el-button>
            </template>
          </RuleEventsGrid>
        </div>
      </el-tab-pane>
    </EsFullHeightTabs>

    <SettlementDetailDrawer :title="settlementDetailTitle">
      <div v-if="currentSettlement" class="growth-operations-detail">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="结算 ID">
            {{ currentSettlement.id }}
          </el-descriptions-item>
          <el-descriptions-item label="用户 ID">
            {{ currentSettlement.userId }}
          </el-descriptions-item>
          <el-descriptions-item label="事件 key">
            {{ currentSettlement.eventKey || '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="事件编码">
            {{ getGrowthTypeLabel(currentSettlement.eventCode) }}
          </el-descriptions-item>
          <el-descriptions-item label="来源">
            {{ currentSettlement.source || '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="业务键">
            {{ currentSettlement.bizKey || '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="结算类型">
            {{
              getOptionLabel(
                settlementTypeOptions,
                currentSettlement.settlementType,
              )
            }}
          </el-descriptions-item>
          <el-descriptions-item label="结算状态">
            {{
              getOptionLabel(
                settlementStatusOptions,
                currentSettlement.settlementStatus,
              )
            }}
          </el-descriptions-item>
          <el-descriptions-item label="结算结果">
            {{
              getOptionLabel(
                settlementResultOptions,
                currentSettlement.settlementResultType,
              )
            }}
          </el-descriptions-item>
          <el-descriptions-item label="重试次数">
            {{ currentSettlement.retryCount }}
          </el-descriptions-item>
          <el-descriptions-item label="来源事实 ID">
            {{ currentSettlement.sourceRecordId ?? '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="目标">
            {{ currentSettlement.targetType ?? '-' }} /
            {{ currentSettlement.targetId ?? '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="发生时间">
            {{ formatDateTime(currentSettlement.eventOccurredAt) }}
          </el-descriptions-item>
          <el-descriptions-item label="落定时间">
            {{ formatDateTime(currentSettlement.settledAt) }}
          </el-descriptions-item>
          <el-descriptions-item label="最近重试">
            {{ formatDateTime(currentSettlement.lastRetryAt) }}
          </el-descriptions-item>
          <el-descriptions-item label="创建时间">
            {{ formatDateTime(currentSettlement.createdAt) }}
          </el-descriptions-item>
          <el-descriptions-item label="更新时间">
            {{ formatDateTime(currentSettlement.updatedAt) }}
          </el-descriptions-item>
          <el-descriptions-item :span="2" label="账本记录">
            {{ formatSettlementLedgerIds(currentSettlement) }}
          </el-descriptions-item>
          <el-descriptions-item :span="2" label="最后错误">
            {{ currentSettlement.lastError || '-' }}
          </el-descriptions-item>
        </el-descriptions>

        <div class="growth-operations-detail__block">
          <div class="growth-operations-detail__title">原始载荷</div>
          <pre>{{ formatJsonBlock(currentSettlement.requestPayload) }}</pre>
        </div>
      </div>
    </SettlementDetailDrawer>

    <RuleEventDetailDrawer :title="ruleEventDetailTitle">
      <div v-if="currentRuleEvent" class="growth-operations-detail">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="规则类型">
            {{ getGrowthTypeLabel(currentRuleEvent.ruleType) }}
          </el-descriptions-item>
          <el-descriptions-item label="事件名称">
            {{ currentRuleEvent.eventName }}
          </el-descriptions-item>
          <el-descriptions-item label="事件 key">
            {{ currentRuleEvent.ruleKey }}
          </el-descriptions-item>
          <el-descriptions-item label="事件域">
            {{ getOptionLabel(ruleDomainOptions, currentRuleEvent.domain) }}
          </el-descriptions-item>
          <el-descriptions-item label="实现状态">
            {{ getOptionLabel(implStatusOptions, currentRuleEvent.implStatus) }}
          </el-descriptions-item>
          <el-descriptions-item label="已接入 producer">
            {{ formatBoolean(currentRuleEvent.isImplemented) }}
          </el-descriptions-item>
          <el-descriptions-item label="有基础奖励">
            {{ formatBoolean(currentRuleEvent.hasBaseReward) }}
          </el-descriptions-item>
          <el-descriptions-item label="有关联任务">
            {{ formatBoolean(currentRuleEvent.hasTask) }}
          </el-descriptions-item>
          <el-descriptions-item label="支持任务目标">
            {{ formatBoolean(currentRuleEvent.supportsTaskObjective) }}
          </el-descriptions-item>
          <el-descriptions-item label="治理门禁">
            {{
              getOptionLabel(
                governanceGateOptions,
                currentRuleEvent.governanceGate,
              )
            }}
          </el-descriptions-item>
          <el-descriptions-item :span="2" label="奖励策略">
            {{ currentRuleEvent.rewardPolicy || '-' }}
          </el-descriptions-item>
          <el-descriptions-item :span="2" label="资产规则">
            <pre>{{ formatAssetRules(currentRuleEvent.assetRules) }}</pre>
          </el-descriptions-item>
          <el-descriptions-item :span="2" label="任务绑定">
            <pre>{{ formatTaskBinding(currentRuleEvent.taskBinding) }}</pre>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </RuleEventDetailDrawer>
  </Page>
</template>

<style scoped>
.growth-operations-detail {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.growth-operations-detail__block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.growth-operations-detail__title {
  font-size: 14px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.growth-operations-detail pre {
  max-height: 320px;
  padding: 12px;
  overflow: auto;
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  line-height: 1.6;
  color: var(--el-text-color-primary);
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  background: var(--el-fill-color-light);
  border: 1px solid var(--el-border-color);
  border-radius: 6px;
}
</style>
