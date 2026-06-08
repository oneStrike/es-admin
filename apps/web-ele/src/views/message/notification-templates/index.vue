<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AdminMessageNotificationTemplateDto,
  MessageNotificationTemplatesCreateRequest,
  MessageNotificationTemplatesPreviewResponse,
  MessageNotificationTemplatesUpdateEnabledRequest,
  MessageNotificationTemplatesUpdateRequest,
} from '#/api/types';

import { computed, nextTick, ref } from 'vue';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  messageNotificationTemplatesCreateApi,
  messageNotificationTemplatesDetailApi,
  messageNotificationTemplatesPageApi,
  messageNotificationTemplatesPreviewApi,
  messageNotificationTemplatesUpdateApi,
  messageNotificationTemplatesUpdateEnabledApi,
} from '#/api/core';
import RecordDetailModal from '#/components/record-detail-modal';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import {
  getCanonicalTemplate,
  getTemplateVariables,
  isNotificationCategoryKey,
} from '../model/notification';
import { getDetailSections } from './model/detail';
import {
  createTemplateFormSchema,
  formatCategory,
  pageColumns,
  searchFormSchema,
} from './model/shared';

defineOptions({
  name: 'MessageNotificationTemplates',
});

type TemplateRow = AdminMessageNotificationTemplateDto & {
  enabledLoading?: boolean;
};

type TemplateFormValues = Partial<
  Pick<
    MessageNotificationTemplatesCreateRequest,
    'categoryKey' | 'contentTemplate' | 'isEnabled' | 'remark' | 'titleTemplate'
  >
>;

const editingRecord = ref<AdminMessageNotificationTemplateDto | null>(null);
const selectedCategoryKey = ref('');
const previewLoading = ref(false);
const templatePreview = ref<MessageNotificationTemplatesPreviewResponse | null>(
  null,
);

const availableTemplateVariables = computed(() =>
  getTemplateVariables(selectedCategoryKey.value),
);

function removeEmptyValues<T extends Record<string, unknown>>(values: T) {
  return Object.fromEntries(
    Object.entries(values).filter(
      ([, value]) => value !== '' && value !== null && value !== undefined,
    ),
  ) as Partial<T>;
}

const gridOptions: VxeGridProps<TemplateRow> = {
  columns: pageColumns,
  height: 'auto',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const { dateRange, ...restFormValues } = formValues || {};
        const [startDate, endDate] = Array.isArray(dateRange) ? dateRange : [];

        return await messageNotificationTemplatesPageApi(
          removeEmptyValues(
            formatQuery({
              page,
              formValues: {
                ...restFormValues,
                endDate,
                startDate,
              },
              sorts,
            }),
          ),
        );
      },
    },
    sort: true,
  },
};

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: RecordDetailModal,
  title: '通知模板详情',
});

const formSchema = createTemplateFormSchema(handleCategoryChange);

const [TemplateForm, templateFormApi] = useVbenForm({
  handleSubmit,
  layout: 'vertical',
  schema: formSchema,
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2 gap-x-4',
});

const [TemplateModal, templateModalApi] = useVbenModal({
  onConfirm: async () => {
    await templateFormApi.validateAndSubmitForm();
  },
  onOpenChange(isOpen) {
    if (!isOpen) {
      editingRecord.value = null;
      selectedCategoryKey.value = '';
      templatePreview.value = null;
      return;
    }

    templateModalApi.setState({
      title: editingRecord.value ? '编辑通知模板' : '新增通知模板',
    });
    templateFormApi.setState({
      schema: createTemplateFormSchema(handleCategoryChange, {
        categoryDisabled: Boolean(editingRecord.value),
      }),
    });

    void nextTick(async () => {
      await templateFormApi.resetForm();
      if (editingRecord.value) {
        selectedCategoryKey.value = editingRecord.value.categoryKey;
        await templateFormApi.setValues(editingRecord.value);
        return;
      }

      await templateFormApi.setValues({ isEnabled: true });
    });
  },
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(searchFormSchema),
  gridOptions,
});

async function openFormModal(row?: TemplateRow) {
  editingRecord.value = row
    ? await messageNotificationTemplatesDetailApi({ id: row.id })
    : null;

  templateModalApi.open();
}

async function handleCategoryChange(categoryKey?: string) {
  selectedCategoryKey.value = categoryKey || '';
  templatePreview.value = null;

  if (!isNotificationCategoryKey(categoryKey)) {
    return;
  }

  const defaults = getCanonicalTemplate(categoryKey);
  const values = await templateFormApi.getValues();
  await templateFormApi.setValues({
    contentTemplate:
      values.contentTemplate || defaults?.contentTemplate || undefined,
    remark: values.remark || defaults?.remark || undefined,
    titleTemplate: values.titleTemplate || defaults?.titleTemplate || undefined,
  });
}

async function handleSubmit(values: TemplateFormValues) {
  if (!isNotificationCategoryKey(values.categoryKey)) {
    useMessage.warning('请先选择通知分类');
    return;
  }

  const titleTemplate = values.titleTemplate?.trim();
  const contentTemplate = values.contentTemplate?.trim();

  if (!titleTemplate || !contentTemplate) {
    useMessage.warning('请完整填写标题模板和正文模板');
    return;
  }

  const payload = {
    categoryKey: values.categoryKey,
    contentTemplate,
    isEnabled: values.isEnabled ?? true,
    remark: values.remark?.trim?.() || undefined,
    titleTemplate,
  } satisfies MessageNotificationTemplatesCreateRequest;

  await (editingRecord.value
    ? messageNotificationTemplatesUpdateApi({
        contentTemplate: payload.contentTemplate,
        id: editingRecord.value.id,
        isEnabled: payload.isEnabled,
        remark: payload.remark,
        titleTemplate: payload.titleTemplate,
      } satisfies MessageNotificationTemplatesUpdateRequest)
    : messageNotificationTemplatesCreateApi(payload));

  templateModalApi.close();
  useMessage.success('操作成功');
  await gridApi.reload();
}

async function applyCurrentCategoryDefaults() {
  const values = await templateFormApi.getValues();
  const categoryKey = values.categoryKey;

  if (!isNotificationCategoryKey(categoryKey)) {
    useMessage.warning('请先选择通知分类');
    return;
  }

  const defaults = getCanonicalTemplate(categoryKey);
  if (!defaults) {
    return;
  }

  await templateFormApi.setValues(defaults);
  templatePreview.value = null;
}

async function appendTemplateVariable(
  fieldName: 'contentTemplate' | 'titleTemplate',
  variable: string,
) {
  const values = await templateFormApi.getValues();
  const currentValue = values[fieldName] || '';
  await templateFormApi.setValues({
    [fieldName]: `${currentValue}${variable}`,
  });
  templatePreview.value = null;
}

async function toggleEnabled(row: TemplateRow) {
  row.enabledLoading = true;
  try {
    await messageNotificationTemplatesUpdateEnabledApi({
      id: row.id,
      isEnabled: !row.isEnabled,
    } satisfies MessageNotificationTemplatesUpdateEnabledRequest);
    useMessage.success(row.isEnabled ? '已停用' : '已启用');
    await gridApi.reload();
  } finally {
    row.enabledLoading = false;
  }
}

function getTemplateActions(row: TemplateRow): ActionItem[] {
  return [
    {
      key: 'detail',
      text: '详情',
      onClick: () => detailApi.setData({ id: row.id }).open(),
    },
    {
      key: 'edit',
      text: '编辑',
      onClick: () => openFormModal(row),
    },
  ];
}

async function previewCurrentTemplate() {
  const values = await templateFormApi.getValues();
  if (!isNotificationCategoryKey(values.categoryKey)) {
    useMessage.warning('请先选择通知分类');
    return;
  }

  const titleTemplate = values.titleTemplate?.trim();
  const contentTemplate = values.contentTemplate?.trim();
  if (!titleTemplate || !contentTemplate) {
    useMessage.warning('请完整填写标题模板和正文模板');
    return;
  }

  previewLoading.value = true;
  try {
    templatePreview.value = await messageNotificationTemplatesPreviewApi({
      categoryKey: values.categoryKey,
      contentTemplate,
      isEnabled: values.isEnabled ?? true,
      titleTemplate,
    });
  } finally {
    previewLoading.value = false;
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

      <template #category="{ row }">
        <div class="min-w-0">
          <div class="truncate">{{ formatCategory(row) }}</div>
        </div>
      </template>

      <template #isEnabled="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.enabledLoading"
          :model-value="row.isEnabled"
          @change="toggleEnabled(row)"
        />
      </template>

      <template #actions="{ row }">
        <VbenTableAction align="center" :actions="getTemplateActions(row)" />
      </template>
    </Grid>

    <TemplateModal class="w-[960px] px-4">
      <TemplateForm />

      <div class="mt-4 rounded-md border border-border p-4">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div class="text-sm font-medium">模板辅助</div>
            <div class="text-xs text-gray-400">
              按通知分类套用默认文案，或点击变量插入到标题/正文模板。
            </div>
          </div>
          <el-button type="primary" @click="applyCurrentCategoryDefaults">
            套用默认模板
          </el-button>
          <el-button :loading="previewLoading" @click="previewCurrentTemplate">
            预览
          </el-button>
        </div>

        <div class="mt-3 flex flex-wrap gap-2">
          <el-tooltip
            v-for="item in availableTemplateVariables"
            :key="item.value"
            :content="item.description"
            placement="top"
          >
            <el-button-group>
              <el-button
                size="small"
                @click="appendTemplateVariable('titleTemplate', item.value)"
              >
                标题+{{ item.label }}
              </el-button>
              <el-button
                size="small"
                @click="appendTemplateVariable('contentTemplate', item.value)"
              >
                正文+{{ item.label }}
              </el-button>
            </el-button-group>
          </el-tooltip>
        </div>

        <div
          v-if="templatePreview"
          class="mt-4 rounded-md border border-border bg-[var(--el-fill-color-lighter)] p-3"
        >
          <div class="flex flex-wrap items-center gap-2">
            <el-tag :type="templatePreview.usedTemplate ? 'success' : 'info'">
              {{ templatePreview.usedTemplate ? '模板生效' : '使用回退' }}
            </el-tag>
            <el-text type="info">{{ templatePreview.categoryLabel }}</el-text>
            <el-text v-if="templatePreview.fallbackReason" type="warning">
              {{ templatePreview.fallbackReason }}
            </el-text>
          </div>
          <div class="mt-3 text-sm font-medium">
            {{ templatePreview.title }}
          </div>
          <div class="mt-2 whitespace-pre-wrap text-sm text-gray-600">
            {{ templatePreview.content }}
          </div>
        </div>
      </div>

      <template #prepend-footer>
        <el-button @click="templateFormApi.resetForm()">重置</el-button>
      </template>
    </TemplateModal>

    <DetailModal
      :api="messageNotificationTemplatesDetailApi"
      :sections="getDetailSections"
      class="w-[920px]"
    />
  </Page>
</template>
