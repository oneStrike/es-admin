<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type { ExperienceEventOption } from './modules/model/constants';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  BaseGrowthRewardRuleDto,
  GrowthRewardRulesCreateRequest,
  GrowthRewardRulesUpdateRequest,
  GrowthRuleEventPageItemDto,
  UserExperienceRecordDto,
  UserExperienceStatsDto,
} from '#/api/types';

import { computed, onMounted, reactive, ref } from 'vue';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';

import { ElMessageBox } from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  growthExperienceRecordDetailApi,
  growthExperienceRecordPageApi,
  growthExperienceStatsApi,
  growthRewardEventOptionListApi,
  growthRewardRulesArchiveApi,
  growthRewardRulesCreateApi,
  growthRewardRulesDetailApi,
  growthRewardRulesPageApi,
  growthRewardRulesUpdateApi,
  growthRuleEventsPageApi,
} from '#/api/core';
import EsFullHeightTabs from '#/components/es-full-height-tabs';
import EsModalForm from '#/components/es-modal-form/index.vue';
import RecordDetailModal from '#/components/record-detail-modal';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils';

import {
  createExperienceEventOptions,
  experienceEnabledOptions,
  experienceImplStatusOptions,
} from './modules/model/constants';
import {
  getRecordDetailSections,
  getRuleDetailSections,
} from './modules/model/detail';
import {
  buildExperienceEventCoverageQuery,
  buildExperienceRecordQuery,
  buildExperienceRuleQuery,
  buildExperienceStatsQuery,
  createExperienceEventCoverageColumns,
  createExperienceEventCoverageSearchSchema,
  createExperienceRecordColumns,
  createExperienceRecordSearchSchema,
  createExperienceRuleColumns,
  createExperienceRuleFormSchema,
  createExperienceRuleSearchSchema,
  createExperienceStatsSearchSchema,
  normalizeExperienceRulePayload,
} from './modules/model/shared';

defineOptions({
  name: 'UserGrowthExperience',
});

type TabKey = 'events' | 'records' | 'rules' | 'stats';
type RuleRow = BaseGrowthRewardRuleDto & { loading?: boolean };
type ElementTagType = 'danger' | 'info' | 'primary' | 'success' | 'warning';

const activeTab = ref<TabKey>('records');
const loadingEvents = ref(false);
const statsLoading = ref(false);
const statsData = ref<null | UserExperienceStatsDto>(null);
const configurableEventOptions = reactive<ExperienceEventOption[]>([]);
const coverageEventOptions = reactive<ExperienceEventOption[]>([]);

const recordsGridOptions: VxeGridProps<UserExperienceRecordDto> = {
  columns: createExperienceRecordColumns(coverageEventOptions),
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await growthExperienceRecordPageApi(
          formatQuery({
            page,
            formValues: buildExperienceRecordQuery(formValues),
            sorts,
          }),
        );
      },
    },
    sort: true,
  },
};

const rulesGridOptions: VxeGridProps<BaseGrowthRewardRuleDto> = {
  columns: createExperienceRuleColumns(configurableEventOptions),
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await growthRewardRulesPageApi(
          formatQuery({
            page,
            formValues: buildExperienceRuleQuery(formValues),
            sorts,
          }),
        );
      },
    },
    sort: true,
  },
};

const eventsGridOptions: VxeGridProps<GrowthRuleEventPageItemDto> = {
  columns: createExperienceEventCoverageColumns(),
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await growthRuleEventsPageApi(
          formatQuery({
            page,
            formValues: buildExperienceEventCoverageQuery(formValues),
            sorts,
          }),
        );
      },
    },
    sort: true,
  },
};

const [RecordsGrid] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(
    createExperienceRecordSearchSchema(coverageEventOptions),
  ),
  gridOptions: recordsGridOptions,
});

const [RulesGrid, rulesGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(
    createExperienceRuleSearchSchema(configurableEventOptions),
  ),
  gridOptions: rulesGridOptions,
});

const [EventsGrid] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(
    createExperienceEventCoverageSearchSchema(coverageEventOptions),
  ),
  gridOptions: eventsGridOptions,
});

const [StatsForm, statsFormApi] = useVbenForm({
  actionPosition: 'left',
  commonConfig: {
    formItemClass: 'max-w-md',
  },
  handleReset: async () => {
    statsData.value = null;
  },
  handleSubmit: async (values) => {
    await loadStats(values);
  },
  layout: 'horizontal',
  schema: createExperienceStatsSearchSchema(),
  wrapperClass: 'grid-cols-1 gap-4',
});

const [RuleForm, ruleFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [RuleDetailModal, ruleDetailApi] = useVbenModal({
  connectedComponent: RecordDetailModal,
  title: '经验规则详情',
});

const [RecordDetailModalInstance, recordDetailApi] = useVbenModal({
  connectedComponent: RecordDetailModal,
  title: '经验流水详情',
});

const statsTitle = computed(() =>
  statsData.value ? '用户经验概览' : '选择用户查看经验概览',
);

function getOptionLabel<T>(
  options: Array<{ label: string; value: T }>,
  value: T,
) {
  return options.find((item) => item.value === value)?.label || '-';
}

function getOptionColor<T>(
  options: Array<{ color?: string; value: T }>,
  value: T,
) {
  return (options.find((item) => item.value === value)?.color ||
    'info') as ElementTagType;
}

function getCurrentLevelText(stats: null | UserExperienceStatsDto) {
  if (!stats?.level) return '暂无等级';
  return `${stats.level.name}（门槛 ${stats.level.requiredExperience}）`;
}

function isArchivedRule(row: BaseGrowthRewardRuleDto) {
  return Boolean(row.archivedAt);
}

async function loadEventOptions() {
  loadingEvents.value = true;
  try {
    const [configurableEvents, coverageEventsPage] = await Promise.all([
      growthRewardEventOptionListApi(),
      growthRuleEventsPageApi({ pageIndex: 1, pageSize: 500 }),
    ]);
    configurableEventOptions.splice(
      0,
      configurableEventOptions.length,
      ...createExperienceEventOptions(configurableEvents),
    );
    coverageEventOptions.splice(
      0,
      coverageEventOptions.length,
      ...createExperienceEventOptions(coverageEventsPage.list ?? [], {
        configurableOnly: false,
      }),
    );
  } finally {
    loadingEvents.value = false;
  }
}

async function loadStats(values: Record<string, unknown>) {
  statsLoading.value = true;
  try {
    statsData.value = await growthExperienceStatsApi(
      buildExperienceStatsQuery(values),
    );
  } finally {
    statsLoading.value = false;
  }
}

async function openRuleForm(row?: BaseGrowthRewardRuleDto) {
  let record: BaseGrowthRewardRuleDto | undefined;
  if (row) {
    record = await growthRewardRulesDetailApi({ id: row.id });
  }
  ruleFormApi
    .setData({
      record,
      schema: createExperienceRuleFormSchema(configurableEventOptions),
      title: '经验规则',
    })
    .open();
}

async function handleRuleSubmit(
  values: GrowthRewardRulesCreateRequest | GrowthRewardRulesUpdateRequest,
) {
  const payload = normalizeExperienceRulePayload(values);
  const isUpdate = 'id' in payload && typeof payload.id === 'number';

  await (isUpdate
    ? growthRewardRulesUpdateApi(payload as GrowthRewardRulesUpdateRequest)
    : growthRewardRulesCreateApi(payload as GrowthRewardRulesCreateRequest));
  useMessage.success('操作成功');
  await rulesGridApi.reload();
}

async function toggleRuleEnable(row: RuleRow) {
  if (isArchivedRule(row)) return;

  row.loading = true;
  try {
    await growthRewardRulesUpdateApi(
      normalizeExperienceRulePayload({
        ...row,
        isEnabled: !row.isEnabled,
      }) as GrowthRewardRulesUpdateRequest,
    );
    useMessage.success('操作成功');
    await rulesGridApi.reload();
  } finally {
    row.loading = false;
  }
}

async function archiveRule(row: BaseGrowthRewardRuleDto) {
  if (isArchivedRule(row)) return;

  let archiveReason: string;
  try {
    const result = await ElMessageBox.prompt(
      '归档后当前规则不可再编辑，新规则可用同一经验事件重新创建。可选填写归档原因。',
      '归档经验规则',
      {
        cancelButtonText: '取消',
        confirmButtonText: '确认归档',
        draggable: true,
        inputPlaceholder: '例如：运营策略调整',
        type: 'warning',
      },
    );
    archiveReason = String(result.value || '').trim();
  } catch {
    return;
  }

  await growthRewardRulesArchiveApi({
    archiveReason: archiveReason || undefined,
    id: row.id,
  });
  useMessage.success('归档成功');
  await rulesGridApi.reload();
}

function openRuleDetail(row: BaseGrowthRewardRuleDto) {
  ruleDetailApi
    .setData({
      api: growthRewardRulesDetailApi,
      id: row.id,
      sections: (detail: Record<string, unknown>) =>
        getRuleDetailSections(
          detail as BaseGrowthRewardRuleDto,
          configurableEventOptions,
        ),
      title: '经验规则详情',
    })
    .open();
}

function openRecordDetail(row: UserExperienceRecordDto) {
  recordDetailApi
    .setData({
      api: growthExperienceRecordDetailApi,
      id: row.id,
      sections: (detail: Record<string, unknown>) =>
        getRecordDetailSections(
          detail as Parameters<typeof getRecordDetailSections>[0],
          coverageEventOptions,
        ),
      title: '经验流水详情',
    })
    .open();
}

async function openEventCoverageDetail(row: GrowthRuleEventPageItemDto) {
  await ElMessageBox.alert(
    [
      `事件名称：${row.eventName}`,
      `事件 key：${row.ruleKey}`,
      `实现状态：${getOptionLabel(experienceImplStatusOptions, row.implStatus)}`,
      `允许配置：${getOptionLabel(experienceEnabledOptions, row.isRuleConfigurable)}`,
      `支持经验：${getOptionLabel(experienceEnabledOptions, row.supportsExperienceRule)}`,
      `不可配置原因：${row.disabledReason || '-'}`,
      `奖励策略：${row.rewardPolicy || '-'}`,
    ].join('\n'),
    '事件覆盖详情',
    {
      confirmButtonText: '关闭',
      draggable: true,
    },
  );
}

function getRecordActions(row: UserExperienceRecordDto): ActionItem[] {
  return [
    {
      key: 'detail',
      onClick: () => openRecordDetail(row),
      text: '详情',
    },
  ];
}

function getRuleActions(row: BaseGrowthRewardRuleDto): ActionItem[] {
  return [
    {
      key: 'detail',
      onClick: () => openRuleDetail(row),
      text: '详情',
    },
    {
      ifShow: () => !isArchivedRule(row),
      key: 'edit',
      onClick: () => openRuleForm(row),
      text: '编辑',
    },
    {
      danger: true,
      ifShow: () => !isArchivedRule(row),
      key: 'archive',
      onClick: () => archiveRule(row),
      text: '归档',
    },
  ];
}

function getEventActions(row: GrowthRuleEventPageItemDto): ActionItem[] {
  return [
    {
      key: 'configurable',
      onClick: () => openEventCoverageDetail(row),
      text: row.isRuleConfigurable && row.supportsExperienceRule ? '可配置' : '查看',
    },
  ];
}

onMounted(() => {
  void loadEventOptions();
  void statsFormApi.resetForm();
});
</script>

<template>
  <Page auto-content-height content-class="es-full-height-page-content">
    <EsFullHeightTabs v-model="activeTab" v-loading="loadingEvents">
      <el-tab-pane label="经验流水" name="records">
        <div class="es-full-height-pane">
          <RecordsGrid class="es-full-height-grid">
            <template #actions="{ row }">
              <VbenTableAction
                align="center"
                :actions="getRecordActions(row)"
              />
            </template>
          </RecordsGrid>
        </div>
      </el-tab-pane>

      <el-tab-pane label="经验规则" name="rules">
        <div class="es-full-height-pane">
          <RulesGrid class="es-full-height-grid">
            <template #toolbar-actions>
              <el-button class="ml-2" type="primary" @click="openRuleForm()">
                添加经验规则
              </el-button>
            </template>

            <template #isEnabled="{ row }">
              <el-switch
                :active-value="true"
                :disabled="isArchivedRule(row)"
                :inactive-value="false"
                :loading="row.loading"
                :model-value="row.isEnabled"
                @change="toggleRuleEnable(row)"
              />
            </template>

            <template #actions="{ row }">
              <VbenTableAction
                align="center"
                :actions="getRuleActions(row)"
              />
            </template>
          </RulesGrid>
        </div>
      </el-tab-pane>

      <el-tab-pane label="事件覆盖" name="events">
        <div class="es-full-height-pane">
          <EventsGrid class="es-full-height-grid">
            <template #implStatus="{ row }">
              <el-tag
                :type="
                  getOptionColor(experienceImplStatusOptions, row.implStatus)
                "
                effect="light"
                round
              >
                {{ getOptionLabel(experienceImplStatusOptions, row.implStatus) }}
              </el-tag>
            </template>

            <template #isRuleConfigurable="{ row }">
              <el-tag
                :type="
                  getOptionColor(
                    experienceEnabledOptions,
                    row.isRuleConfigurable,
                  )
                "
                effect="light"
                round
              >
                {{
                  getOptionLabel(
                    experienceEnabledOptions,
                    row.isRuleConfigurable,
                  )
                }}
              </el-tag>
            </template>

            <template #supportsExperienceRule="{ row }">
              <el-tag
                :type="
                  getOptionColor(
                    experienceEnabledOptions,
                    row.supportsExperienceRule,
                  )
                "
                effect="light"
                round
              >
                {{
                  getOptionLabel(
                    experienceEnabledOptions,
                    row.supportsExperienceRule,
                  )
                }}
              </el-tag>
            </template>

            <template #actions="{ row }">
              <VbenTableAction
                align="center"
                :actions="getEventActions(row)"
              />
            </template>
          </EventsGrid>
        </div>
      </el-tab-pane>

      <el-tab-pane label="用户概览" name="stats">
        <div class="experience-stats" v-loading="statsLoading">
          <StatsForm />

          <section class="experience-stats__panel">
            <div class="experience-stats__header">{{ statsTitle }}</div>
            <div class="experience-stats__metrics">
              <div class="experience-stats__metric">
                <span>当前经验</span>
                <strong>{{ statsData?.currentExperience ?? '-' }}</strong>
              </div>
              <div class="experience-stats__metric">
                <span>今日获得</span>
                <strong>{{ statsData?.todayEarned ?? '-' }}</strong>
              </div>
              <div class="experience-stats__metric">
                <span>当前等级</span>
                <strong>{{ getCurrentLevelText(statsData) }}</strong>
              </div>
            </div>
          </section>
        </div>
      </el-tab-pane>
    </EsFullHeightTabs>

    <RuleForm :on-submit="handleRuleSubmit" />
    <RuleDetailModal class="min-w-[800px]" />
    <RecordDetailModalInstance class="min-w-[800px]" />
  </Page>
</template>

<style scoped>
.experience-stats {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  padding: 16px;
  overflow: auto;
}

.experience-stats__panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 920px;
  padding: 16px;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color-light);
  border-radius: 6px;
}

.experience-stats__header {
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.experience-stats__metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.experience-stats__metric {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 76px;
  padding: 12px;
  background: var(--el-fill-color-lighter);
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 6px;
}

.experience-stats__metric span {
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.experience-stats__metric strong {
  font-size: 20px;
  line-height: 1.3;
  color: var(--el-text-color-primary);
}

@media (max-width: 768px) {
  .experience-stats__metrics {
    grid-template-columns: 1fr;
  }
}
</style>
