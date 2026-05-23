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

type TopicSchemaField = EsFormSchema[number];

const topicFieldCatalog = {
  auditStatus: {
    component: 'Select',
    componentProps: { options: auditStatusOptions },
    fieldName: 'auditStatus',
    label: '审核状态',
  },
  content: {
    component: 'Input',
    fieldName: 'content',
    label: '帖子内容',
  },
  isFeatured: {
    component: 'Select',
    fieldName: 'isFeatured',
    label: '精华',
  },
  isHidden: {
    component: 'Select',
    fieldName: 'isHidden',
    label: '隐藏',
  },
  isLocked: {
    component: 'Select',
    fieldName: 'isLocked',
    label: '锁定',
  },
  isPinned: {
    component: 'Select',
    fieldName: 'isPinned',
    label: '置顶',
  },
  sectionId: {
    component: 'Select',
    fieldName: 'sectionId',
    label: '所属板块',
  },
  title: {
    component: 'Input',
    fieldName: 'title',
    label: '帖子标题',
  },
} satisfies Record<string, TopicSchemaField>;

function withoutColorOptions<T extends { color?: unknown }>(options: T[]) {
  return options.map(({ color: _color, ...rest }) => rest);
}

function createTopicField(
  field: keyof typeof topicFieldCatalog,
  overrides: Partial<TopicSchemaField> = {},
): TopicSchemaField {
  const base = topicFieldCatalog[field] as TopicSchemaField;
  const componentProps = overrides.componentProps ?? base.componentProps;

  return {
    ...base,
    ...overrides,
    componentProps:
      componentProps &&
      typeof componentProps === 'object' &&
      !Array.isArray(componentProps)
        ? { ...componentProps }
        : componentProps,
  };
}

const userListSchema: EsFormSchema = [
  { component: 'InputNumber', fieldName: 'id', label: '用户ID' },
  { component: 'Input', fieldName: 'nickname', label: '昵称' },
  { component: 'Input', fieldName: 'phoneNumber', label: '手机号' },
  { component: 'Input', fieldName: 'levelName', label: '等级' },
];

const userSearchSchema = formSchemaTransform.toSearchSchema(userListSchema, {
  nickname: {
    componentProps: {
      clearable: true,
      placeholder: '昵称',
    },
  },
  phoneNumber: {
    componentProps: {
      clearable: true,
      placeholder: '手机号',
    },
  },
});

const userColumns = formSchemaTransform.toTableColumns<AdminAppUserPageItemDto>(
  userListSchema,
  {
    id: {
      formatter: ({ cellValue }) => cellValue ?? '-',
    },
    nickname: {
      minWidth: 140,
    },
    phoneNumber: {
      formatter: ({ cellValue }) => cellValue ?? '-',
      minWidth: 140,
    },
    levelName: {
      formatter: ({ cellValue }) => cellValue ?? '-',
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
  createTopicField('sectionId', {
    componentProps: {
      class: 'w-full',
      filterable: true,
      options: sectionOptions,
      placeholder: '请选择所属板块',
    },
    rules: 'selectRequired',
  }),
  createTopicField('title', {
    componentProps: {
      maxlength: 120,
      placeholder: '请输入帖子标题',
      showWordLimit: true,
    },
    rules: 'required',
  }),
  createTopicField('content', {
    componentProps: {
      placeholder: '请输入帖子内容',
      rows: 8,
      type: 'textarea',
    },
    formItemClass: 'col-span-2',
    rules: 'required',
  }),
];

export const editFormSchema: EsFormSchema = [
  createTopicField('title', {
    componentProps: {
      maxlength: 120,
      placeholder: '请输入帖子标题',
      showWordLimit: true,
    },
    rules: 'required',
  }),
  createTopicField('content', {
    componentProps: {
      placeholder: '请输入帖子内容',
      rows: 8,
      type: 'textarea',
    },
    formItemClass: 'col-span-2',
    rules: 'required',
  }),
];

export const auditFormSchema: EsFormSchema = [
  createTopicField('auditStatus', {
    component: 'RadioGroup',
    componentProps: {
      class: 'w-full',
      options: withoutColorOptions(auditStatusOptions),
      placeholder: '请选择审核结果',
    },
    label: '审核结果',
    rules: 'required',
  }),
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
  createTopicField('sectionId', {
    componentProps: {
      class: 'w-full',
      filterable: true,
      options: sectionOptions,
      placeholder: '请选择目标板块',
    },
    label: '目标板块',
    rules: 'selectRequired',
  }),
];

const topicListSchema: EsFormSchema = [
  createTopicField('title'),
  { component: 'Input', fieldName: 'contentPreview', label: '正文摘要' },
  { component: 'Input', fieldName: 'userSummary', label: '发帖用户' },
  { component: 'Input', fieldName: 'sectionSummary', label: '所属板块' },
  createTopicField('auditStatus'),
  createTopicField('isPinned'),
  createTopicField('isFeatured'),
  createTopicField('isLocked'),
  createTopicField('isHidden'),
  { component: 'InputNumber', fieldName: 'viewCount', label: '浏览数' },
  { component: 'InputNumber', fieldName: 'commentCount', label: '评论数' },
  { component: 'InputNumber', fieldName: 'likeCount', label: '点赞数' },
  { component: 'InputNumber', fieldName: 'favoriteCount', label: '收藏数' },
  {
    component: 'Input',
    fieldName: 'keyword',
    componentProps: {
      clearable: true,
      placeholder: '标题或内容关键词',
    },
  },
  createTopicField('sectionId', {
    componentProps: {
      class: 'w-full',
      clearable: true,
      filterable: true,
      options: sectionOptions,
      placeholder: '所属板块',
    },
  }),
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

export const searchFormSchema = formSchemaTransform.toSearchSchema(
  topicListSchema,
  {
    auditStatus: {
      defaultValue: 0,
      componentProps: {
        clearable: true,
        options: auditStatusOptions,
        placeholder: '审核状态',
      },
    },
    keyword: {
      componentProps: {
        clearable: true,
        placeholder: '标题或内容关键词',
      },
    },
    sectionId: {
      componentProps: {
        class: 'w-full',
        clearable: true,
        filterable: true,
        options: sectionOptions,
        placeholder: '所属板块',
      },
    },
    isPinned: {
      componentProps: {
        clearable: true,
        options: booleanFilterOptions,
        placeholder: '置顶',
      },
    },
    isFeatured: {
      componentProps: {
        clearable: true,
        options: booleanFilterOptions,
        placeholder: '精华',
      },
    },
    isLocked: {
      componentProps: {
        clearable: true,
        options: booleanFilterOptions,
        placeholder: '锁定',
      },
    },
    isHidden: {
      componentProps: {
        clearable: true,
        options: booleanFilterOptions,
        placeholder: '隐藏',
      },
    },
    dateRange: {
      componentProps: {
        clearable: true,
        endPlaceholder: '创建结束时间',
        startPlaceholder: '创建开始时间',
        type: 'daterange',
        valueFormat: 'YYYY-MM-DD',
      },
    },
    userId: {
      componentProps: {
        class: '!w-full',
        min: 1,
        placeholder: '用户ID',
      },
    },
  },
);

export const topicColumns =
  formSchemaTransform.toTableColumns<AdminForumTopicPageItemDto>(
    topicListSchema,
    {
      seq: { width: 60 },
      title: {
        fixed: 'left',
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
        minWidth: 180,
        slots: { default: 'userSummary' },
      },
      sectionSummary: {
        minWidth: 180,
        slots: { default: 'sectionSummary' },
      },
      isPinned: {
        slots: { default: 'isPinned' },
      },
      isFeatured: {
        slots: { default: 'isFeatured' },
      },
      isLocked: {
        slots: { default: 'isLocked' },
      },
      isHidden: {
        slots: { default: 'isHidden' },
      },
      viewCount: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        sortable: true,
      },
      commentCount: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        sortable: true,
      },
      likeCount: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        sortable: true,
      },
      favoriteCount: {
        formatter: ({ cellValue }) => cellValue ?? '-',
        sortable: true,
      },
      keyword: { hide: true },
      sectionId: { hide: true },
      dateRange: { hide: true },
      userId: { hide: true },
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
        minWidth: 360,
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
