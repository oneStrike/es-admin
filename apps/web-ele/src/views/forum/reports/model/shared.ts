import type { VxeGridPropTypes } from '#/adapter/vxe-table';
import type { AdminReportPageItemDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

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

export const reportStatusMap = Object.fromEntries(
  reportStatusOptions.map((item) => [item.value, item]),
) as Record<number, (typeof reportStatusOptions)[number]>;

export const reasonTypeMap = Object.fromEntries(
  reasonTypeOptions.map((item) => [item.value, item]),
) as Record<number, (typeof reasonTypeOptions)[number]>;

export const commentLevelMap = Object.fromEntries(
  commentLevelOptions.map((item) => [item.value, item]),
) as Record<number, (typeof commentLevelOptions)[number]>;

export function formatCommentLevel(commentLevel?: null | number) {
  if (commentLevel === null || commentLevel === undefined) {
    return '-';
  }

  return commentLevelMap[commentLevel]?.label || commentLevel;
}

export function formatReportDescription(description?: null | string) {
  return description?.trim() || '-';
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
    component: 'Select',
    componentProps: {
      clearable: true,
      options: reportStatusOptions.map(({ color: _color, ...rest }) => rest),
      placeholder: '举报状态',
    },
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
      options: sceneTypeOptions,
      placeholder: '场景类型',
    },
    fieldName: 'sceneType',
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

export const pageColumns: VxeGridPropTypes.Columns<AdminReportPageItemDto> = [
  {
    field: 'id',
    fixed: 'left',
    minWidth: 90,
    sortable: true,
    title: '举报 ID',
  },
  {
    cellRender: {
      name: 'CellTag',
      props: {
        mapOptions: reasonTypeOptions,
      },
    },
    field: 'reasonType',
    minWidth: 120,
    title: '举报原因',
  },
  {
    cellRender: {
      name: 'CellTag',
      props: {
        mapOptions: reportStatusOptions,
      },
    },
    field: 'status',
    minWidth: 120,
    title: '状态',
  },
  {
    field: 'description',
    formatter: ({ cellValue }) => formatReportDescription(cellValue),
    minWidth: 180,
    showOverflow: 'tooltip',
    title: '举报说明',
  },
  {
    field: 'evidenceUrl',
    minWidth: 90,
    slots: { default: 'evidence' },
    title: '证据',
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
