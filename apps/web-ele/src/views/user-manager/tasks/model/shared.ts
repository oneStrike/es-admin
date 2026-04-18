import type { VxeGridPropTypes } from '#/adapter/vxe-table';
import type {
  AdminTaskAssignmentPageResponseDto,
  AdminTaskPageResponseDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { growthTypeOptions } from '#/views/user-manager/growth/model/constants';

export const taskTypeOptions = [
  { label: '新手任务', value: 1, color: 'success' as const },
  { label: '日常任务', value: 2, color: 'primary' as const },
  { label: '活动任务', value: 4, color: 'danger' as const },
];

export const taskStatusOptions = [
  { label: '草稿', value: 0, color: 'info' as const },
  { label: '已发布', value: 1, color: 'success' as const },
  { label: '已下线', value: 2, color: 'danger' as const },
];

export const enableOptions = [
  { label: '启用', value: true },
  { label: '禁用', value: false },
];

export const claimModeOptions = [
  { label: '自动领取', value: 1 },
  { label: '手动领取', value: 2 },
];

export const completeModeOptions = [
  { label: '自动完成', value: 1 },
  { label: '手动完成', value: 2 },
];

export const objectiveTypeOptions = [
  { label: '人工任务', value: 1 },
  { label: '事件累计', value: 2 },
];

export const assignmentStatusOptions = [
  { label: '待领取', value: 0, color: 'warning' as const },
  { label: '进行中', value: 1, color: 'primary' as const },
  { label: '已完成', value: 2, color: 'success' as const },
  { label: '已过期', value: 3, color: 'danger' as const },
];

export const formSchema: EsFormSchema = [
  {
    component: 'Upload',
    componentProps: {
      accept: 'image/*',
      maxCount: 1,
      multiple: false,
      placeholder: '请上传任务封面',
      scene: 'task',
    },
    fieldName: 'cover',
    label: '任务封面',
  },
  {
    component: 'Input',
    componentProps: {
      maxlength: 80,
      placeholder: '请输入任务标题',
      showWordLimit: true,
    },
    fieldName: 'title',
    label: '任务标题',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      maxlength: 64,
      placeholder: '请输入任务编码',
      showWordLimit: true,
    },
    fieldName: 'code',
    label: '任务编码',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      options: taskTypeOptions,
      placeholder: '请选择任务类型',
    },
    defaultValue: 1,
    fieldName: 'type',
    label: '任务类型',
    rules: 'required',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      class: 'w-full',
      options: taskStatusOptions.map(({ color: _color, ...rest }) => rest),
      placeholder: '请选择任务状态',
    },
    defaultValue: 0,
    fieldName: 'status',
    label: '任务状态',
    rules: 'required',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      class: 'w-full',
      options: enableOptions,
      placeholder: '请选择启用状态',
    },
    defaultValue: true,
    fieldName: 'isEnabled',
    label: '启用状态',
    rules: 'required',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      class: 'w-full',
      options: claimModeOptions,
      placeholder: '请选择领取模式',
    },
    defaultValue: 1,
    fieldName: 'claimMode',
    label: '领取模式',
    rules: 'required',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      class: 'w-full',
      options: completeModeOptions,
      placeholder: '请选择完成模式',
    },
    defaultValue: 1,
    fieldName: 'completeMode',
    label: '完成模式',
    rules: 'required',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      class: 'w-full',
      options: objectiveTypeOptions,
      placeholder: '请选择目标类型',
    },
    defaultValue: 1,
    fieldName: 'objectiveType',
    label: '目标类型',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      clearable: true,
      filterable: true,
      options: growthTypeOptions,
      placeholder: '事件累计任务请选择事件编码',
    },
    fieldName: 'eventCode',
    label: '事件编码',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 0,
      placeholder: '请输入优先级',
    },
    defaultValue: 0,
    fieldName: 'priority',
    label: '优先级',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '请输入目标次数',
    },
    defaultValue: 1,
    fieldName: 'targetCount',
    label: '目标次数',
    rules: 'required',
  },
  {
    component: 'DatePicker',
    componentProps: {
      class: '!w-full',
      placeholder: '请选择发布开始时间',
      type: 'datetime',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'publishStartAt',
    label: '开始时间',
  },
  {
    component: 'DatePicker',
    componentProps: {
      class: '!w-full',
      placeholder: '请选择发布结束时间',
      type: 'datetime',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'publishEndAt',
    help: '如不填写，表示长期有效',
    label: '结束时间',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入周期规则，例如每日/每周触发规则',
      rows: 4,
      type: 'textarea',
    },
    fieldName: 'repeatRule',
    formItemClass: 'col-span-2',
    help: '建议填写便于运营识别的周期规则描述或规则串',
    label: '周期规则',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入目标附加配置；如使用 JSON，请保持格式正确',
      rows: 4,
      type: 'textarea',
    },
    fieldName: 'objectiveConfig',
    formItemClass: 'col-span-2',
    label: '目标配置',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入奖励项列表；如使用 JSON，请保持格式正确',
      rows: 4,
      type: 'textarea',
    },
    fieldName: 'rewardItems',
    formItemClass: 'col-span-2',
    help: '请传入奖励项数组，当前仅支持积分与经验奖励项',
    label: '奖励项列表',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入任务说明',
      rows: 5,
      type: 'textarea',
    },
    fieldName: 'description',
    formItemClass: 'col-span-2',
    label: '任务说明',
  },
];

export const searchFormSchema: EsFormSchema = [
  {
    component: 'Input',
    fieldName: 'title',
    componentProps: {
      clearable: true,
      placeholder: '任务标题',
    },
  },
  {
    component: 'Select',
    fieldName: 'type',
    componentProps: {
      clearable: true,
      options: taskTypeOptions,
      placeholder: '任务类型',
    },
  },
  {
    component: 'Select',
    fieldName: 'status',
    componentProps: {
      clearable: true,
      options: taskStatusOptions,
      placeholder: '任务状态',
    },
  },
  {
    component: 'Select',
    fieldName: 'isEnabled',
    componentProps: {
      clearable: true,
      options: enableOptions,
      placeholder: '启用状态',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'dateRange',
    componentProps: {
      clearable: true,
      endPlaceholder: '创建结束时间',
      startPlaceholder: '创建开始时间',
      type: 'datetimerange',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];

export const assignmentSearchSchema: EsFormSchema = [
  {
    component: 'InputNumber',
    fieldName: 'userId',
    componentProps: {
      class: '!w-full',
      min: 1,
      placeholder: '用户ID',
    },
  },
  {
    component: 'Select',
    fieldName: 'status',
    componentProps: {
      clearable: true,
      options: assignmentStatusOptions,
      placeholder: '领取状态',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'dateRange',
    componentProps: {
      clearable: true,
      endPlaceholder: '记录结束时间',
      startPlaceholder: '记录开始时间',
      type: 'datetimerange',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];

export const pageColumns: VxeGridPropTypes.Columns<AdminTaskPageResponseDto> = [
  {
    field: 'cover',
    fixed: 'left',
    minWidth: 90,
    title: '封面',
    cellRender: {
      name: 'CellImage',
    },
  },
  {
    field: 'title',
    fixed: 'left',
    minWidth: 220,
    showOverflow: 'tooltip',
    slots: { default: 'title' },
    title: '任务标题',
  },
  {
    field: 'code',
    minWidth: 140,
    title: '任务编码',
  },
  {
    field: 'type',
    minWidth: 120,
    title: '任务类型',
    cellRender: {
      name: 'CellTag',
      props: {
        mapOptions: taskTypeOptions,
      },
    },
  },
  {
    field: 'status',
    minWidth: 120,
    title: '任务状态',
    cellRender: {
      name: 'CellTag',
      props: {
        mapOptions: taskStatusOptions,
      },
    },
  },
  {
    field: 'isEnabled',
    minWidth: 110,
    slots: { default: 'isEnabled' },
    title: '启用状态',
  },
  {
    field: 'claimMode',
    minWidth: 120,
    title: '领取模式',
    cellRender: {
      name: 'CellTag',
      props: {
        mapOptions: claimModeOptions,
      },
    },
  },
  {
    field: 'completeMode',
    minWidth: 120,
    title: '完成模式',
    cellRender: {
      name: 'CellTag',
      props: {
        mapOptions: completeModeOptions,
      },
    },
  },
  {
    field: 'targetCount',
    minWidth: 100,
    sortable: true,
    title: '目标次数',
  },
  {
    field: 'priority',
    minWidth: 100,
    sortable: true,
    title: '优先级',
  },
  {
    field: 'publishStartAt',
    minWidth: 160,
    sortable: true,
    title: '开始时间',
    cellRender: {
      name: 'CellDate',
    },
  },
  {
    field: 'publishEndAt',
    minWidth: 160,
    sortable: true,
    title: '结束时间',
    cellRender: {
      name: 'CellDate',
    },
  },
  {
    field: 'createdAt',
    minWidth: 160,
    sortable: true,
    title: '创建时间',
    cellRender: {
      name: 'CellDate',
    },
  },
  {
    field: 'updatedAt',
    minWidth: 160,
    sortable: true,
    title: '更新时间',
    cellRender: {
      name: 'CellDate',
    },
  },
  {
    field: 'actions',
    fixed: 'right',
    minWidth: 320,
    slots: { default: 'actions' },
    title: '操作',
  },
];

export const assignmentColumns: VxeGridPropTypes.Columns<AdminTaskAssignmentPageResponseDto> =
  [
    {
      field: 'userId',
      minWidth: 100,
      title: '用户ID',
    },
    {
      field: 'status',
      minWidth: 120,
      title: '领取状态',
      cellRender: {
        name: 'CellTag',
        props: {
          mapOptions: assignmentStatusOptions,
        },
      },
    },
    {
      field: 'progress',
      minWidth: 120,
      title: '任务进度',
      formatter: ({ row }) => `${row.progress ?? 0}/${row.target ?? 0}`,
    },
    {
      field: 'cycleKey',
      minWidth: 180,
      showOverflow: 'tooltip',
      title: '周期实例',
    },
    {
      field: 'claimedAt',
      minWidth: 160,
      title: '领取时间',
      cellRender: {
        name: 'CellDate',
      },
    },
    {
      field: 'completedAt',
      minWidth: 160,
      title: '完成时间',
      cellRender: {
        name: 'CellDate',
      },
    },
    {
      field: 'expiredAt',
      minWidth: 160,
      title: '过期时间',
      cellRender: {
        name: 'CellDate',
      },
    },
    {
      field: 'createdAt',
      minWidth: 160,
      title: '创建时间',
      cellRender: {
        name: 'CellDate',
      },
    },
    {
      field: 'updatedAt',
      minWidth: 160,
      title: '更新时间',
      cellRender: {
        name: 'CellDate',
      },
    },
  ];

function normalizeJsonLikeField(value: unknown) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export function mapTaskToFormRecord(
  record: AdminTaskPageResponseDto,
): Record<string, any> {
  return {
    ...record,
    objectiveConfig: normalizeJsonLikeField(record.objectiveConfig),
    repeatRule: normalizeJsonLikeField(record.repeatRule),
    rewardItems: normalizeJsonLikeField(record.rewardItems),
  };
}
