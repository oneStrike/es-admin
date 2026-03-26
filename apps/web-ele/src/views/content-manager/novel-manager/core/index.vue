<script lang="ts" setup>
import type { BasicOption, Recordable } from '@vben/types';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  BaseWorkDto,
  ContentNovelCreateRequest,
  ContentNovelUpdateRequest,
} from '#/api/types';
import type { UseDictItem } from '#/hooks/useDict';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  contentCategoryPageApi,
  contentNovelCreateApi,
  contentNovelDeleteApi,
  contentNovelDetailApi,
  contentNovelPageApi,
  contentNovelUpdateApi,
  contentNovelUpdateHotApi,
  contentNovelUpdateNewApi,
  contentNovelUpdateRecommendedApi,
  contentNovelUpdateStatusApi,
  contentTagPageApi,
  growthLevelRulesPageApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useDict } from '#/hooks/useDict';
import { useMessage } from '#/hooks/useFeedback';
import { useForm } from '#/hooks/useForm';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { extractRelationIds } from '../../work-relations';
import Chapter from '../chapter/index.vue';
import { novelColumns } from './model/columns';
import { getDetailCards } from './model/detail';
import { formSchema, pageFilter } from './model/shared';

defineOptions({
  name: 'NovelManager',
});

const gridOptions: VxeGridProps<BaseWorkDto> = {
  columns: [],
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await contentNovelPageApi(
          formatQuery({ page, formValues, sorts }),
        );
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
const levelOptions: BasicOption[] = [];
const emptyDict: Recordable<undefined | UseDictItem> = {};
const currentNovelRecord = ref<null | Partial<BaseWorkDto>>(null);

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
    record = await contentNovelDetailApi({ id: row.id });
    record.authorIds = extractRelationIds(record?.authors, 'author');
    record.categoryIds = extractRelationIds(record?.categories, 'category');
    record.tagIds = extractRelationIds(record?.tags, 'tag');
  }
  currentNovelRecord.value = record ?? null;

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

  formApi.setData({ title: '小说', record }).open();
}

const dataDict = ref<Recordable<undefined | UseDictItem>>();
useDict('work_age_rating,work_publisher,work_region,work_language').then(
  (res) => {
    dataDict.value = res;
    const { work_age_rating, work_publisher, work_region, work_language } = res;
    useForm.setOptions(formSchema, {
      ageRating: work_age_rating?.options || [],
      language: work_language?.options || [],
      publisher: work_publisher?.options || [],
      region: work_region?.options || [],
    });
    useForm.setOptions(pageFilter, {
      ageRating: work_age_rating?.options || [],
      language: work_language?.options || [],
      publisher: work_publisher?.options || [],
      region: work_region?.options || [],
    });
    gridApi.setState((prev) => ({
      formOptions: {
        ...prev.formOptions,
        schema: [...pageFilter],
      },
    }));
    gridApi.setGridOptions({
      columns: novelColumns({
        work_age_rating,
        work_language,
        work_publisher,
        work_region,
      }),
    });
  },
);

async function handleSubmit(
  values: ContentNovelCreateRequest | ContentNovelUpdateRequest,
) {
  const rawValues = { ...(values as Record<string, any>) };
  delete rawValues.price;
  const payload = {
    ...rawValues,
    canComment:
      values.canComment ?? currentNovelRecord.value?.canComment ?? true,
    chapterPrice:
      values.chapterPrice ?? currentNovelRecord.value?.chapterPrice ?? 0,
    isHot: values.isHot ?? currentNovelRecord.value?.isHot ?? false,
    isNew: values.isNew ?? currentNovelRecord.value?.isNew ?? false,
    isPublished:
      values.isPublished ?? currentNovelRecord.value?.isPublished ?? false,
    isRecommended:
      values.isRecommended ??
      currentNovelRecord.value?.isRecommended ??
      false,
    recommendWeight:
      values.recommendWeight ??
      currentNovelRecord.value?.recommendWeight ??
      0,
    tagIds: values.tagIds ?? currentNovelRecord.value?.tagIds ?? [],
    type: 2,
    viewRule: values.viewRule ?? currentNovelRecord.value?.viewRule ?? 0,
  } as ContentNovelCreateRequest | ContentNovelUpdateRequest;

  await (('id' in payload && payload.id)
    ? contentNovelUpdateApi(payload as ContentNovelUpdateRequest)
    : contentNovelCreateApi(payload as ContentNovelCreateRequest));
  useMessage.success('操作成功');
  await gridApi.reload();
}

async function deleteNovel(record: BaseWorkDto) {
  await contentNovelDeleteApi({ id: record.id });
  useMessage.success('删除成功');
  await gridApi.reload();
}

async function toggleStatus(
  record: BaseWorkDto,
  field: 'isHot' | 'isNew' | 'isPublished' | 'isRecommended',
) {
  record.loading = true;
  const newValue = !record[field];
  try {
    switch (field) {
      case 'isHot': {
        await contentNovelUpdateHotApi({ id: record.id, isHot: newValue });
        break;
      }
      case 'isNew': {
        await contentNovelUpdateNewApi({ id: record.id, isNew: newValue });
        break;
      }
      case 'isPublished': {
        await contentNovelUpdateStatusApi({
          id: record.id,
          isPublished: newValue,
        });
        break;
      }
      case 'isRecommended': {
        await contentNovelUpdateRecommendedApi({
          id: record.id,
          isRecommended: newValue,
        });
        break;
      }
    }

    useMessage.success('操作成功');
    await gridApi.reload();
  } finally {
    record.loading = false;
  }
}

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
          添加小说
        </el-button>
      </template>

      <template #name="{ row }">
        <div class="inline-flex">
          <el-tag class="mr-2" v-if="row.isNew" type="danger" size="small">
            新
          </el-tag>
          <el-tag class="mr-2" v-if="row.isHot" type="danger" size="small">
            热
          </el-tag>
          <el-tag
            class="mr-2"
            v-if="row.isRecommended"
            size="small"
            type="danger"
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
            title="确认删除当前小说?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="deleteNovel(row)"
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
      :api="contentNovelDetailApi"
      :cards="(data: BaseWorkDto) => getDetailCards(data, dataDict ?? emptyDict)"
    />

    <ChapterModal />
  </Page>
</template>

<style scoped></style>
