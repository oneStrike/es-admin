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
import { useMessage } from '#/hooks/useFeedback';
import { formatUTC } from '#/utils';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { deliveryColumns, deliverySearchFormSchema } from './model/delivery';
import { dispatchColumns, dispatchSearchFormSchema } from './model/dispatch';
import {
  deliveryStatusMap,
  formatNullable,
  splitDateRange,
} from './model/shared';
import { getWsSummaryItems, windowHourOptions } from './model/ws';

defineOptions({
  name: 'MessageMonitor',
});

const activeTab = ref('dispatch');
const windowHours = ref(24);
const wsSummary = ref<MessageWsMonitorSummaryDto | null>(null);
const wsLoading = ref(false);

const wsSummaryItems = computed(() => getWsSummaryItems(wsSummary.value));

const dispatchGridOptions: VxeGridProps<MessageDispatchPageItemDto> = {
  columns: dispatchColumns,
  height: 'auto',
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
  height: 'auto',
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
  wsLoading.value = true;
  try {
    wsSummary.value = await messageMonitorWsSummaryApi({
      windowHours: windowHours.value,
    });
  } finally {
    wsLoading.value = false;
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
  useMessage.success('重试已提交');
  await deliveryGridApi.reload();
}

onMounted(fetchWsSummary);
</script>

<template>
  <Page auto-content-height>
    <div class="flex h-full min-h-0 flex-col gap-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div class="text-base font-medium">WS 监控摘要</div>
          <div class="text-xs text-gray-400">
            {{
              wsSummary?.windowStartAt
                ? `窗口开始：${formatUTC(wsSummary.windowStartAt, 'YYYY-MM-DD HH:mm:ss')}`
                : '选择统计窗口查看实时摘要'
            }}
          </div>
        </div>
        <div class="flex items-center gap-2">
          <el-radio-group
            v-model="windowHours"
            :disabled="wsLoading"
            @change="fetchWsSummary"
          >
            <el-radio-button
              v-for="item in windowHourOptions"
              :key="item.value"
              :label="item.value"
            >
              {{ item.label }}
            </el-radio-button>
          </el-radio-group>
          <el-button
            :loading="wsLoading"
            type="primary"
            @click="fetchWsSummary"
          >
            刷新
          </el-button>
        </div>
      </div>

      <div
        v-loading="wsLoading"
        class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        <el-card
          v-for="item in wsSummaryItems"
          :key="item.label"
          shadow="never"
        >
          <div class="text-xs text-gray-400">{{ item.label }}</div>
          <div
            class="mt-2 text-xl font-semibold"
            :class="metricTextClass(item.tone)"
          >
            {{ item.value }}
          </div>
        </el-card>
      </div>

      <el-tabs v-model="activeTab" class="min-h-0 flex-1">
        <el-tab-pane label="调度记录" name="dispatch">
          <DispatchGrid />
        </el-tab-pane>
        <el-tab-pane label="投递结果" name="delivery">
          <DeliveryGrid>
            <template #category="{ row }">
              <div class="min-w-0">
                <div class="truncate">
                  {{ row.categoryLabel || row.categoryKey || '-' }}
                </div>
                <div
                  v-if="row.categoryKey"
                  class="truncate text-xs text-gray-400"
                >
                  {{ row.categoryKey }}
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
              <el-popconfirm
                v-if="canRetryDelivery(row)"
                :title="`确认重试 Dispatch ${formatNullable(row.dispatchId)} ?`"
                cancel-button-text="取消"
                confirm-button-text="确认"
                @confirm="retryDelivery(row)"
              >
                <template #reference>
                  <el-button link type="primary">重试</el-button>
                </template>
              </el-popconfirm>
              <span v-else>-</span>
            </template>
          </DeliveryGrid>
        </el-tab-pane>
      </el-tabs>
    </div>
  </Page>
</template>
