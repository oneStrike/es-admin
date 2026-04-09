import type { VxeGridPropTypes } from '#/adapter/vxe-table';
import type {
  AdminAppUserPageItemDto,
  AdminForumTopicPageItemDto,
  BaseForumSectionDto,
  BaseForumTagDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { appUsersPageApi, forumSectionsPageApi } from '#/api/core';

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

export const sectionOptions: Array<{ label: string; value: number }> = [];

export const auditStatusMap = Object.fromEntries(
  auditStatusOptions.map((item) => [item.value, item]),
) as Record<number, (typeof auditStatusOptions)[number]>;

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

const userColumns: VxeGridPropTypes.Columns<AdminAppUserPageItemDto> = [
  {
    field: 'id',
    title: '用户ID',
    minWidth: 100,
  },
  {
    field: 'nickname',
    title: '昵称',
    minWidth: 140,
  },
  {
    field: 'phoneNumber',
    title: '手机号',
    minWidth: 140,
    formatter: ({ cellValue }) => cellValue || '-',
  },
  {
    field: 'levelName',
    title: '等级',
    minWidth: 120,
    formatter: ({ cellValue }) => cellValue || '-',
  },
];

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

export const searchFormSchema: EsFormSchema = [
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
    fieldName: 'auditStatus',
    componentProps: {
      clearable: true,
      options: auditStatusOptions,
      placeholder: '审核状态',
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
];

export const tagSelectionSearchSchema: EsFormSchema = [
  {
    component: 'Input',
    fieldName: 'name',
    componentProps: {
      clearable: true,
      placeholder: '标签名称',
    },
  },
  {
    component: 'Select',
    fieldName: 'isEnabled',
    componentProps: {
      clearable: true,
      options: booleanFilterOptions,
      placeholder: '启用状态',
    },
  },
];

export const tagSelectionColumns: VxeGridPropTypes.Columns<BaseForumTagDto> = [
  {
    field: 'name',
    title: '标签名称',
    minWidth: 140,
  },
  {
    field: 'useCount',
    title: '使用次数',
    minWidth: 100,
    sortable: true,
  },
  {
    field: 'isEnabled',
    title: '启用状态',
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
  {
    field: 'createdAt',
    title: '创建时间',
    minWidth: 160,
    cellRender: {
      name: 'CellDate',
    },
  },
];

export const topicColumns: VxeGridPropTypes.Columns<AdminForumTopicPageItemDto> = [
  {
    field: 'title',
    fixed: 'left',
    minWidth: 260,
    showOverflow: 'tooltip',
    slots: { default: 'title' },
    title: '帖子标题',
  },
  {
    field: 'sectionId',
    minWidth: 140,
    formatter: ({ cellValue }) => getTopicSectionLabel(cellValue),
    title: '所属板块',
  },
  {
    field: 'userId',
    minWidth: 100,
    title: '用户ID',
  },
  {
    field: 'auditStatus',
    minWidth: 120,
    cellRender: {
      name: 'CellTag',
      props: {
        mapOptions: auditStatusOptions,
      },
    },
    title: '审核状态',
  },
  {
    field: 'isPinned',
    minWidth: 100,
    slots: { default: 'isPinned' },
    title: '置顶',
  },
  {
    field: 'isFeatured',
    minWidth: 100,
    slots: { default: 'isFeatured' },
    title: '精华',
  },
  {
    field: 'isLocked',
    minWidth: 100,
    slots: { default: 'isLocked' },
    title: '锁定',
  },
  {
    field: 'isHidden',
    minWidth: 100,
    slots: { default: 'isHidden' },
    title: '隐藏',
  },
  {
    field: 'viewCount',
    minWidth: 100,
    sortable: true,
    title: '浏览数',
  },
  {
    field: 'commentCount',
    minWidth: 100,
    sortable: true,
    title: '评论数',
  },
  {
    field: 'likeCount',
    minWidth: 100,
    sortable: true,
    title: '点赞数',
  },
  {
    field: 'favoriteCount',
    minWidth: 100,
    sortable: true,
    title: '收藏数',
  },
  {
    field: 'createdAt',
    minWidth: 160,
    sortable: true,
    cellRender: {
      name: 'CellDate',
    },
    title: '创建时间',
  },
  {
    field: 'updatedAt',
    minWidth: 160,
    sortable: true,
    cellRender: {
      name: 'CellDate',
    },
    title: '更新时间',
  },
  {
    field: 'actions',
    fixed: 'right',
    minWidth: 290,
    slots: { default: 'actions' },
    title: '操作',
  },
];

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

export function getTopicSectionLabel(sectionId?: null | number) {
  if (!sectionId) return '-';
  return (
    sectionOptions.find((item) => item.value === sectionId)?.label ||
    `ID:${sectionId}`
  );
}
