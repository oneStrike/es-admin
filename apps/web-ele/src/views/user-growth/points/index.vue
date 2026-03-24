<script lang="ts" setup>
import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type {
  BaseUserPointRuleDto,
  GrowthPointsRulesCreateRequest,
  GrowthPointsRulesUpdateRequest,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  growthPointsRulesCreateApi,
  growthPointsRulesDetailApi,
  growthPointsRulesPageApi,
  growthPointsRulesUpdateApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils';

import { getDetailCards } from './modules/model/detail';
import {
  formSchema,
  pageColumns,
  searchFormSchema,
} from './modules/model/shared';

const gridOptions: VxeGridProps<BaseUserPointRuleDto> = {
  columns: pageColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await growthPointsRulesPageApi(
          formatQuery({
            page,
            formValues,
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
  connectedComponent: EsRecordDetail,
  title: '积分规则详情',
});

async function openFormModal(row?: BaseUserPointRuleDto) {
  let record;
  if (row) {
    record = await growthPointsRulesDetailApi({ id: row.id });
  }
  formApi.setData({ title: '积分规则', record, schema: formSchema }).open();
}

async function handleSubmit(
  values: GrowthPointsRulesCreateRequest | GrowthPointsRulesUpdateRequest,
) {
  await (values?.id
    ? growthPointsRulesUpdateApi(values as GrowthPointsRulesUpdateRequest)
    : growthPointsRulesCreateApi(values as GrowthPointsRulesCreateRequest));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function toggleEnableStatus(
  row: BaseUserPointRuleDto & { loading?: boolean },
) {
  row.loading = true;
  try {
    await growthPointsRulesUpdateApi({
      id: row.id,
      type: row.type,
      points: row.points,
      dailyLimit: row.dailyLimit,
      totalLimit: row.totalLimit,
      remark: row.remark,
      isEnabled: !row.isEnabled,
    });
    useMessage.success('操作成功');
    gridApi.reload();
  } finally {
    row.loading = false;
  }
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
        <div class="my-1">
          <el-button
            link
            type="primary"
            @click="detailApi.setData({ recordId: row.id }).open()"
          >
            详情
          </el-button>
          <el-divider direction="vertical" />
          <el-button link type="primary" @click="openFormModal(row)">
            编辑
          </el-button>
        </div>
      </template>
    </Grid>

    <Form :on-submit="handleSubmit" />
    <DetailModal
      :api="growthPointsRulesDetailApi"
      :cards="getDetailCards"
      class="!min-w-[800px]"
    />
  </Page>
</template>

<style scoped></style>
