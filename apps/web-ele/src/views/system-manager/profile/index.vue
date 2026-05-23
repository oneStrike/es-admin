<script setup lang="ts">
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AdminUserResponseDto,
  AuditItemDto,
  AuditPageRequest,
  ChangePasswordDto,
  UpdateUserDto,
} from '#/api/types';

import { onMounted, ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  auditPageApi,
  systemUserPasswordChangeApi,
  systemUserProfileApi,
  systemUserProfileUpdateApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import { useMessage } from '#/hooks/useFeedback';

import {
  editFormSchema,
  loginHistortColumn,
  passwordFormSchema,
} from './model/shared';

type SystemUserProfile = AdminUserResponseDto & {
  isLocked?: boolean;
};

const userStore = useUserStore();
// 用户信息
const userInfo = ref<null | SystemUserProfile>(null);
const loading = ref(false);

// 登录历史表格配置
const gridOptions: VxeGridProps<AuditItemDto> = {
  columns: loginHistortColumn,
  height: '100%',
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }) => {
        if (!userInfo.value) return { list: [], total: 0 };
        const params: AuditPageRequest = {
          username: userInfo.value.username,
          path: '/api/admin/auth/login',
        };

        return await auditPageApi(
          formatQuery({ page, sorts, formValues: params }),
        );
      },
    },
  },
};

// 创建表格和表单实例
const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
});

const [EditForm, editFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [PasswordForm, passwordFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    loading.value = true;
    userInfo.value = await systemUserProfileApi();
  } catch {
    useMessage.error('获取用户信息失败');
  } finally {
    loading.value = false;
  }
};

function buildProfileUpdatePayload(values: UpdateUserDto): UpdateUserDto {
  if (!userInfo.value) {
    throw new Error('User profile is not loaded');
  }

  return {
    id: userInfo.value.id,
    isEnabled: userInfo.value.isEnabled,
    role: userInfo.value.role,
    username: values.username,
    avatar: values.avatar,
    mobile: values.mobile,
  };
}

function buildPasswordChangePayload(
  values: ChangePasswordDto,
): ChangePasswordDto {
  return {
    oldPassword: values.oldPassword,
    newPassword: values.newPassword,
    confirmPassword: values.confirmPassword,
  };
}

// 提交：编辑用户信息
async function handleEditSubmit(values: UpdateUserDto) {
  try {
    await systemUserProfileUpdateApi(buildProfileUpdatePayload(values));
    useMessage.success('用户信息更新成功');
    await fetchUserInfo();
    // 更新全局用户信息
    if (userInfo.value) {
      userStore.setUserInfo({
        ...userStore.userInfo,
        username: userInfo.value.username,
        avatar: userInfo.value.avatar || '',
        realName: userInfo.value.username,
        userId: String(userInfo.value.id),
      });
    }
    editFormApi.close();
  } catch {
    useMessage.error('更新用户信息失败');
  }
}

// 提交：修改密码
async function handlePasswordSubmit(values: ChangePasswordDto) {
  if (values.newPassword !== values.confirmPassword) {
    useMessage.error('新密码和确认密码不一致');
    return;
  }
  try {
    await systemUserPasswordChangeApi(buildPasswordChangePayload(values));
    useMessage.success('密码修改成功');
    passwordFormApi.close();
  } catch {
    useMessage.error('密码修改失败');
  }
}

// 打开编辑对话框
const openEditDialog = async () => {
  if (!userInfo.value) return;

  editFormApi
    .setData({ cols: 1, title: '用户信息', record: userInfo.value })
    .open();
};

// 打开修改密码对话框
const openPasswordDialog = async () => {
  passwordFormApi.setData({ cols: 1, title: '密码' }).open();
};

// 格式化时间
const formatTime = (time: string) => {
  return new Date(time).toLocaleString('zh-CN');
};

// 格式化角色
const formatRole = (role: number) => {
  return role === 1 ? '超级管理员' : '普通管理员';
};

// 格式化状态
const formatStatus = (isEnabled: boolean, isLocked?: boolean) => {
  if (isLocked) return '已锁定';
  return isEnabled ? '正常' : '禁用';
};

// 获取状态颜色
const getStatusColor = (isEnabled: boolean, isLocked?: boolean) => {
  if (isLocked) return 'danger';
  return isEnabled ? 'success' : 'warning';
};

onMounted(async () => {
  await fetchUserInfo();
  gridApi.reload();
});
</script>

<template>
  <Page auto-content-height content-class="es-full-height-page-content">
    <div
      class="grid h-full min-h-0 grid-cols-1 gap-6 overflow-hidden lg:grid-cols-5"
    >
      <!-- 左侧用户信息 -->
      <div class="h-full min-h-0 lg:col-span-2">
        <div
          v-loading="loading"
          class="flex h-full flex-col rounded-lg border border-border bg-background p-6 shadow-sm"
        >
          <div class="mb-6 flex flex-shrink-0 items-center justify-between">
            <h2 class="text-lg font-semibold text-foreground">个人信息</h2>
            <div class="flex gap-2">
              <el-button type="primary" @click="openEditDialog">
                编辑信息
              </el-button>
              <el-button type="warning" @click="openPasswordDialog">
                修改密码
              </el-button>
            </div>
          </div>

          <div v-if="userInfo" class="flex flex-1 flex-col overflow-hidden">
            <!-- 头像区域 -->
            <div class="mb-4 flex flex-shrink-0 flex-col items-center">
              <el-avatar
                :size="120"
                :src="userInfo.avatar || undefined"
                class="mb-4"
              />
              <h3 class="mb-2 text-xl font-semibold text-foreground">
                {{ userInfo.username }}
              </h3>
            </div>

            <!-- 详细信息区域 -->
            <div class="flex-1 overflow-auto">
              <el-descriptions :column="1" border>
                <el-descriptions-item label="用户ID">
                  <span class="font-mono text-foreground">{{
                    userInfo.id
                  }}</span>
                </el-descriptions-item>
                <el-descriptions-item label="用户名">
                  {{ userInfo.username }}
                </el-descriptions-item>
                <el-descriptions-item label="手机号">
                  {{ userInfo.mobile }}
                </el-descriptions-item>
                <el-descriptions-item label="角色">
                  <el-tag :type="userInfo.role === 1 ? 'danger' : 'primary'">
                    {{ formatRole(userInfo.role) }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="账户状态">
                  <el-tag
                    :type="
                      getStatusColor(userInfo.isEnabled, userInfo.isLocked)
                    "
                  >
                    {{ formatStatus(userInfo.isEnabled, userInfo.isLocked) }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="最后登录时间">
                  {{
                    userInfo.lastLoginAt
                      ? formatTime(userInfo.lastLoginAt)
                      : '-'
                  }}
                </el-descriptions-item>
                <el-descriptions-item label="最后登录IP">
                  {{ userInfo.lastLoginIp || '-' }}
                </el-descriptions-item>
                <el-descriptions-item label="创建时间">
                  {{ formatTime(userInfo.createdAt) }}
                </el-descriptions-item>
                <el-descriptions-item label="更新时间">
                  {{ formatTime(userInfo.updatedAt) }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧登录历史 -->
      <div class="h-full min-h-0 lg:col-span-3">
        <div
          class="es-full-height-pane rounded-lg border border-border bg-background p-6 shadow-sm"
        >
          <h2 class="mb-4 shrink-0 text-lg font-semibold text-foreground">
            登录历史记录
          </h2>
          <Grid class="es-full-height-grid">
            <template #isSuccess="{ row }">
              <el-tag :type="row.isSuccess ? 'success' : 'danger'">
                {{ row.isSuccess ? '登录成功' : row.content }}
              </el-tag>
            </template>
          </Grid>
        </div>
      </div>
    </div>

    <!-- 表单弹窗 -->
    <EditForm :schema="editFormSchema" :on-submit="handleEditSubmit" />
    <PasswordForm
      :schema="passwordFormSchema"
      :on-submit="handlePasswordSubmit"
    />
  </Page>
</template>

<style scoped>
.el-descriptions :deep(.el-descriptions__label) {
  font-weight: 600;
  color: hsl(var(--foreground));
}

.el-descriptions :deep(.el-descriptions__content) {
  color: hsl(var(--foreground));
}

.font-mono {
  font-family: 'Courier New', monospace;
}
</style>
