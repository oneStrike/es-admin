<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AnnouncementPageResponseDto,
  BaseAppPageDto,
  CreateAnnouncementDto,
  UpdateAnnouncementDto,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
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
import { useMessage } from '#/hooks/useFeedback';
import { formatUTC } from '#/utils';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailCards } from './model/detail';
import {
  announcementColumns,
  announcementFilter,
  formSchema,
  getPublishStatus,
  publishStatusObj,
} from './model/shared';

const clientPageObj = ref<Record<string, string>>({});

appPagePageApi({
  pageSize: 500,
}).then((res) => {
  const pageOptions =
    res.list?.map((pageItem: BaseAppPageDto) => {
      clientPageObj.value[pageItem.id!] = pageItem.name;
      return {
        label: pageItem.name,
        value: pageItem.id,
        ...pageItem,
      };
    }) || [];

  announcementFilter.forEach((item) => {
    if (item.fieldName === 'pageId' && item.componentProps) {
      (item.componentProps as any).options = pageOptions;
    }
  });
  formSchema.forEach((item) => {
    if (item.fieldName === 'pageId' && item.componentProps) {
      (item.componentProps as any).options = pageOptions;
    }
  });

  gridApi.setState((prev) => ({
    formOptions: {
      ...(prev.formOptions ?? {}),
      schema: [...announcementFilter],
    },
  }));
});

const gridOptions: VxeGridProps<AnnouncementPageResponseDto> = {
  columns: announcementColumns,
  height: 'auto',
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        if (formValues.enablePlatform) {
          formValues.enablePlatform = JSON.stringify(formValues.enablePlatform);
        }
        return await announcementPageApi({
          pageIndex: --page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
    sort: true,
  },
};

const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(announcementFilter),
  gridOptions,
});

async function openFormModal(row?: AnnouncementPageResponseDto) {
  let record;
  if (row) {
    record = await announcementDetailApi({ id: row.id });
    record.dateTimeRange = [record.publishStartTime, record.publishEndTime];
  }
  formApi.setData({ title: '公告管理', record }).open();
}

async function handleSubmit(
  values: CreateAnnouncementDto | UpdateAnnouncementDto,
) {
  await (values?.id
    ? announcementUpdateApi(values as UpdateAnnouncementDto)
    : announcementCreateApi(values as CreateAnnouncementDto));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function deleteAnnouncement(record: AnnouncementPageResponseDto) {
  await announcementDeleteApi({ id: record.id });
  useMessage.success('操作成功');
  gridApi.reload();
}

async function togglePublishStatus(record: AnnouncementPageResponseDto) {
  const newStatus = !record.isPublished;
  await announcementUpdateStatusApi({
    id: record.id,
    isPublished: newStatus,
  });
  useMessage.success(newStatus ? '发布成功' : '取消发布成功');
  gridApi.reload();
}

function getPublishButtonText(record: AnnouncementPageResponseDto): string {
  const status = getPublishStatus(record.isPublished, record.publishEndTime);

  if (status === 'unpublished') {
    return '发布';
  } else if (status === 'published') {
    return '取消发布';
  } else {
    return '重新发布';
  }
}

function canPublish(record: AnnouncementPageResponseDto): boolean {
  const status = getPublishStatus(record.isPublished, record.publishEndTime);
  return status !== 'expired';
}

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
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
        </div>
        <el-text
          class="cursor-pointer hover:opacity-50"
          type="primary"
          @click="detailApi.setData({ recordId: row.id }).open()"
        >
          {{ row.title }}
        </el-text>
      </template>

      <template #dateTimeRange="{ row }">
        <el-text>
          {{
            row.publishStartTime || row.publishEndTime
              ? `${formatUTC(row.publishStartTime, 'YYYY-MM-DD')} - ${formatUTC(row.publishEndTime, 'YYYY-MM-DD')}`
              : '-'
          }}
        </el-text>
      </template>

      <template #pageId="{ row }">
        <el-text>
          {{
            row.pageId && clientPageObj[row.pageId]
              ? clientPageObj[row.pageId]
              : '-'
          }}
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
          <el-popconfirm
            v-if="canPublish(row)"
            :title="
              row.isPublished ? '确认取消发布当前公告?' : '确认发布当前公告?'
            "
            width="180"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="togglePublishStatus(row)"
          >
            <template #reference>
              <el-button link :type="canPublish(row) ? 'primary' : 'danger'">
                {{ getPublishButtonText(row) }}
              </el-button>
            </template>
          </el-popconfirm>
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
          <el-popconfirm
            title="确认删除当前项?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="deleteAnnouncement(row)"
          >
            <template #reference>
              <el-button link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </Grid>

    <Form
      :schema="formSchema"
      :field-mapping-time="[
        ['dateTimeRange', ['publishStartTime', 'publishEndTime']],
      ]"
      :on-submit="handleSubmit"
    />

    <DetailModal
      :api="announcementDetailApi"
      :cards="getDetailCards"
      class="!w-[1000px]"
    />
  </Page>
</template>
