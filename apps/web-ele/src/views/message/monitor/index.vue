<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  MessageDispatchPageItemDto,
  MessageNotificationDeliveryItemDto,
  MessageWsMonitorSummaryDto,
} from '#/api/types';

import { computed, onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  messageMonitorDeliveryPageApi,
  messageMonitorDeliveryRetryApi,
  messageMonitorDispatchPageApi,
  messageMonitorWsSummaryApi,
} from '#/api/core';
import EsFullHeightTabs from '#/components/es-full-height-tabs';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { deliveryColumns, deliverySearchFormSchema } from './model/delivery';
import { dispatchColumns, dispatchSearchFormSchema } from './model/dispatch';
import {
  attentionSummaryQueries,
  deliveryStatusMap,
  formatNullable,
  getMonitorNotificationCategoryLabel,
  getPageTotal,
  splitDateRange,
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
const attentionSummary = ref({
  failedDeliveryTotal: 0,
  failedDispatchTotal: 0,
  retryingDeliveryTotal: 0,
});

const realtimeSummaryText = computed(() =>
  getRealtimeSummaryText(wsSummary.value),
);
const overviewItems = computed(() => [
  {
    label: '送达失败',
    tone: 'danger',
    value: attentionSummary.value.failedDeliveryTotal,
  },
  {
    label: '等待自动重试',
    tone: 'warning',
    value: attentionSummary.value.retryingDeliveryTotal,
  },
  {
    label: '发送任务失败',
    tone: 'danger',
    value: attentionSummary.value.failedDispatchTotal,
  },
  ...getWsSummaryItems(wsSummary.value),
]);
const overviewGridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${Math.ceil(overviewItems.value.length / 2)}, minmax(150px, 1fr))`,
}));

const dispatchGridOptions: VxeGridProps<MessageDispatchPageItemDto> = {
  columns: dispatchColumns,
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await messageMonitorDispatchPageApi(
          formatQuery({
            page,
            formValues: splitDateRange(formValues),
            sorts,
          }),
        );
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
        return await messageMonitorDeliveryPageApi(
          formatQuery({
            page,
            formValues: splitDateRange(formValues),
            sorts,
          }),
        );
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
});

async function fetchWsSummary() {
  wsSummary.value = await messageMonitorWsSummaryApi({
    windowHours: windowHours.value,
  });
}

async function fetchAttentionSummary() {
  const [failedDelivery, retryingDelivery, failedDispatch] = await Promise.all([
    messageMonitorDeliveryPageApi(attentionSummaryQueries.failedDelivery),
    messageMonitorDeliveryPageApi(attentionSummaryQueries.retryingDelivery),
    messageMonitorDispatchPageApi(attentionSummaryQueries.failedDispatch),
  ]);

  attentionSummary.value = {
    failedDeliveryTotal: getPageTotal(failedDelivery),
    failedDispatchTotal: getPageTotal(failedDispatch),
    retryingDeliveryTotal: getPageTotal(retryingDelivery),
  };
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

async function retryDelivery(row: MessageNotificationDeliveryItemDto) {
  await messageMonitorDeliveryRetryApi({ dispatchId: row.dispatchId });
  useMessage.success('重新发送已提交');
  await deliveryGridApi.reload();
  await refreshOverview();
}

async function confirmRetryDelivery(row: MessageNotificationDeliveryItemDto) {
  const confirmed = await useConfirm({
    content: `确认重新发送任务 ${formatNullable(row.dispatchId)} 对应的通知？`,
    successMessage: false,
  });
  if (!confirmed) return;

  await retryDelivery(row);
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
        class="grid shrink-0 grid-rows-2 gap-3 overflow-x-auto pb-1"
        :style="overviewGridStyle"
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

              <template #usedTemplate="{ row }">
                <el-tag
                  :type="row.usedTemplate ? 'success' : 'info'"
                  size="small"
                >
                  {{ row.usedTemplate ? '是' : '否' }}
                </el-tag>
              </template>

              <template #actions="{ row }">
                <el-button
                  v-if="canRetryDelivery(row)"
                  link
                  type="primary"
                  @click="confirmRetryDelivery(row)"
                >
                  重新发送
                </el-button>
                <span v-else>-</span>
              </template>
            </DeliveryGrid>
          </div>
        </el-tab-pane>
      </EsFullHeightTabs>
    </div>
  </Page>
</template>
