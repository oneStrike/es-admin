<script lang="ts" setup>
import type { AnnouncementPageOption, AnnouncementRow } from './model/shared';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AnnouncementCreateRequest,
  AnnouncementPageRequest,
  AnnouncementUpdateRequest,
  BaseAppPageDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  announcementCreateApi,
  announcementDeleteApi,
  announcementDetailApi,
  announcementPageApi,
  announcementUpdateApi,
  announcementUpdateStatusApi,
  appPagePageApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailCards } from './model/detail';
import {
  announcementFilter,
  createAnnouncementColumns,
  formSchema,
  getPublishStatus,
  publishStatusObj,
} from './model/shared';

type AnnouncementSubmitValues =
  | AnnouncementCreateRequest
  | AnnouncementUpdateRequest;
type AnnouncementSearchValues = Partial<
  Pick<
    AnnouncementPageRequest,
    | 'announcementType'
    | 'isPinned'
    | 'isRealtime'
    | 'pageId'
    | 'priorityLevel'
    | 'title'
  >
> & {
  dateTimeRange?: unknown;
  enablePlatform?: AnnouncementCreateRequest['enablePlatform'] | null | string;
};
const formSchemaWithPageOptions = shallowRef<EsFormSchema>(formSchema);
const announcementFilterWithPageOptions =
  shallowRef<EsFormSchema>(announcementFilter);

function withPageOptions(
  schema: EsFormSchema,
  pageOptions: AnnouncementPageOption[],
): EsFormSchema {
  return schema.map((item) => {
    if (item.fieldName !== 'pageId') {
      return item;
    }

    const componentProps =
      item.componentProps &&
      typeof item.componentProps === 'object' &&
      !Array.isArray(item.componentProps)
        ? {
            ...item.componentProps,
            options: pageOptions,
          }
        : item.componentProps;

    return {
      ...item,
      componentProps,
    };
  });
}

appPagePageApi({
  pageSize: 500,
}).then((res) => {
  const pageOptions =
    res.list?.flatMap((pageItem: BaseAppPageDto) => {
      if (pageItem.id === undefined || pageItem.id === null) return [];

      return [
        {
          label: pageItem.name,
          value: pageItem.id,
          ...pageItem,
        },
      ];
    }) || [];

  formSchemaWithPageOptions.value = withPageOptions(formSchema, pageOptions);
  announcementFilterWithPageOptions.value = withPageOptions(
    announcementFilter,
    pageOptions,
  );

  gridApi.setState(() => ({
    formOptions: createSearchFormOptions(
      announcementFilterWithPageOptions.value,
    ),
    gridOptions: {
      columns: createAnnouncementColumns(pageOptions),
    },
  }));
});

const gridOptions: VxeGridProps<AnnouncementRow> = {
  columns: createAnnouncementColumns(),
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await announcementPageApi(
          formatQuery({
            page,
            sorts,
            formValues: buildAnnouncementPageQuery(formValues),
          }),
        );
      },
    },
    sort: true,
  },
};

const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(announcementFilterWithPageOptions.value),
  gridOptions,
});

function buildAnnouncementPageQuery(
  formValues: AnnouncementSearchValues = {},
): Partial<AnnouncementPageRequest> {
  const query: Partial<AnnouncementPageRequest> = {};
  const [publishStartTime, publishEndTime] = Array.isArray(
    formValues.dateTimeRange,
  )
    ? formValues.dateTimeRange
    : [];

  if (typeof publishStartTime === 'string') {
    query.publishStartTime = publishStartTime;
  }
  if (typeof publishEndTime === 'string') {
    query.publishEndTime = publishEndTime;
  }
  if (typeof formValues.title === 'string' && formValues.title) {
    query.title = formValues.title;
  }
  if (formValues.announcementType !== undefined) {
    query.announcementType = formValues.announcementType;
  }
  if (Array.isArray(formValues.enablePlatform)) {
    query.enablePlatform = JSON.stringify(formValues.enablePlatform);
  } else if (typeof formValues.enablePlatform === 'string') {
    query.enablePlatform = formValues.enablePlatform;
  }
  if (formValues.priorityLevel !== undefined) {
    query.priorityLevel = formValues.priorityLevel;
  }
  if (formValues.pageId !== undefined) {
    query.pageId = formValues.pageId;
  }
  if (formValues.isPinned !== undefined) {
    query.isPinned = formValues.isPinned;
  }
  if (formValues.isRealtime !== undefined) {
    query.isRealtime = formValues.isRealtime;
  }

  return query;
}

async function openFormModal(row?: AnnouncementRow) {
  let record;
  if (row) {
    record = await announcementDetailApi({ id: row.id });
    record.dateTimeRange = [record.publishStartTime, record.publishEndTime];
  }
  formApi.setData({ title: '公告', record }).open();
}

function isUpdateAnnouncementValues(
  values: AnnouncementSubmitValues,
): values is AnnouncementUpdateRequest {
  return 'id' in values && typeof values.id === 'number';
}

function buildAnnouncementPayload(values: AnnouncementSubmitValues) {
  if (isUpdateAnnouncementValues(values)) {
    return {
      id: values.id,
      title: values.title,
      announcementType: values.announcementType,
      enablePlatform: values.enablePlatform,
      priorityLevel: values.priorityLevel,
      pageId: values.pageId,
      publishStartTime: values.publishStartTime,
      publishEndTime: values.publishEndTime,
      isRealtime: values.isRealtime ?? false,
      isPinned: values.isPinned ?? false,
      showAsPopup: values.showAsPopup ?? false,
      popupBackgroundImage: values.popupBackgroundImage,
      popupBackgroundPosition: values.popupBackgroundPosition,
      summary: values.summary,
      content: values.content,
    } satisfies AnnouncementUpdateRequest;
  }

  return {
    title: values.title,
    announcementType: values.announcementType,
    enablePlatform: values.enablePlatform,
    priorityLevel: values.priorityLevel,
    pageId: values.pageId,
    publishStartTime: values.publishStartTime,
    publishEndTime: values.publishEndTime,
    isRealtime: values.isRealtime ?? false,
    isPinned: values.isPinned ?? false,
    showAsPopup: values.showAsPopup ?? false,
    popupBackgroundImage: values.popupBackgroundImage,
    popupBackgroundPosition: values.popupBackgroundPosition,
    summary: values.summary,
    content: values.content,
  } satisfies AnnouncementCreateRequest;
}

async function handleSubmit(values: AnnouncementSubmitValues) {
  const payload = buildAnnouncementPayload(values);

  await (isUpdateAnnouncementValues(payload)
    ? announcementUpdateApi(payload)
    : announcementCreateApi(payload));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function deleteAnnouncement(record: AnnouncementRow) {
  await announcementDeleteApi({ id: record.id });
  useMessage.success('操作成功');
  gridApi.reload();
}

async function confirmDeleteAnnouncement(record: AnnouncementRow) {
  const confirmed = await useConfirm({
    content: '确认删除当前项?',
    successMessage: false,
  });
  if (!confirmed) return;

  await deleteAnnouncement(record);
}

async function togglePublishStatus(record: AnnouncementRow) {
  const newStatus = !record.isPublished;
  await announcementUpdateStatusApi({
    id: record.id,
    isPublished: newStatus,
  });
  useMessage.success(newStatus ? '发布成功' : '取消发布成功');
  gridApi.reload();
}

async function confirmTogglePublishStatus(record: AnnouncementRow) {
  const confirmed = await useConfirm({
    content: record.isPublished ? '确认取消发布当前公告?' : '确认发布当前公告?',
    successMessage: false,
  });
  if (!confirmed) return;

  await togglePublishStatus(record);
}

function getPublishButtonText(record: AnnouncementRow): string {
  const status = getPublishStatus(record.isPublished, record.publishEndTime);

  if (status === 'unpublished') {
    return '发布';
  } else if (status === 'published') {
    return '取消发布';
  } else {
    return '重新发布';
  }
}

function canPublish(record: AnnouncementRow): boolean {
  const status = getPublishStatus(record.isPublished, record.publishEndTime);
  return status !== 'expired';
}

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
  title: '公告详情',
});
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <el-button class="ml-2" type="primary" @click="openFormModal()">
          添加
        </el-button>
      </template>
      <template #title="{ row }">
        <div class="inline-flex">
          <el-tag
            class="mr-2"
            v-if="row.showAsPopup"
            type="danger"
            size="small"
          >
            首
          </el-tag>
          <el-tag class="mr-2" type="danger" v-if="row.isPinned" size="small">
            顶
          </el-tag>
          <el-tag
            class="mr-2"
            type="warning"
            v-if="row.isRealtime"
            size="small"
          >
            实时
          </el-tag>
        </div>
        <el-text
          class="cursor-pointer hover:opacity-50"
          type="primary"
          @click="detailApi.setData({ recordId: row.id }).open()"
        >
          {{ row.title }}
        </el-text>
      </template>

      <template #publishStatus="{ row }">
        <el-text
          :style="{
            color:
              publishStatusObj[
                getPublishStatus(row.isPublished, row.publishEndTime)
              ]?.color,
          }"
        >
          {{
            publishStatusObj[
              getPublishStatus(row.isPublished, row.publishEndTime)
            ]?.label
          }}
        </el-text>
      </template>

      <template #actions="{ row }">
        <div class="my-1">
          <el-button
            link
            type="primary"
            @click="detailApi.setData({ recordId: row.id }).open()"
          >
            详情
          </el-button>

          <el-divider direction="vertical" />
          <el-button link type="primary" @click="openFormModal(row)">
            编辑
          </el-button>

          <el-divider direction="vertical" />
          <el-button
            v-if="canPublish(row)"
            link
            :type="canPublish(row) ? 'primary' : 'danger'"
            @click="confirmTogglePublishStatus(row)"
          >
            {{ getPublishButtonText(row) }}
          </el-button>
          <el-button
            link
            v-else
            disabled
            :style="{
              color: '#d9d9d9',
            }"
          >
            {{ getPublishButtonText(row) }}
          </el-button>
          <el-divider direction="vertical" />
          <el-button link type="danger" @click="confirmDeleteAnnouncement(row)">
            删除
          </el-button>
        </div>
      </template>
    </Grid>

    <Form
      :schema="formSchemaWithPageOptions"
      :field-mapping-time="[
        ['dateTimeRange', ['publishStartTime', 'publishEndTime']],
      ]"
      :on-submit="handleSubmit"
    />

    <DetailModal
      :api="announcementDetailApi"
      :cards="getDetailCards"
      class="w-[1000px]"
    />
  </Page>
</template>
