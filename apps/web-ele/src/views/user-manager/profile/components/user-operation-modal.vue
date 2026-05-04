<script setup lang="ts">
import type {
  AdminAppUserDetailDto,
  AdminAppUserExperienceRecordDto,
  AdminAppUserPageItemDto,
  AdminAppUserPointRecordDto,
  AppUsersExperienceGrantRequest,
  AppUsersPointsConsumeRequest,
  AppUsersPointsGrantRequest,
  BaseUserBadgeDto,
  UserBadgeItemDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { computed, nextTick, ref, watch } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { z } from '#/adapter/form';
import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  appUsersBadgesAssignApi,
  appUsersBadgesPageApi,
  appUsersBadgesRevokeApi,
  appUsersDetailApi,
  appUsersExperienceGrantApi,
  appUsersExperienceRecordPageApi,
  appUsersPointsConsumeApi,
  appUsersPointsGrantApi,
  appUsersPointsRecordPageApi,
  growthBadgesPageApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsModalTable from '#/components/es-modal-table';
import { useMessage } from '#/hooks/useFeedback';
import { formSchemaTransform } from '#/utils';
import { createSearchFormOptions } from '#/utils/grid-form-config';
import {
  badgeTypeMap,
  badgeTypeOptions,
} from '#/views/user-manager/growth/badges/modules/model/constants';
import { growthTypeOptions } from '#/views/user-manager/growth/model/constants';

import {
  getUserStatusText,
  isPermanentStatus,
  userStatusMap,
} from '../model/shared';

type OperationModalData = {
  isSuperAdmin?: boolean;
  onUpdated?: () => Promise<void> | void;
  record: AdminAppUserPageItemDto;
};

const activeTab = ref('points');
const currentUser = ref<AdminAppUserPageItemDto | null>(null);
const loading = ref(false);
const userDetail = ref<AdminAppUserDetailDto | null>(null);
const sharedData = ref<null | OperationModalData>(null);
const pointsGrantOperationKey = ref('');
const pointsConsumeOperationKey = ref('');
const experienceGrantOperationKey = ref('');

const displayUser = computed(() => userDetail.value ?? currentUser.value);
const displayUserLabel = computed(() => {
  const user = displayUser.value;
  return user ? user.nickname || user.account : '';
});

const canOperate = computed(() => {
  return !!sharedData.value?.isSuperAdmin && !displayUser.value?.deletedAt;
});

const modalTitle = computed(() => {
  if (!displayUserLabel.value) {
    return '用户运营';
  }

  return `用户运营 - ${displayUserLabel.value}`;
});

const pointRecordSearchSchema: EsFormSchema = [
  {
    component: 'DatePicker',
    fieldName: 'startDate',
    componentProps: {
      clearable: true,
      placeholder: '开始日期',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'endDate',
    componentProps: {
      clearable: true,
      placeholder: '结束日期',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    component: 'Input',
    fieldName: 'targetType',
    componentProps: {
      clearable: true,
      placeholder: '目标类型',
    },
  },
  {
    component: 'Input',
    fieldName: 'targetId',
    componentProps: {
      clearable: true,
      placeholder: '目标 ID',
    },
  },
];

const experienceRecordSearchSchema: EsFormSchema = [
  {
    component: 'DatePicker',
    fieldName: 'startDate',
    componentProps: {
      clearable: true,
      placeholder: '开始日期',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'endDate',
    componentProps: {
      clearable: true,
      placeholder: '结束日期',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
    },
  },
];

const badgeSearchSchema: EsFormSchema = [
  {
    component: 'Input',
    fieldName: 'name',
    componentProps: {
      clearable: true,
      placeholder: '徽章名称',
    },
  },
  {
    component: 'Select',
    fieldName: 'type',
    componentProps: {
      clearable: true,
      options: badgeTypeOptions,
      placeholder: '徽章类型',
    },
  },
  {
    component: 'Select',
    fieldName: 'isEnabled',
    componentProps: {
      clearable: true,
      options: [
        { label: '启用', value: true },
        { label: '禁用', value: false },
      ],
      placeholder: '状态',
    },
  },
];

const pointsGrantFormSchema: EsFormSchema = [
  {
    component: 'Select',
    fieldName: 'ruleType',
    label: '规则类型',
    rules: z.number().min(1, '请选择规则类型'),
    componentProps: {
      options: growthTypeOptions,
      placeholder: '请选择规则类型',
    },
  },
  {
    component: 'Input',
    fieldName: 'remark',
    label: '备注',
    componentProps: {
      maxlength: 200,
      placeholder: '请输入备注',
      rows: 4,
      showWordLimit: true,
      type: 'textarea',
    },
  },
];

const pointsConsumeFormSchema: EsFormSchema = [
  {
    component: 'InputNumber',
    fieldName: 'points',
    label: '扣减积分',
    rules: z.number().min(1, '请输入大于 0 的积分值'),
    componentProps: {
      align: 'left',
      class: '!w-full',
      controlsPosition: 'right',
      min: 1,
      placeholder: '请输入要扣减的积分',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'targetType',
    label: '目标类型',
    componentProps: {
      align: 'left',
      class: '!w-full',
      controlsPosition: 'right',
      min: 0,
      placeholder: '可选，填写目标类型',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'targetId',
    label: '目标 ID',
    componentProps: {
      align: 'left',
      class: '!w-full',
      controlsPosition: 'right',
      min: 0,
      placeholder: '可选，填写目标 ID',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'exchangeId',
    label: '兑换 ID',
    componentProps: {
      align: 'left',
      class: '!w-full',
      controlsPosition: 'right',
      min: 0,
      placeholder: '可选，填写兑换 ID',
    },
  },
  {
    component: 'Input',
    fieldName: 'remark',
    label: '备注',
    componentProps: {
      maxlength: 200,
      placeholder: '请输入备注',
      rows: 4,
      showWordLimit: true,
      type: 'textarea',
    },
  },
];

const experienceGrantFormSchema: EsFormSchema = [
  {
    component: 'Select',
    fieldName: 'ruleType',
    label: '规则类型',
    rules: z.number().min(1, '请选择规则类型'),
    componentProps: {
      options: growthTypeOptions,
      placeholder: '请选择规则类型',
    },
  },
  {
    component: 'Input',
    fieldName: 'remark',
    label: '备注',
    componentProps: {
      maxlength: 200,
      placeholder: '请输入备注',
      rows: 4,
      showWordLimit: true,
      type: 'textarea',
    },
  },
];

const pointRecordTableSchema: EsFormSchema = [
  { component: 'InputNumber', fieldName: 'points', label: '积分变化' },
  { component: 'InputNumber', fieldName: 'beforePoints', label: '变化前' },
  { component: 'InputNumber', fieldName: 'afterPoints', label: '变化后' },
  { component: 'InputNumber', fieldName: 'targetType', label: '目标类型' },
  { component: 'InputNumber', fieldName: 'targetId', label: '目标 ID' },
  { component: 'Input', fieldName: 'remark', label: '备注' },
];

const pointRecordColumns =
  formSchemaTransform.toTableColumns<AdminAppUserPointRecordDto>(
    pointRecordTableSchema,
    {
      seq: {
        width: 60,
      },
      createdAt: {
        cellRender: {
          name: 'CellDate',
        },
        minWidth: 170,
        title: '操作时间',
      },
      points: {
        formatter: undefined,
        slots: { default: 'pointsDelta' },
        width: 110,
      },
      beforePoints: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        width: 100,
      },
      afterPoints: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        width: 100,
      },
      targetType: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 100,
      },
      targetId: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 100,
      },
      remark: {
        formatter: ({ cellValue }) => cellValue || '-',
        minWidth: 220,
        showOverflow: 'tooltip',
      },
    },
  );

const experienceRecordTableSchema: EsFormSchema = [
  { component: 'InputNumber', fieldName: 'experience', label: '经验变化' },
  {
    component: 'InputNumber',
    fieldName: 'beforeExperience',
    label: '变化前',
  },
  { component: 'InputNumber', fieldName: 'afterExperience', label: '变化后' },
  { component: 'Input', fieldName: 'remark', label: '备注' },
];

const experienceRecordColumns =
  formSchemaTransform.toTableColumns<AdminAppUserExperienceRecordDto>(
    experienceRecordTableSchema,
    {
      seq: {
        width: 60,
      },
      createdAt: {
        cellRender: {
          name: 'CellDate',
        },
        minWidth: 170,
        title: '操作时间',
      },
      experience: {
        formatter: undefined,
        slots: { default: 'experienceDelta' },
        width: 110,
      },
      beforeExperience: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        width: 100,
      },
      afterExperience: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        width: 100,
      },
      remark: {
        formatter: ({ cellValue }) => cellValue || '-',
        minWidth: 240,
        showOverflow: 'tooltip',
      },
    },
  );

const userBadgeTableSchema: EsFormSchema = [
  { component: 'Input', fieldName: 'badge', label: '徽章信息' },
];

const userBadgeColumns = formSchemaTransform.toTableColumns<UserBadgeItemDto>(
  userBadgeTableSchema,
  {
    seq: {
      width: 60,
    },
    badge: {
      formatter: undefined,
      minWidth: 260,
      slots: { default: 'badgeInfo' },
    },
    createdAt: {
      cellRender: {
        name: 'CellDate',
      },
      minWidth: 170,
      title: '获得时间',
    },
    actions: {
      show: true,
      slots: { default: 'badgeActions' },
      width: 120,
    },
  },
);

const availableBadgeTableSchema: EsFormSchema = [
  { component: 'Input', fieldName: 'name', label: '徽章名称' },
  { component: 'Select', fieldName: 'type', label: '徽章类型' },
  { component: 'Input', fieldName: 'business', label: '业务域' },
  { component: 'Input', fieldName: 'eventKey', label: '事件键' },
  { component: 'Select', fieldName: 'isEnabled', label: '状态' },
];

const availableBadgeColumns =
  formSchemaTransform.toTableColumns<BaseUserBadgeDto>(
    availableBadgeTableSchema,
    {
      name: {
        minWidth: 180,
      },
      type: {
        cellRender: {
          name: 'CellTag',
          props: {
            mapOptions: badgeTypeOptions,
          },
        },
        minWidth: 120,
      },
      business: {
        formatter: ({ cellValue }) => cellValue || '-',
        minWidth: 120,
      },
      eventKey: {
        formatter: ({ cellValue }) => cellValue || '-',
        minWidth: 140,
      },
      isEnabled: {
        cellRender: {
          name: 'CellTag',
          props: {
            map: {
              false: '禁用',
              true: '启用',
            },
          },
        },
        minWidth: 100,
      },
    },
  );

const [PointGrid, pointGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(pointRecordSearchSchema),
  gridOptions: {
    autoResize: true,
    columns: pointRecordColumns,
    height: 'auto',
    proxyConfig: {
      autoLoad: false,
      ajax: {
        query: async (
          { page, sorts }: any,
          formValues: Record<string, any>,
        ) => {
          const userId = currentUser.value?.id;

          if (!userId) {
            return { list: [], total: 0 };
          }

          return await appUsersPointsRecordPageApi(
            formatQuery({
              page,
              formValues: {
                ...formValues,
                userId,
              },
              sorts,
            }),
          );
        },
      },
      sort: true,
    },
  },
});

const [ExperienceGrid, experienceGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(experienceRecordSearchSchema),
  gridOptions: {
    autoResize: true,
    columns: experienceRecordColumns,
    height: 'auto',
    proxyConfig: {
      autoLoad: false,
      ajax: {
        query: async (
          { page, sorts }: any,
          formValues: Record<string, any>,
        ) => {
          const userId = currentUser.value?.id;

          if (!userId) {
            return { list: [], total: 0 };
          }

          return await appUsersExperienceRecordPageApi(
            formatQuery({
              page,
              formValues: {
                ...formValues,
                userId,
              },
              sorts,
            }),
          );
        },
      },
      sort: true,
    },
  },
});

const [BadgeGrid, badgeGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(badgeSearchSchema),
  gridOptions: {
    autoResize: true,
    columns: userBadgeColumns,
    height: 'auto',
    proxyConfig: {
      autoLoad: false,
      ajax: {
        query: async (
          { page, sorts }: any,
          formValues: Record<string, any>,
        ) => {
          const userId = currentUser.value?.id;

          if (!userId) {
            return { list: [], total: 0 };
          }

          return await appUsersBadgesPageApi(
            formatQuery({
              page,
              formValues: {
                ...formValues,
                userId,
              },
              sorts,
            }),
          );
        },
      },
      sort: true,
    },
  },
});

const [PointsGrantForm, pointsGrantFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [PointsConsumeForm, pointsConsumeFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [ExperienceGrantForm, experienceGrantFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [AssignBadgeModal, assignBadgeApi] = useVbenModal({
  connectedComponent: EsModalTable,
});

const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    if (isOpen) {
      sharedData.value = modalApi.getData<OperationModalData>();
      userDetail.value = null;
      currentUser.value = sharedData.value?.record ?? null;
      activeTab.value = 'points';
      modalApi.setState({
        title: modalTitle.value,
      });
      void refreshAll();
    } else {
      userDetail.value = null;
      currentUser.value = null;
    }
  },
  onOpened() {
    recalculateOperationGrids();
  },
});

function recalculateOperationGrids() {
  void nextTick(() => {
    requestAnimationFrame(() => {
      void pointGridApi.grid?.recalculate?.(true);
      void experienceGridApi.grid?.recalculate?.(true);
      void badgeGridApi.grid?.recalculate?.(true);
    });
  });
}

watch(activeTab, () => {
  recalculateOperationGrids();
});

async function refreshUserDetail() {
  if (!currentUser.value) {
    return;
  }

  loading.value = true;
  try {
    userDetail.value = await appUsersDetailApi({ id: currentUser.value.id });
    modalApi.setState({
      title: modalTitle.value,
    });
  } finally {
    loading.value = false;
  }
}

async function refreshAll() {
  await refreshUserDetail();
  await Promise.all([
    pointGridApi.reload(),
    experienceGridApi.reload(),
    badgeGridApi.reload(),
  ]);
  recalculateOperationGrids();
}

async function notifyParentUpdated() {
  await sharedData.value?.onUpdated?.();
}

function buildOperationKey(
  action: 'experience-grant' | 'points-consume' | 'points-grant',
) {
  const userId = currentUser.value?.id ?? 0;
  const randomSuffix = Math.random().toString(36).slice(2, 8);

  return `manual-${action}-${userId}-${Date.now()}-${randomSuffix}`;
}

function openPointsGrantModal() {
  if (!canOperate.value) {
    useMessage.warning('当前用户不可执行运营操作');
    return;
  }

  pointsGrantOperationKey.value = buildOperationKey('points-grant');
  pointsGrantFormApi
    .setData({
      cols: 1,
      title: '增加积分',
      width: 680,
    })
    .open();
}

function openPointsConsumeModal() {
  if (!canOperate.value) {
    useMessage.warning('当前用户不可执行运营操作');
    return;
  }

  pointsConsumeOperationKey.value = buildOperationKey('points-consume');
  pointsConsumeFormApi
    .setData({
      cols: 1,
      title: '扣减积分',
      width: 680,
    })
    .open();
}

function openExperienceGrantModal() {
  if (!canOperate.value) {
    useMessage.warning('当前用户不可执行运营操作');
    return;
  }

  experienceGrantOperationKey.value = buildOperationKey('experience-grant');
  experienceGrantFormApi
    .setData({
      cols: 1,
      title: '增加经验',
      width: 680,
    })
    .open();
}

function openAssignBadgeModal() {
  if (!canOperate.value || !currentUser.value) {
    useMessage.warning('当前用户不可执行运营操作');
    return;
  }

  assignBadgeApi
    .setData({
      api: growthBadgesPageApi,
      columns: availableBadgeColumns,
      multipleLimit: 20,
      searchSchema: createSearchFormOptions(badgeSearchSchema),
      selectionMode: 'multiple',
      title: `分配徽章 - ${displayUserLabel.value}`,
    })
    .open();
}

async function handlePointsGrantSubmit(values: AppUsersPointsGrantRequest) {
  if (!currentUser.value) {
    return;
  }

  await appUsersPointsGrantApi({
    operationKey:
      pointsGrantOperationKey.value || buildOperationKey('points-grant'),
    remark: values.remark?.trim() || undefined,
    ruleType: values.ruleType,
    userId: currentUser.value.id,
  });

  useMessage.success('积分增加成功');
  pointsGrantFormApi.close();
  await refreshAll();
  await notifyParentUpdated();
}

async function handlePointsConsumeSubmit(values: AppUsersPointsConsumeRequest) {
  if (!currentUser.value) {
    return;
  }

  await appUsersPointsConsumeApi({
    exchangeId: values.exchangeId || undefined,
    operationKey:
      pointsConsumeOperationKey.value || buildOperationKey('points-consume'),
    points: values.points,
    remark: values.remark?.trim() || undefined,
    targetId: values.targetId || undefined,
    targetType: values.targetType || undefined,
    userId: currentUser.value.id,
  });

  useMessage.success('积分扣减成功');
  pointsConsumeFormApi.close();
  await refreshAll();
  await notifyParentUpdated();
}

async function handleExperienceGrantSubmit(
  values: AppUsersExperienceGrantRequest,
) {
  if (!currentUser.value) {
    return;
  }

  await appUsersExperienceGrantApi({
    operationKey:
      experienceGrantOperationKey.value ||
      buildOperationKey('experience-grant'),
    remark: values.remark?.trim() || undefined,
    ruleType: values.ruleType,
    userId: currentUser.value.id,
  });

  useMessage.success('经验增加成功');
  experienceGrantFormApi.close();
  await refreshAll();
  await notifyParentUpdated();
}

async function handleAssignBadgeConfirm(rows: Array<{ id: number }>) {
  const userId = currentUser.value?.id;

  if (!userId || rows.length === 0) {
    return;
  }

  await Promise.all(
    rows.map((row) =>
      appUsersBadgesAssignApi({
        badgeId: row.id,
        userId,
      }),
    ),
  );

  useMessage.success('徽章分配成功');
  await refreshAll();
  await notifyParentUpdated();
}

async function revokeBadge(row: Record<string, any>) {
  if (!currentUser.value || !canOperate.value) {
    useMessage.warning('当前用户不可执行运营操作');
    return;
  }

  const badgeRecord = row as UserBadgeItemDto;

  await appUsersBadgesRevokeApi({
    badgeId: badgeRecord.badge.id,
    userId: currentUser.value.id,
  });

  useMessage.success('徽章撤销成功');
  await refreshAll();
  await notifyParentUpdated();
}
</script>

<template>
  <Modal
    class="user-operation-modal !h-[80vh] !w-[1400px]"
    content-class="user-operation-modal__content"
  >
    <div v-loading="loading" class="user-operation-modal__body">
      <div
        v-if="displayUser && userDetail"
        class="user-operation-modal__summary rounded-lg border border-border bg-background p-4"
      >
        <div
          class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
          <div class="flex flex-col gap-3 xl:flex-row xl:items-center xl:gap-6">
            <div class="flex min-w-0 items-center gap-4">
              <el-avatar :size="64" :src="displayUser.avatarUrl || undefined">
                {{
                  (displayUser.nickname || displayUser.account)
                    ?.slice(0, 1)
                    ?.toUpperCase()
                }}
              </el-avatar>
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="text-lg font-semibold text-foreground">
                    {{ displayUser.nickname || displayUser.account }}
                  </span>
                  <el-tag
                    :type="userStatusMap[displayUser.status]?.tagType || 'info'"
                  >
                    {{ getUserStatusText(displayUser.status) }}
                  </el-tag>
                  <el-tag :type="displayUser.isEnabled ? 'success' : 'danger'">
                    {{ displayUser.isEnabled ? '启用' : '禁用' }}
                  </el-tag>
                  <el-tag v-if="displayUser.deletedAt" type="danger">
                    已删除
                  </el-tag>
                </div>
                <div class="mt-2 text-sm text-muted-foreground">
                  账号：{{ displayUser.account }}
                </div>
                <div class="mt-1 text-sm text-muted-foreground">
                  最后登录：{{ displayUser.lastLoginAt || '-' }}
                </div>
              </div>
            </div>

            <div v-if="canOperate" class="flex flex-wrap gap-2">
              <el-button
                class="!ml-0"
                type="primary"
                @click="openPointsGrantModal"
              >
                增加积分
              </el-button>
              <el-button
                class="!ml-0"
                type="warning"
                @click="openPointsConsumeModal"
              >
                扣减积分
              </el-button>
              <el-button
                class="!ml-0"
                type="primary"
                @click="openExperienceGrantModal"
              >
                增加经验
              </el-button>
              <el-button
                class="!ml-0"
                type="primary"
                @click="openAssignBadgeModal"
              >
                分配徽章
              </el-button>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <div class="rounded-md bg-muted/50 px-4 py-3 text-center">
              <div class="text-xs text-muted-foreground">当前积分</div>
              <div class="mt-1 text-lg font-semibold">
                {{ userDetail.pointStats?.currentPoints ?? userDetail.points }}
              </div>
            </div>
            <div class="rounded-md bg-muted/50 px-4 py-3 text-center">
              <div class="text-xs text-muted-foreground">当前经验</div>
              <div class="mt-1 text-lg font-semibold">
                {{
                  userDetail.experienceStats?.currentExperience ??
                  userDetail.experience
                }}
              </div>
            </div>
            <div class="rounded-md bg-muted/50 px-4 py-3 text-center">
              <div class="text-xs text-muted-foreground">今日积分</div>
              <div class="mt-1 text-lg font-semibold">
                {{ userDetail.pointStats?.todayEarned ?? 0 }}
              </div>
            </div>
            <div class="rounded-md bg-muted/50 px-4 py-3 text-center">
              <div class="text-xs text-muted-foreground">已获徽章</div>
              <div class="mt-1 text-lg font-semibold">
                {{ userDetail.badgeCount ?? 0 }}
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="userDetail.banReason || isPermanentStatus(userDetail.status)"
          class="mt-4 rounded-md border border-warning/30 bg-warning/10 px-4 py-3 text-sm"
        >
          处理原因：{{ userDetail.banReason || '-' }}
          <span class="ml-4">
            状态截止：{{
              isPermanentStatus(userDetail.status)
                ? '永久'
                : userDetail.banUntil || '-'
            }}
          </span>
        </div>
      </div>

      <el-tabs v-model="activeTab" class="user-operation-modal__tabs">
        <el-tab-pane label="积分记录" name="points">
          <div class="user-operation-modal__tab-pane">
            <PointGrid class="user-operation-modal__grid">
              <template #pointsDelta="{ row }">
                <el-text :type="row.points >= 0 ? 'success' : 'danger'">
                  {{ row.points > 0 ? `+${row.points}` : row.points }}
                </el-text>
              </template>
            </PointGrid>
          </div>
        </el-tab-pane>

        <el-tab-pane label="经验记录" name="experience">
          <div class="user-operation-modal__tab-pane">
            <ExperienceGrid class="user-operation-modal__grid">
              <template #experienceDelta="{ row }">
                <el-text :type="row.experience >= 0 ? 'success' : 'danger'">
                  {{
                    row.experience > 0 ? `+${row.experience}` : row.experience
                  }}
                </el-text>
              </template>
            </ExperienceGrid>
          </div>
        </el-tab-pane>

        <el-tab-pane label="用户徽章" name="badges">
          <div class="user-operation-modal__tab-pane">
            <BadgeGrid class="user-operation-modal__grid">
              <template #badgeInfo="{ row }">
                <div class="flex items-center gap-3 text-left">
                  <el-image
                    :src="row.badge.icon"
                    class="size-10 rounded-md border border-border"
                    fit="cover"
                    preview-teleported
                  />
                  <div class="min-w-0">
                    <div class="truncate font-medium text-foreground">
                      {{ row.badge.name }}
                    </div>
                    <div class="truncate text-xs text-muted-foreground">
                      {{ badgeTypeMap[row.badge.type] || '-' }}
                      <span v-if="row.badge.eventKey">
                        / {{ row.badge.eventKey }}
                      </span>
                    </div>
                  </div>
                </div>
              </template>

              <template #badgeActions="{ row }">
                <el-popconfirm
                  title="确认撤销当前徽章？"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  :disabled="!canOperate"
                  @confirm="revokeBadge(row)"
                >
                  <template #reference>
                    <el-button link type="danger" :disabled="!canOperate">
                      撤销
                    </el-button>
                  </template>
                </el-popconfirm>
              </template>
            </BadgeGrid>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <PointsGrantForm
      :schema="pointsGrantFormSchema"
      :on-submit="handlePointsGrantSubmit"
    />
    <PointsConsumeForm
      :schema="pointsConsumeFormSchema"
      :on-submit="handlePointsConsumeSubmit"
    />
    <ExperienceGrantForm
      :schema="experienceGrantFormSchema"
      :on-submit="handleExperienceGrantSubmit"
    />
    <AssignBadgeModal @confirm="handleAssignBadgeConfirm" />
  </Modal>
</template>

<style lang="scss">
.user-operation-modal {
  &__content {
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden !important;
  }

  &__body {
    display: grid;
    flex: 1 1 auto;
    grid-template-areas:
      'summary'
      'tabs';
    grid-template-rows: auto minmax(0, 1fr);
    gap: 1rem;
    min-height: 0;
    overflow: hidden;
  }

  &__summary {
    grid-area: summary;
  }

  &__tabs {
    display: flex;
    flex-direction: column;
    grid-area: tabs;
    min-height: 0;
    overflow: hidden;
  }

  &__tab-pane {
    display: grid;
    grid-template-areas: 'grid';
    grid-template-rows: minmax(0, 1fr);
    height: 100%;
    min-height: 0;
    overflow: hidden;
  }

  &__grid {
    grid-area: grid;
    height: 100%;
    min-height: 0;
    overflow: hidden;
  }

  &__tabs > .el-tabs__header {
    flex: 0 0 auto;
  }

  &__tabs > .el-tabs__content {
    flex: 1 1 0;
    min-height: 0;
    overflow: hidden;
  }

  &__tabs > .el-tabs__content > .el-tab-pane {
    height: 100%;
    min-height: 0;
    overflow: hidden;
  }
}
</style>
