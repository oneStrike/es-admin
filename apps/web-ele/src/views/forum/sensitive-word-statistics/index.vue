<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';
import type { EchartsUIType } from '@vben/plugins/echarts';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  CommentUpdateAuditStatusRequest,
  ForumTopicUpdateAuditStatusRequest,
  SensitiveWordHitLogPageItemDto,
  SensitiveWordLevelStatisticsDto,
  SensitiveWordStatisticsDataDto,
  SensitiveWordTopHitStatisticsDto,
  SensitiveWordTypeStatisticsDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { nextTick, onMounted, ref } from 'vue';

import {
  AnalysisChartCard,
  AnalysisOverview,
  Page,
  useVbenModal,
  VbenTableAction,
} from '@vben/common-ui';
import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  commentDetailApi,
  commentUpdateAuditStatusApi,
  forumSensitiveWordHitLogPageApi,
  forumSensitiveWordStatsFullApi,
  forumTopicDetailApi,
  forumTopicUpdateAuditStatusApi,
} from '#/api/core';
import {
  AlertCircleIcon,
  DeleteBinIcon,
  EditIcon,
  PlusCircleIcon,
} from '#/components/es-icons';
import EsModalForm from '#/components/es-modal-form/index.vue';
import RecordDetailModal from '#/components/record-detail-modal';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailSections as getCommentDetailSections } from '../../content-governance/comments/model/detail';
import { auditFormSchema as commentAuditFormSchema } from '../../content-governance/comments/model/shared';
import {
  formatSensitiveWordOptionLabel,
  sensitiveWordAuditStatusMap,
  sensitiveWordHitEntityStatusMap,
  sensitiveWordHitEntityTypeOptions,
  sensitiveWordHitOperationTypeOptions,
  sensitiveWordLevelOptions,
  sensitiveWordTypeOptions,
} from '../sensitive-word/modules/model/constants';
import { getDetailSections as getTopicDetailSections } from '../topic/model/detail';
import { auditFormSchema as topicAuditFormSchema } from '../topic/model/shared';

defineOptions({
  name: 'ForumSensitiveWordStatistics',
});

type HitLogSearchFormValues = Record<string, unknown> & {
  dateRange?: string[];
};
type CommentAuditFormValues = Pick<
  CommentUpdateAuditStatusRequest,
  'auditReason' | 'auditStatus' | 'id'
>;
type TagType = 'danger' | 'info' | 'primary' | 'success' | 'warning';
type TopicAuditFormValues = Pick<
  ForumTopicUpdateAuditStatusRequest,
  'auditReason' | 'auditStatus' | 'id'
>;

const statisticsData = ref<null | SensitiveWordStatisticsDataDto>(null);
const loading = ref(false);
const activeTab = ref('overview');
const tagTypes = new Set<TagType>([
  'danger',
  'info',
  'primary',
  'success',
  'warning',
]);

const levelChartRef = ref<EchartsUIType>();
const typeChartRef = ref<EchartsUIType>();
const trendChartRef = ref<EchartsUIType>();

const { renderEcharts: renderLevelChart } = useEcharts(levelChartRef);
const { renderEcharts: renderTypeChart } = useEcharts(typeChartRef);
const { renderEcharts: renderTrendChart } = useEcharts(trendChartRef);

const statisticWordColumns: VxeGridProps<SensitiveWordTopHitStatisticsDto>['columns'] =
  [
    { field: 'word', title: '敏感词', minWidth: 200 },
    {
      field: 'hitCount',
      title: '命中次数',
      minWidth: 120,
    },
    {
      field: 'level',
      title: '级别',
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: sensitiveWordLevelOptions,
        },
      },
    },
    {
      field: 'type',
      title: '类型',
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: sensitiveWordTypeOptions,
        },
      },
    },
    {
      field: 'lastHitAt',
      title: '最后命中时间',
      minWidth: 180,
      cellRender: {
        name: 'CellDate',
      },
    },
    {
      field: 'actions',
      fixed: 'right',
      slots: { default: 'actions' },
      title: '操作',
      width: 120,
    },
  ];

const topHitWordsGridOptions = {
  columns: statisticWordColumns,
  data: [] as SensitiveWordTopHitStatisticsDto[],
  height: 400,
  emptyText: '暂无数据',
};

const recentHitWordsGridOptions = {
  columns: statisticWordColumns,
  data: [] as SensitiveWordTopHitStatisticsDto[],
  height: 400,
  emptyText: '暂无数据',
};

const hitLogSearchFormSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '敏感词或命中文本',
    },
    fieldName: 'word',
    label: '敏感词',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: sensitiveWordLevelOptions,
      placeholder: '敏感词级别',
    },
    fieldName: 'level',
    label: '敏感词级别',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: sensitiveWordTypeOptions,
      placeholder: '敏感词类型',
    },
    fieldName: 'type',
    label: '敏感词类型',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: sensitiveWordHitEntityTypeOptions,
      placeholder: '内容类型',
    },
    fieldName: 'entityType',
    label: '内容类型',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: sensitiveWordHitOperationTypeOptions,
      placeholder: '操作类型',
    },
    fieldName: 'operationType',
    label: '操作类型',
  },
  {
    component: 'DatePicker',
    componentProps: {
      clearable: true,
      endPlaceholder: '命中结束时间',
      startPlaceholder: '命中开始时间',
      type: 'daterange',
      valueFormat: 'YYYY-MM-DD',
    },
    fieldName: 'dateRange',
    label: '命中时间',
  },
];

const hitLogColumns: VxeGridProps<SensitiveWordHitLogPageItemDto>['columns'] = [
  {
    field: 'matchedWord',
    minWidth: 160,
    showOverflow: 'tooltip',
    title: '实际命中',
  },
  {
    field: 'word',
    minWidth: 160,
    showOverflow: 'tooltip',
    title: '词库敏感词',
  },
  {
    field: 'level',
    title: '级别',
    width: 110,
    cellRender: {
      name: 'CellTag',
      props: {
        mapOptions: sensitiveWordLevelOptions,
      },
    },
  },
  {
    field: 'type',
    title: '类型',
    width: 120,
    cellRender: {
      name: 'CellTag',
      props: {
        mapOptions: sensitiveWordTypeOptions,
      },
    },
  },
  {
    field: 'entityType',
    title: '内容类型',
    width: 110,
    cellRender: {
      name: 'CellTag',
      props: {
        mapOptions: sensitiveWordHitEntityTypeOptions,
      },
    },
  },
  {
    field: 'operationType',
    title: '操作',
    width: 110,
    cellRender: {
      name: 'CellTag',
      props: {
        mapOptions: sensitiveWordHitOperationTypeOptions,
      },
    },
  },
  {
    field: 'entitySummary',
    minWidth: 280,
    slots: { default: 'entitySummary' },
    title: '关联内容',
  },
  {
    field: 'authorSummary',
    minWidth: 180,
    slots: { default: 'authorSummary' },
    title: '作者',
  },
  {
    field: 'createdAt',
    minWidth: 180,
    sortable: true,
    title: '命中时间',
    cellRender: {
      name: 'CellDate',
    },
  },
  {
    field: 'actions',
    fixed: 'right',
    slots: { default: 'actions' },
    title: '操作',
    width: 120,
  },
];

const hitLogGridOptions: VxeGridProps<SensitiveWordHitLogPageItemDto> = {
  columns: hitLogColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const { dateRange, ...restFormValues } = (formValues ||
          {}) as HitLogSearchFormValues;
        const [startDate, endDate] = Array.isArray(dateRange) ? dateRange : [];

        return await forumSensitiveWordHitLogPageApi(
          formatQuery({
            page,
            formValues: {
              ...restFormValues,
              endDate,
              startDate,
            },
            sorts,
          }),
        );
      },
    },
    sort: true,
  },
};

const [TopHitWordsGrid] = useVbenVxeGrid({
  gridOptions: topHitWordsGridOptions,
});

const [RecentHitWordsGrid] = useVbenVxeGrid({
  gridOptions: recentHitWordsGridOptions,
});

const [HitLogGrid, hitLogGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(hitLogSearchFormSchema),
  gridOptions: hitLogGridOptions,
});

const [TopicDetailModal, topicDetailApi] = useVbenModal({
  connectedComponent: RecordDetailModal,
  title: '帖子详情',
});

const [CommentDetailModal, commentDetailApiRef] = useVbenModal({
  connectedComponent: RecordDetailModal,
  title: '评论详情',
});

const [TopicAuditForm, topicAuditFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [CommentAuditForm, commentAuditFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

async function fetchStatistics() {
  loading.value = true;
  try {
    const data = await forumSensitiveWordStatsFullApi();
    statisticsData.value = data;
    topHitWordsGridOptions.data = data.topHitWords || [];
    recentHitWordsGridOptions.data = data.recentHitWords || [];
    renderCharts();
  } catch {
    useMessage.error('获取统计数据失败');
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
        color: ['#f56c6c', '#e6a23c', '#67c23a'],
        data: statisticsData.value.levelStatistics.map(
          (item: SensitiveWordLevelStatisticsDto) => ({
            name: formatSensitiveWordOptionLabel(
              sensitiveWordLevelOptions,
              item.level,
            ),
            value: item.count,
          }),
        ),
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
        color: ['#5470c6', '#ee6666', '#fac858', '#91cc75', '#73c0de'],
        data: statisticsData.value.typeStatistics.map(
          (item: SensitiveWordTypeStatisticsDto) => ({
            name: formatSensitiveWordOptionLabel(
              sensitiveWordTypeOptions,
              item.type,
            ),
            value: item.count,
          }),
        ),
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
        color: '#409eff',
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

function getStatisticWordActions(row: SensitiveWordTopHitStatisticsDto) {
  return [
    {
      key: 'hitLog',
      text: '命中明细',
      onClick: () => openHitLogByWord(row),
    },
  ] satisfies ActionItem[];
}

async function openHitLogByWord(row: SensitiveWordTopHitStatisticsDto) {
  activeTab.value = 'hitLog';
  await nextTick();
  await hitLogGridApi.formApi.setValues({
    level: row.level,
    type: row.type,
    word: row.word,
  });
  await hitLogGridApi.reload();
}

function formatEntitySummary(row: SensitiveWordHitLogPageItemDto) {
  const summary = row.entitySummary;
  const fallback =
    sensitiveWordHitEntityStatusMap[summary.status]?.label || '内容不可处置';

  return summary.title || summary.snippet || fallback;
}

function formatEntityExtra(row: SensitiveWordHitLogPageItemDto) {
  const summary = row.entitySummary;
  const auditStatus = getAuditStatusOption(row)?.label;
  const hiddenText = formatHiddenStatus(summary.isHidden);

  return [auditStatus, hiddenText].filter(Boolean).join(' / ') || '-';
}

function formatHiddenStatus(isHidden?: boolean | null) {
  if (typeof isHidden !== 'boolean') {
    return undefined;
  }

  return isHidden ? '已隐藏' : '未隐藏';
}

function normalizeTagType(type?: string) {
  return tagTypes.has(type as TagType) ? (type as TagType) : undefined;
}

function getEntityStatusType(row: SensitiveWordHitLogPageItemDto) {
  return normalizeTagType(
    sensitiveWordHitEntityStatusMap[row.entitySummary.status]?.color,
  );
}

function getEntityStatusLabel(row: SensitiveWordHitLogPageItemDto) {
  return (
    sensitiveWordHitEntityStatusMap[row.entitySummary.status]?.label || '未知'
  );
}

function getAuditStatusOption(row: SensitiveWordHitLogPageItemDto) {
  const auditStatus = row.entitySummary.auditStatus;

  return typeof auditStatus === 'number'
    ? sensitiveWordAuditStatusMap[auditStatus]
    : undefined;
}

function getAuditStatusType(row: SensitiveWordHitLogPageItemDto) {
  return normalizeTagType(getAuditStatusOption(row)?.color);
}

function getAuditStatusLabel(row: SensitiveWordHitLogPageItemDto) {
  return getAuditStatusOption(row)?.label || '-';
}

function formatAuthorSummary(row: SensitiveWordHitLogPageItemDto) {
  return row.authorSummary?.nickname || '未知用户';
}

function getAuthorStatus(row: SensitiveWordHitLogPageItemDto) {
  if (!row.authorSummary) return '';
  if (row.authorSummary.isEnabled === false) return '禁用';
  if (typeof row.authorSummary.status === 'number') {
    return `状态 ${row.authorSummary.status}`;
  }
  return '正常';
}

function openContentDetail(row: SensitiveWordHitLogPageItemDto) {
  if (!row.entitySummary.canNavigate) return;

  if (row.entityType === 1) {
    topicDetailApi.setData({ id: row.entityId }).open();
    return;
  }

  commentDetailApiRef.setData({ id: row.entityId }).open();
}

async function openAuditModal(row: SensitiveWordHitLogPageItemDto) {
  if (!row.entitySummary.canNavigate) return;

  if (row.entityType === 1) {
    const detail = await forumTopicDetailApi({ id: row.entityId });
    topicAuditFormApi
      .setData({
        cols: 1,
        record: {
          auditReason: detail.auditReason ?? '',
          auditStatus: detail.auditStatus,
          id: detail.id,
        },
        schema: topicAuditFormSchema,
        title: '帖子审核',
        width: 720,
      })
      .open();
    return;
  }

  const detail = await commentDetailApi({ id: row.entityId });
  commentAuditFormApi
    .setData({
      cols: 1,
      record: {
        auditReason: detail.auditReason ?? '',
        auditStatus: detail.auditStatus,
        id: detail.id,
      },
      schema: commentAuditFormSchema,
      title: '评论审核',
      width: 720,
    })
    .open();
}

async function handleTopicAuditSubmit(values: TopicAuditFormValues) {
  const auditStatus = Number(values.auditStatus) as 0 | 1 | 2;
  const auditReason = values.auditReason?.trim?.() || undefined;

  if (auditStatus === 2 && !auditReason) {
    useMessage.warning('拒绝时请填写审核意见');
    throw new Error('missing audit reason');
  }

  await forumTopicUpdateAuditStatusApi({
    auditReason: auditReason || null,
    auditStatus,
    id: Number(values.id),
  } satisfies ForumTopicUpdateAuditStatusRequest);
  topicAuditFormApi.close();
  useMessage.success('审核成功');
  await hitLogGridApi.reload();
}

async function handleCommentAuditSubmit(values: CommentAuditFormValues) {
  const auditStatus = Number(values.auditStatus) as 0 | 1 | 2;
  const auditReason = values.auditReason?.trim?.() || undefined;

  if (auditStatus === 2 && !auditReason) {
    useMessage.warning('拒绝时请填写审核意见');
    throw new Error('missing audit reason');
  }

  await commentUpdateAuditStatusApi({
    auditReason,
    auditStatus,
    id: Number(values.id),
  } satisfies CommentUpdateAuditStatusRequest);
  commentAuditFormApi.close();
  useMessage.success('审核成功');
  await hitLogGridApi.reload();
}

function getHitLogActions(row: SensitiveWordHitLogPageItemDto) {
  return [
    {
      disabled: !row.entitySummary.canNavigate,
      key: 'detail',
      text: '查看内容',
      onClick: () => openContentDetail(row),
    },
    {
      disabled: !row.entitySummary.canNavigate,
      key: 'audit',
      text: '审核',
      onClick: () => openAuditModal(row),
    },
  ] satisfies ActionItem[];
}

onMounted(() => {
  void fetchStatistics();
});
</script>

<template>
  <Page auto-content-height>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="统计概览" name="overview">
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
                  <span class="text-lg font-bold">Top 命中敏感词</span>
                </template>
                <template #actions="{ row }">
                  <VbenTableAction
                    align="center"
                    :actions="getStatisticWordActions(row)"
                  />
                </template>
              </TopHitWordsGrid>
            </el-card>

            <el-card class="mt-4" shadow="hover">
              <RecentHitWordsGrid>
                <template #toolbar-actions>
                  <span class="text-lg font-bold">最近命中敏感词</span>
                </template>
                <template #actions="{ row }">
                  <VbenTableAction
                    align="center"
                    :actions="getStatisticWordActions(row)"
                  />
                </template>
              </RecentHitWordsGrid>
            </el-card>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="命中明细" name="hitLog">
        <HitLogGrid>
          <template #entitySummary="{ row }">
            <div class="min-w-0 text-left">
              <div class="truncate text-sm" :title="formatEntitySummary(row)">
                {{ formatEntitySummary(row) }}
              </div>
              <div class="mt-1 flex flex-wrap items-center gap-1 text-xs">
                <el-tag :type="getEntityStatusType(row)" size="small">
                  {{ getEntityStatusLabel(row) }}
                </el-tag>
                <el-tag
                  v-if="getAuditStatusOption(row)"
                  :type="getAuditStatusType(row)"
                  size="small"
                >
                  {{ getAuditStatusLabel(row) }}
                </el-tag>
                <span class="text-gray-400">{{ formatEntityExtra(row) }}</span>
              </div>
            </div>
          </template>

          <template #authorSummary="{ row }">
            <div class="min-w-0 text-left">
              <div class="truncate text-sm">
                {{ formatAuthorSummary(row) }}
              </div>
              <div class="mt-1 text-xs text-gray-400">
                {{ getAuthorStatus(row) }}
              </div>
            </div>
          </template>

          <template #actions="{ row }">
            <VbenTableAction align="center" :actions="getHitLogActions(row)" />
          </template>
        </HitLogGrid>
      </el-tab-pane>
    </el-tabs>

    <TopicDetailModal
      :api="forumTopicDetailApi"
      :sections="getTopicDetailSections"
      class="w-[1040px]"
    />
    <CommentDetailModal
      :api="commentDetailApi"
      :sections="getCommentDetailSections"
      class="w-[960px]"
    />
    <TopicAuditForm
      :schema="topicAuditFormSchema"
      :on-submit="handleTopicAuditSubmit"
    />
    <CommentAuditForm
      :schema="commentAuditFormSchema"
      :on-submit="handleCommentAuditSubmit"
    />
  </Page>
</template>
