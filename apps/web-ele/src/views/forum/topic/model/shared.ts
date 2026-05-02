import type {
  AdminAppUserPageItemDto,
  AdminForumTopicPageItemDto,
  AdminForumTopicSectionSummaryDto,
  AdminForumTopicUserSummaryDto,
  BaseForumSectionDto,
  ForumTopicContentPreviewDto,
  InteractionActorSummaryDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { appUsersPageApi, forumSectionsPageApi } from '#/api/core';
import { formSchemaTransform } from '#/utils';

const ACTIVE_DELETED_SCOPE = 0;

export const auditStatusOptions = [
  { label: '待审核', value: 0, color: 'warning' as const },
  { label: '已通过', value: 1, color: 'success' as const },
  { label: '已拒绝', value: 2, color: 'danger' as const },
];

export const booleanFilterOptions = [
  { label: '是', value: true },
  { label: '否', value: false },
];

export const userStatusOptions = [
  { label: '正常', value: 1, color: 'success' as const },
  { label: '禁言', value: 2, color: 'warning' as const },
  { label: '永久禁言', value: 3, color: 'warning' as const },
  { label: '封禁', value: 4, color: 'danger' as const },
  { label: '永久封禁', value: 5, color: 'danger' as const },
];

export const topicReviewPolicyOptions = [
  { label: '无需审核', value: 0 },
  { label: '严重敏感词审核', value: 1 },
  { label: '一般敏感词审核', value: 2 },
  { label: '轻度敏感词审核', value: 3 },
  { label: '人工审核', value: 4 },
];

export const sectionOptions: Array<{ label: string; value: number }> = [];

export const auditStatusMap = Object.fromEntries(
  auditStatusOptions.map((item) => [item.value, item]),
) as Record<number, (typeof auditStatusOptions)[number]>;

export const userStatusMap = Object.fromEntries(
  userStatusOptions.map((item) => [item.value, item]),
) as Record<number, (typeof userStatusOptions)[number]>;

export const topicReviewPolicyMap = Object.fromEntries(
  topicReviewPolicyOptions.map((item) => [item.value, item]),
) as Record<number, (typeof topicReviewPolicyOptions)[number]>;

export function formatTopicContentPreview(
  preview?: ForumTopicContentPreviewDto | null,
) {
  return preview?.plainText?.trim() || '-';
}

export function formatTopicUserSummary(
  user?: AdminForumTopicUserSummaryDto | null,
) {
  return user?.nickname || '-';
}

export function formatTopicUserLevel(
  user?: AdminForumTopicUserSummaryDto | null,
) {
  return user?.levelName || '-';
}

export function resolveTopicUserState(
  user?: AdminForumTopicUserSummaryDto | null,
) {
  if (!user) {
    return { color: 'info' as const, label: '-' };
  }

  if (!user.isEnabled) {
    return { color: 'danger' as const, label: '禁用' };
  }

  return (
    userStatusMap[user.status] || {
      color: 'info' as const,
      label: '未知状态',
    }
  );
}

export function formatTopicSectionSummary(
  section?: AdminForumTopicSectionSummaryDto | null,
) {
  return section?.name || '-';
}

export function formatTopicSectionExtra(
  section?: AdminForumTopicSectionSummaryDto | null,
) {
  return section?.groupName || '-';
}

export function formatTopicReviewPolicy(
  section?: AdminForumTopicSectionSummaryDto | null,
) {
  if (!section) {
    return '-';
  }

  return (
    topicReviewPolicyMap[section.topicReviewPolicy]?.label ||
    String(section.topicReviewPolicy)
  );
}

export function resolveTopicSectionState(
  section?: AdminForumTopicSectionSummaryDto | null,
) {
  if (!section) {
    return { color: 'info' as const, label: '-' };
  }

  return section.isEnabled
    ? { color: 'success' as const, label: '启用' }
    : { color: 'danger' as const, label: '禁用' };
}

export function formatTopicActorSummary(
  actor?: InteractionActorSummaryDto | null,
) {
  return actor?.nickname || actor?.username || '-';
}

const userSearchSchema: EsFormSchema = [
  {
    component: 'Input',
    fieldName: 'nickname',
    componentProps: {
      clearable: true,
      placeholder: '昵称',
    },
  },
  {
    component: 'Input',
    fieldName: 'phoneNumber',
    componentProps: {
      clearable: true,
      placeholder: '手机号',
    },
  },
];

const userTableSchema: EsFormSchema = [
  { component: 'InputNumber', fieldName: 'id', label: '用户ID' },
  { component: 'Input', fieldName: 'nickname', label: '昵称' },
  { component: 'Input', fieldName: 'phoneNumber', label: '手机号' },
  { component: 'Input', fieldName: 'levelName', label: '等级' },
];

const userColumns = formSchemaTransform.toTableColumns<AdminAppUserPageItemDto>(
  userTableSchema,
  {
    id: {
      formatter: ({ cellValue }) => cellValue ?? '-',
      minWidth: 100,
    },
    nickname: {
      minWidth: 140,
    },
    phoneNumber: {
      formatter: ({ cellValue }) => cellValue || '-',
      minWidth: 140,
    },
    levelName: {
      formatter: ({ cellValue }) => cellValue || '-',
      minWidth: 120,
    },
  },
);

const userSelectComponentProps = () => ({
  api: async (params: Record<string, any>) =>
    appUsersPageApi({
      ...params,
      deletedScope: ACTIVE_DELETED_SCOPE,
      isEnabled: true,
    }),
  columns: userColumns,
  displayField: 'nickname',
  keyField: 'id',
  multiple: false,
  onlyKey: true,
  placeholder: '请选择发帖用户',
  searchSchema: userSearchSchema,
  title: '选择用户',
  width: 1000,
});

export const createFormSchema: EsFormSchema = [
  {
    component: 'TableSelect',
    componentProps: userSelectComponentProps,
    fieldName: 'selectedUserIds',
    label: '发帖用户',
    rules: 'arrayRequired',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      filterable: true,
      options: sectionOptions,
      placeholder: '请选择所属板块',
    },
    fieldName: 'sectionId',
    label: '所属板块',
    rules: 'selectRequired',
  },
  {
    component: 'Input',
    componentProps: {
      maxlength: 120,
      placeholder: '请输入帖子标题',
      showWordLimit: true,
    },
    fieldName: 'title',
    label: '帖子标题',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入帖子内容',
      rows: 8,
      type: 'textarea',
    },
    fieldName: 'content',
    formItemClass: 'col-span-2',
    label: '帖子内容',
    rules: 'required',
  },
];

export const editFormSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      maxlength: 120,
      placeholder: '请输入帖子标题',
      showWordLimit: true,
    },
    fieldName: 'title',
    label: '帖子标题',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入帖子内容',
      rows: 8,
      type: 'textarea',
    },
    fieldName: 'content',
    formItemClass: 'col-span-2',
    label: '帖子内容',
    rules: 'required',
  },
];

export const auditFormSchema: EsFormSchema = [
  {
    component: 'RadioGroup',
    componentProps: {
      class: 'w-full',
      options: auditStatusOptions.map(({ color: _color, ...rest }) => rest),
      placeholder: '请选择审核结果',
    },
    fieldName: 'auditStatus',
    label: '审核结果',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入审核意见；拒绝时建议填写原因',
      rows: 4,
      type: 'textarea',
    },
    fieldName: 'auditReason',
    formItemClass: 'col-span-2',
    help: '当审核结果为“已拒绝”时，建议补充拒绝原因',
    label: '审核意见',
  },
];

export const moveFormSchema: EsFormSchema = [
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      filterable: true,
      options: sectionOptions,
      placeholder: '请选择目标板块',
    },
    fieldName: 'sectionId',
    label: '目标板块',
    rules: 'selectRequired',
  },
];

export const searchFormSchema: EsFormSchema = [
  {
    component: 'Select',
    fieldName: 'auditStatus',
    defaultValue: 0,
    componentProps: {
      clearable: true,
      options: auditStatusOptions,
      placeholder: '审核状态',
    },
  },
  {
    component: 'Input',
    fieldName: 'keyword',
    componentProps: {
      clearable: true,
      placeholder: '标题或内容关键词',
    },
  },
  {
    component: 'Select',
    fieldName: 'sectionId',
    componentProps: {
      class: 'w-full',
      clearable: true,
      filterable: true,
      options: sectionOptions,
      placeholder: '所属板块',
    },
  },
  {
    component: 'Select',
    fieldName: 'isPinned',
    componentProps: {
      clearable: true,
      options: booleanFilterOptions,
      placeholder: '置顶',
    },
  },
  {
    component: 'Select',
    fieldName: 'isFeatured',
    componentProps: {
      clearable: true,
      options: booleanFilterOptions,
      placeholder: '精华',
    },
  },
  {
    component: 'Select',
    fieldName: 'isLocked',
    componentProps: {
      clearable: true,
      options: booleanFilterOptions,
      placeholder: '锁定',
    },
  },
  {
    component: 'Select',
    fieldName: 'isHidden',
    componentProps: {
      clearable: true,
      options: booleanFilterOptions,
      placeholder: '隐藏',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'dateRange',
    componentProps: {
      clearable: true,
      endPlaceholder: '创建结束时间',
      startPlaceholder: '创建开始时间',
      type: 'daterange',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'userId',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '用户ID',
    },
  },
];

const topicTableSchema: EsFormSchema = [
  { component: 'Input', fieldName: 'title', label: '帖子标题' },
  { component: 'Input', fieldName: 'contentPreview', label: '正文摘要' },
  { component: 'Input', fieldName: 'userSummary', label: '发帖用户' },
  { component: 'Input', fieldName: 'sectionSummary', label: '所属板块' },
  { component: 'RadioGroup', fieldName: 'auditStatus', label: '审核状态' },
  { component: 'Select', fieldName: 'isPinned', label: '置顶' },
  { component: 'Select', fieldName: 'isFeatured', label: '精华' },
  { component: 'Select', fieldName: 'isLocked', label: '锁定' },
  { component: 'Select', fieldName: 'isHidden', label: '隐藏' },
  { component: 'InputNumber', fieldName: 'viewCount', label: '浏览数' },
  { component: 'InputNumber', fieldName: 'commentCount', label: '评论数' },
  { component: 'InputNumber', fieldName: 'likeCount', label: '点赞数' },
  { component: 'InputNumber', fieldName: 'favoriteCount', label: '收藏数' },
  { component: 'DatePicker', fieldName: 'createdAt', label: '创建时间' },
  { component: 'DatePicker', fieldName: 'updatedAt', label: '更新时间' },
];

export const topicColumns =
  formSchemaTransform.toTableColumns<AdminForumTopicPageItemDto>(
    topicTableSchema,
    {
      seq: { width: 60 },
      title: {
        fixed: 'left',
        formatter: undefined,
        minWidth: 260,
        showOverflow: 'tooltip',
        slots: { default: 'title' },
      },
      contentPreview: {
        formatter: ({ cellValue }) => formatTopicContentPreview(cellValue),
        minWidth: 220,
        showOverflow: 'tooltip',
      },
      userSummary: {
        formatter: undefined,
        minWidth: 180,
        slots: { default: 'userSummary' },
      },
      sectionSummary: {
        formatter: undefined,
        minWidth: 180,
        slots: { default: 'sectionSummary' },
      },
      auditStatus: {
        cellRender: {
          name: 'CellTag',
          props: {
            mapOptions: auditStatusOptions,
          },
        },
        minWidth: 120,
      },
      isPinned: {
        formatter: undefined,
        minWidth: 100,
        slots: { default: 'isPinned' },
      },
      isFeatured: {
        formatter: undefined,
        minWidth: 100,
        slots: { default: 'isFeatured' },
      },
      isLocked: {
        formatter: undefined,
        minWidth: 100,
        slots: { default: 'isLocked' },
      },
      isHidden: {
        formatter: undefined,
        minWidth: 100,
        slots: { default: 'isHidden' },
      },
      viewCount: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 100,
        sortable: true,
      },
      commentCount: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 100,
        sortable: true,
      },
      likeCount: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 100,
        sortable: true,
      },
      favoriteCount: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        minWidth: 100,
        sortable: true,
      },
      createdAt: {
        cellRender: {
          name: 'CellDate',
        },
        minWidth: 160,
        sortable: true,
      },
      updatedAt: {
        cellRender: {
          name: 'CellDate',
        },
        minWidth: 160,
        sortable: true,
      },
      actions: {
        show: true,
        fixed: 'right',
        minWidth: 360,
        slots: { default: 'actions' },
      },
    },
  );

export function syncTopicSectionOptions(sections: BaseForumSectionDto[] = []) {
  sectionOptions.splice(
    0,
    sectionOptions.length,
    ...sections.map((item) => ({
      label: item.name,
      value: item.id,
    })),
  );
}

export async function fetchTopicSectionOptions() {
  const sectionResp = await forumSectionsPageApi({ pageSize: 500 });
  syncTopicSectionOptions(sectionResp.list ?? []);
}
