<script lang="ts" setup>
import type {
  CouponFormValues,
  CouponGrantFormValues,
  CouponGrantPayload,
  CouponRow,
} from './model/coupon';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  CouponDefinitionPageRequest,
  CouponDefinitionUpdateStatusRequest,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  couponDefinitionCreateApi,
  couponDefinitionPageApi,
  couponDefinitionUpdateApi,
  couponDefinitionUpdateStatusApi,
  couponGrantWorkflowCreateApi,
} from '#/api/core';
import { markHandledFormError } from '#/components/es-modal-form/error';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';
import {
  normalizeSearchBoolean,
  normalizeSearchNumber,
  splitSearchDateRange,
} from '#/utils/search-normalize';
import { buildWorkflowManagerRoute } from '#/views/system-manager/workflow/model/shared';

import {
  buildCouponCreatePayload,
  buildCouponGrantPayload,
  buildCouponUpdatePayload,
  couponColumns,
  couponFormSchema,
  couponGrantFormSchema,
  couponSearchSchema,
  createCouponGrantOperationId,
  formatCouponAbility,
  getCouponDetailCards,
  mapCouponToFormRecord,
} from './model/coupon';

defineOptions({
  name: 'CouponDefinition',
});

type CouponSearchValues = {
  couponType?: unknown;
  dateRange?: unknown;
  isEnabled?: unknown;
};

const currentCoupon = ref({} as CouponRow);
const currentGrantCoupon = ref<CouponRow>();
const currentGrantOperationId = ref('');
const router = useRouter();

const couponGridOptions: VxeGridProps<CouponRow> = {
  columns: couponColumns,
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues?: CouponSearchValues) =>
        await couponDefinitionPageApi(
          formatQuery({
            page,
            formValues: buildCouponSearchValues(formValues),
            sorts,
          }),
        ),
    },
    sort: true,
  },
};

const [CouponGrid, couponGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(couponSearchSchema),
  gridOptions: couponGridOptions,
});

const [CreateForm, createFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [EditForm, editFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [GrantForm, grantFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
  title: '券定义详情',
});

function buildCouponSearchValues(formValues: CouponSearchValues = {}) {
  const { endDate, startDate } = splitSearchDateRange(formValues.dateRange);

  return {
    couponType: normalizeSearchNumber(formValues.couponType),
    endDate,
    isEnabled: normalizeSearchBoolean(formValues.isEnabled),
    startDate,
  } satisfies Partial<CouponDefinitionPageRequest>;
}

function openCreateModal() {
  createFormApi
    .setData({
      cols: 2,
      schema: couponFormSchema,
      title: '券定义',
      width: 1000,
    })
    .open();
}

function openEditModal(row: CouponRow) {
  editFormApi
    .setData({
      cols: 2,
      record: mapCouponToFormRecord(row),
      schema: couponFormSchema,
      title: '券定义',
      width: 1000,
    })
    .open();
}

function openGrantModal(row: CouponRow) {
  currentGrantCoupon.value = row;
  currentGrantOperationId.value = createCouponGrantOperationId();
  grantFormApi
    .setData({
      cols: 2,
      record: {
        couponAbility: formatCouponAbility(row),
        grantSummary: '请选择发券用户',
        couponName: row.name,
        quantity: 1,
      },
      schema: couponGrantFormSchema,
      title: '发券',
      width: 760,
    })
    .open();
}

function openDetailModal(row: CouponRow) {
  currentCoupon.value = row;
  detailApi.setData({ recordId: row.id }).open();
}

async function handleCreateSubmit(values: CouponFormValues) {
  let payload;
  try {
    payload = buildCouponCreatePayload(values);
  } catch (error) {
    useMessage.warning(error instanceof Error ? error.message : '创建失败');
    throw markHandledFormError(error);
  }

  await couponDefinitionCreateApi(payload);
  useMessage.success('操作成功');
  await couponGridApi.reload();
}

async function handleEditSubmit(values: CouponFormValues) {
  let payload;
  try {
    payload = buildCouponUpdatePayload(values);
  } catch (error) {
    useMessage.warning(error instanceof Error ? error.message : '编辑失败');
    throw markHandledFormError(error);
  }

  await couponDefinitionUpdateApi(payload);
  useMessage.success('操作成功');
  await couponGridApi.reload();
}

async function handleGrant(values: CouponGrantFormValues) {
  let payload: CouponGrantPayload;
  try {
    payload = buildCouponGrantPayload(
      values,
      currentGrantCoupon.value?.id,
      currentGrantOperationId.value,
    );
  } catch (error) {
    useMessage.warning(error instanceof Error ? error.message : '发券失败');
    throw markHandledFormError(error);
  }

  const task = await couponGrantWorkflowCreateApi(payload);
  useMessage.success('批量发券任务已创建');
  grantFormApi.close();
  await couponGridApi.reload();
  void router.push(buildWorkflowManagerRoute(task.jobId));
}

async function toggleEnableStatus(row: CouponRow) {
  if (typeof row.id !== 'number') {
    return;
  }

  row.statusLoading = true;
  try {
    await couponDefinitionUpdateStatusApi({
      id: row.id,
      isEnabled: row.isEnabled !== true,
    } satisfies CouponDefinitionUpdateStatusRequest);
    useMessage.success('状态更新成功');
    await couponGridApi.reload();
  } finally {
    row.statusLoading = false;
  }
}

async function getCurrentCoupon() {
  return currentCoupon.value;
}
</script>

<template>
  <Page auto-content-height content-class="es-full-height-page-content">
    <div class="es-full-height-pane">
      <CouponGrid class="es-full-height-grid">
        <template #toolbar-actions>
          <el-button class="ml-2" type="primary" @click="openCreateModal()">
            添加券定义
          </el-button>
        </template>

        <template #detail="{ row }">
          <el-text
            class="cursor-pointer text-left hover:opacity-80"
            type="primary"
            @click="openDetailModal(row)"
          >
            {{ row.name || row.id }}
          </el-text>
        </template>

        <template #isEnabled="{ row }">
          <el-switch
            :active-value="true"
            :inactive-value="false"
            :loading="row.statusLoading"
            :model-value="row.isEnabled === true"
            @change="toggleEnableStatus(row)"
          />
        </template>

        <template #actions="{ row }">
          <div class="my-1 flex items-center">
            <el-button link type="primary" @click="openDetailModal(row)">
              详情
            </el-button>
            <el-divider direction="vertical" />
            <el-button link type="primary" @click="openEditModal(row)">
              编辑
            </el-button>
            <el-divider direction="vertical" />
            <el-button link type="primary" @click="openGrantModal(row)">
              发券
            </el-button>
          </div>
        </template>
      </CouponGrid>

      <CreateForm :schema="couponFormSchema" :on-submit="handleCreateSubmit" />
      <EditForm :schema="couponFormSchema" :on-submit="handleEditSubmit" />
      <GrantForm :schema="couponGrantFormSchema" :on-submit="handleGrant" />

      <DetailModal
        :api="getCurrentCoupon"
        :cards="getCouponDetailCards"
        class="w-[980px]"
      />
    </div>
  </Page>
</template>
