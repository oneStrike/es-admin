<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';
import type { BasicOption, Recordable } from '@vben/types';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AdminWorkDetailDto,
  ContentComicCreateRequest,
  ContentComicUpdateRequest,
  PageWorkDto,
} from '#/api/types';
import type { UseDictItem } from '#/hooks/useDict';

import { useRouter } from 'vue-router';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  contentComicCreateApi,
  contentComicDeleteApi,
  contentComicDetailApi,
  contentComicPageApi,
  contentComicThirdPartySyncLatestApi,
  contentComicUpdateApi,
  contentComicUpdateHotApi,
  contentComicUpdateNewApi,
  contentComicUpdateRecommendedApi,
  contentComicUpdateStatusApi,
  growthLevelRulesPageApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import RecordDetailModal from '#/components/record-detail-modal';
import { useDict } from '#/hooks/useDict';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { useForm } from '#/hooks/useForm';
import { createSearchFormOptions } from '#/utils/grid-form-config';
import { buildWorkflowManagerRoute } from '#/views/system-manager/workflow/model/shared';

import {
  extractRelationIds,
  extractRelationOptions,
  normalizeRelationIds,
} from '../../work-relations';
import Chapter from '../chapter/index.vue';
import ThirdPartyPlatform from '../third-party/index.vue';
import { comicColumns } from './model/columns';
import { getDetailSections } from './model/detail';
import { formSchema, pageFilter } from './model/shared';

defineOptions({ name: 'ComicManager' });

type ComicRow = PageWorkDto & {
  loading?: boolean;
  syncLoading?: boolean;
};

type ComicFormRecord = Partial<AdminWorkDetailDto> & {
  authorIds?: number[];
  categoryIds?: number[];
  tagIds?: unknown[];
};

const gridOptions: VxeGridProps<ComicRow> = {
  columns: [],
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        formValues.type = 1;
        return await contentComicPageApi(
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
const [ThirdPartyModal, ThirdPartyApi] = useVbenModal({
  connectedComponent: ThirdPartyPlatform,
});

const levelOptions: BasicOption[] = [];
const currentComicRecord = ref<ComicFormRecord | null>(null);
const router = useRouter();

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

async function openFormModal(row?: ComicRow) {
  let record: ComicFormRecord | undefined;
  if (row) {
    record = await contentComicDetailApi({ id: row.id });
    record.authorIds = extractRelationIds(record?.authors, 'author');
    record.categoryIds = extractRelationIds(record?.categories, 'category');
    record.tagIds = extractRelationOptions(record?.tags, 'tag');
  }
  currentComicRecord.value = record ?? null;

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
        ...prev.formOptions,
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
  const payload = buildComicPayload(values);

  await ('id' in payload && payload.id
    ? contentComicUpdateApi(payload as ContentComicUpdateRequest)
    : contentComicCreateApi(payload as ContentComicCreateRequest));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

function buildComicPayload(
  values: ContentComicCreateRequest | ContentComicUpdateRequest,
): ContentComicCreateRequest | ContentComicUpdateRequest {
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
      values.canComment ?? currentComicRecord.value?.canComment ?? true,
    chapterPrice:
      values.chapterPrice ?? currentComicRecord.value?.chapterPrice ?? 0,
    isHot: values.isHot ?? currentComicRecord.value?.isHot ?? false,
    isNew: values.isNew ?? currentComicRecord.value?.isNew ?? false,
    isPublished:
      values.isPublished ?? currentComicRecord.value?.isPublished ?? false,
    isRecommended:
      values.isRecommended ?? currentComicRecord.value?.isRecommended ?? false,
    recommendWeight:
      values.recommendWeight ?? currentComicRecord.value?.recommendWeight ?? 0,
    tagIds:
      normalizeRelationIds(values.tagIds) ??
      normalizeRelationIds(currentComicRecord.value?.tagIds) ??
      [],
    viewRule: values.viewRule ?? currentComicRecord.value?.viewRule ?? 0,
  };

  return 'id' in values && typeof values.id === 'number'
    ? ({ id: values.id, ...payload } as ContentComicUpdateRequest)
    : ({ ...payload, type: 1 } as ContentComicCreateRequest);
}

async function deleteComic(record: ComicRow) {
  await contentComicDeleteApi({ id: record.id });
  useMessage.success('删除成功');
  gridApi.reload();
}

async function confirmDeleteComic(record: ComicRow) {
  const confirmed = await useConfirm({
    content: '确认删除当前漫画?',
    successMessage: false,
  });
  if (!confirmed) return;

  await deleteComic(record);
}

async function syncLatestChapters(record: ComicRow) {
  const confirmed = await useConfirm({
    content: '是否后台同步当前作品章节?',
    successMessage: false,
  });
  if (!confirmed) return;
  record.syncLoading = true;
  try {
    const task = await contentComicThirdPartySyncLatestApi({
      workId: record.id,
    });
    useMessage.success('同步任务已提交');
    void router.push(buildWorkflowManagerRoute(task.jobId));
  } finally {
    record.syncLoading = false;
  }
}

async function toggleStatus(
  record: ComicRow,
  field: 'isHot' | 'isNew' | 'isPublished' | 'isRecommended',
) {
  record.loading = true;
  const newValue = !record[field];
  try {
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

    useMessage.success('操作成功');
    gridApi.reload();
  } finally {
    record.loading = false;
  }
}

// 打开章节管理弹窗
function openChapterModal(record: ComicRow) {
  chapterApi
    .setData({
      workId: record.id,
      workName: record.name,
    })
    .open();
}

function getComicActions(record: ComicRow): ActionItem[] {
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
      onClick: () => confirmDeleteComic(record),
      text: '删除',
    },
    {
      ifShow: () => !!record.hasThirdPartySourceBinding,
      key: 'syncLatestChapters',
      loading: record.syncLoading,
      onClick: () => syncLatestChapters(record),
      text: '同步章节',
    },
  ];
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
        <VbenTableAction align="center" :actions="getComicActions(row)" />
      </template>
    </Grid>

    <Form :schema="formSchema" :on-submit="handleSubmit" />

    <DetailModal
      :api="contentComicDetailApi"
      :sections="
        (data: AdminWorkDetailDto) => getDetailSections(data, dataDict || {})
      "
    />

    <ChapterModal />

    <ThirdPartyModal />
  </Page>
</template>

<style scoped></style>
