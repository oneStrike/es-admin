<script lang="ts" setup>
import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type {
  BaseUserLevelRuleDto,
  GrowthLevelRulesCreateRequest,
  GrowthLevelRulesUpdateRequest,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  growthLevelRulesCreateApi,
  growthLevelRulesDeleteApi,
  growthLevelRulesDetailApi,
  growthLevelRulesPageApi,
  growthLevelRulesUpdateApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';

import { getDetailCards } from './modules/model/detail';
import { formSchema, pageColumns } from './modules/model/shared';

const gridOptions: VxeGridProps<BaseUserLevelRuleDto> = {
  columns: pageColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await growthLevelRulesPageApi({
          pageIndex: --page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
    sort: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
});

const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
});

async function openFormModal(row?: BaseUserLevelRuleDto) {
  let record;
  if (row) {
    record = await growthLevelRulesDetailApi({ id: row.id });
  }
  formApi.setData({ title: '等级规则', record, schema: formSchema }).open();
}

async function handleSubmit(
  values: GrowthLevelRulesCreateRequest | GrowthLevelRulesUpdateRequest,
) {
  await (values?.id
    ? growthLevelRulesUpdateApi(values as GrowthLevelRulesUpdateRequest)
    : growthLevelRulesCreateApi(values as GrowthLevelRulesCreateRequest));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function deleteLevelRule(record: BaseUserLevelRuleDto) {
  await growthLevelRulesDeleteApi({ id: record.id });
  useMessage.success('删除成功');
  gridApi.reload();
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
            class="h-6 w-6 rounded-md"
            :style="{ backgroundColor: row.color || undefined }"
          ></div>
          <span class="ml-2">{{ row.color }}</span>
        </div>
      </template>

      <template #isEnabled="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :model-value="row.isEnabled"
          @change="
            async () => {
              row.loading = true;
              await growthLevelRulesUpdateApi({
                id: row.id,
                isEnabled: !row.isEnabled,
              });
              useMessage.success('操作成功');
              gridApi.reload();
              row.loading = false;
            }
          "
        />
      </template>

      <template #actions="{ row }">
        <div class="my-1">
          <el-button
            link
            type="primary"
            @click="
              detailApi
                .setData({ title: '等级规则详情', recordId: row.id })
                .open()
            "
          >
            详情
          </el-button>
          <el-divider direction="vertical" />
          <el-button link type="primary" @click="openFormModal(row)">
            编辑
          </el-button>
          <el-divider direction="vertical" />
          <el-popconfirm
            title="确认删除当前等级规则?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="deleteLevelRule(row)"
          >
            <template #reference>
              <el-button link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </Grid>

    <Form :on-submit="handleSubmit" />
    <DetailModal
      :api="growthLevelRulesDetailApi"
      :cards="getDetailCards"
      class="!min-w-[800px]"
    />
  </Page>
</template>

<style scoped></style>
