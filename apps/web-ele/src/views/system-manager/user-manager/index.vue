<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { SystemUserCreateRequest, UpdateUserDto } from '#/api/types';

import { computed } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  systemUserCreateApi,
  systemUserDetailApi,
  systemUserPageApi,
  systemUserPasswordResetApi,
  systemUserProfileUpdateApi,
  systemUserUnlockApi,
} from '#/api/core';
import { QuestionIcon } from '#/components/es-icons';
import EsModalForm from '#/components/es-modal-form/index.vue';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import {
  editFormSchema,
  formSchema,
  lockStatusObj,
  userColumns,
  userFilter,
  userRoleObj,
} from './model/shared';
import type { SystemUserRow } from './model/shared';

const userStore = useUserStore();

// 检查是否为超级管理员 (role: 1)
const isSuperAdmin = computed(() => {
  return userStore.userInfo?.role === 1;
});

const gridOptions: VxeGridProps<SystemUserRow> = {
  columns: userColumns,
  height: 'auto',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await systemUserPageApi(
          formatQuery({ page, formValues, sorts }),
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
  formOptions: createSearchFormOptions(userFilter),
  gridOptions,
});

async function openFormModal(row?: SystemUserRow) {
  if (!isSuperAdmin.value) {
    useMessage.warning('只有超级管理员才能执行此操作');
    return;
  }

  let record;
  if (row) {
    record = await systemUserDetailApi({ id: row.id });
  }
  formApi
    .setData({
      title: '用户',
      record,
      schema: row ? editFormSchema : formSchema,
    })
    .open();
}

async function handleSubmit(values: SystemUserCreateRequest | UpdateUserDto) {
  await (values?.id
    ? systemUserProfileUpdateApi(values as UpdateUserDto)
    : systemUserCreateApi(values as SystemUserCreateRequest));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function toggleUserStatus(record: SystemUserRow) {
  if (!isSuperAdmin.value) {
    useMessage.warning('只有超级管理员才能执行此操作');
    return;
  }

  const newStatus = !record.isEnabled;
  record.loading = true as any;
  try {
    await systemUserProfileUpdateApi({
      id: record.id,
      username: record.username,
      mobile: record.mobile,
      avatar: record.avatar,
      role: record.role,
      isEnabled: newStatus,
    });
    useMessage.success(newStatus ? '启用成功' : '禁用成功');
    gridApi.reload();
  } finally {
    record.loading = false as any;
  }
}

async function unlockUser(record: SystemUserRow) {
  if (!isSuperAdmin.value) {
    useMessage.warning('只有超级管理员才能执行此操作');
    return;
  }

  if (!record.isLocked) {
    return;
  }

  record.loading = true as any;
  try {
    await systemUserUnlockApi({
      id: record.id,
    });
    useMessage.success('解除锁定成功');
    gridApi.reload();
  } finally {
    record.loading = false as any;
  }
}

async function resetUserPassword(record: SystemUserRow) {
  if (!isSuperAdmin.value) {
    useMessage.warning('只有超级管理员才能执行此操作');
    return;
  }

  await systemUserPasswordResetApi({
    id: record.id,
  });
  useMessage.success('密码重置成功');
  gridApi.reload();
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <el-button
          v-if="isSuperAdmin"
          class="ml-2"
          type="primary"
          @click="openFormModal()"
        >
          添加用户
        </el-button>
      </template>

      <!-- 添加 isLocked 列的表头插槽 -->
      <template #isLockedHeader>
        <div class="flex items-center justify-center">
          <span>登录锁定</span>
          <el-tooltip
            popper-class="w-36"
            effect="dark"
            content="处于锁定状态时，账户将无法登录系统！需超级管理员手动解锁或等待系统自动解锁"
            placement="top"
          >
            <QuestionIcon class="ml-2 size-5 text-[#606266]" />
          </el-tooltip>
        </div>
      </template>

      <template #avatar="{ row }">
        <el-avatar
          :size="40"
          :src="row.avatar || ''"
          :icon="row.avatar ? undefined : 'User'"
        >
          {{ row.avatar ? '' : row.username?.charAt(0)?.toUpperCase() }}
        </el-avatar>
      </template>

      <template #role="{ row }">
        <el-text :style="{ color: userRoleObj[row.role]?.color }">
          {{ userRoleObj[row.role]?.label }}
        </el-text>
      </template>

      <template #isEnabled="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.loading"
          :model-value="row.isEnabled"
          :disabled="userStore.userInfo?.id === row.id || !isSuperAdmin"
          @change="toggleUserStatus(row)"
        />
      </template>

      <template #isLocked="{ row }">
        <el-text :style="{ color: lockStatusObj[String(row.isLocked)]?.color }">
          {{ lockStatusObj[String(row.isLocked)]?.label }}
        </el-text>
      </template>

      <template #actions="{ row }">
        <div class="my-1">
          <template v-if="isSuperAdmin">
            <el-button link type="primary" @click="openFormModal(row)">
              编辑
            </el-button>

            <el-divider direction="vertical" />
            <el-popconfirm
              title="是否重置当前账户为默认密码？"
              width="180"
              confirm-button-text="确认"
              cancel-button-text="取消"
              @confirm="resetUserPassword(row)"
            >
              <template #reference>
                <el-button link type="warning"> 重置密码 </el-button>
              </template>
            </el-popconfirm>

            <el-divider direction="vertical" />
            <el-popconfirm
              title="解除当前账号登录锁定状态，是否解除？"
              width="180"
              confirm-button-text="确认"
              cancel-button-text="取消"
              :disabled="!row.isLocked || row.loading"
              @confirm="unlockUser(row)"
            >
              <template #reference>
                <el-button
                  link
                  type="warning"
                  :disabled="!row.isLocked || row.loading"
                  :loading="row.loading"
                >
                  解除锁定
                </el-button>
              </template>
            </el-popconfirm>
          </template>

          <div v-if="!isSuperAdmin" class="text-gray-400">无操作权限</div>
        </div>
      </template>
    </Grid>

    <Form :on-submit="handleSubmit" />
  </Page>
</template>

<style scoped></style>
