<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';
import type { BasicOption, Recordable } from '@vben/types';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AdminWorkDetailDto,
  ContentNovelCreateRequest,
  ContentNovelUpdateRequest,
  PageWorkDto,
} from '#/api/types';
import type { UseDictItem } from '#/hooks/useDict';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  contentNovelCreateApi,
  contentNovelDeleteApi,
  contentNovelDetailApi,
  contentNovelPageApi,
  contentNovelUpdateApi,
  contentNovelUpdateHotApi,
  contentNovelUpdateNewApi,
  contentNovelUpdateRecommendedApi,
  contentNovelUpdateStatusApi,
  growthLevelRulesPageApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import RecordDetailModal from '#/components/record-detail-modal';
import { useDict } from '#/hooks/useDict';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { useForm } from '#/hooks/useForm';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import {
  extractRelationIds,
  extractRelationOptions,
  normalizeRelationIds,
} from '../../work-relations';
import Chapter from '../chapter/index.vue';
import { novelColumns } from './model/columns';
import { getDetailSections } from './model/detail';
import { formSchema, pageFilter } from './model/shared';

defineOptions({
  name: 'NovelManager',
});

type NovelRow = PageWorkDto & {
  loading?: boolean;
};

type NovelFormRecord = Partial<AdminWorkDetailDto> & {
  authorIds?: number[];
  categoryIds?: number[];
  tagIds?: unknown[];
};

const gridOptions: VxeGridProps<NovelRow> = {
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
  connectedComponent: RecordDetailModal,
});

const levelOptions: BasicOption[] = [];
const emptyDict: Recordable<undefined | UseDictItem> = {};
const currentNovelRecord = ref<NovelFormRecord | null>(null);

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

async function openFormModal(row?: NovelRow) {
  let record: NovelFormRecord | undefined;
  if (row) {
    record = await contentNovelDetailApi({ id: row.id });
    record.authorIds = extractRelationIds(record?.authors, 'author');
    record.categoryIds = extractRelationIds(record?.categories, 'category');
    record.tagIds = extractRelationOptions(record?.tags, 'tag');
  }
  currentNovelRecord.value = record ?? null;

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
  const payload = buildNovelPayload(values);

  await ('id' in payload && payload.id
    ? contentNovelUpdateApi(payload as ContentNovelUpdateRequest)
    : contentNovelCreateApi(payload as ContentNovelCreateRequest));
  useMessage.success('操作成功');
  await gridApi.reload();
}

function buildNovelPayload(
  values: ContentNovelCreateRequest | ContentNovelUpdateRequest,
): ContentNovelCreateRequest | ContentNovelUpdateRequest {
  const payload = {
    cover: values.cover,
    name: values.name,
    alias: values.alias,
    authorIds: values.authorIds,
    serialStatus: values.serialStatus,
    region: values.region,
    language: values.language,
    ageRating: values.ageRating,
    categoryIds: values.categoryIds,
    description: values.description,
    publisher: values.publisher,
    originalSource: values.originalSource,
    copyright: values.copyright,
    disclaimer: values.disclaimer,
    requiredViewLevelId: values.requiredViewLevelId,
    publishAt: values.publishAt,
    remark: values.remark,
    canComment:
      values.canComment ?? currentNovelRecord.value?.canComment ?? true,
    chapterPrice:
      values.chapterPrice ?? currentNovelRecord.value?.chapterPrice ?? 0,
    isHot: values.isHot ?? currentNovelRecord.value?.isHot ?? false,
    isNew: values.isNew ?? currentNovelRecord.value?.isNew ?? false,
    isPublished:
      values.isPublished ?? currentNovelRecord.value?.isPublished ?? false,
    isRecommended:
      values.isRecommended ?? currentNovelRecord.value?.isRecommended ?? false,
    recommendWeight:
      values.recommendWeight ?? currentNovelRecord.value?.recommendWeight ?? 0,
    tagIds:
      normalizeRelationIds(values.tagIds) ??
      normalizeRelationIds(currentNovelRecord.value?.tagIds) ??
      [],
    viewRule: values.viewRule ?? currentNovelRecord.value?.viewRule ?? 0,
  };

  return 'id' in values && typeof values.id === 'number'
    ? ({ id: values.id, ...payload } as ContentNovelUpdateRequest)
    : ({ ...payload, type: 2 } as ContentNovelCreateRequest);
}

async function deleteNovel(record: NovelRow) {
  await contentNovelDeleteApi({ id: record.id });
  useMessage.success('删除成功');
  await gridApi.reload();
}

async function confirmDeleteNovel(record: NovelRow) {
  const confirmed = await useConfirm({
    content: '确认删除当前小说?',
    successMessage: false,
  });
  if (!confirmed) return;

  await deleteNovel(record);
}

async function toggleStatus(
  record: NovelRow,
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

function openChapterModal(record: NovelRow) {
  chapterApi
    .setData({
      workId: record.id,
      workName: record.name,
    })
    .open();
}

function getNovelActions(record: NovelRow): ActionItem[] {
  return [
    {
      key: 'edit',
      onClick: () => openFormModal(record),
      text: '编辑',
    },
    {
      key: 'chapters',
      onClick: () => openChapterModal(record),
      text: '章节',
    },
    {
      danger: true,
      key: 'delete',
      onClick: () => confirmDeleteNovel(record),
      text: '删除',
    },
  ];
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
          @click="detailApi.setData({ id: row.id, title: row.name }).open()"
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
        <VbenTableAction align="center" :actions="getNovelActions(row)" />
      </template>
    </Grid>

    <Form :schema="formSchema" :on-submit="handleSubmit" />

    <DetailModal
      :api="contentNovelDetailApi"
      :sections="
        (data: AdminWorkDetailDto) =>
          getDetailSections(data, dataDict ?? emptyDict)
      "
    />

    <ChapterModal />
  </Page>
</template>

<style scoped></style>
