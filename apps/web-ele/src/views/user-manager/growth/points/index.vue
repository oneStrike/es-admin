<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';
import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type {
  BaseGrowthRewardRuleDto,
  GrowthRewardRulesCreateRequest,
  GrowthRewardRulesUpdateRequest,
} from '#/api/types';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  growthRewardRulesCreateApi,
  growthRewardRulesDetailApi,
  growthRewardRulesPageApi,
  growthRewardRulesUpdateApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import RecordDetailModal from '#/components/record-detail-modal';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils';

import { getDetailSections } from './modules/model/detail';
import {
  formSchema,
  pageColumns,
  searchFormSchema,
} from './modules/model/shared';

const POINTS_ASSET_TYPE = 1 as const;
type RewardRuleRow = BaseGrowthRewardRuleDto & {
  loading?: boolean;
};

function normalizeRewardRulePayload(
  values: GrowthRewardRulesCreateRequest | GrowthRewardRulesUpdateRequest,
): GrowthRewardRulesCreateRequest | GrowthRewardRulesUpdateRequest {
  const payload = {
    type: values.type,
    delta: values.delta,
    dailyLimit: values.dailyLimit,
    totalLimit: values.totalLimit,
    isEnabled: values.isEnabled,
    remark: values.remark,
    assetKey: '',
    assetType: POINTS_ASSET_TYPE,
  };

  return 'id' in values && typeof values.id === 'number'
    ? ({ id: values.id, ...payload } as GrowthRewardRulesUpdateRequest)
    : (payload as GrowthRewardRulesCreateRequest);
}

const gridOptions: VxeGridProps<RewardRuleRow> = {
  columns: pageColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await growthRewardRulesPageApi(
          formatQuery({
            page,
            formValues: {
              ...formValues,
              assetType: POINTS_ASSET_TYPE,
            },
            sorts,
          }),
        );
      },
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
  title: '积分规则详情',
});

async function openFormModal(row?: RewardRuleRow) {
  let record;
  if (row) {
    record = await growthRewardRulesDetailApi({ id: row.id });
  }
  formApi.setData({ title: '积分规则', record, schema: formSchema }).open();
}

async function handleSubmit(
  values: GrowthRewardRulesCreateRequest | GrowthRewardRulesUpdateRequest,
) {
  const isUpdate = 'id' in values && !!values.id;
  const payload = normalizeRewardRulePayload(values);

  await (isUpdate
    ? growthRewardRulesUpdateApi(payload as GrowthRewardRulesUpdateRequest)
    : growthRewardRulesCreateApi(payload as GrowthRewardRulesCreateRequest));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function toggleEnableStatus(row: RewardRuleRow) {
  row.loading = true;
  try {
    await growthRewardRulesUpdateApi({
      assetKey: row.assetKey ?? '',
      assetType: POINTS_ASSET_TYPE,
      dailyLimit: row.dailyLimit,
      delta: row.delta,
      id: row.id,
      isEnabled: !row.isEnabled,
      remark: row.remark,
      totalLimit: row.totalLimit,
      type: row.type,
    });
    useMessage.success('操作成功');
    gridApi.reload();
  } finally {
    row.loading = false;
  }
}

function getPointRuleActions(row: RewardRuleRow): ActionItem[] {
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
  ];
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <el-button class="ml-2" type="primary" @click="openFormModal()">
          添加积分规则
        </el-button>
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
        <VbenTableAction align="center" :actions="getPointRuleActions(row)" />
      </template>
    </Grid>

    <Form :on-submit="handleSubmit" />
    <DetailModal
      :api="growthRewardRulesDetailApi"
      :sections="getDetailSections"
      class="min-w-[800px]"
    />
  </Page>
</template>

<style scoped></style>
