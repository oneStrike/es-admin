<script setup lang="ts">
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AdminAgreementDetailDto,
  AdminAgreementListItemDto,
  AgreementPageRequest,
  CreateAgreementDto,
  UpdateAgreementDto,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { useClipboard } from '@vueuse/core';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  agreementCreateApi,
  agreementDetailApi,
  agreementPageApi,
  agreementUpdateApi,
  agreementUpdateStatusApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { fetchAgreementAccessHtml } from './access-preview';
import { getDetailCards } from './model/detail';
import { agreementColumns, agreementFilter, formSchema } from './model/shared';

type AgreementRow = AdminAgreementListItemDto & {
  loading?: boolean;
};

type AgreementStatusRecord = (AdminAgreementDetailDto | AgreementRow) & {
  loading?: boolean;
};
const { copy: writeClipboardText } = useClipboard({ legacy: true });

const previewHtml = ref('');
const previewLoadingId = ref<null | number>(null);
const previewTitle = ref('');

const gridOptions: VxeGridProps<AgreementRow> = {
  columns: agreementColumns,
  height: 'auto',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await agreementPageApi(
          formatQuery({
            page,
            formValues: buildAgreementPageQuery(formValues),
            sorts,
          }),
        );
      },
    },
    sort: true,
  },
};

function buildAgreementPageQuery(
  formValues: Partial<AgreementPageRequest>,
): Partial<AgreementPageRequest> {
  const query: Partial<AgreementPageRequest> = {};

  if (formValues.isPublished !== undefined) {
    query.isPublished = formValues.isPublished;
  }
  if (formValues.showInAuth !== undefined) {
    query.showInAuth = formValues.showInAuth;
  }
  if (formValues.title) {
    query.title = formValues.title;
  }

  return query;
}

const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(agreementFilter),
  gridOptions,
});

const [PreviewModal, previewApi] = useVbenModal({
  footer: false,
  onOpenChange(isOpen) {
    if (!isOpen) {
      previewHtml.value = '';
      previewTitle.value = '';
    }
  },
  title: '协议预览',
});

async function openFormModal(row?: AgreementRow) {
  const record = row ? await agreementDetailApi({ id: row.id }) : undefined;
  formApi.setData({ title: '协议', record }).open();
}

function buildAgreementPayload(
  values: CreateAgreementDto | UpdateAgreementDto,
): CreateAgreementDto | UpdateAgreementDto {
  const payload = {
    title: values.title,
    version: values.version,
    showInAuth: values.showInAuth,
    isForce: values.isForce,
    content: values.content,
  };

  return 'id' in values && typeof values.id === 'number'
    ? ({ id: values.id, ...payload } as UpdateAgreementDto)
    : (payload as CreateAgreementDto);
}

async function handleSubmit(values: CreateAgreementDto | UpdateAgreementDto) {
  const payload = buildAgreementPayload(values);

  await ('id' in payload && typeof payload.id === 'number'
    ? agreementUpdateApi(payload as UpdateAgreementDto)
    : agreementCreateApi(payload as CreateAgreementDto));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
  title: '协议详情',
});

async function copyAccessPath(row: AgreementRow) {
  if (!row.accessPath) {
    useMessage.warning('暂无访问路径');
    return;
  }

  try {
    await writeClipboardText(row.accessPath);
    useMessage.success('复制成功');
  } catch {
    useMessage.error('复制失败');
  }
}

async function openPreview(row: AgreementRow) {
  const previewId = row.id;
  previewHtml.value = '';
  previewTitle.value = row.title;
  previewLoadingId.value = previewId;

  try {
    const html = await fetchAgreementAccessHtml(previewId);
    if (previewLoadingId.value !== previewId) {
      return;
    }
    previewHtml.value = html;
    previewApi.open();
  } catch {
    previewHtml.value = '';
  } finally {
    if (previewLoadingId.value === previewId) {
      previewLoadingId.value = null;
    }
  }
}

async function togglePublishedStatus(record: AgreementStatusRecord) {
  record.loading = true;
  try {
    await agreementUpdateStatusApi({
      id: record.id,
      isPublished: !record.isPublished,
    });
    useMessage.success('操作成功');
    gridApi.reload();
  } finally {
    record.loading = false;
  }
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

      <template #isPublished="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.loading"
          :model-value="row.isPublished"
          @change="togglePublishedStatus(row)"
        />
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
            link
            :loading="previewLoadingId === row.id"
            type="primary"
            @click="openPreview(row)"
          >
            预览
          </el-button>
          <el-divider direction="vertical" />
          <el-button link type="primary" @click="copyAccessPath(row)">
            复制访问地址
          </el-button>
        </div>
      </template>
    </Grid>

    <Form :schema="formSchema" :on-submit="handleSubmit" />

    <DetailModal
      :api="agreementDetailApi"
      :cards="getDetailCards"
      class="w-[900px]"
    />

    <PreviewModal class="h-[82vh] w-[960px]">
      <div class="flex h-full min-h-0 flex-col gap-3">
        <div class="shrink-0 truncate text-sm text-muted-foreground">
          {{ previewTitle || '协议预览' }}
        </div>
        <iframe
          class="min-h-0 flex-1 rounded-md border border-border bg-white"
          sandbox=""
          :srcdoc="previewHtml"
          title="协议预览"
        ></iframe>
      </div>
    </PreviewModal>
  </Page>
</template>
