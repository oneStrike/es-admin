<script lang="ts" setup>
import type { BasicOption, Recordable } from '@vben/types';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  BaseComicDto,
  ComicCreateRequest,
  ComicUpdateRequest,
} from '#/apis/types/comic';
import type { UseDictItem } from '#/hooks/useDict';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  categoryPageApi,
  comicCreateApi,
  comicDeleteApi,
  comicDetailApi,
  comicPageApi,
  comicUpdateApi,
  tagPageApi,
} from '#/apis';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useDict } from '#/hooks/useDict';
import { useMessage } from '#/hooks/useFeedback';
import { useForm } from '#/hooks/useForm';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import Chapter from '../chapter/index.vue';
import { comicColumns } from './columns';
import { getDetailCards } from './detail';
import { formSchema, pageFilter } from './shared';

const gridOptions: VxeGridProps<BaseComicDto> = {
  columns: [],
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await comicPageApi(formatQuery({ page, formValues, sorts }));
      },
    },
    sort: true,
  },
};

const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [ChapterModal, chapterApi] = useVbenModal({
  connectedComponent: Chapter,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(pageFilter),
  gridOptions,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
});

const tagOptions: BasicOption[] = [];
const categoryOptions: BasicOption[] = [];
async function openFormModal(row?: BaseComicDto) {
  let record;
  if (row) {
    record = await comicDetailApi({ id: row.id });
    record.authorIds = record?.comicAuthors.map((item) => item.author);
    record.categoryIds = record?.comicCategories.map(
      (item) => item.category.id,
    );
    record.tagIds = record?.comicTags.map((item) => item.tag.id);
  }

  if (tagOptions.length === 0) {
    const data = await tagPageApi({
      pageSize: 500,
    });
    tagOptions.push(
      ...(data.list?.map((item) => ({
        label: item.name,
        value: item.id,
      })) || []),
    );
    useForm.setOptions(formSchema, {
      tagIds: tagOptions,
    });
  }
  if (categoryOptions.length === 0) {
    const data = await categoryPageApi({
      pageSize: 500,
    });
    categoryOptions.push(
      ...(data.list?.map((item) => ({
        label: item.name,
        value: item.id,
      })) || []),
    );
    useForm.setOptions(formSchema, {
      categoryIds: categoryOptions,
    });
  }

  formApi.setData({ title: '漫画', record }).open();
}

const dataDict = ref<Required<Recordable<undefined | UseDictItem>>>();
useDict('work_age_rating,work_publisher,work_region,work_language').then(
  (res) => {
    dataDict.value = res;
    const { work_age_rating, work_publisher, work_region, work_language } = res;
    useForm.setOptions(formSchema, {
      publisher: work_publisher?.options || [],
      region: work_region?.options || [],
      language: work_language?.options || [],
      ageRating: work_age_rating?.options || [],
    });
    useForm.setOptions(pageFilter, {
      publisher: work_publisher?.options || [],
      region: work_region?.options || [],
      language: work_language?.options || [],
      ageRating: work_age_rating?.options || [],
    });
    gridApi.formApi.updateSchema(pageFilter);

    gridApi.setGridOptions({
      columns: comicColumns({
        work_publisher,
        work_language,
        work_region,
        work_age_rating,
      }),
    });
  },
);

async function handleSubmit(values: ComicCreateRequest | ComicUpdateRequest) {
  await (values?.id
    ? comicUpdateApi(values as ComicUpdateRequest)
    : comicCreateApi(values as ComicCreateRequest));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function deleteComic(record: BaseComicDto) {
  await comicDeleteApi({ id: record.id });
  useMessage.success('删除成功');
  gridApi.reload();
}

async function toggleStatus(record: BaseComicDto, field: keyof BaseComicDto) {
  record.loading = true;
  const newValue = !record[field];
  await comicUpdateApi({
    id: record.id,
    [field]: newValue,
  });
  record.loading = false;
  useMessage.success('操作成功');
  gridApi.reload();
}

// 打开章节管理弹窗
function openChapterModal(record: BaseComicDto) {
  chapterApi
    .setData({
      comicId: record.id,
      comicName: record.name,
    })
    .open();
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <el-button class="ml-2" type="primary" @click="openFormModal()">
          添加漫画
        </el-button>
      </template>

      <template #name="{ row }">
        <div class="inline-flex">
          <el-tag class="mr-2" v-if="row.isNew" type="danger" size="small">
            新
          </el-tag>
          <el-tag class="mr-2" type="danger" v-if="row.isHot" size="small">
            热
          </el-tag>
          <el-tag
            class="mr-2"
            type="danger"
            v-if="row.isRecommended"
            size="small"
          >
            荐
          </el-tag>
        </div>
        <el-text
          class="cursor-pointer hover:opacity-50"
          type="primary"
          @click="detailApi.setData({ recordId: row.id }).open()"
        >
          {{ row.name }}
        </el-text>
      </template>

      <template #isPublished="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.loading"
          :model-value="row.isPublished"
          @change="toggleStatus(row, 'isPublished')"
        />
      </template>

      <template #isRecommended="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.loading"
          :model-value="row.isRecommended"
          @change="toggleStatus(row, 'isRecommended')"
        />
      </template>

      <template #isHot="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.loading"
          :model-value="row.isHot"
          @change="toggleStatus(row, 'isHot')"
        />
      </template>

      <template #isNew="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.loading"
          :model-value="row.isNew"
          @change="toggleStatus(row, 'isNew')"
        />
      </template>

      <template #actions="{ row }">
        <div class="my-1">
          <el-button link type="primary" @click="openFormModal(row)">
            编辑
          </el-button>
          <el-divider direction="vertical" />
          <el-button link type="primary" @click="openChapterModal(row)">
            章节
          </el-button>
          <el-divider direction="vertical" />
          <el-popconfirm
            title="确认删除当前漫画?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="deleteComic(row)"
          >
            <template #reference>
              <el-button link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </Grid>

    <Form :schema="formSchema" :on-submit="handleSubmit" />

    <DetailModal
      title="漫画详情"
      :api="comicDetailApi"
      :cards="(data: BaseComicDto) => getDetailCards(data, dataDict || {})"
    />

    <ChapterModal />
  </Page>
</template>

<style scoped></style>
