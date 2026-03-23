<script lang="ts" setup>
import type { BasicOption, Recordable } from '@vben/types';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  BaseWorkDto,
  ContentComicCreateRequest,
  ContentComicUpdateRequest,
} from '#/api/types';
import type { UseDictItem } from '#/hooks/useDict';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  contentCategoryPageApi,
  contentComicCreateApi,
  contentComicDeleteApi,
  contentComicDetailApi,
  contentComicPageApi,
  contentComicUpdateApi,
  contentComicUpdateHotApi,
  contentComicUpdateNewApi,
  contentComicUpdateRecommendedApi,
  contentComicUpdateStatusApi,
  contentTagPageApi,
  growthLevelRulesPageApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useDict } from '#/hooks/useDict';
import { useMessage } from '#/hooks/useFeedback';
import { useForm } from '#/hooks/useForm';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import Chapter from '../chapter/index.vue';
import ThirdPartyPlatform from '../third-party/index.vue';
import { comicColumns } from './model/columns';
import { getDetailCards } from './model/detail';
import { formSchema, pageFilter } from './model/shared';

defineOptions({ name: 'ComicChapterManager' });

const gridOptions: VxeGridProps<BaseWorkDto> = {
  columns: [],
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await contentComicPageApi(formatQuery({ page, formValues, sorts }));
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
const [ThirdPartyModal, ThirdPartyApi] = useVbenModal({
  connectedComponent: ThirdPartyPlatform,
});

const tagOptions: BasicOption[] = [];
const categoryOptions: BasicOption[] = [];
const levelOptions: BasicOption[] = [];

// 加载会员等级选项
growthLevelRulesPageApi({ isEnabled: true }).then((res) => {
  const options =
    res?.list?.map((item) => ({
      label: item.name,
      value: item.id,
    })) || [];
  levelOptions.push(...options);
  useForm.setOptions(formSchema, {
    requiredViewLevelId: levelOptions,
  });
});

async function openFormModal(row?: BaseWorkDto) {
  let record;
  if (row) {
    record = await contentComicDetailApi({ id: row.id });
    record.authorIds = record?.authors.map(
      (item: { author: { id: number } }) => item.author.id,
    );
    record.categoryIds = record?.categories.map(
      (item: { category: { id: number } }) => item.category.id,
    );
    record.tagIds = record?.tags.map(
      (item: { tag: { id: number } }) => item.tag.id,
    );
  }

  if (tagOptions.length === 0) {
    const data = await contentTagPageApi({
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
    const data = await contentCategoryPageApi({
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
    gridApi.setState((prev) => ({
      formOptions: {
        ...(prev.formOptions ?? {}),
        schema: [...pageFilter],
      },
    }));
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

async function handleSubmit(
  values: ContentComicCreateRequest | ContentComicUpdateRequest,
) {
  values.type = 1; // 漫画固定 type=1
  await (values?.id
    ? contentComicUpdateApi(values as ContentComicUpdateRequest)
    : contentComicCreateApi(values as ContentComicCreateRequest));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function deleteComic(record: BaseWorkDto) {
  await contentComicDeleteApi({ id: record.id });
  useMessage.success('删除成功');
  gridApi.reload();
}

async function toggleStatus(
  record: BaseWorkDto,
  field: 'isHot' | 'isNew' | 'isPublished' | 'isRecommended',
) {
  record.loading = true;
  const newValue = !record[field];
  switch (field) {
    case 'isHot': {
      await contentComicUpdateHotApi({ id: record.id, isHot: newValue });
      break;
    }
    case 'isNew': {
      await contentComicUpdateNewApi({ id: record.id, isNew: newValue });
      break;
    }
    case 'isPublished': {
      await contentComicUpdateStatusApi({
        id: record.id,
        isPublished: newValue,
      });
      break;
    }
    case 'isRecommended': {
      await contentComicUpdateRecommendedApi({
        id: record.id,
        isRecommended: newValue,
      });
      break;
    }
  }
  record.loading = false;
  useMessage.success('操作成功');
  gridApi.reload();
}

// 打开章节管理弹窗
function openChapterModal(record: BaseWorkDto) {
  chapterApi
    .setData({
      workId: record.id,
      workName: record.name,
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
        <el-button class="ml-2" type="primary" @click="ThirdPartyApi.open()">
          资源解析
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
          @click="
            detailApi.setData({ recordId: row.id, title: row.name }).open()
          "
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
      :api="contentComicDetailApi"
      :cards="(data: BaseWorkDto) => getDetailCards(data, dataDict || {})"
    />

    <ChapterModal />

    <ThirdPartyModal />
  </Page>
</template>

<style scoped></style>
