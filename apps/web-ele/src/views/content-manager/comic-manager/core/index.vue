<script lang="ts" setup>
import type { BasicOption, Recordable } from '@vben/types';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  BaseWorkDto,
  ContentComicCreateRequest,
  ContentComicUpdateRequest,
} from '#/api/types';
import type { UseDictItem } from '#/hooks/useDict';

import { useRouter } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  contentCategoryPageApi,
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
  contentTagPageApi,
  growthLevelRulesPageApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useDict } from '#/hooks/useDict';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { useForm } from '#/hooks/useForm';
import { createSearchFormOptions } from '#/utils/grid-form-config';
import { buildWorkflowManagerRoute } from '#/views/system-manager/workflow/model/shared';

import { extractRelationIds } from '../../work-relations';
import Chapter from '../chapter/index.vue';
import ThirdPartyPlatform from '../third-party/index.vue';
import { comicColumns } from './model/columns';
import { getDetailCards } from './model/detail';
import { formSchema, pageFilter } from './model/shared';

defineOptions({ name: 'ComicManager' });

const gridOptions: VxeGridProps<BaseWorkDto> = {
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
  connectedComponent: EsRecordDetail,
});
const [ThirdPartyModal, ThirdPartyApi] = useVbenModal({
  connectedComponent: ThirdPartyPlatform,
});

const tagOptions: BasicOption[] = [];
const categoryOptions: BasicOption[] = [];
const levelOptions: BasicOption[] = [];
const currentComicRecord = ref<null | Partial<BaseWorkDto>>(null);
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

async function openFormModal(row?: BaseWorkDto) {
  let record;
  if (row) {
    record = await contentComicDetailApi({ id: row.id });
    record.authorIds = extractRelationIds(record?.authors, 'author');
    record.categoryIds = extractRelationIds(record?.categories, 'category');
    record.tagIds = extractRelationIds(record?.tags, 'tag');
  }
  currentComicRecord.value = record ?? null;

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
    tagIds: values.tagIds ?? currentComicRecord.value?.tagIds ?? [],
    type: 1,
    viewRule: values.viewRule ?? currentComicRecord.value?.viewRule ?? 0,
  };

  return 'id' in values && typeof values.id === 'number'
    ? ({ id: values.id, ...payload } as ContentComicUpdateRequest)
    : (payload as ContentComicCreateRequest);
}

async function deleteComic(record: BaseWorkDto) {
  await contentComicDeleteApi({ id: record.id });
  useMessage.success('删除成功');
  gridApi.reload();
}

async function confirmDeleteComic(record: BaseWorkDto) {
  const confirmed = await useConfirm({
    content: '确认删除当前漫画?',
    successMessage: false,
  });
  if (!confirmed) return;

  await deleteComic(record);
}

async function syncLatestChapters(record: BaseWorkDto) {
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
  record: BaseWorkDto,
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
          <el-button link type="danger" @click="confirmDeleteComic(row)">
            删除
          </el-button>
          <el-divider direction="vertical" />
          <template v-if="row.hasThirdPartySourceBinding">
            <el-button
              link
              type="primary"
              :loading="row.syncLoading"
              @click="syncLatestChapters(row)"
            >
              同步章节
            </el-button>
          </template>
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
