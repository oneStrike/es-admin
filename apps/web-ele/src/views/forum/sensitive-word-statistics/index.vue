<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import type {
  ForumSensitiveWordRecentHitStatisticsDto,
  ForumSensitiveWordStatisticsDataDto,
  ForumSensitiveWordTopHitStatisticsDto,
} from '#/api/types';

import { onMounted, ref } from 'vue';

import { AnalysisChartCard, AnalysisOverview, Page } from '@vben/common-ui';
import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { statisticsFullApi } from '#/api';
import {
  AlertCircleIcon,
  DeleteBinIcon,
  EditIcon,
  PlusCircleIcon,
} from '#/components/es-icons';

defineOptions({
  name: 'ForumSensitiveWordStatistics',
});

const statisticsData = ref<ForumSensitiveWordStatisticsDataDto | null>(null);
const loading = ref(false);

const levelChartRef = ref<EchartsUIType>();
const typeChartRef = ref<EchartsUIType>();
const trendChartRef = ref<EchartsUIType>();

const { renderEcharts: renderLevelChart } = useEcharts(levelChartRef);
const { renderEcharts: renderTypeChart } = useEcharts(typeChartRef);
const { renderEcharts: renderTrendChart } = useEcharts(trendChartRef);

const topHitWordsColumns = [
  { field: 'word', title: '敏感词', minWidth: 200 },
  {
    field: 'hitCount',
    title: '命中次数',
    minWidth: 120,
  },
  {
    field: 'level',
    title: '级别',
    minWidth: 100,
    cellRender: {
      name: 'CellTag',
      props: {
        mapOptions: [
          { label: '1', value: 1, type: 'danger' },
          { label: '2', value: 2, type: 'warning' },
          { label: '3', value: 3, type: 'info' },
        ],
      },
    },
  },
  { field: 'type', title: '类型', minWidth: 100 },
  {
    field: 'lastHitAt',
    title: '最后命中时间',
    minWidth: 180,
    cellRender: {
      name: 'CellDate',
    },
  },
];

const recentHitWordsColumns = [
  { field: 'word', title: '敏感词', minWidth: 200 },
  {
    field: 'hitCount',
    title: '命中次数',
    minWidth: 120,
  },
  {
    field: 'level',
    title: '级别',
    minWidth: 100,
    cellRender: {
      name: 'CellTag',
      props: {
        mapOptions: [
          { label: '1', value: 1, type: 'danger' },
          { label: '2', value: 2, type: 'warning' },
          { label: '3', value: 3, type: 'info' },
        ],
      },
    },
  },
  { field: 'type', title: '类型', minWidth: 100 },
  {
    field: 'lastHitAt',
    title: '最后命中时间',
    minWidth: 180,
    cellRender: {
      name: 'CellDate',
    },
  },
];

const topHitWordsGridOptions = {
  columns: topHitWordsColumns,
  data: [] as ForumSensitiveWordTopHitStatisticsDto[],
  height: 400,
  emptyText: '暂无数据',
};

const recentHitWordsGridOptions = {
  columns: recentHitWordsColumns,
  data: [] as ForumSensitiveWordRecentHitStatisticsDto[],
  height: 400,
  emptyText: '暂无数据',
};

const [TopHitWordsGrid] = useVbenVxeGrid({
  gridOptions: topHitWordsGridOptions,
});

const [RecentHitWordsGrid] = useVbenVxeGrid({
  gridOptions: recentHitWordsGridOptions,
});

async function fetchStatistics() {
  loading.value = true;
  try {
    const data = await statisticsFullApi();
    statisticsData.value = data;
    topHitWordsGridOptions.data = data.topHitWords || [];
    recentHitWordsGridOptions.data = data.recentHitWords || [];
    renderCharts();
  } catch (error) {
    console.error('获取统计数据失败:', error);
  } finally {
    loading.value = false;
  }
}

function renderCharts() {
  if (!statisticsData.value) return;

  renderLevelChart({
    legend: {
      bottom: '2%',
      left: 'center',
    },
    series: [
      {
        animationDelay() {
          return Math.random() * 100;
        },
        animationEasing: 'exponentialInOut',
        animationType: 'scale',
        avoidLabelOverlap: false,
        color: ['#5ab1ef', '#b6a2de', '#67e0e3'],
        data: statisticsData.value.levelStatistics.map((item: any) => ({
          name: item.levelName,
          value: item.count,
        })),
        emphasis: {
          label: {
            fontSize: '12',
            fontWeight: 'bold',
            show: true,
          },
        },
        itemStyle: {
          borderRadius: 10,
          borderWidth: 2,
        },
        label: {
          position: 'center',
          show: false,
        },
        labelLine: {
          show: false,
        },
        name: '级别分布',
        radius: ['40%', '65%'],
        type: 'pie',
      },
    ],
    tooltip: {
      trigger: 'item',
    },
  });

  renderTypeChart({
    legend: {
      bottom: '2%',
      left: 'center',
    },
    series: [
      {
        animationDelay() {
          return Math.random() * 100;
        },
        animationEasing: 'exponentialInOut',
        animationType: 'scale',
        avoidLabelOverlap: false,
        color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9', '#ffb980'],
        data: statisticsData.value.typeStatistics.map((item: any) => ({
          name: item.typeName,
          value: item.count,
        })),
        emphasis: {
          label: {
            fontSize: '12',
            fontWeight: 'bold',
            show: true,
          },
        },
        itemStyle: {
          borderRadius: 10,
          borderWidth: 2,
        },
        label: {
          position: 'center',
          show: false,
        },
        labelLine: {
          show: false,
        },
        name: '类型分布',
        radius: ['40%', '65%'],
        type: 'pie',
      },
    ],
    tooltip: {
      trigger: 'item',
    },
  });

  renderTrendChart({
    grid: {
      bottom: 0,
      containLabel: true,
      left: '1%',
      right: '1%',
      top: '2%',
    },
    series: [
      {
        barMaxWidth: 80,
        color: '#5ab1ef',
        data: [
          statisticsData.value.todayHits,
          statisticsData.value.lastWeekHits,
          statisticsData.value.lastMonthHits,
        ],
        type: 'bar',
      },
    ],
    tooltip: {
      axisPointer: {
        lineStyle: {
          width: 1,
        },
      },
      trigger: 'axis',
    },
    xAxis: {
      data: ['今日', '本周', '本月'],
      type: 'category',
    },
    yAxis: {
      type: 'value',
    },
  });
}

onMounted(() => {
  fetchStatistics();
});
</script>

<template>
  <Page auto-content-height>
    <div v-loading="loading" class="mb-5">
      <AnalysisOverview
        v-if="statisticsData"
        :items="[
          {
            icon: PlusCircleIcon,
            title: '敏感词总数',
            totalTitle: '启用敏感词',
            totalValue: statisticsData.enabledWords,
            value: statisticsData.totalWords,
          },
          {
            icon: AlertCircleIcon,
            title: '今日命中',
            totalTitle: '总命中次数',
            totalValue: statisticsData.totalHits,
            value: statisticsData.todayHits,
          },
          {
            icon: EditIcon,
            title: '本周命中',
            totalTitle: '本月命中',
            totalValue: statisticsData.lastMonthHits,
            value: statisticsData.lastWeekHits,
          },
          {
            icon: DeleteBinIcon,
            title: '禁用敏感词',
            totalTitle: '敏感词总数',
            totalValue: statisticsData.totalWords,
            value: statisticsData.disabledWords,
          },
        ]"
      />

      <div class="mt-5 w-full md:flex">
        <AnalysisChartCard
          class="mt-5 md:mr-4 md:mt-0 md:w-1/3"
          title="级别分布"
        >
          <EchartsUI ref="levelChartRef" />
        </AnalysisChartCard>
        <AnalysisChartCard
          class="mt-5 md:mr-4 md:mt-0 md:w-1/3"
          title="类型分布"
        >
          <EchartsUI ref="typeChartRef" />
        </AnalysisChartCard>
        <AnalysisChartCard class="mt-5 md:mt-0 md:w-1/3" title="命中趋势">
          <EchartsUI ref="trendChartRef" />
        </AnalysisChartCard>
      </div>

      <div v-if="statisticsData" class="mt-5">
        <el-card shadow="hover">
          <TopHitWordsGrid>
            <template #toolbar-actions>
              <div class="flex items-center justify-between">
                <span class="text-lg font-bold">Top 命中敏感词</span>
              </div>
            </template>
          </TopHitWordsGrid>
        </el-card>

        <el-card class="mt-4" shadow="hover">
          <RecentHitWordsGrid>
            <template #toolbar-actions>
              <div class="flex items-center justify-between">
                <span class="text-lg font-bold">最近命中敏感词</span>
              </div>
            </template>
          </RecentHitWordsGrid>
        </el-card>
      </div>
    </div>
  </Page>
</template>
