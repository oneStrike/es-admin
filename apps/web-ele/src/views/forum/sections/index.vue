<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  BaseForumSectionGroupDto,
  CreateForumSectionDto,
  CreateForumSectionGroupDto,
  UpdateForumSectionDto,
  UpdateForumSectionGroupDto,
} from '#/apis/types';

import { Page, useVbenModal } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  sectionGroupsCreateApi,
  sectionGroupsDeleteApi,
  sectionGroupsDetailApi,
  sectionGroupsPageApi,
  sectionGroupsUpdateApi,
  sectionsCreateApi,
  sectionsDeleteApi,
  sectionsDetailApi,
  sectionsPageApi,
  sectionsUpdateApi,
  sectionsUpdateEnabledApi,
} from '#/apis';
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

import { getDetailCards } from './detail';
import { getDetailCards as getSectionGroupDetailCards } from './sectionGroupDetail';
import { formSchema as sectionGroupFormSchema } from './sectionGroupShared';
import { formSchema, sectionColumns, sectionFilter } from './shared';

// 当前板块分组
const currentSectionGroup = ref<BaseForumSectionGroupDto | null>(null);
// 板块列表
const sections = ref<BaseForumSectionGroupDto[]>([]);

const gridOptions: VxeGridProps<CreateForumSectionDto> = {
  columns: sectionColumns,
  height: '100%',
  proxyConfig: {
    autoLoad: false,
    ajax: {
      query: async ({ page }, formValues) => {
        return await sectionsPageApi({
          pageIndex: --page.currentPage,
          pageSize: page.pageSize,
          groupId: currentSectionGroup.value?.id,
          ...formValues,
        });
      },
    },
    sort: true,
  },
};
const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(sectionFilter),
  gridOptions,
});

async function loadSectionGroups() {
  const data = await sectionGroupsPageApi({ pageSize: 500 });
  if (!currentSectionGroup.value) {
    currentSectionGroup.value = data?.list?.[0] || null;
  }
  sections.value = data?.list || [];
  gridApi.reload();
}
loadSectionGroups();

const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [SectionGroupForm, sectionGroupFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

async function openFormModal(row?: CreateForumSectionDto, groupId?: string) {
  let record;
  if (row) {
    record = await sectionsDetailApi({ id: row.id });
  } else if (groupId) {
    record = { groupId };
  }
  formApi.setData({ title: '板块配置', record }).open();
}

async function openSectionGroupFormModal(row?: CreateForumSectionGroupDto) {
  let record;
  if (row) {
    record = await sectionGroupsDetailApi({ id: row.id });
  }
  sectionGroupFormApi.setData({ title: '板块组配置', record }).open();
}

async function handleSubmit(
  values: CreateForumSectionDto | UpdateForumSectionDto,
) {
  values.groupId = currentSectionGroup.value?.id;
  await (values?.id
    ? sectionsUpdateApi(values as UpdateForumSectionDto)
    : sectionsCreateApi(values as CreateForumSectionDto));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function handleSectionGroupSubmit(
  values: CreateForumSectionGroupDto | UpdateForumSectionGroupDto,
) {
  await (values?.id
    ? sectionGroupsUpdateApi(values as UpdateForumSectionGroupDto)
    : sectionGroupsCreateApi(values as CreateForumSectionGroupDto));
  sectionGroupFormApi.close();
  useMessage.success('操作成功');
  await loadSectionGroups();
}

async function deleteSection(record: CreateForumSectionDto) {
  await sectionsDeleteApi({ id: record.id });
  useMessage.success('操作成功');
  gridApi.reload();
}

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
});

const [SectionGroupDetailModal, sectionGroupDetailApi] = useVbenModal({
  connectedComponent: EsRecordDetail,
});

async function toggleEnableStatus(record: CreateForumSectionDto) {
  record.loading = true;
  await sectionsUpdateEnabledApi({
    id: record.id,
    isEnabled: record.isEnabled,
  });
  record.loading = false;
  useMessage.success('操作成功');
  gridApi.reload();
}

function handleNodeClick(node: BaseForumSectionGroupDto) {
  currentSectionGroup.value = node;
  gridApi.reload();
}

async function deleteSectionGroup(record: CreateForumSectionGroupDto) {
  await sectionGroupsDeleteApi({ id: record.id });
  useMessage.success('操作成功');
  await loadSectionGroups();
}
</script>

<template>
  <Page auto-content-height>
    <div class="flex h-full">
      <div class="mr-4 h-full w-[260px] min-w-[260px]">
        <div class="h-full rounded-md bg-white p-3">
          <div class="mb-2 flex items-center justify-between">
            <el-input class="mr-4" placeholder="输入关键词" />
            <PlusCircleIcon
              class="hover:text-primary cursor-pointer text-2xl"
              @click="openSectionGroupFormModal()"
            />
          </div>
          <el-tree
            :data="sections"
            node-key="id"
            highlight-current
            check-on-click-node
            :props="{ label: 'name' }"
            :current-node-key="currentSectionGroup?.id"
            @node-click="handleNodeClick"
          >
            <template #default="{ node, data }">
              <div class="flex w-full items-center justify-between">
                <span>{{ node.label }}</span>
                <el-space>
                  <AlertCircleIcon
                    class="hover:text-primary cursor-pointer text-base"
                    @click.stop="
                      sectionGroupDetailApi
                        .setData({ recordId: data.id })
                        .open()
                    "
                  />
                  <EditIcon
                    class="hover:text-primary cursor-pointer text-base"
                    @click.stop="openSectionGroupFormModal(data)"
                  />
                  <PlusIcon
                    class="hover:text-primary cursor-pointer text-base"
                    @click.stop="openFormModal(undefined, data.id)"
                  />
                  <el-popconfirm
                    title="确认删除当前项?"
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    @confirm="deleteSectionGroup(data)"
                  >
                    <template #reference>
                      <DeleteBinIcon
                        @click.stop
                        class="cursor-pointer text-base hover:text-red-600"
                      />
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
        </template>

        <template #isEnabled="{ row }">
          <el-switch
            :active-value="true"
            :inactive-value="row.isEnabled"
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
      title="板块详情"
      :api="sectionsDetailApi"
      :cards="getDetailCards"
      class="!w-[800px]"
    />

    <SectionGroupForm
      :schema="sectionGroupFormSchema"
      :on-submit="handleSectionGroupSubmit"
    />

    <SectionGroupDetailModal
      title="板块组详情"
      :api="sectionGroupsDetailApi"
      :cards="getSectionGroupDetailCards"
      class="!w-[800px]"
    />
  </Page>
</template>

<style scoped></style>
