<script lang="ts" setup>
import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type {
  BaseUserPointRuleDto,
  PointsRulesRulesCreateRequest,
  PointsRulesRulesUpdateRequest,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  pointsRulesRulesCreateApi,
  pointsRulesRulesDetailApi,
  pointsRulesRulesPageApi,
  pointsRulesRulesUpdateApi,
} from '#/api';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils';

import { getDetailCards } from './modules/detail';
import { formSchema, pageColumns, searchFormSchema } from './modules/shared';

const gridOptions: VxeGridProps<BaseUserPointRuleDto> = {
  columns: pageColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await pointsRulesRulesPageApi(
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
});

async function openFormModal(row?: BaseUserPointRuleDto) {
  let record;
  if (row) {
    record = await pointsRulesRulesDetailApi({ id: row.id });
  }
  formApi.setData({ title: '积分规则', record, schema: formSchema }).open();
}

async function handleSubmit(
  values: PointsRulesRulesCreateRequest | PointsRulesRulesUpdateRequest,
) {
  await (values?.id
    ? pointsRulesRulesUpdateApi(values as PointsRulesRulesUpdateRequest)
    : pointsRulesRulesCreateApi(values as PointsRulesRulesCreateRequest));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
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
          :model-value="row.isEnabled"
          @change="
            async () => {
              row.loading = true;
              await pointsRulesRulesUpdateApi({
                id: row.id,
                type: row.type,
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
                .setData({ title: '积分规则详情', recordId: row.id })
                .open()
            "
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
      :api="pointsRulesRulesDetailApi"
      :cards="getDetailCards"
      class="!min-w-[800px]"
    />
  </Page>
</template>

<style scoped></style>
