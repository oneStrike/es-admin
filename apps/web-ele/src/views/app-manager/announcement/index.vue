<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type { AnnouncementPageOption, AnnouncementRow } from './model/shared';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AnnouncementCreateRequest,
  AnnouncementPageRequest,
  AnnouncementUpdateRequest,
  BaseAppPageDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  announcementCreateApi,
  announcementDeleteApi,
  announcementDetailApi,
  announcementPageApi,
  announcementRetryFanoutApi,
  announcementUpdateApi,
  announcementUpdateStatusApi,
  appPagePageApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import RecordDetailModal from '#/components/record-detail-modal';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { formatUTC } from '#/utils';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailSections } from './model/detail';
import {
  announcementFilter,
  createAnnouncementColumns,
  fanoutStatusObj,
  formatPageOptionLabel,
  formSchema,
  getPublishStatus,
  publishStatusObj,
} from './model/shared';

type AnnouncementSubmitValues =
  | AnnouncementCreateRequest
  | AnnouncementUpdateRequest;
type AnnouncementFormRecord = Awaited<
  ReturnType<typeof announcementDetailApi>
> & {
  dateTimeRange?: [null | string | undefined, null | string | undefined];
};
type AnnouncementSearchValues = Partial<
  Pick<
    AnnouncementPageRequest,
    | 'announcementType'
    | 'fanoutStatus'
    | 'isPinned'
    | 'isRealtime'
    | 'pageId'
    | 'priorityLevel'
    | 'publishStatus'
    | 'showAsPopup'
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
          code: pageItem.code,
          label: formatPageOptionLabel(pageItem),
          name: pageItem.name,
          path: pageItem.path,
          value: pageItem.id,
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
  if (formValues.showAsPopup !== undefined) {
    query.showAsPopup = formValues.showAsPopup;
  }
  if (formValues.publishStatus !== undefined) {
    query.publishStatus = formValues.publishStatus;
  }
  if (formValues.fanoutStatus !== undefined) {
    query.fanoutStatus = formValues.fanoutStatus;
  }

  return query;
}

async function openFormModal(row?: AnnouncementRow) {
  let record: AnnouncementFormRecord | undefined;
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
      popupBackgroundPosition: values.showAsPopup
        ? (values.popupBackgroundPosition ?? 'center')
        : values.popupBackgroundPosition,
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
    popupBackgroundPosition: values.showAsPopup
      ? (values.popupBackgroundPosition ?? 'center')
      : values.popupBackgroundPosition,
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
    content:
      '确认下线当前公告？下线后 APP 将不再展示，消息中心会同步撤回通知。',
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

async function retryFanout(record: AnnouncementRow) {
  await announcementRetryFanoutApi({ id: record.id });
  useMessage.success('已重新提交消息中心通知');
  gridApi.reload();
}

async function confirmRetryFanout(record: AnnouncementRow) {
  const confirmed = await useConfirm({
    content: '确认重试当前公告的消息中心通知？',
    successMessage: false,
  });
  if (!confirmed) return;

  await retryFanout(record);
}

function getPublishButtonText(record: AnnouncementRow): string {
  return record.isPublished ? '取消发布' : '发布';
}

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: RecordDetailModal,
  title: '公告详情',
});

function getAnnouncementActions(record: AnnouncementRow): ActionItem[] {
  return [
    {
      key: 'detail',
      onClick: () => detailApi.setData({ id: record.id }).open(),
      text: '详情',
    },
    {
      key: 'edit',
      onClick: () => openFormModal(record),
      text: '编辑',
    },
    {
      key: 'publish',
      onClick: () => confirmTogglePublishStatus(record),
      text: getPublishButtonText(record),
    },
    ...(record.fanoutStatus === 3
      ? [
          {
            key: 'retryFanout',
            onClick: () => confirmRetryFanout(record),
            text: '重试通知',
          },
        ]
      : []),
    {
      danger: true,
      key: 'delete',
      onClick: () => confirmDeleteAnnouncement(record),
      text: '下线',
    },
  ];
}
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
            消息
          </el-tag>
        </div>
        <el-text
          class="cursor-pointer hover:opacity-50"
          type="primary"
          @click="detailApi.setData({ id: row.id }).open()"
        >
          {{ row.title }}
        </el-text>
      </template>

      <template #publishStatus="{ row }">
        <el-tag
          :type="
            publishStatusObj[
              getPublishStatus(
                row.isPublished,
                row.publishStartTime,
                row.publishEndTime,
                row.publishStatus,
              )
            ]?.tagType || 'info'
          "
        >
          {{
            publishStatusObj[
              getPublishStatus(
                row.isPublished,
                row.publishStartTime,
                row.publishEndTime,
                row.publishStatus,
              )
            ]?.label
          }}
        </el-tag>
      </template>

      <template #fanoutStatus="{ row }">
        <el-tag
          v-if="row.fanoutStatus != null"
          :type="fanoutStatusObj[row.fanoutStatus]?.tagType || 'info'"
        >
          {{ fanoutStatusObj[row.fanoutStatus]?.label || row.fanoutStatus }}
        </el-tag>
        <el-text v-else type="info">-</el-text>
      </template>

      <template #fanoutUpdatedAt="{ row }">
        <el-text v-if="row.fanoutUpdatedAt">
          {{ formatUTC(row.fanoutUpdatedAt, 'YYYY-MM-DD HH:mm:ss') }}
        </el-text>
        <el-text v-else type="info">-</el-text>
      </template>

      <template #actions="{ row }">
        <VbenTableAction
          align="center"
          :actions="getAnnouncementActions(row)"
        />
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
      :sections="getDetailSections"
      class="w-[1000px]"
    />
  </Page>
</template>
