import type { VxeGridPropTypes } from '#/adapter/vxe-table';
import type { BaseForumHashtagDto } from '#/api/types';
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

export const createSourceTypeOptions = [
  { label: '管理员创建', value: 1, color: 'success' as const },
  { label: '主题正文自动创建', value: 2, color: 'primary' as const },
  { label: '评论正文自动创建', value: 3, color: 'info' as const },
];

export const auditRoleOptions = [
  { label: '版主', value: 0 },
  { label: '管理员', value: 1 },
];

export const auditStatusMap = Object.fromEntries(
  auditStatusOptions.map((item) => [item.value, item]),
) as Record<number, (typeof auditStatusOptions)[number]>;

export const createSourceTypeMap = Object.fromEntries(
  createSourceTypeOptions.map((item) => [item.value, item]),
) as Record<number, (typeof createSourceTypeOptions)[number]>;

export const auditRoleMap = Object.fromEntries(
  auditRoleOptions.map((item) => [item.value, item]),
) as Record<number, (typeof auditRoleOptions)[number]>;

export const createFormSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      maxlength: 50,
      placeholder: '请输入话题名称',
      showWordLimit: true,
    },
    fieldName: 'displayName',
    label: '话题名称',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      align: 'left',
      class: '!w-full',
      controlsPosition: 'right',
      min: 0,
      placeholder: '请输入人工热度',
    },
    defaultValue: 0,
    fieldName: 'manualBoost',
    label: '人工热度',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入运营描述',
      rows: 4,
      type: 'textarea',
    },
    fieldName: 'description',
    formItemClass: 'col-span-2',
    label: '运营描述',
  },
];

export const editFormSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      disabled: true,
      placeholder: '话题名称不可编辑',
    },
    fieldName: 'displayName',
    label: '话题名称',
  },
  {
    component: 'InputNumber',
    componentProps: {
      align: 'left',
      class: '!w-full',
      controlsPosition: 'right',
      min: 0,
      placeholder: '请输入人工热度',
    },
    fieldName: 'manualBoost',
    label: '人工热度',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入运营描述',
      rows: 4,
      type: 'textarea',
    },
    fieldName: 'description',
    formItemClass: 'col-span-2',
    label: '运营描述',
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
      placeholder: '话题名称或 slug',
    },
    fieldName: 'keyword',
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

export const pageColumns: VxeGridPropTypes.Columns<BaseForumHashtagDto> = [
  {
    field: 'displayName',
    fixed: 'left',
    minWidth: 180,
    showOverflow: 'tooltip',
    slots: { default: 'displayName' },
    title: '话题名称',
  },
  {
    field: 'slug',
    minWidth: 160,
    showOverflow: 'tooltip',
    title: 'Slug',
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
    field: 'manualBoost',
    minWidth: 110,
    sortable: true,
    title: '人工热度',
  },
  {
    field: 'followerCount',
    minWidth: 110,
    sortable: true,
    title: '关注人数',
  },
  {
    field: 'topicRefCount',
    minWidth: 120,
    sortable: true,
    title: '主题引用数',
  },
  {
    field: 'commentRefCount',
    minWidth: 120,
    sortable: true,
    title: '评论引用数',
  },
  {
    cellRender: {
      name: 'CellTag',
      props: {
        mapOptions: createSourceTypeOptions,
      },
    },
    field: 'createSourceType',
    minWidth: 150,
    title: '创建来源',
  },
  {
    cellRender: {
      name: 'CellDate',
    },
    field: 'lastReferencedAt',
    minWidth: 170,
    sortable: true,
    title: '最近引用时间',
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
    width: 180,
  },
];
