import type {
  AdminCommentPageItemDto,
  AdminCommentUserDto,
  InteractionActorSummaryDto,
  InteractionCommentTargetSummaryDto,
  InteractionReplyCommentSummaryDto,
  SensitiveWordHitDto,
} from '#/api/types/comment';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';
import { createAppUserTableSelectProps } from '#/views/user-manager/shared/app-user-select';

export const auditStatusOptions = [
  { label: '待审核', value: 0, color: 'warning' as const },
  { label: '已通过', value: 1, color: 'success' as const },
  { label: '已拒绝', value: 2, color: 'danger' as const },
];

export const hiddenOptions = [
  { label: '隐藏', value: true },
  { label: '显示', value: false },
];

export const userStatusOptions = [
  { label: '正常', value: 1, color: 'success' as const },
  { label: '禁言', value: 2, color: 'warning' as const },
  { label: '永久禁言', value: 3, color: 'warning' as const },
  { label: '封禁', value: 4, color: 'danger' as const },
  { label: '永久封禁', value: 5, color: 'danger' as const },
];

export const targetTypeOptions = [
  { label: '漫画作品', value: 1 },
  { label: '小说作品', value: 2 },
  { label: '漫画章节', value: 3 },
  { label: '小说章节', value: 4 },
  { label: '论坛主题', value: 5 },
];

export const auditRoleOptions = [
  { label: '版主', value: 0 },
  { label: '管理员', value: 1 },
];

export const sensitiveWordLevelOptions = [
  { label: '严重', value: 1, color: 'danger' as const },
  { label: '一般', value: 2, color: 'warning' as const },
  { label: '轻微', value: 3, color: 'success' as const },
];

export const sensitiveWordTypeOptions = [
  { label: '政治', value: 1 },
  { label: '色情', value: 2 },
  { label: '暴力', value: 3 },
  { label: '广告', value: 4 },
  { label: '其他', value: 5 },
];

export const auditStatusMap = Object.fromEntries(
  auditStatusOptions.map((item) => [item.value, item]),
) as Record<number, (typeof auditStatusOptions)[number]>;

export const userStatusMap = Object.fromEntries(
  userStatusOptions.map((item) => [item.value, item]),
) as Record<number, (typeof userStatusOptions)[number]>;

export const targetTypeMap = Object.fromEntries(
  targetTypeOptions.map((item) => [item.value, item]),
) as Record<number, (typeof targetTypeOptions)[number]>;

export const auditRoleMap = Object.fromEntries(
  auditRoleOptions.map((item) => [item.value, item]),
) as Record<number, (typeof auditRoleOptions)[number]>;

export const sensitiveWordLevelMap = Object.fromEntries(
  sensitiveWordLevelOptions.map((item) => [item.value, item]),
) as Record<number, (typeof sensitiveWordLevelOptions)[number]>;

export const sensitiveWordTypeMap = Object.fromEntries(
  sensitiveWordTypeOptions.map((item) => [item.value, item]),
) as Record<number, (typeof sensitiveWordTypeOptions)[number]>;

const HTML_TAG_REGEX = /<[^>]+>/g;
const HTML_SPACE_ENTITY_REGEX = /&nbsp;/gi;
const EXTRA_WHITESPACE_REGEX = /\s+/g;

function pickFirstText(...values: (null | number | string | undefined)[]) {
  const value = values.find((item) => {
    if (item === null || item === undefined) {
      return false;
    }

    return String(item).trim().length > 0;
  });

  return value === undefined ? '-' : String(value).trim();
}

function joinText(values: (null | number | string | undefined)[]) {
  const text = values
    .map((item) => {
      if (item === null || item === undefined) {
        return '';
      }

      return String(item).trim();
    })
    .filter(Boolean)
    .join(' / ');

  return text || '-';
}

export function toPlainTextFromHtml(content?: null | string) {
  if (!content) {
    return '-';
  }

  const text = content
    .replaceAll(HTML_TAG_REGEX, ' ')
    .replaceAll(HTML_SPACE_ENTITY_REGEX, ' ')
    .replaceAll(EXTRA_WHITESPACE_REGEX, ' ')
    .trim();

  return text || '-';
}

export function formatCommentUser(user?: AdminCommentUserDto) {
  return user?.nickname || '未知用户';
}

export function formatActorSummary(actor?: InteractionActorSummaryDto | null) {
  return actor?.nickname || actor?.username || '-';
}

export function formatCommentTargetTitle(
  summary?: InteractionCommentTargetSummaryDto | null,
) {
  return pickFirstText(summary?.title, summary?.name, summary?.workName);
}

export function formatCommentTargetExtra(
  summary?: InteractionCommentTargetSummaryDto | null,
) {
  return joinText([summary?.workName, summary?.sectionName]);
}

export function formatCommentTargetSummary(
  summary?: InteractionCommentTargetSummaryDto | null,
) {
  if (!summary) {
    return '-';
  }

  return joinText([
    summary.targetTypeName || targetTypeMap[summary.targetType]?.label,
    formatCommentTargetTitle(summary),
  ]);
}

export function resolveCommentTargetState(
  summary?: InteractionCommentTargetSummaryDto | null,
) {
  if (!summary) {
    return { color: 'info' as const, label: '-' };
  }

  if (summary.deletedAt) {
    return { color: 'danger' as const, label: '已删除' };
  }

  if (summary.isHidden) {
    return { color: 'warning' as const, label: '已隐藏' };
  }

  const auditStatus =
    typeof summary.auditStatus === 'number'
      ? auditStatusMap[summary.auditStatus]
      : undefined;

  return auditStatus || { color: 'success' as const, label: '正常' };
}

export function formatReplyCommentSummary(
  summary?: InteractionReplyCommentSummaryDto | null,
) {
  if (!summary) {
    return '-';
  }

  const author = summary.userNickname || '未知用户';
  const excerpt = summary.contentExcerpt?.trim();

  return excerpt ? `${author}：${excerpt}` : author;
}

export function resolveReplyCommentState(
  summary?: InteractionReplyCommentSummaryDto | null,
) {
  if (!summary) {
    return { color: 'info' as const, label: '-' };
  }

  if (summary.isHidden) {
    return { color: 'warning' as const, label: '已隐藏' };
  }

  return (
    auditStatusMap[summary.auditStatus] || {
      color: 'info' as const,
      label: '未知状态',
    }
  );
}

export function formatSensitiveWordHit(hit: SensitiveWordHitDto) {
  const level = sensitiveWordLevelMap[hit.level]?.label || hit.level;
  const type = sensitiveWordTypeMap[hit.type]?.label || hit.type;
  const field = hit.field || '正文';
  return `${hit.word}（${type}/${level}/${field}）`;
}

type CommentSchemaField = EsFormSchema[number];

const commentFieldCatalog = {
  auditStatus: {
    component: 'Select',
    componentProps: { options: auditStatusOptions },
    fieldName: 'auditStatus',
    label: '审核状态',
  },
  isHidden: {
    component: 'Select',
    fieldName: 'isHidden',
    label: '隐藏',
  },
  targetType: {
    component: 'Select',
    fieldName: 'targetType',
    label: '目标类型',
  },
} satisfies Record<string, CommentSchemaField>;

function withoutColorOptions<T extends { color?: unknown }>(options: T[]) {
  return options.map(({ color: _color, ...rest }) => rest);
}

function createCommentField(
  field: keyof typeof commentFieldCatalog,
  overrides: Partial<CommentSchemaField> = {},
): CommentSchemaField {
  const base = commentFieldCatalog[field] as CommentSchemaField;
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

export const auditFormSchema: EsFormSchema = [
  createCommentField('auditStatus', {
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
      placeholder: '请输入审核意见；拒绝时必须填写原因',
      rows: 4,
      type: 'textarea',
    },
    fieldName: 'auditReason',
    label: '审核意见',
  },
];

const pageListSchema: EsFormSchema = [
  { component: 'Input', fieldName: 'user', label: '评论用户' },
  { component: 'Input', fieldName: 'html', label: '评论摘要' },
  createCommentField('targetType', { label: '对象类型' }),
  { component: 'Input', fieldName: 'targetTitle', label: '评论对象' },
  { component: 'Input', fieldName: 'targetExtra', label: '所属对象' },
  { component: 'Input', fieldName: 'replyToSummary', label: '回复对象' },
  createCommentField('auditStatus'),
  createCommentField('isHidden'),
  { component: 'InputNumber', fieldName: 'likeCount', label: '点赞数' },
  { component: 'InputNumber', fieldName: 'floor', label: '楼层' },
  { component: 'Input', fieldName: 'sensitiveWordHits', label: '敏感词' },
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '评论内容关键词',
    },
    fieldName: 'keyword',
  },
  {
    component: 'DatePicker',
    componentProps: {
      clearable: true,
      endPlaceholder: '创建结束时间',
      startPlaceholder: '创建开始时间',
      type: 'daterange',
      valueFormat: 'YYYY-MM-DD',
    },
    fieldName: 'dateRange',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      controlsPosition: 'right',
      min: 1,
      placeholder: '评论 ID',
    },
    fieldName: 'id',
  },
  {
    component: 'TableSelect',
    componentProps: () =>
      createAppUserTableSelectProps({
        enabledOnly: false,
        multiple: false,
        placeholder: '请选择评论用户',
        title: '选择评论用户',
      }),
    fieldName: 'selectedUserIds',
    label: '评论用户',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      controlsPosition: 'right',
      min: 1,
      placeholder: '目标 ID',
    },
    fieldName: 'targetId',
  },
];

export const searchFormSchema = formSchemaTransform.toSearchSchema(
  pageListSchema,
  {
    auditStatus: {
      componentProps: {
        clearable: true,
        options: withoutColorOptions(auditStatusOptions),
        placeholder: '审核状态',
      },
      defaultValue: 0,
    },
    isHidden: {
      componentProps: {
        clearable: true,
        options: hiddenOptions,
        placeholder: '隐藏状态',
      },
    },
    targetType: {
      componentProps: {
        clearable: true,
        options: targetTypeOptions,
        placeholder: '目标类型',
      },
    },
    keyword: {
      componentProps: {
        clearable: true,
        placeholder: '评论内容关键词',
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
    selectedUserIds: {
      componentProps: () => ({
        ...createAppUserTableSelectProps({
          enabledOnly: false,
          multiple: false,
          placeholder: '请选择评论用户',
          title: '选择评论用户',
        }),
      }),
    },
  },
);

export const pageColumns =
  formSchemaTransform.toTableColumns<AdminCommentPageItemDto>(pageListSchema, {
    seq: { width: 60 },
    user: {
      minWidth: 180,
      slots: { default: 'user' },
    },
    html: {
      formatter: ({ cellValue }) => toPlainTextFromHtml(cellValue),
      minWidth: 260,
      showOverflow: 'tooltip',
    },
    targetType: {
      minWidth: 120,
      slots: { default: 'targetType' },
    },
    targetTitle: {
      minWidth: 220,
      slots: { default: 'targetTitle' },
    },
    targetExtra: {
      minWidth: 180,
      slots: { default: 'targetExtra' },
    },
    replyToSummary: {
      minWidth: 240,
      slots: { default: 'replyToSummary' },
    },
    isHidden: {
      slots: { default: 'isHidden' },
    },
    likeCount: {
      sortable: true,
    },
    floor: {
      minWidth: 90,
      sortable: true,
    },
    sensitiveWordHits: {
      minWidth: 160,
      slots: { default: 'sensitiveWords' },
    },
    keyword: { hide: true },
    dateRange: { hide: true },
    id: { hide: true },
    selectedUserIds: { hide: true },
    targetId: { hide: true },
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
      width: 160,
    },
  });
