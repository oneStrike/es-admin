import type {
  AdminReportPageItemDto,
  InteractionActorSummaryDto,
  InteractionAppUserSummaryDto,
  InteractionReportCommentSummaryDto,
  InteractionReportTargetSummaryDto,
  InteractionSceneSummaryDto,
} from '#/api/types/report';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

export const auditStatusOptions = [
  { label: '待审核', value: 0, color: 'warning' as const },
  { label: '已通过', value: 1, color: 'success' as const },
  { label: '已拒绝', value: 2, color: 'danger' as const },
];

export const reportStatusOptions = [
  { label: '待处理', value: 1, color: 'warning' as const },
  { label: '处理中', value: 2, color: 'primary' as const },
  { label: '已解决', value: 3, color: 'success' as const },
  { label: '已驳回', value: 4, color: 'danger' as const },
];

export const handleStatusOptions = reportStatusOptions
  .filter((item) => item.value === 3 || item.value === 4)
  .map(({ color: _color, ...rest }) => rest);

export const reasonTypeOptions = [
  { label: '垃圾信息', value: 1 },
  { label: '不当内容', value: 2 },
  { label: '骚扰', value: 3 },
  { label: '版权侵权', value: 4 },
  { label: '其他', value: 99 },
];

export const sceneTypeOptions = [
  { label: '漫画作品', value: 1 },
  { label: '小说作品', value: 2 },
  { label: '论坛主题', value: 3 },
  { label: '漫画章节', value: 10 },
  { label: '小说章节', value: 11 },
  { label: '用户主页', value: 12 },
];

export const targetTypeOptions = [
  { label: '漫画', value: 1 },
  { label: '小说', value: 2 },
  { label: '漫画章节', value: 3 },
  { label: '小说章节', value: 4 },
  { label: '论坛主题', value: 5 },
  { label: '评论', value: 6 },
  { label: '用户', value: 7 },
];

export const commentLevelOptions = [
  { label: '根评论', value: 1 },
  { label: '回复评论', value: 2 },
];

export const userStatusOptions = [
  { label: '正常', value: 1, color: 'success' as const },
  { label: '禁言', value: 2, color: 'warning' as const },
  { label: '永久禁言', value: 3, color: 'warning' as const },
  { label: '封禁', value: 4, color: 'danger' as const },
  { label: '永久封禁', value: 5, color: 'danger' as const },
];

export const auditStatusMap = Object.fromEntries(
  auditStatusOptions.map((item) => [item.value, item]),
) as Record<number, (typeof auditStatusOptions)[number]>;

export const reportStatusMap = Object.fromEntries(
  reportStatusOptions.map((item) => [item.value, item]),
) as Record<number, (typeof reportStatusOptions)[number]>;

export const reasonTypeMap = Object.fromEntries(
  reasonTypeOptions.map((item) => [item.value, item]),
) as Record<number, (typeof reasonTypeOptions)[number]>;

export const sceneTypeMap = Object.fromEntries(
  sceneTypeOptions.map((item) => [item.value, item]),
) as Record<number, (typeof sceneTypeOptions)[number]>;

export const targetTypeMap = Object.fromEntries(
  targetTypeOptions.map((item) => [item.value, item]),
) as Record<number, (typeof targetTypeOptions)[number]>;

export const commentLevelMap = Object.fromEntries(
  commentLevelOptions.map((item) => [item.value, item]),
) as Record<number, (typeof commentLevelOptions)[number]>;

export const userStatusMap = Object.fromEntries(
  userStatusOptions.map((item) => [item.value, item]),
) as Record<number, (typeof userStatusOptions)[number]>;

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

export function formatCommentLevel(commentLevel?: null | number) {
  if (commentLevel === null || commentLevel === undefined) {
    return '-';
  }

  return commentLevelMap[commentLevel]?.label || commentLevel;
}

export function formatReportDescription(description?: null | string) {
  return description?.trim() || '-';
}

export function formatReporterSummary(
  reporter?: InteractionAppUserSummaryDto | null,
) {
  return reporter?.nickname || '未知用户';
}

export function resolveReporterState(
  reporter?: InteractionAppUserSummaryDto | null,
) {
  if (!reporter) {
    return { color: 'info' as const, label: '-' };
  }

  if (!reporter.isEnabled) {
    return { color: 'danger' as const, label: '禁用' };
  }

  return (
    userStatusMap[reporter.status] || {
      color: 'info' as const,
      label: '未知状态',
    }
  );
}

export function formatActorSummary(actor?: InteractionActorSummaryDto | null) {
  return actor?.nickname || actor?.username || '-';
}

export function formatSceneTitle(summary?: InteractionSceneSummaryDto | null) {
  return pickFirstText(summary?.title, summary?.name, summary?.parentName);
}

export function formatSceneExtra(summary?: InteractionSceneSummaryDto | null) {
  return joinText([summary?.parentName]);
}

export function formatSceneSummary(
  summary?: InteractionSceneSummaryDto | null,
) {
  if (!summary) {
    return '-';
  }

  return joinText([
    summary.sceneTypeName || sceneTypeMap[summary.sceneType]?.label,
    formatSceneTitle(summary),
  ]);
}

export function formatReportTargetTitle(
  summary?: InteractionReportTargetSummaryDto | null,
) {
  return pickFirstText(
    summary?.title,
    summary?.name,
    summary?.contentExcerpt,
    summary?.authorNickname,
  );
}

export function formatReportTargetExtra(
  summary?: InteractionReportTargetSummaryDto | null,
) {
  return joinText([
    summary?.workName,
    summary?.authorNickname ? `作者：${summary.authorNickname}` : undefined,
  ]);
}

export function formatReportTargetSummary(
  summary?: InteractionReportTargetSummaryDto | null,
) {
  if (!summary) {
    return '-';
  }

  return joinText([
    summary.targetTypeName || targetTypeMap[summary.targetType]?.label,
    formatReportTargetTitle(summary),
  ]);
}

export function resolveReportTargetState(
  summary?: InteractionReportTargetSummaryDto | null,
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

  if (summary.isEnabled === false) {
    return { color: 'danger' as const, label: '禁用' };
  }

  const auditStatus =
    typeof summary.auditStatus === 'number'
      ? auditStatusMap[summary.auditStatus]
      : undefined;

  if (auditStatus) {
    return auditStatus;
  }

  const userStatus =
    typeof summary.status === 'number'
      ? userStatusMap[summary.status]
      : undefined;

  return userStatus || { color: 'success' as const, label: '正常' };
}

export function formatReportCommentSummary(
  summary?: InteractionReportCommentSummaryDto | null,
) {
  if (!summary) {
    return '-';
  }

  const author = summary.userNickname || '未知用户';
  const excerpt = summary.contentExcerpt?.trim();

  return excerpt ? `${author}：${excerpt}` : author;
}

export function resolveReportCommentState(
  summary?: InteractionReportCommentSummaryDto | null,
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

export const handleFormSchema: EsFormSchema = [
  {
    component: 'RadioGroup',
    componentProps: {
      class: 'w-full',
      options: handleStatusOptions,
      placeholder: '请选择处理结果',
    },
    fieldName: 'status',
    label: '处理结果',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入处理备注',
      rows: 4,
      type: 'textarea',
    },
    fieldName: 'handlingNote',
    label: '处理备注',
  },
];

export const searchFormSchema: EsFormSchema = [
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: reportStatusOptions.map(({ color: _color, ...rest }) => rest),
      placeholder: '举报状态',
    },
    defaultValue: 1,
    fieldName: 'status',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: reasonTypeOptions,
      placeholder: '举报原因',
    },
    fieldName: 'reasonType',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: targetTypeOptions,
      placeholder: '目标类型',
    },
    fieldName: 'targetType',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: sceneTypeOptions,
      placeholder: '场景类型',
    },
    fieldName: 'sceneType',
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
      placeholder: '举报 ID',
    },
    fieldName: 'id',
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
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      controlsPosition: 'right',
      min: 1,
      placeholder: '场景 ID',
    },
    fieldName: 'sceneId',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      controlsPosition: 'right',
      min: 1,
      placeholder: '举报人 ID',
    },
    fieldName: 'reporterId',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      controlsPosition: 'right',
      min: 1,
      placeholder: '处理人 ID',
    },
    fieldName: 'handlerId',
  },
];

const pageTableSchema: EsFormSchema = [
  { component: 'Input', fieldName: 'reporterSummary', label: '举报人' },
  { component: 'Select', fieldName: 'targetType', label: '目标类型' },
  { component: 'Input', fieldName: 'targetTitle', label: '举报目标' },
  { component: 'Input', fieldName: 'targetExtra', label: '关联信息' },
  { component: 'Select', fieldName: 'sceneType', label: '场景类型' },
  { component: 'Input', fieldName: 'sceneTitle', label: '业务场景' },
  { component: 'Input', fieldName: 'sceneExtra', label: '所属对象' },
  { component: 'Select', fieldName: 'reasonType', label: '举报原因' },
  { component: 'Select', fieldName: 'status', label: '状态' },
  { component: 'Input', fieldName: 'description', label: '举报说明' },
  { component: 'Input', fieldName: 'handlerSummary', label: '处理人' },
  { component: 'Input', fieldName: 'evidenceUrl', label: '证据' },
  { component: 'DatePicker', fieldName: 'createdAt', label: '创建时间' },
  { component: 'DatePicker', fieldName: 'updatedAt', label: '更新时间' },
];

export const pageColumns =
  formSchemaTransform.toTableColumns<AdminReportPageItemDto>(pageTableSchema, {
    seq: { width: 60 },
    reporterSummary: {
      formatter: undefined,
      minWidth: 180,
      slots: { default: 'reporterSummary' },
    },
    targetType: {
      formatter: undefined,
      minWidth: 120,
      slots: { default: 'targetType' },
    },
    targetTitle: {
      field: 'targetSummary',
      formatter: undefined,
      minWidth: 220,
      slots: { default: 'targetTitle' },
    },
    targetExtra: {
      field: 'targetSummary',
      formatter: undefined,
      minWidth: 180,
      slots: { default: 'targetExtra' },
    },
    sceneType: {
      formatter: undefined,
      minWidth: 120,
      slots: { default: 'sceneType' },
    },
    sceneTitle: {
      field: 'sceneSummary',
      formatter: undefined,
      minWidth: 220,
      slots: { default: 'sceneTitle' },
    },
    sceneExtra: {
      field: 'sceneSummary',
      formatter: undefined,
      minWidth: 180,
      slots: { default: 'sceneExtra' },
    },
    reasonType: {
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: reasonTypeOptions,
        },
      },
      minWidth: 120,
    },
    status: {
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: reportStatusOptions,
        },
      },
      minWidth: 120,
    },
    description: {
      formatter: ({ cellValue }) => formatReportDescription(cellValue),
      minWidth: 180,
      showOverflow: 'tooltip',
    },
    handlerSummary: {
      formatter: undefined,
      minWidth: 180,
      slots: { default: 'handlerSummary' },
    },
    evidenceUrl: {
      formatter: undefined,
      minWidth: 90,
      slots: { default: 'evidence' },
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
      slots: { default: 'actions' },
      width: 160,
    },
  });
