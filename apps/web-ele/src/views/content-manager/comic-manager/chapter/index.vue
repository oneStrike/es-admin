<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  ChapterCreateRequest,
  ChapterPageResponse,
  ChapterUpdateRequest,
} from '#/api/types';

import { useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  chapterCreateApi,
  chapterDeleteApi,
  chapterDetailApi,
  chapterPageApi,
  chapterSwapSortOrderApi,
  chapterUpdateApi,
  levelRulesPageApi,
} from '#/api';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { useForm } from '#/hooks/useForm';
import { createSearchFormOptions } from '#/utils';

import ContentManager from './content-manager.vue';
import { chapterColumns } from './model/columns';
import { getDetailCards } from './model/detail';
import { chapterFormSchema, chapterSearchFormSchema } from './model/form';

type ShareData = { workId: number; workName: string };

const shareData = ref<ShareData>();

levelRulesPageApi({ isEnabled: true }).then((res) => {
  const options =
    res?.list?.map((item) => ({
      label: item.name,
      value: item.id,
    })) || [];
  useForm.setOptions(chapterFormSchema, {
    requiredViewLevelId: options,
  });
});

const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    if (isOpen) {
      shareData.value = modalApi.getData<ShareData>();
      modalApi.setState({
        title: shareData.value.workName,
      });
    }
  },
});
// 章节列表配置
const gridOptions: VxeGridProps<ChapterPageResponse> = {
  columns: chapterColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        formValues.workId = shareData.value?.workId;
        return await chapterPageApi(
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
      await chapterSwapSortOrderApi({
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
function openDetailModal(record: ChapterPageResponse) {
  detailApi
    .setData({
      recordId: record.id,
      title: record.title,
    })
    .open();
}

// 打开内容管理
function openContentModal(record: ChapterPageResponse) {
  contentApi
    .setData({
      workId: shareData.value!.workId,
      chapterId: record.id,
      chapterTitle: record.title,
    })
    .open();
}

// 打开添加章节表单
async function openFormModal(record?: ChapterPageResponse) {
  formApi
    .setData({
      cols: 4,
      width: 800,
      record: record ? await chapterDetailApi({ id: record.id }) : null,
    })
    .open();
}

// 提交章节表单
async function handleSubmit(
  values: ChapterCreateRequest | ChapterUpdateRequest,
) {
  values.workId = shareData.value!.workId;
  values.workType = 1; // 漫画固定为1
  await (values?.id
    ? chapterUpdateApi(values as ChapterUpdateRequest)
    : chapterCreateApi(values as ChapterCreateRequest));
  await formApi.close();
  useMessage.success('操作成功');
  await gridApi.reload();
}

// 删除章节
async function deleteChapter(record: ChapterPageResponse) {
  await chapterDeleteApi({ id: record.id });
  useMessage.success('删除成功');
  await gridApi.reload();
}

// 切换章节状态
async function toggleStatus(row: ChapterPageResponse) {
  row.loading = true;
  await chapterUpdateApi({
    id: row.id,
    isPublished: !row.isPublished,
  } as any);
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

    <DetailModal :api="chapterDetailApi" :cards="getDetailCards" />

    <ContentModal />
  </Modal>
</template>
