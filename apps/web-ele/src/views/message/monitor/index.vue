<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  MessageDispatchPageItemDto,
  MessageMonitorDeliveryPageRequest,
  MessageMonitorDispatchPageRequest,
  MessageMonitorSummaryDto,
  MessageNotificationDeliveryItemDto,
  MessageWsMonitorSummaryDto,
} from '#/api/types';

import { computed, onMounted, ref } from 'vue';

import { Page, VbenTableAction } from '@vben/common-ui';

import { ElMessageBox } from 'element-plus';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  messageMonitorDeliveryPageApi,
  messageMonitorDeliveryRetryApi,
  messageMonitorDispatchPageApi,
  messageMonitorSummaryApi,
  messageMonitorWsSummaryApi,
} from '#/api/core';
import EsFullHeightTabs from '#/components/es-full-height-tabs';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { deliveryColumns, deliverySearchFormSchema } from './model/delivery';
import { dispatchColumns, dispatchSearchFormSchema } from './model/dispatch';
import {
  buildDeliveryPageQuery,
  buildDispatchPageQuery,
  deliveryStatusMap,
  formatNullable,
  getMonitorNotificationCategoryLabel,
} from './model/shared';
import {
  getRealtimeSummaryText,
  getWsSummaryItems,
  windowHourOptions,
} from './model/ws';

defineOptions({
  name: 'MessageMonitor',
});

const activeTab = ref('dispatch');
const windowHours = ref(24);
const wsSummary = ref<MessageWsMonitorSummaryDto | null>(null);
const overviewLoading = ref(false);
const monitorSummary = ref<MessageMonitorSummaryDto | null>(null);

const realtimeSummaryText = computed(() =>
  getRealtimeSummaryText(wsSummary.value),
);
const overviewItems = computed(() => [
  {
    label: '送达失败',
    tone: 'danger',
    value: monitorSummary.value?.failedDeliveryCount ?? 0,
  },
  {
    label: '等待自动重试',
    tone: 'warning',
    value: monitorSummary.value?.retryingDeliveryCount ?? 0,
  },
  {
    label: '发送任务失败',
    tone: 'danger',
    value: monitorSummary.value?.failedDispatchCount ?? 0,
  },
  {
    label: '发送任务重试中',
    tone: 'warning',
    value: monitorSummary.value?.retryingDispatchCount ?? 0,
  },
  ...getWsSummaryItems(wsSummary.value),
]);
const dispatchGridOptions: VxeGridProps<MessageDispatchPageItemDto> = {
  columns: dispatchColumns,
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const request = {
          ...formatQuery({
            page,
            formValues: buildDispatchPageQuery(formValues),
            sorts,
          }),
        } satisfies MessageMonitorDispatchPageRequest;

        return await messageMonitorDispatchPageApi(request);
      },
    },
    sort: true,
  },
};

const deliveryGridOptions: VxeGridProps<MessageNotificationDeliveryItemDto> = {
  columns: deliveryColumns,
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const request = {
          ...formatQuery({
            page,
            formValues: buildDeliveryPageQuery(formValues),
            sorts,
          }),
        } satisfies MessageMonitorDeliveryPageRequest;

        return await messageMonitorDeliveryPageApi(request);
      },
    },
    sort: true,
  },
};

const [DispatchGrid] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(dispatchSearchFormSchema),
  gridOptions: dispatchGridOptions,
});

const [DeliveryGrid, deliveryGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(deliverySearchFormSchema),
  gridOptions: deliveryGridOptions,
  viewedRowOptions: {
    keyField: 'id',
    persist: 'message-monitor-delivery-viewed-rows',
  },
});

async function fetchWsSummary() {
  wsSummary.value = await messageMonitorWsSummaryApi({
    windowHours: windowHours.value,
  });
}

async function fetchAttentionSummary() {
  monitorSummary.value = await messageMonitorSummaryApi();
}

async function refreshOverview() {
  overviewLoading.value = true;
  try {
    await Promise.all([fetchWsSummary(), fetchAttentionSummary()]);
  } finally {
    overviewLoading.value = false;
  }
}

function canRetryDelivery(row: MessageNotificationDeliveryItemDto) {
  return row.status === 2;
}

function getDeliveryStatus(row: MessageNotificationDeliveryItemDto) {
  const option = deliveryStatusMap[row.status];
  return {
    color: option?.color || 'info',
    label: row.statusLabel || option?.label || row.status,
  };
}

function metricTextClass(tone: string) {
  const classMap: Record<string, string> = {
    danger: 'text-red-500',
    info: 'text-gray-700 dark:text-gray-100',
    primary: 'text-blue-500',
    success: 'text-green-500',
    warning: 'text-orange-500',
  };

  return classMap[tone] || classMap.info;
}

function getRetryPromptContent(row: MessageNotificationDeliveryItemDto) {
  const categoryLabel = getMonitorNotificationCategoryLabel({
    categoryKey: row.categoryKey,
    categoryLabel: row.categoryLabel,
  });

  return [
    `接收用户：${formatNullable(row.receiverUserId)}`,
    `通知类型：${categoryLabel}`,
    `触发场景：${row.eventLabel || row.eventKey}`,
    `失败原因：${formatNullable(row.failureReason)}`,
  ].join('\n');
}

async function promptRetryReason(row: MessageNotificationDeliveryItemDto) {
  try {
    const result = await ElMessageBox.prompt(
      getRetryPromptContent(row),
      '重新发送通知',
      {
        cancelButtonText: '取消',
        confirmButtonText: '提交重试',
        draggable: true,
        inputPlaceholder: '请填写本次人工重试原因',
        inputType: 'textarea',
        inputValidator(value) {
          const reason = String(value || '').trim();
          return reason.length >= 5 ? true : '请填写不少于 5 个字的重试原因';
        },
        type: 'warning',
      },
    );

    return String(result.value || '').trim();
  } catch {
    return '';
  }
}

async function retryDelivery(
  row: MessageNotificationDeliveryItemDto,
  reason: string,
) {
  await messageMonitorDeliveryRetryApi({
    deliveryId: String(row.id),
    reason,
  });
  deliveryGridApi.markRowAsViewed(row);
  useMessage.success('重新发送已提交');
  await deliveryGridApi.reload();
  await refreshOverview();
}

async function confirmRetryDelivery(row: MessageNotificationDeliveryItemDto) {
  const reason = await promptRetryReason(row);
  if (!reason) return;

  await retryDelivery(row, reason);
}

function getDeliveryActions(
  row: MessageNotificationDeliveryItemDto,
): ActionItem[] {
  return [
    {
      ifShow: () => canRetryDelivery(row),
      key: 'retry',
      onClick: () => confirmRetryDelivery(row),
      text: '重新发送',
    },
  ];
}

onMounted(refreshOverview);
</script>

<template>
  <Page auto-content-height content-class="es-full-height-page-content">
    <div
      class="flex h-full min-h-0 flex-col gap-4 overflow-auto lg:overflow-hidden"
    >
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div class="text-base font-medium">实时消息通道</div>
          <div class="text-xs text-gray-400">{{ realtimeSummaryText }}</div>
        </div>
        <div class="flex items-center gap-2">
          <el-radio-group
            v-model="windowHours"
            :disabled="overviewLoading"
            @change="refreshOverview"
          >
            <el-radio-button
              v-for="item in windowHourOptions"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </el-radio-button>
          </el-radio-group>
          <el-button
            :loading="overviewLoading"
            type="primary"
            @click="refreshOverview"
          >
            刷新
          </el-button>
        </div>
      </div>

      <div
        v-loading="overviewLoading"
        class="grid shrink-0 grid-flow-col grid-rows-2 auto-cols-[minmax(150px,1fr)] gap-3 overflow-x-auto pb-1"
      >
        <el-card v-for="item in overviewItems" :key="item.label" shadow="never">
          <div class="text-xs text-gray-400">{{ item.label }}</div>
          <div
            class="mt-2 text-xl font-semibold"
            :class="metricTextClass(item.tone)"
          >
            {{ item.value }}
          </div>
        </el-card>
      </div>

      <EsFullHeightTabs
        v-model="activeTab"
        class="!min-h-[720px] flex-1 lg:!min-h-0"
      >
        <el-tab-pane label="发送任务" name="dispatch">
          <div class="es-full-height-pane">
            <DispatchGrid class="es-full-height-grid" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="通知送达明细" name="delivery">
          <div class="es-full-height-pane">
            <DeliveryGrid class="es-full-height-grid">
              <template #category="{ row }">
                <div class="min-w-0">
                  <div class="truncate">
                    {{
                      getMonitorNotificationCategoryLabel({
                        categoryKey: row.categoryKey,
                        categoryLabel: row.categoryLabel,
                      })
                    }}
                  </div>
                </div>
              </template>

              <template #deliveryStatus="{ row }">
                <el-tag :type="getDeliveryStatus(row).color" size="small">
                  {{ getDeliveryStatus(row).label }}
                </el-tag>
              </template>

              <template #actions="{ row }">
                <VbenTableAction
                  align="center"
                  :actions="getDeliveryActions(row)"
                />
              </template>
            </DeliveryGrid>
          </div>
        </el-tab-pane>
      </EsFullHeightTabs>
    </div>
  </Page>
</template>
