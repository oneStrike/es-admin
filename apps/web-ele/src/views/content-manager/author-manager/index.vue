<script setup lang="ts">
import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type {
  AuthorPageResponseDto,
  CreateAuthorDto,
  UpdateAuthorDto,
} from '#/apis/types/author';
import type { BaseAuthorRoleTypeDto } from '#/apis/types/authorRoleType';
import type { UseDictItem } from '#/hooks/useDict';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  authorCreateApi,
  authorDeleteApi,
  authorDetailApi,
  authorPageApi,
  authorRoleTypeListApi,
  authorUpdateApi,
  authorUpdateFeaturedApi,
  authorUpdateStatusApi,
} from '#/apis';
import EsModalForm from '#/components/es-modal-form/index.vue';
import { useDict } from '#/hooks/useDict';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils';

import AuthorRole from './role.vue';
import { authorColumns, authorSearchSchema, formSchema } from './shared';

type AuthorRoleType = Record<
  BaseAuthorRoleTypeDto['code'],
  BaseAuthorRoleTypeDto['name']
>;

/**
 * 通用的成功处理：提示 + 刷新（遵循DRY原则封装重复逻辑）
 */
function handleSuccessReload(gridApi: any, message = '操作成功'): void {
  useMessage.success(message);
  gridApi.reload();
}

const nationalityDict = ref<UseDictItem>();
const authorRole = ref<AuthorRoleType>();
async function getFormOptions() {
  const [{ nationality }, roleListData] = await Promise.all([
    useDict('nationality'),
    authorRoleTypeListApi(),
  ]);
  nationalityDict.value = nationality;
  authorRole.value =
    roleListData?.reduce((acc, cur) => {
      acc[cur.code] = cur.name;
      return acc;
    }, {} as AuthorRoleType) || {};
}

getFormOptions();

/**
 * VxeGrid 的选项配置
 */
const gridOptions: VxeGridProps<AuthorPageResponseDto> = {
  columns: authorColumns,
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await authorPageApi(formatQuery({ page, formValues, sorts }));
      },
    },
    sort: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
  formOptions: createSearchFormOptions(authorSearchSchema, {
    showCollapseButton: false,
  }),
});

/**
 * 新建/编辑弹窗
 */
const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

/**
 * 角色管理弹窗
 */
const [RoleModal, roleModalApi] = useVbenModal({
  connectedComponent: AuthorRole,
});

/**
 * 将角色名称数组转换为位运算值
 */
function rolesToBitmask(roles?: number[]): number {
  if (!roles || roles.length === 0) return 0;
  return roles.reduce((acc, role) => acc | role, 0);
}

/**
 * 将位运算值转换为角色数组
 */
function bitmaskToRoles(bitmask?: number): number[] {
  if (!bitmask) return [];
  const roleValues = [1, 2, 4, 8];
  return roleValues.filter((role) => bitmask & role);
}

/**
 * 打开表单弹窗
 */
async function openFormModal(row?: AuthorPageResponseDto): Promise<void> {
  let record: any;
  if (row) {
    record = await authorDetailApi({ id: row.id });
    // 将位运算值转换为数组供复选框使用
    record.roles = bitmaskToRoles(record.roles);
  }
  formApi
    .setData({
      title: '作者',
      record,
      schema: formSchema,
    })
    .open();
}

/**
 * 打开角色管理弹窗
 */
function openRoleModal(): void {
  roleModalApi
    .setData({
      title: '作者角色管理',
    })
    .open();
}

/**
 * 切换启用状态
 */
async function toggleEnableStatus(row: AuthorPageResponseDto): Promise<void> {
  row.loading = true as any;
  await authorUpdateStatusApi({
    id: row.id,
    isEnabled: !row.isEnabled,
  });
  handleSuccessReload(gridApi);
  row.loading = false as any;
}

/**
 * 切换推荐状态
 */
async function toggleFeaturedStatus(row: AuthorPageResponseDto): Promise<void> {
  row.loading = true as any;
  await authorUpdateFeaturedApi({
    id: row.id,
    featured: !row.featured,
  });
  handleSuccessReload(gridApi);
  row.loading = false as any;
}

/**
 * 新增或更新作者
 */
type AuthorFormValues = CreateAuthorDto | UpdateAuthorDto;

async function addOrUpdateAuthor(values: AuthorFormValues): Promise<void> {
  // 将角色数组转换为位运算值
  if (Array.isArray(values.roles)) {
    values.roles = rolesToBitmask(values.roles);
  }

  await (values.id
    ? authorUpdateApi(values as UpdateAuthorDto)
    : authorCreateApi(values as CreateAuthorDto));
  useMessage.success('操作成功');
  await gridApi.reload();
}

/**
 * 删除作者
 */
async function deleteAuthor(row: AuthorPageResponseDto): Promise<void> {
  await authorDeleteApi({
    id: row.id,
  });
  handleSuccessReload(gridApi);
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <el-button class="ml-2" type="primary" @click="openRoleModal()">
          角色管理
        </el-button>
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

      <template #featured="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="row.featured"
          :loading="row.loading"
          :model-value="row.featured"
          @change="toggleFeaturedStatus(row)"
        />
      </template>

      <template #actions="{ row }">
        <el-button link type="primary" @click="openFormModal(row)">
          编辑
        </el-button>
        <el-divider direction="vertical" />
        <el-popconfirm
          title="确认删除当前项?"
          confirm-button-text="确认"
          cancel-button-text="取消"
          @confirm="deleteAuthor(row)"
        >
          <template #reference>
            <el-button link type="danger" :disabled="row.isEnabled">
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </Grid>

    <!-- 复用模块化的表单 schema -->
    <Form :schema="formSchema" :on-submit="addOrUpdateAuthor" />

    <!-- 角色管理弹窗 -->
    <RoleModal title="作者角色管理" />
  </Page>
</template>

<style scoped></style>
