<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';
import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type {
  BaseUserLevelRuleDto,
  GrowthLevelRulesCreateRequest,
  GrowthLevelRulesUpdateRequest,
} from '#/api/types';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  growthLevelRulesCreateApi,
  growthLevelRulesDeleteApi,
  growthLevelRulesDetailApi,
  growthLevelRulesPageApi,
  growthLevelRulesUpdateApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import RecordDetailModal from '#/components/record-detail-modal';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils';

import { getDetailSections } from './modules/model/detail';
import {
  formSchema,
  pageColumns,
  searchFormSchema,
} from './modules/model/shared';

const gridOptions: VxeGridProps<BaseUserLevelRuleDto> = {
  columns: pageColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) =>
        await growthLevelRulesPageApi(formatQuery({ page, formValues, sorts })),
    },
    sort: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
  formOptions: createSearchFormOptions(searchFormSchema),
});

const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: RecordDetailModal,
  title: '等级规则详情',
});

async function openFormModal(row?: BaseUserLevelRuleDto) {
  let record;
  if (row) {
    record = await growthLevelRulesDetailApi({ id: row.id });
  }
  formApi.setData({ title: '等级规则', record, schema: formSchema }).open();
}

function buildLevelRulePayload(
  values: GrowthLevelRulesCreateRequest | GrowthLevelRulesUpdateRequest,
): GrowthLevelRulesCreateRequest | GrowthLevelRulesUpdateRequest {
  const payload = {
    icon: values.icon,
    name: values.name,
    color: values.color,
    description: values.description,
    requiredExperience: values.requiredExperience,
    sortOrder: values.sortOrder,
    loginDays: values.loginDays,
    purchasePayableRate: values.purchasePayableRate,
    dailyTopicLimit: values.dailyTopicLimit,
    dailyReplyCommentLimit: values.dailyReplyCommentLimit,
    dailyLikeLimit: values.dailyLikeLimit,
    dailyFavoriteLimit: values.dailyFavoriteLimit,
    workCollectionLimit: values.workCollectionLimit,
    blacklistLimit: values.blacklistLimit,
    postInterval: values.postInterval,
    isEnabled: values.isEnabled,
  };

  return 'id' in values && typeof values.id === 'number'
    ? ({ id: values.id, ...payload } as GrowthLevelRulesUpdateRequest)
    : (payload as GrowthLevelRulesCreateRequest);
}

async function handleSubmit(
  values: GrowthLevelRulesCreateRequest | GrowthLevelRulesUpdateRequest,
) {
  const payload = buildLevelRulePayload(values);

  await ('id' in payload && typeof payload.id === 'number'
    ? growthLevelRulesUpdateApi(payload as GrowthLevelRulesUpdateRequest)
    : growthLevelRulesCreateApi(payload as GrowthLevelRulesCreateRequest));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function deleteLevelRule(record: BaseUserLevelRuleDto) {
  await growthLevelRulesDeleteApi({ id: record.id });
  useMessage.success('删除成功');
  gridApi.reload();
}

async function confirmDeleteLevelRule(record: BaseUserLevelRuleDto) {
  const confirmed = await useConfirm({
    content: '确认删除当前等级规则?',
    successMessage: false,
  });
  if (!confirmed) return;

  await deleteLevelRule(record);
}

async function toggleEnableStatus(
  row: BaseUserLevelRuleDto & { loading?: boolean },
) {
  row.loading = true;
  try {
    await growthLevelRulesUpdateApi({
      id: row.id,
      isEnabled: !row.isEnabled,
    });
    useMessage.success('操作成功');
    gridApi.reload();
  } finally {
    row.loading = false;
  }
}

function getLevelColorStyle(color?: null | string) {
  return color ? { '--level-rule-color': color } : undefined;
}

function getLevelRuleActions(row: BaseUserLevelRuleDto): ActionItem[] {
  return [
    {
      key: 'detail',
      onClick: () => detailApi.setData({ id: row.id }).open(),
      text: '详情',
    },
    {
      key: 'edit',
      onClick: () => openFormModal(row),
      text: '编辑',
    },
    {
      danger: true,
      key: 'delete',
      onClick: () => confirmDeleteLevelRule(row),
      text: '删除',
    },
  ];
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <el-button class="ml-2" type="primary" @click="openFormModal()">
          添加等级规则
        </el-button>
      </template>

      <template #color="{ row }">
        <div class="flex items-center justify-center">
          <div
            class="level-rule-color-swatch h-6 w-6 rounded-md"
            :style="getLevelColorStyle(row.color)"
          ></div>
          <span class="ml-2">{{ row.color }}</span>
        </div>
      </template>

      <template #isEnabled="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.loading"
          :model-value="row.isEnabled"
          @change="toggleEnableStatus(row)"
        />
      </template>

      <template #actions="{ row }">
        <VbenTableAction align="center" :actions="getLevelRuleActions(row)" />
      </template>
    </Grid>

    <Form :on-submit="handleSubmit" />
    <DetailModal
      :api="growthLevelRulesDetailApi"
      :sections="getDetailSections"
      class="min-w-[800px]"
    />
  </Page>
</template>

<style scoped>
.level-rule-color-swatch {
  background-color: var(--level-rule-color, var(--el-fill-color-light));
}
</style>

<style scoped></style>
