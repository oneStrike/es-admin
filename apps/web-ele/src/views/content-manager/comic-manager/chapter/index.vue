<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  ComicChapterCreateRequest,
  ComicChapterPageResponseDto,
  ComicChapterUpdateRequest,
} from '#/apis/types/comicChapter';

import { useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  comicChapterBatchDeleteApi,
  comicChapterCreateApi,
  comicChapterDetailApi,
  comicChapterPageApi,
  comicChapterSwapNumbersApi,
  comicChapterUpdateApi,
  comicChapterUpdateStatusApi,
  memberLevelListApi,
} from '#/apis';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { useForm } from '#/hooks/useForm';
import { createSearchFormOptions } from '#/utils';

import { chapterColumns } from './columns';
import ContentManager from './content-manager.vue';
import { getDetailCards } from './detail';
import { chapterFormSchema, chapterSearchFormSchema } from './form';

type ShareData = { comicId: number; comicName: string };

const shareData = ref<ShareData>();

memberLevelListApi({ isEnabled: true }).then((res) => {
  const options =
    res?.map((item) => ({
      label: item.name,
      value: item.id,
    })) || [];
  useForm.setOptions(chapterFormSchema, {
    requiredReadLevelId: options,
    requiredDownloadLevelId: options,
  });
});

const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    if (isOpen) {
      shareData.value = modalApi.getData<ShareData>();
      modalApi.setState({
        title: shareData.value.comicName,
      });
    }
  },
});
// 章节列表配置
const gridOptions: VxeGridProps<ComicChapterPageResponseDto> = {
  columns: chapterColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        formValues.comicId = shareData.value?.comicId;
        return await comicChapterPageApi(
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
      await comicChapterSwapNumbersApi({
        dragId: params.dragRow.id,
        targetId: params.newRow.id,
      });
      await gridApi.reload();
      return true;
    },
  },
  // 暂时移除拖拽配置，因为dragConfig的属性不支持
};

// 表单弹窗
const [FormModal, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

// 详情弹窗
const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
});

// 内容管理弹窗
const [ContentModal, contentApi] = useVbenModal({
  connectedComponent: ContentManager,
});

// 章节表格
const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
  formOptions: createSearchFormOptions(chapterSearchFormSchema),
});

// 打开章节详情
function openDetailModal(record: ComicChapterPageResponseDto) {
  detailApi
    .setData({
      recordId: record.id,
      title: record.title,
    })
    .open();
}

// 打开内容管理
function openContentModal(record: ComicChapterPageResponseDto) {
  contentApi
    .setData({
      comicId: shareData.value!.comicId,
      chapterId: record.id,
      chapterTitle: record.title,
    })
    .open();
}

// 打开添加章节表单
async function openFormModal(record?: ComicChapterPageResponseDto) {
  formApi
    .setData({
      cols: 4,
      width: 800,
      record: record ? await comicChapterDetailApi({ id: record.id }) : null,
    })
    .open();
}

// 提交章节表单
async function handleSubmit(
  values: ComicChapterCreateRequest | ComicChapterUpdateRequest,
) {
  values.comicId = shareData.value!.comicId;
  await (values?.id
    ? comicChapterUpdateApi(values as ComicChapterUpdateRequest)
    : comicChapterCreateApi(values as ComicChapterCreateRequest));
  await formApi.close();
  useMessage.success('操作成功');
  await gridApi.reload();
}

// 删除章节
async function deleteChapter(record: ComicChapterPageResponseDto) {
  await comicChapterBatchDeleteApi({ ids: [record.id] });
  useMessage.success('删除成功');
  await gridApi.reload();
}

// 切换章节状态
async function toggleStatus(row: ComicChapterPageResponseDto) {
  row.loading = true;
  await comicChapterUpdateStatusApi({
    ids: [row.id],
    isPublished: !row.isPublished,
  });
  row.loading = false;
  useMessage.success('操作成功');
  await gridApi.reload();
}
</script>

<template>
  <Modal class="h-[1000px] w-[1200px]">
    <Grid>
      <template #toolbar-actions>
        <el-button class="ml-2" type="primary" @click="openFormModal()">
          添加章节
        </el-button>
      </template>

      <template #title="{ row }">
        <el-text
          class="cursor-pointer hover:opacity-50"
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
        <div class="my-1">
          <el-button link type="primary" @click="openContentModal(row)">
            内容
          </el-button>
          <el-divider direction="vertical" />
          <el-button link type="primary" @click="openFormModal(row)">
            编辑
          </el-button>

          <el-divider direction="vertical" />
          <el-popconfirm
            title="确认删除当前章节?"
            confirm-button-text="确认"
            cancel-button-text="取消"
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

    <DetailModal :api="comicChapterDetailApi" :cards="getDetailCards" />

    <ContentModal />
  </Modal>
</template>
