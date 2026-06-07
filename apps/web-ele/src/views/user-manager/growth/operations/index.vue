<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  GrowthRewardSettlementPageItemDto,
  GrowthRuleEventPageItemDto,
} from '#/api/types';

import { computed, reactive, ref } from 'vue';

import {
  Page,
  useVbenDrawer,
  VbenDescriptions,
  VbenDescriptionsItem,
  VbenTableAction,
} from '@vben/common-ui';

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

function getSettlementActions(
  row: GrowthRewardSettlementPageItemDto,
): ActionItem[] {
  return [
    {
      key: 'detail',
      onClick: () => openSettlementDetail(row),
      text: '详情',
    },
    {
      ifShow: () => hasRetryableSettlement(row),
      key: 'retry',
      loading: retryingMap[row.id],
      onClick: () => retrySettlement(row),
      text: '重试',
    },
  ];
}

function getRuleEventActions(row: GrowthRuleEventPageItemDto): ActionItem[] {
  return [
    {
      key: 'detail',
      onClick: () => openRuleEventDetail(row),
      text: '详情',
    },
  ];
}
</script>

<template>
  <Page auto-content-height content-class="es-full-height-page-content">
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
              <VbenTableAction
                align="center"
                :actions="getSettlementActions(row)"
              />
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
              <VbenTableAction
                align="center"
                :actions="getRuleEventActions(row)"
              />
            </template>
          </RuleEventsGrid>
        </div>
      </el-tab-pane>
    </EsFullHeightTabs>

    <SettlementDetailDrawer :title="settlementDetailTitle">
      <div v-if="currentSettlement" class="growth-operations-detail">
        <VbenDescriptions :column="2" bordered>
          <VbenDescriptionsItem label="结算 ID">
            {{ currentSettlement.id }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="用户 ID">
            {{ currentSettlement.userId }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="事件 key">
            {{ currentSettlement.eventKey || '-' }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="事件编码">
            {{ getGrowthTypeLabel(currentSettlement.eventCode) }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="来源">
            {{ currentSettlement.source || '-' }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="业务键">
            {{ currentSettlement.bizKey || '-' }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="结算类型">
            {{
              getOptionLabel(
                settlementTypeOptions,
                currentSettlement.settlementType,
              )
            }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="结算状态">
            {{
              getOptionLabel(
                settlementStatusOptions,
                currentSettlement.settlementStatus,
              )
            }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="结算结果">
            {{
              getOptionLabel(
                settlementResultOptions,
                currentSettlement.settlementResultType,
              )
            }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="重试次数">
            {{ currentSettlement.retryCount }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="来源事实 ID">
            {{ currentSettlement.sourceRecordId ?? '-' }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="目标">
            {{ currentSettlement.targetType ?? '-' }} /
            {{ currentSettlement.targetId ?? '-' }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="发生时间">
            {{ formatDateTime(currentSettlement.eventOccurredAt) }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="落定时间">
            {{ formatDateTime(currentSettlement.settledAt) }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="最近重试">
            {{ formatDateTime(currentSettlement.lastRetryAt) }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="创建时间">
            {{ formatDateTime(currentSettlement.createdAt) }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="更新时间">
            {{ formatDateTime(currentSettlement.updatedAt) }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem :span="2" label="账本记录">
            {{ formatSettlementLedgerIds(currentSettlement) }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem :span="2" label="最后错误">
            {{ currentSettlement.lastError || '-' }}
          </VbenDescriptionsItem>
        </VbenDescriptions>

        <div class="growth-operations-detail__block">
          <div class="growth-operations-detail__title">原始载荷</div>
          <pre>{{ formatJsonBlock(currentSettlement.requestPayload) }}</pre>
        </div>
      </div>
    </SettlementDetailDrawer>

    <RuleEventDetailDrawer :title="ruleEventDetailTitle">
      <div v-if="currentRuleEvent" class="growth-operations-detail">
        <VbenDescriptions :column="2" bordered>
          <VbenDescriptionsItem label="规则类型">
            {{ getGrowthTypeLabel(currentRuleEvent.ruleType) }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="事件名称">
            {{ currentRuleEvent.eventName }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="事件 key">
            {{ currentRuleEvent.ruleKey }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="事件域">
            {{ getOptionLabel(ruleDomainOptions, currentRuleEvent.domain) }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="实现状态">
            {{ getOptionLabel(implStatusOptions, currentRuleEvent.implStatus) }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="已接入 producer">
            {{ formatBoolean(currentRuleEvent.isImplemented) }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="有基础奖励">
            {{ formatBoolean(currentRuleEvent.hasBaseReward) }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="有关联任务">
            {{ formatBoolean(currentRuleEvent.hasTask) }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="支持任务目标">
            {{ formatBoolean(currentRuleEvent.supportsTaskObjective) }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem label="治理门禁">
            {{
              getOptionLabel(
                governanceGateOptions,
                currentRuleEvent.governanceGate,
              )
            }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem :span="2" label="奖励策略">
            {{ currentRuleEvent.rewardPolicy || '-' }}
          </VbenDescriptionsItem>
          <VbenDescriptionsItem :span="2" label="资产规则">
            <pre>{{ formatAssetRules(currentRuleEvent.assetRules) }}</pre>
          </VbenDescriptionsItem>
          <VbenDescriptionsItem :span="2" label="任务绑定">
            <pre>{{ formatTaskBinding(currentRuleEvent.taskBinding) }}</pre>
          </VbenDescriptionsItem>
        </VbenDescriptions>
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
