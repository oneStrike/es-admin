<script setup lang="ts">
import type { ActionItem } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AdminAppUserDetailDto,
  AdminAppUserPageItemDto,
  AppUsersCreateRequest,
  AppUsersPasswordResetRequest,
  AppUsersProfileUpdateRequest,
  AppUsersUpdateStatusRequest,
} from '#/api/types';

import { computed } from 'vue';

import { Page, useVbenModal, VbenTableAction } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

import forge from 'node-forge';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  appUsersCreateApi,
  appUsersDeleteApi,
  appUsersDetailApi,
  appUsersPageApi,
  appUsersPasswordResetApi,
  appUsersProfileUpdateApi,
  appUsersRestoreApi,
  appUsersUpdateEnabledApi,
  appUsersUpdateStatusApi,
  authKeyPublicApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import RecordDetailModal from '#/components/record-detail-modal';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import UserOperationModal from './components/user-operation-modal.vue';
import { getDetailSections } from './model/detail';
import {
  createFormSchema,
  editFormSchema,
  genderMap,
  getUserBanUntilText,
  isPermanentStatus,
  isTemporaryStatus,
  normalUserStatus,
  passwordResetFormSchema,
  searchFormSchema,
  statusFormSchema,
  userColumns,
  userStatusMap,
} from './model/shared';

const userStore = useUserStore();

const isSuperAdmin = computed(() => userStore.userInfo?.role === 1);

const gridOptions: VxeGridProps<AdminAppUserPageItemDto> = {
  columns: userColumns,
  height: 'auto',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        let endDate;
        let lastLoginEndDate;
        let lastLoginStartDate;
        let startDate;

        const { dateRange, lastLoginDateRange, ...restFormValues } =
          formValues || {};

        if (Array.isArray(dateRange)) {
          [startDate, endDate] = dateRange;
        }

        if (Array.isArray(lastLoginDateRange)) {
          [lastLoginStartDate, lastLoginEndDate] = lastLoginDateRange;
        }

        return await appUsersPageApi(
          formatQuery({
            page,
            formValues: {
              ...restFormValues,
              endDate,
              lastLoginEndDate,
              lastLoginStartDate,
              startDate,
            },
            sorts,
          }),
        );
      },
    },
    sort: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(searchFormSchema),
  gridOptions,
});

const [EditForm, editFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [CreateForm, createFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [StatusForm, statusFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [PasswordForm, passwordFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: RecordDetailModal,
  title: '用户详情',
});

const [OperationModal, operationApi] = useVbenModal({
  connectedComponent: UserOperationModal,
});

async function encryptPassword(password: string) {
  const publicKey = await authKeyPublicApi();
  const publicKeyPem = forge.pki.publicKeyFromPem(publicKey.publicKey);
  const encrypted = publicKeyPem.encrypt(password, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: {
      md: forge.md.sha256.create(),
    },
  });

  return forge.util.encode64(encrypted);
}

function optionalTrim(value?: null | string) {
  return value?.trim() || undefined;
}

function optionalValue<T>(value?: null | T) {
  return value || undefined;
}

async function toggleUserEnabled(row: AdminAppUserPageItemDto) {
  if (!isSuperAdmin.value) {
    useMessage.warning('只有超级管理员才能执行此操作');
    return;
  }

  if (row.deletedAt) {
    useMessage.warning('已删除用户不能调整启用状态');
    return;
  }

  row.loading = true;
  try {
    await appUsersUpdateEnabledApi({
      id: row.id,
      isEnabled: !row.isEnabled,
    });
    useMessage.success(row.isEnabled ? '用户已禁用' : '用户已启用');
    await gridApi.reload();
  } finally {
    row.loading = false;
  }
}

function openDetailModal(row: AdminAppUserPageItemDto) {
  if (row.deletedAt) {
    useMessage.warning('已删除用户不能查看详情');
    return;
  }

  detailApi.setData({ id: row.id }).open();
}

function openOperationModal(row: AdminAppUserPageItemDto) {
  if (row.deletedAt) {
    useMessage.warning('已删除用户不能打开运营');
    return;
  }

  operationApi
    .setData({
      isSuperAdmin: isSuperAdmin.value,
      onUpdated: async () => {
        await gridApi.reload();
      },
      record: row,
    })
    .open();
}

function openCreateModal() {
  if (!isSuperAdmin.value) {
    useMessage.warning('只有超级管理员才能执行此操作');
    return;
  }

  createFormApi
    .setData({
      cols: 2,
      title: '用户',
      width: 900,
    })
    .open();
}

async function openEditModal(row: AdminAppUserPageItemDto) {
  if (!isSuperAdmin.value) {
    useMessage.warning('只有超级管理员才能执行此操作');
    return;
  }

  if (row.deletedAt) {
    useMessage.warning('已删除用户不能编辑资料');
    return;
  }

  const detail = await appUsersDetailApi({ id: row.id });

  editFormApi
    .setData({
      cols: 2,
      record: mapDetailToEditRecord(detail),
      title: '用户资料',
      width: 900,
    })
    .open();
}

function openStatusModal(row: AdminAppUserPageItemDto) {
  if (!isSuperAdmin.value) {
    useMessage.warning('只有超级管理员才能执行此操作');
    return;
  }

  if (row.deletedAt) {
    useMessage.warning('已删除用户不能调整用户状态');
    return;
  }

  statusFormApi
    .setData({
      cols: 1,
      record: {
        banReason: row.banReason ?? '',
        banUntil: row.banUntil ?? undefined,
        id: row.id,
        status: row.status,
      },
      title: '用户状态',
      width: 700,
    })
    .open();
}

function openPasswordModal(row: AdminAppUserPageItemDto) {
  if (!isSuperAdmin.value) {
    useMessage.warning('只有超级管理员才能执行此操作');
    return;
  }

  if (row.deletedAt) {
    useMessage.warning('已删除用户不能重置密码');
    return;
  }

  passwordFormApi
    .setData({
      cols: 1,
      record: {
        id: row.id,
      },
      title: '重置密码',
      width: 680,
    })
    .open();
}

async function handleCreateSubmit(values: AppUsersCreateRequest) {
  await appUsersCreateApi({
    avatarUrl: optionalValue(values.avatarUrl),
    birthDate: optionalValue(values.birthDate),
    emailAddress: optionalTrim(values.emailAddress),
    genderType: values.genderType,
    isEnabled: values.isEnabled,
    nickname: values.nickname.trim(),
    password: await encryptPassword(values.password),
    phoneNumber: optionalTrim(values.phoneNumber),
    status: values.status ?? normalUserStatus,
  });

  useMessage.success('用户创建成功');
  createFormApi.close();
  await gridApi.reload();
}

async function handlePasswordSubmit(
  values: AppUsersPasswordResetRequest & { confirmPassword?: string },
) {
  if (values.password !== values.confirmPassword) {
    useMessage.warning('两次输入的密码不一致');
    return;
  }

  await appUsersPasswordResetApi({
    id: values.id,
    password: await encryptPassword(values.password),
  });

  useMessage.success('密码重置成功');
  passwordFormApi.close();
}

async function handleEditSubmit(values: AppUsersProfileUpdateRequest) {
  await appUsersProfileUpdateApi({
    avatarUrl: optionalValue(values.avatarUrl),
    bio: optionalTrim(values.bio),
    birthDate: optionalValue(values.birthDate),
    emailAddress: optionalTrim(values.emailAddress),
    genderType: values.genderType,
    id: values.id,
    nickname: optionalTrim(values.nickname),
    phoneNumber: optionalTrim(values.phoneNumber),
    signature: optionalTrim(values.signature),
  });

  useMessage.success('用户资料更新成功');
  editFormApi.close();
  await gridApi.reload();
}

async function handleStatusSubmit(values: AppUsersUpdateStatusRequest) {
  const banReason = values.banReason?.trim();

  if (values.status !== normalUserStatus && !banReason) {
    useMessage.warning('禁言或封禁时请填写处理原因');
    return;
  }

  if (isTemporaryStatus(values.status) && !values.banUntil) {
    useMessage.warning('临时禁言或封禁时请填写截止时间');
    return;
  }

  await appUsersUpdateStatusApi({
    banReason: values.status === normalUserStatus ? undefined : banReason,
    banUntil: isTemporaryStatus(values.status) ? values.banUntil : undefined,
    id: values.id,
    status: values.status,
  });

  useMessage.success('用户状态更新成功');
  statusFormApi.close();
  await gridApi.reload();
}

async function handleRowCommand(command: string, row: AdminAppUserPageItemDto) {
  if (!isSuperAdmin.value) {
    useMessage.warning('只有超级管理员才能执行此操作');
    return;
  }

  switch (command) {
    case 'delete': {
      await useConfirm({
        type: 'delete',
        onConfirm: async () => {
          await appUsersDeleteApi({ id: row.id });
          await gridApi.reload();
        },
      });
      break;
    }
    case 'edit': {
      await openEditModal(row);
      break;
    }
    case 'password': {
      openPasswordModal(row);
      break;
    }
    case 'restore': {
      await useConfirm({
        type: 'restore',
        onConfirm: async () => {
          await appUsersRestoreApi({ id: row.id });
          await gridApi.reload();
        },
      });
      break;
    }
    case 'status': {
      openStatusModal(row);
      break;
    }
    default: {
      break;
    }
  }
}

function mapDetailToEditRecord(
  detail: AdminAppUserDetailDto,
): AppUsersProfileUpdateRequest {
  return {
    avatarUrl: detail.avatarUrl ?? undefined,
    bio: detail.bio ?? undefined,
    birthDate: detail.birthDate ?? undefined,
    emailAddress: detail.emailAddress ?? undefined,
    genderType: detail.genderType,
    id: detail.id,
    nickname: detail.nickname,
    phoneNumber: detail.phoneNumber ?? undefined,
    signature: detail.signature ?? undefined,
  };
}

function getUserActions(row: AdminAppUserPageItemDto): ActionItem[] {
  return [
    {
      disabled: !!row.deletedAt,
      key: 'detail',
      onClick: () => openDetailModal(row),
      text: '详情',
    },
    {
      disabled: !!row.deletedAt,
      key: 'operation',
      onClick: () => openOperationModal(row),
      text: '运营',
    },
  ];
}

function getUserDropdownActions(row: AdminAppUserPageItemDto): ActionItem[] {
  if (!isSuperAdmin.value) {
    return [];
  }

  return [
    {
      ifShow: () => !row.deletedAt,
      key: 'edit',
      onClick: () => handleRowCommand('edit', row),
      text: '编辑资料',
    },
    {
      ifShow: () => !row.deletedAt,
      key: 'password',
      onClick: () => handleRowCommand('password', row),
      text: '重置密码',
    },
    {
      ifShow: () => !row.deletedAt,
      key: 'status',
      onClick: () => handleRowCommand('status', row),
      text: '用户状态',
    },
    {
      danger: true,
      ifShow: () => !row.deletedAt,
      key: 'delete',
      onClick: () => handleRowCommand('delete', row),
      text: '删除用户',
    },
    {
      ifShow: () => !!row.deletedAt,
      key: 'restore',
      onClick: () => handleRowCommand('restore', row),
      text: '恢复用户',
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
          @click="openCreateModal"
        >
          新增用户
        </el-button>
      </template>

      <template #avatarUrl="{ row }">
        <el-avatar :size="40" :src="row.avatarUrl || undefined">
          {{ (row.nickname || row.account)?.slice(0, 1)?.toUpperCase() }}
        </el-avatar>
      </template>

      <template #genderType="{ row }">
        <el-text>{{ genderMap[row.genderType]?.label || '-' }}</el-text>
      </template>

      <template #isEnabled="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.loading"
          :model-value="row.isEnabled"
          :disabled="!isSuperAdmin || !!row.deletedAt"
          @change="toggleUserEnabled(row)"
        />
      </template>

      <template #status="{ row }">
        <el-tag :type="userStatusMap[row.status]?.tagType || 'info'">
          {{ userStatusMap[row.status]?.label || '-' }}
        </el-tag>
      </template>

      <template #banUntil="{ row }">
        <el-text :type="isPermanentStatus(row.status) ? 'danger' : 'info'">
          {{ getUserBanUntilText(row.status, row.banUntil) }}
        </el-text>
      </template>

      <template #actions="{ row }">
        <VbenTableAction
          align="center"
          :actions="getUserActions(row)"
          :dropdown-actions="getUserDropdownActions(row)"
          more-text="更多"
        />
      </template>
    </Grid>

    <CreateForm :schema="createFormSchema" :on-submit="handleCreateSubmit" />
    <EditForm :schema="editFormSchema" :on-submit="handleEditSubmit" />
    <StatusForm :schema="statusFormSchema" :on-submit="handleStatusSubmit" />
    <PasswordForm
      :schema="passwordResetFormSchema"
      :on-submit="handlePasswordSubmit"
    />
    <DetailModal
      :api="appUsersDetailApi"
      :sections="getDetailSections"
      class="!min-w-[900px]"
    />
    <OperationModal />
  </Page>
</template>
