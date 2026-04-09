<script setup lang="ts">
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AdminAppUserDetailDto,
  AdminAppUserExperienceRecordDto,
  AdminAppUserExperienceStatsDto,
  AdminAppUserPageItemDto,
  AdminAppUserPointRecordDto,
  AdminAppUserPointStatsDto,
  AppUsersExperienceGrantRequest,
  AppUsersPointsConsumeRequest,
  AppUsersPointsGrantRequest,
  UserBadgeItemDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { computed, ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import { z } from '#/adapter/form';
import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  appUsersBadgesAssignApi,
  appUsersBadgesPageApi,
  appUsersBadgesRevokeApi,
  appUsersDetailApi,
  appUsersExperienceGrantApi,
  appUsersExperienceRecordPageApi,
  appUsersExperienceStatsApi,
  appUsersPointsConsumeApi,
  appUsersPointsGrantApi,
  appUsersPointsRecordPageApi,
  appUsersPointsStatsApi,
  growthBadgesPageApi,
} from '#/api/core';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsModalTable from '#/components/es-modal-table';
import { useMessage } from '#/hooks/useFeedback';
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
const pointStats = ref<AdminAppUserPointStatsDto | null>(null);
const experienceStats = ref<AdminAppUserExperienceStatsDto | null>(null);
const sharedData = ref<null | OperationModalData>(null);
const pointsGrantOperationKey = ref('');
const pointsConsumeOperationKey = ref('');
const experienceGrantOperationKey = ref('');

const canOperate = computed(() => {
  return !!sharedData.value?.isSuperAdmin && !currentUser.value?.deletedAt;
});

const modalTitle = computed(() => {
  if (!currentUser.value) {
    return '用户运营';
  }

  return `用户运营 - ${currentUser.value.nickname || currentUser.value.account}`;
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

const pointRecordColumns: VxeGridProps<AdminAppUserPointRecordDto>['columns'] =
  [
    {
      title: '序号',
      type: 'seq',
      width: 60,
    },
    {
      field: 'createdAt',
      title: '操作时间',
      minWidth: 170,
      cellRender: {
        name: 'CellDate',
      },
    },
    {
      field: 'points',
      title: '积分变化',
      width: 110,
      slots: { default: 'pointsDelta' },
    },
    {
      field: 'beforePoints',
      title: '变化前',
      width: 100,
    },
    {
      field: 'afterPoints',
      title: '变化后',
      width: 100,
    },
    {
      field: 'targetType',
      title: '目标类型',
      minWidth: 100,
      formatter: ({ cellValue }) => cellValue ?? '-',
    },
    {
      field: 'targetId',
      title: '目标 ID',
      minWidth: 100,
      formatter: ({ cellValue }) => cellValue ?? '-',
    },
    {
      field: 'remark',
      title: '备注',
      minWidth: 220,
      showOverflow: 'tooltip',
      formatter: ({ cellValue }) => cellValue || '-',
    },
  ];

const experienceRecordColumns: VxeGridProps<AdminAppUserExperienceRecordDto>['columns'] =
  [
    {
      title: '序号',
      type: 'seq',
      width: 60,
    },
    {
      field: 'createdAt',
      title: '操作时间',
      minWidth: 170,
      cellRender: {
        name: 'CellDate',
      },
    },
    {
      field: 'experience',
      title: '经验变化',
      width: 110,
      slots: { default: 'experienceDelta' },
    },
    {
      field: 'beforeExperience',
      title: '变化前',
      width: 100,
    },
    {
      field: 'afterExperience',
      title: '变化后',
      width: 100,
    },
    {
      field: 'remark',
      title: '备注',
      minWidth: 240,
      showOverflow: 'tooltip',
      formatter: ({ cellValue }) => cellValue || '-',
    },
  ];

const userBadgeColumns: VxeGridProps<UserBadgeItemDto>['columns'] = [
  {
    title: '序号',
    type: 'seq',
    width: 60,
  },
  {
    field: 'badge',
    title: '徽章信息',
    minWidth: 260,
    slots: { default: 'badgeInfo' },
  },
  {
    field: 'createdAt',
    title: '获得时间',
    minWidth: 170,
    cellRender: {
      name: 'CellDate',
    },
  },
  {
    field: 'actions',
    title: '操作',
    width: 120,
    slots: { default: 'badgeActions' },
  },
];

const availableBadgeColumns: VxeGridProps['columns'] = [
  {
    field: 'name',
    title: '徽章名称',
    minWidth: 180,
  },
  {
    field: 'type',
    title: '徽章类型',
    minWidth: 120,
    cellRender: {
      name: 'CellTag',
      props: {
        mapOptions: badgeTypeOptions,
      },
    },
  },
  {
    field: 'business',
    title: '业务域',
    minWidth: 120,
    formatter: ({ cellValue }) => cellValue || '-',
  },
  {
    field: 'eventKey',
    title: '事件键',
    minWidth: 140,
    formatter: ({ cellValue }) => cellValue || '-',
  },
  {
    field: 'isEnabled',
    title: '状态',
    minWidth: 100,
    cellRender: {
      name: 'CellTag',
      props: {
        map: {
          false: '禁用',
          true: '启用',
        },
      },
    },
  },
];

const [PointGrid, pointGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(pointRecordSearchSchema, {
    showCollapseButton: false,
  }),
  gridOptions: {
    columns: pointRecordColumns,
    height: 420,
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
  formOptions: createSearchFormOptions(experienceRecordSearchSchema, {
    showCollapseButton: false,
  }),
  gridOptions: {
    columns: experienceRecordColumns,
    height: 420,
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
  formOptions: createSearchFormOptions(badgeSearchSchema, {
    showCollapseButton: false,
  }),
  gridOptions: {
    columns: userBadgeColumns,
    height: 420,
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
      currentUser.value = sharedData.value?.record ?? null;
      activeTab.value = 'points';
      modalApi.setState({
        title: modalTitle.value,
      });
      void refreshAll();
    }
  },
});

async function refreshUserDetail() {
  if (!currentUser.value) {
    return;
  }

  loading.value = true;
  try {
    userDetail.value = await appUsersDetailApi({ id: currentUser.value.id });
  } finally {
    loading.value = false;
  }
}

async function refreshStats() {
  if (!currentUser.value) {
    pointStats.value = null;
    experienceStats.value = null;
    return;
  }

  const [nextPointStats, nextExperienceStats] = await Promise.all([
    appUsersPointsStatsApi({ userId: currentUser.value.id }),
    appUsersExperienceStatsApi({ userId: currentUser.value.id }),
  ]);

  pointStats.value = nextPointStats;
  experienceStats.value = nextExperienceStats;
}

async function refreshAll() {
  await Promise.all([refreshUserDetail(), refreshStats()]);
  await Promise.all([
    pointGridApi.reload(),
    experienceGridApi.reload(),
    badgeGridApi.reload(),
  ]);
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
      searchSchema: createSearchFormOptions(badgeSearchSchema, {
        showCollapseButton: false,
      }),
      selectionMode: 'multiple',
      title: `分配徽章 - ${currentUser.value.nickname || currentUser.value.account}`,
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
  if (!currentUser.value || rows.length === 0) {
    return;
  }

  await Promise.all(
    rows.map((row) =>
      appUsersBadgesAssignApi({
        badgeId: row.id,
        userId: currentUser.value!.id,
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
  <Modal class="!w-[1400px]">
    <Page auto-content-height>
      <div v-loading="loading" class="space-y-4">
        <div
          v-if="currentUser && userDetail"
          class="rounded-lg border border-border bg-background p-4"
        >
          <div
            class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
          >
            <div class="flex items-center gap-4">
              <el-avatar :size="64" :src="currentUser.avatarUrl || undefined">
                {{
                  (currentUser.nickname || currentUser.account)
                    ?.slice(0, 1)
                    ?.toUpperCase()
                }}
              </el-avatar>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-lg font-semibold text-foreground">
                    {{ currentUser.nickname || currentUser.account }}
                  </span>
                  <el-tag
                    :type="userStatusMap[currentUser.status]?.tagType || 'info'"
                  >
                    {{ getUserStatusText(currentUser.status) }}
                  </el-tag>
                  <el-tag :type="currentUser.isEnabled ? 'success' : 'danger'">
                    {{ currentUser.isEnabled ? '启用' : '禁用' }}
                  </el-tag>
                  <el-tag v-if="currentUser.deletedAt" type="danger">
                    已删除
                  </el-tag>
                </div>
                <div class="mt-2 text-sm text-muted-foreground">
                  账号：{{ currentUser.account }}
                </div>
                <div class="mt-1 text-sm text-muted-foreground">
                  最后登录：{{ currentUser.lastLoginAt || '-' }}
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <div class="rounded-md bg-muted/50 px-4 py-3 text-center">
                <div class="text-xs text-muted-foreground">当前积分</div>
                <div class="mt-1 text-lg font-semibold">
                  {{ pointStats?.currentPoints ?? userDetail.points }}
                </div>
              </div>
              <div class="rounded-md bg-muted/50 px-4 py-3 text-center">
                <div class="text-xs text-muted-foreground">当前经验</div>
                <div class="mt-1 text-lg font-semibold">
                  {{
                    experienceStats?.currentExperience ?? userDetail.experience
                  }}
                </div>
              </div>
              <div class="rounded-md bg-muted/50 px-4 py-3 text-center">
                <div class="text-xs text-muted-foreground">今日积分</div>
                <div class="mt-1 text-lg font-semibold">
                  {{ pointStats?.todayEarned ?? 0 }}
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

        <el-tabs v-model="activeTab">
          <el-tab-pane label="积分记录" name="points">
            <div v-if="canOperate" class="mb-3 flex justify-end gap-2">
              <el-button type="primary" @click="openPointsGrantModal">
                增加积分
              </el-button>
              <el-button type="warning" @click="openPointsConsumeModal">
                扣减积分
              </el-button>
            </div>

            <PointGrid>
              <template #pointsDelta="{ row }">
                <el-text :type="row.points >= 0 ? 'success' : 'danger'">
                  {{ row.points > 0 ? `+${row.points}` : row.points }}
                </el-text>
              </template>
            </PointGrid>
          </el-tab-pane>

          <el-tab-pane label="经验记录" name="experience">
            <div v-if="canOperate" class="mb-3 flex justify-end gap-2">
              <el-button type="primary" @click="openExperienceGrantModal">
                增加经验
              </el-button>
            </div>

            <ExperienceGrid>
              <template #experienceDelta="{ row }">
                <el-text :type="row.experience >= 0 ? 'success' : 'danger'">
                  {{
                    row.experience > 0 ? `+${row.experience}` : row.experience
                  }}
                </el-text>
              </template>
            </ExperienceGrid>
          </el-tab-pane>

          <el-tab-pane label="用户徽章" name="badges">
            <div v-if="canOperate" class="mb-3 flex justify-end gap-2">
              <el-button type="primary" @click="openAssignBadgeModal">
                分配徽章
              </el-button>
            </div>

            <BadgeGrid>
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
          </el-tab-pane>
        </el-tabs>
      </div>
    </Page>

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
