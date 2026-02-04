<script setup lang="ts">
import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type {
  AuthorPageResponseDto,
  CreateAuthorDto,
  UpdateAuthorDto,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  authorCreateApi,
  authorDeleteApi,
  authorDetailApi,
  authorPageApi,
  authorUpdateApi,
  authorUpdateIsRecommendedApi,
  authorUpdateStatusApi,
} from '#/api';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useDict } from '#/hooks/useDict';
import { useMessage } from '#/hooks/useFeedback';
import { useForm } from '#/hooks/useForm';
import { createSearchFormOptions } from '#/utils';

import { getDetailCards } from './detail';
import { authorColumns, authorSearchSchema, formSchema } from './shared';

/**
 * 通用的成功处理：提示 + 刷新（遵循DRY原则封装重复逻辑）
 */
function handleSuccessReload(gridApi: any, message = '操作成功'): void {
  useMessage.success(message);
  gridApi.reload();
}

/**
 * VxeGrid 的选项配置
 */
const gridOptions: VxeGridProps<AuthorPageResponseDto> = {
  columns: authorColumns,
  proxyConfig: {
    ajax: {
      query: ({ page, sorts }, formValues) =>
        authorPageApi(formatQuery({ page, formValues, sorts })),
    },
    sort: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
  formOptions: createSearchFormOptions(authorSearchSchema, {
    showCollapseButton: true,
  }),
});

const nationalityMap = ref();
useDict('nationality').then(({ nationality }) => {
  nationalityMap.value = nationality?.labels ?? {};
  useForm.setOptions(formSchema, {
    nationality: nationality?.options || [],
  });
  useForm.setOptions(authorSearchSchema, {
    nationality: nationality?.options || [],
  });
  gridApi.formApi.updateSchema(authorSearchSchema);
});
/**
 * 新建/编辑弹窗
 */
const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

/**
 * 详情弹窗
 */
const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
});

/**
 * 打开表单弹窗
 */
async function openFormModal(row?: AuthorPageResponseDto): Promise<void> {
  let record: any;
  if (row) {
    record = await authorDetailApi({ id: row.id });
  }
  formApi
    .setData({
      title: '作者',
      record,
      schema: formSchema,
    })
    .open();
}

/**
 * 切换启用状态
 */
async function toggleEnableStatus(row: AuthorPageResponseDto): Promise<void> {
  row.loading = true as any;
  await authorUpdateStatusApi({
    id: row.id,
    isEnabled: !row.isEnabled,
  });
  handleSuccessReload(gridApi);
  row.loading = false as any;
}

/**
 * 切换推荐状态
 */
async function toggleIsRecommendedStatus(
  row: AuthorPageResponseDto,
): Promise<void> {
  row.loading = true as any;
  await authorUpdateIsRecommendedApi({
    id: row.id,
    isRecommended: !row.isRecommended,
  });
  handleSuccessReload(gridApi);
  row.loading = false as any;
}

/**
 * 新增或更新作者
 */
type AuthorFormValues = CreateAuthorDto | UpdateAuthorDto;

async function addOrUpdateAuthor(values: AuthorFormValues): Promise<void> {
  await (values.id
    ? authorUpdateApi(values as UpdateAuthorDto)
    : authorCreateApi(values as CreateAuthorDto));
  useMessage.success('操作成功');
  await gridApi.reload();
}

/**
 * 删除作者
 */
async function deleteAuthor(row: AuthorPageResponseDto): Promise<void> {
  await authorDeleteApi({
    id: row.id,
  });
  handleSuccessReload(gridApi);
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <el-button class="ml-2" type="primary" @click="openFormModal()">
          添加
        </el-button>
      </template>

      <template #isEnabled="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="row.isEnabled"
          :loading="row.loading"
          :model-value="row.isEnabled"
          @change="toggleEnableStatus(row)"
        />
      </template>

      <template #nationality="{ row }">
        <span>{{ nationalityMap?.[row.nationality!] || '-' }}</span>
      </template>
      <template #isRecommended="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="row.isRecommended"
          :loading="row.loading"
          :model-value="row.isRecommended"
          @change="toggleIsRecommendedStatus(row)"
        />
      </template>

      <template #actions="{ row }">
        <el-button
          link
          type="primary"
          @click="
            detailApi
              .setData({
                recordId: row.id,
                extraData: { nationalityMap: nationalityMap.value },
              })
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
          title="确认删除当前项?"
          confirm-button-text="确认"
          cancel-button-text="取消"
          @confirm="deleteAuthor(row)"
        >
          <template #reference>
            <el-button link type="danger" :disabled="row.isEnabled">
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </Grid>

    <!-- 复用模块化的表单 schema -->
    <Form :schema="formSchema" :on-submit="addOrUpdateAuthor" />
    <DetailModal
      title="作者详情"
      :api="authorDetailApi"
      :cards="getDetailCards"
      class="!min-w-[800px]"
    />
  </Page>
</template>

<style scoped></style>
