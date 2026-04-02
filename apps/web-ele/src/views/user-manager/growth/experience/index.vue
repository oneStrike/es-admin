<script lang="ts" setup>
import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type {
  BaseUserExperienceRuleDto,
  GrowthExperienceRulesCreateRequest,
  GrowthExperienceRulesUpdateRequest,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  growthExperienceRulesCreateApi,
  growthExperienceRulesDeleteApi,
  growthExperienceRulesDetailApi,
  growthExperienceRulesPageApi,
  growthExperienceRulesUpdateApi,
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

const gridOptions: VxeGridProps<BaseUserExperienceRuleDto> = {
  columns: pageColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await growthExperienceRulesPageApi(
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
  title: '经验规则详情',
});

async function openFormModal(row?: BaseUserExperienceRuleDto) {
  let record;
  if (row) {
    record = await growthExperienceRulesDetailApi({ id: row.id });
  }
  formApi.setData({ title: '经验规则', record, schema: formSchema }).open();
}

async function handleSubmit(
  values: GrowthExperienceRulesCreateRequest | GrowthExperienceRulesUpdateRequest,
) {
  await (values?.id
    ? growthExperienceRulesUpdateApi(values as GrowthExperienceRulesUpdateRequest)
    : growthExperienceRulesCreateApi(values as GrowthExperienceRulesCreateRequest));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function deleteExperienceRule(record: BaseUserExperienceRuleDto) {
  await growthExperienceRulesDeleteApi({ id: record.id });
  useMessage.success('删除成功');
  gridApi.reload();
}

async function toggleEnableStatus(
  row: BaseUserExperienceRuleDto & { loading?: boolean },
) {
  row.loading = true;
  try {
    await growthExperienceRulesUpdateApi({
      id: row.id,
      type: row.type,
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
          添加经验规则
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
          <el-divider direction="vertical" />
          <el-popconfirm
            title="确认删除当前经验规则?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="deleteExperienceRule(row)"
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
      :api="growthExperienceRulesDetailApi"
      :cards="getDetailCards"
      class="!min-w-[800px]"
    />
  </Page>
</template>

<style scoped></style>
