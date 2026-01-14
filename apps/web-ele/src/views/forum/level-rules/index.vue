<script lang="ts" setup>
import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type {
  BaseLevelRuleDto,
  LevelRulesCreateRequest,
  LevelRulesUpdateRequest,
} from '#/apis/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  levelRulesCreateApi,
  levelRulesDeleteApi,
  levelRulesDetailApi,
  levelRulesPageApi,
  levelRulesUpdateApi,
} from '#/apis';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';

import { getDetailCards } from './detail';
import { formSchema, pageColumns } from './shared';

/**
 * VxeGrid 配置选项
 */
const gridOptions: VxeGridProps<BaseLevelRuleDto> = {
  columns: pageColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await levelRulesPageApi({
          pageIndex: --page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
    sort: true,
  },
};

/**
 * 表格实例
 */
const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
});

/**
 * 表单弹窗实例
 */
const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

/**
 * 详情弹窗实例
 */
const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
});

/**
 * 打开表单弹窗（新增或编辑）
 * @param row 编辑时的行数据，新增时为空
 */
async function openFormModal(row?: BaseLevelRuleDto) {
  let record;
  if (row) {
    record = await levelRulesDetailApi({ id: row.id });
  }
  formApi.setData({ title: '等级规则', record, schema: formSchema }).open();
}

/**
 * 提交表单（新增或更新）
 * @param values 表单数据
 */
async function handleSubmit(
  values: LevelRulesCreateRequest | LevelRulesUpdateRequest,
) {
  await (values?.id
    ? levelRulesUpdateApi(values as LevelRulesUpdateRequest)
    : levelRulesCreateApi(values as LevelRulesCreateRequest));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

/**
 * 删除等级规则
 * @param record 要删除的记录
 */
async function deleteLevelRule(record: BaseLevelRuleDto) {
  await levelRulesDeleteApi({ id: record.id });
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
              await levelRulesUpdateApi({
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
      title="等级规则详情"
      :api="levelRulesDetailApi"
      :cards="getDetailCards"
      class="!min-w-[800px]"
    />
  </Page>
</template>

<style scoped></style>
