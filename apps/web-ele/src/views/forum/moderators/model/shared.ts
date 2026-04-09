import type { VxeGridPropTypes } from '#/adapter/vxe-table';
import type {
  AdminAppUserPageItemDto,
  BaseForumSectionDto,
  BaseForumSectionGroupDto,
  ForumModeratorDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { appUsersPageApi, forumSectionGroupsPageApi, forumSectionsPageApi } from '#/api/core';

const ACTIVE_DELETED_SCOPE = 0;

export const moderatorRoleOptions = [
  { label: '超级版主', value: 1, color: 'danger' as const },
  { label: '分组版主', value: 2, color: 'warning' as const },
  { label: '板块版主', value: 3, color: 'success' as const },
];

export const enabledOptions = [
  { label: '启用', value: true },
  { label: '禁用', value: false },
];

export const moderatorRoleMap = Object.fromEntries(
  moderatorRoleOptions.map((item) => [item.value, item]),
) as Record<number, (typeof moderatorRoleOptions)[number]>;

export const sectionOptions: Array<{ label: string; value: number }> = [];
export const groupOptions: Array<{ label: string; value: number }> = [];

export const moderatorUserSearchSchema: EsFormSchema = [
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
  {
    component: 'Select',
    fieldName: 'isEnabled',
    componentProps: {
      clearable: true,
      options: enabledOptions,
      placeholder: '启用状态',
    },
  },
];

export const moderatorUserColumns: VxeGridPropTypes.Columns<AdminAppUserPageItemDto> = [
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
  {
    field: 'status',
    title: '社区状态',
    minWidth: 120,
    formatter: ({ cellValue }) => {
      if (cellValue === 1) return '正常';
      if (cellValue === 2) return '禁言';
      if (cellValue === 3) return '永久禁言';
      if (cellValue === 4) return '封禁';
      if (cellValue === 5) return '永久封禁';
      return '-';
    },
  },
];

const userSelectComponentProps = () => ({
  api: async (params: Record<string, any>) =>
    appUsersPageApi({
      ...params,
      deletedScope: ACTIVE_DELETED_SCOPE,
    }),
  columns: moderatorUserColumns,
  displayField: 'nickname',
  keyField: 'id',
  multiple: false,
  onlyKey: true,
  placeholder: '请选择用户',
  searchSchema: moderatorUserSearchSchema,
  title: '选择用户',
  width: 1000,
});

const roleField: EsFormSchema[number] = {
  component: 'RadioGroup',
  componentProps: {
    class: 'w-full',
    options: moderatorRoleOptions.map(({ color: _color, ...rest }) => rest),
    placeholder: '请选择版主角色',
  },
  defaultValue: 3,
  fieldName: 'roleType',
  label: '角色类型',
  rules: 'required',
};

const groupField: EsFormSchema[number] = {
  component: 'Select',
  componentProps: {
    class: 'w-full',
    clearable: true,
    options: groupOptions,
    placeholder: '分组版主时请选择分组',
  },
  fieldName: 'groupId',
  help: '仅分组版主需要填写，其他角色可留空',
  label: '所属分组',
};

const sectionField: EsFormSchema[number] = {
  component: 'Select',
  componentProps: {
    class: 'w-full',
    clearable: true,
    collapseTags: true,
    collapseTagsTooltip: true,
    filterable: true,
    multiple: true,
    options: sectionOptions,
    placeholder: '请选择需要管理的板块',
  },
  fieldName: 'sectionIds',
  help: '板块版主必填；分配板块时也会复用这里的选项',
  label: '管理板块',
};

const enabledField: EsFormSchema[number] = {
  component: 'RadioGroup',
  componentProps: {
    class: 'w-full',
    options: enabledOptions,
    placeholder: '请选择启用状态',
  },
  defaultValue: true,
  fieldName: 'isEnabled',
  label: '启用状态',
  rules: 'required',
};

const remarkField: EsFormSchema[number] = {
  component: 'Input',
  componentProps: {
    placeholder: '请输入备注信息',
    rows: 4,
    type: 'textarea',
  },
  fieldName: 'remark',
  formItemClass: 'col-span-2',
  label: '备注',
};

export const createFormSchema: EsFormSchema = [
  {
    component: 'TableSelect',
    componentProps: userSelectComponentProps,
    fieldName: 'selectedUserIds',
    label: '用户',
    rules: 'arrayRequired',
  },
  roleField,
  groupField,
  sectionField,
  enabledField,
  remarkField,
];

export const editFormSchema: EsFormSchema = [
  roleField,
  groupField,
  sectionField,
  enabledField,
  remarkField,
];

export const assignSectionFormSchema: EsFormSchema = [
  {
    ...sectionField,
    help: '未额外填写权限时，后端会沿用版主基础权限',
    rules: 'arrayRequired',
  },
];

export const searchFormSchema: EsFormSchema = [
  {
    component: 'Input',
    fieldName: 'nickname',
    componentProps: {
      clearable: true,
      placeholder: '昵称',
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
    fieldName: 'sectionId',
    componentProps: {
      class: 'w-full',
      clearable: true,
      filterable: true,
      options: sectionOptions,
      placeholder: '板块',
    },
  },
  {
    component: 'Select',
    fieldName: 'isEnabled',
    componentProps: {
      clearable: true,
      options: enabledOptions,
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
      type: 'daterange',
      valueFormat: 'YYYY-MM-DD',
    },
  },
];

export const moderatorColumns: VxeGridPropTypes.Columns<ForumModeratorDto> = [
  {
    field: 'avatar',
    title: '头像',
    minWidth: 90,
    cellRender: {
      name: 'CellImage',
    },
  },
  {
    field: 'nickname',
    title: '昵称',
    minWidth: 140,
  },
  {
    field: 'userId',
    title: '用户ID',
    minWidth: 100,
  },
  {
    field: 'roleType',
    title: '角色类型',
    minWidth: 120,
    cellRender: {
      name: 'CellTag',
      props: {
        mapOptions: moderatorRoleOptions,
      },
    },
  },
  {
    field: 'group',
    title: '所属分组',
    minWidth: 140,
    formatter: ({ row }) => row.group?.name || '-',
  },
  {
    field: 'sections',
    title: '管理板块',
    minWidth: 220,
    showOverflow: 'tooltip',
    formatter: ({ row }) =>
      row.sections?.length
        ? row.sections.map((item) => item.name).join(' / ')
        : '-',
  },
  {
    field: 'permissionNames',
    title: '权限',
    minWidth: 220,
    cellRender: {
      name: 'CellTag',
      props: {
        type: 'info',
      },
    },
  },
  {
    field: 'isEnabled',
    title: '启用状态',
    minWidth: 110,
    slots: { default: 'isEnabled' },
  },
  {
    field: 'createdAt',
    title: '创建时间',
    minWidth: 160,
    sortable: true,
    cellRender: {
      name: 'CellDate',
    },
  },
  {
    field: 'updatedAt',
    title: '更新时间',
    minWidth: 160,
    sortable: true,
    cellRender: {
      name: 'CellDate',
    },
  },
  {
    field: 'actions',
    title: '操作',
    fixed: 'right',
    minWidth: 260,
    slots: { default: 'actions' },
  },
];

export function syncModeratorOptions(
  groups: BaseForumSectionGroupDto[] = [],
  sections: BaseForumSectionDto[] = [],
) {
  groupOptions.splice(
    0,
    groupOptions.length,
    ...groups.map((item) => ({
      label: item.name,
      value: item.id,
    })),
  );
  sectionOptions.splice(
    0,
    sectionOptions.length,
    ...sections.map((item) => ({
      label: item.name,
      value: item.id,
    })),
  );
}

export async function fetchModeratorOptions() {
  const [groupResp, sectionResp] = await Promise.all([
    forumSectionGroupsPageApi({ pageSize: 500 }),
    forumSectionsPageApi({ isEnabled: true, pageSize: 500 }),
  ]);

  syncModeratorOptions(groupResp.list ?? [], sectionResp.list ?? []);
}

export function mapModeratorToFormRecord(record: ForumModeratorDto) {
  return {
    groupId: record.groupId ?? undefined,
    isEnabled: record.isEnabled,
    remark: record.remark ?? '',
    roleType: record.roleType,
    sectionIds: record.sections?.map((item) => item.id) ?? [],
  };
}
