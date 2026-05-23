<script lang="ts" setup>
import type { ComicChapterRecord } from './model/types';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  ContentComicChapterBatchUpdateStatusRequest,
  ContentComicChapterContentArchiveDetailResponse,
  ContentComicChapterCreateRequest,
  ContentComicChapterPageResponse,
  ContentComicChapterUpdateRequest,
} from '#/api/types';

import { useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  contentComicChapterBatchDeleteApi,
  contentComicChapterBatchUpdateStatusApi,
  contentComicChapterCreateApi,
  contentComicChapterDeleteApi,
  contentComicChapterDetailApi,
  contentComicChapterPageApi,
  contentComicChapterSwapSortOrderApi,
  contentComicChapterUpdateApi,
  growthLevelRulesPageApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { useForm } from '#/hooks/useForm';
import { createSearchFormOptions } from '#/utils';

import ArchiveImportPanel from './archive-import-panel.vue';
import ContentManager from './content-manager.vue';
import {
  isComicChapterBulkActionCommand,
  resolveComicChapterBulkAction,
} from './model/bulk-actions';
import { chapterColumns } from './model/columns';
import { getDetailCards } from './model/detail';
import { chapterFormSchema, chapterSearchFormSchema } from './model/form';

defineOptions({
  name: 'ComicChapterManager',
});

/**
 * 共享数据类型 - 从父组件传入的作品信息
 */
type ShareData = { workId: number; workName: string };

// ========== 状态定义 ==========
const shareData = ref<ShareData>();
const currentChapterRecord = ref<null | Partial<ComicChapterRecord>>(null);
const selectedChapterRows = ref<ComicChapterRecord[]>([]);

// ========== 弹窗定义 ==========

/**
 * 章节管理主弹窗
 */
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

/**
 * 表单弹窗 - 用于新增/编辑章节
 */
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

/**
 * 详情弹窗 - 用于查看章节详情
 */
const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
});

/**
 * 内容管理弹窗 - 用于管理章节图片内容
 */
const [ContentModal, contentApi] = useVbenModal({
  connectedComponent: ContentManager,
});

/**
 * 表格配置选项
 */
type ComicChapterPageData = Omit<ContentComicChapterPageResponse, 'list'> & {
  list?: ComicChapterRecord[];
};

const gridOptions: VxeGridProps<ComicChapterRecord> = {
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

        const response = await contentComicChapterPageApi(
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
          list: response.list as ComicChapterRecord[] | undefined,
        } satisfies ComicChapterPageData;
      },
    },
    sort: true,
  },
  rowConfig: {
    drag: true,
  },
  rowDragConfig: {
    async dragEndMethod(params) {
      await contentComicChapterSwapSortOrderApi({
        dragId: params.dragRow.id,
        targetId: params.newRow.id,
      });
      await gridApi.reload();
      useMessage.success('排序调整成功');
      return true;
    },
  },
};

/**
 * 章节表格组件
 */
const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
  formOptions: createSearchFormOptions(chapterSearchFormSchema),
  gridEvents: {
    checkboxAll: handleChapterSelectionChange,
    checkboxChange: handleChapterSelectionChange,
  },
});

// ========== 数据加载 ==========

/**
 * 加载会员等级选项
 * 用于表单中的会员等级选择器
 */
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

// ========== 事件处理 ==========

function handleChapterSelectionChange(params: {
  records: ComicChapterRecord[];
}) {
  selectedChapterRows.value = params.records;
}

function clearChapterSelection() {
  selectedChapterRows.value = [];
  gridApi.grid?.clearCheckboxRow?.();
}

/**
 * 打开章节详情弹窗
 * @param record 章节数据
 */
function openDetailModal(record: ComicChapterRecord) {
  detailApi
    .setData({
      recordId: record.id,
      title: record.title,
    })
    .open();
}

/**
 * 打开内容管理弹窗
 * @param record 章节数据
 */
function openContentModal(record: ComicChapterRecord) {
  const data = shareData.value;
  if (!data) return;

  contentApi
    .setData({
      workId: data.workId,
      chapterId: record.id,
      chapterTitle: record.title,
    })
    .open();
}

async function handleArchiveImportFinished(
  _task: ContentComicChapterContentArchiveDetailResponse,
) {
  await gridApi.reload();
}

/**
 * 打开章节表单弹窗
 * @param record 章节数据（编辑时传入，新增时不传）
 */
async function openFormModal(record?: ComicChapterRecord) {
  // 编辑模式获取详情数据，新增模式设为 null
  const recordData = record?.id
    ? ((await contentComicChapterDetailApi({
        id: record.id,
      })) as ComicChapterRecord)
    : null;
  currentChapterRecord.value = recordData ?? null;

  formApi
    .setData({
      cols: 2,
      width: 800,
      record: recordData,
    })
    .open();
}

/**
 * 提交章节表单
 * @param values 表单数据
 */
async function handleSubmit(
  values: ContentComicChapterCreateRequest | ContentComicChapterUpdateRequest,
) {
  const data = shareData.value;
  if (!data) return;

  const payload = buildComicChapterPayload(values, data.workId);

  await (payload?.id
    ? contentComicChapterUpdateApi(payload as ContentComicChapterUpdateRequest)
    : contentComicChapterCreateApi(
        payload as ContentComicChapterCreateRequest,
      ));

  formApi.close();
  useMessage.success(payload?.id ? '章节更新成功' : '章节创建成功');
  gridApi.reload();
}

function buildComicChapterPayload(
  values: ContentComicChapterCreateRequest | ContentComicChapterUpdateRequest,
  workId: number,
): ContentComicChapterCreateRequest | ContentComicChapterUpdateRequest {
  const payload = {
    cover: values.cover,
    sortOrder: values.sortOrder,
    title: values.title,
    subtitle: values.subtitle,
    requiredViewLevelId: values.requiredViewLevelId,
    publishAt: values.publishAt,
    description: values.description,
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
    workType: 1,
  };

  return 'id' in values && typeof values.id === 'number'
    ? ({ id: values.id, ...payload } as ContentComicChapterUpdateRequest)
    : (payload as ContentComicChapterCreateRequest);
}

/**
 * 删除章节
 * @param record 章节数据
 */
async function deleteChapter(record: ComicChapterRecord) {
  await contentComicChapterDeleteApi({ id: record.id });
  useMessage.success('章节删除成功');
  clearChapterSelection();
  await gridApi.reload();
}

async function confirmDeleteChapter(record: ComicChapterRecord) {
  const confirmed = await useConfirm({
    content: '确认删除该章节？此操作不可恢复',
    successMessage: false,
  });
  if (!confirmed) return;

  await deleteChapter(record);
}

async function batchDeleteChapters(ids: number[]) {
  await useConfirm({
    type: 'delete',
    content: `确认删除选中的 ${ids.length} 个章节？此操作不可恢复`,
    onConfirm: async () => {
      await contentComicChapterBatchDeleteApi({
        ids,
      });
      clearChapterSelection();
      await gridApi.reload();
    },
  });
}

async function batchUpdatePublishStatus(action: {
  ids: number[];
  isPublished: boolean;
  successMessage: string;
}) {
  await contentComicChapterBatchUpdateStatusApi({
    ids: action.ids,
    isPublished: action.isPublished,
  } satisfies ContentComicChapterBatchUpdateStatusRequest);

  useMessage.success(action.successMessage);
  clearChapterSelection();
  await gridApi.reload();
}

async function handleBulkAction(command: string) {
  if (!isComicChapterBulkActionCommand(command)) {
    return;
  }

  const action = resolveComicChapterBulkAction(
    command,
    selectedChapterRows.value,
  );

  if (action.kind === 'warning') {
    useMessage.warning(action.message);
    return;
  }

  if (action.kind === 'delete') {
    await batchDeleteChapters(action.ids);
    return;
  }

  await batchUpdatePublishStatus(action);
}

/**
 * 切换章节发布状态
 * @param row 章节数据
 */
async function toggleStatus(row: ComicChapterRecord) {
  row.loading = true;
  try {
    await contentComicChapterUpdateApi({
      id: row.id,
      isPublished: !row.isPublished,
    } as ContentComicChapterUpdateRequest);
    useMessage.success('状态切换成功');
    gridApi.reload();
  } finally {
    row.loading = false;
  }
}
</script>

<template>
  <Modal class="h-[900px] w-[1200px]">
    <Grid>
      <!-- 工具栏 - 添加按钮 -->
      <template #toolbar-actions>
        <el-button type="primary" @click="openFormModal()">
          添加章节
        </el-button>
        <el-dropdown @command="handleBulkAction">
          <el-button>批量操作</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="delete">批量删除</el-dropdown-item>
              <el-dropdown-item command="publish">批量发布</el-dropdown-item>
              <el-dropdown-item command="unpublish">
                批量取消发布
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <ArchiveImportPanel
          v-if="shareData"
          :work-id="shareData.workId"
          :display-title="shareData.workName"
          @import-finished="handleArchiveImportFinished"
        />
      </template>

      <!-- 标题列 - 可点击打开详情 -->
      <template #title="{ row }">
        <el-text
          class="cursor-pointer hover:opacity-70"
          type="primary"
          @click="openDetailModal(row)"
        >
          {{ row.title }}
        </el-text>
      </template>

      <!-- 发布状态列 - 可切换 -->
      <template #isPublished="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.loading"
          :model-value="row.isPublished"
          @change="toggleStatus(row)"
        />
      </template>

      <!-- 操作列 -->
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
          <el-button link type="danger" @click="confirmDeleteChapter(row)">
            删除
          </el-button>
        </div>
      </template>
    </Grid>

    <!-- 表单弹窗 -->
    <FormModal :schema="chapterFormSchema" :on-submit="handleSubmit" />

    <!-- 详情弹窗 -->
    <DetailModal :api="contentComicChapterDetailApi" :cards="getDetailCards" />

    <!-- 内容管理弹窗 -->
    <ContentModal />
  </Modal>
</template>

<style scoped></style>
