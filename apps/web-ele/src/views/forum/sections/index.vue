<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  BaseForumSectionDto,
  BaseForumSectionGroupDto,
  ForumSectionGroupsCreateRequest,
  ForumSectionGroupsUpdateRequest,
  ForumSectionsCreateRequest,
  ForumSectionsUpdateRequest,
} from '#/api/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  forumSectionGroupsCreateApi,
  forumSectionGroupsDeleteApi,
  forumSectionGroupsDetailApi,
  forumSectionGroupsSwapSortOrderApi,
  forumSectionGroupsUpdateApi,
  forumSectionGroupsUpdateEnabledApi,
  forumSectionsCreateApi,
  forumSectionsDeleteApi,
  forumSectionsDetailApi,
  forumSectionsPageApi,
  forumSectionsRebuildFollowCountAllApi,
  forumSectionsRebuildFollowCountApi,
  forumSectionsSwapSortOrderApi,
  forumSectionsTreeApi,
  forumSectionsUpdateApi,
  forumSectionsUpdateEnabledApi,
} from '#/api/core';
import {
  AlertCircleIcon,
  DeleteBinIcon,
  EditIcon,
  PlusCircleIcon,
  PlusIcon,
} from '#/components/es-icons';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import { getDetailCards } from './modules/model/detail';
import { getDetailCards as getSectionGroupDetailCards } from './modules/model/sectionGroupDetail';
import { formSchema as sectionGroupFormSchema } from './modules/model/sectionGroupShared';
import {
  formSchema,
  sectionColumns,
  sectionFilter,
} from './modules/model/shared';

type SectionGroupNode = Partial<BaseForumSectionGroupDto> & {
  id?: number;
  isEnabled?: boolean;
  isUngrouped: boolean;
  loading?: boolean;
  name: string;
  sectionCount: number;
  treeKey: string;
};

type ForumSectionRow = BaseForumSectionDto & {
  rebuildLoading?: boolean;
};

// 当前板块分组
const currentSectionGroup = ref<null | SectionGroupNode>(null);
// 板块列表
const sections = ref<SectionGroupNode[]>([]);
// 搜索关键词
const searchKeyword = ref('');

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
        if (currentSectionGroup.value?.isUngrouped) {
          formValues.isUngrouped = true;
          formValues.groupId = undefined;
        } else {
          formValues.groupId = currentSectionGroup.value?.id;
          formValues.isUngrouped = undefined;
        }
        return await forumSectionsPageApi(
          formatQuery({
            page,
            sorts,
            formValues,
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
  await gridApi.reload();
}

function getCurrentGroupId() {
  if (currentSectionGroup.value?.isUngrouped) {
    return undefined;
  }
  return currentSectionGroup.value?.id;
}
loadSectionGroups();

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
  values: ForumSectionsCreateRequest | ForumSectionsUpdateRequest,
) {
  await (isSectionUpdate(values)
    ? forumSectionsUpdateApi(buildSectionUpdatePayload(values))
    : forumSectionsCreateApi(buildSectionCreatePayload(values)));
  formApi.close();
  useMessage.success('操作成功');
  await loadSectionGroups();
}

function isSectionUpdate(
  values: ForumSectionsCreateRequest | ForumSectionsUpdateRequest,
): values is ForumSectionsUpdateRequest {
  return 'id' in values && Boolean(values.id);
}

function resolveSectionGroupId(
  values: Pick<ForumSectionsCreateRequest, 'groupId'>,
) {
  return values.groupId ?? getCurrentGroupId();
}

function buildSectionCreatePayload(
  values: ForumSectionsCreateRequest,
): ForumSectionsCreateRequest {
  return {
    cover: values.cover,
    description: values.description,
    groupId: resolveSectionGroupId(values),
    icon: values.icon,
    isEnabled: values.isEnabled,
    name: values.name,
    remark: values.remark,
    sortOrder: values.sortOrder,
    topicReviewPolicy: values.topicReviewPolicy,
    userLevelRuleId: values.userLevelRuleId,
  };
}

function buildSectionUpdatePayload(
  values: ForumSectionsUpdateRequest,
): ForumSectionsUpdateRequest {
  return {
    cover: values.cover,
    description: values.description,
    groupId: resolveSectionGroupId(values),
    icon: values.icon,
    id: values.id,
    isEnabled: values.isEnabled,
    name: values.name,
    remark: values.remark,
    sortOrder: values.sortOrder,
    topicReviewPolicy: values.topicReviewPolicy,
    userLevelRuleId: values.userLevelRuleId,
  };
}

async function handleSectionGroupSubmit(
  values: ForumSectionGroupsCreateRequest | ForumSectionGroupsUpdateRequest,
) {
  await (values?.id
    ? forumSectionGroupsUpdateApi(values as ForumSectionGroupsUpdateRequest)
    : forumSectionGroupsCreateApi(values as ForumSectionGroupsCreateRequest));
  sectionGroupFormApi.close();
  useMessage.success('操作成功');
  await loadSectionGroups();
}

async function deleteSection(record: BaseForumSectionDto) {
  await forumSectionsDeleteApi({ id: record.id });
  useMessage.success('操作成功');
  await loadSectionGroups();
}

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
  title: '板块详情',
});

const [SectionGroupDetailModal, sectionGroupDetailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
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

function handleNodeClick(node: SectionGroupNode) {
  currentSectionGroup.value = node;
  gridApi.reload();
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

function allowDrop(dragNode: any, dropNode: any, type: string) {
  if (dragNode.data?.isUngrouped || dropNode.data?.isUngrouped) {
    return false;
  }

  return type !== 'inner';
}

async function handleSectionGroupDrop(dragNode: any, dropNode: any) {
  if (dragNode.data?.isUngrouped || dropNode.data?.isUngrouped) {
    return;
  }

  await forumSectionGroupsSwapSortOrderApi({
    dragId: dragNode.data.id,
    targetId: dropNode.data.id,
  });
  useMessage.success('排序成功');
  await loadSectionGroups();
}

async function toggleSectionGroupEnableStatus(record: SectionGroupNode) {
  if (!record.id) return;

  record.loading = true;
  try {
    await forumSectionGroupsUpdateEnabledApi({
      id: record.id,
      isEnabled: !record.isEnabled,
    });
    useMessage.success('操作成功');
    await loadSectionGroups();
  } finally {
    record.loading = false;
  }
}

async function rebuildSectionFollowCount(record: ForumSectionRow) {
  record.rebuildLoading = true;
  try {
    const result = await forumSectionsRebuildFollowCountApi({ id: record.id });
    useMessage.success(`关注数已重建：${result.followersCount}`);
    await gridApi.reload();
  } finally {
    record.rebuildLoading = false;
  }
}

async function rebuildAllSectionFollowCount() {
  await forumSectionsRebuildFollowCountAllApi();
  useMessage.success('已提交全量重建关注数');
  await gridApi.reload();
}
</script>

<template>
  <Page auto-content-height>
    <div class="flex h-full">
      <div class="mr-4 h-full w-[260px] min-w-[260px]">
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
            node-key="id"
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
                  <el-switch
                    v-if="!data.isUngrouped"
                    :active-value="true"
                    :inactive-value="false"
                    :loading="data.loading"
                    :model-value="data.isEnabled"
                    size="small"
                    @click.stop
                    @change="toggleSectionGroupEnableStatus(data)"
                  />
                  <el-tooltip
                    v-if="!data.isUngrouped"
                    content="查看详情"
                    placement="top"
                    :show-after="300"
                  >
                    <div
                      @click.stop="
                        sectionGroupDetailApi
                          .setData({ recordId: data.id })
                          .open()
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
                  <el-popconfirm
                    v-if="!data.isUngrouped"
                    title="确认删除当前项?"
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    @confirm="deleteSectionGroup(data)"
                  >
                    <template #reference>
                      <div @click.stop>
                        <el-tooltip
                          content="删除"
                          placement="top"
                          :show-after="300"
                        >
                          <DeleteBinIcon
                            class="cursor-pointer text-base hover:text-red-600"
                          />
                        </el-tooltip>
                      </div>
                    </template>
                  </el-popconfirm>
                </el-space>
              </div>
            </template>
          </el-tree>
        </div>
      </div>
      <Grid class="w-[calc(100%-260px)]">
        <template #toolbar-actions>
          <el-button class="ml-2" type="primary" @click="openFormModal()">
            添加
          </el-button>
          <el-popconfirm
            title="确认全量重建所有板块关注数?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="rebuildAllSectionFollowCount"
          >
            <template #reference>
              <el-button class="ml-2">全量重建关注数</el-button>
            </template>
          </el-popconfirm>
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
              :loading="row.rebuildLoading"
              type="primary"
              @click="rebuildSectionFollowCount(row)"
            >
              重建关注数
            </el-button>
            <el-divider direction="vertical" />
            <el-popconfirm
              title="确认删除当前项?"
              confirm-button-text="确认"
              cancel-button-text="取消"
              @confirm="deleteSection(row)"
            >
              <template #reference>
                <el-button link type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </Grid>
    </div>

    <Form :schema="formSchema" :on-submit="handleSubmit" />

    <DetailModal
      :api="forumSectionsDetailApi"
      :cards="getDetailCards"
      class="!w-[800px]"
    />

    <SectionGroupForm
      :schema="sectionGroupFormSchema"
      :on-submit="handleSectionGroupSubmit"
    />

    <SectionGroupDetailModal
      :api="forumSectionGroupsDetailApi"
      :cards="getSectionGroupDetailCards"
      class="!w-[800px]"
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
