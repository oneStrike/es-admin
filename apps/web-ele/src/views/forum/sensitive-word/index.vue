<script lang="ts" setup>
import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type {
  BaseSensitiveWordDto,
  ForumSensitiveWordCreateRequest,
  ForumSensitiveWordUpdateRequest,
} from '#/api/types';

import { ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  forumSensitiveWordCreateApi,
  forumSensitiveWordDeleteApi,
  forumSensitiveWordPageApi,
  forumSensitiveWordUpdateApi,
  forumSensitiveWordUpdateStatusApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import SensitiveWordDetectDrawer from './components/sensitive-word-detect-drawer.vue';
import {
  formSchema,
  pageColumns,
  searchFormSchema,
} from './modules/model/shared';

const router = useRouter();
const detectDrawerVisible = ref(false);

const gridOptions: VxeGridProps<BaseSensitiveWordDto> = {
  columns: pageColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await forumSensitiveWordPageApi(
          formatQuery({ page, sorts, formValues }),
        );
      },
    },
    sort: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(searchFormSchema),
  gridOptions,
});

const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

async function openFormModal(row?: BaseSensitiveWordDto) {
  formApi.setData({ title: '敏感词', record: row }).open();
}

function buildSensitiveWordPayload(
  values: ForumSensitiveWordCreateRequest | ForumSensitiveWordUpdateRequest,
): ForumSensitiveWordCreateRequest | ForumSensitiveWordUpdateRequest {
  const payload = {
    word: values.word,
    type: values.type,
    level: values.level,
    matchMode: values.matchMode,
    replaceWord: values.replaceWord,
    isEnabled: values.isEnabled,
    remark: values.remark,
  };

  return 'id' in values && typeof values.id === 'number'
    ? ({ id: values.id, ...payload } as ForumSensitiveWordUpdateRequest)
    : (payload as ForumSensitiveWordCreateRequest);
}

async function handleSubmit(
  values: ForumSensitiveWordCreateRequest | ForumSensitiveWordUpdateRequest,
) {
  const payload = buildSensitiveWordPayload(values);

  await ('id' in payload && typeof payload.id === 'number'
    ? forumSensitiveWordUpdateApi(payload as ForumSensitiveWordUpdateRequest)
    : forumSensitiveWordCreateApi(payload as ForumSensitiveWordCreateRequest));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function deleteSensitiveWord(record: BaseSensitiveWordDto) {
  await forumSensitiveWordDeleteApi({ id: record.id });
  useMessage.success('删除成功');
  gridApi.reload();
}

async function confirmDeleteSensitiveWord(record: BaseSensitiveWordDto) {
  const confirmed = await useConfirm({
    content: '确认删除当前敏感词?',
    successMessage: false,
  });
  if (!confirmed) return;

  await deleteSensitiveWord(record);
}

async function toggleEnableStatus(record: BaseSensitiveWordDto) {
  record.loading = true;
  try {
    await forumSensitiveWordUpdateStatusApi({
      id: record.id,
      isEnabled: !record.isEnabled,
    });
    useMessage.success('操作成功');
    gridApi.reload();
  } finally {
    record.loading = false;
  }
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <el-button class="ml-2" type="primary" @click="openFormModal()">
          添加敏感词
        </el-button>
        <el-button class="ml-2" @click="detectDrawerVisible = true">
          检测工具
        </el-button>
        <el-button
          class="ml-2"
          @click="router.push({ name: 'ForumSensitiveWordStatistics' })"
        >
          统计信息
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
          <el-button link type="primary" @click="openFormModal(row)">
            编辑
          </el-button>
          <el-divider direction="vertical" />
          <el-button
            link
            type="danger"
            @click="confirmDeleteSensitiveWord(row)"
          >
            删除
          </el-button>
        </div>
      </template>
    </Grid>

    <Form :schema="formSchema" :on-submit="handleSubmit" />
    <SensitiveWordDetectDrawer v-model:visible="detectDrawerVisible" />
  </Page>
</template>

<style scoped></style>
