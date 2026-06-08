<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type { NovelChapterRecord } from './model/types';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  ContentNovelChapterBatchDeleteRequest,
  ContentNovelChapterBatchUpdateStatusRequest,
  ContentNovelChapterCreateRequest,
  ContentNovelChapterPageResponse,
  ContentNovelChapterUpdateRequest,
} from '#/api/types';

import { useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  contentNovelChapterBatchDeleteApi,
  contentNovelChapterBatchUpdateStatusApi,
  contentNovelChapterCreateApi,
  contentNovelChapterDeleteApi,
  contentNovelChapterDetailApi,
  contentNovelChapterPageApi,
  contentNovelChapterSwapSortOrderApi,
  contentNovelChapterUpdateApi,
  growthLevelRulesPageApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import RecordDetailModal from '#/components/record-detail-modal';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { useForm } from '#/hooks/useForm';
import { createSearchFormOptions } from '#/utils';

import ContentEditor from './content-editor.vue';
import { chapterColumns } from './model/columns';
import { getDetailSections } from './model/detail';
import { chapterFormSchema, chapterSearchFormSchema } from './model/form';

defineOptions({
  name: 'NovelChapterManager',
});

type ShareData = { workId: number; workName: string };

const shareData = ref<ShareData>();
const currentChapterRecord = ref<null | Partial<NovelChapterRecord>>(null);
const selectedChapterRows = ref<NovelChapterRecord[]>([]);
const selectedChapterIds = computed(() =>
  selectedChapterRows.value.map((item) => item.id),
);

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
  connectedComponent: RecordDetailModal,
});

const [ContentModal, contentApi] = useVbenModal({
  connectedComponent: ContentEditor,
});

type NovelChapterPageData = Omit<ContentNovelChapterPageResponse, 'list'> & {
  list?: NovelChapterRecord[];
};

const gridOptions: VxeGridProps<NovelChapterRecord> = {
  checkboxConfig: {
    highlight: true,
  },
  columns: chapterColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const workId = shareData.value?.workId;

        if (typeof workId !== 'number') {
          return { list: [], total: 0 };
        }

        const response = await contentNovelChapterPageApi(
          formatQuery({
            page,
            formValues: {
              ...formValues,
              workId,
            },
            sorts,
          }),
        );
        return {
          ...response,
          list: response.list as NovelChapterRecord[] | undefined,
        } satisfies NovelChapterPageData;
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
  gridEvents: {
    checkboxAll: handleChapterSelectionChange,
    checkboxChange: handleChapterSelectionChange,
  },
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

function handleChapterSelectionChange(params: {
  records: NovelChapterRecord[];
}) {
  selectedChapterRows.value = params.records;
}

function openDetailModal(record: NovelChapterRecord) {
  detailApi
    .setData({
      id: record.id,
      title: record.title,
    })
    .open();
}

function openContentModal(record: NovelChapterRecord) {
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

async function openFormModal(record?: NovelChapterRecord) {
  const recordData = record?.id
    ? ((await contentNovelChapterDetailApi({
        id: record.id,
      })) as NovelChapterRecord)
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

  const payload = buildNovelChapterPayload(values, data.workId);

  await (payload?.id
    ? contentNovelChapterUpdateApi(payload as ContentNovelChapterUpdateRequest)
    : contentNovelChapterCreateApi(
        payload as ContentNovelChapterCreateRequest,
      ));

  useMessage.success(payload?.id ? '章节更新成功' : '章节创建成功');
  await gridApi.reload();
}

function buildNovelChapterPayload(
  values: ContentNovelChapterCreateRequest | ContentNovelChapterUpdateRequest,
  workId: number,
): ContentNovelChapterCreateRequest | ContentNovelChapterUpdateRequest {
  const payload = {
    cover: values.cover,
    sortOrder: values.sortOrder,
    title: values.title,
    subtitle: values.subtitle,
    requiredViewLevelId: values.requiredViewLevelId,
    publishAt: values.publishAt,
    description: values.description,
    content: values.content,
    remark: values.remark,
    canComment:
      values.canComment ?? currentChapterRecord.value?.canComment ?? true,
    canDownload:
      values.canDownload ?? currentChapterRecord.value?.canDownload ?? false,
    isPreview:
      values.isPreview ?? currentChapterRecord.value?.isPreview ?? false,
    price: values.price ?? currentChapterRecord.value?.price ?? 0,
    viewRule: values.viewRule ?? currentChapterRecord.value?.viewRule ?? -1,
    workId,
    workType: 2,
  };

  return 'id' in values && typeof values.id === 'number'
    ? ({ id: values.id, ...payload } as ContentNovelChapterUpdateRequest)
    : (payload as ContentNovelChapterCreateRequest);
}

async function deleteChapter(record: NovelChapterRecord) {
  await contentNovelChapterDeleteApi({ id: record.id });
  useMessage.success('章节删除成功');
  selectedChapterRows.value = [];
  gridApi.grid?.clearCheckboxRow?.();
  await gridApi.reload();
}

async function confirmDeleteChapter(record: NovelChapterRecord) {
  const confirmed = await useConfirm({
    content: '确认删除该章节？此操作不可恢复',
    successMessage: false,
  });
  if (!confirmed) return;

  await deleteChapter(record);
}

async function batchDeleteChapters() {
  const ids = selectedChapterIds.value;
  if (ids.length === 0) {
    useMessage.warning('请先选择要删除的章节');
    return;
  }

  await contentNovelChapterBatchDeleteApi({
    ids,
  } satisfies ContentNovelChapterBatchDeleteRequest);
  useMessage.success(`已删除 ${ids.length} 个章节`);
  selectedChapterRows.value = [];
  gridApi.grid?.clearCheckboxRow?.();
  await gridApi.reload();
}

async function confirmBatchDeleteChapters() {
  const confirmed = await useConfirm({
    content: `确认删除选中的 ${selectedChapterIds.value.length} 个章节？此操作不可恢复`,
    successMessage: false,
  });
  if (!confirmed) return;

  await batchDeleteChapters();
}

async function toggleStatus(row: NovelChapterRecord) {
  row.loading = true;
  try {
    await contentNovelChapterBatchUpdateStatusApi({
      ids: [row.id],
      isPublished: !row.isPublished,
    });
    useMessage.success('状态切换成功');
    await gridApi.reload();
  } finally {
    row.loading = false;
  }
}

async function batchUpdateChapterStatus(isPublished: boolean) {
  const ids = selectedChapterIds.value;
  if (ids.length === 0) {
    useMessage.warning('请先选择章节');
    return;
  }

  await contentNovelChapterBatchUpdateStatusApi({
    ids,
    isPublished,
  } satisfies ContentNovelChapterBatchUpdateStatusRequest);
  useMessage.success(isPublished ? '已批量发布章节' : '已批量下架章节');
  selectedChapterRows.value = [];
  gridApi.grid?.clearCheckboxRow?.();
  await gridApi.reload();
}

function getNovelChapterActions(row: NovelChapterRecord): ActionItem[] {
  return [
    {
      key: 'content',
      onClick: () => openContentModal(row),
      text: '内容',
    },
    {
      key: 'edit',
      onClick: () => openFormModal(row),
      text: '编辑',
    },
    {
      danger: true,
      key: 'delete',
      onClick: () => confirmDeleteChapter(row),
      text: '删除',
    },
  ];
}
</script>

<template>
  <Modal class="h-[900px] w-[1200px]">
    <Grid>
      <template #toolbar-actions>
        <el-button type="primary" @click="openFormModal()">
          添加章节
        </el-button>
        <el-button
          :disabled="selectedChapterIds.length === 0"
          type="danger"
          @click="confirmBatchDeleteChapters"
        >
          批量删除
        </el-button>
        <el-button
          :disabled="selectedChapterIds.length === 0"
          type="success"
          @click="batchUpdateChapterStatus(true)"
        >
          批量发布
        </el-button>
        <el-button
          :disabled="selectedChapterIds.length === 0"
          @click="batchUpdateChapterStatus(false)"
        >
          批量下架
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
        <VbenTableAction
          align="center"
          :actions="getNovelChapterActions(row)"
        />
      </template>
    </Grid>

    <FormModal :schema="chapterFormSchema" :on-submit="handleSubmit" />

    <DetailModal
      :api="contentNovelChapterDetailApi"
      :sections="getDetailSections"
    />

    <ContentModal />
  </Modal>
</template>

<style scoped></style>
