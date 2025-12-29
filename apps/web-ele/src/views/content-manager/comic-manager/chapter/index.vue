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
  comicChapterUpdateApi,
} from '#/apis';
import EsModalForm from '#/components/es-modal-form/index.vue';
import { useMessage } from '#/hooks/useFeedback';

import { chapterColumns } from './columns';
import { chapterFormSchema } from './form';

const props = defineProps<{
  comicId: number;
  comicName: string;
  dialogVisible: boolean;
}>();

const emit = defineEmits<{
  close: [];
  'update:dialogVisible': [value: boolean];
}>();

const dialogVisible = computed({
  get: () => props.dialogVisible,
  set: (value) => emit('update:dialogVisible', value),
});

// 章节列表配置
const gridOptions: VxeGridProps<ComicChapterPageResponseDto> = {
  columns: chapterColumns(),
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await comicChapterPageApi(
          formatQuery({ page, formValues, sorts, comicId: props.comicId }),
        );
      },
    },
    sort: true,
  },
  // 暂时移除拖拽配置，因为dragConfig的属性不支持
};

// 表单弹窗
const [FormModal, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

// 章节表格
const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
});

// 打开添加章节表单
async function openAddChapterModal() {
  formApi
    .setData({ title: '添加章节', record: { comicId: props.comicId } })
    .open();
}

// 打开编辑章节表单
async function openEditChapterModal(record: ComicChapterPageResponseDto) {
  const detail = await comicChapterDetailApi({ id: record.id });
  formApi.setData({ title: '编辑章节', record: detail }).open();
}

// 提交章节表单
async function handleSubmit(
  values: ComicChapterCreateRequest | ComicChapterUpdateRequest,
) {
  await (values?.id
    ? comicChapterUpdateApi(values as ComicChapterUpdateRequest)
    : comicChapterCreateApi(values as ComicChapterCreateRequest));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

// 删除章节
async function deleteChapter(record: ComicChapterPageResponseDto) {
  await comicChapterBatchDeleteApi({ ids: [record.id] });
  useMessage.success('删除成功');
  gridApi.reload();
}

// 批量删除章节功能暂时移除，因为gridApi没有getCheckboxRecords方法
// async function batchDeleteChapters(records: ComicChapterPageResponseDto[]) {
//   const ids = records.map((record) => record.id);
//   await comicChapterBatchDeleteApi({ ids });
//   useMessage.success('批量删除成功');
//   gridApi.reload();
// }
</script>

<script lang="ts">
export default {
  name: 'ChapterModal',
};
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="`${props.comicName} - 章节管理`"
    width="80%"
    @close="emit('close')"
  >
    <div class="p-4">
      <Grid>
        <template #toolbar-actions>
          <el-button type="primary" @click="openAddChapterModal">
            添加章节
          </el-button>
        </template>

        <template #actions="{ row }">
          <div class="flex space-x-2">
            <el-button link type="primary" @click="openEditChapterModal(row)">
              编辑
            </el-button>
            <el-button link type="primary" @click="openEditChapterModal(row)">
              内容
            </el-button>
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
    </div>

    <FormModal :schema="chapterFormSchema" :on-submit="handleSubmit" />
  </el-dialog>
</template>

<style scoped>
.dialog-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
