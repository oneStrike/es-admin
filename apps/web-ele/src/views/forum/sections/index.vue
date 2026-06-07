<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';
import type { BasicOption } from '@vben/types';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  BaseForumSectionDto,
  BaseForumSectionGroupDto,
  ForumSectionGroupsCreateRequest,
  ForumSectionGroupsUpdateRequest,
  ForumSectionsCreateRequest,
  ForumSectionsDetailResponse,
  ForumSectionsUpdateRequest,
} from '#/api/types';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  forumSectionGroupsCreateApi,
  forumSectionGroupsDeleteApi,
  forumSectionGroupsDetailApi,
  forumSectionGroupsSwapSortOrderApi,
  forumSectionGroupsUpdateApi,
  forumSectionsCreateApi,
  forumSectionsDeleteApi,
  forumSectionsDetailApi,
  forumSectionsPageApi,
  forumSectionsRebuildCountsAllApi,
  forumSectionsRebuildCountsApi,
  forumSectionsSwapSortOrderApi,
  forumSectionsTreeApi,
  forumSectionsUpdateApi,
  forumSectionsUpdateEnabledApi,
  growthLevelRulesPageApi,
} from '#/api/core';
import {
  AlertCircleIcon,
  DeleteBinIcon,
  EditIcon,
  PlusCircleIcon,
  PlusIcon,
} from '#/components/es-icons';
import EsModalForm from '#/components/es-modal-form/index.vue';
import RecordDetailModal from '#/components/record-detail-modal';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { useForm } from '#/hooks/useForm';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailSections } from './modules/model/detail';
import { getDetailSections as getSectionGroupDetailSections } from './modules/model/sectionGroupDetail';
import { formSchema as sectionGroupFormSchema } from './modules/model/sectionGroupShared';
import {
  formSchema,
  sectionColumns,
  sectionFilter,
  UNGROUPED_SECTION_GROUP_VALUE,
} from './modules/model/shared';

type SectionGroupSelectValue =
  | number
  | typeof UNGROUPED_SECTION_GROUP_VALUE
  | undefined;

type SectionFormValues = Omit<ForumSectionsCreateRequest, 'groupId'> & {
  groupId?: null | SectionGroupSelectValue;
};

type SectionUpdateFormValues = Omit<ForumSectionsUpdateRequest, 'groupId'> & {
  groupId?: null | SectionGroupSelectValue;
};

type SectionSearchValues = Record<string, unknown> & {
  groupId?: SectionGroupSelectValue;
  isUngrouped?: boolean;
};

type SectionGroupNode = Partial<BaseForumSectionGroupDto> & {
  id?: number;
  isEnabled?: boolean;
  isUngrouped: boolean;
  name: string;
  sectionCount: number;
  treeKey: string;
};

type ForumSectionRow = BaseForumSectionDto & {
  rebuildLoading?: boolean;
};

type SectionGroupTreeNode = {
  data?: Partial<SectionGroupNode>;
};

// 当前板块分组
const currentSectionGroup = ref<null | SectionGroupNode>(null);
// 板块列表
const sections = ref<SectionGroupNode[]>([]);
// 搜索关键词
const searchKeyword = ref('');
const levelOptions = ref<BasicOption[]>([]);
const groupOptions = ref<BasicOption[]>([]);

// 过滤后的板块组列表
const filteredSections = computed(() => {
  if (!searchKeyword.value) {
    return sections.value;
  }
  return sections.value.filter((item) =>
    item.name?.toLowerCase().includes(searchKeyword.value.toLowerCase()),
  );
});

const gridOptions: VxeGridProps<ForumSectionRow> = {
  columns: sectionColumns,
  height: '100%',
  proxyConfig: {
    autoLoad: false,
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const normalizedFormValues = normalizeSectionSearchValues(formValues);
        return await forumSectionsPageApi(
          formatQuery({
            page,
            sorts,
            formValues: normalizedFormValues,
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
      if (!params.dragRow?.id || !params.newRow?.id) {
        return true;
      }
      if (params.dragRow.id === params.newRow.id) {
        return true;
      }
      await forumSectionsSwapSortOrderApi({
        dragId: params.dragRow.id,
        targetId: params.newRow.id,
      });
      useMessage.success('排序成功');
      await gridApi.reload();
      return true;
    },
  },
};
const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(sectionFilter),
  gridOptions,
});

async function loadSectionGroups() {
  const data = await forumSectionsTreeApi();
  const nodes = (data || []).map<SectionGroupNode>((item) => {
    if (item.isUngrouped || !item.group) {
      return {
        isEnabled: true,
        isUngrouped: true,
        name: '未分组',
        sectionCount: item.sections?.length ?? 0,
        treeKey: 'ungrouped',
      };
    }

    return {
      ...item.group,
      isUngrouped: false,
      sectionCount: item.sections?.length ?? 0,
      treeKey: `group-${item.group.id}`,
    };
  });

  const currentKey = currentSectionGroup.value?.treeKey;
  const nextCurrent = currentKey
    ? nodes.find((item) => item.treeKey === currentKey)
    : nodes[0];

  currentSectionGroup.value = nextCurrent || nodes[0] || null;
  sections.value = nodes;
  groupOptions.value = buildSectionGroupOptions(nodes);
  useForm.setOptions(formSchema, {
    groupId: groupOptions.value,
  });
  useForm.setOptions(sectionFilter, {
    groupId: groupOptions.value,
  });
  gridApi.setState((prev) => ({
    formOptions: {
      ...prev.formOptions,
      schema: [...sectionFilter],
    },
  }));
  await syncCurrentGroupToSearch();
  await gridApi.reload();
}

function buildSectionGroupOptions(nodes: SectionGroupNode[]): BasicOption[] {
  return nodes
    .map((item) => ({
      label: item.name,
      value: item.isUngrouped ? UNGROUPED_SECTION_GROUP_VALUE : item.id,
    }))
    .filter((item): item is BasicOption => item.value !== undefined);
}

function getCurrentGroupSelectValue(): SectionGroupSelectValue {
  if (!currentSectionGroup.value) {
    return undefined;
  }
  return currentSectionGroup.value.isUngrouped
    ? UNGROUPED_SECTION_GROUP_VALUE
    : currentSectionGroup.value.id;
}

function normalizeSectionGroupId(
  value: null | SectionGroupSelectValue,
): null | number | undefined {
  if (value === UNGROUPED_SECTION_GROUP_VALUE) {
    return null;
  }
  return value ?? undefined;
}

function normalizeSectionSearchValues(formValues: SectionSearchValues) {
  const { groupId, isUngrouped: _isUngrouped, ...rest } = formValues;
  if (groupId === UNGROUPED_SECTION_GROUP_VALUE) {
    return {
      ...rest,
      groupId: undefined,
      isUngrouped: true,
    };
  }

  return {
    ...rest,
    groupId,
    isUngrouped: undefined,
  };
}

async function syncCurrentGroupToSearch() {
  await gridApi.formApi.setValues({
    groupId: getCurrentGroupSelectValue(),
  });
}
loadSectionGroups();

async function loadLevelOptions() {
  try {
    const data = await growthLevelRulesPageApi({
      business: 'forum',
      isEnabled: true,
      pageSize: 500,
    });
    levelOptions.value =
      data?.list?.map((item) => ({
        label: item.name,
        value: item.id,
      })) || [];
    useForm.setOptions(formSchema, {
      groupId: groupOptions.value,
      userLevelRuleId: levelOptions.value,
    });
  } catch {
    // 全局请求拦截器会展示接口错误提示。
  }
}
loadLevelOptions();

const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [SectionGroupForm, sectionGroupFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

async function openFormModal(row?: BaseForumSectionDto, groupId?: number) {
  let record;
  if (row) {
    record = await forumSectionsDetailApi({ id: row.id });
  } else if (groupId) {
    record = { groupId };
  } else {
    record = { groupId: normalizeSectionGroupId(getCurrentGroupSelectValue()) };
  }
  formApi.setData({ title: '板块', record }).open();
}

async function openSectionGroupFormModal(row?: BaseForumSectionGroupDto) {
  let record;
  if (row) {
    record = await forumSectionGroupsDetailApi({ id: row.id });
  }
  sectionGroupFormApi.setData({ title: '板块组', record }).open();
}

async function handleSubmit(
  values: SectionFormValues | SectionUpdateFormValues,
) {
  await (isSectionUpdate(values)
    ? forumSectionsUpdateApi(buildSectionUpdatePayload(values))
    : forumSectionsCreateApi(buildSectionCreatePayload(values)));
  formApi.close();
  useMessage.success('操作成功');
  await loadSectionGroups();
}

function isSectionUpdate(
  values: SectionFormValues | SectionUpdateFormValues,
): values is SectionUpdateFormValues {
  return 'id' in values && Boolean(values.id);
}

function buildSectionCreatePayload(
  values: SectionFormValues,
): ForumSectionsCreateRequest {
  return {
    cover: values.cover,
    description: values.description,
    groupId: normalizeSectionGroupId(values.groupId),
    icon: values.icon,
    isEnabled: values.isEnabled,
    name: values.name,
    remark: values.remark ?? null,
    sortOrder: values.sortOrder,
    topicReviewPolicy: values.topicReviewPolicy,
    userLevelRuleId: values.userLevelRuleId ?? null,
  };
}

function buildSectionUpdatePayload(
  values: SectionUpdateFormValues,
): ForumSectionsUpdateRequest {
  return {
    cover: values.cover,
    description: values.description,
    groupId: normalizeSectionGroupId(values.groupId),
    icon: values.icon,
    id: values.id,
    isEnabled: values.isEnabled,
    name: values.name,
    remark: values.remark ?? null,
    sortOrder: values.sortOrder,
    topicReviewPolicy: values.topicReviewPolicy,
    userLevelRuleId: values.userLevelRuleId ?? null,
  };
}

async function handleSectionGroupSubmit(
  values: ForumSectionGroupsCreateRequest | ForumSectionGroupsUpdateRequest,
) {
  const payload = buildSectionGroupPayload(values);

  await ('id' in payload && typeof payload.id === 'number'
    ? forumSectionGroupsUpdateApi(payload as ForumSectionGroupsUpdateRequest)
    : forumSectionGroupsCreateApi(payload as ForumSectionGroupsCreateRequest));
  sectionGroupFormApi.close();
  useMessage.success('操作成功');
  await loadSectionGroups();
}

function buildSectionGroupPayload(
  values: ForumSectionGroupsCreateRequest | ForumSectionGroupsUpdateRequest,
): ForumSectionGroupsCreateRequest | ForumSectionGroupsUpdateRequest {
  const payload = {
    name: values.name,
    isEnabled: values.isEnabled,
    sortOrder: values.sortOrder,
    maxModerators: values.maxModerators,
    description: values.description,
  };

  return 'id' in values && typeof values.id === 'number'
    ? ({ id: values.id, ...payload } as ForumSectionGroupsUpdateRequest)
    : (payload as ForumSectionGroupsCreateRequest);
}

async function deleteSection(record: BaseForumSectionDto) {
  await forumSectionsDeleteApi({ id: record.id });
  useMessage.success('操作成功');
  await loadSectionGroups();
}

async function confirmDeleteSection(record: BaseForumSectionDto) {
  const confirmed = await useConfirm({
    content: '确认删除当前项?',
    successMessage: false,
  });
  if (!confirmed) return;

  await deleteSection(record);
}

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: RecordDetailModal,
  title: '板块详情',
});

const [SectionGroupDetailModal, sectionGroupDetailApi] = useVbenModal({
  connectedComponent: RecordDetailModal,
  title: '板块组详情',
});

async function toggleEnableStatus(record: BaseForumSectionDto) {
  record.loading = true;
  try {
    await forumSectionsUpdateEnabledApi({
      id: record.id,
      isEnabled: !record.isEnabled,
    });
    useMessage.success('操作成功');
    await gridApi.reload();
  } finally {
    record.loading = false;
  }
}

async function handleNodeClick(node: SectionGroupNode) {
  currentSectionGroup.value = node;
  await syncCurrentGroupToSearch();
  await gridApi.reload();
}

async function deleteSectionGroup(record: SectionGroupNode) {
  if (!record.id) return;

  await forumSectionGroupsDeleteApi({ id: record.id });
  useMessage.success('操作成功');

  // 如果删除的是当前选中的板块分组，需要重置当前选中的分组
  if (currentSectionGroup.value?.id === record.id) {
    currentSectionGroup.value = null;
  }

  await loadSectionGroups();
}

async function confirmDeleteSectionGroup(record: SectionGroupNode) {
  const confirmed = await useConfirm({
    content: '确认删除当前项?',
    successMessage: false,
  });
  if (!confirmed) return;

  await deleteSectionGroup(record);
}

function allowDrop(
  dragNode: SectionGroupTreeNode,
  dropNode: SectionGroupTreeNode,
  type: string,
) {
  if (dragNode.data?.isUngrouped || dropNode.data?.isUngrouped) {
    return false;
  }

  return type !== 'inner';
}

async function handleSectionGroupDrop(
  dragNode: SectionGroupTreeNode,
  dropNode: SectionGroupTreeNode,
) {
  if (dragNode.data?.isUngrouped || dropNode.data?.isUngrouped) {
    return;
  }

  if (!dragNode.data?.id || !dropNode.data?.id) {
    return;
  }

  await forumSectionGroupsSwapSortOrderApi({
    dragId: dragNode.data.id,
    targetId: dropNode.data.id,
  });
  useMessage.success('排序成功');
  await loadSectionGroups();
}

async function rebuildSectionCounts(record: ForumSectionRow) {
  record.rebuildLoading = true;
  try {
    const result = await forumSectionsRebuildCountsApi({ id: record.id });
    useMessage.success(
      `计数已重建：主题 ${result.topicCount}，评论 ${result.commentCount}，关注 ${result.followersCount}`,
    );
    await gridApi.reload();
  } finally {
    record.rebuildLoading = false;
  }
}

async function rebuildAllSectionCounts() {
  await forumSectionsRebuildCountsAllApi();
  useMessage.success('全量板块计数已重建');
  await gridApi.reload();
}

async function confirmRebuildAllSectionCounts() {
  const confirmed = await useConfirm({
    content: '确认全量重建所有板块计数?',
    successMessage: false,
  });
  if (!confirmed) return;

  await rebuildAllSectionCounts();
}

function getSectionDetailSections(detail: ForumSectionsDetailResponse) {
  return getDetailSections(detail, levelOptions.value);
}

function getSectionActions(row: ForumSectionRow): ActionItem[] {
  return [
    {
      key: 'detail',
      onClick: () => detailApi.setData({ id: row.id }).open(),
      text: '详情',
    },
    {
      key: 'edit',
      onClick: () => openFormModal(row),
      text: '编辑',
    },
    {
      key: 'rebuildCounts',
      loading: row.rebuildLoading,
      onClick: () => rebuildSectionCounts(row),
      text: '重建计数',
    },
    {
      danger: true,
      key: 'delete',
      onClick: () => confirmDeleteSection(row),
      text: '删除',
    },
  ];
}
</script>

<template>
  <Page auto-content-height>
    <div class="flex h-full">
      <div class="mr-4 h-full w-[360px] min-w-[360px]">
        <div class="h-full rounded-md bg-white p-3">
          <div class="mb-2 flex items-center justify-between">
            <el-input
              v-model="searchKeyword"
              class="mr-4"
              placeholder="输入关键词"
              clearable
            />
            <el-tooltip content="添加分组" placement="top" :show-after="300">
              <PlusCircleIcon
                class="cursor-pointer text-2xl hover:text-primary"
                @click="openSectionGroupFormModal()"
              />
            </el-tooltip>
          </div>
          <el-tree
            :data="filteredSections"
            class="forum-section-group-tree"
            node-key="treeKey"
            highlight-current
            check-on-click-node
            draggable
            :allow-drop="allowDrop"
            :props="{ label: 'name' }"
            :current-node-key="currentSectionGroup?.treeKey"
            @node-click="handleNodeClick"
            @node-drop="handleSectionGroupDrop"
          >
            <template #default="{ node, data }">
              <div class="flex w-full items-center justify-between gap-2">
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-1">
                    <span class="truncate">{{ node.label }}</span>
                    <el-tag size="small" type="info">
                      {{ data.sectionCount }}
                    </el-tag>
                  </div>
                </div>
                <el-space>
                  <el-tooltip
                    v-if="!data.isUngrouped"
                    content="查看详情"
                    placement="top"
                    :show-after="300"
                  >
                    <div
                      @click.stop="
                        sectionGroupDetailApi.setData({ id: data.id }).open()
                      "
                    >
                      <AlertCircleIcon
                        class="cursor-pointer text-base hover:text-primary"
                      />
                    </div>
                  </el-tooltip>
                  <el-tooltip
                    v-if="!data.isUngrouped"
                    content="编辑"
                    placement="top"
                    :show-after="300"
                  >
                    <div @click.stop="openSectionGroupFormModal(data)">
                      <EditIcon
                        class="cursor-pointer text-base hover:text-primary"
                      />
                    </div>
                  </el-tooltip>
                  <el-tooltip
                    content="添加板块"
                    placement="top"
                    :show-after="300"
                  >
                    <div
                      @click.stop="
                        openFormModal(
                          undefined,
                          data.isUngrouped ? undefined : data.id,
                        )
                      "
                    >
                      <PlusIcon
                        class="cursor-pointer text-base hover:text-primary"
                      />
                    </div>
                  </el-tooltip>
                  <el-tooltip
                    v-if="!data.isUngrouped"
                    content="删除"
                    placement="top"
                    :show-after="300"
                  >
                    <div @click.stop="confirmDeleteSectionGroup(data)">
                      <DeleteBinIcon
                        class="cursor-pointer text-base hover:text-red-600"
                      />
                    </div>
                  </el-tooltip>
                </el-space>
              </div>
            </template>
          </el-tree>
        </div>
      </div>
      <Grid class="w-[calc(100%-376px)]">
        <template #toolbar-actions>
          <el-button class="ml-2" type="primary" @click="openFormModal()">
            添加
          </el-button>
          <el-button class="ml-2" @click="confirmRebuildAllSectionCounts">
            全量重建计数
          </el-button>
        </template>

        <template #isEnabled="{ row }">
          <el-switch
            :active-value="true"
            :inactive-value="false"
            :loading="row.loading"
            :model-value="row.isEnabled"
            @change="toggleEnableStatus(row)"
          />
        </template>
        <template #actions="{ row }">
          <VbenTableAction align="center" :actions="getSectionActions(row)" />
        </template>
      </Grid>
    </div>

    <Form :schema="formSchema" :on-submit="handleSubmit" />

    <DetailModal
      :api="forumSectionsDetailApi"
      :sections="getSectionDetailSections"
      class="w-[800px]"
    />

    <SectionGroupForm
      :schema="sectionGroupFormSchema"
      :on-submit="handleSectionGroupSubmit"
    />

    <SectionGroupDetailModal
      :api="forumSectionGroupsDetailApi"
      :sections="getSectionGroupDetailSections"
      class="w-[800px]"
    />
  </Page>
</template>

<style>
.forum-section-group-tree .el-tree-node.is-current > .el-tree-node__content {
  font-weight: 600;
  color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-9);
}

.forum-section-group-tree
  .el-tree-node.is-current
  > .el-tree-node__content:hover {
  background-color: var(--el-color-primary-light-8);
}
</style>
