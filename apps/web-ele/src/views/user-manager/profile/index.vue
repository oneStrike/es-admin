<script setup lang="ts">
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AdminAppUserDetailDto,
  AdminAppUserPageItemDto,
  AppUsersUpdateStatusRequest,
} from '#/api/types';
import type { AppUsersCreateRequest } from '#/api/types/app-users/appUsers.d';
import type { PasswordResetRequest } from '#/api/types/app-users/password.d';
import type { ProfileUpdateRequest } from '#/api/types/app-users/profile.d';

import { computed } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';
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
  authPublicKeyApi,
} from '#/api';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsRecordDetail from '#/components/es-record-detail';
import { useConfirm, useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import UserOperationModal from './components/user-operation-modal.vue';
import { getDetailCards } from './model/detail';
import {
  createFormSchema,
  editFormSchema,
  genderMap,
  getUserBanUntilText,
  isPermanentStatus,
  isTemporaryStatus,
  normalUserStatus,
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

        const {
          dateRange,
          lastLoginDateRange,
          ...restFormValues
        } = formValues || {};

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
  connectedComponent: EsRecordDetail,
});

const [OperationModal, operationApi] = useVbenModal({
  connectedComponent: UserOperationModal,
});

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
  detailApi.setData({ recordId: row.id, title: '用户详情' }).open();
}

function openOperationModal(row: AdminAppUserPageItemDto) {
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
    useMessage.warning('已删除用户不能调整社区状态');
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
      title: '社区状态',
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
    ...values,
    avatarUrl: values.avatarUrl || undefined,
    emailAddress: values.emailAddress?.trim() || undefined,
    nickname: values.nickname?.trim(),
    password: values.password,
    phoneNumber: values.phoneNumber?.trim() || undefined,
    status: values.status ?? normalUserStatus,
  });

  useMessage.success('用户创建成功');
  createFormApi.close();
  await gridApi.reload();
}

async function handlePasswordSubmit(
  values: PasswordResetRequest & { confirmPassword?: string },
) {
  if (values.password !== values.confirmPassword) {
    useMessage.warning('两次输入的密码不一致');
    return;
  }

  const publicKey = await authPublicKeyApi();
  const publicKeyPem = forge.pki.publicKeyFromPem(publicKey.publicKey);
  const encrypted = publicKeyPem.encrypt(values.password, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: {
      md: forge.md.sha256.create(),
    },
  });

  await appUsersPasswordResetApi({
    id: values.id,
    password: forge.util.encode64(encrypted),
  });

  useMessage.success('密码重置成功');
  passwordFormApi.close();
}

async function handleEditSubmit(values: ProfileUpdateRequest) {
  await appUsersProfileUpdateApi({
    ...values,
    avatarUrl: values.avatarUrl || undefined,
    bio: values.bio?.trim() || undefined,
    emailAddress: values.emailAddress?.trim() || undefined,
    nickname: values.nickname?.trim(),
    phoneNumber: values.phoneNumber?.trim() || undefined,
    signature: values.signature?.trim() || undefined,
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

  useMessage.success('社区状态更新成功');
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
      const confirmed = await useConfirm('delete', async () => {
        await appUsersDeleteApi({ id: row.id });
      });

      if (confirmed) {
        await gridApi.reload();
      }
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
      const confirmed = await useConfirm('restore', async () => {
        await appUsersRestoreApi({ id: row.id });
      });

      if (confirmed) {
        await gridApi.reload();
      }
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

function mapDetailToEditRecord(detail: AdminAppUserDetailDto): ProfileUpdateRequest {
  return {
    avatarUrl: detail.avatarUrl ?? undefined,
    bio: detail.forumProfile?.bio ?? undefined,
    birthDate: detail.birthDate ?? undefined,
    emailAddress: detail.emailAddress ?? undefined,
    genderType: detail.genderType,
    id: detail.id,
    nickname: detail.nickname,
    phoneNumber: detail.phoneNumber ?? undefined,
    signature: detail.forumProfile?.signature ?? undefined,
  };
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
        <div class="my-1">
          <el-button link type="primary" @click="openDetailModal(row)">
            详情
          </el-button>

          <el-divider direction="vertical" />
          <el-button link type="primary" @click="openOperationModal(row)">
            运营
          </el-button>

          <template v-if="isSuperAdmin">
            <el-divider direction="vertical" />
            <el-dropdown
              @command="
                (command) => {
                  handleRowCommand(command, row);
                }
              "
            >
              <el-button link type="primary">更多</el-button>

              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-if="!row.deletedAt"
                    command="edit"
                    :disabled="!isSuperAdmin"
                  >
                    编辑资料
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="!row.deletedAt"
                    command="password"
                    :disabled="!isSuperAdmin"
                  >
                    重置密码
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="!row.deletedAt"
                    command="status"
                    :disabled="!isSuperAdmin"
                  >
                    社区状态
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="!row.deletedAt"
                    command="delete"
                    :disabled="!isSuperAdmin"
                  >
                    删除用户
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-else
                    command="restore"
                    :disabled="!isSuperAdmin"
                  >
                    恢复用户
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </div>
      </template>
    </Grid>

    <CreateForm :schema="createFormSchema" :on-submit="handleCreateSubmit" />
    <EditForm :schema="editFormSchema" :on-submit="handleEditSubmit" />
    <StatusForm :schema="statusFormSchema" :on-submit="handleStatusSubmit" />
    <PasswordForm
      :schema="[
        {
          component: 'Input',
          fieldName: 'password',
          label: '新密码',
          rules: 'required',
          componentProps: {
            autocomplete: 'new-password',
            placeholder: '请输入新密码',
            showPassword: true,
            type: 'password',
          },
        },
        {
          component: 'Input',
          fieldName: 'confirmPassword',
          label: '确认密码',
          rules: 'required',
          componentProps: {
            autocomplete: 'new-password',
            placeholder: '请再次输入新密码',
            showPassword: true,
            type: 'password',
          },
        },
      ]"
      :on-submit="handlePasswordSubmit"
    />
    <DetailModal
      :api="appUsersDetailApi"
      :cards="getDetailCards"
      class="!min-w-[900px]"
    />
    <OperationModal />
  </Page>
</template>
