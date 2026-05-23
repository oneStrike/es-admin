<script setup lang="ts">
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  BaseEmojiAssetDto,
  BaseEmojiPackDto,
  ContentEmojiAssetCreateRequest,
  ContentEmojiAssetUpdateRequest,
  ContentEmojiPackCreateRequest,
  ContentEmojiPackUpdateRequest,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  contentEmojiAssetCreateApi,
  contentEmojiAssetDeleteApi,
  contentEmojiAssetDetailApi,
  contentEmojiAssetPageApi,
  contentEmojiAssetSwapSortOrderApi,
  contentEmojiAssetUpdateApi,
  contentEmojiAssetUpdateEnabledApi,
  contentEmojiPackCreateApi,
  contentEmojiPackDeleteApi,
  contentEmojiPackDetailApi,
  contentEmojiPackPageApi,
  contentEmojiPackSwapSortOrderApi,
  contentEmojiPackUpdateApi,
  contentEmojiPackUpdateEnabledApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { useForm } from '#/hooks/useForm';
import { createSearchFormOptions, formSchemaTransform } from '#/utils';

import {
  createEmojiAssetColumns,
  emojiAssetFormSchema,
  emojiAssetSearchSchema,
} from './model/asset';
import { emojiPackFormSchema } from './model/pack';
import {
  buildEmojiPackOptions,
  getEmojiPackLabel,
  normalizeSceneTypeValue,
  sortEmojiPacks,
  unicodeSequenceToEmoji,
} from './model/shared';

defineOptions({
  name: 'EmojiManager',
});

const packKeyword = ref('');
const packs = ref<BaseEmojiPackDto[]>([]);
const currentPack = ref<BaseEmojiPackDto | null>(null);

const filteredPacks = computed(() => {
  const keyword = packKeyword.value.trim().toLowerCase();
  if (!keyword) return packs.value;

  return packs.value.filter((item) => {
    return (
      item.name?.toLowerCase().includes(keyword) ||
      item.code?.toLowerCase().includes(keyword)
    );
  });
});

const packOptions = computed(() => buildEmojiPackOptions(packs.value));

const packListSchema: EsFormSchema = [
  { component: 'Input', fieldName: 'name', label: '表情包' },
  { component: 'Switch', fieldName: 'isEnabled', label: '状态' },
];

const packGridOptions: VxeGridProps<BaseEmojiPackDto> = {
  columns: formSchemaTransform.toTableColumns<BaseEmojiPackDto>(
    packListSchema,
    {
      seq: { width: 70 },
      name: {
        headerAlign: 'center',
        minWidth: 220,
        slots: { default: 'packName' },
      },
      isEnabled: {
        minWidth: 110,
        slots: { default: 'packStatus' },
      },
      actions: {
        minWidth: 150,
        show: true,
        slots: { default: 'packActions' },
      },
    },
  ),
  data: [],
  height: '100%',
  rowConfig: {
    drag: true,
    isCurrent: true,
  },
  rowDragConfig: {
    async dragEndMethod(params) {
      await contentEmojiPackSwapSortOrderApi({
        dragId: params.dragRow.id,
        targetId: params.newRow.id,
      });
      useMessage.success('排序更新成功');
      await loadPacks(currentPack.value?.id);
      return true;
    },
  },
};

const assetGridOptions: VxeGridProps<BaseEmojiAssetDto> = {
  columns: createEmojiAssetColumns([], {
    hidePackColumn: true,
  }),
  height: '100%',
  proxyConfig: {
    autoLoad: false,
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        if (!currentPack.value?.id) {
          return {
            list: [],
            total: 0,
          };
        }

        return await contentEmojiAssetPageApi(
          formatQuery({
            page,
            formValues: {
              ...formValues,
              packId: currentPack.value.id,
            },
            sorts,
          }),
        );
      },
    },
    sort: true,
  },
  rowConfig: {
    drag: true,
  },
  rowDragConfig: {
    async dragEndMethod(params) {
      await contentEmojiAssetSwapSortOrderApi({
        dragId: params.dragRow.id,
        targetId: params.newRow.id,
      });
      useMessage.success('排序更新成功');
      await assetGridApi.reload();
      return true;
    },
  },
};

const [PackGrid, packGridApi] = useVbenVxeGrid({
  gridOptions: packGridOptions,
  gridEvents: {
    cellClick({ row }: { row: BaseEmojiPackDto }) {
      selectPack(row);
    },
  },
});

const [AssetGrid, assetGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(emojiAssetSearchSchema),
  gridOptions: assetGridOptions,
});

const [PackForm, packFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [AssetForm, assetFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

watch(
  filteredPacks,
  async (data) => {
    packGridApi.setGridOptions({
      data,
    });
    await syncCurrentPackRow();
  },
  { immediate: true },
);

watch(currentPack, async () => {
  await syncCurrentPackRow();
});

watch(
  packOptions,
  (options) => {
    useForm.setOptions(emojiAssetFormSchema, {
      packId: [...options],
    });
    assetGridApi.setGridOptions({
      columns: createEmojiAssetColumns(options, {
        hidePackColumn: true,
      }),
    });
  },
  { immediate: true },
);

function isUpdatePackPayload(
  payload: ContentEmojiPackCreateRequest | ContentEmojiPackUpdateRequest,
): payload is ContentEmojiPackUpdateRequest {
  return 'id' in payload && Number.isFinite(payload.id);
}

function isUpdateAssetPayload(
  payload: ContentEmojiAssetCreateRequest | ContentEmojiAssetUpdateRequest,
): payload is ContentEmojiAssetUpdateRequest {
  return 'id' in payload && Number.isFinite(payload.id);
}

function selectPack(pack: BaseEmojiPackDto) {
  if (currentPack.value?.id === pack.id) {
    void syncCurrentPackRow();
    return;
  }

  currentPack.value = pack;
  void assetGridApi.reload();
}

async function syncCurrentPackRow() {
  const grid = packGridApi.grid;
  if (!grid?.setCurrentRow || !grid?.clearCurrentRow) {
    return;
  }

  await nextTick();

  if (currentPack.value) {
    await grid.setCurrentRow(currentPack.value);
    return;
  }

  await grid.clearCurrentRow();
}

async function loadPacks(preferredPackId?: number) {
  const response = await contentEmojiPackPageApi({
    pageSize: 500,
  });

  packs.value = sortEmojiPacks(response.list || []);

  const nextPackId =
    preferredPackId ?? currentPack.value?.id ?? packs.value[0]?.id;

  currentPack.value =
    packs.value.find((item) => item.id === nextPackId) ||
    packs.value[0] ||
    null;

  await assetGridApi.reload();
}

function normalizePackPayload(
  values: Record<string, any>,
): ContentEmojiPackCreateRequest | ContentEmojiPackUpdateRequest {
  const code = values.code?.trim?.();
  const name = values.name?.trim?.();
  const sceneType = normalizeSceneTypeValue(values.sceneType);

  if (!code || !name || sceneType.length === 0) {
    useMessage.warning('请完整填写表情包名称、编码和场景类型');
    throw new Error('invalid emoji pack payload');
  }

  const payload = {
    code,
    description: values.description?.trim?.() || undefined,
    iconUrl: values.iconUrl || undefined,
    isEnabled: values.isEnabled ?? true,
    name,
    sceneType: sceneType as ContentEmojiPackCreateRequest['sceneType'],
    sortOrder: Number(values.sortOrder ?? 0),
    visibleInPicker: values.visibleInPicker ?? true,
  };

  return values.id
    ? ({
        ...payload,
        id: Number(values.id),
      } as ContentEmojiPackUpdateRequest)
    : (payload as ContentEmojiPackCreateRequest);
}

function normalizeAssetPayload(
  values: Record<string, any>,
): ContentEmojiAssetCreateRequest | ContentEmojiAssetUpdateRequest {
  const kind = Number(values.kind ?? 2) as 1 | 2;
  const packId = Number(values.packId ?? currentPack.value?.id);

  if (!packId) {
    useMessage.warning('请先选择表情包');
    throw new Error('missing pack id');
  }

  const payload = {
    category: values.category?.trim?.() || undefined,
    isAnimated: false,
    isEnabled: values.isEnabled ?? true,
    keywords: values.keywords?.trim?.() || undefined,
    kind,
    packId,
    sortOrder: Number(values.sortOrder ?? 0),
  };

  if (kind === 1) {
    const unicodeSequence = values.unicodeSequence?.trim?.();
    if (!unicodeSequence) {
      useMessage.warning('请填写 Unicode 序列');
      throw new Error('missing unicode sequence');
    }

    const unicodePayload = {
      ...payload,
      imageUrl: undefined,
      isAnimated: false,
      shortcode: undefined,
      staticUrl: undefined,
      unicodeSequence,
    };

    return values.id
      ? ({
          ...unicodePayload,
          id: Number(values.id),
        } as ContentEmojiAssetUpdateRequest)
      : (unicodePayload as ContentEmojiAssetCreateRequest);
  }

  const shortcode = values.shortcode?.trim?.();
  const imageUrl = values.imageUrl || undefined;

  if (!shortcode || !imageUrl) {
    useMessage.warning('自定义表情请至少填写短码并上传动态资源');
    throw new Error('missing custom asset fields');
  }

  const customPayload = {
    ...payload,
    imageUrl,
    isAnimated: values.isAnimated ?? false,
    shortcode,
    staticUrl: values.staticUrl || undefined,
    unicodeSequence: undefined,
  };

  return values.id
    ? ({
        ...customPayload,
        id: Number(values.id),
      } as ContentEmojiAssetUpdateRequest)
    : (customPayload as ContentEmojiAssetCreateRequest);
}

async function openPackFormModal(row?: BaseEmojiPackDto) {
  let record: Record<string, any> | undefined;
  if (row) {
    const detail = await contentEmojiPackDetailApi({ id: row.id });
    record = {
      ...detail,
      sceneType: normalizeSceneTypeValue(detail.sceneType),
    };
  }

  packFormApi
    .setData({
      cols: 2,
      record,
      schema: emojiPackFormSchema,
      title: '表情包',
      width: 980,
    })
    .open();
}

async function openAssetFormModal(row?: BaseEmojiAssetDto, packId?: number) {
  const targetPackId = packId ?? currentPack.value?.id;
  if (!targetPackId) {
    useMessage.warning('请先选择表情包');
    return;
  }

  const record: Record<string, any> | undefined = row
    ? await contentEmojiAssetDetailApi({ id: row.id })
    : {
        isEnabled: true,
        kind: 2,
        packId: targetPackId,
      };

  if (packId) {
    const selectedPack = packs.value.find((item) => item.id === packId);
    if (selectedPack) {
      currentPack.value = selectedPack;
    }
  }

  assetFormApi
    .setData({
      cols: 2,
      record,
      schema: emojiAssetFormSchema,
      title: '表情资源',
      width: 980,
    })
    .open();
}

async function handlePackSubmit(values: Record<string, any>) {
  const payload = normalizePackPayload(values);

  await (isUpdatePackPayload(payload)
    ? contentEmojiPackUpdateApi(payload)
    : contentEmojiPackCreateApi(payload));

  useMessage.success('操作成功');
  await loadPacks(
    isUpdatePackPayload(payload) ? payload.id : currentPack.value?.id,
  );
}

async function handleAssetSubmit(values: Record<string, any>) {
  const payload = normalizeAssetPayload(values);

  await (isUpdateAssetPayload(payload)
    ? contentEmojiAssetUpdateApi(payload)
    : contentEmojiAssetCreateApi(payload));

  useMessage.success('操作成功');
  await assetGridApi.reload();
}

async function deletePack(row: BaseEmojiPackDto) {
  if (row.isEnabled) {
    useMessage.warning('请先禁用表情包后再删除');
    return;
  }

  await contentEmojiPackDeleteApi({ id: row.id });
  useMessage.success('删除成功');
  await loadPacks(
    currentPack.value?.id === row.id ? undefined : currentPack.value?.id,
  );
}

async function confirmDeletePack(row: BaseEmojiPackDto) {
  const confirmed = await useConfirm({
    content: '确认删除当前表情包?',
    successMessage: false,
  });
  if (!confirmed) return;

  await deletePack(row);
}

async function togglePackEnableStatus(row: BaseEmojiPackDto) {
  row.enableLoading = true as never;
  try {
    await contentEmojiPackUpdateEnabledApi({
      id: row.id,
      isEnabled: !row.isEnabled,
    });
    useMessage.success('操作成功');
    await loadPacks(row.id);
  } finally {
    row.enableLoading = false as never;
  }
}

async function deleteAsset(row: BaseEmojiAssetDto) {
  await contentEmojiAssetDeleteApi({ id: row.id });
  useMessage.success('删除成功');
  await assetGridApi.reload();
}

async function confirmDeleteAsset(row: BaseEmojiAssetDto) {
  const confirmed = await useConfirm({
    content: '确认删除当前表情资源?',
    successMessage: false,
  });
  if (!confirmed) return;

  await deleteAsset(row);
}

async function toggleAssetEnableStatus(row: BaseEmojiAssetDto) {
  row.enableLoading = true as never;
  try {
    await contentEmojiAssetUpdateEnabledApi({
      id: row.id,
      isEnabled: !row.isEnabled,
    });
    useMessage.success('操作成功');
    await assetGridApi.reload();
  } finally {
    row.enableLoading = false as never;
  }
}

onMounted(() => {
  void loadPacks();
});
</script>

<template>
  <Page auto-content-height>
    <div class="flex h-full gap-4">
      <PackGrid class="emoji-pack-grid h-full w-[600px] shrink-0">
        <template #toolbar-actions>
          <div class="flex w-full items-center gap-2">
            <el-input
              v-model="packKeyword"
              clearable
              placeholder="搜索表情包名称或编码"
            />
            <el-button type="primary" @click="openPackFormModal()">
              添加
            </el-button>
          </div>
        </template>

        <template #packName="{ row }">
          <div
            :title="row.code ? `${row.name}（${row.code}）` : row.name"
            class="flex w-full items-center justify-center"
          >
            <el-text
              :type="currentPack?.id === row.id ? 'primary' : undefined"
              class="max-w-full truncate text-center font-medium"
            >
              {{ row.name }}
            </el-text>
          </div>
        </template>

        <template #packStatus="{ row }">
          <el-switch
            :active-value="true"
            :inactive-value="false"
            :loading="row.enableLoading"
            :model-value="row.isEnabled"
            @click.stop
            @change="togglePackEnableStatus(row)"
          />
        </template>

        <template #packActions="{ row }">
          <div class="my-1" @click.stop>
            <el-button link type="primary" @click="openPackFormModal(row)">
              编辑
            </el-button>
            <el-divider direction="vertical" />
            <el-button link type="danger" @click="confirmDeletePack(row)">
              删除
            </el-button>
          </div>
        </template>
      </PackGrid>

      <AssetGrid class="min-w-0 flex-1">
        <template #toolbar-actions>
          <div class="flex items-center gap-2">
            <el-tag v-if="currentPack" type="primary">
              {{ currentPack.name }}
            </el-tag>
            <el-text v-if="currentPack" type="info">
              {{ getEmojiPackLabel(packOptions, currentPack.id) }}
            </el-text>
            <el-button
              class="ml-2"
              type="primary"
              @click="openAssetFormModal()"
            >
              添加资源
            </el-button>
          </div>
        </template>

        <template #preview="{ row }">
          <el-image
            v-if="Number(row.kind) === 2 && (row.staticUrl || row.imageUrl)"
            :preview-src-list="[row.staticUrl || row.imageUrl || '']"
            :src="row.staticUrl || row.imageUrl || ''"
            class="size-8"
            fit="contain"
            preview-teleported
          />
          <div
            v-else
            class="inline-flex size-8 items-center justify-center rounded-md border border-dashed border-[var(--el-border-color)] text-lg"
          >
            {{ unicodeSequenceToEmoji(row.unicodeSequence) || '-' }}
          </div>
        </template>

        <template #isEnabled="{ row }">
          <el-switch
            :active-value="true"
            :inactive-value="false"
            :loading="row.enableLoading"
            :model-value="row.isEnabled"
            @change="toggleAssetEnableStatus(row)"
          />
        </template>

        <template #actions="{ row }">
          <div class="my-1">
            <el-button link type="primary" @click="openAssetFormModal(row)">
              编辑
            </el-button>
            <el-divider direction="vertical" />
            <el-button
              link
              type="danger"
              :disabled="row.isEnabled"
              @click="confirmDeleteAsset(row)"
            >
              删除
            </el-button>
          </div>
        </template>
      </AssetGrid>
    </div>

    <PackForm :schema="emojiPackFormSchema" :on-submit="handlePackSubmit" />
    <AssetForm :schema="emojiAssetFormSchema" :on-submit="handleAssetSubmit" />
  </Page>
</template>

<style scoped>
:deep(.emoji-pack-grid) {
  --vxe-ui-table-row-current-background-color: var(--el-color-primary-light-8);
  --vxe-ui-table-row-hover-current-background-color: var(
    --el-color-primary-light-7
  );
}

:deep(.emoji-pack-grid .vxe-body--row) {
  cursor: pointer;
}

:deep(.emoji-pack-grid .vxe-body--row.row--current > .vxe-body--column) {
  box-shadow:
    inset 0 1px 0 rgb(59 130 246 / 18%),
    inset 0 -1px 0 rgb(59 130 246 / 18%);
}

:deep(
  .emoji-pack-grid .vxe-body--row.row--current > .vxe-body--column:first-child
) {
  box-shadow:
    inset 4px 0 0 var(--el-color-primary),
    inset 0 1px 0 rgb(59 130 246 / 18%),
    inset 0 -1px 0 rgb(59 130 246 / 18%);
}
</style>
