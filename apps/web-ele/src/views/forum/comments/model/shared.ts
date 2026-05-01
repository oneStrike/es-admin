import type { VxeGridPropTypes } from '#/adapter/vxe-table';
import type {
  AdminCommentPageItemDto,
  AdminCommentUserDto,
  SensitiveWordHitDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

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

export function formatSensitiveWordHit(hit: SensitiveWordHitDto) {
  const level = sensitiveWordLevelMap[hit.level]?.label || hit.level;
  const type = sensitiveWordTypeMap[hit.type]?.label || hit.type;
  const field = hit.field || '正文';
  return `${hit.word}（${type}/${level}/${field}）`;
}

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
      placeholder: '请输入审核意见；拒绝时必须填写原因',
      rows: 4,
      type: 'textarea',
    },
    fieldName: 'auditReason',
    label: '审核意见',
  },
];

export const searchFormSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '评论内容关键词',
    },
    fieldName: 'keyword',
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
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      controlsPosition: 'right',
      min: 1,
      placeholder: '评论用户 ID',
    },
    fieldName: 'userId',
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
    component: 'Select',
    componentProps: {
      clearable: true,
      options: auditStatusOptions.map(({ color: _color, ...rest }) => rest),
      placeholder: '审核状态',
    },
    fieldName: 'auditStatus',
  },
  {
    component: 'Select',
    componentProps: {
      clearable: true,
      options: hiddenOptions,
      placeholder: '隐藏状态',
    },
    fieldName: 'isHidden',
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
];

export const pageColumns: VxeGridPropTypes.Columns<AdminCommentPageItemDto> = [
  {
    field: 'id',
    fixed: 'left',
    minWidth: 90,
    sortable: true,
    title: '评论 ID',
  },
  {
    field: 'user',
    minWidth: 180,
    slots: { default: 'user' },
    title: '评论用户',
  },
  {
    field: 'html',
    minWidth: 260,
    showOverflow: 'tooltip',
    title: '评论摘要',
    formatter: ({ cellValue }) => toPlainTextFromHtml(cellValue),
  },
  {
    cellRender: {
      name: 'CellTag',
      props: {
        mapOptions: auditStatusOptions,
      },
    },
    field: 'auditStatus',
    minWidth: 120,
    title: '审核状态',
  },
  {
    field: 'isHidden',
    minWidth: 100,
    slots: { default: 'isHidden' },
    title: '隐藏',
  },
  {
    field: 'likeCount',
    minWidth: 100,
    sortable: true,
    title: '点赞数',
  },
  {
    field: 'floor',
    minWidth: 90,
    sortable: true,
    title: '楼层',
  },
  {
    field: 'sensitiveWordHits',
    minWidth: 160,
    slots: { default: 'sensitiveWords' },
    title: '敏感词',
  },
  {
    cellRender: {
      name: 'CellDate',
    },
    field: 'createdAt',
    minWidth: 160,
    sortable: true,
    title: '创建时间',
  },
  {
    cellRender: {
      name: 'CellDate',
    },
    field: 'updatedAt',
    minWidth: 160,
    sortable: true,
    title: '更新时间',
  },
  {
    field: 'actions',
    fixed: 'right',
    slots: { default: 'actions' },
    title: '操作',
    width: 160,
  },
];
