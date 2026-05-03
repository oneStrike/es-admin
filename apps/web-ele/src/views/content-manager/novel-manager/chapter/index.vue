<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  ContentNovelChapterCreateRequest,
  ContentNovelChapterDetailResponse,
  ContentNovelChapterUpdateRequest,
} from '#/api/types';

import { useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  contentNovelChapterCreateApi,
  contentNovelChapterDeleteApi,
  contentNovelChapterDetailApi,
  contentNovelChapterPageApi,
  contentNovelChapterSwapSortOrderApi,
  contentNovelChapterUpdateApi,
  growthLevelRulesPageApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { useForm } from '#/hooks/useForm';
import { createSearchFormOptions } from '#/utils';

import ContentEditor from './content-editor.vue';
import { chapterColumns } from './model/columns';
import { getDetailCards } from './model/detail';
import { chapterFormSchema, chapterSearchFormSchema } from './model/form';

defineOptions({
  name: 'NovelChapterManager',
});

type ShareData = { workId: number; workName: string };

const shareData = ref<ShareData>();
const currentChapterRecord =
  ref<null | Partial<ContentNovelChapterDetailResponse>>(null);

const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    if (isOpen) {
      shareData.value = modalApi.getData<ShareData>();
      modalApi.setState({
        title: `${shareData.value?.workName} - 章节管理`,
      });
    }
  },
});

const [FormModal, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = formApi.getData();
      formApi.setState({
        title: data?.record?.id ? '编辑章节' : '新增章节',
      });
    }
  },
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
});

const [ContentModal, contentApi] = useVbenModal({
  connectedComponent: ContentEditor,
});

const gridOptions: VxeGridProps<ContentNovelChapterDetailResponse> = {
  columns: chapterColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        formValues.workId = shareData.value?.workId;
        return await contentNovelChapterPageApi(
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
  rowConfig: {
    drag: true,
  },
  rowDragConfig: {
    async dragEndMethod(params) {
      await contentNovelChapterSwapSortOrderApi({
        dragId: params.dragRow.id,
        targetId: params.newRow.id,
      });
      await gridApi.reload();
      useMessage.success('排序调整成功');
      return true;
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
  formOptions: createSearchFormOptions(chapterSearchFormSchema),
});

growthLevelRulesPageApi({ isEnabled: true }).then((res) => {
  const options =
    res?.list?.map((item) => ({
      label: item.name,
      value: item.id,
    })) || [];
  useForm.setOptions(chapterFormSchema, {
    requiredViewLevelId: options,
  });
});

function openDetailModal(record: ContentNovelChapterDetailResponse) {
  detailApi
    .setData({
      recordId: record.id,
      title: record.title,
    })
    .open();
}

function openContentModal(record: ContentNovelChapterDetailResponse) {
  const data = shareData.value;
  if (!data) return;

  contentApi
    .setData({
      chapterId: record.id,
      chapterTitle: record.title,
      workId: data.workId,
    })
    .open();
}

async function openFormModal(record?: ContentNovelChapterDetailResponse) {
  const recordData = record?.id
    ? await contentNovelChapterDetailApi({ id: record.id })
    : null;
  currentChapterRecord.value = recordData ?? null;

  formApi
    .setData({
      cols: 2,
      record: recordData,
      width: 860,
    })
    .open();
}

async function handleSubmit(
  values: ContentNovelChapterCreateRequest | ContentNovelChapterUpdateRequest,
) {
  const data = shareData.value;
  if (!data) return;

  const payload = {
    ...(values as Record<string, any>),
    canComment:
      values.canComment ?? currentChapterRecord.value?.canComment ?? true,
    canDownload:
      values.canDownload ?? currentChapterRecord.value?.canDownload ?? false,
    isPreview:
      values.isPreview ?? currentChapterRecord.value?.isPreview ?? false,
    price: values.price ?? currentChapterRecord.value?.price ?? 0,
    viewRule: values.viewRule ?? currentChapterRecord.value?.viewRule ?? -1,
    workId: data.workId,
    workType: 2,
  } as ContentNovelChapterCreateRequest | ContentNovelChapterUpdateRequest;

  await (payload?.id
    ? contentNovelChapterUpdateApi(payload as ContentNovelChapterUpdateRequest)
    : contentNovelChapterCreateApi(
        payload as ContentNovelChapterCreateRequest,
      ));

  useMessage.success(payload?.id ? '章节更新成功' : '章节创建成功');
  await gridApi.reload();
}

async function deleteChapter(record: ContentNovelChapterDetailResponse) {
  await contentNovelChapterDeleteApi({ id: record.id });
  useMessage.success('章节删除成功');
  await gridApi.reload();
}

async function toggleStatus(
  row: ContentNovelChapterDetailResponse & { loading?: boolean },
) {
  row.loading = true;
  try {
    await contentNovelChapterUpdateApi({
      id: row.id,
      isPublished: !row.isPublished,
    } as ContentNovelChapterUpdateRequest);
    useMessage.success('状态切换成功');
    await gridApi.reload();
  } finally {
    row.loading = false;
  }
}
</script>

<template>
  <Modal class="h-[900px] w-[1200px]">
    <Grid>
      <template #toolbar-actions>
        <el-button type="primary" @click="openFormModal()">
          添加章节
        </el-button>
      </template>

      <template #title="{ row }">
        <el-text
          class="cursor-pointer hover:opacity-70"
          type="primary"
          @click="openDetailModal(row)"
        >
          {{ row.title }}
        </el-text>
      </template>

      <template #isPublished="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.loading"
          :model-value="row.isPublished"
          @change="toggleStatus(row)"
        />
      </template>

      <template #actions="{ row }">
        <div class="my-1 flex items-center justify-center gap-1">
          <el-button link type="primary" @click="openContentModal(row)">
            内容
          </el-button>
          <el-divider direction="vertical" />
          <el-button link type="primary" @click="openFormModal(row)">
            编辑
          </el-button>
          <el-divider direction="vertical" />
          <el-popconfirm
            title="确认删除该章节？此操作不可恢复"
            confirm-button-text="确认"
            cancel-button-text="取消"
            type="warning"
            @confirm="deleteChapter(row)"
          >
            <template #reference>
              <el-button link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </Grid>

    <FormModal :schema="chapterFormSchema" :on-submit="handleSubmit" />

    <DetailModal :api="contentNovelChapterDetailApi" :cards="getDetailCards" />

    <ContentModal />
  </Modal>
</template>

<style scoped></style>
