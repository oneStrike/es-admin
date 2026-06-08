<script lang="ts" setup>
import type { ActionItem } from '@vben/common-ui';

import type { SystemUserRow } from './model/shared';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { SystemUserCreateRequest, UpdateUserDto } from '#/api/types';

import { computed } from 'vue';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';
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
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import {
  createFormSchema,
  editFormSchema,
  lockStatusObj,
  userColumns,
  userFilter,
  userRoleObj,
} from './model/shared';

defineOptions({
  name: 'SystemAccountManager',
});

type SystemUserFormValues = SystemUserCreateRequest | UpdateUserDto;

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
      title: '后台账号',
      record,
      schema: row ? editFormSchema : createFormSchema,
    })
    .open();
}

function buildSystemUserPayload(
  values: SystemUserFormValues,
): SystemUserCreateRequest | UpdateUserDto {
  if (isSystemUserUpdate(values)) {
    return {
      id: values.id,
      username: values.username,
      mobile: values.mobile,
      avatar: values.avatar,
      role: values.role,
      isEnabled: values.isEnabled,
    };
  }

  return {
    avatar: values.avatar,
    confirmPassword: values.confirmPassword,
    mobile: values.mobile,
    password: values.password,
    role: values.role,
    username: values.username,
  } satisfies SystemUserCreateRequest;
}

function isSystemUserUpdate(
  values: SystemUserFormValues,
): values is UpdateUserDto {
  return 'id' in values && typeof values.id === 'number';
}

async function handleSubmit(values: SystemUserFormValues) {
  if (isSystemUserUpdate(values) && values.id === userStore.userInfo?.id) {
    const selfDowngrade =
      values.role !== undefined && values.role !== userStore.userInfo?.role;
    const selfDisable = values.isEnabled === false;

    if (selfDowngrade || selfDisable) {
      useMessage.warning('不能通过账号管理禁用或降级当前登录账号');
      return;
    }
  }

  const payload = buildSystemUserPayload(values);

  await ('id' in payload && typeof payload.id === 'number'
    ? systemUserProfileUpdateApi(payload as UpdateUserDto)
    : systemUserCreateApi(payload as SystemUserCreateRequest));
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
  record.loading = true;
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
    record.loading = false;
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

  record.loading = true;
  try {
    await systemUserUnlockApi({
      id: record.id,
    });
    useMessage.success('解除锁定成功');
    gridApi.reload();
  } finally {
    record.loading = false;
  }
}

async function confirmUnlockUser(record: SystemUserRow) {
  if (!record.isLocked || record.loading) return;

  const confirmed = await useConfirm({
    content: '解除当前账号登录锁定状态，是否解除？',
    successMessage: false,
  });
  if (!confirmed) return;

  await unlockUser(record);
}

async function resetUserPassword(record: SystemUserRow) {
  if (!isSuperAdmin.value) {
    useMessage.warning('只有超级管理员才能执行此操作');
    return;
  }

  const result = await systemUserPasswordResetApi({
    id: record.id,
  });

  useMessage.success(
    result.temporaryPassword
      ? `密码重置成功，临时密码：${result.temporaryPassword}`
      : '密码重置成功',
  );
  gridApi.reload();
}

async function confirmResetUserPassword(record: SystemUserRow) {
  const confirmed = await useConfirm({
    content: '是否重置当前账户密码？临时密码只会在本次响应中返回。',
    successMessage: false,
  });
  if (!confirmed) return;

  await resetUserPassword(record);
}

function getUserActions(row: SystemUserRow): ActionItem[] {
  if (!isSuperAdmin.value) {
    return [
      {
        disabled: true,
        key: 'noPermission',
        text: '无操作权限',
      },
    ];
  }

  return [
    {
      disabled: userStore.userInfo?.id === row.id,
      key: 'edit',
      onClick: () => openFormModal(row),
      text: '编辑',
    },
    {
      key: 'resetPassword',
      onClick: () => confirmResetUserPassword(row),
      text: '重置密码',
    },
    {
      disabled: !row.isLocked || row.loading,
      key: 'unlock',
      loading: row.loading,
      onClick: () => confirmUnlockUser(row),
      text: '解除锁定',
    },
  ];
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
        <el-tag :type="userRoleObj[row.role]?.tagType || 'info'">
          {{ userRoleObj[row.role]?.label }}
        </el-tag>
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
        <el-tag :type="lockStatusObj[String(row.isLocked)]?.tagType || 'info'">
          {{ lockStatusObj[String(row.isLocked)]?.label }}
        </el-tag>
      </template>

      <template #actions="{ row }">
        <VbenTableAction align="center" :actions="getUserActions(row)" />
      </template>
    </Grid>

    <Form :on-submit="handleSubmit" />
  </Page>
</template>

<style scoped></style>
