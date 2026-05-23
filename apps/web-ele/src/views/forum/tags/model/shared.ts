import type { BaseForumHashtagDto } from '#/api/types';
import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from '#/utils';

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

type HashtagSchemaField = EsFormSchema[number];

const hashtagFieldCatalog = {
  auditStatus: {
    component: 'Select',
    fieldName: 'auditStatus',
    label: '审核状态',
  },
  description: {
    component: 'Input',
    fieldName: 'description',
    label: '运营描述',
  },
  displayName: {
    component: 'Input',
    fieldName: 'displayName',
    label: '话题名称',
  },
  isHidden: {
    component: 'Select',
    fieldName: 'isHidden',
    label: '隐藏',
  },
  manualBoost: {
    component: 'InputNumber',
    fieldName: 'manualBoost',
    label: '人工热度',
  },
} satisfies Record<string, HashtagSchemaField>;

function withoutColorOptions<T extends { color?: unknown }>(options: T[]) {
  return options.map(({ color: _color, ...rest }) => rest);
}

function createHashtagField(
  field: keyof typeof hashtagFieldCatalog,
  overrides: Partial<HashtagSchemaField> = {},
): HashtagSchemaField {
  const base = hashtagFieldCatalog[field] as HashtagSchemaField;
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

export const createFormSchema: EsFormSchema = [
  createHashtagField('displayName', {
    componentProps: {
      maxlength: 50,
      placeholder: '请输入话题名称',
      showWordLimit: true,
    },
    rules: 'required',
  }),
  createHashtagField('manualBoost', {
    componentProps: {
      align: 'left',
      class: '!w-full',
      controlsPosition: 'right',
      min: 0,
      placeholder: '请输入人工热度',
    },
    defaultValue: 0,
  }),
  createHashtagField('description', {
    componentProps: {
      placeholder: '请输入运营描述',
      rows: 4,
      type: 'textarea',
    },
    formItemClass: 'col-span-2',
  }),
];

export const editFormSchema: EsFormSchema = [
  createHashtagField('displayName', {
    componentProps: {
      disabled: true,
      placeholder: '话题名称不可编辑',
    },
  }),
  createHashtagField('manualBoost', {
    componentProps: {
      align: 'left',
      class: '!w-full',
      controlsPosition: 'right',
      min: 0,
      placeholder: '请输入人工热度',
    },
  }),
  createHashtagField('description', {
    componentProps: {
      placeholder: '请输入运营描述',
      rows: 4,
      type: 'textarea',
    },
    formItemClass: 'col-span-2',
  }),
];

export const auditFormSchema: EsFormSchema = [
  createHashtagField('auditStatus', {
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
  {
    component: 'Input',
    componentProps: {
      clearable: true,
      placeholder: '话题名称或 slug',
    },
    fieldName: 'keyword',
  },
  createHashtagField('auditStatus', {
    componentProps: {
      clearable: true,
      options: auditStatusOptions,
      placeholder: '审核状态',
    },
  }),
  createHashtagField('isHidden', {
    componentProps: {
      clearable: true,
      options: hiddenOptions,
      placeholder: '隐藏状态',
    },
  }),
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
  createHashtagField('displayName'),
  { component: 'Input', fieldName: 'slug', label: 'Slug' },
  createHashtagField('manualBoost'),
  { component: 'InputNumber', fieldName: 'followerCount', label: '关注人数' },
  { component: 'InputNumber', fieldName: 'topicRefCount', label: '主题引用数' },
  {
    component: 'InputNumber',
    fieldName: 'commentRefCount',
    label: '评论引用数',
  },
  {
    component: 'Select',
    componentProps: { options: createSourceTypeOptions },
    fieldName: 'createSourceType',
    label: '创建来源',
  },
  {
    component: 'DatePicker',
    fieldName: 'lastReferencedAt',
    label: '最近引用时间',
  },
];

export const searchFormSchema = formSchemaTransform.toSearchSchema(
  pageListSchema,
  {
    keyword: { show: true },
    auditStatus: { show: true },
    isHidden: { show: true },
    dateRange: { show: true },
  },
);

export const pageColumns =
  formSchemaTransform.toTableColumns<BaseForumHashtagDto>(pageListSchema, {
    keyword: { hide: true },
    dateRange: { hide: true },
    displayName: {
      fixed: 'left',
      minWidth: 180,
      showOverflow: 'tooltip',
      slots: { default: 'displayName' },
    },
    slug: {
      minWidth: 160,
      showOverflow: 'tooltip',
    },
    isHidden: {
      slots: { default: 'isHidden' },
    },
    manualBoost: {
      formatter: ({ cellValue }) => cellValue ?? '-',
      minWidth: 110,
      sortable: true,
    },
    followerCount: {
      formatter: ({ cellValue }) => cellValue ?? '-',
      minWidth: 110,
      sortable: true,
    },
    topicRefCount: {
      formatter: ({ cellValue }) => cellValue ?? '-',
      minWidth: 120,
      sortable: true,
    },
    commentRefCount: {
      formatter: ({ cellValue }) => cellValue ?? '-',
      minWidth: 120,
      sortable: true,
    },
    lastReferencedAt: {
      cellRender: {
        name: 'CellDate',
      },
      minWidth: 170,
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
      width: 180,
    },
  });
